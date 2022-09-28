CREATE TABLE empresa (
id			SERIAL,
empresa 	VARCHAR(200) NOT NULL,
ruc 		VARCHAR(11) NOT NULL,
direccion 	VARCHAR(200) NOT NULL,
telefonos 	VARCHAR(50) NOT NULL,
mensaje 	VARCHAR(50) NOT NULL,
piepaguina 	VARCHAR(50) NOT NULL,
CONSTRAINT uq_empresa UNIQUE(empresa),
CONSTRAINT pk_id_empresa PRIMARY KEY (id)
);

CREATE TABLE departamento (
id VARCHAR(2) NOT NULL,
departamento VARCHAR(20) NOT NULL,
CONSTRAINT uq_departamento UNIQUE(departamento),
CONSTRAINT pk_id_departamento PRIMARY KEY(id)
);

CREATE TABLE provincia(
id VARCHAR(4) NOT NULL,
provincia VARCHAR(30) NOT NULL,
id_departamento VARCHAR(2) NOT NULL,
CONSTRAINT uq_provincia UNIQUE(provincia),
CONSTRAINT pk_id_provincia PRIMARY KEY(id),
CONSTRAINT fk_id_departamento_provincia FOREIGN KEY (id_departamento) REFERENCES departamento(id)
);


CREATE TABLE distrito(
id VARCHAR(6) NOT NULL,
distrito VARCHAR(40) NOT NULL,
id_provincia VARCHAR(4) NOT NULL,
id_departamento VARCHAR(2) NOT NULL,
CONSTRAINT pk_id_distrito PRIMARY KEY(id),
CONSTRAINT fk_id_provincia_distrito FOREIGN KEY(id_provincia) REFERENCES provincia(id),
CONSTRAINT fk_id_departamento_distrito FOREIGN KEY(id_departamento) REFERENCES departamento(id)
);


CREATE TABLE documento(
id 			SERIAL,
documento 	VARCHAR(20) NOT NULL,
CONSTRAINT uq_documento UNIQUE(documento),
CONSTRAINT pk_id_documento PRIMARY KEY(id)
);

CREATE TABLE sexo(
id 			SERIAL,
sexo 		VARCHAR(20) NOT NULL,
CONSTRAINT uq_sexo UNIQUE(sexo),
CONSTRAINT pk_id_sexo PRIMARY KEY(id)
);


CREATE TABLE persona(
id 				SERIAL,
id_departamento VARCHAR(2) NOT NULL,
id_provincia 	VARCHAR(4) NOT NULL,
id_distrito 	VARCHAR(6) NOT NULL,
id_documento	INT NOT NULL,
nro_documento	VARCHAR(30) NOT NULL,
nombre			VARCHAR(30) NOT NULL,
apaterno		VARCHAR(30) NOT NULL,
amaterno		VARCHAR(30) NOT NULL,
telefono		VARCHAR(15) NULL,
direccion		VARCHAR(80) NULL,
fecha_naci		DATE NOT NULL,
id_sexo			INT NOT NULL,
correo			VARCHAR(80) NULL,
firma			VARCHAR(200) NULL,
huella			VARCHAR(200) NULL,
foto			VARCHAR(200) NULL,
estado			boolean 	NOT NULL,
CONSTRAINT pk_id_persona PRIMARY KEY(id),
CONSTRAINT uq_id_documento_nro_documento UNIQUE(id_documento,nro_documento),
CONSTRAINT fk_id_documento_persona FOREIGN KEY (id_documento) REFERENCES documento(id),
CONSTRAINT fk_id_departamento_persona FOREIGN KEY (id_departamento) REFERENCES departamento(id),
CONSTRAINT fk_id_provincia_persona FOREIGN KEY (id_provincia) REFERENCES provincia(id),
CONSTRAINT fk_id_distrito_persona FOREIGN KEY (id_distrito) REFERENCES distrito(id),
CONSTRAINT fk_id_sexo FOREIGN KEY (id_sexo) REFERENCES sexo(id)
);

CREATE TABLE tipo_usuario(
id			SERIAL,
tipo		varchar(40) NOT NULL,
CONSTRAINT pk_tipo_usuario PRIMARY KEY(id)
);

CREATE TABLE rol(
id 			SERIAL,
rol 		VARCHAR(40) NOT NULL,
estado		boolean NOT NULL,
CONSTRAINT uq_rol UNIQUE(rol),
CONSTRAINT pk_id_rol PRIMARY KEY (id)
);


