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
			'name' => 'txtPass',
			'attributes' => array('id' => 'txtPass','type'  => 'password'),
			'options' => array('label' => 'Contraseña')
		));

		$this->add(array(
			'name' => 'filFoto',
			'attributes' => array('id' => 'filFoto','type'  => 'file'),
			'options' => array('label' => 'Foto')
		));


	     $this->add(array(
             'type' => 'Zend\Form\Element\Radio',
             'name' => 'radGender',
             'options' => array(
                 'label' => 'Cual es tu genero',
                 'value_options' => array(
                         '0' => 'Mujer',
                         '1' => 'Hombre'
                 )
             ),
             'attributes' => array(
	                'value' => '1'
	         )
	     ));


		$this->add(array(
			'type' => 'Zend\Form\Element\Select',
			'name' => 'selIdioma',
			'options' => array(
				'label' => 'Cual es tu idioma',
					'value_options' => array(
						'0' => 'French',
						'1' => 'English',
						'2' => 'Japanese',
						'3' => 'Chinese',
						'4' => 'Español',
					),
			),
			'attributes' => array(
				'value' => '2'
			)
		));


		$this->add(array(
			'name' => 'btnEnviar',
			'attributes' => array('id' => 'btnEnviar','type'  => 'submit', 'value' => 'Enviar')
		));



	}
}

?>