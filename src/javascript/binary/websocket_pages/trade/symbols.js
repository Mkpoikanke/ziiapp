const ActiveSymbols = require('../../common_functions/active_symbols');

/*
 * Symbols object parses the active_symbols json that we get from socket.send({active_symbols: 'brief'}
 * and outputs in usable form, it gives markets, underlyings
 *
 *
 * Usage:
 *
 * use `Symbols.details` to populate this object first
 *
 * then use
 *
 * `Symbols.markets` to get markets like Forex, Random etc
 * `Symbols.underlyings` to get underlyings
 *
 */

const Symbols = (() => {
    'use strict';

    let trade_markets = {},
        trade_markets_list = {},
        trade_underlyings = {},
        need_page_update = 1,
        names = {};

    const details = (data) => {
        const all_symbols  = data.active_symbols;
        trade_markets      = ActiveSymbols.getMarkets(all_symbols);
        trade_markets_list = ActiveSymbols.getMarketsList(all_symbols);
        trade_underlyings  = ActiveSymbols.getTradeUnderlyings(all_symbols);
        names              = ActiveSymbols.getSymbolNames(all_symbols);
    };

    const getSymbols = (update) => {
        const $args = {
            active_symbols: 'brief',
        };
        BinarySocket.send($args, update);
        need_page_update = update;
    };

    return {
        details       : details,
        getSymbols    : getSymbols,
        markets       : list   => (list ? trade_markets_list : trade_markets),
        underlyings   : ()     => trade_underlyings,
        getName       : symbol => names[symbol],
        needpageUpdate: ()     => need_page_update,
        getAllSymbols : ()     => names,
    };
})();

module.exports = Symbols;
