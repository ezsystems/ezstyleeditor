<?php

/**
 * ezcsseServerCallFunctions implements methods 
 * called via XHR requests
 * 
 */
class ezcsseServerCallFunctions
{
    /**
     * Constructor
     * 
     */
    public function __construct() {}

    /**
     * Returns the list of properties for CSS rule in JSON format
     * 
     * @static
     * @return string The JSON string
     */
    public static function getElementStyles()
    {
        // Get currently selected ezcsseSiteStyle object
        $styleDefinition = self::getStyleDefinition();
        
        // Get style defintion object
        if ( !$styleDefinition instanceof ezcsseSiteStyleDefinition )
            return;

        $style = ezcsseStyle::createFromXML( $styleDefinition->attribute( 'style' ) );
        
        if ( !$style instanceof ezcsseStyle )
            return;

        $params = self::getPostParams();
        $selector = self::buildSelector( $params );
        
        // Get rule alias
        $rule = isset( $params['rule'] ) ? $params['rule'] : array();
        $alias = isset( $rule['alias'] ) ? $rule['alias'] : null;

        $rule = $style->getRuleBySelector( $selector );
        
        if ( $rule instanceof ezcsseRule )
        {
            foreach( $rule->attribute( 'properties' ) as $property )
            {
                $propertyArray = ezcssePropertyFunctions::fetchPropertyByName( $property->attribute( 'name' ) );

                foreach( $propertyArray['result'] as $attrName => $attrValue )
                {
                    $property->setAttribute( $attrName, $attrValue  );
                }
            }
        }
        else
        {
            // If rule was not found create a new one
            $rule = $style->addRule( new ezcsseRule );
            $rule->setAttribute( 'selector', $selector );
            $rule->setAttribute( 'alias', $alias );
            
            $styleDefinition->setAttribute( 'style', $style->toXML() );
            $styleDefinition->store();
        }

        return $rule->toJSON();
    }

    /**
     * Adds a new CSS property to given rule
     * 
     * @static
     */
    public static function addProperty()
    {
        // Get currently selected ezcsseSiteStyle object
        $styleDefinition = self::getStyleDefinition();
        
        // Get style defintion object
        if ( !$styleDefinition instanceof ezcsseSiteStyleDefinition )
            return;

        $style = ezcsseStyle::createFromXML( $styleDefinition->attribute( 'style' ) );
        
        if ( !$style instanceof ezcsseStyle )
            return;

        $params = self::getPostParams();
        $selector = self::buildSelector( $params );
        
        // Get property name
        $property = isset( $params['property'] ) ? $params['property'] : array();
        $name = isset( $property['name'] ) ? $property['name'] : null;
        
        $rule = $style->getRuleBySelector( $selector );
            
        if ( $rule instanceof ezcsseRule )
        {
            $property = $rule->addProperty( new ezcsseProperty() );
            $property->setAttribute( 'name', $name );
            $property->setAttribute( 'value', '' );
        }
        
        $styleDefinition->setAttribute( 'style', $style->toXML() );
        $styleDefinition->store();

        $propertyArray = ezcssePropertyFunctions::fetchPropertyByName( $property->attribute( 'name' ) );

        foreach( $propertyArray['result'] as $attrName => $attrValue )
        {
        	$property->setAttribute( $attrName, $attrValue  );
        }
        
        return $property->toJSON();
    }

    /**
     * Remove CSS properties from given rule
     * 
     * @static
     */
    public static function removeProperties()
    {
        // Get currently selected ezcsseSiteStyle object
        $styleDefinition = self::getStyleDefinition();
        
        // Get style defintion object
        if ( !$styleDefinition instanceof ezcsseSiteStyleDefinition )
            return;

        $style = ezcsseStyle::createFromXML( $styleDefinition->attribute( 'style' ) );
        
        if ( !$style instanceof ezcsseStyle )
            return;

        $params = self::getPostParams();
        $selector = self::buildSelector( $params );

        $rule = $style->getRuleBySelector( $selector );
            
        if( $rule instanceof ezcsseRule )
        {
            $propertyRemoveArray = isset( $params['remove_property'] ) ? $params['remove_property'] : array();

            foreach( $propertyRemoveArray as $propertyIndex )
                $rule->removeProperty( $propertyIndex );
        }

        $styleDefinition->setAttribute( 'style', $style->toXML() );
        $styleDefinition->store();
    }

