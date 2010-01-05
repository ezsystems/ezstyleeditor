<?php

/**
 * ezcssePropertyFunctions class definition
 * 
 */
class ezcssePropertyFunctions
{
    /**
     * 
     */
    const PROPERTIES_XML_DEF = 'extension/ezstyleeditor/xml/properties.xml';
    
    /**
     * Fetches property by given name
     * 
     * @static
     * @param string $name
     * @return array
     */
    static function fetchPropertyByName( $name )
    {
        $list = self::fetchList();
        $property = self::searchInArray( $name, $list );

        $result = array( 'result' => $property );

        return $result;
    }

    /**
     * Helper function used for search propery in the list array
     * 
     * @static
     * @param string $needle
     * @param array $haystack
     * @return mixed 
     */
    static function searchInArray( $needle, array $haystack )
    {
        $result = false;

        foreach ( $haystack as $key => $value )
        {
            if ( $value == $needle )
                return $haystack;

            if ( is_array( $value ) )
                $result = self::searchInArray( $needle, $value );
            
            if ( $result !== false )
                return $result;
        }

        return $result;
    }

    /**
     * Fetches all CSS properties definied in the XML file and
     * 
     * @static
     * @return array CSS properties
     */
    static function fetchList()
    {
        $properties = array();

        $dom = new DOMDocument();
        $dom->load( self::PROPERTIES_XML_DEF );

        $root = $dom->documentElement;

        if ( $root->hasChildNodes() )
        {
            $catIndex = 0;
            foreach ( $root->childNodes as $category )
            {
                if ( $category->nodeType == XML_ELEMENT_NODE )
                {
                    foreach ( $category->attributes as $attr )
                    {
                        $properties['categories'][$catIndex][$attr->name] = $attr->value;
                    }

                    if ( $category->hasChildNodes() )
                    {
                        $propIndex = 0;
                        foreach ( $category->childNodes as $property )
                        {
                            if ( $property->nodeType == XML_ELEMENT_NODE )
                            {
                                if ( $property->hasAttributes() )
                                {
                                    $attributies = array();

                                    foreach ( $property->attributes as $attr )
                                    {
                                        $attributies[$attr->name] = $attr->value;
                                    }

                                    $properties['categories'][$catIndex]['properties'][$propIndex] = $attributies;
                                }

                                if ( $property->hasChildNodes() )
                                {
                                    foreach( $property->childNodes as $option )
                                    {
                                        if ( $option->nodeType == XML_ELEMENT_NODE )
                                        {
                                            if ( $option->hasAttributes() )
                                            {
                                                $attributies = array();

                                                foreach ( $option->attributes as $attr )
                                                {
                                                    $properties['categories'][$catIndex]['properties'][$propIndex]['options'][] = $attr->value;
                                                }
                                            }
                                        }
                                    }
                                }
                                $propIndex++;
                            }
                        }
                    }
                    $catIndex++;
                }
            }
        }

        return array( 'result' => $properties );
    }
    
    /**
     * Return categories and all properties in JSON format
     * 
     * @static
     * @return string JSON format
     */
    static function fetchListAsJSON()
    {
        $list = self::fetchList();

        $result = $list['result'];
        $json = json_encode( $result );

        return $json;
    }
}
?>