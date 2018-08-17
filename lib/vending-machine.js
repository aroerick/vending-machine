class VendingMachine {
  constructor(jsonPath) {
    this.data = require(jsonPath);
    this.items = this.data.items;
    this.cash = this.data.cash;
  }

  addCredit(credit, money) {
    if (money > 10) return "No";
    return (credit += money);
  }
  makePurchase(row, slot, credit) {
    const item = this.items[row][slot];
    if (credit >= item.price && item.quantity > 0) {
      item.quantity = item.quantity - 1;
      return item.name;
    } else if (credit >= item.price && item.quantity === 0) {
      return "Out of Stock";
    } else {
      return "Insufficient funds";
    }
  }
  makeChange(credit, price) {
    let change = Math.round((credit - price) * 100)
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
      } else if (change >= 1 && this.cash.coins.dime > 0) {
        this.cash.coins.dime -= 1;
        change -= 10;
        changeReturn.push("dime");
      } else if (change >= 5 && this.cash.coins.nickel > 0) {
        this.cash.coins.nickel -= 1;
        change -= 5;
        changeReturn.push("nickel");
      } else {
        return changeReturn
      }
    }
    return changeReturn;
  }
}

module.exports = VendingMachine;
