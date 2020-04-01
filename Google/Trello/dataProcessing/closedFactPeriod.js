/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedFactPeriod(postObject) {
  try {
    const postObjectFact0 = copyObject(postObject)
    postObjectFact0.boardId = postObjectFact0.boardIdFact0
    postObjectFact0.listId = getList(postObjectFact0).id
    postObjectFact0.listName = postObjectFact0.cfo + ' ' + formatterDate(postObjectFact0.factPeriod0).date
    //* закрытие листа на доске факт-1
    archiveAllCards(postObjectFact0)
    updateList(postObjectFact0)
    //* Перенос карточек на доску факт-1
    moveAllCards(postObject, postObjectFact0)
    //* обновление текущего листа факта
    updateList(postObject)
    //* создание карточек на листе факт
    createCardsForList(postObject)
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}