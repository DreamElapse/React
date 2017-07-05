import React,{Component} from 'react'
import NavBar from 'components/Header'
import { Tabs, WhiteSpace } from 'antd-mobile'

import './Mycollect.less'
import { goods_list } from './data'

import icon_edit from '../assets/edit.png'



class Mycollect extends Component{
    constructor (props) {
        super(props)
        this.state = {
            show:'',
            main_show:0,
            
        }
    }

    componentWillMount(){
        console.log('访问成功');
    }

    componentDidUpdate(){
        console.log(this.state)
        
    }
    tabClick(i){
        this.setState({
            show:i,
            main_show:i
            
        })
    }
    render(){
        const top_tab = ['商品','店铺','内容'];

        return(
            
            <div className="Mycollect">
                <NavBar router={this.props.router} title="查看物流" ></NavBar>
                
                <div className="tab_nav">
                    <ul ref="tab_list">
                        {
                            top_tab.map((value,i) => {
                                const class_show = this.state.show == i ? 'on' : '';
                                return <li key={'tab'+i} className={class_show}  onClick={this.tabClick.bind(this,i)}>{value}</li>
                            })
                        }
                    </ul>
                    <span>编辑<img src={icon_edit} alt=""/></span>
                </div>
                
                <div className="tab_main">
                    <ul>
                        <li className={this.state.main_show == 0 ? 'on' : ''}>
                            <dl className="goods_list">
                                {
                                    goods_list.map((value,i) => {
                                       return( 
                                            <dd key={'dd'+i}>
                                                <label><input type="checkbox"/><i></i></label>
                                                <img src={value.imgurl} alt=""/>
                                                <p><em>{value.title}</em><br /><span>￥{value.price}</span></p>
                                            </dd>
                                        )
                                   })
                                }
                                
                            </dl>
                        </li>
                        <li className={this.state.main_show == 1 ? 'on' : ''}>main_2</li>
                        <li className={this.state.main_show == 2 ? 'on' : ''}>main_3</li>
                    </ul>
                </div>
                
            </div>
        )
    }
}

export default Mycollect