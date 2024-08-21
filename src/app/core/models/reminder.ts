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
enum Status {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

export interface UpdateReminder extends Partial<CreateReminder> {}

interface UserToReminder {
  id: number
  reminderId: string
  createdAt: Date
  updatedAt: Date
  contactId: string
  contact: Contact
}

export interface Reminder {
  id: string
  title: string
  description: string
  scheduled: Date
  isActivated: boolean
  status: Status
  usersToReminder: UserToReminder[]
  ownerId: string
  createdAt: string
  updatedAt: string
}
