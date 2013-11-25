#pragma strict


private var fwd ;
var hit : RaycastHit;
;
function aimSelector() {
	var endPoint = Camera.main.ViewportToWorldPoint(Vector3(0.5, 0.5, 50));
	var rotateGoal = Quaternion.FromToRotation(Vector3.forward,  endPoint - gameObject.transform.position);
	//rayObj.transform.position = holdPoint;   //keep it pointing right in 
	//rayObj.transform.rotation = rotateGoal;	 //the middle of the screen
}


function Start () {

}

function FixedUpdate () {
	if (Input.GetKey('y')){
		if(Physics.Raycast(transform.position, Vector3.forward, 75)) { 
			Debug.Log(transform.position);
		
		}
         //RaycastHit.collider;

        
         Debug.Log(hit.collider.gameObject.name);
	}
}


