import React from 'react'
import './index.less'
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Button, Icon, Accordion, List
} from 'antd-mobile'

import NavBar  from 'components/Header';
import { getLanguage } from 'util/storage.util';
import CitySelect from 'components/CitySelect';
import MsgBox from 'components/MsgBox'
import { api } from 'services'
import config from '../../../config/routerConfig'


class Counter extends React.Component{
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      startCity: {}
    }
  }
  /** 左边可以添加至多三个操作，建议保留一个。默认有首页*/
  rightContent() {
    const value = [
      <Icon key="1" type="" className="counter_right_content" />,
      <Icon key="2" type="search" className="" />
      // <Icon key="3" type="search" className="" />
    ]
    return(
      value
    )
  }


  handleOnClick = (type, selectedResult) => {
    switch (type) {
      case 0:
        this.setState({
          startCity: selectedResult
        })
        break
    }
  }

  componentDidMount(){
    this.props.getUserInfo()
  }

  render() {
    const props = this.props;
    return (
      <div>
        <NavBar router={props.router} rightContent={this.rightContent()} title="中国南方航空移动端官方网站"></NavBar>
        <div>

          <Button onClick={() => { props.getUserInfo() } }>
            发起请求，显示loading
          </Button>

          <Button onClick={() => { api.push(config.counterB.path, {
            't':'fromClient',
            'a': 'd'
          }) } }>
            跳转
          </Button>
          <FormattedMessage
            id="app.global.home"
            defaultMessage="l"
            />
          <Button onClick={() => {this.context.changeLanguage(getLanguage() == "zh" ? "en" : "zh")} }>
            {props.intl.messages["app.global.select"]}
          </Button>

          <Button onClick={() => { props.router.push('/counter/counterB')} }>
            GOTO
          </Button>
          <CitySelect
            placeholder={props.intl.messages['home.global.citySelect']}
            value={this.state.startCity}
            onSelect={selectedItem => { this.handleOnClick(0, selectedItem) }}
          />
          <Accordion className="pad" onChange={this.onChange}>
            <Accordion.Panel header="Button">
              <List className="my-list">
                <List.Item>
                  <Button onClick={() => MsgBox.showTips() }>
                    Tips
                  </Button>
                </List.Item>
                <List.Item>
                  <Button onClick={() => MsgBox.confirmTips({content: 'hh', }) }>
                    Confirm
                  </Button>
                </List.Item>
              </List>
            </Accordion.Panel>
            <Accordion.Panel header="Toast">
              <List className="my-list">
                <List.Item>
                  <Button onClick={() => MsgBox.toastTips({content: 'default type is info And default durations is 2', duration: 2 }) }>
                    toastInfo
                  </Button>
                </List.Item>
                <List.Item>
                  <Button onClick={() => MsgBox.toastTips({type:'success', content: 'haha'}) }>
                    toastSuccess
                  </Button>
                </List.Item>
                <List.Item>
                  <Button onClick={() => MsgBox.toastTips({type:'fail', content: 'fail'}) }>
                    toastFail
                  </Button>
                </List.Item>
                <List.Item>
                  <Button onClick={() => MsgBox.toastTips({type:'offline', content: 'offline'}) }>
                    toastOffline
                  </Button>
                </List.Item>
                <List.Item>
                  <Button onClick={() => MsgBox.toastTips({type:'loading', content: 'loading'}) }>
                    toastLoading
                  </Button>
                </List.Item>
                <List.Item>
                  <Button onClick={() => MsgBox.toastTips({type:'loading'}) }>
                    toastLoadingWithoutLoadingText
                  </Button>
                </List.Item>
              </List>
            </Accordion.Panel>
          </Accordion>




        </div>
      </div>
    )
  }
}

Counter.propTypes = {
  counter     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
};

// add the following property
Counter.contextTypes = {
  changeLanguage: React.PropTypes.func.isRequired
};

export default injectIntl(Counter)
