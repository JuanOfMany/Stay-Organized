"use strict"

async function getAllUsers() {
    return await fetch('http://127.0.0.1:8083/api/users').then((res) => res.json())
}

async function getAllCategories() {
    return await fetch('http://127.0.0.1:8083/api/categories').then((res) => res.json())
}

function populateUserSelect() {
    let select = document.getElementById('user-select')
    getAllUsers().then((allUsers) => {
        allUsers.forEach((user) => {
            select.appendChild(new Option(user.name, user.id))
        })
    })
}

function populateCategorySelect() {
    let select = document.getElementById('category-select')
    getAllCategories().then((allUsers) => {
        allUsers.forEach((category) => {
            select.appendChild(new Option(category.name))
        })
    })
}

async function makeNewTodo() {
    let userid = document.getElementById('user-select').value || 8;
    let category = document.getElementById('category-select').value || 'Personal Task';
    let description = document.getElementById('description-input').value || 'Test Description Lalala, they not like us.';
    let deadline = document.getElementById('deadline-input').value || "2023-03-06";
    let priority = document.getElementById('priority-select') || "Low";

    let newTodo = {
        userid: userid,
        category: category,
        description: description,
        deadline: deadline,
        priority: priority
    }

    const response = await fetch('http://127.0.0.1:8083/api/todos',
        {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify(newTodo),
        });
    response.json().then((data) => console.log(data));
}

function addButtonListener() {
    let button = document.getElementById('new-todo-btn')
    button.addEventListener('click', makeNewTodo)
}

window.onload = () => {
    populateUserSelect()
    populateCategorySelect()
    addButtonListener()
}