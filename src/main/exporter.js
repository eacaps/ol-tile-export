export function exportMap(map) {
    map.once('rendercomplete', function () {
        var mapCanvas = document.createElement('canvas');
        var size = map.getSize();
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        var mapContext = mapCanvas.getContext('2d');
        Array.prototype.forEach.call(
            document.querySelectorAll('.ol-layer canvas'),
            function (canvas) {
            if (canvas.width > 0) {
                var opacity = canvas.parentNode.style.opacity;
                mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                var transform = canvas.style.transform;
                // Get the transform parameters from the style's transform matrix
                var matrix = transform
                .match(/^matrix\(([^\(]*)\)$/)[1]
                .split(',')
                .map(Number);
                // Apply the transform to the export map context
                CanvasRenderingContext2D.prototype.setTransform.apply(
                mapContext,
                matrix
                );
                mapContext.drawImage(canvas, 0, 0);
            }
            }
        );
        if (navigator.msSaveBlob) {
            // link download attribuute does not work on MS browsers
            navigator.msSaveBlob(mapCanvas.msToBlob(), 'map.png');
        } else {
            // var link = document.getElementById('image-download');
            const link = document.createElement('a');
            link.setAttribute('download', 'map.png');
            link.href = mapCanvas.toDataURL();
            link.click();
        }
        });
        map.renderSync();
}