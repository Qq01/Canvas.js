# Canvas.js
simple class wrapper for html5 canvas (warning! Canvas currently works only in chrome "use strict")<br/>
<h1>Example:</h1>
<pre>
var id = 'myCanvas'; // id of canvas to which bind class
var c = new Canvas(id); // crate new instance for canvas to use
// Canvas is chainable function list (most of it's functions returns this)
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
/* or
c.rect({x: 20, y: 5, w: 10, h: 15});
c.text({text: 'Hello World', x: 35, y: 20, type: 'stroke'});
*/
</pre>
<h1>List of functions</h1>
<ul>
  <li>
    class Canvas
    <ul>
      <li>
        <h6>constructor(obj)</h6>
        <i>obj</i> - id of canvas to be used
      </li>
      <li>
        <h6>set(data)</h6>
        <i>data</i> - object of settings that will replace current canvas settings.<br/>
        <ul>
          <li><code>fillStyle</code></li>
          <li><code>font</code></li>
          <li><code>textAlign</code></li>
          <li><code>textBaseline</code></li>
          <li><code>direction</code></li>
          <li><code>strokeStyle</code></li>
          <li><code>lineWidth</code></li>
          <li><code>lineCap</code></li>
          <li><code>lineJoin</code></li>
          <li><code>miterLimit</code></li>
          <li><code>setLineDash</code></li>
          <li><code>lineDashOffset</code></li>
          <li><code>shadowColor</code></li>
          <li><code>shadowBlur</code></li>
          <li><code>shadowOffsetX</code></li>
          <li><code>shadowOffsetY</code></li>
        </ul>
        <code>return this</code>
      </li>
      <li>
        <h6>rect(data || arguments[0..3])</h6>
        <i>data</i> - object or list of 4 arguments describing rectangle
        <ul>
          <li><code>x || arguments[0]</code> - x position</li>
          <li><code>y || arguments[1]</code> - y position</li>
          <li><code>w || arguments[2]</code> - width</li>
          <li><code>h || arguments[3]</code> - height</li>
        </ul>
        <code>return this</code>
      </li>
      <li>
        <h6>text(data)</h6>
        <i>data</i> - object describing text
        <ul>
          <li><code>text</code> - text to be writen</li>
          <li><code>x</code> - x position of text</li>
          <li><code>y</code> - y position of text</li>
          <li>
            <code>type</code> - type of text avalible options are:
            <ul>
              <li><code>'normal'</code> - standard text</li>
              <li><code>'stroke'</code> - only outline</li>
              <li><code>'both'</code> - standard text with outline (experimental feature)</li>
            </ul>
          </li>
        </ul>
        <code>return this</code>
      </li>
      <li>
        <h6>textSize(data[, transfer])</h6>
        <i>data</i> - string to measure<br/>
        <i>transfer</i> - string describing name of custom variable to which save returned value<br/>
        <code>return textwidth (number)</code><br/>
        if <i>transfer</i> is set:<br/>
        <code>return this</code>
      </li>
      <li>
        <h6>path(data)</h6>
        <i>data</i> - class Path that describes path to be drwan on canvas<br/>
        <code>return this</code>
      </li>
      <li>
        <h6>returnLinearGradient(data)</h6>
        <i>data</i> - object describing dimension and color stops of gradient
        <ul>
          <li><code>x0</code></li>
          <li><code>y0</code></li>
          <li><code>x1</code></li>
          <li><code>y1</code></li>
          <li>
            <code>stops (optional)</code> - (array of objects) each objects contains:
            <ul>
              <li><code>offset</code> - number between 0.0 and 1.0</li>
              <li><code>color</code> - string describing color in css style</li>
            </ul>
          </li>
        </ul>
        <code>return CanvasGradient</code>
      </li>
      <li>
        <h6>returnRadialGradient(data)</h6>
        <i>data</i> - object describing dimension ond color stops of gradient
        <ul>
          <li><code>x0</code></li>
          <li><code>y0</code></li>
          <li><code>r0</code></li>
          <li><code>x1</code></li>
          <li><code>y1</code></li>
          <li><code>r1</code></li>
          <li>
            <code>stops (optional)</code> - (array of objects) each object contains:
            <ul>
              <li><code>offset</code> - number between 0.0 and 1.0</li>
              <li><code>color</code> - string describing color in css style</li>
            </ul>
          </li>
          <code>return CanvasGradient</code>
        </ul>
      </li>
      <li>
        <h6>returnPattern(data)</h6>
        <i>data</i> - object describing pattern settings
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern" >
        MDN description canvas pattern
        </a>
        <ul>
          <li><code>img</code> - image source to be used</li>
          <li>
            <code>repeat</code> - how repeatable is pattern, avalible options are:
            <ul>
              <li><code>'repeat'</code> repeat in x and y axis</li>
              <li><code>'repeat-x'</code> repeat only in x axis</li>
              <li><code>'repat-y'</code> repeat only in y axis</li>
              <li><code>'no-repeat'</code> don't repeat</li>
            </ul>
          </li>
        </ul>
        <code>return CanvasPattern</code>
      </li>
    </ul>
  </li>
</ul>
