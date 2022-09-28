/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import java.util.List;
import entidad.Persona;

/**
 *
 * @author Marco
 */
public interface PersonaDAO {
    public List listarPersona(String filtro);
    public Integer agregarPersona(Persona usuario);
    public Boolean actualizarPersona(Persona usuario);
    public Boolean eliminarPersona(int id);
    public Persona buscarPersona(int id);
    public Persona buscarPersona(int id_documento,String nro_documento);
}
