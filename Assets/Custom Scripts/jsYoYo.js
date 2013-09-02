#pragma strict
import Holoville.HOTween;
import Holoville.HOTween.Plugins;

var platform : GameObject;

function Start () {
	platform = gameObject;
	HOTween.Init(true, true, true);
	HOTween.To(platform.transform, 15, "position", new Vector3(0,-42,0), true);
	HOTween.To(platform.transform, 15, "rotation", new Vector3(42, 5, 10), true);
}

function Update () {

}