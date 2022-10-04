create or replace function listarDepartamento()
returns table (
  id            varchar, 
  departamento  varchar)
as $$
	select id,departamento from departamento order by id asc;
$$ language sql;

create or replace function buscarDepartamento(_id varchar)
returns table (
  id            varchar, 
  departamento  varchar)
as $$
	select id,departamento from departamento where id=_id;
$$ language sql;

create or replace function buscarDepartamentoPorNombre(_departamento varchar)
returns table (
  id            varchar, 
  departamento  varchar)
as $$
	select id,departamento from departamento 
	where UPPER(departamento)=UPPER(_departamento)
	order by id desc;
$$ language sql;

create or replace function listarDistrito(_id_provincia varchar)
returns table (
  	id        		varchar, 
  	distrito  		varchar,
  	id_provincia 	varchar,
	id_departamento	varchar)
as $$
	select id,distrito,id_provincia,id_departamento from distrito
	where id_provincia=_id_provincia;
$$ language sql;

create or replace function buscarDistrito(_id varchar)
returns table (
  	id            	varchar, 
  	distrito  		varchar,
	id_provincia	varchar,
	id_departamento	varchar)
as $$
	select id,distrito,id_provincia,id_departamento from distrito where id=_id;
$$ language sql;

create or replace function buscarDistritoPorNombre(_distrito varchar)
returns table (
  	id            	varchar, 
  	distrito  		varchar,
	id_provincia	varchar,
	id_departamento	varchar)
as $$
	select id,distrito,id_provincia,id_departamento from distrito 
	where upper(distrito)=upper(_distrito);
$$ language sql;

create or replace function listarProvincia(_id_departamento varchar)
returns table (
  id            	varchar, 
  provincia     	varchar,
  id_departamento  	varchar)
as $$
	select id,provincia,id_departamento from provincia where id_departamento=_id_departamento
$$ language sql;

create or replace function buscarProvincia(_id varchar)
returns table (
  id            	varchar, 
  provincia     	varchar,
  id_departamento  	varchar)
as $$
	SELECT id,provincia,id_departamento FROM provincia where id=_id
$$ language sql;

create or replace function buscarProvinciaPorNombre(_provincia varchar)
returns table (
  id            varchar, 
  provincia     varchar,
  id_departamento  varchar)
as $$
	SELECT id,provincia,id_departamento FROM provincia 
	where upper(provincia)=upper(_provincia)
$$ language sql;

create or replace function listarDocumento()
returns table (
	id 				integer,
	documento		varchar)
as $$
	select id,documento from documento order by id asc
$$ language sql;

  create or replace function buscarDocumento(_id int)
returns table (
  id            	varchar, 
  documento		 	varchar)
as $$
	select id,documento from documento where id=_id
$$ language sql;

  create or replace function buscarDocumento(_documento varchar)
returns table (
  id            varchar, 
  documento		 varchar)
as $$
	select id,documento from documento where documento=_documento
$$ language sql;

create or replace function listarSexo()
returns table (
	id 			integer, 
	sexo 		varchar)
as $$
	select id,sexo from sexo order by id asc;
$$ language sql;

create or replace function buscarSexo(_id int)
returns table (
	id 			integer, 
	sexo 		varchar)
as $$
	select id,sexo from sexo where id=_id;
$$ language sql;

create or replace function buscarSexoPorNombre(_sexo varchar)
returns table (
	id 			integer, 
	sexo 		varchar)
as $$
	select id,sexo from sexo where sexo=_sexo;
$$ language sql;

create or replace function listarPersona()
returns table (
	id 					    integer,
	documento	 		  	varchar,
	departamento 			varchar,
	provincia 				varchar,
	distrito			  	varchar,
	nro_documento			varchar,
	nombres				  	varchar,
	telefono			  	varchar,
	direccion			  	varchar,
	fecha_naci				varchar,
	sexo				    varchar,
	correo				  	varchar,
	firma				    varchar,
	huella				  	varchar,
	foto				    varchar)
as $$
	select per.id,doc.documento,upper(d.departamento) as departamento,upper(pro.provincia) as provincia,upper(di.distrito) as distrito,nro_documento,upper(nombre|| ' ' || apaterno || ' ' || amaterno) as Nombres,telefono,upper(direccion) as direccion,to_char(fecha_naci,'DD/MM/YYYY'),s.sexo,upper(correo) as correo,firma,huella,foto from Persona per
	INNER JOIN departamento d on d.id=per.id_departamento
	INNER JOIN provincia pro on pro.id=per.id_provincia
	INNER JOIN distrito di on di.id=per.id_distrito
	INNER JOIN documento doc on doc.id=per.id_documento
	INNER JOIN sexo s on s.id=per.id_sexo
	WHERE per.estado=true order by per.id desc;
	
$$ language sql;

create or replace function buscarPersona(_id_documento int,_nro_documento varchar)
returns table (
	id 					   	integer,
	id_departamento 		varchar,
	id_provincia 		  	varchar,
	id_distrito			  	varchar,
	id_documento 		  	integer,
	nro_documento		  	varchar,
	nombre				    varchar,
	apaterno			    varchar,
	amaterno			    varchar,
	telefono			    varchar,
	direccion			    varchar,
	fecha_naci			  	date,
	id_sexo				    integer,
	correo				    varchar,
	firma				    varchar,
	huella				    varchar,
	foto				    varchar,
	estado				    boolean)
as $$
	SELECT id,id_departamento,id_provincia,id_distrito,id_documento,nro_documento,nombre,apaterno,amaterno,telefono,direccion,fecha_naci,id_sexo,correo,firma,huella,foto,estado FROM persona per
	WHERE id_documento=_id_documento and nro_documento=_nro_documento;
	
$$ language sql;

