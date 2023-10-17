"use strict";
// Hämta in referenser till HTML-elementen
const form = document.querySelector("#grocery-form");
const input = document.querySelector("#grocery-input");
const addButton = form.querySelector("button");
const list = document.querySelector("#grocery-list");
const clearButton = document.querySelector("#clear-list");
const filterInput = document.querySelector("#filter");
// Koppla händelser till elementen
// Submit-händelsen på forumlär
form.addEventListener("submit", onSaveGrocery);
clearButton.addEventListener("click", onClearList);
list.addEventListener("click", onClickRemoveGrocery);
filterInput.addEventListener("input", onFilterGroceries);
document.addEventListener("DOMContentLoaded", onDisplayGroceries);
// Spara inköp till listan
function onSaveGrocery(e) {
    e.preventDefault();
    const grocery = input.value;
    if (grocery.trim().length > 0) {
        // Lägg till i listan
        addGroceryToDOM(grocery);
        addToStorage(grocery);
    }
    input.value = "";
}
// Lägg till inköp till DOMen
// aldrig fel att vara övertydligen, lägg till : void
function addGroceryToDOM(grocery) {
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(grocery));
    // item.innerText += grocery;
    item.appendChild(createIconButton("btn-remove text-red"));
    list.appendChild(item);
}
// måste returnera HTMLelement här
function createIconButton(classes) {
    const button = document.createElement("button");
    button.className = classes;
    button.appendChild(createIcon("fa-regular fa-trash-can"));
    return button;
}
// implicit return gör att det fungerar, men är bra att vara övertydlige
// så kan lägga till :HTMLElement
function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}
function onClearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    localStorage.removeItem("groceries");
}
function onClickRemoveGrocery(e) {
    var _a;
    const target = e.target;
    console.log("target", target.parentElement.parentElement);
    if ((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains("btn-remove")) {
        const item = target.parentElement.parentElement;
        // item.remove();
        removeGrocery(item);
    }
}
function removeGrocery(item) {
    item.remove();
    removeFromStorage(item.textContent);
}
// this refererar till aktiv instans
function onFilterGroceries() {
    var _a, _b;
    const value = this.value.toLowerCase();
    const groceries = document.querySelectorAll("li");
    for (let grocery of groceries) {
        const item = (_b = (_a = grocery.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        if ((item === null || item === void 0 ? void 0 : item.indexOf(value)) !== -1) {
            grocery.style.display = "flex";
        }
        else {
            grocery.style.display = "none";
        }
    }
}
function addToStorage(grocery) {
    // Hämta ut listan om den finns i localstorage
    const groceries = getFromStorage();
    // Om den finns lägg till grocery
    groceries.push(grocery);
    // Spara listan igen till localstorage
    localStorage.setItem("groceries", JSON.stringify(groceries));
}
function getFromStorage() {
    var _a;
    let items;
    items = (_a = JSON.parse(localStorage.getItem("groceries"))) !== null && _a !== void 0 ? _a : [];
    return items;
}
function removeFromStorage(grocery) {
    let groceries = getFromStorage();
    groceries = groceries.filter((item) => item !== grocery);
    localStorage.setItem("groceries", JSON.stringify(groceries));
}
function onDisplayGroceries() {
    const groceries = getFromStorage();
    groceries.forEach((grocery) => addGroceryToDOM(grocery));
}
