function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.querySelector(".gallery-modal-image");
const closeButton = document.querySelector(".gallery-close");
const prevButton = document.querySelector(".gallery-prev");
const nextButton = document.querySelector(".gallery-next");

let galleryItems = [];
let currentGalleryIndex = 0;

function openGallery(images, index) {
    galleryItems = images;
    currentGalleryIndex = index;

    if (galleryItems.length === 1) {
        prevButton.classList.add("hidden");
        nextButton.classList.add("hidden");
    } else {
        prevButton.classList.remove("hidden");
        nextButton.classList.remove("hidden");
    }

    updateGalleryDisplay();
    galleryModal.classList.add("open");
    galleryModal.setAttribute("aria-hidden", "false");
}

function updateGalleryDisplay() {
    if (!galleryItems.length) return;

    const image = galleryItems[currentGalleryIndex];
    galleryImage.src = image;
    galleryImage.alt = document.querySelector(".stacked-gallery[data-images='" + galleryItems.join(",") + "']")?.dataset.title || "Gallery image";
}

function closeGallery() {
    galleryModal.classList.remove("open");
    galleryModal.setAttribute("aria-hidden", "true");
}

function showPreviousImage() {
    if (!galleryItems.length) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateGalleryDisplay();
}

function showNextImage() {
    if (!galleryItems.length) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateGalleryDisplay();
}

document.querySelectorAll(".stacked-gallery").forEach((gallery) => {
    const images = gallery.dataset.images.split(",").map((image) => image.trim());

    gallery.addEventListener("click", () => {
        openGallery(images, 0);
    });
});

closeButton.addEventListener("click", closeGallery);
prevButton.addEventListener("click", showPreviousImage);
nextButton.addEventListener("click", showNextImage);

galleryModal.addEventListener("click", (event) => {
    if (event.target === galleryModal) {
        closeGallery();
    }
});

document.addEventListener("keydown", (event) => {
    if (galleryModal.classList.contains("open")) {
        if (event.key === "Escape") {
            closeGallery();
        }
        if (event.key === "ArrowRight") {
            showNextImage();
        }
        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }
    }
});

