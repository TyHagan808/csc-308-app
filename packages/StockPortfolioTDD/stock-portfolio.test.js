/*
    ---- REFLECTION --
    I found this test-first approach to be okay but not preferrable to how I like to code.
    I was able to stick with the approach for most of the project but ended up adding some
    features that came to mind on some of the functions early (because I knew they were)
    common error-prone areas. For example, I ended up adding a quick if statement to the
    sell function that checked that you aren't selling more than you have long before that
    test actually came around. I prefer to fully flesh out functions to the best of my
    knowledge as I go so I don't end up going back deep into old code later on to fix 
    something. Overall though, it was very interesting switching to code this way, it felt
    less efficient but interesting.
*/

const Portfolio = require("./stock-portfolio");

test("2.1: A portfolio is always created with zero shares", () => {
    const p = new Portfolio();
    expect(p.countSymbols()).toBe(0);
});

test("2.2 The stock portfolio shall answer whether it is empty", () => {
    const p = new Portfolio();
    expect(p.isEmpty()).toBe(true);
});

test("2.3 Given a symbol and # of shares, the portfolio should be updated accordingly", () => {
    const p = new Portfolio();
    p.buy("PPN", 2);
    expect(p.countSymbols()).toBe(1);
    expect(p.holdings["PPN"]).toBe(2);
});

test("2.4 Make a sale. Given a symbol and # of shares, the portfolio should be updated accordingly", () => {
    const p = new Portfolio();
    p.buy("PPN", 4);
    p.sell("PPN", 1);

    expect(p.holdings["PPN"]).toBe(3);
});

test("2.5: countSymbols counts unique symbols", () => {
    const p = new Portfolio();
    p.buy("PPN", 4);
    p.buy("TESL", 1);

    expect(p.countSymbols()).toBe(2);
});

test("2.6: Selling down to zero removes the symbol", () => {
    const p = new Portfolio();
    p.buy("PPN", 18);
    p.sell("PPN", 18);

    expect(p.isEmpty()).toBe(true);
});

test("2.7: get(sybol) returns the amount of shares of a certain symbol or 0 if none are present", () => {
    const p = new Portfolio();

    expect(p.get("PPN")).toBe(0);

    p.buy("PPN", 2);

    expect(p.get("PPN")).toBe(2);
});

test("2.8: Trying to sell more shares than the portfolio has results in an error", () => {
    const p = new Portfolio();
    p.buy("PPN", 17);

    expect(() => p.sell("PPN", 18)).toThrow("Not possible to sell this number of shares.");
})