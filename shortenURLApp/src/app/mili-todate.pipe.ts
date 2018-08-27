import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'miliTOdate'
})
export class MiliTOdatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var dateObj = new Date(value);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return day+'/'+month+'/'+year;
  }

}
