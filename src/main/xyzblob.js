
import XYZ from 'ol/source/XYZ.js';

export default class XYZBlob extends XYZ {
    constructor(opt_options) {
        super(opt_options);
        this.tileLoadFunction = async (imageTile, src) => {
            const response = await fetch(src);
            const blob = await response.blob();
            const image = new Image();
            const canvas = document.createElement('canvas');
            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                const content = reader.result;
                if(content != null) {
                    image.src = content.toString();
                    const ctx = canvas.getContext('2d');
                    image.onload = function () {
                        canvas.width = image.width;
                        canvas.height = image.height;
                        ctx.drawImage(image, 0, 0);
                        const dataUrl = canvas.toDataURL();
                        imageTile.getImage().src = dataUrl;
                    }
                }
            });
            reader.readAsDataURL(blob);
        }
    }
}