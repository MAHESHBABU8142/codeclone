
const now = new Date();

document.querySelector("header #mini-time").textContent=`${now.getHours()-12}:${now.getMinutes()} PM`;
document.querySelector("main #main-time").innerHTML=`0${now.getHours()-12}:${now.getMinutes()}<span>PM</span>`;
document.querySelector("main #main-date").innerHTML=`sat, june ${now.getDate()}`;

let userInput=document.querySelector("main #search-bar input");
userInput.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
      let q=userInput.value;
    let url=`https://www.google.com/search?q=${encodeURIComponent(q)}`;
      window.location.href=url;
      userInput.value="";
    }
});