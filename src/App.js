import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf'
import './App.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const App = () => {
  const mapContainerRef = useRef(null);

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/pwestman/ckfi0txm50wjz19s3zlc4u83c',
      center: [25.279652, 54.687157],
      zoom: 12.5,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    var distanceContainer = document.getElementById('distance');

    // GeoJSON object to hold our measurement features
    var geojson = {
      'type': 'FeatureCollection',
      'features': []
    };

    // Used to draw a line between points
    var linestring = {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': []
      }
    };

    map.on('load', function () {
      map.addSource('geojson', {
        'type': 'geojson',
        'data': geojson
      });

      // Add styles to the map
      map.addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'geojson',
        paint: {
          'circle-radius': 7,
          'circle-color': '#000066'
        },
        filter: ['in', '$type', 'Point']
      });
      map.addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'geojson',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#000066',
          'line-width': 3.5
        },
        filter: ['in', '$type', 'LineString']
      });

      map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['measure-points']
        });

        // Remove the linestring from the group
        // So we can redraw it based on the points collection
        if (geojson.features.length > 1) geojson.features.pop();

        // Clear the Distance container to populate it with a new value
        distanceContainer.innerHTML = '';

        // If a feature was clicked, remove it from the map
        if (features.length) {
          var id = features[0].properties.id;
          geojson.features = geojson.features.filter(function (point) {
            return point.properties.id !== id;
          });
        } else {
          var point = {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [e.lngLat.lng, e.lngLat.lat]
            },
            'properties': {
              'id': String(new Date().getTime())
            }
          };

          geojson.features.push(point);
        }

        if (geojson.features.length > 1) {
          linestring.geometry.coordinates = geojson.features.map(
            function (point) {
              return point.geometry.coordinates;
            }
          );

          geojson.features.push(linestring);

          // Populate the distanceContainer with total distance
          var value = document.createElement('pre');
          value.textContent =
            'Total distance: ' +
            (turf.length(linestring).toLocaleString()*1000) +
            'm';
          distanceContainer.appendChild(value);
        }

        map.getSource('geojson').setData(geojson);
      });
    });

    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['measure-points']
      });
      // UI indicator for clicking/hovering a point on the map
      map.getCanvas().style.cursor = features.length
        ? 'pointer'
        : 'crosshair';
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default App;
