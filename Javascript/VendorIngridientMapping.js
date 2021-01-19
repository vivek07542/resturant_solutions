// Window On Load
window.addEventListener("load", function () {
    userLocalStorageSetUp();
    createIngridientSelect();
    let unitSelectId = document.getElementById("unitSelectId");
    unitSelect(unitSelectId);
    let vendorDetail = JSON.parse(localStorage.getItem("vendorDetail"));
    let createMode = true;
    createEveryVendorRow(vendorDetail,createMode);
});
// Load Array To The Empty Array
function userLocalStorageSetUp() {
    let vendorIngridientDetailP = localStorage.getItem("vendorIngridientDetail");
    if (vendorIngridientDetailP !== null) {
        let table = document.getElementById("tblData");
        let vendorIngridientDetail = JSON.parse(localStorage.getItem("vendorIngridientDetail"));
        tableCall(table, vendorIngridientDetail);
    }
}
// Append Value To Select In Ingridient Name
function createIngridientSelect(){
    let ingridientDetail = JSON.parse(localStorage.getItem("ingridientDetail"));
    let ingridientSelect = document.getElementById("ingridientSelect");
    let appendValue = document.getElementById("appendValue");
    ingridientSelect.addEventListener("keyup", function () {
        autoComplete(ingridientSelect, ingridientDetail, appendValue);
    });
}
// To Create The Vendor Name from records and Price and Sub Button as per no. of Vendor; 
function createEveryVendorRow(localArray, condition) {
    let mode = condition;
    let vendorRowMainDiv = document.getElementById("vendorRowDiv");
    vendorRowMainDiv.innerHTML = "";
    localArray.forEach(element => {
        let vendorRowDiv = createElements(vendorRowMainDiv, "div", "col-12 py-2 form-inline d-flex justify-content-between vendorRow", null, null, null, null);
        let vendorDiv = createElements(vendorRowDiv, "div", "col-5 py-2 form-inline d-flex justify-content-around", null, null, null, null);
        let vendorLabel = createElements(vendorDiv, "label", "form-label", null, "Vendor Name :", null, null);
        let priceDiv = createElements(vendorRowDiv, "div", "col-5 py-2 form-inline d-flex justify-content-around", null, null, null, null);
        let priceLabel = createElements(priceDiv, "label", "form-label", null, "Price :", null, null);
        let vendorDetail = JSON.parse(localStorage.getItem("vendorDetail"));
        let vendorSpan;
        let priceInput;
        if (!mode) {
            vendorDetail.forEach(el => {
                if (el.Id == element.vendorId) {
                    vendorSpan = createElements(vendorDiv, "span", " vendorName", null, el.vendorname, null, null);
                    priceInput = createElements(priceDiv, "input", "form-control inputForm vendorName", null, null, element.price, "money");
                }
            });
        }
        else if (mode) {
            vendorSpan = createElements(vendorDiv, "span", " vendorName", null, element.vendorname, null, null);
            priceInput = createElements(priceDiv, "input", "form-control inputForm vendorName", null, element.price, null, "money");
        }
        vendorSpan.setAttribute("data-isspecial-type", "span");
        priceInput.setAttribute("placeholder", "Price");
        priceInput.setAttribute("step", "0.01");
        priceInput.setAttribute("data-isrequired", "true");
        priceInput.setAttribute("data-isspecial", "false");
        priceInput.setAttribute("data-isspecial-type", "number");
        priceInput.setAttribute("type", "number");
        let subDeleteDiv = createElements(vendorRowDiv, "div", "col-1 py-2 form-inline d-flex justify-content-around", null, null, null, null);
        let subDeleteBtn = createElements(subDeleteDiv, "button", "btn btn-outline-dark d-flex justify-content-center mx-auto delVendorBtn", null, " - ", null, null);
        subDeleteBtn.addEventListener("click", function () {
            subRowDeleteBtn(subDeleteBtn);
        });
    });
}
//Vendor Row Delete function
function subRowDeleteBtn(subDeleteBtn) {
    if (confirm("Do you want to Delete this Vendor?")) {
        let parentTr = subDeleteBtn.parentNode.parentNode;
        parentTr.parentNode.removeChild(parentTr);
    }
}
// Function Click Event For Submit Btn
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function () {
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        let table = document.getElementById("tblData");
        let vendorIngridientDetail = JSON.parse(localStorage.getItem("vendorIngridientDetail"));
        if (vendorIngridientDetail === null) {
            let vendorIngridientDetailsArray = [];
            localStorage.setItem("vendorIngridientDetail", JSON.stringify(vendorIngridientDetailsArray));
            document.getElementById("tableDiv").style.display = "none";
        }
        vendorIngridientDetailToLocalStorage(inputForm, table, vendorIngridientDetail, this);
        resetInputForm(inputForm);
        tableCall(table, vendorIngridientDetail);
        let vendorDetail = JSON.parse(localStorage.getItem("vendorDetail"));
        let createMode = true;
        createEveryVendorRow(vendorDetail,createMode);
    }
});
// Click Event on Li 
function clickEventForLi(li, input, div) {
    input.value = li.innerText;
    div.style.display = "none";
}


