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
	}
	public function getDatos(){
		$arreglo = array('nombre'=> $this->nombre, 'apellido'=> $this->apellido);
		return $arreglo;
	}
}

?>