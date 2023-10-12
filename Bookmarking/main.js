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
const apiUrl = "https://opengraph.io/api/1.0/site";
const appId = "58858c7bcf07b61e64257391";


fillBookmarksList(bookmarks);

const myUrl = encodeURIComponent(bookmarksInput.value);

localStorage.setItem('my_thing', 'something')

function createBookmark(e) {
    e.preventDefault();

    if (!bookmarkInput.value) {
        alert('We need info!');
        return;
    }

    fetch(`${apiUrl}/${myUrl}?app_id=${appId}`)
        .then(response => response.json())
        .then(data => {
            const bookmark = {
                title: data.hybridGraph.title,
                image: data.hybridGraph.image,
                link: data.hybridGraph.url
            };
            bookmarks.push(bookmark);
            fillBookmarksList(bookmarks);
            storeBookmarks(bookmarks);
            bookmarksForm.reset();
        })
        .catch(error => {
            alert("There was an issue getting data...")
        });
}


function fillBookmarksList(bookmarks = []) {
    const bookmarksHtml = bookmarks.map((bookmark, i) => {
        return `
    <a href='${bookmark.link}' class='bookmark' data-id="${i}">
    <div class="img" style+"background-image:url('${bookmark.image}')></div>
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

    if (!e.target.matches('.glyphicon-remove')) return;

    const index = e.target.parentNode.dataset.id;
    bookmarks.splice(index, 1);
    fillBookmarksList(bookmarks);
    storeBookmarks(bookmarks);
}






bookmarksForm.addEventListener('submit', createBookmark);
bookmarksList.addEventListener('click', removeBookmark)