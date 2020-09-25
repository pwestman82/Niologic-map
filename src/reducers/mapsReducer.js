import { ADD_FEATURE, INCREASE_TOTAL_DISTANCE } from "../actions/types";

const initialState = {
    features: [],
    totalDistance: 0    
}

export const  mapsReducer = (state = initialState, action ) => {
    const {type, payload } = action;

    switch(type){
        case ADD_FEATURE: {
            const newFeatures = [...state.features, payload];
            console.log({event:ADD_FEATURE, payload})
            return {...state, features: newFeatures };
        }

        case INCREASE_TOTAL_DISTANCE: {
            console.log({event:INCREASE_TOTAL_DISTANCE, payload})
            return {...state, totalDistance:payload }
        }

        default: 
            return state;
    }

}