import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todo';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(todo: Todo[], path: string[], order: number): any {
    if (!todo || !path || !order) { return todo; }
    return todo.sort((a: Todo, b: Todo ) => {
      path.forEach(prop => {
        a = a[prop];
        b = b[prop];
      });
      return a > b ? order : order * (-1);
    });
  }

}
