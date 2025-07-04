

//time object
const now = new Date();

 //to check AM or PM
let noon=function(){
          if (now.getHours()<=12) {
            return "AM"
            
        }
          else {
           return "PM"
        }
     }

     //show real time at header
     function showTime(){
      const now = new Date();
   document.querySelector("header p").innerHTML=`${String(now.getHours()-12).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")} ${noon()}`;
     }
     setInterval(showTime,1000);
  
     showTime();

//global variable diclarations
let payLIst=document.querySelector("main #transactions-list ul");


//total money variables
let gpayTotal=0;
let bharathPaytotal=0;
let GrandTotal=0;





//to show the add new transaction form
document.querySelector("main #transactions-list #new").addEventListener("click",()=>{
document.querySelector("main #add-new-transaction").classList.toggle("form-motion");
});



//for showing date and time
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
    time.innerHTML=`${String(now.getHours()-12).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")} ${noon()}`;
    fromTo.innerHTML=`${from} ⇒ ${to}`;
    amount.innerHTML="₹"+ document.querySelector("#add-new-transaction form #amount").value +"/-" ;

    //attach elements to list Item
    listItem.appendChild(time);
    listItem.appendChild(fromTo);
    listItem.appendChild(amount);

    //attach to main ul
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
      });

//if there is no transctions
if (payLIst.childElementCount==0){
    document.querySelector("main #transactions-list #status").innerHTML="No payments yet";
    document.querySelector("main #count-transactions").style.display="none";
}

