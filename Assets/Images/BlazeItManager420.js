#pragma strict

var audioObj : GameObject;

private var audioData: AudioSource;
private var blazeIt : boolean;
private var blazeFactor: float = 0.75;
private var howHigh: float;

function Start () {
		audioObj = GameObject.Find("Main Camera");
		audioData = audioObj.audio;
		howHigh = 0;
}

function OnControllerColliderHit(hit:ControllerColliderHit){	
	if (hit.gameObject.tag == "420") { blazeIt = true; } 
	else { blazeIt = false; }
}

function Update () {
	// handles audio & time pitch down & up
	if (audioData) {
		// clamp that shit
		if (audioData.pitch < blazeFactor) {audioData.pitch = blazeFactor;}
		else if (audioData.pitch > 1) {audioData.pitch = 1;}
		
		if (Time.timeScale < blazeFactor) {Time.timeScale = blazeFactor;}
		else if (Time.timeScale > 1) {Time.timeScale = 1;}
		
		// Should we go down ?
		if (blazeIt == true && audioData.pitch >= blazeFactor) {
			//Time.timeScale = Mathf.Lerp(1, blazeFactor , 5);
			audioData.pitch -= 0.00175;
			if (Time.timeScale > blazeFactor) {
				Time.timeScale -= 0.00175;
			}
			if (howHigh < 0.0024){
				howHigh += 0.00000020;
			}
		} // should we go back up ?
		else if (blazeIt == false && audioData.pitch < 1) {
			// we go faster up , slowed by how long they've been blazin'
			audioData.pitch += (0.0025 - howHigh);
			if (Time.timeScale < 1) {
				Time.timeScale += (0.0025 - howHigh);
			}
		//Time.timeScale = Mathf.Lerp(blazeFactor, 1 , 5);
		}	
	blazeIt = false;
	}
	// wtf how did we even get here?   
	else { 
		Start(); 
	}
}

//Debug.Log('timescale: '+Time.timeScale);
//Debug.Log('blazeIt = '+blazeIt);
//Debug.Log('pitch : '+audioData.pitch);	
//Debug.Log('howHigh : '+howHigh);