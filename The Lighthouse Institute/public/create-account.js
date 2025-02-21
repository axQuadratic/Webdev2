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