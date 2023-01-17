const books = document.querySelectorAll(".book-bg");
const booksArray = [...books]
const back = document.getElementById("back");
const shelfDiv = document.getElementById("shelf")
const addBookClass = ["graphic", "data", "photo", "landscape", "writing", "web"];
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2")
const button3 = document.getElementById("button3")
const closeBtn = document.getElementById("closeBtn")
const addBooksSec = document.getElementById("addBookSec");
const closePage = document.getElementById("back");
const mic = document.getElementById("mic")
//All Inputs
const bookNameEl = document.getElementById("bookName");
const writerEl = document.getElementById("writer");
const publsiherEl = document.getElementById("publisher");
const startingEl = document.getElementById("starting");
const finishEl = document.getElementById("finish");
const photoUrlEl = document.getElementById("photoUrl");
const aboutBookEl = document.getElementById("aboutBook");
const bookContainer = document.getElementById("shelf");




const bookClasses = ["graphic", "data", "photo", "landscape", "writing", "web"]

// const bookList = [{
//     bookname:"Aydaki Keçi 1",
//     writer:"Ahmet Selvi",
//     publisher:"Ada Yayınları",
//     starting:"27.07.2023",
//     finishing:"31.08.2023",
//     coverPhotoUrl: " ",
//     notes:"deneme bir ki üç asd"
// },{
//     bookname:"Aydaki Keçi 2",
//     writer:"Ahmet Selvi",
//     publisher:"Ada Yayınları",
//     starting:"27.07.2023",
//     finishing:"31.08.2023",
//     coverPhotoUrl: " ",
//     notes:"deneme bir ki üç asd"
// },{
//     bookname:"Aydaki Keçi 3",
//     writer:"Ahmet Selvi",
//     publisher:"Ada Yayınları",
//     starting:"27.07.2023",
//     finishing:"31.08.2023",
//     coverPhotoUrl: " ",
//     notes:"deneme bir ki üç asd"
// },{
//     bookname:"Aydaki Keçi 4",
//     writer:"Ahmet Selvi",
//     publisher:"Ada Yayınları",
//     starting:"27.07.2023",
//     finishing:"31.08.2023",
//     coverPhotoUrl: " ",
//     notes:"deneme bir ki üç asd"
// }]
const bookList = getBooksLocal();


//Create Books
function createBooks() {

    bookList.forEach((data, index) => {
        createBook(data, index)
    })
}

//Create Book 

function createBook(data, index) {
    const book = document.createElement("div");
    book.classList.add(`book-bg`);
    book.classList.add(`${bookClasses[Math.floor(Math.random() * 6)]}`)

    book.innerHTML = `
    <div class="book">
          <div id="book-shading"></div>
          <h1 style='margin-left: 45px; line-height: 1%'> ${data.bookname} </h1>
         
          <span id="booksNum"> ${index + 1} </span>
          <div class="contents">
            <div id="back"><svg id="bi" viewBox="0 0 512 512" width="100" title="chevron-circle-left">
                <path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"></path>
              </svg></div>
            <div class="page">
              <div class="illus" style="background-image: url(${data.photoUrl})">
              </div>
              <div>
                
             </br>
             <h5 style='margin-left: 0px; line-height:10%'><b>Yazar</b>: ${data.writer}</h5>

                <p class="text"> <b>Start </b>: ${data.start} <b> Finish: ${data.finishing}</b> <b> Total: </b> ${parseInt(data.finishing.slice(8), 10) - parseInt(data.start.slice(8), 10)} day </p>
              </div>
            </div>
            <div class="page">
              <div>
              <p class="text"> ${data.notes}</p>
              </div>
              <button type="button" class="btn btn-primary" id="button4">Delete Book</button>

            </div>
            <div id="page-shading"></div>
          </div>
        </div>
    
    
    
    `;

    //${data.start} Finish: ${data.finishing} Total: ${parseInt(data.finishing.slice(8),10) - parseInt(data.start.slice(8),10)}


    bookContainer.appendChild(book);

    book.addEventListener("click", () => {
        book.classList.toggle("active")
    })


}


function getBooksLocal() {
    const books = JSON.parse(localStorage.getItem("books"))

    return books === null ? [] : books
}


function addBookToDatabase(books) {

    localStorage.setItem("books", JSON.stringify(books))
    window.location.reload();





}

createBooks()
//Add Book to Database 
button3.addEventListener("click", () => {
    const bookname = bookNameEl.value;
    const writer = writerEl.value;
    const publisher = publsiherEl.value;
    const start = startingEl.value;
    const finishing = finishEl.value;
    const photoUrl = photoUrlEl.value;
    const notes = aboutBookEl.value;


    if (bookname && writer) {
        const newBook = { bookname, writer, publisher, start, finishing, photoUrl, notes }


        bookList.push(newBook);

        createBooks();

        addBookToDatabase(bookList)



    }




})



//OpenBook Modal 

button1.addEventListener("click", () => addBooksSec.classList.add("active2"))
closeBtn.addEventListener("click", () => addBooksSec.classList.remove("active2"));


// Clear Local Storage

button2.addEventListener("click", () => {
    if (window.confirm("All data will be clear") === true) {
        localStorage.clear();
        window.location.reload();

    }

})


//Microphone active stuffs
let recognition = new webkitSpeechRecognition() || new SpeechRecognition();


function aboutBook(e) {
    let speakValue = e.results[0][0].transcript;
    speakValue = " " + speakValue
    aboutBookEl.innerHTML += speakValue

}

// click mic and start record mic
mic.addEventListener("click", () => {
    console.log("ok")
    recognition.start();

})

//Listen and result
recognition.addEventListener('result', (e) => {
    aboutBook(e)
});

//For ongoing speaking
recognition.addEventListener("end", () => recognition.start())






