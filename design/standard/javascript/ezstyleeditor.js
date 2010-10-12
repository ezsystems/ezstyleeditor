YAHOO.namespace("ez"); 
YAHOO.ez.StyleEditor = function() {

    var yue = YAHOO.util.Event,
        yud = YAHOO.util.Dom,
        yuc = YAHOO.util.Connect;

    var oInsertImgDialog = {},
        oPropDialog = {},
        oSiteStyleDialog = {},
        oRestoreStyleDialog = {},
        oGroupDialog = {},
        oManager = {},
        oCfg = {},
        oCachedProperties = [],
        nPropertyCount = 0,
        oWorkingElement = {},
        aLength = [];
    
    aLength["px"] = "pixels";
    aLength["pt"] = "points";
    aLength["in"] = "in";
    aLength["cm"] = "cm";
    aLength["mm"] = "mm";
    aLength["pc"] = "picas";
    aLength["em"] = "ems";
    aLength["ex"] = "exs";
    aLength["%"] = "%";

    /*
        private section
    */

    var handleError = function(errObj) {
        var oDiv = document.createElement("div"),
            oDivErrorCode = document.createElement("div"),
            oDivErrorDsc = document.createElement("div");
        
        yud.addClass( oDiv, "error" );
        yud.addClass( oDivErrorCode, "code" );
        yud.addClass( oDivErrorDsc, "description" );
        
        oDivErrorCode.appendChild( document.createTextNode( "Error code: " + errObj.code ) );
        oDivErrorDsc.appendChild( document.createTextNode( "Error description: " + errObj.description ) );
        
        oDiv.appendChild(oDivErrorCode);
        oDiv.appendChild(oDivErrorDsc);
        
        return oDiv;
    }

    var onSubmenuShow = function() {

        if( this.id == "ezste-menu-label" ) {
                
            this.cfg.setProperty( "x", 0 );
                    
        }

        var oElement,
            nOffsetWidth;
                    
        if( ( this.id == "elementsmenu" ) && YAHOO.env.ua.ie ) {
            
                oElement = this.element;
                nOffsetWidth = oElement.offsetWidth;
            
                oElement.style.width = nOffsetWidth + "px";
                oElement.style.width = (nOffsetWidth - (oElement.offsetWidth - nOffsetWidth)) + "px";
        }

    }
    
    var getSiteStyleVersions = function( target ) {
        var oRestoreStylesDiv = target;
        var sServerCall = "ezcsse::getsitestyleversions";
        
        var oForm = yud.get("ezste-sitestyle-dialog-form");
        yuc.setForm(oForm);
        
        var oCallbacks = {
            success: function (o) {
            
                var oResponse = {};

                try {
                    
                    oResponse = YAHOO.lang.JSON.parse(o.responseText);
                
                }
                catch (x) {
                    
                    return;
                
                }

                oRestoreStylesDiv.innerHTML = "";

                var oTable = document.createElement("table");
                oTable.cellPadding = "0";
                oTable.cellSpacing = "0";
                oTable.border = "0";
                yud.addClass( oTable, "properties" );
                var oTBody = document.createElement("tbody");

                var oHeaderTr = document.createElement("tr");
                
                var oThSiteStyleSel = document.createElement("th");
                yud.addClass( oThSiteStyleSel, "first" );
                
                
                var oThSiteStyleVersion = document.createElement("th");
                var oThSiteStyleVerValue = document.createTextNode(oCfg.DIALOG_LABELS[7]);
                
                oThSiteStyleVersion.appendChild( oThSiteStyleVerValue );
                
                var oThSiteStyleCreated = document.createElement("th");
                var oThSiteStyleCreatedValue = document.createTextNode(oCfg.DIALOG_LABELS[8]);
                
                oThSiteStyleCreated.appendChild( oThSiteStyleCreatedValue );

                var oThSiteStyleModified = document.createElement("th");
                var oThSiteStyleModifiedValue = document.createTextNode(oCfg.DIALOG_LABELS[9]);
                
                oThSiteStyleModified.appendChild( oThSiteStyleModifiedValue );
                
                oHeaderTr.appendChild( oThSiteStyleSel );
                oHeaderTr.appendChild( oThSiteStyleVersion );
                oHeaderTr.appendChild( oThSiteStyleCreated );
                oHeaderTr.appendChild( oThSiteStyleModified );
                
                oTBody.appendChild( oHeaderTr );
                
                var oObjectIDInput = document.createElement("input");
                oObjectIDInput.type = "hidden";
                oObjectIDInput.name = "Params[object_id]";
                oObjectIDInput.value = oCfg.object;
                
                oRestoreStylesDiv.appendChild( oObjectIDInput );
                
                for (var i = 0; i < oResponse.length; i++) {
                    var oSiteStyleVersion = oResponse[i];
                    var oTr = document.createElement("tr");
                    
                    var oTdSiteStyleSel = document.createElement("td");
                    yud.addClass( oTdSiteStyleSel, "tight first" );
                    
                    if ( YAHOO.env.ua.ie > 0 ) {
                        var oSelectOption = document.createElement("<input type=\"radio\" name=\"Params[sitestyle_version][id]\" value=\"" + oSiteStyleVersion.id + "\"/>");
                    } else {
                        var oSelectOption = document.createElement("input");
                        oSelectOption.name = "Params[sitestyle_version][id]";
                        oSelectOption.type = "radio";
                        oSelectOption.value = oSiteStyleVersion.id;
                    }

                    if ( oSiteStyleVersion.selected == 1 )
                        oSelectOption.defaultChecked = true;
                        
                    oTdSiteStyleSel.appendChild( oSelectOption );

                    var oTdSiteStyleVersion = document.createElement("td");
                    var oTdSiteStyleVersionVal = document.createTextNode( oSiteStyleVersion.version );
                    
                    oTdSiteStyleVersion.appendChild( oTdSiteStyleVersionVal );
                    
                    var modified = new Date( oSiteStyleVersion.modified * 1000 );
                    var modifiedStr = modified.getDate() + "/" + ( modified.getMonth() + 1 ) + "/" + modified.getFullYear() + " " + modified.getHours() + ":" + modified.getMinutes() + ":" + modified.getSeconds();
                    
                    var oTdSiteStyleModified = document.createElement("td");
                    var oTdSiteStyleModifiedVal = document.createTextNode( modifiedStr );

                    oTdSiteStyleModified.appendChild( oTdSiteStyleModifiedVal );

                    var created = new Date( oSiteStyleVersion.created * 1000 );
                    var createdStr = created.getDate() + "/" + ( created.getMonth() + 1 ) + "/" + created.getFullYear() + " " + created.getHours() + ":" + created.getMinutes() + ":" + created.getSeconds();
                    
                    var oTdSiteStyleCreated = document.createElement("td");
                    var oTdSiteStyleCreatedVal = document.createTextNode( createdStr );

                    oTdSiteStyleCreated.appendChild( oTdSiteStyleCreatedVal );
                    
                    oTr.appendChild( oTdSiteStyleSel );
                    oTr.appendChild( oTdSiteStyleVersion );
                    oTr.appendChild( oTdSiteStyleModified );
                    oTr.appendChild( oTdSiteStyleCreated );
                        
                    oTBody.appendChild( oTr );
                }
                
                oTable.appendChild( oTBody );
                    
                oRestoreStylesDiv.appendChild( oTable );

                oRestoreStyleDialog.sizeUnderlay();
            },
                
            failure: function (o) {
            
                if ( !yuc.isCallInProgress(o) ) {
            
                }
            },

            timeout : 10000
                
        };
        
        yuc.asyncRequest( "POST", oCfg.requestpath + "/" + sServerCall, oCallbacks );
    }
    
    var getSiteStyles = function( target ) {
            var oSiteStylesDiv =  target;
            var sServerCall = "ezcsse::getsitestyles";
            
            var oCallbacks = {
                success: function (o) {
                
                    var oResponse = {};

                    try {
                    
                        oResponse = YAHOO.lang.JSON.parse(o.responseText);
                
                    }
                    catch (x) {

                        return;
                
                    }

                    oSiteStylesDiv.innerHTML = "";

                    var oTable = document.createElement("table");
                    oTable.cellPadding = "0";
                    oTable.cellSpacing = "0";
                    oTable.border = "0";
                    yud.addClass( oTable, "properties" );
                    var oTBody = document.createElement("tbody");
                    
                    for( var i =0; i < oResponse.length; i++ ) {
                        var oSiteStyle = oResponse[i];
                        var oTr = document.createElement("tr");
                        
                        var oTdSiteStyleSel = document.createElement("td");
                        yud.addClass( oTdSiteStyleSel, "tight first" );
                        
                        if ( YAHOO.env.ua.ie > 0 ) {
                            var oSelectOption = document.createElement("<input type=\"radio\" name=\"Params[site_style][id]\" value=\"" + oSiteStyle.id + "\"/>");
                        } else {
                            var oSelectOption = document.createElement("input");
                            oSelectOption.name = "Params[site_style][id]";
                            oSelectOption.type = "radio";
                            oSelectOption.value = oSiteStyle.id;
                        }

                        if ( oSiteStyle.selected == 1 )
                            oSelectOption.defaultChecked = true;
                        
                        oTdSiteStyleSel.appendChild( oSelectOption );
                        
                        var oTdSiteStyleName = document.createElement("td");
                        var oTdSiteStyleNameVal = document.createTextNode( oSiteStyle.name );
                        
                        oTdSiteStyleName.appendChild( oTdSiteStyleNameVal );
                        
                        oTr.appendChild( oTdSiteStyleSel );    
                        oTr.appendChild( oTdSiteStyleName );
                        
                        oTBody.appendChild( oTr );
                    }
                    
                    oTable.appendChild( oTBody );
                    
                    oSiteStylesDiv.appendChild( oTable );
                   
                    oSiteStyleDialog.sizeUnderlay();
                },
                
                failure: function (o) {
            
                    if ( !yuc.isCallInProgress(o) ) {
            
                    }
                },

                timeout : 10000
                
            };
            
            yuc.asyncRequest( "POST", oCfg.requestpath + "/" + sServerCall, oCallbacks );
    }
    
    var addNewProperty = function( property, i ) {
        var oProperty = property;
        var oTr = document.createElement("tr");
        
        if (oCfg.mode == "administrator") {
            var oTdPropRemove = document.createElement("td");
            yud.addClass(oTdPropRemove, "tight");
            yud.addClass(oTdPropRemove, "first");
            
            var oPropRemoveInput = document.createElement("input");
            oPropRemoveInput.name = "Params[remove_property][]";
            oPropRemoveInput.type = "checkbox";
            oPropRemoveInput.value = i;
        
            oTdPropRemove.appendChild( oPropRemoveInput );
            oTr.appendChild( oTdPropRemove );
        }
        
        var oTdPropName = document.createElement("td");
        yud.addClass( oTdPropName, "propname" );
        
        if( oCfg.mode == "user") {
             yud.addClass( oTdPropName, "first" );
        }
        var oTdPropValue = document.createElement("td");
        
        var oTdPropNameContent = document.createTextNode( oProperty.name );
        oTdPropName.appendChild( oTdPropNameContent );
        
        var oPropNameInput = document.createElement("input");
        oPropNameInput.name = "Params[properties][" + i + "][name]";
        oPropNameInput.type = "hidden";
        oPropNameInput.value = oProperty.name;

        var oPropTypeInput = document.createElement("input");
        oPropTypeInput.name = "Params[properties][" + i + "][type]";
        oPropTypeInput.type = "hidden";
        oPropTypeInput.value = oProperty.type;

        oTdPropName.appendChild( oPropNameInput );
        oTdPropName.appendChild( oPropTypeInput );
        
        switch( oProperty.type )
        {
            case 'color':
                var oDiv = document.createElement("div");
                
                var oColorHexPattern = /^#?([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?$/;
                var bMatch = oColorHexPattern.test(oProperty.value)

                if( !bMatch ) {
                    if ( oProperty.value != "transparent" ) {
                        oProperty.value = "";
                    }
                }
                
                
                var oEm = document.createElement("em");
                yud.addClass( oEm, "colorpicker-color" );
                yud.setStyle( oEm, "background-color", oProperty.value );
                
                var oInput = document.createElement("input");
                oInput.name = "Params[properties][" + i + "][value]";
                oInput.value = oProperty.value;
                
                yud.addClass( oInput, "quarterbox" );
                
                var oImg = document.createElement("img");
                yud.addClass( oImg, "colorpicker-icon" );
                oImg.src = oCfg.colorpickericon;
                
                oDiv.appendChild(oEm);
                oDiv.appendChild(oInput);
                oDiv.appendChild(oImg);
                
                oTdPropValue.appendChild( oDiv );

                yue.onContentReady( "ezste-properties-dialog", function(e) {
                    YAHOO.ez.colorPicker.cfg = { pickerthumb: oCfg.pickerthumb,
                                                 huethumb: oCfg.huethumb };
                    YAHOO.ez.colorPicker.init();
                } );
                break;
            case 'font':
                var oSelect = document.createElement("select");
                oSelect.name = "Params[properties][" + i + "][value]";
                
                for( index in oProperty.options )
                {
                    var oOption = document.createElement("option");
                    oOption.value = oProperty.options[index];
                    
                    if( oOption.value == oProperty.value )
                    {
                        oOption.selected = true;
                        // TODO: Opera 9.26 workround for bug:
                        // "Using JavaScript to set Select Option as Selected (bug)"
                        oOption.defaultSelected = true;
                    }
                    
                    var oOptionText = document.createTextNode( oProperty.options[index] );
                    oOption.appendChild(oOptionText);
                    
                    oSelect.appendChild(oOption);
                }
                
                oTdPropValue.appendChild( oSelect );
                break;
            case 'keyword-length':
                var oInput = document.createElement("input");
                oInput.type = "text";
                oInput.name = "Params[properties][" + i + "][value]";
                oInput.value = oProperty.value;

                yud.addClass( oInput, "quarterbox" );
                
                yue.addListener( oInput, "keyup", function(e) {
                    var isNumeric = !/[a-zA-z]/.test(this.value);

                    var oKeywordSelect = yud.getElementsByClassName( "ezste-keyword-select", "select", this.parentNode )[0];
                    var oLengthSelect = yud.getElementsByClassName( "ezste-length-select", "select", this.parentNode )[0];
                    
                    if ( isNumeric == false ) {
                        oLengthSelect.disabled = 1;
                        oKeywordSelect.disabled = 0;
                    } else {
                        oLengthSelect.disabled = 0;
                        oKeywordSelect.disabled = 1;
                    }
                    
                    if ( this.value == "" ) {
                        var isNumeric = !/[a-zA-z]/.test( oKeywordSelect.options[oKeywordSelect.selectedIndex].value );

                        if ( isNumeric ) {
                            oLengthSelect.disabled = 0;
                            oKeywordSelect.disabled = 0;
                        }
                    }
                } );

                var oKeywordSelect = document.createElement("select");
                oKeywordSelect.name = "Params[properties][" + i + "][keyword]";
                for( index in oProperty.options )
                {
                    var oKeywordOption = document.createElement("option");
                    oKeywordOption.value = oProperty.options[index];

                    if( oKeywordOption.value == oProperty.keyword )
                    {
                        oKeywordOption.selected = true;
                        // TODO: Opera 9.26 workround for bug:
                        // "Using JavaScript to set Select Option as Selected (bug)"
                        oKeywordOption.defaultSelected = true;
                    }

                    var oKeywordOptionText = document.createTextNode( oProperty.options[index] );
                    oKeywordOption.appendChild(oKeywordOptionText);
                    
                    oKeywordSelect.appendChild(oKeywordOption);
                }

                if ( oProperty.value != "" ) {
                    oKeywordSelect.disabled = 1;    
                }
                
                yud.addClass( oKeywordSelect, "ezste-keyword-select" );
                
                yue.addListener( oKeywordSelect, "change", function(e) {
                    var oLengthSelect = yud.getElementsByClassName( "ezste-length-select", "select", this.parentNode )[0];
                    var oInput = yud.getElementBy(function(e) { return true;}, "input", this.parentNode);
                    oInput.value = "";
                    
                    var isNumeric = YAHOO.lang.isNumber( parseInt( this.options[this.selectedIndex].value ) );
                    
                    if ( isNumeric == false ) {
                        oLengthSelect.disabled = 1;
                    } else {
                        oLengthSelect.disabled = 0;
                    }
                } );

                var oLengthSelect = document.createElement("select");
                oLengthSelect.name = "Params[properties][" + i + "][length]";
                for( index in aLength )
                {
                    var oLengthOption = document.createElement("option");
                    oLengthOption.value = index;

                    if( oLengthOption.value == oProperty.length )
                    {
                        oLengthOption.selected = true;
                        // TODO: Opera 9.26 workround for bug:
                        // "Using JavaScript to set Select Option as Selected (bug)"
                        oLengthOption.defaultSelected = true;
                    }

                    var oLengthOptionText = document.createTextNode( aLength[index] );
                    oLengthOption.appendChild(oLengthOptionText);
                    
                    oLengthSelect.appendChild(oLengthOption);
                }
                
                var isNumeric = !/[a-zA-z]/.test( oKeywordSelect.options[oKeywordSelect.selectedIndex].value );

                if ( isNumeric == false ) {
                    oLengthSelect.disabled = 1; 
                } else if( /[a-zA-z]/.test( oProperty.value ) ) {
                    oLengthSelect.disabled = 1;
                }
                
                yud.addClass( oLengthSelect, "ezste-length-select" );
                
                oTdPropValue.appendChild( oInput );
                oTdPropValue.appendChild( oKeywordSelect );
                oTdPropValue.appendChild( oLengthSelect );

                break;
            case 'length':
                var oInput = document.createElement("input");
                oInput.type = "hidden";
                oInput.name = "Params[properties][" + i + "][value]";
                oInput.value = "";

                var oKeywordInput = document.createElement("input");
                oKeywordInput.type = "text";
                oKeywordInput.name = "Params[properties][" + i + "][keyword]";
                oKeywordInput.value = "";
                
                if( oProperty.keyword )
                    oKeywordInput.value = oProperty.keyword;

                yud.addClass( oKeywordInput, "quarterbox" );

                var oLengthSelect = document.createElement("select");
                oLengthSelect.name = "Params[properties][" + i + "][length]";
                for( index in aLength )
                {
                    var oLengthOption = document.createElement("option");
                    oLengthOption.value = index;

                    if( oLengthOption.value == oProperty.length )
                    {
                        oLengthOption.selected = true;
                        // TODO: Opera 9.26 workround for bug:
                        // "Using JavaScript to set Select Option as Selected (bug)"
                        oLengthOption.defaultSelected = true;
                    }

                    var oLengthOptionText = document.createTextNode( aLength[index] );
                    oLengthOption.appendChild(oLengthOptionText);
                    
                    oLengthSelect.appendChild(oLengthOption);
                }

                oTdPropValue.appendChild( oKeywordInput );
                oTdPropValue.appendChild( oLengthSelect );
                oTdPropValue.appendChild( oInput );
                break;
            case 'enumerated':
                var oSelect = document.createElement("select");
                oSelect.name = "Params[properties][" + i + "][value]";
                for( index in oProperty.options )
                {
                    var oOption = document.createElement("option");
                    oOption.value = oProperty.options[index];

                    if( oOption.value == oProperty.value )
                    {
                        oOption.selected = true;
                        // TODO: Opera 9.26 workround for bug:
                        // "Using JavaScript to set Select Option as Selected (bug)"
                        oOption.defaultSelected = true;
                    }

                    var oOptionText = document.createTextNode( oProperty.options[index] );
                    oOption.appendChild(oOptionText);
                    
                    oSelect.appendChild(oOption);
                }
                
                oTdPropValue.appendChild( oSelect );
                break;
            case 'string':
                var oPropValueInput = document.createElement("input");
                oPropValueInput.name = "Params[properties][" + i + "][value]";
                oPropValueInput.type = "text";
                oPropValueInput.value = oProperty.value;
        

                oTdPropValue.appendChild( oPropValueInput );
                break;
           case 'relativepath':
                var oPropValueInput = document.createElement("input");
                oPropValueInput.name = "Params[properties][" + i + "][value]";
                oPropValueInput.type = "text";
                oPropValueInput.value = oProperty.value;
           
                var oBrowseImg = document.createElement("img");
                oBrowseImg.alt = "";
                oBrowseImg.src = oCfg.browseimageicon;
                yud.addClass( oBrowseImg, "insert-image-icon" );
                
                yue.addListener( oBrowseImg, "click", insertImage );
                
                var oPrevImg = document.createElement("img");
                oPrevImg.alt = "";
                oPrevImg.src = oCfg.previewimageicon;

                var sImgPath = oProperty.value.substring(4,oProperty.value.length-1);

                yue.addListener( oPrevImg, "mouseover", function(e, src) {
                    var oImgContainer = new YAHOO.widget.Overlay("ezste-img-container", { context:[this, "tl", "bl"], 
                                                                               visible:true,
                                                                               zindex: 1000, 
                                                                               width:"200px" } );
                    var oBgImgPrev = document.createElement("img");
                    oBgImgPrev.src = src;
                    oBgImgPrev.alt = "";
                    oBgImgPrev.width = "200";
                    oBgImgPrev.height = "200";
                    
                    oImgContainer.setBody(oBgImgPrev);
                    oImgContainer.render(document.body);    
                }, sImgPath );
                
                yue.addListener( oPrevImg, "mouseout", function(e) {
                    var oImgContainer = new YAHOO.widget.Overlay("ezste-img-container");
                    oImgContainer.hide();
                });

                oTdPropValue.appendChild( oPropValueInput );
                oTdPropValue.appendChild( oBrowseImg );
                oTdPropValue.appendChild( oPrevImg );
                
                break;
        }
        
        oTr.appendChild( oTdPropName );
        oTr.appendChild( oTdPropValue );
        
        return oTr;
    }
    
    var getProperties = function( target ) {
            var oPropertiesDiv = target,
                oElement = oWorkingElement;
                
            
            var oBlockDiv = document.createElement("div");
            yud.addClass( oBlockDiv, "block" );
            
            // Get properties
            var sServerCall = "ezcsse::getelementstyles";
            var sPostData = encodeURIComponent( "Params[element][name]" ) + "=" + encodeURIComponent( oElement.element.name ) + "&" 
                                + encodeURIComponent( "Params[element][id]" ) + "=" + encodeURIComponent( oElement.element.id ) + "&" 
                                + encodeURIComponent( "Params[element][class]" ) + "=" + encodeURIComponent( oElement.element.classname ) + "&" 
                                + encodeURIComponent( "Params[rule][selector]" ) + "=" + encodeURIComponent( oElement.selector ) + "&" 
                                + encodeURIComponent( "Params[rule][alias]" ) + "=" + encodeURIComponent( oElement.alias );
            var oCallbacks = {
                success: function (o) {
                
                    var oProperties = {};

                    try {
                    
                        oProperties = YAHOO.lang.JSON.parse(o.responseText);
                        oCachedProperties.push( oProperties );                
                    }
                    catch (x) {

                        return;
                
                    }
                    oPropertiesDiv.innerHTML = "";

                    if( oProperties.error ) {
                        oPropertiesDiv.appendChild( handleError( oProperties.error ) );
                        return;
                    }

                    var oPropsBlockDiv = oBlockDiv.cloneNode(false);
                    oPropertiesDiv.appendChild( oPropsBlockDiv );
                    
                    var oTable = document.createElement("table");
                    yud.addClass( oTable, "properties" );
                    oTable.cellPadding = "0";
                    oTable.cellSpacing = "0";
                    oTable.border = "0";
                    var oTBody = document.createElement("tbody");

                    nPropertyCount = oProperties.properties.length;
                    
                    for( var i = 0; i < nPropertyCount; i++ )
                    {
                        var oProperty = oProperties.properties[i];
                        var oTr = addNewProperty( oProperty, i );
                        oTBody.appendChild( oTr );
                        
                    }
                    
                    if ( yud.getChildren(oTBody).length == "0" ) {
                        var sMsg = oCfg.DIALOG_LABELS[1];
                        var oEmptyTr = document.createElement("tr");
                        yud.addClass(oEmptyTr, "ezste-no-properties");
                        var oEmptyTd = document.createElement("td");
                        
                        yud.addClass(oEmptyTd, "first");
                        
                        oEmptyTd.appendChild( document.createTextNode(sMsg) );
                        oEmptyTr.appendChild( oEmptyTd );
                        
                        oTBody.appendChild(oEmptyTr);
                    }
                    
                    oTable.appendChild(oTBody);
                    oPropsBlockDiv.appendChild(oTable);
                    
                    if( oCfg.mode == "administrator" ) {
                        var oRemoveBlockDiv = oBlockDiv.cloneNode(false);
                        var oRemoveButtonInput = new YAHOO.widget.Button( { label:oCfg.BUTTON_LABELS[1],
                                                                          id: "ezste-property-remove-button",
                                                                          container:oRemoveBlockDiv } );
                        oRemoveButtonInput.on( "click", removeProperties, oPropertiesDiv, true );
                        oPropsBlockDiv.appendChild( oRemoveBlockDiv );
                    };
                                        
                    var oParamsElmNameInput = document.createElement("input");
                    oParamsElmNameInput.type = "hidden";
                    oParamsElmNameInput.name = "Params[element][name]";
                    oParamsElmNameInput.value = oElement.element.name;
                    
                    var oParamsElmIdInput = document.createElement("input");
                    oParamsElmIdInput.type = "hidden";
                    oParamsElmIdInput.name = "Params[element][id]";
                    oParamsElmIdInput.value = oElement.element.id;
                    
                    var oParamsElmClassInput = document.createElement("input");
                    oParamsElmClassInput.type = "hidden";
                    oParamsElmClassInput.name = "Params[element][class]";
                    oParamsElmClassInput.value = oElement.element.classname;
                    
                    var oParamsRuleSelectorInput = document.createElement("input");
                    oParamsRuleSelectorInput.type = "hidden";
                    oParamsRuleSelectorInput.name = "Params[rule][selector]";
                    oParamsRuleSelectorInput.value = oElement.selector;

                    var oParamsRuleAliasInput = document.createElement("input");
                    oParamsRuleAliasInput.type = "hidden";
                    oParamsRuleAliasInput.name = "Params[rule][alias]";
                    oParamsRuleAliasInput.value = oElement.alias;
                    
                    var oParamsPropCountInput = document.createElement("input");
                    oParamsPropCountInput.type = "hidden";
                    oParamsPropCountInput.name = "Params[property_count]";
                    oParamsPropCountInput.value = oProperties.properties.length;
                    
                    oPropsBlockDiv.appendChild(oParamsElmNameInput);
                    oPropsBlockDiv.appendChild(oParamsElmIdInput);
                    oPropsBlockDiv.appendChild(oParamsElmClassInput);
                    oPropsBlockDiv.appendChild(oParamsRuleSelectorInput);
                    oPropsBlockDiv.appendChild(oParamsRuleAliasInput);
                    oPropsBlockDiv.appendChild(oParamsPropCountInput);
                    
                    oPropDialog.sizeUnderlay();
                    oGroupDialog.sizeUnderlay();
                },
                
                failure: function (o) {
            
                    if ( !yuc.isCallInProgress(o) ) {
            
                    }
                },

                timeout : 10000
                
            };
            
            yuc.asyncRequest( 'POST', oCfg.requestpath + "/" + sServerCall, oCallbacks, sPostData );

    }
    
    var getPropertyList = function( target, list ) {
        var oNewPropertyDiv = target,
            oPropertiesDiv = list,
            oElement = oWorkingElement;

            var oBlockDiv = document.createElement("div");
            yud.addClass( oBlockDiv, "block" );
            // Get property list
            var sServerCall = "ezcsse::getpropertylist";
            
            var oCallbacks = {
                success: function (o) {
                
                    var oResponse = {};

                    try {
                    
                        oResponse = YAHOO.lang.JSON.parse(o.responseText);
                
                    }
                    catch (x) {

                        return;
                
                    }
                    oNewPropertyDiv.innerHTML = "";
                    var oNewPropBlockDiv = oBlockDiv.cloneNode(false);
                    oNewPropertyDiv.appendChild( oNewPropBlockDiv );
                    
                    oSelect = document.createElement("select");;
                    
                    for( var i = 0; i < oResponse.categories.length; i++ )
                    {
                        var oOptGroup = document.createElement("optgroup");
                        var oPropCategory = oResponse.categories[i];
                        oOptGroup.label = oPropCategory.name;
                        
                        for( var j = 0; j < oPropCategory.properties.length; j++ )
                        {
                            var oProperty = oPropCategory.properties[j];
                            var oOption = document.createElement("option");
                            oOption.value = oProperty.name;
                        
                            var oOptionText = document.createTextNode( oProperty.name );
                            oOption.appendChild(oOptionText);
                            
                            oOptGroup.appendChild(oOption);
                        }
                        
                        oSelect.appendChild(oOptGroup);
                    }

                    oNewPropBlockDiv.appendChild(oSelect);
                    
                    oAddInput = new YAHOO.widget.Button( { label:oCfg.BUTTON_LABELS[0],
                                                           container:oNewPropBlockDiv } );
                    
                    var oParams = { container: oPropertiesDiv, list: oNewPropertyDiv };
                    oAddInput.on( "click", addProperty, oParams, true );
                    
                    oPropDialog.sizeUnderlay();
                    oGroupDialog.sizeUnderlay();
                },
                
                failure: function (o) {
            
                    if ( !yuc.isCallInProgress(o) ) {
            
                    }
                },

                timeout : 10000
                
            };
            
            yuc.asyncRequest( "POST", oCfg.requestpath + "/" + sServerCall, oCallbacks );
    }

    var addProperty = function(e, args) {
        var oElement = oWorkingElement;

        var oPropertiesDiv = args.container;

        var oSelect = yud.getElementBy( function() { return true; }, "select", args.list );
        var sServerCall = "ezcsse::addproperty";
        var sPostData = encodeURIComponent( "Params[property][name]" ) + "=" + encodeURIComponent( oSelect.value )  + "&" 
                            + encodeURIComponent( "Params[element][name]" ) + "=" + encodeURIComponent( oElement.element.name ) + "&" 
                            + encodeURIComponent( "Params[element][id]" ) + "=" + encodeURIComponent( oElement.element.id ) + "&" 
                            + encodeURIComponent( "Params[element][class]" ) + "=" + encodeURIComponent( oElement.element.classname ) + "&" 
                            + encodeURIComponent( "Params[rule][selector]" ) + "=" + encodeURIComponent( oElement.selector ) + "&" 
                            + encodeURIComponent( "Params[rule][alias]" ) + "=" + encodeURIComponent( oElement.alias );
        
        var oCallbacks = {
            success: function (o) {
                var oProperty = {};

                try {
                    
                oProperty = YAHOO.lang.JSON.parse(o.responseText);
        
                }
                catch (x) {

                    return;
        
                }
                
                var oTable = yud.getElementBy( function(el) {
                    return true;
                }, "table", oPropertiesDiv );

                var oTBody = yud.getElementBy( function(el) {
                    return true;
                }, "tbody", oTable );
                
                var oEmptyTr = yud.getElementsByClassName( "ezste-no-properties", "tr", oPropertiesDiv );

                if( oEmptyTr != "" ) {
                    oTBody.removeChild( oEmptyTr[0] );
                }
                
                var i = yud.getChildren(oTBody).length;
                var oTr = addNewProperty( oProperty, i );
                oTBody.appendChild( oTr );

                nPropertyCount = yud.getChildren(oTBody).length;
                
                oPropDialog.sizeUnderlay();
                oGroupDialog.sizeUnderlay();
            },

            failure: function (o) {
                if ( !yuc.isCallInProgress(o) ) {

                }
            },

            timeout : 10000
        };

        yuc.asyncRequest( 'POST', oCfg.requestpath + "/" + sServerCall, oCallbacks, sPostData );
    }
    
    var handleUpload = function(e) {
        var oLoadingDiv = document.createElement("div");
        yud.addClass( oLoadingDiv, "loading-content" );
        oLoadingDiv.innerHTML = "&nbsp;";
        
        oInsertImgContentDiv = yud.get("ezste-insert-image-dialog-content");
        oInsertImgContentDiv.innerHTML = "";
        oInsertImgContentDiv.appendChild( oLoadingDiv );
        
        yuc.setForm("ezste-insert-image-dialog-upload-form", true);
        
        oInsertImgDialog.sizeUnderlay();
            
        var sServerCall = "ezcsse::uploadimage";
        var oCallbacks = {
            upload: function(o) {
                getImageList( oInsertImgContentDiv );
            }
        };

        yuc.asyncRequest('POST', oCfg.requestpath + "/" + sServerCall, oCallbacks );
        
        var oCImageFileInput = yud.get("ezste-image-file");
        var oImageFileInput = document.createElement("input");
        oImageFileInput.name = "File";
        oImageFileInput.type = "file";
        oImageFileInput.id = "ezste-image-file";
        
        var oBlockDiv = oCImageFileInput.parentNode;
        oBlockDiv.replaceChild(oImageFileInput, oCImageFileInput);
    };
    
    var getImageList = function( target ) {
    
        var oInsertImgContentDiv = target;
        var sServerCall = "ezcsse::getimagelist";
        
        var oCallbacks = {
            success: function (o) {
                var aImages = [];

                try {
                    aImages = YAHOO.lang.JSON.parse(o.responseText);
                }
                catch (x) {
                    return;
                }
                oInsertImgContentDiv.innerHTML = '';

                if(aImages.length == 0)
                {
                    var sMsg = oCfg.DIALOG_LABELS[3];
                    var oP = document.createElement("p");
                    var oMsgDiv = document.createElement("div");
                    yud.addClass(oMsgDiv, "block");
                    
                    oP.appendChild(document.createTextNode(sMsg));
                    oMsgDiv.appendChild(oP);
                    oInsertImgContentDiv.appendChild(oMsgDiv);
                    return;
                }

                var iCount = 1;
                for( var i = 0; i < aImages.length; i++ ) {
                    var oImage = aImages[i];
                    var oDiv = document.createElement("div");
                    yud.addClass( oDiv, "image-container" );
                    var oContentDiv = document.createTextNode( oImage.name );
                    
                    var oImg = document.createElement("img");
                    oImg.src = oImage.path;
                    oImg.width = oImage.width;
                    oImg.height = oImage.height;
                    
                    if ( YAHOO.env.ua.ie > 0 ) {
                        var oRadioInput = document.createElement("<input type=\"radio\" name=\"Params[image][original_path]\" value=\"" + oImage.original_path + "\"/>");
                    } else {
                        var oRadioInput = document.createElement("input");
                        oRadioInput.type = "radio";
                        oRadioInput.name = "Params[image][original_path]";
                        oRadioInput.value = oImage.original_path;
                    }
                    
                    if( i == 0 )
                        oRadioInput.defaultChecked = true;

                    var oNodeIDInput = document.createElement("input");
                    oNodeIDInput.type = "hidden";
                    oNodeIDInput.name = "Params[image][node_id]";
                    oNodeIDInput.value = oImage.node_id;

                    var oCloneDiv = document.createElement("div");
                    yud.addClass( oCloneDiv, "name" );
                    oCloneDiv.appendChild( oContentDiv );
                    oDiv.appendChild( oCloneDiv );

                    var oCloneDiv = document.createElement("div");
                    yud.addClass( oCloneDiv, "image" );
                    oCloneDiv.appendChild( oImg );
                    oDiv.appendChild( oCloneDiv );

                    var oCloneDiv = document.createElement("div");
                    yud.addClass( oCloneDiv, "choice" );
                    oCloneDiv.appendChild( oRadioInput );
                    oCloneDiv.appendChild( oNodeIDInput );
                    oDiv.appendChild( oCloneDiv );

                    oInsertImgContentDiv.appendChild(oDiv);

                    if( iCount%4 == 0 || ( i == ( aImages.length-1 ) ) )
                    {
                        var oSeparatorDiv = document.createElement("div");
                        yud.addClass( oSeparatorDiv, "break" );
                        oInsertImgContentDiv.appendChild(oSeparatorDiv);
                    }
                    
                    iCount++;

                }

                var oRemoveImgButtonBlockDiv = document.createElement("div");
                yud.addClass( oRemoveImgButtonBlockDiv, "block" );

                var oRemoveImgButton = new YAHOO.widget.Button( { label:oCfg.BUTTON_LABELS[1],
                                                                  id: "ezste-image-remove-button",
                                                                  container:oRemoveImgButtonBlockDiv } );
                    
                oRemoveImgButton.on( "click", removeImage );

                oInsertImgContentDiv.appendChild(oRemoveImgButtonBlockDiv);

                var oStoreImageInput = document.createElement("input");
                oStoreImageInput.name = "StoreImageInput";
                oStoreImageInput.type = "hidden";
                oStoreImageInput.value = sSrcInputName;

                oInsertImgContentDiv.appendChild(oStoreImageInput);

                oInsertImgDialog.sizeUnderlay();
            },

            failure: function (o) {
                if ( !yuc.isCallInProgress(o) ) {

                }
            },

            timeout : 10000
        };

        yuc.asyncRequest( 'POST', oCfg.requestpath + "/" + sServerCall, oCallbacks );
    };
    

    var insertImage = function(e) {
        var oElement = oWorkingElement;
        
        if( e.target ) {
            var oTargetElement = e.target;
        } else if( e.srcElement ) {
            var oTargetElement =  e.srcElement;
        }
        sSrcInputName = yud.getElementsBy( function() { return true; }, "input", oTargetElement.parentNode )[0].name;

        var oForm = document.createElement("form");
        oForm.id = "ezste-insert-image-dialog-form";
        oForm.action = oCfg.requestpath;
        oForm.method = "post";
        
        var oUploadForm = document.createElement("form");
        oUploadForm.id = "ezste-insert-image-dialog-upload-form";
        oUploadForm.action = oCfg.requestpath;
        oUploadForm.method = "post";
        oUploadForm.enctype = "multipart/form-data";

        var oLoadingDiv = document.createElement("div");
        yud.addClass( oLoadingDiv, "loading-content" );
        oLoadingDiv.innerHTML = "&nbsp;";
            
        var oBlockDiv = document.createElement("div");
        yud.addClass( oBlockDiv, "block" );
            
        var oInsertImgContentDiv = document.createElement("div");
        oInsertImgContentDiv.id = "ezste-insert-image-dialog-content";

        oInsertImgContentDiv.appendChild( oLoadingDiv );

        var oImageFileInput = document.createElement("input");
        oImageFileInput.name = "File";
        oImageFileInput.type = "file";
        oImageFileInput.id = "ezste-image-file";
                
        var oUploadButtonInput = document.createElement("input");
        oUploadButtonInput.name = "UploadButton";
        oUploadButtonInput.type = "button";
        oUploadButtonInput.value = oCfg.BUTTON_LABELS[5];
                
        yue.addListener( oUploadButtonInput, "click", handleUpload );
                
        oBlockDiv.appendChild( oImageFileInput );
        oBlockDiv.appendChild( oUploadButtonInput );
                
        oForm.appendChild( oInsertImgContentDiv );
        oUploadForm.appendChild(oBlockDiv);
        
        getImageList( oInsertImgContentDiv );
        
        oManager.focus(oInsertImgDialog);

        oInsertImgDialog.setHeader( oCfg.DIALOG_LABELS[2] + " \"" + ( ( oElement.alias == "" ) ? ( ( oElement.element.id == "" ) ? oElement.element.name : oElement.element.id )  : oElement.alias  ) + "\"");
        oInsertImgDialog.setBody(oForm);
        oInsertImgDialog.appendToBody(oUploadForm);
        

        oInsertImgDialog.sizeUnderlay();

        oInsertImgDialog.show();
    }
    
    var removeImage = function(e) {
        
        var sMsg = oCfg.DIALOG_LABELS[5];
        
        if( confirm( sMsg ) == false ) {
            return;
        } else {
            
            var oForm = yud.get("ezste-insert-image-dialog-form");

            // Params[image][original_path]
            
            var oRadio = yud.getElementsBy( function(e) {
                if( e.name == "Params[image][original_path]" && e.checked == true && e.type == "radio" )
                return true;
            }, "input", oForm )[0];
            
            // Params[image][node_id]
            
            var oInput = yud.getElementsBy( function(e) {
                if( e.name == "Params[image][node_id]" && e.type == "hidden" )
                return true;
            }, "input", oRadio.parentNode )[0];

            var oLoadingDiv = document.createElement("div");
            yud.addClass( oLoadingDiv, "loading-content" );
            oLoadingDiv.innerHTML = "&nbsp;";
            
            var oInsertImgContentDiv = yud.get( "ezste-insert-image-dialog-content" );
            oInsertImgContentDiv.innerHTML = "";
            
            oInsertImgContentDiv.appendChild( oLoadingDiv );

            oInsertImgDialog.sizeUnderlay();

            var sServerCall = "ezcsse::removeimage";
            var sPostData = encodeURIComponent( oRadio.name ) + "=" + encodeURIComponent( oRadio.value ) + "&" 
                            + encodeURIComponent( oInput.name ) + "=" + encodeURIComponent( oInput.value );
            var oCallbacks = {
                success: function (o) {
                    getImageList( oInsertImgContentDiv );
                },

                failure: function (o) {
                    if ( !yuc.isCallInProgress(o) ) {

                    }
                },

                timeout : 10000
            };

            yuc.asyncRequest('POST', oCfg.requestpath + "/" + sServerCall, oCallbacks, sPostData);
        }
    };

    var removeProperties = function(e, target) {
        var sMsg = oCfg.DIALOG_LABELS[4];
        
        if( confirm( sMsg ) == false ) {
            return;
        } else {
            var oForm = yud.getAncestorByTagName( this, "form" );
            yuc.setForm(oForm);
            
            var oPropertiesDiv = target;
            
            var sServerCall = "ezcsse::removeproperties";
            
            var oCallbacks = {
                success: function (o) {
                    var oTable = yud.getElementBy( function(e) {
                        return true;
                    }, "table", oPropertiesDiv );
                    
                    var aInputs = yud.getElementsBy( function(e) {
                        if ( e.type == "checkbox" && e.checked == true ) {
                            return true;
                        }
                    }, "input", oTable );
                    
                    var oTBody = yud.getElementBy( function(e) {
                        return true;
                    }, "tbody", oTable );
                    
                    for( var i = 0; i < aInputs.length; i++ ) {
                        var oInput = aInputs[i];
                        var oTr = yud.getAncestorByTagName( oInput, "tr" );
                        
                        oTBody.removeChild( oTr );
                    }
                    
                    nPropertyCount = yud.getChildren(oTBody).length;
                    
                    if ( yud.getChildren(oTBody).length == "0" ) {
                        var sMsg = oCfg.DIALOG_LABELS[1];
                        var oEmptyTr = document.createElement("tr");
                        yud.addClass(oEmptyTr, "ezste-no-properties");
                        var oEmptyTd = document.createElement("td");
                        
                        oEmptyTd.appendChild( document.createTextNode(sMsg) );
                        oEmptyTr.appendChild( oEmptyTd );
                        
                        oTBody.appendChild(oEmptyTr);
                        
                        nPropertyCount = 0;
                    }
                    
                    oPropDialog.sizeUnderlay();
                    oGroupDialog.sizeUnderlay();
                },

                failure: function (o) {
                    if ( !yuc.isCallInProgress(o) ) {

                    }
                },

                timeout : 10000
            };
            
            yuc.asyncRequest('POST', oCfg.requestpath + "/" + sServerCall, oCallbacks );
        }
        
    };

    var showToolTip = function(e, obj) {
        if( obj ) {
            yud.setStyle( "ezste-" + obj.element.id, "border", "2px solid #FF0000");
        } else {
            if( e.target ) {
                yud.setStyle( e.target.id, "border", "2px solid #FF0000");
            } else if( e.srcElement ) {
                yud.setStyle( e.srcElement.id, "border", "2px solid #FF0000");
            }
        }
    };
        
    var hideToolTip = function(e, obj) {
        if( obj ) {
            yud.setStyle( "ezste-" + obj.element.id, "border", "1px solid #FF0000");
        } else {
            if( e.target ) {
                yud.setStyle( e.target.id, "border", "1px solid #FF0000");
            } else if( e.srcElement ) {
                yud.setStyle( e.srcElement.id, "border", "1px solid #FF0000");
            }
        }
    };

    var insertImgDialogSubmit = function() {
        var oForm = yud.get("ezste-insert-image-dialog-form");
        var oCSSImageInput = yud.getElementsBy( function(e) {
            if (e.name == "Params[image][original_path]" && e.checked == true && e.type == "radio" ) {
                return true;
            }
        }, "input", oForm )[0];
 
        var oStoreImageInput = yud.getElementsBy( function(e) {
            if (e.name == "StoreImageInput" ) {
                return true;
            }
        }, "input", oForm )[0];

        var oDestInput = yud.getElementsBy( function(e) {
            if (e.name == oStoreImageInput.value ) {
                return true;
            }
        }, "input" )[0];

        oDestInput.value = "url(" + oCSSImageInput.value + ")";
        oInsertImgDialog.hide();
    };
        
    var insertImgDialogCancel = function() {
        this.cancel();
    };

    var siteStyleDialogSubmit = function() {
        var oForm = yud.get("ezste-sitestyle-dialog-form");
        yuc.setForm(oForm);
        
        var sServerCall = "ezcsse::storesitestyle";

        var oStyle = getMainStyleTag();
        
        if(oStyle.styleSheet){
            oStyle.styleSheet.cssText = "";
        } else {
            oStyle.innerHTML = "";
        }
        
        var oTmpStyle = getStyleTag();
        
        var sCSSCode = "";

        var oCallbacks = {
            success: function (o) {
                var oSiteStyle = {};
            
                try {
                    oSiteStyle = YAHOO.lang.JSON.parse(o.responseText);
                }
                catch (x) {
                    return;
                }
            
                for( var i = 0; i < oSiteStyle.rules.length; i++  ) {
                    var oRule = oSiteStyle.rules[i];
                
                    var sSelector = oRule.selector;
                
                    sCSSCode += sSelector + " {\n";
                
                    for( var j = 0; j < oRule.properties.length; j++ ) {
                        var oProperty = oRule.properties[j];
                    
                        sCSSCode += oProperty.name + ": " + oProperty.value + ";\n";
                    
                    }

                    sCSSCode += "}\n";
                }
            
                // IE workaround
                if(oStyle.styleSheet){
                    oStyle.styleSheet.cssText = sCSSCode
                } else {
                    oStyle.appendChild(document.createTextNode(sCSSCode));
                }
                
                if(oTmpStyle.styleSheet){
                    oTmpStyle.styleSheet.cssText = "";
                } else {
                    oTmpStyle.innerHTML = "";
                }
            },

            failure: function (o) {
                if ( !yuc.isCallInProgress(o) ) {

                }
            },

            timeout : 10000
        };
            
        yuc.asyncRequest('POST', oCfg.requestpath + "/" + sServerCall, oCallbacks);

        this.hide();
    };

    var siteStyleDialogCancel = function() {
        this.cancel();
    };
    
    var createSiteStyle = function(e) {
        var oSiteStyleNameInput = yud.get("ezste-sitestyle-name");
        
        if ( oSiteStyleNameInput.value == "" )
            return;
        
        var oLoadingDiv = document.createElement("div");
        yud.addClass( oLoadingDiv, "loading-content" );
        oLoadingDiv.innerHTML = "&nbsp;";
        
        var oSiteStylesDiv = yud.get("ezste-dialog-sitestyles");
        oSiteStylesDiv.innerHTML = "";
        oSiteStylesDiv.appendChild( oLoadingDiv );

        sServerCall = "ezcsse::createsitestyle";
        sPostData = encodeURIComponent( "Params[site_style][name]" )  + "=" +  encodeURIComponent(  oSiteStyleNameInput.value );

        var oCallbacks = {
            success: function (o) {
                
                getSiteStyles( oSiteStylesDiv );
            
            },

            failure: function (o) {
            },

            timeout : 10000
        };

        yuc.asyncRequest('POST', oCfg.requestpath + "/" + sServerCall, oCallbacks, sPostData);
    };

    var showGroupDialogBox = function(e, element) {
        oPropDialog.hide();
        oCachedProperties = [];

        var oElement = element;
        var oForm = document.createElement("form");
        oForm.method = "post";
        oForm.id = "ezste-group-dialog-form";
        
        var oYBlock = document.createElement("div");
        yud.addClass( oYBlock, "yui-b" );
        
        var oYGrid = document.createElement("div");
        yud.addClass( oYGrid, "yui-gf" );
        
        var oYUnitFirst = document.createElement("div");
        yud.addClass( oYUnitFirst, "yui-u first" );

        var oYUnit = document.createElement("div");
        yud.addClass( oYUnit, "yui-u" );
        
        var oDivTreeHolder = document.createElement("div");
        oDivTreeHolder.id = "ezste-group-dialog-tree";
        
        var oPropertyListDiv = document.createElement("div");
        oPropertyListDiv.id = "ezste-group-dialog-newproperty";
        
        var oPropertiesDiv = document.createElement("div");
        oPropertiesDiv.id = "ezste-group-dialog-properties";
        
        oYUnitFirst.appendChild( oDivTreeHolder );
        oYUnit.appendChild( oPropertyListDiv );
        oYUnit.appendChild( oPropertiesDiv );
        
        oYGrid.appendChild( oYUnitFirst );
        oYGrid.appendChild( oYUnit );
        oYBlock.appendChild( oYGrid );
        
        oForm.appendChild( oYBlock );

        var oObjectIDInput = document.createElement("input");
        oObjectIDInput.type = "hidden";
        oObjectIDInput.name = "Params[object_id]";
        oObjectIDInput.value = oCfg.object;
        
        oForm.appendChild( oObjectIDInput );
        
        oGroupDialog.setHeader( oCfg.DIALOG_LABELS[6] + " \"" + oElement.alias + "\"" );
        oGroupDialog.setBody( oForm );

        var oTree = new YAHOO.widget.TreeView(oDivTreeHolder);
        var oRootNode = oTree.getRoot();

        for( var i = 0; i < oElement.elements.length; i++ ) {
            var oTmpElement = oElement.elements[i];
            
            var tmpNode = new YAHOO.widget.TextNode({
                label: oTmpElement.alias,
                expandable: false
            }, oRootNode, false);
            
            yue.addListener( tmpNode.labelElId, "click", function(e, element) {
                oWorkingElement = element;
                
                var oPropertyListDiv = yud.get("ezste-group-dialog-newproperty");
                oPropertyListDiv.innerHTML = "";

                var oPropertiesDiv = yud.get("ezste-group-dialog-properties");
                oPropertiesDiv.innerHTML = "";
                
                var oLoadingDiv = document.createElement("div");
                yud.addClass( oLoadingDiv, "loading-content" );
                oLoadingDiv.innerHTML = "&nbsp;";
                
                oPropertyListDiv.appendChild( oLoadingDiv );
                oPropertiesDiv.appendChild( oLoadingDiv.cloneNode(true) );
                
                getPropertyList( oPropertyListDiv, oPropertiesDiv );

                getProperties( oPropertiesDiv );
                
                
            }, oTmpElement, true );
        }
        
        oTree.render(); 

        oGroupDialog.sizeUnderlay();
        
        oGroupDialog.show();
    };

    var showSiteStyleDialogBox = function(e) {
        var sServerCall = "ezcsse::storesitestyle";
        
        var oForm = document.createElement("form");
        oForm.action = oCfg.requestpath + "/" + sServerCall;
        oForm.method = "post";
        oForm.id = "ezste-sitestyle-dialog-form";
        
        var oLoadingDiv = document.createElement("div");
        yud.addClass( oLoadingDiv, "loading-content" );
        oLoadingDiv.innerHTML = "&nbsp;";
        
        var oBlockDiv = document.createElement("div");
        yud.addClass( oBlockDiv, "block" );
        
        var oSiteStylesDiv = document.createElement("div");
        oSiteStylesDiv.id = "ezste-dialog-sitestyles";
            
        oSiteStylesDiv.appendChild( oLoadingDiv.cloneNode(true) );
                
        var oSiteStyleNameInput = document.createElement("input");
        oSiteStyleNameInput.name = "Params[site_style][name]";
        oSiteStyleNameInput.type = "text";
        oSiteStyleNameInput.id = "ezste-sitestyle-name";
        
        
        var oCreateButtonInput = new YAHOO.widget.Button( { label:oCfg.BUTTON_LABELS[8],
                                                            container:oBlockDiv } );
        oCreateButtonInput.on( "click", createSiteStyle );
        
        var oObjectIDInput = document.createElement("input");
        oObjectIDInput.type = "hidden";
        oObjectIDInput.name = "Params[object_id]";
        oObjectIDInput.value = oCfg.object;
        
        var oBlockDivClone = oBlockDiv.cloneNode(true);
        var oRestoreButtonInput = new YAHOO.widget.Button( { label:oCfg.BUTTON_LABELS[9],
                                                             container:oBlockDivClone } );
        oRestoreButtonInput.on( "click", showRestoreStyleDialogBox );
        
        oBlockDiv.appendChild( oSiteStyleNameInput );

        oForm.appendChild( oObjectIDInput );     
        oForm.appendChild( oBlockDiv );
        oForm.appendChild( oSiteStylesDiv );
        oForm.appendChild( oBlockDivClone );
        
        oSiteStyleDialog.setHeader( oCfg.DIALOG_LABELS[10] );
        oSiteStyleDialog.setBody( oForm );
        
        getSiteStyles( oSiteStylesDiv );

        oSiteStyleDialog.sizeUnderlay();
        
        oSiteStyleDialog.show();
    };
    
    var showRestoreStyleDialogBox = function(e) {
        var sServerCall = "ezcsse::restoretoversion";
        
        var oForm = document.createElement("form");
        oForm.action = oCfg.requestpath + "/" + sServerCall;
        oForm.method = "post";
        oForm.id = "ezste-restorestyle-dialog-form";
        
        var oLoadingDiv = document.createElement("div");
        yud.addClass( oLoadingDiv, "loading-content" );
        oLoadingDiv.innerHTML = "&nbsp;";

        var oRestoreStylesDiv = document.createElement("div");
        oRestoreStylesDiv.id = "ezste-dialog-restorestyles";
            
        oRestoreStylesDiv.appendChild( oLoadingDiv.cloneNode(true) );

        getSiteStyleVersions(oRestoreStylesDiv);
        
        oForm.appendChild( oRestoreStylesDiv );
        
        oRestoreStyleDialog.setHeader( oCfg.DIALOG_LABELS[11] );
        oRestoreStyleDialog.setBody( oForm );
                
        oManager.focus(oRestoreStyleDialog);
        oRestoreStyleDialog.show();
    };

    var showPropertyDialogBox = function(e, element) {
        oGroupDialog.hide();
        oCachedProperties = [];
        
        var oElement = element;
        oWorkingElement = element;

        var oForm = document.createElement("form");
        oForm.action = oCfg.requestpath;
        oForm.method = "post";
        oForm.id = "ezste-properties-dialog-form";
            
        var oLoadingDiv = document.createElement("div");
        yud.addClass( oLoadingDiv, "loading-content" );
        oLoadingDiv.innerHTML = "&nbsp;";

        var oPropertiesDiv = document.createElement("div");
        oPropertiesDiv.id = "ezste-dialog-properties";
            
        oPropertiesDiv.appendChild( oLoadingDiv.cloneNode(true) ); 
           
        var oBlockDiv = document.createElement("div");
        yud.addClass( oBlockDiv, "block" );

        if( oCfg.mode == "administrator" ) {
            var oNewPropertyDiv = document.createElement("div");
            oNewPropertyDiv.id = "ezste-dialog-newproperty";
            oNewPropertyDiv.appendChild( oLoadingDiv );
        
            oForm.appendChild( oNewPropertyDiv );
            
            getPropertyList( oNewPropertyDiv, oPropertiesDiv );
        }

        var oObjectIDInput = document.createElement("input");
        oObjectIDInput.type = "hidden";
        oObjectIDInput.name = "Params[object_id]";
        oObjectIDInput.value = oCfg.object;
        
        oForm.appendChild( oObjectIDInput );
        oForm.appendChild( oPropertiesDiv );

        oPropDialog.setHeader( oCfg.DIALOG_LABELS[0] + " \"" + ( ( oElement.alias == "" ) ? ( ( oElement.element.id == "" ) ? oElement.element.name : oElement.element.id )  : oElement.alias  ) + "\"" );
        oPropDialog.setBody( oForm );

        getProperties( oPropertiesDiv );
            
        oPropDialog.sizeUnderlay();
        oPropDialog.show();
    };

    var propDialogCancel = function() {
        cleanupOnCancel();
        this.cancel();
    };

    var getStyleTag = function() {
        var oStyle = yud.getElementsBy(function(e){
            if (e.id == "ezste") {
                return true;
            }
        }, "style")[0];

        if (!oStyle) {
            oStyle = document.createElement("style");
            oStyle.type = "text/css";
            oStyle.id = "ezste";
        
            var oHead = yud.getElementsBy(function(e){
                return true
            }, "head")[0];
            oHead.appendChild(oStyle);
        }

        return oStyle;
    };
    
    var getMainStyleTag = function() {
        var oStyle = yud.getElementsBy(function(e){
            if (e.id == "ezste-main-css") {
                return true;
            }
        }, "style")[0];
        
        return oStyle;
    };
    
    var siteRestoreDialogSubmit = function() {
        var oForm = yud.get("ezste-restorestyle-dialog-form");
        yuc.setForm(oForm);
        
        var sServerCall = "ezcsse::restoresitestyle";

        var oStyle = getMainStyleTag();
        
        if(oStyle.styleSheet){
            oStyle.styleSheet.cssText = "";
        } else {
            oStyle.innerHTML = "";
        }

        var oTmpStyle = getStyleTag();
        
        var sCSSCode = "";
        
        var oCallbacks = {
            success: function (o) {
                var oSiteStyle = {};
            
                try {
                    oSiteStyle = YAHOO.lang.JSON.parse(o.responseText);
                }
                catch (x) {
                    return;
                }
                
                for( var i = 0; i < oSiteStyle.rules.length; i++  ) {
                    var oRule = oSiteStyle.rules[i];
                    
                    var sSelector = oRule.selector;
                    
                    sCSSCode += sSelector + " {\n";
                    
                    for( var j = 0; j < oRule.properties.length; j++ ) {
                        var oProperty = oRule.properties[j];
                        
                        sCSSCode += oProperty.name + ": " + oProperty.value + ";\n";
                        
                    }
    
                    sCSSCode += "}\n";
                }
                
                // IE workaround
                if(oStyle.styleSheet){
                    oStyle.styleSheet.cssText = sCSSCode
                } else {
                    oStyle.appendChild(document.createTextNode(sCSSCode));
                }
                
                if(oTmpStyle.styleSheet){
                    oTmpStyle.styleSheet.cssText = "";
                } else {
                    oTmpStyle.innerHTML = "";
                }
            },

            failure: function (o) {
                if ( !yuc.isCallInProgress(o) ) {

                }
            },

            timeout : 10000
        };
            
        yuc.asyncRequest('POST', oCfg.requestpath + "/" + sServerCall, oCallbacks);

        this.hide();
    };
    
    var siteRestoreDialogCancel = function() {
        this.cancel();
    }

    var propDialogSubmit = function() {
        storeProperties("ezste-properties-dialog-form");
        
        this.hide();
    };

    var propDialogApply = function(){
        applyProperties("ezste-properties-dialog-form");
    };

    var applyProperties = function( formId ) {
        var oForm = yud.get(formId);
        var sElementID = oWorkingElement.element.id;
        var sSelector = oWorkingElement.selector;

        if ( sElementID == "" ) {
            var oStyle = getStyleTag();
            
            var sCSSCode = "";
            
            if ( sSelector != "" ) {
                sCSSCode = sSelector + " {\n";
            }
            else {
                sCSSCode = oWorkingElement.element.name + " {\n";
            }
            
        }
        
        if( sElementID != "" ) {
            var oSrcElement = yud.get( sElementID );
            oSrcElement.setAttribute( "style", " " );
        }

        for( var i = 0; i < nPropertyCount; i++) {
            var oProperty = { 
                            name: "", 
                            value: "", 
                            keyword: "", 
                            length: "", 
                            type: ""
                        };

            for( var j = 0; j < oForm.elements.length; j++) {
                var oElement = oForm.elements[j];
                var oName = oForm.elements[j].name;
            
                if( oName == "Params[properties][" + i + "][value]" ) {
                    oProperty.value = oElement.value;
                }
                
                if( oName == "Params[properties][" + i + "][keyword]" ) {
                    if ( oElement.nodeName.toLowerCase() == "select" && oElement.disabled == false ) {
                        oProperty.keyword = oElement.options[oElement.selectedIndex].value;
                    } else if ( oElement.nodeName.toLowerCase() == "input" ) {
                        oProperty.keyword = oElement.value;
                    } else {
                        oProperty.keyword = oProperty.value;
                    }
                }
                
                if( oName == "Params[properties][" + i + "][length]" ) {
                    if ( oElement.disabled == 0 ) {
                        oProperty.length = oElement.options[oElement.selectedIndex].value;
                    }
                }
                
                if( oName == "Params[properties][" + i + "][name]" ) {
                    oProperty.name = oElement.value;
                }
                
                if( oName == "Params[properties][" + i + "][type]" ) {
                    oProperty.type = oElement.value;
                }
            }
            
            if( oProperty.keyword != ""
                    && oProperty.length != "" ) {
                oProperty.value = oProperty.keyword + oProperty.length;
            } else if ( oProperty.value != "" 
                            && oProperty.length != "" ) {
                oProperty.value = oProperty.value + oProperty.length;
            } else if ( oProperty.keyword != ""
                            && oProperty.value == "") {
                oProperty.value = oProperty.keyword;
            }
            
            // Set default value for "background-color to transparent"
            if( oProperty.type == "color" 
                    && oProperty.value == ""
                        && oProperty.name == "background-color" ) {
                oProperty.value = "transparent";
            }
            
            var oSrcElement = yud.get( oWorkingElement.element.id );

            if( !oSrcElement ) {
                if( sElementID == "" ) {
                    sCSSCode += oProperty.name + ": " + oProperty.value + ";\n";
                }
            }

            yud.setStyle( oSrcElement, oProperty.name, oProperty.value );
        }
        
        if ( sElementID == "" ) {
            sCSSCode += "}\n";
            
            // IE workaround
            if(oStyle.styleSheet){
                oStyle.styleSheet.cssText = sCSSCode
            } else {
                oStyle.appendChild(document.createTextNode(sCSSCode));
            }
        }
    }

    var storeProperties = function( formId ) {
        var oForm = yud.get(formId);
        yuc.setForm(oForm);
        
        var sElementID = oWorkingElement.element.id;
        var sSelector = oWorkingElement.selector;
        
        if ( sElementID == "" ) {
            var oStyle = getStyleTag();
            
            var sCSSCode = "";
            
            if ( sSelector != "" ) {
                sCSSCode = sSelector + " {\n";
            }
            else {
                sCSSCode = oWorkingElement.element.name + " {\n";
            }
            
        }

        var sServerCall = "ezcsse::storeproperties";
        
        if( sElementID != "" ) {
            var oSrcElement = yud.get( sElementID );
            oSrcElement.setAttribute( "style", " " );
        }

        var oCallbacks = {
            success: function (o) {
                var oProperties = {};
        
                try {
                    oProperties = YAHOO.lang.JSON.parse(o.responseText);
                }
                catch (x) {
                    return;
                }
                
                for( var i = 0; i < oProperties.properties.length; i++ )
                {
                    var oProperty = oProperties.properties[i];
            
                    if( !oSrcElement ) {
                        if( sElementID == "" ) {
                            sCSSCode += oProperty.name + ": " + oProperty.value + ";\n";
                        }
                    }
                    yud.setStyle( oSrcElement, oProperty.name, oProperty.value );
                }

                if ( sElementID == "" ) {
                    sCSSCode += "}";
            
                    // IE workaround
                    if(oStyle.styleSheet){
                        oStyle.styleSheet.cssText = sCSSCode
                    } else {
                        oStyle.appendChild(document.createTextNode(sCSSCode));
                    }
                }
            },

            failure: function (o) {
                if ( !yuc.isCallInProgress(o) ) {

                }
            },

            timeout : 10000
        };
            
        yuc.asyncRequest('POST', oCfg.requestpath + "/" + sServerCall, oCallbacks);
    }

    var groupDialogSubmit = function() {
        storeProperties("ezste-group-dialog-form");

        this.hide();
    };

    var groupDialogApply = function() {
        applyProperties("ezste-group-dialog-form");
    };

    var groupDialogCancel = function() {
        cleanupOnCancel();
        this.cancel();
    };

    var cleanupOnCancel = function() {
        var sElementID = oWorkingElement.element.id;
        var sSelector = oWorkingElement.selector;

        if ( sElementID == "" ) {
            var oStyle = getStyleTag();

            var sCSSCode = "";

            if ( sSelector != "" ) {
                sCSSCode = sSelector + " {\n";
            } else {
                sCSSCode = oWorkingElement.element.name + " {\n";
            }
        }

        if( sElementID != "" ) {
            var oSrcElement = yud.get( sElementID );
            oSrcElement.setAttribute( "style", " " );
        }

        for( var i = 0; i < oCachedProperties.length; i++ ) {
            var oProperties = oCachedProperties[i];

            for( var j = 0; j < oProperties.properties.length; j++ ) {
                var oProperty = oProperties.properties[j];

                // Set default value for "background-color to transparent"
                if( oProperty.type == "color" 
                        && oProperty.value == ""
                            && oProperty.name == "background-color" ) {
                    oProperty.value = "transparent";
                }

                if( !oSrcElement ) {
                    if( sElementID == "" ) {
                        sCSSCode += oProperty.name + ": " + oProperty.value + ";\n";
                    }
                }

                yud.setStyle( oSrcElement, oProperty.name, oProperty.value );
            }
        }

        if ( sElementID == "" ) {
            sCSSCode += "}";

            // IE workaround
            if(oStyle.styleSheet) {
                oStyle.styleSheet.cssText = sCSSCode
            } else {
                oStyle.appendChild(document.createTextNode(sCSSCode));
            }
        }

        oCachedProperties = [];
    }

    /*
        public section
    */
    
    return {
    
        init: function() {
            yud.addClass( document.getElementsByTagName( "body" )[0], "yui-skin-sam" );
            
            oCfg = this.cfg;
            yue.onDOMReady( this.setupMenu, this, true );
            yue.onDOMReady( this.setupDialogs, this, true );
            yue.onContentReady( "ezste-menubar", this.setupOverlay, this,  true );
        
        },
        
        setupDialogs: function() {
        
            this.setupPropDialog();
            this.setupInsertImgDialog();
            this.setupSiteStyleDialog();
            this.setupRestoreStyleDialog();
            this.setupGroupDialog();
            
            oManager = new YAHOO.widget.OverlayManager();
            oManager.register( [ oPropDialog, 
                                 oInsertImgDialog,
                                 oSiteStyleDialog,
                                 oRestoreStyleDialog,
                                 oGroupDialog ] );
        
        },
        
        setupInsertImgDialog: function() {
            var oViewPort = document.getElementsByTagName( "body" )[0];
            var oRegion = yud.getRegion( oViewPort );
            var nDialogXPos = (oRegion.right - oRegion.left - 545) / 2;
                
            oInsertImgDialog = new YAHOO.widget.Dialog( "ezste-insert-image-dialog", { fixedcenter: false,
                                                               constraintoviewport: false,
                                                               visible: false,
                                                               zindex: 500,
                                                               xy: [ Math.round(nDialogXPos), 100 ],
                                                               draggable: true,
                                                               width: "545px",
                                                               buttons : [ { text: oCfg.BUTTON_LABELS[6], handler: insertImgDialogSubmit, isDefault: true },  
                                                                           { text: oCfg.BUTTON_LABELS[4], handler: insertImgDialogCancel } ]
                                                             } );
            oInsertImgDialog.setBody( " " );
            oInsertImgDialog.render(document.body);
        },

        setupSiteStyleDialog: function() {
            var oViewPort = document.getElementsByTagName( "body" )[0];
            var oRegion = yud.getRegion( oViewPort );
            var nDialogXPos = (oRegion.right - oRegion.left - 545) / 2;
                
            oSiteStyleDialog = new YAHOO.widget.Dialog( "ezste-sitestyle-dialog", { fixedcenter: false,
                                                               constraintoviewport: false,
                                                               visible: false,
                                                               zindex: 600,
                                                               xy: [ Math.round(nDialogXPos), 100 ],
                                                               draggable: true,
                                                               width: "425px",
                                                               buttons : [ { text: oCfg.BUTTON_LABELS[6], handler: siteStyleDialogSubmit, isDefault: true },  
                                                                           { text: oCfg.BUTTON_LABELS[4], handler: siteStyleDialogCancel } ]
                                                             } );
            oSiteStyleDialog.setBody( " " );
            oSiteStyleDialog.render(document.body);
        },

        setupRestoreStyleDialog: function() {
            var oViewPort = document.getElementsByTagName( "body" )[0];
            var oRegion = yud.getRegion( oViewPort );
            var nDialogXPos = (oRegion.right - oRegion.left - 545) / 2;
                
            oRestoreStyleDialog = new YAHOO.widget.Dialog( "ezste-restorestyle-dialog", { fixedcenter: false,
                                                               constraintoviewport: false,
                                                               visible: false,
                                                               zindex: 700,
                                                               xy: [ Math.round(nDialogXPos), 100 ],
                                                               draggable: true,
                                                               width: "425px",
                                                               buttons : [ { text: oCfg.BUTTON_LABELS[7], handler: siteRestoreDialogSubmit, isDefault: true },  
                                                                           { text: oCfg.BUTTON_LABELS[4], handler: siteRestoreDialogCancel } ]
                                                             } );
            oRestoreStyleDialog.setBody( " " );
            oRestoreStyleDialog.render(document.body);
        },
        
        setupPropDialog: function() {
            oPropDialog = new YAHOO.widget.Dialog( "ezste-properties-dialog", { fixedcenter: true,
                                                               constraintoviewport: true,
                                                               visible: false,
                                                               zindex: 400,
                                                               draggable: true,
                                                               width: "425px",
                                                               buttons : [ { text: oCfg.BUTTON_LABELS[2], handler: propDialogSubmit, isDefault: true },
                                                                           { text: oCfg.BUTTON_LABELS[3], handler: propDialogApply },
                                                                           { text: oCfg.BUTTON_LABELS[4], handler: propDialogCancel } ]
                                                             } );
            oPropDialog.setBody( " " );
            oPropDialog.render(document.body);
        },

        setupGroupDialog: function() {
            oGroupDialog = new YAHOO.widget.Dialog( "ezste-group-dialog", { fixedcenter: true,
                                                               constraintoviewport: true,
                                                               visible: false,
                                                               zindex: 800,
                                                               draggable: true,
                                                               width: "525px",
                                                               buttons : [ { text: oCfg.BUTTON_LABELS[2], handler: groupDialogSubmit, isDefault: true },
                                                                           { text: oCfg.BUTTON_LABELS[3], handler: groupDialogApply },
                                                                           { text: oCfg.BUTTON_LABELS[4], handler: groupDialogCancel } ]
                                                             } );
            oGroupDialog.setBody( " " );
            oGroupDialog.render(document.body);
        },
    
        setupMenu: function() {
        
            var sMenuBarItemText;

            var oMenuBar = new YAHOO.widget.MenuBar( "ezste-menubar", { 
                                                                        lazyload: true,
                                                                        constraintoviewport: true,
                                                                        autosubmenudisplay: false, 
                                                                        zindex: 900
                                                                     });
            
            var oElementsMenu = new YAHOO.widget.Menu( "elementsmenu" );

            for( var i = 0; i < this.elements.length; i++ ) {
                var oElement = this.elements[i];
                
                if(oElement.overlay == true)
                    continue;
                
                if ( oElement.group !== undefined ) {
                    
                    var oGroupMenu = YAHOO.widget.MenuManager.getMenu(oElement.group);
                            
                    if ( oGroupMenu === undefined ) {
                        var oGroupMenu = new YAHOO.widget.Menu(oElement.group);
                                
                        oElementsMenu.addItem( { text: oElement.groupname, submenu: oGroupMenu, autosubmenudisplay: false } );
                    }

                    var oMenuItem = oGroupMenu.addItem( { text: oElement.alias } );
                            
                    yue.addListener( oMenuItem.id, "click", showGroupDialogBox, oElement, true );
 

                    continue;
                }
                
                if( oElement.alias ) {
                    sMenuBarItemText = oElement.alias;
                } else {
                    sMenuBarItemText = ( oElement.element.id == "" ) ? oElement.element.name : oElement.element.id;
                }
                
                var oMenuItem = oElementsMenu.addItem( { text: sMenuBarItemText, value: oElement.selector } );

                yue.addListener( oMenuItem.id, "click", showPropertyDialogBox, oElement, true );
                
                if (oElement.overlay == true) {
                    yue.addListener(oMenuItem.id, "mouseover", showToolTip, oElement);
                    yue.addListener(oMenuItem.id, "mouseout", hideToolTip, oElement);
                }
            };
            
            oMenuBar.addItem( "<em id=\"ezste-menu-label\">eZ</em>" );
            oMenuBar.addItem( new YAHOO.widget.MenuBarItem( oCfg.MENU_LABELS[0], { submenu: oElementsMenu } ) );
            oMenuBar.addItem( { text: oCfg.MENU_LABELS[1], url: oCfg.helpurl, classname: "help-url" } );
            oMenuBar.addItem( { text: "Styles", url: "", onclick: { fn: showSiteStyleDialogBox } } );
            oMenuBar.addItem( { text: oCfg.MENU_LABELS[2], url: oCfg.siteurl } );
            oMenuBar.render(document.body);

            // Set menu to the relative position
            yud.setStyle( oMenuBar.id, "position", "relative" );

            oMenuBar.subscribe("show", onSubmenuShow);
        },

        elements: [],

        cfg: {},
        
        alignOverlay: function() {
            var aOverlayObjects = this;

            for(var i = 0; i < aOverlayObjects.length; i++) {
                var aContext = aOverlayObjects[i].cfg.getProperty("context");
                var oSrcElement = aContext[0];
                
                var oRegion = yud.getRegion( oSrcElement );
                var nElemHeight = oRegion.bottom - oRegion.top-1;
                var nElemWidth = oRegion.right - oRegion.left-1;
                
                aOverlayObjects[i].cfg.setProperty( "width", nElemWidth + "px" );
                aOverlayObjects[i].cfg.setProperty( "height", nElemHeight + "px" );
                aOverlayObjects[i].align();
            }
        },

        setupOverlay: function() {
            var aOverlayObjects = [];

            for( var i = 0; i < this.elements.length; i++ ) {
                var oElement = this.elements[i];
                if( oElement.overlay == false )
                    continue;
                    
                var oSrcElement = yud.get( oElement.element.id );

                if( !oSrcElement )
                {
                    var aElements = document.getElementsByTagName( oElement.element.name );
                    
                    if( aElements.length == 1 )
                        oSrcElement = aElements[0];
                    
                    if(!oSrcElement)
                        continue;
                }
                    
                var sOverlayID = "ezste-" + ( ( oSrcElement.id == "") ? oSrcElement.nodeName.toLowerCase() : oSrcElement.id );
                
                
                var oRegion = yud.getRegion( oSrcElement );
                var nElemHeight = oRegion.bottom - oRegion.top-1;
                var nElemWidth = oRegion.right - oRegion.left-1;

                aOverlayObjects[i] = new YAHOO.widget.Overlay( sOverlayID, { xy: yud.getXY( oSrcElement ),
                                                                             context: [ oSrcElement, "tl","tl" ],
                                                                             zindex: 10 + i,
                                                                             width: nElemWidth + "px",
                                                                             height: nElemHeight + "px" 
                                                                           } );

                aOverlayObjects[i].render( document.body );

                yud.addClass( sOverlayID, "ezste" );
                yud.setStyle( sOverlayID, "border", "1px solid #FF0000");
                yud.setStyle( sOverlayID, "padding", "0");

                yue.addListener( sOverlayID, "click", showPropertyDialogBox, oElement, true );
                yue.addListener( sOverlayID, "mouseover", showToolTip );
                yue.addListener( sOverlayID, "mouseout", hideToolTip );
                
                YAHOO.widget.Overlay.windowResizeEvent.subscribe( this.alignOverlay, aOverlayObjects, true );
            }
        
        }
    }

}();
