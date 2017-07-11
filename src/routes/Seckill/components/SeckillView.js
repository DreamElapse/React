import React,{Component} from 'react'
import NavBar from 'components/Header'
import {seckillTime, proList} from './data'
import './Seckill.less'


class Seckill extends Component{
    constructor(props){
        super(props)
        this.state = {
            tab_on:0,
            page_on:0,
        }
    }

    componentWillMount(){
        console.log('访问成功')
    }

    componentDidMount(){

    }

    tabClick(i){
        this.setState({
            tab_on:i,
            page_on:i
        })
    }

    render(){
        
        return(
            <div className="seckill">
                <NavBar router={this.props.router} title="e秒杀"></NavBar>
                <div className="seckill_main">
                    <div className="tab_container">
                        <ul>
                            {
                                seckillTime.map((value,i) => {
                                    
                                    return <li key={'tab'+i} className={this.state.tab_on == i ? 'on' : ''} onClick={this.tabClick.bind(this,i)} ><em>{value.time}</em><br /><span>{value.status}</span></li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="tab_main">
                        <ul>
                            {
                                proList.map((list,key) => {
                                    const page_class = this.state.page_on == key ? ' on' : '';
                                    return(
                                        <li className={"tab_page"+page_class}>
                                            <h4><span>{list.status}</span><em className="down_date">距结束 <b><i>10</i>:<i>10</i>:<i>10</i></b></em></h4>
                                            <ol lassName="prod_list">
                                                {
                                                    list.main.map((datas,i) => {
                                                        return (
                                                            <li>
                                                                <img src={datas.imgurl} alt=""/>
                                                                <div>
                                                                    <h3>{datas.title}</h3>
                                                                    <span>已售<em>{datas.progress}</em>%</span>
                                                                    <p><b className="prod_price">￥{datas.price} <del>￥{datas.oldPrice}</del></b><a href="javascript:;">去抢购</a></p>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ol>
                                        </li>
                                    )
                                })
                            }
                            
                            
                        </ul>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Seckill