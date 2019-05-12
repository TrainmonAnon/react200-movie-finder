/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

const url = 'http://localhost:8888/#/';
const nightmare = new Nightmare();

describe('Movie Search Container', () => {
  let httpServer = null;
  let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  it('returns the correct status code', () => axios.get(url)
    .then(response => expect(response.status === 200)));

  it('should have an <div> element with the id of "searchBar"', () => {
    return pageObject
      .evaluate(() => document.querySelector('#searchBar'))
      .then(div => expect(div).to.exist);
  }).timeout(4000);
});
