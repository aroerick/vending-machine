const VendingMachine = require("../lib/vending-machine");
const vendingMachine = new VendingMachine("../lib/vm-inventory.json");

describe("Vending Machine", () => {
  describe("Customer uses", () => {
    describe("When money is inserted", () => {
      it("Should increase customer credit", () => {
        const result = vendingMachine.addCredit(
          vendingMachine.data.credit,
          0.25
        );
        expect(result).toEqual(1.25);
      });
    });
    describe("When item selected without enough credit", () => {
      it("Should ask for more money", () => {
        const result = vendingMachine.makePurchase(
          "a",
          0,
          vendingMachine.data.credit
        );
        expect(result).toEqual("Insufficient funds");
      });
    });
    describe("When item selected is not in stock", () => {
      it("Should inform customer", () => {
        const result = vendingMachine.makePurchase(
          "b",
          0,
          vendingMachine.data.credit
        );
        expect(result).toEqual("Out of Stock");
      });
    });
    describe("When customer has remaining credit after purchase", () => {
      it("Should return change to customer", () => {
        const result = vendingMachine.makeChange(2, 1.55);
        const cash = vendingMachine.data.cash.coins;
        expect(result).toEqual(["quarter", "dime", "dime"]);
        expect(cash.quarter).toEqual(24);
        expect(cash.dime).toEqual(23);
      });
    });
    describe("When item selected is in stock and customer has enough credit", () => {
      it("Should remove item from inventory and give to customer", () => {
        const result = vendingMachine.makePurchase(
          "a",
          1,
          vendingMachine.data.credit
        );
        const inv = vendingMachine.data.items["a"][1].quantity;
        expect(result).toEqual("my-will-to-live,quarter,quarter");
        expect(inv).toEqual(0);
      });
    });
    describe("When customer inserts bill over 10 dollars", () => {
      it("Should return bill to customer", () => {
        const result = vendingMachine.addCredit(0, 20);
        expect(result).toEqual("No");
      });
    });
    describe("When machine does not have enough change", () => {
      it("Should return money and error", () => {
        const result = vendingMachine.makeChange(2, 1.95);
        expect(result).toEqual("No");
      });
    });
    describe("When item is selected with no credit", () => {
      it("Should display item, price and in-stock", () => {
        const result = vendingMachine.makePurchase("a", 0, 0);
        expect(result).toEqual(["chicken-nuggets", 1.5, "In Stock"]);
      });
    });
  });
  describe("Maintenance uses", () => {
    describe("Worker adds change", () => {
      it("Should add provided change to cash count and remove bills", () => {
        const result = vendingMachine.fillCash();
        expect(result.coins["toonie"]).toEqual(30);
        expect(result.coins["loonie"]).toEqual(25);
        expect(result.bills["10"]).toEqual(0);
      });
    });
    describe("Worker adds stock", () => {
      it("Should add provided stock to inventory", () => {
        const result = vendingMachine.fillInventory();
        expect(result["b"][1].quantity).toEqual(result["b"][1]["max-stock"]);
      });
    });
    describe("Worker checks inventory", () => {
      it("Should show quantity for items", () => {
        const result = vendingMachine.printInventory();
        expect(result).toEqual([
          { "chicken-nuggets": 20 },
          { "my-will-to-live": 3 },
          { "coca-cola": 12 },
          { "jingle-all-the-way-on-dvd": 7 }
        ]);
      });
    });
  });
});
