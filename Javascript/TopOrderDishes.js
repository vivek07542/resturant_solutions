// Submit Button Click Event
let submitBtnTop = document.getElementById("submitBtnTop");
submitBtnTop.addEventListener("click",function(){
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        let orderDetail = JSON.parse(localStorage.getItem("orderDetail"));
        let arrayOfOrder = filterOrder(orderDetail,inputForm);
        let array = [];
        let sortedArray = extractMenu(arrayOfOrder,array);
        let topSelection = sliceTopDishes(sortedArray,inputForm)
        // resetInputForm(inputForm);
        tableCall(topSelection);
    }
});
// Filter Array As Per Date Selection
function filterOrder(orderDetail,inputForm){
    let startDate;
    let endDate;
    inputForm.forEach(element =>{
        let selectType = element.getAttribute("data-isspecial-type");
        switch (selectType) {
            case "dateTo":
                 endDate = new Date(element.value);
                break;
            case "dateFrom":
                 startDate = new Date(element.value);
                break;                
        }
    });
    let array =  getOrderDate(startDate,endDate,orderDetail)
    return array;
}
// Function to get Selected Array
function getOrderDate(startDate,endDate,orderDetail){
     result = orderDetail.filter(d => {var time = new Date(d.orderdate).getTime();
        return (startDate <= time && time <= endDate);
    });
    return result;
}
// Extract Menu 
function extractMenu(arrayOfOrder,array){
    let orderItemDetail = JSON.parse(localStorage.getItem("orderItemDetail"));
    arrayOfOrder.forEach(el =>{
        orderItemDetail.forEach(element =>{
            if(element.orderId === el.Id){
                let object = {};
                object.orderedfood = createMenuIdToValue(element.menuId);
                object.quantity = Number(element.qtyId);
                array.push(object);
            }
        });
    });   
    let countedArray = countEachFood(array);
    return countedArray;
}
// Count Each Food Function
function countEachFood(array){
    var result = [];
    array.reduce(function(res, value) {
     if (!res[value.orderedfood]) {
      res[value.orderedfood] = {orderedfood: value.orderedfood, quantity: 0 };
     result.push(res[value.orderedfood])
     }
     res[value.orderedfood].quantity += value.quantity;
    return res;
    }, {});
    result.sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity));
    console.log(result);
    return result;
}
function sliceTopDishes(sortedArray,inputForm){   
    let foodItemDiv = document.getElementById("foodItemDiv");
    foodItemDiv.innerHTML = "";   
    let start = 0;
    let topSelection;
    let end;
    inputForm.forEach(element =>{
        let selectType = element.getAttribute("data-isspecial-type");
        switch(selectType){
            case "topDishes":
                 end = element.value;
            break;
        }
    });
    if (sortedArray !== null) {
        topSelection = sortedArray.slice(start,end);       
    }
    return topSelection;
}
// Reset Function
function resetInputForm(input) {
    input.forEach(ele => {
        ele.value = "";
        ele.classList.remove("validateGreenBorder");
        ele.classList.remove("validateRedBorder");
    });
    document.getElementById("foodItemDiv").innerHTML = "";
    document.getElementById("spanText").style.display = "none";
}
// Table Create
function tableCall(sortedArray) {
    let foodItemDiv = document.getElementById("foodItemDiv");
        let tableDiv = createElements(foodItemDiv, "div", "tblDiv", "tblDataDiv", null, null, null);
        let table = createElements(tableDiv, "table", "table table-striped text-center", "tblData", null, null, null);
        // Table Create
        let headers = ["Order Food","Qty Ordered"];
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
                    let textNodeId = document.createTextNode(per.orderedfood);
                    cellId.appendChild(textNodeId);
                    let cellname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodename = document.createTextNode(per.quantity);
                    cellname.appendChild(textNodename);              
            });
        }
    
}