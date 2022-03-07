const input = document.querySelector('input');
const btn = document.querySelector('button');
const resultContainer = document.querySelector('#resultContainer');
const select = document.querySelector('select');
const pagesContainer = document.querySelector('#pagination');

function pressEnter(url) {
    var title = input.value;
    input.value = '';

    var type = select.options[select.selectedIndex].value;
    // console.log(type);
   
    if (title == '' && !url) {
        alert(`Title empty`);
        return;
    }

    if (!url) {
        const key = `f6e256e1`;
        var url = `https://www.omdbapi.com/?apikey=${key}&s=${title}&type=${type}`;
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
            pagination(data);
        }).catch(function (error) {
            console.log('fetch error');
        });
}

input.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode || 0;

    if (key === 13) {
        pressEnter();

        if (resultContainer.innerHTML != '') {
            removeSearch();
        }

        if (pagesContainer.innerHTML != '') {
            removePages();
        }
    }
});

btn.addEventListener('click', function() {
    pressEnter();

    if (resultContainer.innerHTML != '') {
        removeSearch();
    }

    if (pagesContainer.innerHTML != '') {
        removePages();
    }
});

if (resultContainer.innerHTML != '') {
    btn.addEventListener('click', removeSearch);
}

function createResult(list) {

    list.Search.forEach(element => {

        let card = document.createElement('div');
            card.className = `card bg-secondary m-1 p-1 col-5 col-md-3 col-lg-2`;
        let img = document.createElement('img');
            img.className = `card-img-top`;
            img.src = element['Poster'];
            img.alt = `Poster`;
        let cardBody = document.createElement('div');
            cardBody.className = `card-body card-img-overlay`;
        let cardTitle = document.createElement('h3');
            cardTitle.className = `card-title`;
            cardTitle.textContent = element['Title'];
        let cardText = document.createElement('div');
            cardText.className = `card-text`;
        let cardYear = document.createElement('p');
            cardYear.className = `card-year`;
            cardYear.textContent = element['Year'];
        let cardType = document.createElement('p');
            cardType.className = `card-type`;
            cardType.textContent = element['Type'];
        let cardLink = document.createElement('a');
            cardLink.className = `btn btn-dark`;
            cardLink.href = `movie.html?id=${element['imdbID']}`;
            cardLink.textContent = `See more`;

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
    const queryString = window.location.search;
    const pageParams = new URLSearchParams(queryString);
    var currentPage = pageParams.get('page');
    // console.log(currentPage);
    let url = null;

    if (sessionStorage.getItem('storedUrl')) {
        url = sessionStorage.getItem('storedUrl');
    } 
    
    if (currentPage) {
        function update_query_parameters(key, val) {
            uri = url
               .replace(RegExp("([?&]"+key+"(?=[=&#]|$)[^#&]*|(?=#|$))"), "&"+key+"="+encodeURIComponent(val))
               .replace(/^([^?&]+)&/, "$1?");
            return uri;
        }

        url = update_query_parameters('page', currentPage);
        // console.log(url);
    }

    if (url) {
        pressEnter(url);
    }
}

function pagination(data) {
    var totalResults = data['totalResults'];
    var totalPages = Math.ceil(totalResults / 10);

    for (var i = 1; i <= totalPages; i++) {
        var paginationContainer = document.querySelector('#pagination');
        var pageBtn = document.createElement('a');
            pageBtn.className = `btn page-btn btn-dark`;
            pageBtn.id = 'pagesBtn';
            pageBtn.textContent = i;
            pageBtn.href = `index.html?page=${i}`;

        paginationContainer.appendChild(pageBtn);
    }
}

function removePages() {
    const pagesBtn = document.querySelectorAll('#pagesBtn');
    pagesBtn.forEach(n => n.remove());
}