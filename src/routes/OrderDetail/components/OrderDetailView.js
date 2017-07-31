import React,{ Component } from 'react'
import { findDOMNode } from 'react-dom'
import NavBar  from 'components/Header';
import { api } from 'services'
import './OrderDetail.less'
import top_bg from '../assets/top_bg.jpg'
import paid from '../assets/paid.png'
import ziqu from '../assets/ziqu.png'
import flight from '../assets/flight.png'
import store from '../assets/store.png'
import position from '../assets/position.png'

import { formMsg, formMsg2, buyList, formDetail } from './data'

class OrderDetail extends Component{

    constructor (props) {
        super (props)
        this.state = {
            freeduty:false,
            show_btn:true,
            arr:[ '等待付款','等待卖家发货','卖家已发货','交易成功','交易关闭'],
            status:3,
            stat_text:'',
            endTime:'01小时40分钟',
        }
    }

    componentWillMount(){
        if(this.state.status == 0 || this.state.status == 4){
            
            this.setState({
                show_btn:false,
            })
        }
        this.setState({
            stat_text:this.state.arr[this.state.status],
        })
       
    }

    render(){
       
        return(
            
            <div className="Orderdetail">
                <NavBar router={this.props.router}  title="订单详情"></NavBar>
                
                <div className="top">
                    <img className="top_bg" src={top_bg}  alt=""/>
                    <span className={this.state.status == 0 ? 'short_top' : ''}>{this.state.stat_text}<br />{this.state.status == 0 && <em>剩余：{this.state.endTime}</em>}</span>
                    <img className="paid" src={paid} alt=""/>
                </div>
                {this.state.freeduty && <div className="topMsg">
                    <p><img src={ziqu} alt=""/><span>收货人：{formMsg.name}</span><span>{formMsg.call}</span></p>
                    <p>航班：{formMsg.from}<img src={flight} />{formMsg.to}</p>
                    <p>出发时间：{formMsg.date}</p>
                    <p><span>乘坐航班：{formMsg.flight}</span><span>舱位：{formMsg.shipSpace}</span></p>
                </div>}
                {this.state.freeduty || <div className="topMsg2">
                    <p><img src={position} alt=""/><span>收货人：{formMsg2.name}</span><span>{formMsg2.call}</span></p>
                    <p>收货地址：{formMsg2.address}</p>
                </div>}

                <div className="orderList">
                    <h3><img src={store} alt=""/>南方航空旗舰店</h3>
                    <ul>
                        {
                            buyList.map((value,i) => {
                                let btn_list = '申请退款'
                                if(value.service) btn_list = value.service;
                                return (
                                    <li key={'od'+i}>
                                        <img src={value.imgsrc} alt=""/>
                                        <div>
                                            <h4>{value.name}</h4>
                                            <p><span>{value.model}</span><span>X{value.quantity}</span></p>
                                            <p><em>￥{value.price}</em>{this.state.show_btn && <a id="apply_back"  href="javascript:;">{btn_list}</a>}</p>
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
                            <p><span>商品总额</span><em>￥{formDetail.h}</em></p>
                            <p><span>运费</span><em>￥{formDetail.i}.00</em></p>
                            <p><span>优惠</span><em>￥{formDetail.j}.00</em></p>
                        </li>
                        <li>实付款：<em>￥{formDetail.k}.00</em></li>
                    </ul>
                </div>
                {this.state.status == 0 && <div className="bot_btns">
                    <a href="javascript:;">去支付</a>
                    <a href="/logistics">取消订单</a>
                    <a href="javascript:;">联系卖家</a>
                </div>}
                {this.state.status == 1 && <div className="bot_btns">
                    <a className="tel" href="javascript:;">联系卖家</a>
                </div>}
                {this.state.status == 2 && <div className="bot_btns">
                    <a href="javascript:;">确认收货</a>
                    <a href="javascript:;" onClick={() => {api.push('/logistics')}}>查看物流</a>
                    <a href="javascript:;">联系卖家</a>
                </div>}
                {this.state.freeduty && <div className="bot_btns">
                    <a className="tel" href="javascript:;">联系卖家</a>
                </div>}
                {this.state.status == 3 && <div className="bot_btns">
                    <a href="javscript:;" onClick={() => {api.push('/addappraise')}}>评价</a>
                    <a href="javascript:;" onClick={() => {api.push('/logistics')}}>查看物流</a>
                </div>}
                {this.state.status == 4 && <div className="bot_btns">
                    <a href="javascript:;">再次购买</a>
                    <a href="javascript:;">删除订单</a>
                    <a href="javascript:;">联系卖家</a>
                </div>}
                
                
            </div>
        )
    }
    
}

export default OrderDetail