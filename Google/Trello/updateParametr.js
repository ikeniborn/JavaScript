// обновление параметра
function updateParametr(postObject, paramentr, value) {
  /*
   * @postObject - входные параметра запроса
   * @paramentr - идентифиактор параметра. Изменяемое
   * @value - значение параметра. Изменяемое
   * */
  try {
    var ss = postObject.parametrSheetOpen
    var indexRow = getParametr(postObject, paramentr).item.indexRow
    ss.getRange(indexRow, 3).setValue(value)
    ss.getRange(indexRow, 4).setValue(formatterDate().timestamp)
  } catch (e) {
    console.error('updateParametr: ' + e)
  }
}