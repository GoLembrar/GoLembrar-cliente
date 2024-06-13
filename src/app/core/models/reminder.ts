import { Platform } from './enums/plataform'

export interface Reminder {
  title: string
  description: string
  platform: Platform
  usersToReminder: string[]
  scheduled: Date
  ownerId: string
  categoryId: number
}
