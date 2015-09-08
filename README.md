# Canvas.js
simple class wrapper for html5 canvas (warning! Canvas currently works only in chrome "use strict")<br/>
<h1>USAGE:</h1>
<pre>
var id = 'myCanvas'; // id of canvas to which bind class
var c = new Canvas(id); // crate new instance for canvas to use
c.rect({
  x: 20,
  y: 5,
  w: 10,
  h: 15
}).text({
  text: 'Hello World',
  x: 35,
  y: 20,
  type: 'stroke'
});
</pre>
