import React,{Component} from 'react'
import NavBar from 'components/Header'
import './ApplyRefund.less'
import { ImagePicker,Icon } from 'antd-mobile'
import routerConfig from 'routes/routesConfig';
import { hashHistory } from 'react-router'
import goods from '../assets/goods_1.jpg'

class ApplyRefund extends Component{
    constructor(props){
        super(props)
        this.state = {
            files:[], 
            money:258,
            feight:0,
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
            <div className="applyRefund">
                <NavBar router={this.props.router} title="申请退款"></NavBar>
                <div className="appl_main">
                    <ul>
                        <li>
                            <h3>退款商品</h3>
                            <div className="top_item">
                                <img className="goods_pic" src={goods} alt="" />
                                <div>
                                    <h4>A Bathing Ape蓝染长袖衬衫</h4>
                                    <p><span>蓝色 XL</span><em>X1</em></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <p className="reason"><span>退款原因</span><input type="text" placeholder="请选择" /><Icon type="right" size={'0.4rem'} color={'#B7B7B7'}></Icon></p>
                            <p className="money"><span>退款金额</span><input type="text" placeholder={`￥${this.state.money}(最多 ${this.state.money}.00元，含发货运费${this.state.feight}.00元`} /></p>
                        </li>
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

export default ApplyRefund