import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  productosCarrito: any[] = [];
  totalCarrito = 0;

  constructor(

  ) { }

  agregarProductoCarrito(producto) {
    let exists = false;
    const precio = parseFloat(producto.precio);
    this.totalCarrito += precio;
    
    // Search this product on the cart and increment the quantity
    this.productosCarrito = this.productosCarrito.map(_product => {
      if (_product.producto.id === producto.id) {
        _product.quantity++;
        exists = true;
      }
      //console.log(_product);
      return _product;
      
    });
    // Add a new product to the cart if it's a new product
    if (!exists) {
      producto.precio = precio;
      this.productosCarrito.push({
        producto: producto,
        quantity: 1
      });
    }
  }

  eliminarProductoCarrito(producto) {
    this.productosCarrito = this.productosCarrito.filter(_product => {
      if (_product.producto.id === producto.id && _product.quantity===1) {
        this.totalCarrito -= _product.producto.precio * _product.quantity;
        return false;
        
      }

      if (_product.producto.id === producto.id && _product.quantity>1) {
        this.totalCarrito -= _product.producto.precio * _product.quantity;
        _product.quantity=_product.quantity-1
      
        return true;
        
      }
      
      return true;
     });
     
  }

  limpiarCarrito(){
    this.productosCarrito.length  = 0
  }

  

}