CREATE TABLE usuario(
id			        SERIAL,
id_persona	        INT NOT NULL,
id_rol  	        INT NOT NULL,
id_tipo_usuario  	INT NOT NULL,
usuario		        VARCHAR(80) NOT NULL,
password	        VARCHAR(80) NOT NULL,
estado		        boolean NOT NULL,
CONSTRAINT pk_id_usuario PRIMARY KEY(id),
CONSTRAINT fk_id_persona_usuario FOREIGN KEY(id_persona) REFERENCES persona(id),
CONSTRAINT fk_id_rol_usuario FOREIGN KEY(id_rol) references rol(id),
CONSTRAINT fk_id_tipo_usuario_users FOREIGN KEY(id_tipo_usuario) references tipo_usuario(id)
);


ALTER TABLE usuario 
    ADD CONSTRAINT uq_id_persona UNIQUE (id_persona);
	
ALTER TABLE usuario 
    ADD CONSTRAINT uq_id_persona_id_rol UNIQUE (id_persona, id_rol);
	
	
CREATE TABLE modulo(
id			SERIAL,
modulo		varchar(40) NOT NULL,
url			varchar(200) NOT NULL,
estado		boolean NOT NULL,
CONSTRAINT pk_id_modulo PRIMARY KEY(id)
);

CREATE TABLE permiso(
id			SERIAL,
id_rol	    INT NOT NULL,
id_modulo	INT NOT NULL,
estado		boolean NOT NULL,
CONSTRAINT uq_id_rol_id_modulo_permiso UNIQUE(id_rol,id_modulo),
CONSTRAINT pk_rol_modulo PRIMARY KEY(id),
CONSTRAINT fk_id_rol_rol_modulo FOREIGN KEY (id_rol) REFERENCES rol(id),
CONSTRAINT fk_id_modulo_rol_modulo FOREIGN KEY (id_modulo) REFERENCES modulo(id)
);

CREATE TABLE especialidad(
id						SERIAL NOT NULL,
especialidad			VARCHAR(80) NOT NULL,
descripcion				VARCHAR(200) NULL,
imagen					VARCHAR(200) NULL,
activo					boolean NOT NULL,
estado					boolean NOT NULL,
CONSTRAINT uq_especialidad UNIQUE(especialidad),
CONSTRAINT pk_id_especialidad PRIMARY KEY (id)
);

CREATE TABLE tecnico(
id				SERIAL,
id_especialidad	INT NOT NULL,
id_persona		INT NOT NULL,
especialidad	VARCHAR(100) NOT NULL,
estado			boolean NOT NULL,
--CONSTRAINT uq_id_persona_tecnico UNIQUE(id_persona),
CONSTRAINT pk_id_tecnico PRIMARY KEY(id),
CONSTRAINT fk_id_especialidad_tecnico FOREIGN KEY(id_especialidad) REFERENCES especialidad(id),
CONSTRAINT fk_id_persona_tecnico FOREIGN KEY(id_persona) REFERENCES persona(id)
);

ALTER TABLE tecnico
DROP CONSTRAINT uq_id_persona_tecnico;

CREATE TABLE hora(
id				SERIAL,
hora			varchar(10) NOT NULL,
numero			varchar(2) NOT NULL,
CONSTRAINT uq_hora UNIQUE(hora),
CONSTRAINT pk_id_hora PRIMARY KEY(id)
);

CREATE TABLE dia(
id				SERIAL,
dia				varchar(10) NOT NULL,
CONSTRAINT uq_dia UNIQUE(dia),
CONSTRAINT pk_id_dia PRIMARY KEY(id)
);

CREATE TABLE calendario(
id				SERIAL,
id_tecnico		INT NOT NULL,
id_dia			INT NOT NULL,
id_hora			INT NOT NULL,
libre			boolean NOT NULL,
estado			boolean NOT NULL,
CONSTRAINT pk_calendario PRIMARY KEY(id),
CONSTRAINT uq_tecnico_id_dia_id_hora_calendario UNIQUE(id_tecnico,id_dia,id_hora),
CONSTRAINT fk_id_tecnico_calendario FOREIGN KEY(id_tecnico) REFERENCES tecnico(id),
CONSTRAINT fk_id_dia_calendario FOREIGN KEY(id_dia) REFERENCES dia(id),
CONSTRAINT fk_id_hora_calendario FOREIGN KEY(id_hora) REFERENCES hora(id)
);

CREATE TABLE cliente(
id 				SERIAL,
id_persona		INT NOT NULL,
estado			boolean NOT NULL,
CONSTRAINT pk_id_paciente PRIMARY KEY (id),
CONSTRAINT fk_id_persona FOREIGN KEY (id_persona) REFERENCES persona(id)
);

