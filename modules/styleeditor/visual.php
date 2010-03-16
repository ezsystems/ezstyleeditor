<?php

include_once( 'kernel/common/template.php' );

$Module = $Params['Module'];

if ( isset( $Params['NodeID'] ) )
    $nodeID = $Params['NodeID'];

if ( !$nodeID )
    return $Module->handleError( eZError::KERNEL_NOT_AVAILABLE, 'kernel' );
    
if ( isset( $Params['LanguageCode'] ) )
{
    $languageCode = $Params['LanguageCode'];
}
else
{
    $locale = eZLocale::instance();
    $languageCode = $locale->localeCode();
}

$node = eZContentObjectTreeNode::fetch( $nodeID, $languageCode );

if ( !$node )
    return $Module->handleError( eZError::KERNEL_NOT_AVAILABLE, 'kernel' );

// Get selected Site Style
$siteStyle = ezcsseSiteStyle::fetchObject( ezcsseSiteStyle::definition(), null, array( 'selected' => 1 ) );

// Check if Site Style is available if not, then create a new one
if ( $siteStyle instanceof ezcsseSiteStyle )
{
    $styleDefinition = $siteStyle->attribute( 'style' );
    $currentVersion = $siteStyle->attribute( 'current_version' );
    $style = $styleDefinition->attribute( 'style' );
    $siteStyle->setAttribute( 'current_version', $currentVersion + 1 );
    $siteStyle->store();
 
     // Create a new version   
    $siteStyleVersion = new ezcsseSiteStyleVersion();
    $siteStyleVersion->setAttribute( 'sitestyle_id', $siteStyle->attribute('id') );
    $siteStyleVersion->setAttribute( 'version', $currentVersion + 1 );
    $siteStyleVersion->setAttribute( 'created', time() );
    $siteStyleVersion->setAttribute( 'modified', time() );
    $siteStyleVersion->store();
    
    $siteStyleDef = new ezcsseSiteStyleDefinition();
    $siteStyleDef->setAttribute( 'sitestyle_id', $siteStyle->attribute('id') );
    $siteStyleDef->setAttribute( 'version', $currentVersion + 1 );
    $siteStyleDef->setAttribute( 'style', $style );
    $siteStyleDef->store();
}
else
{
    $siteStyle = new ezcsseSiteStyle();
    $siteStyle->setAttribute( 'name', 'New style' );
    $siteStyle->setAttribute( 'current_version', 1 );
    $siteStyle->setAttribute( 'selected', 1 );
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


$tpl = templateInit();
$ini = eZINI::instance();
$http = eZHTTPTool::instance();

$contentObject = $node->attribute( 'object' );

$nodeResult = eZNodeviewfunctions::generateNodeViewData( $tpl, $node, $contentObject, $languageCode, 'full', 0 );

// Generate a unique cache key for use in cache-blocks in pagelayout.tpl.
// This should be looked as a temporary fix as ideally all cache-blocks 
// should be disabled by this view.
$cacheKey = 'styleeditorvisual-' + time();
$nodeResult['title_path'] = array( array( 'text' => 'Visual' ), array( 'text' => $node->attribute( 'name' ) ) );

$httpCharset = eZTextCodec::httpCharset();
$locale = eZLocale::instance();
$languageCode = $locale->httpLocaleCode();

$title = $ini->variable( 'SiteSettings', 'SiteName' );

$uri = eZURI::instance( eZSys::requestURI() );
$GLOBALS['eZRequestedURI'] = $uri;

$site = array( 'title' => $title,
               'uri' => $uri,
               'design' => $ini->variable( 'DesignSettings', 'SiteDesign' ),
               'http_equiv' => array( 'Content-Type' => 'text/html; charset=' . $httpCharset,
                                      'Content-language' => $languageCode ) );

$currentUser = eZUser::currentUser();
$tpl->setVariable( 'current_user', $currentUser );
$tpl->setVariable( 'ui_context', '' );

$access = accessType( $uri,
                      eZSys::hostname(),
                      eZSys::serverPort(),
                      eZSys::indexFile() );

$lastAccessURI = '/';
if ( $http->hasSessionVariable( 'LastAccessesURI' ) )
    $lastAccessURI = $http->sessionVariable( 'LastAccessesURI' );

$tpl->setVariable( 'last_access_uri', $lastAccessURI ); 
$tpl->setVariable( 'access_type', $access );
$tpl->setVariable( 'uri_string', $uri->uriString() );

$tpl->setVariable( 'site', $site );
$tpl->setVariable( 'extra_cache_key', $cacheKey );
$tpl->setVariable( 'module_result', $nodeResult );
$tpl->setVariable( 'node', $node );
$tpl->setVariable( 'display_styleeditor_visualtoolbar', true );

$pagelayoutResult = $tpl->fetch( 'design:pagelayout.tpl' );

eZDisplayResult( $pagelayoutResult );

// Stop execution at this point, if we do not we'll have the 
// pagelayout.tpl inside another pagelayout.tpl.
eZExecution::cleanExit();

?>