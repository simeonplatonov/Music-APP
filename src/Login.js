import React, { Component } from 'react';


class Login extends Component {
  constructor(props){
    super();
    this.state={
      email:"",
      password:""
    }
  }
  onEmailChange=(event)=>{
    this.setState({email:event.target.value});
  }
  onPasswordChange=(event)=>{
    this.setState({password:event.target.value});
  }
  login=()=>{
    fetch("http://localhost:3000/login",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email:this.state.email,password:this.state.password})
    }).then(response=>response.json()).then(resp=>{
      if(resp.name){
        this.props.setUser(resp);
      }else{
        console.log(resp);
      }
    });
  }
  render() {
    return (
      <div className="App">
      <h1>Login</h1>
      <input type="email" onChange={this.onEmailChange} placeholder="Email"/>
      <input type="password" onChange={this.onPasswordChange} placeholder="Password"/>
      <input onClick={this.login} type="submit" value="Login"/><br/>
      <button onClick={()=>this.props.changeRoute("register")}>Register</button>
      </div>
    );
  }
}

export default Login;
