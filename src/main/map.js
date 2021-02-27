import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Tile from 'ol/layer/Tile.js';
import Vector from 'ol/layer/Vector.js';
import OSM from 'ol/source/OSM.js';
import XYZ from 'ol/source/XYZ.js';
import Style from 'ol/style/Style.js';
import Stroke from 'ol/style/Stroke.js';
import Fill from 'ol/style/Fill.js';
import Text from 'ol/style/Text.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { exportMap } from './exporter.js';
import XYZBlob from './XYZBlob.js';

const map = new Map({
  target: 'map',
  controls: [],
  layers: [
    // new Tile({
    //   source: new OSM()
    // })
      new Tile({
          source: new XYZBlob({
            url: 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png',
            // crossOrigin: true
          })
      })
  ],
  view: new View({
    projection: 'EPSG:4326',
    center: [37.41, 8.82],
    zoom: 4
  })
});

const screenshotButton = document.createElement('button');
screenshotButton.innerText = 'Screenshot'
screenshotButton.addEventListener('click', () => {
  exportMap(map);
})
const controls = document.querySelector('#controls');
controls.appendChild(screenshotButton);