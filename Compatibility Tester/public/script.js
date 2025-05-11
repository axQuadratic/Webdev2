function openPopup(type) {
    // Request Pug file rendering from the server
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        console.log(xhr.readyState);
        if (xhr.readyState != XMLHttpRequest.DONE) return;
        
        // Display the popup
        document.getElementById("content").innerHTML = xhr.responseText;
    };

    switch (type) {
        case "storage_slots":
            xhr.open("POST", "/render/storage-slot-menu");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            let body = JSON.stringify({
                "slots": [
                    { "slot": "m2", "type": "gen5", "name": "M.2 Gen. 5" }, { "slot": "m2", "type": "gen4", "name": "M.2 Gen. 4" },
                    { "slot": "sata", "type": "", "name": "SATA 1" }, { "slot": "sata", "type": "", "name": "SATA 2" },
                    { "slot": "sata", "type": "", "name": "SATA 3" }, { "slot": "sata", "type": "", "name": "SATA 4" }
                ]
            });
            xhr.send(body);
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
            xhr.open("POST", "/render/component-selection-menu");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify({ 
                "filter": type
            }));
    }
}