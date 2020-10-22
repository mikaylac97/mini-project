import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../Landing.css'

export class Landing extends Component {
    render() {
        return (
        <div>
            <header className='masthead'>
                <div className ='container h-100'>
                    <div className='row h-100'>
                        <div className='col-lg-7 my-auto'>
                            <div className='header-content mx-auto'>
                                <h1 className='mb-5'>Use the Spotify API to search through all playlists by tracks, artists, number of playlist followers and more!</h1>
                                <Button>Start Now for Free!</Button>
                            </div>
                        </div>
                        <div className='col-lg-5 my-auto'>
                        <div className="device-container">
                        <div className="device-mockup iphone6_plus portrait white">
                        <div className="device">
                            <div className="screen">
                            {/* <!-- Demo image for screen mockup, you can put an image here, some HTML, an animation, video, or anything else! --> */}
                            {/* <img src='https://www.soda.com/wp-content/uploads/2020/03/best-spotify-playlists.jpg' alt="" /> */}
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </header>

        </div>
        )
    }
}

export default Landing
