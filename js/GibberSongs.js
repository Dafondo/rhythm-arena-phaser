var GibberSongs = GibberSongs || {};

GibberSongs.basic = function() {
	a = Mono('bass').note.seq( [0,7], 1/8 );

	b = EDrums('xoxo');
	b.snare.snappy = 1;

	c = Mono('easyfx')
		.note.seq( Rndi(0,12), [1/4,1/8,1/2,1,2].rnd( 1/8,4 ) );
}

GibberSongs.glitchy = function() {
	Gibber.Clock.maxMeasures = 44
	Gibber.scale.root.seq( ['ab3', 'c4'], 2 )
	
	score = Score([ 
		0, // start immediately
	  function() {
	    a = EDrums('x*ox*xo-', 1/16 )
	      .pitch.seq( [.5,1,2,4].rnd() )
	      .pan.seq( Rndf(-1,1) )
	
	    b = Pluck()
	      .note.seq( Rndi(100,300), 1/16 )
	      .blend.seq( Rndf() )
	      .fx.add( Schizo() )
	      .fadeIn( 8, .75 )
	    
	    console.log('intro (4 measures)')
	  },
	  measures(4), // wait 4 measures, then execute next function
	  function() { 
	    d = Snare({ offset:1/4, snappy:1.5 }).note.seq( 0, 1/2 )
	    console.log( 'bring in the snare (4 measures)')
	  },
	  measures(4),
		function() {
	    c = Mono( 'bass2' )
	      .note.seq( [0, 7], [1/8,1/16].rnd(1/16,2) )
	      .fadeIn( 8, .65 )
	    
	    console.log('now the bass (8 measures)')
	  },
	  measures(8),  	
		function() { 
	    e = Synth2( 'pad2', { amp:.85 } )
	      .chord.seq( Rndi(0,6,3), 2 )
	      .fx.add( Delay() )
	    
	    console.log( 'some harmony (8 measures)')
	  },
		measures(8),
		function() {
	    f = Bus().fx.add( Schizo('paranoid') ).pan(1)
	    g = Bus().fx.add( Schizo('paranoid') ).pan(-1)
	  
	    b.fx[0].send( f, 1 )
	    b.fx[0].send( g, 1 )
	    
	    console.log( 'some glitch (8 measures)')
	  },
		measures(8),
		function() {
	    a.send( f, .75 )
	    a.send( g, .75 )
	  
	    c.fadeOut2( 16 )
	    
	    console.log( 'a little more glitch, a little less bass (8 measures)' )
	  },
	  measures(8),
		function() {
	    e.fx[0].send( f, .75 )
	    e.fx[0].send( g, .75 )  
	 	
	    Master.fadeOut( 16 )
	    console.log( 'fade and end (16 measures)')
		}
	]).start()
}
