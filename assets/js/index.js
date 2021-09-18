//Deklarasi variabel untuk di-set di dalam storage
const localBook = "BOOK";

//Deklarasi variabel yang menampung id book-form
const formSubmit = document.getElementById("book-form");

//Deklarasi variabel yang menampung id search-form
const formSearch = document.getElementById("search-form");

formSubmit.addEventListener('submit', (e) => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const checkBoxIsComplete = document.getElementById('isComplete');

    const isComplete = checkBoxIsComplete.checked;

    const bookData = {
        id: new Date().valueOf(),
        title: title,
        author: author,
        year: year,
        isComplete: isComplete
    }

    setBookToList(bookData);
    e.preventDefault();
    renderBookList(getListOfBook());
})

formSearch.addEventListener('submit', (e) => {
    const search = document.getElementById('search').value;
    e.preventDefault();
    searchBook(search);

})


window.addEventListener('DOMContentLoaded', function () {
    if (checkStorage()) {
        if (checkStorageItem()) {
            renderBookList(getListOfBook());
        }
    }
    const bookData = getListOfBook();
    for (let data of bookData) {
        console.log(data.judul)
    }
})