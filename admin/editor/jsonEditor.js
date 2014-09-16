//eval
jsonEditor = {
	jsonObj : null,
	xMLflag : null,
	xMLdoctypeStr : "",
	xMLRootStr : "",
	jsonFormDIVObj : null,
	jsonFormDataDIVObj : null,
	formatStrArray : [ "JSON", "Formatted JSON", "XML" ],
	jsonToForm : function(g) {
		a_fill(jE.jsonFormDIVObj, "<span class='red'>Procesando informacion..</span>");
		jE.jsonFormDataDIVObj = null;
		jE.xMLflag = false;
		jE.xMLdoctypeStr = "";
		jE.alterCSS("IMG.pasteIMG", "display", "none");
		jE.alterCSS("IMG.pasteChildnodesIMG", "display", "none");
		jE.alterCSS("IMG.pasteAttributesIMG", "display", "none");
		setTimeout(delayedJsonToForm, 100);
		function delayedJsonToForm() {
			var a = a_getObI("infoInJson");
			if (a) {
				var b = a_trim(a.value);
				if (b) {
					var c = "";
					if (b.indexOf("<") == 0) {
						jE.jsonObj = jE.xmlToJs(b);
						if (typeof (jE.jsonObj) == "string") {
							c = jE.jsonObj;
							jE.jsonObj = null
						}
					} else {
						b = b.replace(/\n/g, "");
						try {
							jE.jsonObj = eval("(" + b + ")")
						} catch (e) {
							c = "JS " + e.name + ": " + e.message;
							jE.jsonObj = null
						}
					}
					if (jE.jsonObj) {
						var d = jE.jsonObj.length != undefined;
						var f = jE.xMLflag ? "XML Root:<br><input id='xmlRootINPUT' value='"
								+ jE.xMLRootStr + "'> "
								: "";
						f += "<span onclick='jE.expandCollapseAllFormItems(true); ' class='clickable'>Mostrar todos los productos</span> | <span onclick='jE.expandCollapseAllFormItems(false); ' class='clickable'>Ocultar todos los productos</span>"
								+ "<br/><div id='jsonFormDataDIV'>"
								+ jE.jsonToFormStep("", jE.jsonObj, d)
								+ "</div>" + "<br/>";
						/*for ( var i in jE.formatStrArray) {
							if (i < 3 || jE.xMLflag)
								f += "<input type='button' class='buttonINPUT' onclick='jE.form2json("
										+ i
										+ "); ' value='Convert Form to "
										+ jE.formatStrArray[i] + "'> "
						}*/
						f += "<br/><input type='hidden' id='newInfoInJson' name='newInfoInJson' value='{}'/>";
						//f += "<br/><input id='evalButtonINPUT' type='button' class='buttonINPUT' onclick='jE.evalNewJson(); ' value='Eval' style='display:none; '> ";
						a_fill(jE.jsonFormDIVObj, f);
						jE.jsonFormDataDIVObj = a_getObI("jsonFormDataDIV");
						a_addListener(jE.jsonFormDataDIVObj, "click",
								jE.formClicked)
					} else {
						a_fill(jE.jsonFormDIVObj, "");
						alert("Source was invalid.\n\n" + c)
					}
				}
			}
		}
	},
	xmlToJs : function(a) {
		var b;
		if (window.ActiveXObject) {
			b = new ActiveXObject("Microsoft.XMLDOM");
			b.async = "false";
			b.loadXML(a);
			if (b.parseError.errorCode) {
				return "Microsoft.XMLDOM XML Parsing Error: "
						+ b.parseError.reason + "Line Number "
						+ b.parseError.line + ", " + "Column "
						+ b.parseError.linepos + ":" + "\n\n"
						+ b.parseError.srcText
			}
		} else {
			b = (new DOMParser()).parseFromString(a, "text/xml")
		}
		var c = b.documentElement;
		if (c.tagName == "parserError"
				|| c.namespaceURI == "http://www.mozilla.org/newlayout/xml/parsererror.xml") {
			return "DOMParser " + c.childNodes[0].nodeValue + "\n\n"
					+ c.childNodes[1].childNodes[0].nodeValue
		}
		jE.xMLflag = true;
		jE.xMLRootStr = c.tagName;
		if (a.indexOf("<?xml ") == 0) {
			var L = a.indexOf("?>");
			if (L > 0)
				jE.xMLdoctypeStr = a.substr(0, L + 2)
		}
		return jE.xmlToJsStep(c)
	},
	xmlToJsStep : function(a) {
		var b = {};
		if (a.attributes) {
			b.attributes = [];
			if (a.attributes.length > 0) {
				for ( var i = 0, xmlChildObj; xmlChildObj = a.attributes[i]; i++) {
					if (xmlChildObj = a.attributes[i]) {
						if (xmlChildObj.nodeName != undefined) {
							e = {};
							e[xmlChildObj.nodeName] = xmlChildObj.value;
							b.attributes.push(e)
						}
					}
				}
			}
		}
		if (a.childNodes) {
			b.childNodes = [];
			if (a.childNodes.length > 0) {
				for ( var i = 0, xmlChildObj; xmlChildObj = a.childNodes[i]; i++) {
					var c = xmlChildObj.nodeName;
					if (c == "#text") {
						var d = a_trim(xmlChildObj.nodeValue);
						if (d) {
							e = {
								textNode : d
							};
							b.childNodes.push(e)
						}
					} else if (c != undefined) {
						var e = {};
						e[c] = jE.xmlToJsStep(xmlChildObj);
						b.childNodes.push(e)
					}
				}
			}
		}
		return b
	},
	copyObj : {},
	activeLI : null,
	jsonToFormStep : function(a, b, c) {
		if (typeof (b) != "object")
			return "NOT AN OBJECT";
		var d = false;
		if (b) {
			d = b.length != undefined
		}
		var e;
		if (c) {
			e = "arrayIndex"
		} else if (d) {
			e = "arrayNameINPUT"
		} else if (typeof (b) == "object") {
			e = "objectNameINPUT"
		} else {
			e = "nameINPUT"
		}
		var f = jE.xMLflag ? jE.getReadonly(a) : false;
		var g = jE.inputHTML(a, "leftINPUT " + e, true, f) + ":";
		g += "\n<ol" + (d ? " class='arrayOL'" : "") + ">"
				+ jE.addActionsHTML(a, d);
		for ( var a in b) {
			if (typeof (b[a]) == "object" && b[a] != null) {
				if (b[a].length == undefined) {
					g += "<li>"
				} else {
					g += "<li class='arrayLI'>"
				}
				g += jE.jsonToFormStep(a, b[a], d)
			} else {
				g += "<li>";
				var e;
				if (d) {
					e = "arrayIndex"
				} else {
					e = "nameINPUT"
				}
				var h = typeof (b[a]) == "string" ? "stringTEXTAREA" : "";
				var f = jE.xMLflag ? jE.getReadonly(a) : false;
				var i = b[a];
				if (typeof (i) === "undefined")
					i = "undefined";
				else if (typeof (i) == "number" && !i)
					i = "0";
				else if (i === null)
					i = "null";
				else if (i === false)
					i = "false";
				g += jE.inputHTML(a, "leftINPUT " + e, false, f) + ":"
						+ jE.inputHTML(i, "rightTEXTAREA " + h)
			}
			g += "</li>\n"
		}
		return g + "</ol>\n"
	},
	inputHTML : function(a, b, c, d) {
		if (b.indexOf("arrayIndex") >= 0) {
			return jE.leftActionsHTML(b, jE.xMLflag ? false : c)
					+ "<input type='hidden' class='leftINPUT'><span class='indexSPAN'>["
					+ a + "]</span>"
		} else {
			var e = b;
			if (d)
				e += " readonlyINPUT";
			var f = e ? (" class='" + e + "'") : "";
			if (!a && b.indexOf("objectNameINPUT") >= 0) {
				return "<input type='hidden' " + f + ">"
			} else {
				if (b.indexOf("leftINPUT") >= 0) {
					if (d)
						f += " readonly";
					return jE.leftActionsHTML(b, c) + "<input value='" + a
							+ "'" + f + "><span class='indexSPAN'></span>"
				} else {
					return jE.textareaHTML(a) + jE.checkboxHTML(b)
				}
			}
		}
	},
	leftActionsHTML : function(a, b) {
		if (!a)
			a = "";
		var c = "";
		if (b)
			c += "<img src='img/je/collapse.gif' class='clickable expandCollapseIMG' onclick='jE.expandCollapseFormItem(this); ' title='Expand/Collapse Node'> ";
		else
			c += "<img src='img/je/blank.gif'> ";
		if (!jE.xMLflag || a.indexOf("arrayIndex") >= 0) {
			c += "<img src='img/je/down.gif' class='clickable' onclick='jE.moveFormItem(this,1); ' title='Move Node Down'>"
					+ "<img src='img/je/up.gif' class='clickable' onclick='jE.moveFormItem(this,0); ' title='Move Node Up'>"
					+ " <img src='img/je/copy.gif' class='clickable' onclick='jE.copyFormItem(this); ' title='Copy Node'>"
					+ " <img src='img/je/close.gif' class='clickable' onclick='jE.deleteFormItem(this); ' title='Delete Node (Toggle)'> "
		}
		return c
	},
	textareaHTML : function(a) {
		if (!a)
			a = "";
			
		var id=Math.floor(Math.random()*100000*Math.random());
		return "<textarea class='rightTEXTAREA' id='"+id+"'>"+ a + "</textarea><a href=\"imagenesPop.php?id="+id+"\" target=\"_blank\" onClick=\"window.open(this.href, this.target, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800,height=600,top=0,left=0'); return false;\"><img src='img/je/expand2.gif' class='clickable'/></a>"
				
		//return "<img src='img/je/expand2.gif' class='clickable expandCollapse2IMG' onclick='jE.expandCollapseTextarea(this); ' title='Expand/Collapse Textarea'> <textarea class='rightTEXTAREA'>"
		//		+ a + "</textarea><a href=\"imagenes.php\" target=\"_blank\" onClick=\"window.open(this.href, this.target, 'toolbar=no, location=no, directories=no, status=no, menubar=no, //scrollbars=yes, resizable=yes, width=800,height=600,top=0,left=0'); return false;\"><img src='img/je/expand2.gif' class='clickable'/></a>"
	},
	checkboxHTML : function(a) {
		var b = "";
		/*if (!jE.xMLflag) {
			b = "<input type='checkbox' class='checkbox'";
			if (a) {
				if (a.indexOf("stringTEXTAREA") >= 0)
					b += " checked "
			}
			b += "><i>string</i>"
		}*/
		return b
	},
	addActionsHTML : function(a, b) {
		var c = "";
		var d = "";
		if (!jE.xMLflag) {
			var e = b ? "" : " ";
			d = "Insertar <span class='clickable' onclick='jE.addFormItem(this," + b + ",0); '>" + e + "Propiedad</span>"
					+ " |  <span class='clickable' onclick='jE.addFormItem(this," + b + ",1); '>" + e + "Producto</span>"
		} else {
			if (a == "attributes" || a == "childNodes") {
				d = "Insertar ";
				if (a == "attributes") {
					c = " pasteAttributesIMG";
					d += "<span class='clickable' onclick='jE.addFormItem(this,false,0); '>Propiedad</span>"
				} else {
					c = " pasteChildnodesIMG";
					d += "<span class='clickable' onclick='jE.addFormItem(this,false,1); '>Producto</span>"
							+ " | <span class='clickable' onclick='jE.addFormItem(this,false,3); '>TextNodeValue</span>"
				}
			}
		}
		if (d)
			d += " <img src='img/je/paste.gif' class='clickable pasteIMG" + c
					+ "' onclick='jE.pasteFormItem(this); ' title='Paste'>";
		return d
	},
	expandCollapseAllFormItems : function(a) {
		if (imgObjs = a_getArrayDbT(jE.jsonFormDataDIVObj, "img",
				"expandCollapseIMG")) {
			for ( var i in imgObjs)
				jE.expandCollapseFormItem(imgObjs[i], a, "jE_global")
		}
	},
	expandCollapseFormItem : function(a, b, c) {
		var d = a_getSibling(a, "next", "ol");
		if (d) {
			if (b == undefined)
				b = a.src.indexOf("collapse") < 0;
			a_display(d, b);
			a.src = "img/je/" + (b ? "collapse" : "expand") + ".gif";
			if (!c)
				jE.getLI(a)
		}
	},
	expandCollapseTextarea : function(a) {
		var b = a_getSibling(a, "next", "textarea");
		if (b) {
			jE.getLI(a);
			var c = a.src.indexOf("collapse") < 0;
			a_addClass(b, "expandedTEXTAREA", c);
			a.src = "img/je/" + (c ? "collapse" : "expand") + "2.gif"
		}
	},
	deleteFormItem : function(a) {
		var b = jE.getLI(a);
		if (b) {
			var c = a_hasClass(b, "deleted");
			if (c) {
				jE_globalRestoreLiObj = b;
				var d = "<input type='button' class='buttonINPUT' onclick='jE.restoreFormItem(); ' value='Restore THIS Node'>"
						+ "<br><br><input id='removeAllDeletedINPUT' type='button' onclick='jE.allDeletedFormItems(); ' value='Remove ALL Deleted Nodes'>";
				jE.messageRight(a, d, 0)
			} else {
				a_addClass(b, "deleted")
			}
		}
	},
	restoreFormItem : function() {
		a_addClass(jE_globalRestoreLiObj, "deleted", false);
		jE.messageClose()
	},
	allDeletedFormItems : function() {
		var a = a_getArrayDbT(jE.jsonFormDataDIVObj, "li", "deleted");
		if (a) {
			for ( var i in a)
				a[i].parentNode.removeChild(a[i])
		}
		jE.messageClose()
	},
	addFormItem : function(a, b, c) {
		var d = a_getAbT(a, "ol");
		if (d) {
			var e = document.createElement("li");
			var f = false;
			var g = true;
			var h;
			if (c == 0 || c == 3) {
				g = false;
				h = "nameINPUT";
				if (c == 3)
					f = true
			} else if (c == 1) {
				h = "objectNameINPUT"
			} else {
				h = "arrayNameINPUT"
			}
			if (b)
				h = "arrayIndex";
			var i = jE.inputHTML((c == 3 ? "textNode" : "*"), "leftINPUT " + h,
					g, f)
					+ ":";
			if (c == 0 || c == 3) {
				i += jE.textareaHTML() + jE.checkboxHTML("stringTEXTAREA")
			} else {
				if (c == 2) {
					i += "<ol class='arrayOL'>" + jE.addActionsHTML("", true)
							+ "</ol>"
				} else {
					if (jE.xMLflag) {
						xmlDefaultNodesStr = "<li>"
								+ jE.leftActionsHTML("", true)
								+ "<input class='leftINPUT objectNameINPUT readonlyINPUT' readonly='' value='attributes'/>:"
								+ " <ol class='arrayOL'>"
								+ jE.addActionsHTML("attributes")
								+ " </ol>"
								+ "</li>"
								+ "<li>"
								+ jE.leftActionsHTML("", true)
								+ "<input class='leftINPUT objectNameINPUT readonlyINPUT' readonly='' value='childNodes'/>:"
								+ " <ol class='arrayOL'>"
								+ jE.addActionsHTML("childNodes") + " </ol>"
								+ "</li>";
						i += "<ol>" + jE.addActionsHTML() + xmlDefaultNodesStr
								+ "</ol>"
					} else {
						i += "<ol>" + jE.addActionsHTML("", false) + "</ol>"
					}
				}
			}
			if (jE.xMLflag) {
				i = jE.leftActionsHTML("arrayIndex", false)
						+ "<input type='hidden' class='leftINPUT'>[*]:<ol><li>"
						+ i + "</li></ol>"
			}
			if (c == 2)
				a_addClass(e, "arrayLI");
			a_fill(e, i);
			a_insertBefore(d, e, a_getDbT(d, "li"));
			jE.setActiveLI(e)
		}
	},
	moveFormItem : function(a, b) {
		var c = jE.getLI(a);
		if (c) {
			var d = a_getAbT(c, "ol");
			if (d) {
				var e;
				if (e = a_getSibling(c, (b ? "next" : "previous"))) {
					if (b)
						e = a_getSibling(e, "next")
				} else if (b) {
					e = jE.getChildrenByTag(d, "li", "first")
				}
				a_insertBefore(d, c, e)
			}
		}
	},
	copyFormItem : function(a) {
		var b = jE.getLI(a);
		if (b) {
			var c = a_getAbT(b, "ol");
			if (c) {
				jE.copyObj.liObj = b.cloneNode(true);
				jE.copyObj.olClassStr = c.className;
				a_addClass(jE.copyObj.liObj, "deleted", false);
				var d = (c.className == "arrayOL");
				var e;
				if (!jE.xMLflag) {
					e = b
				} else {
					if (e = jE.getChildrenByTag(b, "ol", "first")) {
						e = a_getDbT(e, "li")
					}
				}
				var f = "";
				if (e) {
					var g = a_getDbT(e, "input", "leftINPUT");
					if (g) {
						if (g.type == "hidden")
							f += "#";
						else
							f += '"' + g.value + '"';
						f += ":";
						var h = jE.getChildrenByTag(e, "textarea", "first");
						if (h) {
							f += '"' + h.value + '"'
						} else {
							if (a_hasClass(e, "arrayLI")) {
								f += "[]"
							} else {
								f += "{}"
							}
						}
					}
				}
				jE.messageRight(a, "<b>" + (d ? "Array item" : "Object")
						+ " copied:</b><br>" + f);
				var j = "none";
				if (!jE.xMLflag) {
					j = "pasteIMG";
					jE.alterCSS("IMG.pasteIMG", "display", "inline")
				} else {
					var k = a_getAbT(c, "li");
					if (k) {
						var l = jE.getChildrenByTag(k, "input", "leftINPUT");
						if (l) {
							var m = (l.value == "attributes");
							j = m ? "pasteAttributesIMG" : "pasteChildnodesIMG";
							var n = m ? "pasteChildnodesIMG"
									: "pasteAttributesIMG";
							jE.alterCSS("IMG." + j, "display", "inline");
							jE.alterCSS("IMG." + n, "display", "none")
						}
					}
				}
				var o = a_getArrayDbT(jE.jsonFormDataDIVObj, "img", j);
				if (o) {
					for ( var i in o)
						o[i].title = "Paste: " + f
				}
			}
		}
	},
	pasteFormItem : function(a, b) {
		if (jE.copyObj.liObj) {
			var c = a_getAbT(a, "ol");
			if (c) {
				var d = jE.copyObj.liObj.cloneNode(true);
				jE.setActiveLI(d);
				a_insertBefore(c, d, a_getDbT(c, "li"));
				if (c.className != jE.copyObj.olClassStr) {
					var e = a_getDbT(d, "input", "leftINPUT");
					var f = a_getDbT(d, "span", "indexSPAN");
					if (c.className == "arrayOL") {
						f.innerHTML = "[*]";
						e.type = "hidden"
					} else {
						f.innerHTML = "";
						e.type = "text";
						e.value = "*"
					}
				}
				var g = a.title.replace("Paste: ", "<b>Pasted:</b><br>");
				jE.messageRight(a, g)
			}
		} else {
			jE.messageRight(a, "</b>Nothing in clipboard.</b>")
		}
	},
	formClicked : function(e) {
		var a = a_getTarget(e);
		if (!a_hasClass(a, "clickable")) {
			var b = a_getAbT(a, "li");
			if (b)
				jE.setActiveLI(b)
		}
	},
	getLI : function(a) {
		var b = a_getAbT(a, "li");
		if (b) {
			jE.setActiveLI(b);
			return b
		}
	},
	setActiveLI : function(a) {
		a_addClass(jE.activeLI, "activeLI", false);
		a_addClass(a, "activeLI");
		jE.activeLI = a
	},
	getReadonly : function(a) {
		return (a == "attributes" || a == "childNodes" || a == "textNode")
	},
	formatNum : 0,
	linebreakStr : "",
	errorCount : [],
	error1Msg : "",
	form2json : function(a) {
		jE.errorCount = [ 0, 0 ];
		jE.error1Msg = "";
		jE.formatNum = a;
		jE.linebreakStr = a ? "\n" : "";
		var b = jE.jsonFormDataDIVObj;
		if (b) {
			var c = a_getObI("newInfoInJson");
			c.value = "Processing..";
			if (a == 2)
				jE.xMLRootStr = a_getObI("xmlRootINPUT").value;
			var d = "";
			var e = 0;
			if (a == 2) {
				e = 1;
				if (jE.xMLdoctypeStr) {
					d += jE.xMLdoctypeStr + jE.linebreakStr
				}
				d += "<" + jE.xMLRootStr
			}
			d += jE.form2jsonStep(b, e, "");
			if (a == 2) {
				d += "</" + jE.xMLRootStr + ">"
			}
			c.value = d;
			a_display(a_getObI("evalButtonINPUT"), (a < 2));
			var f = "";
			if (jE.errorCount[0])
				f = jE.getPluralStr(jE.errorCount[0], 'name')
						+ 'left empty, replaced by "undefined".\n';
			if (jE.errorCount[1])
				f += jE.getPluralStr(jE.errorCount[1], 'nonstring value')
						+ "left empty, replaced by 0 in "
						+ jE.error1Msg.substr(0, jE.error1Msg.length - 2) + ".";
			if (f) {
				f = "\n\nWarning:\n" + f;
				alert("Form convert to " + jE.formatStrArray[a] + "." + f)
			}
		}
	},
	form2jsonStep : function(d, e, f, g) {
		var h = jE.getChildrenByTag(d, "input");
		if (h) {
			var j = "";
			var k;
			var k = "";
			var l = processText(h[0].value);
			var m = false;
			if (h[0].type != "hidden") {
				if (!l || l == "*") {
					jE.errorCount[0]++;
					l = "undefined";
					h[0].value = l
				}
				if (jE.formatNum == 2) {
					m = (l == "attributes" || l == "childNodes");
					k = "";
					if (!m && l != "textNode") {
						if (g == "attributes") {
							j += " " + l + "="
						} else {
							j += padHTML("<" + l, e)
						}
					}
				} else {
					k = '"' + l + '":'
				}
			}
			if (jE.formatNum < 2)
				j += padHTML(k, e);
			var n = jE.getChildrenByTag(d, "ol", "first");
			if (n) {
				var o = a_hasClass(n, "arrayOL");
				if (jE.formatNum < 2)
					j += (o ? "[" : "{") + jE.linebreakStr;
				var p = jE.getChildrenByTag(n, "li");
				if (p) {
					var q = 0;
					for ( var i in p) {
						if (!a_hasClass(p[i], "deleted")) {
							q++;
							var r = "";
							var s;
							if (jE.formatNum == 2) {
								r = l;
								s = e;
								if (r == "") {
									r = g
								} else {
									if (!m)
										s = e + 1
								}
							} else {
								s = e + 1
							}
							j += jE.form2jsonStep(p[i], s, ",", r)
						}
					}
					if (jE.formatNum < 2 && q) {
						var L = j.lastIndexOf(",");
						j = j.substring(0, L) + j.substring(L + 1)
					}
				}
				if (jE.formatNum == 2) {
					if (l == "attributes")
						j += ">" + jE.linebreakStr;
					k = "";
					if (l != "attributes" && l != "childNodes"
							&& l != "textNode" && l != "") {
						k = "</" + l + ">" + jE.linebreakStr
					}
				} else {
					k = o ? "]" : "}"
				}
				if (k)
					j += padHTML(k, e)
			} else {
				var t = true;
				if (h[1])
					t = h[1].checked;
				if (jE.formatNum == 2 && g != "attributes")
					t = false;
				var u = t ? '"' : "";
				var v = jE.getChildrenByTag(d, "textarea", "first");
				if (v) {
					k = v.value;
					if (jE.formatNum < 2)
						k = processText(k);
					else
						k = a_trim(k)
				}
				if (!k && !t && jE.formatNum < 2) {
					k = "0";
					v.value = k;
					jE.errorCount[1]++;
					jE.error1Msg += (l ? "'" + l + "'" : "[array item]") + ", "
				}
				k = u + k + u;
				if (jE.formatNum == 2) {
					if (g != "attributes") {
						k = padHTML(k, e) + jE.linebreakStr
					}
				}
				j += k
			}
			if (jE.formatNum < 2)
				j = j + f + jE.linebreakStr;
			return j
		}
		function processText(a) {
			return a_trim(a.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")
					.replace(/\n/g, "\\n"))
		}
		function padHTML(a, b) {
			if (!jE.formatNum)
				return a;
			var c = "";
			while (b > 0) {
				c += "\t";
				b--
			}
			return c + a
		}
	},
	evalNewJson : function() {
		var a = a_getObI("newInfoInJson");
		if (a) {			
			try {
				jE.jsonObj = eval("(" + a.value + ")")
				console.log("Eval OK.");
			} catch (e) {
				alert("Informacion invalida .\n\nJS " + e.name + ": " + e.message)
				console.log("Eval ERROR.");
			}
		}
	},
	getChildrenByTag : function(a, b, c) {
		if (!a || !b)
			return;
		var d = [];
		for ( var i = 0, domObj; domObj = a.childNodes[i]; i++) {
			if (domObj.nodeName != '#text') {
				if (domObj.tagName.toLowerCase() == b) {
					if (c)
						return domObj;
					d.push(domObj)
				}
			}
		}
		return d.length ? d : null
	},
	alterCSS : function(a, b, c) {
		if (!a || !b || !c)
			return;
		var d;
		if (document.all) {
			d = "rules"
		} else if (document.getElementById) {
			d = "cssRules"
		} else {
			return
		}
		var a = jE.lcSelectorTag(a);
		var e = document.styleSheets[0][d];
		for ( var i = 0, ruleObj; ruleObj = e[i]; i++) {
			if (jE.lcSelectorTag(ruleObj.selectorText) == a)
				ruleObj.style[b] = c
		}
	},
	lcSelectorTag : function(a) {
		var x = a.indexOf("#");
		if (x < 0)
			x = a.indexOf(".");
		if (x > 0)
			a = a.substr(0, x).toUpperCase() + a.substr(x);
		return a
	},
	messageDivObj : null,
	messageCloseObj : null,
	messageDivContentObj : null,
	messageTimer : null,
	fadeObj : null,
	messageRight : function(a, b, c) {
		clearTimeout(jE.messageTimer);
		a_fill(jE.messageDivContentObj, b);
		if (a) {
			var d = a_getPoint(a);
			d.x += a.offsetWidth;
			jE.messageDivObj.style.left = d.x + "px";
			jE.messageDivObj.style.top = d.y + "px";
			a_display(jE.messageDivObj);
			if (c == undefined)
				c = 2;
			if (c > 0)
				jE.messageTimer = window.setTimeout(delayedClose, c * 1000);
			a_addClass(jE.messageDivObj, "messageAutoCloseDIV", (c > 0));
			jE.messageCloseObj.src = "img/je/"
					+ (c > 0 ? "countdown" : "popupClose") + ".gif"
		}
		function delayedClose() {
			if (a_displayed(jE.messageDivObj)) {
				jE.displayFade(jE.messageDivObj, false)
			}
		}
	},
	messageClose : function() {
		clearTimeout(jE.messageTimer);
		a_display(jE.messageDivObj, false)
	},
	displayFade : function(a, b) {
		if (!a)
			return;
		clearTimeout(jE.messageTimer);
		a_display(a);
		a.fadeIncrement = (b ? 4 : -4);
		a.opacityNum = b ? 1 : 99;
		a_setOpacity(a, a.opacityNum);
		jE.displayFadeStep(a)
	},
	displayFadeStep : function(a, b) {
		jE.fadeObj = a;
		a.opacityNum += a.fadeIncrement;
		a_setOpacity(a, a.opacityNum);
		if (a.opacityNum > 0 && a.opacityNum < 100) {
			window.setTimeout('jE.displayFadeStep(jE.fadeObj); ', 5)
		} else {
			a_setOpacity(a, 100);
			if (a.fadeIncrement < 0)
				a_display(a, false)
		}
	},
	getPluralStr : function(a, b) {
		return a + " " + b + (a != 1 ? "s" : "") + " "
	},
	sampleClicked : function(e) {
		var a = a_getObI("infoInJson");
		if (a) {
			var b = a_getTarget(e);
			if (a_hasClass(b, "clickable")) {
				var c = b.innerHTML;
				var d = a_getObI("sample" + c);
				if (d) {
					if (jE.jsonFormDataDIVObj) {
						if (!confirm("Clear existing Form?"))
							return
					}
					var f = d.innerHTML;
					f = f.substring(4, f.length - 3);
					a.value = a_trim(f);
					a_fill(jE.jsonFormDIVObj, "");
					jE.jsonFormDataDIVObj = null
				}
			}
		}
	},
	pageInit : function(a, b, c) {
		a_addListener(a_getObI("pickSampleSPAN"), "click", jE.sampleClicked);
		jE.jsonFormDIVObj = a_getObI("jsonFormDIV");
		jE.messageDivObj = a_getObI("messageDIV");
		a_display(jE.messageDivObj, false);
		jE.messageCloseObj = a_getObI("messageCloseIMG");
		jE.messageDivContentObj = a_getObI("messageContentDIV")
	}
};
jE = jsonEditor;
a_addListener(window, "load", jE.pageInit);
