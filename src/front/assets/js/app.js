const API_KEY = `57c041832a9ed97e147500e9ad8177bb`;
const image_path = `https://image.tmdb.org/t/p/w1280`;
const input = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const main_grid_title = document.querySelector(".favorites h1");
const recomended_movies_el = document.querySelector(".recomendacao .movies-grid");
const main_grid = document.querySelector(".favorites .movies-grid");
const popular_movies_el = document.querySelector(".popular-movies .movies-grid");
const popular_series_el = document.querySelector(".popular-series .movies-grid");
const trending_el = document.querySelector(".trending .movies-grid");
const popup_container = document.querySelector(".popup-container");
const banner = document.querySelector(".banner");
var feedLike = true;

//Likes e Dislikes
function getLikesDislikes() {
  return JSON.parse(localStorage.getItem('likesDislikes')) || {};
}
function updateLikesDislikes(id, type) {
  const data = getLikesDislikes();
  if (!data[id]) data[id] = { like: false, dislike: false };
  if (type === 'like') {
    data[id].like = !data[id].like;
    if (data[id].like) data[id].dislike = false;
  } else if (type === 'dislike') {
    data[id].dislike = !data[id].dislike;
    if (data[id].dislike) data[id].like = false;
  }
  localStorage.setItem('likesDislikes', JSON.stringify(data));
  return data[id];
}
function getLikeDislikeCount(id, type) {
  const data = getLikesDislikes();
  return data[id] ? (data[id][type] ? 1 : 0) : 0;
}

//Esconder Banner
function hideBanner() {
  if (banner) {
    banner.style.display = 'none';
  }
}
function showBanner() {
  if (banner) {
    banner.style.display = 'block';
  }
}

function clearResults() {
  main_grid.innerHTML = '';
  popular_movies_el.innerHTML = '';
  popular_series_el.innerHTML = '';
  trending_el.innerHTML = '';
}

// Pesquisa de Filmes e Séries
async function searchMovies() {
  const query = input.value.trim();
  if (query === '') return;
  // Ocultamento de Tendência e Populares
  const trendingSection = document.querySelector('.trending');
  const popularMoviesSection = document.querySelector('.popular-movies');
  const popularSeriesSection = document.querySelector('.popular-series');
  const banner = document.querySelector('.banner');
  const resultsTitle = document.getElementById('results');
  const screenWidth = window.innerWidth;
  trendingSection.style.display = 'none';
  popularMoviesSection.style.display = 'none';
  popularSeriesSection.style.display = 'none';
  banner.style.display = 'none';
  resultsTitle.innerText = 'Resultados da Busca';
  resultsTitle.style.marginTop = screenWidth <= 800 ? '150px' : '90px';

  // Buscar Filmes e Séries
  const xData = await get_movie_by_search(query);
  const seriesData = await get_series_by_search(query);

  // Adicionar Resultados ao DOM
  add_searched_movies_and_series_to_dom(xData, seriesData);

  // Ajuste Posições das Setas
  const favoritosChevronLeft = document.querySelector('.bi-chevron-left');
  const favoritosChevronRight = document.querySelector('.bi-chevron-right');

  function ajustarPosicaoSetas() {
    if (window.innerWidth <= 768) {
      // Ajuste para mobile
      favoritosChevronLeft.style.top = '69.5%';
      favoritosChevronRight.style.top = '69.5%';
    } else {
      // Ajuste para desktop
      favoritosChevronLeft.style.top = '65%';
      favoritosChevronRight.style.top = '65%';
    }
  }
  ajustarPosicaoSetas();
  window.addEventListener('resize', ajustarPosicaoSetas);

  //Ajuste Posições Cards
  const moviesContainer = document.querySelector('.movies-container.favorites');
  const moviesGrid = document.querySelector('.movies-grid');

  function adjustForMobile() {
    if (window.innerWidth <= 768) {
      moviesContainer.style.paddingTop = '70px';
      moviesGrid.style.marginTop = '30px';
    } else {
      moviesContainer.style.paddingTop = '50px';
      moviesGrid.style.marginTop = '0';
    }
  }
  adjustForMobile();
  window.addEventListener('resize', adjustForMobile);
}

