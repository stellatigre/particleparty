#pragma strict

private var collisionEvents = new ParticleSystem.CollisionEvent[16];
private var power = 40;
private var mouseForceMod : int = 1;
private var newColor : Color;

function Start() {

}

function colorShiftTarget(hitObj : GameObject) {
	if (hitObj.renderer) {
		var colorType : String; 
		var mat : Material = hitObj.renderer.material;
		
		if (mat.HasProperty("_Color")) {colorType="_Color";}
		else if (mat.HasProperty("_TintColor")) {colorType="_TintColor";}
		
		var origColor = mat.GetColor(colorType);
			// red shift, blue shift
		if (Input.GetMouseButton(1)==false){
			newColor = Color(origColor.r+.02f, origColor.g-.02f, origColor.b-.02f, origColor.a);
		} else {
			newColor = Color(origColor.r-.02f, origColor.g-.02f, origColor.b+.02f, origColor.a);
		}
		mat.SetColor(colorType, newColor);
	}
}

function OnParticleCollision(other : GameObject) {	
	// get collision events for the gameObject that the script is attached to
	var numCollisionEvents = gameObject.particleSystem.GetCollisionEvents(other, collisionEvents);
	// apply some force to RigidBody components
	for (var i = 0; i < numCollisionEvents; i++) {
		if (other.rigidbody) {
			// mouseForceMod determines direction
			var force = mouseForceMod*(collisionEvents[i].velocity * power);
			other.rigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;
			other.rigidbody.AddForce(force);

			// handles the color shifting.
			colorShiftTarget(other);
		}
	}
}

function Update() {
	// get mouse state to use elsewhere
	if (Input.GetMouseButton(1) == true) {mouseForceMod = -1;}
	else {mouseForceMod = 1;}
}