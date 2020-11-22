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

      // const carouseldiv = document.getElementById('property-single-carousel');
      // response.pictures.forEach(pictureURL => {
      //   carouseldiv.innerHTML += `
      //     <div class="carousel-item-b">
      //       <img src="${'https://admin.pisosautoproject.com' + pictureURL}" alt="">
      //     </div>
      //   `
      // });
      //
      // $('#property-single-carousel').owlCarousel({
      //   loop: true,
      //   margin: 0,
      //   nav: true,
      //   navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
      //   responsive: {
      //     0: {
      //       items: 1,
      //     }
      //   }
      // });

    });
});

function formatDigit(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
