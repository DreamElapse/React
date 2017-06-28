import React, { Component } from 'react'

export class Demo extends Component{
    constructor (props) {
        super(props)
        this.state = {
            name: "suibian",
            site: "http://www.runoob.com"
        }
    }

    render(){
        return(
            <div>
                <Name a={this.state.name} />
                <Link b={this.state.site} />
            </div>
        )
    }
}

var Name = React.createClass({
  render: function() {
    return (
      <h1 data-a={this.props.a} >{this.props.a}</h1>
    );
  }
});
 
var Link = React.createClass({
  render: function() {
    return (
      <a data-a={this.props.b} href={this.props.b}>
        {this.props.b}
      </a>
    );
  }
});

export default Demo