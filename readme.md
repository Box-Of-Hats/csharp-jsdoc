# csharp-jsdoc

Convert C# classes to JSDoc type definitions

## Example usage

```C#
import { convertClassToJsdocType } from "csharp-jsdoc";

const myCsharpClass = `
public class Beans {
    public string PropOne { get; set; }
    public decimal PropTwo { get; set; }
    public int PropThree { get; set; }
    public List<int> PropFour { get; set; }
    public IEnumerable<decimal> PropFive;
    public IEnumerable<OtherClass> PropSix;
}
`;

const jsDocDefinition = convertClassToJsdocType(myCsharpClass);

```

Generates the following type definition:

```javascript
/**
 * @typedef {Object} Beans
 * @property {string} PropOne
 * @property {number} PropTwo
 * @property {number} PropThree
 * @property {number[]} PropFour
 * @property {number[]} PropFive
 * @property {any[]} PropSix
 **/
```
