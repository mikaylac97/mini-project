import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Navbar from './Navbar'
// import Search from './Search';


export default class ShowAll extends Component {
    state = {
        playlists: [],
        search: '',
        boxIsChecked: false,
        savedFeatState: {},
        savedSearchState: {}
    }

    componentDidMount() {
        this.getFeaturedPlaylists();
    }

    getFeaturedPlaylists = () => {
        axios.get(`http://localhost:4000/api/all-playlists`)
            .then(responseFromAPI => {
                this.setState({
                    playlists: responseFromAPI.data.featuredPlaylists,
                    savedPrevState: responseFromAPI.data.featuredPlaylists
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
                this.setState({
                    playlists: searchFromAPI.data.searchResults,
                    savedPrevState: searchFromAPI.data.searchResults
                })
            })
            .catch(err => console.log(err))
    }


    filterByNumberOfTracks = ((event, min, max) => {
        const filteredByTracks = this.state.playlists.filter(playlist => playlist.tracks.total >= min && playlist.tracks.total <= max)
        event.target.checked ?
        this.setState({
            playlists: filteredByTracks
        })
        :
        this.setState({
            playlists: this.state.savedPrevState,
        })
    })

    filterByPlaylistCreators = ((event, creator) => {
        const filteredByCreator = this.state.playlists.filter(playlist => playlist.owner.display_name === creator)
        event.target.checked ?
        this.setState({
            playlists: filteredByCreator
        })
        :
        this.setState({
            playlists: this.state.savedPrevState
        })
    })


    

    
    render() {
        const playlistCreators = this.state.playlists.map(playlist => playlist.owner.display_name)
        const creatorsNoDuplicates = playlistCreators.filter((creator, i) => playlistCreators.indexOf(creator) === i)
        console.log(creatorsNoDuplicates)    
        return (
            <div container-desktop>
            <nav className="navbar navbar-light bg-light justify-content-between">
                    <Link to='/playlists' className="navbar-brand" onClick={() => window.location.reload()}>Home</Link>
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
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={(e) => this.filterByNumberOfTracks(e, 0, 20)}/>
                                <label class="form-check-label" for="exampleCheck1">0-20</label>
                            </li>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={(e) => this.filterByNumberOfTracks(e, 21, 50)} />
                                <label class="form-check-label" for="exampleCheck1">21-50</label>
                            </li>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={(e) => this.filterByNumberOfTracks(e, 51, 99)}/>
                                <label class="form-check-label" for="exampleCheck1">51-99</label>
                            </li>
                            <li className='form-check'>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={(e) => this.filterByNumberOfTracks(e, 100, 300)} />
                                <label class="form-check-label" for="exampleCheck1">100+</label>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='text-info'>Created By</h6>
                        <ul>
                        {creatorsNoDuplicates.map(creator => {
                            return(
                                <li className='form-check'>
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={(e) => this.filterByPlaylistCreators(e, creator)}/>
                                    <label class="form-check-label" for="exampleCheck1">{creator}</label>
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
                        <div className='hover-ctrl'>
                        <Link to={`/playlists/${playlist.id}`} style={{ textDecoration: 'none' }}>
                            <img src={playlist.images[0].url} alt='playlist-cover' className='image ft-playlist-imgs'/>
                        </Link>    
                            <i className="far fa-heart fave-heart"></i>
                        </div>
                    </div>
                
                        
                        <div className='container'>
                        <Link to={`/playlists/${playlist.id}`} className='playlist-link'><h4>{playlist.name}</h4></Link>
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

