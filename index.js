const input = document.querySelector('input');
const btn = document.querySelector('button');
const resultContainer = document.querySelector('#resultContainer');

function pressEnter(url) {
    let title = input.value;
    input.value = '';
   
    if (title == '' && !url) {
        alert('Title empty');
        return;
    }

    if (!url) {
        const key = 'f6e256e1';
        var url = `https://www.omdbapi.com/?apikey=${key}&s=${title}`;
    }


    sessionStorage.setItem('storedUrl', url);

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log('network error');
            }
        }).then(function (data) {
            // console.log(data);
            createResult(data);

            let totalResults = data['totalResults'];
            let searchLength = data['Search']['length'];
            let doublePages = totalResults / searchLength;
            let pages = Math.ceil(doublePages);


            console.log(searchLength);
            console.log(totalResults);
            console.log(pages);
        }).catch(function (error) {
            console.log('fetch error');
        });
}

input.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode || 0;

    if (key === 13) {
        pressEnter();

        if (resultContainer.innerHTML != "") {
            removeSearch();
        }
    }
});

btn.addEventListener('click', pressEnter);

if (resultContainer.innerHTML != "") {
    btn.addEventListener('click', removeSearch);
}

function createResult(list) {
    list.Search.forEach(element => {

        let card = document.createElement('div');
            card.className = 'card m-1 p-1 col-12 col-md-5 col-lg-2';
        let img = document.createElement('img');
            img.className = 'card-img-top';
            img.src = element['Poster'];
            img.alt = 'Poster';
        let cardBody = document.createElement('div');
            cardBody.className = 'card-body card-img-overlay';
        let cardTitle = document.createElement('h3');
            cardTitle.className = 'card-title';
            cardTitle.textContent = element['Title'];
        let cardText = document.createElement('div');
            cardText.className = 'card-text';
        let cardYear = document.createElement('p');
            cardYear.className = 'card-year';
            cardYear.textContent = element['Year'];
        let cardType = document.createElement('p');
            cardType.className = 'card-type';
            cardType.textContent = element['Type'];
        let cardLink = document.createElement('a');
            cardLink.className = 'btn btn-dark';
            cardLink.href = `movie.html?id=${element['imdbID']}`;
            cardLink.textContent = 'See more';

        resultContainer.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardTitle.appendChild(cardText);
        cardText.appendChild(cardYear);
        cardText.appendChild(cardType);
        cardBody.appendChild(cardLink);
    });
}

function removeSearch() {
    const card = document.querySelectorAll('.card')
    card.forEach(n => n.remove());
}

window.onload = function() {
    console.log(sessionStorage.getItem('storedUrl'));
    if (sessionStorage.getItem('storedUrl')) {
        pressEnter(sessionStorage.getItem('storedUrl'));
    }
}