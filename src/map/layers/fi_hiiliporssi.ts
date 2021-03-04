import { addSource, addLayer, directAddImage } from '../map'
import { registerGroup } from 'src/map/layer_groups';
import Marker from '../../marker.svg';
import MarkerHighlighted from '../../marker-highlighted.svg';

const marker = new Image(50, 50)
marker.src = Marker

const markerHighlighted = new Image(50, 50)
markerHighlighted.src = MarkerHighlighted


addSource('hiiliporssi', {
  "type": 'vector',
  "tiles": ["https://server.avoin.org/data/map/hiiliporssi/tiles/{z}/{x}/{y}.pbf"],
  "maxzoom": 10,
  bounds: [19, 59, 32, 71], // Finland
  attribution: '<a href="http://hiilipörssi.fi">© Hiilipörssi</a>',
});

addSource('hiiliporssi-points', {
  "type": 'geojson',
  "data": "https://server.avoin.org/data/map/hiiliporssi/points.geojson",
  attribution: '<a href="http://hiilipörssi.fi">© Hiilipörssi</a>',
});

directAddImage('marker', marker, {})
directAddImage('markerHighlighted', markerHighlighted, {})

addLayer({
  'id': 'hiiliporssi-fill',
  'source': 'hiiliporssi',
  'source-layer': 'polygons',
  'type': 'fill',
  paint: {
    'fill-color': 'green',
    'fill-opacity': 1,
  },
  BEFORE: 'FILL',
});

addLayer({
  'id': 'hiiliporssi-outline',
  'source': 'hiiliporssi',
  'source-layer': 'polygons',
  'type': 'line',
  "minzoom": 9,
  'paint': {
    'line-opacity': 0.75,
  },
  BEFORE: 'OUTLINE',
});

addLayer({
  'id': 'hiiliporssi-outline-highlighted',
  'source': 'hiiliporssi',
  'source-layer': 'polygons',
  'type': 'line',
  "minzoom": 9,
  'paint': {
    'line-opacity': 0.75,
    "line-width": 2.5,
    "line-gap-width": 0
  },
  "filter": ["in", "name"],
  BEFORE: 'OUTLINE',
});

addLayer({
  'id': 'hiiliporssi-highlighted',
  'source': 'hiiliporssi',
  'source-layer': 'polygons',
  'type': 'fill',
  "paint": {
    "fill-color": "#32CD32",
    "fill-opacity": 1
  },
  "filter": ["in", "name"],
  BEFORE: 'OUTLINE',
});

addLayer({
  'id': 'hiiliporssi-marker',
  'source': 'hiiliporssi-points',
  'type': 'symbol',
  "paint": {
    "icon-color": "blue"
  },
  "layout": {
    "visibility": "visible",
    "symbol-placement": "point",
    "icon-image": "marker",
    "icon-anchor": "bottom",
    "icon-ignore-placement": true,
    "icon-allow-overlap": true,
  },
  "filter": ["!in", "name"],
  BEFORE: 'FILL',
})

addLayer({
  'id': 'hiiliporssi-marker-highlighted',
  'source': 'hiiliporssi-points',
  'type': 'symbol',
  "paint": {

  },
  "layout": {
    "visibility": "visible",
    "icon-size": 1.4,
    "symbol-placement": "point",
    "icon-image": "markerHighlighted",
    "icon-anchor": "bottom",
    "icon-ignore-placement": true,
    "icon-padding": 1,
    "icon-allow-overlap": true,
  },
  "filter": ["in", "name"],
  BEFORE: 'FILL',
})

const addLabels = async () => {
  const exp: any = ['match', ['get', 'name']];
  try {
    const res = await fetch("https://server.avoin.org/data/map/hiiliporssi/data.json", {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = JSON.parse(await res.json())

    data.forEach((row) => {
      if (row['kansionimi'] && row['nimi']) {
        exp.push(row['kansionimi'], row['nimi']);
      }
    });

  } catch (err) {
    console.error(err)
  }
  exp.push('');

  addLayer({
    'id': 'hiiliporssi-label',
    'source': 'hiiliporssi-points',
    'type': 'symbol',
    "paint": {
      "text-halo-width": 10,
      "text-halo-color": "white"
    },
    minzoom: 10,
    "layout": {
      "visibility": "visible",
      "symbol-placement": "point",
      "text-size": 20,
      "text-ignore-placement": true,
      "text-padding": 1,
      "text-allow-overlap": true,
      "text-anchor": "top",
      "text-font": ["Open Sans Regular"],
      "text-field": exp,
      "text-offset": [0, 0.1]
    },
    BEFORE: 'FILL',
  });

  registerGroup('hiiliporssi', ['hiiliporssi-fill', 'hiiliporssi-outline', 'hiiliporssi-highlighted', 'hiiliporssi-marker', 'hiiliporssi-label', 'hiiliporssi-outline-highlighted', 'hiiliporssi-marker-highlighted'])
}

registerGroup('hiiliporssi', [])

addLabels()
