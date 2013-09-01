#pragma strict

private var collisionEvents = new ParticleSystem.CollisionEvent[16];
private var power = 40;
private var direction = 1;
var newColor : Color;

function OnParticleCollision(other : GameObject) {
	if (Input.GetMouseButton(1) == true) {direction = -1;}
	else {direction = 1;}
	
	// get collision events for the gameObject that the script is attached to
	var numCollisionEvents = gameObject.particleSystem.GetCollisionEvents(other, collisionEvents);
	
	// apply some force to RigidBody components
	for (var i = 0; i < numCollisionEvents; i++) {
		if (other.rigidbody) {
			//other.rigidbody.collisionDetectionMode = CollisionDetectionMode.Continuous ;
			var force = direction*(collisionEvents[i].velocity * power);
			other.rigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;
			other.rigidbody.AddForce(force);
			
			// handles the color shifting.
			if (other.renderer) {
				var colorType : String; 
				var mat = other.renderer.material;
				
				if (mat.HasProperty("_Color")) {colorType="_Color";}
				else if (mat.HasProperty("_TintColor")) {colorType="_TintColor";}
				else {Debug.Log(mat);}
			
				var origColor = mat.GetColor(colorType);
				
				// red shift, blue shift
				if (Input.GetMouseButton(1)==false){
					newColor = Color(origColor.r+.02f, origColor.g-.02f, origColor.b-.02f, origColor.a);
				} else {
					newColor = Color(origColor.r-.02f, origColor.g-.02f, origColor.b+.02f, origColor.a);
				}
				other.renderer.material.SetColor("_TintColor", newColor);
			}
		}
	}
}