const flipBtn = document.querySelector("#flipBtn");
flipBtn.addEventListener("click", flip);

function flip() {
    const card = document.querySelector(".card");
    let list = card.classList;
    list.toggle("flip");
}

const frontRef = document.querySelector(".front h1");
const backRef = document.querySelector(".back h1");

// get card's previous content from localStorage
let card = JSON.parse(localStorage.getItem('card'));

frontRef.textContent = card.front;
backRef.textContent = card.back;

// on save, send a PATCH request to API
const saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", patchCard);

// send patch request, then redirect to index.html
async function patchCard() {
    let hrefToRedirect = saveBtn.getAttribute("href");

    card.front = frontRef.textContent;
    card.back = backRef.textContent;

    console.log(card);
    let url = "http://localhost:3000/edit";
    let options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(card)
    }

    await fetch(url, options);
    localStorage.removeItem('card');
    window.location.href = hrefToRedirect;
}