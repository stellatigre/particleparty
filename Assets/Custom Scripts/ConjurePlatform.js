#pragma strict

// platforms we can instantiate, hookup in inspector
var plainPlatform : GameObject;
var orbitPlatform : GameObject;
// a pretty much blank GameObject, copy is used for playing SFX at a pitch
var audioShellObject : GameObject;
var audioShellCopy   : GameObject;
// particle systems for effects
var successParticles : GameObject; 
var castFailParticles: GameObject;
// sounds for effects
var castFailureSound : AudioClip;
var castSuccessSound : AudioClip;
var castTooFastSound : AudioClip;
//list contain key-values for platform casting
//var keyList = new List.<Object>();
//keyList.Add(['e', plainPlatform]);
//keyList.Add(['r', rotatePlatform]);			IDEALISTIC REFACTOR.  NOT REALITY YET.

private var CC : CharacterController;
private var failCloud : GameObject;
private var castCloud : GameObject;
// keepin' track of state / what's allowed
private var lastCastFailTime : float = 0;
private var lastCastTime : float;
private var castCoolDown : int = 5;
private var clipVolume   : float = 1;
private var timeSinceCast: float = 0;

// directional stuff
private var pPos : Vector3;
private var offset = Vector3(0, -3, 10);
// wider than they are tall, for conjuring platforms
private var castCheckRays : Vector3[] = [Vector3.down, Vector3.up, Vector3.left*2, 
										 Vector3.right*2, Vector3.back*2, Vector3.forward*2];

function Start () {
	pPos = gameObject.transform.position;
	CC = gameObject.GetComponent(CharacterController);
	audioShellCopy = GameObject.Instantiate(audioShellObject);
}


// Needed the ability to have random pitch variations.
function playClipWithPitch(clip : AudioClip, clipPos: Vector3, volume : float){
 	var obj = audioShellCopy;
 																// functions much like PlayClipAtPoint
 	obj.audio.clip = clip;										// except with randomized pitch
    obj.transform.position = clipPos;							
    obj.audio.pitch = Random.Range(0.9, 1.1);				
    															
    obj.audio.PlayOneShot(clip, volume);						// play sound
     
    yield WaitForSeconds((clip.length / obj.audio.pitch)+.1);
    obj.audio.clip = null;   // get rid of our Clip
}


function failCloudManager() {
// play clip louder if the last cast was sooner, we have a 5-second window
	if (timeSinceCast < 5) {
		clipVolume = (1/(timeSinceCast/2)+.1);
	}
	playClipWithPitch(castFailureSound, pPos + offset, clipVolume);		// plays the sound
	
	if (failCloud != null){
		failCloud.transform.position = pPos + offset;					// does the failCloud already exist ?
		failCloud.particleSystem.Play();								// let's just move/restart it, then
	} 
	else if (failCloud == null){  // failCloud doesn't exist yet?...create it!
		failCloud = GameObject.Instantiate(castFailParticles, pPos, Quaternion.identity);
	}	
	lastCastFailTime =  Time.time;	
}


//handles cases of cast failure arising from checkCast
function castFail() {
	var timeSinceFail : float = Time.time-lastCastFailTime;
	
	//if more than a second since last cast fail, pass off this to another func
	if (timeSinceFail > 1) {
		failCloudManager();
	} // next scenario occurs if you last failed a cast less than a second ago
	else { 
		clipVolume = 1-(timeSinceFail/2);								// play it louder if it's been very litte time
		playClipWithPitch(castTooFastSound, pPos + offset, clipVolume);
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
			}
		}   
	}  //did we hit anything ?
	return anyHits;
}


// on success of checkCast, instantiate thing w/ sound & particle effects
function makePlatform(prefab : GameObject) {
	
	playClipWithPitch(castSuccessSound, pPos + offset, .67);
	// this GameObject is particle effects - create them if not created yet
	if (castCloud == null){
		castCloud = GameObject.Instantiate(successParticles, pPos + offset, transform.rotation);
	} 
	else { // move it if already created
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
		if(CC.isGrounded == false) {
			timeSinceCast = Time.time-lastCastTime;
		// we allow a cast every 5 seconds - check timer
			if (timeSinceCast >= castCoolDown) {
				// is the spawn point close (2 units) to a platform? fail if so.
				if (xyzRaycast(3)==false) {
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

}


function logCrawl () {
	//Debug.Log('ray cast to : '+castCheckRays[d]+' is false');
	//Debug.Log('clipVolume : '+clipVolume);
	//Debug.Log('Time since cast : '+timeSinceCast);
	//Debug.Log('moving castCloud');		
	//Debug.Log('moving failCloud');
	//Debug.Log('grounded : '+CC.isGrounded);
	//Debug.Log('audioClip at pitch'+obj.audio.clip);
    //Debug.Log('audio.clip pitch'+obj.audio.pitch);
	//Debug.Log('is audio playing ? '+obj.audio.isPlaying);
}

//audio.PlayClipAtPoint(castSuccessSound, pPos + offset);