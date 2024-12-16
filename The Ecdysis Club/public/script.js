function scrollToCategory(category) {
    let element = document.getElementById(category);
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}