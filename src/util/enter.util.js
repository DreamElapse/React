import React from 'react';
import { injectI18N } from '../i18n/index';
import { local, session } from 'util/storage.util';

let DEFAULT_QUERY_CONFIGS = {
  t: session("config") ? session("config").t : "false",
  channel: session("config") ? session("config").channel : "touch",
};

/**
 * deal the enter event
 *
 * */
export const defaultEnterEvents = (nextState, replace, wrappedNext, locale) => {
  console.log("nextState",nextState);
  dealParams(nextState.location.query);
  if(locale && injectI18N(locale)) {
    wrappedNext();
  } else {
    wrappedNext();
  }
};

export const dealParams = (querys) => {
  querys && Object.keys(querys).map((key) => {
    if(DEFAULT_QUERY_CONFIGS[key] || key == "t") {
      DEFAULT_QUERY_CONFIGS[key] = querys[key];
      delete querys[key];
    }
  });
  session("config", DEFAULT_QUERY_CONFIGS)
  session("querysInfo", querys);
  console.log("地址栏参数值:",querys);
  // window.history.pushState(null, '', window.location.hash.substr(0, window.location.hash.indexOf("?")));
};


