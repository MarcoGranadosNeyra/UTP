
package daoImpl;

import conexion.Conexion;
import dao.ProductoDAO;
import entidad.Producto;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProductoDAOImpl implements ProductoDAO{

    Conexion oconexion=new Conexion();
    
    @Override
    public List<Producto> listarProducto() {
       final ArrayList<Producto> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarProducto}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Producto producto=new Producto();
                    producto.setId(rs.getInt("id"));
                    producto.setCategoria(rs.getString("categoria"));
                    producto.setProducto(rs.getString("producto"));
                    producto.setImagen(rs.getString("imagen"));
                    producto.setPrecio(rs.getDouble("precio"));
                    producto.setCantidad(rs.getInt("cantidad"));
                    producto.setEstado(rs.getBoolean("estado"));
                    lista.add(producto);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return lista;
    }
    
        @Override
    public List<Producto> listarRepuesto() {
       final ArrayList<Producto> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarRepuesto}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Producto producto=new Producto();
                    producto.setId(rs.getInt("id"));
                    producto.setCategoria(rs.getString("categoria"));
                    producto.setProducto(rs.getString("producto"));
                    producto.setImagen(rs.getString("imagen"));
                    producto.setPrecio(rs.getDouble("precio"));
                    producto.setCantidad(rs.getInt("cantidad"));
                    producto.setEstado(rs.getBoolean("estado"));
                    lista.add(producto);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return lista;
    }
    
        @Override
    public List<Producto> listarServicio() {
       final ArrayList<Producto> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarServicio}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Producto producto=new Producto();
                    producto.setId(rs.getInt("id"));
                    producto.setCategoria(rs.getString("categoria"));
                    producto.setProducto(rs.getString("producto"));
                    producto.setImagen(rs.getString("imagen"));
                    producto.setPrecio(rs.getDouble("precio"));
                    producto.setEstado(rs.getBoolean("estado"));
                    lista.add(producto);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return lista;
    }

    @Override
    public Integer agregarProducto(Producto producto) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarProducto(?,?,?,?,?)}");
            ){
            cs.setInt(1, producto.getId_categoria());
            cs.setString(2, producto.getProducto());
            cs.setString(3, producto.getImagen());
            cs.setDouble(4, producto.getPrecio());
            cs.setInt(5, producto.getCantidad());
            cs.executeUpdate();
            
            try (ResultSet last_inserted = cs.getResultSet()){;
                if(last_inserted.next()) {
                   result = last_inserted.getInt(1);
                }
            }
            cs.close();
        } catch (SQLException e) {
             throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        } 
        return result;
    }
    
        @Override
    public Integer agregarRepuesto(Producto producto) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarRepuesto(?,?,?,?,?)}");
            ){
            cs.setInt(1, producto.getId_categoria());
            cs.setString(2, producto.getProducto());
            cs.setString(3, producto.getImagen());
            cs.setDouble(4, producto.getPrecio());
            cs.setInt(5, producto.getCantidad());
            cs.executeUpdate();
            
            try (ResultSet last_inserted = cs.getResultSet()){;
                if(last_inserted.next()) {
                   result = last_inserted.getInt(1);
                }
            }
            cs.close();
        } catch (SQLException e) {
             throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        } 
        return result;
    }
    
    @Override
    public Integer agregarServicio(Producto producto) {
        int result=0;
            try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call agregarServicio(?,?,?,?)}");
            ){
            cs.setInt(1, producto.getId_categoria());
            cs.setString(2, producto.getProducto());
            cs.setString(3, producto.getImagen());
            cs.setDouble(4, producto.getPrecio());
            cs.executeUpdate();
            
            try (ResultSet last_inserted = cs.getResultSet()){;
                if(last_inserted.next()) {
                   result = last_inserted.getInt(1);
                }
            }
            cs.close();
        } catch (SQLException e) {
             throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        } 
        return result;
    }

    @Override
    public boolean actualizarProducto(Producto producto) {
        boolean result = false;
        try {
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call actualizarProducto(?,?,?,?,?,?,?)}");
            cs.setInt(1, producto.getId_categoria());
            cs.setString(2, producto.getProducto());
            cs.setString(3, producto.getImagen());
            cs.setDouble(4, producto.getPrecio());
            cs.setInt(5, producto.getCantidad());
            cs.setBoolean(6, producto.getEstado());
            cs.setInt(7, producto.getId());
            cs.executeUpdate();
            result = true;
            cs.close();
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        return result;
    }
    
        @Override
    public boolean actualizarServicio(Producto producto) {
        boolean result = false;
        try {
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call actualizarServicio(?,?,?,?,?,?)}");
            cs.setInt(1, producto.getId_categoria());
            cs.setString(2, producto.getProducto());
            cs.setString(3, producto.getImagen());
            cs.setDouble(4, producto.getPrecio());
            cs.setBoolean(5, producto.getEstado());
            cs.setInt(6, producto.getId());
            cs.executeUpdate();
            result = true;
            cs.close();
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        return result;
    }
    
        @Override
    public boolean actualizarRepuesto(Producto producto) {
        boolean result = false;
        try {
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call actualizarRepuesto(?,?,?,?,?,?,?)}");
            cs.setInt(1, producto.getId_categoria());
            cs.setString(2, producto.getProducto());
            cs.setString(3, producto.getImagen());
            cs.setDouble(4, producto.getPrecio());
            cs.setInt(5, producto.getCantidad());
            cs.setBoolean(6, producto.getEstado());
            cs.setInt(7, producto.getId());
            cs.executeUpdate();
            result = true;
            cs.close();
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        return result;
    }

    @Override
    public boolean eliminarProducto(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call eliminarProducto(?)}");
            ){
            cs.setInt(1, id);
            cs.executeUpdate();
            cs.close();
           result=true;
        } catch (SQLException e) {
             throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        } 
        return result;
    }
    
    @Override
    public boolean eliminarServicio(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call eliminarRepuesto(?)}");
            ){
            cs.setInt(1, id);
            cs.executeUpdate();
            cs.close();
           result=true;
        } catch (SQLException e) {
             throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        } 
        return result;
    }
    
    @Override
    public boolean eliminarRepuesto(int id) {
        boolean result=false;
        try (
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call eliminarRepuesto(?)}");
            ){
            cs.setInt(1, id);
            cs.executeUpdate();
            cs.close();
           result=true;
        } catch (SQLException e) {
             throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        } 
        return result;
    }

    @Override
    public Producto buscarProducto(int id) {
        Producto producto=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarProducto(?)}")
            ){
            cs.setInt(1, id);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        producto = new Producto();
                        producto.setId(rs.getInt("id"));
                        producto.setId_categoria(rs.getInt("id_categoria"));
                        producto.setProducto(rs.getString("producto"));
                        producto.setImagen(rs.getString("imagen"));
                        producto.setPrecio(rs.getDouble("precio"));
                        producto.setCantidad(rs.getInt("cantidad"));
                        producto.setEstado(rs.getBoolean("estado"));
                    } else {
                        producto=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return producto;
    }
    
        @Override
    public Producto buscarServicio(int id) {
        Producto producto=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarServicio(?)}")
            ){
            cs.setInt(1, id);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        producto = new Producto();
                        producto.setId(rs.getInt("id"));
                        producto.setId_categoria(rs.getInt("id_categoria"));
                        producto.setProducto(rs.getString("producto"));
                        producto.setImagen(rs.getString("imagen"));
                        producto.setPrecio(rs.getDouble("precio"));
                        producto.setEstado(rs.getBoolean("estado"));
                    } else {
                        producto=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return producto;
    }
    
        @Override
    public Producto buscarRepuesto(int id) {
        Producto producto=null;
        try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs=connect.prepareCall("{call buscarRepuesto(?)}")
            ){
            cs.setInt(1, id);
                try (ResultSet rs = cs.executeQuery()){
                    if (rs.next()) {
                        producto = new Producto();
                        producto.setId(rs.getInt("id"));
                        producto.setId_categoria(rs.getInt("id_categoria"));
                        producto.setProducto(rs.getString("producto"));
                        producto.setImagen(rs.getString("imagen"));
                        producto.setPrecio(rs.getDouble("precio"));
                        producto.setCantidad(rs.getInt("cantidad"));
                        producto.setEstado(rs.getBoolean("estado"));
                    } else {
                        producto=null;
                    }
                }
            } catch (SQLException e) {
             throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
            } catch (Exception e) {
             throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
            }
        return producto;
    }

    @Override
    public List<Producto> listarRepuestoServicio() {
       final ArrayList<Producto> lista = new ArrayList<>();
         try(
            Connection connect = oconexion.abrirConexion();
            CallableStatement cs = connect.prepareCall("{call listarRepuestoServicio}")
            ){
            try (ResultSet rs = cs.executeQuery()){
                while (rs.next()) {
                    Producto producto=new Producto();
                    producto.setId(rs.getInt("id"));
                    producto.setCategoria(rs.getString("categoria"));
                    producto.setProducto(rs.getString("producto"));
                    producto.setImagen(rs.getString("imagen"));
                    producto.setPrecio(rs.getDouble("precio"));
                    producto.setEstado(rs.getBoolean("estado"));
                    lista.add(producto);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("ERROR : SQL EXCEPTION " +e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("ERROR : EXCEPTION " +e.getMessage());
        }
        return lista;
    }
    
}
