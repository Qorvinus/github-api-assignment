'use strict'

function findSubmit() {
  $('form').submit(event => {
    event.preventDefault();
    const userHandle = $('.js-search-box').val();
    getHandle(userHandle);
  });
}

function getHandle(userHandle) {
  const searchUrl = 'https://api.github.com/users/' + userHandle + '/repos'
  fetch(searchUrl)
    .then(response => {
      if(reponse.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => generateRepos(responseJson))
    .catch(error => {
      $('.js-error-message').text(`Something went wrong...${err.message}`);
    });
}

function generateRepos(responseJson) {
  console.log(responseJson);
  $('.js-results-list').empty();
  for (let i = 0; i < responseJson.length; i++) {
  $('.js-results-list').append(
    `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3></li>`
  )};
  $('.js-results').removeClass('hidden');
}

$(findSubmit);