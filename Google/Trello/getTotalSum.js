function getTotalSum(postObject, source, type) {
  /*
   * @source - истоник: buffer, account
   * @type - тип данных: fact, budget, target
   */
  try {
    var currData = getCurrData(getAllData(postObject, source, type), postObject.ymd)
    var total = {}
    //* сумма по счету
    total.bill = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье
    total.account = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре
    total.nomenclature = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье приход
    total.income = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == 'Приход') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье расход
    total.expense = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == 'Расход') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье остатки
    total.rest = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == 'Остатки') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* данные из учета
    total.row = currData.filter(function (array) {
      return array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature
    })
    //* данные по статьям с агрегацией
    var groupData = currData.reduce(function (newArray, array) {
      if (array.cfo == postObject.cfo) {
        if (!newArray[array.account]) {
          newArray[array.account] = {}
          newArray[array.account].bill = array.bill
          newArray[array.account].account = array.account
          newArray[array.account].sum = 0
        }
        newArray[array.account].sum += array.sum
      }
      return newArray
    }, {})
    total.rows = Object.keys(groupData).map(function (k) {
      const item = groupData[k]
      return {
        bill: item.bill,
        account: item.account,
        sum: item.sum
      }
    })
    total.rows.sort(function (a, b) {
      var nameA = a.bill.toLowerCase()
      var nameB = b.bill.toLowerCase()
      if (nameA < nameB) // сортируем строки по возрастанию
        return -1
      if (nameA > nameB)
        return 1
      return 0 // Никакой сортировки
    })
    return total
  } catch (e) {
    console.error('getTotalSum: ' + e)
  }
}