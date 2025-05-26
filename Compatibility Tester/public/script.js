const cookiePopup = document.getElementById("cookie-popup");
const motherboardContainer = document.getElementById("motherboard");
const cpuContainer = document.getElementById("cpu");
const coolerContainer = document.getElementById("cooler");
const ramContainer = document.getElementById("ram");
const gpuContainer = document.getElementById("gpu");
const caseContainer = document.getElementById("case");
const caseFanContainer = document.getElementById("additional-cooling");
const psuContainer = document.getElementById("psu");
const storageContainer = document.getElementById("storage");

function acceptCookies() {
    document.cookie = "acceptCookies=True";
    cookiePopup.style.display = "none";
}

function openPopup(type) {
    // Request Pug file rendering from the server
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState != XMLHttpRequest.DONE) return;
        
        // Display the popup
        document.getElementById("content").innerHTML = xhr.responseText;
    };

    switch (type) {
        case "storage_slots":
            let body = {
                slots: [],
                storage: getStorageCookies()
            };

            let m2Gen5Count = JSON.parse(getCookie("motherboard")).m2_gen5_count;
            let m2Gen4Count = JSON.parse(getCookie("motherboard")).m2_gen4_count;
            let sataCount = JSON.parse(getCookie("motherboard")).sata_count;

            let totalM2Count = 1;

            for (let i = 0; i < m2Gen5Count; i++) {
                body.slots.push({ slot: "m2gen5", name: "M.2 " + totalM2Count + " (Gen. 5)" });
                totalM2Count++;
            }

            for (let i = 0; i < m2Gen4Count; i++) {
                body.slots.push({ slot: "m2gen4", name: "M.2 " + totalM2Count + " (Gen. 4)" });
                totalM2Count++;
            }

            for (let i = 0; i < sataCount; i++) {
                body.slots.push({ slot: "sata", name: "SATA " + (i + 1) });
            }

            console.log(body.storage);

            xhr.open("POST", "/render/storage-slot-menu");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(body));
            break;

        case "additional_cooling":
            xhr.open("POST", "/render/additional-cooling-menu");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send();
            break;

        // case "motherboard":
        // case "cpu":
        // case "cpu_cooler":
        // case "ram":
        // case "m2":
        // case "sata":
        // case "gpu":
        // case "case":
        // case "case_fan":
        // case "psu":
        default:
            xhr.open("POST", "/render/component-menu");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify({
                "filter": type
            }));
    }
}

function addComponent(componentType, component) {
    document.cookie = `${componentType}=${JSON.stringify(component)}`;
    window.location.href = "/";
}

function addStorage(slot, storage) {
    document.cookie = `${slot}=${JSON.stringify(storage)}`;
    window.location.href = "/";
}

function getCookie(targetCookie) {
    let decodedCookies = decodeURIComponent(document.cookie).split(";");

    for (let i = 0; i < decodedCookies.length; i++) {
        let cookie = decodedCookies[i];

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        while (cookie.indexOf(targetCookie) == 0) {
            return cookie.substring(targetCookie.length + 1);
        }
    }
}

function getStorageCookies() {
    let decodedCookies = decodeURIComponent(document.cookie).split(";");
    let storage = {
        m2gen5: [],
        m2gen4: [],
        sata: []
    };

    for (let i = 0; i < decodedCookies.length; i++) {
        let cookie = decodedCookies[i];
        
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.substring(0, cookie.indexOf("=")).includes("m2gen5")) {
            storage.m2gen5.push(JSON.stringify(cookie.substring(cookie.indexOf("="))));
        }
        else if (cookie.substring(0, cookie.indexOf("=")).includes("m2gen4")) {
            storage.m2gen4.push(JSON.stringify(cookie.substring(cookie.indexOf("="))));
        }
        else if (cookie.substring(0, cookie.indexOf("=")).includes("sata")) {
            storage.sata.push(JSON.stringify(cookie.substring(cookie.indexOf("="))));
        }
    }

    return storage;
}

