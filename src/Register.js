import React, { Component } from 'react';


class Register extends Component {
  constructor(props){
    super();
    this.state={
      email:"",
      password:"",
      name:""
    }
  }
  onEmailChange=(event)=>{
    this.setState({email:event.target.value});
  }
  onPasswordChange=(event)=>{
    this.setState({password:event.target.value});
  }
  onNameChange=(event)=>{
    this.setState({name:event.target.value});
  }
  register=()=>{
    fetch("http://localhost:3000/register",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email:this.state.email,password:this.state.password,name:this.state.name})
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
      <h1>Register</h1>
      <input type="email" onChange={this.onEmailChange} placeholder="Email"/>
      <input type="text" onChange={this.onNameChange} placeholder="Stage name"/>
      <input type="password" onChange={this.onPasswordChange} placeholder="Password"/>
      <input onClick={this.register} type="submit" value="Submit"/>
      </div>
    );
  }
}

export default Register;
