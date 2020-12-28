function autoComplete(input,array,div){
    debugger;
 
    input.addEventListener("keyup",function(){
        let emptyArray = [];  
        array.forEach(element => {
            let matchValue = element.ingridientname.match(input.value); 
            if(matchValue !==null){
                let objIndex = array.findIndex((obj => obj.ingridientname == matchValue.input));
                let object = {};
                object.Id = array[objIndex].Id;
                object.ingridientname = array[objIndex].ingridientname; 
                div.style.display="flex";
                emptyArray.push(object);
                div.innerHTML="";
                console.log(emptyArray);
                emptyArray.forEach(el =>{
                    let  ingridientUl = createElements(div, "ul", "col-12 ingridientNameUl", null, null, null, null);        
                    let ingridientli = createElements(ingridientUl, "li", "col-12 ingridientNameLi", null, el.ingridientname, null, null)
                    ingridientli.addEventListener("click",function(){
                        clickEventForLi(ingridientli,input,div);
                    });
                });
            }
            else{
                let inputValue = input.value;
                let inputLength = inputValue.length;
                if(inputLength > 6){
                    if(confirm("This Ingridient Not In List..Please Click to Add")){
                        document.location.href = "IngridientMaster.html";
                    }                    
                }
            }
        });
    });

}
function clickEventForLi(li,input,div){
    input.value = li.innerText;
    div.style.display = "none";
}