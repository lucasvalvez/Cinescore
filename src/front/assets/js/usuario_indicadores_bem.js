const API_KEY = '57c041832a9ed97e147500e9ad8177bb';
const image_path = `https://image.tmdb.org/t/p/w1280`;

const main_grid_title = document.querySelector(".favorites h1");
const likeGrid = document.querySelector(".favorites .titulosBemAvaliados");
const deslikeGrid = document.querySelector(".favorites .titulosMalAvaliados");
const comentGrid = document.querySelector(".favorites .titulosMaisComentados");
const popup_container = document.querySelector(".popup-container");
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

async function fetch_favorite_titles() {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
  );
  const respData = await resp.json();
  popular_movies_el.innerHTML = "";

  respData.results.slice(0, 12).forEach((e) => {
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

// Pegando favoritos do Spring
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

// Adicionando evento aos cards
function add_click_effect_to_card(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", () => show_popup(card));
  });
}

// requiziçoes a api

async function get_series_by_id(id) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=pt-BR`
  );
  const respData = await resp.json();
  return respData;
}

async function get_movie_by_id(id) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
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

function getLikesDislikes() {
  return JSON.parse(localStorage.getItem('likesDislikes')) || {};
}

function getLikeDislikeCount(id, type) {
  const data = getLikesDislikes();
  return data[id] ? (data[id][type] ? 1 : 0) : 0;
}

async function get_director(movie_id) {
  const creditsResp = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`
  );
  const creditsData = await creditsResp.json();
  const director = creditsData.crew.find((member) => member.job === "Director");
  return director ? director.name : "N/A";
}

// construtores de elementos

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

async function fetch_like_movies(ids) {
  const x_ids = ids;

  for (const id of x_ids) {
    const xData = await get_movie_by_id(id);
    if (xData && xData.poster_path) {
      likeGrid.innerHTML += `
          <div class="card" data-id="${xData.id}" data-type="movie">
            <div class="img">
              <img src="${image_path + xData.poster_path}" alt="${xData.title}">
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

async function fetch_like_series(ids) {
  const x_ids = ids;

  for (const id of x_ids) {
    const xData = await get_series_by_id(id);
    if (xData && xData.poster_path) {
      likeGrid.innerHTML += `
          <div class="card" data-id="${xData.id}" data-type="tv">
            <div class="img">
              <img src="${image_path + xData.poster_path}" alt="${xData.title}">
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

async function fetch_user_favorite_series(ids) {
  const x_ids = ids;

  for (const id of x_ids) {
    const xData = await get_series_by_id(id);
    if (xData && xData.poster_path) {
      main_grid.innerHTML += `
        <div class="card" data-id="${xData.id}" data-type="tv">
          <div class="img">
            <img src="${image_path + xData.poster_path}" alt="${xData.title}">
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

function generateSingleInfo(label, value) {
  return `
      <div class="single-info">
        <span>${label}:</span>
        <span>${value}</span>
      </div>
    `;
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
            <span>Adicionar aos favoritos:</span>
          </div>
          <button onclick="gerenciarFavorito(${id})" class="my-list-button"><i class="fa fa-plus" aria-hidden="true"></i> - Remover da lista</button>
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
    fetch_user_favorite_movies();
  });

  setupLikeDislike(id);
  setupComments(id);
}

//SpringBoot
async function gerenciarFavorito(id) {

  if (localStorage.getItem("emailUsuario") != null) {

    const data = {
      usuarioId: localStorage.getItem("emailUsuario"),
      tituloId: id,
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

  if (localStorage.getItem("emailUsuario") != null) {
    
    const nomes = [];
    const quantidades = [];

    const responseTitulosMaisCurtidos = await fetch(`http://localhost:8080/api/feedback/titulosMaisCurtidos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const titulosMaisCurtidos = await responseTitulosMaisCurtidos.json();

    for (i = 0; i < titulosMaisCurtidos.length; i++) {
      let data = titulosMaisCurtidos[i];

      if (data.tipo === "movie") {
        let xData = await get_movie_by_id(data.id);
        if (xData && xData.poster_path) {
          likeGrid.innerHTML += `
          <div class="card" data-id="${xData.id}" data-type="movie">
            <div class="img">
              <img src="${image_path + xData.poster_path}" alt="${xData.title}">
            </div>
          </div>
        `;
        }
        nomes.push(xData.title);

      } else {
        let xData = await get_series_by_id(data.id);
        if (xData && xData.poster_path) {
          likeGrid.innerHTML += `
          <div class="card" data-id="${xData.id}" data-type="tv">
            <div class="img">
              <img src="${image_path + xData.poster_path}" alt="${xData.name}">
            </div>
          </div>
        `;
        }
        nomes.push(xData.name);

      }

      quantidades.push(data.qtde);
    }

    const ctx = document.getElementById('likeChart').getContext('2d');

    const feedbackChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: nomes,
        datasets: [{
          label: 'Numero de likes',
          data: quantidades,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });    

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

  const responsePorcentagem = await fetch(`http://localhost:8080/api/feedback/indicadorPorcentagemPositiva`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  var porcentagemX = await responsePorcentagem.text()

  document.getElementById('porcentagem').innerHTML = `${porcentagemX}% dos titulos são avaliados positivamente`

  }

}

async function iniciarCampos() {

  if (localStorage.getItem("emailUsuario") != "admin@cinescore.com") {
    document.querySelector('#indicadores').style.display = 'none';

    const response1 = await fetch(`http://localhost:8080/api/usuarios/nome?email=${localStorage.getItem("emailUsuario")}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const response2 = await fetch(`http://localhost:8080/api/usuarios/senha?email=${localStorage.getItem("emailUsuario")}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    document.getElementById('txtNome').value = await response1.text();
    document.getElementById('txtSenha').value = await response2.text();
  }

}

document.getElementById('logout').addEventListener('click', function () {
  localStorage.removeItem("emailUsuario");
  window.location.href = "./cine.html";
});


iniciarCampos()
carregarFavoritos()