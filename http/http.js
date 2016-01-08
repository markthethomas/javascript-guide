'use strict';

const test = require('tape');
const http = require('http');
const url = require('url');

test('Making a basic http request with js', t => {
  function get(targetUrl, callback) {
    const parsedUrl = url.parse(targetUrl);
    return http.get({
      host: parsedUrl.host,
      path: parsedUrl.pathname
    }, response => {
      // set up something we can write to
      let body = '';

      // Handle errors
      response.on('error', (err) => {
        console.error(err);
        throw new Error();
      })

      // Listen for data
      response.on('data', (data) => {
        // Add data to the body container we've set up
        body += data;
      })
      // listen for the close of the request
      response.on('end', () => {
        // call the callback when we're done
        return callback(null, body);
      })
    });
  }

  get('http://google.com', (e, r) => {
    console.log(r);
    t.notOk(e, 'Without an error, e should be undefined');
    t.ok(r, 'We should get a response back');
    t.end();
  });
  
});