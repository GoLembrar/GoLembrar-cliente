import { Injectable } from '@angular/core';
    
@Injectable()
export class NodeService {
    getTreeNodesData() {
        return [
            {
                key: '0',
                label: 'WhatsApp',
                icon: 'pi pi-whatsapp',
            },
            {
                key: '1',
                label: 'Discord',
                icon: 'pi pi-discord',
            },
        ];
    }

    getFiles() {
        return Promise.resolve(this.getTreeNodesData());
    }
    
};