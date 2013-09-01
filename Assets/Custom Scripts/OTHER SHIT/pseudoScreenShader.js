#pragma strict

var screenMat : GameObject ;
var ourScreen : GameObject ;
var mainCam   : GameObject ;

function Start () {

	mainCam = GameObject.Find("Main Camera");
	var modPosition = mainCam.transform.position;
	modPosition.z = modPosition.z-.1;
	
	var modRotation = mainCam.transform.rotation;
	modRotation.z = 90;
	
	ourScreen = GameObject.Instantiate(screenMat, modPosition, modRotation);
	ourScreen.transform.parent = gameObject.transform ;
}

function Update () {
	//var newRotation = Camera.main.transform.rotation;
	//newRotation.x = newRotation.x + 90;
	//ourScreen.transform.LookAt(transform.position + newRotation * Vector3.back, newRotation * Vector3.up);
	//ourScreen.transform.rotation.x = ourScreen.transform.rotation.x + 90 ;
	//ourScreen.transform.position = Camera.main.ViewportToWorldPoint(Vector3(0.5, 0.5, .05));
	//ourScreen.transform.rotation.z = gameObject.transform.rotation.z-90;
	//ourScreen.transform.rotation.y = gameObject.transform.rotation.y;
	//ourScreen.transform.rotation.x = gameObject.transform.rotation.x;
}
