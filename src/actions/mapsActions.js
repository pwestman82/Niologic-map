import { ADD_FEATURE, INCREASE_TOTAL_DISTANCE } from "./types"

export const addFeatureToStore = (feature) => {
    return {
        type: ADD_FEATURE,
        payload: feature
    }
}
export const increaseTotalDistanceInStore = (distance) =>{
    return {
        type: INCREASE_TOTAL_DISTANCE,
        payload: distance
    }
}