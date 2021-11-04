
// ------------------------------------
// Constants
// ------------------------------------
export const SET_USER = 'SET_USER'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_USER]    : (state, action) => state + action.payload,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}


export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
