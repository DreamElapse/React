/**
 *  城市选择控件 默认渲染一个文本框 点击后弹出整页城市选择框
 *
 */
import React, {
  Component,
  PropTypes
} from 'react'

import {injectIntl} from 'react-intl'

import {
  Popup
} from 'antd-mobile'

import CitySelectContent from './CitySelectContent'

import classnames from 'classnames'

class CitySelect extends Component {
  constructor(props) {
    super(props);
  }
  showPopup = (airPortData) => {
    Popup.show(<div>
      <CitySelectContent
        intl={this.props.intl}
        airPortData={airPortData}
        onSelect={this.props.onSelect}
        onClose={() => {
          //document.getElementById("root").style.display = 'block';
          Popup.hide();
        }} />
      </div>, { animationType: 'slide-up' })
  }

  handleOnClick = (e) => {
    (e && e.preventDefault && e.preventDefault()) // 修复Android上点击穿透

    if (this.props.airPortData) {
      this.showPopup(this.props.airPortData)
    }
  }
  componentDidMount() {
    const airportData = localStorage.getItem("airportJSON_New");
    let airportDataVersion = '';
    if(airportData){
      airportDataVersion = JSON.parse(airportData)[0];
    }
    this.props.fetchAirPortData(airportDataVersion);
  }
  render () {
    const {intl} = this.props;
    var clswraps = classnames({
      'city-select-input': true,
      'selected': this.props.value.CITY_CNNAME
    })
    let cityName;
    if( intl.locale == 'zh'){
      cityName = this.props.value.CITY_CNNAME || this.props.placeholder;
    }else{
      cityName = this.props.value.CITY_ENNAME || this.props.placeholder;
    }
    return (
      <div
        className={clswraps}
        onClick={this.handleOnClick} >
        {cityName}
      </div>
    )
  }
}

CitySelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
  airPortData: PropTypes.array,
  fetchAirPortData: PropTypes.func.isRequired,
  value: PropTypes.object,
  placeholder: PropTypes.string.isRequired

}

export default injectIntl(CitySelect)
