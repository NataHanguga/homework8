import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()

export class FilterPipe implements PipeTransform {

  transform(todo: any[], searchText: string): any {
    if (!todo) {return []; }
    if (!searchText) {return todo; }
    searchText = searchText.toLocaleLowerCase();
    return todo.filter(it => {
      return it.title.toLocaleLowerCase().includes(searchText) || it.description.toLocaleLowerCase().includes(searchText);
    });
   }
}

