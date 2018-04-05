import { Directive, ElementRef, HostListener, EventEmitter, OnInit, Input, Output } from '@angular/core';

import Hammer from 'hammerjs';
import * as dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';

cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

@Directive({
    selector: '[vidu]'
})
export class Example implements OnInit {
    public element:any;
    @Output() evenClick: EventEmitter<void> = new EventEmitter();
    constructor(public elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        this.element = this.elementRef.nativeElement;
    }
    @HostListener('click') onclick() {
        console.log('rtrthtrtro');
    }

    @HostListener('mouseleave') onMouseLeave() {
        
    }

    private highlight(color: string) {
        this.elementRef.nativeElement.style.backgroundColor = color;
    }



}
