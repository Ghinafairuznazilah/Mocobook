function showCards(m){
    return `
    <div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.volumeInfo.imageLinks.thumbnail}" class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title">${m.volumeInfo.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${m.volumeInfo.authors}</h6>
                      <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#booksdetailModal" data-imdbid="${m.id}">
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
            <img src="${m.volumeInfo.imageLinks.thumbnail}" class="img-fluid">
        </div>
        <div class="col-md">
          <ul class="list-group">
              <li class="list-group-item"><strong>Judul Buku : </strong> ${m.volumeInfo.title}</li>
              <li class="list-group-item"><strong>Sub Judul : </strong> ${m.volumeInfo.subtitle}</li>
              <li class="list-group-item"><strong>Penulis    : </strong> ${m.volumeInfo.authors}</li>
              <li class="list-group-item"><strong>publisher  : </strong> ${m.volumeInfo.publisher}</li>
              <li class="list-group-item"><strong>Jumlah Hal : </strong> ${m.volumeInfo.pageCount}</li>
              <li class="list-group-item"><strong>Deskripsi : </strong> <br> ${m.volumeInfo.description} </li>
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
.then(response=>
    {
        const books = response.items;
        let cards ='';
        books.forEach(m => cards += showCards(m));
        const booksContainer = document.querySelector('.books-container')
        booksContainer.innerHTML = cards;
        
        // ketika button modal di klik
        const modalDetailButton = document.querySelectorAll('.modal-detail-button');
        modalDetailButton.forEach(btn => {
            btn.addEventListener('click', function () {
                //ambil dataset
            const imdbid = this.dataset.imdbid;
                fetch('https://www.googleapis.com/books/v1/volumes?q='+imdbid)
                .then(response=> response.json())
                .then(m => {
                    // const booksDetail = showBooksDetail(m);
                    // const modalBody = document.querySelector('.modal-body');
                    // modalBody.innerHTML = booksDetail;
                    const detail = response.items;
                    let booksDetail = ""
                    detail.forEach(m => booksDetail = showBooksDetail(m));
                    const modalBody = document.querySelector('.modal-body');
                    modalBody.innerHTML = booksDetail;

                }) ;
            });
        })
    }
);
});

