
//for sound effect
 function playSound(soundPath){
  let sound = new Audio(soundPath);
  sound.play();
 }

//time object
const now = new Date();
let hours;
 //to check AM or PM
let noon=function(){
          if (now.getHours()<=12) {
            
            return "AM"
            
        }
          else {
           return "PM"
        }
     }
    //to convert 12 hours system 
  let _12HoursTime=function(){
    if (now.getHours()==0){
      return "12";
    }
    else if (now.getHours()>12){
        return now.getHours()-12;
    }
    else {
         return now.getHours();
    }
  }

     //show real time at header
     console.log(now.getHours());
     function showTime(){
      const now = new Date();
   document.querySelector("header p").innerHTML=`${String(_12HoursTime()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")} ${noon()}`;
     }
     setInterval(showTime,1000);
  
     showTime();

//global variable diclarations
let payLIst=document.querySelector("main #transactions-list ul");


//total money variables
let gpayTotal=0;
let bharathPaytotal=0;
let GrandTotal=0;
let moneyReq;





//to show the add new transaction form
document.querySelector("main #transactions-list #new").addEventListener("click",()=>{
document.querySelector("main #add-new-transaction").classList.toggle("form-motion");
});



//for showing date and day
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
document.querySelector("main #transactions-list #date").innerHTML = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth()+1).padStart(2,"0")}-${now.getFullYear()}   ${days[now.getUTCDay()]}`;




//add payment data after form submiton..
document.querySelector("main #add-new-transaction form").addEventListener("submit",function(event){
 
     //clear status 
      document.querySelector("main #add-new-transaction").classList.toggle("form-motion");
      document.querySelector("main #transactions-list #status").innerHTML="";
      document.querySelector("main #count-transactions").style.display="flex";
   
    //to prevernt not to reload aftr submition
    event.preventDefault();
     let from=document.querySelector("#add-new-transaction form #from").value;
    let to=document.querySelector("#add-new-transaction form #to").value;
    
    //create payment elements
    let listItem=document.createElement("li"); 
    let time=document.createElement("span");
    let fromTo=document.createElement("span");
    let amount=document.createElement("span");
    

    //insert value to created elements
    time.innerHTML=`${String(_12HoursTime()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")} ${noon()}`;
    fromTo.innerHTML=`${from} ⇒ ${to}`;
    amount.innerHTML="₹"+ document.querySelector("#add-new-transaction form #amount").value +"/-" ;

    //attach elements to list Item
    listItem.appendChild(time);
    listItem.appendChild(fromTo);
    listItem.appendChild(amount);

    //attach to main ul
    playSound("../../sounds/tap-notification-180637.mp3");
    document.querySelector("main #transactions-list ul").appendChild(listItem);

    //to count total money 
    if (to==="Go Food") {
      gpayTotal+=Number(document.querySelector("#add-new-transaction form #amount").value);
    }
    else {
        bharathPaytotal+=Number(document.querySelector("#add-new-transaction form #amount").value);
    }

      GrandTotal+=Number(document.querySelector("#add-new-transaction form #amount").value);
      
      //adding total money data
      document.querySelector("main #count-transactions #gpay-total").innerHTML=`Total Gpay collection : ${gpayTotal} /-`;
      document.querySelector("main #count-transactions #bharathpay-total").innerHTML=`Total bharath pay collection : ${bharathPaytotal} /-`;
      document.querySelector("main #count-transactions h3").innerHTML=`GrandTotal : ${GrandTotal} /-`;

      //clear form values...

       document.querySelector("main #add-new-transaction form #amount").value="";
       document.querySelector("main #add-new-transaction form #from").value="";

        moneyReq=`Hello,
       *The total collection comes to ${GrandTotal}/-*.
       Could you please send the amount at your convenience?
       Thank you so much!
      `
      });

//if there is no transctions
if (payLIst.childElementCount==0){
    document.querySelector("main #transactions-list #status").innerHTML="No payments yet";
    document.querySelector("main #count-transactions").style.display="none";
}


//to request for money 
     
document.querySelector("main #count-transactions #req-btn").addEventListener("click",function(){

  window.open(`https://wa.me/918142260358?text=${encodeURIComponent(moneyReq)}`,"_blank");

});

//for showing qr scanners

   let imgCount=0;

   function setQrImg(imgPath){
    let scanerImg=document.querySelector("main #qr fieldset img");
    scanerImg.setAttribute("src",imgPath);
  }
 
    setQrImg("../../images/bharath pay scanner.jpg");

   document.querySelector("main #qr button").addEventListener("click",function(){
   
    if (imgCount%2==0){
   setQrImg("../../images/Go Food scanner.png");
    }
     else {
      setQrImg("../../images/bharath pay scanner.jpg");
    }
    
    imgCount++;
   });