CREATE OR REPLACE FUNCTION agregarPersona(
	_id_departamento 	varchar,
	_id_provincia 		varchar,
	_id_distrito		varchar,
	_id_documento	 	int,
	_nro_documento		varchar,
	_nombre				varchar,
	_apaterno			varchar,
	_amaterno			varchar,
	_telefono			varchar,
	_direccion			varchar,
	_fecha_naci			date,
	_id_sexo			int,
	_correo				varchar,
	_firma				varchar,
	_huella				varchar,
	_foto				varchar,
	out v_id_persona 	integer)
  RETURNS integer AS
  $BODY$
  DECLARE
		_id 			integer;
	BEGIN
	SELECT COALESCE(MAX(id+1),1) into _id from persona;
	INSERT INTO Persona	VALUES (_id, _id_departamento, _id_provincia, _id_distrito,_id_documento, _nro_documento, _nombre, _apaterno,_amaterno, _telefono, _direccion,
			_fecha_naci,_id_sexo,_correo, _firma,_huella,_foto, true) returning id INTO v_id_persona;
	END;
  $BODY$
  LANGUAGE 'plpgsql';
  
  CREATE OR REPLACE FUNCTION actualizarPersona(
	_id_documento	 	integer,
	_id_departamento 	varchar,
	_id_provincia 		varchar,
	_id_distrito		varchar,
	_nro_documento		varchar,
	_nombre				varchar,
	_apaterno			varchar,
	_amaterno			varchar,
	_telefono			varchar,
	_direccion			varchar,
	_fecha_naci			date,
	_id_sexo			integer,
	_correo				varchar,
	_firma				varchar,
	_huella				varchar,
	_foto				varchar,
	_id                 integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE persona set id_documento=_id_documento,id_departamento=_id_departamento,id_provincia=_id_provincia,id_distrito=_id_distrito,nro_documento=_nro_documento,
		nombre=_nombre,apaterno=_apaterno,amaterno=_amaterno,telefono=_telefono,direccion=_direccion,fecha_naci=_fecha_naci,id_sexo=_id_sexo,correo=_correo,firma=_firma,
		huella=_huella,foto=_foto WHERE id=_id;
    END;
  $BODY$
  LANGUAGE 'plpgsql';


    CREATE OR REPLACE FUNCTION actualizarEmpresa(
	_id_departamento 	varchar,
	_id_provincia 		varchar,
	_id_distrito		varchar,
	_id_documento	 	integer,
	_nro_documento		varchar,
	_razon_social		varchar,
	_actividad_economica varchar,
	_telefono			varchar,
	_direccion			varchar,
	_correo				varchar,
	_contacto			varchar,
	_id                 integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE empresa set id_departamento=_id_departamento,id_provincia=_id_provincia,id_distrito=_id_distrito,id_documento=_id_documento,nro_documento=_nro_documento,
		razon_social=_razon_social,actividad_economica=_actividad_economica,telefono=_telefono,direccion=_direccion,correo=_correo,contacto=_contacto
		WHERE id=_id;
    END;
  $BODY$
  LANGUAGE 'plpgsql';

/*
* FUNCIONES PARA LA TABLA ROL
*/

create or replace function listarRol()
returns table (
  id                integer,
  rol		        varchar,
  estado            boolean)
as $$
  select id,rol,estado from rol 
  where estado=true 
  order by id asc
$$ language sql;

create or replace function listarRolById(_id integer)
returns table (
	id 		integer,
	rol		varchar,
	estado	boolean)
as $$
	select id,rol,estado from rol 
	where id=_id
$$ language sql;

CREATE OR REPLACE FUNCTION agregarRol(
	_rol				varchar,
	out v_id_rol		int)
  RETURNS integer AS
  $BODY$
  DECLARE
		_id 			integer;
	BEGIN
	SELECT COALESCE(MAX(id+1),1) into _id from rol;
	INSERT INTO rol	VALUES (_id, _rol, true) returning id INTO v_id_rol;
	END;
  $BODY$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION actualizarRol(
	_rol				varchar,
	_id					integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE rol SET rol=_rol WHERE id=_id;
      END;
  $BODY$
  LANGUAGE 'plpgsql';


create or replace function eliminarRol(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE rol SET ESTADO=false  WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

/*
* FUNCIONES PARA LA TABLA USERS
*/

create or replace function listarUsuario()
returns table (
  id                integer,
  id_persona        integer,
  documento         varchar,
  nro_documento     varchar,
  nombre            varchar,
  rol            	varchar,
  usuario           varchar,
  foto              varchar,
  estado			varchar)
as $$
  select u.id,u.id_persona,d.documento,p.nro_documento,upper(p.nombre|| ' ' || p.apaterno) as nombre,r.rol,u.usuario,p.foto,u.estado
  from usuario u 
	  inner join persona p on p.id=u.id_persona
	  inner join documento d on d.id=p.id_documento
	  inner join rol r on r.id=u.id_rol
	  where u.id_tipo_usuario=2
	  order by u.id asc
$$ language sql;


create or replace function listarUsuarioById(_id integer)
returns table (
  id              integer,
  id_persona      integer,
  id_rol          integer,
  usuario         varchar,
  password        varchar,
  estado		  boolean)
as $$
  select id,id_persona,id_rol,usuario,password,estado from usuario
  where id=_id
$$ language sql;

create or replace function buscarUsuarioByIdPersona(_id_persona integer)
returns table (
	id 					integer,
	id_persona 			integer,
	id_rol 				integer,
	usuario				varchar,
	estado				boolean)
as $$
	select id,id_persona,id_rol,usuario,estado from usuario WHERE id_persona=_id_persona;
$$ language sql;

  create or replace function listarUsuarioByUsuario(_usuario varchar)
returns table (
	id 					integer,
	id_persona			integer,
	id_rol				integer,
	usuario				varchar,
	password			varchar)
as $$
	select id,id_persona,id_rol,usuario,password from usuario
	where usuario=_usuario
$$ language sql;


create or replace function validarUsuario(_usuario varchar)
returns table (
  id              integer,
  id_persona      integer,
  id_rol          integer,
  usuario         varchar,
  password        varchar,
  estado          boolean)
as $$
  select id,id_persona,id_rol,usuario,password,estado from usuario where usuario=_usuario and estado=true;
$$ language sql;

create or replace function validarUsuarioPassword(_usuario varchar,_password varchar)
returns table (
  id              integer,
  id_persona      integer,
  id_rol          integer,
  usuario         varchar,
  usuario         password,
  estado          boolean)
as $$
  select id,id_persona,id_rol,usuario,password,estado from usuario where usuario=_usuario and password = _password and estado=true;
$$ language sql;

create or replace function validarPassword(_password varchar)
returns table (
  id              integer,
  id_persona      integer,
  id_rol          integer,
  usuario         varchar,
  estado          boolean)
as $$
  select id,id_persona,id_rol,usuario,estado from usuario where password = crypt(_password, password) and estado=true;
$$ language sql;



CREATE OR REPLACE FUNCTION agregarUsuario(
	_id_persona		 	int,
	_id_rol			 	int,
	_id_tipo_usuario 	int,
	_usuario 			varchar,
	_password		 	varchar,
	out v_id_usuario	int)
  RETURNS integer AS
  $BODY$
  DECLARE
		_id 			integer;
	BEGIN
	INSERT INTO usuario (id_persona, id_rol,id_tipo_usuario,usuario,password, estado)VALUES (_id_persona, _id_rol,_id_tipo_usuario,_usuario,_password, true) returning id INTO v_id_usuario;
	END;
  $BODY$
  LANGUAGE 'plpgsql';

   
create or replace function validarUsuario(_usuario varchar,_password varchar)
returns table (
  id              integer,
  id_persona      integer,
  id_rol          integer,
  usuario         varchar,
  password        varchar,
  estado          boolean)
as $$
  select id,id_persona,id_rol,usuario,password,estado from usuario
  where usuario=_usuario AND password = crypt(_password, password) and estado=true;
$$ language sql;



  create or replace function desactivarUsuario(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE usuario SET estado=false WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

  create or replace function activarUsuario(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE usuario SET estado=true WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

  
create or replace function listarModulosUsuario(_id_usuario int)
returns table (
  id            integer,
  modulo        varchar,
  url           varchar)
as $$
SELECT p.id,m.modulo,m.url FROM usuario u
inner join rol r on r.id=u.id_rol
inner join permiso p on p.id_rol=r.id
inner join modulo m on m.id=p.id_modulo
where u.id=_id_usuario and p.estado=true
order by p.id asc;
$$ language sql;


/*
* FUNCIONES PARA LA TABLA MODULO
*/

create or replace function listarGrupo()
returns table (
  id		  		integer,
  grupo		   		varchar,
  estado			boolean)
as $$
	SELECT id,grupo,estado from grupo
$$ language sql;

create or replace function listarGrupoByIdUsuario(_id_usuario int)
returns table (
  id		  		integer,
  grupo		   		varchar,
  estado			boolean)
as $$
	SELECT g.id,g.grupo,g.estado FROM usuario u
	inner join rol r on r.id=u.id_rol
	inner join permiso p on p.id_rol=r.id
	inner join grupo g on g.id=p.id_grupo
	inner join modulo m on m.id=p.id_modulo
	where u.id=_id_usuario 

	group by g.id,g.grupo order by g.id asc;
$$ language sql;

create or replace function listarModulo()
returns table (
	id 			integer, 
	modulo 		varchar,
	url 		varchar,
	estado 		boolean)
as $$
	select id,modulo,url,estado from modulo
	where estado=true order by id asc;
$$ language sql;


CREATE OR REPLACE FUNCTION agregarRolModulo(
	_id_rol			 	int,
	_id_modulo		 	int,
	out v_id_rol_modulo	int)
  RETURNS integer AS
  $BODY$
  DECLARE
		_id 			integer;
	BEGIN
	SELECT COALESCE(MAX(id+1),1) into _id from rol_modulo;
	INSERT INTO rol_modulo	VALUES (_id, _id_rol, _id_modulo, true) returning id INTO v_id_rol_modulo;
	END;
  $BODY$
  LANGUAGE 'plpgsql';

  /*
funciones para la tabla permiso
*/

create or replace function listarPermiso()
returns table (
	id 					integer,
	rol					varchar,
	modulo				varchar,
	estado				boolean)
as $$
	select p.id,r.rol,m.modulo,p.estado from permiso p
	inner join rol r on r.id=p.id_rol
	inner join modulo m on m.id=p.id_modulo
	order by r.rol ASC
$$ language sql;




  
    /*
* FUNCIONES PARA LA TABLA ESPECIALIDAD
*/

create or replace function listarEspecialidad()
returns table (
  id            varchar, 
  especialidad  varchar,
  descripcion  	varchar,
  imagen  		varchar,
  activo        boolean,
  estado        boolean,
  precio		double precision)
as $$
	select id,upper(especialidad),descripcion,imagen,activo,estado,precio from especialidad
	order by id asc;
$$ language sql;

create or replace function listarEspecialidadById(_id integer)
returns table (
	id 					integer,
	especialidad		varchar,
	descripcion			varchar,
	imagen				varchar)
as $$
	select id,upper(especialidad) as especialidad,descripcion,imagen from especialidad WHERE id=_id
$$ language sql;

CREATE OR REPLACE FUNCTION agregarEspecialidad(
	_especialidad		varchar,
	_descripcion		varchar,
	_imagen				varchar
	)
  RETURNS void AS
  $BODY$
  DECLARE
		_idEspecialidad integer;
	BEGIN
	SELECT COALESCE(MAX(id+1),1) into _idEspecialidad from especialidad;
	INSERT INTO especialidad VALUES (_idEspecialidad, upper(_especialidad),lower(_descripcion),_imagen,true, true);
      END;
  $BODY$
  LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION actualizarEspecialidad(
	_especialidad		varchar,
	_descripcion		varchar,
	_imagen				varchar,
	_id					integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE especialidad SET especialidad=upper(_especialidad),descripcion=lower(_descripcion),imagen=_imagen WHERE id=_id;
      END;
  $BODY$
  LANGUAGE 'plpgsql';

    create or replace function buscarEspecialidad(_especialidad varchar)
returns table (
  id            varchar, 
  especialidad  varchar,
  descripcion  	varchar,
  imagen  		varchar,
  activo        boolean,
  estado        boolean)
as $$
	select id,upper(especialidad),descripcion,imagen,activo,estado from especialidad
	WHERE especialidad=_especialidad;
$$ language sql;
  

  create or replace function eliminarEspecialidad(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE especialidad SET ESTADO=false  WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

  create or replace function listarDia()
returns table (
	id 					integer,
	dia					varchar
	)
as $$
	select * from dia where id>0
$$ language sql;


  create or replace function listarCalendarioPorProducto(_id_producto integer,_id_dia integer)
returns table (
	id 					    integer,
	producto				varchar,
	sexo					varchar,
	apelativo				varchar,
	tecnico				  	varchar,
	especialista			varchar,
	foto				    varchar,
	dia					    varchar,
	hora				    varchar,
	libre				    boolean,
	estado				  	boolean)
as $$
	select c.id,upper(p.producto) as producto,s.sexo,
       CASE s.sexo
           WHEN 'FEMENINO' THEN 'Tecnica'
           WHEN 'MASCULINO' THEN 'Tecnico'
       END apelativo
	,upper(pt.nombre || ' ' || pt.apaterno)  as tecnico,t.especialidad,pt.foto,d.dia,h.hora,c.libre,c.estado from calendario c
	inner join dia d on d.id=c.id_dia
	inner join hora h on h.id=c.id_hora
	inner join tecnico t on t.id=c.id_tecnico
	inner join producto p on p.id=c.id_producto
	inner join persona pt on pt.id=t.id_persona
	inner join sexo s on s.id=pt.id_sexo
	where p.id=_id_producto and d.id=_id_dia and c.libre=true and c.estado=true
	order by c.id desc
$$ language sql;

create or replace function listarPermiso(_id_usuario int)
returns table (
  id            integer,
  id_grupo      integer,
  modulo        varchar,
  url           varchar)
as $$
SELECT p.id,p.id_grupo,m.modulo,m.url FROM usuario u
inner join rol r on r.id=u.id_rol
inner join permiso p on p.id_rol=r.id
inner join modulo m on m.id=p.id_modulo
where u.id=_id_usuario and p.estado=true
order by p.id asc;
$$ language sql;


create or replace function buscarRol(_id int)
returns table (
  id            varchar, 
  rol			varchar)
as $$
	select id,upper(rol) from rol WHERE id=_id;
$$ language sql;

CREATE OR REPLACE FUNCTION agregarPersona(
	_id_documento	 	integer,
	_nro_documento		varchar,
	_nombre				varchar,
	_apaterno			varchar,
	_amaterno			varchar,
	_telefono			varchar,
	_direccion			varchar,
	_correo				varchar,
	out v_id_persona 	integer)
  RETURNS integer AS
  $BODY$
  DECLARE

	BEGIN

	INSERT INTO Persona	VALUES (DEFAULT,'15', '1501', '150101',_id_documento, _nro_documento, _nombre, _apaterno,_amaterno, _telefono, _direccion,
			current_date,1,_correo, ' ',' ',' ', true) returning id INTO v_id_persona;
	END;
  $BODY$
  LANGUAGE 'plpgsql';
  
 CREATE OR REPLACE FUNCTION agregarUsuario(
	_id_persona		 	int,
	_id_rol			 	  int,
	_id_tipo_usuario 	int,
	_usuario 			varchar,
	_password		 	varchar,
	out v_id_usuario	int)
  RETURNS integer AS
  $BODY$
  DECLARE
	BEGIN
	INSERT INTO usuario	values (DEFAULT,_id_persona, _id_rol,_id_tipo_usuario,_usuario,_password, true) returning id INTO v_id_usuario;
	insert into cliente (id_persona,estado)values(_id_persona,true);

	END;
  $BODY$
  LANGUAGE 'plpgsql';

  create or replace function buscarUsuario(_id integer)
returns table (
  id              integer,
  id_persona      integer,
  id_rol          integer,
  usuario         varchar,
  password        varchar,
  estado		  boolean)
as $$
  select id,id_persona,id_rol,usuario,password,estado from usuario
  where id=_id
$$ language sql;

  create or replace function buscarCliente(_id int)
returns table (
  id        	int, 
  id_persona	int,
  estado 		boolean)
as $$
	select id,id_persona,estado from cliente where id=_id;
$$ language sql;

  create or replace function buscarClienteByIdPersona(_id_persona int)
returns table (
  id        	int, 
  id_persona	int,
  estado 		boolean)
as $$
	select id,id_persona,estado from cliente where id_persona=_id_persona;
$$ language sql;


CREATE OR REPLACE FUNCTION agregarCita(
	_id_cliente 		int,
	_id_calendario		int,
	_id_especialidad	int,
	_fecha				date,
	_hora				varchar,
	_artefacto			varchar,
	_marca				varchar,
	_modelo				varchar,
	_serie				varchar,
	_descripcion		varchar,
	out v_id_cita 		integer
	)
  RETURNS integer AS
  $BODY$
  DECLARE
	_precio	decimal(8,2);
	BEGIN
			INSERT INTO cita VALUES (DEFAULT, _id_cliente,_id_calendario,_id_especialidad,_fecha,_hora,_artefacto,_marca,_modelo,_serie,_descripcion,true,false,false,false,true) returning id INTO v_id_cita;
			update calendario set libre=false where id=_id_calendario;
			select precio into _precio from especialidad where id=_id_especialidad;
			insert into detalle_cita(id_cita,id_repuesto,precio_repuesto,precio_servicio,estado)values(v_id_cita,0,0,_precio,true);

      END;
  $BODY$
  LANGUAGE 'plpgsql';


create or replace function listarpersonabyid(_id int)
returns table (
	id 					   	integer,
	id_departamento 		varchar,
	id_provincia 		  	varchar,
	id_distrito			  	varchar,
	id_documento 		  	integer,
	nro_documento		  	varchar,
	nombre				    varchar,
	apaterno			    varchar,
	amaterno			    varchar,
	telefono			    varchar,
	direccion			    varchar,
	fecha_naci			  	date,
	id_sexo				    integer,
	correo				    varchar,
	firma				    varchar,
	huella				    varchar,
	foto				    varchar,
	estado				    boolean)
as $$
	SELECT id,id_departamento,id_provincia,id_distrito,id_documento,nro_documento,nombre,apaterno,amaterno,telefono,direccion,fecha_naci,id_sexo,correo,firma,huella,foto,estado FROM persona
	WHERE id=_id
	
$$ language sql;


create or replace function listarCalendarioById(_id integer)
returns table (
	id 					    integer,
	id_tecnico				integer,
	id_dia					integer,
	id_hora					integer,
	libre					boolean,
	estado					boolean)
as $$
	SELECT id,id_tecnico,id_dia,id_hora,libre,estado FROM calendario WHERE id=_id
$$ language sql;


  create or replace function buscarTecnico(_id int)
returns table (
  id        		int,
  id_especialidad	int,
  id_persona		int,
  especialidad		varchar,
  estado 			boolean)
as $$
	select id,id_especialidad,id_persona,especialidad,estado from tecnico where id=_id;
$$ language sql;

  create or replace function buscarTecnicoByIdPersona(_id_persona int)
returns table (
  id        		int,
  id_especialidad	int,
  id_persona		int,
  especialidad		varchar,
  estado 			boolean)
as $$
	select t.id,id_especialidad,id_persona,especialidad,t.estado from tecnico t
	where t.id_persona=_id_persona;
$$ language sql;

  create or replace function listarCitaById(_id int)
returns table (
	id 					integer,
	nombreCliente		varchar,
	documentoCliente	varchar,
	nroDocumentoCliente	varchar,
	direccionCliente	varchar,
	telefonoCliente		varchar,
	nombreTecnico		varchar,
	documentoTecnico	varchar,
	nroDocumentoTecnico	varchar,
	direccionTecnico	varchar,
	telefonoTecnico		varchar,
	artefacto			varchar,
	marca				varchar,
	modelo				varchar,
	serie				varchar,
	descripcion			varchar,
	fecha				varchar,
	hora				varchar,
	precio				double precision)
as $$
	select 
		c.id,
		pc.nombre || ' ' || pc.apaterno || ' ' || pc.amaterno as nombreCliente, 
		dc.documento as documentoCliente,
		pc.nro_documento as nroDocumentoCliente,
		pc.direccion as direccionCliente,
		pc.telefono as telefonoCliente,
		pt.nombre || ' ' || pt.apaterno || ' ' || pt.amaterno as nombreTecnico, 
		dt.documento as documentoTecnico,
		pt.nro_documento as nroDocumentoTecnico,
		pt.direccion as direccionTecnico,
		pt.telefono as telefonoTecnico,
		c.artefacto,
		c.marca,
		c.modelo,
		c.serie,
		c.descripcion,
		to_char(c.fecha,'DD/MM/YYYY') as fecha,
		c.hora,e.precio
	from cita  c
		inner join cliente cl on cl.id=c.id_cliente
		inner join persona pc on pc.id=cl.id_persona
		inner join documento dc on dc.id=pc.id_documento
		inner join calendario cal on cal.id=c.id_calendario
		inner join tecnico t on t.id=cal.id_tecnico
		inner join persona pt on pt.id=t.id_persona
		inner join documento dt on dt.id=pt.id_documento
		inner join especialidad e on e.id=t.id_especialidad
	WHERE c.id=_id ;

$$ language sql;


  create or replace function listarCitasByIdUsuario(_id_usuario int,_fecha1 date,_fecha2 date)
returns table (
	id 					integer,
	nombreCliente		varchar,
	documentoCliente	varchar,
	nroDocumentoCliente	varchar,
	direccionCliente	varchar,
	telefonoCliente		varchar,
	nombreTecnico		varchar,
	documentoTecnico	varchar,
	nroDocumentoTecnico	varchar,
	direccionTecnico	varchar,
	telefonoTecnico		varchar,
	artefacto			varchar,
	marca				varchar,
	modelo				varchar,
	serie				varchar,
	descripcion			varchar,
	fecha				varchar,
	hora				varchar,
	reservada			boolean,
	atendido			boolean,
	reprogramacion		boolean,
	pagado				boolean,
	estado				boolean)
as $$
	select 
		c.id,
		pc.nombre || ' ' || pc.apaterno || ' ' || pc.amaterno as nombreCliente, 
		dc.documento as documentoCliente,
		pc.nro_documento as nroDocumentoCliente,
		pc.direccion as direccionCliente,
		pc.telefono as telefonoCliente,
		pt.nombre || ' ' || pt.apaterno || ' ' || pt.amaterno as nombreTecnico, 
		dt.documento as documentoTecnico,
		pt.nro_documento as nroDocumentoTecnico,
		pt.direccion as direccionTecnico,
		pt.telefono as telefonoTecnico,
		c.artefacto,
		c.marca,
		c.modelo,
		c.serie,
		c.descripcion,
		to_char(c.fecha,'DD/MM/YYYY') as fecha,
		c.hora,
		c.reservada,
		c.atendido,
		c.reprogramacion,
		c.pagado,
		c.estado
	from cita  c
		inner join cliente cl on cl.id=c.id_cliente
		inner join persona pc on pc.id=cl.id_persona
		inner join usuario u on u.id_persona=pc.id
		inner join documento dc on dc.id=pc.id_documento
		inner join calendario cal on cal.id=c.id_calendario
		inner join tecnico t on t.id=cal.id_tecnico
		inner join persona pt on pt.id=t.id_persona
		inner join documento dt on dt.id=pt.id_documento
	WHERE u.id=_id_usuario and reservada=true and atendido=false and reprogramacion=false and pagado=false and c.estado=true and fecha between _fecha1 and _fecha2;

$$ language sql;


create or replace function listarUsuario()
returns table (
  id                integer,
  id_persona        integer,
  documento         varchar,
  nro_documento     varchar,
  nombre            varchar,
  rol            	varchar,
  usuario           varchar,
  foto              varchar,
  estado			boolean)
as $$
  select u.id,u.id_persona,d.documento,p.nro_documento,upper(p.nombre|| ' ' || p.apaterno) as nombre,r.rol,u.usuario,p.foto,
  		CASE 
		  WHEN t.estado=true  THEN 'Activo'
		  WHEN t.estado=false  THEN 'Eliminado'
		ENDfrom usuario u 
  inner join persona p on p.id=u.id_persona
  inner join documento d on d.id=p.id_documento
  inner join rol r on r.id=u.id_rol
  where u.id_tipo_usuario=2
  order by u.id asc
$$ language sql;


create or replace function listarTecnico()
returns table (
  id                integer,
  id_persona        integer,
  documento         varchar,
  nro_documento     varchar,
  nombre            varchar,
  especialidad      varchar,
  estado			varchar)
as $$
  select t.id,t.id_persona,d.documento,p.nro_documento,upper(p.nombre|| ' ' || p.apaterno) as nombre,e.especialidad,t.estado
	from tecnico t 
  inner join persona p on p.id=t.id_persona
  inner join documento d on d.id=p.id_documento
  inner join especialidad e on e.id=t.id_especialidad
  order by t.id asc
$$ language sql;

create or replace function listarCliente()
returns table (
  id                integer,
  id_persona        integer,
  documento         varchar,
  nro_documento     varchar,
  nombre            varchar,
  telefono		    varchar,
  direccion		    varchar,
  estado			varchar)
as $$
  select c.id,c.id_persona,d.documento,p.nro_documento,upper(p.nombre|| ' ' || p.apaterno) as nombre,p.telefono,p.direccion,
  		CASE 
		  WHEN c.estado=true  THEN 'Activo'
		  WHEN c.estado=false  THEN 'Eliminado'
		END
	from cliente c 
  inner join persona p on p.id=c.id_persona
  inner join documento d on d.id=p.id_documento
  order by c.id asc
$$ language sql;

create or replace function eliminarUsuario(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE usuario SET ESTADO=false  WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;


CREATE OR REPLACE FUNCTION actualizarUsuarioTecnico(
	_id_persona			integer,
	_id_rol				integer,
	_usuario			varchar,
	_password			varchar,
	_estado				boolean,
	_id					integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE usuario SET id_rol=_id_rol,usuario=_usuario,password=_password,estado=_estado WHERE id=_id;
      END;
  $BODY$
  LANGUAGE 'plpgsql';

  CREATE OR REPLACE FUNCTION actualizarUsuario(
	_id_rol				integer,
	_usuario			varchar,
	_password			varchar,
	_estado				boolean,
	_id					integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE usuario SET id_rol=_id_rol,usuario=_usuario,password=_password,estado=_estado WHERE id=_id;
      END;
  $BODY$
  LANGUAGE 'plpgsql';

  CREATE OR REPLACE FUNCTION agregarTecnico(
	_id_especialidad	int,
	_id_persona		 	int,
	_especialidad 		varchar,
	out v_id_tecnico	int)
  RETURNS integer AS
  $BODY$
  DECLARE
		_id 			integer;
	BEGIN
	INSERT INTO tecnico (id_especialidad, id_persona,especialidad,estado) VALUES (_id_especialidad, _id_persona,_especialidad, true) returning id INTO v_id_tecnico;
	END;
  $BODY$
  LANGUAGE 'plpgsql';


  create or replace function eliminarTecnico(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE tecnico SET ESTADO=false  WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;


  CREATE OR REPLACE FUNCTION actualizarTecnico(
	_id_especialidad	integer,
	_id_persona			integer,
	_especialidad		varchar,
	_estado				boolean,
	_id					integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE tecnico set id_especialidad=_id_especialidad,id_persona=_id_persona,especialidad=_especialidad,estado=_estado where id=_id;
      END;
  $BODY$
  LANGUAGE 'plpgsql';

    create or replace function listarCitasPendientesTecnico(_id_tecnico int)
returns table (
	id 					integer,
	nombres				varchar,
	documento			varchar,
	nro_documento		varchar,
	direccion			varchar,
	telefono			varchar,
	fecha				varchar,
	hora				varchar)
as $$
		select c.id,
			pc.nombre || ' ' || pc.apaterno || ' ' || pc.amaterno as nombres, 
			dc.documento as documento,
			pc.nro_documento as nro_documento,
			pc.direccion as direccion,
			pc.telefono as telefono,
			to_char(c.fecha,'DD/MM/YYYY') as fecha,
			c.hora
		from cita c 
			inner join cliente cl on cl.id=c.id_cliente
			inner join persona pc on pc.id=cl.id_persona
			inner join documento dc on dc.id=pc.id_documento
			inner join calendario cal on cal.id=c.id_calendario
			inner join tecnico t on t.id=cal.id_tecnico
		where atendido=false and t.id=_id_tecnico;

$$ language sql;


    CREATE OR REPLACE FUNCTION finalizarCita(
	_id	 	integer
  	)
  RETURNS void AS
  $BODY$
  DECLARE
  		_id_calendario	integer;
	BEGIN
			update cita set reservada=false,atendido=true,pagado=true where id=_id;
			select id_calendario into _id_calendario from cita where id=_id;
			update calendario set libre=true where id=_id_calendario;
    END;
  $BODY$
  LANGUAGE 'plpgsql';


   create or replace function listarReporteCitasAtendidasTecnico(_id_tecnico int,_fecha1 date,_fecha2 date)
returns table (
	id 					integer,
	cliente				varchar,
	documento			varchar,
	nro_documento		varchar,
	telefono			varchar,
	fecha				varchar,
	hora				varchar,
	monto_repuestos		double precision,
    monto_servicios		double precision
	)
as $$
		select c.id,
			pc.nombre || ' ' || pc.apaterno || ' ' || pc.amaterno as cliente, 
			dc.documento as documento,
			pc.nro_documento as nro_documento,
			pc.telefono as telefono,
			to_char(c.fecha,'DD/MM/YYYY') as fecha,
			c.hora,
			COALESCE(sum(precio_repuesto),0),
			COALESCE(sum(precio_servicio),0)
		from cita c 
			inner join cliente cl on cl.id=c.id_cliente
			inner join persona pc on pc.id=cl.id_persona
			inner join documento dc on dc.id=pc.id_documento
			inner join calendario cal on cal.id=c.id_calendario
			inner join tecnico t on t.id=cal.id_tecnico
			inner join detalle_cita detalle on detalle.id_cita=c.id
			where atendido=true and c.estado=true and t.id=_id_tecnico and detalle.estado=true and c.fecha between _fecha1 and _fecha2
			group by c.id,pc.nombre,pc.apaterno,pc.amaterno, dc.documento,pc.nro_documento,pc.telefono,c.fecha,c.hora;
$$ language sql;


create or replace function listarReporteDetalleCita(_id_cita integer)
returns table (
	id 					    integer,
  	row_number				integer,
	repuesto				varchar,
	precio_repuesto			decimal,
	precio_servicio			decimal,
	totalapagar				decimal,
	estado					boolean)
as $$
	SELECT dc.id,ROW_NUMBER () OVER (ORDER BY dc.id),r.repuesto,dc.precio_repuesto,precio_servicio,sum(precio_repuesto)+sum(precio_servicio) as totalapagar,dc.estado FROM detalle_cita dc
	inner join repuesto r on r.id=dc.id_repuesto
	where id_cita=_id_cita
	group by dc.id,r.repuesto,dc.precio_repuesto,dc.precio_servicio
$$ language sql;

create or replace function listarRepuesto()
returns table (
	id 					    integer,
	repuesto				varchar,
	precio					decimal,
	estado					boolean)
as $$
	SELECT id,repuesto,precio,estado from repuesto
$$ language sql;

CREATE OR REPLACE FUNCTION agregarDetalleCita(
	_id_cita				integer,
	_id_repuesto			integer,
	_precio_repuesto		double precision,
	out v_id_detalle 		integer)
  RETURNS integer AS
  $BODY$
  DECLARE

	BEGIN

	INSERT INTO repuesto(id_cita,id_repuesto,precio_repuesto,precio_servicio,estado) values (_id_cita,_id_repuesto,_precio_repuesto,0,true) returning id INTO v_id_detalle;
	END;
  $BODY$
  LANGUAGE 'plpgsql';

    CREATE OR REPLACE FUNCTION agregarDetalleCita(
	_id_cita			int,
	_id_repuesto	 	int,
	out v_id_detalle	int)
  RETURNS integer AS
  $BODY$
  DECLARE
  		_precio_repuesto		decimal(8,2);
	BEGIN
	select precio into _precio_repuesto from repuesto where id=_id_repuesto;
	INSERT INTO detalle_cita (id_cita, id_repuesto,precio_repuesto,precio_servicio,estado) VALUES (_id_cita, _id_repuesto,_precio_repuesto,0, true) returning id INTO v_id_detalle;
	END;
  $BODY$
  LANGUAGE 'plpgsql';


  create or replace function listarDetalleCita(_id_cita int)
returns table (
  id                integer,
  id_cita           integer,
  repuesto          varchar,
  precio	        decimal(8,2))
as $$
  select dc.id,id_cita,r.repuesto,r.precio from detalle_cita dc
  inner join repuesto r on r.id=dc.id_repuesto where dc.estado=true and dc.id_cita=_id_cita
  and r.id>0
  order by id asc;
$$ language sql;

  create or replace function buscarCita(_id int)
returns table (
  id        		int,
  id_cliente		int,
  id_calendario		int,
  id_especialidad	int,
  fecha				varchar,
  hora				varchar,
  artefacto			varchar,
  marca				varchar,
  modelo			varchar,
  serie				varchar,
  descripcion		varchar
	)
as $$
	select id,id_cliente,id_calendario,id_especialidad,to_char(fecha,'DD/MM/YYYY') as fecha,hora,artefacto,marca,modelo,serie,descripcion from cita where id=_id
$$ language sql;


  create or replace function listarReporteCitasAtendidasAdministrador(_fecha1 date,_fecha2 date)
returns table (
	id 					integer,
	cliente				varchar,
	documento			varchar,
	nro_documento		varchar,
	telefono			varchar,
	fecha				varchar,
	hora				varchar,
	monto_repuestos		double precision,
    monto_servicios		double precision
	)
as $$
		select c.id,
			pc.nombre || ' ' || pc.apaterno || ' ' || pc.amaterno as cliente, 
			dc.documento as documento,
			pc.nro_documento as nro_documento,
			pc.telefono as telefono,
			to_char(c.fecha,'DD/MM/YYYY') as fecha,
			c.hora,
			COALESCE(sum(precio_repuesto),0),
			COALESCE(sum(precio_servicio),0)
		from cita c 
			inner join cliente cl on cl.id=c.id_cliente
			inner join persona pc on pc.id=cl.id_persona
			inner join documento dc on dc.id=pc.id_documento
			inner join calendario cal on cal.id=c.id_calendario
			inner join tecnico t on t.id=cal.id_tecnico
			inner join detalle_cita detalle on detalle.id_cita=c.id
			where atendido=true and c.estado=true and detalle.estado=true and c.fecha between _fecha1 and _fecha2
			group by c.id,pc.nombre,pc.apaterno,pc.amaterno, dc.documento,pc.nro_documento,pc.telefono,c.fecha,c.hora;
$$ language sql;

  create or replace function listarPermisos()
returns table (
	id 					integer,
	rol					varchar,
	modulo				varchar,
	url					varchar
	)
as $$
		select p.id,r.rol,m.modulo,m.url from permiso p
		inner join rol r on r.id=p.id_rol
		inner join modulo m on m.id=p.id_modulo
		order by r.id asc
$$ language sql;


CREATE OR REPLACE FUNCTION agregarRecepcion(
	_cliente				varchar,
	_nro_documento			varchar,
	_telefono				varchar,
	_artefacto				varchar,
	_marca					varchar,
	_modelo					varchar,
	_serie					varchar,
	_descripcion			varchar,
	out v_id_recepcion		int)
  RETURNS integer AS
  $BODY$
  DECLARE

	BEGIN

	INSERT INTO recepcion (cliente,nro_documento,telefono,artefacto,marca,modelo,serie,descripcion,precio,estado)VALUES (_cliente, _nro_documento, _telefono,_artefacto,_marca,_modelo,_serie,_descripcion,0,true) returning id INTO v_id_recepcion;
	END;
  $BODY$
  LANGUAGE 'plpgsql';


   create or replace function listarRecepcion()
returns table (
	id 					integer,
	cliente				varchar,
	nro_documento		varchar,
	telefono			varchar,
	artefacto			varchar,
	marca				varchar,
	modelo				varchar,
	serie				varchar,
	descripcion			varchar
	)
as $$
		select id,cliente,nro_documento,telefono,artefacto,marca,modelo,serie,descripcion from recepcion
		where estado=true
$$ language sql;

    create or replace function imprimirGuiaRecepcion(_id int)
returns table (
	id 					integer,
	cliente				varchar,
	nro_documento		varchar,
	telefono			varchar,
	artefacto			varchar,
	marca				varchar,
	modelo				varchar,
	serie				varchar,
	descripcion			varchar
	)
as $$
		select id,cliente,nro_documento,telefono,artefacto,marca,modelo,serie,descripcion from recepcion where id=_id;
$$ language sql;


    CREATE OR REPLACE FUNCTION finalizarRecepcion(
	_id	 	integer
  	)
  RETURNS void AS
  $BODY$
  DECLARE

	BEGIN
	update recepcion set estado=false where id=_id;

    END;
  $BODY$
  LANGUAGE 'plpgsql';


      create or replace function buscarUsuario(_usuario varchar)
returns table (
		id          	integer, 
  		id_persona		integer,
	  	id_rol			integer,
	  	id_tipo_usuario	integer,
	  	usuario			varchar,
	  	password		varchar,
		estado			boolean
	)
as $$
	select id,id_persona,id_rol,id_tipo_usuario,usuario,password,estado	from usuario where usuario=_usuario;
$$ language sql;

create or replace function buscarUsuarioByIdPersona(_id_persona integer)
returns table (
	id 					integer,
	id_persona 			integer,
	id_rol 				integer,
	usuario				varchar,
	estado				boolean)
as $$
	select id,id_persona,id_rol,usuario,estado from usuario WHERE id_persona=_id_persona;
$$ language sql;


  create or replace function buscarDocumento(_id int)
returns table (
	id 					integer,
	documento			varchar)
as $$
	select id,documento from documento	where id=_id
$$ language sql;

create or replace function listarCategoria()
returns table (
  id                integer,
  categoria        	varchar,
  imagen         	varchar,
  estado			boolean)
as $$
  select id,categoria,imagen,estado from categoria where estado=true
$$ language sql;

  CREATE OR REPLACE FUNCTION agregarCategoria(
	_categoria		 	varchar,
	_imagen 			varchar,
	out v_id_categoria	int)
  RETURNS integer AS
  $BODY$
  DECLARE
	BEGIN
	INSERT INTO categoria (categoria, imagen,estado) VALUES (_categoria, _imagen, true) returning id INTO v_id_categoria;
	END;
  $BODY$
  LANGUAGE 'plpgsql';

 CREATE OR REPLACE FUNCTION actualizarCategoria(
	_categoria			varchar,
	_imagen				varchar,
	_estado				boolean,
	_id					integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE categoria set categoria=_categoria,imagen=_imagen,estado=_estado where id=_id;
      END;
  $BODY$
  LANGUAGE 'plpgsql';

create or replace function eliminarCategoria(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE categoria SET ESTADO=false  WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

  
create or replace function buscarCategoria(_id int)
returns table (
  id        		int,
  categoria			varchar,
  imagen			varchar,
  estado 			boolean)
as $$
	select id,categoria,imagen,estado from categoria where id=_id;
$$ language sql;

  create or replace function listarProducto()
returns table (
  id                integer,
  categoria        	varchar,
  producto         	varchar,
  imagen         	varchar,
  precio         	decimal(8,2),
  cantidad         	int,
  estado			boolean)
as $$
  select p.id,c.categoria,producto,p.imagen,precio,cantidad,p.estado from producto p
  inner join tipo_producto tp on tp.id=p.id_tipo_producto
  inner join categoria c on c.id=p.id_categoria
  where tp.id=1
$$ language sql;

  create or replace function listarServicio()
returns table (
  id                integer,
  categoria        	varchar,
  producto         	varchar,
  imagen         	varchar,
  precio         	decimal(8,2),
  estado			boolean)
as $$
  select p.id,c.categoria,producto,p.imagen,precio,p.estado from producto p
  inner join tipo_producto tp on tp.id=p.id_tipo_producto
  inner join categoria c on c.id=p.id_categoria
  where tp.id=2
$$ language sql;

  create or replace function listarRepuesto()
returns table (
  id                integer,
  categoria        	varchar,
  producto         	varchar,
  imagen         	varchar,
  precio         	decimal(8,2),
  cantidad         	int,
  estado			boolean)
as $$
  select p.id,c.categoria,producto,p.imagen,precio,cantidad,p.estado from producto p
  inner join tipo_producto tp on tp.id=p.id_tipo_producto
  inner join categoria c on c.id=p.id_categoria
  where tp.id=3
$$ language sql;


  CREATE OR REPLACE FUNCTION agregarProducto(
	_id_categoria		int,
	_producto		 	varchar,
	_imagen 			varchar,
	_precio 			double precision,
	_cantidad 			int,
	out v_id_producto	int)
  RETURNS integer AS
  $BODY$
  DECLARE
	BEGIN
	INSERT INTO producto (id_categoria, id_tipo_producto,producto,imagen,precio,cantidad,estado) VALUES (_id_categoria,1, _producto,_imagen,_precio,_cantidad, true) returning id INTO v_id_producto;
	END;
  $BODY$
  LANGUAGE 'plpgsql';

  
    CREATE OR REPLACE FUNCTION agregarServicio(
	_id_categoria		int,
	_producto		 	varchar,
	_imagen 			varchar,
	_precio 			double precision,
	out v_id_producto	int)
  RETURNS integer AS
  $BODY$
  DECLARE
	BEGIN
	INSERT INTO producto (id_categoria, id_tipo_producto,producto,imagen,precio,cantidad,estado) VALUES (_id_categoria,2, _producto,_imagen,_precio,0, true) returning id INTO v_id_producto;
	END;
  $BODY$
  LANGUAGE 'plpgsql';
  
      CREATE OR REPLACE FUNCTION agregarRepuesto(
	_id_categoria		int,
	_producto		 	varchar,
	_imagen 			varchar,
	_precio 			double precision,
	_cantidad 			int,
	out v_id_producto	int)
  RETURNS integer AS
  $BODY$
  DECLARE
	BEGIN
	INSERT INTO producto (id_categoria,id_tipo_producto, producto,imagen,precio,cantidad,estado) VALUES (_id_categoria,3, _producto,_imagen,_precio,_cantidad, true) returning id INTO v_id_producto;
	END;
  $BODY$
  LANGUAGE 'plpgsql';



    CREATE OR REPLACE FUNCTION actualizarProducto(
	_id_categoria		integer,
	_producto			varchar,
	_imagen				varchar,
	_precio				double precision,
	_cantidad			integer,
	_estado				boolean,
	_id					integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE producto set id_categoria=_id_categoria,producto=_producto,imagen=_imagen,precio=_precio,cantidad=_cantidad,estado=_estado where id=_id;
      END;
  $BODY$
  LANGUAGE 'plpgsql';
  
CREATE OR REPLACE FUNCTION actualizarServicio(
	_id_categoria		integer,
	_producto			varchar,
	_imagen				varchar,
	_precio				double precision,
	_estado				boolean,
	_id					integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE producto set id_categoria=_id_categoria,producto=_producto,imagen=_imagen,precio=_precio,estado=_estado where id=_id;
      END;
  $BODY$
  LANGUAGE 'plpgsql';
  
CREATE OR REPLACE FUNCTION actualizarRepuesto(
	_id_categoria		integer,
	_producto			varchar,
	_imagen				varchar,
	_precio				double precision,
	_cantidad			integer,
	_estado				boolean,
	_id					integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE producto set id_categoria=_id_categoria,producto=_producto,imagen=_imagen,precio=_precio,cantidad=_cantidad,estado=_estado where id=_id;
      END;
  $BODY$
  LANGUAGE 'plpgsql';

      create or replace function eliminarProducto(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE producto SET ESTADO=false  WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
  
        create or replace function eliminarServicio(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE producto SET ESTADO=false  WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
  
          create or replace function eliminarRepuesto(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE producto SET ESTADO=false  WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

    create or replace function buscarProducto(_id int)
returns table (
  id        		int,
  id_categoria		int,
  producto			varchar,
  imagen			varchar,
  precio			double precision,
  cantidad			int,
  estado 			boolean)
as $$
	select id,id_categoria,producto,imagen,precio,cantidad,estado from producto where id=_id;
$$ language sql;



    create or replace function buscarServicio(_id int)
returns table (
  id        		int,
  id_categoria		int,
  producto			varchar,
  imagen			varchar,
  precio			double precision,
  estado 			boolean)
as $$
	select id,id_categoria,producto,imagen,precio,estado from producto where id=_id;
$$ language sql;

    create or replace function buscarRepuesto(_id int)
returns table (
  id        		int,
  id_categoria		int,
  producto			varchar,
  imagen			varchar,
  precio			double precision,
  cantidad			int,
  estado 			boolean)
as $$
	select id,id_categoria,producto,imagen,precio,cantidad,estado from producto where id=_id;
$$ language sql;

    create or replace function listarModulo()
returns table (
	id 					integer,
	modulo				varchar,
	url					varchar,
	estado				boolean)
as $$
	select id,modulo,url,estado from modulo

$$ language sql;

 CREATE OR REPLACE FUNCTION agregarVenta(
	_id_usuario			int,
	_id_cliente		 	int,
	out v_id_venta		int)
  RETURNS integer AS
  $BODY$
  DECLARE

	BEGIN
	INSERT INTO venta (id_usuario, id_cliente,id_empresa,fecha,hora,estado) VALUES (_id_usuario, _id_cliente,1,current_date,to_char(current_timestamp, 'HH12:MI:SS'), true) returning id INTO v_id_venta;
	END;
  $BODY$
  LANGUAGE 'plpgsql';
  
   CREATE OR REPLACE FUNCTION agregarDetalleVenta(
	_id_venta			int,
	_id_producto	 	int,
	_cantidad		 	int,
	_precio				double precision)
  RETURNS void AS
  $BODY$
  DECLARE

	BEGIN
	INSERT INTO venta_detalle (id_venta, id_producto,cantidad,precio,estado) VALUES (_id_venta, _id_producto,_cantidad,_precio,true);
	END;
  $BODY$
  LANGUAGE 'plpgsql';


     CREATE OR REPLACE FUNCTION agregarDetalleVenta(
	_id_producto	 	int,
	_cantidad		 	int,
	_precio				double precision)
  RETURNS void AS
  $BODY$
  DECLARE
	_id_venta			integer;
	BEGIN
	SELECT COALESCE(MAX(id),1) into _id_venta from venta;
	INSERT INTO venta_detalle (id_venta, id_producto,cantidad,precio,estado) VALUES (_id_venta, _id_producto,_cantidad,_precio,true);
	END;
  $BODY$
  LANGUAGE 'plpgsql';

           
INSERT INTO EMPRESA VALUES(DEFAULT,'INNOVA UTP','10076925106','LAS PRADERAS','+51 972 647 330','VENTAS / SERVICIOS','Este documento es para control interno');

 create or replace function imprimirVenta(_id integer)
returns table (
  id            int, 
  usuario		varchar,
  vendedor		varchar,
  cliente		varchar,
  producto		varchar,
  cantidad		int,
  subtotal		decimal(8,2),
  descuento		decimal(8,2),
  empresa		varchar,
  ruc			varchar,
  telefonos		varchar	
  )
as $$
	SELECT v.id,u.usuario,pu.nombre || ' ' || pu.apaterno || ' ' ||pu.amaterno as vendedor,pc.nombre || ' ' || pc.apaterno || ' ' ||pc.amaterno as cliente,p.producto,dv.cantidad,dv.cantidad*dv.precio,0 as descuento,e.empresa,e.ruc,e.telefonos  FROM venta v 
	INNER JOIN venta_detalle dv on dv.id_venta=v.id
	INNER JOIN usuario u on u.id=v.id_usuario
	INNER JOIN persona pu on pu.id=u.id_persona
	INNER JOIN cliente c on c.id=v.id_cliente
	INNER JOIN persona pc on pc.id=c.id_persona
	INNER JOIN producto p on p.id=dv.id_producto
	INNER JOIN empresa e on e.id=v.id_empresa
	WHERE v.id=_id
$$ language sql;


create or replace function listarFormaPago()
returns table (
  id              	integer,
  forma_pago       	varchar)
as $$
	SELECT id,forma_pago from forma_pago 
	WHERE estado=true
	order by orden asc;
$$ language sql;

  create or replace function listarPago( _id_venta int)
returns table (
  	id  			integer,
	id_forma_pago	integer,
	forma_pago		varchar,
	monto			decimal
	)
as $$
	select p.id,fp.id,fp.forma_pago,monto from pago p
	inner join forma_pago fp on fp.id=p.id_forma_pago
	where id_venta=_id_venta and p.estado=true
$$ language sql;

create or replace function eliminarPago(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE pago SET ESTADO=false  WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

    CREATE OR REPLACE FUNCTION agregarPago(
	_id_venta			integer,
	_id_forma_pago		integer,
	_monto				double precision,
	out v_id_pago	integer)
  RETURNS integer AS
  $BODY$
  DECLARE

	BEGIN
	INSERT INTO pago (id_venta,id_forma_pago,monto,estado)VALUES (_id_venta,_id_forma_pago,_monto,true)returning id INTO v_id_pago;
    END;
  $BODY$
  LANGUAGE 'plpgsql';

    create or replace function buscarFormaPago(_id integer)
returns table (
  id            varchar, 
  forma_pago	varchar,
  orden  		varchar,
  estado        boolean)
as $$
	select id,forma_pago,orden,estado from forma_pago
	where id=_id;
$$ language sql;

  create or replace function imprimirFormaPago(_id_venta integer)
returns table (
	forma_pago			varchar,
	monto				decimal(8,2))
	as $$
	select fp.forma_pago,sum(monto) from pago p
	inner join forma_pago fp on fp.id=p.id_forma_pago
	where p.id_venta=_id_venta and p.estado=true
	group by fp.forma_pago;
$$ language sql;




  CREATE OR REPLACE FUNCTION agregarModulo(
	_modulo		 	varchar,
	_url 			varchar,
	out v_id_modulo	int)
  RETURNS integer AS
  $BODY$
  DECLARE
	BEGIN
	INSERT INTO modulo (modulo, url,estado) VALUES (_modulo, _url, true) returning id INTO v_id_modulo;
	END;
  $BODY$
  LANGUAGE 'plpgsql';
  
  
 CREATE OR REPLACE FUNCTION actualizarModulo(
	_modulo				varchar,
	_url				varchar,
	_estado				boolean,
	_id					integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE modulo set modulo=_modulo,url=_url,estado=_estado where id=_id;
      END;
  $BODY$
  LANGUAGE 'plpgsql';

create or replace function eliminarModulo(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE modulo SET ESTADO=false  WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

  
create or replace function buscarModulo(_id int)
returns table (
  id        		int,
  modulo			varchar,
  url				varchar,
  estado 			boolean)
as $$
	select id,modulo,url,estado from modulo where id=_id;
$$ language sql;

create or replace function listarPermiso()
returns table (
	id 			integer, 
	grupo 		varchar,
	rol 		varchar,
	modulo 		varchar,
	orden 		integer,
	estado 		boolean)
as $$
	select p.id,g.grupo,r.rol,m.modulo,orden,p.estado from permiso p
	inner join grupo g on g.id=p.id_grupo
	inner join rol r on r.id=p.id_rol
	inner join modulo m on m.id=p.id_modulo;
$$ language sql;


  CREATE OR REPLACE FUNCTION agregarPermiso(
	_id_grupo	 	integer,
	_id_rol			integer,
	_id_modulo		integer,
	_orden			integer,
	out v_id_permiso	int)
  RETURNS integer AS
  $BODY$
  DECLARE
	BEGIN
	INSERT INTO permiso (id_grupo, id_rol,id_modulo,orden,estado) VALUES (_id_grupo, _id_rol,_id_modulo,_orden, true) returning id INTO v_id_permiso;
	END;
  $BODY$
  LANGUAGE 'plpgsql';
  
  
 CREATE OR REPLACE FUNCTION actualizarPermiso(
	_id_grupo	 	integer,
	_id_rol			integer,
	_id_modulo		integer,
	_orden			integer,
	_estado			boolean,
	_id				integer)
  RETURNS void AS
  $BODY$
  DECLARE
  		
	BEGIN
		UPDATE permiso set id_grupo=_id_grupo,id_rol=_id_rol,id_modulo=_id_modulo,orden=_orden,estado=_estado where id=_id;
      END;
  $BODY$
  LANGUAGE 'plpgsql';

create or replace function eliminarPermiso(_id integer)
  RETURNS integer AS
  $BODY$
  DECLARE
    AFFECTEDROWS integer;
  BEGIN
    WITH a AS (UPDATE permiso SET ESTADO=false  WHERE id = _id RETURNING 1)
    SELECT count(*) INTO AFFECTEDROWS FROM a;
    IF AFFECTEDROWS = 1 THEN
      RETURN 1;
    ELSE
      RETURN 0;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RETURN 0;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

  
  create or replace function buscarPermiso(_id int)
returns table (
  id        		int,
  id_grupo			int,
  id_rol			int,
  id_modulo			int,
  orden				int,
  estado 			boolean)
as $$
	select id,id_grupo,id_rol,id_modulo,orden,estado from permiso where id=_id;
$$ language sql;

 CREATE OR REPLACE FUNCTION agregarAtencion(
	_id_venta		 	int,
	_id_calendario  	int,
	_fecha			 	DATE,
	_hora	 			varchar,
	out v_id_atencion	int)
  RETURNS integer AS
  $BODY$
  DECLARE
	BEGIN
	INSERT INTO atencion (id_venta,id_calendario,id_tipo_atencion,fecha,hora,estado)values(_id_venta,_id_calendario,1,_fecha,_hora,true) returning id INTO v_id_atencion;
	update calendario set libre =false where id=_id_calendario;

	END;
  $BODY$
  LANGUAGE 'plpgsql';


    create or replace function imprimirHojaServicio(_id int)
returns table (
  id        		int,
  empresa			varchar,
  ruc				varchar,
  telefonos			varchar,
  direccion			varchar,
  mensaje			varchar,
  piepaguina		varchar,
  cliente			varchar,
  documento_cliente	varchar,
  nro_documento_cliente	varchar,
  telefono_cliente	varchar,
  direccion_cliente	varchar,
  tecnico			varchar,
  documento_tecnico	varchar,
  nro_documento_tecnico	varchar,
  telefono_tecnico	varchar,
  direccion_tecnico	varchar,
  servicio			varchar,
  precio			decimal(8,2),
  dia				varchar,
  hora				varchar,
  tipo_atencion 	varchar)
as $$
	select 
		a.id,
		e.empresa,
		e.ruc,
		e.telefonos,
		e.direccion,
		e.mensaje,
		e.piepaguina,
		pc.nombre || ' ' || pc.apaterno || ' ' || pc.amaterno as cliente,
		dpc.documento,pc.nro_documento,pc.telefono,pc.direccion,
		pt.nombre || ' ' || pt.apaterno || ' ' || pt.amaterno as tecnico,
		dpt.documento,pt.nro_documento,pt.telefono,pt.direccion,
		pd.producto,pd.precio,
		to_char(a.fecha,'DD/MM/YYYY'),a.hora,
		ta.tipo_atencion
	from atencion a 
inner join venta v on v.id=a.id_venta
inner join calendario c on c.id=a.id_calendario
inner join cliente cl on cl.id=v.id_cliente
inner join persona pc on pc.id=cl.id_persona
inner join documento dpc on dpc.id=pc.id_documento
inner join empresa e on e.id=v.id_empresa
inner join tecnico t on t.id=c.id_tecnico
inner join persona pt on pt.id=t.id_persona
inner join documento dpt on dpt.id=pt.id_documento
inner join producto pd on pd.id=c.id_producto
inner join tipo_atencion ta on ta.id=a.id_tipo_atencion
where a.id=_id;
$$ language sql;