#pragma strict

var lineObject : GameObject;

private var rayLength : int;
private var offset: Vector3;
private var rayObj : GameObject;

function Start () {
	rayLength = 100;
	offset = Vector3(0,-2,-2);
	
}

function Update () {
	var mousePress = Input.GetMouseButton(0);
	var endPoint : Vector3;
	var spawnPoint : Vector3;
	
		// if we're already casting just move it 
	if (rayObj && mousePress){
		endPoint = Camera.main.ViewportToWorldPoint(Vector3(0.5, 0.5, 100));
		//endPoint = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		var rotateGoal = Quaternion.FromToRotation(Vector3.forward,  endPoint - gameObject.transform.position);
		spawnPoint = transform.position + offset;
		rayObj.transform.position = spawnPoint;
		rayObj.transform.rotation = rotateGoal;

	}	// if we're done casting bubbles 
	else if (rayObj != null && mousePress == false) {
		rayObj.particleSystem.emissionRate = 0;
		// destroy rayObj after 1.5 seconds.  
		Destroy(rayObj, 1); 
	}  
		//cast dem bubbles
	else if (mousePress == true  && rayObj == null){ 
		Destroy(rayObj);
		spawnPoint = transform.position + offset;
		rayObj = GameObject.Instantiate(lineObject, spawnPoint, transform.rotation); 
		rayObj.transform.rotation = gameObject.transform.rotation;
	}
	else {
		Destroy(rayObj, 1);
	}
}
