<?php

/**
* Formulario
*/

namespace Application\Form;


use Zend\Captcha\AdapterInterface as CaptchaAdapter;
use Zend\Form\Element;
use Zend\Form\Form;
use Zend\Captcha;
use Zend\Form\Factory;


class Formulario extends Form
{
	function __construct($name = null)
	{
		parent::__construct($name);

		$this->add(array(
			'name' => 'txtNombre',
			'attributes' => array('id' => 'txtNombre', 'type' => 'text', 'placeholder' => 'Ingresa tu Nombre Completo'),
			'options' => array('label' => 'Nombre')
		));

		$this->add(array(
			'name' => 'txtApellido',
			'attributes' => array('id' => 'txtApellido','type'  => 'text','placeholder' => 'Ingresa tu Apellido'),
			'options' => array('label' => 'Apellido')
		));

		$this->add(array(
			'name' => 'btnEnviar',
			'attributes' => array('id' => 'btnEnviar','type'  => 'submit', value => 'Enviar')
		));


	}
}

?>