
document.querySelector("main .chat-bar input").addEventListener("keypress",function(event){
         if(event.key==="Enter"){
    let q=document.querySelector("main .chat-bar input").value ;
         console.log(q);
         let url=`https://www.google.com/search?q=${encodeURIComponent(q)}`;
         window.location.href=url;
         }


});