// Window On Load
window.addEventListener('load', function () {
    userLocalStorageSetUp();
    let qtySelectId = document.getElementById("qtySelectId");
    let unitSelectId = document.getElementById("unitSelectId");
    qtySelect(qtySelectId); 
    unitSelect(unitSelectId);
    tableCall();
}, false);

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
        ingridientDetailToLocalStorage(this);
    }
});
// Push Vendor Details To The Local Storage.
function ingridientDetailToLocalStorage(crntBtn) {
    let objectDetail = {};
    let table = document.getElementById("tblData");
    let input = document.querySelectorAll(".inputForm");
    let ingridientDetail = JSON.parse(localStorage.getItem("ingridientDetail"));
    let ingridientId = crntBtn.getAttribute("data-uniqueId") === null ? 0 : crntBtn.getAttribute("data-uniqueId");
    let isEditMode = ingridientId > 0 ? true : false;
    let maxId = 0;    
    if (isEditMode) {
        let objIndex = ingridientDetail.findIndex((obj) => obj.Id == ingridientId);
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
        ingridientDetail[objIndex].qtyId = document.getElementById("qtySelectId").value;
        ingridientDetail[objIndex].unitId = document.getElementById("unitSelectId").value;
    } 
    else{
        maxId = sort(ingridientDetail);
        objectDetail.Id = maxId + 1;
        input.forEach(element => {
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
        objectDetail.qtyId = document.getElementById("qtySelectId").value;
        objectDetail.unitId = document.getElementById("unitSelectId").value;
        ingridientDetail.push(objectDetail);
    }   
    localStorage.setItem("ingridientDetail", JSON.stringify(ingridientDetail));
    resetInputForm(input);
    tableCall();
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
    if (ingridientDetail !== null || ingridientDetail !== undefined) {
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
                deleteUser(deleteBtn,ingridientDetail);
            });
        });
    };
}
// Function for Edit
function editClick(editButton) {
    let input = document.querySelectorAll(".inputForm");
    let parentTr = editButton.parentNode.parentNode;
    let parentChildren = parentTr.querySelectorAll(".tableEachCell");
    let btnSubmit = document.getElementById("submitBtn");
    btnSubmit.setAttribute("data-uniqueId", parentChildren[0].innerText);
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
                if (element.id === "qtySelectId") {
                    let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
                    qtyDetail.forEach(el => {
                        if (el.quantity == parentChildren[2].innerText) {
                            element.value = el.Id;
                        }
                    });
                }
                else if (element.id === "unitSelectId") {
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
function deleteUser(deleteBtn,ingridientDetail) {
    if (confirm("Do you want to Delete this From List?")) {
        let parentTr = deleteBtn.parentNode.parentNode;
        if(parentTr !== null){
            let ingridientId = parentTr.children[0].innerText;
            parentTr.parentNode.removeChild(parentTr);
            let objIndex = ingridientDetail.findIndex((obj) => obj.Id == ingridientId);
            ingridientDetail.splice(objIndex, 1);
            localStorage.setItem('ingridientDetail', JSON.stringify(ingridientDetail));
        }
    }
}
