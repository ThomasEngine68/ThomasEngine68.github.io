var staticLevels = [
	[{
		dimensionCount: 1,
		mazeSize: [5],
		forceBackTrack: false,
		wallChance: 0.0,
	}],
	[{
		dimensionCount: 2,
		mazeSize: [5, 5],
		forceBackTrack: false,
		wallChance: 0.5,
	}, {
		dimensionCount: 2,
		mazeSize: [7, 7],
		forceBackTrack: true,
		wallChance: 0.57,
	}],
	[{
		dimensionCount: 3,
		mazeSize: [5, 5, 5],
		forceBackTrack: true,
		wallChance: 0.6,
	}, {
		dimensionCount: 3,
		mazeSize: [6, 6, 6],
		forceBackTrack: true,
		wallChance: 0.65,
	}, {
		dimensionCount: 3,
		mazeSize: [7, 7, 7],
		forceBackTrack: true,
		wallChance: 0.7,
	}],
	[{
		dimensionCount: 4,
		mazeSize: [4, 4, 4, 4],
		forceBackTrack: true,
		wallChance: 0.6,
	}, {
		dimensionCount: 4,
		mazeSize: [5, 5, 5, 5],
		forceBackTrack: true,
		wallChance: 0.65,
	}, {
		dimensionCount: 4,
		mazeSize: [6, 6, 6, 6],
		forceBackTrack: true,
		wallChance: 0.7,
	}],
	[{
		dimensionCount: 5,
		mazeSize: [4, 4, 4, 4, 4],
		forceBackTrack: true,
		wallChance: 0.7,
	}, {
		dimensionCount: 5,
		mazeSize: [5, 5, 5, 5, 5],
		forceBackTrack: true,
		wallChance: 0.72,
	}, {
		dimensionCount: 5,
		mazeSize: [6, 6, 6, 5, 5],
		forceBackTrack: true,
		wallChance: 0.75,
	}],
	[{
		dimensionCount: 6,
		mazeSize: [4, 4, 4, 4, 3, 3],
		forceBackTrack: true,
		wallChance: 0.75,
	},
	{
		dimensionCount: 6,
		mazeSize: [5, 4, 4, 4, 4, 4],
		forceBackTrack: true,
		wallChance: 0.77,
	},
	{
		dimensionCount: 6,
		mazeSize: [5, 5, 5, 5, 4, 4],
		forceBackTrack: true,
		wallChance: 0.77,
	}],
]

function getLevelName(i1, i2){
	return "Level" + (i1 + 1) + "." + (i2 + 1)
}

function getNextLevelFromName(levelName){
		var nextLevel = null;
		var i1 = parseInt(levelName.substring(5, 6));
		var i2 = parseInt(levelName.substring(7, 8));
		var levelArray = staticLevels[i1 - 1];
		if(levelArray.length > i2) {
			nextLevel = {level : levelArray[i2], name: getLevelName(i1 - 1, i2)}
		}
		else if(staticLevels.length > i1) 
		{
			nextLevel =  {level : staticLevels[i1][0], name: getLevelName(i1, 0)};
		}
		return nextLevel;
}