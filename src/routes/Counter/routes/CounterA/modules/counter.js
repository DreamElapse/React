import {
  api
} from 'services'
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

import Loading from 'components/Loading';
import { hashHistory } from 'react-router';
export const doubleAsync = () => {
  return (dispatch, getState) => {
    // api.callApiPost("/CSMBP/data/airport/checkVersion.do?os=iPhone/Android", {
    api.callApiPost({
      url:"/CSMBP/data/empApply/sendValidateMsg.do",
      success:function(res){
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().counterA
        })
      },
      error:function(res){
        console.log(res);
      }
    })
  }
};

export const getUserInfo = () => {
  return (dispatch, getState) => {
    return api.callApiPost({
      url: "/CSMBP/data/account/login/tokenLogin.do",
      success:function(res) {
        console.log(res);
      }
    })
  }
}

export const actions = {
  increment,
  doubleAsync,
  getUserInfo
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
