

 //to submit person 1 chat messages
  document.querySelector("form").addEventListener("submit",()=>{
      console.log("chat msg submitted");
      let person1Msg=document.querySelector("form input").value;
      fetch("https://newback.up.railway.app/person1ChatMsg", {
        method: "POST",
         headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `person1Msg=${encodeURIComponent(person1Msg)}`
    });
    });





//to get person 1 chats
function getPerson1Chats(index){
    fetch("https://newback.up.railway.app/dataBase",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify()
    })
    .then(res=>res.json())
    .then(data =>{
 
   //chat divison
     let chat=document.createElement("div");
      chat.classList="person1";
        //profile
     let profile=document.createElement("button");
     profile.innerText="P1";
     profile.classList="profile1";
        //chat
     let chatText=document.createElement("p") ;
       chatText.innerText=data.person1[index];

     


     //attaching to section
     chat.appendChild(profile);
     chat.appendChild(chatText);
     document.querySelector("main #chats").appendChild(chat);

    });
}



   

//to get person 2 chats
function getPerson2Chats(index){
    fetch("https://newback.up.railway.app/dataBase",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify()
    })
    .then(res=>res.json())
    .then(data =>{
   

   //chat divison
     let chat=document.createElement("div");
      chat.classList="person2";
        //profile
     let profile=document.createElement("button");
     profile.innerText="P2";
     profile.classList="profile2";
        //chat
     let chatText=document.createElement("p") ;
     chatText.innerText=data.person2[index];


     //attaching to section
     chat.appendChild(profile);
     chat.appendChild(chatText);
     document.querySelector("main #chats").appendChild(chat);
    });
}


//to show chats based on length of chatArray
  fetch("https://newback.up.railway.app/dataBase",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify()
    })
    .then(res=>res.json())
    .then(data =>{
      for (let i = 0; i < data.person1.length; i++) {
      getPerson1Chats(i);
      getPerson2Chats(i);
     }
    });
