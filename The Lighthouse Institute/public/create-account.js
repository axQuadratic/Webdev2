const usernameEntry = document.getElementById("username-entry");
const passwordEntry = document.getElementById("password-entry");
const repeatPasswordEntry = document.getElementById("repeat-password-entry");
const errorLabel = document.getElementById("error-label");

function createAccount() {
    if (passwordEntry.value != repeatPasswordEntry.value) {
        errorLabel.innerHTML = "Passwords do not match.";
        return
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/ghirbi");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({"operation": "newuser", "username": usernameEntry.value, "password": passwordEntry.value}));
}

function login() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != XMLHttpRequest.DONE) return;

        if (xhr.status == 200) {
            window.location.href = "/home";
        }
        else if (xhr.status == 401) {
            errorLabel.innerHTML = "Incorrect username or password.";
        }
        else {
            errorLabel.innerHTML = "Something has gone horribly wrong: " + xhr.responseText;
        }
    }
    
    xhr.open("POST", "/ghirbi");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({"operation": "login", "username": usernameEntry.value, "password": passwordEntry.value}));
}