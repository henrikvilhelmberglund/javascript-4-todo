"use strict";
// Hämta in referenser till HTML-elementen
const form = document.querySelector("#grocery-form");
const input = document.querySelector("#grocery-input");
const addButton = form.querySelector("button");
const list = document.querySelector("#grocery-list");
// Koppla händelser till elementen
// Submit-händelsen på forumlär
form.addEventListener("submit", onSaveGrocery);
// Spara inköp till listan
function onSaveGrocery(e) {
    e.preventDefault();
    const grocery = input.value;
    if (grocery.trim().length > 0) {
        // Lägg till i listan
        addGroceryToDOM(grocery);
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