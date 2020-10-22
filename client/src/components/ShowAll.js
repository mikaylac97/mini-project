import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Search from './Search';


export default class ShowAll extends Component {
    state = {
        playlists: [],
        search: ''
    }

    componentDidMount() {
        this.getFeaturedPlaylists();
    }

    getFeaturedPlaylists = () => {
        axios.get(`http://localhost:4000/api/all-playlists`)
            .then(responseFromAPI => {
                this.setState({
                    playlists: responseFromAPI.data.featuredPlaylists
                })
            })
            .catch(err => console.log(err))
    }

    getSearchedPlaylists = async (event) => {
        const { value } = event.target;

        await this.setState({
            search: value.toLowerCase()
        });
        axios
            .get(`http://localhost:4000/api/playlist-search?playlistSearch=${this.state.search}`)
            .then(searchFromAPI => {
                console.log(searchFromAPI.data.searchResults)
                this.setState({
                    playlists: searchFromAPI.data.searchResults
                })
            })
            .catch(err => console.log(err))
    }

  

    
    render() {
        // console.log(this.state.playlists)
        return (
        <div className='featured-playlists'> 
        <input type='text' value={this.state.search} onChange={this.getSearchedPlaylists} placeholder='search'></input>
        {/* <Search /> */}
            <div className='container-fluid'>
                <div className='row'>
                {this.state.playlists.map(playlist => {
                    const descriptionNoCover = playlist.description.split('Cover')
                    return(
                        <div key={playlist.id} className='col-4'>
                            <img src={playlist.images[0].url} alt='playlist-cover' className='ft-playlist-imgs'/>
                            <Link to={`/playlists/${playlist.id}`}>
                                <h3>{playlist.name}</h3>
                            </Link>
                                <p>{descriptionNoCover[0]}</p>
                                <p>Created by <b>{playlist.owner.display_name}</b></p>
                        </div>
                    )
                })}
                </div>
            </div>
            </div>
        )
    }
}

