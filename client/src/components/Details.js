
import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
// import {  Link  } from 'react-router-dom'

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



    render() {
        return (
        <div>
        <Navbar />
            <div className='playlist-details'>
                <div>
                    <img src={this.state.image_url} alt='playlist-cover' />
                </div>
                <div>
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
    </tr>
  </thead>
  <tbody>
   {this.state.tracks.map((track, i) => {
       return (
           
               <tr key={i}>
                   <th scope='row'>{i+1}</th>
                   <td>{track?.track?.name}</td>
                   <td>{track?.track?.album?.artists[0]?.name}</td>
                   <td>{track?.track?.album?.name}</td>
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
