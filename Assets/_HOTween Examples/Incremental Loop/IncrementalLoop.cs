using UnityEngine;
using System.Collections;
using Holoville.HOTween;

public class IncrementalLoop : MonoBehaviour
{
	// VARS ///////////////////////////////////////////////////
	
	public		Transform			targetTransform0;
	public		Transform			targetTransform1;
	public		Transform			targetTransform2;
	public		Transform			targetTransform3;
	public		Transform			targetTransform4;
	
	// ===================================================================================
	// UNITY METHODS ---------------------------------------------------------------------
	
	void Start()
	{
		// Tween with simple Yoyo loop.
		HOTween.To( targetTransform0, 1,
			new TweenParms().Prop( "rotation", new Vector3( 0,0,32 ), true ).Loops( -1, LoopType.Yoyo )
		);
		
		// Create a tween that rotates the targetTransform by 22 degrees,
		// And apply to it an infinite Incremental LoopType,
		// so that the object will tween forever, incrementing each time by 22 degrees...
		
		// This one uses a Linear ease.
		HOTween.To( targetTransform1, 1,
			new TweenParms().Prop( "rotation", new Vector3( 0,0,32 ), true ).Loops( -1, LoopType.Incremental ).Ease( EaseType.Linear )
		);
		
		// This one uses an Elastic ease.
		HOTween.To( targetTransform2, 1,
			new TweenParms().Prop( "rotation", new Vector3( 0,0,32 ), true ).Loops( -1, LoopType.Incremental ).Ease( EaseType.EaseOutElastic )
		);
		
		// This one uses a Quart ease.
		HOTween.To( targetTransform3, 1,
			new TweenParms().Prop( "rotation", new Vector3( 0,0,32 ), true ).Loops( -1, LoopType.Incremental ).Ease( EaseType.EaseOutQuart )
		);
		
		// This is the same as the one with Quart Ease,
		// but it's placed inside a Sequence which has an initial interval.
		// This way, the ball rotates, then pauses, then rotates, then pauses, and so on.
		// Note how the Loops method is applied to the Sequence instead than to the Tweener.
		Sequence seq = new Sequence( new SequenceParms().Loops( -1, LoopType.Incremental ) );
		seq.AppendInterval( 1f );
		seq.Append( HOTween.To( targetTransform4, 1,
			new TweenParms().Prop( "rotation", new Vector3( 0,0,32 ), true )
		) );
		seq.Play();
	}
}
