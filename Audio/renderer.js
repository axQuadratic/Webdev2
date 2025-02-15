const audioInput = document.getElementById("file-input");
const titleInput = document.getElementById("title-input");
const artInput = document.getElementById("art-input");
const albumInput = document.getElementById("album-input");
const releaseInput = document.getElementById("release-input");
const artistInput = document.getElementById("artist-input");
const bioInput = document.getElementById("bio-input");
const submitButton = document.getElementById("submit-button");

const trackListButton = document.getElementById("track-list-button");

let trackData = {
    audioPath: "",
    artPath: "", 
    title: "",
    album: "",
    releaseDate: "",
    artist: "",
    artistBio: ""
};

audioInput.addEventListener("click", async function() {
    const path = await window.electronAPI.selectFile("Audio");
    audioInput.value = path.substring(path.lastIndexOf("\\") + 1, path.length);
    trackData.audioPath = path;
});
artInput.addEventListener("click", async function() {
    const path = await window.electronAPI.selectFile("Image");
    artInput.value = path.substring(path.lastIndexOf("\\") + 1, path.length);
    trackData.artPath = path;
});

submitButton.addEventListener("click", function() {
    trackData.title = titleInput.value.toLowerCase();
    trackData.album = albumInput.value.toLowerCase();
    trackData.releaseDate = releaseInput.value.toLowerCase();
    trackData.artist = artistInput.value.toLowerCase();
    trackData.artistBio = bioInput.value.toLowerCase();

    window.electronAPI.uploadTrackData(trackData);
});

trackListButton.addEventListener("click", function() {
    window.location.href = "base.html"
})