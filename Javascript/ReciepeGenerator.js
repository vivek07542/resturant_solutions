window.addEventListener("load", function () {
    createFoodItemSelector();
});

function createFoodItemSelector() {
    let foodText = document.getElementById("foodText");
    let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    let appendValue = document.getElementById("appendValue");
    foodText.addEventListener("keyup", function () {
        autoCompleteFoodItem(foodText, menuReciepeDetail, appendValue);
    });
}

let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function () {
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        let objectOfValue = inputValueAndSelect(inputForm);
        debugger;
        document.getElementById("survingFoodDiv").innerHTML = "";
        tableAsPerSurving(objectOfValue);
    }
});

function inputValueAndSelect(input) {
    let object = {};
    input.forEach(el => {
        debugger;
        let selectType = el.getAttribute("data-isspecial-type");
        switch (selectType) {
            case "foodname":
                object.fooditem = el.value;
                break;
            case "serving":
                object.serving = el.value;
                break;
        }
    });
    return object;
}
// Click Event on Li 
function clickEventForLi(li, input, div) {
    input.value = li.innerText;
    div.style.display = "none";
    document.getElementById("foodItemDiv").innerHTML = "";
    // tableCall(input);
}

function tableCall(input) {
    let foodItemDiv = document.getElementById("foodItemDiv");
    let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    menuReciepeDetail.forEach(el => {
        if (input.value === el.fooditem) {
            // Main Div 
            let mainContainer = createElements(foodItemDiv, "div", "row justify-content-center py-3", null, null, null, null);
            // Container For Name 
            let menuContainer = createElements(mainContainer, "div", "col-12 py-2 d-flex justify-content-around align-items-center", "menuContainer", null, null, null);
            let menuFoodContainer = createElements(menuContainer, "div", "col-4 py-2", "menuFoodContainer", null, null, null);
            let foodItemLabel = createElements(menuFoodContainer, "label", "form-label", null, "Food Item Name :", null, null);
            let foodItemSpan = createElements(menuFoodContainer, "span", "form-control inputItem", "foodItemTextSpan", el.fooditem, null, null);
            let foodServingLabel = createElements(menuFoodContainer, "label", "form-label", null, "Serving For :", null, null);
            let foodServingSpan = createElements(menuFoodContainer, "span", "form-control inputItem", "reciepeTextSpan", el.serving, null, null);
            // Container For Reciepe
            let menuReciepeContainer = createElements(menuContainer, "div", "recipeDiv py-2 col-7 form-inline", "menuReciepeContainer", null, null, null);
            let foodReciepeLabel = createElements(menuReciepeContainer, "label", "form-label", null, "Food Reciepe :", null, null);
            let foodReciepeSpan = createElements(menuReciepeContainer, "span", "form-control inputItem", "reciepeTextSpan", el.reciepedescription, null, null);
            let tableDiv = createElements(mainContainer, "div", "tblDiv", "tblDataDiv", null, null, null);
            let table = createElements(tableDiv, "table", "table table-striped text-center", "tblData", null, null, null);
            // Table Create
            let headers = ["Id", "Ingridient Name", "Quantity", "Unit", "Price", "MenuId"];
            let tableHead = createElements(table, "thead", null, null, null, null, null);
            let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
            headers.forEach(headerText => {
                let header = createElements(headerRow, "th", null, null, null, null, "col");
                let textNode = document.createTextNode(headerText);
                header.appendChild(textNode);
            });
            let tableBody = createElements(table, "tbody", null, null, null, null, null);
            let ingridientReciepe = JSON.parse(localStorage.getItem("ingridientReciepe"));
            if (ingridientReciepe !== null) {
                ingridientReciepe.forEach(per => {
                    if (per.menuId == el.Id) {
                        let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
                        let cellId = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                        let textNodeId = document.createTextNode(per.Id);
                        cellId.appendChild(textNodeId);
                        let cellname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                        let ingridientName = getIngridientIdToValue(per.ingridientId);
                        let textNodename = document.createTextNode(ingridientName);
                        cellname.appendChild(textNodename);
                        let cellQty = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                        let quantity = getQtyIdToValue(per.qtyId);
                        let textNodeQty = document.createTextNode(quantity);
                        cellQty.appendChild(textNodeQty);
                        let cellUnit = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                        let unit = getUnitIdToValue(per.unitId);
                        let textNodeUnit = document.createTextNode(unit);
                        cellUnit.appendChild(textNodeUnit);
                        let cellPrice = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                        let textNodePrice = document.createTextNode(per.ingridientcost);
                        cellPrice.appendChild(textNodePrice);
                        let cellMenuId = createElements(row, "td", "tableEachCell", null, null, null, "col");
                        let textNodeMenuId = document.createTextNode(per.menuId);
                        cellMenuId.appendChild(textNodeMenuId);
                    }
                });
            }
            let priceContainer = createElements(mainContainer, "div", "col-12 py-2 d-flex justify-content-end align-items-end", null, null, null, null);
            let eachPriceDiv = createElements(priceContainer, "div", "col-sm-8 col-md-3 py-2 mr-5 form-inline d-flex justify-content-around", null, null, null, null);
            let priceLabel = createElements(eachPriceDiv, "label", "form-label", null, "Total Price:", null, null);
            let priceInput = createElements(eachPriceDiv, "span", "form-control totalPrice", "totalPrice", el.basecost, null, null);
        }
    });
}

