let ids = [];
let server_ip = "localhost:8181"

async function getMessage() {
    try {
        let req = new XMLHttpRequest();

        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                parseMessages(req.responseText);
            }
        }

        req.open("GET", `http://${server_ip}/getmessage`, true);
        req.send();
    }
    catch { return; }
}

function parseMessages(text) {
    messageContainer.innerHTML = "<p class='ubuntu-medium'>No messages found. There may not be a server at this address.</p>"
    document.getElementById("messages").style.borderStyle = "solid";

    messageText = ""
    JSON.parse(text).reverse().forEach(function(message) {

        ids.push(message.id);

        let timestamp = new Date(message.time * 1000);
        let year = timestamp.getFullYear();
        let month = timestamp.getMonth();
        let day = timestamp.getDate();
        let hour = timestamp.getHours();
        let minute = timestamp.getMinutes();
        
        let time = `${(hour).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}, ${year}/${(month + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
        
        let messageBox = `<div class="box"><h3 class="messageuser">${message.username}</h3><p class="messagebody">${message.message}</p><b class="messagetime">${time}</b></div>`;
        messageText += messageBox;
    });

    if (messageText != "") messageContainer.innerHTML = messageText;
}

function sendMessage() {
    let username = document.getElementById("user_input").value;
    let message = document.getElementById("messageadd").value;
    if (username === "" || message === "") return;

    document.getElementById("messageadd").value = "";

    let req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            getMessage();
        }
    }
    
    req.open("POST", `http://${server_ip}/sendmessage`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({ "message": message, "username": username }));
}

function connectToServer() {
    server_ip = document.getElementById("server_input").value
    messageContainer.innerHTML = "<p class='ubuntu-medium'>No messages found. There may not be a server at this address.</p>"
    document.getElementById("messages").style.borderStyle = "none";
    ids = [];
    getMessage();
}

let messageContainer = document.getElementById("messages");
document.getElementById("server_input").addEventListener("input", connectToServer);
getMessage();
setInterval(getMessage, 500);

let image = Math.floor(Math.random() * 8) + 1;
let poweredByText = "powered by "
switch (image) {
    case 1:
        poweredByText += "BARACK OBAMA";
        break;
    case 2:
        poweredByText += "OBAMIUM";
        break;
    case 3:
        poweredByText += "MONKÉ";
        break;
    case 4:
        poweredByText += "HENTAI";
        break;
    case 5:
        poweredByText += "SHREK";
        break;
    case 6:
        poweredByText += "BEN SHAPIRO";
        break;
    case 7:
        poweredByText += "HOT DOG";
        break;
    case 8:
        poweredByText += "THE POWER TRIO";
        break;
}

document.getElementById("powered-by").innerHTML = poweredByText;
document.body.style.backgroundImage = `url(images/${image}.png)`;
document.getElementById("messageadd").addEventListener("keypress", function(e) {
    if (e.key != "Enter") return;
    sendMessage();
});
