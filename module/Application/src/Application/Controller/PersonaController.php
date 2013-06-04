<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class PersonaController extends AbstractActionController
{
    public function indexAction()
    {	
    	$title= 'viene!';
        return new ViewModel(array('title' => $title));
    }
    public function miPerfilAction()
    {	
    	$title= 'mi perfil!!';
        return new ViewModel(array('title' => $title));
    }
	public function datosFacturacionAction()
    {	
    	$title = 'Datos de Facturación';
        return new ViewModel(array('title' => $title));
    }
	public function misAvisosActivosAction()
    {	
    	$title = 'Mis Avisos Activos';
        return new ViewModel(array('title' => $title));
    }
	public function libretaContactosAction()
    {	
    	$title = 'Libreta de Contactos';
        return new ViewModel(array('title' => $title));
    }
	public function publicarAvisoDatosAction()
    {	
    	$title = 'Publicar Aviso Datos';
        return new ViewModel(array('title' => $title));
    }
    
}
