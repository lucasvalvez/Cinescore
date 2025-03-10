function toggleVideo() {
    const trailer = document.querySelector('.trailer');
    const video = document.querySelector('video');
    trailer.classList.toggle('active');

    video.currentTime = 0;
    video.pause();
}


function setupNavigation(section) {
    let left_btn = section.querySelector('.bi-chevron-left');
    let right_btn = section.querySelector('.bi-chevron-right');
    let cards = section.querySelector('.movies-grid');

    left_btn.addEventListener('click', () => {
        cards.scrollLeft -= 140;
    });

    right_btn.addEventListener('click', () => {
        cards.scrollLeft += 140;
    });
}

let sections = document.querySelectorAll('.movies-container');

sections.forEach(setupNavigation);
