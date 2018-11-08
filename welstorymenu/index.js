/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';


//const functions = require('firebase-functions');

const express = require('express');
const kakao = require('./kakao/plusfriend');
const restServiceSales = require('./rest/restServiceSales');
const welstory = require('./webhook/welstory');
const bodyParser = require('body-parser');
const cors = require('cors');

var port = process.env.PORT || 5000;
var app = express();

app.use(cors());
app.use(bodyParser.json());
//10.Webhook용 서비스 생성
// app.use('/webhook', webhook);
//카카오 플러스 친구
app.use('/kakao', kakao);
app.use('/webhook', welstory);
app.use('/welstory',restServiceSales);
//20.index.html호출용 서비스 생성
app.use(express.static('static'))
var server = app.listen(port, function () {
    console.log('Welstory' + port)
})