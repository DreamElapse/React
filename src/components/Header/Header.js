import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.less'
import { NavBar, Icon} from 'antd-mobile';

import { local, session, getLanguage } from 'util/storage.util';
import routerConfig  from 'routes/routesConfig';
import { hashHistory } from 'react-router'


class Header extends React.Component {
  constructor(props) {
    super(props);
    let router = hashHistory;
    this.state = {
      title: "中国南方航空",
      showNav:true,
      leftContent: '',
      onLeftClick: () => {
        if(routerConfig(router.getCurrentLocation().pathname)) {
            router.push(routerConfig(router.getCurrentLocation().pathname));
        } else {
          window.history.go(-1);
        }
      },
      rightContent: '',
      onRightClick: () => {
        window.location.href = "https://m.csair.com";
      },
      leftClassName:'',
    }
  }

  renderLeftContent = () => {
    this.state.leftContent = (<Icon key="0" type="" className="am-navbar-left-flex02" />)
  };

  renderRightContent = () => {
    return (
      [
        <Icon key="0" type="" className="am-navbar-left-icon-home" onClick = { () => { this.state.onRightClick() } }/>,
      ]
    )
  };

  render () {
    this.state = Object.assign({}, this.state, this.props);
    if(typeof this.state.rightContent != 'string' && this.state.rightContent.length != 1) {this.renderLeftContent();}

    if(getLanguage() == "en" && this.state.title.length > 20) {
      this.state.title = this.state.title.substr(0,16) + "..."
    } else if(this.state.title.length > 10){
      this.state.title = this.state.title.substr(0,8) + '...'
    }

    /** H5与原生交互，处理标题 */
    try {
      window.CSNativeObject.nativeSetTitle(this.state.title);
    }catch(e){}

    if(this.state.showNav && (session('config').t == "false") || !Boolean(session('config').t)) {
      return (
        <div>
          <NavBar className="header-nav-float"
            leftContent={this.state.leftContent}
            onLeftClick={this.state.onLeftClick}
            rightContent={this.state.rightContent  || this.renderRightContent()}
          >{this.state.title}</NavBar>
          <div style={{height: "0.9rem",width: "100%"}}></div>
        </div>
      )
    } else {
      return (
        <div className="navbar-div-margin-bottom"></div>
      )
    }
  }
};


export default Header
