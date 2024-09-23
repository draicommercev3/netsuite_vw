/**
 * Main import file for using core functionality. Always include this file:
 *
 *      import { orders, requests, products } from "./core/main"
 *
 * This file is used to assemble all teh various public functions in core
 * and craft an API that is ergonomic.
 *
 * @name main.js
 * @copyright 2022 CommerceV3, Inc.
 * @author Blake Ellis <blake@commercev3.com>
 *
 * @NApiVersion 2.1
  * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(["require", "exports", "./cv3orders", "./cv3requests", "./cv3products", "./cv3categories"], function (require, exports, cv3orders_1, cv3requests_1, cv3products_1, cv3categories_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.categories = exports.products = exports.requests = exports.orders = void 0;
    exports.orders = {
        get: cv3orders_1.get,
        getPending: cv3orders_1.getPending,
        removeFromPending: cv3orders_1.removeFromPending,
        updateStatus: cv3orders_1.updateStatus,
    };
    exports.requests = {
        getNew: cv3requests_1.getNew,
    };
    exports.products = {
        set: cv3products_1.setProducts
    };
    exports.categories = {
        set: cv3categories_1.setCategories
    };
});
