import React, {Component} from "react";
import axios from "axios";
export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            "username": "",
            "password": "",
            islogin: localStorage.getItem("token") != null
        }
    }
    // componentDidMount() {
    //     axios.post("http://localhost:8008/authenticate", {
    //         username: 'admin',
    //         password: 'admin'
    //     }).then(
    //         function (response){
    //             localStorage.setItem("token", response.data.token);
    //             console.log(response)
    //         }
    //     )
    // }


    setParams = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    login = () => {
        axios({
            method: "POST",
            url: 'http://localhost:8008/authenticate',
            data: {
                username: this.state.username,
                password: this.state.password
            },
        }).then(function(response){
            localStorage.setItem("token", response.data.token);
            console.log(response);
            this.setState({islogin: true});

        })

        // fetch("http://localhost:8008/authenticate",requesOptions)
        // // axios.post("http://localhost:8008/authenticate", urlencoded)
        //     .then(response => {
        //         console.log(urlencoded)
        //         console.log(response)
        //         if (response.ok) {
        //             return response.json()
        //         }
        //         throw Error(response.status)
        //     })
        //
        //     .then(result => {
        //         console.log(result)
        //         localStorage.setItem("token", result.accessToken)
        //         alert("ok")
        //         this.setState({islogin: true})
        //     })
        //     .catch(error => {
        //         console.log('error', error)
        //         alert("username, password are wrong")
        //     });
    }
    onLogoutSuccess = () => {
        this.setState({islogin: false})
    }

    render() {
        return <div> {

            // this.state.islogin ?
            // <trangchu key={this.state.islogin} onLogoutSuccess={this.onLogoutSuccess}/> :
            <form>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Tên đăng nhập</label>
                    <input type="text" name="username" className="form-control" placeholder="Enter Username"/>
                </div>

                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password"/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
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