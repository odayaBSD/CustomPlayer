import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

const modules = [
    MatIconModule,
    MatButtonModule,
    MatSliderModule
];

@NgModule({
    imports: modules,
    exports: modules
})

export class MaterialModule { }