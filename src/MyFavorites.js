import React, { Component } from 'react';


class MyFavorites extends Component {

  constructor(props){
    super();
    this.state={
      songs:[]
    }
  }
  getSongs=()=>{
    fetch(`http://localhost:3000/get-my-favorites/${this.props.user}`,{method:"get"}).then(response=>response.json())
    .then(songs=>{

      this.setState({songs:songs});

    })
  }
  deleteSong=(song_name,username,artist)=>{

    fetch("http://localhost:3000/delete-my-favorites/",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({artist:artist,song_name:song_name,name:username})
    }).then(response=>response.json()).then(response=>console.log(response));
  }
  componentDidMount(){
    this.getSongs();

  }
  render() {
    return (
      <div className="App">
      <h1>My Favorites</h1>
      <nav>
      <button onClick={()=>this.props.changeRoute("main")}>Home</button>
      <button onClick={()=>this.props.changeRoute("upload")}>Upload</button>
      <button onClick={()=>this.props.changeRoute("my_uploads")}>My Uploads</button>
      <button onClick={()=>this.props.changeRoute("my_favorites")}>My Favorites</button>
      </nav>
      {this.state.songs.map(song=><div><h3>{song.artist} - {song.song_name}</h3>
        <audio controls><source src={`http://localhost:3000/stream?path=${song.song_path}`} type="audio/wav"/></audio>
        <button onClick={()=>this.deleteSong(song.song_name,this.props.user,song.artist)}>Delete</button>
        </div>)}
      </div>
    );
  }
}

export default MyFavorites;
