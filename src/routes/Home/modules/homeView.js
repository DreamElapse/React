import { api } from 'services'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_CMSAD = 'GET_CMSAD'
export const GET_SWITCHES = 'GET_SWITCHES'

// ------------------------------------
// Actions
// ------------------------------------
export const getCmsAd = () => {

  const url = '';
  return (dispatch, getState) => {
    return api.callApi({
      url: url,
      success: function(result){
        dispatch({
          type   : GET_CMSAD,
          payload: result.TOUCHAD
        })
      }
    })
  }
}

export const getSwitches= () => {
  const url = ``
  return (dispatch, getState) => {
    return api.callApi({
      url: url,
      success: function(result) {
        dispatch({
          type   : GET_SWITCHES,
          payload: result
        })
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { 'cmsAd': null }
export default function HomeReducer (state = initialState, action) {
  if (action.type === GET_CMSAD) {
    if (action.payload.hasError) {
      return state
    }

    state = Object.assign({}, state, {'cmsAd': action.payload })
  }

  if(action.type === GET_SWITCHES){
    state = Object.assign({}, state, {'switches': action.payload});
  }

  return state
}
