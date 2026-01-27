const myFunctions = require("./sample_functions.js");

describe("div(a, b)", () => {
  test("normal division", () => {
    expect(myFunctions.div(30, 6)).toBe(5);
  });

  test("negative division", () => {
    expect(myFunctions.div(-10, 2)).toBe(-5);
  });

  test("division by zero returns Infinity (JS behavior)", () => {
    expect(myFunctions.div(10, 0)).toBe(Infinity);
  });

  test("0/0 returns NaN (JS behavior)", () => {
    expect(myFunctions.div(0, 0)).toBeNaN();
  });
});

describe("containsNumbers(text)", () => {
  test("returns true if the string contains a digit", () => {
    expect(myFunctions.containsNumbers("abc1def")).toBe(true);
    expect(myFunctions.containsNumbers("9 lives")).toBe(true);
  });

  test("returns false if the string has no digits", () => {
    expect(myFunctions.containsNumbers("abcdef")).toBe(false);
    expect(myFunctions.containsNumbers("!@#$%^")).toBe(false);
    expect(myFunctions.containsNumbers("")).toBe(false);
  });

  test("BUG CATCH: spaces/tabs/newlines are NOT numbers", () => {
    expect(myFunctions.containsNumbers("hello world")).toBe(false);
    expect(myFunctions.containsNumbers("   ")).toBe(false);
    expect(myFunctions.containsNumbers("\t")).toBe(false);
    expect(myFunctions.containsNumbers("\n")).toBe(false);
  });
});