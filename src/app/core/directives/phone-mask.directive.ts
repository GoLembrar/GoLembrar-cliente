import { Directive, HostListener } from '@angular/core'
import { NgControl } from '@angular/forms'

@Directive({
  selector: '[phoneMask]',
  standalone: true,
})
export class PhoneMaskDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const value = event.target.value
    const numbers = value.replace(/\D/g, '')

    if (!numbers) {
      this.ngControl.control?.setValue('', { emitEvent: false })
      return
    }

    // Limitando o número de dígitos para 11
    if (numbers.length > 11) {
      const truncatedValue = numbers.substring(0, 11)
      const formattedValue = this.formatPhoneNumber(
        truncatedValue,
        '(00) 00000-0000'
      )
      this.ngControl.control?.setValue(truncatedValue, { emitEvent: false })
      event.target.value = formattedValue
      return
    }

    let formattedValue
    if (numbers.length <= 10) {
      formattedValue = this.formatPhoneNumber(numbers, '(00) 0000-0000')
    } else {
      formattedValue = this.formatPhoneNumber(numbers, '(00) 00000-0000')
    }

    this.ngControl.control?.setValue(numbers, { emitEvent: false })

    event.target.value = formattedValue
  }

  private formatPhoneNumber(value: string, pattern: string): string {
    let result = ''
    let i = 0
    let j = 0

    while (i < value.length && j < pattern.length) {
      if (pattern[j] === '0') {
        result += value[i]
        i++
      } else {
        result += pattern[j]
      }
      j++
    }

    return result
  }
}
