#pragma strict

var ps: ParticleSystem;
var psColor: Color;
var actualColor : Color;
 
function Start () {
    ps = particleSystem;
    Debug.Log(ps);
}
 
function Update () {
    psColor = Color.Lerp(Color.blue, Color.red, Time.time/21);
    actualColor = particleSystem.startColor;
    
    //Debug.Log('ps :'+ps);
    //Debug.Log('calculated start  '+psColor);
    Debug.Log('reported start:   '+particleSystem.startColor);
    particleSystem.startColor = psColor;
}