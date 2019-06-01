//import hljs from './js/highlight.min.js';
import './highlights/highlight.css';
import './css/nested.css';
import Search from './search/index.js';
import React from 'react';
import ReactDOM from 'react-dom';

// import '@fortawesome/fontawesome-pro/css/light.css';
// import '@fortawesome/fontawesome-pro/css/brands.css';
// import fontawesome from '@fortawesome/fontawesome-pro';
// import faTag from '@fortawesome/fontawesome-pro-light/faTag';
// fontawesome.library.add(faTag);
// fontawesome.dom.i2svg();

// fa fa-external-link-square | fa-external-link
// fal fa-camera
// fab fa-creative-commons
// fas fa-search

import 'tachyons/css/tachyons.css';
import 'tachyons-cms/css/tachyons-cms.css';

import retina from 'retinajs';
window.addEventListener('load', retina);

// console.log(hljs);
// hljs.initHighlightingOnLoad();

const searchContainer = document.getElementById("search");
ReactDOM.render(< Search />, searchContainer);
