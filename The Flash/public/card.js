let elementIds = [];
let currentCard = 0;
let minCard = 0;
let maxCard = 0;

[].slice.call(document.getElementsByClassName("card")).forEach(function(card) {
    card.addEventListener("click", function() {
        let frontSide = this.getElementsByClassName("front")[0];
        let backSide = this.getElementsByClassName("back")[0];

        if (frontSide.hidden) {
            frontSide.hidden = false;
            backSide.hidden = true;
            this.style.color = "#C0B4A2";
            this.style.backgroundColor = "#0B0A09";
            this.style.borderColor = "#C0B4A2";
        }
        else {
            frontSide.hidden = true;
            backSide.hidden = false;
            this.style.color = "#0B0A09";
            this.style.backgroundColor = "#C0B4A2";
            this.style.borderColor = "#0B0A09";
        }
    });

    elementIds.push(card.id);
});

currentCard = Math.min(...elementIds);
minCard = currentCard;
maxCard = Math.max(...elementIds);

function updateDisplayedCard() {
    const elements = [].slice.call(document.getElementsByClassName("card"));
    elements.forEach(function(card) {
        card.style.display = "none";

        let frontSide = card.getElementsByClassName("front")[0];
        let backSide = card.getElementsByClassName("back")[0];

        frontSide.hidden = false;
        backSide.hidden = true;
        card.style.color = "#C0B4A2";
        card.style.backgroundColor = "#0B0A09";
        card.style.borderColor = "#C0B4A2";
    });

    document.getElementById(currentCard).style.display = "flex";
}

document.getElementById("back-button").addEventListener("click", function() {
    if (currentCard - 1 >= minCard) {
        currentCard--;
        console.log(currentCard);
        updateDisplayedCard();
    }
});

document.getElementById("forward-button").addEventListener("click", function() {
    if (currentCard + 1 <= maxCard) {
        currentCard++;
        console.log(currentCard);
        updateDisplayedCard();
    }
});

updateDisplayedCard();