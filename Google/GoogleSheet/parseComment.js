function parseComment(postData) {
  const text = postData.action.data.text
  const parseData = {}
  parseData.sum = +text.match(/^\d+/)
  parseData.comment = text.split(parseData.sum).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
  return parseData
}