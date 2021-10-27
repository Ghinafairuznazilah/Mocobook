function showCards(m){
    return `
    <div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.img}" class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title">${m.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${m.auhtor}</h6>
                      <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#booksdetailModal">
                       Show Details</a>
                    </div>
                  </div>
            </div>
    `;
}


function showBooksDetail(m){
    return `
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.img}" class="img-fluid">
        </div>
        <div class="col-md">
          <ul class="list-group">
              <li class="list-group-item"><h4>judul buku</h4></li>
              <li class="list-group-item"><strong>penulis : </strong> Ahemsa Azaleav</li>
              <li class="list-group-item"><strong>penulis : </strong> Ahemsa Azaleav</li>
              <li class="list-group-item"><strong>penulis : </strong> Ahemsa Azaleav</li>
              <li class="list-group-item"><strong>penulis : </strong> <br> Ahemsa Azaleav</li>
            </ul>
        </div>
    </div>
    `;
}

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function(){
const inputKeyword = document.querySelector('.input-keyword');
fetch('https://www.googleapis.com/books/v1/volumes?q=' + inputKeyword.value)
.then(response =>response.json())
.then(response=> {
    const books = response.items;
    let cards ='';
    books.forEach(m => cards += showCards(m));
    const booksContainer = document.querySelector('.books-container')
    booksContainer.innerHTML = cards;
}
    
);
});