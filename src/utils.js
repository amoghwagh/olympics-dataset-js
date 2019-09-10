function convertToDecade(threeDigitYear) {
  const lowerIndex = parseInt(threeDigitYear, 10) * 10;
  const higherIndex = (parseInt(threeDigitYear, 10) + 1) * 10 - 1;
  const newKey = String(lowerIndex)
    .concat('-')
    .concat(higherIndex);
  return newKey;
}

function myObjectMap(curObj, appliedFunction) {
  const obj = {};
  const curObjKeys = Object.keys(curObj);
  // eslint-disable-next-line array-callback-return
  curObjKeys.map(eachKey => {
    obj[eachKey] = appliedFunction(curObj[eachKey]);
  });
  return obj;
}

module.exports = {
  convertToDecade,
  myObjectMap
};
