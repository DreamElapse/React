import React, {
  PropTypes
} from 'react'
import classnames from 'classnames'
import dateUtil from 'util/date'

import Touchable from 'rc-touchable'

const DayCell = ({
  intl,
  startDate,
  flightLowestPriceData,
  date,
  onSelect
}) => {
  const lunar = dateUtil.calendar.solar2lunar(date.dateParam.y, date.dateParam.m , date.dateParam.d, intl.locale)
  // 时间不可用 当前日期小于开始日期不可用
  const disabled = lunar.objDate < startDate;
  let daycellContainer = classnames({
    'daycell-container': true
  })

  let daycellWraper = classnames({
    'daycell': true,
    'today': lunar.isToday, // day.isSame(moment(), 'day')
    'holiday': lunar.Term || lunar.holiday || lunar.nWeek == 0 || lunar.nWeek == 6,
    disabled
  })

  let priceWraper = classnames({
    'price': true,
    'lowest': date.isLowest
  })

  let dayWraper = classnames({
    'day': true,
  });


  let dayText = lunar.cDay;
  if(intl.locale == 'zh'){
    dayText = lunar.isToday ? '今天' :
      (lunar.Term ? lunar.Term : (lunar.holiday ? lunar.holiday : lunar.cDay));

  }
  return (
    <Touchable activeClassName="day-active" disabled={disabled} >
      <div className={daycellContainer} >
          <div className={daycellWraper} onClick={() => {
            if(disabled) return;
            onSelect(lunar)
          }} >
          <div className={dayWraper}>{dayText}</div>
          <div className={priceWraper}>{date.dayPrice && `￥${date.dayPrice}`}&nbsp;</div>
        </div>
      </div>
    </Touchable>
  )
}

DayCell.propTypes = {
  dateString: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default DayCell
