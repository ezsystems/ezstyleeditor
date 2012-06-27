{def $current_node = fetch( 'content', 'node',  hash( 'node_id', '2' ) )}

{ezscript_require( array( 'ezjsc::yui3', 'ezjsc::yui3io', 'ezjsc::yui2' ) )}

<div id="style-editor"></div>

{literal}
<script type="text/javascript">
    YUI(YUI3_config).use( 'tabview', 'io-ez', 'io-upload-iframe', function( Y ) {

        /**
         * Handle the form token needed when posting something
         * if ezformtoken extension is enabled (CSRF protection)
         *
         * @return string the post query string or an empty string
         */
        var postToken = function() {
            var _token = '',
                _tokenNode = document.getElementById('ezxform_token_js');
            if ( _tokenNode ) {
                _token = 'ezxform_token=' + _tokenNode.getAttribute('title');
            }
            return _token;
        }

        var tabs = [ {
                    {/literal}
                        label: "{'Color variations'|i18n( 'design/standard/syleeditor/embed' )}",
                        call: "{concat( 'getsitestylestemplate::', $current_node.node_id )}"
                    {literal}
                     },
                     {
                     {/literal}
                         label: "{'Font settings'|i18n( 'design/standard/syleeditor/embed' )}",
                     {literal}
                         call: 'getfonttemplate'
                     },
                     {
                     {/literal}
                         label: "{'Background settings'|i18n( 'design/standard/syleeditor/embed' )}",
                         call: "{concat( 'getbackgroundtemplate::', $current_node.node_id )}"
                     {literal}
                     } ];

        var tabView = new Y.TabView();

        Y.each( tabs, function( v, i ) {

            var tab = new Y.Tab( {
                                   label:v.label,
            {/literal}
                                   content: "{'Loading ...'|i18n( 'design/standard/syleeditor/embed' )}"
                                 } );
            {literal}
            tab.after( "selectedChange", function(e) {

                var callback = {
                    on: {
                        success: function ( id, r ) {
                            try {
                                json = Y.JSON.parse( r.responseText );
                            } catch (e) {
                                return;
                            }
                            this.set( "content", json.content );

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

                            YUILoader.require(["menu","slider","utilities","colorpicker","styleeditorcolorpicker"]);
                            YUILoader.insert({},"js");

                            Y.on( "contentready", function() {
                                Y.one( "#ezste-upload-btn" ).on( "click", function( e ) {
                                    e.halt(true);

                                    Y.one("#ezste-error-desc").setContent("").hide();

                                    Y.on( "io:complete", function( id, o ) {
                                        var res = Y.JSON.parse( o.responseText );

                                        if ( res.errors.length > 0 ) {
                                            for( var i in res.errors ) {
                                                var error = res.errors[i], desc = "";
                                                desc += error.description + "<br />";

                                                Y.one("#ezste-error-desc").setContent( desc ).show();
                                            }
                                        } else {
                                            Y.one( "#ezste-image-preview" ).set( "src", res.content.path );
                                            Y.one( "#ezste-background-image" ).set( "value", "url(" + res.content.original_path + ")" );
                                        }
                                    }, Y );
                                    Y.io( Y.io.ez.url + "call/ezcsse::uploadimage", { method: "POST", data: postToken(), form: { id: "ezste-upload-form", upload: true } } );
                                } );
                            }, "#ezste-upload-btn", Y );


                        }
                    },
                    context: this.tab,
                    method: "POST",
                    data: postToken()
                }

                Y.io( Y.io.ez.url + "call/ezcsse::" + this.call + '?ContentType=json', callback );

            }, { tab: tab, call: v.call } );

            tabView.add( tab );
        } );

        tabView.render( "#style-editor" );
    });
</script>
{/literal}

