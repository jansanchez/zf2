<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Agente\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Agente\Model\Entity\Modelo;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        return new ViewModel();
    }
    public function modelAction()
    {
    	$m = new Modelo('ini');
    	$a = $m->getArreglo();
    	$desde = $m->getDesdeFuera();
    
        return new ViewModel(array('texto' => $m->getTexto(), 'a' => $a, 'desde' => $desde));
    }
}
