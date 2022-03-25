// like "document.currentScript.src" but it blends the src with the current extension path, which results in a nicer readable src that can be used with nodejs
function getCurrentScriptSrc(src) {
        let cs =  new CSInterface();
        let extensionPath =  cs.getSystemPath(SystemPath.EXTENSION);
         extensionPath = decodeURI(extensionPath);
     
        let src = src === undefined ? document.currentScript.src : src;
         src = decodeURI(src);
      
        // merge
        let result = src.substring(src.indexOf(extensionPath), src.length);
        return result;
};
