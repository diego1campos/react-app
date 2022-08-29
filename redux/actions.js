export const SET_BUS_STOP_DATA = 'SET_BUS_STOP_DATA';
export const SET_IMGAES_LOADED = 'SET_IMGAES_LOADED';

export const setBusTopData = busStopData => dispatch => {
    dispatch({
        type: SET_BUS_STOP_DATA,
        payload: busStopData,
    });
}

export const setImagesLoaded = imagesLoaded => dispatch => {
    dispatch({
        type: SET_IMGAES_LOADED,
        payload: imagesLoaded,
    });
}