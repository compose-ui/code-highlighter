var assert = require('chai').assert

var Highlight = require('../')
var $ = function(str) { return document.querySelector(str) }

require('codemirror/mode/ruby/ruby')
require('codemirror/mode/css/css')

var appendChild = function(el, child) {
  el.insertAdjacentHTML('beforeend', child);
}

var addCode = function(code, lang) {
  $('#code').insertAdjacentHTML('beforeend',"<pre class='lang-"+lang+"'>"+code+"</pre>")
}

var highlightCode = function(code, lang) {
  $('#code').insertAdjacentHTML('beforeend',"<pre class='lang-"+lang+"'></pre>")
  Highlight.process(code, 'ruby', $('#code').lastChild)
  code = $('#code').firstChild.innerHTML
  $('#code').innerHTML = ''
  return code
}

appendChild(document.body, "<div id='code'></div>")

describe('Highlight', function(){
  describe('process', function() {
    it('replaces code with highlighted code', function() {
      var expected = '<span class="cm-variable">puts</span> <span class="cm-variable-2">@awesome</span> <span class="cm-keyword">if</span> <span class="cm-variable">cool?</span>'
      var result = highlightCode('puts @awesome if cool?', 'ruby')

      assert.equal(result, expected)
    })
  })

  describe('highlightAll', function() {
    it('automatically highlights all code on page', function() {
      addCode("$bg: #eee; body { background: $bg; }", 'scss')

      Highlight.highlight()

      // newlines are difficult
      // splitting into an array makes it easier to test the result
      //
      var expected = '<pre class="lang-scss highlighted"><code class="highlighted-code static-code cm-s-default"><span class="cm-variable-2">$bg</span>: <span class="cm-atom">#eee</span>; <span class="cm-tag">body</span> { <span class="cm-property">background</span>: <span class="cm-variable-2">$bg</span>; }</code></pre>'
      
      assert.equal($('#code').innerHTML, expected)

    })
  })
})
