<?php

/**
* Recibe
*/

namespace Application\Model\Entity;

class Recibe
{

	private $nombre;
	private $apellido;

	public function __construct($datos = array())
	{
		// Recibo los datos desde $this->request->getPost(); del controller
		$this->nombre = $datos['txtNombre'];
		$this->apellido = $datos['txtApellido'];
		$this->pass = $datos['txtPass'];
		$this->foto = $datos['filFoto'];
		$this->genero = $datos['radGender'];
		$this->idioma = $datos['selIdioma'];
	}
	public function getDatos(){
		$arreglo = array(
			'nombre'=> $this->nombre,
			'apellido'=> $this->apellido,
			'pass'=> $this->pass,
			'foto'=> $this->foto,
			'genero'=>$this->genero,
			'idioma'=>$this->idioma
			);
		return $arreglo;
	}
}

?>