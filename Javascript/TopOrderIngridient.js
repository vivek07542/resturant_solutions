let submitBtnTopIngridient = document.getElementById("submitBtnTopIngridient");
submitBtnTopIngridient.addEventListener("click",function(){
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        let orderDetail = JSON.parse(localStorage.getItem("orderDetail"));
        let arrayOfOrder = filterOrder(orderDetail,inputForm);
        let array = [];
        let sortedArray = extractMenu(arrayOfOrder,array);
        let topSelection = sliceTopDishes(sortedArray,inputForm)
        let addedMenuId = addMenuId(topSelection);
        let emptyArray = [];
        let arrayIngridient = extractIngridient(addedMenuId,emptyArray);
        let topSelectIngridient = sliceTopDishes(arrayIngridient,inputForm);
        // resetInputForm(inputForm);
        tableCallIngridient(topSelectIngridient);
    }
});

function addMenuId(array){
    let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    array.forEach(element => {
        menuReciepeDetail.forEach(el =>{
            if(element.orderedfood === el.fooditem){
                element.menuId = el.Id;
            }
        });
    });
    return array;
}

function extractIngridient(array,emptyArray){
    let ingridientReciepe =  JSON.parse(localStorage.getItem("ingridientReciepe"));
    array.forEach(el =>{
        ingridientReciepe.forEach(element =>{
            if(element.menuId === el.menuId){
                let object = {};
                object.ingridient = getIngridientIdToValue(element.ingridientId);
                object.unit = getUnitIdToValue(element.unitId);
                object.quantity = Math.ceil(Number(getQtyIdToValue(element.qtyId) * el.quantity));
                
                emptyArray.push(object);
            }
        });
    });   
    let countedArray = countEachIngridient(emptyArray);
    return countedArray;
}

// Count Each Food Function
function countEachIngridient(array){
    var result = [];
    array.reduce(function(res, value) {
     if (!res[value.ingridient]) {
      res[value.ingridient] = {ingridient: value.ingridient, quantity: 0,unit: value.unit};
     result.push(res[value.ingridient])
     }
     res[value.ingridient].quantity += value.quantity;
    return res;
    }, {});
    result.sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity));
    console.log(result);
    return result;
}

// Table Create
function tableCallIngridient(sortedArray) {
    let foodItemDiv = document.getElementById("foodItemDiv");
        let tableDiv = createElements(foodItemDiv, "div", "tblDiv", "tblDataDiv", null, null, null);
        let table = createElements(tableDiv, "table", "table table-striped text-center", "tblData", null, null, null);
        // Table Create
        let headers = ["Order Food","Qty Ordered","Unit"];
        let tableHead = createElements(table, "thead", null, null, null, null, null);
        let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
        headers.forEach(headerText => {
            let header = createElements(headerRow, "th", null, null, null, null, "col");
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
        });
        let tableBody = createElements(table, "tbody", null, null, null, null, null);
        if (sortedArray !== null) {
            sortedArray.forEach(per => {
                    let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
                    let cellId = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodeId = document.createTextNode(per.ingridient);
                    cellId.appendChild(textNodeId);
                    let cellname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodename = document.createTextNode(per.quantity);
                    cellname.appendChild(textNodename);   
                    let cellUnit = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodeUnit = document.createTextNode(per.unit);
                    cellUnit.appendChild(textNodeUnit);              
            });
        }
    
}