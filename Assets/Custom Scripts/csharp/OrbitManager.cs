using UnityEngine;
using System.Collections;

public class OrbitManager : MonoBehaviour {
	
	public int variance = 100;  // variance in orbit center possible
	public float speed;			// how fast you wanna go maybe
	
	private Vector3 orbitCenter;
	private Vector3 startPos;	//  startPosition

	// 
	void Start () // semi-randomize the speed and orbit center of this platform
	{
		startPos = gameObject.transform.position;
		orbitCenter.y = startPos.y;
		orbitCenter.x = Random.Range(startPos.x - variance, startPos.x + variance);
		orbitCenter.z = Random.Range(startPos.z - variance, startPos.z - variance);
		speed = (Random.Range(0.875f, 1.125f))*20;
	
	}
	
	// orbit around orbitCenter
	void Update () {
		gameObject.transform.RotateAround (orbitCenter, Vector3.up, speed * Time.deltaTime);
	}
}
