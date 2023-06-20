let myLibrary = [];
let bookId=0;
let popup = document.getElementById('popup')

function cancel(event){
    event.preventDefault();
    hidePopup();   
}
function openPopup(){
popup.classList.add("open-popup");
}

function hidePopup(){
popup.classList.remove("open-popup");
document.querySelector('.form').reset();
}

function Book(title, author, numberOfPages, status){

    this.title=title;
    this.author=author;
    if(numberOfPages===''){
        this.pNumber=0;
    }
    else{
        this.pNumber=numberOfPages;
    }
    this.readCheck=status.checked;

    this.changeStatus = function(e){
          
        if(this.readCheck){
            this.readCheck=false;
            e.target.classList.remove('read-btn');
            e.target.classList.add('not-read-btn');
            e.target.textContent="Not Read";
        }
        else{
            this.readCheck=true;
            e.target.classList.remove('not-read-btn');
            e.target.classList.add('read-btn');
            e.target.textContent="Read";
        }
    }
}

function addBookToLibrary(){
    

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pNumber = document.getElementById('numberOfPages').value;
    let readCheck = document.getElementById('status');
    if(title===''){
        title='No Name';
    }
    if(author===''){
        author='No Author'
    }

    
    const book = new Book(title,author,pNumber,readCheck)
    
    
    myLibrary.push(book);
    populateLibrary(myLibrary[myLibrary.length-1]);
    hidePopup();
}

function populateLibrary(book){
 
    const bookShelf = document.querySelector('.books');
    const bookDiv = document.createElement('div');
    bookDiv.classList.add("book-div");
   
    const titleP = document.createElement('p');
    const authorP = document.createElement('p');
    const pagesP = document.createElement('p');
    const delBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    const readStatus = book.readCheck;
    delBtn.classList.add('del-button');
    delBtn.textContent='Remove';
    if (readStatus === true){
        readBtn.classList.add('read-btn');
        readBtn.textContent='Read';
    }
    else{
        readBtn.classList.add('not-read-btn');
        readBtn.textContent='Not Read';
    }
    titleP.textContent=`\"${book.title}\"`;
    authorP.textContent=`${book.author}`;
    pagesP.textContent=`${book.pNumber} pages`;
   
    readBtn.addEventListener('click',book.changeStatus);

    bookDiv.appendChild(titleP);
    bookDiv.appendChild(authorP);
    bookDiv.appendChild(pagesP);
    bookDiv.appendChild(readBtn);
    
    bookDiv.appendChild(delBtn);
    bookShelf.appendChild(bookDiv);

    delBtn.addEventListener('click',()=>{
       bookShelf.removeChild(bookDiv);
    });
}

function checkFormValidity(){
    let formTitle=document.querySelector('#title');
    let authorName=document.querySelector('#author');
    let numberOfPages=document.querySelector('#numberOfPages');
    let submitFlag=true;
    if (!formTitle.checkValidity()){
        formTitle.style.borderColor='red';
        submitFlag=false;
    }
    else{
        formTitle.style.borderColor='green';
    }
    if (!authorName.checkValidity()){
        authorName.style.borderColor='red';
        submitFlag=false;
    }
    else{
        authorName.style.borderColor='green';
    }
    if (!numberOfPages.checkValidity()){
        numberOfPages.style.borderColor='red';
        submitFlag=false;
    }
    else{
        numberOfPages.style.borderColor='green';
    }
    return submitFlag;
    
}
const addBookBtn = document.querySelector('.add');
const enterBookBtn = document.querySelector('.submitBook');
const cancelBtn =document.querySelector('.cancelButton');

addBookBtn.addEventListener('click', openPopup);
enterBookBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let bookIsValid = checkFormValidity()
    
    if(bookIsValid){
        
        addBookToLibrary()
    }
});
    

cancelBtn.addEventListener('click', cancel);
