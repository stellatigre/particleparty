#pragma strict

var particleObj : GameObject;
var particlePos : Vector3;

var playerObj : GameObject;
var playerPos : Vector3;


function Start () {

	// Here we hook up our Player and particle object references
	playerObj = GameObject.Find("Player");
	particleObj = GameObject.Find("Warp Fountain");
}

function Update () {
	
	// where you at, dawg ?
	playerPos = playerObj.transform.position ;

	// where da particles be ?
	particlePos = particleObj.transform.position ;
	
	// speed of particles ?	
	var pSpeed = particleObj.particleSystem.playbackSpeed ;
	
	//how far are we apart?
	var distance = Vector3.Distance(playerPos , particlePos); 
	Debug.Log(distance);
	var pSys = particleObj.particleSystem ;
	// set particle properties based on distance
	if (distance >= 6) {
		pSys.playbackSpeed = (1 + (1.1*(pSpeed / (distance/6))));
		pSys.gravityModifier = (0 + (1 / (distance/30)));
		pSys.startSize = (0.5 + (0.5 / (distance/6)));
		pSys.emissionRate = (200 + (200 - (distance*4)));
	}			
}