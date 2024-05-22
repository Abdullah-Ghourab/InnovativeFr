import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../core/interfaces/client.interface';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-pop-up',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './pop-up.component.html',
    styleUrl: './pop-up.component.css'
})
export class PopUpComponent implements OnInit {
    form: FormGroup = new FormGroup({})
    @Input({ required: true }) popupTitle: string = ""
    @Output() saveClient = new EventEmitter<IClient>();
    @Output() closePopup = new EventEmitter<void>();



    fb = inject(FormBuilder)
    ngOnInit(): void {
        this.buildForm()
    }
    buildForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            email: ['', Validators.required],
            homeAddress: ['', Validators.required]
        })
    }


    submit() {
        this.form.markAllAsTouched()
        if (this.form.invalid)
            return;
    }
    closePopupDialog() {
        this.closePopup.emit();

    }

}
