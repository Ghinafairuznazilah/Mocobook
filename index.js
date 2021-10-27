const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function(){

    const inputKeyword = document.querySelector('.input-keyword')
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + inputKeyword.value)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error))
})