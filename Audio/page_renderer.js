async function changePage(page, targetAlbum) {
    boilerplate.innerHTML = await window.electronAPI.requestPageData(page, targetAlbum);
}

let boilerplate = document.getElementsByClassName("app")[0];
changePage(boilerplate.id);
