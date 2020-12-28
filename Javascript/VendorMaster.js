// Window on Load
window.addEventListener('load', function () {
    userLocalStorageSetUp();
}, false);
// Assign Array To Local Storage
function userLocalStorageSetUp() {
    let vendorDetailP = localStorage.getItem("vendorDetail");
    if (vendorDetailP !== null) {
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
        if (vendorDetail === null) {
            let vendorDetailsArray = [];
            localStorage.setItem("vendorDetail", JSON.stringify(vendorDetailsArray));
          }
        let table = document.getElementById("tblData");
        let headers = ["Id", "Vendor Name", "Mobile Number", "Address", "Email Id", "Action"];
        vendorDetailToLocalStorage(input, vendorDetail, table, headers,this);
    }
});
// Push Vendor Details To The Local Storage.
function vendorDetailToLocalStorage(input, vendorDetail, table, headers,crntBtn) {
    let vendorId =crntBtn.getAttribute("data-uniqueId") === null ? 0 : crntBtn.getAttribute("data-uniqueId");
    let isEditMode = vendorId > 0 ? true : false;
    // let vendor = {};
    let maxId = 0;
    let objectVendorDetail = {};
    if(isEditMode){
        let objIndex = vendorDetail.findIndex((obj) => obj.Id == vendorId);
        input.forEach((element) => {
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
    }    
    else {
        maxId = sort(vendorDetail);
        objectVendorDetail.Id = maxId + 1;
        input.forEach((element) => {
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
    }
    localStorage.setItem("vendorDetail", JSON.stringify(vendorDetail));
    resetInputForm(input, table);
    tableCall(vendorDetail, headers, table);
}
  // Sort Function Of Array Id Number
  function sort(array) {
    let ids = array.map((a) => a.Id);
    let idsLength = 0;
    ids.sort(function (a, b) {
      return b - a;
    });
  
    if (ids.length > 0) {
      idsLength = Number(ids[0]);
    }
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
    let input = document.querySelectorAll(".inputForm");
    let parentTr = editButton.parentNode.parentNode;
    let parentChildren = parentTr.querySelectorAll(".tableEachCell");
    let btnSubmit = document.getElementById("submitBtn");
    btnSubmit.setAttribute("data-uniqueId", parentChildren[0].innerText);
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
    if (confirm("Do you want to Delete this From List?")) {
        let parentTr = deleteBtn.parentNode.parentNode;
        if (parentTr !== null) {
          let vendorId = parentTr.children[0].innerText;
          parentTr.parentNode.removeChild(parentTr);
          let objIndex = vendorDetail.findIndex((obj) => obj.Id == vendorId);
          vendorDetail.splice(objIndex, 1);
          localStorage.setItem("vendorDetail", JSON.stringify(vendorDetail));
        }
    }
}
