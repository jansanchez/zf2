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
use Application\Form\Formulario;
use Application\Model\Entity\Recibe;


class FormularioController extends AbstractActionController
{
    public function indexAction()
    {
        return new ViewModel();
    }
    public function formularioAction()
    {
    	$form = new Formulario('formulario');
        //$form->get('selIdioma')->setValueOptions(array('0' => 'uno', '1' => 'dos'));// sobreescribe los options del campo
        return new ViewModel(array('form' => $form));
    }
    public function recibeAction()
    {
    	$data = $this->request->getPost();
    	$recibe = new Recibe($data);
        return new ViewModel(array('datos' => $recibe->getDatos()));
    }
}
