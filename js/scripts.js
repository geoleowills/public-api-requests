// Variable to store the response data in.
let allData;

// Checks that the response is ok, if so it returns the response, otherwise it returns an error message.
function checkStatus(reponse) {
    if (reponse.ok) {
        return reponse
    } else {
        return new Error(response.statusText)
    }
}

// Calls fetch to fetch the data, then checks the status, if response is ok it parses it to json, then accesses the results section od the json data.
function fetchPeople(url) {
    return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .then(res => res.results)
}

// Calls the fetchPeople function, sets the returned data to the allData global variable, then calls the createCards function to
// display all profile cards on the screen. 
fetchPeople('https://randomuser.me/api/?nat=gb&results=12')
    .then(personArray => allData = personArray)
    .then(personArray => createCards(personArray))
    .then(createSearch())

// Takes in an array of people objects, loops through and creates a HTML template for each of the people cards,
// appends each HTML card template to the page and adds and adds an event listener to each card, calling
// the createModalWindow function when clicked.
function createCards(data) {

    for (let i = 0; i < data.length; i++) {

        const cardHTML = 
        `
        <div class="id${i} card">
            <div class="id${i} card-img-container">
                <img class="id${i} card-img" src="${data[i].picture.large}" alt="profile picture">
            </div>
            <div class="id${i} card-info-container">
                <h3 id="name" class="id${i} card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                <p class="id${i} card-text">${data[i].email}</p>
                <p class="id${i} card-text">${data[i].location.city}, ${data[i].location.state}</p>
            </div>
        </div>
        `

        const gallery = document.getElementById('gallery');

        gallery.insertAdjacentHTML('beforeend', cardHTML);

        document.querySelector(`.id${i}.card`).addEventListener('click', (e) => {
            createModalWindow(allData[e.target.className.split(' ')[0].slice(2,)], e.target.className.split(' ')[0].slice(2,));
        })
    }
}


// Takes in a person object and their ID number, creates the HTML for the modal window, appends the HTML to the page.
// Adds an event listener to the close button that removes the modal window when clicked. Adds event listeners 
// to the 'next' and 'prev' buttons to navigate through all the people in the gallery.
function createModalWindow(person, id) {

    const modalHTML = 
        `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                    <p class="modal-text">${person.email}</p>
                    <p class="modal-text cap">${person.location.city}</p>
                    <hr>
                    <p class="modal-text">${person.cell}</p>
                    <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.state}, ${person.location.postcode}</p>
                    <p class="modal-text">Birthday: ${(person.dob.date).slice(8,10)}/${(person.dob.date).slice(5,7)}/${(person.dob.date).slice(0,4)}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="id${id} modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="id${id} modal-next btn">Next</button>
            </div>
        </div>
        `

    const modalParent = document.querySelector('body');
        
    modalParent.insertAdjacentHTML('beforeend', modalHTML);

    const modalContainer = document.querySelector('.modal-container');

    document.getElementById('modal-close-btn').addEventListener('click', (e) => {
        modalContainer.remove();
    })

    document.getElementById('modal-prev').addEventListener('click', (e) => {
        // Checks that the current person isn't the only person currently shown in the gallery.
        if (document.querySelectorAll('.card').length > 1) {
            // Gets the ID no. for the current profile in modal window.
            const currentId = e.target.className.split(' ')[0].slice(2,);
            // Creates an array from all of the people, just including the ones that are currently shown on screen, doesn't
            // keep any that have been filtered out through searching.
            const currentShownPeople = Array.from(document.querySelectorAll('.card')).filter(card => card.style.display === '');
            // Finds the index of the current shown profile window within the array of currently shown profile cards, this may be
            // different from the index number in 'allData' if the results have been filtered, this allows us to find the next card
            // to show in the modal window, avoiding any hidden ones.
            const indexInCurrentSearch = currentShownPeople.findIndex(element => element.className.split(' ')[0].slice(2,) === currentId);
            // Checks that it is not on the last person on the list, only continues if it is not the last person.
            if (!(indexInCurrentSearch === 0)) {
                // Finds the ID no. of the new card by getting the next index from the currently show people array.
                const newCardId = currentShownPeople[indexInCurrentSearch - 1].className.split(' ')[0].slice(2,);
                // Removes the current modal window.
                modalContainer.remove()
                // Calls the createModalWindow function on the using the id of the new profile to be shown.
                createModalWindow(allData[newCardId], newCardId);
            }
        }
    })

    document.getElementById('modal-next').addEventListener('click', (e) => {
        // Checks that the current person isn't the only person currently there.
        if (document.querySelectorAll('.card').length > 1) {
            // Gets the ID no. for the current profile in modal window.
            const currentId = e.target.className.split(' ')[0].slice(2,);
            // Creates an array from all of the people, just including the ones that are currently shown on screen, doesn't
            // keep any that have been filtered out through searching.
            const currentShownPeople = Array.from(document.querySelectorAll('.card')).filter(card => card.style.display === '');
            // Finds the index of the current shown profile window within the array of currently shown profile cards, this may be
            // different from the index number in 'allData' if the results have been filtered, this allows us to find the next card
            // to show in the modal window, avoiding any hidden ones.
            const indexInCurrentSearch = currentShownPeople.findIndex(element => element.className.split(' ')[0].slice(2,) === currentId);
            // Checks that it is not on the last person on the list, only continues if it is not the last person.
            if (!(indexInCurrentSearch + 1 === currentShownPeople.length)) {
                // Finds the ID no. of the new card by getting the next index from the currently show people array.
                const newCardId = currentShownPeople[indexInCurrentSearch + 1].className.split(' ')[0].slice(2,);
                // Removes the current modal window.
                modalContainer.remove()
                // Calls the createModalWindow function on the using the id of the new profile to be shown.
                createModalWindow(allData[newCardId], newCardId);
            }
        }
    })
}

function createSearch() {
    // Creates HTML for search the form, inserts the HTML into the page.
    const searchHTML = 
        `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
        `

    const searchContainer = document.querySelector('.search-container');
    
    searchContainer.insertAdjacentHTML('beforeend', searchHTML);

    const searchForm = document.querySelector('form');
    const searchInput = document.getElementById('search-input');

    // Adds event listener to the search form that listens for a submit event.
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Saves the search input to a variable in lower case.
        const searchName = searchInput.value.toLowerCase();
        // Creates an array of each name element in the gallery.
        const personNameArray = document.querySelectorAll('.card-name');
        // Loops through the name array.
        for (let i = 0; i < personNameArray.length; i++) {
            // Saves the current person name to a variable in lower case.
            const personName = personNameArray[i].textContent.toLowerCase();
            // Saves the persons card element to a variable.
            const personCard = document.querySelector(`.id${i}.card`);
            // If the search term is empty, shows all of the cards in the gallery.
            if (searchName === '') {
                personCard.style.display = '';
            // If the current persons name does not include the search name, then the card is hidden.
            } else if (!personName.includes(searchName)) {
                personCard.style.display = 'none';
            // Else if the name does include the search name, then the card is shown.
            } else {
                personCard.style.display = '';
            }
        }
    });
}