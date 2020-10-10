import Heading from './components/heading/heading.js';
import SchoolImage from './components/school-image/school-image.js';
// import _ from 'lodash'
import React from "react";

const heading = new Heading();
heading.render('school');

const schoolImage = new SchoolImage();
schoolImage.render();