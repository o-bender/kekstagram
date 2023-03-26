const DEFAULT_EFFECT = 'none';
const Effects = {
    none: {
        name: 'none',
        style: 'none',
        min: 0,
        max: 100,
        start: 100,
        step: 1,
        unit: '',
    },
    chrome: {
        name: 'chrome',
        style: 'grayscale',
        min: 0,
        max: 1,
        start: 1,
        step: 0.1,
        unit: '',
    },
    sepia: {
        name: 'sepia',
        style: 'sepia',
        min: 0,
        max: 1,
        start: 1,
        step: 0.1,
        unit: '',
    },
    marvin: {
        name: 'marvin',
        style: 'invert',
        min: 0,
        max: 100,
        start: 100,
        step: 1,
        unit: '%',
    },
    phobos: {
        name: 'phobos',
        style: 'blur',
        min: 0,
        max: 3,
        start: 3,
        step: 0.1,
        unit: 'px',
    },
    heat: {
        name: 'heat',
        style: 'brightness',
        min: 1,
        max: 3,
        start: 3,
        step: 0.1,
        unit: '',
    },
};

const previewImage = document.querySelector('.img-upload__preview img');
const effectElements = document.querySelectorAll('.effects__item input');
const effectSlider = document.querySelector('.img-upload__effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectsValue = document.querySelector('.effect-level__value');

const showSlider = () => effectSlider.classList.remove('hidden');
const hideSlider = () => effectSlider.classList.add('hidden');

const makeSliderOptions = (effect) => ({
    range: {
        min: effect.min,
        max: effect.max,
    },
    start: effect.start,
    step: effect.step,
    connect: 'lower',
});

const applyEffect = (effect) => {
    if (effect) {
        effectSliderElement.noUiSlider.updateOptions(makeSliderOptions(effect));

        previewImage.className = `effects__preview--${effect.name}`;

        (effect.name === DEFAULT_EFFECT ? hideSlider : showSlider)();
        effectSliderElement.noUiSlider.off('slide');
        effectSliderElement.noUiSlider.on('slide', () => onSliderUpdate(effect));
    }
};

const resetEffects = () => applyEffect(Effects[DEFAULT_EFFECT]);
const onEffectsChange = (evt) => applyEffect(Effects[evt.target.value]);

const onSliderUpdate = (effect) => {
    const sliderValue = effectSliderElement.noUiSlider.get();
    previewImage.style.filter = `${effect.style}(${sliderValue}${effect.unit})`;
    effectsValue.value = sliderValue;
};


const init = () => {
    noUiSlider.create(effectSliderElement, makeSliderOptions(Effects[DEFAULT_EFFECT]));
    effectElements.forEach((element) => element.addEventListener('change', onEffectsChange));
}

export {init, resetEffects};