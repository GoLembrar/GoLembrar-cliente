export interface UserLogin {
  email: string
  password: string
}

export interface User {
  email: string
  password: string
}

export interface UserEdit {
  name: string
  email: string
  password: string
}

export interface UserUpadatePassword {
  password: string
  newPassword: string
}

export interface UserInfo extends User {
  name: string
  createdAt: Date
  updatedAt: Date
}