// function To Append Details to Local Storage
function vendorIngridientDetailToLocalStorage(input, table, array, crntBtn) {
    let objectDetail = {};
    let vendorIngridientId = crntBtn.getAttribute("data-uniqueId") === null ? 0 : crntBtn.getAttribute("data-uniqueId");
    let isEditMode = vendorIngridientId > 0 ? true : false;
    let maxId = 0;
    if (isEditMode) {
        let objIndex = array.findIndex((obj => obj.Id == vendorIngridientId));
        input.forEach(element => {
            debugger;
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "select":
                    if (element.id === "ingridientSelect") {
                        let ingridientId = getIngridientValueToId(element.value);
                        array[objIndex].ingridientId = ingridientId;
                    }
                    else if (element.id === "unitSelectId") {
                        array[objIndex].unitId = element.value;
                    }
                    break;
            }
        });
        let emptyArray = [];
        array[objIndex].vendorsPrice = createObjectOfVendorPrice(emptyArray);
    }
    else {
        maxId = sort(array);
        objectDetail.Id = maxId + 1;
        input.forEach(element => {
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "select":
                    if (element.id === "ingridientSelect") {
                        let ingridientId = getIngridientValueToId(element.value);
                        objectDetail.ingridientId = ingridientId;
                    }
                    else if (element.id === "unitSelectId") {
                        objectDetail.unitId = element.value;
                    }
                    break;
            }
        });
        let emptyArray = [];
        objectDetail.vendorsPrice = createObjectOfVendorPrice(emptyArray);
        array.push(objectDetail);
    }
    localStorage.setItem("vendorIngridientDetail", JSON.stringify(array));
}
// Create Object Of Vendor Price
function createObjectOfVendorPrice(emptyArray) {
    let objectPrice;
    let vendorRow = document.querySelectorAll(".vendorRow");
    vendorRow.forEach(ele => {
        objectPrice = {};
        let vendorName = ele.querySelectorAll(".vendorName");
        vendorName.forEach(e => {
            let selectType = e.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "span":
                    let vendorDetail = JSON.parse(localStorage.getItem("vendorDetail"));
                    vendorDetail.forEach(element => {
                        if (element.vendorname == e.innerText) {
                            objectPrice.vendorId = element.Id;
                        }
                    });
                    break;
                case "number":
                    objectPrice.price = e.value;
                    break;
            }
        });
        emptyArray.push(objectPrice);
    })
    return emptyArray;
}

