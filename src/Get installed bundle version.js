/*requires having nodejs enabled in the manifest file:
  <CEFCommandLine>
      <Parameter>--enable-nodejs</Parameter>
    </CEFCommandLine>
    
also assumes your manifest file is in /CSXS/manifest.xml relative to your extension root folder
*/

this.getInstalledPanelVersion = function () {
        const fs = cep_node.require('fs');
        const path = cep_node.require('path');
  
        var extension_dir = decodeURI(window.__adobe_cep__.getSystemPath(SystemPath.EXTENSION));
        if (navigator.platform.toLowerCase().indexOf("win") >= 0) {
            extension_dir = extension_dir.replace("file:///", "");
        } else {
            extension_dir = extension_dir.replace("file://", "");
        }
  
        const manifest_path = path.join(extension_dir, "CSXS", "manifest.xml");
        const manifest_str = fs.readFileSync(manifest_path, "utf8");
  
        const parser = new DOMParser();
        const manifest = parser.parseFromString(manifest_str, "text/xml");
        return manifest.getElementsByTagName("ExtensionManifest")[0].getAttribute("ExtensionBundleVersion");
};
