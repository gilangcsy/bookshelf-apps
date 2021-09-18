//Membuat fungsi check storage, yang akan me-return nilai true (jika browser support) dan sebaliknya
function checkStorage() {
    return typeof (Storage) !== 'undefined';
}


//Membuat fungsi check storage item, yang akan me-return nilai true (jika local storage item localBook bernilai null) dan sebaliknya
function checkStorageItem() {
    return localStorage.getItem(localBook) !== null;
}


// Membuat fungsi get list of book untuk me-return list dari buku yang sudah diinput
function getListOfBook() {
    if (checkStorage()) {
        return JSON.parse(localStorage.getItem(localBook)) || [];
    } else {
        return [];
    }
}


// Membuat fungsi untuk menyimpan data ke dalam web storage
function setBookToList(data) {
    let bookData = []
    if (checkStorageItem()) {
        bookData = JSON.parse(localStorage.getItem(localBook));
    } else {
        bookData = [];
    }
    bookData.unshift(data);
    localStorage.setItem(localBook, JSON.stringify(bookData));
}


// Membuat fungsi untuk menghapus data dari dalam web storage
function deleteBookFromList(id) {
    let bookData = [];
    if (checkStorageItem()) {
        bookData = JSON.parse(localStorage.getItem(localBook));
    } else {
        bookData = [];
    }
    let index;
    for (let i = 0; i < bookData.length; i++) {
        if (bookData[i].id == id) {
            index = i;
        }
    }
    const answer = confirm(`Apakah Anda yakin ingin menghapus buku dengan judul ${bookData[index].title} ?`);
    if (answer) {
        alert(`Buku ${bookData[index].title} berhasil dihapus!`);
        bookData.splice(index, 1);
        localStorage.setItem(localBook, JSON.stringify(bookData));
        renderBookList(getListOfBook());
    }
}


//Membuat fungsi untuk mengubah status pada buku
function changeBookStatus(id) {
    const bookData = getListOfBook();
    let index;
    for (let i = 0; i < bookData.length; i++) {
        if (bookData[i].id == id) {
            index = i;
        }
    }
    const switchBookStatus = {
        id: new Date().valueOf(),
        title: bookData[index].title,
        author: bookData[index].author,
        year: bookData[index].year,
        isComplete: bookData[index].isComplete == true ? false : true
    }
    bookData.splice(index, 1);
    bookData.unshift(switchBookStatus);
    localStorage.setItem(localBook, JSON.stringify(bookData));
    renderBookList(getListOfBook());
}


//Membuat fungsi pencarian buku
function searchBook(title) {
    const bookData = getListOfBook();
    const searchResult = [];
    for (let data of bookData) {
        if (data.title.includes(title)) {
            searchResult.unshift(data);
        }
    }
    renderBookList(true, searchResult);
}


//Membuat fungsi untuk merender isi dari web storage ke dalam HTMl
function renderBookList(isSearch, data) {
    const bookData = isSearch == true ? data : getListOfBook();
    const bookList = document.querySelector("#book-list-uncompleted");
    const bookListCompleted = document.querySelector("#book-list-completed");

    bookList.innerHTML = "";
    bookListCompleted.innerHTML = "";

    let i = 0;
    for (let data of bookData) {
        const textButtonStatus = data.isComplete == false ? `Selesai Dibaca` : `Belum Selesai Dibaca`;

        let row = document.createElement('div');
        row.className = "card_content";

        row.innerHTML = `<h2 class="card_title">${data.title}</h2>`;
        row.innerHTML += `<p class="card_text">${data.author} - ${data.year}</p>`;
        row.innerHTML += `<button onclick="changeBookStatus(${data.id})" class="btn card_btn">${textButtonStatus}</button><br>`;
        row.innerHTML += `<button onclick="deleteBookFromList(${data.id})" class="btn card_btn">Hapus</button>`;

        if (data.isComplete == false) {
            let li = document.createElement('li');
            li.className = "cards_item";
            let liAppend = bookList.appendChild(li);

            let div = document.createElement('div');
            div.className = "card";
            let divAppend = liAppend.appendChild(div);
            divAppend.appendChild(row);
        } else {
            let li = document.createElement('li');
            li.className = "cards_item";
            let liAppend = bookListCompleted.appendChild(li);

            let div = document.createElement('div');
            div.className = "card";
            let divAppend = liAppend.appendChild(div);
            divAppend.appendChild(row);
        }
        i++;
    }
}