async function add_searched_movies_and_series_to_dom(xData, seriesData) {
  main_grid_title.innerText = `Resultados da Pesquisa...`;
  main_grid.innerHTML = "";
  xData.forEach((e) => {
    main_grid.innerHTML += `
      <div class="card" data-id="${e.id}" data-type="movie">
        <div class="img">
          <img src="${image_path + e.poster_path}" alt="${e.title}">
        </div>
      </div>
    `;
  });
  seriesData.forEach((e) => {
    main_grid.innerHTML += `
      <div class="card" data-id="${e.id}" data-type="series">
        <div class="img">
          <img src="${image_path + e.poster_path}" alt="${e.name}">
        </div>
      </div>
    `;
  });
  const cards = document.querySelectorAll(".card");
  add_click_effect_to_card(cards);
}

async function get_movie_by_search(search_term) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search_term}&language=pt-BR`
  );
  const respData = await resp.json();
  return respData.results.slice(0, 12);
}

async function get_series_by_search(search_term) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${search_term}&language=pt-BR`
  );
  const respData = await resp.json();
  return respData.results.slice(0, 12);
}

function add_click_effect_to_card(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", () => show_popup(card));
  });
}

document.querySelector('.search-btn').addEventListener('click', searchMovies);
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchMovies();
  }
});
async function get_movie_by_id(id) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
  );
  const respData = await resp.json();
  return respData;
}
async function get_series_by_id(id) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=pt-BR`
  );
  const respData = await resp.json();
  return respData;
}
async function get_movie_trailer(id) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
  );
  const respData = await resp.json();
  return respData.results[0] ? respData.results[0].key : null;
}
async function get_movie_certification(id) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
  );
  const respData = await resp.json();
  const usRelease = respData.results.find(e => e.iso_3166_1 === "US");
  return usRelease ? usRelease.release_dates[0].certification : "N/A";
}
async function show_popup(card) {
  popup_container.classList.add("show-popup");
  const id = card.getAttribute("data-id");
  const type = card.getAttribute("data-type");
  let data;
  if (type === "movie") {
    data = await get_movie_by_id(id);
    localStorage.setItem("tipo", "movie");
  } else {
    data = await get_series_by_id(id);
    localStorage.setItem("tipo", "tv");
  }
  const trailerKey = type === "movie" ? await get_movie_trailer(id) : null;
  const certification = type === "movie" ? await get_movie_certification(id) : "N/A";
  const posterImg = image_path + data.poster_path;
  popup_container.querySelector(".poster-img img").src = posterImg;
  const likeData = getLikesDislikes()[id] || { like: false, dislike: false };
  const likeCount = getLikeDislikeCount(id, 'like');
  const dislikeCount = getLikeDislikeCount(id, 'dislike');
  popup_container.style.background = `linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, 1)), url(${image_path + data.poster_path
    })`;
  popup_container.innerHTML = `
    <span class="x-icon">&#10006;</span>
    <div class="content">
      <div class="left">
        <div class="poster-img">
          <img src="${image_path + data.poster_path}" alt="Movie Poster">
        </div>
        <div class="single-info">
        </div>
        <button onclick="gerenciarFavorito(${id},'${type}')"  class="my-list-button"><i class="fa fa-plus" aria-hidden="true"></i> Adicionar a minha lista</button>
      </div>
      <div class="right">
        <h1>${type === "movie" ? data.title : data.name}</h1>
        <h3>${data.tagline || ""}</h3>
        <div class="single-info-container">
          ${generateSingleInfo("Idioma", data.spoken_languages[0]?.name || "N/A")}
          ${generateSingleInfo("Duração", type === "movie" ? `${data.runtime} minutos` : "N/A")}
          ${generateSingleInfo("Avaliação", `${data.vote_average} / 10`)}
          ${generateSingleInfo("Data de Lançamento", type === "movie" ? data.release_date : data.first_air_date)}
          ${generateSingleInfo("Diretor", type === "movie" ? await get_director(id) : "N/A")}
        </div>
        <div class="genres">
          <h2>Gêneros</h2>
          <ul>${data.genres.map((e) => `<li>${e.name}</li>`).join("")}</ul>
        </div>
        <div class="overview">
          <h2>Sinopse</h2>
          <p>${data.overview || "Sinopse não disponível."}</p>
        </div>
        ${trailerKey ? `
          <div class="trailer">
            <h2>Trailer</h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" 
                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
                    clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>` : ""
    }
        <div class="like-dislike-section">
          <button class="like-btn ${likeData.like ? 'active' : ''}">&#128077;</button>
          <span class="like-count">${likeCount}</span>
          <button class="dislike-btn ${likeData.dislike ? 'active' : ''}">&#128078;</button>
          <span class="dislike-count">${dislikeCount}</span>
        </div>
        <div class="comments-section">
          <h2>Comentários</h2>
          <textarea placeholder="Deixe seu comentário aqui"></textarea>
          <button class="comment-btn">Comentar</button>
          <ul class="comment-list"></ul>
        </div>
      </div>
    </div>
  `;
  setupEventListeners(id);
  // "Esc"
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      popup_container.classList.remove("show-popup");
    }
  });
}

function generateSingleInfo(label, value) {
  return `
    <div class="single-info">
      <span>${label}:</span>
      <span>${value}</span>
    </div>
  `;
}

document.getElementById('minhaListaLink').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('results').scrollIntoView({
    behavior: 'smooth'
  });
});

function setupEventListeners(id) {
  const x_icon = document.querySelector(".x-icon");
  x_icon.addEventListener("click", () => popup_container.classList.remove("show-popup"));
  const myListButton = popup_container.querySelector(".my-list-button");
  const x_ids = get_LS();
  if (x_ids.includes(id)) myListButton.classList.add("change-color");
  myListButton.addEventListener("click", () => {
    if (myListButton.classList.contains("change-color")) {
      remove_LS(id);
      myListButton.classList.remove("change-color");
    } else {
      add_to_LS(id);
      myListButton.classList.add("change-color");
    }
    fetch_favorite_movies();
  });
  setupLikeDislike(id);
  setupComments(id);
}

async function setupLikeDislike(id) {
  const likeBtn = document.querySelector('.like-btn');
  const dislikeBtn = document.querySelector('.dislike-btn');

  likeBtn.addEventListener('click', () => {
    const result = updateLikesDislikes(id, 'like');
    likeBtn.classList.toggle('active', result.like);
    dislikeBtn.classList.remove('active');
    feedLike = true;
  });

  dislikeBtn.addEventListener('click', () => {
    const result = updateLikesDislikes(id, 'dislike');
    dislikeBtn.classList.toggle('active', result.dislike);
    likeBtn.classList.remove('active');
    feedLike = false;
  });

  const response1 = await fetch(`http://localhost:8080/api/feedback/like?tituloId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response2 = await fetch(`http://localhost:8080/api/feedback/deslike?tituloId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });


  document.querySelector('.like-count').innerText = await response1.text();
  document.querySelector('.dislike-count').innerText = await response2.text();


}

