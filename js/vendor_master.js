// Window on Load
window.addEventListener('load', function () {
    userLocalStorageSetUp();
}, false);
// Assign Array To Local Storage
function userLocalStorageSetUp() {
    let vendorDetailP = localStorage.getItem("vendorDetail");
    if (vendorDetailP === null) {
        let vendorDetailsArray = [];
        localStorage.setItem("vendorDetail", JSON.stringify(vendorDetailsArray));
        document.getElementById("tableDiv").style.display = "none";
    }
    else {
        let vendorDetail = JSON.parse(localStorage.getItem("vendorDetail"));
        let headers = ["Id", "Vendor Name", "Mobile Number", "Address", "Email Id", "Action"];
        let table = document.getElementById("tblData");
        tableCall(vendorDetail, headers, table);
    }
}
// Click Button On Add Event
let submitBtn = document.getElementById("submitBtn");
// Call Click Event Of Submit Button
submitBtn.addEventListener("click", function () {
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        alert("Succesfully Validate");
        let input = document.querySelectorAll(".inputForm");
        let vendorDetail = JSON.parse(localStorage.getItem("vendorDetail"));
        let table = document.getElementById("tblData");
        let headers = ["Id", "Vendor Name", "Mobile Number", "Address", "Email Id", "Action"];
        vendorDetailToLocalStorage(input, vendorDetail, table, headers);
    }
});
// Push Vendor Details To The Local Storage.
function vendorDetailToLocalStorage(input, vendorDetail, table, headers) {
    let objectVendorDetail = {};
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
        if (vendorDetail.length !== 0) {
            var lengthOfId = sort(vendorDetail);
        }
        else {
            lengthOfId = 0;
        }
        objectVendorDetail.Id = lengthOfId + 1;
        input.forEach(element => {
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "username":
                    objectVendorDetail.vendorname = element.value;
                    break;
                case "email":
                    objectVendorDetail.email = element.value;
                    break;
                case "address":
                    objectVendorDetail.address = element.value;
                    break;
                case "telephone":
                    objectVendorDetail.number = element.value;
                    break;
            }
        });
        vendorDetail.push(objectVendorDetail);
        localStorage.setItem("vendorDetail", JSON.stringify(vendorDetail));
    }
    else {
        let selectedTds = selectedTr.querySelectorAll(".tableEachCell");
        for (i = 0; i < selectedTds.length; i++) {
            let objIndex = vendorDetail.findIndex((obj => obj.Id == selectedTds[i].innerText));
            input.forEach(element => {
                let selectType = element.getAttribute("data-isspecial-type");
                switch (selectType) {
                    case "username":
                        vendorDetail[objIndex].vendorname = element.value;
                        break;
                    case "email":
                        vendorDetail[objIndex].email = element.value;
                        break;
                    case "address":
                        vendorDetail[objIndex].address = element.value;
                        break;
                    case "telephone":
                        vendorDetail[objIndex].number = element.value;
                        break;
                }
            });
            localStorage.setItem("vendorDetail", JSON.stringify(vendorDetail));
            break;
        }
    }
    resetInputForm(input, table);
    tableCall(vendorDetail, headers, table);
}
// Sort Function Of Array Id Number
function sort(array) {
    let ids = array.map(a => a.Id);
    ids.sort(function (a, b) { return b - a });
    let idsLength = Number(ids[0]);
    return idsLength;
}
// Reset Function
function resetInputForm(input, table) {
    input.forEach(ele => {
        ele.value = "";
        ele.classList.remove("validateGreenBorder");
        ele.classList.remove("validateRedBorder");
    });
    table.innerHTML = "";
    document.getElementById("spanText").style.display = "none";
}
//  Create Table 
function tableCall(vendorDetail, headers, table) {
    let tableHead = createElements(table, "thead", null, null, null, null, null);
    let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
    headers.forEach(headerText => {
        let header = createElements(headerRow, "th", null, null, null, null, "col");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
    });
    let tableBody = createElements(table, "tbody", null, null, null, null, null);
    if (vendorDetail !== null) {
        vendorDetail.forEach(per => {
            let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
            Object.values(per).forEach(text => {
                let cell = createElements(row, "td", "tableEachCell", null, null, null, "col");
                let textNode = document.createTextNode(text);
                cell.appendChild(textNode);
            })
            let cellBtn = createElements(row, "td", "d-flex justify-content-around", "action", null, null, null);
            let editButton = createElements(cellBtn, "button", "btn btn-outline-dark", null, "Edit", null, "col")
            editButton.addEventListener("click", function () {
                editClick(editButton);
            });
            let deleteBtn = createElements(cellBtn, "button", "btn btn-outline-dark", null, "Delete", null, "col")
            deleteBtn.addEventListener("click", function () {
                deleteUser(deleteBtn, vendorDetail);
            });
        });
    };
}
// Function for Edit
function editClick(editButton) {
    debugger;
    let input = document.querySelectorAll(".inputForm");
    let parentTr = editButton.parentNode.parentNode;
    parentTr.style.background = "yellow";
    let parentChildren = parentTr.querySelectorAll(".tableEachCell");
    for (i = 1; i < parentChildren.length; i++) {
        for (j = 0; j < input.length; j++) {
            if (i === (j + 1)) {
                input[j].value = parentChildren[i].innerText;
            }
        }
    }
}
// Delete User Click Event
function deleteUser(deleteBtn, vendorDetail) {
    if (confirm("Do you want to Delete this User?")) {
        let parentTr = deleteBtn.parentNode.parentNode;
        parentTr.parentNode.removeChild(parentTr);
        let userNameToDelete = parentTr.children[0];
        // let deleteUser = JSON.parse(localStorage.getItem("vendorDetail"));
        vendorDetail.forEach(function (e, index) {
            if (e.vendorname === userNameToDelete.innerText) {
                vendorDetail.splice(index, 1);
                localStorage.setItem('vendorDetail', JSON.stringify(vendorDetail));
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