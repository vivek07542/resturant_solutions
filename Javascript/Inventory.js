// Window On Load
window.addEventListener("load", function () {
    userLocalStorageSetUp();
    let createMode = true;
    let ingridientRowDiv = document.getElementById("ingridientRowDiv");
    createIngridientRow(createMode, ingridientRowDiv, null, null, null, null);
});
// User local Storage
function userLocalStorageSetUp() {
    let inventoryItemDetail = localStorage.getItem("inventoryItemDetail");
    let inventoryDetail = localStorage.getItem("inventoryDetail");
    if (inventoryItemDetail === null) {
        let reciepeDetailsArray = [];
        localStorage.setItem("inventoryItemDetail", JSON.stringify(reciepeDetailsArray));
    }
    else {
        tableCall();
    }
    if (inventoryDetail === null) {
        let menuDetail = [];
        localStorage.setItem("inventoryDetail", JSON.stringify(menuDetail));
    }
}
// Create Function
function createIngridientRow(condition, ingridientRowDiv, ingridientName,vendorName ,qty, unit, price, Id, menuId) {
    let mode = condition;
    let eachIngridientRow = createElements(ingridientRowDiv, "div", "row text-center d-flex justify-content-around", null, null, null, null);
    // Upper Row
    let upperIngridientRow = createElements(eachIngridientRow, "div", "col-12 text-center d-flex justify-content-around", null, null, null, null);
    let eachInputDiv = createElements(upperIngridientRow, "div", "col-sm-6 col-md-3 py-2 auto", null, null, null, null);
    let inputLabel = createElements(eachInputDiv,"label","form-label", null, "Ingridient Name :", null, null);
    let eachInputVendorDiv = createElements(upperIngridientRow, "div", "col-sm-6 col-md-3 py-2 auto", null, null, null, null);
    let inputVendorLabel = createElements(eachInputVendorDiv, "label", "form-label", null, "Vendor Name :", null, null);
    let eachDiv = createElements(upperIngridientRow, "div", "col-sm-0 col-md-6 py-2 auto", null, null, null, null);
    // Lower Row
    let lowerIngridientRow = createElements(eachIngridientRow, "div", "col-12 text-center d-flex justify-content-around", null, null, null, null);
    let eachQtyDiv = createElements(lowerIngridientRow, "div", "col-sm-6 col-md-2 py-1 form-inline d-flex justify-content-around", null, null, null, null);
    let qtyLabel = createElements(eachQtyDiv, "label", "form-label", null, "Qty.:", null, null);
    let eachUnitDiv = createElements(lowerIngridientRow, "div", "col-sm-6 col-md-2 py-1 form-inline d-flex justify-content-around", null, null, null, null);
    let unitLabel = createElements(eachUnitDiv, "label", "form-label", null, "Unit:", null, null);
    let eachPriceDiv = createElements(lowerIngridientRow, "div", "col-sm-6 col-md-3 py-2 form-inline d-flex justify-content-around", null, null, null, null);
    let priceLabel = createElements(eachPriceDiv, "label", "form-label", null, "Price:", null, null);
    if (mode) {
        let inputIngridient = createElements(eachInputDiv,"input","form-control inputForm","ingridientSelect", null, null, null);
        setAttributeToSelect(inputIngridient, null, null);
        inputIngridient.setAttribute("data-isspecial-type","text");
        let eachInputAppendDiv = createElements(eachInputDiv, "div", "row", "appendValue", null, null, null);        
        createIngridientSelect(eachInputAppendDiv, inputIngridient);

        let inputVendorIngridient = createElements(eachInputVendorDiv,"input","form-control inputForm","vendorName", null, null, null);
        setAttributeToSelect(inputVendorIngridient, null, null);
        inputVendorIngridient.setAttribute("data-isspecial-type","vendorName");
        inputVendorIngridient.setAttribute("placeholder","Vendor Name");
        let eachInputVendorAppendDiv = createElements(eachInputVendorDiv, "div", "row", "vendorValue", null, null, null);      
        createVendorSelect(eachInputVendorAppendDiv, inputVendorIngridient);

        // select Function For Input Vendor
        let qtySelectP = createElements(eachQtyDiv, "select", "inputForm custom-select qtySelect", "qtySelect", null, null, null);
        let qtyOption = createElements(qtySelectP, "option", null, null, "Sel.Qty", "", null);
        qtyOption.setAttribute("selected", "selected");
        setAttributeToSelect(null, qtySelectP, null);
        qtySelect(qtySelectP);
        let unitSelectP = createElements(eachUnitDiv, "select", "inputForm custom-select unitSelect", "unitSelect", null, null, null);
        let unitOption = createElements(unitSelectP, "option", null, null, "Sel. Unit", "", null);
        unitOption.setAttribute("selected", "selected");
        setAttributeToSelect(null, unitSelectP, null);
        unitSelect(unitSelectP);
        unitSelectP.addEventListener("change", function () {
            let parentValue = ingridientPriceCalculation(inputIngridient, qtySelectP, unitSelectP);
            sumUpPrice(parentValue, priceInput);
            priceInput.value = parentValue;
        });
        let priceInput = createElements(eachPriceDiv, "input", "form-control inputForm ingridientPriceInput", "ingridientPriceInput", null, null, null);
        priceInput.setAttribute("placeholder", "Price");
        setAttributeToSelect(null, null, priceInput);
    }
    else if (!mode) {
        eachIngridientRow.setAttribute("data-elemid", Id);
        eachIngridientRow.setAttribute("data-menuid", menuId);

        let inputIngridient = createElements(eachInputDiv,"input","form-control inputForm","ingridientSelect", null, ingridientName, null);
        setAttributeToSelect(inputIngridient, null, null);
        inputIngridient.setAttribute("data-isspecial-type","text");
        let eachInputAppendDiv = createElements(eachInputDiv, "div", "row", "appendValue", null, null, null);        
        createIngridientSelect(eachInputAppendDiv, inputIngridient);

        let inputVendorIngridient = createElements(eachInputVendorDiv,"input","form-control inputForm","vendorName", null, vendorName, null);
        setAttributeToSelect(inputVendorIngridient, null, null);
        inputVendorIngridient.setAttribute("data-isspecial-type","vendorName");
        inputVendorIngridient.setAttribute("placeholder","Vendor Name");
        let eachInputVendorAppendDiv = createElements(eachInputVendorDiv, "div", "row", "vendorValue", null, null, null);      
        createVendorSelect(eachInputVendorAppendDiv, inputVendorIngridient);

        let qtySelectP = createElements(eachQtyDiv, "select", "inputForm custom-select qtySelect", "qtySelect", null, qty, null);
        let qtyOption = createElements(qtySelectP, "option", null, null, "Sel.Qty", "", null);
        setAttributeToSelect(null, qtySelectP, null);
        let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
        qtyDetail.forEach(elem => {
            let qtyOption = createElements(qtySelectP, "option", "qtyOption", null, elem.quantity, elem.Id, null)
            if (elem.Id == qty) {
                qtyOption.setAttribute("selected", "selected");
            }
        });

        let unitSelectP = createElements(eachUnitDiv, "select", "inputForm custom-select unitSelect", "unitSelect", null, unit, null);
        let unitOption = createElements(unitSelectP, "option", null, null, "Sel. Unit", "", null);
        setAttributeToSelect(null, unitSelectP, null);
        let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
        unitDetail.forEach(elem => {
            let unitOption = createElements(unitSelectP, "option", "unitOption", null, elem.unit, elem.Id, null)
            if (elem.Id == unit) {
                unitOption.setAttribute("selected", "selected");
            }
        });
        unitSelectP.addEventListener("change", function () {
            let parentValue = ingridientPriceCalculation(inputIngridient, qtySelectP, unitSelectP);
            sumUpPrice(parentValue, priceInput);
            priceInput.value = parentValue;
        });
        let priceInput = createElements(eachPriceDiv, "input", "form-control inputForm ingridientPriceInput", "ingridientPriceInput", null, null, null);
        priceInput.setAttribute("placeholder", "Price");
        setAttributeToSelect(null, null, priceInput);
        let parentValue = ingridientPriceCalculation(inputIngridient, qtySelectP, unitSelectP);
        sumUpPrice(parentValue, priceInput);
        priceInput.value = parentValue;
        // Function for Price to calculate and append to Price Amount
    }
    let subDeleteDiv = createElements(lowerIngridientRow, "div", "col-sm-3 col-md-1 py-2 pt-4 form-inline d-flex justify-content-around", null, null, null, null);
    let subDeleteBtn = createElements(subDeleteDiv, "input", "btn btn-outline-dark d-flex justify-content-center mx-auto delIngridientBtn", null, null, "-", null);
    subDeleteBtn.setAttribute("type", "button");
    subDeleteBtn.addEventListener("click", function (){
        subRowDeleteBtn(subDeleteBtn);
    })
    let addRowDiv = createElements(lowerIngridientRow, "div", "col-sm-3 col-md-1 py-2 pt-4 form-inline d-flex justify-content-around", null, null, null, null);
    let addRowBtn = createElements(addRowDiv, "input", "btn btn-outline-dark d-flex justify-content-center mx-auto addIngridientBtn", null, null, " + ", null);
    addRowBtn.setAttribute("type", "button");
    addRowBtn.addEventListener("click", function () {
        let createMode = true;
        let ingridientRowDiv = document.getElementById("ingridientRowDiv");
        createIngridientRow(createMode, ingridientRowDiv, null, null, null, null);
    });
}

