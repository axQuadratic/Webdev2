async function changePage(page, targetAlbum) {
    boilerplate.innerHTML = await window.electronAPI.requestPageData(page, targetAlbum);
}

let boilerplate = document.getElementsByClassName("app")[0];
changePage(boilerplate.id);

addEventListener("resize", function(event) {
    let albumContainer = document.getElementById("album-container");
    if (albumContainer === null) return;

    if (window.innerWidth <= 800) {
        albumContainer.style.gridTemplateColumns = "100%";
    }
    else if (window.innerWidth <= 1200) {
        albumContainer.style.gridTemplateColumns = "50% 50%";
    }
    else {
        albumContainer.style.gridTemplateColumns = "25% 25% 25% 25%";
    }
});