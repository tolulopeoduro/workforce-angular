import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const v = value.split(' ')
    return v.slice(0 , 16).join(' ')+"..."
  }

}
