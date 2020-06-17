import assert from "assert";

import { convertClassToJsdocType } from "../index";

suite("Interface conversion tests", () => {
    test("generate type - single class", () => {
        let input = `
        public class Beans {
            public string PropOne { get; set; }
            public decimal PropTwo { get; set; }
            public int PropThree { get; set; }
            public List<int> PropFour { get; set; }
            public IEnumerable<decimal> PropFive;
            public IEnumerable<OtherClass> PropSix;
        }
        `.trim();

        let expected = `
/**
 * @typedef {Object} Beans
 * @property {string} PropOne
 * @property {number} PropTwo
 * @property {number} PropThree
 * @property {number[]} PropFour
 * @property {number[]} PropFive
 * @property {any[]} PropSix
 **/
        `.trim();

        let actual = convertClassToJsdocType(input, "", "").trim();

        assert.strictEqual(actual, expected);
    });
});
