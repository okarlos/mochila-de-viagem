const form = document.getElementById("novoItem")
const ulLista = document.getElementById("lista")

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const item = event.target.elements["nome"].value;
    const quantidade = event.target.elements["quantidade"].value;
    createElement(item, quantidade);
})

function createElement(item, quantidade) {
    console.log(item);
    console.log(quantidade);

    const strong = document.createElement("strong");
    strong.innerHTML = quantidade;

    const li = document.createElement("li");
    li.appendChild(strong);
    li.classList.add("item");
    li.innerHTML += item ;

    ulLista.appendChild(li);
}