// import { Schema, arrayOf, normalize } from 'normalizr'
import 'whatwg-fetch';
import Loading from 'components/Loading';
import { getLanguage } from 'util/storage.util';

const API_ROOT = '/';
/**
 * 请求loading效果
 * */
let defaultSetting = {
  loadingStart: true,
  loadingEnd: true,
};

/**
 * url携带参数
 *
 * defaultConfig： 默认请求数据
 * */
let defaultConfig = {
  "type": "MOBILE",
  "APPTYPE": "touch",
  "chanel": getLanguage() || "zh",
  "urlData": {},
};

/**
 * 拼接url
 *
 * @return 返回拼接后的请求地址
 * */
function combUrl(url, urlParams) {
  return url + "?" + Object.keys(Object.assign({}, defaultConfig, urlParams)).map(function(i){
    return i+"="+defaultConfig[i]
  }).join("&");
}


// 错误码检查
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    return { hasError: true }
  }
}

// 解析请求结果到json中
const getResponseJson = (result) => {
  return result
  .then(checkStatus)
  .then(function (response) {
    return response.json()
  }).then(function (json) {
    afterRequest(defaultSetting);
    return json
  }).catch(function (ex) {
      afterRequest(defaultSetting);
      return { hasError: true }
  })
};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const callApi = (endpoint) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  const result = fetch(combUrl(fullUrl));
  return getResponseJson(result)
};

export const callApiPost = (endpoint, param, urlParams, setting) => {
  beforeRequest(setting);
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  const result = fetch(combUrl(fullUrl, urlParams), {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(param)
  });
  return getResponseJson(result)
};

export const beforeRequest = (setting) => {
  defaultSetting = Object.assign({}, defaultSetting, setting);
  if(defaultSetting.loadingStart) {
    Loading.start();
  }
};

export const afterRequest = (setting) => {
  defaultSetting = Object.assign({}, defaultSetting, setting);
  if(defaultSetting.loadingEnd) {
    Loading.end();
  }
};
