import { hashHistory } from 'react-router'

/**
 * 处理url参数
 *
 * @return 返回拼接后的url
 * */
export const _dealParams = (queryParams) => {
  return "?" + Object.keys(queryParams).map((i) => {
      return (i+"="+queryParams[i])
    }).join("&")
};

export const push = (url, params) => {
  url += typeof params == "object" ? _dealParams(params) : params
  hashHistory.push(url);
}
