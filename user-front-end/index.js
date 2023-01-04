const tableBody = document.getElementById("table-body");
const getUsersBtn = document.getElementById("get-users");
const addUserBtn = document.getElementById("add-user");
const userTable = document.querySelector(".user-table");
const addUserInput = document.querySelector(".input-body");
const successMsg = document.querySelector(".input-body .success-msg h3");
const userIdInput = document.querySelector("#userForm .input:nth-of-type(1)");
const mainInputDiv = document.querySelector(".main-div");

let editBtns = [];
let deleteBtns =[];

function loadDetails(data) {
    if(data == null || data == "") {
        const tr = document.createElement("tr");
        const tdDesc = document.createElement("td");
        tdDesc.textContent = "No data available to display"
        tdDesc.style.cssText ="text-align:center";
        tdDesc.setAttribute("colspan", "5");
        tr.appendChild(tdDesc);
        tableBody.appendChild(tr);
    } else {

        for(let i=0; i< data.length; i++) {
            tableBody.appendChild(createRow(data[i]));
        }
    }
}

function createRow(rowData) {
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    tdId.textContent = rowData.userId;
    tr.appendChild(tdId);

    const tdName = document.createElement("td");
    tdName.textContent = rowData.name;
    tr.appendChild(tdName);

    const tdEmail= document.createElement("td");
    tdEmail.textContent = rowData.email;
    tr.appendChild(tdEmail);

    const tdPhone = document.createElement("td");
    tdPhone.textContent = rowData.phone;
    tr.appendChild(tdPhone);

    const actions = document.createElement("td");
    actions.classList.add("actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";
    actions.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    actions.appendChild(deleteBtn);

    tr.appendChild(actions);
    return tr;
}

getUsersBtn.addEventListener('click', async () => {
    userTable.style.display="table";

    const data = await fetch("http://localhost:3000/api/users")
                        .then((response) => response.json());

    const rows = userTable.getElementsByTagName("tr");
    removeAllRows();
    loadDetails(data);
    addUserInput.style.display="none";
    editBtns = document.querySelectorAll(".edit-btn");
    editUsers(editBtns);
    deleteBtns = document.querySelectorAll(".delete-btn");
    deleteUsers(deleteBtns);
})

/**
 * Add User
 * 
 * 
 */


addUserBtn.addEventListener("click", () => {
    userTable.style.display="none";
    addUserInput.style.display="block";
    successMsg.style.display="none";
    document.querySelector("#userForm > h3").textContent = "Add User";
    document.querySelector("#submit").textContent = "Add";
    document.getElementById("userId").disabled = false;

    const userId = document.getElementById("userId").value='';
    const name = document.getElementById("name").value='';
    const email = document.getElementById("email").value='';
    const phone = document.getElementById("phone").value='';
    mainInputDiv.style.height = "500px";
})



const userForm = document.getElementById("userForm");

userForm.onsubmit = async (e) => {
    e.preventDefault();
    console.log(e.submitter.innerText);
    const userId = document.getElementById("userId");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");

    let newData;

    if(e.submitter.innerText == "Add") {
        newData = {
            userId: userId.value,
            name: name.value,
            email: email.value,
            phone: phone.value
        }

        const user = await fetch(`http://localhost:3000/api/users/${newData.userId}`)
        .then((response) => response.json());
        if(user.message != "No records found"){
            successMsg.innerHTML="User Id already available!";
            successMsg.style.display="block";
            return;
        }
        
        const data = await fetch("http://localhost:3000/api/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(newData),
        })
        .then((response) => response.json());
        if(data._id != null || _id != undefined) {
            successMsg.innerHTML="User added successfully!";
        } else {
            successMsg.innerHTML="Error adding user!!!";
        }
        successMsg.style.display="block";
        userId.value = '';
        name.value = '';
        email.value = '';
        phone.value = '';
        
    } else if(e.submitter.innerText == "Save") {

        newData = {
            userId: userId.value,
            name: name.value,
            email: email.value,
            phone: phone.value
        }
        
        const user = await fetch(`http://localhost:3000/api/users/${newData.userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(newData),
        })
        .then((response) => response.json());

        if(user._id != null || user._id != undefined) {
            successMsg.innerHTML="User updated successfully!";
        } else {
            successMsg.innerHTML="Error updating user!!!";
        }
        successMsg.style.display="block";
        userId.value = '';
        name.value = '';
        email.value = '';
        phone.value = '';
    }
    mainInputDiv.style.height = "600px";
}

document.getElementById("reset").onclick = () => {
    successMsg.style.display="none";
}


function removeAllRows() {
    const rows = document.querySelectorAll("#table-body tr");
    rows.forEach(row => row.remove());
}




/**
 * Accessing edit and delete button
 */

function editUsers(editBtns) { 
    mainInputDiv.style.height = "500px";
        editBtns.forEach((btn) => {

        btn.addEventListener("click", (e) => {
            console.log(e.target);
            successMsg.style.display="none";
            userTable.style.display="none";
            addUserInput.style.display="block";

            const userIdInput = document.querySelector("#userForm .input:nth-of-type(1)");
            userIdInput.style.display="block";
            document.getElementById("userId").disabled = true;

            document.querySelector("#userForm > h3").textContent = "Edit User";
            document.querySelector("#submit").textContent = "Save";

            const row = e.target.parentNode.parentNode;
            const rowData = row.getElementsByTagName("td");
            document.getElementById("userId").value = rowData[0].textContent;
            document.getElementById("name").value = rowData[1].textContent;
            document.getElementById("email").value = rowData[2].textContent;
            document.getElementById("phone").value = rowData[3].textContent;
            
        })
    })
}

/**
 * Handle delete
 */

function deleteUsers(deleteBtns) {
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
                const row = e.target.parentNode.parentNode;
                const rowData = row.getElementsByTagName("td");
                const userId = document.getElementById("userId").value;
                
                const user = await fetch(`http://localhost:3000/api/users/${rowData[0].textContent}`, {
                    method: 'DELETE'
                })
                .then((response) => response.json());

                if(user.acknowledged == true && user.deletedCount == "1") {
                    alert("User Record Deleted successfully");
                    row.remove();
                } else {
                    alert("Error deleting successfully");
                }
        })
    })
}

