#pragma strict

var selectedPlatform : GameObject;
var CC: CharacterController;

function Start () {
	CC = gameObject.GetComponent(CharacterController);
}

function Update () {

	// right mouse button, grounded
	//if (Input.GetMouseButton(1) && CC.isGrounded) {
	//	Physics.Raycast
	//}
}