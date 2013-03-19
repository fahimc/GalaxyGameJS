var DataLoader = {
	DATA_LOAD_COMPLETE:"DATA_LOAD_COMPLETE",
	handlers : {},
	
	init : function() {
		this.loadGalaxy();
	},
	loadGalaxy : function() {
		Utensil.URLLoader.load(Const.galaxyURL,this.createHandler("onGalaxyComplete"));
	},
	onGalaxyComplete : function(t, x) {
		this.removeHandler("onGalaxyComplete");
		model.set(Const.galaxyData, eval('(' + t + ')'));
		this.loadPlanets();
	},
	loadPlanets : function() {
		Utensil.URLLoader.load(Const.planetsURL, this.createHandler("onPlanetsComplete"));
	},
	onPlanetsComplete : function(t, x) {
		this.removeHandler("onPlanetsComplete");
		model.set(Const.planetsData, eval('(' + t + ')'));
		this.loadResources();
	},
	loadResources : function() {
		Utensil.URLLoader.load(Const.resourcesURL, this.createHandler("onResourcesComplete"));
	},
	onResourcesComplete : function(t, x) {
		this.removeHandler("onResourcesComplete");
		model.set(Const.resourcesData, eval('(' + t + ')'));
		this.loadCivils();
	},
	loadCivils : function() {
		Utensil.URLLoader.load(Const.civilsURL, this.createHandler("onCivilsComplete"));
	},
	onCivilsComplete : function(t, x) {
		this.removeHandler("onCivilsComplete");
		model.set(Const.civilsData, eval('(' + t + ')'));
		this.onLoadComplete();
	},
	onLoadComplete:function()
	{
		Event.dispatch(this,this.DATA_LOAD_COMPLETE);
	},
	createHandler : function(funcName) {
		var root = this;
		this.handlers[funcName] = function(t, x) {
			root[funcName](t, x);
		}
		return this.handlers[funcName];
	},
	removeHandler : function(funcName) {

		if (this.handlers[funcName])
			delete this.handlers[funcName];
	}
}
