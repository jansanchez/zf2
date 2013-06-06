<?php
/**
 * Jan Sanchez (http://github.com/jansanchez)
 *
 * @author    @jansanchez
 * @copyright Copyright (c) 2013 Jan Sanchez
 * @license   New BSD License
 */

namespace Zend\View\Helper;

/**
 * Helper for load current HTML template
 */
class TplLoader extends AbstractHtmlElement
{
    /**
     * Generates a 'List' element.
     *
     * @param  array  $module         Current Module
     * @param  string $controller     Current Controller
     * @param  string $folderTemplate Folder Name of Templates
     * @param  string $fileName       File Name
     * @param  string $extension      File Extension
     * @return string The HTML Template
     */
    public function __invoke($module="application",$controller="persona",$folderTemplate="templates",$fileName="tpl",$extension="phtml")
    {
        $content = '';
        $fullPath = $module.'/'.$controller.'/'.$folderTemplate.'/'.$fileName.'.'.$extension;
        $content.= $this->view->render($fullPath);
        return $content;
    }
}