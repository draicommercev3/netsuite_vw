/**
 * order functions for CommerceV3 (CV3)
 *
 * @name cv3orders.js
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
    exports.updateStatus = exports.removeFromPending = exports.getPending = exports.get = void 0;
    const get = (order_ids, cv3_options) => {
        log.debug("CV3 API", "getPendingOrders");
        var request_object = {
            data: {
                orderExport: {
                    byIDs: order_ids,
                },
            },
        };
        var response_object = cv3api.call("orders", request_object, cv3_options);
        log.debug("response_object", response_object);
        return objectsToArrays(response_object);
    };
    exports.get = get;
    const getPending = (cv3_options) => {
        log.debug("CV3 API", "getPendingOrders");
        var request_object = {
            data: {
                orderExport: {
                    newOrders: true,
                },
            },
        };
        var response_object = cv3api.call("orders", request_object, cv3_options);
        log.debug("response_object_by_id", response_object);

        return objectsToArrays(response_object);
    };
    exports.getPending = getPending;
    const objectsToArrays = (raw_orders) => {
        var orders = [];
        Object.values(raw_orders.orderExport.orders).forEach((raw_order) => {
            var order = raw_order;
            var new_ship_tos = [];
            Object.values(raw_order.ship_tos).forEach((st_value) => {
                var new_ship_to_products = [];
                Object.values(st_value.ship_to_products).forEach((product) => {
                    new_ship_to_products.push(product);
                });
                st_value.ship_to_products = new_ship_to_products;
                new_ship_tos.push(st_value);
                order.ship_tos = new_ship_tos;
            });
            if ("gc_info" in order.billing) {
                var new_gcs = [];
                Object.values(order.gc_info.gift_certificates).forEach((gc) => {
                    new_gcs.push(gc);
                });
                order.billing.gc_info.gift_certificates = new_gcs;
            }
            orders.push(order);
        });
        return orders;
    };
    const removeFromPending = (orders, cv3_options) => {
        log.debug("removeFromPendingOrder", true);
        var request_object = {
            data: {
                orderConfirm: {
                    order_ids: orders,
                },
            },
        };
        var response_object = cv3api.call("orders", request_object, cv3_options);
        // return success logging
        var netsuiteResponse = [];
        orders.forEach(function (orderID) {
            var statusObject = {
                orderID: orderID,
                success: false,
            };
            for (var i = 0; i < response_object.orderConfirm.length; i++) {
                if (response_object.orderConfirm[i].orderID == orderID) {
                    response_object.orderConfirm[i].success = true;
                }
            }
            netsuiteResponse.push(statusObject);
        });
        return netsuiteResponse;
    };
    exports.removeFromPending = removeFromPending;
    const updateStatus = (order_id) => {
        log.debug("removeFromPendingOrder" + order_id, true);
        return [1, 2, 3];
    };
    exports.updateStatus = updateStatus;
});
