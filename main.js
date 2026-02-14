// import { add } from "./func.js" // This import is to use the function from another file. 
// // ./func.js is use because it's in the same folder as main.js
// // ../ you could use this, if the location you want to import is at the parent folder.
// console.log(add(1,2));

// initializeApp() boots Firebase for your project.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://addtocart-d8379-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings); // The argument of initializeApp is the The Firebase configuration object, it's just an object with info that identifies your Firebase project.
const database = getDatabase(app);
const thingsToBuy = ref(database, "things"); // ref points the exact location of the database (database, path)



const input = document.getElementById("input_field");
const add_btn = document.getElementById("add_btn");
const ull = document.getElementById("shopping_list");

add_btn.addEventListener('click', () => {
    let inputValue = input.value;

    if (inputValue === "") return;

    push(thingsToBuy, inputValue); // push the inputValue to the thingsToBuy which is the ref which is the exact location of the database
    clear_input(input);
})

// onValue is a listener, whenever any data changes from thingsToBuy, it will run.
// snapshot is the data you receive from firebase
onValue(thingsToBuy, function(snapshot) {

    if (snapshot.exists()){

        let itemsArray = Object.entries(snapshot.val()) // .entries get the keys and value of the given value from the database
                                                        // turns it into a nested array
        clear_shopping_list();

        for (let i = 0; i < itemsArray.length; i++ ){

            let current_item = itemsArray[i];  // [[id, {name: value}]]
            // let currentItemID = current_item[0]; // will only have id of the current_item
            // let currentItemValue = current_item[1]; // will only have the value
            // console.log(currentItemValue);  

            prependItems(current_item);
        }

    } else {
        ull.innerHTML = "No items here..."
    }


})

// function to clear the input
function clear_input(s) {
    s = input.value = "";
}

// function to add li to the ul
function prependItems(value) {
    let currentId = value[0]
    let currentValue = value[1]

    let products = document.createElement('li');
    products.classList.add("lii")
    products.textContent = currentValue;

    products.addEventListener('click', ()=> {
        console.log(currentValue);
        let exactLocation = ref(database, `things/${currentId}` );
        remove(exactLocation);
    } )

    ull.prepend(products);
}

function clear_shopping_list(){
        ull.innerHTML = ""
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