// Update the main menu
let decodedCookies = decodeURIComponent(document.cookie).split(";");
for (let i = 0; i < decodedCookies.length; i++) {
    let cookie = decodedCookies[i];
    while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
    }

    if (cookie.indexOf("acceptCookies=True") == 0) {
        cookiePopup.style.display = "none";
    }

    else if (cookie.indexOf("motherboard=") == 0) {
        let componentData = JSON.parse(cookie.substring("motherboard=".length));

        const image = motherboardContainer.getElementsByTagName("img")[0];
        const name = motherboardContainer.getElementsByTagName("div")[0].getElementsByTagName("h3")[0];
        const body = motherboardContainer.getElementsByTagName("div")[0].getElementsByTagName("p")[0];
        
        image.src = `assets/components/${componentData.image}.png`;
        name.innerHTML = componentData.name;
        body.innerHTML = componentData.description;
    }
    
    else if (cookie.indexOf("cpu=") == 0) {
        let componentData = JSON.parse(cookie.substring("cpu=".length));

        const image = cpuContainer.getElementsByTagName("img")[0];
        const name = cpuContainer.getElementsByTagName("div")[0].getElementsByTagName("h3")[0];
        const body = cpuContainer.getElementsByTagName("div")[0].getElementsByTagName("p")[0];

        image.src = `assets/components/${componentData.image}.png`;
        name.innerHTML = componentData.name;
        body.innerHTML = componentData.description;
    }
    
    else if (cookie.indexOf("cpu_cooler=") == 0) {
        let componentData = JSON.parse(cookie.substring("cpu_cooler=".length));

        const image = coolerContainer.getElementsByTagName("img")[0];
        const name = coolerContainer.getElementsByTagName("div")[0].getElementsByTagName("h3")[0];
        const body = coolerContainer.getElementsByTagName("div")[0].getElementsByTagName("p")[0];

        image.src = `assets/components/${componentData.image}.png`;
        name.innerHTML = componentData.name;
        body.innerHTML = componentData.description;
    }

    else if (cookie.indexOf("ram=") == 0) {
        let componentData = JSON.parse(cookie.substring("ram=".length));

        const image = ramContainer.getElementsByTagName("img")[0];
        const name = ramContainer.getElementsByTagName("div")[0].getElementsByTagName("h3")[0];
        const body = ramContainer.getElementsByTagName("div")[0].getElementsByTagName("p")[0];

        image.src = `assets/components/${componentData.image}.png`;
        name.innerHTML = componentData.name;
        body.innerHTML = componentData.description;
    }

    else if (cookie.indexOf("gpu=") == 0) {
        let componentData = JSON.parse(cookie.substring("gpu=".length));

        const image = gpuContainer.getElementsByTagName("img")[0];
        const name = gpuContainer.getElementsByTagName("div")[0].getElementsByTagName("h3")[0];
        const body = gpuContainer.getElementsByTagName("div")[0].getElementsByTagName("p")[0];

        image.src = `assets/components/${componentData.image}.png`;
        name.innerHTML = componentData.name;
        body.innerHTML = componentData.description;
    }
    
    else if (cookie.indexOf("case=") == 0) {
        let componentData = JSON.parse(cookie.substring("case=".length));

        const image = caseContainer.getElementsByTagName("img")[0];
        const name = caseContainer.getElementsByTagName("div")[0].getElementsByTagName("h3")[0];
        const body = caseContainer.getElementsByTagName("div")[0].getElementsByTagName("p")[0];

        image.src = `assets/components/${componentData.image}.png`;
        name.innerHTML = componentData.name;
        body.innerHTML = componentData.description;
    }

    else if (cookie.indexOf("case=") == 0) {
        let componentData = JSON.parse(cookie.substring("case=".length));

        const image = caseContainer.getElementsByTagName("img")[0];
        const name = caseContainer.getElementsByTagName("div")[0].getElementsByTagName("h3")[0];
        const body = caseContainer.getElementsByTagName("div")[0].getElementsByTagName("p")[0];

        image.src = `assets/components/${componentData.image}.png`;
        name.innerHTML = componentData.name;
        body.innerHTML = componentData.description;
    }

    else if (cookie.indexOf("psu=") == 0) {
        let componentData = JSON.parse(cookie.substring("psu=".length));

        const image = psuContainer.getElementsByTagName("img")[0];
        const name = psuContainer.getElementsByTagName("div")[0].getElementsByTagName("h3")[0];
        const body = psuContainer.getElementsByTagName("div")[0].getElementsByTagName("p")[0];

        image.src = `assets/components/${componentData.image}.png`;
        name.innerHTML = componentData.name;
        body.innerHTML = componentData.description;
    }

    else if (cookie.indexOf("case_fan=") == 0) {
        let componentData = JSON.parse(cookie.substring("case_fan=".length));

        const image = caseFanContainer.getElementsByTagName("img")[0];
        const name = caseFanContainer.getElementsByTagName("div")[0].getElementsByTagName("h3")[0];
        const body = caseFanContainer.getElementsByTagName("div")[0].getElementsByTagName("p")[0];

        image.src = `assets/components/${componentData.image}.png`;
        name.innerHTML = componentData.name;
        body.innerHTML = componentData.description;
    }
    else if (getStorageCookies().m2gen5.length > 0 || getStorageCookies().m2gen4.length > 0 || getStorageCookies().sata.length > 0) {
        const body = storageContainer.getElementsByTagName("div")[0].getElementsByTagName("p")[0];

        body.innerHTML = "View Storage Configuration";
    }
}