
package dao;

import entidad.Cliente;

public interface ClienteDAO {

    public Cliente buscarCliente(int id);
    public Cliente buscarClientePorIdPersona(int id);

}