// Set Attribute Function
function setAttributeToSelect(textInput, input, number) {
    if (textInput !== null) {
        textInput.setAttribute("data-isrequired", "true");
        textInput.setAttribute("data-isspecial", "false");

        textInput.setAttribute("type", "text");
        textInput.setAttribute("placeholder","Ingridient Name");
    }
    if (input !== null) {
        input.setAttribute("data-isrequired", "false");
        input.setAttribute("data-isspecial", "true");
        input.setAttribute("data-isspecial-type", "select");
        input.setAttribute("type", "select");
    }
    if (number !== null) {
        number.setAttribute("step", "0.01");
        number.setAttribute("data-isrequired", "true");
        number.setAttribute("data-isspecial", "false");
        number.setAttribute("data-isspecial-type", "number");
        number.setAttribute("type", "number");
    }
}
// Create Ingridient Select Function
function createIngridientSelect(div, input){
    let ingridientDetail = JSON.parse(localStorage.getItem("ingridientDetail"));
    input.addEventListener("keyup", function(){
        autoComplete(input, ingridientDetail, div);
    });
}
// Create Vendor Select Function
function createVendorSelect(div, input) {
    let vendorDetail = JSON.parse(localStorage.getItem("vendorDetail"));
    input.addEventListener("keyup", function(){
        autoCompleteVendor(input, vendorDetail, div);
    });
}
// Click Event Function
function clickEventForLi(li, input, div) {
    input.value = li.innerText;
    div.style.display = "none";
}
// Delete Function
function subRowDeleteBtn(subDeleteBtn) {
    if (confirm("Do you want to Delete this Ingridient?")) {
        let parentTr = subDeleteBtn.parentNode.parentNode;
        parentTr.parentNode.removeChild(parentTr);
        let parentChildren = parentTr.querySelectorAll(".inputForm");
        parentChildren.forEach(el => {
            if (el.type == "number") {
                subractPrice(el);
            }
        });
    }
}
// Function Ingridient Price Calculation
function ingridientPriceCalculation(inputIngridient, qtySelect, unitSelect) {
    let reciepeRequiredPrice;
    let ingridientDetail = JSON.parse(localStorage.getItem("ingridientDetail"));
    ingridientDetail.forEach(element => {
        if (element.ingridientname == inputIngridient.value) {
            let ingridientQty = getQtyIdToValue(element.qtyId)
            let ingridientPrice = Number(element.price);
            let ingridientUnit = getUnitIdToValue(element.unitId);
            let reciepeRequiredQty = getQtyIdToValue(qtySelect.value);
            let reciepeRequiredUnit = getUnitIdToValue(unitSelect.value);
            if (ingridientUnit === reciepeRequiredUnit) {
                reciepeRequiredPrice = Math.ceil(ingridientPrice / ingridientQty) * reciepeRequiredQty;
            }
            else {
                if (reciepeRequiredUnit == "gram" || reciepeRequiredUnit == "ml") {
                    reciepeRequiredPrice = Math.ceil(ingridientPrice / ingridientQty) * reciepeRequiredQty / 1000;
                }
                else if (reciepeRequiredUnit == "kg" || reciepeRequiredUnit == "litre") {
                    reciepeRequiredPrice = Math.ceil(ingridientPrice / ingridientQty) * reciepeRequiredQty * 1000;
                }
            }
        }
    });
    return reciepeRequiredPrice;
}
// Sum Price Function
function sumUpPrice(calValue, inputPrice) {
    let totalPriceInput = document.getElementById("totalPriceInput")
    let oldTotal = Number(totalPriceInput.value);
    if (inputPrice !== null) {
        let ingridientInputValue = Number(inputPrice.value);
        totalPriceInput.value = calValue + oldTotal - ingridientInputValue;
    }
    else {
        totalPriceInput.value = calValue + oldTotal;
    }
}
// Subract Price Function
function subractPrice(inputPrice) {
    let totalPriceInput = document.getElementById("totalPriceInput");
    let oldTotal = Number(totalPriceInput.value);
    let ingridientInputValue = Number(inputPrice.value);
    totalPriceInput.value = oldTotal - ingridientInputValue;
}

