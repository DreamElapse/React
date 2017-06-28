import {
  api
} from 'services'
import { normalize, schema } from 'normalizr'

// 机场ID和城市ID不对应的数据配置，需要转化方便城市数据获取
const City_Code_Switch = [{
  id: 'SPK',
  toId: 'CTS'
}, {
  id: 'JKT',
  toId: 'CGK'
}, {
  id: 'SIA',
  toId: 'XIY'
}, {
  id: 'ROM',
  toId: 'FCO'
}, {
  id: 'THR',
  toId: 'IKA'
}, {
  id: 'YTO',
  toId: 'YYZ'
}, {
  id: 'BER',
  toId: 'TXL'
}, {
  id: 'PAR',
  toId: 'CDG'
}, {
  id: 'BAK',
  toId: 'GYD'
}, {
  id: 'YEG',
  toId: 'YEA'
}];

// 组装新数据格式{"CTS":{id...}}
const citySwitchEntitySchema = new schema.Entity('citySwitch', {}, {
  idAttribute: data => data.id
})

const citySwitchListSchema = [ citySwitchEntitySchema ]

export const citySwitchData = normalize(City_Code_Switch, citySwitchListSchema)


// ------------------------------------
// Constants
// ------------------------------------

console.log(citySwitchData);

export const FETCH_AIRPORT_DATA = 'FETCH_AIRPORT_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchAirPortData = (strVersion) => {
  return (dispatch, getState) => {
    return api.callApi({
      url: '/CSMBP/data/airport/checkVersion.do?os=iPhone/Android&version=' + strVersion,
      success: function(result) {
        dispatch({
          type: FETCH_AIRPORT_DATA,
          payload: result
        })
        if(!result[1]){
          return JSON.parse(localStorage.getItem('airportJSON_New'));
        }
        return result
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null
export default function airPortDataReducer(state = initialState, action) {
  if (action.type === FETCH_AIRPORT_DATA) {

    // 如果没有最新的城市数据 从缓存中取
    if(action.payload && !action.payload[1]){
      action.payload = JSON.parse(localStorage.getItem("airportJSON_New"));
    }else{
      localStorage.setItem("airportJSON_New", JSON.stringify(action.payload));
    }

    state = action.payload
  }

  return state
}
