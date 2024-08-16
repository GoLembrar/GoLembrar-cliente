export const REGEX_NAME = '^[A-Za-zÀ-ÖØ-ÿẀ-Ỳs]{3,100}$'
export const REGEX_EMAIL =
  '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$|^.{4,100}$'
export const REGEX_PASSWORD = '^(?=.*?[A-Z])(?=.*?[a-z]).{6,25}$'
export const REGEX_PHONE = '([0-9]{2,3})?(([0-9]{2}))([0-9]{4,5})([0-9]{4})'
