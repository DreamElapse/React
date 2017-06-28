import _ from 'lodash'
import {citySwitchData} from 'store/airPortData'

class Location {
  getLocation = () => {
    // 测试城市 return { latitude:41.108546, longitude:122.994646 }
    // return {latitude: 23.1827829, longitude: 113.25091599999999};
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude
        var orig = {
          'latitude': latitude,
          'longitude': longitude
        }
        return orig
      }, () => {
        return undefined
      })
    }
  }

  // 根据地图数据返回最近的城市
  getNearestCity = mapsJson => {
    var nearestAirport = 'PEK'

    const location = this.getLocation()
    if (!location) {
      return nearestAirport
    }

    // 拿到所有的对象数组
    const objectArray = Object.keys(mapsJson).map(key => mapsJson[key])

    // 此部分GPS定位原理系参考iOS客户端的代码
    _.each(objectArray, item => {
      if (!item['latitude']) {
        return
      }
      if(citySwitchData.entities.citySwitch[nearestAirport] != null){
         nearestAirport = citySwitchData.entities.citySwitch[nearestAirport].toId;
      }

      var nearestLocation = {
        'latitude': mapsJson[nearestAirport]['latitude'],
        'longitude': mapsJson[nearestAirport]['longitude']
      }
      var cityLocation = {
        'latitude': item['latitude'],
        'longitude': item['longitude']
      }

      var neareatDistance = this.getDistance(location, nearestLocation)
      var cityDistance = this.getDistance(location, cityLocation)

      var neareatNum = neareatDistance
      var cityNum = cityDistance

      if (neareatNum > cityNum) {
        nearestAirport = item.id
      }
    })

    return nearestAirport
  }
    /*
    计算两个坐标点之间得距离
    */
  getDistance = (pos1, pos2) => {
    var lat1 = pos1.latitude
    var lng1 = pos1.longitude
    var lat2 = pos2.latitude
    var lng2 = pos2.longitude

    var radLat1 = this.Rad(lat1)
    var radLat2 = this.Rad(lat2)
    var a = radLat1 - radLat2
    var b = this.Rad(lng1) - this.Rad(lng2)
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137 // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000 // 输出为公里
      // s=s.toFixed(4);
    return s
  }

  Rad = (d) => {
    var PI = Math.PI
    return d * PI / 180
  }
}

export default Location
