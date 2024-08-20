export const REGEX_NAME = /^[\p{L}\s]{3,100}$/u
export const REGEX_EMAIL = `[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}`
export const REGEX_PASSWORD = '^(?=.*?[A-Z])(?=.*?[a-z]).{6,25}$'
export const REGEX_PHONE = '([0-9]{2,3})?(([0-9]{2}))([0-9]{4,5})([0-9]{4})'
export const REGEX_TITLE =
  '^[A-Za-z0-9!@#$%^&*()_+={}\\[\\]:;"\'<>,.?/~`-]{2,120}$'
export const REGEX_MESSAGE =
  '^[A-Za-z0-9!@#$%^&*()_+={}\\[\\]:;"\'<>,.?/~`-]{2,500}$'
