import React, { Component } from "react";

export default class trangchu extends Component {

constructor(props){
    super(props)
    this.state={
        "user":{}
    }
}
logout = ()=>{
    localStorage.removeItem("accessToken")
    alert("out")
}
render()
{
    return <div>
        <button type = "button" onClick={this.logout}>LÔut</button>
    </div>
}
}