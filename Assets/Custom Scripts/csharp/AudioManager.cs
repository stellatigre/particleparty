using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;
///using AssemblyCSharp;
 
public class AudioManager : MonoBehaviour
{
	public List<AudioClip> audioClips;
	public GameObject audioContainer;
	private AudioSpectrumManager audioSpectrumMgrComp;
	
	public GameObject fileMgrObj;
	private FileManager fileMgrComp;
	
	public int currentSongIndex;
	
	public Transform artistNameText, artistTrackText;
	
	void Start()
	{
		// Get audio spectrum manager, audio container object, and start the FFT analysis
		audioSpectrumMgrComp = (AudioSpectrumManager)gameObject.GetComponent("AudioSpectrumManager");
		AudioSource newSource = PlayAtIndex(currentSongIndex);
		audioSpectrumMgrComp.StartSpectrum(newSource.gameObject.transform);
		
		fileMgrComp = (FileManager)fileMgrObj.GetComponent("FileManager");
	}
	
	/// <summary>
	/// Cues previous song in clip list and plays it.
	/// </summary>
	public void PlayPrevious()
	{
		currentSongIndex--;
		
		if (currentSongIndex < 0)
		{
			currentSongIndex = audioClips.Count-1;
		}
		
		PlayAtIndex(currentSongIndex);
		
	}
	
	/// <summary>
	/// Cues the next song in the clip list and plays it.
	/// </summary>
	public void PlayNext()
	{
		currentSongIndex++;
		
		if (currentSongIndex >= audioClips.Count)
		{
			currentSongIndex = 0;
		}
		
		PlayAtIndex(currentSongIndex);
		
	}
	
	void Update()
	{
		//artistNameText.position = new Vector3(0f, gameObject.transform.position.y, 0f);
		
		if (Input.GetButtonDown("MusicDown"))
		{
			PlayPrevious();	
		}
		
		if (Input.GetButtonDown("MusicUp"))
		{
			PlayNext();	
		}
	}
	
	public AudioSource PlayAtIndex(int index)
	{
		Destroy(GameObject.Find ("AudioContainer"));
		
		currentSongIndex = index;
		AudioClip thisClip = audioClips[index];
		return Play(thisClip, audioContainer.transform);
	}
	
    public AudioSource Play(AudioClip clip, Transform emitter)
    {
        return Play(clip, emitter, 1f, 1f);
    }
 
    public AudioSource Play(AudioClip clip, Transform emitter, float volume)
    {
        return Play(clip, emitter, volume, 1f);
    }
 
    /// <summary>
    /// Plays a sound by creating an empty game object with an AudioSource
    /// and attaching it to the given transform (so it moves with the transform). Destroys it after it finished playing.
    /// </summary>
    /// <param name="clip"></param>
    /// <param name="emitter"></param>
    /// <param name="volume"></param>
    /// <param name="pitch"></param>
    /// <returns></returns>
    public AudioSource Play(AudioClip clip, Transform emitter, float volume, float pitch)
    {
		audioSpectrumMgrComp.StopSpectrum();
		
        //Create an empty game object
        GameObject go = new GameObject("AudioContainer");
        go.transform.position = emitter.position;
        go.transform.parent = emitter;
		audioSpectrumMgrComp.audioContainer = gameObject;
		//fileMgrComp.audioSourceObj = gameObject.transform;
 
        //Create the source
        AudioSource source = go.AddComponent<AudioSource>();
        source.clip = clip;
		source.loop = true;
        source.volume = volume;
        source.pitch = pitch;
        source.Play();
		
		
		audioSpectrumMgrComp.StartSpectrum(go.transform);
		
		var artistName = (TextMesh)artistNameText.gameObject.GetComponent("TextMesh");
		var artistTrack = (TextMesh)artistTrackText.gameObject.GetComponent("TextMesh");
		
		artistName.text = clip.name;
		//artistTrack.text = clip.name;
		
        //Destroy (go, clip.length);
        return source;
    }
 
    public AudioSource Play(AudioClip clip, Vector3 point)
    {
        return Play(clip, point, 1f, 1f);
    }
 
    public AudioSource Play(AudioClip clip, Vector3 point, float volume)
    {
        return Play(clip, point, volume, 1f);
    }
 
    /// <summary>
    /// Plays a sound at the given point in space by creating an empty game object with an AudioSource
    /// in that place and destroys it after it finished playing.
    /// </summary>
    /// <param name="clip"></param>
    /// <param name="point"></param>
    /// <param name="volume"></param>
    /// <param name="pitch"></param>
    /// <returns></returns>
    public AudioSource Play(AudioClip clip, Vector3 point, float volume, float pitch)
    {
        //Create an empty game object
        GameObject go = new GameObject("Audio: " + clip.name);
        go.transform.position = point;
 
        //Create the source
        AudioSource source = go.AddComponent<AudioSource>();
        source.clip = clip;
        source.volume = volume;
        source.pitch = pitch;
        source.Play();
        Destroy(go, clip.length);
		
		//PlayNext();
		
        return source;
    }
	
	/// <summary>
	/// Adds the provided audio clip to the clip list
	/// and queues it as the next song
	/// </summary>
	/// <param name='newClip'>
	/// AudioClip to add to the clip list
	/// </param>
	public void AddAudioClip(AudioClip newClip)
	{
		audioClips.Add(newClip);
		//PlayAtIndex(2);
	}
}