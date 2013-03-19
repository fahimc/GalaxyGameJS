(function(window) {
	function Main() {
		var galaxyView;
		var planetView;
		var navView;
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		// the body has loaded.
		// start coding here!
		Event.addListener(DataLoader, DataLoader.DATA_LOAD_COMPLETE, onDataLoaded);
		DataLoader.init();
		Utensil.addListener(window,"resize",onResize);
	}

	function onDataLoaded() {
		var rand = new Date().getTime();
		ResourceManager.addAssets("resource/data/assets.json?rand=" + rand);

		Event.addListener(ResourceManager, Event.COMPLETE, onResourceComplete);
		ResourceManager.init();
	}

	function onResourceComplete() {
		GameData.init();
		galaxyView = new GalaxyView();
		galaxyView.build();
		galaxyView.setStyle();
		document.body.appendChild(galaxyView.display);
		galaxyView.arrange();

		Event.addListener(galaxyView, galaxyView.ON_GALAXY_CLICKED, showPlanets);
		buildNav();
	}

	function showPlanets(data) {
		document.body.removeChild(galaxyView.display);

		planetView = new PlanetView();
		planetView.galaxyX = data.args.x;
		planetView.galaxyY = data.args.y;
		planetView.build();
		planetView.setStyle();
		document.body.appendChild(planetView.display);
		planetView.arrange();

		document.body.appendChild(navView.display);
	}

	function buildNav() {
		navView = new NavView();
		navView.build();
		navView.setStyle();

		navView.arrange();
		Event.addListener(navView, navView.ON_GALAXY_BUTTON_CLICKED, showGalaxies);
	}

	function showGalaxies() {
		document.body.removeChild(planetView.display);
		document.body.removeChild(navView.display);
		document.body.appendChild(galaxyView.display);
		planetView = null;
	}
	function onResize()
	{
		if(galaxyView)galaxyView.arrange();
		if(navView)navView.arrange();
		if(planetView)planetView.arrange();
	}
	Main();
}
)(window); 