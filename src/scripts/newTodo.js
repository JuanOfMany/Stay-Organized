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

window.onload = () => {
    populateUserSelect()
    populateCategorySelect()
}