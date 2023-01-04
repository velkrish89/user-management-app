import {rowData} from "./index.js";
const userForm = document.getElementById("userForm");

// const rowData = window.addEventToEdit();

userForm.onloadstart = () => {
    console.log("element", document.getElementById("name"));
    document.getElementById("name").value = rowData.name;
    document.getElementById("email").value = rowData.email;
    document.getElementById("phone").value = rowData.phone;
}
