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
 *  ======== package.js ========
 */

"use strict";

exports = {
    name: "/ti/drivers",
    displayName: "TI Drivers",

    /* issue: the package files list should be computed */
    files: [ /* All package files */
        "UART.syscfg.js",
        "uart/UARTMSP432.syscfg.js",
        "uart/UARTMSP432.Board.c.xdt",
        "uart/UARTMSP432.Board.h.xdt",
        "uart/UARTCC32XX.syscfg.js",
        "uart/UARTCC32XX.Board.c.xdt",
        "uart/UARTCC32XX.Board.h.xdt",

        "Power.syscfg.js",
        "power/PowerMSP432.syscfg.js",
        "power/PowerMSP432.Board.c.xdt",
        "power/PowerMSP432.Board.h.xdt",
        "power/PowerCC32XX.syscfg.js",
        "power/PowerCC32XX.Board.c.xdt",
        "power/PowerCC32XX.Board.h.xdt",

        "Watchdog.syscfg.js",
        "watchdog/WatchdogMSP432.syscfg.js",
        "watchdog/WatchdogMSP432.Board.c.xdt",
        "watchdog/WatchdogMSP432.Board.h.xdt",
        "watchdog/WatchdogCC32XX.syscfg.js",
        "watchdog/WatchdogCC32XX.Board.c.xdt",
        "watchdog/WatchdogCC32XX.Board.h.xdt",

        "Timer.syscfg.js",
        "timer/TimerMSP432.syscfg.js",
        "timer/TimerMSP432_T32.syscfg.js",
        "timer/TimerMSP432_TA.syscfg.js",
        "timer/TimerMSP432.Board.c.xdt",
        "timer/TimerMSP432.Board.h.xdt",

        "NVS.syscfg.js",
        "nvs/NVSMSP432.syscfg.js",
        "nvs/NVSSPI25X.syscfg.js",

        "DMA.syscfg.js",

        /* root code generation templates, referenced by the product json */
        "templates/Board.c.xdt",
        "templates/Board.h.xdt"
    ]
};
