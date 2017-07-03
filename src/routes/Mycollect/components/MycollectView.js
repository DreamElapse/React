import React,{Component} from 'react'
import NavBar from 'components/Header'
import { Tabs, WhiteSpace } from 'antd-mobile'

import './Mycollect.less'

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log('onChange', key);
}

function handleTabClick(key) {
  console.log('onTabClick', key);
}

class Mycollect extends Component{
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount(){
        console.log('访问成功')
    }

    componentDidMount(){

    }

    render(){
        return(
            
            <div className="Mycollect">
                <NavBar router={this.props.router} title="查看物流" ></NavBar>
                
                <Tabs defaultActiveKey="1" animated={false} onChange={callback} barStyle={{'color':'#fff'}}  onTabClick={handleTabClick}>
                    <TabPane tab="选项卡一" key="1">
                        <div>
                        选项卡一内容
                        </div>
                    </TabPane>
                    <TabPane tab="选项卡二" key="2">
                        <div>
                        选项卡二内容
                        </div>
                    </TabPane>
                    <TabPane tab="选项卡三" key="3">
                        <div>
                        选项卡三内容
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Mycollect