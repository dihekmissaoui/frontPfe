import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chaletFilter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: string): any {
    // I am unsure what id is here. did you mean title?
    console.log('items',items);
    
    console.log('term',term);
    
    return items.filter(item => item.description.indexOf(term) !== -1);
}


}
