function updateList(postObject, listName) {
  /*
   * @postObject - входные параметра запроса
   * @listName - входной параметр нового имени листа trello
   **/
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + postObject.listId + '?name=' + listName + '&' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('updateList: ' + e)
  }
}