const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

const zoomOutButtonElement = document.querySelector('.scale__control--smaller');
const zoomInButtonElement = document.querySelector('.scale__control--bigger');
const scaleFieldValue = document.querySelector('.scale__control--value');
const scalePreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
    scalePreview.style.transform = `scale(${value / 100})`;
    scaleFieldValue.value = `${value}%`;
};

const resetScale = () => scaleImage(MAX_SCALE);

const zoom = (step) => {
    const scaleFildValueNumber = parseInt(scaleFieldValue.value, 10) + step;
    if (scaleFildValueNumber <= MAX_SCALE && scaleFildValueNumber >= MIN_SCALE) {
        scaleImage(scaleFildValueNumber);
    }
}

const onZoomInButtonClick = () => zoom(SCALE_STEP);
const onZoomOutButtonClick = () => zoom(-SCALE_STEP);

const init = () => {
    resetScale();
    zoomInButtonElement.addEventListener('click', onZoomInButtonClick);
    zoomOutButtonElement.addEventListener('click', onZoomOutButtonClick);
};

export {init, resetScale};