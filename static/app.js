document.getElementById("fetch-data-button").addEventListener("click", fetchData);
document.getElementById("clean-data-button").addEventListener("click", cleanData);
document.getElementById("toggleExplanation").addEventListener("click", toggleExplanation);

const cardContainer = document.querySelector('.card-container');

function fetchData() {
  fetch('/data')
    .then(response => response.json())
    .then(data => {
          data['results'].forEach(user => {
          const card = document.createElement('div');
            card.classList.add('card');
            // create elements for the user's name, image, title, address, etc.
            const name = document.createElement('h2');
            name.textContent = user.name['title'] + ' '+ user.name['first'] + ' ' + user.name['last'];
            const image = document.createElement('img');
            image.src = user.picture['large'];

            const address = document.createElement('p');
            address.textContent = user.location['street']['number'] + ' ' + user.location['street']['name'] + ',' + user.location['city'] + ',' + user.location['country'];

            const star_rating = document.createElement('h2');
            star_rating.textContent = Math.floor(Math.random() * 100) + 1;

            // append the elements to the card
            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(star_rating);

            // append the card to the container
            cardContainer.appendChild(card);
          });
      });
}

function cleanData() {
  cardContainer.innerHTML= '';
}

function toggleExplanation(){
  const element = document.getElementById("explanation");
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

