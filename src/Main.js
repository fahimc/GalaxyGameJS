(function(window) {
  function Main() {
  	var galaxyView ;
  	var planetView ;
    if(window.addEventListener) {
        window.addEventListener("load", onLoad);
    } else {
        window.attachEvent("onload", onLoad);
    }

}
  function onLoad() {
    // the body has loaded. 
    // start coding here!
    Event.addListener(DataLoader,DataLoader.DATA_LOAD_COMPLETE,onDataLoaded);
    DataLoader.init();
  }
  function onDataLoaded()
  {
  	var rand = new Date().getTime();		
	ResourceManager.addAssets("resource/data/assets.json?rand="+rand);
	
	Event.addListener(ResourceManager, Event.COMPLETE, onResourceComplete);  
  	ResourceManager.init();
  }
  function onResourceComplete()
  {
  	GameData.init();
  	galaxyView = new GalaxyView();
  	galaxyView.build();
  	galaxyView.setStyle();
  	document.body.appendChild(galaxyView.display);
  	galaxyView.arrange();
  	
  	Event.addListener(galaxyView,galaxyView.ON_GALAXY_CLICKED,showPlanets);
  	
  }
  function showPlanets(data)
  {
  	document.body.removeChild(galaxyView.display);
  	console.log(data.args);
  	planetView = new PlanetView();
  	planetView.galaxyX = data.args.x;
  	planetView.galaxyY = data.args.y;
  	planetView.build();
  	planetView.setStyle();
  	document.body.appendChild(planetView.display);
  	planetView.arrange();
  }

Main();
}
)(window);