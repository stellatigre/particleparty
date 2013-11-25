using UnityEngine;
using System.Collections;

public class SpectrumReactionManager : MonoBehaviour {
	
	public GameObject audioObj;
	private AudioSpectrumManager pulse;
	
	public int redLevel;
	public int greenLevel;
	public int blueLevel;
	public int brightness;
	public float minBrightness = .125f;
	
	private Material mat;
	private Color origColor;
	private Color newColor;
	private string colorType;
	
	
	private void modifyColorValues (float[] spectrum)	
	{
		if (mat && spectrum.Length > 0){				// make sure we won't bork the color first
			origColor = mat.GetColor(colorType);
	
			newColor = new Color(
				origColor.r+(pulse.bassFreqValue*redLevel*10), 		// add in our spectrum data times coeffecients
				origColor.g+(pulse.highFreqValue*greenLevel*10), 
				origColor.b+(spectrum[150]*blueLevel*10), 
				(spectrum[100]+pulse.midsFreqValue+(((spectrum[35]/2)*brightness*10)+minBrightness))
				);
					
			mat.SetColor(colorType, newColor);		// replace the old color with the new
		}
	}
		
	private void Start () {
		audioObj = GameObject.Find("Main Camera");
		pulse = audioObj.GetComponent("AudioSpectrumManager") as AudioSpectrumManager;
		mat = gameObject.renderer.material ;
		
		//different textures use different properties for the main color
		if (mat.HasProperty("_Color")) {colorType="_Color";}
		else if (mat.HasProperty("_TintColor")) {colorType="_TintColor";}
		
		origColor = mat.GetColor(colorType);
	}
	
	private void Update () 
	{
		modifyColorValues(pulse.spectrum);
	}
	
}
