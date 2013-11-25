using UnityEngine;
using System.Collections;

public class RotationManager : MonoBehaviour {

	int rotationSpeed = 10;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(0,  rotationSpeed* Time.deltaTime, 0);
	}
}
