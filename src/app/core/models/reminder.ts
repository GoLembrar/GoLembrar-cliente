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

interface UserToReminder {
  id: number
  reminderId: string
  createdAt: Date
  updatedAt: Date
  contactId: string
  contact: Contact
}

export interface Reminder {
  id: number
  title: string
  description: string
  scheduled: Date
  isActivated: boolean
  categoryId: number
  usersToReminder: UserToReminder[]
  ownerId: string
  createdAt: string
  updatedAt: string
}
