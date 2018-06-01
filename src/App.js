import React, { Component } from 'react';
import Login from "./Login.js";
import Register from "./Register.js";
import Main from "./Main.js";
import Upload from "./Upload.js";
import MyUploads from "./MyUploads.js";
import MyFavorites from "./MyFavorites.js";
import './App.css';

class App extends Component {
  constructor(){

    super();
    this.state={

      route:"login",
      user:""
    }
  }
  changeRoute=(route)=>{
    this.setState({route:route})
  }
  setUser=(user)=>{
    this.setState({user:user.name});
    this.changeRoute("main");

  }
  render() {
    return (
      <div className="App">
      {
        this.state.route==="login"?<Login changeRoute={this.changeRoute} setUser={this.setUser}/>:(
          this.state.route==="register"?<Register setUser={this.setUser}/>:(
            this.state.route==="main"?<Main changeRoute={this.changeRoute} user={this.state.user}/>:(
              this.state.route==="upload"?<Upload user={this.state.user} changeRoute={this.changeRoute}/>:(
                this.state.route==="my_uploads"?<MyUploads user={this.state.user} changeRoute={this.changeRoute}/>:(
                  this.state.route==="my_favorites"?<MyFavorites user={this.state.user} changeRoute={this.changeRoute}/>:<h1>404 Page Not Found</h1>
                )
              )
            )
          )
        )
      }
      </div>
    );
  }
}

export default App;
