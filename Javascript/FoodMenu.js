window.addEventListener("load", function () {
    createFoodItemSelector();
    createTable();
});

function createFoodItemSelector() {
    let foodText = document.getElementById("foodItemSelect");
    let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    let appendValue = document.getElementById("appendValue");
    foodText.addEventListener("keyup", function () {
        autoCompleteFoodItem(foodText, menuReciepeDetail, appendValue);
    });
}

function clickEventForLi(li, input, div) {
    input.value = li.innerText;
    div.style.display = "none";
}

let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function () {
    let inputForm = document.querySelectorAll(".inputForm");
    if (validation(inputForm)) {
        let object = valueToStorage(inputForm);
        updateToLocalStorage(object);
        resetInputForm(inputForm); 
        createTable(object);
    }
});


function valueToStorage(input) {
    let object = {};
    input.forEach(element => {
        let selectType = element.getAttribute("data-isspecial-type");
        switch (selectType) {
            case "select":
                object.fooditem = element.value;
                break;
            case "number":
                object.sellprice = element.value;
                break;
        }
    });
    return object;
}

function updateToLocalStorage(object) {
    debugger;
    let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    let objIndex = menuReciepeDetail.findIndex((obj) => obj.fooditem == object.fooditem);
    menuReciepeDetail[objIndex].sellprice = object.sellprice;
    localStorage.setItem("menuReciepeDetail", JSON.stringify(menuReciepeDetail));
}

function resetInputForm(input) {
    input.forEach(ele => {
        ele.value = "";
        ele.classList.remove("validateGreenBorder");
        ele.classList.remove("validateRedBorder");
    });
    document.getElementById("tblData").innerHTML = "";
    document.getElementById("spanText").style.display = "none";
}

function createTable() {
    let headers = ["Food Item", "Price", "Action"];
    let table = document.getElementById("tblData");
    let tableHead = createElements(table, "thead", null, null, null, null, null, null);
    let headerRow = createElements(tableHead, "tr", null, null, null, null, null, "row");
    headers.forEach(headerText => {
        let header = createElements(headerRow, "th", null, null, null, null, null, "col");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
    });
    let tableBody = createElements(table, "tbody", null, null, null, null, null, null);
    let menuReciepeDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    if (menuReciepeDetail !== null) {
        menuReciepeDetail.forEach(per => {
            let row = createElements(tableBody, "tr", "tableEachRow", null, null, null, "row");
            let cellFooditem = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
            let textNode = document.createTextNode(per.fooditem);
            cellFooditem.appendChild(textNode);
            let cellFoodPrice = createElements(row, "td", "tableEachCell eachInputItem", null, null, null, "col");
            let textNodeId = document.createTextNode(per.sellprice);
            cellFoodPrice.appendChild(textNodeId);
            let cellBtn = createElements(row, "td", "d-flex justify-content-around", "action", null, null, null, null);
            let editBtn = createElements(cellBtn, "button", "btn btn-primary ", null, "Edit", null, null, "col")
            editBtn.addEventListener("click", function () {
                editClick(editBtn);
            });
            let deleteBtn = createElements(cellBtn, "button", "btn btn-primary ", null, "Delete", null, null, "col")
            deleteBtn.addEventListener("click", function () {
                deleteClick(deleteBtn);
            });
        });
    };
}
function editClick(editBtn){
    let parentTr = editBtn.parentElement.parentElement;
    let input = document.querySelectorAll(".inputForm");
    input.forEach(element => {
        let selectType = element.getAttribute("data-isspecial-type");
        switch (selectType) {
            case "select":
                element.value = parentTr.children[0].innerText;
                break;
            case "number":
                element.value = parentTr.children[1].innerText;
                break;
        }
    });
}
function deleteClick(deleteBtn){
    let parentTr = deleteBtn.parentElement;
    parentTr.parentElement.remove(parentTr);
}