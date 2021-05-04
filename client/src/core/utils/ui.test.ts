import { expect } from 'chai';
import { addEventListener, get, getFormData, putFormData } from '..';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const html = `<html><form><input id="user" value="user"><input id="pass" value="pass"></form></html>`;
const { document } = (new JSDOM(html)).window;

beforeEach(() => {
  global.document = document;
});

describe('(UI) User Interface', () => {
  it('should get form data', () => {
    const fd = getFormData();
    expect(fd.user).equal('user');
    expect(fd.pass).equals('pass');
  });

  it('should put form data', () => {
    putFormData({ user: 'user2', pass: 'pass2' });
    const fd = getFormData();
    expect(fd.user).equal('user2');
    expect(fd.pass).equals('pass2');
  });

  it('should add event listener', () => {
    let clicked = false;
    addEventListener('users', 'click', () => {
      clicked = true;
    });
    get('user').click();
    expect(clicked).equals(false);
    addEventListener('user', 'click', () => {
      clicked = true;
    });
    get('user').click();
    expect(clicked).equals(true);
  });
});
