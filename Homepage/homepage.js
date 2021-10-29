function showCards(m){
    return `
    <div class="main col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
        <div class="card mt-3 bg-dark">
            <button class="align-items-center p-2 text-center modal-detail-button" data-bs-toggle="modal" data-bs-target="#booksdetailModal">
                <img class="books-img" src="${m.volumeInfo.imageLinks.smallThumbnail}" alt="" class="rounded my-2">
                <h6 class="title" >${m.volumeInfo.title}</h6>
                <h7 class="author">${m.volumeInfo.authors}</h7>
            </button>
        </div>
    </div>
    `
}

function showBooksDetail(m){
    return `
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.volumeInfo.imageLinks.smallThumbnail}" class="img-fluid">
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