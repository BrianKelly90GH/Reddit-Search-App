const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
    // Get search field value
    const searchTermValue = searchInput.value;
    console.log(searchTermValue);

    // Get sort by checkbox value
    const sortByValue = document.querySelector('input[name="sortby"]:checked').value;
    console.log(sortByValue);

    // Get limit field value
    const searchLimitValue = document.getElementById('limit').value;
    console.log(searchLimitValue);

    // Check for valid input
    if (searchTermValue == '') {
      // Show message
      showMessage('Please add a search term', 'alert-danger');
    }
    e.preventDefault();
});
