
function autoComplete(input, array, div) {
    let emptyArray = [];
    array.forEach(element => {
        let matchValue = element.ingridientname.match(input.value);
        if (matchValue !== null) {
            let objIndex = array.findIndex((obj => obj.ingridientname == matchValue.input));
            let object = {};
            object.Id = array[objIndex].Id;
            object.ingridientname = array[objIndex].ingridientname;
            div.style.display = "flex";
            emptyArray.push(object);
            callFunction(emptyArray, div, input);
        }
        else {
            let inputValue = input.value;
            let inputLength = inputValue.length;
            if (inputLength > 6) {
                if (confirm("This Ingridient Not In List..Please Click to Add")) {
                    window.location.href = "IngridientMaster.html";
                }
            }
        }
    });
}
// Create Ul Li Using Array 
function callFunction(emptyArray, div, input) {
    div.innerHTML = "";
    emptyArray.forEach(el => {
        let ingridientUl = createElements(div, "ul", "col-12 ingridientNameUl", null, null, null, null);
        let ingridientli = createElements(ingridientUl, "li", "col-12 ingridientNameLi", null, el.ingridientname, null, null)
        ingridientli.addEventListener("click", function () {
            clickEventForLi(ingridientli, input, div);
        });
    });
}

// Click Event on Li 
// function clickEventForLi(li, input, div) {
//     input.value = li.innerText;
//     div.style.display = "none";
// }


function autoCompleteFoodItem(input, array, div){
    let emptyArray = [];
    array.forEach(element => {
        let matchValue = element.fooditem.match(input.value);
        if (matchValue !== null) {
            let objIndex = array.findIndex((obj => obj.fooditem == matchValue.input));
            let object = {};
            object.Id = array[objIndex].Id;
            object.fooditem = array[objIndex].fooditem;
            div.style.display = "flex";
            emptyArray.push(object);
            callFunctionItem(emptyArray, div, input);
        }
        else {
            let inputValue = input.value;
            let inputLength = inputValue.length;
            if (inputLength > 6) {
                if (confirm("This Ingridient Not In List..Please Click to Add")) {
                    window.location.href = "IngridientReciepe.html";
                }
            }
        }
    });
}
// Create Ul Li Using Array 
function callFunctionItem(emptyArray, div, input) {
    div.innerHTML = "";
    emptyArray.forEach(el => {
        let foodItemUl = createElements(div, "ul", "col-12 ingridientNameUl", null, null, null, null);
        let foodItemli = createElements(foodItemUl, "li", "col-12 ingridientNameLi", null, el.fooditem, null, null)
        foodItemli.addEventListener("click", function () {
            clickEventForLi(foodItemli, input, div);
        });
    });
}

// Vendor AutoComplet
function autoCompleteVendor(input, array, div){
    let emptyArray = [];
    array.forEach(element => {
        let matchValue = element.vendorname.match(input.value);
        if (matchValue !== null) {
            let objIndex = array.findIndex((obj => obj.vendorname == matchValue.input));
            let object = {};
            object.Id = array[objIndex].Id;
            object.vendorname = array[objIndex].vendorname;
            div.style.display = "flex";
            emptyArray.push(object);
            callFunctionVendor(emptyArray, div, input);
        }
        else {
            let inputValue = input.value;
            let inputLength = inputValue.length;
            if (inputLength > 6) {
                if (confirm("This Vendor Not In List..Please Click to Add")) {
                    window.location.href = "VendorMaster.html";
                }
            }
        }
    });
}

// Create Ul Li Using Array 
function callFunctionVendor(emptyArray, div, input) {
    div.innerHTML = "";
    emptyArray.forEach(el => {
        let vendorUl = createElements(div, "ul", "col-12 ingridientNameUl", null, null, null, null);
        let vendorli = createElements(vendorUl, "li", "col-12 ingridientNameLi", null, el.vendorname, null, null)
        vendorli.addEventListener("click", function () {
            clickEventForLi(vendorli, input, div);
        });
    });
}