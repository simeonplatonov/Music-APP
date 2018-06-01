import React, { Component } from 'react';


class MyUploads extends Component {
  constructor(props){
    super();
    this.state={
      songs:[]
    }
  }
  getSongs=()=>{
    fetch(`http://localhost:3000/get-my-uploads/${this.props.user}`,{method:"get"}).then(response=>response.json())
    .then(songs=>{

      this.setState({songs:songs});

    })
  }
  componentDidMount(){
    this.getSongs();

  }
  deleteSong=(song_name,artist,path)=>{

    fetch("http://localhost:3000/delete-my-uploads/",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({artist:artist,song_name:song_name,song_path:path})
    }).then(response=>response.json()).then(response=>console.log(response));
  }

  render() {
    return (
      <div className="App">
      <h1>My Uploads</h1>
      <nav>
      <button onClick={()=>this.props.changeRoute("main")}>Home</button>
      <button onClick={()=>this.props.changeRoute("upload")}>Upload</button>
      <button onClick={()=>this.props.changeRoute("my_uploads")}>My Uploads</button>
      <button onClick={()=>this.props.changeRoute("my_favorites")}>My Favorites</button>
      </nav>
      {this.state.songs.map(song=><div><h3>{song.song_name}</h3>
        <audio controls><source src={`http://localhost:3000/stream?path=${song.song_path}`} type="audio/wav"/></audio>
        <button onClick={()=>this.deleteSong(song.song_name,this.props.user,song.song_path)}>Delete</button>
        </div>)}
      </div>
    );
  }
}

export default MyUploads;
