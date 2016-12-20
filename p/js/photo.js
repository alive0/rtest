/*
import React from 'react';
import ReactDOM from 'react-dom';
*/
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
require("../styles/main.css");

var Imgs= require('./img.js');
var Content=document.getElementById('content');

ReactDOM.render(<Imgs/>,Content);
