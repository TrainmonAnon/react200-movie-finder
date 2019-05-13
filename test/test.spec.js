const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const chai = require('chai')
const expect = chai.expect;
const chaiHttp = require('chai-http');
const axios = require('axios');

var nightmare;

const app = require('../server/server');
chai.use(chaiHttp)

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
        .wait('#title')
        .evaluate(() => document.getElementById('title').innerText)
        .end()
        .then((text) => {
            expect(text).to.equal('Movie Finder');
        })
    ).timeout(20000);

    it('should have a search button', () =>
        nightmare
        .goto(url)
        .wait('#searchButton')
        .evaluate(() => document.getElementById('searchButton').innerText)
        .end()
        .then((text) => {
            expect(text).to.equal('Go!');
        })
    ).timeout(20000);

    it('should have a search input', () =>
        nightmare
        .goto(url)
        .wait('#searchInput')
        .evaluate(() => document.getElementById('searchInput').innerText)
        .end()
        .then((text) => {
            expect(text).to.exist;
        })
    ).timeout(20000);

    it('should display search results', () =>
        nightmare
        .goto(url)
        .wait('#searchInput')
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
        .goto(url)
        .wait('#searchInput')
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
        .goto(url)
        .wait('#searchInput')
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
