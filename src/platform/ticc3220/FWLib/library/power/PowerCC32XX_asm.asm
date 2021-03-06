;
;  Copyright (c) 2015-2016, Texas Instruments Incorporated
;  All rights reserved.
;
;  Redistribution and use in source and binary forms, with or without
;  modification, are permitted provided that the following conditions
;  are met:
;
;  *  Redistributions of source code must retain the above copyright
;     notice, this list of conditions and the following disclaimer.
;
;  *  Redistributions in binary form must reproduce the above copyright
;     notice, this list of conditions and the following disclaimer in the
;     documentation and/or other materials provided with the distribution.
;
;  *  Neither the name of Texas Instruments Incorporated nor the names of
;     its contributors may be used to endorse or promote products derived
;     from this software without specific prior written permission.
;
;  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
;  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
;  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
;  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
;  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
;  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
;  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
;  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
;  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
;  OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
;  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
;
;
; ======== PowerCC32XX_asm.asm ========
;
        PRESERVE8

        PUBLIC PowerCC32XX_enterLPDS
        PUBLIC PowerCC32XX_resumeLPDS

        EXTERN PowerCC32XX_contextSave
        EXTERN PRCMLPDSRestoreInfoSet

;
;  ======== PowerCC32XX_enterLPDS ========
;  Function saves the ARM registers in the contextSave structure.
;  It calls PRCMLPDSRestoreInfoSet with the resume SP and the
;  PowerCC32XX_resumeLPDS function.
;  Finally, it calls the LPDS entry function to go to LPDS.
;
        SECTION CODE:CODE:NOROOT
        THUMB
PowerCC32XX_enterLPDS:
        push {r4-r11,lr}
        mov r4,r0
        mov32 r1, PowerCC32XX_contextSave
        mrs  r0,msp
        str  r0,[r1]
        mrs  r0,psp
        str  r0,[r1, #4]
        mrs  r0,primask
        str  r0,[r1, #12]
        mrs  r0,faultmask
        str  r0,[r1, #16]
        mrs  r0,basepri
        str  r0,[r1, #20]
        mrs  r0,control
        str  r0,[r1, #24]
        ldr  r0,[r1, #4]
        mov32 r1, PowerCC32XX_resumeLPDS
        bl PRCMLPDSRestoreInfoSet
        bx r4    ; branch to stashed enter LPDS function pointer

failEnterLPDS:
        b failEnterLPDS     ; should never get here!

;
;  ======== PowerCC32XX_resumeLPDS ========
;
        SECTION CODE:CODE:NOROOT
        THUMB
PowerCC32XX_resumeLPDS:
        nop.w
        nop.w
        nop.w
        nop.w
        dsb
        isb
        mov32 r1, PowerCC32XX_contextSave
        ldr  r0,[r1, #24]
        msr  control,r0
        ldr  r0,[r1]
        msr  msp,r0
        ldr  r0,[r1,#4]
        msr  psp,r0
        ldr  r0,[r1, #12]
        msr  primask,r0
        ldr  r0,[r1, #16]
        msr  faultmask,r0
        ldr  r0,[r1, #20]
        msr  basepri,r0
        pop  {r4-r11,lr}
        dsb
        isb
        bx   lr

        END
