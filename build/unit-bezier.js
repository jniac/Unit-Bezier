/*!
* Unit-Bezier 1.0.0
*
* Copyright 2015, Jacob Peters - http://jacobpeters.co
* Credit to:
*   Chromium: UnitBezier Class and tests
*   Firefox: nsSMILKeySpline Class and tests
*   A Primer on Bézier Curves - http://pomax.github.io/bezierinfo/
* Released under the MIT license - http://opensource.org/licenses/MIT
*/
function UnitBezier(e,t){"use strict";this.coefX=[3*e[0],3*(e[2]-e[0]),1],this.coefY=[3*e[1],3*(e[3]-e[1]),1],this.coefX[1]-=this.coefX[0],this.coefX[2]=this.coefX[2]-this.coefX[0]-this.coefX[1],this.coefY[1]-=this.coefY[0],this.coefY[2]=this.coefY[2]-this.coefY[0]-this.coefY[1],this.epsilon=t,this.sampleTable=this.generateSampleTable()}UnitBezier.prototype.generateSampleTable=function(){"use strict";for(var e=[],t=0;t<this.sampleTableSize;++t)e[t]=this.sampleCurveX(t*this.sampleStepSize);return e},UnitBezier.prototype.sampleCurveX=function(e){"use strict";return((this.coefX[2]*e+this.coefX[1])*e+this.coefX[0])*e},UnitBezier.prototype.sampleCurveY=function(e){"use strict";return((this.coefY[2]*e+this.coefY[1])*e+this.coefY[0])*e},UnitBezier.prototype.sampleCurveDerivativeX=function(e){"use strict";return(3*this.coefX[2]*e+2*this.coefX[1])*e+this.coefX[0]},UnitBezier.prototype.solveCurveX=function(e){"use strict";var t,i=this.esitimateT(e);return i.slope>=.02?t=this.newtonRaphsonIterate(e,i.guessForT):i.slope<1e-5&&(t=i.guessForT),-1===t&&(t=this.binarySubdivide(e,i.tBoundsLow,i.tBoundsHigh)),t},UnitBezier.prototype.esitimateT=function(e){"use strict";for(var t,i,s=0;s<this.sampleTableSize-1&&this.sampleTable[s]<=e+this.epsilon;++s);return--s,i=(e-this.sampleTable[s])/(this.sampleTable[s+1]-this.sampleTable[s]),t=this.sampleStepSize*s+i*this.sampleStepSize,{guessForT:t,tBoundsLow:this.sampleStepSize*s,tBoundsHigh:Math.min(this.sampleStepSize*(s+1),1),slope:this.sampleCurveDerivativeX(t)}},UnitBezier.prototype.newtonRaphsonIterate=function(e,t){"use strict";for(var i,s,o=0;o<this.newtonRaphsonMaxIterations;++o){if(i=this.sampleCurveX(t)-e,s=this.sampleCurveDerivativeX(t),Math.abs(i)<this.epsilon)return t;t-=i/s}return console.log("x for calculated t = "+this.sampleCurveX(t)),-1},UnitBezier.prototype.binarySubdivide=function(e,t,i){"use strict";var s,o,r=this.binarySubdivideMaxIterations;do o=t+(i-t)/2,s=this.sampleCurveX(o)-e,s>0?i=o:t=o;while(Math.abs(s)>this.epsilon&&--r>0);return o},UnitBezier.prototype.calc=function(e){"use strict";return 0>e?e=0:e>1&&(e=1),this.sampleCurveY(this.solveCurveX(e))},UnitBezier.prototype.sampleTableSize=26,UnitBezier.prototype.sampleStepSize=1/(UnitBezier.prototype.sampleTableSize-1),UnitBezier.prototype.newtonRaphsonMaxIterations=8,UnitBezier.prototype.binarySubdivideMaxIterations=20,UnitBezier.easings={linear:[0,0,1,1],ease:[.25,.1,.25,1],easeIn:[.42,0,1,1],easeInOut:[.42,0,.58,1],easeOut:[0,0,.58,1],easeInBack:[.6,-.28,.735,.045],easeOutBack:[.175,.885,.32,1.275],easeInOutBack:[.68,-.55,.265,1.55]},"undefined"!=typeof module&&(module.exports=UnitBezier);