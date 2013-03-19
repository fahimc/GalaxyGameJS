var GalaxyModel =
{
	getPlanetDetails:function(planet)
	{
		var type = planet.type;
		var item={size:planet.size,resources:[]};
		var data = model.get(Const.planetsData).planets[type];
		for(var name in data)
		{
			item[name] = data[name];
		}
		
		for(var a=0;a<planet.resources.length;a++)
		{
			data = model.get(Const.resourcesData).resources[a];
			item.resources.push(data);
		}
		
		return item;
	}
}
