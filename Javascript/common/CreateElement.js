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