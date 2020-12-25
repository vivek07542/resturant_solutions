window.addEventListener('load', function () {
    userLocalStorageSetUp();
}, false);

let submitQtyBtn = document.getElementById("submitQtyBtn");
// Call Click Event Of Submit Button Qty
submitQtyBtn.addEventListener("click", function () {
    let qtyDiv = document.getElementById("qtyDiv");
    let inputForm = qtyDiv.querySelectorAll(".inputForm");
    let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
    let headers = ["Id", "Qty", "Action"];
    let table = document.getElementById("tblDataQty");
    if (validation(inputForm)) {
        alert("Succesfully Validate");
        detailToLocalStorage(inputForm, qtyDetail, "qtyDetail", headers, table);
    }
});

let submitUnitBtn = document.getElementById("submitUnitBtn");
// Call Click Event Of Submit Button Unit
submitUnitBtn.addEventListener("click", function () {
    let unitDiv = document.getElementById("unitDiv");
    let inputForm = unitDiv.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        alert("Succesfully Validate");
        let unitDiv = document.getElementById("unitDiv");
        let input = unitDiv.querySelectorAll(".inputForm");
        let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
        let headers = ["Id", "Unit", "Action"];
        let table = document.getElementById("tblDataUnit");
        detailToLocalStorage(input, unitDetail, "unitDetail", headers, table);
    }
});
// Create array For Qty & Unit
function userLocalStorageSetUp() {
    // Qty Local Storage
    let qtyDetailP = localStorage.getItem("qtyDetail");
    if (qtyDetailP === null) {
        let qtyDetailsArray = [];
        localStorage.setItem("qtyDetail", JSON.stringify(qtyDetailsArray));
    }
    else {
        let input = qtyDiv.querySelectorAll(".inputForm");
        let headers = ["Id", "Qty", "Action"];
        let table = document.getElementById("tblDataQty");
        let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
        tableCall(qtyDetail, headers, table, input);
    }
    // Unit Local Storage
    let unitDetailP = localStorage.getItem("unitDetail");
    if (unitDetailP === null) {
        let unitDetailsArray = [];
        localStorage.setItem("unitDetail", JSON.stringify(unitDetailsArray));
    }
    else {
        let input = unitDiv.querySelectorAll(".inputForm");
        let headers = ["Id", "Unit", "Action"];
        let table = document.getElementById("tblDataUnit");
        let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
        tableCall(unitDetail, headers, table, input);
    }
}
// Push Qty Value To Local Storage
function detailToLocalStorage(input, arrayDetail, arrayDetailToLocalStorage, headers, table) {
    let objectDetail = {};
    let isCreated = true;
    let selTr = table.getElementsByTagName("tr");
    let selectedTr;
    // check table If Yellow
    for (let i = 0; i < selTr.length; i++) {
        if (selTr[i].style.backgroundColor === "yellow") {
            selectedTr = selTr[i];
            isCreated = false;
            break;
        }
    }
    if (isCreated) {
        input.forEach(element => {
            if (arrayDetail.length !== 0) {
                var lengthOfId = sort(arrayDetail);
            }
            else {
                lengthOfId = 0;
            }
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "number":
                    objectDetail.Id = lengthOfId + 1;
                    objectDetail.quantity = element.value;
                    break;
                case "unit":
                    objectDetail.Id = lengthOfId + 1;
                    objectDetail.unit = element.value;
                    break;
            }
        });
        arrayDetail.push(objectDetail);
        localStorage.setItem(arrayDetailToLocalStorage, JSON.stringify(arrayDetail));
    }
    else {
        let selectedTds = selectedTr.querySelectorAll(".tableEachCell");
        for (i = 0; i < selectedTds.length; i++) {
            input.forEach(element => {
                debugger;
                let objIndex = arrayDetail.findIndex((obj => obj.Id == selectedTds[i].innerText));
                let selectType = element.getAttribute("data-isspecial-type");
                switch (selectType) {
                    case "number":
                        arrayDetail[objIndex].quantity = element.value;
                        break;
                    case "unit":
                        console.log(arrayDetail[objIndex]);
                        arrayDetail[objIndex].unit = element.value;
                        break;
                }
                localStorage.setItem(arrayDetailToLocalStorage, JSON.stringify(arrayDetail));
            });
            break;
        }
    }
    resetInputForm(input, table);
    tableCall(arrayDetail, headers, table, input);
}
// Sort Function For Id Number
function sort(array) {
    let ids = array.map(a => a.Id);
    ids.sort(function (a, b) { return b - a });
    let idsLength = Number(ids[0]);
    return idsLength;
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
    // let input = document.querySelectorAll(".inputForm");
    let parentTr = editButton.parentNode.parentNode;
    let parentChildren = parentTr.querySelectorAll(".tableEachCell");
    parentTr.style.background = "yellow";
    input.forEach(e => {
        e.value = parentChildren[1].innerText;
    });
}
// Delete User Click Event
function deleteUser(deleteBtn, input, localArray, headers, table) {
    if (confirm("Do you want to Delete this User?")) {
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
// Function To create Something
function createElements(parentName, formType, className, idName, childInnerText, childValue, childName) {
    let childrenName = document.createElement(formType);
    if (className !== null) {
        childrenName.setAttribute("class", className);
    }
    if (idName !== null) {
        childrenName.setAttribute("id", idName);
    }
    if (childValue !== null) {
        childrenName.value = childValue;
    }
    if (childInnerText !== null) {
        childrenName.innerText = childInnerText;
    }
    if (childName !== null) {
        childrenName.setAttribute("name", childName);
    }
    parentName.appendChild(childrenName);
    return childrenName;
}