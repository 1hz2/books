class BooksList {
  constructor() {
    this.favoriteBooks = [];
    this.filters = [];
    this.booksList = [];
    this.formFilters = [];
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements() {
    this.booksList = document.querySelector('.books-list');
    this.formFilters = document.querySelector('.filters');
  }

  render() {
    for (let book of this.data) {
      const bookElement = this.generateBookElement(book);
      this.booksList.appendChild(bookElement);
    }
  }

  generateBookElement(book) {
    const template = document.querySelector('#template-book');
    const bookHTML = template.innerHTML;
    const bookElement = utils.createDOMFromHTML(bookHTML);

    bookElement.querySelector('.book__name').textContent = book.name;
    bookElement.querySelector('.product__base-price').textContent = `$${book.price}`;
    bookElement.querySelector('.book__rating__fill').textContent = `${book.rating}/10`;
    bookElement.querySelector('img').setAttribute('src', book.image);
    bookElement.querySelector('img').setAttribute('alt', book.name);
    bookElement.querySelector('.book__image').setAttribute('data-id', book.id);

    const ratingWidth = book.rating * 10;
    const ratingBgc = this.determineRatingBgc(book.rating);

    bookElement.querySelector('.book__rating__fill').style.width = `${ratingWidth}%`;
    bookElement.querySelector('.book__rating__fill').style.background = ratingBgc;

    return bookElement;
  }

  initActions() {
    this.booksList.addEventListener('dblclick', (event) => {
      const target = event.target;
      const imageElement = target.closest('.book__image');
      if (imageElement) {
        event.preventDefault();
        imageElement.classList.toggle('favorite');
        const bookId = imageElement.getAttribute('data-id');
        if (this.favoriteBooks.includes(bookId)) {
          const index = this.favoriteBooks.indexOf(bookId);
          this.favoriteBooks.splice(index, 1);
        } else {
          this.favoriteBooks.push(bookId);
        }
        console.log(this.favoriteBooks);
      }
    });

    this.formFilters.addEventListener('click', (event) => {
      const target = event.target;
      if (target.tagName === 'INPUT' && target.type === 'checkbox' && target.name === 'filter') {
        if (target.checked) {
          this.filters.push(target.value);
        } else {
          const index = this.filters.indexOf(target.value);
          this.filters.splice(index, 1);
        }
        console.log(this.filters);
      }
      this.filterBooks();
    });
  }

  filterBooks() {
    for (let book of this.data) {
      let shouldBeHidden = false;

      for (const filter of this.filters) {
        if (book.details && !book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);

      if (shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
  }

  init() {
    this.initData();
    this.getElements();
    this.render();
    this.initActions();
  }
}

const app = new BooksList();
app.init();
