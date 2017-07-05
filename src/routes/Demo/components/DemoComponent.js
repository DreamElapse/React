import React, { Component } from 'react'
import view from './view.less'

export class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            star: 0,
            arr:[1,2,3,4,5]
        }

    }

    componentWillMount(){

        console.log(this.state)
    }
    
    componentDidUpdate(){
        console.log(this.state)
        
    }

    clickHandle(i){
        this.setState({
            star:i+1
        })
    }
    render() {
        let star = this.state.star || 0;

        return (
            <div className="star-container">
                {
                    this.state.arr.map((value,i) => {
                        const lightClass = star >= value ? 'light' : ''
                        return <i key={i} className={lightClass} onClick={this.clickHandle.bind(this,i)}></i>
                    })
                }

            </div>
        )
    }
    
}


export default Demo 