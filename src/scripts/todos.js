"use strict"

async function getAllTodos() {
    return await fetch('http://127.0.0.1:8083/api/todos').then((res) => res.json())
}

async function getUserTodos(userId) {
    return await fetch(`http://127.0.0.1:8083/api/todos/byuser/${userId}`).then((res) => res.json())
}

function showTodos(arrOfTodos) {
    wipeRows();
    let table = document.getElementById('todo-table')
    let head = document.createElement('thead');
    table.appendChild(head)
    let headerRow = head.insertRow(0);
    for (let header in arrOfTodos[0]) {
        if (header === "id" || header === "userid") {
        } else {
            let capitalizedHeader = header.charAt(0).toUpperCase() + header.slice(1);
            headerRow.insertCell().outerHTML = `<th>${capitalizedHeader}</th>`
        }

    }
    arrOfTodos.forEach((todo) => {
        let newRow = table.insertRow();
        for (let key in todo) {
            if (key === "id" || key === "userid" || key === "image") {
            } else {
                let newCell = newRow.insertCell()
                newCell.innerHTML = todo[key]
                newCell.classList.add("text-wrap", "overflow-hidden")
                if (key === 'description') {
                    newCell.innerHTML = `<a href=./todo_details.html?id=${todo['id']}>${todo[key]}</a>`
                }
            }
        }
    })
}

function wipeRows() {
    let table = document.getElementById('todo-table');
    let rowCount = table.rows.length;
    for (let i = rowCount - 1; i >= 1; i--) {
        table.deleteRow(i);
    }
}

function showUserTodos(userId) {
    let table = document.getElementById('todo-table')
    wipeRows()
    getUserTodos(userId).then((arrOfTodos) => {
        console.log(arrOfTodos)
        arrOfTodos.forEach((todo) => {
            let newRow = table.insertRow();
            for (let key in todo) {
                if (key === "id" || key === "userid" || key === "image") {
                } else {
                    let newCell = newRow.insertCell()
                    newCell.innerHTML = todo[key]
                    newCell.classList.add("text-wrap", "overflow-hidden")
                    if (key === 'description') {
                        newCell.innerHTML = `<a href=./todo_details.html?id=${todo['id']}>${todo[key]}</a>`
                    }
                }
            }
        })
    })
}

async function getAllUsers() {
    return await fetch('http://127.0.0.1:8083/api/users').then((res) => res.json())
}

function handleSelect(event) {
    showUserTodos(event.target.value)
}

function addSelectListener() {
    let select = document.getElementById('user-select')
    select.addEventListener('change', handleSelect)
}

function populateSelect(arrOfTodos) {
    let select = document.getElementById('user-select')
    getAllUsers().then((allUsers) => {
        allUsers.forEach((user) => {
            select.appendChild(new Option(user.name, user.id))
        })
    })
}

function findAllCompleted() {
    for (let td of document.querySelectorAll("td")) {
        if (td.textContent.includes("true")) {
            td.innerHTML = "&#x2713;"
        } else if (td.textContent.includes("false")) {
            td.innerHTML = "&#10060"
        }
    }
}

window.onload = () => {
    getAllTodos().then((data) => {
        addSelectListener()
        showTodos(data)
        populateSelect(data)
        findAllCompleted()
    })

}