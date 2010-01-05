<?php

/**
 * Collection of fetch functions
 * 
 */
class ezcsseSiteStyleFunctions
{
    /**
     * Fetches currently selected site style object
     * 
     * @return array
     */
    public static function fetchCurrentSiteStyle()
    {
        $siteStyle = ezcsseSiteStyle::fetchObject( ezcsseSiteStyle::definition(), null, array( 'selected' => 1 ) );
        
        return array( 'result' => $siteStyle );
    }

}
?>