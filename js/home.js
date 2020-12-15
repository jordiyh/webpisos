window.addEventListener('load', () => {
  window.fetch('https://admin.pisosautoproject.com/api/v1/home-page-projects')
    .then(response => response.json())
    .then(response => {
      const carousel = document.getElementById('carousel')

      response.projects.forEach(project => {

        if (!project.pictures || !project.pictures.length || project.pictures.length === 0) {
          return;
        }

        carousel.innerHTML += `
          <div 
            class="carousel-item-a intro-item bg-image" 
            style="background-image: url(${'https://admin.pisosautoproject.com' + project.pictures[0]})"
          >
            <div class="overlay overlay-a"></div>
            <div class="intro-content display-table">
              <div class="table-cell">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-8">
                      <div class="intro-body">
                        <p class="intro-title-top">${project.subtitle}</p>
                        <h1 class="intro-title mb-4">${project.title}</h1>
                        <p class="intro-subtitle intro-price">
                          <a href="pis.html?id=${project.id}">
                            <span class="price-a">Des de ${formatDigit(project.min_price)} €</span>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      /*--/ Carousel owl /--*/
      $('#carousel').owlCarousel({
        loop: true,
        margin: -1,
        items: 1,
        nav: true,
        navText: [
          '<i class="ion-ios-arrow-back" aria-hidden="true"></i>',
          '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'
        ],
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      });
    });
});

function formatDigit(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
