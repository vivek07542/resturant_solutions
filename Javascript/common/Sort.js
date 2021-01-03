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