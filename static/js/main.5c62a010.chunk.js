(window["webpackJsonpdtfm-tool"]=window["webpackJsonpdtfm-tool"]||[]).push([[0],{24:function(e,t,n){e.exports=n(35)},29:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(11),c=n.n(i),o=(n(29),n(49)),l=n(50),u=n(51),m=n(48),s=n(52),E=function(e){var t=e.dtfm;return r.a.createElement(m.a,{container:!0,spacing:2},r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("1")}},"1")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("2")}},"2")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("3")}},"3")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("A")}},"A")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("4")}},"4")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("5")}},"5")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("6")}},"6")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("B")}},"B")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("7")}},"7")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("8")}},"8")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("9")}},"9")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("C")}},"C")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("*")}},"*")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("0")}},"0")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("#")}},"#")),r.a.createElement(m.a,{item:!0,xs:3},r.a.createElement(s.a,{onClick:function(){return t.playNote("D")}},"D")))},d=n(20),f=n(21),p=[1209,1336,1477,1633],x=[697,770,852,941],h="123A456B789C*0#D".split(""),y=new(function(){function e(){Object(d.a)(this,e),this.context=void 0,this.duration=void 0,this.context=new(window.AudioContext||window.webkitAudioContext),this.duration=.2}return Object(f.a)(e,[{key:"setDuration",value:function(e){this.duration=e}},{key:"playNote",value:function(e){var t=h.findIndex(function(t){return t===e});if(t>=0){var n=t%p.length,a=Math.floor(t/p.length);this.play(p[n],x[a])}}},{key:"play",value:function(e,t){var n=this.context.createOscillator(),a=this.context.createOscillator();n.type="sine",a.type="sine";var r=this.context.createGain(),i=this.context.createGain();n.connect(r),r.connect(this.context.destination),r.gain.value=.1,r.gain.setTargetAtTime(0,this.context.currentTime+this.duration,.015),a.connect(i),i.connect(this.context.destination),i.gain.value=.1,i.gain.setTargetAtTime(0,this.context.currentTime+this.duration,.015),n.frequency.value=e,a.frequency.value=t,n.start(),a.start(),n.stop(this.context.currentTime+this.duration+.1),a.stop(this.context.currentTime+this.duration+.1)}}]),e}()),k=function(){return r.a.createElement(o.a,{maxWidth:"md",style:{padding:20}},r.a.createElement(l.a,{style:{padding:10}},r.a.createElement(u.a,{variant:"h3"},"DTFM Encoder/Decoder"),r.a.createElement(u.a,{gutterBottom:!0},"This tool alows you to encode or decode DTFM signals."),r.a.createElement(u.a,{variant:"h4"},"DTFM Encoder"),r.a.createElement(E,{dtfm:y}),r.a.createElement(u.a,{variant:"h4"},"DTFM Decoder")))};c.a.render(r.a.createElement(k,null),document.getElementById("root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.5c62a010.chunk.js.map