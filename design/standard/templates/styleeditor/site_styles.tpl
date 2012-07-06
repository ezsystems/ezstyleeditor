<form action="{concat( '/styleeditor/setsitestyle/', $node.node_id )|ezurl( 'no' )}" method="post">
    <div class="site-styles-container row">

        {def $color_themes = fetch( 'styleeditor', 'group', hash( 'group_id', ezini( 'SiteStyleGroups', 'ColorThemeSettings', 'ezstyleeditor.ini' ) ) )}

        {foreach $color_themes.style_list as $site_style}
        <div class="site-style span6">
            <div class="site-style-name">
                <h3>{$site_style.name|wash()}</h3>
            </div>
            <div class="site-style-thumbnail">
                <img src="{$site_style.thumbnail|ezimage('no')}" />
            </div>
            <div class="site-style-selector">
                <input type="radio" name="SiteStyleID" value="{$site_style.id}"{if eq( $site_style.selected, '1' )} checked="checked"{/if} />
            </div>
        </div>
        {/foreach}

    </div>

    <div class="site-style-buttons">
        <input type="submit" value="{'Cancel'|i18n( 'design/standard/syleeditor/embed' )}" name="CancelButton" class="btn" />
        <input type="submit" value="{'Store'|i18n( 'design/standard/syleeditor/embed' )}" name="StoreButton" class="btn btn-warning" />
        <input type="hidden" name="ContentObjectID" value="{$object.id}" />
        <input type="hidden" name="ezxform_token" value="{$form_token}" />
    </div>
</form>
