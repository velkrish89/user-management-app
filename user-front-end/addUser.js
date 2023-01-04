const userForm = document.getElementById("userForm");

userForm.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");

    const successMsg = document.querySelector(".input-body .success-msg h3");
    successMsg.style.display="block";

    console.log("Name : ", name.value);
    console.log("Email : ", email.value);
    console.log("phone : ", phone.value);

    name.value = '';
    email.value = '';
    phone.value = '';
}

document.getElementById("reset").onclick = () => {
    const successMsg = document.querySelector(".input-body .success-msg h3");
    successMsg.style.display="none";
}

userForm.onload = (e) => {
    
}