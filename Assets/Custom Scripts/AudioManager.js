#pragma strict

var spectrum = new float[256];
var audioObj : GameObject;

var bassFreqValue : float;
var midsFreqValue : float;
var highFreqValue : float;

private var source :  AudioSource;

function sumSpectrumChunk (spect : float[], min : int, max : int) {
	var meanChunk : float;
	var sIndex : int;
	var chunkCount : int = 0;

	for (sIndex = min; sIndex <= max; sIndex += 2) {
		//Debug.Log('sIndex : '+sIndex);
		meanChunk += spect[sIndex];
		chunkCount += 1;
	}
	//Debug.Log('chunkCount : '+chunkCount);
	meanChunk = meanChunk/chunkCount ;
	//Debug.Log(min+', '+max+', chunk average : '+meanChunk);
	return meanChunk;
}

function Start () {
	audioObj = GameObject.Find("Main Camera");
	source = audioObj.audio ; 
}

function Update () {
	spectrum = source.GetSpectrumData(256, 0, FFTWindow.BlackmanHarris);
	bassFreqValue = sumSpectrumChunk(spectrum, 1, 15);
	midsFreqValue = sumSpectrumChunk(spectrum, 16, 42); 
	highFreqValue = sumSpectrumChunk(spectrum, 50, 100); 
}
