import { MenuItem } from 'primeng/api'
import { Platform } from '../models/enums/plataform'

export const contactPlatforms: MenuItem[] = [
  {
    label: 'Email',
    value: Platform.EMAIL,
    icon: 'pi pi-envelope',
  },
  {
    label: 'WhatsApp (EM BREVE)',
    value: Platform.WHATSAPP,
    icon: 'pi pi-whatsapp',
    disabled: true,
  },
  {
    label: 'Discord (EM BREVE)',
    value: Platform.DISCORD,
    icon: 'pi pi-discord',
    disabled: true,
  },
  {
    label: 'Telegram (EM BREVE)',
    value: Platform.TELEGRAM,
    icon: 'pi pi-telegram',
    disabled: true,
  },
]
