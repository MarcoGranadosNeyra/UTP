/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import java.util.List;
import entidad.Departamento;

/**
 *
 * @author Marco
 */
public interface DepartamentoDAO {
    public List<Departamento> listarDepartamento();
    public String agregarDepartamento(Departamento departamento);
    public String actualizarDepartamento(Departamento departamento);
    public String eliminarDepartamento(String id_departamento);
    public Departamento buscarDepartamento(String id_departamento);
    public Departamento buscarDepartamentoPorNombre(String departamento);

}
