import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'nameAbbreviation',
  standalone: true,
})
export class NameAbbreviationPipe implements PipeTransform {
  transform(value: string ) {
    if(!value) return value

    const names = value.trim().split(' ');

    if (names.length === 1) {
      return names[0]; // If there's only one name, return it as is
    }

    const firstName = names[0];
    const lastNameInitial = names[names.length - 1].charAt(0);

    return `${firstName} ${lastNameInitial}.`;
  }
}
