#pragma strict

var variance : int = 50;
private var orbCenter : Vector3;
private var speed : float;

function Start () {	
	orbCenter.y = gameObject.transform.position.y;
	orbCenter.x = Random.Range(-variance, variance);
	orbCenter.z = Random.Range(-variance, variance);
	speed = (Random.Range(0.875, 1.125))*20;
}


function Update () {
	gameObject.transform.RotateAround (orbCenter, Vector3.up, speed * Time.deltaTime);
}