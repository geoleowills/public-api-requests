fetchPeople('https://randomuser.me/api/?results=12')
    .then(personArray => {
        personArray.map(person => createCard(person))
    })

function createCard(person) {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'card';

    const imgDiv = document.createElement('div');
    imgDiv.className = 'card-img-container';

    const cardInfoDiv = document.createElement('div');
    cardInfoDiv.className = 'card-info-container';

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img';
    cardImg.alt = 'profile picture';
    cardImg.src = `${person.picture.large}`;

    const nameSection = document.createElement('h3');
    nameSection.id = 'name';
    nameSection.className = 'card-name cap';
    nameSection.textContent = `${person.name.first} ${person.name.last}`;

    const emailSection = document.createElement('p');
    emailSection.className = 'card-text';
    emailSection.textContent = `${person.email}`;

    const addressSection = document.createElement('p');
    person.className = 'card-text';
    person.textContent = `${person.location.city}, ${person.location.state}`;

    mainDiv.appendChild(imgDiv);
    imgDiv.appendChild(cardImg);
    mainDiv.appendChild(cardInfoDiv);
    cardInfoDiv.appendChild(nameSection);
    cardInfoDiv.appendChild(emailSection);
    cardInfoDiv.appendChild(addressSection);

    const gallery = document.getElementById('gallery');

    gallery.appendChild(mainDiv);
}

function fetchPeople(url) {
    return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .then(res => res.results)
}

function checkStatus(reponse) {
    if (reponse.ok) {
        return Promise.resolve(reponse)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}