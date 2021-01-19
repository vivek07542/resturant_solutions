window.addEventListener('load', function () {
    userLocalStorageSetUp();
}, false);

let submitQtyBtn = document.getElementById("submitQtyBtn");
// Call Click Event Of Submit Button Qty
submitQtyBtn.addEventListener("click", function () {
    let qtyDiv = document.getElementById("qtyDiv");
    let inputForm = qtyDiv.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        // alert("Succesfully Validate");
        let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
        if (qtyDetail === null) {
            let qtyDetailsArray = [];
            localStorage.setItem("qtyDetail", JSON.stringify(qtyDetailsArray));
        }
        let headers = ["Id", "Qty", "Action"];
        let table = document.getElementById("tblDataQty");
        detailToLocalStorage(inputForm, qtyDetail, "qtyDetail", headers, table, this);
    }
});

let submitUnitBtn = document.getElementById("submitUnitBtn");
// Call Click Event Of Submit Button Unit
submitUnitBtn.addEventListener("click", function () {
    let unitDiv = document.getElementById("unitDiv");
    let inputForm = unitDiv.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
        if (unitDetail === null) {
            let unitDetailsArray = [];
            localStorage.setItem("unitDetail", JSON.stringify(unitDetailsArray));
        }
        let headers = ["Id", "Unit", "Action"];
        let table = document.getElementById("tblDataUnit");
        detailToLocalStorage(inputForm, unitDetail, "unitDetail", headers, table, this);
    }
});
// Create array For Qty & Unit
function userLocalStorageSetUp() {
    // Qty Local Storage
    let qtyDetailP = localStorage.getItem("qtyDetail");
    if (qtyDetailP !== null) {
        let input = qtyDiv.querySelectorAll(".inputForm");
        let headers = ["Id", "Qty", "Action"];
        let table = document.getElementById("tblDataQty");
        let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
        tableCall(qtyDetail, headers, table, input);
    }
    // Unit Local Storage
    let unitDetailP = localStorage.getItem("unitDetail");
    if (unitDetailP !== null) {
        let input = unitDiv.querySelectorAll(".inputForm");
        let headers = ["Id", "Unit", "Action"];
        let table = document.getElementById("tblDataUnit");
        let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
        tableCall(unitDetail, headers, table, input);
    }
}
// Push Qty Value To Local Storage
function detailToLocalStorage(input, arrayDetail, arrayDetailToLocalStorage, headers, table, crntBtn) {
    let objectDetail = {};
    let measureId = crntBtn.getAttribute("data-uniqueId") === null ? 0 : crntBtn.getAttribute("data-uniqueId");
    let isEditMode = measureId > 0 ? true : false;
    let maxId = 0;
    if (isEditMode) {
        let objIndex = arrayDetail.findIndex((obj => obj.Id == measureId));
        input.forEach(element => {
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "number":
                    arrayDetail[objIndex].quantity = element.value;
                    break;
                case "unit":
                    arrayDetail[objIndex].unit = element.value;
                    break;
            }
        });
    }
    else {
        maxId = sort(arrayDetail);
        objectDetail.Id = maxId + 1;
        input.forEach(element => {   
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "number":
                    objectDetail.quantity = element.value;
                break;
                case "unit":
                    objectDetail.unit = element.value;
                break;
            }
        });
        arrayDetail.push(objectDetail);
    }
    localStorage.setItem(arrayDetailToLocalStorage, JSON.stringify(arrayDetail));
    resetInputForm(input, table);
    tableCall(arrayDetail, headers, table, input);
}
// Reset The Table & Input Forms
function resetInputForm(input, table) {
    input.forEach(ele => {
        ele.value = "";
        ele.classList.remove("validateGreenBorder");
        ele.classList.remove("validateRedBorder");
    });
    table.innerHTML = "";
}
// create Table for Qty.
function tableCall(localArray, headers, table, input) {
    let tableHead = createElements(table, "thead", null, null, null, null, null);
    let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
    headers.forEach(headerText => {
        let header = createElements(headerRow, "th", null, null, null, null, "col");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
    });
    let tableBody = createElements(table, "tbody", null, null, null, null, null);
    if (localArray !== null) {
        localArray.forEach(per => {
            let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
            Object.values(per).forEach(text => {
                let cell = createElements(row, "td", "tableEachCell", null, null, null, "col");
                let textNode = document.createTextNode(text);
                cell.appendChild(textNode);
            })
            let cellBtn = createElements(row, "td", "d-flex justify-content-around", "action", null, null, null);
            let editButton = createElements(cellBtn, "button", "btn btn-outline-dark", null, "Edit", null, "col")
            editButton.addEventListener("click", function () {
                editClick(editButton, input, localArray);
            });
            let deleteBtn = createElements(cellBtn, "button", "btn btn-outline-dark", null, "Delete", null, "col")
            deleteBtn.addEventListener("click", function () {
                deleteUser(deleteBtn, input, localArray, headers, table);
            });
        });
    };
}
// Function for Edit
function editClick(editButton, input, localArray) {
    let parentTr = editButton.parentNode.parentNode;
    let parentChildren = parentTr.querySelectorAll(".tableEachCell");
    // let btnSubmit = document.getElementById("submitBtn");
    debugger;
    localArray.forEach(elem =>{
        debugger;
        if(elem.quantity === parentChildren[1].innerText){
            let submitQtyBtn = document.getElementById("submitQtyBtn");
            submitQtyBtn.setAttribute("data-uniqueId", parentChildren[0].innerText);            
        }
        else if(elem.unit == parentChildren[1].innerText){
            let submitUnitBtn = document.getElementById("submitUnitBtn");
            submitUnitBtn.setAttribute("data-uniqueId", parentChildren[0].innerText);
        }
    });
    input.forEach(e => {
        e.value = parentChildren[1].innerText;
    });
}
// Delete User Click Event
function deleteUser(deleteBtn, input, localArray, headers, table) {
    if (confirm("Do you want to Delete this From List?")) {
        let parentTr = deleteBtn.parentNode.parentNode;
        parentTr.parentNode.removeChild(parentTr);
        let userNameToDelete = parentTr.children[1];
        trDelete(userNameToDelete, input, localArray, headers, table);
    }
}
function trDelete(userNameToDelete, input, localArray, headers, table) {
    localArray.forEach(function (e, index) {
        if (e.quantity === userNameToDelete.innerText) {
            localArray.splice(index, 1);
            localStorage.setItem('qtyDetail', JSON.stringify(localArray));
        }
        else if (e.unit === userNameToDelete.innerText) {
            localArray.splice(index, 1);
            localStorage.setItem('unitDetail', JSON.stringify(localArray));
        }
    });
    table.innerHTML = "";
    tableCall(localArray, headers, table);
}