    /**
     * Store the CSS properties for a given rule
     * 
     * @static
     * @return string A JSON string 
     */
    public static function storeProperties()
    {
        // Get currently selected ezcsseSiteStyle object
        $styleDefinition = self::getStyleDefinition();
        
        // Get style defintion object
        if ( !$styleDefinition instanceof ezcsseSiteStyleDefinition )
            return;

        $style = ezcsseStyle::createFromXML( $styleDefinition->attribute( 'style' ) );
        
        if ( !$style instanceof ezcsseStyle )
            return;

        $params = self::getPostParams();
        $selector = self::buildSelector( $params );

        $rule = $style->getRuleBySelector( $selector );
        
        if( !$rule instanceof ezcsseRule )
            return;

        $properties = isset( $params['properties'] ) ? $params['properties'] : array();
        $objectID = isset( $params['object_id'] ) ? $params['object_id'] : null;

        foreach( $properties as $propIndex => $propValue )
        {
            $property = $rule->getProperty( $propIndex );

            if ( !$property instanceof ezcsseProperty )
                continue;

            $value = isset( $propValue['value'] ) ? $propValue['value'] : '';    
            
            switch( $property->attribute( 'name' ) ) 
            {
                case 'background-color':
                    if( $value == '' )
                        $value = 'transparent';
                break;
            }
            
            $keyword = isset( $propValue['keyword'] ) ? $propValue['keyword'] : '';
            $length = isset( $propValue['length'] ) ? $propValue['length'] : '';
                            
            $property->setAttribute( 'keyword', $keyword );
            $property->setAttribute( 'length', $length );
                            
            if( $keyword != '' && $length != '' )
                $property->setAttribute( 'value', $keyword . $length );
            else if( $value != '' && $length != '' )
                $property->setAttribute( 'value', $value . $length );
            else if ( $keyword != '' && $value == '' )
                $property->setAttribute( 'value', $keyword );
            else
                $property->setAttribute( 'value', $value );
        }
        
        $styleDefinition->setAttribute( 'style', $style->toXML() );
        $styleDefinition->store();
        
        if ( $objectID )
            eZContentCacheManager::clearTemplateBlockCache( $objectID ); 
        
        return $rule->toJSON();
    }

    /**
     * Stores new site style
     * 
     * @static 
     */
    public static function storeSiteStyle()
    {
        $params = self::getPostParams();

        $siteStyleParam = isset( $params['site_style'] ) ? $params['site_style'] : array();
        $siteStyleID = isset( $siteStyleParam['id'] ) ? $siteStyleParam['id'] : null;
        $objectID = isset( $params['object_id'] ) ? $params['object_id'] : null;

        $db = eZDB::instance();
        $db->begin();
        
        $currSiteStyle = ezcsseSiteStyle::fetchObject( ezcsseSiteStyle::definition(), null, array( 'selected' => 1 ) );
        $currSiteStyle->setAttribute( 'selected', 0 );
        $currSiteStyle->store();
        
        $siteStyle = ezcsseSiteStyle::fetchObject( ezcsseSiteStyle::definition(), null, array( 'id' => $siteStyleID ) );
        $siteStyle->setAttribute( 'selected', 1 );
        $siteStyle->store();

        $db->commit();
        
        $siteStyleDef = ezcsseSiteStyleDefinition::fetchObject( ezcsseSiteStyleDefinition::definition(), 
                                                                null, 
                                                                array( 'sitestyle_id' => $siteStyle->attribute( 'id' ),
                                                                       'version' => $siteStyle->attribute( 'current_version' ) ) );
        $style = ezcsseStyle::createFromXML( $siteStyleDef->attribute( 'style' ) );

        if ( $objectID )
            eZContentCacheManager::clearTemplateBlockCache( $objectID );
        
        return $style->toJSON();
    }

