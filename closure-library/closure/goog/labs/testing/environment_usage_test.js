// Copyright 2014 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.labs.testing.environmentUsageTest');
goog.setTestOnly('goog.labs.testing.environmentUsageTest');

goog.require('goog.labs.testing.Environment');

let testing = false;
const env = new goog.labs.testing.Environment();

function setUpPage() {
  assertFalse(testing);
}

function setUp() {
  testing = true;
}

function testOne() {
  assertTrue(testing);
}

function testTwo() {
  assertTrue(testing);
}

function tearDown() {
  testing = false;
}

function tearDownPage() {
  assertFalse(testing);
}
