function ingridientPriceCalculation(inputIngridient, qtySelect, unitSelect) {
    let reciepeRequiredPrice;
    let ingridientDetail = JSON.parse(localStorage.getItem("ingridientDetail"));
    ingridientDetail.forEach(element => {
        if (element.ingridientname == inputIngridient.value) {
            let ingridientQty = getQtyIdToValue(element.qtyId)
            let ingridientPrice = Number(element.price);
            let ingridientUnit = getUnitIdToValue(element.unitId);
            let reciepeRequiredQty = getQtyIdToValue(qtySelect.value);
            let reciepeRequiredUnit = getUnitIdToValue(unitSelect.value);
            if (ingridientUnit === reciepeRequiredUnit) {
                reciepeRequiredPrice = Math.ceil(ingridientPrice / ingridientQty) * reciepeRequiredQty;
            }
            else {
                if (reciepeRequiredUnit == "gram" || reciepeRequiredUnit == "ml") {
                    reciepeRequiredPrice = Math.ceil(ingridientPrice / ingridientQty) * reciepeRequiredQty / 1000;
                }
                else if (reciepeRequiredUnit == "kg" || reciepeRequiredUnit == "litre") {
                    reciepeRequiredPrice = Math.ceil(ingridientPrice / ingridientQty) * reciepeRequiredQty * 1000;
                }
            }
        }
    });
    return reciepeRequiredPrice;
}