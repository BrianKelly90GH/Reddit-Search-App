import reddit from './searchRedditAPI';

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

// Form event listener
searchForm.addEventListener('submit', e => {
    // Get search field value
    const searchTermValue = searchInput.value;

    // Get sort by checkbox value
    const sortByValue = document.querySelector('input[name="sortby"]:checked').value;

    // Get limit field value
    const searchLimitValue = document.getElementById('limit').value;

    // Check for valid input
    if (searchTermValue == '') {
      // Show message
      showMessage('Please add a search term', 'alert-danger');
    }

    // Clear input field once search is successful
    searchInput.value = ' ' ;

    // Search reddit
    reddit.search(searchTermValue, searchLimitValue, sortByValue).then(searchResults =>{
      let output = '<div class="card-columns">';
      // Loop through posts and test creation of div cards with bootstrap
      searchResults.forEach(post => {
        output += `
        <div class="card">
          <img class="card-img-top" src="..." alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        `;
      })
      output += '</div>';
      document.getElementById('results').innerHTML = output;
    });


    e.preventDefault();
});

// This function takes in a string message and a class name for to create a div and manipulate the DOM
function showMessage(message, className){
  // Create div
  const divMessage = document.createElement('div');

  // Add div class
  divMessage.className = `alert ${className}`;

  // Add text to div
  divMessage.appendChild(document.createTextNode(message));

  // Get id of the parent container for which divMessage will be inserted {Which is search-container}
  const searchContainer = document.getElementById('search-container');

  // Get id of the container search  for which divMessage will be inserted before {Which is search}
  const search= document.getElementById('search');

  // Insert the newly created divMessage after the parent container and before the search container
  searchContainer.insertBefore(divMessage, search);

  // Message time out
  setTimeout( () => document.querySelector('.alert').remove(), 2000)
}
