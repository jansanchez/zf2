<?php

namespace Agente\Model\Entity;

/**
* 
*/
class Modelo
{

	private $texto;
	private $arreglo;
	private $desdeFuera;

	public function __construct($valor=""){
		$this->texto = 'hola desde el constructor del modelo';
		$this->arreglo = array();
		$this->desdeFuera=$valor;
	}

	public function getTexto(){
		return $this->texto;
	}
	private function setCargaArreglo(){
		$a=array("manzana","pera","naranja");
		$cs=implode(",", $a);
		array_push($this->arreglo, $cs);
	}
	public function getArreglo(){
		$this->setCargaArreglo();
		return $this->arreglo;
	}
	public function getDesdeFuera(){
		return $this->desdeFuera;
	}
	
}



//?>