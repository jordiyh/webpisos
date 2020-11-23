window.addEventListener('load', () => {

  const projectid = window.location.search.split('=')[1]

  window.fetch('https://admin.pisosautoproject.com/api/v1/projects/' + projectid)
    .then(response => response.json())
    .then(response => {
      // title
      const title = document.getElementById('title');
      title.textContent = response.title;

      // Map
      const ubicacio = document.getElementById('gmap_canvas')
      ubicacio.src = `https://maps.google.com/maps?q=${response.maps_location}&t=&z=13&ie=UTF8&iwloc=&output=embed`

      // Description
      const descripcio = document.getElementById('description');
      descripcio.innerHTML = response.description;

      // Subtitle
      const subtitle = document.getElementById('subtitle');
      subtitle.innerHTML = response.subtitle;

      // minimum price
      const minprice = document.getElementById('minprice');
      minprice.innerHTML = `Des de ${formatDigit(response.min_price)}€`;

      const amenities = document.getElementById('amenities');
      response.amenties.forEach(amenity => {
        const listItem = document.createElement("li");
        listItem.textContent = amenity;
        amenities.appendChild(listItem);
      });

      const carouselWrapper = document.getElementById('carousel-wrapper');
      const carousel = document.createElement('div');
      carousel.id = 'property-single-carousel';
      carousel.className = 'owl-carousel owl-arrow gallery-property';

      response.pictures.forEach(pictureURL => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item-b carousel-image-wrapper';

        const itemImage = document.createElement('img');
        itemImage.src = 'https://admin.pisosautoproject.com' + pictureURL;

        carouselItem.appendChild(itemImage);
        carousel.appendChild(carouselItem);
      });

      carouselWrapper.appendChild(carousel);

      $('#property-single-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        navText: [
          '<i class="ion-ios-arrow-back" aria-hidden="true"></i>',
          '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'
        ],
        responsive: {
          0: {
            items: 1,
          }
        }
      });

      const contactForm = document.getElementById('contact-form');
      contactForm.onsubmit = onSubmitContactForm;
    });
});

function formatDigit(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function onSubmitContactForm(event) {
  event.preventDefault();

  const projectId = window.location.search.split('=')[1]

  const nameInput = document.getElementById('inputName');
  const emailInput = document.getElementById('inputEmail');
  const phoneInput = document.getElementById('inputPhone');
  const messageInput = document.getElementById('inputMessage');

  const formData = new FormData();
  formData.append('name', nameInput.value);
  formData.append('email', emailInput.value);
  formData.append('phone', phoneInput.value);
  formData.append('comment', messageInput.value);

  window.fetch(`https://admin.pisosautoproject.com/api/v1/projects/${projectId}/contact`, {
    method: 'POST',
    body: formData,
  }).then(response => {
    response.json().then(jsonResponse => {
      if (jsonResponse.success) {
        Swal.fire({
          title: 'Fet!',
          text: 'Formulari enviat.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          nameInput.value = '';
          emailInput.value = '';
          phoneInput.value = '';
          messageInput.value = '';
        });
      }
    });
  });

  return false;
}