// Submit Click Event
let submitBtnIngridient = document.getElementById("submitBtn")
submitBtnIngridient.addEventListener("click", function () {
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        let inventoryItemDetail = JSON.parse(localStorage.getItem("inventoryItemDetail"));
        let inventoryDetail = JSON.parse(localStorage.getItem("inventoryDetail"));
        let textLabel = document.getElementById("textLabel");
        let menuIngridientId = textLabel.getAttribute("data-menuid") === null ? 0 : textLabel.getAttribute("data-menuid");
        let inventoryId = detailToLocalStorageMenuId(menuIngridientId, inventoryDetail, inputForm);
        if (textLabel.getAttribute("data-menuid") !== null) {
            textLabel.removeAttribute("data-menuid");
        }
        let ingridientRowDiv = document.getElementById("ingridientRowDiv");
        let eachRowDiv = ingridientRowDiv.children;
        for (let i = 0; i < eachRowDiv.length; i++) {
            let element = eachRowDiv[i];
            detailToLocalStorageIngridient(inputForm, inventoryItemDetail, inventoryDetail, element, inventoryId)
        }
        resetInputForm(inputForm);
        tableCall();
    }
});
// Function To Store Detail To menu reciepe Detail
function detailToLocalStorageMenuId(menuIngridientId, inventoryDetail, input) {
    let isEditMode = menuIngridientId > 0 ? true : false;
    let maxIdForMenu = 0;
    if (!isEditMode) {
        let objectReciepe = {};
        maxIdForMenu = sort(inventoryDetail);
        let maxmenuId = maxIdForMenu + 1;
        objectReciepe.Id = maxIdForMenu + 1;
        input.forEach(element => {
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "dateFrom":
                    objectReciepe.datefrom = element.value;
                    break;
                case "dateTo":
                    objectReciepe.dateto = element.value;
                    break;
                case "totalPrice":
                        objectReciepe.totalprice = element.value;
                    break;
            }
        });
        inventoryDetail.push(objectReciepe);
        localStorage.setItem("inventoryDetail", JSON.stringify(inventoryDetail));
        return maxmenuId;
    }
    else {
        let objMenuIndex = inventoryDetail.findIndex((obj => obj.Id == menuIngridientId));
        input.forEach(element => {
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "dateFrom":
                    inventoryDetail[objMenuIndex].datefrom = element.value;
                    break;
                case "dateTo":
                    inventoryDetail[objMenuIndex].dateto = element.value;
                    break;
                case "totalPrice":
                        inventoryDetail[objMenuIndex].totalprice = element.value;
                    break;
            }
        });
        localStorage.setItem("inventoryDetail", JSON.stringify(inventoryDetail));
        return Number(menuIngridientId);
    }
}
// Function To Store Ingridient In Local Storage
function detailToLocalStorageIngridient(inputForm, inventoryItemDetail, inventoryDetail, element, vendorId) {
    let ingridientId = element.getAttribute("data-elemid") === null ? 0 : element.getAttribute("data-elemid");
    let isEditMode = ingridientId > 0 ? true : false;
    let maxIdForReciepe = 0;
    if (!isEditMode) {
        let objectIngridient = {};
        maxIdForReciepe = sort(inventoryItemDetail);
        objectIngridient.Id = maxIdForReciepe + 1;
        let inputForm = element.querySelectorAll(".inputForm");
        inputForm.forEach(e => {
            debugger;
            let selectType = e.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "text":
                        let ingridientId = getIngridientValueToId(e.value);
                        objectIngridient.ingridientId = ingridientId;
                    break
                case "vendorName":
                        let vendorId = createVendorValueToId(e.value);
                        objectIngridient.vendorId = vendorId;
                    break;
                case "select":
                    if (e.id === "qtySelect") {
                        objectIngridient.qtyId = e.value;
                    }
                    else if (e.id === "unitSelect") {
                        objectIngridient.unitId = e.value;
                    }
                    break;
                case "number":
                    objectIngridient.ingridientcost = e.value;
                    break;
            }
        });
        objectIngridient.inventoryId = vendorId;
        inventoryItemDetail.push(objectIngridient);
    }
    else {
        let objIngridientIndex = inventoryItemDetail.findIndex((obj => obj.Id == ingridientId));
        let inputForm = element.querySelectorAll(".inputForm");
        inputForm.forEach(e => {
            let selectType = e.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "text":
                        let ingridientId = getIngridientValueToId(e.value);
                        inventoryItemDetail[objIngridientIndex].ingridientId = ingridientId;
                    break
                case "vendorName":
                        let vendorId = createVendorValueToId(e.value);
                        inventoryItemDetail[objIngridientIndex].vendorId = vendorId;
                    
                    break;
                case "select":
                    if (e.id === "qtySelect") {
                        inventoryItemDetail[objIngridientIndex].qtyId = e.value;
                    }
                    else if (e.id === "unitSelect") {
                        inventoryItemDetail[objIngridientIndex].unitId = e.value;
                    }
                    break;
                case "number":
                    inventoryItemDetail[objIngridientIndex].ingridientcost = e.value;
                    break;
            }
        });
    }
    localStorage.setItem("inventoryItemDetail", JSON.stringify(inventoryItemDetail));
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
    document.getElementById("ingridientRowDiv").innerHTML = "";
    let createMode = true;
    let ingridientRowDiv = document.getElementById("ingridientRowDiv");
    createIngridientRow(createMode, ingridientRowDiv);
}
// Table Function
function tableCall() {
    let foodItemDiv = document.getElementById("foodItemDiv");
    let inventoryDetail = JSON.parse(localStorage.getItem("inventoryDetail"));
    inventoryDetail.forEach(el => {
        // Main Div 
        let mainContainer = createElements(foodItemDiv, "div", "row justify-content-center py-3", null, null, null, null);
        // Edit Button
        let btnControlContainer = createElements(mainContainer, "div", "col-12 py-2 d-flex justify-content-end", "btnControl", null, null, null);
        let btnEditContainer = createElements(btnControlContainer, "div", "col-2 py-2 pt-4 form-inline d-flex justify-content-around", "btnEditContainer", null, null, null);
        let btnEdit = createElements(btnEditContainer, "button", "btn btn-outline-dark d-flex justify-content-center mx-auto btnEdit", "btnEdit", "Edit", null, null);
        // Edit Function Will Come here.
        btnEdit.addEventListener("click", function () {
            editBtnClick(btnEdit);
        });
        // DeleteBtn
        let btnDeleteContainer = createElements(btnControlContainer, "div", "col-2 py-2 pt-4 form-inline d-flex justify-content-around", "btnEditContainer", null, null, null);
        let btnDelete = createElements(btnDeleteContainer, "button", "btn btn-outline-dark d-flex justify-content-center mx-auto", "btnDelete", "Delete", null, null);
        // Delete Function Will Come here.
        btnDelete.addEventListener("click", function () {
            deleteUser(btnDelete);
        });
        // Container For Name 
        let menuContainer = createElements(mainContainer, "div", "col-12 py-2 d-flex justify-content-around align-items-center", "menuContainer", null, null, null);
        let menuFoodContainer = createElements(menuContainer, "div", "col-12 py-2 form-inline d-flex justify-content-around", "menuFoodContainer", null, null, null);
        let dateFromLabel = createElements(menuFoodContainer, "label", "form-label", null, "Date From :", null, null);
        let dateFromSpan = createElements(menuFoodContainer, "span", "form-control inputItem", "foodItemTextSpan", el.datefrom, null, null);
        let dateToLabel = createElements(menuFoodContainer, "label", "form-label", null, "Date To :", null, null);
        let dateToSpan = createElements(menuFoodContainer, "span", "form-control inputItem", "reciepeTextSpan", el.dateto, null, null);
        let tableDiv = createElements(mainContainer, "div", "tblDiv", "tblDataDiv", null, null, null);
        let table = createElements(tableDiv, "table", "table table-striped text-center", "tblData", null, null, null);
        // Table Create
        let headers = ["Id", "Ingridient Name","Vendor Name", "Quantity", "Unit", "Price", "InventoryId"];
        let tableHead = createElements(table, "thead", null, null, null, null, null);
        let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
        headers.forEach(headerText => {
            let header = createElements(headerRow, "th", null, null, null, null, "col");
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
        });
        let tableBody = createElements(table, "tbody", null, null, null, null, null);
        let inventoryItemDetail = JSON.parse(localStorage.getItem("inventoryItemDetail"));
        if (inventoryItemDetail !== null) {
            inventoryItemDetail.forEach(per => {
                if (per.inventoryId == el.Id) {
                    let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
                    let cellId = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodeId = document.createTextNode(per.Id);
                    cellId.appendChild(textNodeId);
                    let cellname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let ingridientValue =  getIngridientIdToValue(per.ingridientId);
                    let textNodename = document.createTextNode(ingridientValue);
                    cellname.appendChild(textNodename);
                    let cellVendorname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let vendorValue =  getIngridientIdToValue(per.vendorId);
                    let textVendorNodename = document.createTextNode(vendorValue);
                    cellVendorname.appendChild(textVendorNodename);
                    let cellQty = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let quantity = getQtyIdToValue(per.qtyId);
                    let textNodeQty = document.createTextNode(quantity);
                    cellQty.appendChild(textNodeQty);
                    let cellUnit = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let unitValue = getUnitIdToValue(per.unitId)
                    let textNodeUnit = document.createTextNode(unitValue);
                    cellUnit.appendChild(textNodeUnit);
                    let cellPrice = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodePrice = document.createTextNode(per.ingridientcost);
                    cellPrice.appendChild(textNodePrice);
                    let cellInventoryId = createElements(row, "td", "tableEachCell", null, null, null, "col");
                    let textNodeMenuId = document.createTextNode(per.inventoryId);
                    cellInventoryId.appendChild(textNodeMenuId);
                }
            });
            let priceContainer = createElements(mainContainer, "div", "col-12 py-2 d-flex justify-content-end align-items-end", null, null, null, null);
            let eachPriceDiv = createElements(priceContainer, "div", "col-sm-8 col-md-3 py-2 mr-5 form-inline d-flex justify-content-around", null, null, null, null);
            let priceLabel = createElements(eachPriceDiv, "label", "form-label", null, "Total Price:", null, null);
            let priceInput = createElements(eachPriceDiv, "span", "form-control totalPrice", "totalPrice", el.totalprice, null, null);
        }
    });
}
// Edit Button Click Event
function editBtnClick(btnEdit) {
    let input = document.querySelectorAll(".inputForm");
    let parentTr = btnEdit.parentNode.parentNode.parentNode;
    let spanParentChildren = parentTr.querySelectorAll(".inputItem");
    debugger;
    console.log(spanParentChildren);
    console.log(parentTr);
    input.forEach(el => {
        let selectType = el.getAttribute("data-isspecial-type");
        switch (selectType) {
            case "dateFrom":
                el.value = spanParentChildren[0].innerText;
                break;
            case "dateTo":
                el.value = spanParentChildren[1].innerText;
                break;
        }
    });
    let inventoryItemDetail = JSON.parse(localStorage.getItem("inventoryItemDetail"));
    let ingridientRowDiv = document.getElementById("ingridientRowDiv");
    let tableParentRow = parentTr.querySelectorAll(".tableEachRow");
    ingridientRowDiv.innerHTML = "";
    inventoryItemDetail.forEach(e => {
        for (i = 0; i < tableParentRow.length; i++) {
            if (e.Id == tableParentRow[i].firstElementChild.innerHTML) {
                let Id = e.Id;
                let ingridientName = getIngridientIdToValue(e.ingridientId);
                let vendorName = createVendorIdToValue(e.vendorId);
                let qty = e.qtyId;
                let unit = e.unitId;
                let menuId = e.inventoryId;
                let price = e.ingridientcost;
                let createMode = false;
                let ingridientRowDiv = document.getElementById("ingridientRowDiv");
                let textLabel = document.getElementById("textLabel");
                textLabel.setAttribute("data-menuid",e.inventoryId);
                createIngridientRow(createMode, ingridientRowDiv, ingridientName, vendorName,qty, unit, price, Id, menuId);
            }
        }
    });
}
// Delete User Click Event
function deleteUser(deleteBtn) {
    if (confirm("Do you want to Delete this From List?")) {
        let parentTr = deleteBtn.parentNode.parentNode.parentNode;
        if (parentTr !== null) {
            let ingridientId;
            let tableParentChildren = parentTr.querySelectorAll(".tableEachCell");
            let tableParentRow = parentTr.querySelectorAll(".tableEachRow");
            let menuId = tableParentChildren[5].innerText;
            parentTr.parentNode.removeChild(parentTr);
            for (i = 0; i < tableParentRow.length; i++) {
                ingridientId = tableParentRow[i].firstElementChild.innerText;
                let inventoryItemDetail = JSON.parse(localStorage.getItem("inventoryItemDetail"));
                let objIngridientIndex = inventoryItemDetail.findIndex((obj) => obj.Id == ingridientId);
                inventoryItemDetail.splice(objIngridientIndex, 1);
                localStorage.setItem('inventoryItemDetail', JSON.stringify(inventoryItemDetail));
            }
            let inventoryDetail = JSON.parse(localStorage.getItem("inventoryDetail"))
            let objmenuIndex = inventoryDetail.findIndex((obj) => obj.Id == menuId);
            inventoryDetail.splice(objmenuIndex, 1);
            localStorage.setItem('inventoryDetail', JSON.stringify(inventoryDetail));
            document.getElementById("foodItemDiv").innerHTML = "";
            tableCall();
        }
    }
}