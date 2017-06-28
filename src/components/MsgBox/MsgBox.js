import { Modal, Toast } from 'antd-mobile';
import { getLanguage } from 'util/storage.util'
const Alert = Modal.alert;

//TODO
//显示提示信息
export function showTips(content,successFn) {
  const defaultOptionZH = {title:"提示",okTest:"确定",content:"",cancelText:"取消"}
  const defaultOptionEN = {title:"info",okTest:"OK",content:"",cancelText:"Cancel"}
  let defaultOption = getLanguage().toLocaleLowerCase == "zh" ? defaultOptionZH :  defaultOptionEN
  let option = {...defaultOption, ...content}
  Alert(option.title, option.content, [
    { text: option.okTest, onPress: successFn},
  ]);
}

export function confirmTips(content,successFn,cancelFn) {
  const defaultOptionZH = {title:"确认",okTest:"确定",content:"",cancelText:"取消"}
  const defaultOptionEN = {title:"confirm",okTest:"OK",content:"",cancelText:"Cancel"}
  let defaultOption = getLanguage().toLocaleLowerCase == "zh" ? defaultOptionZH :  defaultOptionEN
  let option = {...defaultOption, ...content}
  Alert(option.title, option.content, [
    { text: option.cancelText, onPress: cancelFn },
    { text: option.okTest, onPress: successFn },
  ]);
}

/**
 * 吐丝框
 * content: {
 *  type: 'success',// 提示类型'info'、'success'、'fail'、'offline'、'loading'
 *  content: '', //提示内容
 *  duration: 2, //默认时长
 * }
 * */
export function toastTips(content, loadingSuccessFn) {
  let defaultOption = {type: 'info', content: '', duration: 2}
  let option = {...defaultOption, ...content}
  /**
   * 增加loading的逻辑
   * */
  if(option.type == 'loading') {
    if(!Boolean(option.content)) {
      getLanguage() && getLanguage() == 'en' ? option.content = 'loading' : option.content = '加载中' ;
    }
    option.duration = 60
    loadingSuccessFn = loadingSuccessFn ? loadingSuccessFn :
      function(){
        window.setTimeout(function(){
          toastTips({content: 'request fail'});
        },10)
      }
  }
  Toast[option.type](option.content, option.duration, loadingSuccessFn)
}

/**
 * 关闭当前所有吐丝框
 * */
export function hide() {
  Toast.hide();
}

