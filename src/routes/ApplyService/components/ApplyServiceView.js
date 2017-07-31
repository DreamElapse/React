import React,{Component} from 'react'
import NavBar from 'components/Header'
import './ApplyService.less'
import { ImagePicker,Icon } from 'antd-mobile'

import goods from '../assets/goods_1.jpg'

class ApplyService extends Component{
    constructor(props){
        super(props)
        this.state = {
            files:[], 
            mo_back:true,
            moandpro_back:false,
            status_1:true,
            status_2:false,
        }
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        console.log('访问成功')
        
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }

    render(){
        const { files } = this.state;
        return(
            <div className="applyService">
                <NavBar router={this.props.router} title="申请售后"></NavBar>
                <div className="appl_main">
                    <ul>
                        <li>
                            <h3>售后商品</h3>
                            <div className="top_item">
                                <img className="goods_pic" src={goods} alt="" />
                                <div>
                                    <h4>A Bathing Ape蓝染长袖衬衫</h4>
                                    <p><span>蓝色 XL</span><em>X1</em></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <h3>申请服务</h3>
                            <div className="appl_item">
                                <label>
                                    <input type="radio" checked="checked" onChange={() => {this.setState({mo_back:true,moandpro_back:false})}} name="a"/>
                                    <span className={this.state.mo_back ? 'on' : ''}>退货退款</span>
                                </label>
                                <label>
                                    <input type="radio" onChange={() => {this.setState({mo_back:false,moandpro_back:true})}} name="a"/>
                                    <span className={this.state.moandpro_back ? 'on' : ''}>仅退款</span>
                                </label>
                            </div>
                        </li>
                        {this.state.moandpro_back && <li>
                                <p className="reason"><span>退款原因</span><input type="text" placeholder="请选择" /><Icon type="right" size={'0.4rem'} color={'#B7B7B7'}></Icon></p>
                            </li>
                        }
                        {this.state.mo_back && <li>
                                <p className="reason"><span>退货原因</span><input type="text" placeholder="请选择" /><Icon type="right" size={'0.4rem'} color={'#B7B7B7'}></Icon></p>
                            </li>
                        }
                        {this.state.moandpro_back && <li>
                            <h3>货物状态</h3>
                            <div className="appl_item">
                                <label>
                                    <input type="radio" checked="checked" onChange={() => {this.setState({status_1:true,status_2:false})}} name="a"/>
                                    <span className={this.state.status_1 ? 'on' : ''}>退货退款</span>
                                </label>
                                <label>
                                    <input type="radio"  onChange={() => {this.setState({status_1:false,status_2:true})}} name="a"/>
                                    <span className={this.state.status_2 ? 'on' : ''}>仅退款</span>
                                </label>
                            </div>
                        </li>}
                        <li><p><span>退款说明</span><input type="text" placeholder="选填" /></p></li>
                        <li>
                            <h3>上传凭证</h3>
                            <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 3}
                            />
                           
                        </li>
                    </ul>

                </div>
                <div className="submit_btn">立即申请</div>
            </div>
        )
    }
}

export default ApplyService