const router = require("express").Router();
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
    clientId: '1935a7c38db446288d542d8ecded5367',
    clientSecret: 'f00501ae02e74f4b89441d6f7218fa20'
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

router.get('/', (req, res, next) => {
  res.json({ message: 'landing page will go here'})
})

module.exports = router;