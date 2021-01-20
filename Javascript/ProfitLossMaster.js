// PopUp Close Button Click event
closeDynamic.addEventListener("click", function () {
    markContainer.style.display = "none";
});

// Submit Click Event
let submitBtnIngridient = document.getElementById("submitMasterBtn");
submitBtnIngridient.addEventListener("click", function () {
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        let orderDetail = JSON.parse(localStorage.getItem("orderDetail"));
        let arrayOfOrder = filterOrder(orderDetail, inputForm);
        let monthlyExpenseDetail = JSON.parse(localStorage.getItem("monthlyExpenseDetail"));
        let arrayOfExpense = filterExpense(monthlyExpenseDetail, inputForm);
        resetInputForm(inputForm);
        tableExpenseCall(arrayOfExpense);
        let addedBaseCostArray = setBaseCostToArray(arrayOfOrder);
        tableCall(addedBaseCostArray);
        console.log(addedBaseCostArray);
        let emptyArray = [];
        let summaryArray = getSummary(emptyArray);
        console.log(summaryArray);
        generateSummaryTable(summaryArray);
        // console.log(arrayOfExpense);

    }
});
// Filter Array As Per Date Selection
function filterOrder(orderDetail, inputForm) {
    let startDate;
    let endDate;
    inputForm.forEach(element => {
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
    let array = getOrderDate(startDate, endDate, orderDetail)
    return array;
}
// Function to get Selected Array
function getOrderDate(startDate, endDate, orderDetail) {
    result = orderDetail.filter(d => {
        var time = new Date(d.orderdate).getTime();
        return (startDate <= time && time <= endDate);
    });
    return result;
}

// Filter Array As Per Date Selection
function filterExpense(monthlyExpenseDetail, inputForm) {
    let startDate;
    let endDate;
    inputForm.forEach(element => {
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
    let array = getExpenseDate(startDate, endDate, monthlyExpenseDetail)
    return array;
}
// Function to get Selected Array
function getExpenseDate(startDate, endDate, monthlyExpenseDetail) {
    result = monthlyExpenseDetail.filter(d => {
        var time = new Date(d.date).getTime();
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
    document.getElementById("tableDiv").innerHTML = "";
    document.getElementById("spanText").style.display = "none";
}
// Create Monthly Expense Table 
function tableExpenseCall(arrayOfExpense) {
    let headers = ["Id", "Expense Detail", "Month", "Amount"];
    let tableDiv = document.getElementById("tableDiv");
    let ExpenseHeading = createElements(tableDiv, "h5", null, null, "Expense Chart", null, null);
    let table = createElements(tableDiv, "table", "table table-striped text-center", "tblData", null, null, null);
    let tableHead = createElements(table, "thead", null, null, null, null, null);
    let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
    headers.forEach(headerText => {
        let header = createElements(headerRow, "th", null, null, null, null, "col");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
    });
    let tableBody = createElements(table, "tbody", null, null, null, null, null);
    if (arrayOfExpense !== null || arrayOfExpense !== undefined) {
        arrayOfExpense.forEach(per => {
            let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
            let cellId = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodeId = document.createTextNode(per.Id);
            cellId.appendChild(textNodeId);
            let cellname = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodename = document.createTextNode(per.expense);
            cellname.appendChild(textNodename);
            let cellMonth = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodeMonth = document.createTextNode(per.date);
            cellMonth.appendChild(textNodeMonth);
            let cellPrice = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodePrice = document.createTextNode(per.amount);
            cellPrice.appendChild(textNodePrice);
        });
        let priceContainer = createElements(tableDiv, "div", "col-12 py-2 form-inline d-flex justify-content-around", null, null, null, null);
        let netPriceLabel = createElements(priceContainer, "label", "form-label", null, "Total Monthly Expense :", null, null);
        let totalAmount = 0;
        let totalExpense = totalAmountExpense(arrayOfExpense, totalAmount)
        let netPriceSpan = createElements(priceContainer, "span", "form-control inputItem", "totalMonthlyExpense", totalExpense, null, null);
    };
}

function totalAmountExpense(arrayOfExpense, totalAmount) {
    arrayOfExpense.forEach(e => {
        totalAmount += Number(e.amount);
    });
    return totalAmount
}

// Table Function
function tableCall(arrayOfOrder) {
    // let foodItemDiv = document.getElementById("foodItemDiv");
    let tableDivIn = document.getElementById("tableDiv");
    let ExpenseHeading = createElements(tableDivIn, "h5", null, null, "Expense Chart", null, null);
    let tableDiv = createElements(tableDivIn, "div", "tblDiv", "tblDataDiv", null, null, null);
    let table = createElements(tableDiv, "table", "table table-striped text-center", "tblData", null, null, null);
    // Table Create
    let headers = ["OrderId", "Order Date", "Customer Name", "Sell Amount", "Base Amount"];
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
            let hyperlinkId = createElements(cellId, "a", null, null, per.Id, null, "col")
            hyperlinkId.addEventListener("click", function () {

                extractOrderDetail(hyperlinkId.innerText);
            });
            let cellname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
            let textNodename = document.createTextNode(per.orderdate);
            cellname.appendChild(textNodename);
            let cellVendorname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
            let textVendorNodename = document.createTextNode(per.customername);
            cellVendorname.appendChild(textVendorNodename);
            let cellPrice = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
            let textNodePrice = document.createTextNode(per.totalprice);
            cellPrice.appendChild(textNodePrice);
            let cellBasePrice = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
            // let BaseCostTotalOfOrder = getOrderDetail(per.Id);
            let textNodeBasePrice = document.createTextNode(per.basecost);
            cellBasePrice.appendChild(textNodeBasePrice);
        });
        let priceContainer = createElements(tableDivIn, "div", "col-12 py-2 d-flex justify-content-around", null, null, null, null);
        let eachPriceDiv = createElements(priceContainer, "div", "col-12 py-2 mr-5 form-inline d-flex justify-content-around", null, null, null, null);
        let priceLabel = createElements(eachPriceDiv, "label", "form-label", null, "Total Selling Amount:", null, null);
        let totalSell = 0;
        let totalFinalPrice = totalSellOrder(arrayOfOrder, totalSell);
        let priceInput = createElements(eachPriceDiv, "span", "form-control totalPrice", "totalSellPrice", totalFinalPrice, null, null);
        let baseCostLabel = createElements(eachPriceDiv, "label", "form-label", null, "Base Cost Total Amount:", null, null);
        let totalBaseCost = 0;
        let totalFinalBaseCost = totalBaseCostOrder(arrayOfOrder, totalBaseCost);
        let baseCostInput = createElements(eachPriceDiv, "span", "form-control totalPrice", "totalBasePrice", totalFinalBaseCost, null, null);
    }
}
// Total Sell Calculation
function totalSellOrder(arrayOfOrder, totalprice) {
    totalprice;
    arrayOfOrder.forEach(el => {
        totalprice = + totalprice + el.totalprice;
    });
    return totalprice;
}

function totalBaseCostOrder(arrayOfOrder, totalBaseCost) {
    totalBaseCost;
    arrayOfOrder.forEach(el => {
        totalBaseCost = + totalBaseCost + el.basecost;
    });
    return totalBaseCost;
}

function setBaseCostToArray(array) {
    array.forEach(e => {
        let baseCostTotalOfOrder = getOrderDetail(e.Id);
        e.basecost = baseCostTotalOfOrder;
    })
    return array;
}
function getOrderDetail(arrayId) {
    let orderItemDetail = JSON.parse(localStorage.getItem("orderItemDetail"));
    let array = [];
    let baseCostArray;
    orderItemDetail.forEach(el => {
        if (arrayId === el.orderId) {
            baseCostArray = getBaseCost(el.menuId, el.qtyId, array);
        }
    });
    let totalBasePrice = totalBaseCost(baseCostArray);
    return totalBasePrice;
}

function getBaseCost(menuId, qty, array) {
    let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    menuReciepeDetail.forEach(e => {
        if (menuId === e.Id) {
            let baseCost = Math.ceil(Number(e.basecost) * Number(qty));
            array.push(baseCost);
        }
    });
    return array;
}
function totalBaseCost(array) {
    let sum = 0;
    array.forEach(e => {
        sum += e;
    });
    return sum;
}
function extractOrderDetail(Id) {
    // setTimeout(function () { document.location.href = "OrderFood.html"; }, 3000);
    let orderArray = getOrderMenuDetail(Id);
    let markContainer = document.getElementById("markContainer");
    markContainer.style.display = "flex";
    tableGenerate(orderArray);
}

function getOrderMenuDetail(Id) {
    let orderItemDetail = JSON.parse(localStorage.getItem("orderItemDetail"));
    debugger;
    let array = [];
    let object;
    orderItemDetail.forEach(e => {
        debugger;
        if (e.orderId == Id) {
            object = {};
            object.Id = e.Id;
            object.fooditem = createMenuIdToValue(e.menuId);
            object.quantity = e.qtyId;
            object.price = e.price;
            object.orderId = e.orderId;
            array.push(object);
        }
    });
    return array;
}
// Generate Table In PopUp
function tableGenerate(orderArray) {
    let foodItemDiv = document.getElementById("generateTable");
    foodItemDiv.innerHTML = "";
    let mainContainer = createElements(foodItemDiv, "div", "row justify-content-center py-3 tblBox", null, null, null, null);
    let table = createElements(mainContainer, "table", "table table-striped text-center", "tblData", null, null, null);
    // Table Create
    let headers = ["Id", "Order No.", "Food Item", "Quantity", "Price"];
    let tableHead = createElements(table, "thead", null, null, null, null, null);
    let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
    headers.forEach(headerText => {
        let header = createElements(headerRow, "th", null, null, null, null, "col");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
    });
    let tableBody = createElements(table, "tbody", null, null, null, null, null);
    if (orderArray !== null) {
        orderArray.forEach(per => {
            let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
            let cellId = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
            let textNodeId = document.createTextNode(per.Id);
            cellId.appendChild(textNodeId);
            let cellOrderId = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodeMenuId = document.createTextNode(per.orderId);
            cellOrderId.appendChild(textNodeMenuId);
            let cellname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
            let textNodename = document.createTextNode(per.fooditem);
            cellname.appendChild(textNodename);
            let cellQty = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
            let textNodeQty = document.createTextNode(per.quantity);
            cellQty.appendChild(textNodeQty);
            let cellPrice = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
            let textNodePrice = document.createTextNode(per.price);
            cellPrice.appendChild(textNodePrice);
        });
    }
}
function getSummary(emptyArray){
    let object = {};
    object.totalmonthlyexpense = document.getElementById("totalMonthlyExpense").innerText;
    object.totalsellprice = document.getElementById("totalSellPrice").innerText;
    object.totalbaseprice= document.getElementById("totalBasePrice").innerText;
    emptyArray.push(object);
    return emptyArray;
}

function generateSummaryTable(summaryArray){
    summaryArray.forEach(el =>{
        let tableDiv = document.getElementById("tableDiv");
        let ExpenseHeading = createElements(tableDiv, "h5", null, null, "Summary Chart", null, null);

        

        let sellExpenseDiv = createElements(tableDiv, "div", "col-12 py-2 justify-content", null, null, null, null);
        let mainContainer = createElements(sellExpenseDiv, "div", "row justify-content-around", null, null, null, null);
        
        let sellDiv = createElements(mainContainer, "div", "col-5 py-2 d-flex justify-content-around form-inline", null, null, null, null);
        let sellLabel = createElements(sellDiv, "label", "form-label", null, "Total Sell :", null, null);
        let sellSpan = createElements(sellDiv, "span", "form-control inputItem", "totalSellSpan", el.totalsellprice, null, null); 
       
        let expenseDiv = createElements(mainContainer, "div", "col-5 py-2 d-flex justify-content-around form-inline", null, null, null, null);
        let expenseContainer = createElements(expenseDiv, "div", "row justify-content-around", null, null, null, null);
        let expenseMonthlyDiv = createElements(expenseContainer, "div", "col-12 py-2 d-flex justify-content-around form-inline", null, null, null, null);
        let expenseMonthlyLabel = createElements(expenseMonthlyDiv, "label", "form-label", null, "Fixed Expense :", null, null);
        let expenseMonthlySpan = createElements(expenseMonthlyDiv, "span", "form-control inputItem", "monthlyExpenseSpan", el.totalmonthlyexpense, null, null); 
        let expenseBaseDiv = createElements(expenseContainer, "div", "col-12 py-2 d-flex justify-content-around form-inline", null, null, null, null);
        let expenseBaseLabel = createElements(expenseBaseDiv, "label", "form-label", null, "Base Cost Expense :", null, null);
        let expenseBaseSpan = createElements(expenseBaseDiv, "span", "form-control inputItem", "totalBaseSpan", el.totalbaseprice, null, null);          
        // let profitLossDiv = createElements(tableDiv, "div", "row justify-content-center py-3", null, null, null, null);
        let summaryDiv = createElements(tableDiv, "div", "col-12 py-2 d-flex justify-content-around align-item-right form-inline", "sellContainer", null, null, null);
        let summaryLabel = createElements(summaryDiv, "label", "form-label", null, "Total Sell :", null, null);     
        let amountSummary = profitLossCalculation(el.totalsellprice,el.totalmonthlyexpense,el.totalbaseprice);   
        let summarySpan = createElements(summaryDiv, "span", "form-control inputItem", "foodItemTextSpan", amountSummary, null, null);
        resultOutput(amountSummary,tableDiv);
    });
}

function profitLossCalculation(sellAmount,monthlyExpense,basePrice){
    let totalAmount = Number(sellAmount)-(Number(monthlyExpense)+Number(basePrice));
    return totalAmount;
}

function resultOutput(amount,div){
    if(amount>0){
        let resultDiv = createElements(div, "div", "col-12 py-2 d-flex justify-content-around align-item-right", "sellContainer", null, null, null);    
        let resultSpan = createElements(resultDiv, "span", "greenText", "foodItemTextSpan", "You have a profilt of Rs "+ amount + " do you want to add this amount in Recovery", null, null);
        let recoveryContainer = createElements(div, "div", "col-2 py-2 pt-4 form-inline d-flex justify-content-around", "btnEditContainer", null, null, null);
        let recoveryBtn = createElements(recoveryContainer, "button", "btn btn-outline-dark d-flex justify-content-center mx-auto", "recoveryBtn", "Recovery", null, null);
        recoveryBtn.addEventListener("click",function(){
            addRecoveryDetail(amount);
        });
    }
}

function addRecoveryDetail(amount){
    let investmentExpenseDetail = JSON.parse(localStorage.getItem("investmentExpenseDetail"));
    let array =[];
    investmentExpenseDetail.forEach(e =>{
        e.recoveryamount = amount;
        e.modifieddate = new Date(); 
        array.push(e);  
        console.log(e);   
    });
    localStorage.setItem("investmentExpenseDetail", JSON.stringify(array));  
}