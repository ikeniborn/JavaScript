function updateGoogleForm(globalVar) {
  // проверка данных с фактической формы
  var ssFact = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sourceSheetNameFactGoogleForm)
  var arrayFact = getAllData(globalVar, sourceSheetID, sourceSheetNameFactGoogleForm)
  var lastRowFact = ssFact.getLastRow()
  var rowsFact = arrayFact.filter(function (row) {
    return row.date > maxDateFactGoogleFormAccounting
  })

  var checkUpdateFact = updateDataGoogleForm(rowsFact, lastRowFact, ssFact)
  if (checkUpdateFact) {
    //    copyData(sourceSheetID, targetSheetID, sourceSheetNameFactGoogleForm, targetSheetNameFact)
  }
  //  проверка данных с форму бюджета
  var ssBudget = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sourceSheetNameBudgetGoogleForm)
  var arrayBudget = getAllData(globalVar, sourceSheetID, sourceSheetNameBudgetGoogleForm)
  var lastRowBudget = ssBudget.getLastRow()
  var rowsBudget = arrayBudget.filter(function (row) {
    return row.actionDate > maxDateBudgetGoogleFormAccounting
  })
  Logger.log(rowsBudget)
  var checkUpdateBudget = updateDataGoogleForm(rowsBudget, lastRowBudget, ssBudget)
  if (checkUpdateBudget) {
    //    copyData(sourceSheetID, targetSheetID, sourceSheetNameBudgetGoogleForm, targetSheetNameBudget)
  }
}