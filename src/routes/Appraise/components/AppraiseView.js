import React, { Component } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { mount } from 'enzyme'
import NavBar from 'components/Header'
import { ImagePicker } from 'antd-mobile'
import './Appraise.less'

import goods from '../assets/goods.jpg'
import appraise from '../assets/appraise.png'
import appraise_on from '../assets/appraise_on.png'

class Appraise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appr_status: ['非常差', '差', '一般', '好', '非常好'],
            now_status:'',
            now_status2:'',
            now_status3:'',
            appr_num:0,
            appr_num2:0,
            appr_num3:0,
            files:[],
                
        }
    }
    
    componentWillMount() {
        console.log('访问成功')
        
        
    }

    componentDidMount(){
        
    }

    appr_Click(i) {
        this.setState({
            appr_num:i+1,
            now_status:this.state.appr_status[i]
        })
    }

    appr_Click2(i) {
        this.setState({
            appr_num2:i+1,
            now_status2:this.state.appr_status[i]
        })
    }

    appr_Click3(i) {
        this.setState({
            appr_num3:i+1,
            now_status3:this.state.appr_status[i]
        })
    }
    

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
  
    render() {
        const { files } = this.state;

        return (
            <div className="product_appraise">
                <NavBar router={this.props.router} title="商品评价"></NavBar>

                <div className="top_appraise" id="top_appraise" >
                    <img className="goods_pic" src={goods} alt="" />
                    <ul ref="appr_list1" name="2">
                        {
                            this.state.appr_status.map((value, i) => {
                                const class_on = this.state.appr_num > i ? 'on' : '';
                                return <li onClick={this.appr_Click.bind(this, i)}  className={class_on} key={'li'+i}></li>
                            })
                        }
                    </ul>
                    <span className="appr_status">{this.state.now_status}</span>
                </div>

                <div className="appr_main">
                    <h5>填写心得</h5>
                    <textarea name="" placeholder="分享你的购物心得"></textarea>
                </div>

                <div className="appr_pic">
                    <h5>上传产品图片</h5>
                    <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 4}
                    />
                    <p><span>匿名</span><em>你填写的评价会以匿名的形式展现</em></p>
                </div>

                <div className="appr_store">
                    <h5>店铺评分</h5>
                    <div className="bot_appraise">
                        <span>服务态度</span>
                        <ul ref="appr_list2">
                            {
                                this.state.appr_status.map((value, i) => {
                                    const class_on = this.state.appr_num2 > i ? 'on' : '';
                                    return <li onClick={this.appr_Click2.bind(this, i)} className={class_on}  key={'li2'+i}></li>
                                })
                            }
                        </ul>
                        <em>{this.state.now_status2}</em>
                    </div>
                    <div className="bot_appraise">
                        <span>服务态度</span>
                        <ul ref="appr_list3">
                            {
                                this.state.appr_status.map((value, i) => {
                                    const class_on = this.state.appr_num3 > i ? 'on' : '';
                                    return <li onClick={this.appr_Click3.bind(this, i)} className={class_on}  key={'li3'+i}></li>
                                })
                            }
                        </ul>
                        <em>{this.state.now_status3}</em>
                    </div>
                </div>

                <br />
                <br />
                <br />

            </div>

            
        )
    }
}

export default Appraise