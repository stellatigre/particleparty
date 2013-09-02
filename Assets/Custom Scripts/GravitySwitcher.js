#pragma strict


private var pcm : CharacterMotor;
private var switchedTime : float;
private var switched : boolean;
private var pManager : PlatformManager;

function Start () {
	pcm = gameObject.GetComponent(CharacterMotor);
}

function Update () {

}

function OnControllerColliderHit(hit:ControllerColliderHit){	
	if (hit.gameObject.tag == "gravity switch" && (Time.time-switchedTime > 30)) {
	pManager = hit.gameObject.GetComponent(PlatformManager);
	
	// player gravity and regular are different
	Physics.gravity = -(Physics.gravity);
	pcm.movement.gravity = -(pcm.movement.gravity);
	var pY = gameObject.transform.rotation.y;
	gameObject.transform.rotation.y = Mathf.Lerp(pY, -pY, 1);
	
	// keepin' track
	switchedTime = Time.time;
	switched = true;
	
	// switch colors
	pManager.greenLevel = 0;
	pManager.redLevel = 88;
	pManager.blueLevel = 0;
	Debug.Log('whoop');
	}
}