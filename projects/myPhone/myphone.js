
const now = new Date();

document.querySelector("header #mini-time").textContent=`${now.getHours()-12}:${now.getMinutes()} PM`;
document.querySelector("main #main-time").innerHTML=`0${now.getHours()-12}:${now.getMinutes()}<span>PM</span>`;
document.querySelector("main #main-date").innerHTML=`sun, june ${now.getDate()}`;

let userInput=document.querySelector("main #search-bar input");
userInput.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
      let q=userInput.value;
    let url=`https://www.google.com/search?q=${encodeURIComponent(q)}`;
      window.location.href=url;
      userInput.value="";
    }
});


const swipeArea = document.querySelector("body");

  let startY = 0;

  swipeArea.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  swipeArea.addEventListener("touchend", (e) => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;

    if (deltaY > 50) { // Minimum swipe distance to trigger
       document.querySelector("body").innerHTML="<h1>here will display all apps<h1>";
    }
  });