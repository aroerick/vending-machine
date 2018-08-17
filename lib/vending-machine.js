class VendingMachine {
  constructor(jsonPath) {
    this.data = require(jsonPath)
    this.items = this.data.items
  }

  addCredit(credit, money){
    return credit += money
  }
  makePurchase(row, slot, credit){
    console.log(this.items[row][slot].quantity)
    if(credit >= this.items[row][slot].price && this.items[row][slot].quantity > 0){
      this.items[row][slot].quantity = this.items[row][slot].quantity - 1
      return this.items[row][slot].name
    } else if(credit >= this.items[row][slot].price && this.items[row][slot].quantity === 0) {
      return 'Out of Stock'
    } else {
      return 'Insufficient funds'
    }
  }
}

module.exports = VendingMachine