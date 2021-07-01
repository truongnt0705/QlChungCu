import React, { Component } from "react";

export default class Login extends Component {

   constructor(props){
       super(props)
       this.state={
           "username":"",
           "password":"",
           islogin: localStorage.getItem("accessToken") !=null
       }
   }
   setParams = (event)=>{
       this.setState({[event.target.name]: event.target.value})
   }
   login = ()=>{
       var myHeader = new Headers();
       myHeader.append("Conten-Type","application/x-www-form-urlencoded");

       var urlencoded = new URLSearchParams();
       urlencoded.append("username", this.state.username);
       urlencoded.append("password", this.state.password)
      
       var requesOptions = {
       method: "POST",
       headers: myHeader,
       body: urlencoded,
       redirect: 'follow'
    };
    fetch("https://learn-api.jmaster.io:8443/api/login",requesOptions)
      .then(response => {
              console.log(response)
              if(response.ok){
                return response.json()
              }
             throw Error(response.status)
            })
     
      .then(result => {console.log(result)
       localStorage.setItem("accessToken", result.accessToken)
       alert("ok")
       this.setState({islogin: true})
    })
      .catch(error =>{console.log('error', error)
      alert("username, password are wrong")
        });
    }
   onLogoutSuccess=()=>{
       this.setState({islogin: false})
   }
   
    render() {
        return <div> {this.state.islogin ? 
            <trangchu key={this.state.islogin} onLogoutSuccess={this.onLogoutSuccess}/>:
            <form>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Tên đăng nhập</label>
                    <input type="email" name="username" className="form-control" placeholder="Enter Username" />
                </div>

                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.login}>Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
    }
            </div>
    }
}