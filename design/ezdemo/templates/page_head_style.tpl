{if is_unset( $load_css_file_list )}
    {def $load_css_file_list = true()}
{/if}

{if $load_css_file_list}
  {ezcss_load( array( 'bootstrap.css',
                      'responsive.css',
                      'debug.css',
                      'websitetoolbar.css',
                      ezini( 'StylesheetSettings', 'CSSFileList', 'design.ini' ),
                      ezini( 'StylesheetSettings', 'FrontendCSSFileList', 'design.ini' ) ) )}
{else}
  {ezcss_load( array( 'bootstrap.css',
                      'responsive.css',
                      'debug.css',
                      'websitetoolbar.css' ) )}
{/if}

<link rel="stylesheet" type="text/css" href={ezini('StylesheetSettings','ClassesCSS','design.ini')|ezroot()} />
<link rel="stylesheet" type="text/css" href={ezini('StylesheetSettings','SiteCSS','design.ini')|ezroot()} />
<link rel="stylesheet" type="text/css" href={"stylesheets/print.css"|ezdesign} media="print" />

{def $font_settings = fetch( 'styleeditor', 'group', hash( 'group_id', ezini( 'SiteStyleGroups', 'FontSettings', 'ezstyleeditor.ini' ) ) )
     $background_settings = fetch( 'styleeditor', 'group', hash( 'group_id', ezini( 'SiteStyleGroups', 'BackgroundSettings', 'ezstyleeditor.ini' ) ) )
     $site_style = fetch('styleeditor', 'current_style')}

<style id="ezste-main-css" type="text/css">

{$background_settings.style_list[0].style.css}

{$font_settings.style_list[0].style.css}

{$site_style.style.css}

</style>
