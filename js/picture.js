import {openBigPictureModal} from './modal.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('template#picture').content.querySelector('.picture');


const createPictureElement = ({ url, likes, comments, description }) => {
  const element = pictureTemplateElement.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;

  element.addEventListener('click', () => openBigPictureModal(url, likes, comments, description));

  return element;
};

const renderPictures = (pictures) => {
  picturesElement.querySelectorAll('.picture').forEach((element) => element.remove());
  picturesElement.append(...pictures.map(createPictureElement));
};

export { renderPictures };
