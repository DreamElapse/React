import React,{ Component } from 'react'
import NavBar  from 'components/Header'

import './DrawbackDetail.less'
import { dbMsg, buyList, dbList } from './data' 
import drawback from '../assets/drawback.png'

class DrawbackDetail extends Component{
    constructor (props) {
        super(props)
       
    }

    componentWillMount(){
        console.log('访问成功')
       
    }

    render(){
        return(
            <div className="Drawback">
                <NavBar router={this.props.router}  title="退款详情"></NavBar>
                <div className="top">
                    <span>退款成功<br /><em>2017年6月14日 22:22</em></span>
                    <img src={drawback} alt=""/>
                </div>
                <p className="price_all">退款总额&nbsp;&nbsp;&nbsp;&nbsp;<b>￥{dbMsg.money}.00</b></p>
                <div className="goods_list">
                    <h4>退款商品</h4>
                    <ul>
                        {
                            buyList.map((value) => {
                                return (
                                    <li>
                                        <img src={value.imgsrc} alt=""/>
                                        <div>
                                            <h5>{value.name}</h5>
                                            <p><span>{value.model}</span><span>X{value.quantity}</span></p>
                                        </div>
                                    </li>
                                )
                            })
                        }                        
                    </ul>
                </div>
                <div className="back_msg">
                    <h5>退款信息</h5>
                    <ul>
                        <li>退款原因：{dbMsg.reason}</li>
                        <li>退款金额：<b>￥{dbMsg.money}.00</b></li>
                        <li>申请时间：{dbMsg.date}</li>
                        <li>退款编号：{dbMsg.num}</li>
                    </ul>
                </div>
            </div>
        )
    }
} 

export default DrawbackDetail