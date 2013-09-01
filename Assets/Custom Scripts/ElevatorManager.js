#pragma strict

private var elevator: GameObject; 
private var elevatorUp : boolean; 
private var eBody : Rigidbody;
var speed : float = 10;
private var origPos : Vector3;
private var newPos : Vector3;
private var playerMass : float;

private var constraintList =   (RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ | 
    					        RigidbodyConstraints.FreezePositionX | RigidbodyConstraints.FreezePositionZ ); 
   
function Start () {
	origPos = transform.position ;
}

function OnControllerColliderHit(hit:ControllerColliderHit){	
    if (hit.gameObject.tag == "elevator") {
    	elevator = hit.gameObject; eBody = elevator.rigidbody;
    	// unfreezes the Y position constraint and freezes X and Z so we can go straight up
    	if (elevatorUp == false) {
    		eBody.constraints = constraintList;
    	}
    	// move, i say
    	elevatorUp = true;
 	} 
}

function FixedUpdate () {
	if (elevator != null){
		if (elevatorUp) {
			eBody.AddRelativeForce(Vector3.up * speed * eBody.mass);
		}
		else {
			newPos = elevator.transform.position;
			if (newPos.y > origPos.y) {
				eBody.useGravity = true;
			} else {
				eBody.useGravity = false;
				eBody.constraints = RigidbodyConstraints.FreezePositionY;
			}
		}
		elevatorUp = false;
	}
}