'use strict';
function userRepo(userName, responseJson){
  //checking results//
 console.log(responseJson); 
//checking if empty//
$('.js-error').empty();

$('.results').empty();

$('.results').append(`<h3>${userName} Repository</h3> <ul class="list"></ul>`) //making a list for each repository in array// 
for(let i = 0; i < responseJson.length; i++){
$('.list').append(
  `<li><a href="${responseJson[i].html_url}">${(responseJson[i].name)}</a></li>`
  )};
$('.results').removeClass('hidden');
};
function getRepo(userName, searchUrl){
  //creating object//
  const params = {
    type: 'owner',
    sort: 'full_name',
    direction: 'asc'
  };

  const keys = Object.keys(params)
  .map(key => `${encodeURIComponent(key)} = ${encodeURIComponent(params[key])}`).join('&');

  const url = searchUrl + userName + '/repos?' + keys;

  console.log(url);

  fetch(url)
  .then(response => {
  if (response.ok) {
    return response.json();
    }
  throw new Error(response.statusText);
  })
  .then (responseJson => userRepo(userName, responseJson))
  .catch(err => {
  $('.js-error').text('Something went wrong, please try again later.');
  });
}
function watchForm() {
  $('.js-form').submit( event => {
    event.preventDefault();
    const searchUrl = 'https://api.github.com/users/';
    const userName = $('.js-search').val();
    getRepo(userName, searchUrl);
  });
  }
  $(watchForm);