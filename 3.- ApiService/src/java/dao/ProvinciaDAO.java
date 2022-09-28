/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import java.util.List;
import entidad.Provincia;

/**
 *
 * @author Marco
 */
public interface ProvinciaDAO {
    public List<Provincia> listarProvincia(String id_departamento);
    public String agregarProvincia(Provincia provincia);
    public String actualizarProvincia(Provincia provincia);
    public String eliminarProvincia(String id_provincia);
    public Provincia buscarProvincia(String id_provincia);
    public Provincia buscarProvinciaPorNombre(String provincia);
}
