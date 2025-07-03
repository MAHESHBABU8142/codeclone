
const now = new Date();

//to show the add new transaction form
document.querySelector("main #transactions-list #new").addEventListener("click",()=>{
document.querySelector("main #add-new-transaction").classList.toggle("form-motion");
});



//for showing date and time
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
document.querySelector("main #transactions-list #date").innerHTML = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}   ${days[now.getUTCDay()]}`;


//add payment data
document.querySelector("main #add-new-transaction form button").addEventListener("click",function(event){
  
    event.preventDefault();
     let from=document.querySelector("#add-new-transaction form #from").value;
    let to=document.querySelector("#add-new-transaction form #to").value;
   
    let listItem=document.createElement("li"); 
    let time=document.createElement("span");
    let fromTo=document.createElement("span");
    let amount=document.createElement("span");
  
    time.innerHTML=`${now.getHours()}:${now.getMinutes()}`;
    fromTo.innerHTML=`${from} ⇒ ${to}`;
    amount.innerHTML="₹"+ document.querySelector("#add-new-transaction form #amount").value +"/-" ;

    listItem.appendChild(time);
    listItem.appendChild(fromTo);
    listItem.appendChild(amount);

    document.querySelector("main #transactions-list ul").appendChild(listItem);
});