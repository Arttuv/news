(this["webpackJsonpnews-front"]=this["webpackJsonpnews-front"]||[]).push([[0],{12:function(e,t,a){},16:function(e,t,a){e.exports=a(41)},21:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(13),l=a.n(o),s=(a(21),a(2)),c=a.n(s),i=a(14),m=a(15),d=(a(23),function(e){e.siteTitle;var t=e.small;return r.a.createElement("div",{style:{margin:"0 auto",maxWidth:"60rem",padding:"0rem 0rem 0rem"}},r.a.createElement("header",{style:{width:"100%",display:"inline-flex",justifyContent:"center",flexDirection:"row"}},r.a.createElement("span",{style:{display:"block"}}),!t&&r.a.createElement("span",{className:"site-title"},r.a.createElement("h1",null,"Uutiset ."),r.a.createElement("div",{className:"site-description"},"Uutisia, hitaammin")),t&&r.a.createElement("span",{className:"site-title-small"},r.a.createElement("h1",null,"Uutiset ."))))});d.defaultProps={siteTitle:""};var u=d,g=(a(12),function(e){var t=e.children,a=e.small;return r.a.createElement(r.a.Fragment,null,r.a.createElement(u,{siteTitle:"Uutiset",small:a}),r.a.createElement("div",{className:"page-container"},r.a.createElement("main",null,t),r.a.createElement("footer",{style:{borderTopStyle:"solid",borderTopWidth:"1px",marginTop:"1.5rem",minHeight:"100%",paddingTop:"1.5rem"}},"\xa9 ",(new Date).getFullYear()," Tiimi")))}),f=function(e){var t=e.title;return r.a.createElement("div",{className:"bordered-title-bar"},r.a.createElement("h4",null,t),r.a.createElement("div",null))};function E(e){(e=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()))).setUTCDate(e.getUTCDate()+4-(e.getUTCDay()||7));var t=new Date(Date.UTC(e.getUTCFullYear(),0,1)),a=Math.ceil(((e-t)/864e5+1)/7);return[e.getUTCFullYear(),a]}var v=function(e){var t=e.data,a=e.feedName,n=function(e,t,a){var n=new Map;e.Items.forEach((function(e){if(console.log(e),0===e.item.data.feedName.localeCompare(t)&&e.item.data.weekNumber[1]===a[1]){var r=e.item.data.categories[0];void 0===n.get(r)?n.set(r,1):n.set(r,n.get(r)+1)}})),n.forEach((function(e,t,a){console.log(e+" "+t)}));var r=Array.from(n.keys());console.log("First hit: "+r[0]);var o=r.sort((function(e,t){return n.get(t)-n.get(e)}));return console.log("Top hit: "+o[0]+" "+n.get(o[0])),{categories:n,sortedTags:o}}(t,a,E(new Date)),o=new Map;n.sortedTags.slice(4).forEach((function(e){o.set(e,"#355C7D")})),o.set(n.sortedTags[0],"#F8B195"),o.set(n.sortedTags[1],"#F67280"),o.set(n.sortedTags[2],"#C06C84"),o.set(n.sortedTags[3],"#6C5B7B"),o.set(n.sortedTags[4],"#355C7D");var l=new Map;return n.sortedTags.forEach((function(e,t){l.set(e,"category-"+t)})),r.a.createElement("div",null,r.a.createElement(f,{title:"Viikko "+E(new Date)[1]+" "+a}),r.a.createElement("div",{className:"weekSummary"},n.sortedTags.map((function(e){return r.a.createElement("div",{key:a+"category#"+e},r.a.createElement("a",{href:"#"+a+e},e))}))),r.a.createElement("div",{className:"articlesByCategories"},n.sortedTags.map((function(e){return r.a.createElement("div",{key:"categorynews#"+e,className:"categoryNews "+l.get(e)},r.a.createElement("div",{className:"categoryHeading "+l.get(e)},r.a.createElement("a",{name:a+e,className:" categoryTag"},r.a.createElement("h1",{className:"categoryHeadingTitle"},e)),r.a.createElement("div",null)),r.a.createElement("div",{className:"categoryNewsArticles"},t.Items.map((function(t){return void 0!==t.item.data&&t.item.data.weekNumber[1]===E(new Date)[1]&&0===t.item.data.categories[0].localeCompare(e)&&0===t.item.data.feedName.localeCompare(a)?r.a.createElement("article",{key:t.guid},console.log("Adding + "+t.item.data.categories[0]),r.a.createElement("div",{className:"articleInfo"},r.a.createElement("div",{className:"source"},"Yle")),r.a.createElement("a",{href:t.item.data.link},r.a.createElement("h1",null,t.item.data.title)),r.a.createElement("p",{className:"articleSummary"},t.item.data.contentSnippet),r.a.createElement("p",null,t.item.data.feedName," ",a," ",t.item.data.feedName.localeCompare(a)),r.a.createElement("p",null,t.item.data.categories[0]),void 0!==t.item.data.enclosure&&r.a.createElement("div",{className:"articleCoverContainer"},r.a.createElement("img",{className:"articleCover",src:t.item.data.enclosure.url}))):null}))))}))))};var p=function(){var e=Object(n.useState)({Items:[]}),t=Object(m.a)(e,2),a=t[0],o=t[1];Object(n.useEffect)((function(){(function(){var e=Object(i.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("https://et63potkt6.execute-api.us-east-1.amazonaws.com/dev/hello").then((function(e){return e.json()})).then((function(e){console.log(e),o(e)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var l=function(e){var t=new Map;e.Items.forEach((function(e){var a=e.item.data.categories[0];void 0===t.get(a)?(t.set(a,1),console.log("Setting  "+a+" to 1")):(t.set(a,t.get(a)+1),console.log("Setting  "+a+" to "+t.get(a)))})),t.forEach((function(e,t,a){console.log(e+" "+t)}));var a=Array.from(t.keys());console.log("First hit: "+a[0]);var n=a.sort((function(e,a){return t.get(a)-t.get(e)}));return console.log("Top hit: "+n[0]+" "+t.get(n[0])),{categories:t,sortedTags:n}}(a),s=new Map;l.sortedTags.slice(4).forEach((function(e){s.set(e,"#355C7D")})),s.set(l.sortedTags[0],"#F8B195"),s.set(l.sortedTags[1],"#F67280"),s.set(l.sortedTags[2],"#C06C84"),s.set(l.sortedTags[3],"#6C5B7B"),s.set(l.sortedTags[4],"#355C7D");var d=new Map;return l.sortedTags.forEach((function(e,t){d.set(e,"category-"+t)})),r.a.createElement("div",null,r.a.createElement(g,null,r.a.createElement(v,{data:a,feedName:"Yle P\xe4\xe4uutiset"}),r.a.createElement(v,{data:a,feedName:"Yle Tiede"}),r.a.createElement(v,{data:a,feedName:"Yle Luonto"})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[16,1,2]]]);
//# sourceMappingURL=main.bfebc0b7.chunk.js.map