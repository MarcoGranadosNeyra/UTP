
package dao;

import entidad.Cliente;
import java.util.List;

public interface ClienteDAO {

    public List listarCliente();
    public Integer agregarCliente(Cliente cliente);
    public Boolean actualizarCliente(Cliente cliente);
    public Cliente buscarCliente(int id);
    public Cliente buscarCliente(int id_documento,String nro_documento);
    public Cliente buscarClientePorIdPersona(int id);
    public Boolean eliminarCliente(int id);

}
