// import helloWorld from './hello-world.js';
import HelloWorldButton from './components/hello-world-button/hello-world-button.js';
import addImage from './add-image.js';
import Heading from './components/heading/heading.js';
// import _ from 'lodash';
import React from 'react';

// helloWorld();
// addImage();

const heading = new Heading();
// const heading2 = new Heading();
// heading.render(_.upperFirst('hello world'));
heading.render('hello world');
// heading2.render();

const helloWorldButton = new HelloWorldButton();

helloWorldButton.render();

if (process.env.NODE_ENV === 'production') {
    console.log('Production mode');
} else if (process.env.NODE_ENV === 'development') {
    console.log('Development');
}

// helloWorldButton.methodThatDoesNotExist();
