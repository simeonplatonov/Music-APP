import React, { Component } from 'react';


class Upload extends Component {
  constructor(props){
    super();
    this.state={
      title:"",
      file:""
    }
  }
  onFileChange=(event)=>{
    this.setState({file:event.target.files[0]});
  }
  onTitleChange=(event)=>{
    this.setState({title:event.target.value});
  }
  upload=(event)=>{

  }
  render() {
    return (
      <div className="App">
      <h1>Upload</h1>
      <nav>
      <button onClick={()=>this.props.changeRoute("main")}>Home</button>
      <button onClick={()=>this.props.changeRoute("upload")}>Upload</button>
      <button onClick={()=>this.props.changeRoute("my_uploads")}>My Uploads</button>
      <button onClick={()=>this.props.changeRoute("my_favorites")}>My Favorites</button>
      </nav>
      <form action="http://localhost:3000/upload" method="post" ref="uploadForm" enctype="multipart/form-data">
    <input onChange={this.onTitleChange} name="title" type="text" placeholder="Title"/>
    <input type="hidden" name="username" value={this.props.user}/>
    <input onChange={this.onFileChange} name="song" type="file" accept="audio/*"/>
    <input type="submit" value="upload"/>
    </form>
      </div>
    );
  }
}

export default Upload;
