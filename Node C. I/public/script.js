const input = document.getElementById("text");
const confirmLabel = document.getElementById("confirm")

function sendMessage() {
    xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8181/message", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ message: input.value }));

    input.value = "";
    console.log("Message sent!");
}