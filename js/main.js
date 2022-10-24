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
        backpack[backpack.findIndex(elemento => elemento.id === exist.id)] = thisItem;
    }else {
        thisItem.id = backpack[backpack.length-1] ? (backpack[backpack.length-1]).id + 1 : 0;
        createElement(thisItem);
        backpack.push(thisItem);
    }

    localStorage.setItem("backpack", JSON.stringify(backpack));
    form.reset();
})

function createElement(item) {
    const li = document.createElement("li");

    li.classList.add("item");
    li.innerHTML += item.name;

 

    const strong = document.createElement("strong");
    li.appendChild(strong);
    strong.innerHTML = item.quantity;
    strong.dataset.id = item.id;
    
    ulList.appendChild(li);
    li.appendChild(createRemoveButton(item.id));
}

function updateElement(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantity;
}

function createRemoveButton (id) {
    const removeButton = document.createElement("button");
    removeButton.innerText = "X";

    removeButton.addEventListener("click", function() {
        removeElement(this.parentNode, id)
    })

    return removeButton;
}

function removeElement(element, id) {
    element.remove();

    backpack.splice(backpack.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem("backpack", JSON.stringify(backpack));
}