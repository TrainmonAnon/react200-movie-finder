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
        nightmare = new Nightmare().goto(url);
    });

    it('returns the proper status code', () => axios.get(url)
        .then(response => expect(response.status === 200)));

    it('should have the correct page title', () =>
        nightmare
        .evaluate(() => document.getElementById('title').innerText)
        .end()
        .then((text) => {
            expect(text).to.equal('Movie Finder');
        })
    ).timeout(20000);

    it('should have a search button', () =>
        nightmare
        .evaluate(() => document.querySelector('#searchButton').innerText)
        .end()
        .then((text) => {
            expect(text).to.equal('Go!');
        })
    ).timeout(20000);

    it('should have a search input', () =>
        nightmare
        .evaluate(() => document.querySelector('#searchInput').innerText)
        .end()
        .then((text) => {
            expect(text).to.exist;
        })
    ).timeout(20000);

    it('should display search results', () =>
        nightmare
        .type('#searchInput', 'Land before')
        .click('#searchButton')
        .wait(2000)
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then((text) => {
            expect(text).to.contain('time');
        })
    ).timeout(20000);

    it('should display search result images', () =>
        nightmare
        .type('#searchInput', 'Land before')
        .click('#searchButton')
        .wait(2000)
        .evaluate(() => document.querySelector('img').innerText)
        .end()
        .then((text) => {
            expect(text).to.exist;
        })
    ).timeout(20000);

    it('should redirect to movie detail page on selecting a movie button', () =>
        nightmare
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
    ).timeout(20000);
});
