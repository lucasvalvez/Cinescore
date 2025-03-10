const profileImage = document.getElementById("profileImage");
const profileModal = document.getElementById("profileModal");
const closeModal = document.getElementById("closeModal");

profileImage.onclick = function () {
    profileModal.style.display = "flex";
}

closeModal.onclick = function () {
    profileModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === profileModal) {
        profileModal.style.display = "none";
    }
}
