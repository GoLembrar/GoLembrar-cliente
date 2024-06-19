import { Channel } from './enums/channels'

export interface Reminder {
  title: string
  description: string
  channel: Channel
  usersToReminder: string[]
  scheduled: Date
  ownerId: string
  categoryId: number
}
