#pragma strict
/*
// cast variables
var audioObj : GameObject;
var pulse : AudioManager;
var redLevel   : int;
//var redChunk   : int;  // would replace spectrum values hardcoded.
var greenLevel : int;
//var greenChunk : int;
var blueLevel  : int;
//var blueChunk  : int;
var brightness : int;

private var mat : Material;
private var origColor  : Color;
private var newColor   : Color;
private var colorType : String;
private var spectrum : float[];

// assign values to those variables
function Start () {
	audioObj = GameObject.Find("Main Camera");
	pulse = audioObj.GetComponent("AudioManager");
	mat = gameObject.renderer.material ;
	
	//different textures use different properties for the main color
	if (mat.HasProperty("_Color")) {colorType="_Color";}
	else if (mat.HasProperty("_TintColor")) {colorType="_TintColor";}
	
	//origColor = mat.GetColor(colorType);
}

function Update () {
	spectrum = pulse.spectrum;
	//Debug.Log('spectrum : '+spectrum.Length);
	// make sure we're not gonna bork the color before we start
	if (mat && spectrum.Length > 0){
		origColor = mat.GetColor(colorType);
		// add in our spectrum data times coeffecient

		newColor = Color(
			origColor.r+(pulse.bassFreqValue*redLevel*10), 
			origColor.g+(pulse.highFreqValue*greenLevel*10), 
			origColor.b+(spectrum[150]*blueLevel*10), 
			(spectrum[100]+pulse.midsFreqValue+(((spectrum[35]/2)*brightness*10)+.125))
			);
				
		// do it
		mat.SetColor(colorType, newColor);
	}		
}
*/