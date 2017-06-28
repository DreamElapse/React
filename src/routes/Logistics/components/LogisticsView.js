import React,{ Component } from 'react'
import NavBar  from 'components/Header';
import { GoodsMSG, TransportStatus } from './data'
import './Logistics.less'
import goods from '../assets/goods.jpg'


class Logistics extends Component{

    constructor (props) {
        super (props)
        
        
    }

    componentWillMount(){
       
       
    }

    
    render(){
        return(
            
            <div className="Logistics">
                <NavBar router={this.props.router}  title="查看物流"></NavBar>
                <div className="top">
                    <img className='good_pic' src={goods} />
                    <ul className="top_r">
                        <li>订单编号：{GoodsMSG.oderNumber}</li>
                        <li>物流公司：{GoodsMSG.logisticsCompany}</li>
                        <li>运单号：{GoodsMSG.wayNumber}</li>
                        <li>物流状态：<span>{GoodsMSG.status}</span></li>
                    </ul>
                </div>
                <div className="Tstatus">
                    <h3>本数据由{GoodsMSG.logisticsCompany}提供</h3>
                    <ul>
                        {  /* 遍历物流信息 */
                            TransportStatus.map((value) => {  
                                return (
                                    <li>
                                        <span>{value.date}</span>
                                        <p>{value.status}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <br /><br /><br />
            </div>
        )
    }
    
}

export default Logistics