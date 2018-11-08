'use strict';
var apiai = require("apiai");
const express = require('express');
var router = express.Router();

//10. dialogflow의 프로젝트에 있는 client용 키
var chatapp = apiai("fe6c8e349e6f4c6b9164ebb0395d0600", {
    language: 'ko-KR'
});
var oResponse = {
  "message":{
    "text":""
  }
}
var options = {
    sessionId: 'kakaotalk'
};
router.get('/keyboard',function(request,response){
  const menu = {
     type: "text",
	 content:"Hello world"
 };
 response.json(menu);
});
//request.body.content

router.post('/message',function(request,response){
  let sUser_key = decodeURIComponent(request.body.user_key); // user's key
  let sType = decodeURIComponent(request.body.type); // message type
  let sContent = decodeURIComponent(request.body.content); // user's message
  // console.log("==========REQUEST");
  // console.log(request.body.content);
  //user key 전달
  // options.user_key = sUser_key;

  var request = chatapp.textRequest(sContent, options);
    
    // console.log(sContent);
  //test
  // oResponse.message.text=sContent;

    request.on('response', function(res) {
    //   console.log("==============RESPONSE");
    //  console.log(res.result.fulfillment);
    //dialogflow에서 여러 메시지가 올때(텍스트와 suggestion등은 array로 옴)
     if(res.result.fulfillment.speech){
      oResponse.message.text=res.result.fulfillment.speech;
     } else {
      oResponse.message.text = res.result.fulfillment.messages[0].speech;
     }
     //임시 테스트
//      oResponse.message = {
//   "object_type": "list",
//   "header_title": "WEEKELY MAGAZINE",
//   "header_link": {
//     "web_url": "http://www.daum.net",
//     "mobile_web_url": "http://m.daum.net",
//     "android_execution_params": "main",
//     "ios_execution_params": "main"
//   },
//   "contents": [
//     {
//       "title": "자전거 라이더를 위한 공간",
//       "description": "매거진",
//       "image_url": "http://mud-kage.kakao.co.kr/dn/QNvGY/btqfD0SKT9m/k4KUlb1m0dKPHxGV8WbIK1/openlink_640x640s.jpg",
//       "image_width": 640,
//       "image_height": 640,
//       "link": {
//         "web_url": "http://www.daum.net/contents/1",
//         "mobile_web_url": "http://m.daum.net/contents/1",
//         "android_execution_params": "/contents/1",
//         "ios_execution_params": "/contents/1"
//       }
//     },
//     {
//       "title": "비쥬얼이 끝내주는 오레오 카푸치노",
//       "description": "매거진",
//       "image_url": "http://mud-kage.kakao.co.kr/dn/boVWEm/btqfFGlOpJB/mKsq9z6U2Xpms3NztZgiD1/openlink_640x640s.jpg",
//       "image_width": 640,
//       "image_height": 640,
//       "link": {
//         "web_url": "http://www.daum.net/contents/2",
//         "mobile_web_url": "http://m.daum.net/contents/2",
//         "android_execution_params": "/contents/2",
//         "ios_execution_params": "/contents/2"
//       }
//     },
//     {
//       "title": "감성이 가득한 분위기",
//       "description": "매거진",
//       "image_url": "http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
//       "image_width": 640,
//       "image_height": 640,
//       "link": {
//         "web_url": "http://www.daum.net/contents/3",
//         "mobile_web_url": "http://m.daum.net/contents/3",
//         "android_execution_params": "/contents/3",
//         "ios_execution_params": "/contents/3"
//       }
//     }
//   ],
//   "buttons": [
//     {
//       "title": "웹으로 이동",
//       "link": {
//         "web_url": "http://www.daum.net",
//         "mobile_web_url": "http://m.daum.net"
//       }
//     },
//     {
//       "title": "앱으로 이동",
//       "link": {
//         "android_execution_params": "main",
//         "ios_execution_params": "main"
//       }
//     }
//   ]
// };
     response.json(oResponse);
    // response.json(res);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
});

module.exports = router;
