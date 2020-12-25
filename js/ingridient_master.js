// Window On Load
window.addEventListener('load', function () {
    userLocalStorageSetUp();
    qtySelect();
    unitSelect();
    tableCall();
}, false);
// Quantity Value From Local Storage
function qtySelect() {
    let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
    let qtySelect = document.getElementById("qtySelect");
    qtyDetail.forEach(elem => {
        createElements(qtySelect, "option", "qtyOption", null, elem.quantity, elem.Id, null)
    });
}
// Unit Value From Local Storage
function unitSelect() {
    let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
    let unitSelect = document.getElementById("unitSelect");
    unitDetail.forEach(elem => {
        createElements(unitSelect, "option", "unitOption", null, elem.unit, elem.Id, null)
    });
}
// Empty Array To local Storage
function userLocalStorageSetUp() {
    let ingridientDetailP = localStorage.getItem("ingridientDetail");
    if (ingridientDetailP === null) {
        let ingridientDetailsArray = [];
        localStorage.setItem("ingridientDetail", JSON.stringify(ingridientDetailsArray));
        document.getElementById("tableDiv").style.display = "none";
    }
}
// Add Button Click Event
let submitBtn = document.getElementById("submitBtn");
// Call Click Event Of Submit Button
submitBtn.addEventListener("click", function () {
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        alert("Succesfully Validate");
        ingridientDetailToLocalStorage();
    }
});
// Push Vendor Details To The Local Storage.
function ingridientDetailToLocalStorage() {
    let objectDetail = {};
    let table = document.getElementById("tblData");
    let input = document.querySelectorAll(".inputForm");
    let ingridientDetail = JSON.parse(localStorage.getItem("ingridientDetail"));
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
            if (ingridientDetail.length !== 0) {
                var lengthOfId = sort(ingridientDetail);
            }
            else {
                lengthOfId = 0;
            }
            objectDetail.Id = lengthOfId + 1;
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "username":
                    objectDetail.ingridientname = element.value;
                    break;
                case "number":
                    objectDetail.price = element.value;
                    break;
            }
        });
        objectDetail.qtyId = document.getElementById("qtySelect").value;
        objectDetail.unitId = document.getElementById("unitSelect").value;
        ingridientDetail.push(objectDetail);
        localStorage.setItem("ingridientDetail", JSON.stringify(ingridientDetail));
    }
    else {
        let selectedTds = selectedTr.querySelectorAll(".tableEachCell");
        for (i = 0; i < selectedTds.length; i++) {
            let objIndex = ingridientDetail.findIndex((obj => obj.Id == selectedTds[i].innerText));
            input.forEach(element => {
                let selectType = element.getAttribute("data-isspecial-type");
                switch (selectType) {
                    case "username":
                        ingridientDetail[objIndex].ingridientname = element.value;
                        break;
                    case "number":
                        ingridientDetail[objIndex].price = element.value;
                        break;
                }
            });
            ingridientDetail[objIndex].qtyId = document.getElementById("qtySelect").value;
            ingridientDetail[objIndex].unitId = document.getElementById("unitSelect").value;
            localStorage.setItem("ingridientDetail", JSON.stringify(ingridientDetail));
            break;
        }
    }
    resetInputForm(input);
    tableCall();
}
// Sort Function Of Array Id Number
function sort(array) {
    let ids = array.map(a => a.Id);
    ids.sort(function (a, b) { return b - a });
    let idsLength = Number(ids[0]);
    return idsLength;
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
function tableCall() {
    let headers = ["Id", "Ingridient Name", "Qty", "Unit", "Price", "Action"];
    let table = document.getElementById("tblData");
    let tableHead = createElements(table, "thead", null, null, null, null, null);
    let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
    headers.forEach(headerText => {
        let header = createElements(headerRow, "th", null, null, null, null, "col");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
    });
    let tableBody = createElements(table, "tbody", null, null, null, null, null);
    let ingridientDetail = JSON.parse(localStorage.getItem("ingridientDetail"));
    if (ingridientDetail !== null) {
        ingridientDetail.forEach(per => {
            let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
            let cellId = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodeId = document.createTextNode(per.Id);
            cellId.appendChild(textNodeId);
            let cellname = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodename = document.createTextNode(per.ingridientname);
            cellname.appendChild(textNodename);
            let cellQty = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
            qtyDetail.forEach(e => {
                if (per.qtyId == e.Id) {
                    let textNodeQty = document.createTextNode(e.quantity);
                    cellQty.appendChild(textNodeQty);
                }
            });
            let cellUnit = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
            unitDetail.forEach(e => {
                if (per.unitId == e.Id) {
                    let textNodeUnit = document.createTextNode(e.unit);
                    cellUnit.appendChild(textNodeUnit);
                }
            });
            let cellPrice = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodePrice = document.createTextNode(per.price);
            cellPrice.appendChild(textNodePrice);
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
    let input = document.querySelectorAll(".inputForm");
    let parentTr = editButton.parentNode.parentNode;
    parentTr.style.backgroundColor = "yellow";
    let parentChildren = parentTr.querySelectorAll(".tableEachCell");
    input.forEach(element => {
        let selectType = element.getAttribute("data-isspecial-type");
        switch (selectType) {
            case "username":
                element.value = parentChildren[1].innerText;
                break;
            case "number":
                element.value = parentChildren[4].innerText;
                break;
            case "select":
                if (element.id === "qtySelect") {
                    let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
                    qtyDetail.forEach(el => {
                        if (el.quantity == parentChildren[2].innerText) {
                            element.value = el.Id;
                        }
                    });
                }
                else if (element.id === "unitSelect") {
                    let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
                    unitDetail.forEach(el => {
                        if (el.unit == parentChildren[3].innerHTML) {
                            element.value = el.Id;
                        }
                    });
                }
                break;
        }
    });
}
// Delete User Click Event
function deleteUser(deleteBtn) {
    if (confirm("Do you want to Delete this User?")) {
        let parentTr = deleteBtn.parentNode.parentNode;
        parentTr.parentNode.removeChild(parentTr);
        let userNameToDelete = parentTr.children[1];
        let deleteUser = JSON.parse(localStorage.getItem("ingridientDetail"));
        deleteUser.forEach(function (e, index) {
            if (e.ingridientname === userNameToDelete.innerText) {
                deleteUser.splice(index, 1);
                localStorage.setItem('ingridientDetail', JSON.stringify(deleteUser));
            }
        });
    }
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