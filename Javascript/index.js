// Import fuction from other javascript file that fecthes data from the Reddit API
import reddit from '../Javascript/searchRedditAPI';

// Get the search form element
const searchForm = document.getElementById('search-form');

// Get the search input element
const searchInput = document.getElementById('search-input');

// Set a guard for the alert messages for empty input box
let alertMessage = false;

// Form event listener
searchForm.addEventListener('submit', e => {
    // Get search field value
    const searchTermValue = searchInput.value

    // Get sort by checkbox value
    const sortByValue = document.querySelector('input[name="sortby"]:checked').value;

    // Get limit field value
    const searchLimitValue = document.getElementById('limit').value;

    // Check for valid input
    if (searchTermValue == '' && alertMessage != true) {

      // Set the guard of the alert message to true and show message
      alertMessage = true;
      showMessage('Please add a search term', 'alert-danger');
    }

    // Clear input field once search is successful
    searchInput.value = '' ;

    // Search reddit
    reddit.search(searchTermValue, searchLimitValue, sortByValue).then(searchResults =>{

      // Set output varible to html markup
      let output = '<div class="card-columns">';
      // Loop through posts and test creation of div cards with bootstrap
      searchResults.forEach(post => {

        // Check for an image with the post and if doesnt set image to stock image
        let image = post.preview
        ? post.preview.images[0].source.url
        : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';

        // Concat the results of the fetch to the output
        output += `
        <div class="card text-white bg-secondary mb-3">
          <img class="card-img-top" src="${image}" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateString(post.selftext, 100)}</p>
          <a href="${post.url}" target="_blank
        " class="btn btn-dark">Read More</a>
        <hr>
        <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
        <span class="badge badge-dark">Score: ${post.score}</span>
          </div>
        </div>
        `;
      })
      // Concat the end of the HTML tag to the output 
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
  setTimeout( () => document.querySelector('.alert').remove(), 2000 );
  //Message guard time out
  setTimeout( () => alertMessage = false, 2000 );
}

// Truncate String Function
function truncateString(myString, limit) {
  const shortened = myString.indexOf(' ', limit);
  if (shortened == -1) return myString;
  return myString.substring(0, shortened);
}
