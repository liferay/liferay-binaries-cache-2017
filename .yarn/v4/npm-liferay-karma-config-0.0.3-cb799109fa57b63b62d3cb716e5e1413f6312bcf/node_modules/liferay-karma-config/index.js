'use strict';

var babelPresetMetal = require('babel-preset-metal');
var karmaBabelPreprocessor = require('karma-babel-preprocessor');
var karmaChai = require('karma-chai');
var karmaChromeLauncher = require('karma-chrome-launcher');
var karmaCommonJs = require('karma-commonjs');
var karmaFirefoxLauncher = require('karma-firefox-launcher');
var karmaJunitReporter = require('karma-junit-reporter');
var karmaMocha = require('karma-mocha');
var karmaSinon = require('karma-sinon');
var karmaSourceMapSupport = require('karma-source-map-support');

var babelOptions = {
  presets: [babelPresetMetal],
  sourceMap: 'both'
};

module.exports = function (config) {
  config.set({
  	plugins: [
  		karmaBabelPreprocessor,
    	karmaChai,
  		karmaChromeLauncher,
    	karmaCommonJs,
      karmaFirefoxLauncher,
      karmaJunitReporter,
    	karmaMocha,
    	karmaSourceMapSupport,
    	karmaSinon
  	],

    frameworks: ['mocha', 'chai', 'sinon', 'source-map-support', 'commonjs'],

    files: [
      'node_modules/metal-soy-bundle/build/bundle.js',
      'node_modules/html2incdom/src/*.js',
      'node_modules/metal*/src/**/*.js',
      'src/**/*.js',
      'test/**/*.js'
    ],

    junitReporter: {
      outputFile: 'TEST-frontend-js.xml'
    },

    preprocessors: {
      'src/**/*.js': ['babel', 'commonjs'],
      'node_modules/html2incdom/src/*.js': ['babel', 'commonjs'],
      'node_modules/metal-soy-bundle/build/bundle.js': ['babel', 'commonjs'],
      'node_modules/metal*/src/**/*.js': ['babel', 'commonjs'],
      'test/**/*.js': ['babel', 'commonjs']
    },

    reporters: ['junit', 'progress'],

    browsers: ['Firefox'],

    babelPreprocessor: {options: babelOptions}
  });
};