function tableAsPerSurving(objectOfValue) {
    debugger;
    let array = [];
    let survingFoodDiv = document.getElementById("survingFoodDiv");
    let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    menuReciepeDetail.forEach(e => {
        debugger;
        if (e.fooditem == objectOfValue.fooditem) {
            let menuContainer = createElements(survingFoodDiv, "div", "col-12 py-2 d-flex justify-content-around align-items-center", "menuContainer", null, null, null);
            let menuFoodContainer = createElements(menuContainer, "div", "col-12 py-2 form-inline", "menuFoodContainer", null, null, null);
            let foodServingLabel = createElements(menuFoodContainer, "label", "form-label", null, "Serving For :", null, null);
            let foodServingSpan = createElements(menuFoodContainer, "span", "form-control inputItem", "reciepeTextSpan", objectOfValue.serving, null, null);
            let tableDiv = createElements(survingFoodDiv, "div", "tblDiv", "tblDataDiv", null, null, null);
            let table = createElements(tableDiv, "table", "table table-striped text-center", "tblData", null, null, null);
            let headers = ["Id", "Ingridient Name", "Quantity", "Unit", "Price", "MenuId"];
            let tableHead = createElements(table, "thead", null, null, null, null, null);
            let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
            headers.forEach(headerText => {
                let header = createElements(headerRow, "th", null, null, null, null, "col");
                let textNode = document.createTextNode(headerText);
                header.appendChild(textNode);
            });
            let tableBody = createElements(table, "tbody", null, null, null, null, null);
            let ingridientReciepe = JSON.parse(localStorage.getItem("ingridientReciepe"));
            if (ingridientReciepe !== null) {
                ingridientReciepe.forEach(per => {
                    if (per.menuId == e.Id) {
                        debugger;
                        let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
                        let cellId = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                        let textNodeId = document.createTextNode(per.Id);
                        cellId.appendChild(textNodeId);
                        let cellname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                        let ingridientName = getIngridientIdToValue(per.ingridientId);
                        let textNodename = document.createTextNode(ingridientName);
                        cellname.appendChild(textNodename);
                        let cellQty = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                        let quantity = getQtyIdToValue(per.qtyId);
                        let newQuantity = qtyCalculation(quantity, objectOfValue.serving, e.serving);
                        let textNodeQty = document.createTextNode(newQuantity);
                        cellQty.appendChild(textNodeQty);
                        let cellUnit = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                        let unit = getUnitIdToValue(per.unitId);
                        let textNodeUnit = document.createTextNode(unit);
                        cellUnit.appendChild(textNodeUnit);
                        let cellPrice = createElements(row, "td", "tableEachCell eachInputPrice", null, null, null, "col");
                        let newPrice = priceCalculation(newQuantity, per.ingridientcost, quantity);
                        array.push(newPrice);
                        let textNodePrice = document.createTextNode(newPrice);
                        cellPrice.appendChild(textNodePrice);
                        let cellMenuId = createElements(row, "td", "tableEachCell", null, null, null, "col");
                        let textNodeMenuId = document.createTextNode(per.menuId);
                        cellMenuId.appendChild(textNodeMenuId);
                    }                    
                });
                    let priceContainer = createElements(survingFoodDiv, "div", "col-12 py-2 d-flex justify-content-end align-items-end", null, null, null, null);
                    let eachPriceDiv = createElements(priceContainer, "div", "col-sm-8 col-md-3 py-2 mr-5 form-inline d-flex justify-content-around", null, null, null, null);
                    let priceLabel = createElements(eachPriceDiv, "label", "form-label", null, "Total Price:", null, null);
                    let priceValue = totalPrice(array);
                    let priceInput = createElements(eachPriceDiv, "span", "form-control totalPrice", "totalPrice", priceValue, null, null);
            }
        }
    });
};

function qtyCalculation(quantity, selectedServing, serving) {
    debugger;
    let newQuantity = Math.ceil(Number(quantity) / Number(serving)) * Number(selectedServing);
    return newQuantity;
}

function priceCalculation(newQuantity, ingridientcost, quantity) {
    debugger;
    let newPrice = Math.ceil((Number(ingridientcost) / Number(quantity)) * Number(newQuantity));
    return newPrice;
}

function totalPrice(array) {
    let priceValue = 0 ;
    for (let i = 0; i < array.length; i++) {
         priceValue += array[i];
    }
    return priceValue;
}