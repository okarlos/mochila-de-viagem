const form = document.getElementById("novoItem");
const ulList = document.getElementById("lista");
const backpack = JSON.parse(localStorage.getItem("backpack")) || [];

backpack.forEach( (element) => {
    createElement(element);
})


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = event.target.elements["nome"].value;
    const quantity = event.target.elements["quantidade"].value;
    
    const exist = backpack.find( element => element.name === nome.value );

    const thisItem = {
        "name": name,
        "quantity": quantity
    }

    if (exist) {
        thisItem.id = exist.id;
        updateElement(thisItem);
    }else {
        thisItem.id = backpack.length;
        createElement(thisItem);
        backpack.push(thisItem);
    }

    localStorage.setItem("backpack", JSON.stringify(backpack));
    form.reset();
})

function createElement(item) {
    const strong = document.createElement("strong");
    strong.innerHTML = item.quantity;
    strong.dataset.id = item.id;

    const li = document.createElement("li");
    li.appendChild(strong);
    li.classList.add("item");
    li.innerHTML += item.name ;
    ulList.appendChild(li);
}

function updateElement(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantity;
}