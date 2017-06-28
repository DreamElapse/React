import React, {
  Component,
  PropTypes
} from 'react'

import {
  NavBar,
  SearchBar,
  Tabs,
  ListView,
  List,
  Tag,
  Flex,
  Badge,
  Icon
} from 'antd-mobile'
const TabPane = Tabs.TabPane

import classnames from 'classnames'
import _ from 'lodash'

import { getCitySearchHistory, addCitySearchHistory } from 'util/cookie.util'

import Location from 'util/location.util'
const location = new Location()

import locationImg from '../assets/location.png'
import './CitySelect.less'

const transDataFunc = (arrayData, locale) => {

  // 声明数组，修复本地排序localCompare不支持问题
  const prefixWord = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  arrayData.sort(function (a, b) {
    // 此处ant-mobile有兼容问题 待修复
    // console.log(a.CITY_ENNAME.substr(0,1),b.CITY_ENNAME.substr(0,1));
    // console.log(a.CITY_ENNAME,b.CITY_ENNAME);
    const prefixA = prefixWord.indexOf(a.CITY_ENNAME.substr(0,1)), prefixB = prefixWord.indexOf(b.CITY_ENNAME.substr(0,1));
    if(prefixA > prefixB){
        return 1;
    }else if(prefixA == prefixB){
        return 0;
    }else{
        return -1;
    }
    // return a.CITY_ENNAME.substr(0,1).localeCompare(b.CITY_ENNAME.substr(0,1));
  })
  var transData = {}
  arrayData.forEach(item => {
    item.QF = item.CITY_ENNAME[0].toUpperCase()
    transData[item.QF] = transData[item.QF] || []
    transData[item.QF].push(item)
  })

  // ant-mobile控件用
  /*
  const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID]
  const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID]
  const dataSource = new ListView.DataSource({
    getRowData,
    getSectionHeaderData: getSectionData,
    rowHasChanged: (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  }) */

  const dataBlob = {}
  const sectionIDs = []
  const rowIDs = []
  Object.keys(transData).forEach((item, index) => {
    sectionIDs.push(item)
    dataBlob[item] = item
    rowIDs[index] = []

    transData[item].forEach((jj) => {
      rowIDs[index].push(jj.key)
      dataBlob[jj.key] = locale == 'zh' ? jj.CITY_CNNAME : jj.CITY_ENNAME
    })
  })
  return { dataBlob, sectionIDs, rowIDs }
  // return dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}

export default class CitySelectContent extends Component {
  constructor (props) {
    super(props)
    const data = props.airPortData[1]
    const arrayData = [] // 新的数据集合
    const domesticArray = [] // 国内数据
    const internationalArray = [] // 国际数据
    const hotArray = [] // 热门数据
    const cityAirportObj = {} // 机场对应城市数据封装

    Object.keys(data).forEach(key => {
      data[key].key = key

      // 集合数据 给搜索用
      arrayData.push(data[key])

      // 国内和国际数据存储
      if (data[key].isdomestic === '1') {
        domesticArray.push(data[key])
      } else {
        internationalArray.push(data[key])
      }
      // 热门数据存储
      if (data[key].ishot === 'yes') {
        hotArray.push(data[key])
      }

      // 城市对应机场数据 搜索用
      if (cityAirportObj[data[key].CITY_CODE]) {
        cityAirportObj[data[key].CITY_CODE].push(data[key])
      } else {
        cityAirportObj[data[key].CITY_CODE] = []
        cityAirportObj[data[key].CITY_CODE].push(data[key])
      }
    })

    this.state = {
      data,
      arrayData,
      domesticSource: transDataFunc(domesticArray, this.props.intl.locale),
      internationalSource: transDataFunc(internationalArray, this.props.intl.locale),
      cityAirportObj,
      hotArray,
      historyArray: getCitySearchHistory() || [],
      currentCity: this.getLocation(data),
      activityKey: '1', // 搜索是否激活
      focusedState: 0, // 0 默认展示视图 1.搜索框获得焦点 2.搜索框搜索结果
      searchValue: '' // 搜索值
    }

  }

  getLocation = (data) => {
    const orig = location.getLocation();
    if(orig){
       return data[location.getNearestCity(data)];
    }
  }
  // 热门城市/搜索历史
  renderTagList = (isHot) => {
    const { hotArray, historyArray, currentCity } = this.state

    // 返回flex列元素 isEmpty是否是空列 item列的数据对象
    const getFlexItemJsx = (isEmpty, item) => {
      if (isEmpty) {
        return <Flex.Item />
      } else {
        if(item == null){ // 当前城市
          return <Flex.Item >
            <Tag
              disabled = {true}
              className='city-tag'
              selected={true}
              onChange={() => {
                // 重新获取定位
                this.getLocation();
              }}>
              <img src={locationImg} />
              { this.props.intl.locale == 'zh' ? "获取定位" : "LOCATION"}
            </Tag>
          </Flex.Item>
        }

        return <Flex.Item >
          <Tag
            className='city-tag'
            onChange={() => {
              this.props.onSelect(item)
              this.props.onClose()
              addCitySearchHistory(item)
            }}>
            { this.props.intl.locale == 'zh' ? item.CITY_CNNAME : item.CITY_ENNAME}
          </Tag>
        </Flex.Item>
      }
    }

    /**
     *  返回Flex结构一行4列的JSX
     *
     * @return
     * exmples:
       * <Flex>
       *  <Flex.Item></Flexau.Item>
       *  <Flex.Item></Flex.Item>
       *  <Flex.Item></Flex.Item>
       *</Flex>
       * <Flex>
       *  <Flex.Item></Flex.Item>
       *  <Flex.Item></Flex.Item>
       *  <Flex.Item></Flex.Item>
       *</Flex>
       */
    let data = []
    if (isHot) {
      data = hotArray
    } else {
      data = [currentCity, ...historyArray];
    }
    return data.map((city, i, list) => {
      if (i % 3 === 0) {
        const flexItems = <Flex key={'flex' + i}>
          {getFlexItemJsx(i >= list.length, list[i])}
          {getFlexItemJsx(i + 1 >= list.length, list[i + 1])}
          {getFlexItemJsx(i + 2 >= list.length, list[i + 2])}
        </Flex>
        i += 2
        return flexItems
      }
    })
  }

  moveToTop = (name) => {
    // 拿到基本文字大小
    /*const baseFontSize = parseFloat(document.documentElement.style.fontSize.replace('px'));
    console.log(j ,i , baseFontSize*0.8*j + baseFontSize*0.24*1.15*i); */
    this.refs.cityListContainer.scrollTop = document.getElementsByName(name)[0].offsetParent.offsetTop+document.getElementsByName(name)[0].offsetTop - this.refs.scrollContainer.offsetTop;
  }

  // 返回城市搜索结果视图
  renderSearchResultView () {
    const { focusedState, searchValue, arrayData, cityAirportObj } = this.state
    const {intl} = this.props;

    const putCitysArray = [] // 已经显示的城市集合 防止同一个城市下多个机场导致城市重复渲染
    // 渲染数据
    const searchResultList = arrayData.filter(item => {
      if (searchValue === '') {
        return false
      }
      return (
        item.AIRPORT_CNNAME.indexOf(searchValue) > -1 ||
        item.CITY_CODE.indexOf(searchValue.toUpperCase()) > -1 ||
        item.en_us.toUpperCase().indexOf(searchValue.toUpperCase()) > -1 ||
        item.CITY_CNNAME.toUpperCase().indexOf(searchValue.toUpperCase()) > -1 ||
        item.zh_cn.indexOf(searchValue) > -1 ||
        item.id.indexOf(searchValue) > -1 ||
        item.filterkeyword.toUpperCase().indexOf(searchValue.toUpperCase()) > -1 ||
        item.CITY_ENNAME.toUpperCase().indexOf(searchValue.toUpperCase()) > -1
      )
    }).filter((item, i) => {
      return i < 100 // 只显示搜索结果的前100条数据
    })

    // 根据类型返回不同格式Item
    // type 1:机场 2:城市 3：城市机场
    const getItem = (item, type, i) => {
      const clsName = classnames({
        'badge': true,
        'airport-badge': type === 1,
        'city-badge': type === 2,
        'city-airport-badge': type === 3
      })
      return <List.Item
        onClick={() => {
          this.props.onSelect(item)
          this.props.onClose()
          addCitySearchHistory(item)
        }}
        key={i} >
        <Badge text={type === 2 ? intl.messages['app.cityPanel.city'] : intl.messages['app.cityPanel.airport'] } className={clsName} />
        <span className='name'>{type === 2 ? (intl.locale == 'zh' ? item.CITY_CNNAME : item.CITY_ENNAME) : (intl.locale === 'zh' ? item.zh_cn: item.en_us)}</span>
        <span className='detail'>{item.id}</span>
      </List.Item>
    }

    return <List className={`result-view ${focusedState == 1 ? 'am-popup-mask' : ''}`}>
      {searchResultList.map((item, i) => {
          // 已经显示的城市不再显示
        if (putCitysArray.indexOf(item.CITY_CODE) > -1) {
          return
        }

          // TODO 如果搜索词符合城市相关属性
        if (
              item.CITY_CODE.indexOf(searchValue.toUpperCase()) > -1 ||
              item.CITY_CNNAME.toUpperCase().indexOf(searchValue.toUpperCase()) > -1 ||
              item.CITY_ENNAME.toUpperCase().indexOf(searchValue.toUpperCase()) > -1
           ) {
            //
            // 显示过的城市保存起来
          putCitysArray.push(item.CITY_CODE)

            // TODO 如果需要显示城市 城市下面的机场都显示
          const airportsView = cityAirportObj[item.CITY_CODE].map((item, i) => {
              // 显示城市下多个机场
            return getItem(item, 1, i)
          })

          return [getItem(item, 2, i), airportsView]
        } else {
            // 直接显示机场
          return getItem(item, 3, i)
        }
      })}
    </List>
  }

  renderDomDefaultView = () => {
    const { focusedState } = this.state
    const {intl} = this.props;
    return <div className="default-view" style={{display: focusedState == 2 ? 'none' : 'block'}}>
      <h4 className='hline' id="targetT0">{intl.messages['app.cityPanel.locationAndHistory']}</h4>
      <div className='city-tag-container'>
        {(this.renderTagList())}
      </div>
      <h4 className='hline' id="targetT1">{intl.messages["app.cityPanel.hotCity"]}</h4>
      <div className='city-tag-container'>
        {(this.renderTagList(true))}
      </div>
      <h4 className='hline'>{intl.messages["app.cityPanel.order"]}</h4>
      <div ref='listContent' />
    </div>

  }

  // 原生DOM插入实现 tab切换速度快
  onDomCreate = (key) => {
    const { domesticSource, internationalSource, data } = this.state
    const dataSource = key === '2' ? internationalSource : domesticSource
    const { dataBlob, sectionIDs, rowIDs } = dataSource
    let itemListStr = ''
    const getItems = (items) => {
      return items.reduce((previousValue, currentValue, index, array) => {
        return previousValue +
          `<div id=${currentValue} class='am-list-item am-list-item-middle'>
            <div class='am-list-line'>
              <div class='am-list-content'>${dataBlob[items[index]]}</div>
            </div>
          </div>`
      }, '')
    }

    rowIDs.forEach((items, i) => {
      itemListStr += `
        <div id=${'target' + sectionIDs[i] } class='am-list-header'>${sectionIDs[i]}</div>
        <div class='am-list-body'>
          ${getItems(items)}
        </div>`
    })

    const listContentWraper = `
      <div class='am-list my-list'>
       ${itemListStr} 
      </div>`

    const searchBarItems = sectionIDs.reduce((previousValue, currentValue, index, array) => {
      return previousValue + `<li id=${array[index]}>${array[index]}</li>`
    }, `<li id='T0'>...</li>
        <li id='T1'>...</li>`)

    const searchBarWraper = `
     <ul class='am-indexed-list-quick-search-bar' >
        ${searchBarItems}
      </ul> 
    `

    this.refs.listContent.innerHTML = listContentWraper
    this.refs.quickSearchBar.innerHTML = searchBarWraper;

    // 添加点击事件
    rowIDs.forEach((items, i) => {
      document.getElementById(sectionIDs[i]).addEventListener('click', () => {
        const targetSection = document.getElementById('target' + sectionIDs[i]);
        this.refs.cityListContainer.scrollTop  = targetSection.offsetTop + targetSection.offsetParent.offsetTop - this.refs.cityListContainer.offsetTop;

        //this.animateScrool(this.refs.cityListContainer.scrollTop, targetSection.offsetTop);
      });

      items.forEach(item => {
        document.getElementById(item).addEventListener('click', () => {
          this.props.onSelect(data[item])
          this.props.onClose()
          addCitySearchHistory(data[item])
        })
      })
    })

    _.forEach(['T0', 'T1'], item => {
      document.getElementById(item).addEventListener('click', () => {
        const targetSection = document.getElementById('target' + item);
        this.refs.cityListContainer.scrollTop = targetSection.offsetTop;

        //this.animateScrool(this.refs.cityListContainer.scrollTop, targetSection.offsetTop);

      })
    });
  }

  animateScrool(scrollTop, endScrollTop){
    let scrollDistance = endScrollTop - scrollTop;
    const timeScroll = scrollDistance / 5;
    let time_id = setInterval(()=>{
      scrollTop += timeScroll;
      this.refs.cityListContainer.scrollTop = scrollTop;
      let result = false;
      if(scrollDistance < 0){
        result = scrollTop < endScrollTop;
      }else{
       result = scrollTop > endScrollTop;
     }
      if(result){
        clearInterval(time_id);
      }
    } , 100);
  }
  componentDidMount () {
    const _this = this
    setTimeout(()=>{_this.onDomCreate()}, 100)
  }

  render () {
    console.log('renderSelectContent');
    const { activityKey, searchValue, focusedState } = this.state
    const { intl } = this.props

    const scrollWrapStyle={
      height:document.documentElement.clientHeight
    }

    const headerHeight = focusedState == 0 ?  '2.43rem' : '1.78rem' ;
    return (
    <div style={{height:document.documentElement.clientHeight}}>
      <div style={{height:headerHeight,width:'100%', position:"fixed", top:0, zIndex:999}}>
       <NavBar className='test'
          onLeftClick={() => {
            this.props.onClose()
          }}>
         {intl.messages['app.cityPanel.title']}
        </NavBar>
        <SearchBar
          placeholder={intl.messages['app.cityPanel.searchPlaceHolder']}
          focused={this.state.focusedState}
          onFocus={(e) => {
            // 防止重新自动onFocus 从2变成1
            if(focusedState == 0 && !searchValue){
             this.setState({
                focusedState: 1
              })
            }else if(searchValue){
              this.setState({
                focusedState: 2
              });
            }
          }}
          onCancel={() => {
            this.setState({
              focusedState: 0
            })
          }}
          onSubmit={
          value => {
            this.setState({ focusedState: 2, searchValue: value })
          }
        }/>

      {focusedState == 0 && <Tabs style={{width: '100%' }}
          defaultActiveKey={activityKey}
          swipeable={false}
          onChange={(key) => {
            this.onDomCreate(key)
            // this.setState({activityKey: key});
          }}>
          <TabPane tab={intl.messages['app.cityPanel.domestic']} key='1' />
          <TabPane tab={intl.messages['app.cityPanel.international']} key='2' />
        </Tabs>
      }
      </div>
      <div ref='cityListContainer' style={{"paddingRight":"30px", width:'100%',position:'fixed',"top":headerHeight,"bottom":0,"overflow":"scroll","background":"white"}} className='city-list-container'>
        {this.renderDomDefaultView()}
        {!!focusedState && this.renderSearchResultView()}
      </div>
      <div ref='quickSearchBar' />
    </div>
    )
  }
}

CitySelectContent.propTypes = {
  airPortData: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}
