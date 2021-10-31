let addToy = false
let toyCollectionDiv = document.querySelector('#toy-collection')



function getToys(){
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function createToyCard(toy){ 
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('id', toy.id)
  btn.setAttribute('class', 'like-btn')
  btn.innerText = 'like'
  btn.addEventListener('click', (e) => {
    patchToy(e)
  })



  let toyCardDiv = document.createElement('div')
  toyCardDiv.setAttribute('class', 'card')
  toyCardDiv.append(h2, img, p, btn)
  toyCollectionDiv.append(toyCardDiv)

}

function postToy(toyData){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'name': toyData.name.value,
      'image': toyData.image.value,
      'likes': 0

    }),
  })
  .then(response => response.json())
  .then(toyObject => {
    let newToy = createToyCard(toyObject)
    toyCollectionDiv.append(newToy)
  })
}

function patchToy(event){
  event.preventDefault()
  let moreLikes = parseInt(event.target.previousElementSibling.innerText) +1
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': moreLikes
    })
  })
  .then(resp => resp.json())
  .then(likeObject => {
    event.target.previousElementSibling.innerText = `${moreLikes} likes`;
  })
}


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        // console.log(event.target)
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none"
    }
  })
  
})


getToys().then(toys => {
  toys.forEach(toy => {
    createToyCard(toy)
  })
})