// Reset Function
function resetInputForm(input) {
    input.forEach(ele => {
        ele.value = "";
        ele.classList.remove("validateGreenBorder");
        ele.classList.remove("validateRedBorder");
    });
    document.getElementById("tblData").innerHTML = "";
    document.getElementById("spanText").style.display = "none";
}
// Create Table
function tableCall(table, array) {
    let headers = ["Id", "Ingridient Name", "Unit", "Vendor Price", "Action"];
    let tableHead = createElements(table, "thead", null, null, null, null, null);
    let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
    headers.forEach(headerText => {
        let header = createElements(headerRow, "th", null, null, null, null, "col");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
    });
    let tableBody = createElements(table, "tbody", null, null, null, null, null);
    if (array !== null) {
        array.forEach(per => {
            let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
            let cellId = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodeId = document.createTextNode(per.Id);
            cellId.appendChild(textNodeId);
            let cellname = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let ingridientvalue = getIngridientIdToValue(per.ingridientId);
            let textNodename = document.createTextNode(ingridientvalue);
            cellname.appendChild(textNodename);
            let cellUnit = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let unit = getUnitIdToValue(per.unitId)
            let textNodeUnit = document.createTextNode(unit);
            cellUnit.appendChild(textNodeUnit);
            let cellVendorPrice = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let vendorDetail = JSON.parse(localStorage.getItem("vendorDetail"));
            per.vendorsPrice.forEach(ele => {
                let rowVendor = createElements(cellVendorPrice, "tr", "tableEachRowVendor d-flex justify-content-between", null, null, null, "row");
                vendorDetail.forEach(e => {
                    if (ele.vendorId === e.Id) {
                        let cellvendorId = createElements(rowVendor, "td", "tableEachCellVendor", null, null, null, "col");
                        let textNodeVendorrName = document.createTextNode(e.vendorname);
                        cellvendorId.appendChild(textNodeVendorrName);
                    }
                });
                let cellprice = createElements(rowVendor, "td", "tableEachCellVendor", null, null, null, "col");
                let textNodePrice = document.createTextNode(ele.price);
                cellprice.appendChild(textNodePrice);
            });
            let cellBtn = createElements(row, "td", "d-flex justify-content-around", "action", null, null, null);
            let editButton = createElements(cellBtn, "button", "btn btn-outline-dark", null, "Edit", null, "col")
            editButton.addEventListener("click", function () {
                editClick(editButton);
            });
            let deleteBtn = createElements(cellBtn, "button", "btn btn-outline-dark", null, "Delete", null, "col")
            deleteBtn.addEventListener("click", function () {
                deleteUser(deleteBtn);
            });
        });
    };
}
// Function for Edit
function editClick(editButton) {
    let parentTr = editButton.parentNode.parentNode;
    let parentChildren = parentTr.querySelectorAll(".tableEachCell");
    let btnSubmit = document.getElementById("submitBtn");
    btnSubmit.setAttribute("data-uniqueId", parentChildren[0].innerText);
    let vendorIngridientDetail = JSON.parse(localStorage.getItem("vendorIngridientDetail"));
    vendorIngridientDetail.forEach(e => {
        if (e.Id == parentChildren[0].innerText) {
            let ingridientSelect = document.getElementById("ingridientSelect");
            let ingridientValue = getIngridientIdToValue(e.ingridientId)
            ingridientSelect.value = ingridientValue;
            let unitSelectId = document.getElementById("unitSelectId");
            unitSelectId.value = e.unitId;
            let editMode = false;
            createEveryVendorRow(e.vendorsPrice, editMode);
        }
    });
}
// Delete User Click Event
function deleteUser(deleteBtn) {
    if (confirm("Do you want to Delete this From List?")) {
        let parentTr = deleteBtn.parentNode.parentNode;
        if (parentTr !== null) {
            let vendorIngridientId = parentTr.children[0].innerText;
            parentTr.parentNode.removeChild(parentTr);
            let vendorIngridientDetail = JSON.parse(localStorage.getItem("vendorIngridientDetail"));
            let objIndex = vendorIngridientDetail.findIndex((obj) => obj.Id == vendorIngridientId);
            vendorIngridientDetail.splice(objIndex, 1);
            localStorage.setItem('vendorIngridientDetail', JSON.stringify(vendorIngridientDetail));
        }
    }
}
