// Unit Value From Local Storage
function unitSelect(unitSelect) {
    let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
    unitDetail.forEach(elem => {
        createElements(unitSelect, "option", "unitOption", null, elem.unit, elem.Id, null)
    });
}

// Quantity Value From Local Storage
function qtySelect(qtySelect) {
    let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
    qtyDetail.forEach(elem => {
        createElements(qtySelect, "option", "qtyOption", null, elem.quantity, elem.Id, null)
    });
}

// function to convert Id To Value
function getQtyIdToValue(element){
    let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
    let qtyValue;
    let qtyValueN;
    qtyDetail.forEach(el =>{
        if(element == el.Id){
             qtyValue = el.quantity;
             qtyValueN = Number(qtyValue);
        }
    });
    return qtyValueN;
}

// function to Ingridient convert  Value To Id
function getIngridientIdToValue(element){
    let ingridientDetail = JSON.parse(localStorage.getItem("ingridientDetail"));
    let ingridientValue;   
    ingridientDetail.forEach(el =>{
        if(element == el.Id){
            ingridientValue = el.ingridientname;
        }
    });
    return ingridientValue;
}

// function to Unit convert  ID To Value
function getUnitIdToValue(element){
    let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
    let unitValue;   
    unitDetail.forEach(el =>{
        if(element == el.Id){
            unitValue = el.unit;
        }
    });
    return unitValue;
}

// function to convert Value To Id
function getQtyValueToId(element){
    let qtyDetail = JSON.parse(localStorage.getItem("qtyDetail"));
    let qtyId;
    qtyDetail.forEach(el =>{
        if(element == el.quantity){
             qtyId = el.Id;
        }
    });
    console.log(qtyId);
    return qtyId;
}
// Function For Ingridient Value To Id
function getIngridientValueToId(element){
    let ingridientDetail = JSON.parse(localStorage.getItem("ingridientDetail"));
    let ingridientId;
    ingridientDetail.forEach(el =>{
        if(element == el.ingridientname){
            ingridientId = el.Id;
        }
    });
    console.log(ingridientId);
    return ingridientId;
}

// function to convert Value To Id
function getUnitValueToId(element){
    let unitDetail = JSON.parse(localStorage.getItem("unitDetail"));
    let unitId;
    unitDetail.forEach(el =>{
        if(element == el.unit){
             unitId = el.Id;
        }
    });
    console.log(unitId);
    return unitId;
}    

function createSelectOption(element){
 for(i=1;i<=10;i++){
    createElements(element, "option", "unitOption", null,i, i, null)
 }   
}

function createMenuValueToId(element){
    let menuDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    let menuId;
    menuDetail.forEach(el =>{
        if(element == el.fooditem){
            menuId = el.Id;
        }
    })
    return menuId;
}

function createMenuIdToValue(element){
    let menuDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
    let menuValue;
    menuDetail.forEach(el =>{
        if(element == el.Id){
            menuValue = el.fooditem;
        }
    });
    return menuValue;
}