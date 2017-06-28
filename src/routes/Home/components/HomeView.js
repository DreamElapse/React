import React, {
  Component,
  PropTypes
} from 'react'
import {
  injectIntl,
  FormattedMessage,
  formatMessage
} from 'react-intl'

import {
  NavBar,
  Icon,
  Carousel,
  WhiteSpace,
  WingBlank,
  TabBar,
  NoticeBar
} from 'antd-mobile'

import {
  withRouter
} from 'react-router'

import './HomeView.less'

import defaultAdEn from '../assets/defaultAd-en.jpg'
import defaultAdCn from '../assets/defaultAd-cn.jpg'

import logo from '../assets/logo.png'
import global from '../assets/global.png'
import gb from '../assets/gb.png'
import atv1 from '../assets/atv1.jpg'

import {productListcn, productListen, footerListcn, footerListen} from './data'

export class HomeView extends Component {
  constructor (props) {
    super(props)
    const cmsImgEn = [{img:defaultAdEn, url:'http://www.csair.com/cn/touchad/2016/20160510_0/20160509.html'}]
    const cmsImgCn = [{img:defaultAdCn, url:'https://lucky.csair.com/bluegate/irzw/index.html'}]

    const defaultCmsImg = props.intl.locale == 'zh' ? cmsImgCn : cmsImgEn
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      initialHeight: 320,
      defaultCmsImg
     }
  }

  componentWillReceiveProps(props){
    if(props.switches){
      sessionStorage.setItem("com.csair.mbp.booking_new#getwitches", JSON.stringify(props.switches));
    }
  }

  componentDidMount () {
    const {intl} = this.props;
    if(intl.locale == 'zh' && !this.props.cmsAd){
      setTimeout(this.props.getCmsAd, 2000);
    }

    if(!this.props.switches){
      this.props.getSwitches()
    }
  }

  tabbarRender () {
    const {intl, router} = this.props;
    const tabbarList = [{
      name: intl.messages['app.global.home'],
      iconClass:'tabbar-home',
      url: 'https://m.csair.com/touch/com.csair.mbp.index/index.html#com.csair.mbp.index'
    }, {
      name: intl.messages['app.global.booking'],
      iconClass:'tabbar-book',
      url: '/counter'
    }, {
      name: intl.messages['app.global.flightStatus'],
      iconClass:'tabbar-dynamics',
      url:'https://m.csair.com/touch/com.csair.mbp.index/index.html#com.csair.mbp.flightstatus_new/'
    }, {
      name: intl.messages['app.global.me'],
      iconClass:'tabbar-my',
      url:'https://m.csair.com/touch/com.csair.mbp.index/index.html#com.csair.mbp.login/'
    }]

    return tabbarList.map((item, i) => (
      <TabBar.Item
        title={item.name}
        key={i}
        icon={<div className={item.iconClass}
        onClick={() => {
          router.push(item.url);
          //location.href = item.url;
        }} />} />
    ))
  }

  render () {
    const {cmsImgCn, cmsImgEn, defaultCmsImg} = this.state;
    const {intl} = this.props;
    const productList = intl.locale === 'en' ? productListen : productListcn;
    const footerLinkList = intl.locale === 'en' ? footerListen : footerListcn ;
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {}
    let {cmsAd} = this.props;
    cmsAd = cmsAd || defaultCmsImg; // 默认配图
    return (
      <div>
        <div className='page'>
          <NavBar
            className='home-navbar'
            iconName={false}
            onLeftClick={() => {
              this.props.router.replace('/CountryLanguage')
            }}
            leftContent={[
              <img src={global} key={'global'} className='bar-lang-icon' />
            ]}

            rightContent={[
              <img onClick={() => {
                location.href = intl.locale === 'zh'
                  ? 'http://feedback.csair.com/guestbook/m/index.html?s=touch'
                  : 'http://feedback.csair.com/guestbook/en/m/index.html?s=touch'
              }}
                src={gb}
                key={'gb'}
                className='bar-gb-icon' />
            ]}>
            <img src={logo} className='bar-logo-icon' style={{width:'3.4rem', height:'0.55rem'}} />
          </NavBar>
          <Carousel
            className="my-carousel" autoplay={false} infinite >
            {cmsAd.map((ad, i) => (
              <a href={ad.url} key={i} style={hProp}>
                <img
                  src={ad.img}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({
                      initialHeight: null,
                    });
                  }}
                />
              </a>
            ))}
        </Carousel>

          {intl.locale === 'zh' && <NoticeBar className='home-tips' icon={null}
            onClick={()=>{
              location.href='http://www.csair.com/cn/touchad/2016/20160817/20160816.html';
            }}>
          <Icon type='' className='security-tips' /> 购票安全提示</NoticeBar>}
         <WhiteSpace />
          <WingBlank size='md'>
            <a href='#' ><img src={atv1} style={{ width:'100%' }} /></a>
          </WingBlank>
        </div>
        <TabBar barTintColor='#f4f4f4'>
          {(this.tabbarRender())}
        </TabBar>
      </div>
    )
  }
}

HomeView.propTypes = {
  productList: PropTypes.array.isRequired,
  footerLinkList: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
}

export default withRouter(injectIntl(HomeView))
