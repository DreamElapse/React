import React, {
  Component,
  PropTypes
} from 'react'

import {
  NavBar,
  List,
  Tabs,
  Flex
} from 'antd-mobile'
const TabPane = Tabs.TabPane
const Item = List.Item

import {
  FormattedMessage
} from 'react-intl'

import {
  withRouter
} from 'react-router'


import data from '../modules/CountryLanguageView'

import './CountryLanguageView.less'

export class CountryLanguageView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      activeKey: '1',
      countryCode: ''
    }
  }
  
  render () {
    const {
      activeKey,
      countryCode
    } = this.state

    return (
       <Flex direction='column' style={{ height:document.documentElement.clientHeight }}>
        <NavBar style={{width:'100%'}}
          onLeftClick={() => {
            if (activeKey === '1') {
              this.props.router.replace('/')
            } else {
              this.setState({ activeKey : '1' })
            }
          }}
        >
          {activeKey === '1' && <FormattedMessage id='app.global.changeCountry' />}
          {activeKey === '2' && <FormattedMessage id='app.global.changeLanguage' />}

        </NavBar>
      <Flex.Item style={{overflow: 'scroll', width: '100%'}} >
         <Tabs className='country-lanuage' activeKey={activeKey} swipeable={false} >
          <TabPane tab='city' key='1'>
            <List >
              {
                data.result.map(wwwcode => (
                  <Item
                    key={wwwcode}
                    arrow='horizontal'
                    onClick={() => {
                      this.setState({ activeKey : '2', countryCode: wwwcode })
                    }}>
                    { data.entities.countryLanguage[wwwcode].www }
                  </Item>
                ))
              }
            </List>
          </TabPane>
          <TabPane tab='language' key='2'>
            <List >
              {
                countryCode && data.entities.countryLanguage[countryCode].langlist.map(lang => (
                  <Item
                    key={lang.langvalue}
                    arrow='horizontal'
                    onClick={() => {
                      this.context.changeLanguage(lang.langvalue);
                      this.props.router.push('/');
                    }}>
                    { lang.langname }
                  </Item>
                ))
              }
            </List>
          </TabPane>
        </Tabs>
      </Flex.Item>
    </Flex>
        
   )
  }
}

// add the following property
CountryLanguageView.contextTypes = {
  changeLanguage: React.PropTypes.func.isRequired
}

export default withRouter(CountryLanguageView)
