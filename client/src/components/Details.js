
import React, { Component } from 'react'
import axios from 'axios'

export default class Details extends Component {
    // state = {
    //    images: {
    //        url: '',
    //    },
    //    tracks: {
    //        items: {
    //            track: {
    //                name: '',
    //                track_number: '',
    //                album: {
    //                    artists: {
    //                        name: ''
    //                    }
    //                }
    //            }
    //        }
    //    } 
    // }

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
        // const singleTrack = this.state.tracks
        return (
        <div>
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
        <div>
            <table className='tracks-list'>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                </tr>
                {this.state.tracks.map((track, i) => {
                    return (
                    <>
                    {/* <Link to={track.track.external_urls.spotify}> */}
                        <tr>
                            <td>{i+1}</td>
                            <td>{track.track.name}</td>
                            <td>{track.track.album.artists[0].name}</td>
                            <td className='album-td'>{track.track.album.name}</td>
                        </tr>  
                    {/* </Link> */}
                    </>
                        )
                    })}
                    </table>
                </div>
            </div>
        )
    }
}
