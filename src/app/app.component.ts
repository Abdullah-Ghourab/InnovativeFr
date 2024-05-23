import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { IClient } from './core/interfaces/client.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopUpComponent, ClientTableComponent, HttpClientModule, NgFor, NgIf],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InnovativeFr';
  popupTitle = '';
  selectedClient!: IClient;
  openModel(data: any) {
    this.selectedClient = data.client;
    this.popupTitle = data.title;
  }
  clientUpdated(client: IClient) {
    this.selectedClient = client;
  }
}
