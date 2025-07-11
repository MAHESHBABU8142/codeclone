

document.addEventListener("DOMContentLoaded", function () {


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
     function showTime(){
      const now = new Date();
   document.querySelector("header p").innerHTML=`${String(_12HoursTime()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")} ${noon()}`;
     }
     setInterval(showTime,1000);
  
     showTime();

//global variable diclarations
let payLIst=document.querySelector("main #transactions-list ul");






//to show the add new transaction form
document.querySelector("main #transactions-list #new").addEventListener("click",()=>{
document.querySelector("main #add-new-transaction").classList.toggle("form-motion");
});



//for showing date and day
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
document.querySelector("main #transactions-list #date").innerHTML = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth()+1).padStart(2,"0")}-${now.getFullYear()}   ${days[now.getDay()]}`;

//add payment data after form submiton..
document.querySelector("main #add-new-transaction form").addEventListener("submit",function(){

//clear status and show form
      document.querySelector("main #add-new-transaction").classList.toggle("form-motion");
   
      document.querySelector("main #count-transactions").style.display="flex";
    
       //clear form values...
 let instance= new Date();

//to check AM or PM
let noon=function(){
          if (instance.getHours()<=12) {
            
            return "AM"
            
        }
          else {
           return "PM"
        }
     }

//to convert time
  let _12HoursTime=function(){
    if (instance.getHours()==0){
      return "12";
    }
    else if (instance.getHours()>12){
        return instance.getHours()-12;
    }
    else {
         return instance.getHours();
    }
  }
   
     let from=document.querySelector("#add-new-transaction form #from").value;
    let to=document.querySelector("#add-new-transaction form #to").value;

    let GoFood;
    let BharathPay;

if (to=="Go Food"){
 GoFood=document.querySelector("#add-new-transaction form #amount").value;
 BharathPay=0;
}
else {
  GoFood=0;
BharathPay=document.querySelector("#add-new-transaction form #amount").value;
}

    //to insert payments details
 let payObj={
     time:`${String(_12HoursTime()).padStart(2,"0")}:${String(instance.getMinutes()).padStart(2,"0")}:${String(instance.getSeconds()).padStart(2,"0")} ${noon()}`,
     from:from,
     to:to,
     GoFood:GoFood,
     BharathPay:BharathPay,
     amount:document.querySelector("#add-new-transaction form #amount").value,
     NumberOfTimes:document.querySelector("#add-new-transaction form #NumberOfTimes").value
    }



  //  //to send data to backend server
     fetch("https://l24news.mudavathmaheshbabu002.workers.dev/sendPayData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(payObj)
      });
      
       document.querySelector("main #add-new-transaction form #amount").value="";
       document.querySelector("main #add-new-transaction form #from").value="";
         });
    

//if there is no transctions

if (payLIst.childElementCount==0){
    document.querySelector("main #transactions-list #status").innerHTML="No payments yet";
    document.querySelector("main #count-transactions").style.display="";
}



//for showing qr scanners

   let imgCount=0;

   function setQrImg(imgPath){
    let scanerImg=document.querySelector("main #qr fieldset img");
    scanerImg.setAttribute("src",imgPath);
    document.querySelector("main #qr #qr-download").setAttribute("href",imgPath);
  }
 
    setQrImg("../../images/bharath pay scanner.jpg");

   document.querySelector("main #qr #qr-next-btn").addEventListener("click",function(){
   
    if (imgCount%2==0){
   setQrImg("../../images/Go Food scanner.png");
    }
     else {
      setQrImg("../../images/bharath pay scanner.jpg");
    }
    
    imgCount++;
   });
 
  }); 

        //to get payments data from server database
         fetch("https://l24news.mudavathmaheshbabu002.workers.dev/getPayData", {
          method:"GET"
         })
        .then(res =>res.json())
        .then(data=>{
            console.log(data.payments.length);
          if (data.payments.length>0){
               document.querySelector("main #transactions-list #status").innerHTML="";
             
          }
       //total money variables
        let gpayTotal=0;
        let bharathPaytotal=0;
        let GrandTotal=0;

    for (let i=0;i<data.payments.length;i++){

   //create payment elements
    let listItem=document.createElement("li"); 
    let time=document.createElement("span");
    let fromTo=document.createElement("span");
    let amount=document.createElement("span");
     let noOfTImes=document.createElement("span");

    //insert value to created elements
    time.innerHTML=data.payments[i].time;
    fromTo.innerHTML=`${data.payments[i].from} ⇒ ${data.payments[i].to}`;
    amount.innerHTML="₹"+data.payments[i].amount +"/-" ;
    noOfTImes.innerHTML=data.payments[i].NumberOfTimes+" Times";

    //attach elements to list Item
    listItem.appendChild(time);
    listItem.appendChild(fromTo);
    listItem.appendChild(amount);
    listItem.appendChild(noOfTImes);
    
    //attach to main ul
    document.querySelector("main #transactions-list ul").appendChild(listItem);
 

   //to count total money 
       gpayTotal+=Number((data.payments[i].GoFood)*(data.payments[i].NumberOfTimes));
       bharathPaytotal+=Number((data.payments[i].BharathPay)*(data.payments[i].NumberOfTimes));
       GrandTotal+=Number((data.payments[i].amount)*(data.payments[i].NumberOfTimes));
      
        //adding total money data
      document.querySelector("main #count-transactions #gpay-total").innerHTML=`Total Gpay collection : ${gpayTotal} /-`;
     document.querySelector("main #count-transactions #bharathpay-total").innerHTML=`Total bharath pay collection : ${bharathPaytotal} /-`;
     document.querySelector("main #count-transactions h3").innerHTML=`GrandTotal : ${GrandTotal} /-`;

     
        moneyReq=`Hello,
       *The total collection comes to ${GrandTotal}/-*.
       Could you please send the amount at your convenience?
       Thank you so much!
      `
    }
        });


     

//to request for money 
     
document.querySelector("main #count-transactions #req-btn").addEventListener("click",function(){

  window.open(`https://wa.me/918142260358?text=${encodeURIComponent(moneyReq)}`,"_blank");

});