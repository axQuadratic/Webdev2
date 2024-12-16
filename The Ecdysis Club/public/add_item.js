async function addItem() {
    let category = document.getElementById("category").value;
    let name = document.getElementById("name").value;
    let price = parseInt(document.getElementById("price").value, 10);
    let image_path = document.getElementById("img_path").value;
    let description = document.getElementById("description").value;
    let items = {category: category, name: name, price: price, image_path: image_path, description: description};

    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8181/add", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(items));
};