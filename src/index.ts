// Hämta in referenser till HTML-elementen
const form = document.querySelector("#grocery-form") as HTMLFormElement;
const input = document.querySelector("#grocery-input") as HTMLInputElement;
const addButton = form.querySelector("button");
const list = document.querySelector("#grocery-list") as HTMLUListElement;
const clearButton = document.querySelector("#clear-list") as HTMLButtonElement;
const filterInput = document.querySelector("#filter") as HTMLInputElement;

// Koppla händelser till elementen
// Submit-händelsen på forumlär
form.addEventListener("submit", onSaveGrocery);
clearButton.addEventListener("click", onClearList);
list.addEventListener("click", onClickRemoveGrocery);
filterInput.addEventListener("input", onFilterGroceries);
document.addEventListener("DOMContentLoaded", onDisplayGroceries);

// Spara inköp till listan
function onSaveGrocery(e: SubmitEvent) {
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
function addGroceryToDOM(grocery: string): void {
  const item = document.createElement("li");
  item.appendChild(document.createTextNode(grocery));
  // item.innerText += grocery;
  item.appendChild(createIconButton("btn-remove text-red"));
  list.appendChild(item);
}

// måste returnera HTMLelement här
function createIconButton(classes: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.className = classes;
  button.appendChild(createIcon("fa-regular fa-trash-can"));
  return button;
}

// implicit return gör att det fungerar, men är bra att vara övertydlige
// så kan lägga till :HTMLElement
function createIcon(classes: string): HTMLElement {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function onClearList(): void {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  localStorage.removeItem("groceries");
}

function onClickRemoveGrocery(e: UIEvent): void {
  const target = e.target as HTMLElement;
  console.log("target", target!.parentElement!.parentElement);
  if (target.parentElement?.classList.contains("btn-remove")) {
    const item = target.parentElement!.parentElement as HTMLLIElement;
    // item.remove();
    removeGrocery(item);
  }
}

function removeGrocery(item: HTMLLIElement): void {
  item.remove();
  removeFromStorage(item.textContent!);
}

// this refererar till aktiv instans
function onFilterGroceries(this: HTMLInputElement): void {
  const value = this.value.toLowerCase();
  const groceries = document.querySelectorAll("li");

  for (let grocery of groceries) {
    const item = grocery.firstChild?.textContent?.toLowerCase();

    if (item?.indexOf(value) !== -1) {
      grocery.style.display = "flex";
    } else {
      grocery.style.display = "none";
    }
  }
}

function addToStorage(grocery: string): void {
  // Hämta ut listan om den finns i localstorage
  const groceries = getFromStorage();
  // Om den finns lägg till grocery
  groceries.push(grocery);
  // Spara listan igen till localstorage
  localStorage.setItem("groceries", JSON.stringify(groceries));
}

function getFromStorage(): string[] {
  let items: [];
  items = JSON.parse(localStorage.getItem("groceries")!) ?? [];
  return items;
}

function removeFromStorage(grocery: string): void {
  let groceries: string[] = getFromStorage();
  groceries = groceries.filter((item) => item !== grocery);
  localStorage.setItem("groceries", JSON.stringify(groceries));
}

function onDisplayGroceries(): void {
  const groceries = getFromStorage();
  groceries.forEach((grocery) => addGroceryToDOM(grocery));
}
