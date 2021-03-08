const supertest = require('supertest');
const app = require('../server.js');
const chai = require('chai');

global.request = supertest(app);
global.expect = chai.expect;