var objClickableArea;
var strHeadMenuLinkURL = new Array;
var blnPulldownLoaded = new Array;
var intShowPulldownTimerID;
var intHidePulldownTimerID;
var strLastShowPulldownID;
var objPageLoadDate = new Date;
function showPulldownMenu(strMenuID, blnClick) {
    if (intHidePulldownTimerID) {
        clearTimeout(intHidePulldownTimerID);
        intHidePulldownTimerID = ""
    }
    intShowPulldownTimerID = setTimeout((function() {
            showPulldownMenuSub(strMenuID, blnClick)
        }
    ), 100)
}
function showPulldownMenuSub(strMenuID, blnClick) {
    if (intShowPulldownTimerID) {
        clearTimeout(intShowPulldownTimerID);
        intShowPulldownTimerID = ""
    }
    var objHighLight = document.getElementById(strMenuID + "-line");
    var objPulldown = document.getElementById(strMenuID + "-box");
    if (strLastShowPulldownID) {
        var blnSameMenuClick = blnClick && strLastShowPulldownID == strMenuID ? true : false;
        hidePulldownMenuSub();
        if (blnSameMenuClick && objPulldown) {
            return
        }
    }
    if (objHighLight) {
        objHighLight.style.visibility = "visible"
    }
    if (objPulldown) {
        objPulldown.style.visibility = "visible";
        objPulldown.style.zIndex = 3;
        var objBottom = document.getElementById("page_bottom_tag");
        if (!objBottom) {
            objBottom = document.createElement("a");
            objBottom.id = "page_bottom_tag";
            document.body.appendChild(objBottom)
        }
        if (!objClickableArea) {
            objClickableArea = document.createElement("div");
            objClickableArea.style.position = "absolute";
            objClickableArea.style.background = "#FF0000";
            objClickableArea.style.zIndex = 0;
            objClickableArea.style.top = "0px";
            objClickableArea.style.left = "0px";
            objClickableArea.style.height = document.getElementById("page_bottom_tag").offsetTop + "px";
            objClickableArea.style.visibility = "hidden";
            objClickableArea.onclick = hidePulldownMenuSub;
            setOpacityStyle(objClickableArea, 0);
            document.body.appendChild(objClickableArea)
        }
        objClickableArea.style.visibility = "visible"
    }
    strLastShowPulldownID = strMenuID;
    if (!objPulldown && blnClick && strHeadMenuLinkURL[strMenuID]) {
        location.href = strHeadMenuLinkURL[strMenuID];
        return
    }
    if (objPulldown) {
        if (objPulldown.getAttribute("load") != "ajax" || blnPulldownLoaded[strMenuID]) {
            return
        }
        var strUrl = "/module/header/parts/" + strMenuID + ".html?r=" + objPageLoadDate.getTime();
        ajax.get(strUrl, (function(strResponse) {
                if (strResponse) {
                    objPulldown.innerHTML = strResponse;
                    switch (strMenuID) {
                        case "keiyakupulldownlink":
                            var objMtlistItems = document.getElementById("keiyakupulldownlink-item");
                            if (!objMtlistItems) {
                                break
                            }
                            document.getElementById("keiyakupulldownlink-none").style.display = "none";
                            break;
                        case "cartpulldownlink":
                            var objCartItems = document.getElementById("cartpulldownlink-item");
                            if (!objCartItems) {
                                break
                            }
                            document.getElementById("cartpulldownlink-none").style.display = "none";
                            if (Number(document.getElementById("cartpulldownlink-item").getAttribute("count")) > 0) {
                                document.getElementById("cartpulldownlink-later").style.display = "none"
                            } else if (Number(document.getElementById("cartpulldownlink-later").getAttribute("count")) > 0) {
                                document.getElementById("cartpulldownlink-item").style.display = "none"
                            }
                            break;
                        case "mylistpulldownlink":
                            var objMtlistItems = document.getElementById("mylistpulldownlink-item");
                            if (!objMtlistItems) {
                                break
                            }
                            document.getElementById("mylistpulldownlink-none").style.display = "none";
                            break
                    }
                    blnPulldownLoaded[strMenuID] = true
                } else {
                    switch (strMenuID) {
                        case "keiyakupulldownlink":
                            objPulldown.innerHTML = '<div class="submenuheader">読み込みに失敗しました。<div class="comment">インターネット接続を確認してください。または、もう一度操作をお試しください。</div></div>';
                            break;
                        case "cartpulldownlink":
                            objPulldown.innerHTML = '<div class="submenuheader">読み込みに失敗しました。<div class="comment">インターネット接続を確認してください。または、もう一度操作をお試しください。</div></div>';
                            break;
                        case "mylistpulldownlink":
                            objPulldown.innerHTML = '<div class="submenuheader">読み込みに失敗しました。<div class="comment">インターネット接続を確認してください。または、もう一度操作をお試しください。</div></div>';
                            break
                    }
                }
            }
        ))
    }
}
function hidePulldownMenu() {
    if (intShowPulldownTimerID) {
        clearTimeout(intShowPulldownTimerID);
        intShowPulldownTimerID = ""
    }
    intHidePulldownTimerID = setTimeout((function() {
            hidePulldownMenuSub()
        }
    ), 200)
}
function hidePulldownMenuSub() {
    if (intHidePulldownTimerID) {
        clearTimeout(intHidePulldownTimerID);
        intHidePulldownTimerID = ""
    }
    var objHighLight = document.getElementById(strLastShowPulldownID + "-line");
    if (objHighLight) {
        objHighLight.style.visibility = "hidden"
    }
    var objPulldown = document.getElementById(strLastShowPulldownID + "-box");
    if (objPulldown) {
        objPulldown.style.visibility = "hidden"
    }
    if (objClickableArea) {
        objClickableArea.style.visibility = "hidden"
    }
    strLastShowPulldownID = ""
}
function onWindowResized() {
    var objBaseBlock = document.getElementById("baseblock");
    var strPulldownList = new Array("searchpulldownlink","mypagepulldownlink","joinpulldownlink","keiyakupulldownlink","cartpulldownlink","mylistpulldownlink","loginpulldownlink");
    for (var i in strPulldownList) {
        var objButton = document.getElementById(strPulldownList[i]);
        var objPulldown = document.getElementById(strPulldownList[i] + "-box");
        if (!objButton) {
            continue
        }
        if (objPulldown) {
            var intLeftPost = objButton.offsetLeft;
            if (strPulldownList[i] == "cartpulldownlink") {
                intLeftPost = objButton.offsetLeft + objButton.offsetWidth - objPulldown.offsetWidth
            }
            objPulldown.style.left = intLeftPost + "px"
        }
        var objHighLight = document.getElementById(strPulldownList[i] + "-line");
        if (objHighLight) {
            objHighLight.style.left = objButton.offsetLeft + "px"
        }
    }
    var objBottom = document.getElementById("page_bottom_tag");
    if (objBottom && objClickableArea) {
        objClickableArea.style.height = objBottom.offsetTop + "px"
    }
    return
}
function initTabletMenu() {
    var strPulldownList = new Array("searchpulldownlink","mypagepulldownlink","joinpulldownlink","keiyakupulldownlink","cartpulldownlink","mylistpulldownlink","loginpulldownlink");
    for (i in strPulldownList) {
        var strKeyName = strPulldownList[i];
        var objButton = document.getElementById(strKeyName);
        var objPulldown = document.getElementById(strKeyName + "-box");
        if (objButton) {
            var objAtags = objButton.getElementsByTagName("a");
            if (objAtags.length > 0) {
                strHeadMenuLinkURL[strKeyName] = objAtags[0].href
            }
            objButton.ontouchstart = function(strId) {
                return function() {
                    showPulldownMenuSub(strId, true);
                    return false
                }
            }(strKeyName);
            objButton.onmousedown = function(strId) {
                return function() {
                    if (strHeadMenuLinkURL[strId]) {
                        this.href = strHeadMenuLinkURL[strId]
                    }
                    return false
                }
            }(strKeyName);
            objButton.onmouseover = function(strId) {
                return function() {
                    showPulldownMenu(strId, false);
                    return false
                }
            }(strKeyName);
            objButton.onmouseout = function() {
                hidePulldownMenu();
                return false
            }
            ;
            var objSubMenuHighLight = document.createElement("div");
            objSubMenuHighLight.id = strKeyName + "-line";
            objSubMenuHighLight.className = "submenuhighlight";
            objSubMenuHighLight.style.position = "absolute";
            objSubMenuHighLight.style.visibility = "hidden";
            objSubMenuHighLight.style.top = "0px";
            objSubMenuHighLight.style.left = objButton.offsetLeft + "px";
            objSubMenuHighLight.style.width = objButton.offsetWidth + "px";
            objButton.parentNode.appendChild(objSubMenuHighLight)
        }
        if (objPulldown) {
            objPulldown.onmouseover = function() {
                if (intHidePulldownTimerID) {
                    clearInterval(intHidePulldownTimerID);
                    intHidePulldownTimerID = ""
                }
            }
            ;
            objPulldown.onmouseout = function() {
                hidePulldownMenu()
            }
        }
    }
    var objMainLeftBox = document.getElementById("main-leftbox");
    var objMainRightMenu = document.getElementById("main-rightmenu");
    if (objMainLeftBox && objMainRightMenu) {
        if (objMainLeftBox.offsetHeight < objMainRightMenu.offsetHeight) {
            objMainLeftBox.style.minHeight = objMainRightMenu.offsetHeight + "px"
        }
    }
    var objMainRightBox = document.getElementById("main-rightbox");
    var objMainLeftMenu = document.getElementById("main-leftmenu");
    if (objMainRightBox && objMainLeftMenu) {
        if (objMainRightBox.offsetHeight < objMainLeftMenu.offsetHeight) {
            objMainRightBox.style.minHeight = objMainLeftMenu.offsetHeight + "px"
        }
    }
    var objMainBaseBox = document.getElementById("main-base");
    if (objMainBaseBox) {
        objMainBaseBox.style.minHeight = "0px"
    }
    if (navigator.userAgent.indexOf("MSIE") != -1) {
        window.attachEvent("onresize", onWindowResized)
    } else {
        window.addEventListener("resize", onWindowResized, false)
    }
    onWindowResized()
}
addDOMContentLoadedEvent(initTabletMenu);
var DugaPlayerBox;
function initMoviePlayerLink() {
    var objAllplayLink = document.getElementsByName("dugaplayerlink");
    for (var i = 0; i < objAllplayLink.length; i++) {
        setMoviePlayerLink(objAllplayLink[i])
    }
    var objAllplayLink = document.getElementsByName("dugasamplelink");
    for (var i = 0; i < objAllplayLink.length; i++) {
        setMoviePlayerLink(objAllplayLink[i])
    }
    var objAlldlLink = document.getElementsByName("dugadownloadlink");
    for (var i = 0; i < objAlldlLink.length; i++) {
        setDownloadLink(objAlldlLink[i])
    }
}
function setDownloadLink(objTarget) {
    var strPID = objTarget.getAttribute("pid");
    var strType = objTarget.getAttribute("filetype");
    var intNo = objTarget.getAttribute("fileno");
    var intViewType = objTarget.getAttribute("viewtype");
    if (typeof ga == "function") {
        objTarget.onclick = function() {
            ga("send", "event", "動画", "ダウンロード", strPID)
        }
    }
    return true
}
function setMoviePlayerLink(objTarget) {
    var strType = objTarget.getAttribute("filetype");
    if (ClientDeviceType == "smartphone" || ClientDeviceType == "tablet") {
        var is_phls = strType == "phls" || strType == "phlssample" ? true : false;
        objTarget.target = is_phls && ClientCareer != "ipad" ? "" : "_blank"
    } else {
        if (strType == "urlplay") {
            objTarget.onclick = function() {
                OpenURLMoviePlayer(this, blnIsSample);
                return false
            }
        } else {
            var blnIsSample = strType == "wmvsample" || strType == "wmdrmsample" || strType == "mp4sample" || strType == "wmvldsample" || strType == "wmdrmldsample" || strType == "wmvhdsample" || strType == "wmdrmhdsample" ? true : false;
            if (strType == "wmv" || strType == "wmvsample" || strType == "wmdrm" || strType == "wmdrmsample" || strType == "mp4" || strType == "mp4sample" || strType == "mp4sd" || strType == "mp4sdsample" || strType == "mp4hd" || strType == "mp4hdsample" || strType == "wmvld" || strType == "wmvldsample" || strType == "wmdrmld" || strType == "wmdrmldsample" || strType == "wmvhd" || strType == "wmvhdsample" || strType == "wmdrmhd" || strType == "wmdrmhdsample") {
                objTarget.onclick = function() {
                    OpenProductMoviePlayer(this, blnIsSample);
                    return false
                }
            }
        }
    }
}
function OpenProductMoviePlayer(objTarget, blnIsSample) {
    var strAdminTest = document.URL.match(/[\?\&]testmode=admintest/) ? "&testmode=admintest" : "";
    var strTempMode = document.URL.match(/[\?\&]mode=temp/) ? "&tempmode=temp" : "";
    var strTestMode = document.URL.match(/[\?\&]test=([0-9]+)/) ? "&test=" + RegExp.$1 : "";
    var strHLSDomain = document.URL.match(/[\?\&]hlsdomain=([^&]+)/) ? "&hlsdomain=" + RegExp.$1 : "";
    var blnForceDash = document.URL.match(/[\?\&]dash=1/) ? true : false;
    var blnSelfWindow = document.URL.match(/[\?\&]self=1/) ? true : false;
    var strPID = objTarget.getAttribute("pid");
    var strType = objTarget.getAttribute("filetype");
    var intNo = objTarget.getAttribute("fileno");
    var intViewType = objTarget.getAttribute("viewtype");
    var strPlayerType = ClientCareer == "universal" || ClientCareer == "universal-mobile" ? "&playertype=flash" : "";
    var objDate = new Date;
    var strCheckURL = "/prog/movieplayer?mode=check_download_validation&id=" + strPID + "&viewtype=" + intViewType + "&filetype=" + strType + "&startfile=" + intNo + "&url=" + escape(document.URL) + strPlayerType + strAdminTest + strTempMode + strTestMode + strHLSDomain;
    var strResponse = ajax.gets(strCheckURL + "&r=" + objDate.getTime());
    if (strResponse && strResponse != "OK") {
        location.href = strResponse;
        return false
    }
    if (typeof ga == "function") {
        var strActionVars = blnIsSample ? "サンプル再生" : "本編再生";
        ga("send", "event", "動画", strActionVars, strPID)
    }
    var blnUseStreaming = false;
    var blnInitPlay = false;
    var strUserAgent = navigator.userAgent;
    if (ClientCareer == "universal") {
        if (strUserAgent.match(/ Edge\//i)) {
            blnUseStreaming = true
        }
        if (strUserAgent.match(/ rv:(\d+)/)) {
            if (RegExp.$1 >= 11) {
                if (strUserAgent.match(/Windows NT (\d+\.\d+)/)) {
                    if (RegExp.$1 >= 6.2) {
                        blnUseStreaming = true
                    }
                }
            }
        }
    }
    if (strUserAgent.match(/ Chrome\/(\d+)/i)) {
        blnUseStreaming = true
    }
    if (strUserAgent.match(/(Firefox)\/(\d+)\.[\d\.]+/i)) {
        if (RegExp.$2 >= 47) {
            blnUseStreaming = true
        }
    }
    if (strUserAgent.match(/ (Safari)\//i)) {
        if (strUserAgent.match(/(Version)\/(\d+)\.[\d\.]+/i)) {
            if (RegExp.$2 >= 12) {
                blnUseStreaming = true;
                blnInitPlay = true
            }
        }
    }
    strDashMode = blnUseStreaming || blnForceDash ? "&dash=1" : "";
    var strJavaLibPath = blnUseStreaming || blnForceDash ? "/js/streamingplayer.js" : "/script/dugaplayer/Silverlight.js";
    var strPlayerName = blnUseStreaming || blnForceDash ? "streamingplayer" : "movieplayer";
    var strPlayerURL = "https://" + location.hostname + "/prog/" + strPlayerName + "?samewindow=1&id=" + strPID + "&viewtype=" + intViewType + "&filetype=" + strType + "&startfile=" + intNo + strPlayerType + strAdminTest + strTempMode + strTestMode + strDashMode + strHLSDomain;
    var strCharset = "UTF-8";
    if (!DugaPlayerBox) {
        DugaPlayerBox = document.createElement("div");
        DugaPlayerBox.style.display = "none";
        DugaPlayerBox.style.position = "fixed";
        DugaPlayerBox.style.height = "100%";
        DugaPlayerBox.style.width = "100%";
        DugaPlayerBox.style.margin = "0px";
        DugaPlayerBox.style.padding = "0px";
        DugaPlayerBox.style.left = "0px";
        DugaPlayerBox.style.top = "0px";
        DugaPlayerBox.style.zIndex = 99;
        document.body.appendChild(DugaPlayerBox);
        if (blnInitPlay) {
            DugaPlayerBox.innerHTML = '<video id="dash-video"></video>';
            var evideo = document.getElementById("dash-video");
            var promise = evideo.play();
            if (promise instanceof Promise) {
                promise.catch()
            }
        }
    }
    var initPlayerFunc = null;
    if (blnUseStreaming || blnForceDash) {
        var initPlayerFunc = function() {
            initDashPlayer()
        }
    }
    var scriptCallback = function() {
        var blnPlayerFailed = false;
        if (!blnUseStreaming && !blnForceDash) {
            if (!Silverlight.isInstalled()) {
                blnPlayerFailed = true;
                strPlayerURL = "https://" + location.hostname + "/module/silverlight_install_message.html"
            }
        }
        ajax.get(strPlayerURL, (function(strResponse) {
                if (!blnPlayerFailed) {
                    document.body.style.overflow = "hidden"
                }
                showModalPageBackGround("#000", 70, (function() {
                        CloseProductMoviePlayer()
                    }
                ), "streamingplayer");
                DugaPlayerBox.style.display = "block";
                DugaPlayerBox.innerHTML = strResponse;
                if (initPlayerFunc) {
                    initPlayerFunc()
                }
            }
        ))
    };
    if (blnUseStreaming || blnForceDash) {
        loadScriptOnce(strJavaLibPath, scriptCallback, strCharset)
    } else {
        loadScript(strJavaLibPath, scriptCallback, strCharset)
    }
    return false
}
function CloseProductMoviePlayer() {
    setTimeout((function() {
            if (DugaPlayerBox) {
                DugaPlayerBox.style.display = "none"
            }
            hideModalPageBackGround();
            document.body.style.overflow = "visible"
        }
    ), 50);
    return false
}
function OpenURLMoviePlayer(objTarget, blnIsSample) {
    var strTitle = objTarget.getAttribute("title");
    var strMovieURL = objTarget.getAttribute("href");
    var strMovieHeight = objTarget.getAttribute("movieheight") ? "&movieheight=" + objTarget.getAttribute("movieheight") : "";
    var strMovieWidth = objTarget.getAttribute("moviewidth") ? "&moviewidth=" + objTarget.getAttribute("moviewidth") : "";
    var strTestMode = document.URL.match(/[\?\&]test=([0-9]+)/) ? "&test=1" + RegExp.$1 : "";
    var strPlayerURL = "https://" + location.hostname + "/prog/movieplayer?mode=urlplaymode&filetype=urlplay&movieurl=" + escape(strMovieURL) + "&title=" + escape(strTitle) + strMovieHeight + strMovieWidth + strTestMode;
    var objWindow = window.open(strPlayerURL, "dugaplayer", "resizable=yes,scrollbars=no,location=no,toolbar=no,status=no,menubar=no,width=640,height=550");
    objWindow.focus();
    return false
}
addDOMContentLoadedEvent(initMoviePlayerLink);
KeywordCount = 0;
PopupTimerID = 0;
PopupLastWord = "";
PopupActiveNo = 0;
PopupHitTest = 0;
PopupActiveObj = "";
function triggerExpectWord(objKeywordBox) {
    if (PopupTimerID) {
        clearTimeout(PopupTimerID);
        PopupTimerID = 0
    }
    PopupTimerID = setTimeout((function() {
            execExpectWord(objKeywordBox)
        }
    ), 50)
}
function execExpectWord(objKeywordBox) {
    var strResponse = "";
    var searchWord = objKeywordBox.value;
    if (location.pathname.match(/^\/search\//) && !location.pathname.match(/^\/search\/(=\/(q=[^\/]+\/)?)?$/)) {
        searchWord = ""
    }
    if (searchWord != "") {
        var objDate = new Date;
        var strUrl = "/prog/expectdic/?q=" + encodeURI(searchWord) + "&r=" + objDate.getTime();
        ajax.get(strUrl, (function(strResponse) {
                PopupActiveNo = 0;
                KeywordCount = 0;
                var strPopupHTML = "";
                var strResLines = strResponse.split("\n");
                for (var i = 0; i < strResLines.length; i++) {
                    if (!strResLines[i]) {
                        continue
                    }
                    var strTemp = strResLines[i].split(",");
                    KeywordCount++;
                    strPopupHTML += '<a id="keyworditem' + KeywordCount + '" class="word word-inactive" href="' + strTemp[0] + '" onMouseOver="javascript: setAvtiveNo(' + KeywordCount + ');" onMouseOut="javascript: setAvtiveNo(0);">' + strTemp[1] + "</a>"
                }
                if (KeywordCount) {
                    var objPopupOuter = document.getElementById("keywordpopupouter");
                    var objPopupInner = document.getElementById("keywordpopupinner");
                    var objTempOffset = cumulativeOffset(objKeywordBox);
                    objPopupInner.innerHTML = strPopupHTML;
                    objPopupOuter.style.top = objTempOffset[1] + objKeywordBox.offsetHeight + "px";
                    objPopupOuter.style.left = objTempOffset[0] + "px";
                    objPopupOuter.style.width = objKeywordBox.offsetWidth + "px";
                    objPopupOuter.style.display = "block";
                    objPopupOuter.style.zIndex = 99
                } else {
                    hidePopup()
                }
                PopupTimerID = 0
            }
        ))
    } else {
        hidePopup();
        PopupTimerID = 0
    }
}
function cumulativeOffset(element) {
    var valueT = 0
        , valueL = 0;
    do {
        valueT += element.offsetTop || 0;
        valueL += element.offsetLeft || 0;
        element = element.offsetParent
    } while (element);
    return [valueL, valueT]
}
function hidePopup(blnOnBlur) {
    var objPopupOuter = document.getElementById("keywordpopupouter");
    if (!objPopupOuter) {
        return
    }
    if (blnOnBlur && PopupHitTest) {
        return
    }
    objPopupOuter.style.display = "none";
    PopupActiveNo = 0
}
function setAvtiveNo(intNo) {
    for (var i = 1; i <= KeywordCount; i++) {
        document.getElementById("keyworditem" + i).className = "word word-inactive"
    }
    if (intNo > 0) {
        document.getElementById("keyworditem" + intNo).className = "word word-active"
    }
    PopupActiveNo = intNo
}
function initExpectWord() {
    var is_gecko = navigator.userAgent.toLowerCase().indexOf("gecko") != -1;
    var intCount = 0;
    var objInputs = document.getElementsByTagName("input");
    for (i = 0; i < objInputs.length; i++) {
        if (!objInputs[i].getAttribute("expectword")) {
            continue
        }
        objInputs[i].onkeyup = function(e) {
            e = e ? e : window.event;
            switch (e.keyCode) {
                case 38:
                    intNewNo = PopupActiveNo - 1;
                    if (intNewNo <= -1) {
                        intNewNo = KeywordCount
                    }
                    setAvtiveNo(intNewNo);
                    this.value = intNewNo > 0 ? is_gecko ? document.getElementById("keyworditem" + intNewNo).textContent : document.getElementById("keyworditem" + intNewNo).innerText : PopupLastWord;
                    break;
                case 40:
                    intNewNo = PopupActiveNo + 1;
                    if (intNewNo >= KeywordCount + 1) {
                        intNewNo = 0
                    }
                    setAvtiveNo(intNewNo);
                    this.value = intNewNo > 0 ? is_gecko ? document.getElementById("keyworditem" + intNewNo).textContent : document.getElementById("keyworditem" + intNewNo).innerText : PopupLastWord;
                    break;
                default:
                    if (PopupLastWord == this.value) {
                        break
                    }
                    triggerExpectWord(this);
                    PopupLastWord = this.value;
                    break
            }
        }
        ;
        addEventHandler(objInputs[i], "focus", (function() {
                PopupActiveObj = this;
                PopupLastWord = this.value
            }
        ));
        addEventHandler(objInputs[i], "blur", (function() {
                hidePopup(1)
            }
        ));
        addEventHandler(objInputs[i], "mousedown", (function() {
                hidePopup(1)
            }
        ));
        objInputs[i].setAttribute("autocomplete", "off");
        intCount++
    }
    if (!intCount) {
        return
    }
    var objPopupOuter = document.createElement("div");
    var objPopupInner = document.createElement("div");
    objPopupOuter.id = "keywordpopupouter";
    objPopupInner.id = "keywordpopupinner";
    objPopupOuter.onmouseover = function() {
        PopupHitTest = 1
    }
    ;
    objPopupOuter.onmouseout = function() {
        PopupHitTest = 0
    }
    ;
    objPopupOuter.appendChild(objPopupInner);
    document.body.appendChild(objPopupOuter);
    setInterval((function() {
            if (!PopupActiveObj) {
                return
            }
            if (PopupLastWord == PopupActiveObj.value || PopupActiveNo > 0) {
                return
            }
            triggerExpectWord(PopupActiveObj);
            PopupLastWord = PopupActiveObj.value
        }
    ), 50)
}
addDOMContentLoadedEvent(initExpectWord);
function adjustAddMylistLink() {
    var objAddMyList = getElementsByClassName("mylistlink");
    if (objAddMyList) {
        var blnHideButton = location.pathname.match(/^\/mypage\/mylist\//) ? true : false;
        for (var i = 0; i < objAddMyList.length; i++) {
            (function() {
                    var strProductID = objAddMyList[i].getAttribute("productid");
                    var strViewType = objAddMyList[i].getAttribute("viewtype");
                    var strMyListURL = objAddMyList[i].href;
                    var strMyListStatus = objAddMyList[i].getAttribute("myliststatus");
                    if (!strProductID || !strViewType) {
                        return
                    }
                    if (blnHideButton) {
                        objAddMyList[i].parentNode.style.display = "none"
                    }
                    if (strMyListStatus.length == 0) {
                        objAddMyList[i].onclick = function() {
                            addMyListCSS(this, strProductID, strViewType, strMyListURL, i + 1);
                            return false
                        }
                    } else {
                        if (strMyListStatus == 1) {
                            objAddMyList[i].innerHTML = "マイリストから削除"
                        }
                        objAddMyList[i].onclick = function() {
                            sendMyListManager(this, strProductID, strViewType, strMyListURL, i + 1);
                            return false
                        }
                    }
                }
            )()
        }
    }
    var objAddMyList = getElementsByClassName("mylist");
    if (objAddMyList) {
        for (var i = 0; i < objAddMyList.length; i++) {
            (function() {
                    var strProductID = objAddMyList[i].getAttribute("productid");
                    var strViewType = objAddMyList[i].getAttribute("viewtype");
                    var strMyListURL = objAddMyList[i].href;
                    if (!strProductID || !strViewType) {
                        return
                    }
                    objAddMyList[i].onclick = function() {
                        addMyList(this, strProductID, strViewType, strMyListURL, i + 1);
                        return false
                    }
                }
            )()
        }
    }
    return
}
function sendMyListManager(objElem, strPid, strViewType, strMyListURL, strMyListNo) {
    var strMyListStatus = objElem.getAttribute("myliststatus");
    if (strMyListStatus == 1) {
        var objDate = new Date;
        var strResponse = ajax.gets("/prog/ajaxhelper?action=delmylist&productid=" + strPid + "&viewtype=" + strViewType + "&r=" + objDate.getTime());
        switch (strResponse) {
            case "invalid_param":
                alert("正しいパラメータではありません");
                break;
            case "delete_success":
                objElem.innerHTML = "マイリストへ追加";
                objElem.setAttribute("myliststatus", "0");
                objDugaProductHoverBox.clearContentsCache(strPid);
                break;
            default:
                location.href = strMyListURL;
                return
        }
    } else {
        var objDate = new Date;
        var strResponse = ajax.gets("/prog/ajaxhelper?action=addmylist&productid=" + strPid + "&viewtype=" + strViewType + "&r=" + objDate.getTime());
        switch (strResponse) {
            case "invalid_param":
                alert("正しいパラメータではありません");
                break;
            case "over_max_count":
                objElem.onclick = function(e) {
                    return true
                }
                ;
                objElem.href = "/mypage/mylist/";
                objElem.innerHTML = "登録数の上限に達しています";
                objElem.setAttribute("myliststatus", "-1");
                objElem.className = objElem.className + " " + "buttonbig_alert";
                objDugaProductHoverBox.clearContentsCache(strPid);
                break;
            case "regist_success":
                objElem.innerHTML = "マイリストから削除";
                objElem.setAttribute("myliststatus", "1");
                objDugaProductHoverBox.clearContentsCache(strPid);
                var strResponse = ajax.gets("/prog/ajaxhelper?action=contentsinfojs&pid=" + strPid);
                if (strResponse) {
                    var objResponse = JSON.parse(strResponse);
                    if (objResponse["status"] == "OK") {
                        var itemdata = objResponse["itemdata"];
                        gtag("event", "add_to_wishlist", {
                            currency: "JPY",
                            value: itemdata["price"],
                            items: [{
                                item_id: itemdata["item_id"],
                                item_name: itemdata["item_name"],
                                item_brand: itemdata["item_brand"],
                                item_category: itemdata["item_category"]
                            }]
                        })
                    }
                }
                break;
            default:
                location.href = strMyListURL;
                return
        }
    }
    return false
}
function addMyListCSS(objElem, strPid, strViewType, strMyListURL, strMyListNo) {
    var objDate = new Date;
    var strResponse = ajax.gets("/prog/ajaxhelper?action=addmylist&productid=" + strPid + "&viewtype=" + strViewType + "&r=" + objDate.getTime());
    var newvar;
    var addclass;
    switch (strResponse) {
        case "invalid_param":
            alert("正しいパラメータではありません");
            break;
        case "already_registed":
            newvar = "すでに登録されています";
            addclass = "buttonbig_alert";
            break;
        case "over_max_count":
            newvar = "登録数の上限に達しています";
            addclass = "buttonbig_alert";
            break;
        case "regist_success":
            newvar = "マイリストへ追加しました";
            addclass = "buttonbig_information";
            var strResponse = ajax.gets("/prog/ajaxhelper?action=contentsinfojs&pid=" + strPid);
            if (strResponse) {
                var objResponse = JSON.parse(strResponse);
                if (objResponse["status"] == "OK") {
                    var itemdata = objResponse["itemdata"];
                    gtag("event", "add_to_wishlist", {
                        currency: "JPY",
                        value: itemdata["price"],
                        items: [{
                            item_id: itemdata["item_id"],
                            item_name: itemdata["item_name"],
                            item_brand: itemdata["item_brand"],
                            item_category: itemdata["item_category"]
                        }]
                    })
                }
            }
            break;
        default:
            location.href = strMyListURL;
            return
    }
    objElem.onclick = function(e) {
        return true
    }
    ;
    objElem.href = "/mypage/mylist/";
    objElem.innerHTML = newvar;
    objElem.className = objElem.className + " " + addclass;
    return false
}
function addMyList(objElem, strPid, strViewType, strMyListURL, strMyListNo) {
    var obj = objElem.getElementsByTagName("img")[0];
    if (!obj) {
        return
    }
    var objDate = new Date;
    var strResponse = ajax.gets("/prog/ajaxhelper?action=addmylist&productid=" + strPid + "&viewtype=" + strViewType + "&r=" + objDate.getTime());
    var newimg;
    switch (strResponse) {
        case "invalid_param":
            alert("正しいパラメータではありません");
            break;
        case "already_registed":
            newimg = "/t/img/contents/mylist_exist.gif";
            break;
        case "over_max_count":
            newimg = "/t/img/contents/mylist_over.gif";
            break;
        case "regist_success":
            newimg = "/t/img/contents/mylist_add.gif";
            var strResponse = ajax.gets("/prog/ajaxhelper?action=contentsinfojs&pid=" + strPid);
            if (strResponse) {
                var objResponse = JSON.parse(strResponse);
                if (objResponse["status"] == "OK") {
                    var itemdata = objResponse["itemdata"];
                    gtag("event", "add_to_wishlist", {
                        currency: "JPY",
                        value: itemdata["price"],
                        items: [{
                            item_id: itemdata["item_id"],
                            item_name: itemdata["item_name"],
                            item_brand: itemdata["item_brand"],
                            item_category: itemdata["item_category"]
                        }]
                    })
                }
            }
            break;
        default:
            location.href = strMyListURL;
            return
    }
    objElem.onclick = function(e) {
        return true
    }
    ;
    objElem.href = "/mypage/mylist/";
    obj.src = newimg;
    return false
}
DugaProductHoverBox = function() {
    var intShowHoverBoxDeley = 500;
    var intHideHoverBoxDeley = 100;
    var intHoverBoxFadeInMsec = 0;
    var intHoverBoxFadeOutMsec = 0;
    var objProductHoverBoxContainer;
    var objProductHoverBoxContent;
    var objProductHoverArrowLeftBox;
    var objProductHoverArrowLeftImg;
    var objProductHoverArrowRightBox;
    var objProductHoverArrowRightImg;
    var strNextHoverPrroductID;
    var strLastHoverPrroductID;
    var intShowHoverBoxTimer;
    var intHideHoverBoxTimer;
    var intNextHoverBoxTimer;
    var objDugaFadeElement;
    var strHoverBoxContentHTML = new Array;
    function showProductHoverBox(objTargetBox) {
        var strProductID = objTargetBox.getAttribute("pid");
        var strProductType = objTargetBox.getAttribute("type");
        if (!strProductID || !strProductType) {
            return
        }
        strNextHoverPrroductID = strProductID;
        if (intShowHoverBoxTimer) {
            if (strLastHoverPrroductID == strProductID) {
                return
            }
            clearTimeout(intShowHoverBoxTimer);
            intShowHoverBoxTimer = 0
        }
        if (intHideHoverBoxTimer) {
            if (strLastHoverPrroductID == strProductID) {
                clearTimeout(intHideHoverBoxTimer);
                intHideHoverBoxTimer = 0
            } else {
                if (intNextHoverBoxTimer) {
                    clearTimeout(intNextHoverBoxTimer);
                    intNextHoverBoxTimer = 0
                }
                intNextHoverBoxTimer = setTimeout((function() {
                        showProductHoverBox(objTargetBox)
                    }
                ), 100);
                return
            }
        }
        var blnLoadData = false;
        if (strHoverBoxContentHTML[strProductID] == undefined) {
            blnLoadData = true
        } else {
            if (strHoverBoxContentHTML[strProductID][strProductType] == undefined) {
                blnLoadData = true
            }
        }
        if (blnLoadData) {
            var strUrl = "/prog/ajaxhelper?action=producthoverboxjs&pid=" + strProductID + "&type=" + strProductType + "&r=" + objPageLoadDate.getTime();
            if (document.URL.match(/[\?\&]test=([0-9]+)/)) {
                strUrl += "&test=1"
            }
            ajax.get(strUrl, (function(strResponse) {
                    var objResponse = JSON.parse(strResponse);
                    if (strHoverBoxContentHTML[strProductID] == undefined) {
                        strHoverBoxContentHTML[strProductID] = new Array
                    }
                    strHoverBoxContentHTML[strProductID][strProductType] = objResponse["html"]
                }
            ))
        }
        intShowHoverBoxTimer = setTimeout((function() {
                showProductHoverBoxSub(objTargetBox, strProductID, strProductType)
            }
        ), intShowHoverBoxDeley);
        strLastHoverPrroductID = strProductID
    }
    function showProductHoverBoxSub(objTargetBox, strProductID, strProductType) {
        var intShowHoverBoxSubTimer = setInterval((function() {
                if (strHoverBoxContentHTML[strProductID] == undefined) {
                    return
                }
                if (strHoverBoxContentHTML[strProductID][strProductType] == undefined) {
                    return
                }
                clearInterval(intShowHoverBoxSubTimer);
                objProductHoverBoxContent.innerHTML = strHoverBoxContentHTML[strProductID][strProductType];
                var objProductHoverBoxDiv = document.getElementById("hover-box");
                if (!objProductHoverBoxDiv) {
                    return
                }
                var strLabelType = objProductHoverBoxDiv.getAttribute("labeltype");
                var intAdultflag = objProductHoverBoxDiv.getAttribute("adult");
                setDisplayStyle("hover-box-title-" + (intAdultflag == 0 ? "digi" : strLabelType), "block");
                setDisplayStyle("hover-box-copyright-" + strLabelType, "block");
                setDisplayStyle("hover-box-summary-" + strLabelType, "block");
                setDisplayStyle("hover-box-samplelink-" + strLabelType, "block");
                setDisplayStyle("hover-box-pricebox-onsale-" + strLabelType, "block");
                setDisplayStyle("hover-box-pricebox-buyer-" + strLabelType, "block");
                setDisplayStyle("hover-box-downloadlink-" + strLabelType, "block");
                var strPPVSale = objProductHoverBoxDiv.getAttribute("ppvsale");
                var strWMDRMSale = objProductHoverBoxDiv.getAttribute("wmdrmsale");
                var strPPVHDSale = objProductHoverBoxDiv.getAttribute("ppvhdsale");
                var strWMDRMHDSale = objProductHoverBoxDiv.getAttribute("wmdrmhdsale");
                var strSalesVars = [];
                if (strWMDRMSale == "onsale") {
                    strSalesVars.push("レンタル")
                }
                if (strPPVSale == "onsale") {
                    strSalesVars.push("通常版")
                }
                if (strPPVHDSale == "onsale") {
                    strSalesVars.push("HD版")
                }
                if (document.getElementById("hover-box-salestype-ppv")) {
                    document.getElementById("hover-box-salestype-ppv").innerHTML = strSalesVars.join(" | ")
                }
                var strKeiyakuStatus = objProductHoverBoxDiv.getAttribute("keiyakustatus");
                if (strKeiyakuStatus == "onsale" || strLabelType == "soft") {
                    setDisplayStyle("hover-box-pricebox-onsale-block", "block");
                    setDisplayStyle("hover-box-samplelink-block", "block")
                } else if (strKeiyakuStatus == "buyer") {
                    setDisplayStyle("hover-box-pricebox-buyer-block", "block");
                    setDisplayStyle("hover-box-downloadlink-block", "block")
                }
                var blnMultiDevice = objProductHoverBoxDiv.getAttribute("multidevice");
                if (blnMultiDevice == "1") {
                    setDisplayStyle("hover-box-multidevice-ppv", "inline");
                    setDisplayStyle("hover-box-multidevice-month", "inline")
                }
                var intTotalSec = objProductHoverBoxDiv.getAttribute("totalsec");
                var intPlayHour = Math.floor(intTotalSec / 3600);
                var intPlayMin = Math.floor((intTotalSec - intPlayHour * 3600) / 60);
                var intPlaySec = intTotalSec - intPlayHour * 3600 - intPlayMin * 60;
                var strPlayVars = (intPlayHour > 0 ? intPlayHour + "時間" : "") + (intPlayMin > 0 ? intPlayMin + "分" : "");
                if (document.getElementById("hover-box-playtime-ppv")) {
                    document.getElementById("hover-box-playtime-ppv").innerHTML = strPlayVars
                }
                if (document.getElementById("hover-box-playtime-month")) {
                    document.getElementById("hover-box-playtime-month").innerHTML = strPlayVars
                }
                initMoviePlayerLink();
                adjustAddMylistLink();
                setProductHoverBoxPos(objTargetBox);
                objProductHoverBoxContainer.style.visibility = "visible";
                objDugaFadeElement.fadein(100 / (intHoverBoxFadeInMsec / 20), 100, 20)
            }
        ), 10)
    }
    function setProductHoverBoxPos(objTargetBox) {
        var objImagePos = getElementPosition(objTargetBox);
        var objClientSize = getBlowserClientSize();
        var intScrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var intScrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var intBoxTopPos = objImagePos.y + objTargetBox.offsetHeight / 2 - objProductHoverBoxContainer.offsetHeight / 2;
        if (intScrollY + objClientSize.height < intBoxTopPos + objProductHoverBoxContainer.offsetHeight) {
            intBoxTopPos = intScrollY + objClientSize.height - objProductHoverBoxContainer.offsetHeight
        }
        if (intBoxTopPos + objProductHoverBoxContainer.offsetHeight < objImagePos.y + 60) {
            intBoxTopPos = objImagePos.y - objProductHoverBoxContainer.offsetHeight + 60
        }
        if (intBoxTopPos < intScrollY) {
            intBoxTopPos = intScrollY
        }
        if (objImagePos.y + objTargetBox.offsetHeight - 60 < intBoxTopPos) {
            intBoxTopPos = objImagePos.y + objTargetBox.offsetHeight - 60
        }
        objProductHoverBoxContainer.style.top = intBoxTopPos + "px";
        var intArrowTopPos = objImagePos.y + objTargetBox.offsetHeight / 2 - intBoxTopPos;
        if (intArrowTopPos < 30) {
            intArrowTopPos = 30
        }
        if (objProductHoverBoxContainer.offsetHeight - 30 < intArrowTopPos) {
            intArrowTopPos = objProductHoverBoxContainer.offsetHeight - 30
        }
        objProductHoverArrowLeftImg.style.top = intArrowTopPos + "px";
        objProductHoverArrowRightImg.style.top = intArrowTopPos + "px";
        var objListBox = objTargetBox.parentElement.parentElement;
        var scrollDiffX = 0;
        if (objListBox.parentElement.parentElement.className == "liquidwrapper") {
            scrollDiffX = objListBox.parentElement.parentElement.scrollLeft
        }
        objProductHoverArrowRightBox.style.visibility = "visible";
        objProductHoverArrowLeftBox.style.visibility = "hidden";
        objProductHoverBoxContent.style.margin = "0px 23px 0px 0px";
        var intBoxLeftPos = objImagePos.x - objListBox.scrollLeft - scrollDiffX - objProductHoverBoxContainer.offsetWidth + 4;
        if (intBoxLeftPos < intScrollX) {
            intBoxLeftPos = objImagePos.x - objListBox.scrollLeft - scrollDiffX + objTargetBox.offsetWidth - (4 + 0);
            objProductHoverArrowLeftBox.style.visibility = "visible";
            objProductHoverArrowRightBox.style.visibility = "hidden";
            objProductHoverBoxContent.style.margin = "0px 0px 0px 23px"
        }
        objProductHoverBoxContainer.style.left = intBoxLeftPos + "px"
    }
    function hideProductHoverBox() {
        if (intShowHoverBoxTimer) {
            clearTimeout(intShowHoverBoxTimer);
            intShowHoverBoxTimer = 0
        }
        if (intNextHoverBoxTimer) {
            clearTimeout(intNextHoverBoxTimer);
            intNextHoverBoxTimer = 0
        }
        if (!intHideHoverBoxTimer) {
            intHideHoverBoxTimer = setTimeout((function() {
                    hideProductHoverBoxSub()
                }
            ), intHideHoverBoxDeley)
        }
    }
    function hideProductHoverBoxSub() {
        objDugaFadeElement.fadeout(100 / (intHoverBoxFadeOutMsec / 20), 0, 20, (function() {
                objProductHoverArrowRightBox.style.visibility = "hidden";
                objProductHoverArrowLeftBox.style.visibility = "hidden";
                objProductHoverBoxContainer.style.top = "0px";
                objProductHoverBoxContainer.style.left = "0px";
                objProductHoverBoxContainer.style.visibility = "hidden";
                intHideHoverBoxTimer = 0
            }
        ))
    }
    this.init = function() {
        objProductHoverBoxContainer = document.createElement("div");
        objProductHoverBoxContainer.id = "hover-box-container";
        objProductHoverBoxContainer.style.position = "absolute";
        objProductHoverBoxContainer.style.top = "0px";
        objProductHoverBoxContainer.style.visibility = "hidden";
        objProductHoverBoxContainer.onmouseover = function() {
            if (intHideHoverBoxTimer) {
                clearTimeout(intHideHoverBoxTimer);
                intHideHoverBoxTimer = 0
            }
        }
        ;
        objProductHoverBoxContainer.onmouseout = function() {
            hideProductHoverBox()
        }
        ;
        addEventHandler(window, "scroll", (function() {
                hideProductHoverBox()
            }
        ));
        objProductHoverBoxContent = document.createElement("div");
        objProductHoverBoxContainer.appendChild(objProductHoverBoxContent);
        objProductHoverArrowLeftBox = document.createElement("div");
        objProductHoverArrowLeftBox.className = "arrow-left-box";
        objProductHoverArrowLeftBox.style.visibility = "hidden";
        objProductHoverArrowLeftImg = document.createElement("div");
        objProductHoverArrowLeftImg.className = "arrow-left";
        objProductHoverArrowLeftBox.appendChild(objProductHoverArrowLeftImg);
        objProductHoverBoxContainer.appendChild(objProductHoverArrowLeftBox);
        objProductHoverArrowRightBox = document.createElement("div");
        objProductHoverArrowRightBox.className = "arrow-right-box";
        objProductHoverArrowRightBox.style.visibility = "hidden";
        objProductHoverArrowRightImg = document.createElement("div");
        objProductHoverArrowRightImg.className = "arrow-right";
        objProductHoverArrowRightBox.appendChild(objProductHoverArrowRightImg);
        objProductHoverBoxContainer.appendChild(objProductHoverArrowRightBox);
        document.body.appendChild(objProductHoverBoxContainer);
        objDugaFadeElement = new DugaFadeElement(objProductHoverBoxContainer,0)
    }
    ;
    this.setMouseEvent = function(targetNode) {
        var objProductHoverBoxList = getElementsByClassName("producthoverbox", targetNode);
        if (!objProductHoverBoxList.length) {
            return
        }
        for (var i = 0; i < objProductHoverBoxList.length; i++) {
            (function() {
                    objProductHoverBoxList[i].onmouseover = function() {
                        showProductHoverBox(this)
                    }
                    ;
                    objProductHoverBoxList[i].onmouseout = function() {
                        hideProductHoverBox()
                    }
                }
            )()
        }
    }
    ;
    this.clearContentsCache = function(strProductID) {
        strHoverBoxContentHTML[strProductID] = null
    }
}
;
function initProductHoverBox() {
    if (ClientDeviceType != "pc") {
        return
    }
    objDugaProductHoverBox.init();
    objDugaProductHoverBox.setMouseEvent()
}
addDOMContentLoadedEvent(initProductHoverBox);
var objDugaProductHoverBox = new DugaProductHoverBox;
function GetFlashObject() {
    var swfobject = function() {
        var D = "undefined", r = "object", S = "Shockwave Flash", W = "ShockwaveFlash.ShockwaveFlash", q = "application/x-shockwave-flash", R = "SWFObjectExprInst", x = "onreadystatechange", O = window, j = document, t = navigator, T = false, U = [h], o = [], N = [], I = [], l, Q, E, B, J = false, a = false, n, G, m = true, M = function() {
            var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D
                , ah = t.userAgent.toLowerCase()
                , Y = t.platform.toLowerCase()
                , ae = Y ? /win/.test(Y) : /win/.test(ah)
                , ac = Y ? /mac/.test(Y) : /mac/.test(ah)
                , af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false
                , X = !+"\v1"
                , ag = [0, 0, 0]
                , ab = null;
            if (typeof t.plugins != D && typeof t.plugins[S] == r) {
                ab = t.plugins[S].description;
                if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                    T = true;
                    X = false;
                    ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                    ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else {
                if (typeof O.ActiveXObject != D) {
                    try {
                        var ad = new ActiveXObject(W);
                        if (ad) {
                            ab = ad.GetVariable("$version");
                            if (ab) {
                                X = true;
                                ab = ab.split(" ")[1].split(",");
                                ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                            }
                        }
                    } catch (Z) {}
                }
            }
            return {
                w3: aa,
                pv: ag,
                wk: af,
                ie: X,
                win: ae,
                mac: ac
            }
        }(), k = function() {
            if (!M.w3) {
                return
            }
            if (typeof j.readyState != D && j.readyState == "complete" || typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body)) {
                f()
            }
            if (!J) {
                if (typeof j.addEventListener != D) {
                    j.addEventListener("DOMContentLoaded", f, false)
                }
                if (M.ie && M.win) {
                    j.attachEvent(x, (function() {
                            if (j.readyState == "complete") {
                                j.detachEvent(x, arguments.callee);
                                f()
                            }
                        }
                    ));
                    if (O == top) {
                        (function() {
                                if (J) {
                                    return
                                }
                                try {
                                    j.documentElement.doScroll("left")
                                } catch (X) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                f()
                            }
                        )()
                    }
                }
                if (M.wk) {
                    (function() {
                            if (J) {
                                return
                            }
                            if (!/loaded|complete/.test(j.readyState)) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            f()
                        }
                    )()
                }
                s(f)
            }
        }();
        function f() {
            if (J) {
                return
            }
            try {
                var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
                Z.parentNode.removeChild(Z)
            } catch (aa) {
                return
            }
            J = true;
            var X = U.length;
            for (var Y = 0; Y < X; Y++) {
                U[Y]()
            }
        }
        function K(X) {
            if (J) {
                X()
            } else {
                U[U.length] = X
            }
        }
        function s(Y) {
            if (typeof O.addEventListener != D) {
                O.addEventListener("load", Y, false)
            } else {
                if (typeof j.addEventListener != D) {
                    j.addEventListener("load", Y, false)
                } else {
                    if (typeof O.attachEvent != D) {
                        i(O, "onload", Y)
                    } else {
                        if (typeof O.onload == "function") {
                            var X = O.onload;
                            O.onload = function() {
                                X();
                                Y()
                            }
                        } else {
                            O.onload = Y
                        }
                    }
                }
            }
        }
        function h() {
            if (T) {
                V()
            } else {
                H()
            }
        }
        function V() {
            var X = j.getElementsByTagName("body")[0];
            var aa = C(r);
            aa.setAttribute("type", q);
            var Z = X.appendChild(aa);
            if (Z) {
                var Y = 0;
                (function() {
                        if (typeof Z.GetVariable != D) {
                            var ab = Z.GetVariable("$version");
                            if (ab) {
                                ab = ab.split(" ")[1].split(",");
                                M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                            }
                        } else {
                            if (Y < 10) {
                                Y++;
                                setTimeout(arguments.callee, 10);
                                return
                            }
                        }
                        X.removeChild(aa);
                        Z = null;
                        H()
                    }
                )()
            } else {
                H()
            }
        }
        function H() {
            var ag = o.length;
            if (ag > 0) {
                for (var af = 0; af < ag; af++) {
                    var Y = o[af].id;
                    var ab = o[af].callbackFn;
                    var aa = {
                        success: false,
                        id: Y
                    };
                    if (M.pv[0] > 0) {
                        var ae = c(Y);
                        if (ae) {
                            if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                                w(Y, true);
                                if (ab) {
                                    aa.success = true;
                                    aa.ref = z(Y);
                                    ab(aa)
                                }
                            } else {
                                if (o[af].expressInstall && A()) {
                                    var ai = {};
                                    ai.data = o[af].expressInstall;
                                    ai.width = ae.getAttribute("width") || "0";
                                    ai.height = ae.getAttribute("height") || "0";
                                    if (ae.getAttribute("class")) {
                                        ai.styleclass = ae.getAttribute("class")
                                    }
                                    if (ae.getAttribute("align")) {
                                        ai.align = ae.getAttribute("align")
                                    }
                                    var ah = {};
                                    var X = ae.getElementsByTagName("param");
                                    var ac = X.length;
                                    for (var ad = 0; ad < ac; ad++) {
                                        if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                            ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                        }
                                    }
                                    P(ai, ah, Y, ab)
                                } else {
                                    p(ae);
                                    if (ab) {
                                        ab(aa)
                                    }
                                }
                            }
                        }
                    } else {
                        w(Y, true);
                        if (ab) {
                            var Z = z(Y);
                            if (Z && typeof Z.SetVariable != D) {
                                aa.success = true;
                                aa.ref = Z
                            }
                            ab(aa)
                        }
                    }
                }
            }
        }
        function z(aa) {
            var X = null;
            var Y = c(aa);
            if (Y && Y.nodeName == "OBJECT") {
                if (typeof Y.SetVariable != D) {
                    X = Y
                } else {
                    var Z = Y.getElementsByTagName(r)[0];
                    if (Z) {
                        X = Z
                    }
                }
            }
            return X
        }
        function A() {
            return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
        }
        function P(aa, ab, X, Z) {
            a = true;
            E = Z || null;
            B = {
                success: false,
                id: X
            };
            var ae = c(X);
            if (ae) {
                if (ae.nodeName == "OBJECT") {
                    l = g(ae);
                    Q = null
                } else {
                    l = ae;
                    Q = X
                }
                aa.id = R;
                if (typeof aa.width == D || !/%$/.test(aa.width) && parseInt(aa.width, 10) < 310) {
                    aa.width = "310"
                }
                if (typeof aa.height == D || !/%$/.test(aa.height) && parseInt(aa.height, 10) < 137) {
                    aa.height = "137"
                }
                j.title = j.title.slice(0, 47) + " - Flash Player Installation";
                var ad = M.ie && M.win ? "ActiveX" : "PlugIn"
                    , ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
                if (typeof ab.flashvars != D) {
                    ab.flashvars += "&" + ac
                } else {
                    ab.flashvars = ac
                }
                if (M.ie && M.win && ae.readyState != 4) {
                    var Y = C("div");
                    X += "SWFObjectNew";
                    Y.setAttribute("id", X);
                    ae.parentNode.insertBefore(Y, ae);
                    ae.style.display = "none";
                    (function() {
                            if (ae.readyState == 4) {
                                ae.parentNode.removeChild(ae)
                            } else {
                                setTimeout(arguments.callee, 10)
                            }
                        }
                    )()
                }
                u(aa, ab, X)
            }
        }
        function p(Y) {
            if (M.ie && M.win && Y.readyState != 4) {
                var X = C("div");
                Y.parentNode.insertBefore(X, Y);
                X.parentNode.replaceChild(g(Y), X);
                Y.style.display = "none";
                (function() {
                        if (Y.readyState == 4) {
                            Y.parentNode.removeChild(Y)
                        } else {
                            setTimeout(arguments.callee, 10)
                        }
                    }
                )()
            } else {
                Y.parentNode.replaceChild(g(Y), Y)
            }
        }
        function g(ab) {
            var aa = C("div");
            if (M.win && M.ie) {
                aa.innerHTML = ab.innerHTML
            } else {
                var Y = ab.getElementsByTagName(r)[0];
                if (Y) {
                    var ad = Y.childNodes;
                    if (ad) {
                        var X = ad.length;
                        for (var Z = 0; Z < X; Z++) {
                            if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                                aa.appendChild(ad[Z].cloneNode(true))
                            }
                        }
                    }
                }
            }
            return aa
        }
        function u(ai, ag, Y) {
            var X, aa = c(Y);
            if (M.wk && M.wk < 312) {
                return X
            }
            if (aa) {
                if (typeof ai.id == D) {
                    ai.id = Y
                }
                if (M.ie && M.win) {
                    var ah = "";
                    for (var ae in ai) {
                        if (ai[ae] != Object.prototype[ae]) {
                            if (ae.toLowerCase() == "data") {
                                ag.movie = ai[ae]
                            } else {
                                if (ae.toLowerCase() == "styleclass") {
                                    ah += ' class="' + ai[ae] + '"'
                                } else {
                                    if (ae.toLowerCase() != "classid") {
                                        ah += " " + ae + '="' + ai[ae] + '"'
                                    }
                                }
                            }
                        }
                    }
                    var af = "";
                    for (var ad in ag) {
                        if (ag[ad] != Object.prototype[ad]) {
                            af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                        }
                    }
                    aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                    N[N.length] = ai.id;
                    X = c(ai.id)
                } else {
                    var Z = C(r);
                    Z.setAttribute("type", q);
                    for (var ac in ai) {
                        if (ai[ac] != Object.prototype[ac]) {
                            if (ac.toLowerCase() == "styleclass") {
                                Z.setAttribute("class", ai[ac])
                            } else {
                                if (ac.toLowerCase() != "classid") {
                                    Z.setAttribute(ac, ai[ac])
                                }
                            }
                        }
                    }
                    for (var ab in ag) {
                        if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                            e(Z, ab, ag[ab])
                        }
                    }
                    aa.parentNode.replaceChild(Z, aa);
                    X = Z
                }
            }
            return X
        }
        function e(Z, X, Y) {
            var aa = C("param");
            aa.setAttribute("name", X);
            aa.setAttribute("value", Y);
            Z.appendChild(aa)
        }
        function y(Y) {
            var X = c(Y);
            if (X && X.nodeName == "OBJECT") {
                if (M.ie && M.win) {
                    X.style.display = "none";
                    (function() {
                            if (X.readyState == 4) {
                                b(Y)
                            } else {
                                setTimeout(arguments.callee, 10)
                            }
                        }
                    )()
                } else {
                    X.parentNode.removeChild(X)
                }
            }
        }
        function b(Z) {
            var Y = c(Z);
            if (Y) {
                for (var X in Y) {
                    if (typeof Y[X] == "function") {
                        Y[X] = null
                    }
                }
                Y.parentNode.removeChild(Y)
            }
        }
        function c(Z) {
            var X = null;
            try {
                X = j.getElementById(Z)
            } catch (Y) {}
            return X
        }
        function C(X) {
            return j.createElement(X)
        }
        function i(Z, X, Y) {
            Z.attachEvent(X, Y);
            I[I.length] = [Z, X, Y]
        }
        function F(Z) {
            var Y = M.pv
                , X = Z.split(".");
            X[0] = parseInt(X[0], 10);
            X[1] = parseInt(X[1], 10) || 0;
            X[2] = parseInt(X[2], 10) || 0;
            return Y[0] > X[0] || Y[0] == X[0] && Y[1] > X[1] || Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2] ? true : false
        }
        function v(ac, Y, ad, ab) {
            if (M.ie && M.mac) {
                return
            }
            var aa = j.getElementsByTagName("head")[0];
            if (!aa) {
                return
            }
            var X = ad && typeof ad == "string" ? ad : "screen";
            if (ab) {
                n = null;
                G = null
            }
            if (!n || G != X) {
                var Z = C("style");
                Z.setAttribute("type", "text/css");
                Z.setAttribute("media", X);
                n = aa.appendChild(Z);
                if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                    n = j.styleSheets[j.styleSheets.length - 1]
                }
                G = X
            }
            if (M.ie && M.win) {
                if (n && typeof n.addRule == r) {
                    n.addRule(ac, Y)
                }
            } else {
                if (n && typeof j.createTextNode != D) {
                    n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
                }
            }
        }
        function w(Z, X) {
            if (!m) {
                return
            }
            var Y = X ? "visible" : "hidden";
            if (J && c(Z)) {
                c(Z).style.visibility = Y
            } else {
                v("#" + Z, "visibility:" + Y)
            }
        }
        function L(Y) {
            var Z = /[\\\"<>\.;]/;
            var X = Z.exec(Y) != null;
            return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
        }
        var d = function() {
            if (M.ie && M.win) {
                window.attachEvent("onunload", (function() {
                        var ac = I.length;
                        for (var ab = 0; ab < ac; ab++) {
                            I[ab][0].detachEvent(I[ab][1], I[ab][2])
                        }
                        var Z = N.length;
                        for (var aa = 0; aa < Z; aa++) {
                            y(N[aa])
                        }
                        for (var Y in M) {
                            M[Y] = null
                        }
                        M = null;
                        for (var X in swfobject) {
                            swfobject[X] = null
                        }
                        swfobject = null
                    }
                ))
            }
        }();
        return {
            registerObject: function(ab, X, aa, Z) {
                if (M.w3 && ab && X) {
                    var Y = {};
                    Y.id = ab;
                    Y.swfVersion = X;
                    Y.expressInstall = aa;
                    Y.callbackFn = Z;
                    o[o.length] = Y;
                    w(ab, false)
                } else {
                    if (Z) {
                        Z({
                            success: false,
                            id: ab
                        })
                    }
                }
            },
            getObjectById: function(X) {
                if (M.w3) {
                    return z(X)
                }
            },
            embedSWF: function(ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
                var X = {
                    success: false,
                    id: ah
                };
                if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                    w(ah, false);
                    K((function() {
                            ae += "";
                            ag += "";
                            var aj = {};
                            if (af && typeof af === r) {
                                for (var al in af) {
                                    aj[al] = af[al]
                                }
                            }
                            aj.data = ab;
                            aj.width = ae;
                            aj.height = ag;
                            var am = {};
                            if (ad && typeof ad === r) {
                                for (var ak in ad) {
                                    am[ak] = ad[ak]
                                }
                            }
                            if (Z && typeof Z === r) {
                                for (var ai in Z) {
                                    if (typeof am.flashvars != D) {
                                        am.flashvars += "&" + ai + "=" + Z[ai]
                                    } else {
                                        am.flashvars = ai + "=" + Z[ai]
                                    }
                                }
                            }
                            if (F(Y)) {
                                var an = u(aj, am, ah);
                                if (aj.id == ah) {
                                    w(ah, true)
                                }
                                X.success = true;
                                X.ref = an
                            } else {
                                if (aa && A()) {
                                    aj.data = aa;
                                    P(aj, am, ah, ac);
                                    return
                                } else {
                                    w(ah, true)
                                }
                            }
                            if (ac) {
                                ac(X)
                            }
                        }
                    ))
                } else {
                    if (ac) {
                        ac(X)
                    }
                }
            },
            switchOffAutoHideShow: function() {
                m = false
            },
            ua: M,
            getFlashPlayerVersion: function() {
                return {
                    major: M.pv[0],
                    minor: M.pv[1],
                    release: M.pv[2]
                }
            },
            hasFlashPlayerVersion: F,
            createSWF: function(Z, Y, X) {
                if (M.w3) {
                    return u(Z, Y, X)
                } else {
                    return undefined
                }
            },
            showExpressInstall: function(Z, aa, X, Y) {
                if (M.w3 && A()) {
                    P(Z, aa, X, Y)
                }
            },
            removeSWF: function(X) {
                if (M.w3) {
                    y(X)
                }
            },
            createCSS: function(aa, Z, Y, X) {
                if (M.w3) {
                    v(aa, Z, Y, X)
                }
            },
            addDomLoadEvent: K,
            addLoadEvent: s,
            getQueryParamValue: function(aa) {
                var Z = j.location.search || j.location.hash;
                if (Z) {
                    if (/\?/.test(Z)) {
                        Z = Z.split("?")[1]
                    }
                    if (aa == null) {
                        return L(Z)
                    }
                    var Y = Z.split("&");
                    for (var X = 0; X < Y.length; X++) {
                        if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                            return L(Y[X].substring(Y[X].indexOf("=") + 1))
                        }
                    }
                }
                return ""
            },
            expressInstallCallback: function() {
                if (a) {
                    var X = c(R);
                    if (X && l) {
                        X.parentNode.replaceChild(l, X);
                        if (Q) {
                            w(Q, true);
                            if (M.ie && M.win) {
                                l.style.display = "block"
                            }
                        }
                        if (E) {
                            E(B)
                        }
                    }
                    a = false
                }
            }
        }
    }();
    return swfobject
}
function GetSwfObject(objTarget, strSwfPath, strName, intWidth, intHeight, objSwfParams, objFlashVars) {
    var objGetFlashObject = GetFlashObject();
    var playerVersion = objGetFlashObject.getFlashPlayerVersion();
    if (!playerVersion.major) {
        return
    }
    if (objFlashVars != undefined) {
        var objTempVars = new Array;
        for (i in objFlashVars) {
            objTempVars.push(i + "=" + escape(objFlashVars[i]))
        }
        objSwfParams["FlashVars"] = objTempVars.join("&")
    }
    objSwfParams["wmode"] = "transparent";
    objSwfParams["quality"] = "high";
    var objParamTemp = new Array;
    var objEmbedTemp = new Array;
    for (i in objSwfParams) {
        objParamTemp.push('<param name="' + i + '" value="' + objSwfParams[i] + '" />');
        objEmbedTemp.push(i + '="' + objSwfParams[i] + '"')
    }
    var htmltag = "";
    htmltag += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" id="' + strName + '" width="' + intWidth + '" height="' + intHeight + '" align="middle">';
    htmltag += '<param name="allowScriptAccess" value="always" />';
    htmltag += '<param name="movie" value="' + strSwfPath + '" />';
    if (objParamTemp) {
        htmltag += objParamTemp.join("\n") + "\n"
    }
    htmltag += '<embed src="' + strSwfPath + '" name="' + strName + '" width="' + intWidth + '" height="' + intHeight + '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" ';
    if (objEmbedTemp) {
        htmltag += objEmbedTemp.join(" ")
    }
    htmltag += "/>";
    htmltag += "</object>";
    return htmltag
}
function initFlashSwfObject() {
    var objTargetTags = getElementsByClassName("flashswfobject");
    for (var i = 0; i < objTargetTags.length; i++) {
        var strSrc = objTargetTags[i].getAttribute("src");
        var intWidth = objTargetTags[i].getAttribute("width");
        var intHeight = objTargetTags[i].getAttribute("height");
        var strSwfParams = objTargetTags[i].getAttribute("swfparams");
        var strFlashVars = objTargetTags[i].getAttribute("flashvars");
        objSwfParams = new Array;
        objFlashVars = new Array;
        if (strSwfParams) {
            objSwfParams = JSON.parse(strSwfParams)
        }
        if (strFlashVars) {
            objFlashVars = JSON.parse(strFlashVars)
        }
        objTarget.innerHTML = GetSwfObject(objTargetTags[i], strSrc, "flashswfobject", intWidth, intHeight, objSwfParams, objFlashVars)
    }
}
addDOMContentLoadedEvent(initFlashSwfObject);
function addEventHandler(element, eventName, func) {
    if (element.addEventListener) {
        element.addEventListener(eventName, func, false)
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, func)
    }
}
function getClientCareer() {
    return ClientCareer
}
function getQueryString() {
    var url = window.location.href;
    var param = {};
    var tmplist = url.split("?");
    if (tmplist.length > 1) {
        qstring = tmplist[1];
        tmplist = qstring.split("&");
        for (var i = 0; i < tmplist.length; i++) {
            var tmp = tmplist[i].split("=");
            param[tmp[0]] = tmp[1]
        }
    }
    return param
}
/*! echo.js v1.6.0 | (c) 2014 @toddmotto | https://github.com/toddmotto/echo */
