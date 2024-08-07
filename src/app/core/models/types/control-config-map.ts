import { ControlConfig } from '@angular/forms'

export type ControlConfigMap<T> = {
  [K in keyof T]: ControlConfig<T[K]>
}
