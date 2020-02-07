/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedFactPeriod(postObject) {
  try {
    var accountItems = getAccountingItem().filter(function (row) {
      return row.fact == 1
    })
    var listFactId0 = getList(boardIdFact0, postObject.cfo).id
    var listFactId = getList(boardIdFact, postObject.cfo).id
    archiveAllCards(listFactId0)
    moveAllCards(listFactId, boardIdFact0, listFactId0)
    var period0 = getPeriod(boardIdFact0, postObject.cfo)
    var listNameFact0 = postObject.cfo + ' ' + formatterDate(period0.period)
    updateList(listFactId, listNameFact0)

    //*
    var period = getPeriod(boardIdFact, postObject.cfo)
    var listNameFact = postObject.cfo + ' ' + formatterDate(period.period)
    updateList(listFactId, listNameFact)
    //* создание карточек на листе факт и чеклистов в карточках
    var cardInfo = {}
    var budget = getCurrData(getAllData(targetSheetID, targetSheetNameBudget), period.ymd)
    accountItems.forEach(function (accounts) {
      cardInfo = addCard(encodeData(accounts.nomenclature, '+'), listFactId)
      cardInfo.withBudget = budget.reduce(function (row, arrya) {
        if (arrya.cfo == postObject.cfo && cardInfo.name == arrya.nomenclature) {
          row += 1
        }
        return row
      }, 0)

      if (cardInfo.withBudget > 0) {
        var checkListId = addCheckList(cardInfo.id, 'Бюджет').id
      }

      var budgetRow = budget.reduce(function (row, arrya) {
        if (arrya.cfo == postObject.cfo && cardInfo.name == arrya.nomenclature) {
          arrya.checkListId = checkListId
          row.push(arrya)
        }
        return row
      }, [])
      budgetRow.forEach(function (row) {
        addCheckListItem(row.checkListId, row.sum + ' ' + row.comment)
      })
    })
  } catch (e) {
    console.log(e)
  }
}