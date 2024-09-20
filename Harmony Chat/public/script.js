let messageBox = '<div class="box"><h3 class="messageuser">ERROR</h3><p class="messagebody">Failed to load message...</p><b class="messagetime">00:00, Jan 1, 1970</b></div>';

let ids = [];

async function getMessage() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            parseMessages(req.responseText)
        };
    };

    req.open("GET", "http://localhost:8181/messages", true)
    req.send();
};

function parseMessages(text) {
    JSON.parse(text).reverse().forEach(message => {
        console.log(message.id)
        if (message.id in ids) {
            return;
        }
        
        messageContainer.innerHTML += messageBox;
    });
}

setInterval(getMessage, 500);

let messageContainer = document.getElementById("messages");