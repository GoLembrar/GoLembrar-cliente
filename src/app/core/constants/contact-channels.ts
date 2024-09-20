import { MenuItem } from 'primeng/api'
import { Channel } from '../models/enums/channels'

export const contactChannels: MenuItem[] = [
  {
    id: '1',
    label: 'Email',
    value: Channel.EMAIL,
    disabled: false,
    icon: 'pi pi-envelope',
  },
  {
    id: '2',
    label: 'WhatsApp',
    value: Channel.WHATSAPP,
    icon: 'pi pi-whatsapp',
    disabled: true,
  },
  {
    id: '3',
    label: 'Discord',
    value: Channel.DISCORD,
    icon: 'pi pi-discord',
    disabled: true,
  },
  {
    id: '4',
    label: 'Telegram',
    value: Channel.TELEGRAM,
    icon: 'pi pi-telegram',
    disabled: true,
  },
]
