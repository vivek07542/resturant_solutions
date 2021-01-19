// Submit Click Event
let submitBtnIngridient = document.getElementById("submitBtn")
submitBtnIngridient.addEventListener("click", function () {
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        let orderDetail = JSON.parse(localStorage.getItem("orderDetail"));
        let arrayOfOrder = filterOrder(orderDetail,inputForm);
        resetInputForm(inputForm);
        tableCall(arrayOfOrder);
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
                 startDate = new Date(element.value);
                break;
            case "dateFrom":
                 endDate = new Date(element.value);
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
// Table Function
function tableCall(arrayOfOrder) {
    let foodItemDiv = document.getElementById("foodItemDiv");
        let tableDiv = createElements(foodItemDiv, "div", "tblDiv", "tblDataDiv", null, null, null);
        let table = createElements(tableDiv, "table", "table table-striped text-center", "tblData", null, null, null);
        // Table Create
        let headers = ["OrderId", "Order Date","Customer Name", "Total Price"];
        let tableHead = createElements(table, "thead", null, null, null, null, null);
        let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
        headers.forEach(headerText => {
            let header = createElements(headerRow, "th", null, null, null, null, "col");
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
        });
        let tableBody = createElements(table, "tbody", null, null, null, null, null);
        if (arrayOfOrder !== null) {
            arrayOfOrder.forEach(per => {
                    let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
                    let cellId = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodeId = document.createTextNode(per.Id);
                    cellId.appendChild(textNodeId);
                    let cellname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodename = document.createTextNode(per.orderdate);
                    cellname.appendChild(textNodename);
                    let cellVendorname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textVendorNodename = document.createTextNode(per.customername);
                    cellVendorname.appendChild(textVendorNodename);
                    let cellPrice = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodePrice = document.createTextNode(per.totalprice);
                    cellPrice.appendChild(textNodePrice);                
            });
            let priceContainer = createElements(foodItemDiv, "div", "col-12 py-2 d-flex justify-content-end align-items-end", null, null, null, null);
            let eachPriceDiv = createElements(priceContainer, "div", "col-sm-8 col-md-3 py-2 mr-5 form-inline d-flex justify-content-around", null, null, null, null);
            let priceLabel = createElements(eachPriceDiv, "label", "form-label", null, "Total Price:", null, null);
            let totalSell = 0;
            let totalFinalPrice = totalSellOrder(arrayOfOrder,totalSell);
            let priceInput = createElements(eachPriceDiv, "span", "form-control totalPrice", "totalPrice",totalFinalPrice , null, null);
        }
    
}
// Total Sell Calculation
function totalSellOrder(arrayOfOrder,totalprice){
    totalprice;
    arrayOfOrder.forEach(el =>{
        totalprice =+ totalprice + el.totalprice;
    });
    return totalprice;
}