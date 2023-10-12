const body = document.body;
const input = document.querySelector('input[type=text]');
const overlay = document.querySelector('.overlay');

function showFloater() {
    body.classList.add('show-floater');
}

function closeFloater() {
    if (body.classList.contains('show-floater')) {
        body.classList.remove('show-floater');
    }

}

input.addEventListener('focus', showFloater);
overlay.addEventListener('click', closeFloater);



const bookmarksList = document.querySelector('.bookmarks-list');
const bookmarksForm = document.querySelector('.bookmark-form');
const bookmarksInput = document.querySelector('input[type=text]');
const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

fillBookmarksList(bookmarks);



localStorage.setItem('my_thing', 'something')

function createBookmark(e) {
    e.preventDefault();

// add a new bookmark to the bookmarks
const title = bookmarksInput.value;
const bookmark = {
    title: title
};
bookmarks.push(bookmark);
fillBookmarksList(bookmarks);
storeBookmarks(bookmarks);
// save bookmarks to localStorage



    bookmarksForm.reset();
}


function fillBookmarksList(bookmarks = []) {
    const bookmarksHtml = bookmarks.map((bookmark, i) => {
    return `
    <a href='#' class='bookmark' data-id="${i}">
    <div class="img"></div>
    <div class="title">${bookmark.title}</div>
    <span class="glyphicon glyphicon-remove"></span>
    </a>
    `;
}).join('');
    bookmarksList.innerHTML = bookmarksHtml;
}

function storeBookmarks(bookmarks = []) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function removeBookmark(e) {
//find index
    //remove with splice
    //fill list
    //update localStorage
    if (!e.target.matches('.glyphicon-remove')) return;

    const index = e.target.parentNode.dataset.id;
    bookmarks.splice(index, 1);
    fillBookmarksList(bookmarks);
    storeBookmarks(bookmarks);
}






bookmarksForm.addEventListener('submit', createBookmark);
bookmarksList.addEventListener('click', removeBookmark)