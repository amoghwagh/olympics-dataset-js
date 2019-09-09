function convertToDecade(threeDigitYear) {
    const lowerIndex = parseInt(threeDigitYear) * 10;
    const higherIndex = ((parseInt(threeDigitYear) + 1) * 10 - 1);
    const newKey = String(lowerIndex).concat('-').concat(higherIndex);
    return newKey
}

function myObjectMap(curObj,appliedFunction) {
    const obj = {}
    for(const key of Object.keys(curObj)) {
         obj[key] = appliedFunction(curObj[key]);
    }
    return obj;
}

module.exports = {
    convertToDecade,
    myObjectMap
}