    /**
     * Restore site style to given version
     *
     * @static
     */
    public static function restoreSiteStyle()
    {
        $params = self::getPostParams();
        
        $siteStyleVerParam = isset( $params['sitestyle_version'] ) ? $params['sitestyle_version'] : array();
        $siteStyleVerID = isset( $siteStyleVerParam['id'] ) ? $siteStyleVerParam['id'] : null;
        $objectID = isset( $params['object_id'] ) ? $params['object_id'] : null;
        
        $siteStyleVersion =  ezcsseSiteStyleVersion::fetchObject( ezcsseSiteStyleVersion::definition(), 
                                                                  null, 
                                                                  array( 'id' => $siteStyleVerID ) );
        $siteStyle = ezcsseSiteStyle::fetchObject( ezcsseSiteStyle::definition(), 
                                                   null, 
                                                   array( 'id' => $siteStyleVersion->attribute( 'sitestyle_id' ) ) );
        $currentVersion = $siteStyle->attribute('current_version');
        
        $siteStyleDef = ezcsseSiteStyleDefinition::fetchObject( ezcsseSiteStyleDefinition::definition(), 
                                                                null, 
                                                                array( 'sitestyle_id' => $siteStyleVersion->attribute( 'sitestyle_id' ),
                                                                       'version' => $siteStyleVersion->attribute( 'version' ) ) );
        $style = $siteStyleDef->attribute( 'style' );
        
        $newSiteStyleVersion = new ezcsseSiteStyleVersion();
        $newSiteStyleVersion->setAttribute( 'sitestyle_id', $siteStyle->attribute('id') );
        $newSiteStyleVersion->setAttribute( 'version', $currentVersion + 1 );
        $newSiteStyleVersion->setAttribute( 'created', time() );
        $newSiteStyleVersion->setAttribute( 'modified', time() );
        $newSiteStyleVersion->store();
        
        $newSiteStyleDef = new ezcsseSiteStyleDefinition();
        $newSiteStyleDef->setAttribute( 'sitestyle_id', $siteStyle->attribute('id') );
        $newSiteStyleDef->setAttribute( 'version', $currentVersion + 1 );
        $newSiteStyleDef->setAttribute( 'style', $style );
        $newSiteStyleDef->store();
        
        $siteStyle->setAttribute( 'current_version', $currentVersion + 1 );
        $siteStyle->store();
        
        $style = ezcsseStyle::createFromXML( $style );
        
        if ( $objectID )
            eZContentCacheManager::clearTemplateBlockCache( $objectID );
        
        return $style->toJSON();
    }

    /**
     * Returns list of available images in the repository
     * 
     * @return string A JSON string with image list
     */
    public static function getImageList()
    {
        $ini = eZINI::instance( 'ezstyleeditor.ini' );
        $rootNodeValue = $ini->variable( 'StyleEditor', 'ImageRepository' );
   
        if ( is_numeric( $rootNodeValue ) )
        {
            $node = eZContentObjectTreeNode::fetch( $rootNodeValue );
        }
        else
        {
            $nodeID = eZURLAliasML::fetchNodeIDByPath( $rootNodeValue );
            $node = eZContentObjectTreeNode::fetch( $nodeID );
        }

        if ( $node instanceof eZContentObjectTreeNode )
            $parentNodeID = $node->attribute('node_id');

        $images = eZContentObjectTreeNode::subTreeByNodeID( array( 'ClassFilterType' => 'include',
                                                                   'ClassFilterArray' => array( 'image' ) ), $parentNodeID );

        $imageList = array();
            
        foreach( $images as $image )
        {
            $dataMap = $image->dataMap();
            $content = $dataMap['image']->content();
            
            // Create an image alias   
            $content->imageAlias( 'styleeditor' );

            $aliasList = $content->aliasList();
            $originalPath = $aliasList['original']['full_path'];
            $path = $aliasList['styleeditor']['full_path'];
            $width = $aliasList['styleeditor']['width'];
            $height = $aliasList['styleeditor']['height'];
                
            eZURI::transformURI( $originalPath, true );
            eZURI::transformURI( $path, true );
                
            $nodeID = $image->attribute( 'node_id' );
            $name = $image->getName();

            $imageRow = array();
            $imageRow['node_id'] = $nodeID;
            $imageRow['original_path'] = $originalPath;
            $imageRow['path'] = $path;
            $imageRow['name'] = $name;
            $imageRow['width'] = $width;
            $imageRow['height'] = $height;
            
            $imageList[] = $imageRow;
        }
        
        $json = json_encode( $imageList );
        
        echo $json;
    }

