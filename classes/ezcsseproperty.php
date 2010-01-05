<?php

/**
 * ezcsseProperty class definition
 * 
 */
class ezcsseProperty
{
    /**
     * Stores object attributes
     * 
     * @private
     * @var array Contains object attributes
     */
    private $attributes = array();

    /**
     * Constructor. Initializes name and value attributes
     *  
     */
    public function __construct()
    {
        $this->attributes['name'] = false;
        $this->attributes['value'] = false;
    }

    /**
     * Sets object attribute value for given name
     * 
     * @param string $name
     * @param mixed $value
     */
    public function setAttribute( $name, $value )
    {
        $this->attributes[$name] = $value;
    }

    /**
     * Returns a list of available attributes
     * 
     * @return array Available attribute list 
     */
    public function attributes()
    {
        return array_keys( $this->attributes );
    }

    /**
     * Returns an attribute value for given name
     * 
     * @param string $name
     * @return mixed|false An attribute value 
     */
    public function attribute( $name )
    {
        if ( $this->hasAttribute( $name ) )
            return $this->attributes[$name];
        else
            return false;
    }

    /**
     * Checkes if attribute for given name exists
     * 
     * @param string $name
     * @return bool 
     */
    public function hasAttribute( $name )
    {
        return in_array( $name, array_keys( $this->attributes ) );
    }

    /**
     * Create a DOM element for current property object and its attributes
     * 
     * @param DOMDocument $dom
     * @return DOMElement
     */
    public function toXML( DOMDocument $dom )
    {
        $propertyNode = $dom->createElement( 'property' );

        foreach( $this->attributes as $attrName => $attrValue )
        {
            $propertyNode->setAttribute( $attrName, $attrValue );
        }

        return $propertyNode;
    }

    /**
     * Returns current object as a JSON string
     * 
     * @return string A JSON string 
     */
    public function toJSON()
    {
        $json = json_encode( $this->attributes );
        return $json;
    }

    /**
     * Returns current object as a CSS string
     * 
     * @return string A CSS string 
     */
    public function toCSS()
    {
    	$property = '';
    	
    	if ( $this->attribute( 'value' ) != "" )
            $property = ezcsseStyle::tabIndent() . $this->attribute( 'name' ) . ": " . $this->attribute( 'value' ) . ";";

        return $property;
    }

    /**
     * Creates a new ezcsseProperty object from given XML node
     * 
     * @param DOMElement $node
     * @return ezcsseProperty A new ezcsseProperty object
     */
    static function createFromXML( DOMElement $node )
    {
        $newObj = new ezcsseProperty();

        if ( $node->hasAttributes() )
        {
            foreach ( $node->attributes as $attr )
            {
                $newObj->setAttribute( $attr->name, $attr->value );
            }
        }

        foreach ( $node->childNodes as $node )
        {
            if ( $node->nodeType == XML_ELEMENT_NODE )
            $newObj->setAttribute( $node->nodeName, $node->nodeValue );
        }

        return $newObj;
    }
}

?>