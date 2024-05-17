"use strict"

function getTodoId() {
    let url = (window.location.href);
    let afterSlash = url.split('=')[1]
    if (!afterSlash) {
        return 10
    }
    console.log(afterSlash)
    return afterSlash
}

function populateTodoInfo(todo) {
    let keys = Object.keys(todo).slice(2)
    keys.forEach((key) => {
        console.log(key)
      document.getElementById(key).innerHTML = todo[key]
      if (key === 'image') {

            document.getElementById(key).src = `http://127.0.0.1:8083/${todo[key]}`
      }
    })
}

async function getTodoInfo(todoId) {
    return await fetch(`http://127.0.0.1:8083/api/todos/${todoId}`).then((res) => res.json())
}

async function getImage(prompt) {
    console.log(prompt)
    fetch('http://127.0.0.1:8083/generate-image', 
    {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        // body: JSON.stringify(prompt),
    }
    ).then((res) => res.json()).then((data) => {
        let img = document.getElementById('ai-img')
        // console.log(data.url)
        // img.src = data.url

    })
}

window.onload = () => {
    console.log('hello image generator page')

    getTodoInfo(getTodoId()).then((data) => {
        populateTodoInfo(data)
        let description = document.getElementById('description').innerHTML
        getImage(description)
    })

    let button = document.getElementById('img-gen-btn')
    button.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('button pressed')
    })


}