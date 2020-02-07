function addCheckListItem(checkListId, nameItem) {
  var globalVar = getVariable()
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(globalVar.apiRoot + 'checklists/' + checkListId + '/checkItems?name=' + nameItem + '&pos=bottom&checked=false&' + globalVar.keyAndToken, data)
  var variable = {}
  variable.id = JSON.parse(resp).id
  variable.name = JSON.parse(resp).name
  return variable
}