async function changePage(page) {
    boilerplate.innerHTML = await window.electronAPI.requestPageData(page);
}

let boilerplate = document.getElementsByClassName("app")[0];
changePage(boilerplate.id);
