// ==UserScript==
// @name         SimCompanies Suite
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Andrew Long
// @match        https://www.simcompanies.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=simcompanies.com
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      file://C:\Users\calon\Documents\Code\extensions\scripts\simcompanies.js
// @resource     STYLES file://C:\Users\calon\Documents\Code\extensions\scripts\simcompanies.css
// ==/UserScript==


var buildings = []

check_buildings = () => {
  buildings = []
  var links = document.getElementsByTagName("a");
  var linkList = Array.prototype.slice.call(links);
  linkList.forEach((e) => {
    if(e.href.includes("/b/")){
      buildings.push(e)
      if(e.childNodes.length > 4){
        e.click()
      }
    }
  })
}

setup_dash = () => {
  const myCss = GM_getResourceText("STYLES")
  GM_addStyle(myCss)
  const main = document.createElement("div")
  main.classList.add("scs_main")
  main.setAttribute("id", "scs-main")
  main.textContent = "Hello world!"
  document.body.appendChild(main)
}

refresh_view = () => {
  var main = document.getElementById('scs-main')
  var nodes = main.childNodes
  nodes.forEach((e) => {
    e.remove()
  })
  buildings.forEach((e) => {
    e.setAttribute('top', 0)
    e.setAttribute('left', 0)
    var imgs = e.getElementsByTagName('img')
    var img_list = Array.prototype.slice(imgs)
    img_list.forEach((i) => {
      console.log(i)
      i.remove()
    })
    main.appendChild(e)
  })
}

(function() {
    'use strict';

    console.log("SimCompanies Suite Starting...")
    console.log(document.location.pathname)
    setup_dash()

    var token = setInterval(() => {
      if(document.location.pathname == '/landscape/'){
        check_buildings()
      }
      refresh_view()
    }, 1000)

})();
