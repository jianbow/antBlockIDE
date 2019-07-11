// Copyright 2017 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.module('goog.net.rpc.HttpCorsTest');
goog.setTestOnly('goog.net.rpc.HttpCorsTest');

const GoogUri = goog.require('goog.Uri');
const HttpCors = goog.require('goog.net.rpc.HttpCors');
const testSuite = goog.require('goog.testing.testSuite');


testSuite({
  testSingleHeader: function() {
    const headers = {'foo': 'bar'};
    const value = HttpCors.generateHttpHeadersOverwriteParam(headers);
    assertEquals('foo:bar\r\n', value);
    const encoded_value =
        HttpCors.generateEncodedHttpHeadersOverwriteParam(headers);
    assertEquals('foo%3Abar%0D%0A', encoded_value);
  },

  testMultipleHeaders: function() {
    const headers = {'foo1': 'bar1', 'foo2': 'bar2'};
    const value = HttpCors.generateHttpHeadersOverwriteParam(headers);
    assertEquals('foo1:bar1\r\nfoo2:bar2\r\n', value);
    const encoded_value =
        HttpCors.generateEncodedHttpHeadersOverwriteParam(headers);
    assertEquals('foo1%3Abar1%0D%0Afoo2%3Abar2%0D%0A', encoded_value);
  },

  testSetUrl: function() {
    const headers = {'foo': 'bar'};
    const urlString = '/example.com/';
    const newUrlString = HttpCors.setHttpHeadersWithOverwriteParam(
        urlString, '$httpHeaders', headers);
    assertEquals('/example.com/?%24httpHeaders=foo%3Abar%0D%0A', newUrlString);

    const url = new GoogUri(urlString);
    const newUrl =
        HttpCors.setHttpHeadersWithOverwriteParam(url, '$httpHeaders', headers);
    assertEquals(
        '/example.com/?%24httpHeaders=foo%3Abar%0D%0A', newUrl.toString());
  },

  testSetUrlAppend: function() {
    const headers = {'foo': 'bar'};
    const urlString = '/example.com/?abc=12';
    const newUrlString = HttpCors.setHttpHeadersWithOverwriteParam(
        urlString, '$httpHeaders', headers);
    assertEquals(
        '/example.com/?abc=12&%24httpHeaders=foo%3Abar%0D%0A', newUrlString);

    const url = new GoogUri(urlString);
    const newUrl =
        HttpCors.setHttpHeadersWithOverwriteParam(url, '$httpHeaders', headers);
    assertEquals(
        '/example.com/?abc=12&%24httpHeaders=foo%3Abar%0D%0A',
        newUrl.toString());
  },

  testSetUrlMultiHeaders: function() {
    const headers = {'foo1': 'bar1', 'foo2': 'bar2'};
    const urlString = '/example.com/';
    const newUrlString = HttpCors.setHttpHeadersWithOverwriteParam(
        urlString, '$httpHeaders', headers);
    assertEquals(
        '/example.com/?%24httpHeaders=foo1%3Abar1%0D%0Afoo2%3Abar2%0D%0A',
        newUrlString);

    const url = new GoogUri(urlString);
    const newUrl =
        HttpCors.setHttpHeadersWithOverwriteParam(url, '$httpHeaders', headers);
    assertEquals(
        '/example.com/?%24httpHeaders=foo1%3Abar1%0D%0Afoo2%3Abar2%0D%0A',
        newUrl.toString());
  },

  testSetUrlEmptyHeaders: function() {
    const headers = {};
    const urlString = '/example.com/';
    const newUrlString = HttpCors.setHttpHeadersWithOverwriteParam(
        urlString, '$httpHeaders', headers);
    assertEquals('/example.com/', newUrlString);

    const url = new GoogUri(urlString);
    const newUrl =
        HttpCors.setHttpHeadersWithOverwriteParam(url, '$httpHeaders', headers);
    assertEquals('/example.com/', newUrl.toString());
  }
});
