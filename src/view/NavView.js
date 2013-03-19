var NavView=function(){
	this.ON_GALAXY_BUTTON_CLICKED="ON_GALAXY_BUTTON_CLICKED";
	this.showGalaxies;
	this.build=function()
	{
		Class._super(this,"build");
		this.showGalaxies = new Image();
		this.showGalaxies.src = ResourceManager.getAssetByName("galaxyButton").src;
		this.showGalaxies.style.position="absolute";
		this.showGalaxies.style.right="0";
		
		this.addChild(this.showGalaxies);
		
		Utensil.addListener(this.showGalaxies,"click",this.createHandler(this,"backToGalaxy"));
		
	};
	this.backToGalaxy=function()
	{
		Event.dispatch(this,this.ON_GALAXY_BUTTON_CLICKED);
	};
	this.arrange=function()
	{
		Class._super(this,"arrange");
		this.width(Utensil.stageWidth());
	}
	
};
Class.extend(NavView,UIElement);
