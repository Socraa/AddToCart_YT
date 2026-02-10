// import { add } from "./func.js" // This import is to use the function from another file. 
// // ./func.js is use because it's in the same folder as main.js
// // ../ you could use this, if the location you want to import is at the parent folder.
// console.log(add(1,2));

// initializeApp() boots Firebase for your project.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://addtocart-d8379-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings); // The argument of initializeApp is the The Firebase configuration object, it's just an object with info that identifies your Firebase project.
const database = getDatabase(app);
const thingsToBuy = ref(database, "things");



const input = document.getElementById("input_field");
const add_btn = document.getElementById("add_btn");
const ull = document.getElementById("shopping_list");

add_btn.addEventListener('click', () => {
    let inputValue = input.value;

    push(thingsToBuy, inputValue);


    clear_input(input);
})

onValue(thingsToBuy, function(snapshot) {
    // console.log(snapshot.val());
    let itemsArray = Object.values(snapshot.val())
    
    for (let i = 0; i < itemsArray.length; i++ ){
        prependItems(ull, itemsArray[i]);
    }
})

// function to clear the input
function clear_input(s) {
    s = input.value = "";
}

// function to add li to the ul
function prependItems(ul, value) {
    let products = document.createElement('li');
    products.textContent = value;
    ul.prepend(products);
}

// let scrimbaUsersEmails = {
//     "00": "Monitor",
//     "01": "Webcam",
//     "02": "Vape"
// }
// // .Object turns dictionary into an array
// let scrimbaEmails_Data = Object.values(scrimbaUsersEmails); // .values get the data only. ex: Monitor, Webcam, Vape
// let scrimbaEmails_Keys = Object.keys(scrimbaUsersEmails); // .keys get the id only. ex: 00, 01, 02
// let scrimbaEmails_Entries = Object.entries(scrimbaUsersEmails); // .entries get both.

// console.log(scrimbaEmails_Data);
// console.log(scrimbaEmails_Keys);
// console.log(scrimbaEmails_Entries);
