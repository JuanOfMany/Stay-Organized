"use strict"

async function makeNewUser() {
    let name = document.getElementById('name-input').value || 'Adelyn';
    let username = document.getElementById('username-input').value || "bugs";
    let password = document.getElementById('password-input').value || "password123";

    let newUser = {
        name: name,
        username: username,
        password: password
    }

    const response = await fetch('http://127.0.0.1:8083/api/users',
        {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify(newUser),
        });
    response.json();
}

async function handleNewUserSubmit(event) {
    event.preventDefault();
    if (!checkPasswordsMatch()) {
        alert('Please make sure your password matches.')
        return
    } 
    let available = await nameAvailable()
    if (!available) {
        alert('Please pick another username.')
        return
    } 
    makeNewUser()

}

function addButtonListener() {
    let button = document.getElementById('new-user-btn')
    button.addEventListener('click', handleNewUserSubmit)
}

function checkPasswordsMatch () {
    let password = document.getElementById('password-input').value;
    let confirm = document.getElementById('password-confirm-input').value;
    if (password !== confirm) {
        return false
    } else {
        return true
    }
}

async function nameAvailable() {
    let username = document.getElementById('username-input').value;
    if (username.length === 0) {
        alert('Please Enter a Username')
        return false
    }
    let available = await (await fetch(`http://127.0.0.1:8083/api/username_available/${username}`))
    return available.json().then((data) => {
        if (data.available) {
            return true
    } else {
        return false
    }
});
    
}

window.onload = () => {
    console.log('hello world')
    addButtonListener()
}