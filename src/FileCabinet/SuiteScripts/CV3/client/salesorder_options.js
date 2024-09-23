/**
 * Client=specfic data for creating Customer records in NetSuite
 *
 * @name cust_customers.ts
 * @copyright 2022 CommerceV3, Inc.
 * @author Blake Ellis <blake@commercev3.com>
 *
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSalesOrderOptions = void 0;
    const getSalesOrderOptions = (order) => {
        const externalID = "WEB" + order.order_id;
        return {
            entityid: 0,
            lineItemShipping: true,
            mappings: {
                "externalid": externalID,
                "otherrefnum": externalID,
                "saleschannel": 1,
                "taxcode1": "CV3",
                "custbody_oc_custexceptionmsg": order.comments,
                "custbody_cv3_ordertotal": order.total_price,
                "custbody_cv3_orderdiscounttotal": "9.99",
                "custbody_cv3_ordertaxtotal": order.total_tax,
                "custbody_cv3_ordershippingtotal": order.total_shipping,
                "custbody_oc_remoteip": order.ip,
                "custbody_oc_urlreferrer": "www.google.com",
                "custbody_oc_digitaltracking": "TESTCODE", //order.source_code,
            },
        };
    };
    exports.getSalesOrderOptions = getSalesOrderOptions;
});
