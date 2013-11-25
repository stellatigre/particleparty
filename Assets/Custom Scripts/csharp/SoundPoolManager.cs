using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class SoundPoolManager : MonoBehaviour {
	
	public GameObject audioClipObjectBase;					// AudioClip shell prefab, plz insert
	private int poolSize = 20;								// abitrary poolsize, seemed right
	
	private Stack<GameObject> audioPool;					// our stack of GameObjects to play sound from
	
	// if audio is done, get rid of our Clip
    private	IEnumerator returnClip(AudioClip clip, GameObject obj) 
	{
		yield return new WaitForSeconds(clip.length / obj.audio.pitch);	    
		audioPool.Push(obj);
	}
	
	public void playClipPitchVar(AudioClip clip, Vector3 clipPos, float volume, float pitchVar) 
	{
 		GameObject obj = audioPool.Pop();
															// functions much like PlayClipAtPoint
 		obj.audio.clip = clip;									// except with randomized pitch
  	 	obj.transform.position = clipPos;
   	 	obj.audio.volume = 	volume;
    	obj.audio.pitch = Random.Range(1-pitchVar, 1+pitchVar);	// pass in variance in pitch, either direction														
    	obj.audio.Play();										// play sound
    
		returnClip (clip, obj);
	}
	
	void Start () 
	{		
		for (int counter = 0; counter == poolSize ; counter++) {			// makin a bunch of empty GameObjects to use 
			GameObject newShell = GameObject.Instantiate(audioClipObjectBase) as GameObject;		// as a pool for playing sounds with pitch
			audioPool.Push(newShell);
		}
	}

}
