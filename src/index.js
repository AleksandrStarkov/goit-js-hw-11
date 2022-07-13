import './css/styles.css';
import articlesTpl from './template/card.hbs';
import LoadMoreBtn from './js/load-more';
import refs from './js/refs';
// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewApiServise from './js/serviceKey';

const message = {
  textNotFound:
    '"Sorry, there are no images matching your search query. Please try again."',
  textLastPage: "We're sorry, but you've reached the end of search results.",
  textEmptyInput: 'Empty request, make your choice',

  notFound() {
    Notify.failure(this.textNotFound);
  },
  lastPage() {
    Notify.warning(this.textLastPage);
  },
  totalHits(value) {
    Notify.info(`Hooray! We found ${value} images.`);
  },
  emptyInput() {
    Notify.failure(this.textEmptyInput);
  },
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[type="button"]',
  hidden: true,
});
// console.log(loadMoreBtn);

const newsService = new NewApiServise();
function updateArticlesMarkup(hits) {
  const markup = articlesTpl(hits);
  // console.log(markup);
  if (markup !== '') {
    refs.imgContainer.insertAdjacentHTML('beforeend', markup);
    new SimpleLightbox('.gallery a', {
      navText: ['<=', '=>'],
      animationSpeed: '250ms',
      captionPosition: 'bottom',
      captionsData: 'alt',
      captionDelay: '250ms',
    });
    // message.totalHits(newsService.getTotalHits());
  } else {
    message.notFound();
    // loadMoreBtn.hide();
  }
}

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

async function searchFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;
  newsService.query = form.elements.searchQuery.value;

  if (newsService.query.trim() === '') {
    message.notFound();
    clearArticlesContainer();
    loadMoreBtn.hide();
    return;
  }
  newsService.resetPage();
  const imeges = await newsService.fetchArticles();
  refs.imgContainer.innerHTML = articlesTpl(imeges);
  // updateArticlesMarkup(imeges);
  console.log(imeges);
  console.log(articlesTpl(imeges));
  console.log(refs.imgContainer);
  if (newsService.page < newsService.totalPages) {
    loadMoreBtn.show();
  }

  // clearArticlesContainer();

  form.reset();
}

function fetchArticles() {
  newsService.incrementPage();

  newsService.fetchArticles().then(hits => {
    if (hits.length !== 0) {
      updateArticlesMarkup(hits);
    } else {
      loadMoreBtn.hide();
      return;
    }
  });

  if (newsService.page === newsService.totalPages) {
    loadMoreBtn.hide();
  }
}

function clearArticlesContainer() {
  refs.imgContainer.innerHTML = '';
}
