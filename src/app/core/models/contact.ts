import { Channel } from './enums/channels'

export interface Contact {
  id: string
  name: string
  platform: Channel
  identify: string
}

export interface EditContact {
  name: string
  channel: string
  identify: string
}
