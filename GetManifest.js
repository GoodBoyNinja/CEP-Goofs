const manifestURI = "../CSXS/manifest.xml"; // should probably use an absolute file path

this.getXML = async function () {
      // usually used for local xml files
      const fs = window?.cep?.fs;
      if (!fs) {
          console.warn("can't getXML because fs is not defined. If you are debugging in the browser, this will most likely work when launched in the host app");
          return;
      }
      const path = GEP.extensionPath;
      const data = await fs.readFile(`${path}/CSXS/manifest.xml`);
      if (!data) {
          return;
      }
      return data;
  };

this.getManifest = async function () {
      var m = await this.getXML(manifestURI);
      return m;
  };





/*
// End of file.
* Below are examples using the XML_Utils.js (in this repository) you can parse the xml into json. Here are some examples:
*/

const mDoc = await XML.parseFromString(stringed);
const mJson = await XML.toJSON(mDoc);

// get manifest bundle version
const bundleVersion = XML.getTagValue(mDoc, "ExtensionBundleVersion") || 0;
const bundleID = XML.getTagValue(mDoc, "ExtensionBundleId");

// you can stringify the json version to send to extendscript using evalScript later on
var forJSX = JSON.stringify(mJson);
