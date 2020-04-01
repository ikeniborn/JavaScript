// форматирование даты
function formatterDate(date) {
  try {
    if (date == undefined) {
      date = new Date()
    }
    const formatter = {}
    formatter.date = Utilities.formatDate(new Date(date), 'GMT+3', 'dd.MM.yyyy')
    formatter.time = Utilities.formatDate(new Date(date), 'GMT+3', 'dd.MM.yyyy HH:mm')
    formatter.timestamp = Utilities.formatDate(new Date(date), 'GMT+3', 'dd.MM.yyyy HH:mm:ss')
    return formatter
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}