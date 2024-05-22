import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../core/interfaces/client.interface';
import { EmailService } from '../../services/email.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css'],
  standalone: true,
  imports: [NgFor]

})
export class ClientTableComponent implements OnInit {
  clients: IClient[] = [];
  selectedClient: IClient | null = null;
  popupTitle: string = '';
  @Output() clientEmitter = new EventEmitter()

  constructor(private clientService: ClientService, private emailService: EmailService) { }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe(
      clients => this.clients = clients,
      error => console.error('Error loading clients:', error)
    );
  }
  sendEmail(client: IClient) {
    this.emailService.sendEmail(client.email, 'Subject', 'Email body')
      .subscribe(
        () => console.log('Email sent successfully'),
        (error) => console.error('Error sending email:', error)
      );
  }
  openPopup(mode: 'add' | 'edit' | 'delete', client: IClient, index: number) {
    this.popupTitle = mode === 'add' ? 'Add Client' : mode === 'edit' ? 'Edit Client' : 'Delete Client';
    this.selectedClient = client ? { ...client } : { name: '', phoneNumber: '', email: '', homeAddress: '' };
    this.clientEmitter.emit({ client, index, title: this.popupTitle })
  }

  saveClient(client: IClient) {
    if (client.id) {
      this.clientService.updateClient(client).subscribe(
        updatedClient => {
          const index = this.clients.findIndex(c => c.id === updatedClient.id);
          this.clients[index] = updatedClient;
        },
        error => console.error('Error updating client:', error)
      );
    } else {
      this.clientService.createClient(client).subscribe(
        newClient => this.clients.push(newClient),
        error => console.error('Error creating client:', error)
      );
    }

  }
  closePopup() {
    this.selectedClient = null;
  }
}
