window.addEventListener('load', () => {
  

    const propertyCardWrapper = document.getElementById('property-card-wrapper');

    window.fetch('https://admin.pisosautoproject.com/api/v1/projects')
      .then(response =>response.json())
      .then(response =>{
        response.projects.forEach((project) => {
          propertyCardWrapper.innerHTML += `
            <div class="col-md-4"  onclick="location.href='pis.html?id=${project.id}';" >
              <div class="card-box-a card-shadow"  >
                <div class="img-box-a" >
                  <img 
                    src="https://admin.pisosautoproject.com${project.pictures[0]}"
                    alt="" class="img-a img-fluid img-min-size-grid" 
                    width="400"
                    height="400"
                  />
                </div>
               
                <div class="card-overlay">
                  <div class="card-overlay-a-content">
                    <div class="card-header-a">
                      <h2 class="card-title-a">
                        <a href="pis.html?id=${project.id}">${project.title}</a>
                      </h2>
                    </div>
                    <div class="card-body-a">
                      <div class="price-box d-flex">
                      <a href="pis.html?id=${project.id}" class="link-a">
                        <span class="price-a">Desde ${formatDigit(project.min_price)}€</span>
                        </a>
                      </div>
                      <a href="pis.html?id=${project.id}" class="link-a">Més detalls
                        <span class="ion-ios-arrow-forward"></span>
                      </a>
                    </div>
                  </div>
                </div>
                
              </div>
             
            </div>
           
          `;
      });
      })
    
});




function formatDigit(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
