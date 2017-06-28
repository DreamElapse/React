import _ from 'lodash'


/**
 * 添加搜索历史记录
 *
 * @returns {undefined}
 */
export const addCitySearchHistory = (cityObj) => {
  // 去重 保存最近的5条
  let citySearchHistory = getCitySearchHistory()
  citySearchHistory.unshift(cityObj)
  citySearchHistory = _.uniqBy(citySearchHistory, 'id')
  if (citySearchHistory.length > 5) {
    citySearchHistory.pop()
  }

  localStorage.setItem('citySearchHistory', JSON.stringify(citySearchHistory))
}

/**
 *  获取城市搜索历史记录
 *
 * @returns {Array}
 */
export const getCitySearchHistory = () => {
  const cookieSearchHistory = localStorage.getItem('citySearchHistory')
  return !cookieSearchHistory ? [] : JSON.parse(cookieSearchHistory)
}


