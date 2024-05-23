import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../core/interfaces/client.interface';
import { NgIf } from '@angular/common';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client']) {
      this.buildForm(this.client)
    }
  }
  form: FormGroup = new FormGroup({})
  @Input({ required: true }) popupTitle: string = ""
  @Input() client!: IClient
  @Output() saveClient = new EventEmitter<IClient>();
  @Output() closePopup = new EventEmitter<void>();



  fb = inject(FormBuilder)
  clientService = inject(ClientService)
  ngOnInit(): void {
    this.buildForm(this.client)
  }
  buildForm(client?: IClient) {
    this.form = this.fb.group({
      name: [client?.name, Validators.required],
      phoneNumber: [client?.phoneNumber, Validators.required],
      email: [client?.email, Validators.required],
      homeAddress: [client?.homeAddress, Validators.required]
    })

  }


  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid)
      return;
    if (this.client?.id) {
      this.editClient()
      return;
    }
    this.CreateClient()


  }
  CreateClient() {
    this.clientService.createClient(this.form.value).subscribe(res => {
      this.saveClient.emit(res)
      this.closePopupDialog();
    })
  }
  editClient() {
    const updatedClient = { ...this.form.value, id: this.client.id }
    this.clientService.updateClient(updatedClient).subscribe(res => {
      this.saveClient.emit(updatedClient)
      this.closePopupDialog();
    })
  }

  closePopupDialog() {
    this.closePopup.emit();
  }

}
