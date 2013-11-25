using UnityEngine;
using System.Collections;

public class AudioSpectrumManager : MonoBehaviour {
	
	public float[] spectrum;
	public GameObject audioContainer;
	public bool isReady = false;
	
	public float bassFreqValue;
	public float midsFreqValue; 
	public float highFreqValue;
	
	void Start () {
		spectrum = new float[1024];
		StartSpectrum(audioContainer.transform);
	}
	
	public void StartSpectrum(Transform newSource)
	{
		audioContainer = newSource.gameObject;
		isReady = true;	
	}
	
	public void StopSpectrum()
	{
		isReady = false;	
	}
	
	private float sumSpectrumChunk (float[] spect, int min, int max) {
	
		float meanChunk = 0;
		int chunkCount = 0;
	
		for (int sIndex = min; sIndex <= max; sIndex += 2) {
			//Debug.Log('sIndex : '+sIndex);
			meanChunk += spect[sIndex];
			chunkCount += 1;
		}
		//Debug.Log('chunkCount : '+chunkCount);
		meanChunk = meanChunk/chunkCount ;
		//Debug.Log(min+', '+max+', chunk average : '+meanChunk);
		return meanChunk;
	}
	
	// Update is called once per frame
	void Update () {
		if (isReady) {
			audioContainer.audio.GetSpectrumData(spectrum, 0, FFTWindow.BlackmanHarris);
			
			/*
			bassFreqValue = sumSpectrumChunk(spectrum, 1, 15);
			midsFreqValue = sumSpectrumChunk(spectrum, 16, 42); 
			highFreqValue = sumSpectrumChunk(spectrum, 50, 100); 
			*/
			
			bassFreqValue = spectrum[10];
			midsFreqValue = spectrum[30]; 
			highFreqValue = spectrum[75];
			
			
			if (spectrum == null)
				isReady = false;
		}
		/*
		for (int i = 1; i < 1023; i++) {
			Debug.DrawLine (new Vector3 (i - 1, spectrum[i] + 10, 0),
                        new Vector3 (i, spectrum[i + 1] + 10, 0), Color.red);
            Debug.DrawLine (new Vector3 (i - 1, Mathf.Log(spectrum[i - 1]) + 10, 2),
                        new Vector3 (i, Mathf.Log(spectrum[i]) + 10, 2), Color.cyan);
            Debug.DrawLine (new Vector3 (Mathf.Log(i - 1), spectrum[i - 1] - 10, 1),
                        new Vector3 (Mathf.Log(i), spectrum[i] - 10, 1), Color.green);
            Debug.DrawLine (new Vector3 (Mathf.Log(i - 1), Mathf.Log(spectrum[i - 1]), 3),
                        new Vector3 (Mathf.Log(i), Mathf.Log(spectrum[i]), 3), Color.yellow);
		}
		*/
	}
}