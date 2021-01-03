// Window On Load
window.addEventListener("load", function () {
    userLocalStorageSetUp();
    let createMode = true;
    let ingridientRowDiv = document.getElementById("ingridientRowDiv");
    createIngridientRow(createMode, ingridientRowDiv, null, null, null, null);
});
// User local Storage
function userLocalStorageSetUp() {
    let ingridientReciepe = localStorage.getItem("ingridientReciepe");
    let menuReciepeDetail = localStorage.getItem("menuReciepeDetail");
    if (ingridientReciepe === null) {
        let reciepeDetailsArray = [];
        localStorage.setItem("ingridientReciepe", JSON.stringify(reciepeDetailsArray));
    }
    else {
        tableCall();
    }
    if (menuReciepeDetail === null) {
        let menuDetail = [];
        localStorage.setItem("menuReciepeDetail", JSON.stringify(menuDetail));
    }
}
// Create Function
function createIngridientRow(condition, ingridientRowDiv, ingridientName, qty, unit, price, Id, menuId) {
    let mode = condition;
    let eachIngridientRow = createElements(ingridientRowDiv, "div", "row text-center d-flex justify-content-around", null, null, null, null);
    let eachInputDiv = createElements(eachIngridientRow, "div", "col-sm-6 col-md-3 py-2 auto", null, null, null, null);
    let inputLabel = createElements(eachInputDiv, "label", "form-label", null, "Ingridient Name :", null, null);
    let eachQtyDiv = createElements(eachIngridientRow, "div", "col-sm-3 col-md-2 py-1 form-inline d-flex justify-content-around", null, null, null, null);
    let qtyLabel = createElements(eachQtyDiv, "label", "form-label", null, "Qty.:", null, null);
    let eachUnitDiv = createElements(eachIngridientRow, "div", "col-sm-3 col-md-2 py-1 form-inline d-flex justify-content-around", null, null, null, null);
    let unitLabel = createElements(eachUnitDiv, "label", "form-label", null, "Unit:", null, null);
    let eachPriceDiv = createElements(eachIngridientRow, "div", "col-sm-6 col-md-3 py-2 form-inline d-flex justify-content-around", null, null, null, null);
    let priceLabel = createElements(eachPriceDiv, "label", "form-label", null, "Price:", null, null);
    if (mode) {
        let inputIngridient = createElements(eachInputDiv, "input", "form-control inputForm", "ingridientSelect", null, null, null);
        setAttributeToSelect(inputIngridient, null, null);
        let eachInputAppendDiv = createElements(eachInputDiv, "div", "row", "appendValue", null, null, null);
        createIngridientSelect(eachInputAppendDiv, inputIngridient);
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
        let inputIngridient = createElements(eachInputDiv, "input", "form-control inputForm", "ingridientSelect", null, ingridientName, null);
        setAttributeToSelect(inputIngridient, null, null);
        let eachInputAppendDiv = createElements(eachInputDiv, "div", "row", "appendValue", null, null, null);
        createIngridientSelect(eachInputAppendDiv, inputIngridient);
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
    let subDeleteDiv = createElements(eachIngridientRow, "div", "col-sm-2 col-md-1 py-2 pt-4 form-inline d-flex justify-content-around", null, null, null, null);
    let subDeleteBtn = createElements(subDeleteDiv, "input", "btn btn-outline-dark d-flex justify-content-center mx-auto delIngridientBtn", null, null, "-", null);
    subDeleteBtn.setAttribute("type", "button");
    subDeleteBtn.addEventListener("click", function () {
        subRowDeleteBtn(subDeleteBtn);
    })
    let addRowDiv = createElements(eachIngridientRow, "div", "col-sm-2 col-md-1 py-2 pt-4 form-inline d-flex justify-content-around", null, null, null, null);
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
        textInput.setAttribute("data-isspecial-type", "text");
        textInput.setAttribute("type", "text");
        textInput.setAttribute("placeholder", "Ingridient Name");
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
function createIngridientSelect(div, input) {
    let ingridientDetail = JSON.parse(localStorage.getItem("ingridientDetail"));
    input.addEventListener("keyup", function () {
        autoComplete(input, ingridientDetail, div);
    });
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
        let ingridientReciepe = JSON.parse(localStorage.getItem("ingridientReciepe"));
        let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
        let textLabel = document.getElementById("textLabel");
        let menuIngridientId = textLabel.getAttribute("data-menuid") === null ? 0 : textLabel.getAttribute("data-menuid");
        let menuId = detailToLocalStorageMenuId(menuIngridientId, menuReciepeDetail, inputForm);
        if (textLabel.getAttribute("data-menuid") !== null) {
            textLabel.removeAttribute("data-menuid");
        }
        let ingridientRowDiv = document.getElementById("ingridientRowDiv");
        let eachRowDiv = ingridientRowDiv.children;
        for (let i = 0; i < eachRowDiv.length; i++) {
            let element = eachRowDiv[i];
            detailToLocalStorageIngridient(inputForm, ingridientReciepe, menuReciepeDetail, element, menuId)
        }
        resetInputForm(inputForm);
        tableCall();
    }
});
// Function To Store Detail To menu reciepe Detail
function detailToLocalStorageMenuId(menuIngridientId, menuReciepeDetail, input) {
    let isEditMode = menuIngridientId > 0 ? true : false;
    let maxIdForMenu = 0;
    if (!isEditMode) {
        let objectReciepe = {};
        maxIdForMenu = sort(menuReciepeDetail);
        let maxmenuId = maxIdForMenu + 1;
        objectReciepe.Id = maxIdForMenu + 1;
        input.forEach(element => {
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "foodname":
                    objectReciepe.fooditem = element.value;
                    break;
                case "reciepe":
                    objectReciepe.reciepedescription = element.value;
                    break;
                case "number":
                    if (element.id === "totalPriceInput") {
                        objectReciepe.basecost = element.value;
                    }
                    break;
                case "serving":
                    objectReciepe.serving = element.value;
                    break;
            }
        });
        objectReciepe.sellprice = 0;
        menuReciepeDetail.push(objectReciepe);
        localStorage.setItem("menuReciepeDetail", JSON.stringify(menuReciepeDetail));
        return maxmenuId;
    }
    else {
        let objMenuIndex = menuReciepeDetail.findIndex((obj => obj.Id == menuIngridientId));
        input.forEach(element => {
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "foodname":
                    menuReciepeDetail[objMenuIndex].fooditem = element.value;
                    break;
                case "reciepe":
                    menuReciepeDetail[objMenuIndex].reciepedescription = element.value;
                    break;
                case "number":
                    if (element.id === "totalPriceInput") {
                        menuReciepeDetail[objMenuIndex].basecost = element.value;
                    }
                    break;
                case "serving":
                    menuReciepeDetail[objMenuIndex].serving = element.value;
                    break;
            }
        });
        menuReciepeDetail[objMenuIndex].sellprice = 0;
        localStorage.setItem("menuReciepeDetail", JSON.stringify(menuReciepeDetail));
        return Number(menuIngridientId);
    }
}
// Function To Store Ingridient In Local Storage
function detailToLocalStorageIngridient(inputForm, ingridientReciepe, menuReciepeDetail, element, menuId) {
    let ingridientId = element.getAttribute("data-elemid") === null ? 0 : element.getAttribute("data-elemid");
    let isEditMode = ingridientId > 0 ? true : false;
    let maxIdForReciepe = 0;
    if (!isEditMode) {
        let objectIngridient = {};
        maxIdForReciepe = sort(ingridientReciepe);
        objectIngridient.Id = maxIdForReciepe + 1;
        let inputForm = element.querySelectorAll(".inputForm");
        inputForm.forEach(e => {
            let selectType = e.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "text":
                    let ingridientId = getIngridientValueToId(e.value);
                    objectIngridient.ingridientId = ingridientId;
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
        objectIngridient.menuId = menuId;
        ingridientReciepe.push(objectIngridient);
    }
    else {
        let objIngridientIndex = ingridientReciepe.findIndex((obj => obj.Id == ingridientId));
        let inputForm = element.querySelectorAll(".inputForm");
        inputForm.forEach(e => {
            let selectType = e.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "text":
                    let ingridientId = getIngridientValueToId(e.value);
                    ingridientReciepe[objIngridientIndex].ingridientId = ingridientId;
                    break;
                case "select":
                    if (e.id === "qtySelect") {
                        ingridientReciepe[objIngridientIndex].qtyId = e.value;
                    }
                    else if (e.id === "unitSelect") {
                        ingridientReciepe[objIngridientIndex].unitId = e.value;
                    }
                    break;
                case "number":
                    ingridientReciepe[objIngridientIndex].ingridientcost = e.value;
                    break;
            }
        });
    }
    localStorage.setItem("ingridientReciepe", JSON.stringify(ingridientReciepe));
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
    let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    menuReciepeDetail.forEach(el => {
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
                    let ingridientDetail = JSON.parse(localStorage.getItem("ingridientDetail"));
                    ingridientDetail.forEach(ele => {
                        if (ele.Id === per.ingridientId) {
                            let textNodename = document.createTextNode(ele.ingridientname);
                            cellname.appendChild(textNodename);
                        }
                    });
                    let cellQty = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
                    qtyDetail.forEach(e => {
                        if (per.qtyId == e.Id) {
                            let textNodeQty = document.createTextNode(e.quantity);
                            cellQty.appendChild(textNodeQty);
                        }
                    });
                    let cellUnit = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
                    unitDetail.forEach(e => {
                        if (per.unitId == e.Id) {
                            let textNodeUnit = document.createTextNode(e.unit);
                            cellUnit.appendChild(textNodeUnit);
                        }
                    });
                    let cellPrice = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodePrice = document.createTextNode(per.ingridientcost);
                    cellPrice.appendChild(textNodePrice);
                    let cellMenuId = createElements(row, "td", "tableEachCell", null, null, null, "col");
                    let textNodeMenuId = document.createTextNode(per.menuId);
                    cellMenuId.appendChild(textNodeMenuId);
                }
            });
        }
    });
}
// Edit Button Click Event
function editBtnClick(btnEdit) {
    let input = document.querySelectorAll(".inputForm");
    let parentTr = btnEdit.parentNode.parentNode.parentNode;
    let spanParentChildren = parentTr.querySelectorAll(".inputItem");
    input.forEach(el => {
        let selectType = el.getAttribute("data-isspecial-type");
        switch (selectType) {
            case "foodname":
                el.value = spanParentChildren[0].innerText;
                break;
            case "reciepe":
                el.value = spanParentChildren[2].innerText;
                break;
            case "serving":
                el.value = spanParentChildren[1].innerText;
                break;
        }
    });
    let ingridientReciepe = JSON.parse(localStorage.getItem("ingridientReciepe"));
    let ingridientRowDiv = document.getElementById("ingridientRowDiv");
    let tableParentRow = parentTr.querySelectorAll(".tableEachRow");
    ingridientRowDiv.innerHTML = "";
    ingridientReciepe.forEach(e => {
        for (i = 0; i < tableParentRow.length; i++) {
            if (e.Id == tableParentRow[i].firstElementChild.innerHTML) {
                let Id = e.Id;
                let ingridientName = getIngridientIdToValue(e.ingridientId);
                let qty = e.qtyId;
                let unit = e.unitId;
                let menuId = e.menuId;
                let price = e.ingridientcost;
                let createMode = false;
                let ingridientRowDiv = document.getElementById("ingridientRowDiv");
                let textLabel = document.getElementById("textLabel");
                textLabel.setAttribute("data-menuid", e.menuId);
                createIngridientRow(createMode, ingridientRowDiv, ingridientName, qty, unit, price, Id, menuId);
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
                let ingridientReciepe = JSON.parse(localStorage.getItem("ingridientReciepe"));
                let objIngridientIndex = ingridientReciepe.findIndex((obj) => obj.Id == ingridientId);
                ingridientReciepe.splice(objIngridientIndex, 1);
                localStorage.setItem('ingridientReciepe', JSON.stringify(ingridientReciepe));
            }
            let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"))
            let objmenuIndex = menuReciepeDetail.findIndex((obj) => obj.Id == menuId);
            menuReciepeDetail.splice(objmenuIndex, 1);
            localStorage.setItem('menuReciepeDetail', JSON.stringify(menuReciepeDetail));
            document.getElementById("foodItemDiv").innerHTML = "";
            tableCall();
        }
    }
}