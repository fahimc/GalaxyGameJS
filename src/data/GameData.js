var GameData = {
	init : function() {
		
		var total = Const.maxXCells * Const.maxYCells;
		var cellX = 0;
		var cellY = 0;
		for (var a = 0; a < total; a++) {
			this.createGalaxy(cellX, cellY);
			cellX++;
			if (cellX >= Const.maxXCells) {
				cellY++;
				cellX = 0;
			}
		}
		
		
	},
	createGalaxy : function(x,y) {
		var random = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
		if (random >10)
			return;
		//set n the number of planets
		var galaxies = model.get(Const.gameData).galaxy;
		var min = model.get(Const.galaxyData).minPlanets;
		var max = model.get(Const.galaxyData).maxPlanets;
		var containsSun = (Math.floor(Math.random() * (1 - 0 + 1)) + 0)==1?true:false;
		var galaxy = {
			planets : [],
			containsSun:containsSun
		};
		galaxy.numberOfPlanets = Math.floor(Math.random() * (max - min + 1)) + min;

		//store the new Galaxy in a new cell position
		if (!galaxies[x])
			galaxies[x] = [];
		galaxies[x][y] = galaxy;
		//create planets for the galaxy
		for (var a = 0; a < galaxy.numberOfPlanets; a++) {
			this.createPlanets(galaxy);
		}
		//console.log("galaxyData", galaxy);
	},
	createPlanets : function(galaxy) {
		// get planet types
		var planetsData = model.get(Const.planetsData);
		var planet = {
			resources : []
		};

		//set a random size
		random = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		var index = 1;
		for (var name in planetsData.size) {
			if (index == random) {
				planet.size = name;
				break;
			}
			index++;
		}

		//get a planet type
		var type = Math.floor(Math.random() * ((planetsData.planets.length - 1) - 0 + 1)) + 0;
		
		//remove habittable planets if no sun
		if(!galaxy.containsSun)
		{
			var habitable=true;
			while(habitable)
			{
				if(model.get(Const.planetsData).planets[type].habitable==false)
				{
					habitable=false;
				}else{
					type = Math.floor(Math.random() * ((planetsData.planets.length - 1) - 0 + 1)) + 0;
				}
			}
		}
		planet.type = type;
		
		//add resources
		if (model.get(Const.planetsData).planets[type].hasResource)
			this.createResources(planet);

		//add planet to galaxy
		galaxy.planets.push(planet);

		//console.log("PlanetData", GalaxyModel.getPlanetDetails(planet));
	},
	createResources : function(planet) {
		var resourceData = model.get(Const.resourcesData);
		var total = Math.floor(Math.random() * ((resourceData.max - 1) - 0 + 1)) + 0;

		var added = [];
		//store resources
		if (total == 0)
			return;
		while (planet.resources.length < total) {
			var type = Math.floor(Math.random() * ((resourceData.resources.length - 1) - 0 + 1)) + 0;
			if (!added[type]) {
				added[type] = true;
				planet.resources.push(type);
			}
		}
	}
}
