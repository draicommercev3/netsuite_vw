/**
 * Module of API & data conversion functions for CommerceV3 (CV3)
 *
 * @name main.js
 * @copyright 2022 CommerceV3, Inc.
 * @author Blake Ellis <blake@commercev3.com>
 *
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(["require", "exports", "./salesorder_options", "./cv3_options"], function (require, exports, salesorder_options_1, cv3_options_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCV3Options = exports.getSalesOrderOptions = void 0;
    Object.defineProperty(exports, "getSalesOrderOptions", { enumerable: true, get: function () { return salesorder_options_1.getSalesOrderOptions; } });
    Object.defineProperty(exports, "getCV3Options", { enumerable: true, get: function () { return cv3_options_1.getCV3Options; } });
});
