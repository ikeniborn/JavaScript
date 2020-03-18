// обновление параметра
function addFinancialCenter(postObject) {
  /*
   * @postObject - входные параметра запроса
   * */
  try {
    var ss = postObject.financialCenterSheetOpen
    var array = getFinancialСenter(postObject).array
    var cfoArray = array.map(function (array) {
      return array.cfo
    })
    if (cfoArray.indexOf(postObject.cfo) === -1) {
      var newId = cfoArray.length + 1
      ss.appendRow([newId, postObject.cfo, formatterDate().timestamp])
    }
  } catch (e) {
    console.error('addFinancialCenter: ' + e)
  }
}