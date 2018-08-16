const vend = require('../lib/vending-machine')

describe('Vending Machine', () => {

  describe('Customer uses', () => {
    describe('When money is inserted', () => {
      it('Should increase customer credit', () => {
      })
    })
    describe('When item selected without enough credit', () => {
      it('Should ask for more money', () => {
      })
    })
    describe('When item selected is not in stock', () => {
      it('Should inform customer', () => {
      })
    })
    describe('When item selected is in stock and customer has enough credit', () => {
      it('Should remove item from inventory and give to customer', () => {
      })
    })
    describe('When customer has remaining credit after purchase', () => {
      it('Should return change to customer', () => {
      })
    })
    describe('When customer inserts bill over 10 dollars', () => {
      it('Should return bill to customer', () => {
      })
    })
    describe('When machine does not have enough change', () => {
      it('Should return money and error', () => {
      })
    })
    describe('When item is selected with no credit', () => {
      it('Should display price and stock', () => {
      })
    })
  })
})