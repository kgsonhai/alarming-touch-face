(this["webpackJsonptouch-face"]=this["webpackJsonptouch-face"]||[]).push([[0],{318:function(e,t,n){},320:function(e,t,n){},325:function(e,t){},326:function(e,t){},334:function(e,t){},337:function(e,t){},338:function(e,t){},339:function(e,t){},342:function(e,t,n){"use strict";n.r(t);var c=n(80),r=n.n(c),a=n(258),o=n.n(a),s=(n(318),n(4)),u=n.n(s),i=n(11),l=n(5),b=(n(320),n(259)),d=n(279),f=(n(199),n(341),n(313)),h=n(219),j=n.p+"static/media/mymusiccut.1bc029c5.mp3",m=n(59),v=new f.Howl({src:[j]}),p="touched";var O=function(){var e=Object(c.useRef)(),t=Object(c.useRef)(),n=Object(c.useRef)(!0),r=Object(c.useRef)(),a=Object(c.useState)(!1),o=Object(l.a)(a,2),s=o[0],f=o[1],j=Object(c.useState)(0),O=Object(l.a)(j,2),g=O[0],x=O[1],w=Object(c.useState)(""),y=Object(l.a)(w,2),k=y[0],N=y[1],M=function(){var e=Object(i.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("init.."),e.next=3,B();case 3:return console.log("success camera"),t.current=d.a(),e.next=7,b.a();case 7:r.current=e.sent,console.log("Kh\xf4ng ch\u1ea1m tay l\xean m\u1eb7t v\xe0 \u1ea5n Train 1"),Object(h.a)({cooldown:3e3});case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(){return new Promise((function(t,n){navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,navigator.getUserMedia?navigator.getUserMedia({video:!0},(function(n){e.current.srcObject=n,e.current.addEventListener("loadeddata",t)}),(function(e){return n(e)})):n()}))},C=function(){var e=Object(i.a)(u.a.mark((function e(t){var n,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("".concat(t," \u0110ang train cho khu\xf4n m\u1eb7t c\u1ee7a b\u1ea1n...")),n=0;case 2:if(!(n<50)){e.next=12;break}return c=parseInt((n+1)/50*100)+"%",console.log("Progress "+c),N("AI \u0111ang h\u1ecdc: "+c),49===n&&N(""),e.next=9,P(t);case 9:n++,e.next=2;break;case 12:x(g+1);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),P=function(n){return new Promise(function(){var c=Object(i.a)(u.a.mark((function c(a){var o;return u.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return o=r.current.infer(e.current,!0),t.current.addExample(o,n),c.next=4,T(100);case 4:a();case 5:case"end":return c.stop()}}),c)})));return function(e){return c.apply(this,arguments)}}())},U=function(){var c=Object(i.a)(u.a.mark((function c(){var a,o;return u.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return a=r.current.infer(e.current,!0),c.next=3,t.current.predictClass(a);case 3:return(o=c.sent).label===p&&o.confidences[o.label]>.7?(console.log("Touched"),n.current&&(n.current=!1,v.play()),Object(h.b)("B\u1ecf tay ra",{body:"B\u1ea1n v\u1eeba ch\u1ea1m tay v\xe0o m\u1eb7t!!"}),f(!0)):(console.log("Not_touched"),f(!1)),x(g+1),N("Ch\u01b0\u01a1ng tr\xecnh \u0111\xe3 ho\xe0n th\xe0nh!!  M\u1eddi b\u1ea1n \u0111\u01b0a tay l\xean m\u1eb7t \u0111\u1ec3 ki\u1ec3m tra...."),c.next=9,T(200);case 9:U();case 10:case"end":return c.stop()}}),c)})));return function(){return c.apply(this,arguments)}}(),T=function(e){return new Promise((function(t){return setTimeout(t,e)}))};return Object(c.useEffect)((function(){M(),v.on("end",(function(){n.current=!0}))}),[]),Object(m.jsxs)("div",{className:"main ".concat(s?"touched":""),children:[Object(m.jsx)("video",{ref:e,className:"video",autoPlay:!0}),Object(m.jsxs)("div",{className:"control",children:[Object(m.jsxs)("div",{className:"".concat(0===g?"":"button_current"),children:[""===k?Object(m.jsx)("p",{children:"B\u01b0\u1edbc 1: Quay video kh\xf4ng ch\u1ea1m tay l\xean m\u1eb7t \u0111\u1ec3 robot h\u1ecdc"}):k,""===k?Object(m.jsx)("button",{className:"btn",onClick:function(){return C("not_touch")},children:"B\u1eaft \u0111\u1ea7u"}):""]}),Object(m.jsxs)("div",{className:"".concat(1===g?"":"button_current"),children:[""===k?Object(m.jsx)("p",{children:"B\u01b0\u1edbc 2: Quay video \u0111\u01b0a tay g\u1ea7n l\xean m\u1eb7t \u0111\u1ec3 robot h\u1ecdc"}):k,""===k?Object(m.jsx)("button",{className:"btn",onClick:function(){return C(p)},children:"Ti\u1ebfp t\u1ee5c"}):""]}),Object(m.jsxs)("div",{className:"".concat(2===g?"":"button_current"),children:[Object(m.jsx)("p",{children:"B\u01b0\u1edbc 3: Kh\u1edfi \u0111\u1ed9ng AI"}),Object(m.jsx)("button",{className:"btn",onClick:function(){return U()},children:"Ki\u1ec3m tra"})]}),Object(m.jsx)("div",{className:"".concat(3===g?"":"button_current"),children:Object(m.jsx)("p",{children:k})})]})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,343)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),a(e),o(e)}))};o.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(O,{})}),document.getElementById("root")),g()}},[[342,1,2]]]);
//# sourceMappingURL=main.6974d181.chunk.js.map