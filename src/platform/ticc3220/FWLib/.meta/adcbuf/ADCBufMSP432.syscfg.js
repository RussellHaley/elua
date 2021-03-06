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
 *  ======== ADCBufMSP432.syscfg.js ========
 */

"use strict";

let $super = {};

/* get Common /ti/drivers utility functions */
let Common = system.getScript("/ti/drivers/Common.js");

let intPriority = Common.newIntPri()[0];
intPriority.name = "dmaInterruptPriority";
intPriority.displayName = "DMA Interrupt Priority";

/*
 *  ======== devSpecific ========
 *  Device-specific extensions to be added to base ADCBuf configuration
 */
let devSpecific = {
    maxInstances: 1,

    config: [
        {
            name: "channels",
            displayName: "Channels",
            description: "Number of ADCBuf channels to configure.",
            default: 1,
            options: [
                { name: 1 },  { name: 2 },  { name: 3 },  { name: 4 },
                { name: 5 },  { name: 6 },  { name: 7 },  { name: 8 },
                { name: 9 },  { name: 10 }, { name: 11 }, { name: 12 },
                { name: 13 }, { name: 14 }, { name: 15 }, { name: 16 },
                { name: 17 }, { name: 18 }, { name: 19 }, { name: 20 },
                { name: 21 }, { name: 22 }, { name: 23 }, { name: 24 }
            ]
        },
        {
            name: "triggerSource",
            displayName: "Trigger Source",
            description: "Specifies the trigger to initiate a sample sequence.",
            default: "Timer",
            options: [
                { name: "Timer" },
                { name: "Auto" }
            ],
            onChange: onTriggerSourceChange
        },
        {
            name: "timerDutyCycle",
            displayName: "Timer Duty Cycle",
            description: "Specifies the timer duty cycle as a percentage"
                + " between 1 and 99.",
            default: 50
        },
        {
            name: "clockSource",
            displayName: "Clock Source",
            default: "ADC",
            options: [
                { name: "ADC" },
                { name: "SYSOSC" },
                { name: "ACLK" },
                { name: "MCLK" },
                { name: "SMCLK" },
                { name: "HSMCLK" }
            ]
        },
        {
            name: "enableDMA",
            displayName: "Enable DMA",
            description: "Specifies if the DMA is used.",
            default: true
        }
    ],

    moduleInstances: moduleInstances,

    modules: Common.autoForceDMAModule,

    /* override generic requirements with  device-specific reqs (if any) */
    pinmuxRequirements: pinmuxRequirements,

    templates: {
        boardc: "/ti/drivers/adcbuf/ADCBufMSP432.Board.c.xdt",
        boardh: "/ti/drivers/adcbuf/ADCBuf.Board.h.xdt"
    },

    filterHardware: filterHardware,

    validate: validate
};

/*
 *  ======== pinmuxRequirements ========
 *  Return peripheral pin requirements as a function of config
 */
function pinmuxRequirements(inst)
{

    let reqs = [];

    let timer = {
        name: "timer",
        displayName: "Timer peripheral",
        description: "Timer peripheral used as the trigger source.",
        interfaceName: "TIMER_A",
        resources: []
    };

    let adc = {
        name: "adc",
        displayName: "ADC peripheral",
        hidden: true,
        interfaceName: "ADC14",
        canShareWith: "ADCBuf",
        resources: []
    };

    let dma = [
        {
            name: "dmaInterruptNumber",
            displayName: "DMA Interrupt Number",
            interfaceNames: [ "DMA_INT" ]
        },
        {
            name: "dmaChannel",
            displayName: "DMA Channel",
            hidden: true,
            readOnly: true,
            interfaceNames: [ "DMA_CH" ]
        }
    ];

    if (inst.triggerSource === "Timer") {
        reqs.push(timer);
    }

    if (inst.enableDMA) {
        adc.resources = dma;
    }

    reqs.push(adc);

    return (reqs);
}

/*
 *  ========= filterHardware ========
 *  Check 'component' signals for compatibility with ADC
 *
 *  @param component - hardware object describing signals and
 *                     resources they're attached to
 *  @returns matching pinRequirement object if ADC is supported.
 */
function filterHardware(component)
{
    for (let sig in component.signals) {
        if (component.signals[sig].type == "AIN") {
            return (true);
        }
    }
    return (false);
}

/*
 *  ======== onTriggerSourceChange ========
 */
function onTriggerSourceChange(inst, ui)
{
    if (inst.triggerSource !== "Timer") {
        ui.timerDutyCycle.hidden = true;
    }
    else {
        ui.timerDutyCycle.hidden = false;
    }
}

/*
 *  ======== moduleInstances ========
 *  returns an array of ADCBufChanMSP432 instances.
 */
function moduleInstances(inst)
{
    let result = [];

    for (let i = 0; i < inst.channels; i++) {
        result.push({
            name: "adcBufChannel" + i,
            displayName: "ADCBuf Channel " + i,
            moduleName: "/ti/drivers/adcbuf/ADCBufChanMSP432",
            hardware: inst.$hardware,
            hidden: false
        });
    }

    return (result);
}

/*
 *  ======== validate ========
 *  Validate this inst's configuration
 *
 *  @param inst - ADCBuf instance to be validated
 *  @param vo - object to hold detected validation issues
 */
function validate(inst, vo)
{

    if ($super.validate) {
        $super.validate(inst, vo);
    }

    if (inst.timerDutyCycle > 99 || inst.timerDutyCycle < 1) {
        Common.logError(vo, inst, "timerDutyCycle",
            "Duty cycle must be between 1 and 99.");
    }

}

/*
 *  ======== extend ========
 *  Extends a base exports object to include any device specifics
 *
 *  This function is invoked by the generic ADCBuf module to
 *  allow us to augment/override as needed for the MSP432
 */
function extend(base)
{

    $super = base;

    devSpecific.config = base.config.concat(devSpecific.config);

    /* merge and overwrite base module attributes */
    return (Object.assign({}, base, devSpecific));
}

/*
 *  ======== exports ========
 *  Export device-specific extensions to base exports
 */
exports = {
    /* required function, called by base ADCBuf module */
    extend: extend
};
