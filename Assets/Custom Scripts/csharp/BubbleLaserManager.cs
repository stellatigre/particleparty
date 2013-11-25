using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class BubbleLaserManager : MonoBehaviour {

	public int power = 40;
	private int mouseForceMod = 1;
	
	private GameObject playerObj = GameObject.Find("Player");

	private RigidbodyConstraints freeMotion = 
		(RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ);

	Component[] particleSystems;
	Component[] audioSources;
	
	/*
	List<ParticleSystem> onWhenPulling = new List<ParticleSystem>() 
		{
		 particleSystems[3].particleSystem,  		// these are specific to the bubble laser
		 particleSystems[4].particleSystem			// prefab, may need adjusting
		}
	 */
	private ParticleSystem.CollisionEvent[] collisionEvents = new ParticleSystem.CollisionEvent[16];

	private SoundPoolManager spm;  // shortcut to our SoundPoolManager
	AudioClip[] popSounds;			// Bubble sounds

	public void Start() 
	{
		particleSystems = gameObject.GetComponentsInChildren<ParticleSystem>(true);
		audioSources = gameObject.GetComponentsInChildren<AudioSource>(true);
    	
    	spm = playerObj.GetComponent<SoundPoolManager>();
		
	}

	public void emitSwitcher() 
	{
    	if (Input.GetMouseButton(1) && Input.GetMouseButton(0)) 
		{
    		particleSystems[3].particleSystem.enableEmission = false;
    		particleSystems[4].particleSystem.enableEmission = false;
    		particleSystems[4].particleSystem.Clear();
    	}
    	else 
		{
    		particleSystems[3].particleSystem.enableEmission = true;
    		particleSystems[4].particleSystem.enableEmission = true;
    	}
	}

	public void playBubbles (GameObject other) 
	{
		spm.playClipPitchVar(popSounds[Random.Range(0,3)], other.transform.position, .175f, .5f);
	}

	public void colorShiftTarget (GameObject hitObj) 
	{
    	if (hitObj.renderer) 
		{
        	Color newColor;
        	string colorType = "_Color";
        	Material mat = hitObj.renderer.material;

        	if (mat.HasProperty("_Color")) {colorType="_Color";}
        	else if (mat.HasProperty("_TintColor")) {colorType="_TintColor";}

        	Color origColor = mat.GetColor(colorType);
			newColor = origColor;
            
        	if (Input.GetMouseButton(1)==false)			// red shift, blue shift
			{
            	newColor = new Color(origColor.r+.02f, origColor.g-.02f, origColor.b-.02f, origColor.a);
        	} 
			else if (Input.GetMouseButton(1) && Input.GetMouseButton(0))
			{
            	newColor = new Color(origColor.r-.02f, origColor.g-.02f, origColor.b+.02f, origColor.a);
			}
			
			mat.SetColor(colorType, newColor);
		}
	}

	public void OnParticleCollision(GameObject other) 
	{  
    	int numCollisionEvents = gameObject.particleSystem.GetCollisionEvents(other, collisionEvents);
   					 // get collision events for the gameObject that the script is attached to
    	for (int i=0; i == numCollisionEvents; i++) 
		{
        	if (other.rigidbody) 
			{    
            	playBubbles(other);				// here we handle SFX and color shifting
            	colorShiftTarget(other);

				if (Input.GetMouseButton(1) == true) {mouseForceMod = -1;}
 			    else {mouseForceMod = 1;}      // mouse input determines direction

          	    Vector3 force = mouseForceMod*(collisionEvents[i].velocity * power);
 
				other.rigidbody.constraints = freeMotion;	

				other.rigidbody.AddForce(force); // apply some force to RigidBody components
        	}
    	}
	}
			
	public void Update() 
	{
    	emitSwitcher();
	}

}
