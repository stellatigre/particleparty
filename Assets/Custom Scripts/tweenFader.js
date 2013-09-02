#pragma strict
import Holoville.HOTween;

var xFadeLength : float = 1.25;									// controls tween duration - 1 sec
var inTweenParms  : TweenParms;
var outTweenParms : TweenParms;

private var lMouse  : boolean;									// left mouse pressed down ?
private var rMouse 	: boolean;									// left mouse pressed down ?
private var xFading : boolean;									// are we already crossfading ?
private var fadedOut: boolean;

private var pushSrc : AudioSource; 								// casting the 2 Audiosources
private var pullSrc : AudioSource;								// that are on our lineObj
private var pushVol : float;
private var pullVol : float;  														

inTweenParms  = TweenParms().Prop("volume", 0.6f); 			// Property: volume, go to 0.67f
outTweenParms = TweenParms().Prop("volume", 0.0f); 				// Property: volume go to 0.0f
//upParticleParms = TweenParms().Prop("emissionRate", 50);

function Start () {
	HOTween.Init(true, true, true);
	HOTween.EnableOverwriteManager(true);
	//var deezParticles = gameObject.GetComponent(ParticleSystem);
	var audioSources = gameObject.GetComponents(AudioSource);
	pushSrc = audioSources[0];  								// order isn't guaranteed, but
	pullSrc = audioSources[1];  								// it seems to be stable.

	pushSrc.volume = .6;											// we default to pushing,
	pullSrc.volume = 0;											// since that happens before pulls
}

function decideAction() {
	if (lMouse && xFading == false) {							// left mouse starts the bubble beam
		if (rMouse && pullVol < pushVol) {						// right mouse turns it from push to pull 
			xFading = true ;									// so, we check to see if the pull sound
			crossFade(true); 									// is quieter than the push																			
		}														
		else if (rMouse == false && pullVol > pushVol) {		// no right mouse down, & pull is louder 
			xFading = true ;
			crossFade(false);									// so let's head towards the pushing sound									
		}
		else if (fadedOut == true) {							// come back from nothingnes !
			fadeIn();
		}
	}
	else if (rMouse==false && lMouse==false && xFading==false){ // go away for now, bubbles!
		fadeOut(); 
	}
	else if (lMouse && xFading) {								// stub
		// stub case - a small paricle effect / sound 
		// ( A tiny 'pop' most likely)
		// goes here to indicate that
		// you need to slow your roll a little.
	}
}

function Update () {
	rMouse = Input.GetMouseButton(1);    						// get mouse states 
	lMouse = Input.GetMouseButton(0);       					// to use elsewhere
	
	pushVol = pushSrc.volume;									// just for convenience
	pullVol = pullSrc.volume;

	decideAction();												// This function decides action based on conditional
}

// pass in whether we're pulling
function crossFade (pull : boolean) {
	if (pull == true) {											// This set tweens to the pulling sound
		HOTween.To(pullSrc, xFadeLength, inTweenParms);			
		HOTween.To(pushSrc, xFadeLength, outTweenParms);
	}
	else {  													// This set tweens to the pushing sound
		HOTween.To(pushSrc, xFadeLength, inTweenParms);
		HOTween.To(pullSrc, xFadeLength, outTweenParms);
	}
	xFading = false;											// theoretically done with tween here
}

function fadeOut () {											// lowers both volumes to 0
	HOTween.To(pullSrc, xFadeLength, outTweenParms);
	HOTween.To(pushSrc, xFadeLength, outTweenParms);
	fadedOut = true;
}

function fadeIn () {
	HOTween.To(pullSrc, xFadeLength/2, inTweenParms);			// fade in twice as fast to be 
	HOTween.To(pushSrc, xFadeLength/2, inTweenParms);			// more responsive to player action
	fadedOut = false;
}

function logCrawl () {											// Never let this fire in gameplay.
	//Debug.Log('pushVol : '+pushVol);							// It's just so i don't have to delete 
	//Debug.Log('pullVol : '+pullVol);							// useful logging info every time i'm 
	//Debug.Log('xfading : '+xFading); 							// 'done' debugging. :)
	//Debug.Log('rightMouse  : '+rMouse);
	//Debug.Log('leftMouse   : '+lMouse);
}