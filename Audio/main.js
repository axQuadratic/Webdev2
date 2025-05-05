const { ipcMain, dialog } = require('electron');
const { app, BrowserWindow } = require('electron/main');
const { copyFile } = require("node:fs");
const path = require('node:path');
const sql = require("sqlite3").verbose();
const pug = require("pug");

const db = new sql.Database('neutron.db');
db.run("PRAGMA foreign_keys = ON;");

createArtistTable = `
    CREATE TABLE IF NOT EXISTS artists (
        id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT
    )
`;
createAlbumTable = `
    CREATE TABLE IF NOT EXISTS albums (
        id INTEGER PRIMARY KEY, album_title TEXT NOT NULL, artist INTEGER NOT NULL, release_date TEXT NOT NULL, cover_path TEXT,
        FOREIGN KEY (artist) REFERENCES artists (id)
    )
`;
createMusicTable = `
    CREATE TABLE IF NOT EXISTS music (
        id INTEGER PRIMARY KEY, title TEXT NOT NULL, album INTEGER NOT NULL, audio_path TEXT NOT NULL,
        FOREIGN KEY (album) REFERENCES albums (id)
    )
`;

db.serialize(function() {
    db.all(createArtistTable, function(err, row) {
        if (err) console.error(err.message);
    });
    
    db.all(createAlbumTable, function(err, row) {
        if (err) console.error(err.message);
    });

    db.all(createMusicTable, function(err, row) {
        if (err) console.error(err.message);
    });
    /*
    db.all("DELETE FROM music WHERE id=5");
    */
});

async function handleUpload(event, data) {
    function checkArtistOrAlbumExists() {
        return new Promise((resolve, reject) => {
            db.all(findArtist, function(err, row) {
                if (err || row.length < 1) {
                    artistId = -1;
                }
                else {
                    artistId = row[0].id;
                }
                
                db.all(findAlbum, function(err, row) {
                    if (err || row.length < 1) {
                        albumId = -1;
                    }
                    else {
                        albumId = row[0].id;
                    }
                    
                    return resolve([artistId, albumId]);
                });
            });
        });
    };
    function createNewArtist() {
        return new Promise((resolve, reject) => {
            db.all(newArtist, function(err, row) {
                if (err) reject(err.message);
                
                return resolve(row);
            });
        });
    }
    function createNewAlbum() {
        return new Promise((resolve, reject) => {
            db.all(newAlbum, function(err, row) {
                if (err) reject(err.message);
                
                return resolve(row);
            });
        });
    }
    function createNewTrack() {
        return new Promise((resolve, reject) => {
            db.all(newTrack, function(err, row) {
                if (err) reject(err.message);
                
                return resolve(row);
            });
        });
    }

    
    let audioPath = data.audioPath.substring(data.audioPath.lastIndexOf("\\") + 1, data.audioPath.length);
    let artPath = data.artPath.substring(data.artPath.lastIndexOf("\\") + 1, data.artPath.length);

    copyFile(data.audioPath, `assets/audio/${audioPath}`, function(err) { if (err) throw err; });
    copyFile(data.artPath, `assets/art/${artPath}`, function(err) { if (err) throw err; });

    let artistId = 0; let albumId = 0;

    let findArtist = `SELECT * FROM artists WHERE name = '${data.artist}';`;
    let findAlbum = `SELECT * FROM albums WHERE album_title = '${data.album}';`;

    let ids = await checkArtistOrAlbumExists();
    artistId = ids[0]; albumId = ids[1];

    let newArtist = `INSERT INTO artists(name, description) VALUES ('${data.artist}', '${data.artistBio}');`;
    let newAlbum = `INSERT INTO albums(album_title, artist, release_date, cover_path) VALUES ('${data.album}', ${artistId}, '${data.releaseDate}', '${artPath}');`;
    let newTrack = `INSERT INTO music(title, album, audio_path) VALUES ('${data.title}', '${albumId}', '${audioPath}')`;

    if (artistId === -1) {
        await createNewArtist();
        ids = await checkArtistOrAlbumExists();
        artistId = ids[0];
        newArtist = `INSERT INTO artists(name, description) VALUES ('${data.artist}', '${data.artistBio}');`;
        newAlbum = `INSERT INTO albums(album_title, artist, release_date, cover_path) VALUES ('${data.album}', ${artistId}, '${data.releaseDate}', '${artPath}');`;
        newTrack = `INSERT INTO music(title, album, audio_path) VALUES ('${data.title}', '${albumId}', '${audioPath}')`;
    }

    if (albumId === -1) {
        await createNewAlbum();
        ids = await checkArtistOrAlbumExists();
        albumId = ids[1];
        newArtist = `INSERT INTO artists(name, description) VALUES ('${data.artist}', '${data.artistBio}');`;
        newAlbum = `INSERT INTO albums(album_title, artist, release_date, cover_path) VALUES ('${data.album}', ${artistId}, '${data.releaseDate}', '${artPath}');`;
        newTrack = `INSERT INTO music(title, album, audio_path) VALUES ('${data.title}', '${albumId}', '${audioPath}')`;
    }

    await createNewTrack();
}

async function handleFileSelect(event, type) {
    let targetExtensions = [];
    if (type === "Image") {
        targetExtensions = ["jpg", "png", "bmp"]
    }
    else if (type === "Audio") {
        targetExtensions = ["mp3", "wav", "flac"]
    }

    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openfile'],
        filters: [{ name: type, extensions: targetExtensions}]
    });
    if (!canceled) return filePaths[0];
}

function createWindow() {
    const win = new BrowserWindow({
        icon: "assets/images/neutron.png",
        width: 1200,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile("pages/base.html");
}

async function renderPage(event, page, targetAlbum = null) {
    function getAllTracks() {
        return new Promise((resolve, reject) => {
            db.all(getTracksSQL, function(err, row) {
                if (err) reject(err.message);
                
                return resolve(row);
            });
        });
    }
    let getTracksSQL = ""
    if (targetAlbum === null) {
        getTracksSQL = "SELECT music.id AS track_id, albums.id AS album_id, artists.id AS artist_id, * FROM music INNER JOIN albums ON albums.id = music.album INNER JOIN artists ON artists.id = albums.artist ORDER BY album_title"
    }
    else {
        getTracksSQL = `SELECT music.id AS track_id, albums.id AS album_id, artists.id AS artist_id, * FROM music INNER JOIN albums ON albums.id = music.album INNER JOIN artists ON artists.id = albums.artist WHERE album_id = ${targetAlbum}`
    }
    let targetFile = "pages/" + page + ".pug";
    let tracks = await getAllTracks();
    return pug.renderFile(targetFile, {music: tracks});
}

app.whenReady().then(() => {
    ipcMain.handle("uploadTrackData", handleUpload);
    ipcMain.handle("openFileSelection", handleFileSelect);
    ipcMain.handle("renderPage", renderPage);
    createWindow();
});

app.on('window-all-closed', app.quit);