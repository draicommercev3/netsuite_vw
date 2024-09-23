/**
 * product functions for CommerceV3 (CV3)
 *
 * @name cv3products.js
 * @copyright 2022 CommerceV3, Inc.
 * @author Blake Ellis <blake@commercev3.com>
 *
 * @NApiVersion 2.1
  * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(["require", "exports", "N/log", "./cv3api"], function (require, exports, log, cv3api) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setProducts = void 0;
    const setProducts = (products, cv3_options) => {
        log.debug("CV3 API", "setProducts");
        // update CV3
        var request_object = {
            data: {
                importProducts: {
                    products: products,
                },
            },
        };
        return cv3api.call("products", request_object, cv3_options);
    };
    exports.setProducts = setProducts;
});
