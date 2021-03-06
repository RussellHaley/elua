/*
 * Copyright (c) 2018 Texas Instruments Incorporated - http://www.ti.com
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * *  Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * *  Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * *  Neither the name of Texas Instruments Incorporated nor the names of
 *    its contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/*
 *  ======== ADCMSP432.syscfg.js ========
 */

"use strict";

/*
 *  ======== devSpecific ========
 *  Device-specific extensions to be added to base ADC configuration
 */
let devSpecific = {
    maxInstances: 24,

    config: [
        {
            name: "referenceVoltage",
            displayName: "Reference Voltage",
            default: "VDD",
            options: [
                { name: "VDD" },
                { name: "1.2V" },
                { name: "1.45V" },
                { name: "2.5V" },
                { name: "External" },
                { name: "External Buffered" }
            ]
        },
        {
            name: "resolution",
            displayName: "Resolution",
            default: "14 Bits",
            options: [
                { name: "8 Bits" },
                { name: "10 Bits" },
                { name: "12 Bits" },
                { name: "14 Bits" }
            ]
        }
    ],

    /* override generic requirements with dev-specific reqs (if any) */
    pinmuxRequirements: pinmuxRequirements,

    templates: {
        boardc: "/ti/drivers/adc/ADCMSP432.Board.c.xdt",
        boardh: "/ti/drivers/adc/ADC.Board.h.xdt"
    }
};

/*
 *  ======== pinmuxRequirements ========
 *  Returns peripheral pin requirements of the specified instance
 *
 *  param inst    - a fully configured ADC instance
 *
 *  returns req[] - an array of pin requirements needed by inst
 */
function pinmuxRequirements(inst)
{
    let adc = {
        name: "adc",
        hidden: true,
        displayName: "ADC Peripheral",
        interfaceName: "ADC14",
        canShareWith: "ADC",
        resources: [
            {
                name: "adcPin",
                hidden: false,
                displayName: "ADC Pin",
                interfaceNames: [
                    "A0", "A1", "A2", "A3",
                    "A4", "A5", "A6", "A7",
                    "A8", "A9", "A10", "A11",
                    "A12", "A13", "A14", "A15",
                    "A16", "A17", "A18", "A19",
                    "A20", "A21", "A22", "A23"
                ]
            }
        ],
        signalTypes: { adcPin: ["AIN"] }
    };

    return ([adc]);
}


/*
 *  ======== extend ========
 *  Extends a base exports object to include any device specifics
 *
 *  This function is invoked by the generic ADC module to
 *  allow us to augment/override as needed.
 */
function extend(base)
{

    devSpecific.config = base.config.concat(devSpecific.config);

    /* merge and overwrite base module attributes */
    return (Object.assign({}, base, devSpecific));
}

/*
 *  ======== exports ========
 *  Export device-specific extensions to base exports
 */
exports = {
    /* required function, called by base ADC module */
    extend: extend
};
