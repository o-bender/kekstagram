import {isAcceptKey, isEscapeKey} from './utils.js';

const modalWindowElement = document.querySelector('.big-picture');
const photoElement = modalWindowElement.querySelector('.big-picture__img img');
const photoDescriptionElement = modalWindowElement.querySelector('.social__caption');
const likesElement = modalWindowElement.querySelector('.likes-count');
const showedCommentsCountElement = modalWindowElement.querySelector('.social__showed-comment-count');
const totalCommentsCountElement = modalWindowElement.querySelector('.social__comment-count .comments-count');
const closeButtonElement = modalWindowElement.querySelector('.big-picture__cancel');
const commentsElement = modalWindowElement.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('template#social__comment').content.querySelector('.social__comment');


const closePictureModal = () => {
  document.body.classList.remove('modal-open');
  modalWindowElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
}

const onCloseButtonKeydown = (evt) => {
  if (isAcceptKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const onCloseButtonClick = closePictureModal;

const createModalComment = ({name, avatar, message}) => {
  const commentElement = commentTemplateElement.cloneNode(true);
  const pictureElement = commentElement.querySelector('.social__picture');
  pictureElement.src = avatar;
  pictureElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderModalComments = (comments) => commentsElement.append(...comments.map(createModalComment));

const makeSequence = (step) => {
  let index = 0;
  return () => {
    const prev = index;
    index += step;
    return [prev, index];
  };
};

const renderMoreComments = (commentsLoaderElement, stepSequence, comments) => {
  const [prev, index] = stepSequence();
  renderModalComments(comments.slice(prev, index));
  showedCommentsCountElement.textContent = index;
  if (comments.length <= index) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const makeCommentsLoaderElement = () => {
  const commentsLoaderElement = modalWindowElement.querySelector('.comments-loader');
  const newCommentsLoaderElement = commentsLoaderElement.cloneNode(true);
  newCommentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.replaceWith(newCommentsLoaderElement);

  return newCommentsLoaderElement;
};

const initCommentsLoader = (comments) => {
  const commentsLoaderElement = makeCommentsLoaderElement();
  totalCommentsCountElement.textContent = comments.length;
  const stepSequence = makeSequence(5);
  renderMoreComments(commentsLoaderElement, stepSequence, comments);
  commentsLoaderElement.addEventListener('click', () => renderMoreComments(commentsLoaderElement, stepSequence, comments));
};

const clearModalComments = () => (commentsElement.innerHTML = '');

const openBigPictureModal = (url, likes, comments, description) => {
  photoElement.src = url;
  photoElement.alt = description;
  likesElement.textContent = likes;
  photoDescriptionElement.textContent = description;

  clearModalComments();
  initCommentsLoader(comments);

  document.body.classList.add('modal-open');
  modalWindowElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

closeButtonElement.addEventListener('click', onCloseButtonClick);
closeButtonElement.addEventListener('keydown', onCloseButtonKeydown);

export {openBigPictureModal};
