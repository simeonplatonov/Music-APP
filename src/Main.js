import React, { Component } from 'react';


class Main extends Component {
  constructor(){

    super();
    this.state={

    songs:[],
    textInput:""
    }
  }

  getSongs=()=>{
    fetch("http://localhost:3000/show",{method:"get"}).then(response=>response.json())
    .then(songs=>{

      this.setState({songs:songs});

    })
  }

  onTextInputChange=(event)=>{
    this.setState({textInput:event.target.value});
  }

  searchSongs=()=>{
    if(this.state.textInput.length!==0){
      fetch(`http://localhost:3000/search/${this.state.textInput}`,{
        method:"get",
        headers:{"Content-Type":"application/json"}
      }).then(response=>response.json()).then(songs=>{
        this.setState({songs:songs});
        console.log(songs);
      });
    }

      }

  addToFavs=(artist,song_name,name,path)=>{
    fetch("http://localhost:3000/add",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({artist:artist,song_name:song_name,name:name,song_path:path})
    }).then(response=>response.json()).then(response=>console.log(response));
  }

  componentDidMount(){
    this.getSongs();

  }

  render() {
    return (
      <div className="App">
      <h1>Main</h1>
      <nav>
      <button onClick={()=>this.props.changeRoute("upload")}>Upload</button>
      <button onClick={()=>this.props.changeRoute("my_uploads")}>My Uploads</button>
      <button onClick={()=>this.props.changeRoute("my_favorites")}>My Favorites</button>
      </nav>
      <input onChange={this.onTextInputChange} type="text" placeholder="Enter something"/>
      <input onClick={this.searchSongs} type="submit" value="Search"/>
      {this.state.songs.map(song=><div><h3>{song.artist} - {song.song_name}</h3>
        <audio controls><source src={`http://localhost:3000/stream?path=${song.song_path}`} type="audio/wav"/></audio>
        <button onClick={()=>this.addToFavs(song.artist,song.song_name,this.props.user,song.song_path)}>Add</button>
        </div>)}
      </div>
    )
  }
}

export default Main;
