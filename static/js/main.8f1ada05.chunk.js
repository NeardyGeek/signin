(this["webpackJsonpi-stage-2"]=this["webpackJsonpi-stage-2"]||[]).push([[0],{155:function(e,t,n){},161:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(71),o=n.n(r),l=(n(82),n(83),n(6)),i=n(7),u=n(72),s=(n(148),n(150),u.initializeApp({apiKey:"AIzaSyBYfOwyu_K-EWFKJISujZoGutkWheg3s-I",authDomain:"stage2-assesment.firebaseapp.com",databaseURL:"https://stage2-assesment.firebaseio.com",projectId:"stage2-assesment",storageBucket:"stage2-assesment.appspot.com",messagingSenderId:"742525091732",appId:"1:742525091732:web:58094b3ef98cb3f7cc1981",measurementId:"G-CHETW44PBV"})),m=(n(155),s.firestore()),d="https://cloud.iexapis.com/stable/stock/",f="/quote?token=pk_dea1eb58206b464980a892070dc07dad",h=new Date,p=h.getHours()+h.getMinutes()/60,E=function(){var e,t,n=s.auth().currentUser;return t=n.displayName,e=n.uid,m.collection("users").doc(e).get().then((function(e){return"cash - ($"+e.data().balence+")"})).then((function(e){document.getElementById("cash").innerHTML=e})),m.collection("users").doc(e).collection("tickers").get().then((function(e){var t=0,n="<ul>";return e.forEach((function(e){var a=e.data().currPrice*e.data().qty;t+=a,n+="<li id = '"+e.id+"'><font color = 'gray'>"+e.id+" - "+e.data().qty+" ----------------- shares $"+a+"</font></li>"})),[n+="</ul>",t]})).then((function(e){var t="<h1 id = 'totalvalue' value = ' "+e[1]+"'>Portfolio ($"+e[1]+")</h1>";document.getElementById("stockList").innerHTML=t+e[0]})),Object(a.useEffect)((function(){var t=setInterval((function(){m.collection("users").doc(e).collection("tickers").get().then((function(e){var t="",n=Number(document.getElementById("totalvalue").getAttribute("value"));e.forEach((function(e){var a=d+e.id+f,c=m.collection("tickers").doc(e.id);fetch(a).then((function(e){return e.json()})).then((function(e){var n=0;n=p>=9.5&&p<=16&&0!==h&&6!==h?e.open:e.previousClose;var a=e.latestPrice-n;return console.log(a),e.latestPrice>n?(c.update({currPrice:e.latestPrice}).catch((function(){console.log("yes")})),t+="<font color = 'green'>"):e.latestPrice<n?(c.update({currPrice:e.latestPrice}).catch((function(){console.log("yes")})),t+="<font color = 'red'>"):t+="<font color = 'gray'>",[t,a]})).then((function(t){var n=t[1]*e.data().qty,a=t[0];return[a+=e.id+" - "+e.data().qty+" shares ----------------- $"+e.data().currPrice+"</font>",n]})).then((function(t){var a=n+t[1];return document.getElementById("totalvalue").innerHTML="Portfolio ($"+a+")",document.getElementById(e.id).innerHTML=t[0],t[1]})).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}))}))}),5e3);return function(){return clearInterval(t)}}),[]),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"header"},c.a.createElement("h1",null,"hello ",t," ")),c.a.createElement("div",{className:"top"},c.a.createElement(l.b,{to:"/"},"Portfolio")," | ",c.a.createElement(l.b,{to:"/transaction"},"Transaction"),c.a.createElement("button",{onClick:function(){return s.auth().signOut()}},"Sign out")),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"column"},c.a.createElement("h1",{id:"cash"}),c.a.createElement("form",{onSubmit:function(t){t.preventDefault();var n=document.getElementById("ticker").value,a=Number(document.getElementById("qty").value),c=d+n+f;Number.isInteger(a)||alert("share quantities must be whole number"),fetch(c).then((function(e){return e.json()})).then((function(t){m.collection("users").doc(e).get().then((function(e){var n=t.symbol,c=t.latestPrice,r=c*a,o=e.data().balence;if(!(r>o))return[n,c,o-=r];alert("you don't have enough balence")})).then((function(t){!function(t,n,a,c){var r=m.collection("users").doc(e).collection("tickers").doc(n);r.get().then((function(e){if(e.exists){var t=e.data().qty,n=Number(t)+Number(c);r.set({currPrice:a,qty:n})}else r.set({currPrice:a,qty:c})})).then((function(){m.collection("users").doc(e).set({balence:t})})).then((function(){m.collection("users").doc(e).collection("tickers").get().then((function(e){var t="",n=Number(document.getElementById("totalvalue").getAttribute("value"));e.forEach((function(e){var a=d+e.id+f,c=m.collection("tickers").doc(e.id);fetch(a).then((function(e){return e.json()})).then((function(e){var n=0;n=p>=9.5&&p<=16&&0!==h&&6!==h?e.open:e.previousClose;var a=e.latestPrice-n;return console.log(a),e.latestPrice>n?(c.update({currPrice:e.latestPrice}).catch((function(){console.log("yes")})),t+="<font color = 'green'>"):e.latestPrice<n?(c.update({currPrice:e.latestPrice}).catch((function(){console.log("yes")})),t+="<font color = 'red'>"):t+="<font color = 'gray'>",[t,a]})).then((function(t){var n=t[1]*e.data().qty,a=t[0];return[a+=e.id+" - "+e.data().qty+" ----------------- shares $"+e.data().currPrice+"</font>",n]})).then((function(t){var a=n+t[1];return document.getElementById("totalvalue").innerHTML="Portfolio ("+a+")",document.getElementById(e.id).innerHTML=t[0],t[1]})).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}))}))})).then((function(){m.collection("users").doc(e).get().then((function(e){return"cash - ($"+e.data().balence+")"})).then((function(e){document.getElementById("cash").innerHTML=e}))})).catch((function(e){console.log(e)}))}(t[2],t[0],t[1],a),function(t,n,a){m.collection("trans").doc(e).collection("historys").add({buyPrice:n,ticker:t,qty:a}).then((function(e){console.log("Document written with ID: ",e.id)})).catch((function(e){console.error("Error adding document: ",e)}))}(t[0],t[1],a)})).catch((function(e){console.log(e)}))})).then((function(){m.collection("users").doc(e).collection("tickers").get().then((function(e){e.forEach((function(e){console.log(e.id,e.data().qty)}))}))})).catch((function(e){console.log(e),alert("please enter valid symbol of the ticker!")}))}},c.a.createElement("label",null,"Ticker",c.a.createElement("input",{id:"ticker",type:"text",placeholder:"Ticker"})),c.a.createElement("label",null,"Qty",c.a.createElement("input",{id:"qty",type:"number",placeholder:"qty"})),c.a.createElement("button",{type:"submit"},"Buy"))),c.a.createElement("div",{className:"column"},c.a.createElement("div",{id:"stockList"}))))},g=s.firestore(),v=function(){var e=s.auth().currentUser.uid;return g.collection("trans").doc(e).collection("historys").get().then((function(e){var t="<ul>";return e.forEach((function(e){t+="<li>BUY ("+e.data().ticker+") - "+e.data().qty+" shares @ $"+e.data().buyPrice+"</li>"})),t+="</ul>"})).then((function(e){document.getElementById("translist").innerHTML=e})),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"top"},c.a.createElement(l.b,{to:"/"},"Portfolio")," | ",c.a.createElement(l.b,{to:"/transaction"},"Transaction"),c.a.createElement("button",{onClick:function(){return s.auth().signOut()}},"Sign out")),c.a.createElement("div",{className:"columnt"},c.a.createElement("h1",null,"Transaction"),c.a.createElement("div",{id:"translist"})))},b=n(22),y=n.n(b),P=n(41),k=n(75),w=c.a.createContext(),I=function(e){var t=e.children,n=Object(a.useState)(null),r=Object(k.a)(n,2),o=r[0],l=r[1];return Object(a.useEffect)((function(){s.auth().onAuthStateChanged(l)}),[]),c.a.createElement(w.Provider,{value:{currentUser:o}},t)},B=(n(70),Object(i.g)((function(e){var t=e.history,n=Object(a.useCallback)(function(){var e=Object(P.a)(y.a.mark((function e(n){var a,c,r;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),a=n.target.elements,c=a.email,r=a.password,e.prev=2,e.next=5,s.auth().signInWithEmailAndPassword(c.value,r.value);case 5:t.push("/","/transaction"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),alert(e.t0);case 11:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t){return e.apply(this,arguments)}}(),[t]);return Object(a.useContext)(w).currentUser?c.a.createElement(i.a,{to:"/"}):c.a.createElement("div",null,c.a.createElement("form",{onSubmit:n},c.a.createElement("h1",null,"Sign in"),c.a.createElement("label",null,"Email",c.a.createElement("input",{name:"email",type:"email",placeholder:"Email"})),c.a.createElement("label",null,"Password",c.a.createElement("input",{name:"password",type:"password",placeholder:"Password"})),c.a.createElement("button",{type:"submit"},"Sign in"),c.a.createElement(l.b,{to:"/register"},"Don't have account? Click here to register")))}))),j=s.firestore(),x=Object(i.g)((function(e){var t=e.history,n=Object(a.useCallback)(function(){var e=Object(P.a)(y.a.mark((function e(n){var a,c,r;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),a=n.target.elements,c=a.email,r=a.password,e.prev=2,e.next=5,s.auth().createUserWithEmailAndPassword(c.value,r.value).then((function(e){return e.user.updateProfile({displayName:document.getElementById("name").value}),e})).then((function(e){j.collection("users").doc(e.user.uid).set({balence:5e3})}));case 5:t.push("/"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),alert(e.t0);case 11:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t){return e.apply(this,arguments)}}(),[t]);return c.a.createElement("div",null,c.a.createElement("form",{onSubmit:n},c.a.createElement("h1",null,"Register"),c.a.createElement("label",null,"Name",c.a.createElement("input",{id:"name",type:"text",placeholder:"Name"})),c.a.createElement("label",null,"Email",c.a.createElement("input",{name:"email",type:"email",placeholder:"Email"})),c.a.createElement("label",null,"Password",c.a.createElement("input",{name:"password",type:"password",placeholder:"Password"})),c.a.createElement("button",{type:"submit"},"Register"),c.a.createElement(l.b,{to:"/signin"},"Have an account? Click here to start!")))})),q=n(76),N=function(e){var t=e.component,n=Object(q.a)(e,["component"]),r=Object(a.useContext)(w).currentUser;return c.a.createElement(i.b,Object.assign({},n,{render:function(e){return r?c.a.createElement(t,e):c.a.createElement(i.a,{to:"/signin"})}}))},O=function(){return c.a.createElement(I,null,c.a.createElement(l.a,null,c.a.createElement(i.d,null,c.a.createElement(N,{exact:!0,path:"/",component:E}),c.a.createElement(N,{exact:!0,path:"/transaction",component:v}),c.a.createElement(i.b,{exact:!0,path:"/signin",component:B}),c.a.createElement(i.b,{exact:!0,path:"/register",component:x}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},70:function(e,t,n){},77:function(e,t,n){e.exports=n(161)},82:function(e,t,n){},83:function(e,t,n){}},[[77,1,2]]]);
//# sourceMappingURL=main.8f1ada05.chunk.js.map