// Window On Load
window.addEventListener("load", function () {
    userLocalStorageSetUp();
    let createMode = true;
    let ingridientRowDiv = document.getElementById("ingridientRowDiv");
    createIngridientRow(createMode, ingridientRowDiv, null, null, null, null);
    orderNumber();

});
// User local Storage
function userLocalStorageSetUp() {
    let orderItemDetail = localStorage.getItem("orderItemDetail");
    let orderDetail = localStorage.getItem("orderDetail");
    if (orderItemDetail === null) {
        let reciepeDetailsArray = [];
        localStorage.setItem("orderItemDetail", JSON.stringify(reciepeDetailsArray));
    }
    else {
        tableCall();
    }
    if (orderDetail === null) {
        let menuDetail = [];
        localStorage.setItem("orderDetail", JSON.stringify(menuDetail));
    }
}
// Create Function
function createIngridientRow(condition, ingridientRowDiv, ingridientName, qty, price, Id, menuId) {
    let mode = condition;
    let eachIngridientRow = createElements(ingridientRowDiv, "div", "row text-center d-flex justify-content-between", null, null, null, null);
    let eachInputDiv = createElements(eachIngridientRow, "div", "col-sm-6 col-md-4 py-2 inputDiv ", null, null, null, null);
    let inputLabel = createElements(eachInputDiv, "label", "form-label", null, "Food Item :", null, null);
    let eachQtyDiv = createElements(eachIngridientRow, "div", "col-sm-3 col-md-2 py-1 form-inline d-flex justify-content-around", null, null, null, null);
    let qtyLabel = createElements(eachQtyDiv, "label", "form-label", null, "Qty.:", null, null);
    let eachPriceDiv = createElements(eachIngridientRow, "div", "col-sm-6 col-md-3 py-2 form-inline d-flex justify-content-around", null, null, null, null);
    let priceLabel = createElements(eachPriceDiv, "label", "form-label", null, "Price:", null, null);
    if (mode) {
        let inputIngridient = createElements(eachInputDiv, "input", "form-control inputForm", null, null, null, null);
        setAttributeToSelect(inputIngridient, null, null);
        let eachInputAppendDiv = createElements(eachInputDiv, "div", "row", "appendValue", null, null, null);
        createFoodItemSelector(eachInputAppendDiv, inputIngridient);
        let qtySelectP = createElements(eachQtyDiv, "select", "inputForm custom-select qtySelect", "qtySelect", null, null, null);
        let qtyOption = createElements(qtySelectP, "option", null, null, "Sel.Qty", "", null);
        qtyOption.setAttribute("selected", "selected");
        setAttributeToSelect(null, qtySelectP, null);
        createSelectOption(qtySelectP)
        qtySelectP.addEventListener("change", function () {
            let parentValue = menuPriceCalculation(inputIngridient, qtySelectP);
            sumUpPrice(parentValue, priceInput);
            priceInput.value = parentValue;
        });
        let priceInput = createElements(eachPriceDiv, "input", "form-control inputForm ingridientPriceInput", "ingridientPriceInput", null, null, null);
        priceInput.setAttribute("placeholder", "Price");
        setAttributeToSelect(null, null, priceInput);
    }
    else if (!mode) {
        document.getElementById("orderIdSpan").innerText = menuId;
        eachIngridientRow.setAttribute("data-elemid", Id);
        eachIngridientRow.setAttribute("data-menuid", menuId);
        let inputIngridient = createElements(eachInputDiv, "input", "form-control inputForm", "ingridientSelect", null, ingridientName, null);
        setAttributeToSelect(inputIngridient, null, null);
        let eachInputAppendDiv = createElements(eachInputDiv, "div", "row", "appendValue", null, null, null);
        createFoodItemSelector(eachInputAppendDiv, inputIngridient);
        let qtySelectP = createElements(eachQtyDiv, "select", "inputForm custom-select qtySelect", "qtySelect", null, qty, null);
        let qtyOption = createElements(qtySelectP, "option", null, null, "Sel.Qty", "", null);
        setAttributeToSelect(null, qtySelectP, null);
        for (i = 1; i <= 10; i++) {
            let createOption = createElements(qtySelectP, "option", "unitOption", null, i, i, null)
            if (qty == i) {
                createOption.setAttribute("selected", "selected");
            }
        }
        qtySelectP.addEventListener("change", function () {
            let parentValue = menuPriceCalculation(inputIngridient, qtySelectP);
            sumUpPrice(parentValue, priceInput);
            priceInput.value = parentValue;
        });
        let priceInput = createElements(eachPriceDiv, "input", "form-control inputForm ingridientPriceInput", "ingridientPriceInput", null, null, null);
        priceInput.setAttribute("placeholder", "Price");
        setAttributeToSelect(null, null, priceInput);
        let parentValue = menuPriceCalculation(inputIngridient, qtySelectP);
        sumUpPrice(parentValue, priceInput);
        priceInput.value = parentValue;
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
        textInput.setAttribute("placeholder", "Sel. Food Item");
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
// Create Select Item For Menu Drop Down
function createFoodItemSelector(div, input) {
    let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    input.addEventListener("keyup", function () {
        autoCompleteFoodItem(input, menuReciepeDetail, div);
    });
}
// Click Event On Div
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
// Price Calculation 
function menuPriceCalculation(inputIngridient, qtySelectP) {
    let menuItemPrice;
    let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    menuReciepeDetail.forEach(e => {
        if (e.fooditem == inputIngridient.value) {
            let sellPricePerQty = e.sellprice;
            menuItemPrice = Math.ceil(sellPricePerQty * qtySelectP.value);
        }
    });
    return menuItemPrice;
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
// Order Number Function
function orderNumber() {
    let orderDetail = JSON.parse(localStorage.getItem("orderDetail"));
    let length = sort(orderDetail);
    let orderIdSpan = document.getElementById("orderIdSpan");
    orderIdSpan.innerText = Number(length) + 1;
}
// Discount Button Change event Function
let discountInput = document.getElementById("discountInput");
discountInput.addEventListener("change", function () {
    debugger;
    let netTotal = netPayableAmount();
    let netPayableSpan = document.getElementById("netPayableSpan");
    netPayableSpan.innerText = netTotal;
});
// Net Payable Amount Calculation
function netPayableAmount() {
    debugger;
    let netTotal;
    let discountInput = document.getElementById("discountInput").value;
    let totalPriceInput = document.getElementById("totalPriceInput").value;
    netTotal = Math.ceil(totalPriceInput - (totalPriceInput * discountInput / 100));
    return Number(netTotal);
}
// Submit Click Event
let submitBtnIngridient = document.getElementById("submitBtn")
submitBtnIngridient.addEventListener("click", function () {
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        let orderItemDetail = JSON.parse(localStorage.getItem("orderItemDetail"));
        let orderDetail = JSON.parse(localStorage.getItem("orderDetail"));
        let textLabel = document.getElementById("textLabel");
        let menuIngridientId = textLabel.getAttribute("data-menuid") === null ? 0 : textLabel.getAttribute("data-menuid");
        let orderId = detailToLocalStorageMenuId(menuIngridientId, orderDetail, inputForm);
        if (textLabel.getAttribute("data-menuid") !== null) {
            textLabel.removeAttribute("data-menuid");
        }
        let ingridientRowDiv = document.getElementById("ingridientRowDiv");
        let eachRowDiv = ingridientRowDiv.children;
        for (let i = 0; i < eachRowDiv.length; i++) {
            let element = eachRowDiv[i];
            detailToLocalStorageIngridient(inputForm, orderItemDetail, orderDetail, element, orderId)
        }
        resetInputForm(inputForm);
        orderNumber();
        tableCall();
    }
});
// Function To Store Detail To menu reciepe Detail
function detailToLocalStorageMenuId(menuIngridientId, orderDetail, input) {
    let isEditMode = menuIngridientId > 0 ? true : false;
    let maxIdForMenu = 0;
    if (!isEditMode) {
        let objectReciepe = {};
        maxIdForMenu = sort(orderDetail);
        let maxmenuId = maxIdForMenu + 1;
        objectReciepe.Id = maxIdForMenu + 1;
        input.forEach(element => {
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "customername":
                    objectReciepe.customername = element.value;
                    break;
                case "date":
                    objectReciepe.orderdate = element.value;
                    break;
                case "discount":
                    objectReciepe.discount = element.value;
                    break;
            }
        });
        objectReciepe.totalprice = netPayableAmount();
        orderDetail.push(objectReciepe);
        localStorage.setItem("orderDetail", JSON.stringify(orderDetail));
        return maxmenuId;
    }
    else {
        let objMenuIndex = orderDetail.findIndex((obj => obj.Id == menuIngridientId));
        input.forEach(element => {
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "customername":
                    orderDetail[objMenuIndex].customername = element.value;
                    break;
                case "date":
                    orderDetail[objMenuIndex].orderdate = element.value;
                    break;
                case "discount":
                    orderDetail[objMenuIndex].discount = element.value;
                    break;
            }
        });
        orderDetail[objMenuIndex].totalprice = netPayableAmount();
        localStorage.setItem("orderDetail", JSON.stringify(orderDetail));
        return Number(menuIngridientId);
    }
}
// Function To Store Ingridient In Local Storage
function detailToLocalStorageIngridient(inputForm, orderItemDetail, orderDetail, element, orderId) {
    let ingridientId = element.getAttribute("data-elemid") === null ? 0 : element.getAttribute("data-elemid");
    let isEditMode = ingridientId > 0 ? true : false;
    let maxIdForReciepe = 0;
    if (!isEditMode) {
        let objectIngridient = {};
        maxIdForReciepe = sort(orderItemDetail);
        objectIngridient.Id = maxIdForReciepe + 1;
        let inputForm = element.querySelectorAll(".inputForm");
        inputForm.forEach(e => {
            let selectType = e.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "text":
                    let menuId = createMenuValueToId(e.value);
                    objectIngridient.menuId = menuId;
                    break;
                case "select":
                    objectIngridient.qtyId = e.value;
                    break;
                case "number":
                    objectIngridient.price = e.value;
                    break;
            }
        });
        objectIngridient.orderId = orderId;
        orderItemDetail.push(objectIngridient);
    }
    else {
        let objIngridientIndex = orderItemDetail.findIndex((obj => obj.Id == ingridientId));
        let inputForm = element.querySelectorAll(".inputForm");
        inputForm.forEach(e => {
            let selectType = e.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "text":
                    let menuId = createMenuValueToId(e.value);
                    orderItemDetail[objIngridientIndex].menuId = menuId;
                    break;
                case "select":
                    orderItemDetail[objIngridientIndex].qtyId = e.value;
                    break;
                case "number":
                    orderItemDetail[objIngridientIndex].price = e.value;
                    break;
            }
        });
    }
    localStorage.setItem("orderItemDetail", JSON.stringify(orderItemDetail));
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
    document.getElementById("netPayableSpan").innerText = "";
    let createMode = true;
    let ingridientRowDiv = document.getElementById("ingridientRowDiv");
    createIngridientRow(createMode, ingridientRowDiv);
}
// Table Function
function tableCall(){
    let foodItemDiv = document.getElementById("foodItemDiv");
    let orderDetail = JSON.parse(localStorage.getItem("orderDetail"));
    orderDetail.forEach(el => {
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
        let customerNameLabel = createElements(menuFoodContainer, "label", "form-label", null, "Customer Name :", null, null);
        let customerNameSpan = createElements(menuFoodContainer, "span", "form-control inputItem", "foodItemTextSpan", el.customername, null, null);
        let orderDateLabel = createElements(menuFoodContainer, "label", "form-label", null, "Order Date :", null, null);
        let orderDateSpan = createElements(menuFoodContainer, "span", "form-control inputItem", "reciepeTextSpan", el.orderdate, null, null);
        // Container For Reciepe
        // let menuReciepeContainer = createElements(menuContainer, "div", "recipeDiv py-2 col-7 form-inline", "menuReciepeContainer", null, null, null);
        // let foodReciepeLabel = createElements(menuReciepeContainer, "label", "form-label", null, "Food Reciepe :", null, null);
        // let foodReciepeSpan = createElements(menuReciepeContainer, "span", "form-control inputItem", "reciepeTextSpan", el.reciepedescription, null, null);
        let tableDiv = createElements(mainContainer, "div", "tblDiv", "tblDataDiv", null, null, null);
        let table = createElements(tableDiv, "table", "table table-striped text-center", "tblData", null, null, null);
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
        let orderItemDetail = JSON.parse(localStorage.getItem("orderItemDetail"));
        if (orderItemDetail !== null) {
            orderItemDetail.forEach(per => {
                if (per.orderId == el.Id) {
                    let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
                    let cellId = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodeId = document.createTextNode(per.Id);
                    cellId.appendChild(textNodeId);
                    let cellOrderId = createElements(row, "td", "tableEachCell", null, null, null, "col");
                    let textNodeMenuId = document.createTextNode(per.orderId);
                    cellOrderId.appendChild(textNodeMenuId);
                    let cellname = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let menuItem = createMenuIdToValue(per.menuId)
                    let textNodename = document.createTextNode(menuItem);
                    cellname.appendChild(textNodename);
                    let cellQty = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodeQty = document.createTextNode(per.qtyId);
                    cellQty.appendChild(textNodeQty);
                    let cellPrice = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
                    let textNodePrice = document.createTextNode(per.price);
                    cellPrice.appendChild(textNodePrice);
                }
            });
        }
        let priceContainer = createElements(mainContainer, "div", "col-12 py-2 form-inline d-flex justify-content-around", null, null, null, null);
        let discountLabel = createElements(priceContainer, "label", "form-label", null, "Discount % :", null, null);
        let discountSpan = createElements(priceContainer, "span", "form-control inputItem", "foodItemTextSpan", el.discount, null, null);
        let netPriceLabel = createElements(priceContainer, "label", "form-label", null, "NetPayable Amount :", null, null);
        let netPriceSpan = createElements(priceContainer, "span", "form-control inputItem", "reciepeTextSpan", el.totalprice, null, null);
    });
}
// Edit Button Click Event
function editBtnClick(btnEdit) {
    let input = document.querySelectorAll(".inputForm");
    let parentTr = btnEdit.parentNode.parentNode.parentNode;
    let spanParentChildren = parentTr.querySelectorAll(".inputItem");
    input.forEach(element => {
        let selectType = element.getAttribute("data-isspecial-type");
        switch (selectType) {
            case "customername":
                element.value = spanParentChildren[0].innerText;
                break;
            case "date":
                element.value = spanParentChildren[1].innerText;
                break;
            case "discount":
                element.value = spanParentChildren[2].innerText;
                break;
        }
    });
    document.getElementById("netPayableSpan").innerText = spanParentChildren[3].innerText;
    let orderItemDetail = JSON.parse(localStorage.getItem("orderItemDetail"));
    let ingridientRowDiv = document.getElementById("ingridientRowDiv");
    let tableParentRow = parentTr.querySelectorAll(".tableEachRow");
    ingridientRowDiv.innerHTML = "";
    orderItemDetail.forEach(e => {
        for (i = 0; i < tableParentRow.length; i++) {
            if (e.Id == tableParentRow[i].firstElementChild.innerHTML) {
                let Id = e.Id;
                let ingridientName = createMenuIdToValue(e.menuId);
                let qty = e.qtyId;
                let menuId = e.orderId;
                let price = e.price;
                let createMode = false;
                let ingridientRowDiv = document.getElementById("ingridientRowDiv");
                let textLabel = document.getElementById("textLabel");
                textLabel.setAttribute("data-menuid", e.orderId);
                createIngridientRow(createMode, ingridientRowDiv, ingridientName, qty, price, Id, menuId);
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
            let menuId = tableParentChildren[1].innerText;
            parentTr.parentNode.removeChild(parentTr);
            for (i = 0; i < tableParentRow.length; i++) {
                ingridientId = tableParentRow[i].firstElementChild.innerText;
                let orderItemDetail = JSON.parse(localStorage.getItem("orderItemDetail"));
                let objIngridientIndex = orderItemDetail.findIndex((obj) => obj.Id == ingridientId);
                orderItemDetail.splice(objIngridientIndex, 1);
                localStorage.setItem('orderItemDetail', JSON.stringify(orderItemDetail));
            }
            let orderDetail = JSON.parse(localStorage.getItem("orderDetail"))
            let objmenuIndex = orderDetail.findIndex((obj) => obj.Id == menuId);
            orderDetail.splice(objmenuIndex, 1);
            localStorage.setItem('orderDetail', JSON.stringify(orderDetail));
            document.getElementById("foodItemDiv").innerHTML = "";
            orderNumber();
            tableCall();
        }
    }
}