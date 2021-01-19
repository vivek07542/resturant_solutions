// Window On Load
window.addEventListener('load', function () {
    userLocalStorageSetUp();
    tableCall();
}, false);

// Empty Array To local Storage
function userLocalStorageSetUp() {
    let investmentExpenseDetail = localStorage.getItem("investmentExpenseDetail");
    if (investmentExpenseDetail === null) {
        let investmentExpenseArray = [];
        localStorage.setItem("investmentExpenseDetail", JSON.stringify(investmentExpenseArray));
        // document.getElementById("tableDiv").style.display = "none";
    }
}
// Add Button Click Event
let submitBtn = document.getElementById("submitBtn");
// Call Click Event Of Submit Button
submitBtn.addEventListener("click", function () {
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        monthlyExpenseToLocalStorage(this);
        resetInputForm(inputForm);
        tableCall();
    }
});
// Push Vendor Details To The Local Storage.
function monthlyExpenseToLocalStorage(crntBtn) {
    let objectDetail = {};
    let table = document.getElementById("tblData");
    let input = document.querySelectorAll(".inputForm");
    let investmentExpenseDetail = JSON.parse(localStorage.getItem("investmentExpenseDetail"));
    let expenseId = crntBtn.getAttribute("data-uniqueId") === null ? 0 : crntBtn.getAttribute("data-uniqueId");
    let isEditMode = expenseId > 0 ? true : false;
    let maxId = 0;    
    if (isEditMode) {
        let objIndex = investmentExpenseDetail.findIndex((obj) => obj.Id == expenseId);
        input.forEach(element => {
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "date":
                    investmentExpenseDetail[objIndex].date = element.value;
                    break;
                case "expense":
                    investmentExpenseDetail[objIndex].expense = element.value;
                    break;
                case "budgetExpense":
                    investmentExpenseDetail[objIndex].amount = element.value;
                    break;    
            }
        });
    } 
    else{
        maxId = sort(investmentExpenseDetail);
        objectDetail.Id = maxId + 1;
        input.forEach(element => {
            let selectType = element.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "date":
                    objectDetail.date = element.value;
                    break;
                case "expense":
                    objectDetail.expense = element.value;
                    break;
                case "budgetExpense":
                    objectDetail.amount = element.value;
                    break;
            }
        });
        investmentExpenseDetail.push(objectDetail);
    }   
    localStorage.setItem("investmentExpenseDetail", JSON.stringify(investmentExpenseDetail));
}
// Reset Function
function resetInputForm(input) {
    input.forEach(ele => {
        if(ele.id !== "totalPriceInput"){
            ele.value = "";
            ele.classList.remove("validateGreenBorder");
            ele.classList.remove("validateRedBorder");
        }        
    });
    document.getElementById("tblData").innerHTML = "";
    document.getElementById("spanText").style.display = "none";
}
// Create Table
function tableCall() {
    let headers = ["Id", "Expense Detail", "Month", "Amount","Action"];

    let table = document.getElementById("tblData");
    let tableStructure = createElements(table, "table", "tableStructure", null, null, null, null);
    let tableHead = createElements(tableStructure, "thead", null, null, null, null, null);
    let headerRow = createElements(tableHead, "tr", null, null, null, null, "row");
    headers.forEach(headerText => {
        let header = createElements(headerRow, "th", null, null, null, null, "col");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
    });
    let tableBody = createElements(tableStructure, "tbody", null, null, null, null, null);
    let investmentExpenseDetail = JSON.parse(localStorage.getItem("investmentExpenseDetail"));
    if (investmentExpenseDetail !== null || investmentExpenseDetail !== undefined) {
        investmentExpenseDetail.forEach(per => {
            let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
            let cellId = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodeId = document.createTextNode(per.Id);
            cellId.appendChild(textNodeId);
            let cellname = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodename = document.createTextNode(per.expense);
            cellname.appendChild(textNodename);
            let cellMonth = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodeMonth = document.createTextNode(per.date);
            cellMonth.appendChild(textNodeMonth);
            let cellPrice = createElements(row, "td", "tableEachCell", null, null, null, "col");
            let textNodePrice = document.createTextNode(per.amount);
            cellPrice.appendChild(textNodePrice);
            let cellBtn = createElements(row, "td", "d-flex justify-content-around", "action", null, null, null);
            let editButton = createElements(cellBtn, "button", "btn btn-outline-dark", null, "Edit", null, "col")
            editButton.addEventListener("click", function () {
                editClick(editButton);
            });
            let deleteBtn = createElements(cellBtn, "button", "btn btn-outline-dark", null, "Delete", null, "col")
            deleteBtn.addEventListener("click", function () {
                deleteUser(deleteBtn,investmentExpenseDetail);
            });
        });
        let priceContainer = createElements(table, "div", "col-12 py-2 form-inline d-flex justify-content-around", null, null, null, null);
        let netPriceLabel = createElements(priceContainer, "label", "form-label", null, " Budget Left :", null, null);
        let input = document.querySelectorAll(".inputForm");
        let totalAmount;
        input.forEach(e =>{
            debugger;
            let selectType = e.getAttribute("data-isspecial-type");
            switch (selectType) {
                case "budgetAllocated":
                     totalAmount = e.value
                    break;
            }
        });
        console.log(totalAmount);
        let totalExpense = totalAmountExpense(investmentExpenseDetail,totalAmount)
        let netPriceSpan = createElements(priceContainer, "span", "form-control inputItem", "reciepeTextSpan", totalExpense, null, null);
    };
}

function totalAmountExpense(investmentExpenseDetail,totalAmount){
    
    investmentExpenseDetail.forEach(e =>{
        totalAmount -= Number(e.amount);
    });
    return totalAmount
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
            case "date":
            element.value = parentChildren[2].innerText;
                break;
            case "expense":
            element.value = parentChildren[1].innerText;
                break;
            case "budgetExpense":
            element.value = parentChildren[3].innerText;
               break;
        }
    });
}
// Delete User Click Event
function deleteUser(deleteBtn,investmentExpenseDetail) {
    if (confirm("Do you want to Delete this From List?")) {
        let input = document.querySelectorAll(".inputForm");
        let parentTr = deleteBtn.parentNode.parentNode;
        if(parentTr !== null){
            let expenseId = parentTr.children[0].innerText;
            parentTr.parentNode.removeChild(parentTr);
            let objIndex = investmentExpenseDetail.findIndex((obj) => obj.Id == expenseId);
            investmentExpenseDetail.splice(objIndex, 1);
            localStorage.setItem('investmentExpenseDetail', JSON.stringify(investmentExpenseDetail));
            resetInputForm(input)
            tableCall();
        }
    }
}