/*
CREATE TABLE atencion(
id				SERIAL,
id_cliente		INT NOT NULL,
id_calendario	INT NOT NULL,
id_especialidad	INT NOT NULL,	
fecha			date not null,
hora			varchar(10) not null,
equipo			varchar(100) not null,
marca			varchar(50) not null,
modelo			varchar(50) not null,
serie			varchar(50) not null,
descripcion		varchar(100) not null,
reservada		boolean NOT NULL,
atendido		boolean NOT NULL,
reprogramacion	boolean NOT NULL,
pagado			boolean NOT NULL,
estado			boolean NOT NULL,
CONSTRAINT pk_id_atencion PRIMARY KEY (id),
CONSTRAINT fk_id_cliente_atencion FOREIGN KEY(id_cliente) REFERENCES cliente(id),
CONSTRAINT fk_id_calendario_atencion FOREIGN KEY(id_calendario) REFERENCES calendario(id),
CONSTRAINT fk_id_especialidad_atencion FOREIGN KEY(id_especialidad) REFERENCES especialidad(id)
);
*/

ALTER TABLE especialidad 
ADD COLUMN precio decimal(8,2);

update especialidad set precio=80


CREATE TABLE categoria(
id 			SERIAL,
categoria 	VARCHAR(100) NOT NULL,
imagen	 	VARCHAR(200) NOT NULL,
estado		boolean NOT NULL,
CONSTRAINT uq_categoria UNIQUE(categoria),
CONSTRAINT pk_id_categoria PRIMARY KEY (id)
);

CREATE TABLE tipo_producto(
id 				SERIAL,
tipo_producto 	VARCHAR(100) NOT NULL,
estado			boolean NOT NULL,
CONSTRAINT uq_tipo_producto UNIQUE(tipo_producto),
CONSTRAINT pk_tipo_producto PRIMARY KEY (id)
);

CREATE TABLE producto(
id 					SERIAL,
id_categoria		int,
id_tipo_producto	int,
producto 			VARCHAR(100) NOT NULL,
imagen	 			VARCHAR(200) NOT NULL,
precio	 			DECIMAL(8,2),
cantidad 			int,
estado				boolean NOT NULL,
CONSTRAINT uq_producto UNIQUE(producto),
CONSTRAINT pk_id_producto PRIMARY KEY (id),
CONSTRAINT fk_id_cateogira_producto FOREIGN KEY(id_categoria)  REFERENCES categoria(id),
CONSTRAINT fk_id_tipo_producto FOREIGN KEY(id_tipo_producto)  REFERENCES tipo_producto(id)
);


CREATE TABLE venta(
id				SERIAL,
id_usuario		INT NOT NULL,
id_cliente		INT NOT NULL,
id_empresa		INT NOT NULL,
fecha			date not null,
hora			varchar(10) not null,
estado			boolean NOT NULL,
CONSTRAINT pk_id_venta PRIMARY KEY (id),
CONSTRAINT fk_id_usuario_venta FOREIGN KEY(id_usuario) REFERENCES usuario(id),
CONSTRAINT fk_id_cliente_venta FOREIGN KEY(id_cliente) REFERENCES cliente(id),
CONSTRAINT fk_id_empresa_venta FOREIGN KEY(id_empresa) REFERENCES empresa(id)
);

CREATE TABLE venta_detalle(
id_venta		INTEGER,
id_producto		INTEGER,
cantidad		INTEGER,
precio			DECIMAL(8,2),
estado			boolean NOT NULL,
CONSTRAINT pk_id_venta_id_producto_venta_detalle PRIMARY KEY (id_venta,id_producto),
CONSTRAINT fk_id_venta  FOREIGN KEY (id_venta) REFERENCES venta(id),
CONSTRAINT fk_id_producto FOREIGN KEY (id_producto) REFERENCES producto(id)
);

CREATE TABLE forma_pago(
id					SERIAL PRIMARY KEY,
forma_pago	 		VARCHAR(60) NOT NULL,
orden				INT NOT NULL,
estado				boolean NOT NULL,
CONSTRAINT uq_forma_pago UNIQUE(forma_pago)
);

CREATE TABLE pago(
id			 	SERIAL PRIMARY KEY,
id_venta	 	INT NOT NULL,
id_forma_pago 	INT NOT NULL,
monto			double precision NOT NULL,
estado			boolean NOT NULL,
CONSTRAINT fk_id_venta_pago FOREIGN KEY (id_venta) REFERENCES venta(id),
CONSTRAINT fk_id_forma_pago_pago FOREIGN KEY(id_forma_pago) REFERENCES forma_pago(id)
);