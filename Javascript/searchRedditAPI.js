// export file so index.js can use it
export default {
  // search function takes in three params
  search: function(searchTermValue, searchLimitValue, sortByValue) {
    // return fecth which is a promise
    return fetch(`http://www.reddit.com/search.json?q=${searchTermValue}&sort=${sortByValue}&limit=${searchLimitValue}`)
    .then(res => res.json())
    .then(data => {
      return data.data.children.map(data => data.data);
    }).catch(err => console.log(err));
  }
};