async function setupComments(id) {
  const commentBtn = document.querySelector(".comment-btn");
  const commentList = document.querySelector(".comment-list");
  const commentInput = document.querySelector(".comments-section textarea");

  const response = await fetch(`http://localhost:8080/api/feedback/comentarios?tituloId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response1 = await fetch(`http://localhost:8080/api/feedback/like?tituloId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response2 = await fetch(`http://localhost:8080/api/feedback/deslike?tituloId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });


  document.querySelector('.like-count').innerText = await response1.text();
  document.querySelector('.dislike-count').innerText = await response2.text();

  commentList.innerHTML = ""
  const x = await response.json();

  for (i = 0; i < x.length; i++) {
    const commentItem = document.createElement("li");
    commentItem.innerHTML = `
      <span>Feedback de Usuario: ${x[i]}</span>
    `;
    commentList.appendChild(commentItem);
    commentInput.value = '';
  }

  commentBtn.addEventListener("click", async () => {

    const data = {
      comentario: commentInput.value.trim(),
      like: feedLike,
      tituloId: id,
      usuarioId: localStorage.getItem("emailUsuario"),
      tipo: localStorage.getItem("tipo")
    };

    await fetch(`http://localhost:8080/api/feedback/comentar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const response = await fetch(`http://localhost:8080/api/feedback/comentarios?tituloId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    commentList.innerHTML = ""
    const x = await response.json();


    for (i = 0; i < x.length; i++) {
      const commentItem = document.createElement("li");
      commentItem.innerHTML = `
      <span>Feedback de Usuario: ${x[i]}</span>
    `;
      commentList.appendChild(commentItem);
      commentInput.value = '';
    }

    const response1 = await fetch(`http://localhost:8080/api/feedback/like?tituloId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const response2 = await fetch(`http://localhost:8080/api/feedback/deslike?tituloId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });


    document.querySelector('.like-count').innerText = await response1.text();
    document.querySelector('.dislike-count').innerText = await response2.text();

  });
}

async function get_director(movie_id) {
  const creditsResp = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`
  );
  const creditsData = await creditsResp.json();
  const director = creditsData.crew.find((member) => member.job === "Director");
  return director ? director.name : "N/A";
}
function get_LS() {
  const x_ids = JSON.parse(localStorage.getItem("movie-id"));
  return x_ids === null ? [] : x_ids;
}
function add_to_LS(id) {
  const x_ids = get_LS();
  localStorage.setItem("movie-id", JSON.stringify([...x_ids, id]));
}
function remove_LS(id) {
  const x_ids = get_LS();
  localStorage.setItem(
    "movie-id",
    JSON.stringify(x_ids.filter((e) => e !== id))
  );
}

async function fetch_favorite_movies(ids) {
  const movie_ids = ids || [];
  const isSearchActive = main_grid_title.innerText === 'Resultados da Pesquisa...';

  if (isSearchActive) {
    document.querySelectorAll(".card .my-list-button").forEach((button) => {
      const id = button.closest(".card").getAttribute("data-id");
      button.classList.toggle("change-color", movie_ids.includes(id));
    });
    return;
  }

  for (const id of movie_ids) {
    let generos = "";

    const movieData = await get_movie_by_id(id);
    movieData.genres.map((e) => generos += (e.id + ","));

    const usuarioGenero = {
      usuarioId: localStorage.getItem("emailUsuario")
    };

    await fetch(`http://localhost:8080/api/generosUsuario/salvar?generos=${generos}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioGenero)
    });

    if (movieData && movieData.poster_path) {
      main_grid.innerHTML += `
        <div class="card" data-id="${movieData.id}" data-type="movie">
          <div class="img">
            <img src="${image_path + movieData.poster_path}" alt="${movieData.title}">
          </div>
        </div>
      `;
    }
  }

  // Aplica o CSS ao carregar os cards
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.position = 'relative';
    card.style.width = '220px';
    card.style.height = '320px';
    card.style.borderRadius = '8px';
    card.style.margin = '10px';
    card.style.background = '#000';
    card.style.transition = '0.3s linear';
    card.style.transform = 'translateY(-5px)';
  });
  add_click_effect_to_card(cards);
}

