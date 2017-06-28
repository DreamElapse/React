import React,{ Component } from 'react'



export class DetailDemo extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div style={{ margin:'0 auto'}}>
                <h2>{this.props.a}</h2>
                <button className="btn btn-default" onClick={this.props.detail}>
                    onButton
                </button>
                <br />
                <button className='btn btn-default' onClick={this.props.detailAsync} >
                    twoButton
                </button>
            </div> 
        )
    }
}


export default DetailDemo