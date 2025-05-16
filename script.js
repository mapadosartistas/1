// Menu responsivo
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");

if (menuBtn && navigation) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");
  });
}

// Navegação do Slider
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const contents = document.querySelectorAll(".content");

const sliderNav = (manual) => {
  btns.forEach((btn) => btn.classList.remove("active"));
  slides.forEach((slide) => slide.classList.remove("active"));
  contents.forEach((content) => content.classList.remove("active"));

  btns[manual].classList.add("active");
  slides[manual].classList.add("active");
  contents[manual].classList.add("active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => sliderNav(i));
});

// Inicializando o mapa (Leaflet)
const mapContainer = document.getElementById('map');
if (mapContainer) {
  const map = L.map(mapContainer).setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  L.marker([0, 0]).addTo(map)
    .bindPopup("<b>Centro do Mundo</b><br>Onde tudo começa!")
    .openPopup();
}

// Troca automática de vídeos
const videoSlides = document.querySelectorAll('.video-slide');
let currentIndex = 0;

if (videoSlides.length > 0) {
  setInterval(() => {
    videoSlides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % videoSlides.length;
    videoSlides[currentIndex].classList.add('active');
  }, 5000);

  videoSlides[currentIndex].classList.add('active');
}

// Carrossel de imagens
let index = 0;
function moveSlide(step) {
  const slides = document.querySelectorAll('.carousel-images img');
  const container = document.querySelector('.carousel-images');

  if (!slides.length || !container) return;

  index = (index + step + slides.length) % slides.length;
  container.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(() => moveSlide(1), 5000);

// Menu de idiomas (dropdown) com troca de bandeira e redirecionamento
const languageBtn = document.getElementById('languageBtn');
const languageMenu = document.querySelector('.language-dropdown-menu');
const selectedFlag = document.getElementById('selected-flag');

if (languageBtn && languageMenu && selectedFlag) {
  // Toggle dropdown
  languageBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede fechamento imediato
    const isExpanded = languageBtn.getAttribute('aria-expanded') === 'true';
    languageBtn.setAttribute('aria-expanded', !isExpanded);
    languageMenu.style.display = isExpanded ? 'none' : 'block';
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', function (e) {
    if (!languageBtn.contains(e.target) && !languageMenu.contains(e.target)) {
      languageBtn.setAttribute('aria-expanded', false);
      languageMenu.style.display = 'none';
    }
  });

  // Trocar idioma ao clicar em uma opção
  document.querySelectorAll('.language-dropdown-menu li').forEach(item => {
    item.addEventListener('click', () => {
      const path = item.getAttribute('data-path');
      const flag = item.getAttribute('data-flag');
      if (flag) selectedFlag.src = flag;
      if (path) window.location.href = window.location.origin + path;
    });
  });
}
