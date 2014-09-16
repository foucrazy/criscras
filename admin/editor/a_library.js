//eval
a_dBg2 = (location.search.indexOf("&debug2") > 0);
a_isIE = (navigator.userAgent.toLowerCase().indexOf('msie') > 0)
		&& (navigator.userAgent.toLowerCase().indexOf('opera') < 0);
a_isWK = (navigator.userAgent.indexOf("AppleWebKit") > 0);
a_popupObj = null;
function a_addListener(a, b, c) {
	if (!a || !b || !c)
		return;
	if (a.addEventListener) {
		a.addEventListener(b, c, false)
	} else if (a.attachEvent) {
		a.attachEvent("on" + b, c)
	}
}
function a_getTarget(e) {
	var e = e || window.event;
	return e ? e.target || e.srcElement : null
}
function a_getPoint(a) {
	if (!a)
		return;
	var x = a.offsetLeft;
	var y = a.offsetTop;
	var b = a.offsetParent;
	if (b) {
		var c = a_getPoint(b);
		x += c.x;
		y += c.y
	}
	return {
		x : x,
		y : y
	}
}
function a_getObI(a) {
	return document.getElementById(a)
}
function a_hasClass(a, b) {
	if (!a)
		return;
	if ((b == "" && a.className == "") || b == null)
		return a;
	var c = " " + a.className + " ";
	if (c.indexOf(" " + b + " ") >= 0)
		return a
}
function a_addClass(a, b, c) {
	if (!a || !b)
		return;
	if (c == null)
		c = true;
	if (c) {
		if (!a_hasClass(a, b))
			a.className += " " + b
	} else {
		a.className = a.className.replace(new RegExp("\\b" + b + "\\b"), "")
	}
}
function a_getAbT(a, b, c) {
	if (!a)
		return;
	a = a.parentNode;
	if (!a)
		return;
	if (a.nodeType == 1 && a.tagName.toLowerCase() == b.toLowerCase()) {
		if (a_hasClass(a, c))
			return a
	}
	return a_getAbT(a, b, c)
}
function a_getDbT(a, b, c) {
	if (a == null)
		return;
	var d = a.getElementsByTagName(b.toLowerCase());
	for ( var i = 0, a; a = d[i]; i++) {
		if (a_hasClass(a, c))
			return a
	}
}
function a_getArrayDbT(a, b, c) {
	if (!a)
		a = document;
	var d = (!b && a.all) ? a.all : a.getElementsByTagName(b.toLowerCase());
	var e = [];
	if (!d.length)
		return e;
	for ( var i = 0, obj; obj = d[i]; i++) {
		if (!c)
			e.push(obj);
		else if (a_hasClass(obj, c))
			e.push(obj)
	}
	return e
}
a_getElements = a_getArrayDbT;
function a_getSibling(a, b, c) {
	if (!a)
		return;
	if (!b)
		b = "next";
	b = b.toLowerCase();
	if (b != "previous" && b != "next")
		return;
	if (!c) {
		c = a.tagName;
		if (!c)
			return;
		c = c.toLowerCase()
	}
	var d = (b == "next") ? a.nextSibling : a.previousSibling;
	if (d) {
		if (d.tagName) {
			if (d.tagName.toLowerCase() == c)
				return d
		}
		return a_getSibling(d, b, c)
	}
}
function a_insertBefore(a, b, c) {
	if (c)
		a.insertBefore(b, c);
	else
		a.appendChild(b)
}
function a_trim(a) {
	return a ? a.replace(/^\s*|\s*$/g, "") : ""
}
function a_stripHTML(a) {
	return a.replace(/<\S[^><]*>/g, "")
}
function a_getText(a) {
	if (!a)
		return;
	if (!a.firstChild)
		return;
	return a.firstChild.nodeValue
}
function a_setOpacity(a, b) {
	b = (b >= 100) ? 99.999 : b;
	a.style.filter = "alpha(opacity:" + b + ")";
	a.style.KHTMLOpacity = b / 100;
	a.style.MozOpacity = b / 100;
	a.style.opacity = b / 100
}
function a_display(a, b) {
	if (!a)
		return;
	if (b == null)
		b = true;
	a.style.display = b ? "" : "none"
}
function a_displayed(a) {
	if (!a)
		return;
	return a.style.display != "none"
}
function a_visibility(a, b) {
	if (!a)
		return;
	if (b == null)
		b = true;
	a.style.visibility = b ? "visible" : "hidden"
}
function a_visible(a) {
	if (!a)
		return;
	return a.style.visibility != "hidden"
}
function a_enableInput(a, b) {
	if (!a)
		return;
	if (b == null)
		b = true;
	a.disabled = !b;
	a_addClass(a, "disabled", !b)
}
function a_newWindow(a, b, c, d) {
	if (a.indexOf("http") != 0)
		a = "http://" + a;
	a = a.replace("http%3A%2F%2F", "http://");
	var e;
	if (!c)
		e = window.open(a, b);
	else
		e = window.open(a, b, c);
	if (d) {
		e.document.open();
		e.document.write(d);
		e.document.close()
	}
	e.focus();
	return false
}
function a_JSONparse(a) {
	try {
		if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/
				.test(str)) {
			var j = eval('(' + str + ')');
			return j
		}
	} catch (e) {
	}
}
function a_decompose(b, c) {
	if (typeof (b) != "object")
		return "Not an Object";
	if (!c)
		c = 0;
	var d = "";
	var e;
	for ( var i in b) {
		if (typeof (b[i]) == "object")
			d += pad(c) + i + "|object:\n" + a_decompose(b[i], c + 1);
		else
			d += pad(c) + i + "|" + typeof (b[i]) + ": " + b[i] + " \n"
	}
	return d;
	function pad(a) {
		e = "";
		while (a > 0) {
			e += " ";
			a--
		}
		return e
	}
}
function a_createXHRObject() {
	var a;
	try {
		a = new ActiveXObject("Msxml2.XMLHTTP")
	} catch (e) {
		try {
			a = new ActiveXObject("Microsoft.XMLHTTP")
		} catch (e) {
			try {
				a = new XMLHttpRequest()
			} catch (e) {
				a = false
			}
		}
	}
	return a
}
function a_openXHRObject(a, b, c, d, e, f, g, h) {
	a.open(b, c, d);
	if (f && g)
		a.setRequestHeader(f, g);
	if (e)
		a.onreadystatechange = e;
	a.send(h)
}
function a_xhrText(a) {
	if (!a)
		return "NA";
	return a.responseText != null ? a.responseText : "Error: " + a.status
}
function cookie_get(a) {
	if (!a)
		return;
	var b = document.cookie.indexOf(a + "=");
	var c = b + a.length + 1;
	if ((!b) && (a != document.cookie.substring(0, a.length)))
		return null;
	if (b == -1)
		return null;
	var d = document.cookie.indexOf(";", c);
	if (d == -1)
		d = document.cookie.length;
	return unescape(document.cookie.substring(c, d))
}
function cookie_set(a, b, c, d, e, f) {
	if (!a)
		return;
	if (b)
		document.cookie = a + "=" + escape(b)
				+ ((c) ? ";expires=" + c.toGMTString() : "")
				+ ((d) ? ";path=" + d : "") + ((e) ? ";domain=" + e : "")
				+ ((f) ? ";secure" : "");
	else
		cookie_delete(a, d, e)
}
function cookie_delete(a, b, c) {
	if (!a)
		return;
	if (cookie_get(a))
		document.cookie = a + "=" + ((b) ? ";path=" + b : "")
				+ ((c) ? ";domain=" + c : "")
				+ ";expires=Thu, 01-Jan-1970 00:00:01 GMT"
}
function a_expireDays(d) {
	var a = new Date();
	a.setTime(a.getTime() + 86400000 * d);
	return a
}
function a_popupFill(a, b) {
	if (!a || !b)
		return;
	if (!a_popupObj) {
		a_popupObj = document.createElement("div");
		a_popupObj.style.zIndex = 1000;
		a_display(a_popupObj, false);
		a_popupObj.id = "popupDIV";
		document.body.appendChild(a_popupObj)
	} else {
		if (a_displayed(a_popupObj) && a_popupObj.url == b.urlStr) {
			a_popupClose();
			return
		}
	}
	if (!b)
		b = {};
	a_popupObj.url = b.urlStr;
	var c = a_getPoint(a);
	a_popupObj.style.left = c.x - 1 + "px";
	a_popupObj.style.top = c.y + a.offsetHeight + 1 + "px";
	if (b.h)
		a_popupObj.style.height = b.h;
	var w = b.w;
	if (!w || w > 640)
		w = 640;
	a_popupObj.style.width = w + "px";
	if (b.urlStr) {
		a_xhrFill(a_popupObj, b.urlStr, popupFillHandler)
	} else if (b.htmlStr) {
		a_fill(a_popupObj, b.htmlStr);
		popupFillHandler()
	}
	function popupFillHandler() {
		a_fill(a_popupObj, a_popupObj.innerHTML);
		var a = a_getDbT(a_popupObj, "img", "closeButton");
		if (!a) {
			a = document.createElement("img");
			a.src = "img/g_s_close2.gif";
			a_addClass(a, "pseudoA closeButton");
			a_addListener(a, "click", a_popupClose);
			a.title = "close";
			a_insertBefore(a_popupObj, a, a_popupObj.firstChild)
		}
		a_display(a_popupObj)
	}
}
function a_popupClose() {
	a_display(a_popupObj, false);
	a_popupObj.url = "";
	a_fill(a_popupObj, "")
}
function a_fill(a, b, c) {
	if (a)
		a.innerHTML = c ? a.innerHTML + b + " " : b
}
function a_xhrFill(a, b, c, d) {
	if (!a || !b)
		return;
	var f = a.innerHTML;
	a_fill(a, "loading...");
	var e = a_createXHRObject();
	a_openXHRObject(e, "GET", b, true, popupHandleHttpReceive);
	function popupHandleHttpReceive() {
		if (e.readyState == 4) {
			if (e.status == 200 || e.status == 304) {
				a_fill(a, (d ? f : "") + a_xhrText(e));
				if (c)
					c()
			}
		}
	}
}
