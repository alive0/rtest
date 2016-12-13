/*
import React from 'react';
import ReactDOM from 'react-dom';
*/
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
require("../styles/main.scss");

var Imgs= require('./img.js');

ReactDOM.render(<Imgs/>,document.getElementById('content'));
