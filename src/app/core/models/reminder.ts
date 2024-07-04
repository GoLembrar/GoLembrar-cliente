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
  scheduled: string
  isActivated: boolean
  categoryId: number
  ownerId: string
  createdAt: string
  updatedAt: string
}
