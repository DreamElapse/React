/**
 * 本地化配置
 */

import {
  addLocaleData,
  defineMessages
} from 'react-intl';

import _ from 'lodash'

import zh from 'react-intl/locale-data/zh'
import en from 'react-intl/locale-data/en'

import zh_cn from './locales/zh_CN.json'
import en_us from './locales/en_US.json'
import { getLanguage, setLanguage } from 'util/storage.util';

// 添加Intl默认配置本地化文件
addLocaleData([...en, ...zh]);

// json语言文件生成键值对messages
export const convertMessagesFromJSON = (JSONMessages) => {
  const messages = {};
  _.each(JSONMessages, JSONMessage => {
    messages[JSONMessage.id] = JSONMessage.defaultMessage;
  })

  return messages;
};

// 返回Intl配置
export const getIntlConfig = (locale) => {
  locale = locale || getLanguage() || (navigator.language.split('_')[0] || navigator.browserLanguage).split('-')[0];
  let messages = localeMessages[locale];
  setLanguage(locale);

  const IntlConfig = {
    id: localeMessages["id"],
    locale: locale,
    messages: messages,
    defaultLocale: getLanguage()?getLanguage():'en',
  };

  return IntlConfig;
}

/**
 * return the global messages in stack
 * */
export const localeMessages = {
  id: [],
  zh: {},
  en: {},
};

/**
 * create intl key
 * */
export const createInst = (messages) => {
  for(let o in messages ){
    if(!localeMessages[o.split("_")[0]]) {
      localeMessages[o.split("_")[0]] = (o == "id") ? [] : new Object();
    }
  }
  if(localeMessages.id.indexOf(messages.id) != -1) {
    return false;
  }
  localeMessages.id.push(messages.id);
  return true;
}

/**
 * add i18n text into global messages
 * */
const addMessage = (messages) => {
  Object.keys(messages).map((i) => {
    if(i!="id") {
      let messageList = convertMessagesFromJSON(messages[i]);
      Object.keys(messageList).map((j) => {
        localeMessages[i.split("_")[0]][j] = messageList[j];
      })
    }
  })
}

/**
 * inject async i18n text
 * */
export const injectI18N = (messages) => {
  if(!createInst(messages)) {
    return false;
  }
  addMessage(messages);
  getIntlConfig();
  return true;
};

export default {
  id:"index",
  zh_cn,
  en_us
}
