import {renderPictures} from './picture.js';
import {createPhotos} from './mock.js';
import {init as initForm} from './form.js';

const photos = createPhotos({photosNum: 19, startNum: 100});
renderPictures(photos);
initForm();
