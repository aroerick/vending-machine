class VendingMachine {
  constructor(jsonPath) {
    this.data = require(jsonPath);
    this.items = this.data.items;
    this.cash = this.data.cash;
    this.credit = this.data.credit;
  }

  printInventory(){
    const allItems = this.items['a'].concat(this.items['b'])
    let itemList = []
    for(let i = 0; i < this.items['total-items']; i++){
      let name = allItems[i].name
      let quantity = allItems[i].quantity
      itemList.push({ [name] : quantity }) 
    }
    return itemList
  }
  addCredit(credit, money) {
    if(money > 10) return "No";
    credit += money
    return credit;
  }
  makePurchase(row, slot, credit) {
    const item = this.items[row][slot];
    if (credit === 0) {
      return [item.name, item.price, (item.quantity > 0 ? 'In Stock' : 'Out of Stock')]
    } else if (credit >= item.price && item.quantity > 0) {
      item.quantity = item.quantity - 1;
      return (`${item.name},${this.makeChange(credit, item.price)}`);
    } else if (item.quantity === 0) {
      return "Out of Stock";
    } else {
      return "Insufficient funds";
    }
  }
  makeChange(credit, price) {
    let change = Math.round((credit - price) * 100);
    let changeReturn = [];
    while (change > 0) {
      if (change >= 200 && this.cash.coins.toonie > 0) {
        this.cash.coins.toonie -= 1;
        change -= 200;
        changeReturn.push("toonie");
      } else if (change >= 100 && this.cash.coins.loonie > 0) {
        this.cash.coins.loonie -= 1;
        change -= 100;
        changeReturn.push("loonie");
      } else if (change >= 25 && this.cash.coins.quarter > 0) {
        this.cash.coins.quarter -= 1;
        change -= 25;
        changeReturn.push("quarter");
      } else if (change >= 10 && this.cash.coins.dime > 0) {
        this.cash.coins.dime -= 1;
        change -= 10;
        changeReturn.push("dime");
      } else if (change >= 5 && this.cash.coins.nickel > 0) {
        this.cash.coins.nickel -= 1;
        change -= 5;
        changeReturn.push("nickel");
      } else {
        if(change >= 5) {
          this.credit = 0
          return "No"
        } else {
          return changeReturn;
        }
      }
    }
    return changeReturn;
  }
  fillInventory() {
    let allItems = this.items['a'].concat(this.items['b'])
    for(let i = 0; i < this.items['total-items']; i++){
      allItems[i].quantity = allItems[i]["max-stock"]
    }
    return this.items
  }
  fillCash() {
    Object.keys(this.cash.coins).forEach(coin => {
      if(this.cash.coins[coin] < 25) this.cash.coins[coin] += 25
    });
    Object.keys(this.cash.bills).forEach(bill => {
      this.cash.bills[bill] = 0
    });
    return this.cash
  }
}

module.exports = VendingMachine;
