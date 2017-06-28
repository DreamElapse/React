import React,{ Component } from 'react'
import { findDOMNode } from 'react-dom'
import NavBar  from 'components/Header';

import './OrderDetail.less'
import topImg from '../assets/top.jpg'
import topImg2 from '../assets/top_2.jpg'
import ziqu from '../assets/ziqu.png'
import flight from '../assets/flight.png'
import store from '../assets/store.png'
import position from '../assets/position.png'

import { formMsg, formMsg2, buyList, formDetail } from './data'

class OrderDetail extends Component{

    constructor (props) {
        super (props)
        this.state = {
            display1 : 'block',
            display2 : 'none',
            display3 : 'none'
        }
    }

    componentWillMount(){
       
       
    }

    render(){
       const display1 = {
           display: this.state.display1
       }
       const display2 = {
           display: this.state.display2
       }
       const display3 = {
           display: this.state.display3
       }
       const _self = this;
        const clickSwit = () => {

            let formMsg = findDOMNode(this.refs.click);
            if(formMsg.style.display === 'block'){
                console.log(1)
                _self.setState({
                    display1 : 'none',
                    display2 : 'block',
                    display3 : 'block'
                })
            }else{
                console.log(2)
                _self.setState({
                    display1 : 'block',
                    display2 : 'none',
                    display3 : 'none'
                })
            }
        }
        return(
            
            <div className="Orderdetail">
                <NavBar router={this.props.router}  title="订单详情"></NavBar>
                <img style={display1} src={topImg} onClick={clickSwit} alt=""/>
                <img style={display3} src={topImg2} onClick={clickSwit} alt=""/>
                <div className="topMsg" style={display1} ref="click">
                    <p><img src={ziqu} alt=""/><span>收货人：{formMsg.name}</span><span>{formMsg.call}</span></p>
                    <p>航班：{formMsg.from}<img src={flight} />{formMsg.to}</p>
                    <p>出发时间：{formMsg.date}</p>
                    <p><span>乘坐航班：{formMsg.flight}</span><span>舱位：{formMsg.shipSpace}</span></p>
                </div>
                <div className="topMsg2" style={display2} ref="click2">
                    <p><img src={position} alt=""/><span>收货人：{formMsg2.name}</span><span>{formMsg2.call}</span></p>
                    <p>收货地址：{formMsg2.address}</p>
                </div>

                <div className="orderList">
                    <h3><img src={store} alt=""/>南方航空旗舰店</h3>
                    <ul>
                        {
                            buyList.map((value) => {
                            
                                return (
                                    <li>
                                        <img src={value.imgsrc} alt=""/>
                                        <div>
                                            <h4>{value.name}</h4>
                                            <p><span>{value.model}</span><span>X{value.quantity}</span></p>
                                            <p><em>￥{value.price}</em><a id="apply_back" style={display1} href="javascript:;">申请退款</a><a id="custor_service" style={display2} href="javascript:;">申请售后</a></p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        
                    </ul>
                </div>

                <div className="formDetail">
                    <ul>
                        <li>订单编号：{formDetail.a}</li>
                        <li>下单时间：{formDetail.b}</li>
                        <li>支付方式：{formDetail.c}</li>
                        <li>配送方式：{formDetail.d}</li>
                        <li><span>发票类型：{formDetail.e}</span><br />
                            <span>发票抬头：{formDetail.f}</span><br />
                            <span>企业名称：{formDetail.g}</span><br />
                            <span>发票内容：明细</span>
                        </li>
                        <li>
                            <p><span>商品总额：</span><em>￥{formDetail.h}</em></p>
                            <p><span>运费：</span><em>￥{formDetail.i}.00</em></p>
                            <p><span>优惠：</span><em>￥{formDetail.j}.00</em></p>
                        </li>
                        <li>实付款：<em>￥{formDetail.k}.00</em></li>
                    </ul>
                </div>

                <div className="bottom" style={display1}>
                    <a className="revise" href="javascript:;">修改地址</a>
                    <a className="again" href="javascript:;">再次购买</a>
                </div>
                <div className="bottom2" style={display2}>
                    <a className="logistics" href="javascript:;">查看物流</a>
                    <a className="appraise" href="javascript:;">评价</a>
                </div>
                <br />
                <br />
                <br />
            </div>
        )
    }
    
}

export default OrderDetail