"use strict"

async function getAllTodos() {
    return await fetch('http://127.0.0.1:8083/api/todos').then((res) => res.json())
}

async function getUserTodos(userId) {
    return await fetch(`http://127.0.0.1:8083/api/todos/byuser/${userId}`).then((res) => res.json())
}

function showAllTodos(arrOfTodos) {
    wipeRows();
    let table = document.getElementById('todo-table')
    let headerRow = table.insertRow(0);
    for (let header in arrOfTodos[0]) {
        let newHeader = headerRow.insertCell();
        newHeader.innerHTML = header;
    }
    arrOfTodos.forEach((todo) => {
        let newRow = table.insertRow();
        for (let key in todo) {
            let newCell = newRow.insertCell()
            newCell.innerHTML = todo[key]
            if (key === 'id') {
                newCell.innerHTML = `<a href=./todo_details.html?id=${todo[key]}>${todo[key]}</a>`
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
                let newCell = newRow.insertCell()
                newCell.innerHTML = todo[key]
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
        showAllTodos(data)
        populateSelect(data)
        findAllCompleted()
    })

}