{ezscript_require( array( 'ezjsc::yui3', 'ezjsc::yui3io', 'ezjsc::yui2' ) )}



<div id="style-editor"></div>

{literal}
<script type="text/javascript">
    YUI(YUI3_config).use( 'tabview', 'io-ez', function( Y ) {

        var tabs = [ { label: 'Color Settings',
                       call: 'getsitestylestemplate' },
                     { label: 'Font Settings',
                       call: 'getfonttemplate' },
                     { label: 'Background Settings',
                       call: 'getbackgroundtemplate' } ];

        var tabView = new Y.TabView();

        Y.each( tabs, function( v, i ) {

            var tab = new Y.Tab( { label:v.label,
                                   content: 'Loading...' } );
            tab.after( 'selectedChange', function(e) {

                var callback = {
                    on: {
                        success: function ( id, r ) {
                            try {
                                json = Y.JSON.parse( r.responseText );
                            } catch (e) {
                                return;
                            }
                            this.set( 'content', json.content );

                            YUILoader.onSuccess = function() {
                                YAHOO.ez.colorPicker.cfg = {
                            {/literal}
                                    pickerthumb: {"picker_thumb.png"|ezimage},
                                    huethumb: {"hue_thumb.png"|ezimage}
                            {literal}
                                }
                                YAHOO.ez.colorPicker.init();
                            }
                            YUILoader.addModule({
                                name: "styleeditorcolorpicker",
                                type: "js",
                          {/literal}
                                fullpath: "{'javascript/ezstyleeditorcolorpicker.js'|ezdesign( 'no' )}"
                          {literal}
                            });

                            YUILoader.addModule({
                                name: "styleeditorstylesheet",
                                type: "css",
                          {/literal}
                                fullpath: "{'stylesheets/ezstyleeditor.css'|ezdesign( 'no' )}"
                          {literal}
                            });

                            YUILoader.require(["button","colorpicker","container","menu","slider","utilities","styleeditorcolorpicker"]);
                            YUILoader.insert({}, "js");
                        }
                    },
                    context: this.tab
                }

                Y.io( Y.io.ez.url + 'call/ezcsse::' + this.call + '?ContentType=json', callback );

            }, { tab: tab, call:v.call } );

            tabView.add( tab );
        } );

        tabView.render( '#style-editor' );

    });
</script>
{/literal}

