import { SET_BUS_STOP_DATA, SET_IMGAES_LOADED } from "./actions";

const initialState = {
    busStopData: '',
    imagesLoaded: [],
}

function data(state = initialState, action) {
    switch (action.type) {
        case SET_BUS_STOP_DATA:
            return { ...state, busStopData: action.payload }
        case SET_IMGAES_LOADED:
            return {
                ...state,
                imagesLoaded: [...state.imagesLoaded, action.payload]
            }

        default:
            return state;
    }
}

export default data;