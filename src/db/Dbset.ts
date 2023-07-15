import { Client } from '../interface/type';

export let clients: Array<Client> = [];

export function addClient(client: Client): void {
  clients.push(client);
}

export function removeClient(client: Client): void {
  clients = clients.filter((index) => {
    if (index.clientId !== client.clientId) return index;
  });
}

