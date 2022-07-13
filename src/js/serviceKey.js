import axios from 'axios';

export default class NewApiServise {
  #API_KEY = '28584763-421dc035e00a550bd9f3576d4';
  #BASE_URL = 'https://pixabay.com';
  constructor() {
    this.searchQuery = null;
    this.page = 1;
    this.totalPages = 0;
    this.totalHits = 0;
  }

  async fetchArticles() {
    const options = new URLSearchParams({
      key: this.#API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: '200',
    });
    try {
      const response = await axios.get(`${this.#BASE_URL}/api/?${options}`);

      this.totalPages = Math.ceil(response.data.totalHits / 200);
      this.totalHits = response.data.totalHits;

      return response.data.hits;
    } catch (error) {
      console.log(error);
    }

    // return fetch(`${this.#BASE_URL}/api/?${options}`)
    //   .then(res => res.json())
    //   .then(({ hits }) => {
    //     this.incrementPage();
    //     // console.log(hits);
    //     return hits;
    //   });
  }

  resetPage() {
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
  }

  get query() {
    // console.log(searchQuery);
    return this.searchQuery;
  }
  set query(value) {
    this.searchQuery = value;
  }
  getTotalHits() {
    return this.totalHits;
  }
}
