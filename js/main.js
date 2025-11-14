// ========================================
// INICIALIZACIÓN DE LA PÁGINA
// ========================================
document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // CONTROL DE MÚSICA DE FONDO
  // Botón flotante para reproducir/pausar música
  // ========================================
  const musicBtn = document.getElementById('musicBtn');
  const backgroundMusic = document.getElementById('backgroundMusic');
  let isPlaying = false;

  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      backgroundMusic.pause();
      musicBtn.classList.remove('playing');
      isPlaying = false;
    } else {
      backgroundMusic.play();
      musicBtn.classList.add('playing');
      isPlaying = true;
    }
  });

  // ========================================
  // CONTADOR REGRESIVO
  // Cuenta días, horas, minutos y segundos hasta la fiesta
  // ========================================
  function updateCountdown() {
    const weddingDate = new Date('2025-12-06T14:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
      document.getElementById('countdownTitle').textContent = '¡Hoy es el gran día!';
      document.getElementById('countdown').innerHTML = '<p style="font-size: 2rem; color: var(--primary-color);">¡El gran día ha llegado!</p>';
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ========================================
  // SLIDER DE FOTOS
  // Carrusel de imágenes con navegación táctil
  // ========================================
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const sliderDots = document.getElementById('sliderDots');
  const slider = document.querySelector('.slider');
  let currentSlide = 0;
  let startX = 0;
  let isDragging = false;

  // Crear indicadores (dots) para cada foto
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  // Función para navegar a una foto específica
  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = n;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Navegación con botones
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // ========================================
  // SOPORTE TÁCTIL PARA EL SLIDER
  // Permite deslizar fotos en dispositivos móviles
  // ========================================

  // Touch events para móviles
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    // Si el deslizamiento es mayor a 50px, cambiar de foto
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  });

  // Mouse events para escritorio
  slider.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    slider.style.cursor = 'grabbing';
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
  });

  slider.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    slider.style.cursor = 'grab';

    const endX = e.clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  });

  slider.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      slider.style.cursor = 'grab';
    }
  });

  // Cambio automático cada 5 segundos
  setInterval(nextSlide, 5000);
});

// ========================================
// BOTÓN: AGREGAR A CALENDARIO
// Abre Google Calendar para guardar el evento
// ========================================
window.addToCalendar = function(eventType) {
  const title = '¡Cumpleaños de Lucha Libre - 7 Años!';
  const details = 'Una fiesta épica de lucha libre para celebrar mis 7 años';
  const location = 'Casa de mis abuelitos paternos';
  const startTime = '2025-12-06T14:00:00';
  const endTime = '2025-12-06T22:00:00';

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime.replace(/[-:]/g, '')}/${endTime.replace(/[-:]/g, '')}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;

  window.open(googleCalendarUrl, '_blank');
}

// ========================================
// BOTÓN: CONFIRMAR ASISTENCIA
// Abre WhatsApp para confirmar asistencia
// ========================================
window.confirmAttendance = function() {
  const whatsappNumber = '525646683940';
  const message = 'Confirmo mi asistencia a tu fiesta';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');
}

// ========================================
// BOTÓN: ABRIR UBICACIÓN EN GOOGLE MAPS
// Muestra la ubicación del evento en Maps
// ========================================
window.openMaps = function(eventType) {
  const mapsUrl = 'https://maps.app.goo.gl/iya5KFvPJYrtyH7Q9';

  window.open(mapsUrl, '_blank');
}

// ========================================
// BOTÓN: COMPARTIR EN INSTAGRAM
// Abre Instagram con el hashtag del evento
// ========================================
window.shareEvent = function() {
  const hashtag = 'CumpleañosLeo2025';
  const instagramUrl = `https://www.instagram.com/explore/tags/${hashtag}/`;

  window.open(instagramUrl, '_blank');
}

// ========================================
// LINK: CONTACTAR STUDIO DIGITAL MIZUNARA
// Abre WhatsApp para solicitar invitación personalizada
// ========================================
window.contactStudio = function() {
  const whatsappNumber = '525539638227';
  const message = 'Hola! Me gustaría solicitar mi propia invitación para un evento';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');
}
