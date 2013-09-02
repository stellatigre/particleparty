#pragma strict

var rotationSpeed = 10.0f;

function Start () {

}

function Update () {
	transform.Rotate (0,  rotationSpeed* Time.deltaTime, 0);
}