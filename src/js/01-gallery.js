import { galleryItems } from './gallery-items.js';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);
const divGalery = document.querySelector('.gallery');

const galeryBlock = createImegyList(galleryItems);

function createImegyList(items) {
  return items
    .map(
      item => `
            <a class="gallery__link" href="${item.original}">
            <img
                class="gallery__image"
                src="${item.preview}"
                alt="${item.description}"
            />`,
    )
    .join('');
}

divGalery.innerHTML = galeryBlock;

new SimpleLightbox('.gallery a', {
  navText: ['<=', '=>'],
  animationSpeed: '250ms',
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: '250ms',
});
