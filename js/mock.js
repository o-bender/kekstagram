import {getRandomArrayElement, getRandomInteger} from './utils.js';

const COMMENTS_QUANTITY = 10;
const AVATAR_MIN_ID = 1;
const AVATAR_MAX_ID = 6;
const PHOTO_MIN_ID = 1;
const PHOTO_MAX_ID = 25;
const PHOTO_MIN_LIKES = 15;
const PHOTO_MAX_LIKES = 200;

const DESCRIPTIONS = [
  'Просто фото',
  'Красивое фото',
  'Случайно получилось',
  'Всем привет',
  'Это я на отдыхе',
  'Это я уже дома'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Иван',
  'Кирилл',
  'Мария',
  'Анастасия',
  'Кристина'
];

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_ID, AVATAR_MAX_ID)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createComments = ({commentsNum, startNum = 0}) => Array.from(
  {length: commentsNum},
  (_, index) => createComment(startNum + index + 1));

const createPhoto = (id) => ({
  id,
  url: `photos/${getRandomInteger(PHOTO_MIN_ID, PHOTO_MAX_ID)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(PHOTO_MIN_LIKES, PHOTO_MAX_LIKES),
  comments: createComments({commentsNum: COMMENTS_QUANTITY, startNum: id * COMMENTS_QUANTITY * 10}),
});

const createPhotos = ({photosNum, startNum = 0}) => Array
  .from({length: photosNum}, (_, index) => createPhoto(startNum + index + 1));

export {createPhotos};
