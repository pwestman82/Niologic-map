## Welcome to Vilnius

This purpose of this project is to measure the distance between selected points clicked on the map, and to store the coordinates of the points and the total distance in a redux store. 

> See it [live here 🌐](https://zen-feynman-9de0a5.netlify.app/)

### Required Criteria

* Fullscreen map usable on Chrome (2019 and 2020 releases).
* Center Vilnius in the center of the map with an appropriate zoom level.
* Use a nice map style.
* Implement a click event like in https://docs.mapbox.com/mapbox-gl-js/example/measure/ to
measure distance between all points in total.
* Each click on the map should draw another point which is connected to the previous points
(as in the given example above).
* You must use redux to receive and store the array of point coordinates and the total
distance on each click.
* Use the metric system with meters to display the distance.
* As a redux store please use console.log(), so that each click produces a store event, which is
send to the console (intercepting the click and directly sending to console is not valid; you
must use redux for this exercise here).

### Test it out

Add the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) extension to your Chrome browser while using the live [link](https://zen-feynman-9de0a5.netlify.app/), as shown here: 

![Browser-Preview](https://user-images.githubusercontent.com/60080367/94411056-69f06e80-0178-11eb-90f8-e651d1799ba3.png)
