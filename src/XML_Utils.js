    this.XML = new function () {
        var XML = this;
        XML.fetchXML = async function (url) {
            // usually used for online xml files
            console.log("will getXML using url: " + url);
            let xml = await fetch(url);
            let response = await xml.text();
            let parser = new DOMParser();
            let doc = parser.parseFromString(response, "text/xml");
            return doc;
        };

        XML.getXML = async function () {
            // usually used for local xml files
            const fs = window?.cep?.fs;
            if (!fs) {
                console.warn("can't getXML because fs is not defined. If you are debugging in the browser, this will most likely work when launched in the host app");
                return;
            }
            const cs = new CSInterface();
            const path = cs.getSystemPath(SystemPath.EXTENSION);
            const data = await fs.readFile(`${path}/CSXS/manifest.xml`);
            if (!data) {
                return;
            }

            return data;
        };

        XML.getTagValue = function (xmlDoc, tagName) {
            if (!xmlDoc) {
                console.error("xmlDoc is undefined, can't get tag value");
            }
            if (!tagName) {
                console.error("tagName is undefined, can't get tag value");
            }


            const children = xmlDoc.children || [];
            var tagName = String(tagName);
            var value = null;
            for (let i = 0; i <= children.length; i++) {
                var c = children[i];
                var att = c.getAttribute(tagName);
                if (att) {
                    value = att;
                    break;
                }
            };

            return value;
        };


        XML.toJSON = function (xml) {
            var obj = {};
            if (xml.nodeType == 1) { // element
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) { // text
                obj = xml.nodeValue;
            }
            if (xml.hasChildNodes()) {
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof (obj[nodeName]) == "undefined") {
                        obj[nodeName] = XML.toJSON(item);
                    } else {
                        if (typeof (obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(XML.toJSON(item));
                    }
                }
            }
            return obj;
        };

        XML.parseFromString = function (str) {
            if (!window.DOMParser) {
                console.error("XML.parseFromString: DOMParser is not supported by this browser");
                return null;
            };

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(str, "text/xml");
            return xmlDoc;
        };

    };
