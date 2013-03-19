var GalaxyView=function(){
	this.ON_GALAXY_CLICKED="ON_GALAXY_CLICKED";
	this.build=function()
	{
		Class._super(this,"build");
		
		var total = Const.maxXCells * Const.maxYCells;
		var cellX = 0;
		var cellY = 0;
		for (var a = 0; a < total; a++) {
			if(model.get(Const.gameData).galaxy[cellX] && model.get(Const.gameData).galaxy[cellX][cellY])
			{
				this.buildGalaxy(model.get(Const.gameData).galaxy[cellX][cellY],cellX,cellY);
			}
			cellX++;
			if (cellX >= Const.maxXCells) {
				cellY++;
				cellX = 0;
			}
		}
		
		
	};
	this.buildGalaxy=function(galaxy,x,y)
	{
		var cellWidth  =Math.round(Utensil.stageWidth()/Const.maxXCells);
		var img = new Image();
		img.src = ResourceManager.getAssetByName("galaxy").src;
		img.style.position="absolute";
		img.style.width  = cellWidth+"px";
		img.style.height  = cellWidth+"px";
		img.style.top = (x * cellWidth)+"px";
		img.style.left = (y * cellWidth)+"px";
		img.setAttribute("galaxy-x",x);
		img.setAttribute("galaxy-y",y);
		
		Utensil.addListener(img,"click",this.createHandler(this,"onGalaxyClicked"));
		
		this.addChild(img);
	};
	this.onGalaxyClicked=function(event)
	{
		var target = event.srcElement || event.target;
		var x = target.getAttribute("galaxy-x");
		var y = target.getAttribute("galaxy-y");
		console.log(model.get(Const.gameData).galaxy[x][y]);
		
		Event.dispatch(this,this.ON_GALAXY_CLICKED,null,{x:x,y:y});
	}
	
	
};
Class.extend(GalaxyView,UIElement);
