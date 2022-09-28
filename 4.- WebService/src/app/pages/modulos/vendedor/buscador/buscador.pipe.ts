
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(args==='' || args==='  ' || args==='   ' )return value;
    const resultados=[]; 
    for(const producto of value){
      if(producto.producto.toLowerCase().indexOf(args.toLowerCase()) > -1){
        resultados.push(producto);
      };
    };
    return resultados;
  }

}
