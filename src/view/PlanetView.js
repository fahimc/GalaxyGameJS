var PlanetView=function(){
	this.galaxyX=0;
	this.galaxyY=0;
	this.build=function()
	{
		Class._super(this,"build");
		
		var galaxy  = model.get(Const.gameData).galaxy[this.galaxyX][this.galaxyY];
		for (var a = 0; a < galaxy.planets.length; a++) {
			this.buildPlanet(a);
		}
		
		
	};
	this.buildPlanet=function(a)
	{
		var cellWidth  =Math.round(Utensil.stageWidth()/Const.maxXCells);
		var img = new Image();
		img.src = ResourceManager.getAssetByName("sun").src;
		img.style.position="absolute";
		img.style.width  = cellWidth+"px";
		img.style.height  = cellWidth+"px";
		img.style.left = ((cellWidth +50) *a )+"px";
		img.style.top = (50 )+"px";
		img.setAttribute("planet-index",a);
		
		Utensil.addListener(img,"click",this.createHandler(this,"onPlanetClicked"));
		
		this.addChild(img);
	};
	this.onPlanetClicked=function(event)
	{
		var target = event.srcElement || event.target;
		var a = target.getAttribute("planet-index");
		var galaxy  = model.get(Const.gameData).galaxy[this.galaxyX][this.galaxyY];
		var planet = galaxy.planets[a];
		console.log("PlanetData", GalaxyModel.getPlanetDetails(planet));
	}
	
	
};
Class.extend(PlanetView,UIElement);
