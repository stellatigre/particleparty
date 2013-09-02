#pragma strict

var lineObject : GameObject;										// our bubble laser prefab goes here
private var rayObj : GameObject;									// this becomes our instance of the prefab
private var rayLength : int = 100;
private var offset: Vector3 = Vector3(0,-2,0);
private var endPoint : Vector3;
private var holdPoint : Vector3;

function Start () {
	
}

function aimBubbles () {
	endPoint = Camera.main.ViewportToWorldPoint(Vector3(0.5, 0.5, 100));
	var rotateGoal = Quaternion.FromToRotation(Vector3.forward,  endPoint - gameObject.transform.position);
	rayObj.transform.position = holdPoint;   //keep it pointing right in 
	rayObj.transform.rotation = rotateGoal;	 //the middle of the screen
}

// it's a power switch for your bubble gun
function bubbleSwitch (active : boolean) {
	if (active == true) {
		rayObj.particleSystem.emissionRate = 30;
		rayObj.renderer.enabled = true;
		rayObj.audio.volume = 1; 
	}
	else {
		rayObj.particleSystem.emissionRate = 0;
		rayObj.renderer.enabled = false;
		rayObj.audio.volume = 0; 
	}
}

function Update () {
	var mousePress = Input.GetMouseButton(0);

	// hold this bubble-beam out to the right and down a bit.
	holdPoint = transform.position + offset + Vector3.right*3 ;
	
	// we don't have a rayObj yet.  make it !
	if (rayObj == null && mousePress == true) {
		rayObj = GameObject.Instantiate(lineObject, holdPoint, transform.rotation); 
		rayObj.transform.parent = gameObject.transform; // a new child <3<3<3
	}  
	else if(rayObj != null && rayObj.renderer.enabled == true && mousePress) {
		aimBubbles();        // already casting, just aim
	}		 
	else if (rayObj != null && rayObj.renderer.enabled == false && mousePress){
		bubbleSwitch(true);  // if we've already casted one just re-enable it
	}	
	else if (rayObj != null && mousePress == false) {
		bubbleSwitch(false); // if we're done casting bubbles, turn them off
	}    
}
