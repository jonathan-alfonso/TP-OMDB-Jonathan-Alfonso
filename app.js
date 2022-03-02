const input = document.querySelector('input');
const btn = document.querySelector('button');

function pressEnter() {
    let title = input.value;
    input.value = '';

    if (title == '') {
        alert('Title empty');
        return;
    }

    const key = 'f6e256e1';
    const url = `https://www.omdbapi.com/?s=${title}&apikey=${key}`;
    
    fetch(url)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log('network error');
        }
    }) .then(function(data) {
        console.log(data);
        createResult(data);
    }) .catch(function(error) {
        console.log('fetch error');
    });
}

input.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode || 0;

    if (key === 13) {
        pressEnter();
    }
});

btn.addEventListener('click', pressEnter);

function createResult(list) {
   const resultContainer = document.querySelector('#resultContainer');
    list.Search.forEach(element => {
        const card = document.createElement('div');
            card.className = 'card m-1 p-1 col-12 col-md-3';
        const img = document.createElement('img');
            img.className = 'card-img-top';
            img.src = element['Poster'];
            img.alt = 'Poster';
        const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
        const cardTitle = document.createElement('h3');
            cardTitle.className = 'card-title';
            cardTitle.textContent = element['Title'];
        const cardText = document.createElement('div');
            cardText.className = 'card-text';
        const cardYear = document.createElement('p');
            cardYear.textContent = element['Year'];
        const cardType = document.createElement('p');
            cardType.textContent = element['Type'];

        resultContainer.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardText.appendChild(cardYear);
        cardText.appendChild(cardType);
    });
}