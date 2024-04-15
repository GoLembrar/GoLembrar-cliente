import { Injectable } from '@angular/core';
    
@Injectable()
export class NodeService {
    getTreeNodesData() {
        return [
            {
                key: '0',
                label: 'Email',
                icon: 'pi pi-envelope',
                selectable: true
            },
            {
                key: '1',
                label: 'Discord',
                icon: 'pi pi-discord',
                selectable: false,
                styleClass: 'opacity-50'
            },
            {
                key: '2',
                label: 'WhatsApp',
                icon: 'pi pi-whatsapp',
                selectable: false,
                styleClass: 'opacity-50'
            },
        ];
    }

    getFiles() {
        return Promise.resolve(this.getTreeNodesData());
    }
    
};