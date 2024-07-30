var tablinks = document.getElementsByClassName("tab-links");
var tablinks = document.getElementsByClassName("tab-contains");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontaint of tabcontaints){
        tabcontaint.classList.remove("active-tab");
    }
}