using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class BubbleCaster : MonoBehaviour {

	public GameObject rayObjectPrefab;   // bubble laser prefab is inserted in this slot
	public int rayLength = 100;			

	private GameObject rayObj;     		// instance of the above prefab
	private Vector3 endPoint;
	private Vector3 holdPoint;


	static void Start ()
	{
		holdPoint = transform.position + offset + Vector3.right*3 ;
		rayObj = GameObject.Instantiate(rayObjectPrefab, holdPoint, transform.rotation);
        rayObj.transform.parent = gameObject.transform; // a new child <3<3<3
	}

	static void aimBubbles () 
	{
		private Quaternion rotateGoal; 
	    endPoint = Camera.main.ViewportToWorldPoint(Vector3(0.5, 0.5, 100));
	    rotateGoal = Quaternion.FromToRotation(Vector3.forward, endPoint-gameObject.transform.position);
	    
		rayObj.transform.position = holdPoint;   //keep it pointing right in 
	    rayObj.transform.rotation = rotateGoal;  //the middle of the screen
	}

	static void bubbleSwitch (active : boolean) 
	{
	    if (active == true) 
		{
	        rayObj.particleSystem.emissionRate = 30;
	        rayObj.renderer.enabled = true;
	        rayObj.audio.volume = 1;
	    }
	    else 
		{
	        rayObj.particleSystem.emissionRate = 0;
	        rayObj.renderer.enabled = false;
	        rayObj.audio.volume = 0;
	    }
	}

	static void Update ()
	{
		bool mousePress = Input.GetMouseButton (0);

		if (rayObj != null && rayObj.renderer.enabled == true && mousePress) 
		{
			aimBubbles ();        // already casting, just aim
		} 
		else if (rayObj != null && rayObj.renderer.enabled == false && mousePress) 
		{
			bubbleSwitch (true);  // if we've already casted one just re-enable it
		} 
		else if (rayObj != null && mousePress == false) 
		{
			bubbleSwitch (false); // if we're done casting bubbles, turn them off
		}
	}

}

