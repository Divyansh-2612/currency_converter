const Base_Url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const selects=document.querySelectorAll(".flag-name select");
const amount=document.querySelector(".amount-class input");
const btn=document.querySelector("form button");
const fromcur=document.querySelector(".from select");
const tocur=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let sel of selects){
    for (let countrycode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=countrycode;
        newoption.value=countrycode;
        if(sel.name==="from" && countrycode==="USD"){
            newoption.selected="selected";
        }
        else if(sel.name==="to" && countrycode==="INR"){
            newoption.selected="selected";
        }
        sel.append(newoption);
    }
    sel.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateflag=(element)=>{
    let flag=element.value;
    let flcod=countryList[flag];
    let image=element.parentElement.querySelector("img");
    let nsrc=`https://flagsapi.com/${flcod}/flat/64.png/`;
    image.src=nsrc;

};
const updaterates=async()=>{
    let amountval=amount.value;
    if(amountval=="" || amountval<0){
        amountval=1;
        amount.value=1;
    }
    let url=`${Base_Url}${fromcur.value.toLowerCase()}/${tocur.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[tocur.value.toLowerCase()];
    let final=amountval*rate;
    msg.innerText=`${amountval}${fromcur.value} is equal to ${final} ${tocur.value}`;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updaterates();
})
