import { Contact } from './contact'
import { Channel } from './enums/channels'

export interface CreateReminder {
  title: string
  description: string
  channel: Channel
  usersToReminder: string[]
  scheduled: Date
  ownerId: string
  categoryId: number
}

export interface Reminder {
  id: number
  title: string
  description: string
  scheduled: Date
  isActivated: boolean
  categoryId: number
  usersToReminder: Contact[]
  ownerId: string
  createdAt: string
  updatedAt: string
}
