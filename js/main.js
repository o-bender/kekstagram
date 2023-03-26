import {renderPictures} from './picture.js';
import {createPhotos} from './mock.js';
import {init as initForm} from './form.js';
import {init as initSlider, resetEffects} from './upload_foto_modal/slider.js';
import {init as initScale, resetScale} from './upload_foto_modal/scale.js';

const photos = createPhotos({photosNum: 19, startNum: 100});
renderPictures(photos);
initSlider();
initScale();
initForm(() => {
    resetEffects();
    resetScale();
}, () => {
    resetEffects();
    resetScale();
});
