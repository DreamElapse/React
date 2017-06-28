import React, {
  Component,
  PropTypes
} from 'react'

import {injectIntl} from 'react-intl'

import {
  NavBar,
  Popup,
  Flex,
  SegmentedControl,
  Tabs
} from 'antd-mobile'
const TabPane = Tabs.TabPane;

import DayCell from './DayCell'

import _ from 'lodash'

import dateUtil from 'util/date'

import './DateSelect.less'

class DateSelectContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monthStep: 1,
      selectedDateArray: props.startDate ? [props.startDate] : [],
      step: 1, // 日历点击更多第几次
      long: 3 // 每次几个月
    }
  }

  renderWeekHeader() {
    const {intl} = this.props;
    const weekDayShortString = intl.locale == 'zh' ? dateUtil.weekdaysShortZhString : dateUtil.weekdaysShortUsString;
    return (<Flex className='week-header'>{weekDayShortString.split(',').map((week, i) => (
      <Flex.Item key={i} className={(i === 0 || i === 6) && 'color'}>
        {week}
      </Flex.Item>
    ))}</Flex>)
  }

  /**
   *  参考城市选择组件的一行4列结构 此处是一行7列的JSX
   *
   */
  renderListData(y, m) {
    const {
      flightLowestPriceData
    } = this.props;

    const {selectedDateArray} = this.state;
    const days = dateUtil.calendar.solarDays(y, m) // 当前月内有多少天
    const startWeek = dateUtil.getIsoWeekday(y, m, 1) // 当前月1号是周几
    const lowestMPrice = flightLowestPriceData ? flightLowestPriceData.min[m] : null;
    const selectedDate = this.state.selectedDateArray[0];
    const tempDate = new Date();
    let objStartDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
    if(selectedDate){
      objStartDate = new Date(selectedDateArray[0].cYear, selectedDateArray[0].cMonth - 1, selectedDateArray[0].cDay);
    }

    const dayMomentArrays = _.map(new Array(days), (item, i) => {
      if (!flightLowestPriceData) {
        // 没有低价信息 直接返回
        return {
          dateParam: { y, m, d: i+1 }
        }
      }

      // 拿到日期低价
      const objDayPrice = flightLowestPriceData.price[`${m}-${i+1}`];
      const dayPrice = objDayPrice && objDayPrice.minPrice;
      return {
        isLowest: dayPrice == lowestMPrice,
        dayPrice,
        dateParam: { y, m: m, d: i + 1 }
      }
    })

    // 返回flex列元素 isEmpty是否是空列 item列的数据对象
    const getFlexItemJsx = (isEmpty, item, i) => {
      if (isEmpty) {
        return <Flex.Item key={i} />
      } else {
        return <Flex.Item>
          <DayCell
            startDate={objStartDate}
            intl={this.props.intl}
            flightLowestPriceData={this.props.flightLowestPriceData}
            onSelect={this.onSelect2}
            date={item} />
        </Flex.Item>
      }
    }

    // 当前月1号对应到周几 通过此方法填充空格解决
    const fillWeekWhiteSpace = () => _.map(new Array(startWeek), (item, i) => getFlexItemJsx(true, null, -i))

    return dayMomentArrays.map((item, i, list) => {
      if (i === 0 || (i + startWeek) % 7 === 0) {
        const flexItems = <Flex className='week-container flex-no-margin' key={'flex' + i}>
          {i === 0 && fillWeekWhiteSpace()}
          { true && _.map(new Array(7 - (i === 0 ? startWeek : 0)),
          (item, j) => getFlexItemJsx(i + j >= list.length, list[i + j], i + j))}
        </Flex>
        i += 6
        return flexItems
      }
    })
  }

  /**
   * 生成月份数据 long表示最近几个月
   *
   */
  renderMonthData(monthCount) {
    const {
      step,
      long
    } = this.state;
    const { intl } = this.props

    return <div>
      {_.map(new Array(monthCount), (item, i) => {
        const date = dateUtil.getModifyObjDate(null, {y: 0, m: i, d: 0}, intl.locale);
        const monthSection = dateUtil.getStrDate({y: date.cYear, m: date.cMonth}, 'yyMM', intl.locale);
        return <div className='month-container' key={i}>
          <div className='month-section'>{monthSection}</div>
          {(this.renderListData(date.cYear, date.cMonth))}
        </div>
      })}
      <div className="footer">
        <div className='more' onClick={()=>{
              this.setState({step: step < 4 ? step + 1 : step });
            }}>
            {intl.messages['app.datePanel.viewMore']}
        </div>
      </div>
    </div>
  }

  renderDateSegment = () => {
    const {
      intl,
      activityKey
    } = this.props;

    const {
      selectedDateArray
    } = this.state;

    return <Tabs
      activeKey = {
        selectedDateArray.length.toString()
      }
      onChange = {
        (key) => {
          if (key === '0') {
            this.setState({
              selectedDateArray: []
            });
          }
        }
      } >
      {
        _.map(new Array(activityKey), (item, i) => {
          item = selectedDateArray[i];
          const tabPaneContent = <div className={item && 'am-tabs-tab-selected'}>
            <div className='title'>{i === 0 ? intl.messages['app.datePanel.arrDate'] : intl.messages['app.datePanel.depDate'] } </div>
            <div className='date'>{item && item.strDate }</div>
          </div>
          return <TabPane tab={tabPaneContent} key={i.toString()} />
        })
      }
    </Tabs>
  }

  onSelect2 = (dateObj) => {
    console.log('onSelect2');
    const {
      onClose,
      onSelect,
      activityKey
    } = this.props;

    let {
      selectedDateArray
    } = this.state;

    if (activityKey == 2) {
      // 选择出发时间
      if (selectedDateArray.length == 0) {
        selectedDateArray.push(dateObj);
        this.setState({
          selectedDateArray
        });
      } else { //选择返程时间
        selectedDateArray.push(dateObj);
        this.setState({
          selectedDateArray
        });
        onSelect(selectedDateArray);
        onClose();
      }
    } else {
      // 单程选择
      selectedDateArray.push(dateObj);
      onSelect(selectedDateArray);
      onClose();
    }
  }

  render() {
    const {
      step,
      long
    } = this.state;

    const { activityKey, intl } = this.props
    console.log('renderDate');

    return (
      <Flex className="csm-flex-column flex-no-margin" style={{ height:document.documentElement.clientHeight }}>
      <div className="cms-flex-header">
        <div className='calendar-header'>
          <NavBar onLeftClick={() => {
            this.props.onClose()
          }}>
            {intl.messages['app.datePanel.title']}
          </NavBar>
          { activityKey === 2 && this.renderDateSegment()}
          {this.renderWeekHeader()}
        </div>
      </div>
      <Flex.Item className='csm-flex-scroll-item'>
        <div className='calendar-content'>
          {this.renderMonthData(step * long)}
        </div>
        </Flex.Item>
      </Flex>
    )
  }
}

