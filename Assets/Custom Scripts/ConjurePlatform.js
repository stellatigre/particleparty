#pragma strict

// platforms we can instantiate, hookup in inspector
var plainPlatform : GameObject;
var orbitPlatform : GameObject;
var elevPlatform  : GameObject;
// particle systems for effects
var successParticles : GameObject; 
var castFailParticles: GameObject;
// sounds for effects
var castFailureSound : AudioClip;
var castSuccessSound : AudioClip;
var castTooFastSound : AudioClip;

// keepin' track of state / what's allowed
private var CC : CharacterController;
private var failCloud : GameObject;
private var castCloud : GameObject;
private var lastCastFailTime : float = 0;
private var lastCastTime : float;
private var castCoolDown : int = 5;
private var timeSinceCast : float;

// directional stuff
private var pPos : Vector3;
private var offset = Vector3(0, -3, 10);
//private var particleOffset = Vector3(0, -2 , 1);
// wider than they are tall, for conjuring platforms
private var castCheckRays : Vector3[] = [Vector3.down, Vector3.up, Vector3.left*2, Vector3.right*2, Vector3.back*2, Vector3.forward*2];

function Start () {
	pPos = gameObject.transform.position;
	CC = gameObject.GetComponent(CharacterController);
}

function playClipWithPitch(clip : AudioClip){
 	var obj = new GameObject();
    obj.transform.position = pPos + offset;
    obj.AddComponent('AudioSource');
    obj.audio.pitch = Random.Range(0.875, 1.125);
    obj.audio.PlayOneShot(clip);
    Destroy (obj, clip.length / obj.audio.pitch);
    return obj;
}

//handles all cases of cast failure arising from checkCast
function castFail() {
	var clipVolume: float = 1;
	var timeSinceFail : float = Time.time-lastCastFailTime;
	
	//if more than a second since last cast fail, play normal fail sound
	if (timeSinceFail > 1) {
		// play clip louder if last cast sooner, we have a 5-second window
		//if (timeSinceCast < 5) {
		//	clipVolume = (1/(timeSinceCast/2));
			//Debug.Log('clipVolume : '+clipVolume);
		//}
		audio.PlayClipAtPoint(castFailureSound, pPos, clipVolume);
		
		// does the failCloud already exist ? let's just move/restart it
		if (failCloud != null){
			//Debug.Log('moving failCloud');
			failCloud.transform.position = pPos + offset;
			failCloud.particleSystem.Play();
		} // failCloud doesn't exist yet, create it
		else if (failCloud == null){
			failCloud = GameObject.Instantiate(castFailParticles, pPos, Quaternion.identity);
		}	
		lastCastFailTime =  Time.time;
	} // next is if you last failed a cast less than a second ago
	else { // play it louder if it's been very litte time
		//clipVolume = 1-(timeSinceFail/2);
		audio.PlayClipAtPoint(castTooFastSound, pPos, clipVolume);
	}
}

function xyzRaycast(distance : float) {
// CheckSphere always collided - this one just does the 6 cardinal directions in 3D -
	var anyHits : boolean = false;
	// cast in six directions, fail if any hit
	for (var d = 0 ; d < 6 ; d++) { 
		if (anyHits == false) {
			if (Physics.Raycast(pPos + offset, castCheckRays[d], distance)) {
				anyHits = true;
				//Debug.Log('ray cast to : '+castCheckRays[d]+' is false');
			}
		}   
	}
	//Debug.Log('raycast origin : '+(pPos+offset));
	//Debug.Log('Any Raycasting hits : '+anyHits);
	return anyHits;
}

// on success of checkCast, instantiate thing w/ sound & particle effects
function makePlatform(prefab : GameObject) {
	audio.PlayClipAtPoint(castSuccessSound, pPos + offset);
	// particle effects - create if not created yet
	if (castCloud == null){
		castCloud = GameObject.Instantiate(successParticles, pPos + offset, transform.rotation);
	} 
	else { // move if already created
		//Debug.Log('moving castCloud');
		castCloud.transform.position = pPos + offset;
		castCloud.particleSystem.Play();
	}
	// actual platform being made
	GameObject.Instantiate(prefab, pPos + offset, Quaternion.identity);
	// keepin' track
	lastCastTime = Time.time;
}

// listens for keypresses and checks conditions
// gObject is the prefab to make on successful cast
function checkCast(key : String, gObject : GameObject) {	
// did we press this key ?	adjust offset if so
	if(Input.GetKeyDown(key)) {
		offset = transform.forward*6; offset.y = -2;
		// are we in the air ? fail if not.
		//Debug.Log('grounded : '+CC.isGrounded);
		if(CC.isGrounded == false) {
			timeSinceCast = Time.time-lastCastTime;
		// we allow a cast every 5 seconds - check timer
			//Debug.Log('Time since cast : '+timeSinceCast);
			if (timeSinceCast >= castCoolDown) {
				// is the spawn point close (2 units) to a platform? fail if so.
				if (xyzRaycast(2)==false) {
					// if not, cool, instantiate the platform w/ effects, & reset cast timer 
					makePlatform(gObject); 
				} 
				else {castFail();}
			}
			else {castFail();} 
		}
		else {castFail();}
	}
}

function Update () {
	// shall we do anything ?
	pPos = gameObject.transform.position;
	checkCast('e', plainPlatform);
	checkCast('r', orbitPlatform);
	//checkCast('g', elevPlatform);
}