class Portfolio
{
    constructor() 
    {
        this.holdings = {};
    }

    countSymbols()
    {
        return Object.keys(this.holdings).length;
    }

    isEmpty()
    {
        return Object.keys(this.holdings).length == 0;
    }

    buy(symbol, shares)
    {
        const current = this.holdings[symbol] ?? 0;
        this.holdings[symbol] = current + shares;
    }

    sell(symbol, shares)
    {
        const current = this.holdings[symbol] ?? 0;

        if (current - shares == 0)
        {
            delete this.holdings[symbol];
            return;
        }

        if (current >= shares)
        {
            this.holdings[symbol] = current - shares;
        }
        else
        {
            throw new Error("Not possible to sell this number of shares.");
        }
    }

    get(symbol)
    {
        return this.holdings[symbol] ?? 0;
    }
}

module.exports = Portfolio;