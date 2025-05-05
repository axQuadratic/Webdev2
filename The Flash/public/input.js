const mainContainer = document.getElementById("input-element-container");

function addCardInput() {
    mainContainer.innerHTML += `
        <div class="input-container">
            <input type="text" class="input" placeholder="Card Front">
            <input type="text" class="input" placeholder="Card Back">
        </div>
    `;
}

function removeCardInput() {
    const lastInput = mainContainer.innerHTML.lastIndexOf(`<div class="input-container">`);
    console.log(lastInput);
    if (lastInput === -1) return;
    mainContainer.innerHTML = mainContainer.innerHTML.substring(0, lastInput);
}

async function submitCollection() {
    let collectionData = {
        name: "",
        author: "",
        cards: []
    };

    let i = 0;
    for (const container of document.getElementById("input-element-container").getElementsByClassName("input-container")) {
        let object = { front: "", back: "" };
        for (const input of container.getElementsByClassName("input")) {
            if (input.id === "name") {
                collectionData.name = input.value;
                continue;
            } 

            if (input.id === "author") {
                collectionData.author = input.value;
                continue;
            } 

            if (input.placeholder === "Card Front") {
                object.front = input.value;
            }

            if (input.placeholder === "Card Back") {
                object.back = input.value;
                collectionData.cards.push(object);
                i++;
            }
        }
    }

    xhr = new XMLHttpRequest();
    await xhr.open("POST", "http://localhost:8181/createcollection");
    await xhr.setRequestHeader("Content-Type", "application/json");
    await xhr.send(JSON.stringify(collectionData));
}