import {renderPictures} from './picture.js';
import {closeFormUploadImage, init as initForm} from './upload_foto_modal/form.js';
import {getData, sendData} from "./api.js";
import {showErrorMessage, showSuccessUploadMessage, showErrorUploadMessage} from "./message.js";

const onSendDataSuccess = () => {
    closeFormUploadImage();
    showSuccessUploadMessage();
}

getData((photos) => {
    renderPictures(photos);
    initForm(
        (formData) => sendData(onSendDataSuccess, showErrorUploadMessage, formData)
    );
}, showErrorMessage)

