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
            now_status1:'',
            now_status2:'',
            now_status3:'',
            click_num:'',
            files:[],
                
        }
    }
    
    componentWillMount() {
        console.log('访问成功')
        
        
    }

    componentDidMount(){
        for(let i=0;i<3;i++){

        
            this.setState({
                now_status:window.localStorage.getItem('appr_status')
            })

            const appr_num = window.localStorage.getItem('appr_num');

            for (let j = 0; j < appr_num; j++) {
                this.refs.appr_list.children[j].className = 'on'
            }
        }
      
    }

    appr_Click(i) {
        for (let k = 0; k < this.refs.appr_list.children.length; k++) {
            this.refs.appr_list.children[k].className = '';
        }
        for (let j = 0; j < i + 1; j++) {
            this.refs.appr_list.children[j].className = 'on'
        }
        this.setState({
            now_status: this.state.appr_status[i]
        })
        localStorage.appr_num = i+1;
        localStorage.appr_status = this.state.appr_status[i];
        console.log(window.localStorage)
    }
    

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
  
    render() {
        const li_list = [1, 2, 3, 4, 5];
        const { files } = this.state;
        return (
            <div className="product_appraise">
                <NavBar router={this.props.router} title="商品评价"></NavBar>

                <div className="top_appraise" id="top_appraise" >
                    <img className="goods_pic" src={goods} alt="" />
                    <ul ref="appr_list">
                        {
                            li_list.map((value, i) => {
                                return <li onClick={this.appr_Click.bind(this,i)}  key={'li'+i}></li>
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
                    <div>
                        <span>服务态度</span>
                        <ul ref="appr_list2">
                            {
                                li_list.map((value, i) => {
                                    return <li onClick={this.appr_Click.bind(this, i)}  key={'li2'+i}></li>
                                })
                            }
                        </ul>
                    </div>
                    <span>物流速度</span>
                </div>



            </div>

            
        )
    }
}

export default Appraise