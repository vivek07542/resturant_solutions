// Sort Function Of Array Id Number
function sort(array) {
    if(array !== null){
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
    else{
       let idsLength = 0
       return idsLength; 
    }
}