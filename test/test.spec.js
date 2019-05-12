const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

let nightmare;

const app = require('../server/server');

app.listen(process.env.PORT || 8888);

const url = `http://localhost:${process.env.PORT || 8888}`;

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
        })
    ).timeout(6000);

    it('should have a search button', () =>
        nightmare
        .goto(url)
        .evaluate(() => document.querySelector('#searchButton').innerText)
        .end()
        .then((text) => {
            expect(text).to.equal('Go!');
        })
    ).timeout(6000);

    it('should have a search input', () =>
        nightmare
        .goto(url)
        .evaluate(() => document.querySelector('#searchInput').innerText)
        .end()
        .then((text) => {
            expect(text).to.exist;
        })
    ).timeout(6000);

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
        })
    ).timeout(6000);

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
        })
    ).timeout(8000);

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
        })
    ).timeout(8000);
});
