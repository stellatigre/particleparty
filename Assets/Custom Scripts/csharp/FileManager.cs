using UnityEngine;
using System.Collections;

public class FileManager : MonoBehaviour {
	
	public GameObject testBlock;
	public DownloadType downloadType;
	
	// Set to false to prevent downloads
	public bool downloadEnabled;
	
	// File operations
	private WWW downloader;
	private AudioClip audioClipHolder;
	public Transform audioMgrObj;
	private AudioManager audioMgrComp;
	
	public Transform audioSourceObj;
	private AudioSource audioSourceComp;
	
	// UI display
	public Texture progressBackground;
	public Texture progressForeground;
	public Vector2 progressSize, progressLocation;
	public int progressTextOffsetX, progressTextOffsetY;
	
	public GameObject downloadTextObj;
	private TextMesh downloadTextComp;
	
	public float progressAmount = 0.0f;
	public bool drawProgress = false;
	
	public string currentUrl;
	
	// Use this for initialization
	void Start () {
		
		audioMgrComp = (AudioManager)audioMgrObj.GetComponent("AudioManager");
		audioSourceComp = (AudioSource)audioSourceObj.GetComponent("AudioSource");
	}
	
	// Update is called once per frame
	void Update () {
		if (downloadEnabled && downloader != null) {
		
			if (!downloader.isDone) {
				
				progressAmount = downloader.progress;
				//Debug.Log(string.Format("FILE: Downloading: {0}%", progressAmount*100));
				//DrawProgress();
				
			} else {
				
				// Switch on download type to determine what sort of file
				// we're working with (audio, image, etc.)
				switch (downloadType) {
					case DownloadType.Audio:
						// Attach it to the audio source on this gameobject
						//audio.clip = audioClipHolder;
						
						// Actually, add it to the audio manager's clip list to be
						// maintained by the existing system.
						audioMgrComp.AddAudioClip(audioClipHolder);
						Debug.Log("FILE: AudioClip downloaded and assigned to audio clip set.");
						
						var oldSongIndex = audioMgrComp.currentSongIndex;
						
						// Play from audio manager (should happen automatically)
						audioMgrComp.PlayNext();
						
						Debug.Log(string.Format("FILE: Audio clip index changed from {0} to {1}", oldSongIndex, audioMgrComp.currentSongIndex));
					
						break;
					case DownloadType.Image:
						
						// Assign new texture to test block
						testBlock.renderer.material.mainTexture = downloader.texture;
					
						break;
					
					default:
					
						break;
				}
				
				// Turn off the progress display
				drawProgress = false;
				
				// And zero out the progress indicator
				progressAmount = 0.0f;
			
				// Null out the downloader so Update knows to stop coming here
				downloader = null;
			}
		}
	}
	
	public void DownloadAudio(string url)
	{
		drawProgress = true;
	
		downloadType = DownloadType.Audio;
		
		downloader = new WWW(url);
		audioClipHolder = downloader.audioClip;
		audioClipHolder.name = "IMPORTED FROM URL";
	}
	
	/// <summary>
	/// Accepts a file:/// URL to an audio file to import
	/// </summary>
	/// <param name='path'>
	/// Path to audio file.
	/// </param>
	public void ImportAudioFromStorage(string path)
	{
		drawProgress = true;
		
		downloadType = DownloadType.Audio;
		
		downloader = new WWW(path);
		audioClipHolder = downloader.audioClip;
		audioClipHolder.name = "IMPORTED FROM DISK";
	}
	
	/// <summary>
	/// Accepts http:// https:// and file:/// URLs for texture downloads.
	/// </summary>
	/// <returns>
	/// Texture returned by WWW object
	/// </returns>
	/// <param name='url'>
	/// URL of texture to capture
	/// </param>
	public void DownloadTextureFromImageURL(string url)
	{
		Debug.Log(string.Format("FILE: Initiating image download from {0}", url));
		
		// Should be too short for progress?
		drawProgress = true;
		
		downloadType = DownloadType.Image;
		
		downloader = new WWW(url);
		StartCoroutine(WaitForRequest(downloader));
	}
	
	IEnumerator WaitForRequest(WWW www)
	{
		yield return www;
		
		// Check for error messaging
		if (www.error == null)
		{
			Debug.Log("FILE: IMAGE DL: OK: " + www.data);
		}
		else
		{
			Debug.Log("FILE: IMAGE DL: FAIL: " + www.error);
		}
	}
	
	public void DrawProgress()
	{
		//downloadTextComp.text = string.Format("Downloading: {0}%", progressAmount*100.0f);
		
		GUI.DrawTexture(new Rect(progressLocation.x, progressLocation.y, progressSize.x, progressSize.y), progressBackground);
		GUI.DrawTexture(new Rect(progressLocation.x, progressLocation.y, progressSize.x*progressAmount, progressSize.y), progressForeground);
		
		GUI.TextField(new Rect(progressLocation.x+progressTextOffsetX, progressLocation.y+progressTextOffsetY, progressSize.x, progressSize.y), string.Format("Downloading: {0}%\n{1}", progressAmount*100, currentUrl));
	}
	
	void OnGUI()
	{
		if (drawProgress)
			DrawProgress();
	}
}