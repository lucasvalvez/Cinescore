const API_KEY = '57c041832a9ed97e147500e9ad8177bb';
const image_path = `https://image.tmdb.org/t/p/w1280`;
const popup_container = document.querySelector(".popup-container");
let currentPage = 1;
let searchQuery = '';
let selectedGenre = '';
let selectedAgeRating = '';

// Carregar gêneros de séries
const loadGenres = () => {
  fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=pt-BR`)
    .then(response => response.json())
    .then(data => {
      const genreSelect = document.getElementById('genreSelect');
      data.genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Erro ao carregar os gêneros:', error));
};

// Carregar séries
const loadSeries = (page) => {
  let url = searchQuery
    ? `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(searchQuery)}&page=${page}`
    : `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pt-BR&page=${page}`;

  if (selectedGenre) url += `&with_genres=${selectedGenre}`;
  if (selectedAgeRating) url += `&certification_country=US&certification=${selectedAgeRating}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      displaySeries(data.results);
      updatePagination(data.total_pages);
    })
    .catch(error => console.error('Erro na requisição:', error));
};

// Buscar séries
const searchSeries = () => {
  searchQuery = document.getElementById('searchInput').value.trim();
  selectedGenre = document.getElementById('genreSelect').value;
  selectedAgeRating = document.getElementById('ageRatingSelect').value;
  currentPage = 1;
  loadSeries(currentPage);
};

// Exibir séries

const displaySeries = (series) => {
  const seriesList = document.getElementById('seriesList');
  seriesList.innerHTML = series.length === 0
    ? '<p>Nenhum série encontrado.</p>'
    : series.map(serie => `
      <div class="card" data-id="${serie.id}" data-type="tv">
        <div class="img">
          <img src="${image_path + serie.poster_path}" alt="${serie.title || serie.name}">
        </div>
      </div>
    `).join('');

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

};

function add_click_effect_to_card(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", () => show_popup(card));
  });
}

// Atualizar paginação
const updatePagination = (totalPages) => {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="bi bi-arrow-left-circle"></i>';
    prevButton.onclick = () => {
      currentPage--;
      loadSeries(currentPage);
    };
    pagination.appendChild(prevButton);
  }

  const pageInfo = document.createElement('span');
  pageInfo.innerText = `Página ${currentPage}`;
  pagination.appendChild(pageInfo);

  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<i class="bi bi-arrow-right-circle"></i>';
    nextButton.onclick = () => {
      currentPage++;
      loadSeries(currentPage);
    };
    pagination.appendChild(nextButton);
  }
};

// Evento de clique no botão de busca
document.getElementById('searchSeries').addEventListener('click', searchSeries);

// Exibir detalhes da série


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
function generateSingleInfo(label, value) {
  return `
      <div class="single-info">
        <span>${label}:</span>
        <span>${value}</span>
      </div>
    `;
}
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
  });
  setupLikeDislike(id);
  setupComments(id);
}
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
    localStorage.setItem("tipo","movie");
  } else {
    data = await get_series_by_id(id);
    localStorage.setItem("tipo","tv");
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

// Funções auxiliares
const getGenres = (genres) => genres.map(genre => genre.name).join(', ');
const getLanguages = (languages) => languages.map(language => language.name).join(', ');
const getAgeRating = (serie) => serie.certification || 'N/A';
const getTrailer = (videos) => videos.find(video => video.type === 'Trailer')?.key || '';

// Fechar detalhes da série
const closeDetails = () => {
  const details = document.querySelector('.movie-details');
  if (details) {
    details.remove();
    document.querySelector('.main-content').style.display = '';
    document.removeEventListener('keydown', handleKeyDown);
  }
};

// Tratar pressionamento de tecla
const handleKeyDown = (event) => {
  if (event.key === 'Escape') closeDetails();
};

// Manipular favoritos no localStorage
const get_LS = () => JSON.parse(localStorage.getItem('favorites')) || [];

const add_to_LS = (id) => {
  const favorites = get_LS();
  favorites.push({ id });
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
const remove_LS = (id) => {
  const favorites = get_LS().filter(fav => fav.id !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

//SpringBoot

async function gerenciarFavorito(id, tipo) {

  if (localStorage.getItem("emailUsuario") != null) {

    const data = {
      usuarioId: localStorage.getItem("emailUsuario"),
      tituloId: id,
      tipoTitulo: tipo,
    };

    try {
      const response = await fetch('http://localhost:8080/api/titulosfavoritos/gerenciar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
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

// Carregar gêneros e séries ao iniciar
loadGenres();
loadSeries(currentPage);
