const folderInput = $('.folder-input')
const foldersList = $('.folders-list')
const addFolderButton = $('.add-folder-button')
const sortPopularityButton = $('.sort-popularity-button')
const sortDateButton = $('.sort-date-button')

const urlList = $('.url-list')
const urlInput = $('.url-input')
const addUrlButton = $('.add-url-button')

let sortOrder = {date: 'desc', popularity: 'desc'}
let activeFolder = undefined
let folders = null
let urls = null

$(function() {
  fetch('http://localhost:3000/api/v1/folders')
    .then(res => res.json())
    .then(payload => {
      payload.forEach(folder => {
        foldersList.append(`<button id="${folder.id}" class="folder-button">
                              ${folder.name}
                            </button>
                            <hr/>`)
      })
    })
})

foldersList.on('click', '.folder-button', function(e) {
  urlList.empty()
  activeFolder = e.target.id

  $(this).siblings().removeClass('active')
  $(this).addClass('active')
  fetch(`http://localhost:3000/api/v1/folders/${activeFolder}/urls`)
    .then(res => res.json())
    .then(payload => {
      payload.forEach(link => {

        urlList.append(`<li class="url-item">
                          <a href="${document.location}${link.id}">${document.location}${link.id}</a>
                          <p> visits: ${link.visits} </p>
                          <p> created_at: ${link.created_at} </p>
                          <hr/>
                        </li>`)

    })
  })
})

sortDateButton.on('click', function(e){
  fetch(`http://localhost:3000/api/v1/folders/${activeFolder}/urls`)
    .then(res => res.json())
    .then(payload => {
      urlList.empty()
      if (sortOrder.date === 'desc') {
        payload.sort(sortDateAscending)
        sortOrder.date = 'asc'
      } else {
        payload.sort(sortDateDescending)
        sortOrder.date = 'desc'
      }
      payload.forEach(link => {
        urlList.append(`<li class="url-item">
                          <a href="${document.location}${link.id}">${document.location}${link.id}</a>
                          <p> visits: ${link.visits} </p>
                          <p> created_at: ${link.created_at} </p>
                          <hr/>
                        </li>`)
    })
  })
})

sortPopularityButton.on('click', function(e){
  fetch(`http://localhost:3000/api/v1/folders/${activeFolder}/urls`)
    .then(res => res.json())
    .then(payload => {
      urlList.empty()
      if (sortOrder.popularity === 'desc') {
        payload.sort(sortPopularityAscending)
        sortOrder.popularity = 'asc'
      } else {
        payload.sort(sortPopularityDescending)
        sortOrder.popularity = 'desc'
      }
      payload.forEach(link => {
        urlList.append(`<li class="url-item">
                          <a href="${document.location}${link.id}">${document.location}${link.id}</a>
                          <p> visits: ${link.visits} </p>
                          <p> created_at: ${link.created_at} </p>
                          <hr/>
                        </li>`)
    })
  })
})

function sortDateAscending(a,b) {
  return a.created_at - b.created_at
}

function sortDateDescending(a,b) {
  return b.created_at - a.created_at
}

function sortPopularityAscending(a,b) {
  return a.visits - b.visits
}

function sortPopularityDescending(a,b) {
  return b.visits - a.visits
}

addFolderButton.on('click', function(e) {
  e.preventDefault()
  fetch('http://localhost:3000/api/v1/folders/',
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: folderInput.val()
      })
    })
  .then(res => res.json())
  .then(payload => {
    foldersList.empty()
    payload.forEach(folder => {
      foldersList.append(`<button id="${folder.id}" class="folder-button">
                            ${folder.name}
                          </button>
                          <hr/>`)
    })
  })
})

addUrlButton.on('click', function(e) {
  e.preventDefault()

  fetch(`http://localhost:3000/api/v1/folders/${activeFolder}/urls`,
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        long_url: urlInput.val()
      })
    })
  .then(res => res.json())
  .then(payload => {
    urlList.empty()
    payload.forEach(link => {
      urlList.append(`<li class="url-item">
                        <a href="${document.location}${link.id}">${document.location}${link.id}</a>
                        <p> visits: ${link.visits} </p>
                        <p> created_at: ${link.created_at} </p>
                        <hr/>
                      </li>`)
    })
  })
})
