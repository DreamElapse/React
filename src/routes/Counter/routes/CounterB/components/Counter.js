import React from 'react';
import { hashHistory } from 'react-router';
import Loading from 'components/Loading';
import NavBar  from 'components/Header';
import DateSelect from 'components/DateSelect';
import dateUtil from 'util/date'
import config from '../../../config/routerConfig'
import {
  injectIntl,
  FormattedMessage
} from 'react-intl'

class Counter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startDate: '',
      backDate: ''
    }
  }
  // 组装结果对象数据 根据intl生成的国际化时间
  formatDate = (date) => {
    const {intl} = this.props;

    const dateObj = new Date(date);
    const cYear = dateObj.getFullYear(), cMonth = dateObj.getMonth() + 1, cDay = dateObj.getDate();
    const strFormatDate = `${cYear}-${cMonth < 10 ? '0' + cMonth : cMonth }-${cDay}`
    const strDate = dateUtil.getStrDate({y: cYear, m: cMonth, d: cDay}, 'MMdd', intl.locale);
    return {
      strFormatDate,
      strDate,
      isoWeek: dateUtil.getWeekNameByNumber(dateObj.getDay(), intl.locale) , // intl.formatDate(now,{weekday:'short'})
      cYear,
      cMonth,
      cDay
    }
  }
  handleOnClick = (type, selectedResult) => {
    switch (type) {
      case 3:
        const startDate = selectedResult[0]
        console.log(startDate)
        this.setState({
          startDate: selectedResult[0],
          backDate: selectedResult[1] ? selectedResult[1] :
            this.formatDate(new Date(startDate.cYear, startDate.cMonth - 1, startDate.cDay).getTime() +  + 1000 * 60 * 60 * 24)
        })
        break
    }
  };
  render() {
    return (
      <div style={{ margin: '0 auto' }} >
        <NavBar title="Counter"></NavBar>
        {' '}
        {this.props.counter}
        <button onClick={() => { hashHistory.push(config.counterC.path) }}>location</button>

        <DateSelect startCity value={this.state.startDate} placeholder="请选择日期" onSelect={selectedItem => {
          this.handleOnClick(3, selectedItem)
        }} />
      </div>
    )
  }
}

Counter.propTypes = {
  counter     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}

export default injectIntl(Counter);
