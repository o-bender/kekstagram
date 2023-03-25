import {isEscapeKey} from './utils.js';

const MESSAGE_LENGTH = 140;
const MESSAGE_ERROR_TEXT = `Максимальная длина ${MESSAGE_LENGTH} символов`;
const HASHTAG_MAX_COUNT = 5;
const TAG_ERROR_TEXT = 'Неправильно введены хештеги';
const HASHTAG_RULES = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadFile = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const formUploadPicture = document.querySelector('.img-upload__overlay');
const closeFormButton = formUploadPicture.querySelector('#upload-cancel');
const hashtagsField = formUploadPicture.querySelector('.text__hashtags');
const descriptionField = formUploadPicture.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidTag = (tag) => HASHTAG_RULES.test(tag);

const validateMessage = (value) => value.length <= MESSAGE_LENGTH;

const hasValidateCount = (tags) => tags.length <= HASHTAG_MAX_COUNT;

const hasUniqueTags = (tags) => tags.length === new Set(tags).size;

const validateTags = (value) => {
  const tags = value.trim().toLowerCase().split(/\s+/);
  return hasValidateCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

const openFormUploadImage = () => {
  formUploadPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onFormKeydown);
};

const closeFormUploadImage = () => {
  form.reset();
  pristine.reset();

  document.body.classList.remove('modal-open');
  formUploadPicture.classList.add('hidden');

  document.removeEventListener('keydown', onFormKeydown);
};

function onFormKeydown (evt) {
  if(document.activeElement === descriptionField || document.activeElement === hashtagsField) {
    evt.stopPropagation();
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormUploadImage();
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    form.submit();
  }
};

const init = () => {
  pristine.addValidator(descriptionField, validateMessage, MESSAGE_ERROR_TEXT);
  pristine.addValidator(hashtagsField, validateTags, TAG_ERROR_TEXT);

  form.addEventListener('submit', onFormSubmit);
  uploadFile.addEventListener('change', openFormUploadImage);
  closeFormButton.addEventListener('click', closeFormUploadImage);
}

export { init };