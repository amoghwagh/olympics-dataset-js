function convertToDecade(threeDigitYear) {
    const lowerIndex = parseInt(threeDigitYear) * 10;
    const higherIndex = ((parseInt(threeDigitYear) + 1) * 10 - 1);
    const newKey = String(lowerIndex).concat('-').concat(higherIndex);
    return newKey
}

function myObjectMap(curObj,appliedFunction) {
    for(const key of Object.keys(curObj)) {
         curObj[key] = appliedFunction(curObj[key]);
    }
    return curObj;
}

module.exports = {
    convertToDecade,
    myObjectMap
}