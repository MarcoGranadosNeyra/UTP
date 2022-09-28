package dao;

import java.util.List;
import entidad.Usuario;

public interface UsuarioDAO {
    public List listarUsuario();
    public Integer agregarUsuario(Usuario usuario);
    public Boolean actualizarUsuario(Usuario usuario);
    public Boolean eliminarUsuario(int id);
    public Usuario buscarUsuario(int id);
    public Usuario buscarUsuario(String usuario);
    public Usuario buscarUsuarioByIdPersona(int id_persona);
    public Usuario validarPassword(String password);
    public Usuario validarUsuario(String usuario,String password);
}