DateSelectContent.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

class DateSelect extends Component {

  onMaskClose = () => {
    // also support Promise
    // return new Promise((resolve) => {
    //   console.log('1000ms 后关闭');
    //   setTimeout(resolve, 1000);
    // });
  }

  // 参数为低价数据或者props中低价key值
  showPop = ({key, flightLowestPriceData}) => {

    if(key){
      flightLowestPriceData = this.props.flightLowestPriceData[key];
    }

    Popup.show(<DateSelectContent
      intl={this.props.intl}
      startDate={this.props.startDate}
      flightLowestPriceData={flightLowestPriceData}
      activityKey={this.props.activityKey}
      onSelect={this.props.onSelect}
      onClose={() => Popup.hide()} />, {
      animationType: 'slide-up'
    })
  }

  handleOnClick = (e) => {

    (e && e.preventDefault && e.preventDefault()) // 修复 Android 上点击穿透

    const {intl} = this.props

    // 拿到起始城市去请求低价 否则不请求低价
    const {
      startCity,
      backCity
    } = this.props;

    // 拿到低价数据
    if (intl.locale === 'zh' && startCity.id && backCity.id && !this.props.flightLowestPriceData[`${startCity.id}-${backCity.id}`]) {
      this.props.fetchFlightLowestPrice({
        depCity: startCity.id,
        arrCity: backCity.id
      }, intl.locale).then(result => {
        this.showPop({flightLowestPriceData: result});
      });
    } else {

      // 起始城市在props中的key值
      let key = null;

      // 存在起始城市设置key 否则不需要使用key
      if(startCity.id && backCity.id){
        key = `${startCity.id}-${backCity.id}`;
      }
      this.showPop({key})
    }
  }

  render() {
    const {
      value
    } = this.props;

    return (
      <div
        className={`date-select-input ${value.strDate? 'selected' : ''}`}
        onClick={this.handleOnClick} >
        <span
          className='select-date'>
          {(value.strDate || this.props.placeholder)}
        </span>
        <span className='select-week'>{value.isoWeek}</span>
      </div>
    )
  }
}

DateSelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.object,
  placeholder: PropTypes.string.isRequired
}

export default injectIntl(DateSelect)
