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

    /**
     * Fetches list of available site styles
     *
     * @static
     * @return array
     */
    public static function fetchSiteStyleList()
    {
        $siteStyles = ezcsseSiteStyle::fetchList();

        return array( 'result' => $siteStyles );
    }

}
?>
