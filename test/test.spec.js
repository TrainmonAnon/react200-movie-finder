const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

let nightmare;

const app = require('../server/server');

app.listen(8888);

const url = 'http://localhost:8888';
const urlMovie = 'http://localhost:8888/movie/';

describe('express', () => {

    beforeEach(() => {
        nightmare = new Nightmare();
    });

    it('returns the proper status code', () => axios.get(url)
        .then(response => expect(response.status === 200)));

    it('should have the correct page title', () =>
        nightmare
        .goto(url)
        .evaluate(() => document.getElementById('title').innerText)
        .end()
        .then((text) => {
            expect(text).to.equal('Movie Finder');
            done();
        })
    ).timeout(6500);

    it('should have a search button', () =>
        nightmare
        .goto(url)
        .evaluate(() => document.querySelector('#searchButton').innerText)
        .end()
        .then((text) => {
            expect(text).to.equal('Go!');
            done();
        })
    ).timeout(6500);

    it('should have a search input', () =>
        nightmare
        .goto(url)
        .evaluate(() => document.querySelector('#searchInput').innerText)
        .end()
        .then((text) => {
            expect(text).to.exist;
            done();
        })
    ).timeout(6500);

    it('should display search results', () =>
        nightmare
        .goto(url)
        .type('#searchInput', 'Land before')
        .click('#searchButton')
        .wait(2000)
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then((text) => {
            expect(text).to.contain('time');
            done();
        })
    ).timeout(10000);

    it('should display search result images', () =>
        nightmare
        .goto(url)
        .type('#searchInput', 'Land before')
        .click('#searchButton')
        .wait(2000)
        .evaluate(() => document.querySelector('img').innerText)
        .end()
        .then((text) => {
            expect(text).to.exist;
            done();
        })
    ).timeout(10000);

    it('should redirect to movie detail page on selecting a movie button', () =>
        nightmare
        .goto(url)
        .type('#searchInput', 'Land before')
        .click('#searchButton')
        .wait(2000)
        .click('#searchItems button')
        .wait(2000)
        .url()
        .end()
        .then(url => {
            expect(url).to.contain('/movie/');
            done();
        })
    ).timeout(10000);
});
