// import { add } from "./func.js" // This import is to use the function from another file. 
// // ./func.js is use because it's in the same folder as main.js
// // ../ you could use this, if the location you want to import is at the parent folder.
// console.log(add(1,2));

// initializeApp() boots Firebase for your project.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://addtocart-d8379-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings); // The argument of initializeApp is the The Firebase configuration object, it's just an object with info that identifies your Firebase project.
const database = getDatabase(app);
const thingToBuy = ref(database, "things");

const input = document.getElementById("input_field");
const add_btn = document.getElementById("add_btn");

add_btn.addEventListener('click', () => {
    let inputValue = input.value;

    push(thingToBuy, inputValue);
    console.log(inputValue);
})