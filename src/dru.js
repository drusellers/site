//import hljs from './js/highlight.min.js';
import "./highlights/highlight.css";

// baseline
import "./css/layout.css";
import "./css/typography.css";
import "./elo";
// brand
import "./css/brand.css";
// components
import "./css/components/nav.css";
import "./css/components/toc.css";

import "./css/markdown.css";
import "./css/footnotes.css";
import "./css/lists.css";
import "./css/quotes.css";
import "./css/archive.css";
import "./css/article.css";

// pages
import "./css/pages/resume.css";
import "./css/pages/allegory.css";

import Search from "./search/index.js";
import Relevancy from "./relevancy/index.js";
import React from "react";
import ReactDOM from "react-dom";

// import '@fortawesome/fontawesome-pro/css/light.css';
// import '@fortawesome/fontawesome-pro/css/brands.css';
// import fontawesome from '@fortawesome/fontawesome-pro';
// import faTag from '@fortawesome/fontawesome-pro-light/faTag';
// fontawesome.library.add(faTag);
// fontawesome.dom.i2svg();

// fa fa-external-link-square | fa-external-link
// fal fa-camera fa-tag
// fab fa-creative-commons fa-creative-commons-by
// far fa-search (socials...)

// console.log(hljs);
// hljs.initHighlightingOnLoad();

const searchContainer = document.getElementById("search");
ReactDOM.render(<Search />, searchContainer);

window.React = React;
window.ReactDOM = ReactDOM;

// expose components
window.Relevancy = Relevancy;
