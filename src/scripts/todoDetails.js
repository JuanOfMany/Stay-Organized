"use strict"

function getTodoId() {
    let url = (window.location.href);
    let afterSlash = url.split('=')[1]
    console.log(afterSlash)
    return afterSlash
}

async function getTodoInfo(todoId) {
    return await fetch(`http://127.0.0.1:8083/api/todos/${todoId}`).then((res) => res.json())
}

function populateTodoInfo(todo) {
    let keys = Object.keys(todo).slice(2)
    keys.forEach((key) => {
      document.getElementById(key).innerHTML = todo[key]
    })
}

async function handleComplete() {
    const response = await fetch(`http://127.0.0.1:8083/api/todos/${getTodoId()}`,
    {
        method: "PUT"
    });
response.json();
}

function addCompleteBtnListener(event) {
    let completeBtn = document.getElementById('complete-btn')
    completeBtn.addEventListener('click', handleComplete)
}

window.onload = () => {
    console.log('hello todo details')
    getTodoInfo(getTodoId()).then((data) => populateTodoInfo(data))
    addCompleteBtnListener()
}