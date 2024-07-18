import { Channel } from './enums/channels';

export interface Contact {
  id: string
  name: string
  channel: Channel
  identify: string
}

export interface EditContact {
  name: string
  channel: string
  identify: string
}
