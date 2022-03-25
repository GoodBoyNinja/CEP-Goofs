// the second function relies on the first one

this.getInterfaceRGB = function (forCSS) {
    var interface = new CSInterface();
    var colorObj = interface?.getHostEnvironment()?.appSkinInfo?.panelBackgroundColor?.color;
    var rgb = colorObj ? [colorObj.red, colorObj.green, colorObj.blue] : [0, 0, 0];
  
    if (forCSS) {
        return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    };
    return rgb;
};

// sets the body color to the app skin color through CSS
 this.matchBodyColorToAppSkin = function () {
      var bgColor = this.getInterfaceRGB(true);
      document.body.style.backgroundColor = bgColor;
      return bgColor;
  };
