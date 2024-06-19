import { MenuItem } from 'primeng/api'
import { Channel } from '../models/enums/channels'

export const contactChannels: MenuItem[] = [
  {
    label: 'Email',
    value: Channel.EMAIL,
    icon: 'pi pi-envelope',
  },
  {
    label: 'WhatsApp (EM BREVE)',
    value: Channel.WHATSAPP,
    icon: 'pi pi-whatsapp',
    disabled: true,
  },
  {
    label: 'Discord (EM BREVE)',
    value: Channel.DISCORD,
    icon: 'pi pi-discord',
    disabled: true,
  },
  {
    label: 'Telegram (EM BREVE)',
    value: Channel.TELEGRAM,
    icon: 'pi pi-telegram',
    disabled: true,
  },
]
