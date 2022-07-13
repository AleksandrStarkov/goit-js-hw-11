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
    message.totalHits(newsService.getTotalHits());
  } else {
    message.notFound();
    // loadMoreBtn.hide();
  }
}

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function searchFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;
  newsService.query = form.elements.searchQuery.value;

  clearArticlesContainer();
  newsService.resetPage();
  fetchArticles();
  form.reset();
}

function fetchArticles() {
  // loadMoreBtn.disable();
  // loadMoreBtn.show();

  newsService.fetchArticles().then(hits => {
    updateArticlesMarkup(hits);

    if (hits.length !== 0) {
      newsService.incrementPage();
      loadMoreBtn.show();
      // console.log(hits);
    } else {
      loadMoreBtn.hide();
      return;
    }
  });

  if (newsService.page !== newsService.totalPages) {
    // console.log(newsService.page);
    // console.log(newsService.totalPages);
    // if (entries[0].isIntersecting) {
    // newsService.increasePage();
    // message.lastPage();
    loadMoreBtn.hide();
    // observer.unobserve(entries[0].target);
    // observer.observe(document.querySelector('.photo-card:last-child'));
    // }
  }
  return;
  // } else {
  //   // if (entries[0].isIntersecting) {
  //   // observer.unobserve(entries[0].target);
  //   message.lastPage();
  //   // }
  // }
}

function clearArticlesContainer() {
  refs.imgContainer.innerHTML = '';
}