    /**
     * Handles image upload operation
     * 
     * @static 
     */
    public static function uploadImage()
    {
            $contentINI = eZINI::instance( 'ezstyleeditor.ini' );
            $rep = $contentINI->variable( 'StyleEditor', 'ImageRepository' );

            if ( is_numeric( $rep ) )
                $contentNode = eZContentObjectTreeNode::fetch( $rep);
            else
            {
                $nodeID = eZURLAliasML::fetchNodeIDByPath( $rep );
                $contentNode = eZContentObjectTreeNode::fetch( $nodeID );
            }

            $upload = new eZContentUpload();

            $location = false;
            if ( is_object( $contentNode ) )
            $location = $contentNode->attribute( 'node_id' );

            $http = eZHTTPTool::instance();
            
            $fileName = '';
            if ( $http->hasPostVariable( 'FileName' ) )
                $fileName = $http->postVariable( 'FileName' );

            $success = $upload->handleUpload( $result, 'File', $location, false, $fileName );
    }

    /**
     * Removes image from the CSS Editor image repository
     * 
     * @static 
     */
    public static function removeImage()
    {
        $params = self::getPostParams();
        $image = isset( $params['image'] ) ? $params['image'] : array();
        $imageNodeID = isset( $image['node_id'] ) ? $image['node_id'] : null;
            
        $imageNode = eZContentObjectTreeNode::fetch( $imageNodeID );
            
        if( $imageNode instanceof eZContentObjectTreeNode )
        {
            $imageObject = $imageNode->object();
                
            if( $imageObject instanceof eZContentObject )
            {
                $imageObject->remove();
                $imageObject->purge();
            }
        }
    }

    /**
     * Return a list of available site styles
     * 
     * @static
     * @return string A JSON core 
     */
    public static function getSiteStyles()
    {
        $res = array();
        $siteStyles = ezcsseSiteStyle::fetchObjectList( ezcsseSiteStyle::definition(), null, null );
        
        foreach ( $siteStyles as $siteStyle )
        {
            $siteStyleRow = array();
            $siteStyleRow['id'] = $siteStyle->attribute( 'id' );
            $siteStyleRow['name'] = $siteStyle->attribute( 'name' );
            $siteStyleRow['version'] = $siteStyle->attribute( 'current_version' );
            $siteStyleRow['selected'] = $siteStyle->attribute( 'selected' );
            
            $res[] = $siteStyleRow;
        }

        $json = json_encode( $res );
        
        return $json;
    }

    /**
     * Creates a new site style with given name
     * 
     * @static 
     */
    public static function createSiteStyle()
    {
        $params = self::getPostParams();
        
        $siteStyleParam = isset( $params['site_style'] ) ? $params['site_style'] : array();
        $siteStyleName = isset( $siteStyleParam['name'] ) ? $siteStyleParam['name'] : null;
        
        $siteStyle = new ezcsseSiteStyle();
        $siteStyle->setAttribute( 'name', $siteStyleName );
        $siteStyle->setAttribute( 'current_version', 1 );
        $siteStyle->setAttribute( 'selected', 0 );
        $siteStyle->store();
        
        $siteStyleVersion = new ezcsseSiteStyleVersion();
        $siteStyleVersion->setAttribute( 'sitestyle_id', $siteStyle->attribute('id') );
        $siteStyleVersion->setAttribute( 'version', 1 );
        $siteStyleVersion->setAttribute( 'created', time() );
        $siteStyleVersion->setAttribute( 'modified', time() );
        $siteStyleVersion->store();
        
        $siteStyleDef = new ezcsseSiteStyleDefinition();
        $siteStyleDef->setAttribute( 'sitestyle_id', $siteStyle->attribute('id') );
        $siteStyleDef->setAttribute( 'version', 1 );
        $siteStyleDef->store();
    }
    
