
searchMovie();

function searchMovie() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieID = urlParams.get('id');
    console.log(movieID);

    const key = 'f6e256e1';
    let url = `http://www.omdbapi.com/?apikey=${key}&i=${movieID}`;

    fetch(url)
        .then (function(response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log('network error');
            }
        }) .then (function(data) {
            const pageTitle = document.querySelector('title');
                pageTitle.textContent = `${data['Title']} | ${data['Year']}`;
            const movieContainer = document.querySelector('#movieContainer');

            let row = document.createElement('div');
                row.className = 'row bg-light p-3';
            let colImg = document.createElement('div');
                colImg.className = 'col-12 col-lg-4 m-lg-1 text-center';
            let img = document.createElement('img');
                img.className = 'movie-img';
                img.src = data['Poster'];
            let colText = document.createElement('div');
                colText.className = 'col-12 col-lg-7 m-lg-1';
            let title = document.createElement('h1');
                title.className = 'movie-title';
                title.textContent = data['Title'];
            let releasedRated = document.createElement('h2');
                releasedRated.className = 'movie-released';
                releasedRated.innerHTML = `${data['Type']} | ${data['Released']} | <span class="rated">${data['Rated']}</span>`;
            let genre = document.createElement('p');
                genre.className = 'movie-genre';
                genre.textContent = data['Genre'];
            let plot = document.createElement('p');
                plot.className = 'movie-plot';
                plot.textContent = data['Plot'];
            let casting = document.createElement('ul');
                casting.className = 'movie-casting';
            let castingDirector = document.createElement('li');
                castingDirector.className = 'movie-director';
                castingDirector.textContent = `Director: ${data['Director']}`;
            let castingActors = document.createElement('li');
                castingActors.className = 'movie-actors';
                castingActors.textContent = `Actors: ${data['Actors']}`;
            let castingWriters = document.createElement('li');
                castingWriters.className = 'movie-writers';
                castingWriters.textContent = `Writers: ${data['Writer']}`;
            let countryLanguage = document.createElement('p');
                countryLanguage.className = 'movie-country';
                countryLanguage.textContent = `Made in ${data['Country']} | Language: ${data['Language']}`;
            let ratings = document.createElement('div');
                ratings.className = 'card-deck d-flex justify-content-center';

            movieContainer.appendChild(row);
            row.appendChild(colImg);
            colImg.appendChild(img);
            row.appendChild(colText);
            colText.appendChild(title);
            colText.appendChild(releasedRated);
            colText.appendChild(genre);
            colText.appendChild(plot);
            colText.appendChild(casting);
            casting.appendChild(castingDirector);
            casting.appendChild(castingActors);
            casting.appendChild(castingWriters);

            if (data['Type'] == 'series') {
                let seasons = document.createElement('p');
                    seasons.className = 'series-seasons';
                    seasons.textContent = `Seasons: ${data['totalSeasons']}`;
                colText.appendChild(seasons);
            }

            colText.appendChild(countryLanguage);
            colText.appendChild(ratings);

            for (i = 0; i < 3; i++) {
                let ratingCard = document.createElement('div');
                    ratingCard.className = 'card col-4 text-center m-1';
                let ratingSource = document.createElement('div');
                    ratingSource.className = 'card-header bg-dark text-light';
                    ratingSource.textContent = data['Ratings'][i]['Source'];
                let ratingValue = document.createElement('div');
                    ratingValue.className = 'rating-value';
                    ratingValue.textContent = data['Ratings'][i]['Value'];

                ratings.appendChild(ratingCard);
                ratingCard.appendChild(ratingSource);
                ratingCard.appendChild(ratingValue);
            }

        }) .catch (function(error) {
            console.log('fetch error')
        });
}