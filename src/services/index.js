
import * as _api from './newApi'
import * as _apiAsync from './apiAsync'
import * as _routerPush from './routerPush'

let _allApi = {..._api, ..._apiAsync, ..._routerPush};

export const api = _allApi
