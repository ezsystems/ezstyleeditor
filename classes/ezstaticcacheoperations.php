<?php

class eZStaticCacheOperations
{
    function __construct()
    {
    }
    
    /**
     * Clears all static cache for a site
     * Removers all static cache, but not the static cache directory itself.
     *
     * Currently, this function only supports 'combined_host_url'
     *
     */
    static function clearStaticCache()
    {
        $ini = eZINI::instance( 'staticcache.ini' );
        $storageDir = $ini->variable( 'CacheSettings', 'StaticStorageDir' );

        // Check that we have combined_host_url hostmatching
        $siteIni = eZINI::instance();
        $matchType = $siteIni->variable( 'SiteAccessSettings', 'MatchOrder' );
        if ( $matchType !== 'combined_host_url')
            throw new Exception('combined_host_url required for this workflow');

        global $eZCurrentAccess;
        $siteAccess = $eZCurrentAccess['name'];

        //Get hostname part from siteaccess name (exclude for instance _eng or _admin)
        if ( strpos( $siteAccess, '_' )  === false )
            $hostName = $siteAccess;
        else
            $hostName = substr( $siteAccess, 0, strpos( $siteAccess, '_' ) );

        $staticCacheDir = eZDir::path( array( $storageDir, $hostName ) );

        // Sanity checking, make sure we don't remove everyones static cache.
        if ( $staticCacheDir == $storageDir )
            throw new Exception( "Failed to find correct static cache directory : $staticCacheDir \n");

        $dirs = scandir( $staticCacheDir );
        foreach ( $dirs as $dir)
        {
            if ( ( $dir !== '.' ) && ( $dir !== '..' ) )
            {
                $fullPath = eZDir::path( array( $staticCacheDir, $dir) );


                if ( is_dir( $fullPath ))
                {
                    ezcBaseFile::removeRecursive( $fullPath );
                }
                else
                {
                    if ( !unlink( $fullPath ) )
                        throw new ezsfFileCouldNotRemoveException( $fullPath );
                }
            }
        }
    }
}
?>
