
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

/*"loginType": "0",
 "ffpUser": {
 "name": "彭珍",
 "nameZh": "彭珍",
 "nameEn": "PENG/ZHEN",
 "b2cName": "yidongtest",
 "ffpCardno": "590000000406",
 "loyaltyName": "明珠计划",
 "loyaltyId": "2",
 "tierId": "YK",
 "certificate": "440901199909090909",
 "mobliePhone": "13812345678",
 "loginToken": "f8cb99dfd65e78a9ff4cf449e698de33"
 }*/
export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
