import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Navbar from './Navbar'
// import Search from './Search';


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

    filterByTracksL20 = () => {
        const filteredByTracks = this.state.playlists.filter(playlist => playlist.tracks.total >= 0 && playlist.tracks.total <= 20)
        this.setState({
            playlists: filteredByTracks
        })
    }

    filterByTracksL50 = () => {
        const filteredByTracks = this.state.playlists.filter(playlist => playlist.tracks.total >= 21 && playlist.tracks.total <= 50)
        this.setState({
            playlists: filteredByTracks
        })
    }

    filterByTracksL99 = () => {
        const filteredByTracks = this.state.playlists.filter(playlist => playlist.tracks.total >= 51 && playlist.tracks.total <= 99)
        this.setState({
            playlists: filteredByTracks
        })
    }

    filterByTracksM100 = () => {
        const filteredByTracks = this.state.playlists.filter(playlist => playlist.tracks.total >= 100)
        this.setState({
            playlists: filteredByTracks
        })
    }

  

    
    render() {
        console.log(this.state.playlists)
        return (
            <div container-fluid>
            <nav className="navbar navbar-light bg-light justify-content-between">
                    <Link to='/playlists' className="navbar-brand">Home</Link>
                    <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan active-cyan-2 mt-2">
                    <i className="fas fa-search" aria-hidden="true"></i>
                        <input className='search-bar' type='text' value={this.state.search} onChange={this.getSearchedPlaylists} placeholder='Search'></input>
                    </form>
                </nav>
            <div className='row'>
                <div className='col-sm-3'>
                        <h4>Refine by</h4>
                        <hr />
                    <div>
                        <h6 className='text-info'>Number of Tracks</h6>
                        <ul className='list-group'>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={this.filterByTracksL20}/>
                                <label class="form-check-label" for="exampleCheck1">0-20</label>
                            </li>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={this.filterByTracksL50} />
                                <label class="form-check-label" for="exampleCheck1">21-50</label>
                            </li>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={this.filterByTracksL99}/>
                                <label class="form-check-label" for="exampleCheck1">51-99</label>
                            </li>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={this.filterByTracksM100} />
                                <label class="form-check-label" for="exampleCheck1">100+</label>
                            </li>
                        </ul>
                        {/* <div class="slidecontainer">
                        <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
                        </div> */}
                    </div>
                    <div>
                        <h6 className='text-info'>Created By</h6>
                        <ul>
                        {this.state.playlists.map(playlist => {
                            return(
                                <li className='form-check'>
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">{playlist.owner.display_name}</label>
                                </li> 
                            )
                        })}
                        </ul>
                    </div>
                    <div>
                        <h6 className='text-info'>Featured Artists</h6>
                        <ul className='list-group'>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">0-20</label>
                            </li>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">21-40</label>
                            </li>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">41-60</label>
                            </li>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">61-80</label>
                            </li>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">81-100</label>
                            </li>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">100+</label>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className='col-sm-9'>
        <div className='container featured-playlists'> 
                <div className='row'>
                {this.state.playlists.map(playlist => {
                    const descriptionNoCover = playlist.description.split('Cover')
                    return(
                        <div key={playlist.id} className='col-4 each-playlist'>
                         
                        <div className='container'>
                        <Link to={`/playlists/${playlist.id}`}>
                            <img src={playlist.images[0].url} alt='playlist-cover' className='image ft-playlist-imgs'/>
                            <div className="middle">
                                <i className="far fa-heart"></i>
                            </div>
                            </Link>
                        </div>
                        <div className='container'>
                        <Link to={`/playlists/${playlist.id}`}><h3>{playlist.name}</h3></Link>
                                <p>{descriptionNoCover[0]}</p>
                                <p>Created by <b>{playlist.owner.display_name}</b></p>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
            </div>
            </div>
        </div>
        )
    }
}

