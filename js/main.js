document.addEventListener('DOMContentLoaded', () => {
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
      document.getElementById('countdown').innerHTML = '<p style="font-size: 2rem; color: var(--primary-color);">¡El gran día ha llegado!</p>';
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const sliderDots = document.getElementById('sliderDots');
  let currentSlide = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

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

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  setInterval(nextSlide, 5000);
});

window.addToCalendar = function(eventType) {
  const title = '¡Cumpleaños de Lucha Libre - 7 Años!';
  const details = 'Una fiesta épica de lucha libre para celebrar los 7 años';
  const location = 'Salón de Eventos Campeón, Av. Principal 123, Centro';
  const startTime = '2025-12-15T15:00:00';
  const endTime = '2025-12-15T18:00:00';

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime.replace(/[-:]/g, '')}/${endTime.replace(/[-:]/g, '')}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;

  window.open(googleCalendarUrl, '_blank');
}

window.confirmAttendance = function() {
  const whatsappNumber = '1234567890';
  const message = 'Hola! Confirmo mi asistencia a la boda de María y Carlos.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');
}

window.openMaps = function(eventType) {
  const location = eventType === 'ceremonia'
    ? 'Iglesia San Francisco, Av. Principal 123, Centro'
    : 'Salón de Eventos El Jardín, Blvd. Las Flores 456, Zona Norte';

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  window.open(mapsUrl, '_blank');
}

window.shareEvent = function() {
  const shareData = {
    title: 'Boda de María & Carlos',
    text: '¡Nos casamos! Comparte este momento especial con nosotros. #MariayCarlos2025',
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log('Compartido exitosamente'))
      .catch((error) => console.log('Error al compartir:', error));
  } else {
    const text = `${shareData.text} ${shareData.url}`;
    navigator.clipboard.writeText(text)
      .then(() => alert('¡Enlace copiado al portapapeles!'))
      .catch(() => alert('No se pudo copiar el enlace'));
  }
}
