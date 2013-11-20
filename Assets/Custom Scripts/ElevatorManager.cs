using UnityEngine;
using System.Collections;

public class ElevatorManager : MonoBehaviour {

	public int speed = 12;
	private bool elevatorUp = false;

	private GameObject elevator;
	private RigidBody eBody;

	private Vector3 origPosition;
	private Vector3 newPosition;

	private var constraintList =   (RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ |
                                      RigidbodyConstraints.FreezePositionX | RigidbodyConstraints.FreezePositionZ );

	private void Start ()
	{
		origPos = transform.position;
	}

	private void OnControllerColliderHit (ControllerColliderHit hit)
	{ 
		if (hit.gameObject.tag == "elevator") 
		{
			elevator = hit.gameObject;
			eBody = elevator.rigidbody;

			// unfreezes the Y position constraint and freezes X and Z so we can go straight up
			if (elevatorUp == false) 
			{
				eBody.constraints = constraintList;
			}
 
			elevatorUp = true;
		}
	}


	private void FixedUpdate () 
	{
  		if (elevator != null)
		{
   	    	if (elevatorUp) 
			{
    	        eBody.AddRelativeForce(Vector3.up * speed * eBody.mass);
    	    }
     	   	else 
			{
     	       	newPosition = elevator.transform.position;

     	    	if (newPosition.y > origPosition.y) 
				{
     	           eBody.useGravity = true;
      	    	} 
				else 
				{
     	        	eBody.useGravity = false;
        	        eBody.constraints = RigidbodyConstraints.FreezePositionY;
      	      	}
       		}
        	elevatorUp = false;
    	}
	}

}

