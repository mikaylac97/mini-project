
import React, { Component } from 'react'
import axios from 'axios'
// import Navbar from './Navbar'
import '../App.css'
import {  Link  } from 'react-router-dom'

export default class Details extends Component {

    state = {
        image_url: '',
        tracks: [],
        description: '',
        name: '',
        owner: '',
        total_songs: 0
    }

    componentDidMount() {
        this.getSinglePlaylist();
    }

    getSinglePlaylist = () => {
        const { params } = this.props.match;
        axios
            .get(`http://localhost:4000/api/playlists/${params.id}`)
            .then(responseFromAPI => {
                console.log(responseFromAPI.data.body)
                this.setState({
                    image_url: responseFromAPI.data.body.images[0].url,
                    tracks: responseFromAPI.data.body.tracks.items,
                    description: responseFromAPI.data.body.description,
                    name: responseFromAPI.data.body.name,
                    owner: responseFromAPI.data.body.owner.display_name,
                    total_songs: responseFromAPI.data.body.tracks.total
                })
            })
            .catch(err => console.log(err))
    }

    millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }





    render() {
        return (
        <div className='container-desktop'>
        {/* <Navbar /> */}
        <nav className="navbar navbar-light bg-light justify-content-between">
                    <Link to='/playlists' className="navbar-brand">Home</Link>
                    {/* <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan active-cyan-2 mt-2">
                    <i className="fas fa-search" aria-hidden="true"></i>
                        <input className='search-bar' type='text' value={this.state.search} onChange={this.getSearchedPlaylists} placeholder='Search'></input>
                    </form> */}
                    
                </nav>
            <div className='playlist-details'>
                <div className='hover-ctrl container'>
                    <img src={this.state.image_url} alt='playlist-cover' className='image'/>
                    <i className="far fa-heart fave-heart"></i>
                </div>
                <div className='playlist-details-txt'>
                    <h2>{this.state.name}</h2>
                    <p>{this.state.description}</p>
                    <p>Created by <b>{this.state.owner}</b> - {this.state.total_songs} Tracks</p>
                </div>
            </div>  
<div className='details-table'>
<table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Artist</th>
      <th scope="col">Album</th>
      <th scope='col'>Time</th>
    </tr>
  </thead>
  <tbody>
   {this.state.tracks.map((track, i) => {
       return (
           
               <tr key={i}>
                   <th scope='row'>{i+1}</th>
                   <td><a href={track.track.external_urls.spotify}>{track?.track?.name}</a></td>
                   <td><a href={track.track.artists[0].external_urls.spotify}>{track?.track?.album?.artists[0]?.name}</a></td>
                   <td><a href={track.track.album.external_urls.spotify}>{track?.track?.album?.name}</a></td>
                   <td>{this.millisToMinutesAndSeconds(track.track.duration_ms)}</td>
               </tr>
           
       )
   })}
  </tbody>
</table>
                </div>
            </div>
        )
    }
}
