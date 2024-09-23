import { MenuItem } from 'primeng/api'
import { Channel } from '../models/enums/channels'

export const contactChannels: MenuItem[] = [
  {
    label: 'Email',
    value: Channel.EMAIL,
    disabled: false,
    icon: 'pi pi-envelope',
  },
  {
    label: 'WhatsApp',
    value: Channel.WHATSAPP,
    icon: 'pi pi-whatsapp',
    disabled: true,
  },
  {
    label: 'Discord',
    value: Channel.DISCORD,
    icon: 'pi pi-discord',
    disabled: true,
  },
  {
    label: 'Telegram',
    value: Channel.TELEGRAM,
    icon: 'pi pi-telegram',
    disabled: true,
  },
]
