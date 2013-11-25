import System.Collections.Generic;

var audioPool : List.<GameObject> = new List.<GameObject>();
var audioBase : GameObject;
private var poolSize : int = 20;									// 20 sounds at once

var poolObj : GameObject;
var picoPops : AudioClip[];

function getChildObjects(rootObj : String, childString: String) {

}


function Start () {
	
	var aTransform : Transform;
	
	var poolContainer = GameObject.Find("Sound Pool");
	
	var audioCCs = GetComponentsInChildren(AudioSource);
	var counter : int;
	for (counter = 0; counter <= poolSize ; counter++) {			// makin a bunch of empty GameObjects to use 
		var newShell = GameObject.Instantiate(audioBase);			// as a pool for playing sounds with pitch
		audioPool.Add(newShell);
	}
}

function notPlaying(GO : GameObject) {
	return (GO.audio.isPlaying == false);
}

function getClipObj() { 
	var index = Random.Range(0, audioPool.Count);
	
	var obj =  audioPool[index];
	return obj;	
}

function randPitch(a : AudioClip){

}

function playPitchedClip(clip : AudioClip, clipPos: Vector3, volume : float, pitchVar: float) {
 	var obj = getClipObj();
															// functions much like PlayClipAtPoint
 	obj.audio.clip = clip;									// except with randomized pitch
    //obj.transform.position = clipPos;	
    obj.transform.position = gameObject.transform.position;
    obj.audio.volume = 	volume;
    obj.audio.pitch = Random.Range(1-pitchVar, 1+pitchVar);	// pass in variance in pitch, either direction														
    obj.audio.Play();										// play sound
    
    yield WaitForSeconds((clip.length / obj.audio.pitch));	    
	// if audio is done, get rid of our Clip
    audioPool.Add(obj);
	
}