'use strict'


describe("Gilded Rose", function() {
    describe("Normal", function() {

        it("when item is added, it should have properties name, sell_in, quality", function() {
            const item = new Item('name', 4, 10)
            expect(item.name).toBe('name')
            expect(item.sell_in).toBe(4)
            expect(item.quality).toBe(10)
        })

        it("check the length of current items is correct ", function() {
            items = []
            items.push(new Item('name 1', 20, 30))
            expect(items.length).toBe(1)
            items.push(new Item('name 2', 5, 10))
            expect(items.length).toBe(2)

        })


        it("check the sell_in and quality value of 1 item after 1 day ", function() {
            items = []
            items.push(new Item('+5 Dexterity Vest', 10, 20));


            update_quality()
            expect(items[0].sell_in).toEqual(9)
            expect(items[0].quality).toEqual(19)


        })

        it("given a sell_in of 3 and a quality of 2 and it should not be less than zero after 2 days", function() {
            items = []
            items.push(new Item('+5 Dexterity Vest', 3, 2));


            update_quality()
            update_quality()
            expect(items[0].sell_in).toEqual(1)
            expect(items[0].quality).toEqual(0)

            update_quality()
            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(0)


        })

        it("given a sell_in of 1 and a quality of 20 and the quality should be reduced by 2 when sell_in less than zero", function() {
            items = []
            items.push(new Item('+5 Dexterity Vest', 1, 20));


            update_quality()

            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(19)

            update_quality()
            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(17)

            update_quality()
            expect(items[0].sell_in).toEqual(-2)
            expect(items[0].quality).toEqual(15)


        })

        it("given a sell_in of 1 and a quality of 4 and the quality should be reduced by 2 when sell_in less than zero but it should never be negative", function() {
            items = []
            items.push(new Item('+5 Dexterity Vest', 1, 4));


            update_quality()

            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(3)

            update_quality()
            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(1)

            update_quality()
            expect(items[0].sell_in).toEqual(-2)
            expect(items[0].quality).toEqual(0)


            update_quality()
            expect(items[0].quality).toEqual(0)

        })

    })

    describe("Special - Aged Brie", function() {

        it("given aged brie with sell_in of 2 and quality of 3, as sell_in decreases by 1, quality should increase by 1", function() {
            items = []
            items.push(new Item('Aged Brie', 2, 3))


            update_quality()
            expect(items[0].sell_in).toEqual(1)
            expect(items[0].quality).toEqual(4)

        })

        it("given aged brie with sell_in of 0 and quality of 0, as sell_in decreases by 1, quality should increase by 2", function() {
            items = []
            items.push(new Item('Aged Brie', 0, 0))


            update_quality()
            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(2)


        })

        it("given aged brie with sell_in of 1 and quality of 3, as sell_in goes into negitives, quality should increase by 2", function() {
            items = []
            items.push(new Item('Aged Brie', 1, 3))


            update_quality()
            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(4)
            update_quality()
            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(6)
            update_quality()
            expect(items[0].sell_in).toEqual(-2)
            expect(items[0].quality).toEqual(8)


        })

        it("given aged brie with sell_in of 1 and quality of 46, as sell_in goes into negitives, quality should increase by 2, but should not cross 50", function() {
            items = []
            items.push(new Item('Aged Brie', 1, 46))


            update_quality()
            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(47)
            update_quality()
            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(49)
            update_quality()
            expect(items[0].sell_in).toEqual(-2)
            expect(items[0].quality).toEqual(50)
            update_quality()
            expect(items[0].sell_in).toEqual(-3)
            expect(items[0].quality).toEqual(50)

        })

    })

    describe("Sulfuras", function() {
        it("when Sulfurus is added, sell_in and quantity should not decrease", function() {
            items = []
            items.push(new Item('Sulfuras, Hand of Ragnaros', 4, 10))

            expect(items[0].sell_in).toBe(4)
            expect(items[0].quality).toBe(10)
            update_quality()
            expect(items[0].sell_in).toBe(4)
            expect(items[0].quality).toBe(10)
        })

        it("when Sulfurus is added, sell_in of -1 should not decrease", function() {
            items = []
            items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 10))

            expect(items[0].sell_in).toBe(-1)
            expect(items[0].quality).toBe(10)
            update_quality()
            expect(items[0].sell_in).toBe(-1)
            expect(items[0].quality).toBe(10)
        })

        it("when Sulfurus is added, sell_in of 0 and quantity of 80 should not change", function() {
            items = []
            items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80))

            expect(items[0].sell_in).toBe(0)
            expect(items[0].quality).toBe(80)
            update_quality()
            expect(items[0].sell_in).toBe(0)
            expect(items[0].quality).toBe(80)
        })
    })

    describe("Backstage passes", function() {

        it("given a sell_in of more than 10, quality should increase by 1", function() {
            items = []
            items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10))
            expect(items[0].sell_in).toBe(20)
            expect(items[0].quality).toBe(10)
            update_quality()
            expect(items[0].sell_in).toBe(19)
            expect(items[0].quality).toBe(11)
        })

        it("given a sell_in of less than or equal to 10, quality should increase by 2", function() {
            items = []
            items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 40))
            expect(items[0].sell_in).toBe(10)
            expect(items[0].quality).toBe(40)
            update_quality()
            expect(items[0].sell_in).toBe(9)
            expect(items[0].quality).toBe(42)
        })

        it("given a sell_in of less than or equal to 5, quality should increase by 3", function() {
            items = []
            items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 40))
            expect(items[0].sell_in).toBe(5)
            expect(items[0].quality).toBe(40)
            update_quality()
            expect(items[0].sell_in).toBe(4)
            expect(items[0].quality).toBe(43)
        })

        it("given a sell_in of less than or equal to 5, quality should increase by 3 but should not be more than 50", function() {
            items = []
            items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48))
            expect(items[0].sell_in).toBe(5)
            expect(items[0].quality).toBe(48)
            update_quality()
            expect(items[0].sell_in).toBe(4)
            expect(items[0].quality).toBe(50)
        })

        it("given a sell_in of 1, quality should become zero after concert", function() {
            items = []
            items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 1, 48))
            expect(items[0].sell_in).toBe(1)
            expect(items[0].quality).toBe(48)
            update_quality()
            expect(items[0].sell_in).toBe(0)
            expect(items[0].quality).toBe(50)

            update_quality()
            expect(items[0].sell_in).toBe(-1)
            expect(items[0].quality).toBe(0)

        })
    })
})