    /**
     * Returns a JSON string with list of last versions
     * 
     * @static
     * @return string A JSON string
     */
    public static function getSiteStyleVersions()
    {
        $params = self::getPostParams();
        
        $siteStyleParam = isset( $params['site_style'] ) ? $params['site_style'] : array();
        $siteStyleID = isset( $siteStyleParam['id'] ) ? $siteStyleParam['id'] : null;
        
        $siteStyle = ezcsseSiteStyle::fetch( $siteStyleID );
        
        $name = null;
        if ( $siteStyle instanceof ezcsseSiteStyle )
            $name = $siteStyle->attribute( 'name' );
        
        $siteStyleVersions = ezcsseSiteStyleVersion::fetchObjectList( ezcsseSiteStyleVersion::definition(), 
                                                                      null, 
                                                                      array( 'sitestyle_id' => $siteStyleID ), 
                                                                      array( 'id' => 'desc' ),
                                                                      array( 'limit' => 10 )  );
        $res = array();
        foreach ( $siteStyleVersions as $siteStyleVersion )
        {
            $versionRow = array();
            $versionRow['id'] = $siteStyleVersion->attribute( 'id' );
            $versionRow['version'] = $siteStyleVersion->attribute( 'version' );
            $versionRow['created'] = $siteStyleVersion->attribute( 'created' );
            $versionRow['modified'] = $siteStyleVersion->attribute( 'modified' );
            $versionRow['name'] = $name;
            
            $res[] = $versionRow;
        }
        
        $json = json_encode( $res );
        
        return $json;
    }

    /**
     * Returns the ezcsseSiteStyleDefinition object
     * 
     * @static
     * @return ezcsseSiteStyleDefinition
     */
    public static function getStyleDefinition()
    {
        $siteStyle = ezcsseSiteStyle::fetchObject( ezcsseSiteStyle::definition(), null, array( 'selected' => 1 ) );
        $version = $siteStyle->attribute( 'version' );
        $styleDefinition = $siteStyle->attribute( 'style' );
        
        return $styleDefinition;
    }

    /**
     * A helper function which builds a selector from POST params
     * 
     * @static
     * @param array $params
     * @return string|null The CSS selector
     */
    public static function buildSelector( array $params )
    {
        $element = isset( $params['element'] ) ? $params['element'] : array();
        $rule = isset( $params['rule'] ) ? $params['rule'] : array();
        $selector = isset( $rule['selector'] ) ? $rule['selector'] : null;

        if ( !$selector )
        {
            $name = isset( $element['name'] ) ? $element['name'] : null;
            $id = isset( $element['id'] ) ? $element['id'] : null;
            
            if ( $name != '' && $id != '' )
                $selector = strtolower( $name ) . '#' . $id;
            else
                $selector = strtolower( $name );
        }
        
        return $selector;
    }

    /**
     * Returns the POST params from XHR request
     * 
     * @static
     * @return array The POST params 
     */
    public static function getPostParams()
    {
        $http = eZHTTPTool::instance();
        
        $params = array();
        if ( $http->hasPostVariable( 'Params' ) )
            $params = $http->postVariable( 'Params' );
        
        return $params;
    }

    /**
     * Fetches CSS property list
     * 
     * @static
     * @return string A JSON string
     */
    public static function getPropertyList()
    {
        $json = ezcssePropertyFunctions::fetchListAsJSON();
        
        return $json;
    }
}

?>