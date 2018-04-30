const Rx = require('rxjs');
const music = require('./musicmatch/main')({apikey:"bc4960f3bc99ee97ee52a540bc0429f1",format:"json",appid:""});
const data = require('./artists_data.json');

const dataset = data[Math.floor(Math.random()*data.length)];

function getArtist() {
    return Rx.Observable.create((observer) => {
        music.artistSearch({q_artist:dataset.artist,page_size:1})
        .then(function(data) {
            let isi = data.message.body.artist_list;
            let rand = isi[Math.floor(Math.random()*isi.length)];
            observer.next({rand});
            observer.complete();
        })
        .catch(function(err) {
            console.log(err);
        });
    });
}

function getAlbum(artist_id) {
    return Rx.Observable.create((observer) => {
        music.artistAlbums({artist_id: artist_id,page_size: 50,g_album_name:1})
        .then(function(data){
            let isi = data.message.body.album_list; 
            let rand = isi[Math.floor(Math.random()*isi.length)];
            observer.next({rand});
            observer.complete();
        }).catch(function(err){
            console.log(err);
        });
    });
}

function getAlbumTrack(album_id) {
    return Rx.Observable.create((observer) => {
        music.albumTracks({album_id:album_id, f_has_lyrics: 1})
        .then(function(data){
                let isi = data.message.body.track_list; 
                let rand = isi[Math.floor(Math.random()*isi.length)];
                observer.next({rand});
                observer.complete();
        }).catch(function(err){
                console.log(err);
        });
    });
}

function getTrackLyric(track_id) {
    return Rx.Observable.create((observer) => {
        music.trackSnippet({track_id:track_id})
        .then(function(data){
                let isi = data.message.body.snippet.snippet_body; 
                observer.next({isi});
                observer.complete();
        }).catch(function(err){
                console.log(err);
        });
    });
}

module.exports = {getArtist: getArtist,
                  getAlbum: getAlbum,
                  getAlbumTrack: getAlbumTrack,
                  getTrackLyric: getTrackLyric
                 };
