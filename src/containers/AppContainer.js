import React, { Component, PropTypes } from 'react'
import { hashHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { getIntlConfig } from '../i18n'
import { getLanguage } from 'util/storage.util'
import 'styles/vconsole.less';

class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      // 初始化国际语言配置
      IntlConfig: getIntlConfig(),
      lang : getLanguage()
    }
  }


  /*
  type IntlFormat = {
      formatDate: (value: any, options?: object) => string,
      formatTime: (value: any, options?: object) => string,
      formatRelative: (value: any, options?: object) => string,
      formatNumber: (value: any, options?: object) => string,
      formatPlural: (value: any, options?: object) => string,
      formatMessage: (messageDescriptor: MessageDescriptor, values?: object) => string,
      formatHTMLMessage: (messageDescriptor: MessageDescriptor, values?: object) => string,
  };*/

  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  // 语言字符串
  changeLanguage = (language) => {
    // 改变国际化语言配置
    this.setState({IntlConfig: getIntlConfig(language)});
  }

  // 全站语言切换事件
  getChildContext() {
    return {
      changeLanguage: this.changeLanguage
    }
  }

  render () {
    const { routes, store } = this.props
    const {IntlConfig, test} = this.state;
    return (
      <Provider store={store}>
        <IntlProvider {...IntlConfig} key={IntlConfig}>
          <Router history={hashHistory} children={routes} />
        </IntlProvider>
      </Provider>
    )
  }
}

AppContainer.childContextTypes = {
   changeLanguage: React.PropTypes.func
}

export default AppContainer
