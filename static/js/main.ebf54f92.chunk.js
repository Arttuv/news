(this["webpackJsonpnews-front"]=this["webpackJsonpnews-front"]||[]).push([[0],{19:function(e,t,a){e.exports=a(44)},24:function(e,t,a){},4:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(16),i=a.n(r),o=(a(24),a(5)),c=a.n(o),l=a(17),g=a(18),m=(a(26),function(e){e.siteTitle;var t=e.small;return s.a.createElement("div",{style:{margin:"0 auto",maxWidth:"60rem",padding:"0rem 0rem 0rem"}},s.a.createElement("header",{style:{width:"100%",display:"inline-flex",justifyContent:"center",flexDirection:"row"}},s.a.createElement("span",{style:{display:"block"}}),!t&&s.a.createElement("span",{className:"site-title"},s.a.createElement("h1",null,s.a.createElement("a",{href:"/news"},"Uutiset .")),s.a.createElement("div",{className:"site-description"},"Uutisia, hitaammin")),t&&s.a.createElement("span",{className:"site-title-small"},s.a.createElement("h1",null,"Uutiset ."))))});m.defaultProps={siteTitle:""};var d=m,u=(a(4),function(e){var t=e.children,a=e.small;return s.a.createElement(s.a.Fragment,null,s.a.createElement(d,{siteTitle:"Uutiset",small:a}),s.a.createElement("div",{className:"page-container"},s.a.createElement("main",null,t),s.a.createElement("footer",{style:{borderTopStyle:"solid",borderTopWidth:"1px",marginTop:"1.5rem",minHeight:"100%",paddingTop:"1.5rem"}},"\xa9 ",(new Date).getFullYear()," Tiimi")))});var f=a(6);var h=function(e){var t=e.data,a=(e.feedName,t),n=function(e){(e=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()))).setUTCDate(e.getUTCDate()+4-(e.getUTCDay()||7));var t=new Date(Date.UTC(e.getUTCFullYear(),0,1)),a=Math.ceil(((e-t)/864e5+1)/7);return[e.getUTCFullYear(),a]}(new Date),r=new Map;a.sortedTags.slice(4).forEach((function(e){r.set(e,"#355C7D")})),r.set(a.sortedTags[0],"#F8B195"),r.set(a.sortedTags[1],"#F67280"),r.set(a.sortedTags[2],"#C06C84"),r.set(a.sortedTags[3],"#6C5B7B"),r.set(a.sortedTags[4],"#355C7D");var i=new Map;return a.sortedTags.forEach((function(e,t){i.set(e,"category-"+t)})),s.a.createElement("div",{className:"categoriesContainer"},s.a.createElement("div",{className:"categoriesHeader"},s.a.createElement("div",{className:"weekSummaryHeading"},s.a.createElement("h1",null,"Viikko "+n[1]+", "+n[0])),s.a.createElement("div",{className:"weekSummary"},Object(f.a)(t.categoryAssignments.values()).map((function(e){return e.assignedNews.length>0?s.a.createElement("span",{key:"taglink"+e.category},s.a.createElement("a",{href:"#category"+e.category},e.category)):null})))),Object(f.a)(t.categoryAssignments.values()).map((function(e){return e.assignedNews.length>0&&s.a.createElement("div",{key:"category"+e.category,id:"category"+e.category,className:"categoryContainer "+i.get(e.category)+" categorySize-"+e.assignedNews.length},s.a.createElement("h1",{className:"categoryTitle"},e.category),s.a.createElement("div",{className:"categoryNews categoryNewsSize-"+e.assignedNews.length},e.assignedNews.map((function(e){return s.a.createElement("article",{key:"newsItem"+e.guid,className:"newsItem newsItem-"+e.item.sizeCategory},s.a.createElement("div",{className:"articleInfo"},s.a.createElement("div",{className:"source"},"Yle"),s.a.createElement("div",{className:"displayCategory"},"#"+e.item.displayCategory)),s.a.createElement("h1",null,s.a.createElement("a",{href:e.guid},e.item.data.title)),s.a.createElement("p",null,e.item.data.contentSnippet),void 0!==e.item.data.enclosure&&s.a.createElement("div",{className:"articleCoverContainer"},s.a.createElement("img",{className:"articleCover",src:e.item.data.enclosure.url})))}))))})))};var E=function(){var e=Object(n.useState)({Items:[]}),t=Object(g.a)(e,2),a=t[0],r=t[1];Object(n.useEffect)((function(){(function(){var e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("https://xglupt6p4k.execute-api.us-east-1.amazonaws.com/dev/getNews").then((function(e){return e.json()})).then((function(e){console.log(e),r(e)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var i=function(e){var t=new Map,a=new Map;e.Items.forEach((function(e){e.item.data.assigned=!1,e.item.data.categories.slice(0,2).forEach((function(e){void 0===t.get(e)?(t.set(e,1),console.log("Setting  "+e+" to 1")):(t.set(e,t.get(e)+1),console.log("Setting  "+e+" to "+t.get(e)))}))})),t.forEach((function(e,t,a){console.log(e+" "+t)}));var n=Array.from(t.keys());console.log("First hit: "+n[0]);var s=n.sort((function(e,a){return t.get(e)-t.get(a)}));console.log("Top hit: "+s[0]+" "+t.get(s[0])),e.Items.forEach((function(e){e.categoryWeight=0,e.item.data.categories.forEach((function(a){e.categoryWeight+=t.get(a)}))}));var r=Array.from(e.Items).sort((function(e,t){return e.categoryWeight-t.categoryWeight}));return console.log("Category weights: "),r.forEach((function(e){console.log(e.item.data.title+" "+e.categoryWeight)})),s.forEach((function(e){var n={assignedNews:[]};n.weight=t.get(e),n.demand=4,n.category=e,a.set(e,n)})),console.log("Assignments"),r.forEach((function(n){s.forEach((function(s){if(t.get(s)>Math.min(e.Items.length/15,1)&&n.item.data.categories.includes(s)&&!0!==n.item.data.assigned){var r=a.get(s);r.assignedNews.length<r.demand&&(n.item.data.assigned=!0,0!==n.item.data.categories[0].localeCompare(s)?n.item.displayCategory=n.item.data.categories[0]:n.item.displayCategory=n.item.data.categories[1],r.assignedNews.push(n))}}))})),r.forEach((function(n){s.forEach((function(s){if(t.get(s)>Math.max(e.Items.length/25,2)&&n.item.data.categories.includes(s)&&!0!==n.item.data.assigned){var r=a.get(s);r.assignedNews.length<r.demand&&(n.item.data.assigned=!0,r.assignedNews.push(n))}}))})),a.forEach((function(e,t,a){console.log(t+": "),e.assignedNews.forEach((function(t){t.item.sizeCategory="size-"+e.assignedNews.length,console.log(t.item.data.title)}))})),{categories:t,sortedTags:s,categoryAssignments:a}}(a),o=new Map;i.sortedTags.slice(4).forEach((function(e){o.set(e,"#355C7D")})),o.set(i.sortedTags[0],"#F8B195"),o.set(i.sortedTags[1],"#F67280"),o.set(i.sortedTags[2],"#C06C84"),o.set(i.sortedTags[3],"#6C5B7B"),o.set(i.sortedTags[4],"#355C7D");var m=new Map;return i.sortedTags.forEach((function(e,t){m.set(e,"category-"+t)})),s.a.createElement("div",null,s.a.createElement(u,null,0!==a.Items.length?s.a.createElement(h,{data:i,feedName:"Kaikki"}):s.a.createElement("div",{style:{textAlign:"center"}},s.a.createElement("h1",null,"Noudetaan uutisia..."))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.ebf54f92.chunk.js.map