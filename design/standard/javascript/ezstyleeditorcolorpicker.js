
YAHOO.namespace("ez");
YAHOO.ez.colorPicker = function() {

	var Event = YAHOO.util.Event,
        Dom = YAHOO.util.Dom,
        oCfg = {};

    var randStr = function( nLen ) {
        var sRnd = "";
        var sChrs = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
        for ( var i=0; i < nLen; i++ ) {
            var nRandPos = Math.floor( Math.random() * sChrs.length );
            sRnd += sChrs.substring( nRandPos, nRandPos + 1 );
        }
        return sRnd;
    }

    var getColorPickerIcons = function () {
        var iconList = Dom.getElementsByClassName(
            "colorpicker-icon",
            "img"
        );
        return iconList;
    };

    var onRgbChange = function(o, elem) {
        var oContainer = elem.parentNode;
        var sColor = "#" + this.get("hex");
        Dom.getElementsBy( function(e) {
            return true;
        }, "input", oContainer )[0].value = sColor;
        Dom.setStyle( Dom.getElementsBy( function(e) {
            return true;
        }, "em", oContainer )[0], "backgroundColor", sColor);
    }

    var showColorPicker = function (e) {
        if( e.target ) {
            var oElement = e.target;
        } else if( e.srcElement ) {
            var oElement = e.srcElement;
        }
        
        oColorPickerMenu.setBody("&#32;");
        oColorPickerMenu.body.id = "colorpicker-container";
        oColorPickerMenu.render(document.body);

        var oColorPicker = new YAHOO.widget.ColorPicker(oColorPickerMenu.body.id, {
                                                showcontrols: false,
                                                images: {
                                                PICKER_THUMB: oCfg.pickerthumb,
                                                HUE_THUMB: oCfg.huethumb
                                                } });
        
        oColorPicker.on("rgbChange", onRgbChange, oElement);
        
        var x = Dom.getX( oElement );
        var y = Dom.getY( oElement );

        oColorPickerMenu.cfg.setProperty("x", x + 20 );
        oColorPickerMenu.cfg.setProperty("y", y + 20);
        oColorPickerMenu.show();
    };

    var oColorPickerMenu = new YAHOO.widget.Menu("colorpicker-menu", { zindex: 1000 });

    return  {

        cfg: {},
        
        setConfig: function() {
            oCfg = this.cfg;
        },

        init: function () {
                this.setConfig();
                Event.onDOMReady(this.makeIconsClickable, this, true);
            },

        makeIconsClickable: function () {
            var iconList = getColorPickerIcons();
            for (var i=0, j=iconList.length; i<j; i++) {
                Event.on( iconList[i], "click", showColorPicker );
            }
        }
    }
}();