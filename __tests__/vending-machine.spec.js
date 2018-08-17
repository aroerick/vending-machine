const VendingMachine = require("../lib/vending-machine");
const vendingMachine = new VendingMachine("../lib/vm-inventory.json");

describe("Vending Machine", () => {
  describe("Customer uses", () => {
    describe("When money is inserted", () => {
      it("Should increase customer credit", () => {
        const result = vendingMachine.addCredit(1, 0.25);
        expect(result).toEqual(1.25);
      });
    });
    describe("When item selected without enough credit", () => {
      it("Should ask for more money", () => {
        const result = vendingMachine.makePurchase("a", 0, 1);
        expect(result).toEqual("Insufficient funds");
      });
    });
    describe("When item selected is not in stock", () => {
      it("Should inform customer", () => {
        const result = vendingMachine.makePurchase("a", 1, 1);
        expect(result).toEqual("Out of Stock");
      });
    });
    describe("When item selected is in stock and customer has enough credit", () => {
      it("Should remove item from inventory and give to customer", () => {
        const result = vendingMachine.makePurchase("b", 0, 1.75);
        const inv = vendingMachine.data.items["b"][0].quantity;
        expect(result).toEqual("coca-cola");
        expect(inv).toEqual(10);
      });
    });
    describe("When customer has remaining credit after purchase", () => {
      it("Should return change to customer", () => {
        const result = vendingMachine.makeChange(2, 1.55);
        const cash = vendingMachine.data.cash.coins
        expect(result).toEqual(["quarter", "dime", "dime"]);
        expect(cash.quarter).toEqual(24);
        expect(cash.dime).toEqual(23);
      });
    });
    describe("When customer inserts bill over 10 dollars", () => {
      it("Should return bill to customer", () => {
        const result = vendingMachine.addCredit(0, 20);
        expect(result).toEqual("No");
      });
    });
    //   describe("When machine does not have enough change", () => {
    //     it("Should return money and error", () => {
    //       const result = makeChange(2, 1.95);
    //       expect(result).toEqual("No");
    //     });
    //   });
    //   describe("When item is selected with no credit", () => {
    //     it("Should display item, price and in-stock", () => {
    //       const result = makePurchase('a', 1, 0);
    //       expect(result).toEqual(["chicken-nuggets", 1.5, true]);
    //     });
    //   });
    // });
    // describe("Maintenance uses", () => {
    //   describe("Worker adds change", () => {
    //     it("Should add provided change to cash count and remove bills", () => {
    //       // const result = restockChange('2')
    //       expect(data.cash.change["2"]).toBeGreaterThan(10);
    //     });
    //   });
    //   describe("Worker adds stock", () => {
    //     it("Should add provided stock to inventory", () => {
    //       expect(data.items["jingle-all-the-way-on-dvd"].quantity).toEqual(
    //         data.items["jingle-all-the-way-on-dvd"]["max-stock"]
    //       );
    //     });
    //   });
  });
});
