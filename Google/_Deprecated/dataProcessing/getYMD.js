function getYMD(date) {
  try {
    var y = new Date(date).getFullYear()
    var m = new Date(date).getMonth() + 1
    var d = new Date(date).getDate()
    return {
      y: y,
      m: m,
      d: d,
      ymd: y.toString() + m.toString() + d.toString()
    }
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}