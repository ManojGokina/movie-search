
import {
    SET_SEARCH_TEXT,
    FETCH_MOVIES_REQUEST,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
  } from './action';
  
  const initialState = {
    searchText: '',
    movies: [],
    error: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SEARCH_TEXT:
        return {
          ...state,
          searchText: action.payload,
        };
      case FETCH_MOVIES_REQUEST:
        return {
          ...state,
          error: null,
        };
      case FETCH_MOVIES_SUCCESS:
        return {
          ...state,
          movies: action.payload,
        };
      case FETCH_MOVIES_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  