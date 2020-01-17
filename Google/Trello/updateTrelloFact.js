// variables
var apiKey = '9dae7dd3ce328d61e67edb4557149502'
var apiToken = getTokenTrello() // get token for session
var apiRoot = 'https://api.trello.com/1/'
var boardId = '5e05161dc3abef51fcf4e761'
var sourceSheetID = '10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E'
var sourceSheetName = 'trelloFact'
var metadataSheetName = 'period'
var targetSheetID = '1mBsaVLbKLoIXN2WY9Oi-XBPbViwbCt29gozLkOL5sLc'
var targetSheetName = 'Факт'
// getMetadata(sourceSheetID, sourceSheetName) получение данных по периодам.
var factPeriodNow = getMetadata(sourceSheetID, metadataSheetName)[0][0]
var factPeriodPrev = getMetadata(sourceSheetID, metadataSheetName)[1][0]
var revenueDayIlya = getMetadata(sourceSheetID, metadataSheetName)[0][2]
var revenueDayOksana = getMetadata(sourceSheetID, metadataSheetName)[0][3]
//  getDirItem() получение справочника статей
var dirItem = getDirItem() // получение справочника статей
var currDate = new Date().getDate()

function updateTrelloFact() {
  // get sheet Google
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sourceSheetName)

  // get last data from board. Function return array with next attribute [commentDate, userName, listName, nomenclatureName, sumData, comment]
  // loadFromTrello(apiKey, apiToken, apiRoot, boardId, sourceSheetID, sourceSheetName)
  var lastDataFromTrello = loadFromTrello(apiKey, apiToken, apiRoot, boardId, sourceSheetID, sourceSheetName)

  for (var i = 0; i < lastDataFromTrello.length; i++) {
    var commentDate = new Date(lastDataFromTrello[i][0])
    var userName = lastDataFromTrello[i][1]
    var listName = lastDataFromTrello[i][2]
    var nomenclatureName = lastDataFromTrello[i][3]
    var sumData = lastDataFromTrello[i][4]
    var commentData = lastDataFromTrello[i][5]
    var factPeriod = []
    if (factPeriodPrev.length == 0) {
      factPeriod = factPeriodNow
    } else {
      if (listName !== 'Оксана') {
        if (currDate >= revenueDayIlya) {
          factPeriod = factPeriodNow
        } else {
          factPeriod = factPeriodPrev
        }
      } else {
        if (currDate >= revenueDayOksana) {
          factPeriod = factPeriodNow
        } else {
          factPeriod = factPeriodPrev
        }
      }
    }
    var dataDirItem = dirItem.filter(function (row) {
      return row[0] == nomenclatureName
    })
    var billName = dataDirItem[0][2]
    var itemName = dataDirItem[0][1]

    ss.appendRow([commentDate, factPeriod, listName, listName, billName, itemName, nomenclatureName, sumData, commentData, userName])
    //            Обновление даты зарплаты
    if (itemName == 'Зарплата') {
      // update date for budget period. Start with next parametr (sheetID, SheetName, commentDate, listName)
      updateRevenueDate(sourceSheetID, metadataSheetName, commentDate, listName)
    }
  }
  // Удаление пустых строк
  var maxRows = ss.getMaxRows()
  var lastRow = ss.getLastRow()
  if (maxRows - lastRow != 0) {
    ss.deleteRows(lastRow + 1, maxRows - lastRow)
  }

  // copyData(sourceSheetID, targetSheetID, sourceSheetName, targetSheetName) копирование данных из истоничка в учет
  copyData(sourceSheetID, targetSheetID, sourceSheetName, targetSheetName)
}