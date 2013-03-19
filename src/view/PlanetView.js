var PlanetView=function(){
	this.galaxyX=0;
	this.galaxyY=0;
	this.sun;
	this.nextX=0;
	this.build=function()
	{
		Class._super(this,"build");
		
		var galaxy  = model.get(Const.gameData).galaxy[this.galaxyX][this.galaxyY];
		
		if(galaxy.containsSun)this.createSun();
		
		for (var a = 0; a < galaxy.planets.length; a++) {
			this.buildPlanet(a,galaxy.planets[a]);
		}
		
		
	};
	this.buildPlanet=function(a,planet)
	{
		var details=GalaxyModel.getPlanetDetails(planet);
		var cellWidth  =Math.round(Utensil.stageWidth()/Const.maxXCells);
		console.log(details.size);
		switch(details.size)
		{
			case "small":
			cellWidth  =cellWidth *0.25;
			break;
			case "medium":
			cellWidth  =cellWidth *0.5;
			break;
			case "large":
			break;
		}
		var img = new Image();
		img.src = details.image;
		img.style.position="absolute";
		img.style.width  = cellWidth+"px";
		img.style.height  = cellWidth+"px";
		img.style.left = this.nextX+"px";
		img.style.top = (((Utensil.stageHeight() * 0.25) - cellWidth) * 0.5)+"px";
		img.setAttribute("planet-index",a);
		
		Utensil.addListener(img,"click",this.createHandler(this,"onPlanetClicked"));
		this.nextX  =this.nextX +cellWidth +50;
		this.addChild(img);
	};
	this.createSun=function()
	{
		this.sun = new Image();
		this.sun.src = ResourceManager.getAssetByName("sun").src;
		this.sun.style.position="absolute";
		this.nextX =(Utensil.stageHeight() * 0.25)+50;
		this.addChild(this.sun);
	};
	this.onPlanetClicked=function(event)
	{
		var target = event.srcElement || event.target;
		var a = target.getAttribute("planet-index");
		var galaxy  = model.get(Const.gameData).galaxy[this.galaxyX][this.galaxyY];
		var planet = galaxy.planets[a];
		console.log("PlanetData", GalaxyModel.getPlanetDetails(planet));
	};
	this.arrange=function()
	{
		Class._super(this,"arrange");
		if(this.sun)this.setSunPos();
	};
	this.setSunPos=function()
	{
		var size = Utensil.stageHeight() * 0.5; 
		this.sun.style.width  = size+"px";
		this.sun.style.height  = size+"px";
		this.sun.style.left = (-(size*0.5))+"px";
		this.sun.style.top = (-(size*0.5))+"px";
	}
	
};
Class.extend(PlanetView,UIElement);
