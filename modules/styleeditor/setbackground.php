<?php

$module = $Params['Module'];
$nodeId = $Params['NodeID'];

$node = eZContentObjectTreeNode::fetch( $nodeId );

if ( $module->isCurrentAction( 'Cancel' ) )
{
    if ( $node instanceof eZContentObjectTreeNode )
        $module->redirectTo( $node->attribute( 'url_alias' ) );
}

if ( $module->isCurrentAction( 'Reset' ) )
{
    if ( $module->hasActionParameter( 'ContentObjectID' ) )
    {
        $http = eZHTTPTool::instance();

        $objectId = $module->actionParameter( 'ContentObjectID' );

        $siteStyleGroup = ezcsseSiteStyleGroup::fetch( eZINI::instance( 'ezstyleeditor.ini' )->variable( 'SiteStyleGroups', 'BackgroundSettings' ) );
        $siteStyleList = $siteStyleGroup->attribute( 'style_list' );

        $styleDefinition = $siteStyleList[0]->attribute( 'style' );

        $style = ezcsseStyle::createFromXML( $styleDefinition->attribute( 'style' ) );

        if ( $style instanceof ezcsseStyle )
        {
            $rule = $style->getRuleBySelector( 'body' );
            $properties = array( 'background-image' => 'BackgroundImage',
                                 'background-position' => 'BackgroundPosition',
                                 'background-repeat' => 'BackgroundRepeat',
                                 'background-color' => 'BackgroundColor' );

            if ( $rule instanceof ezcsseRule )
            {
                foreach ( $properties as $name => $variable )
                {
                    $property = $rule->getPropertyByName( $name );

                    if ( $property instanceof ezcsseProperty )
                    {
                        $property->setAttribute( 'value', '' );
                    }
                }
            }

            $styleDefinition->setAttribute( 'style', $style->toXML() );
            $styleDefinition->store();
        }

        eZContentCacheManager::clearTemplateBlockCache( $objectId );

        if ( $node instanceof eZContentObjectTreeNode )
            $module->redirectTo( $node->attribute( 'url_alias' ) );

    }
}

if ( $module->isCurrentAction( 'Store' ) )
{
    if ( $module->hasActionParameter( 'ContentObjectID' ) )
    {
        $http = eZHTTPTool::instance();

        $objectId = $module->actionParameter( 'ContentObjectID' );

        $siteStyleGroup = ezcsseSiteStyleGroup::fetch( eZINI::instance( 'ezstyleeditor.ini' )->variable( 'SiteStyleGroups', 'BackgroundSettings' ) );
        $siteStyleList = $siteStyleGroup->attribute( 'style_list' );

        $styleDefinition = $siteStyleList[0]->attribute( 'style' );

        $style = ezcsseStyle::createFromXML( $styleDefinition->attribute( 'style' ) );

        if ( $style instanceof ezcsseStyle )
        {
            $rule = $style->getRuleBySelector( 'body' );
            $properties = array( 'background-image' => 'BackgroundImage',
                                 'background-position' => 'BackgroundPosition',
                                 'background-repeat' => 'BackgroundRepeat',
                                 'background-color' => 'BackgroundColor' );

            if ( $rule instanceof ezcsseRule )
            {
                foreach ( $properties as $name => $variable )
                {
                    $property = $rule->getPropertyByName( $name );

                    if ( $property instanceof ezcsseProperty )
                    {
                        $property->setAttribute( 'value', $http->variable( $variable ) );
                    }
                }
            }

            $styleDefinition->setAttribute( 'style', $style->toXML() );
            $styleDefinition->store();
        }

        eZContentCacheManager::clearTemplateBlockCache( $objectId );

        if ( $node instanceof eZContentObjectTreeNode )
            $module->redirectTo( $node->attribute( 'url_alias' ) );

    }
}
