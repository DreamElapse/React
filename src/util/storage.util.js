import localStorage from 'localStorage';
// import sessionStorage from 'sessionStorage';

/**
 * 设置与获取localStorage
 *
 * @return {String}
 * */
export const local = (key, data) => {
  return data = data ? localStorage.setItem(key, JSON.stringify(data)) : JSON.parse(localStorage.getItem(key));
}

/**
 * 设置与获取sessionStorage
 *
 * @return {String}
 * */
export const session = (key, data) => {
  return data = data ? sessionStorage.setItem(key, JSON.stringify(data)) : JSON.parse(sessionStorage.getItem(key));
}

/**
 * 获取语言
 *
 * @return {String}
 * */
export const getLanguage = () => {
    return localStorage.getItem('locale') || 'zh';
  }

/**
 * 设置语言
 *
 * @return {String}
 * */
export const setLanguage = (locale) => {
  return localStorage.setItem('locale', locale);
}

/**
 * 删除localStorage
 *
 * @return {String}
 * */
export const localRemove = (key) => {
  localStorage.removeItem(key);
}

/**
 * 删除sessionStorage
 *
 * @return {String}
 * */
export const sessionRemove = (key) => {
  sessionStorage.removeItem(key);
}