async function fetch_favorite_series(ids) {

  const serie_ids = ids || [];
  const isSearchActive = main_grid_title.innerText === 'Resultados da Pesquisa...';

  if (isSearchActive) {
    document.querySelectorAll(".card .my-list-button").forEach((button) => {
      const id = button.closest(".card").getAttribute("data-id");
      button.classList.toggle("change-color", serie_ids.includes(id));
    });
    return;
  }

  for (const id of serie_ids) {

    let generos = "";

    const serieData = await get_series_by_id(id);
    serieData.genres.map((e) => generos += (e.id + ","));

    const usuarioGenero = {
      usuarioId: localStorage.getItem("emailUsuario")
    };

    await fetch(`http://localhost:8080/api/generosUsuario/salvar?generos=${generos}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioGenero)
    });

    if (serieData && serieData.poster_path) {
      main_grid.innerHTML += `
        <div class="card" data-id="${serieData.id}" data-type="tv">
          <div class="img">
            <img src="${image_path + serieData.poster_path}" alt="${serieData.title}">
          </div>
        </div>
      `;
    }
  }

  // Aplica o CSS ao carregar os cards
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.position = 'relative';
    card.style.width = '220px';
    card.style.height = '320px';
    card.style.borderRadius = '8px';
    card.style.margin = '10px';
    card.style.background = '#000';
    card.style.transition = '0.3s linear';
    card.style.transform = 'translateY(-5px)';
  });
  add_click_effect_to_card(cards);
}

async function fetch_recomended_movies() {
  const resp = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&page=1&with_genres=${await generoPreferido()}`
  );
  const respData = await resp.json();
  respData.results.slice(0, 20).forEach((e) => {
    recomended_movies_el.innerHTML += `
      <div class="card" data-id="${e.id}" data-type="movie">
        <div class="img">
          <img src="${image_path + e.poster_path}" alt="${e.title}">
        </div>
      </div>
    `;
  });
  const cards = document.querySelectorAll(".card");
  add_click_effect_to_card(cards);
}

async function fetch_recomended_series() {
  const resp = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pt-BR&page=1&with_genres=${await generoPreferido()}`
  );
  const respData = await resp.json();
  respData.results.slice(0, 20).forEach((e) => {
    recomended_movies_el.innerHTML += `
      <div class="card" data-id="${e.id}" data-type="tv">
        <div class="img">
          <img src="${image_path + e.poster_path}" alt="${e.title}">
        </div>
      </div>
    `;
  });
  const cards = document.querySelectorAll(".card");
  add_click_effect_to_card(cards);
}

async function fetch_popular_movies() {
  popular_movies_el.innerHTML = "";
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
  );
  const respData = await resp.json();
  respData.results.slice(0, 20).forEach((e) => {
    popular_movies_el.innerHTML += `
      <div class="card" data-id="${e.id}" data-type="movie">
        <div class="img">
          <img src="${image_path + e.poster_path}" alt="${e.title}">
        </div>
      </div>
    `;
  });
  const cards = document.querySelectorAll(".card");
  add_click_effect_to_card(cards);
}

async function fetch_popular_series() {
  popular_series_el.innerHTML = "";
  const resp = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=pt-BR`
  );
  const respData = await resp.json();
  respData.results.slice(0, 20).forEach((e) => {
    popular_series_el.innerHTML += `
      <div class="card" data-id="${e.id}" data-type="tv">
        <div class="img">
          <img src="${image_path + e.poster_path}" alt="${e.name}">
        </div>
      </div>
    `;
  });
  const cards = document.querySelectorAll(".card");
  add_click_effect_to_card(cards);
}
async function fetch_trending() {
  const resp = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=pt-BR`
  );
  const respData = await resp.json();
  trending_el.innerHTML = "";
  respData.results.slice(0, 12).forEach((e) => {
    trending_el.innerHTML += `
      <div class="card" data-id="${e.id}" data-type="${e.media_type}">
        <div class="img">
          <img src="${image_path + (e.media_type === "movie" ? e.poster_path : e.backdrop_path)
      }" alt="${e.title || e.name}">
        </div>
      </div>
    `;
  });
  const cards = document.querySelectorAll(".card");
  add_click_effect_to_card(cards);
}

//SpringBoot
async function gerenciarFavorito(id, tipo) {
  if (localStorage.getItem("emailUsuario") != null) {
    try {
      const data = {
        usuarioId: localStorage.getItem("emailUsuario"),
        tituloId: id,
        tipoTitulo: tipo
      };

      const response = await fetch(`http://localhost:8080/api/titulosfavoritos/gerenciar?email=${localStorage.getItem("emailUsuario")}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        carregarFavoritos();
      } else {
        const errorMessage = await response.text();
        alert(`Erro: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }

  } else {
    alert('Você precisa estar logado para favoritar.');
  }
}

async function carregarFavoritos() {
  const isSearchActive = main_grid_title.innerText === "Resultados da Pesquisa...";

  // Evita limpar o main_grid se a pesquisa está ativa
  if (!isSearchActive) {
    main_grid.innerHTML = "";
  }
  recomended_movies_el.innerHTML = "";

  const response1 = await fetch(`http://localhost:8080/api/titulosfavoritos/listaFilmes?email=${localStorage.getItem("emailUsuario")}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response2 = await fetch(`http://localhost:8080/api/titulosfavoritos/listaSeries?email=${localStorage.getItem("emailUsuario")}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const titulos1 = await response1.json();
  const titulos2 = await response2.json();

  const tendenciasTitle = document.querySelector('.trending h1');
  const tendenciasChevronLeft = document.querySelector('.trending .bi-chevron-left');
  const tendenciasChevronRight = document.querySelector('.trending .bi-chevron-right');

  if (titulos1.length === 0 && titulos2.length === 0) {
    document.querySelector('.favorites').style.display = 'none';
    document.querySelector('.recomendacao').style.display = 'none';
    tendenciasTitle.style.marginTop = '20px';
    tendenciasChevronLeft.style.top = 'calc(32px + 50%)';
    tendenciasChevronRight.style.top = 'calc(32px + 50%)';
  } else {
    document.querySelector('.favorites').style.display = 'block';
    tendenciasTitle.style.marginTop = '';
    tendenciasChevronLeft.style.top = '52%';
    tendenciasChevronRight.style.top = '52%';

    limparGeneros();
    fetch_favorite_movies(titulos1);
    fetch_favorite_series(titulos2);

    fetch_recomended_movies();
    fetch_recomended_series();
  }
}

async function generoPreferido() {
  const response1 = await fetch(`http://localhost:8080/api/generosUsuario/generoFavorito?email=${localStorage.getItem("emailUsuario")}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const maiorPonto = await response1.text();
  return maiorPonto;

}

async function limparGeneros() {
  const usuarioGenero = {
    usuarioId: localStorage.getItem("emailUsuario")
  };


  await fetch(`http://localhost:8080/api/generosUsuario/limpar`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuarioGenero)
  });
}

document.getElementById('perfil').addEventListener('click', function () {
  if (localStorage.getItem("emailUsuario") != null) {
    window.location.href = "./usuario_show_meus_favoritos.html";
  } else {
    window.location.href = "./usuario_login.html";
  }
});

// Initialize the app

fetch_popular_movies();
fetch_popular_series();
fetch_trending();
carregarFavoritos();

