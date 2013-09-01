#pragma strict

// objects to spawn
var basePlatform : GameObject;
var elevPlatform : GameObject;
var blazPlatform : GameObject;

// controls
var spawnPoints  : Vector3[];
var numPlatforms : int = 42;
var spreadDist   : int;  

function getRandomPoint() {
	// y is taller for a cylinder shape
	var rX = Random.Range(-200, 200);
	var rZ = Random.Range(-200, 200);
	var rY = Random.Range(-2000, 2000);
	
	var newPoint = new Vector3(rX, rY, rZ);
	Debug.Log('getRandomPoint() = '+newPoint);
	return newPoint;
}

function checkDistance(point : Vector3) {
	var spawnHere : boolean;
	var p: int;
	
	// make sure we place the first one
	if (spawnPoints.length == 0) {spawnHere = true;}
	
	for (p=0 ; p==spawnPoints.length ; p++) {
		// check each point to make sure we're not spawning near another
		if (Vector3.Distance(spawnPoints[p], point) < spreadDist) {spawnHere = false;}
		else {spawnHere = true;}
	}
		
	return spawnHere;	
}

// wrapper to repeat checkDistance until we get a good point
function findGoodPoint(){
	var sPoint : Vector3 = getRandomPoint();
	while (checkDistance(sPoint) == false) {
		sPoint = getRandomPoint();
		Debug.Log('first point no good, new point is : '+sPoint);
	}
	return sPoint;
}

function Awake() { 
	var n : int;
	for (n=0; n == numPlatforms; n++) {
		Debug.Log('n : ' +n);
		
		var spawnPoint : Vector3 = findGoodPoint();
		spawnPoints[n] = spawnPoint;
		
		Debug.Log(spawnPoint);
		GameObject.Instantiate(basePlatform, spawnPoint, Quaternion.identity);
	}	
}

function Start () {

}

function Update () {

}