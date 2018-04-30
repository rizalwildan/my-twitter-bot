const Twitter = require('twit');
const api = require('./api');
const http = require('http');

const client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
});

console.log("RUN");
setInterval(() => {
api.getArtist().subscribe((res) => {
  let id = res.rand.artist.artist_id;

  api.getAlbum(id).subscribe((res) => {
    let album_id = res.rand.album.album_id;

    api.getAlbumTrack(album_id).subscribe((res) => {
      let track_id = res.rand.track.track_id;
      let track_name = res.rand.track.track_name;
      let artist_name = res.rand.track.artist_name;

      api.getTrackLyric(track_id).subscribe((res) => {
        let isi = res.isi+"\n"+artist_name+" "+"'"+track_name+"' "+"\n#lyricquote";
        let params = {status: isi};
        console.log(isi);
        client.post('statuses/update', params, (err, data, response) => {
          console.log('success');
        });

      });

    });

  });

});
}, 300000);

const server = http.createServer((req, res) => {
  res.writeHead(302, {
    location: `https://twitter.com/jhonrizal11`
  });
  res.end();
});
server.listen(3000);
