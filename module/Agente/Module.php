<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Agente;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager        = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);

        $sharedEvents = $eventManager->getSharedManager();

        $sharedEvents->attach(__NAMESPACE__, 'dispatch', function($e) {


            $controller = $e->getTarget();
            $route = $controller->getEvent()->getRouteMatch();

            //print_r($route);
            //exit;

            $e->getViewModel()->setVariables(
                array(
                    'moduleName' => strtolower(__NAMESPACE__),
                    'controllerName'=> strtolower($route->getParam('__CONTROLLER__')),
                    'actionName' => $route->getParam('action', 'index')
                    )
            );
        }, 100);
      

    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }
}
