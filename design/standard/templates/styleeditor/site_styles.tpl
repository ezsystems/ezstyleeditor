<form action="{'/styleeditor/setsitestyle'|ezurl( 'no' )}" method="post">
    <div class="site-styles-container row">

        {def $site_styles = fetch( 'styleeditor', 'site_style_list' )}

        {foreach $site_styles as $site_style}
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
        <input type="submit" value="{'Cancel'|i18n( 'design/standard/ezcssstyle' )}" name="CancelButton" class="btn">
        <input type="submit" value="{'Store'|i18n( 'design/standard/ezcssstyle' )}" name="StoreButton" class="btn btn-warning">
    </div>
</form>
