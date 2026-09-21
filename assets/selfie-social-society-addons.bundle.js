(()=>{var IZ=1;var TZ=3,fJ=0,hJ=1,R8=2;var vJ=2;var AZ=0,SZ=1,jZ=2;var yJ=1,bJ=2,xJ=3,gJ=4,pJ=5,lJ=6,uJ=7;var fZ=301,dJ=302;var hZ=306,x6=1000,mJ=1001,cJ=1002,t9=1003,nJ=1004;var sJ=1005;var g6=1006,iJ=1007;var e9=1008;var oJ=2300,$7=2301;var aJ=0,p6=1,t8=2;var d0="srgb",a0="srgb-linear";function iH($){for(let J=$.length-1;J>=0;--J)if($[J]>=65535)return!0;return!1}function oH($){return ArrayBuffer.isView($)&&!($ instanceof DataView)}function i9($){return document.createElementNS("http://www.w3.org/1999/xhtml",$)}var hW={},o8=null;function IJ(...$){let J="THREE."+$.shift();if(o8)o8("log",J,...$);else console.log(J,...$)}function vZ($){let J=$[0];if(typeof J==="string"&&J.startsWith("TSL:")){let Q=$[1];if(Q&&Q.isStackTrace)$[0]+=" "+Q.getLocation();else $[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return $}function $0(...$){$=vZ($);let J="THREE."+$.shift();if(o8)o8("warn",J,...$);else{let Q=$[0];if(Q&&Q.isStackTrace)console.warn(Q.getError(J));else console.warn(J,...$)}}function G0(...$){$=vZ($);let J="THREE."+$.shift();if(o8)o8("error",J,...$);else{let Q=$[0];if(Q&&Q.isStackTrace)console.error(Q.getError(J));else console.error(J,...$)}}function n8(...$){let J=$.join(" ");if(J in hW)return;hW[J]=!0,$0(...$)}class O8{addEventListener($,J){if(this._listeners===void 0)this._listeners={};let Q=this._listeners;if(Q[$]===void 0)Q[$]=[];if(Q[$].indexOf(J)===-1)Q[$].push(J)}hasEventListener($,J){let Q=this._listeners;if(Q===void 0)return!1;return Q[$]!==void 0&&Q[$].indexOf(J)!==-1}removeEventListener($,J){let Q=this._listeners;if(Q===void 0)return;let W=Q[$];if(W!==void 0){let Z=W.indexOf(J);if(Z!==-1)W.splice(Z,1)}}dispatchEvent($){let J=this._listeners;if(J===void 0)return;let Q=J[$.type];if(Q!==void 0){$.target=this;let W=Q.slice(0);for(let Z=0,K=W.length;Z<K;Z++)W[Z].call(this,$);$.target=null}}}var j0=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vW=1234567,S6=Math.PI/180,a8=180/Math.PI;function W$(){let $=Math.random()*4294967295|0,J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,W=Math.random()*4294967295|0;return(j0[$&255]+j0[$>>8&255]+j0[$>>16&255]+j0[$>>24&255]+"-"+j0[J&255]+j0[J>>8&255]+"-"+j0[J>>16&15|64]+j0[J>>24&255]+"-"+j0[Q&63|128]+j0[Q>>8&255]+"-"+j0[Q>>16&255]+j0[Q>>24&255]+j0[W&255]+j0[W>>8&255]+j0[W>>16&255]+j0[W>>24&255]).toLowerCase()}function m($,J,Q){return Math.max(J,Math.min(Q,$))}function rJ($,J){return($%J+J)%J}function aH($,J,Q,W,Z){return W+($-J)*(Z-W)/(Q-J)}function rH($,J,Q){if($!==J)return(Q-$)/(J-$);else return 0}function j6($,J,Q){return(1-Q)*$+Q*J}function tH($,J,Q,W){return j6($,J,1-Math.exp(-Q*W))}function eH($,J=1){return J-Math.abs(rJ($,J*2)-J)}function $Y($,J,Q){if($<=J)return 0;if($>=Q)return 1;return $=($-J)/(Q-J),$*$*(3-2*$)}function JY($,J,Q){if($<=J)return 0;if($>=Q)return 1;return $=($-J)/(Q-J),$*$*$*($*($*6-15)+10)}function QY($,J){return $+Math.floor(Math.random()*(J-$+1))}function WY($,J){return $+Math.random()*(J-$)}function ZY($){return $*(0.5-Math.random())}function KY($){if($!==void 0)vW=$;let J=vW+=1831565813;return J=Math.imul(J^J>>>15,J|1),J^=J+Math.imul(J^J>>>7,J|61),((J^J>>>14)>>>0)/4294967296}function HY($){return $*S6}function YY($){return $*a8}function XY($){return $>0&&Number.isInteger($)&&2**Math.round(Math.log2($))===$}function UY($){return Math.pow(2,Math.ceil(Math.log($)/Math.LN2))}function NY($){return Math.pow(2,Math.floor(Math.log($)/Math.LN2))}function EY($,J,Q,W,Z){let{cos:K,sin:H}=Math,Y=K(Q/2),X=H(Q/2),U=K((J+W)/2),E=H((J+W)/2),G=K((J-W)/2),q=H((J-W)/2),F=K((W-J)/2),R=H((W-J)/2);switch(Z){case"XYX":$.set(Y*E,X*G,X*q,Y*U);break;case"YZY":$.set(X*q,Y*E,X*G,Y*U);break;case"ZXZ":$.set(X*G,X*q,Y*E,Y*U);break;case"XZX":$.set(Y*E,X*R,X*F,Y*U);break;case"YXY":$.set(X*F,Y*E,X*R,Y*U);break;case"ZYZ":$.set(X*R,X*F,Y*E,Y*U);break;default:$0("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+Z)}}function G$($,J){switch(J.constructor){case Float32Array:return $;case Uint32Array:return $/4294967295;case Uint16Array:return $/65535;case Uint8Array:case Uint8ClampedArray:return $/255;case Int32Array:return Math.max($/2147483647,-1);case Int16Array:return Math.max($/32767,-1);case Int8Array:return Math.max($/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function Q0($,J){switch(J.constructor){case Float32Array:return $;case Uint32Array:return Math.round($*4294967295);case Uint16Array:return Math.round($*65535);case Uint8Array:case Uint8ClampedArray:return Math.round($*255);case Int32Array:return Math.round($*2147483647);case Int16Array:return Math.round($*32767);case Int8Array:return Math.round($*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}var q$={DEG2RAD:S6,RAD2DEG:a8,generateUUID:W$,clamp:m,euclideanModulo:rJ,mapLinear:aH,inverseLerp:rH,lerp:j6,damp:tH,pingpong:eH,smoothstep:$Y,smootherstep:JY,randInt:QY,randFloat:WY,randFloatSpread:ZY,seededRandom:KY,degToRad:HY,radToDeg:YY,isPowerOfTwo:XY,ceilPowerOfTwo:UY,floorPowerOfTwo:NY,setQuaternionFromProperEuler:EY,normalize:Q0,denormalize:G$};class S{static{S.prototype.isVector2=!0}constructor($=0,J=0){this.x=$,this.y=J}get width(){return this.x}set width($){this.x=$}get height(){return this.y}set height($){this.y=$}set($,J){return this.x=$,this.y=J,this}setScalar($){return this.x=$,this.y=$,this}setX($){return this.x=$,this}setY($){return this.y=$,this}setComponent($,J){switch($){case 0:this.x=J;break;case 1:this.y=J;break;default:throw Error("THREE.Vector2: index is out of range: "+$)}return this}getComponent($){switch($){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+$)}}clone(){return new this.constructor(this.x,this.y)}copy($){return this.x=$.x,this.y=$.y,this}add($){return this.x+=$.x,this.y+=$.y,this}addScalar($){return this.x+=$,this.y+=$,this}addVectors($,J){return this.x=$.x+J.x,this.y=$.y+J.y,this}addScaledVector($,J){return this.x+=$.x*J,this.y+=$.y*J,this}sub($){return this.x-=$.x,this.y-=$.y,this}subScalar($){return this.x-=$,this.y-=$,this}subVectors($,J){return this.x=$.x-J.x,this.y=$.y-J.y,this}multiply($){return this.x*=$.x,this.y*=$.y,this}multiplyScalar($){return this.x*=$,this.y*=$,this}divide($){return this.x/=$.x,this.y/=$.y,this}divideScalar($){return this.multiplyScalar(1/$)}applyMatrix3($){let J=this.x,Q=this.y,W=$.elements;return this.x=W[0]*J+W[3]*Q+W[6],this.y=W[1]*J+W[4]*Q+W[7],this}min($){return this.x=Math.min(this.x,$.x),this.y=Math.min(this.y,$.y),this}max($){return this.x=Math.max(this.x,$.x),this.y=Math.max(this.y,$.y),this}clamp($,J){return this.x=m(this.x,$.x,J.x),this.y=m(this.y,$.y,J.y),this}clampScalar($,J){return this.x=m(this.x,$,J),this.y=m(this.y,$,J),this}clampLength($,J){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(m(Q,$,J))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot($){return this.x*$.x+this.y*$.y}cross($){return this.x*$.y-this.y*$.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo($){let J=Math.sqrt(this.lengthSq()*$.lengthSq());if(J===0)return Math.PI/2;let Q=this.dot($)/J;return Math.acos(m(Q,-1,1))}distanceTo($){return Math.sqrt(this.distanceToSquared($))}distanceToSquared($){let J=this.x-$.x,Q=this.y-$.y;return J*J+Q*Q}manhattanDistanceTo($){return Math.abs(this.x-$.x)+Math.abs(this.y-$.y)}setLength($){return this.normalize().multiplyScalar($)}lerp($,J){return this.x+=($.x-this.x)*J,this.y+=($.y-this.y)*J,this}lerpVectors($,J,Q){return this.x=$.x+(J.x-$.x)*Q,this.y=$.y+(J.y-$.y)*Q,this}equals($){return $.x===this.x&&$.y===this.y}fromArray($,J=0){return this.x=$[J],this.y=$[J+1],this}toArray($=[],J=0){return $[J]=this.x,$[J+1]=this.y,$}fromBufferAttribute($,J){return this.x=$.getX(J),this.y=$.getY(J),this}rotateAround($,J){let Q=Math.cos(J),W=Math.sin(J),Z=this.x-$.x,K=this.y-$.y;return this.x=Z*Q-K*W+$.x,this.y=Z*W+K*Q+$.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class r0{constructor($=0,J=0,Q=0,W=1){this.isQuaternion=!0,this._x=$,this._y=J,this._z=Q,this._w=W}static slerpFlat($,J,Q,W,Z,K,H){let Y=Q[W+0],X=Q[W+1],U=Q[W+2],E=Q[W+3],G=Z[K+0],q=Z[K+1],F=Z[K+2],R=Z[K+3];if(E!==R||Y!==G||X!==q||U!==F){let O=Y*G+X*q+U*F+E*R;if(O<0)G=-G,q=-q,F=-F,R=-R,O=-O;let M=1-H;if(O<0.9995){let V=Math.acos(O),D=Math.sin(V);M=Math.sin(M*V)/D,H=Math.sin(H*V)/D,Y=Y*M+G*H,X=X*M+q*H,U=U*M+F*H,E=E*M+R*H}else{Y=Y*M+G*H,X=X*M+q*H,U=U*M+F*H,E=E*M+R*H;let V=1/Math.sqrt(Y*Y+X*X+U*U+E*E);Y*=V,X*=V,U*=V,E*=V}}$[J]=Y,$[J+1]=X,$[J+2]=U,$[J+3]=E}static multiplyQuaternionsFlat($,J,Q,W,Z,K){let H=Q[W],Y=Q[W+1],X=Q[W+2],U=Q[W+3],E=Z[K],G=Z[K+1],q=Z[K+2],F=Z[K+3];return $[J]=H*F+U*E+Y*q-X*G,$[J+1]=Y*F+U*G+X*E-H*q,$[J+2]=X*F+U*q+H*G-Y*E,$[J+3]=U*F-H*E-Y*G-X*q,$}get x(){return this._x}set x($){this._x=$,this._onChangeCallback()}get y(){return this._y}set y($){this._y=$,this._onChangeCallback()}get z(){return this._z}set z($){this._z=$,this._onChangeCallback()}get w(){return this._w}set w($){this._w=$,this._onChangeCallback()}set($,J,Q,W){return this._x=$,this._y=J,this._z=Q,this._w=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy($){return this._x=$.x,this._y=$.y,this._z=$.z,this._w=$.w,this._onChangeCallback(),this}setFromEuler($,J=!0){let{_x:Q,_y:W,_z:Z,_order:K}=$,H=Math.cos,Y=Math.sin,X=H(Q/2),U=H(W/2),E=H(Z/2),G=Y(Q/2),q=Y(W/2),F=Y(Z/2);switch(K){case"XYZ":this._x=G*U*E+X*q*F,this._y=X*q*E-G*U*F,this._z=X*U*F+G*q*E,this._w=X*U*E-G*q*F;break;case"YXZ":this._x=G*U*E+X*q*F,this._y=X*q*E-G*U*F,this._z=X*U*F-G*q*E,this._w=X*U*E+G*q*F;break;case"ZXY":this._x=G*U*E-X*q*F,this._y=X*q*E+G*U*F,this._z=X*U*F+G*q*E,this._w=X*U*E-G*q*F;break;case"ZYX":this._x=G*U*E-X*q*F,this._y=X*q*E+G*U*F,this._z=X*U*F-G*q*E,this._w=X*U*E+G*q*F;break;case"YZX":this._x=G*U*E+X*q*F,this._y=X*q*E+G*U*F,this._z=X*U*F-G*q*E,this._w=X*U*E-G*q*F;break;case"XZY":this._x=G*U*E-X*q*F,this._y=X*q*E-G*U*F,this._z=X*U*F+G*q*E,this._w=X*U*E+G*q*F;break;default:$0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(J===!0)this._onChangeCallback();return this}setFromAxisAngle($,J){let Q=J/2,W=Math.sin(Q);return this._x=$.x*W,this._y=$.y*W,this._z=$.z*W,this._w=Math.cos(Q),this._onChangeCallback(),this}setFromRotationMatrix($){let J=$.elements,Q=J[0],W=J[4],Z=J[8],K=J[1],H=J[5],Y=J[9],X=J[2],U=J[6],E=J[10],G=Q+H+E;if(G>0){let q=0.5/Math.sqrt(G+1);this._w=0.25/q,this._x=(U-Y)*q,this._y=(Z-X)*q,this._z=(K-W)*q}else if(Q>H&&Q>E){let q=2*Math.sqrt(1+Q-H-E);this._w=(U-Y)/q,this._x=0.25*q,this._y=(W+K)/q,this._z=(Z+X)/q}else if(H>E){let q=2*Math.sqrt(1+H-Q-E);this._w=(Z-X)/q,this._x=(W+K)/q,this._y=0.25*q,this._z=(Y+U)/q}else{let q=2*Math.sqrt(1+E-Q-H);this._w=(K-W)/q,this._x=(Z+X)/q,this._y=(Y+U)/q,this._z=0.25*q}return this._onChangeCallback(),this}setFromUnitVectors($,J){let Q=$.dot(J)+1;if(Q<0.00000001)if(Q=0,Math.abs($.x)>Math.abs($.z))this._x=-$.y,this._y=$.x,this._z=0,this._w=Q;else this._x=0,this._y=-$.z,this._z=$.y,this._w=Q;else this._x=$.y*J.z-$.z*J.y,this._y=$.z*J.x-$.x*J.z,this._z=$.x*J.y-$.y*J.x,this._w=Q;return this.normalize()}angleTo($){return 2*Math.acos(Math.abs(m(this.dot($),-1,1)))}rotateTowards($,J){let Q=this.angleTo($);if(Q===0)return this;let W=Math.min(1,J/Q);return this.slerp($,W),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot($){return this._x*$._x+this._y*$._y+this._z*$._z+this._w*$._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let $=this.length();if($===0)this._x=0,this._y=0,this._z=0,this._w=1;else $=1/$,this._x=this._x*$,this._y=this._y*$,this._z=this._z*$,this._w=this._w*$;return this._onChangeCallback(),this}multiply($){return this.multiplyQuaternions(this,$)}premultiply($){return this.multiplyQuaternions($,this)}multiplyQuaternions($,J){let{_x:Q,_y:W,_z:Z,_w:K}=$,H=J._x,Y=J._y,X=J._z,U=J._w;return this._x=Q*U+K*H+W*X-Z*Y,this._y=W*U+K*Y+Z*H-Q*X,this._z=Z*U+K*X+Q*Y-W*H,this._w=K*U-Q*H-W*Y-Z*X,this._onChangeCallback(),this}slerp($,J){let{_x:Q,_y:W,_z:Z,_w:K}=$,H=this.dot($);if(H<0)Q=-Q,W=-W,Z=-Z,K=-K,H=-H;let Y=1-J;if(H<0.9995){let X=Math.acos(H),U=Math.sin(X);Y=Math.sin(Y*X)/U,J=Math.sin(J*X)/U,this._x=this._x*Y+Q*J,this._y=this._y*Y+W*J,this._z=this._z*Y+Z*J,this._w=this._w*Y+K*J,this._onChangeCallback()}else this._x=this._x*Y+Q*J,this._y=this._y*Y+W*J,this._z=this._z*Y+Z*J,this._w=this._w*Y+K*J,this.normalize();return this}slerpQuaternions($,J,Q){return this.copy($).slerp(J,Q)}random(){let $=2*Math.PI*Math.random(),J=2*Math.PI*Math.random(),Q=Math.random(),W=Math.sqrt(1-Q),Z=Math.sqrt(Q);return this.set(W*Math.sin($),W*Math.cos($),Z*Math.sin(J),Z*Math.cos(J))}equals($){return $._x===this._x&&$._y===this._y&&$._z===this._z&&$._w===this._w}fromArray($,J=0){return this._x=$[J],this._y=$[J+1],this._z=$[J+2],this._w=$[J+3],this._onChangeCallback(),this}toArray($=[],J=0){return $[J]=this._x,$[J+1]=this._y,$[J+2]=this._z,$[J+3]=this._w,$}fromBufferAttribute($,J){return this._x=$.getX(J),this._y=$.getY(J),this._z=$.getZ(J),this._w=$.getW(J),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange($){return this._onChangeCallback=$,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{static{w.prototype.isVector3=!0}constructor($=0,J=0,Q=0){this.x=$,this.y=J,this.z=Q}set($,J,Q){if(Q===void 0)Q=this.z;return this.x=$,this.y=J,this.z=Q,this}setScalar($){return this.x=$,this.y=$,this.z=$,this}setX($){return this.x=$,this}setY($){return this.y=$,this}setZ($){return this.z=$,this}setComponent($,J){switch($){case 0:this.x=J;break;case 1:this.y=J;break;case 2:this.z=J;break;default:throw Error("THREE.Vector3: index is out of range: "+$)}return this}getComponent($){switch($){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+$)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy($){return this.x=$.x,this.y=$.y,this.z=$.z,this}add($){return this.x+=$.x,this.y+=$.y,this.z+=$.z,this}addScalar($){return this.x+=$,this.y+=$,this.z+=$,this}addVectors($,J){return this.x=$.x+J.x,this.y=$.y+J.y,this.z=$.z+J.z,this}addScaledVector($,J){return this.x+=$.x*J,this.y+=$.y*J,this.z+=$.z*J,this}sub($){return this.x-=$.x,this.y-=$.y,this.z-=$.z,this}subScalar($){return this.x-=$,this.y-=$,this.z-=$,this}subVectors($,J){return this.x=$.x-J.x,this.y=$.y-J.y,this.z=$.z-J.z,this}multiply($){return this.x*=$.x,this.y*=$.y,this.z*=$.z,this}multiplyScalar($){return this.x*=$,this.y*=$,this.z*=$,this}multiplyVectors($,J){return this.x=$.x*J.x,this.y=$.y*J.y,this.z=$.z*J.z,this}applyEuler($){return this.applyQuaternion(yW.setFromEuler($))}applyAxisAngle($,J){return this.applyQuaternion(yW.setFromAxisAngle($,J))}applyMatrix3($){let J=this.x,Q=this.y,W=this.z,Z=$.elements;return this.x=Z[0]*J+Z[3]*Q+Z[6]*W,this.y=Z[1]*J+Z[4]*Q+Z[7]*W,this.z=Z[2]*J+Z[5]*Q+Z[8]*W,this}applyNormalMatrix($){return this.applyMatrix3($).normalize()}applyMatrix4($){let J=this.x,Q=this.y,W=this.z,Z=$.elements,K=1/(Z[3]*J+Z[7]*Q+Z[11]*W+Z[15]);return this.x=(Z[0]*J+Z[4]*Q+Z[8]*W+Z[12])*K,this.y=(Z[1]*J+Z[5]*Q+Z[9]*W+Z[13])*K,this.z=(Z[2]*J+Z[6]*Q+Z[10]*W+Z[14])*K,this}applyQuaternion($){let J=this.x,Q=this.y,W=this.z,Z=$.x,K=$.y,H=$.z,Y=$.w,X=2*(K*W-H*Q),U=2*(H*J-Z*W),E=2*(Z*Q-K*J);return this.x=J+Y*X+K*E-H*U,this.y=Q+Y*U+H*X-Z*E,this.z=W+Y*E+Z*U-K*X,this}project($){return this.applyMatrix4($.matrixWorldInverse).applyMatrix4($.projectionMatrix)}unproject($){return this.applyMatrix4($.projectionMatrixInverse).applyMatrix4($.matrixWorld)}transformDirection($){let J=this.x,Q=this.y,W=this.z,Z=$.elements;return this.x=Z[0]*J+Z[4]*Q+Z[8]*W,this.y=Z[1]*J+Z[5]*Q+Z[9]*W,this.z=Z[2]*J+Z[6]*Q+Z[10]*W,this.normalize()}divide($){return this.x/=$.x,this.y/=$.y,this.z/=$.z,this}divideScalar($){return this.multiplyScalar(1/$)}min($){return this.x=Math.min(this.x,$.x),this.y=Math.min(this.y,$.y),this.z=Math.min(this.z,$.z),this}max($){return this.x=Math.max(this.x,$.x),this.y=Math.max(this.y,$.y),this.z=Math.max(this.z,$.z),this}clamp($,J){return this.x=m(this.x,$.x,J.x),this.y=m(this.y,$.y,J.y),this.z=m(this.z,$.z,J.z),this}clampScalar($,J){return this.x=m(this.x,$,J),this.y=m(this.y,$,J),this.z=m(this.z,$,J),this}clampLength($,J){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(m(Q,$,J))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot($){return this.x*$.x+this.y*$.y+this.z*$.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength($){return this.normalize().multiplyScalar($)}lerp($,J){return this.x+=($.x-this.x)*J,this.y+=($.y-this.y)*J,this.z+=($.z-this.z)*J,this}lerpVectors($,J,Q){return this.x=$.x+(J.x-$.x)*Q,this.y=$.y+(J.y-$.y)*Q,this.z=$.z+(J.z-$.z)*Q,this}cross($){return this.crossVectors(this,$)}crossVectors($,J){let{x:Q,y:W,z:Z}=$,K=J.x,H=J.y,Y=J.z;return this.x=W*Y-Z*H,this.y=Z*K-Q*Y,this.z=Q*H-W*K,this}projectOnVector($){let J=$.lengthSq();if(J===0)return this.set(0,0,0);let Q=$.dot(this)/J;return this.copy($).multiplyScalar(Q)}projectOnPlane($){return $J.copy(this).projectOnVector($),this.sub($J)}reflect($){return this.sub($J.copy($).multiplyScalar(2*this.dot($)))}angleTo($){let J=Math.sqrt(this.lengthSq()*$.lengthSq());if(J===0)return Math.PI/2;let Q=this.dot($)/J;return Math.acos(m(Q,-1,1))}distanceTo($){return Math.sqrt(this.distanceToSquared($))}distanceToSquared($){let J=this.x-$.x,Q=this.y-$.y,W=this.z-$.z;return J*J+Q*Q+W*W}manhattanDistanceTo($){return Math.abs(this.x-$.x)+Math.abs(this.y-$.y)+Math.abs(this.z-$.z)}setFromSpherical($){return this.setFromSphericalCoords($.radius,$.phi,$.theta)}setFromSphericalCoords($,J,Q){let W=Math.sin(J)*$;return this.x=W*Math.sin(Q),this.y=Math.cos(J)*$,this.z=W*Math.cos(Q),this}setFromCylindrical($){return this.setFromCylindricalCoords($.radius,$.theta,$.y)}setFromCylindricalCoords($,J,Q){return this.x=$*Math.sin(J),this.y=Q,this.z=$*Math.cos(J),this}setFromMatrixPosition($){let J=$.elements;return this.x=J[12],this.y=J[13],this.z=J[14],this}setFromMatrixScale($){let J=this.setFromMatrixColumn($,0).length(),Q=this.setFromMatrixColumn($,1).length(),W=this.setFromMatrixColumn($,2).length();return this.x=J,this.y=Q,this.z=W,this}setFromMatrixColumn($,J){return this.fromArray($.elements,J*4)}setFromMatrix3Column($,J){return this.fromArray($.elements,J*3)}setFromEuler($){return this.x=$._x,this.y=$._y,this.z=$._z,this}setFromColor($){return this.x=$.r,this.y=$.g,this.z=$.b,this}equals($){return $.x===this.x&&$.y===this.y&&$.z===this.z}fromArray($,J=0){return this.x=$[J],this.y=$[J+1],this.z=$[J+2],this}toArray($=[],J=0){return $[J]=this.x,$[J+1]=this.y,$[J+2]=this.z,$}fromBufferAttribute($,J){return this.x=$.getX(J),this.y=$.getY(J),this.z=$.getZ(J),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let $=Math.random()*Math.PI*2,J=Math.random()*2-1,Q=Math.sqrt(1-J*J);return this.x=Q*Math.cos($),this.y=J,this.z=Q*Math.sin($),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var $J=new w,yW=new r0;class l{static{l.prototype.isMatrix3=!0}constructor($,J,Q,W,Z,K,H,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],$!==void 0)this.set($,J,Q,W,Z,K,H,Y,X)}set($,J,Q,W,Z,K,H,Y,X){let U=this.elements;return U[0]=$,U[1]=W,U[2]=H,U[3]=J,U[4]=Z,U[5]=Y,U[6]=Q,U[7]=K,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy($){let J=this.elements,Q=$.elements;return J[0]=Q[0],J[1]=Q[1],J[2]=Q[2],J[3]=Q[3],J[4]=Q[4],J[5]=Q[5],J[6]=Q[6],J[7]=Q[7],J[8]=Q[8],this}extractBasis($,J,Q){return $.setFromMatrix3Column(this,0),J.setFromMatrix3Column(this,1),Q.setFromMatrix3Column(this,2),this}setFromMatrix4($){let J=$.elements;return this.set(J[0],J[4],J[8],J[1],J[5],J[9],J[2],J[6],J[10]),this}multiply($){return this.multiplyMatrices(this,$)}premultiply($){return this.multiplyMatrices($,this)}multiplyMatrices($,J){let Q=$.elements,W=J.elements,Z=this.elements,K=Q[0],H=Q[3],Y=Q[6],X=Q[1],U=Q[4],E=Q[7],G=Q[2],q=Q[5],F=Q[8],R=W[0],O=W[3],M=W[6],V=W[1],D=W[4],k=W[7],B=W[2],C=W[5],z=W[8];return Z[0]=K*R+H*V+Y*B,Z[3]=K*O+H*D+Y*C,Z[6]=K*M+H*k+Y*z,Z[1]=X*R+U*V+E*B,Z[4]=X*O+U*D+E*C,Z[7]=X*M+U*k+E*z,Z[2]=G*R+q*V+F*B,Z[5]=G*O+q*D+F*C,Z[8]=G*M+q*k+F*z,this}multiplyScalar($){let J=this.elements;return J[0]*=$,J[3]*=$,J[6]*=$,J[1]*=$,J[4]*=$,J[7]*=$,J[2]*=$,J[5]*=$,J[8]*=$,this}determinant(){let $=this.elements,J=$[0],Q=$[1],W=$[2],Z=$[3],K=$[4],H=$[5],Y=$[6],X=$[7],U=$[8];return J*K*U-J*H*X-Q*Z*U+Q*H*Y+W*Z*X-W*K*Y}invert(){let $=this.elements,J=$[0],Q=$[1],W=$[2],Z=$[3],K=$[4],H=$[5],Y=$[6],X=$[7],U=$[8],E=U*K-H*X,G=H*Y-U*Z,q=X*Z-K*Y,F=J*E+Q*G+W*q;if(F===0)return this.set(0,0,0,0,0,0,0,0,0);let R=1/F;return $[0]=E*R,$[1]=(W*X-U*Q)*R,$[2]=(H*Q-W*K)*R,$[3]=G*R,$[4]=(U*J-W*Y)*R,$[5]=(W*Z-H*J)*R,$[6]=q*R,$[7]=(Q*Y-X*J)*R,$[8]=(K*J-Q*Z)*R,this}transpose(){let $,J=this.elements;return $=J[1],J[1]=J[3],J[3]=$,$=J[2],J[2]=J[6],J[6]=$,$=J[5],J[5]=J[7],J[7]=$,this}getNormalMatrix($){return this.setFromMatrix4($).invert().transpose()}transposeIntoArray($){let J=this.elements;return $[0]=J[0],$[1]=J[3],$[2]=J[6],$[3]=J[1],$[4]=J[4],$[5]=J[7],$[6]=J[2],$[7]=J[5],$[8]=J[8],this}setUvTransform($,J,Q,W,Z,K,H){let Y=Math.cos(Z),X=Math.sin(Z);return this.set(Q*Y,Q*X,-Q*(Y*K+X*H)+K+$,-W*X,W*Y,-W*(-X*K+Y*H)+H+J,0,0,1),this}scale($,J){return n8("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(JJ.makeScale($,J)),this}rotate($){return n8("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(JJ.makeRotation(-$)),this}translate($,J){return n8("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(JJ.makeTranslation($,J)),this}makeTranslation($,J){if($.isVector2)this.set(1,0,$.x,0,1,$.y,0,0,1);else this.set(1,0,$,0,1,J,0,0,1);return this}makeRotation($){let J=Math.cos($),Q=Math.sin($);return this.set(J,-Q,0,Q,J,0,0,0,1),this}makeScale($,J){return this.set($,0,0,0,J,0,0,0,1),this}equals($){let J=this.elements,Q=$.elements;for(let W=0;W<9;W++)if(J[W]!==Q[W])return!1;return!0}fromArray($,J=0){for(let Q=0;Q<9;Q++)this.elements[Q]=$[Q+J];return this}toArray($=[],J=0){let Q=this.elements;return $[J]=Q[0],$[J+1]=Q[1],$[J+2]=Q[2],$[J+3]=Q[3],$[J+4]=Q[4],$[J+5]=Q[5],$[J+6]=Q[6],$[J+7]=Q[7],$[J+8]=Q[8],$}clone(){return new this.constructor().fromArray(this.elements)}}var JJ=new l,bW=new l().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),xW=new l().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function GY(){let $={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(Z,K,H){if(this.enabled===!1||K===H||!K||!H)return Z;if(this.spaces[K].transfer==="srgb")Z.r=j$(Z.r),Z.g=j$(Z.g),Z.b=j$(Z.b);if(this.spaces[K].primaries!==this.spaces[H].primaries)Z.applyMatrix3(this.spaces[K].toXYZ),Z.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")Z.r=s8(Z.r),Z.g=s8(Z.g),Z.b=s8(Z.b);return Z},workingToColorSpace:function(Z,K){return this.convert(Z,this.workingColorSpace,K)},colorSpaceToWorking:function(Z,K){return this.convert(Z,K,this.workingColorSpace)},getPrimaries:function(Z){return this.spaces[Z].primaries},getTransfer:function(Z){if(Z==="")return"linear";return this.spaces[Z].transfer},getToneMappingMode:function(Z){return this.spaces[Z].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(Z,K=this.workingColorSpace){return Z.fromArray(this.spaces[K].luminanceCoefficients)},define:function(Z){Object.assign(this.spaces,Z)},_getMatrix:function(Z,K,H){return Z.copy(this.spaces[K].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(Z){return this.spaces[Z].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(Z=this.workingColorSpace){return this.spaces[Z].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(Z,K){return n8("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),$.workingToColorSpace(Z,K)},toWorkingColorSpace:function(Z,K){return n8("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),$.colorSpaceToWorking(Z,K)}},J=[0.64,0.33,0.3,0.6,0.15,0.06],Q=[0.2126,0.7152,0.0722],W=[0.3127,0.329];return $.define({["srgb-linear"]:{primaries:J,whitePoint:W,transfer:"linear",toXYZ:bW,fromXYZ:xW,luminanceCoefficients:Q,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:J,whitePoint:W,transfer:"srgb",toXYZ:bW,fromXYZ:xW,luminanceCoefficients:Q,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),$}var A0=GY();function j$($){return $<0.04045?$*0.0773993808:Math.pow($*0.9478672986+0.0521327014,2.4)}function s8($){return $<0.0031308?$*12.92:1.055*Math.pow($,0.41666)-0.055}var A8;class tJ{static getDataURL($,J="image/png"){if(/^data:/i.test($.src))return $.src;if(typeof HTMLCanvasElement>"u")return $.src;let Q;if($ instanceof HTMLCanvasElement)Q=$;else{if(A8===void 0)A8=i9("canvas");A8.width=$.width,A8.height=$.height;let W=A8.getContext("2d");if($ instanceof ImageData)W.putImageData($,0,0);else W.drawImage($,0,0,$.width,$.height);Q=A8}return Q.toDataURL(J)}static sRGBToLinear($){if(typeof HTMLImageElement<"u"&&$ instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&$ instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&$ instanceof ImageBitmap){let J=i9("canvas");J.width=$.width,J.height=$.height;let Q=J.getContext("2d");Q.drawImage($,0,0,$.width,$.height);let W=Q.getImageData(0,0,$.width,$.height),Z=W.data;for(let K=0;K<Z.length;K++)Z[K]=j$(Z[K]/255)*255;return Q.putImageData(W,0,0),J}else if($.data){let J=$.data.slice(0);for(let Q=0;Q<J.length;Q++)if(J instanceof Uint8Array||J instanceof Uint8ClampedArray)J[Q]=Math.floor(j$(J[Q]/255)*255);else J[Q]=j$(J[Q]);return{data:J,width:$.width,height:$.height}}else return $0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),$}}var qY=0;class eJ{constructor($=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:qY++}),this.uuid=W$(),this.data=$,this.dataReady=!0,this.version=0}getSize($){let J=this.data;if(typeof HTMLVideoElement<"u"&&J instanceof HTMLVideoElement)$.set(J.videoWidth,J.videoHeight,0);else if(typeof VideoFrame<"u"&&J instanceof VideoFrame)$.set(J.displayWidth,J.displayHeight,0);else if(J!==null)$.set(J.width,J.height,J.depth||0);else $.set(0,0,0);return $}set needsUpdate($){if($===!0)this.version++}toJSON($){let J=$===void 0||typeof $==="string";if(!J&&$.images[this.uuid]!==void 0)return $.images[this.uuid];let Q={uuid:this.uuid,url:""},W=this.data;if(W!==null){let Z;if(Array.isArray(W)){Z=[];for(let K=0,H=W.length;K<H;K++)if(W[K].isDataTexture)Z.push(QJ(W[K].image));else Z.push(QJ(W[K]))}else Z=QJ(W);Q.url=Z}if(!J)$.images[this.uuid]=Q;return Q}}function QJ($){if(typeof HTMLImageElement<"u"&&$ instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&$ instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&$ instanceof ImageBitmap)return tJ.getDataURL($);else if($.data)return{data:Array.from($.data),width:$.width,height:$.height,type:$.data.constructor.name};else return $0("Texture: Unable to serialize Texture."),{}}var FY=0,WJ=new w;class u0 extends O8{constructor($=u0.DEFAULT_IMAGE,J=u0.DEFAULT_MAPPING,Q=1001,W=1001,Z=1006,K=1008,H=1023,Y=1009,X=u0.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:FY++}),this.uuid=W$(),this.name="",this.source=new eJ($),this.mipmaps=[],this.mapping=J,this.channel=0,this.wrapS=Q,this.wrapT=W,this.magFilter=Z,this.minFilter=K,this.anisotropy=X,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new S(0,0),this.repeat=new S(1,1),this.center=new S(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new l,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=$&&$.depth&&$.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(WJ).x}get height(){return this.source.getSize(WJ).y}get depth(){return this.source.getSize(WJ).z}get image(){return this.source.data}set image($){this.source.data=$}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange($,J){this.updateRanges.push({start:$,count:J})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy($){return this.name=$.name,this.source=$.source,this.mipmaps=$.mipmaps.slice(0),this.mapping=$.mapping,this.channel=$.channel,this.wrapS=$.wrapS,this.wrapT=$.wrapT,this.magFilter=$.magFilter,this.minFilter=$.minFilter,this.anisotropy=$.anisotropy,this.format=$.format,this.internalFormat=$.internalFormat,this.type=$.type,this.normalized=$.normalized,this.offset.copy($.offset),this.repeat.copy($.repeat),this.center.copy($.center),this.rotation=$.rotation,this.matrixAutoUpdate=$.matrixAutoUpdate,this.matrix.copy($.matrix),this.generateMipmaps=$.generateMipmaps,this.premultiplyAlpha=$.premultiplyAlpha,this.flipY=$.flipY,this.unpackAlignment=$.unpackAlignment,this.colorSpace=$.colorSpace,this.renderTarget=$.renderTarget,this.isRenderTargetTexture=$.isRenderTargetTexture,this.isArrayTexture=$.isArrayTexture,this.userData=JSON.parse(JSON.stringify($.userData)),this.needsUpdate=!0,this}setValues($){for(let J in $){let Q=$[J];if(Q===void 0){$0(`Texture.setValues(): parameter '${J}' has value of undefined.`);continue}let W=this[J];if(W===void 0){$0(`Texture.setValues(): property '${J}' does not exist.`);continue}if(W&&Q&&(W.isVector2&&Q.isVector2))W.copy(Q);else if(W&&Q&&(W.isVector3&&Q.isVector3))W.copy(Q);else if(W&&Q&&(W.isMatrix3&&Q.isMatrix3))W.copy(Q);else this[J]=Q}}toJSON($){let J=$===void 0||typeof $==="string";if(!J&&$.textures[this.uuid]!==void 0)return $.textures[this.uuid];let Q={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON($).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)Q.userData=this.userData;if(!J)$.textures[this.uuid]=Q;return Q}dispose(){this.dispatchEvent({type:"dispose"})}transformUv($){if(this.mapping!==300)return $;if($.applyMatrix3(this.matrix),$.x<0||$.x>1)switch(this.wrapS){case 1000:$.x=$.x-Math.floor($.x);break;case 1001:$.x=$.x<0?0:1;break;case 1002:if(Math.abs(Math.floor($.x)%2)===1)$.x=Math.ceil($.x)-$.x;else $.x=$.x-Math.floor($.x);break}if($.y<0||$.y>1)switch(this.wrapT){case 1000:$.y=$.y-Math.floor($.y);break;case 1001:$.y=$.y<0?0:1;break;case 1002:if(Math.abs(Math.floor($.y)%2)===1)$.y=Math.ceil($.y)-$.y;else $.y=$.y-Math.floor($.y);break}if(this.flipY)$.y=1-$.y;return $}set needsUpdate($){if($===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate($){if($===!0)this.pmremVersion++}}u0.DEFAULT_IMAGE=null;u0.DEFAULT_MAPPING=300;u0.DEFAULT_ANISOTROPY=1;class t0{static{t0.prototype.isVector4=!0}constructor($=0,J=0,Q=0,W=1){this.x=$,this.y=J,this.z=Q,this.w=W}get width(){return this.z}set width($){this.z=$}get height(){return this.w}set height($){this.w=$}set($,J,Q,W){return this.x=$,this.y=J,this.z=Q,this.w=W,this}setScalar($){return this.x=$,this.y=$,this.z=$,this.w=$,this}setX($){return this.x=$,this}setY($){return this.y=$,this}setZ($){return this.z=$,this}setW($){return this.w=$,this}setComponent($,J){switch($){case 0:this.x=J;break;case 1:this.y=J;break;case 2:this.z=J;break;case 3:this.w=J;break;default:throw Error("THREE.Vector4: index is out of range: "+$)}return this}getComponent($){switch($){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+$)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy($){return this.x=$.x,this.y=$.y,this.z=$.z,this.w=$.w!==void 0?$.w:1,this}add($){return this.x+=$.x,this.y+=$.y,this.z+=$.z,this.w+=$.w,this}addScalar($){return this.x+=$,this.y+=$,this.z+=$,this.w+=$,this}addVectors($,J){return this.x=$.x+J.x,this.y=$.y+J.y,this.z=$.z+J.z,this.w=$.w+J.w,this}addScaledVector($,J){return this.x+=$.x*J,this.y+=$.y*J,this.z+=$.z*J,this.w+=$.w*J,this}sub($){return this.x-=$.x,this.y-=$.y,this.z-=$.z,this.w-=$.w,this}subScalar($){return this.x-=$,this.y-=$,this.z-=$,this.w-=$,this}subVectors($,J){return this.x=$.x-J.x,this.y=$.y-J.y,this.z=$.z-J.z,this.w=$.w-J.w,this}multiply($){return this.x*=$.x,this.y*=$.y,this.z*=$.z,this.w*=$.w,this}multiplyScalar($){return this.x*=$,this.y*=$,this.z*=$,this.w*=$,this}applyMatrix4($){let J=this.x,Q=this.y,W=this.z,Z=this.w,K=$.elements;return this.x=K[0]*J+K[4]*Q+K[8]*W+K[12]*Z,this.y=K[1]*J+K[5]*Q+K[9]*W+K[13]*Z,this.z=K[2]*J+K[6]*Q+K[10]*W+K[14]*Z,this.w=K[3]*J+K[7]*Q+K[11]*W+K[15]*Z,this}divide($){return this.x/=$.x,this.y/=$.y,this.z/=$.z,this.w/=$.w,this}divideScalar($){return this.multiplyScalar(1/$)}setAxisAngleFromQuaternion($){this.w=2*Math.acos($.w);let J=Math.sqrt(1-$.w*$.w);if(J<0.0001)this.x=1,this.y=0,this.z=0;else this.x=$.x/J,this.y=$.y/J,this.z=$.z/J;return this}setAxisAngleFromRotationMatrix($){let J,Q,W,Z,K=0.01,H=0.1,Y=$.elements,X=Y[0],U=Y[4],E=Y[8],G=Y[1],q=Y[5],F=Y[9],R=Y[2],O=Y[6],M=Y[10];if(Math.abs(U-G)<0.01&&Math.abs(E-R)<0.01&&Math.abs(F-O)<0.01){if(Math.abs(U+G)<0.1&&Math.abs(E+R)<0.1&&Math.abs(F+O)<0.1&&Math.abs(X+q+M-3)<0.1)return this.set(1,0,0,0),this;J=Math.PI;let D=(X+1)/2,k=(q+1)/2,B=(M+1)/2,C=(U+G)/4,z=(E+R)/4,_=(F+O)/4;if(D>k&&D>B)if(D<0.01)Q=0,W=0.707106781,Z=0.707106781;else Q=Math.sqrt(D),W=C/Q,Z=z/Q;else if(k>B)if(k<0.01)Q=0.707106781,W=0,Z=0.707106781;else W=Math.sqrt(k),Q=C/W,Z=_/W;else if(B<0.01)Q=0.707106781,W=0.707106781,Z=0;else Z=Math.sqrt(B),Q=z/Z,W=_/Z;return this.set(Q,W,Z,J),this}let V=Math.sqrt((O-F)*(O-F)+(E-R)*(E-R)+(G-U)*(G-U));if(Math.abs(V)<0.001)V=1;return this.x=(O-F)/V,this.y=(E-R)/V,this.z=(G-U)/V,this.w=Math.acos((X+q+M-1)/2),this}setFromMatrixPosition($){let J=$.elements;return this.x=J[12],this.y=J[13],this.z=J[14],this.w=J[15],this}min($){return this.x=Math.min(this.x,$.x),this.y=Math.min(this.y,$.y),this.z=Math.min(this.z,$.z),this.w=Math.min(this.w,$.w),this}max($){return this.x=Math.max(this.x,$.x),this.y=Math.max(this.y,$.y),this.z=Math.max(this.z,$.z),this.w=Math.max(this.w,$.w),this}clamp($,J){return this.x=m(this.x,$.x,J.x),this.y=m(this.y,$.y,J.y),this.z=m(this.z,$.z,J.z),this.w=m(this.w,$.w,J.w),this}clampScalar($,J){return this.x=m(this.x,$,J),this.y=m(this.y,$,J),this.z=m(this.z,$,J),this.w=m(this.w,$,J),this}clampLength($,J){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(m(Q,$,J))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot($){return this.x*$.x+this.y*$.y+this.z*$.z+this.w*$.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength($){return this.normalize().multiplyScalar($)}lerp($,J){return this.x+=($.x-this.x)*J,this.y+=($.y-this.y)*J,this.z+=($.z-this.z)*J,this.w+=($.w-this.w)*J,this}lerpVectors($,J,Q){return this.x=$.x+(J.x-$.x)*Q,this.y=$.y+(J.y-$.y)*Q,this.z=$.z+(J.z-$.z)*Q,this.w=$.w+(J.w-$.w)*Q,this}equals($){return $.x===this.x&&$.y===this.y&&$.z===this.z&&$.w===this.w}fromArray($,J=0){return this.x=$[J],this.y=$[J+1],this.z=$[J+2],this.w=$[J+3],this}toArray($=[],J=0){return $[J]=this.x,$[J+1]=this.y,$[J+2]=this.z,$[J+3]=this.w,$}fromBufferAttribute($,J){return this.x=$.getX(J),this.y=$.getY(J),this.z=$.getZ(J),this.w=$.getW(J),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class u{static{u.prototype.isMatrix4=!0}constructor($,J,Q,W,Z,K,H,Y,X,U,E,G,q,F,R,O){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],$!==void 0)this.set($,J,Q,W,Z,K,H,Y,X,U,E,G,q,F,R,O)}set($,J,Q,W,Z,K,H,Y,X,U,E,G,q,F,R,O){let M=this.elements;return M[0]=$,M[4]=J,M[8]=Q,M[12]=W,M[1]=Z,M[5]=K,M[9]=H,M[13]=Y,M[2]=X,M[6]=U,M[10]=E,M[14]=G,M[3]=q,M[7]=F,M[11]=R,M[15]=O,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new u().fromArray(this.elements)}copy($){let J=this.elements,Q=$.elements;return J[0]=Q[0],J[1]=Q[1],J[2]=Q[2],J[3]=Q[3],J[4]=Q[4],J[5]=Q[5],J[6]=Q[6],J[7]=Q[7],J[8]=Q[8],J[9]=Q[9],J[10]=Q[10],J[11]=Q[11],J[12]=Q[12],J[13]=Q[13],J[14]=Q[14],J[15]=Q[15],this}copyPosition($){let J=this.elements,Q=$.elements;return J[12]=Q[12],J[13]=Q[13],J[14]=Q[14],this}setFromMatrix3($){let J=$.elements;return this.set(J[0],J[3],J[6],0,J[1],J[4],J[7],0,J[2],J[5],J[8],0,0,0,0,1),this}extractBasis($,J,Q){if(this.determinantAffine()===0)return $.set(1,0,0),J.set(0,1,0),Q.set(0,0,1),this;return $.setFromMatrixColumn(this,0),J.setFromMatrixColumn(this,1),Q.setFromMatrixColumn(this,2),this}makeBasis($,J,Q){return this.set($.x,J.x,Q.x,0,$.y,J.y,Q.y,0,$.z,J.z,Q.z,0,0,0,0,1),this}extractRotation($){if($.determinantAffine()===0)return this.identity();let J=this.elements,Q=$.elements,W=1/S8.setFromMatrixColumn($,0).length(),Z=1/S8.setFromMatrixColumn($,1).length(),K=1/S8.setFromMatrixColumn($,2).length();return J[0]=Q[0]*W,J[1]=Q[1]*W,J[2]=Q[2]*W,J[3]=0,J[4]=Q[4]*Z,J[5]=Q[5]*Z,J[6]=Q[6]*Z,J[7]=0,J[8]=Q[8]*K,J[9]=Q[9]*K,J[10]=Q[10]*K,J[11]=0,J[12]=0,J[13]=0,J[14]=0,J[15]=1,this}makeRotationFromEuler($){let J=this.elements,Q=$.x,W=$.y,Z=$.z,K=Math.cos(Q),H=Math.sin(Q),Y=Math.cos(W),X=Math.sin(W),U=Math.cos(Z),E=Math.sin(Z);if($.order==="XYZ"){let G=K*U,q=K*E,F=H*U,R=H*E;J[0]=Y*U,J[4]=-Y*E,J[8]=X,J[1]=q+F*X,J[5]=G-R*X,J[9]=-H*Y,J[2]=R-G*X,J[6]=F+q*X,J[10]=K*Y}else if($.order==="YXZ"){let G=Y*U,q=Y*E,F=X*U,R=X*E;J[0]=G+R*H,J[4]=F*H-q,J[8]=K*X,J[1]=K*E,J[5]=K*U,J[9]=-H,J[2]=q*H-F,J[6]=R+G*H,J[10]=K*Y}else if($.order==="ZXY"){let G=Y*U,q=Y*E,F=X*U,R=X*E;J[0]=G-R*H,J[4]=-K*E,J[8]=F+q*H,J[1]=q+F*H,J[5]=K*U,J[9]=R-G*H,J[2]=-K*X,J[6]=H,J[10]=K*Y}else if($.order==="ZYX"){let G=K*U,q=K*E,F=H*U,R=H*E;J[0]=Y*U,J[4]=F*X-q,J[8]=G*X+R,J[1]=Y*E,J[5]=R*X+G,J[9]=q*X-F,J[2]=-X,J[6]=H*Y,J[10]=K*Y}else if($.order==="YZX"){let G=K*Y,q=K*X,F=H*Y,R=H*X;J[0]=Y*U,J[4]=R-G*E,J[8]=F*E+q,J[1]=E,J[5]=K*U,J[9]=-H*U,J[2]=-X*U,J[6]=q*E+F,J[10]=G-R*E}else if($.order==="XZY"){let G=K*Y,q=K*X,F=H*Y,R=H*X;J[0]=Y*U,J[4]=-E,J[8]=X*U,J[1]=G*E+R,J[5]=K*U,J[9]=q*E-F,J[2]=F*E-q,J[6]=H*U,J[10]=R*E+G}return J[3]=0,J[7]=0,J[11]=0,J[12]=0,J[13]=0,J[14]=0,J[15]=1,this}makeRotationFromQuaternion($){return this.compose(RY,$,OY)}lookAt($,J,Q){let W=this.elements;if(s0.subVectors($,J),s0.lengthSq()===0)s0.z=1;if(s0.normalize(),g$.crossVectors(Q,s0),g$.lengthSq()===0){if(Math.abs(Q.z)===1)s0.x+=0.0001;else s0.z+=0.0001;s0.normalize(),g$.crossVectors(Q,s0)}return g$.normalize(),L9.crossVectors(s0,g$),W[0]=g$.x,W[4]=L9.x,W[8]=s0.x,W[1]=g$.y,W[5]=L9.y,W[9]=s0.y,W[2]=g$.z,W[6]=L9.z,W[10]=s0.z,this}multiply($){return this.multiplyMatrices(this,$)}premultiply($){return this.multiplyMatrices($,this)}multiplyMatrices($,J){let Q=$.elements,W=J.elements,Z=this.elements,K=Q[0],H=Q[4],Y=Q[8],X=Q[12],U=Q[1],E=Q[5],G=Q[9],q=Q[13],F=Q[2],R=Q[6],O=Q[10],M=Q[14],V=Q[3],D=Q[7],k=Q[11],B=Q[15],C=W[0],z=W[4],_=W[8],P=W[12],T=W[1],f=W[5],b=W[9],x=W[13],d=W[2],A=W[6],s=W[10],L0=W[14],_0=W[3],Y0=W[7],E0=W[11],C0=W[15];return Z[0]=K*C+H*T+Y*d+X*_0,Z[4]=K*z+H*f+Y*A+X*Y0,Z[8]=K*_+H*b+Y*s+X*E0,Z[12]=K*P+H*x+Y*L0+X*C0,Z[1]=U*C+E*T+G*d+q*_0,Z[5]=U*z+E*f+G*A+q*Y0,Z[9]=U*_+E*b+G*s+q*E0,Z[13]=U*P+E*x+G*L0+q*C0,Z[2]=F*C+R*T+O*d+M*_0,Z[6]=F*z+R*f+O*A+M*Y0,Z[10]=F*_+R*b+O*s+M*E0,Z[14]=F*P+R*x+O*L0+M*C0,Z[3]=V*C+D*T+k*d+B*_0,Z[7]=V*z+D*f+k*A+B*Y0,Z[11]=V*_+D*b+k*s+B*E0,Z[15]=V*P+D*x+k*L0+B*C0,this}multiplyScalar($){let J=this.elements;return J[0]*=$,J[4]*=$,J[8]*=$,J[12]*=$,J[1]*=$,J[5]*=$,J[9]*=$,J[13]*=$,J[2]*=$,J[6]*=$,J[10]*=$,J[14]*=$,J[3]*=$,J[7]*=$,J[11]*=$,J[15]*=$,this}determinant(){let $=this.elements,J=$[0],Q=$[4],W=$[8],Z=$[12],K=$[1],H=$[5],Y=$[9],X=$[13],U=$[2],E=$[6],G=$[10],q=$[14],F=$[3],R=$[7],O=$[11],M=$[15],V=Y*q-X*G,D=H*q-X*E,k=H*G-Y*E,B=K*q-X*U,C=K*G-Y*U,z=K*E-H*U;return J*(R*V-O*D+M*k)-Q*(F*V-O*B+M*C)+W*(F*D-R*B+M*z)-Z*(F*k-R*C+O*z)}determinantAffine(){let $=this.elements,J=$[0],Q=$[4],W=$[8],Z=$[1],K=$[5],H=$[9],Y=$[2],X=$[6],U=$[10];return J*(K*U-H*X)-Q*(Z*U-H*Y)+W*(Z*X-K*Y)}transpose(){let $=this.elements,J;return J=$[1],$[1]=$[4],$[4]=J,J=$[2],$[2]=$[8],$[8]=J,J=$[6],$[6]=$[9],$[9]=J,J=$[3],$[3]=$[12],$[12]=J,J=$[7],$[7]=$[13],$[13]=J,J=$[11],$[11]=$[14],$[14]=J,this}setPosition($,J,Q){let W=this.elements;if($.isVector3)W[12]=$.x,W[13]=$.y,W[14]=$.z;else W[12]=$,W[13]=J,W[14]=Q;return this}invert(){let $=this.elements,J=$[0],Q=$[1],W=$[2],Z=$[3],K=$[4],H=$[5],Y=$[6],X=$[7],U=$[8],E=$[9],G=$[10],q=$[11],F=$[12],R=$[13],O=$[14],M=$[15],V=J*H-Q*K,D=J*Y-W*K,k=J*X-Z*K,B=Q*Y-W*H,C=Q*X-Z*H,z=W*X-Z*Y,_=U*R-E*F,P=U*O-G*F,T=U*M-q*F,f=E*O-G*R,b=E*M-q*R,x=G*M-q*O,d=V*x-D*b+k*f+B*T-C*P+z*_;if(d===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/d;return $[0]=(H*x-Y*b+X*f)*A,$[1]=(W*b-Q*x-Z*f)*A,$[2]=(R*z-O*C+M*B)*A,$[3]=(G*C-E*z-q*B)*A,$[4]=(Y*T-K*x-X*P)*A,$[5]=(J*x-W*T+Z*P)*A,$[6]=(O*k-F*z-M*D)*A,$[7]=(U*z-G*k+q*D)*A,$[8]=(K*b-H*T+X*_)*A,$[9]=(Q*T-J*b-Z*_)*A,$[10]=(F*C-R*k+M*V)*A,$[11]=(E*k-U*C-q*V)*A,$[12]=(H*P-K*f-Y*_)*A,$[13]=(J*f-Q*P+W*_)*A,$[14]=(R*D-F*B-O*V)*A,$[15]=(U*B-E*D+G*V)*A,this}scale($){let J=this.elements,Q=$.x,W=$.y,Z=$.z;return J[0]*=Q,J[4]*=W,J[8]*=Z,J[1]*=Q,J[5]*=W,J[9]*=Z,J[2]*=Q,J[6]*=W,J[10]*=Z,J[3]*=Q,J[7]*=W,J[11]*=Z,this}getMaxScaleOnAxis(){let $=this.elements,J=$[0]*$[0]+$[1]*$[1]+$[2]*$[2],Q=$[4]*$[4]+$[5]*$[5]+$[6]*$[6],W=$[8]*$[8]+$[9]*$[9]+$[10]*$[10];return Math.sqrt(Math.max(J,Q,W))}makeTranslation($,J,Q){if($.isVector3)this.set(1,0,0,$.x,0,1,0,$.y,0,0,1,$.z,0,0,0,1);else this.set(1,0,0,$,0,1,0,J,0,0,1,Q,0,0,0,1);return this}makeRotationX($){let J=Math.cos($),Q=Math.sin($);return this.set(1,0,0,0,0,J,-Q,0,0,Q,J,0,0,0,0,1),this}makeRotationY($){let J=Math.cos($),Q=Math.sin($);return this.set(J,0,Q,0,0,1,0,0,-Q,0,J,0,0,0,0,1),this}makeRotationZ($){let J=Math.cos($),Q=Math.sin($);return this.set(J,-Q,0,0,Q,J,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis($,J){let Q=Math.cos(J),W=Math.sin(J),Z=1-Q,K=$.x,H=$.y,Y=$.z,X=Z*K,U=Z*H;return this.set(X*K+Q,X*H-W*Y,X*Y+W*H,0,X*H+W*Y,U*H+Q,U*Y-W*K,0,X*Y-W*H,U*Y+W*K,Z*Y*Y+Q,0,0,0,0,1),this}makeScale($,J,Q){return this.set($,0,0,0,0,J,0,0,0,0,Q,0,0,0,0,1),this}makeShear($,J,Q,W,Z,K){return this.set(1,Q,Z,0,$,1,K,0,J,W,1,0,0,0,0,1),this}compose($,J,Q){let W=this.elements,Z=J._x,K=J._y,H=J._z,Y=J._w,X=Z+Z,U=K+K,E=H+H,G=Z*X,q=Z*U,F=Z*E,R=K*U,O=K*E,M=H*E,V=Y*X,D=Y*U,k=Y*E,B=Q.x,C=Q.y,z=Q.z;return W[0]=(1-(R+M))*B,W[1]=(q+k)*B,W[2]=(F-D)*B,W[3]=0,W[4]=(q-k)*C,W[5]=(1-(G+M))*C,W[6]=(O+V)*C,W[7]=0,W[8]=(F+D)*z,W[9]=(O-V)*z,W[10]=(1-(G+R))*z,W[11]=0,W[12]=$.x,W[13]=$.y,W[14]=$.z,W[15]=1,this}decompose($,J,Q){let W=this.elements;$.x=W[12],$.y=W[13],$.z=W[14];let Z=this.determinantAffine();if(Z===0)return Q.set(1,1,1),J.identity(),this;let K=S8.set(W[0],W[1],W[2]).length(),H=S8.set(W[4],W[5],W[6]).length(),Y=S8.set(W[8],W[9],W[10]).length();if(Z<0)K=-K;U$.copy(this);let X=1/K,U=1/H,E=1/Y;return U$.elements[0]*=X,U$.elements[1]*=X,U$.elements[2]*=X,U$.elements[4]*=U,U$.elements[5]*=U,U$.elements[6]*=U,U$.elements[8]*=E,U$.elements[9]*=E,U$.elements[10]*=E,J.setFromRotationMatrix(U$),Q.x=K,Q.y=H,Q.z=Y,this}makePerspective($,J,Q,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2*Z/(J-$),E=2*Z/(Q-W),G=(J+$)/(J-$),q=(Q+W)/(Q-W),F,R;if(Y)F=Z/(K-Z),R=K*Z/(K-Z);else if(H===2000)F=-(K+Z)/(K-Z),R=-2*K*Z/(K-Z);else if(H===2001)F=-K/(K-Z),R=-K*Z/(K-Z);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=G,X[12]=0,X[1]=0,X[5]=E,X[9]=q,X[13]=0,X[2]=0,X[6]=0,X[10]=F,X[14]=R,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic($,J,Q,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2/(J-$),E=2/(Q-W),G=-(J+$)/(J-$),q=-(Q+W)/(Q-W),F,R;if(Y)F=1/(K-Z),R=K/(K-Z);else if(H===2000)F=-2/(K-Z),R=-(K+Z)/(K-Z);else if(H===2001)F=-1/(K-Z),R=-Z/(K-Z);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=0,X[12]=G,X[1]=0,X[5]=E,X[9]=0,X[13]=q,X[2]=0,X[6]=0,X[10]=F,X[14]=R,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals($){let J=this.elements,Q=$.elements;for(let W=0;W<16;W++)if(J[W]!==Q[W])return!1;return!0}fromArray($,J=0){for(let Q=0;Q<16;Q++)this.elements[Q]=$[Q+J];return this}toArray($=[],J=0){let Q=this.elements;return $[J]=Q[0],$[J+1]=Q[1],$[J+2]=Q[2],$[J+3]=Q[3],$[J+4]=Q[4],$[J+5]=Q[5],$[J+6]=Q[6],$[J+7]=Q[7],$[J+8]=Q[8],$[J+9]=Q[9],$[J+10]=Q[10],$[J+11]=Q[11],$[J+12]=Q[12],$[J+13]=Q[13],$[J+14]=Q[14],$[J+15]=Q[15],$}}var S8=new w,U$=new u,RY=new w(0,0,0),OY=new w(1,1,1),g$=new w,L9=new w,s0=new w,gW=new u,pW=new r0;class L8{constructor($=0,J=0,Q=0,W=L8.DEFAULT_ORDER){this.isEuler=!0,this._x=$,this._y=J,this._z=Q,this._order=W}get x(){return this._x}set x($){this._x=$,this._onChangeCallback()}get y(){return this._y}set y($){this._y=$,this._onChangeCallback()}get z(){return this._z}set z($){this._z=$,this._onChangeCallback()}get order(){return this._order}set order($){this._order=$,this._onChangeCallback()}set($,J,Q,W=this._order){return this._x=$,this._y=J,this._z=Q,this._order=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy($){return this._x=$._x,this._y=$._y,this._z=$._z,this._order=$._order,this._onChangeCallback(),this}setFromRotationMatrix($,J=this._order,Q=!0){let W=$.elements,Z=W[0],K=W[4],H=W[8],Y=W[1],X=W[5],U=W[9],E=W[2],G=W[6],q=W[10];switch(J){case"XYZ":if(this._y=Math.asin(m(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-U,q),this._z=Math.atan2(-K,Z);else this._x=Math.atan2(G,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-m(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(H,q),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-E,Z),this._z=0;break;case"ZXY":if(this._x=Math.asin(m(G,-1,1)),Math.abs(G)<0.9999999)this._y=Math.atan2(-E,q),this._z=Math.atan2(-K,X);else this._y=0,this._z=Math.atan2(Y,Z);break;case"ZYX":if(this._y=Math.asin(-m(E,-1,1)),Math.abs(E)<0.9999999)this._x=Math.atan2(G,q),this._z=Math.atan2(Y,Z);else this._x=0,this._z=Math.atan2(-K,X);break;case"YZX":if(this._z=Math.asin(m(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-E,Z);else this._x=0,this._y=Math.atan2(H,q);break;case"XZY":if(this._z=Math.asin(-m(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(G,X),this._y=Math.atan2(H,Z);else this._x=Math.atan2(-U,q),this._y=0;break;default:$0("Euler: .setFromRotationMatrix() encountered an unknown order: "+J)}if(this._order=J,Q===!0)this._onChangeCallback();return this}setFromQuaternion($,J,Q){return gW.makeRotationFromQuaternion($),this.setFromRotationMatrix(gW,J,Q)}setFromVector3($,J=this._order){return this.set($.x,$.y,$.z,J)}reorder($){return pW.setFromEuler(this),this.setFromQuaternion(pW,$)}equals($){return $._x===this._x&&$._y===this._y&&$._z===this._z&&$._order===this._order}fromArray($){if(this._x=$[0],this._y=$[1],this._z=$[2],$[3]!==void 0)this._order=$[3];return this._onChangeCallback(),this}toArray($=[],J=0){return $[J]=this._x,$[J+1]=this._y,$[J+2]=this._z,$[J+3]=this._order,$}_onChange($){return this._onChangeCallback=$,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}L8.DEFAULT_ORDER="XYZ";class J7{constructor(){this.mask=1}set($){this.mask=(1<<$|0)>>>0}enable($){this.mask|=1<<$|0}enableAll(){this.mask=-1}toggle($){this.mask^=1<<$|0}disable($){this.mask&=~(1<<$|0)}disableAll(){this.mask=0}test($){return(this.mask&$.mask)!==0}isEnabled($){return(this.mask&(1<<$|0))!==0}}var LY=0,lW=new w,j8=new r0,z$=new u,M9=new w,w6=new w,MY=new w,wY=new r0,uW=new w(1,0,0),dW=new w(0,1,0),mW=new w(0,0,1),cW={type:"added"},VY={type:"removed"},f8={type:"childadded",child:null},ZJ={type:"childremoved",child:null};class X0 extends O8{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:LY++}),this.uuid=W$(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=X0.DEFAULT_UP.clone();let $=new w,J=new L8,Q=new r0,W=new w(1,1,1);function Z(){Q.setFromEuler(J,!1)}function K(){J.setFromQuaternion(Q,void 0,!1)}J._onChange(Z),Q._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:$},rotation:{configurable:!0,enumerable:!0,value:J},quaternion:{configurable:!0,enumerable:!0,value:Q},scale:{configurable:!0,enumerable:!0,value:W},modelViewMatrix:{value:new u},normalMatrix:{value:new l}}),this.matrix=new u,this.matrixWorld=new u,this.matrixAutoUpdate=X0.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=X0.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new J7,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4($){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply($),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion($){return this.quaternion.premultiply($),this}setRotationFromAxisAngle($,J){this.quaternion.setFromAxisAngle($,J)}setRotationFromEuler($){this.quaternion.setFromEuler($,!0)}setRotationFromMatrix($){this.quaternion.setFromRotationMatrix($)}setRotationFromQuaternion($){this.quaternion.copy($)}rotateOnAxis($,J){return j8.setFromAxisAngle($,J),this.quaternion.multiply(j8),this}rotateOnWorldAxis($,J){return j8.setFromAxisAngle($,J),this.quaternion.premultiply(j8),this}rotateX($){return this.rotateOnAxis(uW,$)}rotateY($){return this.rotateOnAxis(dW,$)}rotateZ($){return this.rotateOnAxis(mW,$)}translateOnAxis($,J){return lW.copy($).applyQuaternion(this.quaternion),this.position.add(lW.multiplyScalar(J)),this}translateX($){return this.translateOnAxis(uW,$)}translateY($){return this.translateOnAxis(dW,$)}translateZ($){return this.translateOnAxis(mW,$)}localToWorld($){return this.updateWorldMatrix(!0,!1),$.applyMatrix4(this.matrixWorld)}worldToLocal($){return this.updateWorldMatrix(!0,!1),$.applyMatrix4(z$.copy(this.matrixWorld).invert())}lookAt($,J,Q){if($.isVector3)M9.copy($);else M9.set($,J,Q);let W=this.parent;if(this.updateWorldMatrix(!0,!1),w6.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)z$.lookAt(w6,M9,this.up);else z$.lookAt(M9,w6,this.up);if(this.quaternion.setFromRotationMatrix(z$),W)z$.extractRotation(W.matrixWorld),j8.setFromRotationMatrix(z$),this.quaternion.premultiply(j8.invert())}add($){if(arguments.length>1){for(let J=0;J<arguments.length;J++)this.add(arguments[J]);return this}if($===this)return G0("Object3D.add: object can't be added as a child of itself.",$),this;if($&&$.isObject3D)$.removeFromParent(),$.parent=this,this.children.push($),$.dispatchEvent(cW),f8.child=$,this.dispatchEvent(f8),f8.child=null;else G0("Object3D.add: object not an instance of THREE.Object3D.",$);return this}remove($){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.remove(arguments[Q]);return this}let J=this.children.indexOf($);if(J!==-1)$.parent=null,this.children.splice(J,1),$.dispatchEvent(VY),ZJ.child=$,this.dispatchEvent(ZJ),ZJ.child=null;return this}removeFromParent(){let $=this.parent;if($!==null)$.remove(this);return this}clear(){return this.remove(...this.children)}attach($){if(this.updateWorldMatrix(!0,!1),z$.copy(this.matrixWorld).invert(),$.parent!==null)$.parent.updateWorldMatrix(!0,!1),z$.multiply($.parent.matrixWorld);return $.applyMatrix4(z$),$.removeFromParent(),$.parent=this,this.children.push($),$.updateWorldMatrix(!1,!0),$.dispatchEvent(cW),f8.child=$,this.dispatchEvent(f8),f8.child=null,this}getObjectById($){return this.getObjectByProperty("id",$)}getObjectByName($){return this.getObjectByProperty("name",$)}getObjectByProperty($,J){if(this[$]===J)return this;for(let Q=0,W=this.children.length;Q<W;Q++){let K=this.children[Q].getObjectByProperty($,J);if(K!==void 0)return K}return}getObjectsByProperty($,J,Q=[]){if(this[$]===J)Q.push(this);let W=this.children;for(let Z=0,K=W.length;Z<K;Z++)W[Z].getObjectsByProperty($,J,Q);return Q}getWorldPosition($){return this.updateWorldMatrix(!0,!1),$.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion($){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(w6,$,MY),$}getWorldScale($){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(w6,wY,$),$}getWorldDirection($){this.updateWorldMatrix(!0,!1);let J=this.matrixWorld.elements;return $.set(J[8],J[9],J[10]).normalize()}raycast(){}intersectsFrustum(){}traverse($){$(this);let J=this.children;for(let Q=0,W=J.length;Q<W;Q++)J[Q].traverse($)}traverseVisible($){if(this.visible===!1)return;$(this);let J=this.children;for(let Q=0,W=J.length;Q<W;Q++)J[Q].traverseVisible($)}traverseAncestors($){let J=this.parent;if(J!==null)$(J),J.traverseAncestors($)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let $=this.pivot;if($!==null){let{x:J,y:Q,z:W}=$,Z=this.matrix.elements;Z[12]+=J-Z[0]*J-Z[4]*Q-Z[8]*W,Z[13]+=Q-Z[1]*J-Z[5]*Q-Z[9]*W,Z[14]+=W-Z[2]*J-Z[6]*Q-Z[10]*W}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld($){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}let J=this.children;for(let Q=0,W=J.length;Q<W;Q++)J[Q].updateMatrixWorld($)}updateWorldMatrix($,J,Q=!1){let W=this.parent;if($===!0&&W!==null)W.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||Q){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,Q=!0}if(J===!0){let Z=this.children;for(let K=0,H=Z.length;K<H;K++)Z[K].updateWorldMatrix(!1,!0,Q)}}toJSON($){let J=$===void 0||typeof $==="string",Q={};if(J)$={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},Q.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let W={};if(W.uuid=this.uuid,W.type=this.type,W.name=this.name,W.castShadow=this.castShadow,W.receiveShadow=this.receiveShadow,W.visible=this.visible,W.frustumCulled=this.frustumCulled,W.renderOrder=this.renderOrder,W.static=this.static,W.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)W.userData=this.userData;if(W.layers=this.layers.mask,W.matrix=this.matrix.toArray(),W.up=this.up.toArray(),this.pivot!==null)W.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)W.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)W.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(W.type="InstancedMesh",W.count=this.count,W.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)W.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(W.type="BatchedMesh",W.perObjectFrustumCulled=this.perObjectFrustumCulled,W.sortObjects=this.sortObjects,W.drawRanges=this._drawRanges,W.reservedRanges=this._reservedRanges,W.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),W.instanceInfo=this._instanceInfo.map((H)=>({...H})),W.availableInstanceIds=this._availableInstanceIds.slice(),W.availableGeometryIds=this._availableGeometryIds.slice(),W.nextIndexStart=this._nextIndexStart,W.nextVertexStart=this._nextVertexStart,W.geometryCount=this._geometryCount,W.maxInstanceCount=this._maxInstanceCount,W.maxVertexCount=this._maxVertexCount,W.maxIndexCount=this._maxIndexCount,W.geometryInitialized=this._geometryInitialized,W.matricesTexture=this._matricesTexture.toJSON($),W.indirectTexture=this._indirectTexture.toJSON($),this._colorsTexture!==null)W.colorsTexture=this._colorsTexture.toJSON($);if(this.boundingSphere!==null)W.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)W.boundingBox=this.boundingBox.toJSON()}function Z(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON($);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)W.background=this.background.toJSON();else if(this.background.isTexture)W.background=this.background.toJSON($).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)W.environment=this.environment.toJSON($).uuid}else if(this.isMesh||this.isLine||this.isPoints){W.geometry=Z($.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let E=Y[X];Z($.shapes,E)}else Z($.shapes,Y)}}if(this.isSkinnedMesh){if(W.bindMode=this.bindMode,W.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)Z($.skeletons,this.skeleton),W.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,X=this.material.length;Y<X;Y++)H.push(Z($.materials,this.material[Y]));W.material=H}else W.material=Z($.materials,this.material);if(this.children.length>0){W.children=[];for(let H=0;H<this.children.length;H++)W.children.push(this.children[H].toJSON($).object)}if(this.animations.length>0){W.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];W.animations.push(Z($.animations,Y))}}if(J){let H=K($.geometries),Y=K($.materials),X=K($.textures),U=K($.images),E=K($.shapes),G=K($.skeletons),q=K($.animations),F=K($.nodes);if(H.length>0)Q.geometries=H;if(Y.length>0)Q.materials=Y;if(X.length>0)Q.textures=X;if(U.length>0)Q.images=U;if(E.length>0)Q.shapes=E;if(G.length>0)Q.skeletons=G;if(q.length>0)Q.animations=q;if(F.length>0)Q.nodes=F}return Q.object=W,Q;function K(H){let Y=[];for(let X in H){let U=H[X];delete U.metadata,Y.push(U)}return Y}}clone($){return new this.constructor().copy(this,$)}copy($,J=!0){if(this.name=$.name,this.up.copy($.up),this.position.copy($.position),this.rotation.order=$.rotation.order,this.quaternion.copy($.quaternion),this.scale.copy($.scale),this.pivot=$.pivot!==null?$.pivot.clone():null,this.matrix.copy($.matrix),this.matrixWorld.copy($.matrixWorld),this.matrixAutoUpdate=$.matrixAutoUpdate,this.matrixWorldAutoUpdate=$.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=$.matrixWorldNeedsUpdate,this.layers.mask=$.layers.mask,this.visible=$.visible,this.castShadow=$.castShadow,this.receiveShadow=$.receiveShadow,this.frustumCulled=$.frustumCulled,this.renderOrder=$.renderOrder,this.static=$.static,this.animations=$.animations.slice(),this.userData=JSON.parse(JSON.stringify($.userData)),J===!0)for(let Q=0;Q<$.children.length;Q++){let W=$.children[Q];this.add(W.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}X0.DEFAULT_UP=new w(0,1,0);X0.DEFAULT_MATRIX_AUTO_UPDATE=!0;X0.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class c extends X0{constructor(){super();this.isGroup=!0,this.type="Group"}}var yZ={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},p$={h:0,s:0,l:0},w9={h:0,s:0,l:0};function KJ($,J,Q){if(Q<0)Q+=1;if(Q>1)Q-=1;if(Q<0.16666666666666666)return $+(J-$)*6*Q;if(Q<0.5)return J;if(Q<0.6666666666666666)return $+(J-$)*6*(0.6666666666666666-Q);return $}class h{constructor($,J,Q){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set($,J,Q)}set($,J,Q){if(J===void 0&&Q===void 0){let W=$;if(W&&W.isColor)this.copy(W);else if(typeof W==="number")this.setHex(W);else if(typeof W==="string")this.setStyle(W)}else this.setRGB($,J,Q);return this}setScalar($){return this.r=$,this.g=$,this.b=$,this}setHex($,J="srgb"){return $=Math.floor($),this.r=($>>16&255)/255,this.g=($>>8&255)/255,this.b=($&255)/255,A0.colorSpaceToWorking(this,J),this}setRGB($,J,Q,W=A0.workingColorSpace){return this.r=$,this.g=J,this.b=Q,A0.colorSpaceToWorking(this,W),this}setHSL($,J,Q,W=A0.workingColorSpace){if($=rJ($,1),J=m(J,0,1),Q=m(Q,0,1),J===0)this.r=this.g=this.b=Q;else{let Z=Q<=0.5?Q*(1+J):Q+J-Q*J,K=2*Q-Z;this.r=KJ(K,Z,$+0.3333333333333333),this.g=KJ(K,Z,$),this.b=KJ(K,Z,$-0.3333333333333333)}return A0.colorSpaceToWorking(this,W),this}setStyle($,J="srgb"){function Q(Z){if(Z===void 0)return;if(parseFloat(Z)<1)$0("Color: Alpha component of "+$+" will be ignored.")}let W;if(W=/^(\w+)\(([^\)]*)\)/.exec($)){let Z,K=W[1],H=W[2];switch(K){case"rgb":case"rgba":if(Z=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(Z[4]),this.setRGB(Math.min(255,parseInt(Z[1],10))/255,Math.min(255,parseInt(Z[2],10))/255,Math.min(255,parseInt(Z[3],10))/255,J);if(Z=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(Z[4]),this.setRGB(Math.min(100,parseInt(Z[1],10))/100,Math.min(100,parseInt(Z[2],10))/100,Math.min(100,parseInt(Z[3],10))/100,J);break;case"hsl":case"hsla":if(Z=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(Z[4]),this.setHSL(parseFloat(Z[1])/360,parseFloat(Z[2])/100,parseFloat(Z[3])/100,J);break;default:$0("Color: Unknown color model "+$)}}else if(W=/^\#([A-Fa-f\d]+)$/.exec($)){let Z=W[1],K=Z.length;if(K===3)return this.setRGB(parseInt(Z.charAt(0),16)/15,parseInt(Z.charAt(1),16)/15,parseInt(Z.charAt(2),16)/15,J);else if(K===6)return this.setHex(parseInt(Z,16),J);else $0("Color: Invalid hex color "+$)}else if($&&$.length>0)return this.setColorName($,J);return this}setColorName($,J="srgb"){let Q=yZ[$.toLowerCase()];if(Q!==void 0)this.setHex(Q,J);else $0("Color: Unknown color "+$);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy($){return this.r=$.r,this.g=$.g,this.b=$.b,this}copySRGBToLinear($){return this.r=j$($.r),this.g=j$($.g),this.b=j$($.b),this}copyLinearToSRGB($){return this.r=s8($.r),this.g=s8($.g),this.b=s8($.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex($="srgb"){return A0.workingToColorSpace(f0.copy(this),$),Math.round(m(f0.r*255,0,255))*65536+Math.round(m(f0.g*255,0,255))*256+Math.round(m(f0.b*255,0,255))}getHexString($="srgb"){return("000000"+this.getHex($).toString(16)).slice(-6)}getHSL($,J=A0.workingColorSpace){A0.workingToColorSpace(f0.copy(this),J);let{r:Q,g:W,b:Z}=f0,K=Math.max(Q,W,Z),H=Math.min(Q,W,Z),Y,X,U=(H+K)/2;if(H===K)Y=0,X=0;else{let E=K-H;switch(X=U<=0.5?E/(K+H):E/(2-K-H),K){case Q:Y=(W-Z)/E+(W<Z?6:0);break;case W:Y=(Z-Q)/E+2;break;case Z:Y=(Q-W)/E+4;break}Y/=6}return $.h=Y,$.s=X,$.l=U,$}getRGB($,J=A0.workingColorSpace){return A0.workingToColorSpace(f0.copy(this),J),$.r=f0.r,$.g=f0.g,$.b=f0.b,$}getStyle($="srgb"){A0.workingToColorSpace(f0.copy(this),$);let{r:J,g:Q,b:W}=f0;if($!=="srgb")return`color(${$} ${J.toFixed(3)} ${Q.toFixed(3)} ${W.toFixed(3)})`;return`rgb(${Math.round(J*255)},${Math.round(Q*255)},${Math.round(W*255)})`}offsetHSL($,J,Q){return this.getHSL(p$),this.setHSL(p$.h+$,p$.s+J,p$.l+Q)}add($){return this.r+=$.r,this.g+=$.g,this.b+=$.b,this}addColors($,J){return this.r=$.r+J.r,this.g=$.g+J.g,this.b=$.b+J.b,this}addScalar($){return this.r+=$,this.g+=$,this.b+=$,this}sub($){return this.r=Math.max(0,this.r-$.r),this.g=Math.max(0,this.g-$.g),this.b=Math.max(0,this.b-$.b),this}multiply($){return this.r*=$.r,this.g*=$.g,this.b*=$.b,this}multiplyScalar($){return this.r*=$,this.g*=$,this.b*=$,this}lerp($,J){return this.r+=($.r-this.r)*J,this.g+=($.g-this.g)*J,this.b+=($.b-this.b)*J,this}lerpColors($,J,Q){return this.r=$.r+(J.r-$.r)*Q,this.g=$.g+(J.g-$.g)*Q,this.b=$.b+(J.b-$.b)*Q,this}lerpHSL($,J){this.getHSL(p$),$.getHSL(w9);let Q=j6(p$.h,w9.h,J),W=j6(p$.s,w9.s,J),Z=j6(p$.l,w9.l,J);return this.setHSL(Q,W,Z),this}setFromVector3($){return this.r=$.x,this.g=$.y,this.b=$.z,this}applyMatrix3($){let J=this.r,Q=this.g,W=this.b,Z=$.elements;return this.r=Z[0]*J+Z[3]*Q+Z[6]*W,this.g=Z[1]*J+Z[4]*Q+Z[7]*W,this.b=Z[2]*J+Z[5]*Q+Z[8]*W,this}equals($){return $.r===this.r&&$.g===this.g&&$.b===this.b}fromArray($,J=0){return this.r=$[J],this.g=$[J+1],this.b=$[J+2],this}toArray($=[],J=0){return $[J]=this.r,$[J+1]=this.g,$[J+2]=this.b,$}fromBufferAttribute($,J){return this.r=$.getX(J),this.g=$.getY(J),this.b=$.getZ(J),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var f0=new h;h.NAMES=yZ;var N$=new w,_$=new w,HJ=new w,P$=new w,h8=new w,v8=new w,nW=new w,YJ=new w,XJ=new w,UJ=new w,NJ=new t0,EJ=new t0,GJ=new t0;class o0{constructor($=new w,J=new w,Q=new w){this.a=$,this.b=J,this.c=Q}static getNormal($,J,Q,W){W.subVectors(Q,J),N$.subVectors($,J),W.cross(N$);let Z=W.lengthSq();if(Z>0)return W.multiplyScalar(1/Math.sqrt(Z));return W.set(0,0,0)}static getBarycoord($,J,Q,W,Z){N$.subVectors(W,J),_$.subVectors(Q,J),HJ.subVectors($,J);let K=N$.dot(N$),H=N$.dot(_$),Y=N$.dot(HJ),X=_$.dot(_$),U=_$.dot(HJ),E=K*X-H*H;if(E===0)return Z.set(0,0,0),null;let G=1/E,q=(X*Y-H*U)*G,F=(K*U-H*Y)*G;return Z.set(1-q-F,F,q)}static containsPoint($,J,Q,W){if(this.getBarycoord($,J,Q,W,P$)===null)return!1;return P$.x>=0&&P$.y>=0&&P$.x+P$.y<=1}static getInterpolation($,J,Q,W,Z,K,H,Y){if(this.getBarycoord($,J,Q,W,P$)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(Z,P$.x),Y.addScaledVector(K,P$.y),Y.addScaledVector(H,P$.z),Y}static getInterpolatedAttribute($,J,Q,W,Z,K){return NJ.setScalar(0),EJ.setScalar(0),GJ.setScalar(0),NJ.fromBufferAttribute($,J),EJ.fromBufferAttribute($,Q),GJ.fromBufferAttribute($,W),K.setScalar(0),K.addScaledVector(NJ,Z.x),K.addScaledVector(EJ,Z.y),K.addScaledVector(GJ,Z.z),K}static isFrontFacing($,J,Q,W){return N$.subVectors(Q,J),_$.subVectors($,J),N$.cross(_$).dot(W)<0}set($,J,Q){return this.a.copy($),this.b.copy(J),this.c.copy(Q),this}setFromPointsAndIndices($,J,Q,W){return this.a.copy($[J]),this.b.copy($[Q]),this.c.copy($[W]),this}setFromAttributeAndIndices($,J,Q,W){return this.a.fromBufferAttribute($,J),this.b.fromBufferAttribute($,Q),this.c.fromBufferAttribute($,W),this}clone(){return new this.constructor().copy(this)}copy($){return this.a.copy($.a),this.b.copy($.b),this.c.copy($.c),this}getArea(){return N$.subVectors(this.c,this.b),_$.subVectors(this.a,this.b),N$.cross(_$).length()*0.5}getMidpoint($){return $.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal($){return o0.getNormal(this.a,this.b,this.c,$)}getPlane($){return $.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord($,J){return o0.getBarycoord($,this.a,this.b,this.c,J)}getInterpolation($,J,Q,W,Z){return o0.getInterpolation($,this.a,this.b,this.c,J,Q,W,Z)}containsPoint($){return o0.containsPoint($,this.a,this.b,this.c)}isFrontFacing($){return o0.isFrontFacing(this.a,this.b,this.c,$)}intersectsBox($){return $.intersectsTriangle(this)}closestPointToPoint($,J){let Q=this.a,W=this.b,Z=this.c,K,H;h8.subVectors(W,Q),v8.subVectors(Z,Q),YJ.subVectors($,Q);let Y=h8.dot(YJ),X=v8.dot(YJ);if(Y<=0&&X<=0)return J.copy(Q);XJ.subVectors($,W);let U=h8.dot(XJ),E=v8.dot(XJ);if(U>=0&&E<=U)return J.copy(W);let G=Y*E-U*X;if(G<=0&&Y>=0&&U<=0)return K=Y/(Y-U),J.copy(Q).addScaledVector(h8,K);UJ.subVectors($,Z);let q=h8.dot(UJ),F=v8.dot(UJ);if(F>=0&&q<=F)return J.copy(Z);let R=q*X-Y*F;if(R<=0&&X>=0&&F<=0)return H=X/(X-F),J.copy(Q).addScaledVector(v8,H);let O=U*F-q*E;if(O<=0&&E-U>=0&&q-F>=0)return nW.subVectors(Z,W),H=(E-U)/(E-U+(q-F)),J.copy(W).addScaledVector(nW,H);let M=1/(O+R+G);return K=R*M,H=G*M,J.copy(Q).addScaledVector(h8,K).addScaledVector(v8,H)}equals($){return $.a.equals(this.a)&&$.b.equals(this.b)&&$.c.equals(this.c)}}class h0{constructor($=new w(1/0,1/0,1/0),J=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=$,this.max=J}set($,J){return this.min.copy($),this.max.copy(J),this}setFromArray($){this.makeEmpty();for(let J=0,Q=$.length;J<Q;J+=3)this.expandByPoint(E$.fromArray($,J));return this}setFromBufferAttribute($){this.makeEmpty();for(let J=0,Q=$.count;J<Q;J++)this.expandByPoint(E$.fromBufferAttribute($,J));return this}setFromPoints($){this.makeEmpty();for(let J=0,Q=$.length;J<Q;J++)this.expandByPoint($[J]);return this}setFromCenterAndSize($,J){let Q=E$.copy(J).multiplyScalar(0.5);return this.min.copy($).sub(Q),this.max.copy($).add(Q),this}setFromObject($,J=!1){return this.makeEmpty(),this.expandByObject($,J)}clone(){return new this.constructor().copy(this)}copy($){return this.min.copy($.min),this.max.copy($.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter($){return this.isEmpty()?$.set(0,0,0):$.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize($){return this.isEmpty()?$.set(0,0,0):$.subVectors(this.max,this.min)}expandByPoint($){return this.min.min($),this.max.max($),this}expandByVector($){return this.min.sub($),this.max.add($),this}expandByScalar($){return this.min.addScalar(-$),this.max.addScalar($),this}expandByObject($,J=!1){$.updateWorldMatrix(!1,!1);let Q=$.geometry;if(Q!==void 0){let Z=Q.getAttribute("position");if(J===!0&&Z!==void 0&&$.isInstancedMesh!==!0)for(let K=0,H=Z.count;K<H;K++){if($.isMesh===!0)$.getVertexPosition(K,E$);else E$.fromBufferAttribute(Z,K);E$.applyMatrix4($.matrixWorld),this.expandByPoint(E$)}else{if($.boundingBox!==void 0){if($.boundingBox===null)$.computeBoundingBox();V9.copy($.boundingBox)}else{if(Q.boundingBox===null)Q.computeBoundingBox();V9.copy(Q.boundingBox)}V9.applyMatrix4($.matrixWorld),this.union(V9)}}let W=$.children;for(let Z=0,K=W.length;Z<K;Z++)this.expandByObject(W[Z],J);return this}containsPoint($){return $.x>=this.min.x&&$.x<=this.max.x&&$.y>=this.min.y&&$.y<=this.max.y&&$.z>=this.min.z&&$.z<=this.max.z}containsBox($){return this.min.x<=$.min.x&&$.max.x<=this.max.x&&this.min.y<=$.min.y&&$.max.y<=this.max.y&&this.min.z<=$.min.z&&$.max.z<=this.max.z}getParameter($,J){return J.set(($.x-this.min.x)/(this.max.x-this.min.x),($.y-this.min.y)/(this.max.y-this.min.y),($.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox($){return $.max.x>=this.min.x&&$.min.x<=this.max.x&&$.max.y>=this.min.y&&$.min.y<=this.max.y&&$.max.z>=this.min.z&&$.min.z<=this.max.z}intersectsSphere($){return this.clampPoint($.center,E$),E$.distanceToSquared($.center)<=$.radius*$.radius}intersectsPlane($){let J,Q;if($.normal.x>0)J=$.normal.x*this.min.x,Q=$.normal.x*this.max.x;else J=$.normal.x*this.max.x,Q=$.normal.x*this.min.x;if($.normal.y>0)J+=$.normal.y*this.min.y,Q+=$.normal.y*this.max.y;else J+=$.normal.y*this.max.y,Q+=$.normal.y*this.min.y;if($.normal.z>0)J+=$.normal.z*this.min.z,Q+=$.normal.z*this.max.z;else J+=$.normal.z*this.max.z,Q+=$.normal.z*this.min.z;return J<=-$.constant&&Q>=-$.constant}intersectsTriangle($){if(this.isEmpty())return!1;this.getCenter(V6),k9.subVectors(this.max,V6),y8.subVectors($.a,V6),b8.subVectors($.b,V6),x8.subVectors($.c,V6),l$.subVectors(b8,y8),u$.subVectors(x8,b8),N8.subVectors(y8,x8);let J=[0,-l$.z,l$.y,0,-u$.z,u$.y,0,-N8.z,N8.y,l$.z,0,-l$.x,u$.z,0,-u$.x,N8.z,0,-N8.x,-l$.y,l$.x,0,-u$.y,u$.x,0,-N8.y,N8.x,0];if(!qJ(J,y8,b8,x8,k9))return!1;if(J=[1,0,0,0,1,0,0,0,1],!qJ(J,y8,b8,x8,k9))return!1;return D9.crossVectors(l$,u$),J=[D9.x,D9.y,D9.z],qJ(J,y8,b8,x8,k9)}clampPoint($,J){return J.copy($).clamp(this.min,this.max)}distanceToPoint($){return this.clampPoint($,E$).distanceTo($)}getBoundingSphere($){if(this.isEmpty())$.makeEmpty();else this.getCenter($.center),$.radius=this.getSize(E$).length()*0.5;return $}intersect($){if(this.min.max($.min),this.max.min($.max),this.isEmpty())this.makeEmpty();return this}union($){return this.min.min($.min),this.max.max($.max),this}applyMatrix4($){if(this.isEmpty())return this;return I$[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4($),I$[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4($),I$[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4($),I$[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4($),I$[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4($),I$[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4($),I$[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4($),I$[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4($),this.setFromPoints(I$),this}translate($){return this.min.add($),this.max.add($),this}equals($){return $.min.equals(this.min)&&$.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON($){return this.min.fromArray($.min),this.max.fromArray($.max),this}}var I$=[new w,new w,new w,new w,new w,new w,new w,new w],E$=new w,V9=new h0,y8=new w,b8=new w,x8=new w,l$=new w,u$=new w,N8=new w,V6=new w,k9=new w,D9=new w,E8=new w;function qJ($,J,Q,W,Z){for(let K=0,H=$.length-3;K<=H;K+=3){E8.fromArray($,K);let Y=Z.x*Math.abs(E8.x)+Z.y*Math.abs(E8.y)+Z.z*Math.abs(E8.z),X=J.dot(E8),U=Q.dot(E8),E=W.dot(E8);if(Math.max(-Math.max(X,U,E),Math.min(X,U,E))>Y)return!1}return!0}var k0=new w,B9=new S,kY=0;class M0 extends O8{constructor($,J,Q=!1){super();if(Array.isArray($))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kY++}),this.name="",this.array=$,this.itemSize=J,this.count=$!==void 0?$.length/J:0,this.normalized=Q,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate($){if($===!0)this.version++}setUsage($){return this.usage=$,this}addUpdateRange($,J){this.updateRanges.push({start:$,count:J})}clearUpdateRanges(){this.updateRanges.length=0}copy($){return this.name=$.name,this.array=new $.array.constructor($.array),this.itemSize=$.itemSize,this.count=$.count,this.normalized=$.normalized,this.usage=$.usage,this.gpuType=$.gpuType,this}copyAt($,J,Q){$*=this.itemSize,Q*=J.itemSize;for(let W=0,Z=this.itemSize;W<Z;W++)this.array[$+W]=J.array[Q+W];return this}copyArray($){return this.array.set($),this}applyMatrix3($){if(this.itemSize===2)for(let J=0,Q=this.count;J<Q;J++)B9.fromBufferAttribute(this,J),B9.applyMatrix3($),this.setXY(J,B9.x,B9.y);else if(this.itemSize===3)for(let J=0,Q=this.count;J<Q;J++)k0.fromBufferAttribute(this,J),k0.applyMatrix3($),this.setXYZ(J,k0.x,k0.y,k0.z);return this}applyMatrix4($){for(let J=0,Q=this.count;J<Q;J++)k0.fromBufferAttribute(this,J),k0.applyMatrix4($),this.setXYZ(J,k0.x,k0.y,k0.z);return this}applyNormalMatrix($){for(let J=0,Q=this.count;J<Q;J++)k0.fromBufferAttribute(this,J),k0.applyNormalMatrix($),this.setXYZ(J,k0.x,k0.y,k0.z);return this}transformDirection($){for(let J=0,Q=this.count;J<Q;J++)k0.fromBufferAttribute(this,J),k0.transformDirection($),this.setXYZ(J,k0.x,k0.y,k0.z);return this}set($,J=0){return this.array.set($,J),this}getComponent($,J){let Q=this.array[$*this.itemSize+J];if(this.normalized)Q=G$(Q,this.array);return Q}setComponent($,J,Q){if(this.normalized)Q=Q0(Q,this.array);return this.array[$*this.itemSize+J]=Q,this}getX($){let J=this.array[$*this.itemSize];if(this.normalized)J=G$(J,this.array);return J}setX($,J){if(this.normalized)J=Q0(J,this.array);return this.array[$*this.itemSize]=J,this}getY($){let J=this.array[$*this.itemSize+1];if(this.normalized)J=G$(J,this.array);return J}setY($,J){if(this.normalized)J=Q0(J,this.array);return this.array[$*this.itemSize+1]=J,this}getZ($){let J=this.array[$*this.itemSize+2];if(this.normalized)J=G$(J,this.array);return J}setZ($,J){if(this.normalized)J=Q0(J,this.array);return this.array[$*this.itemSize+2]=J,this}getW($){let J=this.array[$*this.itemSize+3];if(this.normalized)J=G$(J,this.array);return J}setW($,J){if(this.normalized)J=Q0(J,this.array);return this.array[$*this.itemSize+3]=J,this}setXY($,J,Q){if($*=this.itemSize,this.normalized)J=Q0(J,this.array),Q=Q0(Q,this.array);return this.array[$+0]=J,this.array[$+1]=Q,this}setXYZ($,J,Q,W){if($*=this.itemSize,this.normalized)J=Q0(J,this.array),Q=Q0(Q,this.array),W=Q0(W,this.array);return this.array[$+0]=J,this.array[$+1]=Q,this.array[$+2]=W,this}setXYZW($,J,Q,W,Z){if($*=this.itemSize,this.normalized)J=Q0(J,this.array),Q=Q0(Q,this.array),W=Q0(W,this.array),Z=Q0(Z,this.array);return this.array[$+0]=J,this.array[$+1]=Q,this.array[$+2]=W,this.array[$+3]=Z,this}onUpload($){return this.onUploadCallback=$,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let $={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return $.name=this.name,$.usage=this.usage,$.gpuType=this.gpuType,$}dispose(){this.dispatchEvent({type:"dispose"})}}class $Q extends M0{constructor($,J,Q){super(new Uint16Array($),J,Q)}}class JQ extends M0{constructor($,J,Q){super(new Uint32Array($),J,Q)}}class a extends M0{constructor($,J,Q){super(new Float32Array($),J,Q)}}var DY=new h0,k6=new w,FJ=new w;class e0{constructor($=new w,J=-1){this.isSphere=!0,this.center=$,this.radius=J}set($,J){return this.center.copy($),this.radius=J,this}setFromPoints($,J){let Q=this.center;if(J!==void 0)Q.copy(J);else DY.setFromPoints($).getCenter(Q);let W=0;for(let Z=0,K=$.length;Z<K;Z++)W=Math.max(W,Q.distanceToSquared($[Z]));return this.radius=Math.sqrt(W),this}copy($){return this.center.copy($.center),this.radius=$.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint($){return $.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint($){return $.distanceTo(this.center)-this.radius}intersectsSphere($){let J=this.radius+$.radius;return $.center.distanceToSquared(this.center)<=J*J}intersectsBox($){return $.intersectsSphere(this)}intersectsPlane($){return Math.abs($.distanceToPoint(this.center))<=this.radius}clampPoint($,J){let Q=this.center.distanceToSquared($);if(J.copy($),Q>this.radius*this.radius)J.sub(this.center).normalize(),J.multiplyScalar(this.radius).add(this.center);return J}getBoundingBox($){if(this.isEmpty())return $.makeEmpty(),$;return $.set(this.center,this.center),$.expandByScalar(this.radius),$}applyMatrix4($){return this.center.applyMatrix4($),this.radius=this.radius*$.getMaxScaleOnAxis(),this}translate($){return this.center.add($),this}expandByPoint($){if(this.isEmpty())return this.center.copy($),this.radius=0,this;k6.subVectors($,this.center);let J=k6.lengthSq();if(J>this.radius*this.radius){let Q=Math.sqrt(J),W=(Q-this.radius)*0.5;this.center.addScaledVector(k6,W/Q),this.radius+=W}return this}union($){if($.isEmpty())return this;if(this.isEmpty())return this.copy($),this;if(this.center.equals($.center)===!0)this.radius=Math.max(this.radius,$.radius);else FJ.subVectors($.center,this.center).setLength($.radius),this.expandByPoint(k6.copy($.center).add(FJ)),this.expandByPoint(k6.copy($.center).sub(FJ));return this}equals($){return $.center.equals(this.center)&&$.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON($){return this.radius=$.radius,this.center.fromArray($.center),this}}var BY=0,Q$=new u,RJ=new X0,g8=new w,i0=new h0,D6=new h0,P0=new w;class Z0 extends O8{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:BY++}),this.uuid=W$(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex($){if(Array.isArray($))this.index=new((iH($))?JQ:$Q)($,1);else this.index=$;return this}setIndirect($,J=0){return this.indirect=$,this.indirectOffset=J,this}getIndirect(){return this.indirect}getAttribute($){return this.attributes[$]}setAttribute($,J){return this.attributes[$]=J,this}deleteAttribute($){return delete this.attributes[$],this}hasAttribute($){return this.attributes[$]!==void 0}addGroup($,J,Q=0){this.groups.push({start:$,count:J,materialIndex:Q})}clearGroups(){this.groups=[]}setDrawRange($,J){this.drawRange.start=$,this.drawRange.count=J}applyMatrix4($){let J=this.attributes.position;if(J!==void 0)J.applyMatrix4($),J.needsUpdate=!0;let Q=this.attributes.normal;if(Q!==void 0){let Z=new l().getNormalMatrix($);Q.applyNormalMatrix(Z),Q.needsUpdate=!0}let W=this.attributes.tangent;if(W!==void 0)W.transformDirection($),W.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion($){return Q$.makeRotationFromQuaternion($),this.applyMatrix4(Q$),this}rotateX($){return Q$.makeRotationX($),this.applyMatrix4(Q$),this}rotateY($){return Q$.makeRotationY($),this.applyMatrix4(Q$),this}rotateZ($){return Q$.makeRotationZ($),this.applyMatrix4(Q$),this}translate($,J,Q){return Q$.makeTranslation($,J,Q),this.applyMatrix4(Q$),this}scale($,J,Q){return Q$.makeScale($,J,Q),this.applyMatrix4(Q$),this}lookAt($){return RJ.lookAt($),RJ.updateMatrix(),this.applyMatrix4(RJ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(g8).negate(),this.translate(g8.x,g8.y,g8.z),this}setFromPoints($){let J=this.getAttribute("position");if(J===void 0){let Q=[];for(let W=0,Z=$.length;W<Z;W++){let K=$[W];Q.push(K.x,K.y,K.z||0)}this.setAttribute("position",new a(Q,3))}else{let Q=Math.min($.length,J.count);for(let W=0;W<Q;W++){let Z=$[W];J.setXYZ(W,Z.x,Z.y,Z.z||0)}if($.length>J.count)$0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");J.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new h0;let $=this.attributes.position,J=this.morphAttributes.position;if($&&$.isGLBufferAttribute){G0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if($!==void 0){if(this.boundingBox.setFromBufferAttribute($),J)for(let Q=0,W=J.length;Q<W;Q++){let Z=J[Q];if(i0.setFromBufferAttribute(Z),this.morphTargetsRelative)P0.addVectors(this.boundingBox.min,i0.min),this.boundingBox.expandByPoint(P0),P0.addVectors(this.boundingBox.max,i0.max),this.boundingBox.expandByPoint(P0);else this.boundingBox.expandByPoint(i0.min),this.boundingBox.expandByPoint(i0.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))G0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new e0;let $=this.attributes.position,J=this.morphAttributes.position;if($&&$.isGLBufferAttribute){G0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if($){let Q=this.boundingSphere.center;if(i0.setFromBufferAttribute($),J)for(let Z=0,K=J.length;Z<K;Z++){let H=J[Z];if(D6.setFromBufferAttribute(H),this.morphTargetsRelative)P0.addVectors(i0.min,D6.min),i0.expandByPoint(P0),P0.addVectors(i0.max,D6.max),i0.expandByPoint(P0);else i0.expandByPoint(D6.min),i0.expandByPoint(D6.max)}i0.getCenter(Q);let W=0;for(let Z=0,K=$.count;Z<K;Z++)P0.fromBufferAttribute($,Z),W=Math.max(W,Q.distanceToSquared(P0));if(J)for(let Z=0,K=J.length;Z<K;Z++){let H=J[Z],Y=this.morphTargetsRelative;for(let X=0,U=H.count;X<U;X++){if(P0.fromBufferAttribute(H,X),Y)g8.fromBufferAttribute($,X),P0.add(g8);W=Math.max(W,Q.distanceToSquared(P0))}}if(this.boundingSphere.radius=Math.sqrt(W),isNaN(this.boundingSphere.radius))G0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let $=this.index,J=this.attributes;if($===null||J.position===void 0||J.normal===void 0||J.uv===void 0){G0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:Q,normal:W,uv:Z}=J,K=this.getAttribute("tangent");if(K===void 0||K.count!==Q.count)K=new M0(new Float32Array(4*Q.count),4),this.setAttribute("tangent",K);let H=[],Y=[];for(let _=0;_<Q.count;_++)H[_]=new w,Y[_]=new w;let X=new w,U=new w,E=new w,G=new S,q=new S,F=new S,R=new w,O=new w;function M(_,P,T){X.fromBufferAttribute(Q,_),U.fromBufferAttribute(Q,P),E.fromBufferAttribute(Q,T),G.fromBufferAttribute(Z,_),q.fromBufferAttribute(Z,P),F.fromBufferAttribute(Z,T),U.sub(X),E.sub(X),q.sub(G),F.sub(G);let f=1/(q.x*F.y-F.x*q.y);if(!isFinite(f))return;R.copy(U).multiplyScalar(F.y).addScaledVector(E,-q.y).multiplyScalar(f),O.copy(E).multiplyScalar(q.x).addScaledVector(U,-F.x).multiplyScalar(f),H[_].add(R),H[P].add(R),H[T].add(R),Y[_].add(O),Y[P].add(O),Y[T].add(O)}let V=this.groups;if(V.length===0)V=[{start:0,count:$.count}];for(let _=0,P=V.length;_<P;++_){let T=V[_],f=T.start,b=T.count;for(let x=f,d=f+b;x<d;x+=3)M($.getX(x+0),$.getX(x+1),$.getX(x+2))}let D=new w,k=new w,B=new w,C=new w;function z(_){B.fromBufferAttribute(W,_),C.copy(B);let P=H[_];D.copy(P),D.sub(B.multiplyScalar(B.dot(P))).normalize(),k.crossVectors(C,P);let f=k.dot(Y[_])<0?-1:1;K.setXYZW(_,D.x,D.y,D.z,f)}for(let _=0,P=V.length;_<P;++_){let T=V[_],f=T.start,b=T.count;for(let x=f,d=f+b;x<d;x+=3)z($.getX(x+0)),z($.getX(x+1)),z($.getX(x+2))}this._transformed=!0}computeVertexNormals(){let $=this.index,J=this.getAttribute("position");if(J!==void 0){let Q=this.getAttribute("normal");if(Q===void 0||Q.count!==J.count)Q=new M0(new Float32Array(J.count*3),3),this.setAttribute("normal",Q);else for(let G=0,q=Q.count;G<q;G++)Q.setXYZ(G,0,0,0);let W=new w,Z=new w,K=new w,H=new w,Y=new w,X=new w,U=new w,E=new w;if($)for(let G=0,q=$.count;G<q;G+=3){let F=$.getX(G+0),R=$.getX(G+1),O=$.getX(G+2);W.fromBufferAttribute(J,F),Z.fromBufferAttribute(J,R),K.fromBufferAttribute(J,O),U.subVectors(K,Z),E.subVectors(W,Z),U.cross(E),H.fromBufferAttribute(Q,F),Y.fromBufferAttribute(Q,R),X.fromBufferAttribute(Q,O),H.add(U),Y.add(U),X.add(U),Q.setXYZ(F,H.x,H.y,H.z),Q.setXYZ(R,Y.x,Y.y,Y.z),Q.setXYZ(O,X.x,X.y,X.z)}else for(let G=0,q=J.count;G<q;G+=3)W.fromBufferAttribute(J,G+0),Z.fromBufferAttribute(J,G+1),K.fromBufferAttribute(J,G+2),U.subVectors(K,Z),E.subVectors(W,Z),U.cross(E),Q.setXYZ(G+0,U.x,U.y,U.z),Q.setXYZ(G+1,U.x,U.y,U.z),Q.setXYZ(G+2,U.x,U.y,U.z);this.normalizeNormals(),Q.needsUpdate=!0}}normalizeNormals(){let $=this.attributes.normal;for(let J=0,Q=$.count;J<Q;J++)P0.fromBufferAttribute($,J),P0.normalize(),$.setXYZ(J,P0.x,P0.y,P0.z)}toNonIndexed(){function $(H,Y){let{array:X,itemSize:U,normalized:E}=H,G=new X.constructor(Y.length*U),q=0,F=0;for(let R=0,O=Y.length;R<O;R++){if(H.isInterleavedBufferAttribute)q=Y[R]*H.data.stride+H.offset;else q=Y[R]*U;for(let M=0;M<U;M++)G[F++]=X[q++]}return new M0(G,U,E)}if(this.index===null)return $0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let J=new Z0,Q=this.index.array,W=this.attributes;for(let H in W){let Y=W[H],X=$(Y,Q);J.setAttribute(H,X)}let Z=this.morphAttributes;for(let H in Z){let Y=[],X=Z[H];for(let U=0,E=X.length;U<E;U++){let G=X[U],q=$(G,Q);Y.push(q)}J.morphAttributes[H]=Y}J.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let H=0,Y=K.length;H<Y;H++){let X=K[H];J.addGroup(X.start,X.count,X.materialIndex)}return J}toJSON(){let $={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if($.uuid=this.uuid,$.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,$.name=this.name,Object.keys(this.userData).length>0)$.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)$[X]=Y[X];return $}$.data={attributes:{}};let J=this.index;if(J!==null)$.data.index={type:J.array.constructor.name,array:Array.prototype.slice.call(J.array)};let Q=this.attributes;for(let Y in Q){let X=Q[Y];$.data.attributes[Y]=X.toJSON($.data)}let W={},Z=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let E=0,G=X.length;E<G;E++){let q=X[E];U.push(q.toJSON($.data))}if(U.length>0)W[Y]=U,Z=!0}if(Z)$.data.morphAttributes=W,$.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)$.data.groups=JSON.parse(JSON.stringify(K));let H=this.boundingSphere;if(H!==null)$.data.boundingSphere=H.toJSON();return $}clone(){return new this.constructor().copy(this)}copy($){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let J={};this.name=$.name;let Q=$.index;if(Q!==null)this.setIndex(Q.clone());let W=$.attributes;for(let X in W){let U=W[X];this.setAttribute(X,U.clone(J))}let Z=$.morphAttributes;for(let X in Z){let U=[],E=Z[X];for(let G=0,q=E.length;G<q;G++)U.push(E[G].clone(J));this.morphAttributes[X]=U}this.morphTargetsRelative=$.morphTargetsRelative;let K=$.groups;for(let X=0,U=K.length;X<U;X++){let E=K[X];this.addGroup(E.start,E.count,E.materialIndex)}let H=$.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=$.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=$.drawRange.start,this.drawRange.count=$.drawRange.count,this.userData=$.userData,this._transformed=$._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class n${constructor($,J){this.isInterleavedBuffer=!0,this.array=$,this.stride=J,this.count=$!==void 0?$.length/J:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=W$()}onUploadCallback(){}set needsUpdate($){if($===!0)this.version++}setUsage($){return this.usage=$,this}addUpdateRange($,J){this.updateRanges.push({start:$,count:J})}clearUpdateRanges(){this.updateRanges.length=0}copy($){return this.array=new $.array.constructor($.array),this.count=$.count,this.stride=$.stride,this.usage=$.usage,this}copyAt($,J,Q){$*=this.stride,Q*=J.stride;for(let W=0,Z=this.stride;W<Z;W++)this.array[$+W]=J.array[Q+W];return this}set($,J=0){return this.array.set($,J),this}clone($){if($.arrayBuffers===void 0)$.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=W$();if($.arrayBuffers[this.array.buffer._uuid]===void 0)$.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let J=new this.array.constructor($.arrayBuffers[this.array.buffer._uuid]),Q=new this.constructor(J,this.stride);return Q.setUsage(this.usage),Q}onUpload($){return this.onUploadCallback=$,this}toJSON($){if($.arrayBuffers===void 0)$.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=W$();if($.arrayBuffers[this.array.buffer._uuid]===void 0)$.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));let J={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return J.usage=this.usage,J}}var b0=new w;class M${constructor($,J,Q,W=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=$,this.itemSize=J,this.offset=Q,this.normalized=W}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate($){this.data.needsUpdate=$}applyMatrix4($){for(let J=0,Q=this.data.count;J<Q;J++)b0.fromBufferAttribute(this,J),b0.applyMatrix4($),this.setXYZ(J,b0.x,b0.y,b0.z);return this}applyNormalMatrix($){for(let J=0,Q=this.count;J<Q;J++)b0.fromBufferAttribute(this,J),b0.applyNormalMatrix($),this.setXYZ(J,b0.x,b0.y,b0.z);return this}transformDirection($){for(let J=0,Q=this.count;J<Q;J++)b0.fromBufferAttribute(this,J),b0.transformDirection($),this.setXYZ(J,b0.x,b0.y,b0.z);return this}getComponent($,J){let Q=this.array[$*this.data.stride+this.offset+J];if(this.normalized)Q=G$(Q,this.array);return Q}setComponent($,J,Q){if(this.normalized)Q=Q0(Q,this.array);return this.data.array[$*this.data.stride+this.offset+J]=Q,this}setX($,J){if(this.normalized)J=Q0(J,this.array);return this.data.array[$*this.data.stride+this.offset]=J,this}setY($,J){if(this.normalized)J=Q0(J,this.array);return this.data.array[$*this.data.stride+this.offset+1]=J,this}setZ($,J){if(this.normalized)J=Q0(J,this.array);return this.data.array[$*this.data.stride+this.offset+2]=J,this}setW($,J){if(this.normalized)J=Q0(J,this.array);return this.data.array[$*this.data.stride+this.offset+3]=J,this}getX($){let J=this.data.array[$*this.data.stride+this.offset];if(this.normalized)J=G$(J,this.array);return J}getY($){let J=this.data.array[$*this.data.stride+this.offset+1];if(this.normalized)J=G$(J,this.array);return J}getZ($){let J=this.data.array[$*this.data.stride+this.offset+2];if(this.normalized)J=G$(J,this.array);return J}getW($){let J=this.data.array[$*this.data.stride+this.offset+3];if(this.normalized)J=G$(J,this.array);return J}setXY($,J,Q){if($=$*this.data.stride+this.offset,this.normalized)J=Q0(J,this.array),Q=Q0(Q,this.array);return this.data.array[$+0]=J,this.data.array[$+1]=Q,this}setXYZ($,J,Q,W){if($=$*this.data.stride+this.offset,this.normalized)J=Q0(J,this.array),Q=Q0(Q,this.array),W=Q0(W,this.array);return this.data.array[$+0]=J,this.data.array[$+1]=Q,this.data.array[$+2]=W,this}setXYZW($,J,Q,W,Z){if($=$*this.data.stride+this.offset,this.normalized)J=Q0(J,this.array),Q=Q0(Q,this.array),W=Q0(W,this.array),Z=Q0(Z,this.array);return this.data.array[$+0]=J,this.data.array[$+1]=Q,this.data.array[$+2]=W,this.data.array[$+3]=Z,this}clone($){if($===void 0){IJ("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let J=[];for(let Q=0;Q<this.count;Q++){let W=Q*this.data.stride+this.offset;for(let Z=0;Z<this.itemSize;Z++)J.push(this.data.array[W+Z])}return new M0(new this.array.constructor(J),this.itemSize,this.normalized)}else{if($.interleavedBuffers===void 0)$.interleavedBuffers={};if($.interleavedBuffers[this.data.uuid]===void 0)$.interleavedBuffers[this.data.uuid]=this.data.clone($);return new M$($.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON($){if($===void 0){IJ("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let J=[];for(let Q=0;Q<this.count;Q++){let W=Q*this.data.stride+this.offset;for(let Z=0;Z<this.itemSize;Z++)J.push(this.data.array[W+Z])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:J,normalized:this.normalized}}else{if($.interleavedBuffers===void 0)$.interleavedBuffers={};if($.interleavedBuffers[this.data.uuid]===void 0)$.interleavedBuffers[this.data.uuid]=this.data.toJSON($);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var OJ=new w,CY=new w,zY=new l;class S${constructor($=new w(1,0,0),J=0){this.isPlane=!0,this.normal=$,this.constant=J}set($,J){return this.normal.copy($),this.constant=J,this}setComponents($,J,Q,W){return this.normal.set($,J,Q),this.constant=W,this}setFromNormalAndCoplanarPoint($,J){return this.normal.copy($),this.constant=-J.dot(this.normal),this}setFromCoplanarPoints($,J,Q){let W=OJ.subVectors(Q,J).cross(CY.subVectors($,J)).normalize();return this.setFromNormalAndCoplanarPoint(W,$),this}copy($){return this.normal.copy($.normal),this.constant=$.constant,this}normalize(){let $=1/this.normal.length();return this.normal.multiplyScalar($),this.constant*=$,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint($){return this.normal.dot($)+this.constant}distanceToSphere($){return this.distanceToPoint($.center)-$.radius}projectPoint($,J){return J.copy($).addScaledVector(this.normal,-this.distanceToPoint($))}intersectLine($,J,Q=!0){let W=$.delta(OJ),Z=this.normal.dot(W);if(Z===0){if(this.distanceToPoint($.start)===0)return J.copy($.start);return null}let K=-($.start.dot(this.normal)+this.constant)/Z;if(Q===!0&&(K<0||K>1))return null;return J.copy($.start).addScaledVector(W,K)}intersectsLine($){let J=this.distanceToPoint($.start),Q=this.distanceToPoint($.end);return J<0&&Q>0||Q<0&&J>0}intersectsBox($){return $.intersectsPlane(this)}intersectsSphere($){return $.intersectsPlane(this)}coplanarPoint($){return $.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4($,J){let Q=J||zY.getNormalMatrix($),W=this.coplanarPoint(OJ).applyMatrix4($),Z=this.normal.applyMatrix3(Q).normalize();return this.constant=-W.dot(Z),this}translate($){return this.constant-=$.dot(this.normal),this}equals($){return $.normal.equals(this.normal)&&$.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON($){return this.normal.fromArray($.normal),this.constant=$.constant,this}}var _Y=0;class Z$ extends O8{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:_Y++}),this.uuid=W$(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new h(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest($){if(this._alphaTest>0!==$>0)this.version++;this._alphaTest=$}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues($){if($===void 0)return;for(let J in $){let Q=$[J];if(Q===void 0){$0(`Material: parameter '${J}' has value of undefined.`);continue}let W=this[J];if(W===void 0){$0(`Material: '${J}' is not a property of THREE.${this.type}.`);continue}if(W&&W.isColor)W.set(Q);else if(W&&W.isVector2&&(Q&&Q.isVector2)||W&&W.isEuler&&(Q&&Q.isEuler)||W&&W.isVector3&&(Q&&Q.isVector3))W.copy(Q);else this[J]=Q}}toJSON($){let J=$===void 0||typeof $==="string";if(J)$={textures:{},images:{}};let Q={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if(Q.uuid=this.uuid,Q.type=this.type,Q.blending=this.blending,Q.side=this.side,Q.shadowSide=this.shadowSide,Q.vertexColors=this.vertexColors,Q.opacity=this.opacity,Q.transparent=this.transparent,Q.blendSrc=this.blendSrc,Q.blendDst=this.blendDst,Q.blendEquation=this.blendEquation,Q.blendSrcAlpha=this.blendSrcAlpha,Q.blendDstAlpha=this.blendDstAlpha,Q.blendEquationAlpha=this.blendEquationAlpha,Q.blendColor=this.blendColor.getHex(),Q.blendAlpha=this.blendAlpha,Q.depthFunc=this.depthFunc,Q.depthTest=this.depthTest,Q.depthWrite=this.depthWrite,Q.colorWrite=this.colorWrite,Q.clipIntersection=this.clipIntersection,Q.clipShadows=this.clipShadows,Q.stencilWriteMask=this.stencilWriteMask,Q.stencilFunc=this.stencilFunc,Q.stencilRef=this.stencilRef,Q.stencilFuncMask=this.stencilFuncMask,Q.stencilFail=this.stencilFail,Q.stencilZFail=this.stencilZFail,Q.stencilZPass=this.stencilZPass,Q.stencilWrite=this.stencilWrite,Q.polygonOffset=this.polygonOffset,Q.polygonOffsetFactor=this.polygonOffsetFactor,Q.polygonOffsetUnits=this.polygonOffsetUnits,Q.dithering=this.dithering,Q.alphaTest=this.alphaTest,Q.alphaHash=this.alphaHash,Q.alphaToCoverage=this.alphaToCoverage,Q.premultipliedAlpha=this.premultipliedAlpha,Q.forceSinglePass=this.forceSinglePass,Q.allowOverride=this.allowOverride,Q.visible=this.visible,Q.toneMapped=this.toneMapped,Q.name=this.name,this.color&&this.color.isColor)Q.color=this.color.getHex();if(this.roughness!==void 0)Q.roughness=this.roughness;if(this.metalness!==void 0)Q.metalness=this.metalness;if(this.sheen!==void 0)Q.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)Q.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)Q.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)Q.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)Q.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)Q.specular=this.specular.getHex();if(this.specularIntensity!==void 0)Q.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)Q.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)Q.shininess=this.shininess;if(this.clearcoat!==void 0)Q.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)Q.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)Q.clearcoatMap=this.clearcoatMap.toJSON($).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)Q.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON($).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)Q.clearcoatNormalMap=this.clearcoatNormalMap.toJSON($).uuid,Q.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)Q.sheenColorMap=this.sheenColorMap.toJSON($).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)Q.sheenRoughnessMap=this.sheenRoughnessMap.toJSON($).uuid;if(this.dispersion!==void 0)Q.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)Q.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)Q.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)Q.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)Q.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)Q.iridescenceMap=this.iridescenceMap.toJSON($).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)Q.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON($).uuid;if(this.anisotropy!==void 0)Q.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)Q.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)Q.anisotropyMap=this.anisotropyMap.toJSON($).uuid;if(this.map&&this.map.isTexture)Q.map=this.map.toJSON($).uuid;if(this.matcap&&this.matcap.isTexture)Q.matcap=this.matcap.toJSON($).uuid;if(this.alphaMap&&this.alphaMap.isTexture)Q.alphaMap=this.alphaMap.toJSON($).uuid;if(this.lightMap&&this.lightMap.isTexture)Q.lightMap=this.lightMap.toJSON($).uuid,Q.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)Q.aoMap=this.aoMap.toJSON($).uuid,Q.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)Q.bumpMap=this.bumpMap.toJSON($).uuid,Q.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)Q.normalMap=this.normalMap.toJSON($).uuid,Q.normalMapType=this.normalMapType,Q.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)Q.displacementMap=this.displacementMap.toJSON($).uuid,Q.displacementScale=this.displacementScale,Q.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)Q.roughnessMap=this.roughnessMap.toJSON($).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)Q.metalnessMap=this.metalnessMap.toJSON($).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)Q.emissiveMap=this.emissiveMap.toJSON($).uuid;if(this.specularMap&&this.specularMap.isTexture)Q.specularMap=this.specularMap.toJSON($).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)Q.specularIntensityMap=this.specularIntensityMap.toJSON($).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)Q.specularColorMap=this.specularColorMap.toJSON($).uuid;if(this.envMap&&this.envMap.isTexture){if(Q.envMap=this.envMap.toJSON($).uuid,this.combine!==void 0)Q.combine=this.combine}if(this.envMapRotation!==void 0)Q.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)Q.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)Q.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)Q.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)Q.gradientMap=this.gradientMap.toJSON($).uuid;if(this.transmission!==void 0)Q.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)Q.transmissionMap=this.transmissionMap.toJSON($).uuid;if(this.thickness!==void 0)Q.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)Q.thicknessMap=this.thicknessMap.toJSON($).uuid;if(this.attenuationDistance!==void 0)Q.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)Q.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)Q.size=this.size;if(this.sizeAttenuation!==void 0)Q.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)Q.clippingPlanes=this.clippingPlanes.map((Z)=>Z.toJSON());if(this.rotation!==void 0)Q.rotation=this.rotation;if(this.depthPacking!==void 0)Q.depthPacking=this.depthPacking;if(this.linewidth!==void 0)Q.linewidth=this.linewidth;if(this.linecap!==void 0)Q.linecap=this.linecap;if(this.linejoin!==void 0)Q.linejoin=this.linejoin;if(this.dashSize!==void 0)Q.dashSize=this.dashSize;if(this.gapSize!==void 0)Q.gapSize=this.gapSize;if(this.scale!==void 0)Q.scale=this.scale;if(this.wireframe!==void 0)Q.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)Q.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)Q.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)Q.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)Q.flatShading=this.flatShading;if(this.fog!==void 0)Q.fog=this.fog;if(Object.keys(this.userData).length>0)Q.userData=this.userData;function W(Z){let K=[];for(let H in Z){let Y=Z[H];delete Y.metadata,K.push(Y)}return K}if(J){let Z=W($.textures),K=W($.images);if(Z.length>0)Q.textures=Z;if(K.length>0)Q.images=K}return Q}fromJSON($,J){if($.uuid!==void 0)this.uuid=$.uuid;if($.name!==void 0)this.name=$.name;if($.color!==void 0&&this.color!==void 0)this.color.setHex($.color);if($.roughness!==void 0)this.roughness=$.roughness;if($.metalness!==void 0)this.metalness=$.metalness;if($.sheen!==void 0)this.sheen=$.sheen;if($.sheenColor!==void 0)this.sheenColor=new h().setHex($.sheenColor);if($.sheenRoughness!==void 0)this.sheenRoughness=$.sheenRoughness;if($.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex($.emissive);if($.specular!==void 0&&this.specular!==void 0)this.specular.setHex($.specular);if($.specularIntensity!==void 0)this.specularIntensity=$.specularIntensity;if($.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex($.specularColor);if($.shininess!==void 0)this.shininess=$.shininess;if($.clearcoat!==void 0)this.clearcoat=$.clearcoat;if($.clearcoatRoughness!==void 0)this.clearcoatRoughness=$.clearcoatRoughness;if($.dispersion!==void 0)this.dispersion=$.dispersion;if($.retroreflectivity!==void 0)this.retroreflectivity=$.retroreflectivity;if($.iridescence!==void 0)this.iridescence=$.iridescence;if($.iridescenceIOR!==void 0)this.iridescenceIOR=$.iridescenceIOR;if($.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=$.iridescenceThicknessRange;if($.transmission!==void 0)this.transmission=$.transmission;if($.thickness!==void 0)this.thickness=$.thickness;if($.attenuationDistance!==void 0)this.attenuationDistance=$.attenuationDistance;if($.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex($.attenuationColor);if($.anisotropy!==void 0)this.anisotropy=$.anisotropy;if($.anisotropyRotation!==void 0)this.anisotropyRotation=$.anisotropyRotation;if($.fog!==void 0)this.fog=$.fog;if($.flatShading!==void 0)this.flatShading=$.flatShading;if($.blending!==void 0)this.blending=$.blending;if($.combine!==void 0)this.combine=$.combine;if($.side!==void 0)this.side=$.side;if($.shadowSide!==void 0)this.shadowSide=$.shadowSide;if($.opacity!==void 0)this.opacity=$.opacity;if($.transparent!==void 0)this.transparent=$.transparent;if($.alphaTest!==void 0)this.alphaTest=$.alphaTest;if($.alphaHash!==void 0)this.alphaHash=$.alphaHash;if($.depthFunc!==void 0)this.depthFunc=$.depthFunc;if($.depthTest!==void 0)this.depthTest=$.depthTest;if($.depthWrite!==void 0)this.depthWrite=$.depthWrite;if($.colorWrite!==void 0)this.colorWrite=$.colorWrite;if($.clippingPlanes!==void 0)this.clippingPlanes=$.clippingPlanes.map((Q)=>new S$().fromJSON(Q));if($.clipIntersection!==void 0)this.clipIntersection=$.clipIntersection;if($.clipShadows!==void 0)this.clipShadows=$.clipShadows;if($.depthPacking!==void 0)this.depthPacking=$.depthPacking;if($.blendSrc!==void 0)this.blendSrc=$.blendSrc;if($.blendDst!==void 0)this.blendDst=$.blendDst;if($.blendEquation!==void 0)this.blendEquation=$.blendEquation;if($.blendSrcAlpha!==void 0)this.blendSrcAlpha=$.blendSrcAlpha;if($.blendDstAlpha!==void 0)this.blendDstAlpha=$.blendDstAlpha;if($.blendEquationAlpha!==void 0)this.blendEquationAlpha=$.blendEquationAlpha;if($.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex($.blendColor);if($.blendAlpha!==void 0)this.blendAlpha=$.blendAlpha;if($.stencilWriteMask!==void 0)this.stencilWriteMask=$.stencilWriteMask;if($.stencilFunc!==void 0)this.stencilFunc=$.stencilFunc;if($.stencilRef!==void 0)this.stencilRef=$.stencilRef;if($.stencilFuncMask!==void 0)this.stencilFuncMask=$.stencilFuncMask;if($.stencilFail!==void 0)this.stencilFail=$.stencilFail;if($.stencilZFail!==void 0)this.stencilZFail=$.stencilZFail;if($.stencilZPass!==void 0)this.stencilZPass=$.stencilZPass;if($.stencilWrite!==void 0)this.stencilWrite=$.stencilWrite;if($.wireframe!==void 0)this.wireframe=$.wireframe;if($.wireframeLinewidth!==void 0)this.wireframeLinewidth=$.wireframeLinewidth;if($.wireframeLinecap!==void 0)this.wireframeLinecap=$.wireframeLinecap;if($.wireframeLinejoin!==void 0)this.wireframeLinejoin=$.wireframeLinejoin;if($.rotation!==void 0)this.rotation=$.rotation;if($.linewidth!==void 0)this.linewidth=$.linewidth;if($.linecap!==void 0)this.linecap=$.linecap;if($.linejoin!==void 0)this.linejoin=$.linejoin;if($.dashSize!==void 0)this.dashSize=$.dashSize;if($.gapSize!==void 0)this.gapSize=$.gapSize;if($.scale!==void 0)this.scale=$.scale;if($.polygonOffset!==void 0)this.polygonOffset=$.polygonOffset;if($.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=$.polygonOffsetFactor;if($.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=$.polygonOffsetUnits;if($.dithering!==void 0)this.dithering=$.dithering;if($.alphaToCoverage!==void 0)this.alphaToCoverage=$.alphaToCoverage;if($.premultipliedAlpha!==void 0)this.premultipliedAlpha=$.premultipliedAlpha;if($.forceSinglePass!==void 0)this.forceSinglePass=$.forceSinglePass;if($.allowOverride!==void 0)this.allowOverride=$.allowOverride;if($.visible!==void 0)this.visible=$.visible;if($.toneMapped!==void 0)this.toneMapped=$.toneMapped;if($.userData!==void 0)this.userData=$.userData;if($.vertexColors!==void 0)if(typeof $.vertexColors==="number")this.vertexColors=$.vertexColors>0;else this.vertexColors=$.vertexColors;if($.size!==void 0)this.size=$.size;if($.sizeAttenuation!==void 0)this.sizeAttenuation=$.sizeAttenuation;if($.map!==void 0)this.map=J[$.map]||null;if($.matcap!==void 0)this.matcap=J[$.matcap]||null;if($.alphaMap!==void 0)this.alphaMap=J[$.alphaMap]||null;if($.bumpMap!==void 0)this.bumpMap=J[$.bumpMap]||null;if($.bumpScale!==void 0)this.bumpScale=$.bumpScale;if($.normalMap!==void 0)this.normalMap=J[$.normalMap]||null;if($.normalMapType!==void 0)this.normalMapType=$.normalMapType;if($.normalScale!==void 0){let Q=$.normalScale;if(Array.isArray(Q)===!1)Q=[Q,Q];this.normalScale=new S().fromArray(Q)}if($.displacementMap!==void 0)this.displacementMap=J[$.displacementMap]||null;if($.displacementScale!==void 0)this.displacementScale=$.displacementScale;if($.displacementBias!==void 0)this.displacementBias=$.displacementBias;if($.roughnessMap!==void 0)this.roughnessMap=J[$.roughnessMap]||null;if($.metalnessMap!==void 0)this.metalnessMap=J[$.metalnessMap]||null;if($.emissiveMap!==void 0)this.emissiveMap=J[$.emissiveMap]||null;if($.emissiveIntensity!==void 0)this.emissiveIntensity=$.emissiveIntensity;if($.specularMap!==void 0)this.specularMap=J[$.specularMap]||null;if($.specularIntensityMap!==void 0)this.specularIntensityMap=J[$.specularIntensityMap]||null;if($.specularColorMap!==void 0)this.specularColorMap=J[$.specularColorMap]||null;if($.envMap!==void 0)this.envMap=J[$.envMap]||null;if($.envMapRotation!==void 0)this.envMapRotation.fromArray($.envMapRotation);if($.envMapIntensity!==void 0)this.envMapIntensity=$.envMapIntensity;if($.reflectivity!==void 0)this.reflectivity=$.reflectivity;if($.refractionRatio!==void 0)this.refractionRatio=$.refractionRatio;if($.lightMap!==void 0)this.lightMap=J[$.lightMap]||null;if($.lightMapIntensity!==void 0)this.lightMapIntensity=$.lightMapIntensity;if($.aoMap!==void 0)this.aoMap=J[$.aoMap]||null;if($.aoMapIntensity!==void 0)this.aoMapIntensity=$.aoMapIntensity;if($.gradientMap!==void 0)this.gradientMap=J[$.gradientMap]||null;if($.clearcoatMap!==void 0)this.clearcoatMap=J[$.clearcoatMap]||null;if($.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=J[$.clearcoatRoughnessMap]||null;if($.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=J[$.clearcoatNormalMap]||null;if($.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new S().fromArray($.clearcoatNormalScale);if($.iridescenceMap!==void 0)this.iridescenceMap=J[$.iridescenceMap]||null;if($.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=J[$.iridescenceThicknessMap]||null;if($.transmissionMap!==void 0)this.transmissionMap=J[$.transmissionMap]||null;if($.thicknessMap!==void 0)this.thicknessMap=J[$.thicknessMap]||null;if($.anisotropyMap!==void 0)this.anisotropyMap=J[$.anisotropyMap]||null;if($.sheenColorMap!==void 0)this.sheenColorMap=J[$.sheenColorMap]||null;if($.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=J[$.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy($){this.name=$.name,this.blending=$.blending,this.side=$.side,this.vertexColors=$.vertexColors,this.opacity=$.opacity,this.transparent=$.transparent,this.blendSrc=$.blendSrc,this.blendDst=$.blendDst,this.blendEquation=$.blendEquation,this.blendSrcAlpha=$.blendSrcAlpha,this.blendDstAlpha=$.blendDstAlpha,this.blendEquationAlpha=$.blendEquationAlpha,this.blendColor.copy($.blendColor),this.blendAlpha=$.blendAlpha,this.depthFunc=$.depthFunc,this.depthTest=$.depthTest,this.depthWrite=$.depthWrite,this.stencilWriteMask=$.stencilWriteMask,this.stencilFunc=$.stencilFunc,this.stencilRef=$.stencilRef,this.stencilFuncMask=$.stencilFuncMask,this.stencilFail=$.stencilFail,this.stencilZFail=$.stencilZFail,this.stencilZPass=$.stencilZPass,this.stencilWrite=$.stencilWrite;let J=$.clippingPlanes,Q=null;if(J!==null){let W=J.length;Q=Array(W);for(let Z=0;Z!==W;++Z)Q[Z]=J[Z].clone()}return this.clippingPlanes=Q,this.clipIntersection=$.clipIntersection,this.clipShadows=$.clipShadows,this.shadowSide=$.shadowSide,this.colorWrite=$.colorWrite,this.precision=$.precision,this.polygonOffset=$.polygonOffset,this.polygonOffsetFactor=$.polygonOffsetFactor,this.polygonOffsetUnits=$.polygonOffsetUnits,this.dithering=$.dithering,this.alphaTest=$.alphaTest,this.alphaHash=$.alphaHash,this.alphaToCoverage=$.alphaToCoverage,this.premultipliedAlpha=$.premultipliedAlpha,this.forceSinglePass=$.forceSinglePass,this.allowOverride=$.allowOverride,this.visible=$.visible,this.toneMapped=$.toneMapped,this.userData=JSON.parse(JSON.stringify($.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate($){if($===!0)this.version++}}class l6 extends Z${constructor($){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new h(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues($)}copy($){return super.copy($),this.color.copy($.color),this.map=$.map,this.alphaMap=$.alphaMap,this.rotation=$.rotation,this.sizeAttenuation=$.sizeAttenuation,this.fog=$.fog,this}}var p8,B6=new w,l8=new w,u8=new w,d8=new S,C6=new S,bZ=new u,C9=new w,z6=new w,z9=new w,sW=new S,LJ=new S,iW=new S;class Q7 extends X0{constructor($=new l6){super();if(this.isSprite=!0,this.type="Sprite",p8===void 0){p8=new Z0;let J=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),Q=new n$(J,5);p8.setIndex([0,1,2,0,2,3]),p8.setAttribute("position",new M$(Q,3,0,!1)),p8.setAttribute("uv",new M$(Q,2,3,!1))}this.geometry=p8,this.material=$,this.center=new S(0.5,0.5),this.count=1}intersectsFrustum($){return $.intersectsSprite(this)}raycast($,J){if($.camera===null)G0('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(l8.setFromMatrixScale(this.matrixWorld),bZ.copy($.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices($.camera.matrixWorldInverse,this.matrixWorld),u8.setFromMatrixPosition(this.modelViewMatrix),$.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)l8.multiplyScalar(-u8.z);let Q=this.material.rotation,W,Z;if(Q!==0)Z=Math.cos(Q),W=Math.sin(Q);let K=this.center;_9(C9.set(-0.5,-0.5,0),u8,K,l8,W,Z),_9(z6.set(0.5,-0.5,0),u8,K,l8,W,Z),_9(z9.set(0.5,0.5,0),u8,K,l8,W,Z),sW.set(0,0),LJ.set(1,0),iW.set(1,1);let H=$.ray.intersectTriangle(C9,z6,z9,!1,B6);if(H===null){if(_9(z6.set(-0.5,0.5,0),u8,K,l8,W,Z),LJ.set(0,1),H=$.ray.intersectTriangle(C9,z9,z6,!1,B6),H===null)return}let Y=$.ray.origin.distanceTo(B6);if(Y<$.near||Y>$.far)return;J.push({distance:Y,point:B6.clone(),uv:o0.getInterpolation(B6,C9,z6,z9,sW,LJ,iW,new S),face:null,object:this})}copy($,J){if(super.copy($,J),$.center!==void 0)this.center.copy($.center);return this.material=$.material,this}}function _9($,J,Q,W,Z,K){if(d8.subVectors($,Q).addScalar(0.5).multiply(W),Z!==void 0)C6.x=K*d8.x-Z*d8.y,C6.y=Z*d8.x+K*d8.y;else C6.copy(d8);$.copy(J),$.x+=C6.x,$.y+=C6.y,$.applyMatrix4(bZ)}var T$=new w,MJ=new w,P9=new w,I9=new w;class M8{constructor($=new w,J=new w(0,0,-1)){this.origin=$,this.direction=J}set($,J){return this.origin.copy($),this.direction.copy(J),this}copy($){return this.origin.copy($.origin),this.direction.copy($.direction),this}at($,J){return J.copy(this.origin).addScaledVector(this.direction,$)}lookAt($){return this.direction.copy($).sub(this.origin).normalize(),this}recast($){return this.origin.copy(this.at($,T$)),this}closestPointToPoint($,J){J.subVectors($,this.origin);let Q=J.dot(this.direction);if(Q<0)return J.copy(this.origin);return J.copy(this.origin).addScaledVector(this.direction,Q)}distanceToPoint($){return Math.sqrt(this.distanceSqToPoint($))}distanceSqToPoint($){let J=T$.subVectors($,this.origin).dot(this.direction);if(J<0)return this.origin.distanceToSquared($);return T$.copy(this.origin).addScaledVector(this.direction,J),T$.distanceToSquared($)}distanceSqToSegment($,J,Q,W){MJ.copy($).add(J).multiplyScalar(0.5),P9.copy(J).sub($).normalize(),I9.copy(this.origin).sub(MJ);let Z=$.distanceTo(J)*0.5,K=-this.direction.dot(P9),H=I9.dot(this.direction),Y=-I9.dot(P9),X=I9.lengthSq(),U=Math.abs(1-K*K),E,G,q,F;if(U>0)if(E=K*Y-H,G=K*H-Y,F=Z*U,E>=0)if(G>=-F)if(G<=F){let R=1/U;E*=R,G*=R,q=E*(E+K*G+2*H)+G*(K*E+G+2*Y)+X}else G=Z,E=Math.max(0,-(K*G+H)),q=-E*E+G*(G+2*Y)+X;else G=-Z,E=Math.max(0,-(K*G+H)),q=-E*E+G*(G+2*Y)+X;else if(G<=-F)E=Math.max(0,-(-K*Z+H)),G=E>0?-Z:Math.min(Math.max(-Z,-Y),Z),q=-E*E+G*(G+2*Y)+X;else if(G<=F)E=0,G=Math.min(Math.max(-Z,-Y),Z),q=G*(G+2*Y)+X;else E=Math.max(0,-(K*Z+H)),G=E>0?Z:Math.min(Math.max(-Z,-Y),Z),q=-E*E+G*(G+2*Y)+X;else G=K>0?-Z:Z,E=Math.max(0,-(K*G+H)),q=-E*E+G*(G+2*Y)+X;if(Q)Q.copy(this.origin).addScaledVector(this.direction,E);if(W)W.copy(MJ).addScaledVector(P9,G);return q}intersectSphere($,J){if($.radius<0)return null;T$.subVectors($.center,this.origin);let Q=T$.dot(this.direction),W=T$.dot(T$)-Q*Q,Z=$.radius*$.radius;if(W>Z)return null;let K=Math.sqrt(Z-W),H=Q-K,Y=Q+K;if(Y<0)return null;if(H<0)return this.at(Y,J);return this.at(H,J)}intersectsSphere($){if($.radius<0)return!1;return this.distanceSqToPoint($.center)<=$.radius*$.radius}distanceToPlane($){let J=$.normal.dot(this.direction);if(J===0){if($.distanceToPoint(this.origin)===0)return 0;return null}let Q=-(this.origin.dot($.normal)+$.constant)/J;return Q>=0?Q:null}intersectPlane($,J){let Q=this.distanceToPlane($);if(Q===null)return null;return this.at(Q,J)}intersectsPlane($){let J=$.distanceToPoint(this.origin);if(J===0)return!0;if($.normal.dot(this.direction)*J<0)return!0;return!1}intersectBox($,J){let Q,W,Z,K,H,Y,X=1/this.direction.x,U=1/this.direction.y,E=1/this.direction.z,G=this.origin;if(X>=0)Q=($.min.x-G.x)*X,W=($.max.x-G.x)*X;else Q=($.max.x-G.x)*X,W=($.min.x-G.x)*X;if(U>=0)Z=($.min.y-G.y)*U,K=($.max.y-G.y)*U;else Z=($.max.y-G.y)*U,K=($.min.y-G.y)*U;if(Q>K||Z>W)return null;if(Z>Q||isNaN(Q))Q=Z;if(K<W||isNaN(W))W=K;if(E>=0)H=($.min.z-G.z)*E,Y=($.max.z-G.z)*E;else H=($.max.z-G.z)*E,Y=($.min.z-G.z)*E;if(Q>Y||H>W)return null;if(H>Q||Q!==Q)Q=H;if(Y<W||W!==W)W=Y;if(W<0)return null;return this.at(Q>=0?Q:W,J)}intersectsBox($){return this.intersectBox($,T$)!==null}intersectTriangle($,J,Q,W,Z){let K=this.origin,H=this.direction,Y=H.x,X=H.y,U=H.z,E=$.x-K.x,G=$.y-K.y,q=$.z-K.z,F=J.x-K.x,R=J.y-K.y,O=J.z-K.z,M=Q.x-K.x,V=Q.y-K.y,D=Q.z-K.z,k=Math.abs(Y),B=Math.abs(X),C=Math.abs(U),z,_,P,T,f,b,x,d,A,s,L0,_0;if(k>=B&&k>=C)if(P=Y,b=E,A=F,_0=M,Y>=0)z=X,_=U,T=G,f=q,x=R,d=O,s=V,L0=D;else z=U,_=X,T=q,f=G,x=O,d=R,s=D,L0=V;else if(B>=C)if(P=X,b=G,A=R,_0=V,X>=0)z=U,_=Y,T=q,f=E,x=O,d=F,s=D,L0=M;else z=Y,_=U,T=E,f=q,x=F,d=O,s=M,L0=D;else if(P=U,b=q,A=O,_0=D,U>=0)z=Y,_=X,T=E,f=G,x=F,d=R,s=M,L0=V;else z=X,_=Y,T=G,f=E,x=R,d=F,s=V,L0=M;if(P===0)return null;let Y0=z/P,E0=_/P,C0=1/P,V0=T-Y0*b,B$=f-E0*b,x$=x-Y0*A,C$=d-E0*A,IW=s-Y0*_0,TW=L0-E0*_0,q6=IW*C$-TW*x$,F6=V0*TW-B$*IW,R6=x$*B$-C$*V0;if(W){if(q6<0||F6<0||R6<0)return null}else if((q6<0||F6<0||R6<0)&&(q6>0||F6>0||R6>0))return null;let r7=q6+F6+R6;if(r7===0)return null;let t7=C0*(q6*b+F6*A+R6*_0);if(r7>0?t7<0:t7>0)return null;return this.at(t7/r7,Z)}applyMatrix4($){return this.origin.applyMatrix4($),this.direction.transformDirection($),this}equals($){return $.origin.equals(this.origin)&&$.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class I0 extends Z${constructor($){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new h(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new L8,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues($)}copy($){return super.copy($),this.color.copy($.color),this.map=$.map,this.lightMap=$.lightMap,this.lightMapIntensity=$.lightMapIntensity,this.aoMap=$.aoMap,this.aoMapIntensity=$.aoMapIntensity,this.specularMap=$.specularMap,this.alphaMap=$.alphaMap,this.envMap=$.envMap,this.envMapRotation.copy($.envMapRotation),this.combine=$.combine,this.reflectivity=$.reflectivity,this.refractionRatio=$.refractionRatio,this.wireframe=$.wireframe,this.wireframeLinewidth=$.wireframeLinewidth,this.wireframeLinecap=$.wireframeLinecap,this.wireframeLinejoin=$.wireframeLinejoin,this.fog=$.fog,this}}var oW=new u,G8=new M8,T9=new e0,aW=new w,A9=new w,S9=new w,j9=new w,wJ=new w,f9=new w,rW=new w,h9=new w;class y extends X0{constructor($=new Z0,J=new I0){super();this.isMesh=!0,this.type="Mesh",this.geometry=$,this.material=J,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy($,J){if(super.copy($,J),$.morphTargetInfluences!==void 0)this.morphTargetInfluences=$.morphTargetInfluences.slice();if($.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},$.morphTargetDictionary);return this.material=Array.isArray($.material)?$.material.slice():$.material,this.geometry=$.geometry,this}updateMorphTargets(){let J=this.geometry.morphAttributes,Q=Object.keys(J);if(Q.length>0){let W=J[Q[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}getVertexPosition($,J){let Q=this.geometry,W=Q.attributes.position,Z=Q.morphAttributes.position,K=Q.morphTargetsRelative;J.fromBufferAttribute(W,$);let H=this.morphTargetInfluences;if(Z&&H){f9.set(0,0,0);for(let Y=0,X=Z.length;Y<X;Y++){let U=H[Y],E=Z[Y];if(U===0)continue;if(wJ.fromBufferAttribute(E,$),K)f9.addScaledVector(wJ,U);else f9.addScaledVector(wJ.sub(J),U)}J.add(f9)}return J}intersectsFrustum($){return $.intersectsObject(this)}raycast($,J){let Q=this.geometry,W=this.material,Z=this.matrixWorld;if(W===void 0)return;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(T9.copy(Q.boundingSphere),T9.applyMatrix4(Z),G8.copy($.ray).recast($.near),T9.containsPoint(G8.origin)===!1){if(G8.intersectSphere(T9,aW)===null)return;if(G8.origin.distanceToSquared(aW)>($.far-$.near)**2)return}if(oW.copy(Z).invert(),G8.copy($.ray).applyMatrix4(oW),Q.boundingBox!==null){if(G8.intersectsBox(Q.boundingBox)===!1)return}this._computeIntersections($,J,G8)}_computeIntersections($,J,Q){let W,Z=this.geometry,K=this.material,H=Z.index,Y=Z.attributes.position,X=Z.attributes.uv,U=Z.attributes.uv1,E=Z.attributes.normal,G=Z.groups,q=Z.drawRange;if(H!==null)if(Array.isArray(K))for(let F=0,R=G.length;F<R;F++){let O=G[F],M=K[O.materialIndex],V=Math.max(O.start,q.start),D=Math.min(H.count,Math.min(O.start+O.count,q.start+q.count));for(let k=V,B=D;k<B;k+=3){let C=H.getX(k),z=H.getX(k+1),_=H.getX(k+2);if(W=v9(this,M,$,Q,X,U,E,C,z,_),W)W.faceIndex=Math.floor(k/3),W.face.materialIndex=O.materialIndex,J.push(W)}}else{let F=Math.max(0,q.start),R=Math.min(H.count,q.start+q.count);for(let O=F,M=R;O<M;O+=3){let V=H.getX(O),D=H.getX(O+1),k=H.getX(O+2);if(W=v9(this,K,$,Q,X,U,E,V,D,k),W)W.faceIndex=Math.floor(O/3),J.push(W)}}else if(Y!==void 0)if(Array.isArray(K))for(let F=0,R=G.length;F<R;F++){let O=G[F],M=K[O.materialIndex],V=Math.max(O.start,q.start),D=Math.min(Y.count,Math.min(O.start+O.count,q.start+q.count));for(let k=V,B=D;k<B;k+=3){let C=k,z=k+1,_=k+2;if(W=v9(this,M,$,Q,X,U,E,C,z,_),W)W.faceIndex=Math.floor(k/3),W.face.materialIndex=O.materialIndex,J.push(W)}}else{let F=Math.max(0,q.start),R=Math.min(Y.count,q.start+q.count);for(let O=F,M=R;O<M;O+=3){let V=O,D=O+1,k=O+2;if(W=v9(this,K,$,Q,X,U,E,V,D,k),W)W.faceIndex=Math.floor(O/3),J.push(W)}}}}function PY($,J,Q,W,Z,K,H,Y){let X;if(J.side===1)X=W.intersectTriangle(H,K,Z,!0,Y);else X=W.intersectTriangle(Z,K,H,J.side===0,Y);if(X===null)return null;h9.copy(Y),h9.applyMatrix4($.matrixWorld);let U=Q.ray.origin.distanceTo(h9);if(U<Q.near||U>Q.far)return null;return{distance:U,point:h9.clone(),object:$}}function v9($,J,Q,W,Z,K,H,Y,X,U){$.getVertexPosition(Y,A9),$.getVertexPosition(X,S9),$.getVertexPosition(U,j9);let E=PY($,J,Q,W,A9,S9,j9,rW);if(E){let G=new w;if(o0.getBarycoord(rW,A9,S9,j9,G),Z)E.uv=o0.getInterpolatedAttribute(Z,Y,X,U,G,new S);if(K)E.uv1=o0.getInterpolatedAttribute(K,Y,X,U,G,new S);if(H){if(E.normal=o0.getInterpolatedAttribute(H,Y,X,U,G,new w),E.normal.dot(W.direction)>0)E.normal.multiplyScalar(-1)}let q={a:Y,b:X,c:U,normal:new w,materialIndex:0};o0.getNormal(A9,S9,j9,q.normal),E.face=q,E.barycoord=G}return E}var _6=new t0,tW=new t0,eW=new t0,IY=new t0,$Z=new u,y9=new w,VJ=new e0,JZ=new u,kJ=new M8;class W7 extends y{constructor($,J){super($,J);this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new u,this.bindMatrixInverse=new u,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let $=this.geometry;if(this.boundingBox===null)this.boundingBox=new h0;this.boundingBox.makeEmpty();let J=$.getAttribute("position");for(let Q=0;Q<J.count;Q++)this.getVertexPosition(Q,y9),this.boundingBox.expandByPoint(y9)}computeBoundingSphere(){let $=this.geometry;if(this.boundingSphere===null)this.boundingSphere=new e0;this.boundingSphere.makeEmpty();let J=$.getAttribute("position");for(let Q=0;Q<J.count;Q++)this.getVertexPosition(Q,y9),this.boundingSphere.expandByPoint(y9)}copy($,J){if(super.copy($,J),this.bindMode=$.bindMode,this.bindMatrix.copy($.bindMatrix),this.bindMatrixInverse.copy($.bindMatrixInverse),this.skeleton=$.skeleton,$.boundingBox!==null)this.boundingBox=$.boundingBox.clone();if($.boundingSphere!==null)this.boundingSphere=$.boundingSphere.clone();return this}raycast($,J){let Q=this.material,W=this.matrixWorld;if(Q===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(VJ.copy(this.boundingSphere),VJ.applyMatrix4(W),$.ray.intersectsSphere(VJ)===!1)return;if(JZ.copy(W).invert(),kJ.copy($.ray).applyMatrix4(JZ),this.boundingBox!==null){if(kJ.intersectsBox(this.boundingBox)===!1)return}this._computeIntersections($,J,kJ)}getVertexPosition($,J){return super.getVertexPosition($,J),this.applyBoneTransform($,J),J}bind($,J){if(this.skeleton=$,J===void 0)this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),J=this.matrixWorld;this.bindMatrix.copy(J),this.bindMatrixInverse.copy(J).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let $=new t0,J=this.geometry.attributes.skinWeight;for(let Q=0,W=J.count;Q<W;Q++){$.fromBufferAttribute(J,Q);let Z=1/$.manhattanLength();if(Z!==1/0)$.multiplyScalar(Z);else $.set(1,0,0,0);J.setXYZW(Q,$.x,$.y,$.z,$.w)}}updateMatrixWorld($){if(super.updateMatrixWorld($),this.bindMode==="attached")this.bindMatrixInverse.copy(this.matrixWorld).invert();else if(this.bindMode==="detached")this.bindMatrixInverse.copy(this.bindMatrix).invert();else $0("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform($,J){let Q=this.skeleton,W=this.geometry;if(tW.fromBufferAttribute(W.attributes.skinIndex,$),eW.fromBufferAttribute(W.attributes.skinWeight,$),J.isVector4)_6.copy(J),J.set(0,0,0,0);else _6.set(...J,1),J.set(0,0,0);_6.applyMatrix4(this.bindMatrix);for(let Z=0;Z<4;Z++){let K=eW.getComponent(Z);if(K!==0){let H=tW.getComponent(Z);$Z.multiplyMatrices(Q.bones[H].matrixWorld,Q.boneInverses[H]),J.addScaledVector(IY.copy(_6).applyMatrix4($Z),K)}}if(J.isVector4)J.w=_6.w;return J.applyMatrix4(this.bindMatrixInverse)}}class u6 extends X0{constructor(){super();this.isBone=!0,this.type="Bone"}}class Z7 extends u0{constructor($=null,J=1,Q=1,W,Z,K,H,Y,X=1003,U=1003,E,G){super(null,K,H,Y,X,U,W,Z,E,G);this.isDataTexture=!0,this.image={data:$,width:J,height:Q},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var QZ=new u,TY=new u;class d6{constructor($=[],J=[]){this.uuid=W$(),this.bones=$.slice(0),this.boneInverses=J,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let $=this.bones,J=this.boneInverses;if(this.boneMatrices=new Float32Array($.length*16),J.length===0)this.calculateInverses();else if($.length!==J.length){$0("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let Q=0,W=this.bones.length;Q<W;Q++)this.boneInverses.push(new u)}}calculateInverses(){this.boneInverses.length=0;for(let $=0,J=this.bones.length;$<J;$++){let Q=new u;if(this.bones[$])Q.copy(this.bones[$].matrixWorld).invert();this.boneInverses.push(Q)}}pose(){for(let $=0,J=this.bones.length;$<J;$++){let Q=this.bones[$];if(Q)Q.matrixWorld.copy(this.boneInverses[$]).invert()}for(let $=0,J=this.bones.length;$<J;$++){let Q=this.bones[$];if(Q){if(Q.parent&&Q.parent.isBone)Q.matrix.copy(Q.parent.matrixWorld).invert(),Q.matrix.multiply(Q.matrixWorld);else Q.matrix.copy(Q.matrixWorld);Q.matrix.decompose(Q.position,Q.quaternion,Q.scale)}}}update(){let $=this.bones,J=this.boneInverses,Q=this.boneMatrices,W=this.boneTexture;for(let Z=0,K=$.length;Z<K;Z++){let H=$[Z]?$[Z].matrixWorld:TY;QZ.multiplyMatrices(H,J[Z]),QZ.toArray(Q,Z*16)}if(W!==null)W.needsUpdate=!0}clone(){return new d6(this.bones,this.boneInverses)}computeBoneTexture(){let $=Math.sqrt(this.bones.length*4);$=Math.ceil($/4)*4,$=Math.max($,4);let J=new Float32Array($*$*4);J.set(this.boneMatrices);let Q=new Z7(J,$,$,1023,1015);return Q.needsUpdate=!0,this.boneMatrices=J,this.boneTexture=Q,this}getBoneByName($){for(let J=0,Q=this.bones.length;J<Q;J++){let W=this.bones[J];if(W.name===$)return W}return}dispose(){if(this.boneTexture!==null)this.boneTexture.dispose(),this.boneTexture=null}fromJSON($,J){this.uuid=$.uuid;for(let Q=0,W=$.bones.length;Q<W;Q++){let Z=$.bones[Q],K=J[Z];if(K===void 0)$0("Skeleton: No bone found with UUID:",Z),K=new u6;this.bones.push(K),this.boneInverses.push(new u().fromArray($.boneInverses[Q]))}return this.init(),this}toJSON(){let $={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};$.uuid=this.uuid;let J=this.bones,Q=this.boneInverses;for(let W=0,Z=J.length;W<Z;W++){let K=J[W];$.bones.push(K.uuid);let H=Q[W];$.boneInverses.push(H.toArray())}return $}}class c$ extends M0{constructor($,J,Q,W=1){super($,J,Q);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=W}copy($){return super.copy($),this.meshPerAttribute=$.meshPerAttribute,this}toJSON(){let $=super.toJSON();return $.meshPerAttribute=this.meshPerAttribute,$.isInstancedBufferAttribute=!0,$}}var m8=new u,WZ=new u,b9=[],ZZ=new h0,AY=new u,P6=new y,I6=new e0;class s$ extends y{constructor($,J,Q){super($,J);this.isInstancedMesh=!0,this.instanceMatrix=new c$(new Float32Array(Q*16),16),this.instanceColor=null,this.morphTexture=null,this.count=Q,this.boundingBox=null,this.boundingSphere=null;for(let W=0;W<Q;W++)this.setMatrixAt(W,AY)}computeBoundingBox(){let $=this.geometry,J=this.count;if(this.boundingBox===null)this.boundingBox=new h0;if($.boundingBox===null)$.computeBoundingBox();this.boundingBox.makeEmpty();for(let Q=0;Q<J;Q++)this.getMatrixAt(Q,m8),ZZ.copy($.boundingBox).applyMatrix4(m8),this.boundingBox.union(ZZ)}computeBoundingSphere(){let $=this.geometry,J=this.count;if(this.boundingSphere===null)this.boundingSphere=new e0;if($.boundingSphere===null)$.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let Q=0;Q<J;Q++)this.getMatrixAt(Q,m8),I6.copy($.boundingSphere).applyMatrix4(m8),this.boundingSphere.union(I6)}copy($,J){if(super.copy($,J),this.instanceMatrix.copy($.instanceMatrix),$.morphTexture!==null)this.morphTexture=$.morphTexture.clone();if($.instanceColor!==null)this.instanceColor=$.instanceColor.clone();if(this.count=$.count,$.boundingBox!==null)this.boundingBox=$.boundingBox.clone();if($.boundingSphere!==null)this.boundingSphere=$.boundingSphere.clone();return this}getColorAt($,J){if(this.instanceColor===null)return J.setRGB(1,1,1);else return J.fromArray(this.instanceColor.array,$*3)}getMatrixAt($,J){return J.fromArray(this.instanceMatrix.array,$*16)}getMorphAt($,J){let Q=J.morphTargetInfluences,W=this.morphTexture.source.data.data,Z=Q.length+1,K=$*Z+1;for(let H=0;H<Q.length;H++)Q[H]=W[K+H]}raycast($,J){let Q=this.matrixWorld,W=this.count;if(P6.geometry=this.geometry,P6.material=this.material,P6.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(I6.copy(this.boundingSphere),I6.applyMatrix4(Q),$.ray.intersectsSphere(I6)===!1)return;for(let Z=0;Z<W;Z++){this.getMatrixAt(Z,m8),WZ.multiplyMatrices(Q,m8),P6.matrixWorld=WZ,P6.raycast($,b9);for(let K=0,H=b9.length;K<H;K++){let Y=b9[K];Y.instanceId=Z,Y.object=this,J.push(Y)}b9.length=0}}setColorAt($,J){if(this.instanceColor===null)this.instanceColor=new c$(new Float32Array(this.instanceMatrix.count*3).fill(1),3);return J.toArray(this.instanceColor.array,$*3),this}setMatrixAt($,J){return J.toArray(this.instanceMatrix.array,$*16),this}setMorphAt($,J){let Q=J.morphTargetInfluences,W=Q.length+1;if(this.morphTexture===null)this.morphTexture=new Z7(new Float32Array(W*this.count),W,this.count,1028,1015);let Z=this.morphTexture.source.data.data,K=0;for(let X=0;X<Q.length;X++)K+=Q[X];let H=this.geometry.morphTargetsRelative?1:1-K,Y=W*$;return Z[Y]=H,Z.set(Q,Y+1),this}updateMorphTargets(){}dispose(){if(super.dispose(),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var q8=new e0,SY=new S(0.5,0.5),x9=new w;class QQ{constructor($=new S$,J=new S$,Q=new S$,W=new S$,Z=new S$,K=new S$){this.planes=[$,J,Q,W,Z,K]}set($,J,Q,W,Z,K){let H=this.planes;return H[0].copy($),H[1].copy(J),H[2].copy(Q),H[3].copy(W),H[4].copy(Z),H[5].copy(K),this}copy($){let J=this.planes;for(let Q=0;Q<6;Q++)J[Q].copy($.planes[Q]);return this}setFromProjectionMatrix($,J=2000,Q=!1){let W=this.planes,Z=$.elements,K=Z[0],H=Z[1],Y=Z[2],X=Z[3],U=Z[4],E=Z[5],G=Z[6],q=Z[7],F=Z[8],R=Z[9],O=Z[10],M=Z[11],V=Z[12],D=Z[13],k=Z[14],B=Z[15];if(W[0].setComponents(X-K,q-U,M-F,B-V).normalize(),W[1].setComponents(X+K,q+U,M+F,B+V).normalize(),W[2].setComponents(X+H,q+E,M+R,B+D).normalize(),W[3].setComponents(X-H,q-E,M-R,B-D).normalize(),Q)W[4].setComponents(Y,G,O,k).normalize(),W[5].setComponents(X-Y,q-G,M-O,B-k).normalize();else if(W[4].setComponents(X-Y,q-G,M-O,B-k).normalize(),J===2000)W[5].setComponents(X+Y,q+G,M+O,B+k).normalize();else if(J===2001)W[5].setComponents(Y,G,O,k).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+J);return this}intersectsObject($){if($.boundingSphere!==void 0){if($.boundingSphere===null)$.computeBoundingSphere();q8.copy($.boundingSphere).applyMatrix4($.matrixWorld)}else{let J=$.geometry;if(J.boundingSphere===null)J.computeBoundingSphere();q8.copy(J.boundingSphere).applyMatrix4($.matrixWorld)}return this.intersectsSphere(q8)}intersectsSprite($){q8.center.set(0,0,0);let J=SY.distanceTo($.center);return q8.radius=0.7071067811865476+J,q8.applyMatrix4($.matrixWorld),this.intersectsSphere(q8)}intersectsSphere($){let J=this.planes,Q=$.center,W=-$.radius;for(let Z=0;Z<6;Z++)if(J[Z].distanceToPoint(Q)<W)return!1;return!0}intersectsBox($){let J=this.planes;for(let Q=0;Q<6;Q++){let W=J[Q];if(x9.x=W.normal.x>0?$.max.x:$.min.x,x9.y=W.normal.y>0?$.max.y:$.min.y,x9.z=W.normal.z>0?$.max.z:$.min.z,W.distanceToPoint(x9)<0)return!1}return!0}containsPoint($){let J=this.planes;for(let Q=0;Q<6;Q++)if(J[Q].distanceToPoint($)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class w8 extends Z${constructor($){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new h(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues($)}copy($){return super.copy($),this.color.copy($.color),this.map=$.map,this.linewidth=$.linewidth,this.linecap=$.linecap,this.linejoin=$.linejoin,this.fog=$.fog,this}}var o9=new w,a9=new w,KZ=new u,T6=new M8,g9=new e0,DJ=new w,HZ=new w;class i$ extends X0{constructor($=new Z0,J=new w8){super();this.isLine=!0,this.type="Line",this.geometry=$,this.material=J,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy($,J){return super.copy($,J),this.material=Array.isArray($.material)?$.material.slice():$.material,this.geometry=$.geometry,this}computeLineDistances(){let $=this.geometry;if($.index===null){let J=$.attributes.position,Q=[0];for(let W=1,Z=J.count;W<Z;W++)o9.fromBufferAttribute(J,W-1),a9.fromBufferAttribute(J,W),Q[W]=Q[W-1],Q[W]+=o9.distanceTo(a9);$.setAttribute("lineDistance",new a(Q,1))}else $0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum($){return $.intersectsObject(this)}raycast($,J){let Q=this.geometry,W=this.matrixWorld,Z=$.params.Line.threshold,K=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(g9.copy(Q.boundingSphere),g9.applyMatrix4(W),g9.radius+=Z,$.ray.intersectsSphere(g9)===!1)return;KZ.copy(W).invert(),T6.copy($.ray).applyMatrix4(KZ);let H=Z/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=this.isLineSegments?2:1,U=Q.index,G=Q.attributes.position;if(U!==null){let q=Math.max(0,K.start),F=Math.min(U.count,K.start+K.count);for(let R=q,O=F-1;R<O;R+=X){let M=U.getX(R),V=U.getX(R+1),D=p9(this,$,T6,Y,M,V,R);if(D)J.push(D)}if(this.isLineLoop){let R=U.getX(F-1),O=U.getX(q),M=p9(this,$,T6,Y,R,O,F-1);if(M)J.push(M)}}else{let q=Math.max(0,K.start),F=Math.min(G.count,K.start+K.count);for(let R=q,O=F-1;R<O;R+=X){let M=p9(this,$,T6,Y,R,R+1,R);if(M)J.push(M)}if(this.isLineLoop){let R=p9(this,$,T6,Y,F-1,q,F-1);if(R)J.push(R)}}}updateMorphTargets(){let J=this.geometry.morphAttributes,Q=Object.keys(J);if(Q.length>0){let W=J[Q[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}}function p9($,J,Q,W,Z,K,H){let Y=$.geometry.attributes.position;if(o9.fromBufferAttribute(Y,Z),a9.fromBufferAttribute(Y,K),Q.distanceSqToSegment(o9,a9,DJ,HZ)>W)return;DJ.applyMatrix4($.matrixWorld);let U=J.ray.origin.distanceTo(DJ);if(U<J.near||U>J.far)return;return{distance:U,point:HZ.clone().applyMatrix4($.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:$}}var YZ=new w,XZ=new w;class K7 extends i${constructor($,J){super($,J);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let $=this.geometry;if($.index===null){let J=$.attributes.position,Q=[];for(let W=0,Z=J.count;W<Z;W+=2)YZ.fromBufferAttribute(J,W),XZ.fromBufferAttribute(J,W+1),Q[W]=W===0?0:Q[W-1],Q[W+1]=Q[W]+YZ.distanceTo(XZ);$.setAttribute("lineDistance",new a(Q,1))}else $0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class H7 extends i${constructor($,J){super($,J);this.isLineLoop=!0,this.type="LineLoop"}}class w$ extends Z${constructor($){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new h(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues($)}copy($){return super.copy($),this.color.copy($.color),this.map=$.map,this.alphaMap=$.alphaMap,this.size=$.size,this.sizeAttenuation=$.sizeAttenuation,this.fog=$.fog,this}}var UZ=new u,TJ=new M8,l9=new e0,u9=new w;class f$ extends X0{constructor($=new Z0,J=new w$){super();this.isPoints=!0,this.type="Points",this.geometry=$,this.material=J,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy($,J){return super.copy($,J),this.material=Array.isArray($.material)?$.material.slice():$.material,this.geometry=$.geometry,this}intersectsFrustum($){return $.intersectsObject(this)}raycast($,J){let Q=this.geometry,W=this.matrixWorld,Z=$.params.Points.threshold,K=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(l9.copy(Q.boundingSphere),l9.applyMatrix4(W),l9.radius+=Z,$.ray.intersectsSphere(l9)===!1)return;UZ.copy(W).invert(),TJ.copy($.ray).applyMatrix4(UZ);let H=Z/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=Q.index,E=Q.attributes.position;if(X!==null){let G=Math.max(0,K.start),q=Math.min(X.count,K.start+K.count);for(let F=G,R=q;F<R;F++){let O=X.getX(F);u9.fromBufferAttribute(E,O),NZ(u9,O,Y,W,$,J,this)}}else{let G=Math.max(0,K.start),q=Math.min(E.count,K.start+K.count);for(let F=G,R=q;F<R;F++)u9.fromBufferAttribute(E,F),NZ(u9,F,Y,W,$,J,this)}}updateMorphTargets(){let J=this.geometry.morphAttributes,Q=Object.keys(J);if(Q.length>0){let W=J[Q[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}}function NZ($,J,Q,W,Z,K,H){let Y=TJ.distanceSqToPoint($);if(Y<Q){let X=new w;TJ.closestPointToPoint($,X),X.applyMatrix4(W);let U=Z.ray.origin.distanceTo(X);if(U<Z.near||U>Z.far)return;K.push({distance:U,distanceToRay:Math.sqrt(Y),point:X,index:J,face:null,faceIndex:null,barycoord:null,object:H})}}class m6 extends u0{constructor($,J,Q,W,Z,K,H,Y,X){super($,J,Q,W,Z,K,H,Y,X);this.isCanvasTexture=!0,this.needsUpdate=!0}}class i extends Z0{constructor($=1,J=1,Q=1,W=1,Z=1,K=1){super();this.type="BoxGeometry",this.parameters={width:$,height:J,depth:Q,widthSegments:W,heightSegments:Z,depthSegments:K};let H=this;W=Math.floor(W),Z=Math.floor(Z),K=Math.floor(K);let Y=[],X=[],U=[],E=[],G=0,q=0;F("z","y","x",-1,-1,Q,J,$,K,Z,0),F("z","y","x",1,-1,Q,J,-$,K,Z,1),F("x","z","y",1,1,$,Q,J,W,K,2),F("x","z","y",1,-1,$,Q,-J,W,K,3),F("x","y","z",1,-1,$,J,Q,W,Z,4),F("x","y","z",-1,-1,$,J,-Q,W,Z,5),this.setIndex(Y),this.setAttribute("position",new a(X,3)),this.setAttribute("normal",new a(U,3)),this.setAttribute("uv",new a(E,2));function F(R,O,M,V,D,k,B,C,z,_,P){let T=k/z,f=B/_,b=k/2,x=B/2,d=C/2,A=z+1,s=_+1,L0=0,_0=0,Y0=new w;for(let E0=0;E0<s;E0++){let C0=E0*f-x;for(let V0=0;V0<A;V0++){let B$=V0*T-b;Y0[R]=B$*V,Y0[O]=C0*D,Y0[M]=d,X.push(Y0.x,Y0.y,Y0.z),Y0[R]=0,Y0[O]=0,Y0[M]=C>0?1:-1,U.push(Y0.x,Y0.y,Y0.z),E.push(V0/z),E.push(1-E0/_),L0+=1}}for(let E0=0;E0<_;E0++)for(let C0=0;C0<z;C0++){let V0=G+C0+A*E0,B$=G+C0+A*(E0+1),x$=G+(C0+1)+A*(E0+1),C$=G+(C0+1)+A*E0;Y.push(V0,B$,C$),Y.push(B$,x$,C$),_0+=6}H.addGroup(q,_0,P),q+=_0,G+=L0}}copy($){return super.copy($),this.parameters=Object.assign({},$.parameters),this}static fromJSON($){return new i($.width,$.height,$.depth,$.widthSegments,$.heightSegments,$.depthSegments)}}class o$ extends Z0{constructor($=1,J=1,Q=4,W=8,Z=1){super();this.type="CapsuleGeometry",this.parameters={radius:$,height:J,capSegments:Q,radialSegments:W,heightSegments:Z},J=Math.max(0,J),Q=Math.max(1,Math.floor(Q)),W=Math.max(3,Math.floor(W)),Z=Math.max(1,Math.floor(Z));let K=[],H=[],Y=[],X=[],U=J/2,E=Math.PI/2*$,G=J,q=2*E+G,F=Q*2+Z,R=W+1,O=new w,M=new w;for(let V=0;V<=F;V++){let D=0,k=0,B=0,C=0;if(V<=Q){let P=V/Q,T=P*Math.PI/2;k=-U-$*Math.cos(T),B=$*Math.sin(T),C=-$*Math.cos(T),D=P*E}else if(V<=Q+Z){let P=(V-Q)/Z;k=-U+P*J,B=$,C=0,D=E+P*G}else{let P=(V-Q-Z)/Q,T=P*Math.PI/2;k=U+$*Math.sin(T),B=$*Math.cos(T),C=$*Math.sin(T),D=E+G+P*E}let z=Math.max(0,Math.min(1,D/q)),_=0;if(V===0)_=0.5/W;else if(V===F)_=-0.5/W;for(let P=0;P<=W;P++){let T=P/W,f=T*Math.PI*2,b=Math.sin(f),x=Math.cos(f);M.x=-B*x,M.y=k,M.z=B*b,H.push(M.x,M.y,M.z),O.set(-B*x,C,B*b),O.normalize(),Y.push(O.x,O.y,O.z),X.push(T+_,z)}if(V>0){let P=(V-1)*R;for(let T=0;T<W;T++){let f=P+T,b=P+T+1,x=V*R+T,d=V*R+T+1;K.push(f,b,x),K.push(b,d,x)}}}this.setIndex(K),this.setAttribute("position",new a(H,3)),this.setAttribute("normal",new a(Y,3)),this.setAttribute("uv",new a(X,2))}copy($){return super.copy($),this.parameters=Object.assign({},$.parameters),this}static fromJSON($){return new o$($.radius,$.height,$.capSegments,$.radialSegments,$.heightSegments)}}class V8 extends Z0{constructor($=1,J=32,Q=0,W=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:$,segments:J,thetaStart:Q,thetaLength:W},J=Math.max(3,J);let Z=[],K=[],H=[],Y=[],X=new w,U=new S;K.push(0,0,0),H.push(0,0,1),Y.push(0.5,0.5);for(let E=0,G=3;E<=J;E++,G+=3){let q=Q+E/J*W;X.x=$*Math.cos(q),X.y=$*Math.sin(q),K.push(X.x,X.y,X.z),H.push(0,0,1),U.x=(K[G]/$+1)/2,U.y=(K[G+1]/$+1)/2,Y.push(U.x,U.y)}for(let E=1;E<=J;E++)Z.push(E,E+1,0);this.setIndex(Z),this.setAttribute("position",new a(K,3)),this.setAttribute("normal",new a(H,3)),this.setAttribute("uv",new a(Y,2))}copy($){return super.copy($),this.parameters=Object.assign({},$.parameters),this}static fromJSON($){return new V8($.radius,$.segments,$.thetaStart,$.thetaLength)}}class T0 extends Z0{constructor($=1,J=1,Q=1,W=32,Z=1,K=!1,H=0,Y=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:$,radiusBottom:J,height:Q,radialSegments:W,heightSegments:Z,openEnded:K,thetaStart:H,thetaLength:Y};let X=this;W=Math.floor(W),Z=Math.floor(Z);let U=[],E=[],G=[],q=[],F=0,R=[],O=Q/2,M=0;if(V(),K===!1){if($>0)D(!0);if(J>0)D(!1)}this.setIndex(U),this.setAttribute("position",new a(E,3)),this.setAttribute("normal",new a(G,3)),this.setAttribute("uv",new a(q,2));function V(){let k=new w,B=new w,C=0,z=(J-$)/Q;for(let _=0;_<=Z;_++){let P=[],T=_/Z,f=T*(J-$)+$;for(let b=0;b<=W;b++){let x=b/W,d=x*Y+H,A=Math.sin(d),s=Math.cos(d);B.x=f*A,B.y=-T*Q+O,B.z=f*s,E.push(B.x,B.y,B.z),k.set(A,z,s).normalize(),G.push(k.x,k.y,k.z),q.push(x,1-T),P.push(F++)}R.push(P)}for(let _=0;_<W;_++)for(let P=0;P<Z;P++){let T=R[P][_],f=R[P+1][_],b=R[P+1][_+1],x=R[P][_+1];if($>0||P!==0)U.push(T,f,x),C+=3;if(J>0||P!==Z-1)U.push(f,b,x),C+=3}X.addGroup(M,C,0),M+=C}function D(k){let B=F,C=new S,z=new w,_=0,P=k===!0?$:J,T=k===!0?1:-1;for(let b=1;b<=W;b++)E.push(0,O*T,0),G.push(0,T,0),q.push(0.5,0.5),F++;let f=F;for(let b=0;b<=W;b++){let d=b/W*Y+H,A=Math.cos(d),s=Math.sin(d);z.x=P*s,z.y=O*T,z.z=P*A,E.push(z.x,z.y,z.z),G.push(0,T,0),C.x=A*0.5+0.5,C.y=s*0.5*T+0.5,q.push(C.x,C.y),F++}for(let b=0;b<W;b++){let x=B+b,d=f+b;if(k===!0)U.push(d,d+1,x);else U.push(d+1,d,x);_+=3}X.addGroup(M,_,k===!0?1:2),M+=_}}copy($){return super.copy($),this.parameters=Object.assign({},$.parameters),this}static fromJSON($){return new T0($.radiusTop,$.radiusBottom,$.height,$.radialSegments,$.heightSegments,$.openEnded,$.thetaStart,$.thetaLength)}}class x0 extends T0{constructor($=1,J=1,Q=32,W=1,Z=!1,K=0,H=Math.PI*2){super(0,$,J,Q,W,Z,K,H);this.type="ConeGeometry",this.parameters={radius:$,height:J,radialSegments:Q,heightSegments:W,openEnded:Z,thetaStart:K,thetaLength:H}}static fromJSON($){return new x0($.radius,$.height,$.radialSegments,$.heightSegments,$.openEnded,$.thetaStart,$.thetaLength)}}class c6 extends Z0{constructor($=[],J=[],Q=1,W=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:$,indices:J,radius:Q,detail:W};let Z=[],K=[];if(H(W),X(Q),U(),this.setAttribute("position",new a(Z,3)),this.setAttribute("normal",new a(Z.slice(),3)),this.setAttribute("uv",new a(K,2)),W===0)this.computeVertexNormals();else this.normalizeNormals();function H(V){let D=new w,k=new w,B=new w;for(let C=0;C<J.length;C+=3)q(J[C+0],D),q(J[C+1],k),q(J[C+2],B),Y(D,k,B,V)}function Y(V,D,k,B){let C=B+1,z=[];for(let _=0;_<=C;_++){z[_]=[];let P=V.clone().lerp(k,_/C),T=D.clone().lerp(k,_/C),f=C-_;for(let b=0;b<=f;b++)if(b===0&&_===C)z[_][b]=P;else z[_][b]=P.clone().lerp(T,b/f)}for(let _=0;_<C;_++)for(let P=0;P<2*(C-_)-1;P++){let T=Math.floor(P/2);if(P%2===0)G(z[_][T+1]),G(z[_+1][T]),G(z[_][T]);else G(z[_][T+1]),G(z[_+1][T+1]),G(z[_+1][T])}}function X(V){let D=new w;for(let k=0;k<Z.length;k+=3)D.x=Z[k+0],D.y=Z[k+1],D.z=Z[k+2],D.normalize().multiplyScalar(V),Z[k+0]=D.x,Z[k+1]=D.y,Z[k+2]=D.z}function U(){let V=new w;for(let D=0;D<Z.length;D+=3){V.x=Z[D+0],V.y=Z[D+1],V.z=Z[D+2];let k=O(V)/2/Math.PI+0.5,B=M(V)/Math.PI+0.5;K.push(k,1-B)}F(),E()}function E(){for(let V=0;V<K.length;V+=6){let D=K[V+0],k=K[V+2],B=K[V+4],C=Math.max(D,k,B),z=Math.min(D,k,B);if(C>0.9&&z<0.1){if(D<0.2)K[V+0]+=1;if(k<0.2)K[V+2]+=1;if(B<0.2)K[V+4]+=1}}}function G(V){Z.push(V.x,V.y,V.z)}function q(V,D){let k=V*3;D.x=$[k+0],D.y=$[k+1],D.z=$[k+2]}function F(){let V=new w,D=new w,k=new w,B=new w,C=new S,z=new S,_=new S;for(let P=0,T=0;P<Z.length;P+=9,T+=6){V.set(Z[P+0],Z[P+1],Z[P+2]),D.set(Z[P+3],Z[P+4],Z[P+5]),k.set(Z[P+6],Z[P+7],Z[P+8]),C.set(K[T+0],K[T+1]),z.set(K[T+2],K[T+3]),_.set(K[T+4],K[T+5]),B.copy(V).add(D).add(k).divideScalar(3);let f=O(B);R(C,T+0,V,f),R(z,T+2,D,f),R(_,T+4,k,f)}}function R(V,D,k,B){if(B<0&&V.x===1)K[D]=V.x-1;if(k.x===0&&k.z===0)K[D]=B/2/Math.PI+0.5}function O(V){return Math.atan2(V.z,-V.x)}function M(V){return Math.atan2(-V.y,Math.sqrt(V.x*V.x+V.z*V.z))}}copy($){return super.copy($),this.parameters=Object.assign({},$.parameters),this}static fromJSON($){return new c6($.vertices,$.indices,$.radius,$.detail)}}class K${constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){$0("Curve: .getPoint() not implemented.")}getPointAt($,J){let Q=this.getUtoTmapping($);return this.getPoint(Q,J)}getPoints($=5){let J=[];for(let Q=0;Q<=$;Q++)J.push(this.getPoint(Q/$));return J}getSpacedPoints($=5){let J=[];for(let Q=0;Q<=$;Q++)J.push(this.getPointAt(Q/$));return J}getLength(){let $=this.getLengths();return $[$.length-1]}getLengths($=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===$+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let J=[],Q,W=this.getPoint(0),Z=0;J.push(0);for(let K=1;K<=$;K++)Q=this.getPoint(K/$),Z+=Q.distanceTo(W),J.push(Z),W=Q;return this.cacheArcLengths=J,J}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping($,J=null){let Q=this.getLengths(),W=0,Z=Q.length,K;if(J)K=J;else K=$*Q[Z-1];let H=0,Y=Z-1,X;while(H<=Y)if(W=Math.floor(H+(Y-H)/2),X=Q[W]-K,X<0)H=W+1;else if(X>0)Y=W-1;else{Y=W;break}if(W=Y,Q[W]===K)return W/(Z-1);let U=Q[W],G=Q[W+1]-U,q=(K-U)/G;return(W+q)/(Z-1)}getTangent($,J){let W=$-0.0001,Z=$+0.0001;if(W<0)W=0;if(Z>1)Z=1;let K=this.getPoint(W),H=this.getPoint(Z),Y=J||(K.isVector2?new S:new w);return Y.copy(H).sub(K).normalize(),Y}getTangentAt($,J){let Q=this.getUtoTmapping($);return this.getTangent(Q,J)}computeFrenetFrames($,J=!1){let Q=new w,W=[],Z=[],K=[],H=new w,Y=new u;for(let q=0;q<=$;q++){let F=q/$;W[q]=this.getTangentAt(F,new w)}Z[0]=new w,K[0]=new w;let X=Number.MAX_VALUE,U=Math.abs(W[0].x),E=Math.abs(W[0].y),G=Math.abs(W[0].z);if(U<=X)X=U,Q.set(1,0,0);if(E<=X)X=E,Q.set(0,1,0);if(G<=X)Q.set(0,0,1);H.crossVectors(W[0],Q).normalize(),Z[0].crossVectors(W[0],H),K[0].crossVectors(W[0],Z[0]);for(let q=1;q<=$;q++){if(Z[q]=Z[q-1].clone(),K[q]=K[q-1].clone(),H.crossVectors(W[q-1],W[q]),H.length()>Number.EPSILON){H.normalize();let F=Math.acos(m(W[q-1].dot(W[q]),-1,1));Z[q].applyMatrix4(Y.makeRotationAxis(H,F))}K[q].crossVectors(W[q],Z[q])}if(J===!0){let q=Math.acos(m(Z[0].dot(Z[$]),-1,1));if(q/=$,W[0].dot(H.crossVectors(Z[0],Z[$]))>0)q=-q;for(let F=1;F<=$;F++)Z[F].applyMatrix4(Y.makeRotationAxis(W[F],q*F)),K[F].crossVectors(W[F],Z[F])}return{tangents:W,normals:Z,binormals:K}}clone(){return new this.constructor().copy(this)}copy($){return this.arcLengthDivisions=$.arcLengthDivisions,this}toJSON(){let $={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return $.arcLengthDivisions=this.arcLengthDivisions,$.type=this.type,$}fromJSON($){return this.arcLengthDivisions=$.arcLengthDivisions,this}}class n6 extends K${constructor($=0,J=0,Q=1,W=1,Z=0,K=Math.PI*2,H=!1,Y=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=$,this.aY=J,this.xRadius=Q,this.yRadius=W,this.aStartAngle=Z,this.aEndAngle=K,this.aClockwise=H,this.aRotation=Y}getPoint($,J=new S){let Q=J,W=Math.PI*2,Z=this.aEndAngle-this.aStartAngle,K=Math.abs(Z)<Number.EPSILON;while(Z<0)Z+=W;while(Z>W)Z-=W;if(Z<Number.EPSILON)if(K)Z=0;else Z=W;if(this.aClockwise===!0&&!K)if(Z===W)Z=-W;else Z=Z-W;let H=this.aStartAngle+$*Z,Y=this.aX+this.xRadius*Math.cos(H),X=this.aY+this.yRadius*Math.sin(H);if(this.aRotation!==0){let U=Math.cos(this.aRotation),E=Math.sin(this.aRotation),G=Y-this.aX,q=X-this.aY;Y=G*U-q*E+this.aX,X=G*E+q*U+this.aY}return Q.set(Y,X)}copy($){return super.copy($),this.aX=$.aX,this.aY=$.aY,this.xRadius=$.xRadius,this.yRadius=$.yRadius,this.aStartAngle=$.aStartAngle,this.aEndAngle=$.aEndAngle,this.aClockwise=$.aClockwise,this.aRotation=$.aRotation,this}toJSON(){let $=super.toJSON();return $.aX=this.aX,$.aY=this.aY,$.xRadius=this.xRadius,$.yRadius=this.yRadius,$.aStartAngle=this.aStartAngle,$.aEndAngle=this.aEndAngle,$.aClockwise=this.aClockwise,$.aRotation=this.aRotation,$}fromJSON($){return super.fromJSON($),this.aX=$.aX,this.aY=$.aY,this.xRadius=$.xRadius,this.yRadius=$.yRadius,this.aStartAngle=$.aStartAngle,this.aEndAngle=$.aEndAngle,this.aClockwise=$.aClockwise,this.aRotation=$.aRotation,this}}class WQ extends n6{constructor($,J,Q,W,Z,K){super($,J,Q,Q,W,Z,K);this.isArcCurve=!0,this.type="ArcCurve"}}function ZQ(){let $=0,J=0,Q=0,W=0;function Z(K,H,Y,X){$=K,J=Y,Q=-3*K+3*H-2*Y-X,W=2*K-2*H+Y+X}return{initCatmullRom:function(K,H,Y,X,U){Z(H,Y,U*(Y-K),U*(X-H))},initNonuniformCatmullRom:function(K,H,Y,X,U,E,G){let q=(H-K)/U-(Y-K)/(U+E)+(Y-H)/E,F=(Y-H)/E-(X-H)/(E+G)+(X-Y)/G;q*=E,F*=E,Z(H,Y,q,F)},calc:function(K){let H=K*K,Y=H*K;return $+J*K+Q*H+W*Y}}}var EZ=new w,GZ=new w,BJ=new ZQ,CJ=new ZQ,zJ=new ZQ;class KQ extends K${constructor($=[],J=!1,Q="centripetal",W=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=$,this.closed=J,this.curveType=Q,this.tension=W}getPoint($,J=new w){let Q=J,W=this.points,Z=W.length,K=(Z-(this.closed?0:1))*$,H=Math.floor(K),Y=K-H;if(this.closed)H+=H>0?0:(Math.floor(Math.abs(H)/Z)+1)*Z;else if(Y===0&&H===Z-1)H=Z-2,Y=1;let X,U;if(this.closed||H>0)X=W[(H-1)%Z];else GZ.subVectors(W[0],W[1]).add(W[0]),X=GZ;let E=W[H%Z],G=W[(H+1)%Z];if(this.closed||H+2<Z)U=W[(H+2)%Z];else EZ.subVectors(W[Z-1],W[Z-2]).add(W[Z-1]),U=EZ;if(this.curveType==="centripetal"||this.curveType==="chordal"){let q=this.curveType==="chordal"?0.5:0.25,F=Math.pow(X.distanceToSquared(E),q),R=Math.pow(E.distanceToSquared(G),q),O=Math.pow(G.distanceToSquared(U),q);if(R<0.0001)R=1;if(F<0.0001)F=R;if(O<0.0001)O=R;BJ.initNonuniformCatmullRom(X.x,E.x,G.x,U.x,F,R,O),CJ.initNonuniformCatmullRom(X.y,E.y,G.y,U.y,F,R,O),zJ.initNonuniformCatmullRom(X.z,E.z,G.z,U.z,F,R,O)}else if(this.curveType==="catmullrom")BJ.initCatmullRom(X.x,E.x,G.x,U.x,this.tension),CJ.initCatmullRom(X.y,E.y,G.y,U.y,this.tension),zJ.initCatmullRom(X.z,E.z,G.z,U.z,this.tension);return Q.set(BJ.calc(Y),CJ.calc(Y),zJ.calc(Y)),Q}copy($){super.copy($),this.points=[];for(let J=0,Q=$.points.length;J<Q;J++){let W=$.points[J];this.points.push(W.clone())}return this.closed=$.closed,this.curveType=$.curveType,this.tension=$.tension,this}toJSON(){let $=super.toJSON();$.points=[];for(let J=0,Q=this.points.length;J<Q;J++){let W=this.points[J];$.points.push(W.toArray())}return $.closed=this.closed,$.curveType=this.curveType,$.tension=this.tension,$}fromJSON($){super.fromJSON($),this.points=[];for(let J=0,Q=$.points.length;J<Q;J++){let W=$.points[J];this.points.push(new w().fromArray(W))}return this.closed=$.closed,this.curveType=$.curveType,this.tension=$.tension,this}}function qZ($,J,Q,W,Z){let K=(W-J)*0.5,H=(Z-Q)*0.5,Y=$*$,X=$*Y;return(2*Q-2*W+K+H)*X+(-3*Q+3*W-2*K-H)*Y+K*$+Q}function jY($,J){let Q=1-$;return Q*Q*J}function fY($,J){return 2*(1-$)*$*J}function hY($,J){return $*$*J}function f6($,J,Q,W){return jY($,J)+fY($,Q)+hY($,W)}function vY($,J){let Q=1-$;return Q*Q*Q*J}function yY($,J){let Q=1-$;return 3*Q*Q*$*J}function bY($,J){return 3*(1-$)*$*$*J}function xY($,J){return $*$*$*J}function h6($,J,Q,W,Z){return vY($,J)+yY($,Q)+bY($,W)+xY($,Z)}class Y7 extends K${constructor($=new S,J=new S,Q=new S,W=new S){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=$,this.v1=J,this.v2=Q,this.v3=W}getPoint($,J=new S){let Q=J,W=this.v0,Z=this.v1,K=this.v2,H=this.v3;return Q.set(h6($,W.x,Z.x,K.x,H.x),h6($,W.y,Z.y,K.y,H.y)),Q}copy($){return super.copy($),this.v0.copy($.v0),this.v1.copy($.v1),this.v2.copy($.v2),this.v3.copy($.v3),this}toJSON(){let $=super.toJSON();return $.v0=this.v0.toArray(),$.v1=this.v1.toArray(),$.v2=this.v2.toArray(),$.v3=this.v3.toArray(),$}fromJSON($){return super.fromJSON($),this.v0.fromArray($.v0),this.v1.fromArray($.v1),this.v2.fromArray($.v2),this.v3.fromArray($.v3),this}}class HQ extends K${constructor($=new w,J=new w,Q=new w,W=new w){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=$,this.v1=J,this.v2=Q,this.v3=W}getPoint($,J=new w){let Q=J,W=this.v0,Z=this.v1,K=this.v2,H=this.v3;return Q.set(h6($,W.x,Z.x,K.x,H.x),h6($,W.y,Z.y,K.y,H.y),h6($,W.z,Z.z,K.z,H.z)),Q}copy($){return super.copy($),this.v0.copy($.v0),this.v1.copy($.v1),this.v2.copy($.v2),this.v3.copy($.v3),this}toJSON(){let $=super.toJSON();return $.v0=this.v0.toArray(),$.v1=this.v1.toArray(),$.v2=this.v2.toArray(),$.v3=this.v3.toArray(),$}fromJSON($){return super.fromJSON($),this.v0.fromArray($.v0),this.v1.fromArray($.v1),this.v2.fromArray($.v2),this.v3.fromArray($.v3),this}}class X7 extends K${constructor($=new S,J=new S){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=$,this.v2=J}getPoint($,J=new S){let Q=J;if($===1)Q.copy(this.v2);else Q.copy(this.v2).sub(this.v1),Q.multiplyScalar($).add(this.v1);return Q}getPointAt($,J){return this.getPoint($,J)}getTangent($,J=new S){return J.subVectors(this.v2,this.v1).normalize()}getTangentAt($,J){return this.getTangent($,J)}copy($){return super.copy($),this.v1.copy($.v1),this.v2.copy($.v2),this}toJSON(){let $=super.toJSON();return $.v1=this.v1.toArray(),$.v2=this.v2.toArray(),$}fromJSON($){return super.fromJSON($),this.v1.fromArray($.v1),this.v2.fromArray($.v2),this}}class YQ extends K${constructor($=new w,J=new w){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=$,this.v2=J}getPoint($,J=new w){let Q=J;if($===1)Q.copy(this.v2);else Q.copy(this.v2).sub(this.v1),Q.multiplyScalar($).add(this.v1);return Q}getPointAt($,J){return this.getPoint($,J)}getTangent($,J=new w){return J.subVectors(this.v2,this.v1).normalize()}getTangentAt($,J){return this.getTangent($,J)}copy($){return super.copy($),this.v1.copy($.v1),this.v2.copy($.v2),this}toJSON(){let $=super.toJSON();return $.v1=this.v1.toArray(),$.v2=this.v2.toArray(),$}fromJSON($){return super.fromJSON($),this.v1.fromArray($.v1),this.v2.fromArray($.v2),this}}class U7 extends K${constructor($=new S,J=new S,Q=new S){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=$,this.v1=J,this.v2=Q}getPoint($,J=new S){let Q=J,W=this.v0,Z=this.v1,K=this.v2;return Q.set(f6($,W.x,Z.x,K.x),f6($,W.y,Z.y,K.y)),Q}copy($){return super.copy($),this.v0.copy($.v0),this.v1.copy($.v1),this.v2.copy($.v2),this}toJSON(){let $=super.toJSON();return $.v0=this.v0.toArray(),$.v1=this.v1.toArray(),$.v2=this.v2.toArray(),$}fromJSON($){return super.fromJSON($),this.v0.fromArray($.v0),this.v1.fromArray($.v1),this.v2.fromArray($.v2),this}}class XQ extends K${constructor($=new w,J=new w,Q=new w){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=$,this.v1=J,this.v2=Q}getPoint($,J=new w){let Q=J,W=this.v0,Z=this.v1,K=this.v2;return Q.set(f6($,W.x,Z.x,K.x),f6($,W.y,Z.y,K.y),f6($,W.z,Z.z,K.z)),Q}copy($){return super.copy($),this.v0.copy($.v0),this.v1.copy($.v1),this.v2.copy($.v2),this}toJSON(){let $=super.toJSON();return $.v0=this.v0.toArray(),$.v1=this.v1.toArray(),$.v2=this.v2.toArray(),$}fromJSON($){return super.fromJSON($),this.v0.fromArray($.v0),this.v1.fromArray($.v1),this.v2.fromArray($.v2),this}}class N7 extends K${constructor($=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=$}getPoint($,J=new S){let Q=J,W=this.points,Z=(W.length-1)*$,K=Math.floor(Z),H=Z-K,Y=W[K===0?K:K-1],X=W[K],U=W[K>W.length-2?W.length-1:K+1],E=W[K>W.length-3?W.length-1:K+2];return Q.set(qZ(H,Y.x,X.x,U.x,E.x),qZ(H,Y.y,X.y,U.y,E.y)),Q}copy($){super.copy($),this.points=[];for(let J=0,Q=$.points.length;J<Q;J++){let W=$.points[J];this.points.push(W.clone())}return this}toJSON(){let $=super.toJSON();$.points=[];for(let J=0,Q=this.points.length;J<Q;J++){let W=this.points[J];$.points.push(W.toArray())}return $}fromJSON($){super.fromJSON($),this.points=[];for(let J=0,Q=$.points.length;J<Q;J++){let W=$.points[J];this.points.push(new S().fromArray(W))}return this}}var FZ=Object.freeze({__proto__:null,ArcCurve:WQ,CatmullRomCurve3:KQ,CubicBezierCurve:Y7,CubicBezierCurve3:HQ,EllipseCurve:n6,LineCurve:X7,LineCurve3:YQ,QuadraticBezierCurve:U7,QuadraticBezierCurve3:XQ,SplineCurve:N7});class UQ extends K${constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add($){this.curves.push($)}closePath(){let $=this.curves[0].getPoint(0),J=this.curves[this.curves.length-1].getPoint(1);if(!$.equals(J)){let Q=$.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new FZ[Q](J,$))}return this}getPoint($,J){let Q=$*this.getLength(),W=this.getCurveLengths(),Z=0;while(Z<W.length){if(W[Z]>=Q){let K=W[Z]-Q,H=this.curves[Z],Y=H.getLength(),X=Y===0?0:1-K/Y;return H.getPointAt(X,J)}Z++}return null}getLength(){let $=this.getCurveLengths();return $[$.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let $=[],J=0;for(let Q=0,W=this.curves.length;Q<W;Q++)J+=this.curves[Q].getLength(),$.push(J);return this.cacheLengths=$,$}getSpacedPoints($=40){let J=[];for(let Q=0;Q<=$;Q++)J.push(this.getPoint(Q/$));if(this.autoClose)J.push(J[0]);return J}getPoints($=12){let J=[],Q;for(let W=0,Z=this.curves;W<Z.length;W++){let K=Z[W],H=K.isEllipseCurve?$*2:K.isLineCurve||K.isLineCurve3?1:K.isSplineCurve?$*K.points.length:$,Y=K.getPoints(H);for(let X=0;X<Y.length;X++){let U=Y[X];if(Q&&Q.equals(U))continue;J.push(U),Q=U}}if(this.autoClose&&J.length>1&&!J[J.length-1].equals(J[0]))J.push(J[0]);return J}copy($){super.copy($),this.curves=[];for(let J=0,Q=$.curves.length;J<Q;J++){let W=$.curves[J];this.curves.push(W.clone())}return this.autoClose=$.autoClose,this}toJSON(){let $=super.toJSON();$.autoClose=this.autoClose,$.curves=[];for(let J=0,Q=this.curves.length;J<Q;J++){let W=this.curves[J];$.curves.push(W.toJSON())}return $}fromJSON($){super.fromJSON($),this.autoClose=$.autoClose,this.curves=[];for(let J=0,Q=$.curves.length;J<Q;J++){let W=$.curves[J];this.curves.push(new FZ[W.type]().fromJSON(W))}return this}}class r9 extends UQ{constructor($){super();if(this.type="Path",this.currentPoint=new S,$)this.setFromPoints($)}setFromPoints($){this.moveTo($[0].x,$[0].y);for(let J=1,Q=$.length;J<Q;J++)this.lineTo($[J].x,$[J].y);return this}moveTo($,J){return this.currentPoint.set($,J),this}lineTo($,J){let Q=new X7(this.currentPoint.clone(),new S($,J));return this.curves.push(Q),this.currentPoint.set($,J),this}quadraticCurveTo($,J,Q,W){let Z=new U7(this.currentPoint.clone(),new S($,J),new S(Q,W));return this.curves.push(Z),this.currentPoint.set(Q,W),this}bezierCurveTo($,J,Q,W,Z,K){let H=new Y7(this.currentPoint.clone(),new S($,J),new S(Q,W),new S(Z,K));return this.curves.push(H),this.currentPoint.set(Z,K),this}splineThru($){let J=[this.currentPoint.clone()].concat($),Q=new N7(J);return this.curves.push(Q),this.currentPoint.copy($[$.length-1]),this}arc($,J,Q,W,Z,K){let H=this.currentPoint.x,Y=this.currentPoint.y;return this.absarc($+H,J+Y,Q,W,Z,K),this}absarc($,J,Q,W,Z,K){return this.absellipse($,J,Q,Q,W,Z,K),this}ellipse($,J,Q,W,Z,K,H,Y){let X=this.currentPoint.x,U=this.currentPoint.y;return this.absellipse($+X,J+U,Q,W,Z,K,H,Y),this}absellipse($,J,Q,W,Z,K,H,Y){let X=new n6($,J,Q,W,Z,K,H,Y);if(this.curves.length>0){let E=X.getPoint(0);if(!E.equals(this.currentPoint))this.lineTo(E.x,E.y)}this.curves.push(X);let U=X.getPoint(1);return this.currentPoint.copy(U),this}copy($){return super.copy($),this.currentPoint.copy($.currentPoint),this}toJSON(){let $=super.toJSON();return $.currentPoint=this.currentPoint.toArray(),$}fromJSON($){return super.fromJSON($),this.currentPoint.fromArray($.currentPoint),this}}class s6 extends r9{constructor($){super($);this.uuid=W$(),this.type="Shape",this.holes=[]}getPointsHoles($){let J=[];for(let Q=0,W=this.holes.length;Q<W;Q++)J[Q]=this.holes[Q].getPoints($);return J}extractPoints($){return{shape:this.getPoints($),holes:this.getPointsHoles($)}}copy($){super.copy($),this.holes=[];for(let J=0,Q=$.holes.length;J<Q;J++){let W=$.holes[J];this.holes.push(W.clone())}return this}toJSON(){let $=super.toJSON();$.uuid=this.uuid,$.holes=[];for(let J=0,Q=this.holes.length;J<Q;J++){let W=this.holes[J];$.holes.push(W.toJSON())}return $}fromJSON($){super.fromJSON($),this.uuid=$.uuid,this.holes=[];for(let J=0,Q=$.holes.length;J<Q;J++){let W=$.holes[J];this.holes.push(new r9().fromJSON(W))}return this}}function gY($,J,Q=2){let W=J&&J.length,Z=W?J[0]*Q:$.length,K=xZ($,0,Z,Q,!0),H=[];if(!K||K.next===K.prev)return H;let Y,X,U;if(W)K=mY($,J,K,Q);if($.length>80*Q){Y=$[0],X=$[1];let E=Y,G=X;for(let q=Q;q<Z;q+=Q){let F=$[q],R=$[q+1];if(F<Y)Y=F;if(R<X)X=R;if(F>E)E=F;if(R>G)G=R}U=Math.max(E-Y,G-X),U=U!==0?32767/U:0}return v6(K,H,Q,Y,X,U,0),H}function xZ($,J,Q,W,Z){let K;if(Z===J5($,J,Q,W)>0)for(let H=J;H<Q;H+=W)K=RZ(H/W|0,$[H],$[H+1],K);else for(let H=Q-W;H>=J;H-=W)K=RZ(H/W|0,$[H],$[H+1],K);if(K&&r8(K,K.next))b6(K),K=K.next;return K}function F8($,J){if(!$)return $;if(!J)J=$;let Q=$,W;do if(W=!1,!Q.steiner&&(r8(Q,Q.next)||F0(Q.prev,Q,Q.next)===0)){if(b6(Q),Q=J=Q.prev,Q===Q.next)break;W=!0}else Q=Q.next;while(W||Q!==J);return J}function v6($,J,Q,W,Z,K,H){if(!$)return;if(!H&&K)oY($,W,Z,K);let Y=$;while($.prev!==$.next){let{prev:X,next:U}=$;if(K?lY($,W,Z,K):pY($)){J.push(X.i,$.i,U.i),b6($),$=U.next,Y=U.next;continue}if($=U,$===Y){if(!H)v6(F8($),J,Q,W,Z,K,1);else if(H===1)$=uY(F8($),J),v6($,J,Q,W,Z,K,2);else if(H===2)dY($,J,Q,W,Z,K);break}}}function pY($){let J=$.prev,Q=$,W=$.next;if(F0(J,Q,W)>=0)return!1;let Z=J.x,K=Q.x,H=W.x,Y=J.y,X=Q.y,U=W.y,E=Math.min(Z,K,H),G=Math.min(Y,X,U),q=Math.max(Z,K,H),F=Math.max(Y,X,U),R=W.next;while(R!==J){if(R.x>=E&&R.x<=q&&R.y>=G&&R.y<=F&&A6(Z,Y,K,X,H,U,R.x,R.y)&&F0(R.prev,R,R.next)>=0)return!1;R=R.next}return!0}function lY($,J,Q,W){let Z=$.prev,K=$,H=$.next;if(F0(Z,K,H)>=0)return!1;let Y=Z.x,X=K.x,U=H.x,E=Z.y,G=K.y,q=H.y,F=Math.min(Y,X,U),R=Math.min(E,G,q),O=Math.max(Y,X,U),M=Math.max(E,G,q),V=AJ(F,R,J,Q,W),D=AJ(O,M,J,Q,W),k=$.prevZ,B=$.nextZ;while(k&&k.z>=V&&B&&B.z<=D){if(k.x>=F&&k.x<=O&&k.y>=R&&k.y<=M&&k!==Z&&k!==H&&A6(Y,E,X,G,U,q,k.x,k.y)&&F0(k.prev,k,k.next)>=0)return!1;if(k=k.prevZ,B.x>=F&&B.x<=O&&B.y>=R&&B.y<=M&&B!==Z&&B!==H&&A6(Y,E,X,G,U,q,B.x,B.y)&&F0(B.prev,B,B.next)>=0)return!1;B=B.nextZ}while(k&&k.z>=V){if(k.x>=F&&k.x<=O&&k.y>=R&&k.y<=M&&k!==Z&&k!==H&&A6(Y,E,X,G,U,q,k.x,k.y)&&F0(k.prev,k,k.next)>=0)return!1;k=k.prevZ}while(B&&B.z<=D){if(B.x>=F&&B.x<=O&&B.y>=R&&B.y<=M&&B!==Z&&B!==H&&A6(Y,E,X,G,U,q,B.x,B.y)&&F0(B.prev,B,B.next)>=0)return!1;B=B.nextZ}return!0}function uY($,J){let Q=$;do{let W=Q.prev,Z=Q.next.next;if(!r8(W,Z)&&pZ(W,Q,Q.next,Z)&&y6(W,Z)&&y6(Z,W))J.push(W.i,Q.i,Z.i),b6(Q),b6(Q.next),Q=$=Z;Q=Q.next}while(Q!==$);return F8(Q)}function dY($,J,Q,W,Z,K){let H=$;do{let Y=H.next.next;while(Y!==H.prev){if(H.i!==Y.i&&tY(H,Y)){let X=lZ(H,Y);H=F8(H,H.next),X=F8(X,X.next),v6(H,J,Q,W,Z,K,0),v6(X,J,Q,W,Z,K,0);return}Y=Y.next}H=H.next}while(H!==$)}function mY($,J,Q,W){let Z=[];for(let K=0,H=J.length;K<H;K++){let Y=J[K]*W,X=K<H-1?J[K+1]*W:$.length,U=xZ($,Y,X,W,!1);if(U===U.next)U.steiner=!0;Z.push(rY(U))}Z.sort(cY);for(let K=0;K<Z.length;K++)Q=nY(Z[K],Q);return Q}function cY($,J){let Q=$.x-J.x;if(Q===0){if(Q=$.y-J.y,Q===0){let W=($.next.y-$.y)/($.next.x-$.x),Z=(J.next.y-J.y)/(J.next.x-J.x);Q=W-Z}}return Q}function nY($,J){let Q=sY($,J);if(!Q)return J;let W=lZ(Q,$);return F8(W,W.next),F8(Q,Q.next)}function sY($,J){let Q=J,W=$.x,Z=$.y,K=-1/0,H;if(r8($,Q))return Q;do{if(r8($,Q.next))return Q.next;else if(Z<=Q.y&&Z>=Q.next.y&&Q.next.y!==Q.y){let G=Q.x+(Z-Q.y)*(Q.next.x-Q.x)/(Q.next.y-Q.y);if(G<=W&&G>K){if(K=G,H=Q.x<Q.next.x?Q:Q.next,G===W)return H}}Q=Q.next}while(Q!==J);if(!H)return null;let Y=H,X=H.x,U=H.y,E=1/0;Q=H;do{if(W>=Q.x&&Q.x>=X&&W!==Q.x&&gZ(Z<U?W:K,Z,X,U,Z<U?K:W,Z,Q.x,Q.y)){let G=Math.abs(Z-Q.y)/(W-Q.x);if(y6(Q,$)&&(G<E||G===E&&(Q.x>H.x||Q.x===H.x&&iY(H,Q))))H=Q,E=G}Q=Q.next}while(Q!==Y);return H}function iY($,J){return F0($.prev,$,J.prev)<0&&F0(J.next,$,$.next)<0}function oY($,J,Q,W){let Z=$;do{if(Z.z===0)Z.z=AJ(Z.x,Z.y,J,Q,W);Z.prevZ=Z.prev,Z.nextZ=Z.next,Z=Z.next}while(Z!==$);Z.prevZ.nextZ=null,Z.prevZ=null,aY(Z)}function aY($){let J,Q=1;do{let W=$,Z;$=null;let K=null;J=0;while(W){J++;let H=W,Y=0;for(let U=0;U<Q;U++)if(Y++,H=H.nextZ,!H)break;let X=Q;while(Y>0||X>0&&H){if(Y!==0&&(X===0||!H||W.z<=H.z))Z=W,W=W.nextZ,Y--;else Z=H,H=H.nextZ,X--;if(K)K.nextZ=Z;else $=Z;Z.prevZ=K,K=Z}W=H}K.nextZ=null,Q*=2}while(J>1);return $}function AJ($,J,Q,W,Z){return $=($-Q)*Z|0,J=(J-W)*Z|0,$=($|$<<8)&16711935,$=($|$<<4)&252645135,$=($|$<<2)&858993459,$=($|$<<1)&1431655765,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,$|J<<1}function rY($){let J=$,Q=$;do{if(J.x<Q.x||J.x===Q.x&&J.y<Q.y)Q=J;J=J.next}while(J!==$);return Q}function gZ($,J,Q,W,Z,K,H,Y){return(Z-H)*(J-Y)>=($-H)*(K-Y)&&($-H)*(W-Y)>=(Q-H)*(J-Y)&&(Q-H)*(K-Y)>=(Z-H)*(W-Y)}function A6($,J,Q,W,Z,K,H,Y){return!($===H&&J===Y)&&gZ($,J,Q,W,Z,K,H,Y)}function tY($,J){return $.next.i!==J.i&&$.prev.i!==J.i&&!eY($,J)&&(y6($,J)&&y6(J,$)&&$5($,J)&&(F0($.prev,$,J.prev)||F0($,J.prev,J))||r8($,J)&&F0($.prev,$,$.next)>0&&F0(J.prev,J,J.next)>0)}function F0($,J,Q){return(J.y-$.y)*(Q.x-J.x)-(J.x-$.x)*(Q.y-J.y)}function r8($,J){return $.x===J.x&&$.y===J.y}function pZ($,J,Q,W){let Z=m9(F0($,J,Q)),K=m9(F0($,J,W)),H=m9(F0(Q,W,$)),Y=m9(F0(Q,W,J));if(Z!==K&&H!==Y)return!0;if(Z===0&&d9($,Q,J))return!0;if(K===0&&d9($,W,J))return!0;if(H===0&&d9(Q,$,W))return!0;if(Y===0&&d9(Q,J,W))return!0;return!1}function d9($,J,Q){return J.x<=Math.max($.x,Q.x)&&J.x>=Math.min($.x,Q.x)&&J.y<=Math.max($.y,Q.y)&&J.y>=Math.min($.y,Q.y)}function m9($){return $>0?1:$<0?-1:0}function eY($,J){let Q=$;do{if(Q.i!==$.i&&Q.next.i!==$.i&&Q.i!==J.i&&Q.next.i!==J.i&&pZ(Q,Q.next,$,J))return!0;Q=Q.next}while(Q!==$);return!1}function y6($,J){return F0($.prev,$,$.next)<0?F0($,J,$.next)>=0&&F0($,$.prev,J)>=0:F0($,J,$.prev)<0||F0($,$.next,J)<0}function $5($,J){let Q=$,W=!1,Z=($.x+J.x)/2,K=($.y+J.y)/2;do{if(Q.y>K!==Q.next.y>K&&Q.next.y!==Q.y&&Z<(Q.next.x-Q.x)*(K-Q.y)/(Q.next.y-Q.y)+Q.x)W=!W;Q=Q.next}while(Q!==$);return W}function lZ($,J){let Q=SJ($.i,$.x,$.y),W=SJ(J.i,J.x,J.y),Z=$.next,K=J.prev;return $.next=J,J.prev=$,Q.next=Z,Z.prev=Q,W.next=Q,Q.prev=W,K.next=W,W.prev=K,W}function RZ($,J,Q,W){let Z=SJ($,J,Q);if(!W)Z.prev=Z,Z.next=Z;else Z.next=W.next,Z.prev=W,W.next.prev=Z,W.next=Z;return Z}function b6($){if($.next.prev=$.prev,$.prev.next=$.next,$.prevZ)$.prevZ.nextZ=$.nextZ;if($.nextZ)$.nextZ.prevZ=$.prevZ}function SJ($,J,Q){return{i:$,x:J,y:Q,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function J5($,J,Q,W){let Z=0;for(let K=J,H=Q-W;K<Q;K+=W)Z+=($[H]-$[K])*($[K+1]+$[H+1]),H=K;return Z}class uZ{static triangulate($,J,Q=2){return gY($,J,Q)}}class i8{static area($){let J=$.length,Q=0;for(let W=J-1,Z=0;Z<J;W=Z++)Q+=$[W].x*$[Z].y-$[Z].x*$[W].y;return Q*0.5}static isClockWise($){return i8.area($)<0}static triangulateShape($,J){let Q=[],W=[],Z=[];OZ($),LZ(Q,$);let K=$.length;J.forEach(OZ);for(let Y=0;Y<J.length;Y++)W.push(K),K+=J[Y].length,LZ(Q,J[Y]);let H=uZ.triangulate(Q,W);for(let Y=0;Y<H.length;Y+=3)Z.push(H.slice(Y,Y+3));return Z}}function OZ($){let J=$.length;if(J>2&&$[J-1].equals($[0]))$.pop()}function LZ($,J){for(let Q=0;Q<J.length;Q++)$.push(J[Q].x),$.push(J[Q].y)}class a$ extends c6{constructor($=1,J=0){let Q=(1+Math.sqrt(5))/2,W=[-1,Q,0,1,Q,0,-1,-Q,0,1,-Q,0,0,-1,Q,0,1,Q,0,-1,-Q,0,1,-Q,Q,0,-1,Q,0,1,-Q,0,-1,-Q,0,1],Z=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(W,Z,$,J);this.type="IcosahedronGeometry",this.parameters={radius:$,detail:J}}static fromJSON($){return new a$($.radius,$.detail)}}class i6 extends c6{constructor($=1,J=0){let Q=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],W=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(Q,W,$,J);this.type="OctahedronGeometry",this.parameters={radius:$,detail:J}}static fromJSON($){return new i6($.radius,$.detail)}}class o6 extends Z0{constructor($=1,J=1,Q=1,W=1){super();this.type="PlaneGeometry",this.parameters={width:$,height:J,widthSegments:Q,heightSegments:W};let Z=$/2,K=J/2,H=Math.floor(Q),Y=Math.floor(W),X=H+1,U=Y+1,E=$/H,G=J/Y,q=[],F=[],R=[],O=[];for(let M=0;M<U;M++){let V=M*G-K;for(let D=0;D<X;D++){let k=D*E-Z;F.push(k,-V,0),R.push(0,0,1),O.push(D/H),O.push(1-M/Y)}}for(let M=0;M<Y;M++)for(let V=0;V<H;V++){let D=V+X*M,k=V+X*(M+1),B=V+1+X*(M+1),C=V+1+X*M;q.push(D,k,C),q.push(k,B,C)}this.setIndex(q),this.setAttribute("position",new a(F,3)),this.setAttribute("normal",new a(R,3)),this.setAttribute("uv",new a(O,2))}copy($){return super.copy($),this.parameters=Object.assign({},$.parameters),this}static fromJSON($){return new o6($.width,$.height,$.widthSegments,$.heightSegments)}}class a6 extends Z0{constructor($=new s6([new S(0,0.5),new S(-0.5,-0.5),new S(0.5,-0.5)]),J=12){super();this.type="ShapeGeometry",this.parameters={shapes:$,curveSegments:J};let Q=[],W=[],Z=[],K=[],H=0,Y=0;if(Array.isArray($)===!1)X($);else for(let U=0;U<$.length;U++)X($[U]),this.addGroup(H,Y,U),H+=Y,Y=0;this.setIndex(Q),this.setAttribute("position",new a(W,3)),this.setAttribute("normal",new a(Z,3)),this.setAttribute("uv",new a(K,2));function X(U){let E=W.length/3,G=U.extractPoints(J),q=G.shape,F=G.holes;if(i8.isClockWise(q)===!1)q=q.reverse();for(let O=0,M=F.length;O<M;O++){let V=F[O];if(i8.isClockWise(V)===!0)F[O]=V.reverse()}let R=i8.triangulateShape(q,F);for(let O=0,M=F.length;O<M;O++){let V=F[O];q=q.concat(V)}for(let O=0,M=q.length;O<M;O++){let V=q[O];W.push(V.x,V.y,0),Z.push(0,0,1),K.push(V.x,V.y)}for(let O=0,M=R.length;O<M;O++){let V=R[O],D=V[0]+E,k=V[1]+E,B=V[2]+E;Q.push(D,k,B),Y+=3}}}copy($){return super.copy($),this.parameters=Object.assign({},$.parameters),this}toJSON(){let $=super.toJSON(),J=this.parameters.shapes;return Q5(J,$)}static fromJSON($,J){let Q=[];for(let W=0,Z=$.shapes.length;W<Z;W++){let K=J[$.shapes[W]];Q.push(K)}return new a6(Q,$.curveSegments)}}function Q5($,J){if(J.shapes=[],Array.isArray($))for(let Q=0,W=$.length;Q<W;Q++){let Z=$[Q];J.shapes.push(Z.uuid)}else J.shapes.push($.uuid);return J}class q0 extends Z0{constructor($=1,J=32,Q=16,W=0,Z=Math.PI*2,K=0,H=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:$,widthSegments:J,heightSegments:Q,phiStart:W,phiLength:Z,thetaStart:K,thetaLength:H},J=Math.max(3,Math.floor(J)),Q=Math.max(2,Math.floor(Q));let Y=Math.min(K+H,Math.PI),X=0,U=[],E=new w,G=new w,q=[],F=[],R=[],O=[];for(let M=0;M<=Q;M++){let V=[],D=M/Q,k=K+D*H,B=$*Math.cos(k),C=Math.sqrt($*$-B*B),z=0;if(M===0&&K===0)z=0.5/J;else if(M===Q&&Y===Math.PI)z=-0.5/J;for(let _=0;_<=J;_++){let P=_/J,T=W+P*Z;E.x=-C*Math.cos(T),E.y=B,E.z=C*Math.sin(T),F.push(E.x,E.y,E.z),G.copy(E).normalize(),R.push(G.x,G.y,G.z),O.push(P+z,1-D),V.push(X++)}U.push(V)}for(let M=0;M<Q;M++)for(let V=0;V<J;V++){let D=U[M][V+1],k=U[M][V],B=U[M+1][V],C=U[M+1][V+1];if(M!==0||K>0)q.push(D,k,C);if(M!==Q-1||Y<Math.PI)q.push(k,B,C)}this.setIndex(q),this.setAttribute("position",new a(F,3)),this.setAttribute("normal",new a(R,3)),this.setAttribute("uv",new a(O,2))}copy($){return super.copy($),this.parameters=Object.assign({},$.parameters),this}static fromJSON($){return new q0($.radius,$.widthSegments,$.heightSegments,$.phiStart,$.phiLength,$.thetaStart,$.thetaLength)}}class r$ extends Z0{constructor($=1,J=0.4,Q=12,W=48,Z=Math.PI*2,K=0,H=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:$,tube:J,radialSegments:Q,tubularSegments:W,arc:Z,thetaStart:K,thetaLength:H},Q=Math.floor(Q),W=Math.floor(W);let Y=[],X=[],U=[],E=[],G=new w,q=new w,F=new w;for(let R=0;R<=Q;R++){let O=K+R/Q*H;for(let M=0;M<=W;M++){let V=M/W*Z;q.x=($+J*Math.cos(O))*Math.cos(V),q.y=($+J*Math.cos(O))*Math.sin(V),q.z=J*Math.sin(O),X.push(q.x,q.y,q.z),G.x=$*Math.cos(V),G.y=$*Math.sin(V),F.subVectors(q,G).normalize(),U.push(F.x,F.y,F.z),E.push(M/W),E.push(R/Q)}}for(let R=1;R<=Q;R++)for(let O=1;O<=W;O++){let M=(W+1)*R+O-1,V=(W+1)*(R-1)+O-1,D=(W+1)*(R-1)+O,k=(W+1)*R+O;Y.push(M,V,k),Y.push(V,D,k)}this.setIndex(Y),this.setAttribute("position",new a(X,3)),this.setAttribute("normal",new a(U,3)),this.setAttribute("uv",new a(E,2))}copy($){return super.copy($),this.parameters=Object.assign({},$.parameters),this}static fromJSON($){return new r$($.radius,$.tube,$.radialSegments,$.tubularSegments,$.arc,$.thetaStart,$.thetaLength)}}function NQ($){let J={};for(let Q in $){J[Q]={};for(let W in $[Q]){let Z=$[Q][W];if(MZ(Z))if(Z.isRenderTargetTexture)$0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),J[Q][W]=null;else J[Q][W]=Z.clone();else if(Array.isArray(Z))if(MZ(Z[0])){let K=[];for(let H=0,Y=Z.length;H<Y;H++)K[H]=Z[H].clone();J[Q][W]=K}else J[Q][W]=Z.slice();else J[Q][W]=Z}}return J}function g0($){let J={};for(let Q=0;Q<$.length;Q++){let W=NQ($[Q]);for(let Z in W)J[Z]=W[Z]}return J}function MZ($){return $&&($.isColor||$.isMatrix3||$.isMatrix4||$.isVector2||$.isVector3||$.isVector4||$.isTexture||$.isQuaternion)}function W5($){let J=[];for(let Q=0;Q<$.length;Q++)J.push($[Q].clone());return J}var Z5=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,K5=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class E7 extends Z${constructor($){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Z5,this.fragmentShader=K5,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,$!==void 0)this.setValues($)}copy($){return super.copy($),this.fragmentShader=$.fragmentShader,this.vertexShader=$.vertexShader,this.uniforms=NQ($.uniforms),this.uniformsGroups=W5($.uniformsGroups),this.defines=Object.assign({},$.defines),this.wireframe=$.wireframe,this.wireframeLinewidth=$.wireframeLinewidth,this.fog=$.fog,this.lights=$.lights,this.clipping=$.clipping,this.extensions=Object.assign({},$.extensions),this.glslVersion=$.glslVersion,this.defaultAttributeValues=Object.assign({},$.defaultAttributeValues),this.index0AttributeName=$.index0AttributeName,this.uniformsNeedUpdate=$.uniformsNeedUpdate,this}toJSON($){let J=super.toJSON($);J.glslVersion=this.glslVersion,J.uniforms={};for(let W in this.uniforms){let K=this.uniforms[W].value;if(K&&K.isTexture)J.uniforms[W]={type:"t",value:K.toJSON($).uuid};else if(K&&K.isColor)J.uniforms[W]={type:"c",value:K.getHex()};else if(K&&K.isVector2)J.uniforms[W]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)J.uniforms[W]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)J.uniforms[W]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)J.uniforms[W]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)J.uniforms[W]={type:"m4",value:K.toArray()};else J.uniforms[W]={value:K}}if(Object.keys(this.defines).length>0)J.defines=this.defines;J.vertexShader=this.vertexShader,J.fragmentShader=this.fragmentShader,J.lights=this.lights,J.clipping=this.clipping;let Q={};for(let W in this.extensions)if(this.extensions[W]===!0)Q[W]=!0;if(Object.keys(Q).length>0)J.extensions=Q;return J}fromJSON($,J){if(super.fromJSON($,J),$.uniforms!==void 0)for(let Q in $.uniforms){let W=$.uniforms[Q];switch(this.uniforms[Q]={},W.type){case"t":this.uniforms[Q].value=J[W.value]||null;break;case"c":this.uniforms[Q].value=new h().setHex(W.value);break;case"v2":this.uniforms[Q].value=new S().fromArray(W.value);break;case"v3":this.uniforms[Q].value=new w().fromArray(W.value);break;case"v4":this.uniforms[Q].value=new t0().fromArray(W.value);break;case"m3":this.uniforms[Q].value=new l().fromArray(W.value);break;case"m4":this.uniforms[Q].value=new u().fromArray(W.value);break;default:this.uniforms[Q].value=W.value}}if($.defines!==void 0)this.defines=$.defines;if($.vertexShader!==void 0)this.vertexShader=$.vertexShader;if($.fragmentShader!==void 0)this.fragmentShader=$.fragmentShader;if($.glslVersion!==void 0)this.glslVersion=$.glslVersion;if($.extensions!==void 0)for(let Q in $.extensions)this.extensions[Q]=$.extensions[Q];if($.lights!==void 0)this.lights=$.lights;if($.clipping!==void 0)this.clipping=$.clipping;return this}}class v extends Z${constructor($){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new h(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new h(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new S(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new L8,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues($)}copy($){return super.copy($),this.defines={STANDARD:""},this.color.copy($.color),this.roughness=$.roughness,this.metalness=$.metalness,this.map=$.map,this.lightMap=$.lightMap,this.lightMapIntensity=$.lightMapIntensity,this.aoMap=$.aoMap,this.aoMapIntensity=$.aoMapIntensity,this.emissive.copy($.emissive),this.emissiveMap=$.emissiveMap,this.emissiveIntensity=$.emissiveIntensity,this.bumpMap=$.bumpMap,this.bumpScale=$.bumpScale,this.normalMap=$.normalMap,this.normalMapType=$.normalMapType,this.normalScale.copy($.normalScale),this.displacementMap=$.displacementMap,this.displacementScale=$.displacementScale,this.displacementBias=$.displacementBias,this.roughnessMap=$.roughnessMap,this.metalnessMap=$.metalnessMap,this.alphaMap=$.alphaMap,this.envMap=$.envMap,this.envMapRotation.copy($.envMapRotation),this.envMapIntensity=$.envMapIntensity,this.wireframe=$.wireframe,this.wireframeLinewidth=$.wireframeLinewidth,this.wireframeLinecap=$.wireframeLinecap,this.wireframeLinejoin=$.wireframeLinejoin,this.flatShading=$.flatShading,this.fog=$.fog,this}}class $$ extends v{constructor($){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new S(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return m(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(J){this.ior=(1+0.4*J)/(1-0.4*J)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new h(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new h(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new h(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues($)}get anisotropy(){return this._anisotropy}set anisotropy($){if(this._anisotropy>0!==$>0)this.version++;this._anisotropy=$}get clearcoat(){return this._clearcoat}set clearcoat($){if(this._clearcoat>0!==$>0)this.version++;this._clearcoat=$}get iridescence(){return this._iridescence}set iridescence($){if(this._iridescence>0!==$>0)this.version++;this._iridescence=$}get dispersion(){return this._dispersion}set dispersion($){if(this._dispersion>0!==$>0)this.version++;this._dispersion=$}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity($){if(this._retroreflectivity>0!==$>0)this.version++;this._retroreflectivity=$}get sheen(){return this._sheen}set sheen($){if(this._sheen>0!==$>0)this.version++;this._sheen=$}get transmission(){return this._transmission}set transmission($){if(this._transmission>0!==$>0)this.version++;this._transmission=$}copy($){return super.copy($),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=$.anisotropy,this.anisotropyRotation=$.anisotropyRotation,this.anisotropyMap=$.anisotropyMap,this.clearcoat=$.clearcoat,this.clearcoatMap=$.clearcoatMap,this.clearcoatRoughness=$.clearcoatRoughness,this.clearcoatRoughnessMap=$.clearcoatRoughnessMap,this.clearcoatNormalMap=$.clearcoatNormalMap,this.clearcoatNormalScale.copy($.clearcoatNormalScale),this.dispersion=$.dispersion,this.ior=$.ior,this.iridescence=$.iridescence,this.iridescenceMap=$.iridescenceMap,this.iridescenceIOR=$.iridescenceIOR,this.iridescenceThicknessRange=[...$.iridescenceThicknessRange],this.iridescenceThicknessMap=$.iridescenceThicknessMap,this.retroreflectivity=$.retroreflectivity,this.sheen=$.sheen,this.sheenColor.copy($.sheenColor),this.sheenColorMap=$.sheenColorMap,this.sheenRoughness=$.sheenRoughness,this.sheenRoughnessMap=$.sheenRoughnessMap,this.transmission=$.transmission,this.transmissionMap=$.transmissionMap,this.thickness=$.thickness,this.thicknessMap=$.thicknessMap,this.attenuationDistance=$.attenuationDistance,this.attenuationColor.copy($.attenuationColor),this.specularIntensity=$.specularIntensity,this.specularIntensityMap=$.specularIntensityMap,this.specularColor.copy($.specularColor),this.specularColorMap=$.specularColorMap,this}}function m$($,J){if(!$||$.constructor===J)return $;if(typeof J.BYTES_PER_ELEMENT==="number")return new J($);return Array.prototype.slice.call($)}function s9($){return $!==void 0&&$.inTangents!==void 0&&$.outTangents!==void 0}function H5($){function J(Z,K){return $[Z]-$[K]}let Q=$.length,W=Array(Q);for(let Z=0;Z!==Q;++Z)W[Z]=Z;return W.sort(J),W}function wZ($,J,Q){let W=$.length,Z=new $.constructor(W);for(let K=0,H=0;H!==W;++K){let Y=Q[K]*J;for(let X=0;X!==J;++X)Z[H++]=$[Y+X]}return Z}function Y5($,J,Q,W){let Z=1,K=$[0];while(K!==void 0&&K[W]===void 0)K=$[Z++];if(K===void 0)return;let H=K[W];if(H===void 0)return;if(Array.isArray(H))do{if(H=K[W],H!==void 0)J.push(K.time),Q.push(...H);K=$[Z++]}while(K!==void 0);else if(H.toArray!==void 0)do{if(H=K[W],H!==void 0)J.push(K.time),H.toArray(Q,Q.length);K=$[Z++]}while(K!==void 0);else do{if(H=K[W],H!==void 0)J.push(K.time),Q.push(H);K=$[Z++]}while(K!==void 0)}class h${constructor($,J,Q,W){this.parameterPositions=$,this._cachedIndex=0,this.resultBuffer=W!==void 0?W:new J.constructor(Q),this.sampleValues=J,this.valueSize=Q,this.settings=null,this.DefaultSettings_={}}evaluate($){let J=this.parameterPositions,Q=this._cachedIndex,W=J[Q],Z=J[Q-1];Q:{$:{let K;J:{W:if(!($<W)){for(let H=Q+2;;){if(W===void 0){if($<Z)break W;return Q=J.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}if(Q===H)break;if(Z=W,W=J[++Q],$<W)break $}K=J.length;break J}if(!($>=Z)){let H=J[1];if($<H)Q=2,Z=H;for(let Y=Q-2;;){if(Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Q===Y)break;if(W=Z,Z=J[--Q-1],$>=Z)break $}K=Q,Q=0;break J}break Q}while(Q<K){let H=Q+K>>>1;if($<J[H])K=H;else Q=H+1}if(W=J[Q],Z=J[Q-1],Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(W===void 0)return Q=J.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}this._cachedIndex=Q,this.intervalChanged_(Q,Z,W)}return this.interpolate_(Q,Z,$,W)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_($){let J=this.resultBuffer,Q=this.sampleValues,W=this.valueSize,Z=$*W;for(let K=0;K!==W;++K)J[K]=Q[Z+K];return J}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class EQ extends h${constructor($,J,Q,W){super($,J,Q,W);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_($,J,Q){let W=this.parameterPositions,Z=$-2,K=$+1,H=W[Z],Y=W[K];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:Z=$,H=2*J-Q;break;case 2402:Z=W.length-2,H=J+W[Z]-W[Z+1];break;default:Z=$,H=Q}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:K=$,Y=2*Q-J;break;case 2402:K=1,Y=Q+W[1]-W[0];break;default:K=$-1,Y=J}let X=(Q-J)*0.5,U=this.valueSize;this._weightPrev=X/(J-H),this._weightNext=X/(Y-Q),this._offsetPrev=Z*U,this._offsetNext=K*U}interpolate_($,J,Q,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=$*H,X=Y-H,U=this._offsetPrev,E=this._offsetNext,G=this._weightPrev,q=this._weightNext,F=(Q-J)/(W-J),R=F*F,O=R*F,M=-G*O+2*G*R-G*F,V=(1+G)*O+(-1.5-2*G)*R+(-0.5+G)*F+1,D=(-1-q)*O+(1.5+q)*R+0.5*F,k=q*O-q*R;for(let B=0;B!==H;++B)Z[B]=M*K[U+B]+V*K[X+B]+D*K[Y+B]+k*K[E+B];return Z}}class GQ extends h${constructor($,J,Q,W){super($,J,Q,W)}interpolate_($,J,Q,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=$*H,X=Y-H,U=(Q-J)/(W-J),E=1-U;for(let G=0;G!==H;++G)Z[G]=K[X+G]*E+K[Y+G]*U;return Z}}class qQ extends h${constructor($,J,Q,W){super($,J,Q,W)}interpolate_($){return this.copySampleValue_($-1)}}class FQ extends h${interpolate_($,J,Q,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=$*H,X=Y-H,U=this.inTangents,E=this.outTangents;if(!U||!E){let F=(Q-J)/(W-J),R=1-F;for(let O=0;O!==H;++O)Z[O]=K[X+O]*R+K[Y+O]*F;return Z}let G=H*2,q=$-1;for(let F=0;F!==H;++F){let R=K[X+F],O=K[Y+F],M=q*G+F*2,V=E[M],D=E[M+1],k=$*G+F*2,B=U[k],C=U[k+1],z=U5(Q,J,V,B,W);Z[F]=dZ(z,R,D,C,O)}return Z}}function dZ($,J,Q,W,Z){let K=1-$;return K*K*K*J+3*K*K*$*Q+3*K*$*$*W+$*$*$*Z}function X5($,J,Q,W,Z){let K=1-$;return 3*K*K*(Q-J)+6*K*$*(W-Q)+3*$*$*(Z-W)}function U5($,J,Q,W,Z){let K=($-J)/(Z-J);for(let H=0;H<8;H++){let Y=dZ(K,J,Q,W,Z)-$;if(Math.abs(Y)<0.0000000001)break;let X=X5(K,J,Q,W,Z);if(Math.abs(X)<0.0000000001)break;K=Math.max(0,Math.min(1,K-Y/X))}return K}class J${constructor($,J,Q,W){if($===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(J===void 0||J.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+$);this.name=$,this.times=m$(J,this.TimeBufferType),this.values=m$(Q,this.ValueBufferType),this.setInterpolation(W||this.DefaultInterpolation)}static toJSON($){let J=$.constructor,Q;if(J.toJSON!==this.toJSON)Q=J.toJSON($);else{Q={name:$.name,times:m$($.times,Array),values:m$($.values,Array)};let W=$.getInterpolation();if(W!==$.DefaultInterpolation)Q.interpolation=W;if(s9($.settings))Q.settings={inTangents:m$($.settings.inTangents,Array),outTangents:m$($.settings.outTangents,Array)}}return Q.type=$.ValueTypeName,Q}InterpolantFactoryMethodDiscrete($){return new qQ(this.times,this.values,this.getValueSize(),$)}InterpolantFactoryMethodLinear($){return new GQ(this.times,this.values,this.getValueSize(),$)}InterpolantFactoryMethodSmooth($){return new EQ(this.times,this.values,this.getValueSize(),$)}InterpolantFactoryMethodBezier($){let J=new FQ(this.times,this.values,this.getValueSize(),$);if(this.settings)J.inTangents=this.settings.inTangents,J.outTangents=this.settings.outTangents;return J}setInterpolation($){let J;switch($){case 2300:J=this.InterpolantFactoryMethodDiscrete;break;case 2301:J=this.InterpolantFactoryMethodLinear;break;case 2302:J=this.InterpolantFactoryMethodSmooth;break;case 2303:J=this.InterpolantFactoryMethodBezier;break}if(J===void 0){let Q="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if($!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(Q);return $0("KeyframeTrack:",Q),this}return this.createInterpolant=J,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift($){if($!==0){let J=this.times;for(let Q=0,W=J.length;Q!==W;++Q)J[Q]+=$}return this}scale($){if($!==1){let J=this.times;for(let Q=0,W=J.length;Q!==W;++Q)J[Q]*=$;if(s9(this.settings))VZ(this.settings.inTangents,$),VZ(this.settings.outTangents,$)}return this}trim($,J){let Q=this.times,W=Q.length,Z=0,K=W-1;while(Z!==W&&Q[Z]<$)++Z;while(K!==-1&&Q[K]>J)--K;if(++K,Z!==0||K!==W){if(Z>=K)K=Math.max(K,1),Z=K-1;let H=this.getValueSize();this.times=Q.slice(Z,K),this.values=this.values.slice(Z*H,K*H)}return this}validate(){let $=!0,J=this.getValueSize();if(J-Math.floor(J)!==0)G0("KeyframeTrack: Invalid value size in track.",this),$=!1;let Q=this.times,W=this.values,Z=Q.length;if(Z===0)G0("KeyframeTrack: Track is empty.",this),$=!1;let K=null;for(let H=0;H!==Z;H++){let Y=Q[H];if(typeof Y==="number"&&isNaN(Y)){G0("KeyframeTrack: Time is not a valid number.",this,H,Y),$=!1;break}if(K!==null&&K>Y){G0("KeyframeTrack: Out of order keys.",this,H,Y,K),$=!1;break}K=Y}if(W!==void 0){if(oH(W))for(let H=0,Y=W.length;H!==Y;++H){let X=W[H];if(isNaN(X)){G0("KeyframeTrack: Value is not a valid number.",this,H,X),$=!1;break}}}return $}optimize(){let $=this.times.slice(),J=this.values.slice(),Q=this.getValueSize(),W=this.getInterpolation()===2302,Z=$.length-1,K=1;for(let H=1;H<Z;++H){let Y=!1,X=$[H],U=$[H+1];if(X!==U&&(H!==1||X!==$[0]))if(!W){let E=H*Q,G=E-Q,q=E+Q;for(let F=0;F!==Q;++F){let R=J[E+F];if(R!==J[G+F]||R!==J[q+F]){Y=!0;break}}}else Y=!0;if(Y){if(H!==K){$[K]=$[H];let E=H*Q,G=K*Q;for(let q=0;q!==Q;++q)J[G+q]=J[E+q]}++K}}if(Z>0){$[K]=$[Z];for(let H=Z*Q,Y=K*Q,X=0;X!==Q;++X)J[Y+X]=J[H+X];++K}if(K!==$.length)this.times=$.slice(0,K),this.values=J.slice(0,K*Q);else this.times=$,this.values=J;return this}clone(){let $=this.times.slice(),J=this.values.slice(),W=new this.constructor(this.name,$,J);if(W.createInterpolant=this.createInterpolant,s9(this.settings))W.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return W}}function VZ($,J){for(let Q=0,W=$.length;Q!==W;Q+=2)$[Q]*=J}J$.prototype.ValueTypeName="";J$.prototype.TimeBufferType=Float32Array;J$.prototype.ValueBufferType=Float32Array;J$.prototype.DefaultInterpolation=2301;class t$ extends J${constructor($,J,Q){super($,J,Q)}}t$.prototype.ValueTypeName="bool";t$.prototype.ValueBufferType=Array;t$.prototype.DefaultInterpolation=2300;t$.prototype.InterpolantFactoryMethodLinear=void 0;t$.prototype.InterpolantFactoryMethodSmooth=void 0;class G7 extends J${constructor($,J,Q,W){super($,J,Q,W)}}G7.prototype.ValueTypeName="color";class e$ extends J${constructor($,J,Q,W){super($,J,Q,W)}}e$.prototype.ValueTypeName="number";class RQ extends h${constructor($,J,Q,W){super($,J,Q,W)}interpolate_($,J,Q,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=(Q-J)/(W-J),X=$*H;for(let U=X+H;X!==U;X+=4)r0.slerpFlat(Z,0,K,X-H,K,X,Y);return Z}}class v$ extends J${constructor($,J,Q,W){super($,J,Q,W)}InterpolantFactoryMethodLinear($){return new RQ(this.times,this.values,this.getValueSize(),$)}}v$.prototype.ValueTypeName="quaternion";v$.prototype.InterpolantFactoryMethodSmooth=void 0;class $8 extends J${constructor($,J,Q){super($,J,Q)}}$8.prototype.ValueTypeName="string";$8.prototype.ValueBufferType=Array;$8.prototype.DefaultInterpolation=2300;$8.prototype.InterpolantFactoryMethodLinear=void 0;$8.prototype.InterpolantFactoryMethodSmooth=void 0;class J8 extends J${constructor($,J,Q,W){super($,J,Q,W)}}J8.prototype.ValueTypeName="vector";class r6{constructor($="",J=-1,Q=[],W=2500){if(this.name=$,this.tracks=Q,this.duration=J,this.blendMode=W,this.uuid=W$(),this.userData={},this.duration<0)this.resetDuration()}static parse($){let J=[],Q=$.tracks,W=1/($.fps||1);for(let K=0,H=Q.length;K!==H;++K)J.push(E5(Q[K]).scale(W));let Z=new this($.name,$.duration,J,$.blendMode);return Z.uuid=$.uuid,Z.userData=JSON.parse($.userData||"{}"),Z}static toJSON($){let J=[],Q=$.tracks,W={name:$.name,duration:$.duration,tracks:J,uuid:$.uuid,blendMode:$.blendMode,userData:JSON.stringify($.userData)};for(let Z=0,K=Q.length;Z!==K;++Z)J.push(J$.toJSON(Q[Z]));return W}static CreateFromMorphTargetSequence($,J,Q,W){let Z=J.length,K=[];for(let H=0;H<Z;H++){let Y=[],X=[];Y.push((H+Z-1)%Z,H,(H+1)%Z),X.push(0,1,0);let U=H5(Y);if(Y=wZ(Y,1,U),X=wZ(X,1,U),!W&&Y[0]===0)Y.push(Z),X.push(X[0]);K.push(new e$(".morphTargetInfluences["+J[H].name+"]",Y,X).scale(1/Q))}return new this($,-1,K)}static findByName($,J){let Q=$;if(!Array.isArray($)){let W=$;Q=W.geometry&&W.geometry.animations||W.animations}for(let W=0;W<Q.length;W++)if(Q[W].name===J)return Q[W];return null}static CreateClipsFromMorphTargetSequences($,J,Q){let W={},Z=/^([\w-]*?)([\d]+)$/;for(let H=0,Y=$.length;H<Y;H++){let X=$[H],U=X.name.match(Z);if(U&&U.length>1){let E=U[1],G=W[E];if(!G)W[E]=G=[];G.push(X)}}let K=[];for(let H in W)K.push(this.CreateFromMorphTargetSequence(H,W[H],J,Q));return K}resetDuration(){let $=this.tracks,J=0;for(let Q=0,W=$.length;Q!==W;++Q){let Z=this.tracks[Q];J=Math.max(J,Z.times[Z.times.length-1])}return this.duration=J,this}trim(){for(let $=0;$<this.tracks.length;$++)this.tracks[$].trim(0,this.duration);return this}validate(){let $=!0;for(let J=0;J<this.tracks.length;J++)$=$&&this.tracks[J].validate();return $}optimize(){for(let $=0;$<this.tracks.length;$++)this.tracks[$].optimize();return this}clone(){let $=[];for(let Q=0;Q<this.tracks.length;Q++)$.push(this.tracks[Q].clone());let J=new this.constructor(this.name,this.duration,$,this.blendMode);return J.userData=JSON.parse(JSON.stringify(this.userData)),J}toJSON(){return this.constructor.toJSON(this)}}function N5($){switch($.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return e$;case"vector":case"vector2":case"vector3":case"vector4":return J8;case"color":return G7;case"quaternion":return v$;case"bool":case"boolean":return t$;case"string":return $8}throw Error("THREE.KeyframeTrack: Unsupported typeName: "+$)}function E5($){if($.type===void 0)throw Error("THREE.KeyframeTrack: track type undefined, can not parse");let J=N5($.type);if($.times===void 0){let W=[],Z=[];Y5($.keys,W,Z,"value"),$.times=W,$.values=Z}let Q;if(J.parse!==void 0)Q=J.parse($);else Q=new J($.name,$.times,$.values,$.interpolation);if(s9($.settings))Q.settings={inTangents:m$($.settings.inTangents,Float32Array),outTangents:m$($.settings.outTangents,Float32Array)};return Q}var L$={enabled:!1,files:{},add:function($,J){if(this.enabled===!1)return;if(kZ($))return;this.files[$]=J},get:function($){if(this.enabled===!1)return;if(kZ($))return;return this.files[$]},remove:function($){delete this.files[$]},clear:function(){this.files={}}};function kZ($){try{let J=$.slice($.indexOf(":")+1);return new URL(J).protocol==="blob:"}catch(J){return!1}}class OQ{constructor($,J,Q){let W=this,Z=!1,K=0,H=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=$,this.onProgress=J,this.onError=Q,this._abortController=null,this.itemStart=function(U){if(H++,Z===!1){if(W.onStart!==void 0)W.onStart(U,K,H)}Z=!0},this.itemEnd=function(U){if(K++,W.onProgress!==void 0)W.onProgress(U,K,H);if(K===H){if(Z=!1,W.onLoad!==void 0)W.onLoad()}},this.itemError=function(U){if(W.onError!==void 0)W.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,E){return X.push(U,E),this},this.removeHandler=function(U){let E=X.indexOf(U);if(E!==-1)X.splice(E,2);return this},this.getHandler=function(U){for(let E=0,G=X.length;E<G;E+=2){let q=X[E],F=X[E+1];if(q.global)q.lastIndex=0;if(q.test(U))return F}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var mZ=new OQ;class F${constructor($){if(this.manager=$!==void 0?$:mZ,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync($,J){let Q=this;return new Promise(function(W,Z){Q.load($,W,J,Z)})}parse(){}setCrossOrigin($){return this.crossOrigin=$,this}setWithCredentials($){return this.withCredentials=$,this}setPath($){return this.path=$,this}setResourcePath($){return this.resourcePath=$,this}setRequestHeader($){return this.requestHeader=$,this}abort(){return this}}F$.DEFAULT_MATERIAL_NAME="__DEFAULT";var A$={};class cZ extends Error{constructor($,J){super($);this.response=J}}class Q8 extends F${constructor($){super($);this.mimeType="",this.responseType="",this._abortController=new AbortController}load($,J,Q,W){if($===void 0)$="";if(this.path!==void 0)$=this.path+$;$=this.manager.resolveURL($);let Z=L$.get(`file:${$}`);if(Z!==void 0){this.manager.itemStart($),setTimeout(()=>{if(J)J(Z);this.manager.itemEnd($)},0);return}if(A$[$]!==void 0){A$[$].push({onLoad:J,onProgress:Q,onError:W});return}A$[$]=[],A$[$].push({onLoad:J,onProgress:Q,onError:W});let K=new Request($,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any==="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),H=this.mimeType,Y=this.responseType;fetch(K).then((X)=>{if(X.status===200||X.status===0){if(X.status===0)$0("FileLoader: HTTP Status 0 received.");if(typeof ReadableStream>"u"||X.body===void 0||X.body.getReader===void 0)return X;let U=A$[$],E=X.body.getReader(),G=X.headers.get("X-File-Size")||X.headers.get("Content-Length"),q=G?parseInt(G):0,F=q!==0,R=0,O=new ReadableStream({start(M){V();function V(){E.read().then(({done:D,value:k})=>{if(D)M.close();else{R+=k.byteLength;let B=new ProgressEvent("progress",{lengthComputable:F,loaded:R,total:q});for(let C=0,z=U.length;C<z;C++){let _=U[C];if(_.onProgress)_.onProgress(B)}M.enqueue(k),V()}},(D)=>{M.error(D)})}}});return new Response(O)}else throw new cZ(`fetch for "${X.url}" responded with ${X.status}: ${X.statusText}`,X)}).then((X)=>{switch(Y){case"arraybuffer":return X.arrayBuffer();case"blob":return X.blob();case"document":return X.text().then((U)=>{return new DOMParser().parseFromString(U,H)});case"json":return X.json();default:if(H==="")return X.text();else{let E=/charset="?([^;"\s]*)"?/i.exec(H),G=E&&E[1]?E[1].toLowerCase():void 0,q=new TextDecoder(G);return X.arrayBuffer().then((F)=>q.decode(F))}}}).then((X)=>{L$.add(`file:${$}`,X);let U=A$[$];delete A$[$];for(let E=0,G=U.length;E<G;E++){let q=U[E];if(q.onLoad)q.onLoad(X)}}).catch((X)=>{let U=A$[$];if(U===void 0)throw this.manager.itemError($),X;delete A$[$];for(let E=0,G=U.length;E<G;E++){let q=U[E];if(q.onError)q.onError(X)}this.manager.itemError($)}).finally(()=>{this.manager.itemEnd($)}),this.manager.itemStart($)}setResponseType($){return this.responseType=$,this}setMimeType($){return this.mimeType=$,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}var c8=new WeakMap;class LQ extends F${constructor($){super($)}load($,J,Q,W){if(this.path!==void 0)$=this.path+$;$=this.manager.resolveURL($);let Z=this,K=L$.get(`image:${$}`);if(K!==void 0){if(K.complete===!0)Z.manager.itemStart($),setTimeout(function(){if(J)J(K);Z.manager.itemEnd($)},0);else{let E=c8.get(K);if(E===void 0)E=[],c8.set(K,E);E.push({onLoad:J,onError:W})}return K}let H=i9("img");function Y(){if(U(),J)J(this);let E=c8.get(this)||[];for(let G=0;G<E.length;G++){let q=E[G];if(q.onLoad)q.onLoad(this)}c8.delete(this),Z.manager.itemEnd($)}function X(E){if(U(),W)W(E);L$.remove(`image:${$}`);let G=c8.get(this)||[];for(let q=0;q<G.length;q++){let F=G[q];if(F.onError)F.onError(E)}c8.delete(this),Z.manager.itemError($),Z.manager.itemEnd($)}function U(){H.removeEventListener("load",Y,!1),H.removeEventListener("error",X,!1)}if(H.addEventListener("load",Y,!1),H.addEventListener("error",X,!1),$.slice(0,5)!=="data:"){if(this.crossOrigin!==void 0)H.crossOrigin=this.crossOrigin}return L$.add(`image:${$}`,H),Z.manager.itemStart($),H.src=$,H}}class q7 extends F${constructor($){super($)}load($,J,Q,W){let Z=new u0,K=new LQ(this.manager);return K.setCrossOrigin(this.crossOrigin),K.setPath(this.path),K.load($,function(H){if(Z.image=H,Z.needsUpdate=!0,J!==void 0)J(Z)},Q,W),Z}}class t6 extends X0{constructor($,J=1){super();this.isLight=!0,this.type="Light",this.color=new h($),this.intensity=J}copy($,J){return super.copy($,J),this.color.copy($.color),this.intensity=$.intensity,this}toJSON($){let J=super.toJSON($);return J.object.color=this.color.getHex(),J.object.intensity=this.intensity,J}}var _J=new u,DZ=new w,BZ=new w;class e6{constructor($){this.camera=$,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new S(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new u,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new QQ,this._frameExtents=new S(1,1),this._viewportCount=1,this._viewports=[new t0(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices($){let J=this.camera;DZ.setFromMatrixPosition($.matrixWorld),J.position.copy(DZ),BZ.setFromMatrixPosition($.target.matrixWorld),J.lookAt(BZ),J.updateMatrixWorld(),this._updateMatrix(J,this.matrix,this._frustum)}_updateMatrix($,J,Q,W){_J.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),Q.setFromProjectionMatrix(_J,$.coordinateSystem,$.reversedDepth);let Z=this._frameExtents,K=W?W.z/Z.x:1,H=W?W.w/Z.y:1,Y=W?W.x/Z.x:0,X=W?W.y/Z.y:0;if($.coordinateSystem===2001||$.reversedDepth)J.set(0.5*K,0,0,0.5*K+Y,0,0.5*H,0,0.5*H+X,0,0,1,0,0,0,0,1);else J.set(0.5*K,0,0,0.5*K+Y,0,0.5*H,0,0.5*H+X,0,0,0.5,0.5,0,0,0,1);J.multiply(_J)}getViewport($){return this._viewports[$]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy($){return this.camera=$.camera.clone(),this.intensity=$.intensity,this.bias=$.bias,this.radius=$.radius,this.autoUpdate=$.autoUpdate,this.needsUpdate=$.needsUpdate,this.normalBias=$.normalBias,this.blurSamples=$.blurSamples,this.mapSize.copy($.mapSize),this.biasNode=$.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let $={};return $.intensity=this.intensity,$.bias=this.bias,$.normalBias=this.normalBias,$.radius=this.radius,$.blurSamples=this.blurSamples,$.mapSize=this.mapSize.toArray(),$.camera=this.camera.toJSON(!1).object,delete $.camera.matrix,$}}var c9=new w,n9=new r0,O$=new w;class F7 extends X0{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new u,this.projectionMatrix=new u,this.projectionMatrixInverse=new u,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy($,J){return super.copy($,J),this.matrixWorldInverse.copy($.matrixWorldInverse),this.projectionMatrix.copy($.projectionMatrix),this.projectionMatrixInverse.copy($.projectionMatrixInverse),this.coordinateSystem=$.coordinateSystem,this}getWorldDirection($){return super.getWorldDirection($).negate()}updateMatrixWorld($){if(super.updateMatrixWorld($),this.matrixWorld.decompose(c9,n9,O$),O$.x===1&&O$.y===1&&O$.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(c9,n9,O$.set(1,1,1)).invert()}updateWorldMatrix($,J,Q=!1){if(super.updateWorldMatrix($,J,Q),this.matrixWorld.decompose(c9,n9,O$),O$.x===1&&O$.y===1&&O$.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(c9,n9,O$.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var d$=new w,CZ=new S,zZ=new S;class e8 extends F7{constructor($=50,J=1,Q=0.1,W=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=$,this.zoom=1,this.near=Q,this.far=W,this.focus=10,this.aspect=J,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy($,J){return super.copy($,J),this.fov=$.fov,this.zoom=$.zoom,this.near=$.near,this.far=$.far,this.focus=$.focus,this.aspect=$.aspect,this.view=$.view===null?null:Object.assign({},$.view),this.filmGauge=$.filmGauge,this.filmOffset=$.filmOffset,this}setFocalLength($){let J=0.5*this.getFilmHeight()/$;this.fov=a8*2*Math.atan(J),this.updateProjectionMatrix()}getFocalLength(){let $=Math.tan(S6*0.5*this.fov);return 0.5*this.getFilmHeight()/$}getEffectiveFOV(){return a8*2*Math.atan(Math.tan(S6*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds($,J,Q){d$.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),J.set(d$.x,d$.y).multiplyScalar(-$/d$.z),d$.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(d$.x,d$.y).multiplyScalar(-$/d$.z)}getViewSize($,J){return this.getViewBounds($,CZ,zZ),J.subVectors(zZ,CZ)}setViewOffset($,J,Q,W,Z,K){if(this.aspect=$/J,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=$,this.view.fullHeight=J,this.view.offsetX=Q,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let $=this.near,J=$*Math.tan(S6*0.5*this.fov)/this.zoom,Q=2*J,W=this.aspect*Q,Z=-0.5*W,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=K;Z+=K.offsetX*W/Y,J-=K.offsetY*Q/X,W*=K.width/Y,Q*=K.height/X}let H=this.filmOffset;if(H!==0)Z+=$*H/this.getFilmWidth();this.projectionMatrix.makePerspective(Z,Z+W,J,J-Q,$,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON($){let J=super.toJSON($);if(J.object.fov=this.fov,J.object.zoom=this.zoom,J.object.near=this.near,J.object.far=this.far,J.object.focus=this.focus,J.object.aspect=this.aspect,this.view!==null)J.object.view=Object.assign({},this.view);return J.object.filmGauge=this.filmGauge,J.object.filmOffset=this.filmOffset,J}}class nZ extends e6{constructor(){super(new e8(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices($){let J=this.camera,Q=a8*2*$.angle*this.focus,W=this.mapSize.width/this.mapSize.height*this.aspect,Z=$.distance||J.far;if(Q!==J.fov||W!==J.aspect||Z!==J.far)J.fov=Q,J.aspect=W,J.far=Z,J.updateProjectionMatrix();super.updateMatrices($)}copy($){return super.copy($),this.focus=$.focus,this.aspect=$.aspect,this}toJSON(){let $=super.toJSON();return $.focus=this.focus,$.aspect=this.aspect,$}}class R7 extends t6{constructor($,J,Q=0,W=Math.PI/3,Z=0,K=2){super($,J);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(X0.DEFAULT_UP),this.updateMatrix(),this.target=new X0,this.distance=Q,this.angle=W,this.penumbra=Z,this.decay=K,this.map=null,this.shadow=new nZ}get power(){return this.intensity*Math.PI}set power($){this.intensity=$/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy($,J){return super.copy($,J),this.distance=$.distance,this.angle=$.angle,this.penumbra=$.penumbra,this.decay=$.decay,this.target=$.target.clone(),this.map=$.map,this.shadow=$.shadow.clone(),this}toJSON($){let J=super.toJSON($);if(J.object.distance=this.distance,J.object.angle=this.angle,J.object.decay=this.decay,J.object.penumbra=this.penumbra,J.object.target=this.target.uuid,this.map&&this.map.isTexture)J.object.map=this.map.toJSON($).uuid;return J.object.shadow=this.shadow.toJSON(),J}}class sZ extends e6{constructor(){super(new e8(90,1,0.5,500));this.isPointLightShadow=!0}}class O7 extends t6{constructor($,J,Q=0,W=2){super($,J);this.isPointLight=!0,this.type="PointLight",this.distance=Q,this.decay=W,this.shadow=new sZ}get power(){return this.intensity*4*Math.PI}set power($){this.intensity=$/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy($,J){return super.copy($,J),this.distance=$.distance,this.decay=$.decay,this.shadow=$.shadow.clone(),this}toJSON($){let J=super.toJSON($);return J.object.distance=this.distance,J.object.decay=this.decay,J.object.shadow=this.shadow.toJSON(),J}}class $9 extends F7{constructor($=-1,J=1,Q=1,W=-1,Z=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=$,this.right=J,this.top=Q,this.bottom=W,this.near=Z,this.far=K,this.updateProjectionMatrix()}copy($,J){return super.copy($,J),this.left=$.left,this.right=$.right,this.top=$.top,this.bottom=$.bottom,this.near=$.near,this.far=$.far,this.zoom=$.zoom,this.view=$.view===null?null:Object.assign({},$.view),this}setViewOffset($,J,Q,W,Z,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=$,this.view.fullHeight=J,this.view.offsetX=Q,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let $=(this.right-this.left)/(2*this.zoom),J=(this.top-this.bottom)/(2*this.zoom),Q=(this.right+this.left)/2,W=(this.top+this.bottom)/2,Z=Q-$,K=Q+$,H=W+J,Y=W-J;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;Z+=X*this.view.offsetX,K=Z+X*this.view.width,H-=U*this.view.offsetY,Y=H-U*this.view.height}this.projectionMatrix.makeOrthographic(Z,K,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON($){let J=super.toJSON($);if(J.object.zoom=this.zoom,J.object.left=this.left,J.object.right=this.right,J.object.top=this.top,J.object.bottom=this.bottom,J.object.near=this.near,J.object.far=this.far,this.view!==null)J.object.view=Object.assign({},this.view);return J}}class iZ extends e6{constructor(){super(new $9(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class L7 extends t6{constructor($,J){super($,J);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(X0.DEFAULT_UP),this.updateMatrix(),this.target=new X0,this.shadow=new iZ}dispose(){super.dispose(),this.shadow.dispose()}copy($){return super.copy($),this.target=$.target.clone(),this.shadow=$.shadow.clone(),this}toJSON($){let J=super.toJSON($);return J.object.shadow=this.shadow.toJSON(),J.object.target=this.target.uuid,J}}class H${static extractUrlBase($){let J=$.lastIndexOf("/");if(J===-1)return"./";return $.slice(0,J+1)}static resolveURL($,J){if(typeof $!=="string"||$==="")return"";if(/^https?:\/\//i.test(J)&&/^\//.test($))J=J.replace(/(^https?:\/\/[^\/]+).*/i,"$1");if(/^(https?:)?\/\//i.test($))return $;if(/^data:.*,.*$/i.test($))return $;if(/^blob:.*$/i.test($))return $;return J+$}}var PJ=new WeakMap;class M7 extends F${constructor($){super($);if(this.isImageBitmapLoader=!0,typeof createImageBitmap>"u")$0("ImageBitmapLoader: createImageBitmap() not supported.");if(typeof fetch>"u")$0("ImageBitmapLoader: fetch() not supported.");this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions($){return this.options=$,this}load($,J,Q,W){if($===void 0)$="";if(this.path!==void 0)$=this.path+$;$=this.manager.resolveURL($);let Z=this,K=L$.get(`image-bitmap:${$}`);if(K!==void 0){if(Z.manager.itemStart($),K.then){K.then((X)=>{if(PJ.has(K)===!0){if(W)W(PJ.get(K));Z.manager.itemError($),Z.manager.itemEnd($)}else{if(J)J(X);Z.manager.itemEnd($)}});return}setTimeout(function(){if(J)J(K);Z.manager.itemEnd($)},0);return}let H={};H.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",H.headers=this.requestHeader,H.signal=typeof AbortSignal.any==="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let Y=fetch($,H).then(function(X){return X.blob()}).then(function(X){return createImageBitmap(X,Object.assign({},Z.options,{colorSpaceConversion:"none"}))}).then(function(X){if(L$.add(`image-bitmap:${$}`,X),J)J(X);return Z.manager.itemEnd($),X}).catch(function(X){if(W)W(X);PJ.set(Y,X),L$.remove(`image-bitmap:${$}`),Z.manager.itemError($),Z.manager.itemEnd($)});L$.add(`image-bitmap:${$}`,Y),Z.manager.itemStart($)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}var MQ="\\[\\]\\.:\\/",G5=new RegExp("["+MQ+"]","g"),wQ="[^"+MQ+"]",q5="[^"+MQ.replace("\\.","")+"]",F5=/((?:WC+[\/:])*)/.source.replace("WC",wQ),R5=/(WCOD+)?/.source.replace("WCOD",q5),O5=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wQ),L5=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wQ),M5=new RegExp("^"+F5+R5+O5+L5+"$"),w5=["material","materials","bones","map"];class oZ{constructor($,J,Q){let W=Q||t.parseTrackName(J);this._targetGroup=$,this._bindings=$.subscribe_(J,W)}getValue($,J){this.bind();let Q=this._targetGroup.nCachedObjects_,W=this._bindings[Q];if(W!==void 0)W.getValue($,J)}setValue($,J){let Q=this._bindings;for(let W=this._targetGroup.nCachedObjects_,Z=Q.length;W!==Z;++W)Q[W].setValue($,J)}bind(){let $=this._bindings;for(let J=this._targetGroup.nCachedObjects_,Q=$.length;J!==Q;++J)$[J].bind()}unbind(){let $=this._bindings;for(let J=this._targetGroup.nCachedObjects_,Q=$.length;J!==Q;++J)$[J].unbind()}}class t{constructor($,J,Q){this.path=J,this.parsedPath=Q||t.parseTrackName(J),this.node=t.findNode($,this.parsedPath.nodeName),this.rootNode=$,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create($,J,Q){if(!($&&$.isAnimationObjectGroup))return new t($,J,Q);else return new t.Composite($,J,Q)}static sanitizeNodeName($){return $.replace(/\s/g,"_").replace(G5,"")}static parseTrackName($){let J=M5.exec($);if(J===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+$);let Q={nodeName:J[2],objectName:J[3],objectIndex:J[4],propertyName:J[5],propertyIndex:J[6]},W=Q.nodeName&&Q.nodeName.lastIndexOf(".");if(W!==void 0&&W!==-1){let Z=Q.nodeName.substring(W+1);if(w5.indexOf(Z)!==-1)Q.nodeName=Q.nodeName.substring(0,W),Q.objectName=Z}if(Q.propertyName===null||Q.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+$);return Q}static findNode($,J){if(J===void 0||J===""||J==="."||J===-1||J===$.name||J===$.uuid)return $;if($.skeleton){let Q=$.skeleton.getBoneByName(J);if(Q!==void 0)return Q}if($.children){let Q=function(Z){for(let K=0;K<Z.length;K++){let H=Z[K];if(H.name===J||H.uuid===J)return H;let Y=Q(H.children);if(Y)return Y}return null},W=Q($.children);if(W)return W}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct($,J){$[J]=this.targetObject[this.propertyName]}_getValue_array($,J){let Q=this.resolvedProperty;for(let W=0,Z=Q.length;W!==Z;++W)$[J++]=Q[W]}_getValue_arrayElement($,J){$[J]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray($,J){this.resolvedProperty.toArray($,J)}_setValue_direct($,J){this.targetObject[this.propertyName]=$[J]}_setValue_direct_setNeedsUpdate($,J){this.targetObject[this.propertyName]=$[J],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate($,J){this.targetObject[this.propertyName]=$[J],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array($,J){let Q=this.resolvedProperty;for(let W=0,Z=Q.length;W!==Z;++W)Q[W]=$[J++]}_setValue_array_setNeedsUpdate($,J){let Q=this.resolvedProperty;for(let W=0,Z=Q.length;W!==Z;++W)Q[W]=$[J++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate($,J){let Q=this.resolvedProperty;for(let W=0,Z=Q.length;W!==Z;++W)Q[W]=$[J++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement($,J){this.resolvedProperty[this.propertyIndex]=$[J]}_setValue_arrayElement_setNeedsUpdate($,J){this.resolvedProperty[this.propertyIndex]=$[J],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate($,J){this.resolvedProperty[this.propertyIndex]=$[J],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray($,J){this.resolvedProperty.fromArray($,J)}_setValue_fromArray_setNeedsUpdate($,J){this.resolvedProperty.fromArray($,J),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate($,J){this.resolvedProperty.fromArray($,J),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound($,J){this.bind(),this.getValue($,J)}_setValue_unbound($,J){this.bind(),this.setValue($,J)}bind(){let $=this.node,J=this.parsedPath,Q=J.objectName,W=J.propertyName,Z=J.propertyIndex;if(!$)$=t.findNode(this.rootNode,J.nodeName),this.node=$;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!$){$0("PropertyBinding: No target node found for track: "+this.path+".");return}if(Q){let X=J.objectIndex;switch(Q){case"materials":if(!$.material){G0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!$.material.materials){G0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}$=$.material.materials;break;case"bones":if(!$.skeleton){G0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}$=$.skeleton.bones;for(let U=0;U<$.length;U++)if($[U].name===X){X=U;break}break;case"map":if("map"in $){$=$.map;break}if(!$.material){G0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!$.material.map){G0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}$=$.material.map;break;default:if($[Q]===void 0){G0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}$=$[Q]}if(X!==void 0){if($[X]===void 0){G0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,$);return}$=$[X]}}let K=$[W];if(K===void 0){let X=J.nodeName;G0("PropertyBinding: Trying to update property for track: "+X+"."+W+" but it wasn't found.",$);return}let H=this.Versioning.None;if(this.targetObject=$,$.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if($.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(Z!==void 0){if(W==="morphTargetInfluences"){if(!$.geometry){G0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!$.geometry.morphAttributes){G0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if($.morphTargetDictionary[Z]!==void 0)Z=$.morphTargetDictionary[Z]}Y=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=Z}else if(K.fromArray!==void 0&&K.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))Y=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=W;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}t.Composite=oZ;t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};t.prototype.GetterByBindingType=[t.prototype._getValue_direct,t.prototype._getValue_array,t.prototype._getValue_arrayElement,t.prototype._getValue_toArray];t.prototype.SetterByBindingTypeAndVersioning=[[t.prototype._setValue_direct,t.prototype._setValue_direct_setNeedsUpdate,t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[t.prototype._setValue_array,t.prototype._setValue_array_setNeedsUpdate,t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[t.prototype._setValue_arrayElement,t.prototype._setValue_arrayElement_setNeedsUpdate,t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[t.prototype._setValue_fromArray,t.prototype._setValue_fromArray_setNeedsUpdate,t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var OG=new Float32Array(1);var _Z=new u;class $6{constructor($,J,Q=0,W=1/0){this.ray=new M8($,J),this.near=Q,this.far=W,this.camera=null,this.layers=new J7,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set($,J){this.ray.set($,J)}setFromCamera($,J){if(J.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(J.matrixWorld),this.ray.direction.set($.x,$.y,0.5).unproject(J).sub(this.ray.origin).normalize(),this.camera=J;else if(J.isOrthographicCamera)this.ray.origin.set($.x,$.y,J.projectionMatrix.elements[14]).unproject(J),this.ray.direction.set(0,0,-1).transformDirection(J.matrixWorld),this.camera=J;else G0("Raycaster: Unsupported camera type: "+J.type)}setFromXRController($){return _Z.identity().extractRotation($.matrixWorld),this.ray.origin.setFromMatrixPosition($.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_Z),this}intersectObject($,J=!0,Q=[]){return jJ($,this,Q,J),Q.sort(PZ),Q}intersectObjects($,J=!0,Q=[]){for(let W=0,Z=$.length;W<Z;W++)jJ($[W],this,Q,J);return Q.sort(PZ),Q}}function PZ($,J){return $.distance-J.distance}function jJ($,J,Q,W){let Z=!0;if($.layers.test(J.layers)){if($.raycast(J,Q)===!1)Z=!1}if(Z===!0&&W===!0){let K=$.children;for(let H=0,Y=K.length;H<Y;H++)jJ(K[H],J,Q,!0)}}class VQ{static{VQ.prototype.isMatrix2=!0}constructor($,J,Q,W){if(this.elements=[1,0,0,1],$!==void 0)this.set($,J,Q,W)}identity(){return this.set(1,0,0,1),this}fromArray($,J=0){for(let Q=0;Q<4;Q++)this.elements[Q]=$[Q+J];return this}set($,J,Q,W){let Z=this.elements;return Z[0]=$,Z[2]=J,Z[1]=Q,Z[3]=W,this}}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)$0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";var D5=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,B5=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,C5=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,z5=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_5=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,P5=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,I5=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,T5=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,A5=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,S5=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,j5=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,f5=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,h5=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,v5=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,y5=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,b5=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,x5=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,g5=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,p5=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,l5=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,u5=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,d5=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,m5=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,c5=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,n5=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,s5=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,i5=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,o5=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,a5=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,r5=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,t5="gl_FragColor = linearToOutputTexel( gl_FragColor );",e5=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$X=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,JX=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,QX=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,WX=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ZX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,KX=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,HX=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,YX=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,XX=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,UX=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,NX=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,EX=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,GX=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qX=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,FX=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,RX=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,OX=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,LX=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,MX=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wX=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,VX=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kX=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,DX=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,BX=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,CX=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,zX=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_X=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,PX=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,IX=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,TX=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,AX=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,SX=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,jX=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fX=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hX=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vX=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,yX=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bX=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xX=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,gX=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pX=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,lX=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,uX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mX=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,cX=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,nX=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sX=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,iX=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,oX=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,aX=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rX=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,tX=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,eX=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,J1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Q1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,W1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Z1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,K1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,H1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Y1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,X1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,U1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,N1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,E1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,G1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,q1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,F1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,R1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,O1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,L1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,M1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,w1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,V1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,k1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,D1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,B1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,z1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,P1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,T1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,A1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,S1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,j1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,f1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,v1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,y1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,b1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,g1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,l1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,d1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,m1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,s1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,o1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,r1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,t1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$U=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,JU=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,o={alphahash_fragment:D5,alphahash_pars_fragment:B5,alphamap_fragment:C5,alphamap_pars_fragment:z5,alphatest_fragment:_5,alphatest_pars_fragment:P5,aomap_fragment:I5,aomap_pars_fragment:T5,batching_pars_vertex:A5,batching_vertex:S5,begin_vertex:j5,beginnormal_vertex:f5,bsdfs:h5,iridescence_fragment:v5,bumpmap_pars_fragment:y5,clipping_planes_fragment:b5,clipping_planes_pars_fragment:x5,clipping_planes_pars_vertex:g5,clipping_planes_vertex:p5,color_fragment:l5,color_pars_fragment:u5,color_pars_vertex:d5,color_vertex:m5,common:c5,cube_uv_reflection_fragment:n5,defaultnormal_vertex:s5,displacementmap_pars_vertex:i5,displacementmap_vertex:o5,emissivemap_fragment:a5,emissivemap_pars_fragment:r5,colorspace_fragment:t5,colorspace_pars_fragment:e5,envmap_fragment:$X,envmap_common_pars_fragment:JX,envmap_pars_fragment:QX,envmap_pars_vertex:WX,envmap_physical_pars_fragment:FX,envmap_vertex:ZX,fog_vertex:KX,fog_pars_vertex:HX,fog_fragment:YX,fog_pars_fragment:XX,gradientmap_pars_fragment:UX,lightmap_pars_fragment:NX,lights_lambert_fragment:EX,lights_lambert_pars_fragment:GX,lights_pars_begin:qX,lights_toon_fragment:RX,lights_toon_pars_fragment:OX,lights_phong_fragment:LX,lights_phong_pars_fragment:MX,lights_physical_fragment:wX,lights_physical_pars_fragment:VX,lights_fragment_begin:kX,lights_fragment_maps:DX,lights_fragment_end:BX,lightprobes_pars_fragment:CX,logdepthbuf_fragment:zX,logdepthbuf_pars_fragment:_X,logdepthbuf_pars_vertex:PX,logdepthbuf_vertex:IX,map_fragment:TX,map_pars_fragment:AX,map_particle_fragment:SX,map_particle_pars_fragment:jX,metalnessmap_fragment:fX,metalnessmap_pars_fragment:hX,morphinstance_vertex:vX,morphcolor_vertex:yX,morphnormal_vertex:bX,morphtarget_pars_vertex:xX,morphtarget_vertex:gX,normal_fragment_begin:pX,normal_fragment_maps:lX,normal_pars_fragment:uX,normal_pars_vertex:dX,normal_vertex:mX,normalmap_pars_fragment:cX,clearcoat_normal_fragment_begin:nX,clearcoat_normal_fragment_maps:sX,clearcoat_pars_fragment:iX,iridescence_pars_fragment:oX,opaque_fragment:aX,packing:rX,premultiplied_alpha_fragment:tX,project_vertex:eX,dithering_fragment:$1,dithering_pars_fragment:J1,roughnessmap_fragment:Q1,roughnessmap_pars_fragment:W1,shadowmap_pars_fragment:Z1,shadowmap_pars_vertex:K1,shadowmap_vertex:H1,shadowmask_pars_fragment:Y1,skinbase_vertex:X1,skinning_pars_vertex:U1,skinning_vertex:N1,skinnormal_vertex:E1,specularmap_fragment:G1,specularmap_pars_fragment:q1,tonemapping_fragment:F1,tonemapping_pars_fragment:R1,transmission_fragment:O1,transmission_pars_fragment:L1,uv_pars_fragment:M1,uv_pars_vertex:w1,uv_vertex:V1,worldpos_vertex:k1,background_vert:D1,background_frag:B1,backgroundCube_vert:C1,backgroundCube_frag:z1,cube_vert:_1,cube_frag:P1,depth_vert:I1,depth_frag:T1,distance_vert:A1,distance_frag:S1,equirect_vert:j1,equirect_frag:f1,linedashed_vert:h1,linedashed_frag:v1,meshbasic_vert:y1,meshbasic_frag:b1,meshlambert_vert:x1,meshlambert_frag:g1,meshmatcap_vert:p1,meshmatcap_frag:l1,meshnormal_vert:u1,meshnormal_frag:d1,meshphong_vert:m1,meshphong_frag:c1,meshphysical_vert:n1,meshphysical_frag:s1,meshtoon_vert:i1,meshtoon_frag:o1,points_vert:a1,points_frag:r1,shadow_vert:t1,shadow_frag:e1,sprite_vert:$U,sprite_frag:JU},j={common:{diffuse:{value:new h(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new l},alphaMap:{value:null},alphaMapTransform:{value:new l},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new l}},envmap:{envMap:{value:null},envMapRotation:{value:new l},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new l}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new l}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new l},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new l},normalScale:{value:new S(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new l},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new l}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new l}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new l}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new h(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new w},probesMax:{value:new w},probesResolution:{value:new w}},points:{diffuse:{value:new h(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new l},alphaTest:{value:0},uvTransform:{value:new l}},sprite:{diffuse:{value:new h(16777215)},opacity:{value:1},center:{value:new S(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new l},alphaMap:{value:null},alphaMapTransform:{value:new l},alphaTest:{value:0}}},aZ={basic:{uniforms:g0([j.common,j.specularmap,j.envmap,j.aomap,j.lightmap,j.fog]),vertexShader:o.meshbasic_vert,fragmentShader:o.meshbasic_frag},lambert:{uniforms:g0([j.common,j.specularmap,j.envmap,j.aomap,j.lightmap,j.emissivemap,j.bumpmap,j.normalmap,j.displacementmap,j.fog,j.lights,{emissive:{value:new h(0)},envMapIntensity:{value:1}}]),vertexShader:o.meshlambert_vert,fragmentShader:o.meshlambert_frag},phong:{uniforms:g0([j.common,j.specularmap,j.envmap,j.aomap,j.lightmap,j.emissivemap,j.bumpmap,j.normalmap,j.displacementmap,j.fog,j.lights,{emissive:{value:new h(0)},specular:{value:new h(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:o.meshphong_vert,fragmentShader:o.meshphong_frag},standard:{uniforms:g0([j.common,j.envmap,j.aomap,j.lightmap,j.emissivemap,j.bumpmap,j.normalmap,j.displacementmap,j.roughnessmap,j.metalnessmap,j.fog,j.lights,{emissive:{value:new h(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:o.meshphysical_vert,fragmentShader:o.meshphysical_frag},toon:{uniforms:g0([j.common,j.aomap,j.lightmap,j.emissivemap,j.bumpmap,j.normalmap,j.displacementmap,j.gradientmap,j.fog,j.lights,{emissive:{value:new h(0)}}]),vertexShader:o.meshtoon_vert,fragmentShader:o.meshtoon_frag},matcap:{uniforms:g0([j.common,j.bumpmap,j.normalmap,j.displacementmap,j.fog,{matcap:{value:null}}]),vertexShader:o.meshmatcap_vert,fragmentShader:o.meshmatcap_frag},points:{uniforms:g0([j.points,j.fog]),vertexShader:o.points_vert,fragmentShader:o.points_frag},dashed:{uniforms:g0([j.common,j.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:o.linedashed_vert,fragmentShader:o.linedashed_frag},depth:{uniforms:g0([j.common,j.displacementmap]),vertexShader:o.depth_vert,fragmentShader:o.depth_frag},normal:{uniforms:g0([j.common,j.bumpmap,j.normalmap,j.displacementmap,{opacity:{value:1}}]),vertexShader:o.meshnormal_vert,fragmentShader:o.meshnormal_frag},sprite:{uniforms:g0([j.sprite,j.fog]),vertexShader:o.sprite_vert,fragmentShader:o.sprite_frag},background:{uniforms:{uvTransform:{value:new l},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:o.background_vert,fragmentShader:o.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new l}},vertexShader:o.backgroundCube_vert,fragmentShader:o.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:o.cube_vert,fragmentShader:o.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:o.equirect_vert,fragmentShader:o.equirect_frag},distance:{uniforms:g0([j.common,j.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:o.distance_vert,fragmentShader:o.distance_frag},shadow:{uniforms:g0([j.lights,j.fog,{color:{value:new h(0)},opacity:{value:1}}]),vertexShader:o.shadow_vert,fragmentShader:o.shadow_frag}};aZ.physical={uniforms:g0([aZ.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new l},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new l},clearcoatNormalScale:{value:new S(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new l},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new l},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new l},sheen:{value:0},sheenColor:{value:new h(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new l},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new l},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new l},transmissionSamplerSize:{value:new S},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new l},attenuationDistance:{value:0},attenuationColor:{value:new h(0)},specularColor:{value:new h(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new l},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new l},anisotropyVector:{value:new S},anisotropyMap:{value:null},anisotropyMapTransform:{value:new l}}]),vertexShader:o.meshphysical_vert,fragmentShader:o.meshphysical_frag};var QU=new l;QU.set(-1,0,0,0,1,0,0,0,1);var bL={[yJ]:"LINEAR_TONE_MAPPING",[bJ]:"REINHARD_TONE_MAPPING",[xJ]:"CINEON_TONE_MAPPING",[gJ]:"ACES_FILMIC_TONE_MAPPING",[lJ]:"AGX_TONE_MAPPING",[uJ]:"NEUTRAL_TONE_MAPPING",[pJ]:"CUSTOM_TONE_MAPPING"};var xL=new Float32Array(16),gL=new Float32Array(9),pL=new Float32Array(4);var lL={[yJ]:"Linear",[bJ]:"Reinhard",[xJ]:"Cineon",[gJ]:"ACESFilmic",[lJ]:"AgX",[uJ]:"Neutral",[pJ]:"Custom"};var uL={[IZ]:"SHADOWMAP_TYPE_PCF",[TZ]:"SHADOWMAP_TYPE_VSM"};var dL={[fZ]:"ENVMAP_TYPE_CUBE",[dJ]:"ENVMAP_TYPE_CUBE",[hZ]:"ENVMAP_TYPE_CUBE_UV"};var mL={[dJ]:"ENVMAP_MODE_REFRACTION"};var cL={[AZ]:"ENVMAP_BLENDING_MULTIPLY",[SZ]:"ENVMAP_BLENDING_MIX",[jZ]:"ENVMAP_BLENDING_ADD"};var WU=new l;WU.set(-1,0,0,0,1,0,0,0,1);var nL=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);var rZ=52,tZ={x:36,z:34},BQ=[{a:[0,-29.7],b:[0,37],width:2.15,destination:"town gate and town hall"},{a:[-36,0],b:[36,0],width:2.15,destination:"east and west shops"},{a:[-7,0],b:[-25,-16],width:1.5,destination:"southwest cottages"},{a:[7,0],b:[24,-19],width:1.5,destination:"southeast cottages"},{a:[-7,0],b:[-25,19],width:1.5,destination:"northwest cottages"},{a:[7,0],b:[24,21],width:1.5,destination:"northeast cottages"},{a:[0,7.5],b:[-11.25,7.5],width:1.35,destination:"pond bank"},{a:[0,4.8],b:[13.35,4.8],width:1.35,destination:"pavilion"},{a:[0,9],b:[2.8,9],width:1.15,destination:"community garden"}],$K=[[-25,-17,14259832,0.72],[-29,-12,15121768,0.83],[-19,-23,9353421,0.32],[24,-19,11902928,-0.62],[29,-13,9550199,-0.82],[19,-25,14262445,-0.36],[-25,19,12034775,2.38],[-18,25,14859120,2.75],[-30,13,8894124,2.16],[24,21,14125172,-2.42],[30,15,8826568,-2.13],[18,27,14002800,-2.72]],w7=null;function W8($){let J=Math.sin($*91.731+17.13)*43758.5453;return J-Math.floor(J)}function U0($,J,Q,W,Z){let K=new y($,J);return K.position.set(Q,W,Z),K.castShadow=!0,K.receiveShadow=!0,K}function k7($,J,Q){return $.position.x=J.position.x,$.position.z=J.position.z,$.name=Q,$.userData.centeredRoof=!0,$.userData.centeredOver=J.name||J.geometry.type,$}function ZU($,J,Q){let[W,Z]=Q.a,[K,H]=Q.b,Y=K-W,X=H-Z,U=Y*Y+X*X||1,E=Math.max(0,Math.min(1,(($-W)*Y+(J-Z)*X)/U));return Math.hypot($-(W+Y*E),J-(Z+X*E))}function eZ($,J,Q=0){if(BQ.some((W)=>ZU($,J,W)<W.width/2+Q))return!0;if(Math.hypot($+18,(J-7.5)/0.58)<6.2+Q)return!0;if(Math.hypot($-17,J-5)<4+Q)return!0;if($>2.7-Q&&$<10.2+Q&&J>5.5-Q&&J<10.8+Q)return!0;if(Math.abs($)<4.2+Q&&J>-36.5-Q&&J<-29.5+Q)return!0;return $K.some(([W,Z])=>Math.hypot($-W,J-Z)<3.2+Q)}function DQ($){$.scene.traverse((J)=>{if(!J?.isMesh||J.geometry?.type!=="CylinderGeometry")return;let{radiusTop:Q=0,radiusBottom:W=0,height:Z=0}=J.geometry.parameters||{},K=J.getWorldPosition(new w);if(Math.abs(K.x)<0.05&&Math.abs(K.z+6.1)<0.05&&Q>2&&W>2&&Z<0.4)J.position.set(-18,J.position.y,7.5)})}function KU($,J){let[Q,W]=J.a,[Z,K]=J.b,H=Z-Q,Y=K-W,X=Math.hypot(H,Y),U=U0(new i(J.width,0.035,X),new v({color:14204294,roughness:1}),(Q+Z)/2,0.035,(W+K)/2);U.rotation.y=Math.atan2(H,Y),U.castShadow=!1,U.name=`PathTo_${J.destination.replace(/\s+/g,"_")}`,U.userData.destination=J.destination,$.add(U)}function HU($,J,Q,W,Z=0){let K=new c;K.position.set(J,0,Q),K.rotation.y=Z;let H=new v({color:W,roughness:0.9}),Y=new v({color:7295302,roughness:0.82}),X=U0(new i(2.8,1.85,2.45),H,0,0.93,0);X.name="CottageBody";let U=k7(U0(new x0(2.02,1.15,4),Y,0,2.43,0),X,"CenteredCottageRoof");U.rotation.y=Math.PI/4,U.scale.z=0.76;let E=U0(new i(0.62,1.15,0.09),new v({color:4351596,roughness:0.75}),0,0.58,1.27),G=U0(new i(1.25,0.12,0.5),new v({color:12035979,roughness:1}),0,0.06,1.45);K.add(X,U,E,G),[-0.78,0.78].forEach((q)=>{let F=U0(new i(0.55,0.62,0.08),Y,q,1.08,1.26),R=U0(new i(0.42,0.49,0.09),new v({color:10408157,roughness:0.35}),q,1.08,1.31);K.add(F,R)}),$.add(K)}function YU($){let J=new c;J.name="NorthTownHall",J.position.set(0,0,-33);let Q=new v({color:14271643,roughness:0.9}),W=new v({color:6835779,roughness:0.84}),Z=new v({color:7901322,roughness:0.82}),K=U0(new i(6.2,2.9,4.7),Q,0,1.45,0);K.name="TownHallBody";let H=k7(U0(new x0(4.2,1.55,4),Z,0,3.75,0),K,"CenteredTownHallRoof");H.rotation.y=Math.PI/4,H.scale.z=0.78;let Y=U0(new i(1.55,1.7,1.55),Q,0,4.35,0.15);Y.name="TownHallTower";let X=k7(U0(new x0(1.25,1.25,4),Z,0,5.65,0.15),Y,"CenteredTownHallTowerRoof");X.rotation.y=Math.PI/4;let U=U0(new i(1.12,1.65,0.12),W,0,0.83,2.39),E=U0(new i(2.15,0.14,0.72),new v({color:11969669,roughness:1}),0,0.07,2.7);J.add(K,H,Y,X,U,E),[-2,-1,1,2].forEach((G)=>{let q=U0(new i(0.72,0.82,0.1),W,G,1.58,2.38),F=U0(new i(0.56,0.66,0.11),new v({color:11129301,roughness:0.35}),G,1.58,2.44);J.add(q,F)}),$.add(J)}function V7($,J,Q,W){let Z=new c;Z.position.set(J,0,Q);let K=new v({color:6638140,roughness:0.9}),H=U0(new T0(0.07,0.085,1.8,8),K,0,0.9,0),Y=U0(new i(1.25,0.48,0.12),new v({color:W,roughness:0.84}),0,1.45,0),X=U0(new x0(0.13,0.24,6),K,0,1.94,0);Z.add(H,Y,X),$.add(Z)}function XU($){let J=new c;J.name="CommunityGardenBeds";let Q=new v({color:7754811,roughness:1}),W=new v({color:11768673,roughness:0.95});[[4.1,6.7],[6.55,6.7],[9,6.7],[4.1,9.5],[6.55,9.5],[9,9.5]].forEach(([K,H],Y)=>{let X=U0(new i(1.75,0.14,1.7),W,K,0.07,H),U=U0(new i(1.5,0.17,1.45),Q,K,0.13,H);X.name=`GardenPlot_${Y+1}`,J.add(X,U)});let Z=new c;Z.position.set(3.15,0,8.1),Z.add(U0(new T0(0.045,0.055,1.1,7),W,0,0.55,0)),Z.add(U0(new i(1.1,0.4,0.1),new v({color:7312734,roughness:0.9}),0,1,0)),J.add(Z),$.add(J)}function JK($){if(!$?.scene||$.mode!=="village")return;if(w7?.parent)w7.parent.remove(w7);if($.camera.far=180,$.camera.updateProjectionMatrix(),$.scene.fog)$.scene.fog.near=36,$.scene.fog.far=112;$.mapBounds={...tZ,radius:rZ},DQ($);let J=new c;J.name="SnugExpandedCountryside",BQ.forEach((G)=>KU(J,G));let Q=new s$(new T0(0.18,0.26,1.7,7),new v({color:7885115,roughness:0.94}),72),W=new s$(new a$(1.05,1),new v({color:5213528,roughness:0.9}),72),Z=new X0,K=0;for(let G=0;G<3;G+=1){let q=[18,24,30][G],F=[20,29,39][G];for(let R=0;R<q;R+=1){let O=R/q*Math.PI*2+W8(R+G*80)*0.18,M=F+(W8(R*3.2+G)-0.5)*4.4,V=Math.cos(O)*M,D=Math.sin(O)*M;if(eZ(V,D,1.2))continue;let k=0.78+W8(R*8.7+G*4)*0.68;Z.position.set(V,0.84*k,D),Z.rotation.set(0,O*1.7,0),Z.scale.set(k,k,k),Z.updateMatrix(),Q.setMatrixAt(K,Z.matrix),Z.position.y=2.05*k,Z.scale.set(k*(0.88+W8(R*4.1)*0.22),k,k*(0.88+W8(R*5.2)*0.22)),Z.updateMatrix(),W.setMatrixAt(K,Z.matrix),K+=1}}Q.count=W.count=K,Q.castShadow=W.castShadow=!0,Q.receiveShadow=W.receiveShadow=!0,J.add(Q,W),[15978599,15432826,12034776,15921375].forEach((G,q)=>{let F=new s$(new a$(0.1,0),new v({color:G,roughness:0.82}),28),R=0;for(let O=0;O<28;O+=1){let M=W8(O*3.6+q*40)*Math.PI*2,V=12+W8(O*9.2+q)*24,D=Math.cos(M)*V,k=Math.sin(M)*V;if(eZ(D,k,0.35))continue;Z.position.set(D,0.12,k),Z.rotation.set(0,M,0);let B=0.75+W8(O*5.7+q)*0.65;Z.scale.setScalar(B),Z.updateMatrix(),F.setMatrixAt(R,Z.matrix),R+=1}F.count=R,F.castShadow=!0,J.add(F)}),$K.forEach((G)=>HU(J,...G)),YU(J),V7(J,-13,-10,14254700),V7(J,14,-9,14793315),V7(J,-14,12,7909047),V7(J,14,13,10980290);let Y=U0(new T0(5.2,5.6,0.12,48),new v({color:7385027,roughness:0.28,metalness:0.06}),-18,0.02,7.5);Y.scale.z=0.58,Y.name="CountrysidePond",J.add(Y);let X=new c;X.position.set(17,0,5),X.name="TownPavilion";let U=U0(new T0(3.1,3.35,0.35,10),new v({color:13942156,roughness:0.95}),0,0.1,0);U.name="TownPavilionPlatform";let E=k7(U0(new x0(3.4,1.2,8),new v({color:12148816,roughness:0.8}),0,3.2,0),U,"CenteredTownPavilionRoof");X.add(U,E);for(let G=0;G<8;G+=1){let q=G/8*Math.PI*2;X.add(U0(new T0(0.09,0.11,2.8,7),new v({color:7820608,roughness:0.9}),Math.cos(q)*2.55,1.55,Math.sin(q)*2.55))}J.add(X),XU(J),$.scene.add(J),w7=J,requestAnimationFrame(()=>{DQ($),requestAnimationFrame(()=>DQ($))}),window.dispatchEvent(new CustomEvent("snug-world-expanded",{detail:{radius:rZ,bounds:tZ,group:J,paths:BQ}}))}window.addEventListener("snug-world-ready",($)=>JK($.detail));if(window.__snugWorld)JK(window.__snugWorld);var CQ=new WeakMap,UU="assets/vendor/draco/draco_decoder.wasm",NU="assets/vendor/draco/draco_wasm_wrapper.js",EU="assets/vendor/draco/draco_decoder.js";class zQ extends F${constructor($){super($);this.decoderPaths={js:NU,wasm:UU,dep_js:EU},this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath($){let{decoderPaths:J}=this;if(typeof $==="object")J.js=$.js,J.wasm=$.wasm,J.dep_js=null;else J.js=H$.resolveURL("draco_wasm_wrapper.js",$),J.wasm=H$.resolveURL("draco_decoder.wasm",$),J.dep_js=H$.resolveURL("draco_decoder.js",$);return this}setDecoderConfig($){return console.warn("THREE.DRACOLoader: setDecoderConfig to has been deprecated and will be removed in r194."),this.decoderConfig=$,this}setWorkerLimit($){return this.workerLimit=$,this}load($,J,Q,W){let Z=new Q8(this.manager);Z.setPath(this.path),Z.setResponseType("arraybuffer"),Z.setRequestHeader(this.requestHeader),Z.setWithCredentials(this.withCredentials),Z.load($,(K)=>{this.parse(K,J,W)},Q,W)}parse($,J,Q=()=>{}){this.decodeDracoFile($,J,null,null,d0,Q).catch(Q)}decodeDracoFile($,J,Q,W,Z=a0,K=()=>{}){let H={attributeIDs:Q||this.defaultAttributeIDs,attributeTypes:W||this.defaultAttributeTypes,useUniqueIDs:!!Q,vertexColorSpace:Z};return this.decodeGeometry($,H).then(J).catch(K)}decodeGeometry($,J){let Q=JSON.stringify(J);if(CQ.has($)){let Y=CQ.get($);if(Y.key===Q)return Y.promise;else if($.byteLength===0)throw Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let W,Z=this.workerNextTaskID++,K=$.byteLength,H=this._getWorker(Z,K).then((Y)=>{return W=Y,new Promise((X,U)=>{W._callbacks[Z]={resolve:X,reject:U},W.postMessage({type:"decode",id:Z,taskConfig:J,buffer:$},[$])})}).then((Y)=>this._createGeometry(Y.geometry));return H.catch(()=>!0).then(()=>{if(W&&Z)this._releaseTask(W,Z)}),CQ.set($,{key:Q,promise:H}),H}_createGeometry($){let J=new Z0;if($.index)J.setIndex(new M0($.index.array,1));for(let Q=0;Q<$.attributes.length;Q++){let{name:W,array:Z,itemSize:K,stride:H,vertexColorSpace:Y}=$.attributes[Q],X;if(K===H)X=new M0(Z,K);else{let U=new n$(Z,H);X=new M$(U,K,0)}if(W==="color")this._assignVertexColorSpace(X,Y),X.normalized=Z instanceof Float32Array===!1;J.setAttribute(W,X)}return J}_assignVertexColorSpace($,J){if(J!==d0)return;let Q=new h;for(let W=0,Z=$.count;W<Z;W++)Q.fromBufferAttribute($,W),A0.colorSpaceToWorking(Q,d0),$.setXYZ(W,Q.r,Q.g,Q.b)}_loadLibrary($,J){let Q=new Q8(this.manager);return Q.setResponseType(J),Q.setWithCredentials(this.withCredentials),new Promise((W,Z)=>{Q.load($,W,void 0,Z)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let $=typeof WebAssembly!=="object"||this.decoderConfig.type==="js",J=[],{decoderPaths:Q}=this;if($){if(Q.dep_js===null)throw Error("THREE.DRACOLoader: WebAssembly is required when using a custom decoder paths.");J.push(this._loadLibrary(Q.dep_js,"text"))}else J.push(this._loadLibrary(Q.js,"text")),J.push(this._loadLibrary(Q.wasm,"arraybuffer"));return this.decoderPending=Promise.all(J).then((W)=>{let Z=W[0];if(!$)this.decoderConfig.wasmBinary=W[1];let K=GU.toString(),H=["/* draco decoder */",Z,"","/* worker */",K.substring(K.indexOf("{")+1,K.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([H]))}),this.decoderPending}_getWorker($,J){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let W=new Worker(this.workerSourceURL);W._callbacks={},W._taskCosts={},W._taskLoad=0,W.postMessage({type:"init",decoderConfig:this.decoderConfig}),W.onmessage=function(Z){let K=Z.data;switch(K.type){case"decode":W._callbacks[K.id].resolve(K);break;case"error":W._callbacks[K.id].reject(K);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+K.type+'"')}},this.workerPool.push(W)}else this.workerPool.sort(function(W,Z){return W._taskLoad>Z._taskLoad?-1:1});let Q=this.workerPool[this.workerPool.length-1];return Q._taskCosts[$]=J,Q._taskLoad+=J,Q})}_releaseTask($,J){$._taskLoad-=$._taskCosts[J],delete $._callbacks[J],delete $._taskCosts[J]}debug(){console.log("Task load: ",this.workerPool.map(($)=>$._taskLoad))}dispose(){for(let $=0;$<this.workerPool.length;++$)this.workerPool[$].terminate();if(this.workerPool.length=0,this.workerSourceURL!=="")URL.revokeObjectURL(this.workerSourceURL);return this}}function GU(){let $,J;onmessage=function(H){let Y=H.data;switch(Y.type){case"init":$=Y.decoderConfig,J=new Promise(function(E){$.onModuleLoaded=function(G){E({draco:G})},DracoDecoderModule($)});break;case"decode":let{buffer:X,taskConfig:U}=Y;J.then((E)=>{let G=E.draco,q=new G.Decoder;try{let F=Q(G,q,new Int8Array(X),U),R=F.attributes.map((O)=>O.array.buffer);if(F.index)R.push(F.index.array.buffer);self.postMessage({type:"decode",id:Y.id,geometry:F},R)}catch(F){console.error(F),self.postMessage({type:"error",id:Y.id,error:F.message})}finally{G.destroy(q)}});break}};function Q(H,Y,X,U){let{attributeIDs:E,attributeTypes:G}=U,q,F,R=Y.GetEncodedGeometryType(X);if(R===H.TRIANGULAR_MESH)q=new H.Mesh,F=Y.DecodeArrayToMesh(X,X.byteLength,q);else if(R===H.POINT_CLOUD)q=new H.PointCloud,F=Y.DecodeArrayToPointCloud(X,X.byteLength,q);else throw Error("THREE.DRACOLoader: Unexpected geometry type.");if(!F.ok()||q.ptr===0)throw Error("THREE.DRACOLoader: Decoding failed: "+F.error_msg());let O={index:null,attributes:[]};for(let M in E){let V=self[G[M]],D,k;if(U.useUniqueIDs)k=E[M],D=Y.GetAttributeByUniqueId(q,k);else{if(k=Y.GetAttributeId(q,H[E[M]]),k===-1)continue;D=Y.GetAttribute(q,k)}let B=Z(H,Y,q,M,V,D);if(M==="color")B.vertexColorSpace=U.vertexColorSpace;O.attributes.push(B)}if(R===H.TRIANGULAR_MESH)O.index=W(H,Y,q);return H.destroy(q),O}function W(H,Y,X){let E=X.num_faces()*3,G=E*4,q=H._malloc(G);Y.GetTrianglesUInt32Array(X,G,q);let F=new Uint32Array(H.HEAPF32.buffer,q,E).slice();return H._free(q),{array:F,itemSize:1}}function Z(H,Y,X,U,E,G){let q=X.num_points(),F=G.num_components(),R=K(H,E),O=F*E.BYTES_PER_ELEMENT,M=Math.ceil(O/4)*4,V=M/E.BYTES_PER_ELEMENT,D=q*O,k=q*M,B=H._malloc(D);Y.GetAttributeDataArrayForAllPoints(X,G,R,D,B);let C=new E(H.HEAPF32.buffer,B,D/E.BYTES_PER_ELEMENT),z;if(O===M)z=C.slice();else{z=new E(k/E.BYTES_PER_ELEMENT);let _=0;for(let P=0,T=C.length;P<T;P++){for(let f=0;f<F;f++)z[_+f]=C[P*F+f];_+=V}}return H._free(B),{name:U,count:q,itemSize:F,array:z,stride:V}}function K(H,Y){switch(Y){case Float32Array:return H.DT_FLOAT32;case Int8Array:return H.DT_INT8;case Int16Array:return H.DT_INT16;case Int32Array:return H.DT_INT32;case Uint8Array:return H.DT_UINT8;case Uint16Array:return H.DT_UINT16;case Uint32Array:return H.DT_UINT32}}}function _Q($,J){if(J===aJ)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),$;if(J===t8||J===p6){let Q=$.getIndex();if(Q===null){let K=[],H=$.getAttribute("position");if(H!==void 0){for(let Y=0;Y<H.count;Y++)K.push(Y);$.setIndex(K),Q=$.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),$}let W=Q.count-2,Z=[];if(J===t8)for(let K=1;K<=W;K++)Z.push(Q.getX(0)),Z.push(Q.getX(K)),Z.push(Q.getX(K+1));else for(let K=0;K<W;K++)if(K%2===0)Z.push(Q.getX(K)),Z.push(Q.getX(K+1)),Z.push(Q.getX(K+2));else Z.push(Q.getX(K+2)),Z.push(Q.getX(K+1)),Z.push(Q.getX(K));if(Z.length/3!==W)console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");return $.setIndex(Z),$.clearGroups(),$}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",J),$}function QK($){let J=new Map,Q=new Map,W=$.clone();return WK($,W,function(Z,K){J.set(K,Z),Q.set(Z,K)}),W.traverse(function(Z){if(!Z.isSkinnedMesh)return;let K=Z,H=J.get(Z),Y=H.skeleton.bones;K.skeleton=H.skeleton.clone(),K.bindMatrix.copy(H.bindMatrix),K.skeleton.bones=Y.map(function(X){return Q.get(X)}),K.bind(K.skeleton,K.bindMatrix)}),W}function WK($,J,Q){Q($,J);for(let W=0;W<$.children.length;W++)WK($.children[W],J.children[W],Q)}class fQ extends F${constructor($){super($);this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(J){return new EK(J)}),this.register(function(J){return new GK(J)}),this.register(function(J){return new kK(J)}),this.register(function(J){return new DK(J)}),this.register(function(J){return new BK(J)}),this.register(function(J){return new FK(J)}),this.register(function(J){return new RK(J)}),this.register(function(J){return new OK(J)}),this.register(function(J){return new LK(J)}),this.register(function(J){return new NK(J)}),this.register(function(J){return new MK(J)}),this.register(function(J){return new qK(J)}),this.register(function(J){return new VK(J)}),this.register(function(J){return new wK(J)}),this.register(function(J){return new XK(J)}),this.register(function(J){return new AQ(J,n.EXT_MESHOPT_COMPRESSION)}),this.register(function(J){return new AQ(J,n.KHR_MESHOPT_COMPRESSION)}),this.register(function(J){return new CK(J)})}load($,J,Q,W){let Z=this,K;if(this.resourcePath!=="")K=this.resourcePath;else if(this.path!==""){let X=H$.extractUrlBase($);K=H$.resolveURL(X,this.path)}else K=H$.extractUrlBase($);this.manager.itemStart($);let H=function(X){if(W)W(X);else console.error(X);Z.manager.itemError($),Z.manager.itemEnd($)},Y=new Q8(this.manager);Y.setPath(this.path),Y.setResponseType("arraybuffer"),Y.setRequestHeader(this.requestHeader),Y.setWithCredentials(this.withCredentials),Y.load($,function(X){try{Z.parse(X,K,function(U){J(U),Z.manager.itemEnd($)},H)}catch(U){H(U)}},Q,H)}setDRACOLoader($){return this.dracoLoader=$,this}setKTX2Loader($){return this.ktx2Loader=$,this}setMeshoptDecoder($){return this.meshoptDecoder=$,this}register($){if(this.pluginCallbacks.indexOf($)===-1)this.pluginCallbacks.push($);return this}unregister($){if(this.pluginCallbacks.indexOf($)!==-1)this.pluginCallbacks.splice(this.pluginCallbacks.indexOf($),1);return this}parse($,J,Q,W){let Z,K={},H={},Y=new TextDecoder;if(typeof $==="string")Z=JSON.parse($);else if($ instanceof ArrayBuffer)if(Y.decode(new Uint8Array($,0,4))===zK){try{K[n.KHR_BINARY_GLTF]=new _K($)}catch(E){if(W)W(E);return}Z=JSON.parse(K[n.KHR_BINARY_GLTF].content)}else Z=JSON.parse(Y.decode($));else Z=$;if(Z.asset===void 0||Z.asset.version[0]<2){if(W)W(Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let X=new SK(Z,{path:J||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});X.fileLoader.setRequestHeader(this.requestHeader);for(let U=0;U<this.pluginCallbacks.length;U++){let E=this.pluginCallbacks[U](X);if(!E.name)console.error("THREE.GLTFLoader: Invalid plugin found: missing name");H[E.name]=E,K[E.name]=!0}if(Z.extensionsUsed)for(let U=0;U<Z.extensionsUsed.length;++U){let E=Z.extensionsUsed[U],G=Z.extensionsRequired||[];switch(E){case n.KHR_MATERIALS_UNLIT:K[E]=new UK;break;case n.KHR_DRACO_MESH_COMPRESSION:K[E]=new PK(Z,this.dracoLoader);break;case n.KHR_TEXTURE_TRANSFORM:K[E]=new IK;break;case n.KHR_MESH_QUANTIZATION:K[E]=new TK;break;default:if(G.indexOf(E)>=0&&H[E]===void 0)console.warn('THREE.GLTFLoader: Unknown extension "'+E+'".')}}X.setExtensions(K),X.setPlugins(H),X.parse(Q,W)}parseAsync($,J){let Q=this;return new Promise(function(W,Z){Q.parse($,J,W,Z)})}}function qU(){let $={};return{get:function(J){return $[J]},add:function(J,Q){$[J]=Q},remove:function(J){delete $[J]},removeAll:function(){$={}}}}function w0($,J,Q){let W=$.json.materials[J];if(W.extensions&&W.extensions[Q])return W.extensions[Q];return null}var n={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class XK{constructor($){this.parser=$,this.name=n.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let $=this.parser,J=this.parser.json.nodes||[];for(let Q=0,W=J.length;Q<W;Q++){let Z=J[Q];if(Z.extensions&&Z.extensions[this.name]&&Z.extensions[this.name].light!==void 0)$._addNodeRef(this.cache,Z.extensions[this.name].light)}}_loadLight($){let J=this.parser,Q="light:"+$,W=J.cache.get(Q);if(W)return W;let Z=J.json,Y=((Z.extensions&&Z.extensions[this.name]||{}).lights||[])[$],X,U=new h(16777215);if(Y.color!==void 0)U.setRGB(Y.color[0],Y.color[1],Y.color[2],a0);let E=Y.range!==void 0?Y.range:0;switch(Y.type){case"directional":X=new L7(U),X.target.position.set(0,0,-1),X.add(X.target);break;case"point":X=new O7(U),X.distance=E;break;case"spot":X=new R7(U),X.distance=E,Y.spot=Y.spot||{},Y.spot.innerConeAngle=Y.spot.innerConeAngle!==void 0?Y.spot.innerConeAngle:0,Y.spot.outerConeAngle=Y.spot.outerConeAngle!==void 0?Y.spot.outerConeAngle:Math.PI/4,X.angle=Y.spot.outerConeAngle,X.penumbra=1-Y.spot.innerConeAngle/Y.spot.outerConeAngle,X.target.position.set(0,0,-1),X.add(X.target);break;default:throw Error("THREE.GLTFLoader: Unexpected light type: "+Y.type)}if(X.position.set(0,0,0),V$(X,Y),Y.intensity!==void 0)X.intensity=Y.intensity;return X.name=J.createUniqueName(Y.name||"light_"+$),W=Promise.resolve(X),J.cache.add(Q,W),W}getDependency($,J){if($!=="light")return;return this._loadLight(J)}createNodeAttachment($){let J=this,Q=this.parser,Z=Q.json.nodes[$],H=(Z.extensions&&Z.extensions[this.name]||{}).light;if(H===void 0)return null;return this._loadLight(H).then(function(Y){return Q._getNodeRef(J.cache,H,Y)})}}class UK{constructor(){this.name=n.KHR_MATERIALS_UNLIT}getMaterialType(){return I0}extendParams($,J,Q){let W=[];$.color=new h(1,1,1),$.opacity=1;let Z=J.pbrMetallicRoughness;if(Z){if(Array.isArray(Z.baseColorFactor)){let K=Z.baseColorFactor;$.color.setRGB(K[0],K[1],K[2],a0),$.opacity=K[3]}if(Z.baseColorTexture!==void 0)W.push(Q.assignTexture($,"map",Z.baseColorTexture,d0))}return Promise.all(W)}}class NK{constructor($){this.parser=$,this.name=n.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams($,J){let Q=w0(this.parser,$,this.name);if(Q===null)return Promise.resolve();if(Q.emissiveStrength!==void 0)J.emissiveIntensity=Q.emissiveStrength;return Promise.resolve()}}class EK{constructor($){this.parser=$,this.name=n.KHR_MATERIALS_CLEARCOAT}getMaterialType($){return w0(this.parser,$,this.name)!==null?$$:null}extendMaterialParams($,J){let Q=w0(this.parser,$,this.name);if(Q===null)return Promise.resolve();let W=[];if(Q.clearcoatFactor!==void 0)J.clearcoat=Q.clearcoatFactor;if(Q.clearcoatTexture!==void 0)W.push(this.parser.assignTexture(J,"clearcoatMap",Q.clearcoatTexture));if(Q.clearcoatRoughnessFactor!==void 0)J.clearcoatRoughness=Q.clearcoatRoughnessFactor;if(Q.clearcoatRoughnessTexture!==void 0)W.push(this.parser.assignTexture(J,"clearcoatRoughnessMap",Q.clearcoatRoughnessTexture));if(Q.clearcoatNormalTexture!==void 0){if(W.push(this.parser.assignTexture(J,"clearcoatNormalMap",Q.clearcoatNormalTexture)),Q.clearcoatNormalTexture.scale!==void 0){let Z=Q.clearcoatNormalTexture.scale;J.clearcoatNormalScale=new S(Z,Z)}}return Promise.all(W)}}class GK{constructor($){this.parser=$,this.name=n.KHR_MATERIALS_DISPERSION}getMaterialType($){return w0(this.parser,$,this.name)!==null?$$:null}extendMaterialParams($,J){let Q=w0(this.parser,$,this.name);if(Q===null)return Promise.resolve();return J.dispersion=Q.dispersion!==void 0?Q.dispersion:0,Promise.resolve()}}class qK{constructor($){this.parser=$,this.name=n.KHR_MATERIALS_IRIDESCENCE}getMaterialType($){return w0(this.parser,$,this.name)!==null?$$:null}extendMaterialParams($,J){let Q=w0(this.parser,$,this.name);if(Q===null)return Promise.resolve();let W=[];if(Q.iridescenceFactor!==void 0)J.iridescence=Q.iridescenceFactor;if(Q.iridescenceTexture!==void 0)W.push(this.parser.assignTexture(J,"iridescenceMap",Q.iridescenceTexture));if(Q.iridescenceIor!==void 0)J.iridescenceIOR=Q.iridescenceIor;if(J.iridescenceThicknessRange===void 0)J.iridescenceThicknessRange=[100,400];if(Q.iridescenceThicknessMinimum!==void 0)J.iridescenceThicknessRange[0]=Q.iridescenceThicknessMinimum;if(Q.iridescenceThicknessMaximum!==void 0)J.iridescenceThicknessRange[1]=Q.iridescenceThicknessMaximum;if(Q.iridescenceThicknessTexture!==void 0)W.push(this.parser.assignTexture(J,"iridescenceThicknessMap",Q.iridescenceThicknessTexture));return Promise.all(W)}}class FK{constructor($){this.parser=$,this.name=n.KHR_MATERIALS_SHEEN}getMaterialType($){return w0(this.parser,$,this.name)!==null?$$:null}extendMaterialParams($,J){let Q=w0(this.parser,$,this.name);if(Q===null)return Promise.resolve();let W=[];if(J.sheenColor=new h(0,0,0),J.sheenRoughness=0,J.sheen=1,Q.sheenColorFactor!==void 0){let Z=Q.sheenColorFactor;J.sheenColor.setRGB(Z[0],Z[1],Z[2],a0)}if(Q.sheenRoughnessFactor!==void 0)J.sheenRoughness=Q.sheenRoughnessFactor;if(Q.sheenColorTexture!==void 0)W.push(this.parser.assignTexture(J,"sheenColorMap",Q.sheenColorTexture,d0));if(Q.sheenRoughnessTexture!==void 0)W.push(this.parser.assignTexture(J,"sheenRoughnessMap",Q.sheenRoughnessTexture));return Promise.all(W)}}class RK{constructor($){this.parser=$,this.name=n.KHR_MATERIALS_TRANSMISSION}getMaterialType($){return w0(this.parser,$,this.name)!==null?$$:null}extendMaterialParams($,J){let Q=w0(this.parser,$,this.name);if(Q===null)return Promise.resolve();let W=[];if(Q.transmissionFactor!==void 0)J.transmission=Q.transmissionFactor;if(Q.transmissionTexture!==void 0)W.push(this.parser.assignTexture(J,"transmissionMap",Q.transmissionTexture));return Promise.all(W)}}class OK{constructor($){this.parser=$,this.name=n.KHR_MATERIALS_VOLUME}getMaterialType($){return w0(this.parser,$,this.name)!==null?$$:null}extendMaterialParams($,J){let Q=w0(this.parser,$,this.name);if(Q===null)return Promise.resolve();let W=[];if(J.thickness=Q.thicknessFactor!==void 0?Q.thicknessFactor:0,Q.thicknessTexture!==void 0)W.push(this.parser.assignTexture(J,"thicknessMap",Q.thicknessTexture));J.attenuationDistance=Q.attenuationDistance||1/0;let Z=Q.attenuationColor||[1,1,1];return J.attenuationColor=new h().setRGB(Z[0],Z[1],Z[2],a0),Promise.all(W)}}class LK{constructor($){this.parser=$,this.name=n.KHR_MATERIALS_IOR}getMaterialType($){return w0(this.parser,$,this.name)!==null?$$:null}extendMaterialParams($,J){let Q=w0(this.parser,$,this.name);if(Q===null)return Promise.resolve();if(J.ior=Q.ior!==void 0?Q.ior:1.5,J.ior===0)J.ior=1000;return Promise.resolve()}}class MK{constructor($){this.parser=$,this.name=n.KHR_MATERIALS_SPECULAR}getMaterialType($){return w0(this.parser,$,this.name)!==null?$$:null}extendMaterialParams($,J){let Q=w0(this.parser,$,this.name);if(Q===null)return Promise.resolve();let W=[];if(J.specularIntensity=Q.specularFactor!==void 0?Q.specularFactor:1,Q.specularTexture!==void 0)W.push(this.parser.assignTexture(J,"specularIntensityMap",Q.specularTexture));let Z=Q.specularColorFactor||[1,1,1];if(J.specularColor=new h().setRGB(Z[0],Z[1],Z[2],a0),Q.specularColorTexture!==void 0)W.push(this.parser.assignTexture(J,"specularColorMap",Q.specularColorTexture,d0));return Promise.all(W)}}class wK{constructor($){this.parser=$,this.name=n.EXT_MATERIALS_BUMP}getMaterialType($){return w0(this.parser,$,this.name)!==null?$$:null}extendMaterialParams($,J){let Q=w0(this.parser,$,this.name);if(Q===null)return Promise.resolve();let W=[];if(J.bumpScale=Q.bumpFactor!==void 0?Q.bumpFactor:1,Q.bumpTexture!==void 0)W.push(this.parser.assignTexture(J,"bumpMap",Q.bumpTexture));return Promise.all(W)}}class VK{constructor($){this.parser=$,this.name=n.KHR_MATERIALS_ANISOTROPY}getMaterialType($){return w0(this.parser,$,this.name)!==null?$$:null}extendMaterialParams($,J){let Q=w0(this.parser,$,this.name);if(Q===null)return Promise.resolve();let W=[];if(Q.anisotropyStrength!==void 0)J.anisotropy=Q.anisotropyStrength;if(Q.anisotropyRotation!==void 0)J.anisotropyRotation=Q.anisotropyRotation;if(Q.anisotropyTexture!==void 0)W.push(this.parser.assignTexture(J,"anisotropyMap",Q.anisotropyTexture));return Promise.all(W)}}class kK{constructor($){this.parser=$,this.name=n.KHR_TEXTURE_BASISU}loadTexture($){let J=this.parser,Q=J.json,W=Q.textures[$];if(!W.extensions||!W.extensions[this.name])return null;let Z=W.extensions[this.name],K=J.options.ktx2Loader;if(!K)if(Q.extensionsRequired&&Q.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");else return null;return J.loadTextureImage($,Z.source,K)}}class DK{constructor($){this.parser=$,this.name=n.EXT_TEXTURE_WEBP}loadTexture($){let J=this.name,Q=this.parser,W=Q.json,Z=W.textures[$];if(!Z.extensions||!Z.extensions[J])return null;let K=Z.extensions[J],H=W.images[K.source],Y=Q.textureLoader;if(H.uri){let X=Q.options.manager.getHandler(H.uri);if(X!==null)Y=X}return Q.loadTextureImage($,K.source,Y)}}class BK{constructor($){this.parser=$,this.name=n.EXT_TEXTURE_AVIF}loadTexture($){let J=this.name,Q=this.parser,W=Q.json,Z=W.textures[$];if(!Z.extensions||!Z.extensions[J])return null;let K=Z.extensions[J],H=W.images[K.source],Y=Q.textureLoader;if(H.uri){let X=Q.options.manager.getHandler(H.uri);if(X!==null)Y=X}return Q.loadTextureImage($,K.source,Y)}}class AQ{constructor($,J){this.name=J,this.parser=$}loadBufferView($){let J=this.parser.json,Q=J.bufferViews[$];if(Q.extensions&&Q.extensions[this.name]){let W=Q.extensions[this.name],Z=this.parser.getDependency("buffer",W.buffer),K=this.parser.options.meshoptDecoder;if(!K||!K.supported)if(J.extensionsRequired&&J.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");else return null;return Z.then(function(H){let Y=W.byteOffset||0,X=W.byteLength||0,U=W.count,E=W.byteStride,G=new Uint8Array(H,Y,X);if(K.decodeGltfBufferAsync)return K.decodeGltfBufferAsync(U,E,G,W.mode,W.filter).then(function(q){return q.buffer});else return K.ready.then(function(){let q=new ArrayBuffer(U*E);return K.decodeGltfBuffer(new Uint8Array(q),U,E,G,W.mode,W.filter),q})})}else return null}}class CK{constructor($){this.name=n.EXT_MESH_GPU_INSTANCING,this.parser=$}createNodeMesh($){let J=this.parser.json,Q=J.nodes[$];if(!Q.extensions||!Q.extensions[this.name]||Q.mesh===void 0)return null;let W=J.meshes[Q.mesh];for(let X of W.primitives)if(X.mode!==Y$.TRIANGLES&&X.mode!==Y$.TRIANGLE_STRIP&&X.mode!==Y$.TRIANGLE_FAN&&X.mode!==void 0)return null;let K=Q.extensions[this.name].attributes,H=[],Y={};for(let X in K)H.push(this.parser.getDependency("accessor",K[X]).then((U)=>{return Y[X]=U,Y[X]}));if(H.length<1)return null;return H.push(this.parser.createNodeMesh($)),Promise.all(H).then((X)=>{let U=X.pop(),E=U.isGroup?U.children:[U],G=X[0].count,q=[];for(let F of E){let R=new u,O=new w,M=new r0,V=new w(1,1,1),D=new s$(F.geometry,F.material,G);for(let B=0;B<G;B++){if(Y.TRANSLATION)O.fromBufferAttribute(Y.TRANSLATION,B);if(Y.ROTATION)M.fromBufferAttribute(Y.ROTATION,B);if(Y.SCALE)V.fromBufferAttribute(Y.SCALE,B);D.setMatrixAt(B,R.compose(O,M,V))}let k=null;for(let B in Y)if(B==="_COLOR_0"){let C=Y[B];D.instanceColor=new c$(C.array,C.itemSize,C.normalized)}else if(B!=="TRANSLATION"&&B!=="ROTATION"&&B!=="SCALE"){if(k===null){let z=D.geometry;k=new Z0,k.name=z.name;for(let _ in z.attributes)k.setAttribute(_,z.attributes[_]);for(let _ in z.morphAttributes)k.morphAttributes[_]=z.morphAttributes[_];if(z.index!==null)k.setIndex(z.index);k.morphTargetsRelative=z.morphTargetsRelative;for(let _ of z.groups)k.addGroup(_.start,_.count,_.materialIndex);if(z.boundingBox!==null)k.boundingBox=z.boundingBox.clone();if(z.boundingSphere!==null)k.boundingSphere=z.boundingSphere.clone();k.drawRange.start=z.drawRange.start,k.drawRange.count=z.drawRange.count,k.userData=Object.assign({},z.userData),D.geometry=k}let C=Y[B];k.setAttribute(B,new c$(C.array,C.itemSize,C.normalized))}X0.prototype.copy.call(D,F),this.parser.assignFinalMaterial(D),q.push(D)}if(U.isGroup)return U.clear(),U.add(...q),U;return q[0]})}}var zK="glTF",J9=12,ZK={JSON:1313821514,BIN:5130562};class _K{constructor($){this.name=n.KHR_BINARY_GLTF,this.content=null,this.body=null;let J=new DataView($,0,J9),Q=new TextDecoder;if(this.header={magic:Q.decode(new Uint8Array($.slice(0,4))),version:J.getUint32(4,!0),length:J.getUint32(8,!0)},this.header.magic!==zK)throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");else if(this.header.version<2)throw Error("THREE.GLTFLoader: Legacy binary file detected.");let W=this.header.length-J9,Z=new DataView($,J9),K=0;while(K<W){let H=Z.getUint32(K,!0);K+=4;let Y=Z.getUint32(K,!0);if(K+=4,Y===ZK.JSON){let X=new Uint8Array($,J9+K,H);this.content=Q.decode(X)}else if(Y===ZK.BIN){let X=J9+K;this.body=$.slice(X,X+H)}K+=H}if(this.content===null)throw Error("THREE.GLTFLoader: JSON content not found.")}}class PK{constructor($,J){if(!J)throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=n.KHR_DRACO_MESH_COMPRESSION,this.json=$,this.dracoLoader=J,this.dracoLoader.preload()}decodePrimitive($,J){let Q=this.json,W=this.dracoLoader,Z=$.extensions[this.name].bufferView,K=$.extensions[this.name].attributes,H={},Y={},X={};for(let U in K){let E=SQ[U]||U.toLowerCase();H[E]=K[U]}for(let U in $.attributes){let E=SQ[U]||U.toLowerCase();if(K[U]!==void 0){let G=Q.accessors[$.attributes[U]],q=J6[G.componentType];X[E]=q.name,Y[E]=G.normalized===!0}}return J.getDependency("bufferView",Z).then(function(U){return new Promise(function(E,G){W.decodeDracoFile(U,function(q){for(let F in q.attributes){let R=q.attributes[F],O=Y[F];if(O!==void 0)R.normalized=O}E(q)},H,X,a0,G)})})}}class IK{constructor(){this.name=n.KHR_TEXTURE_TRANSFORM}extendTexture($,J){if((J.texCoord===void 0||J.texCoord===$.channel)&&J.offset===void 0&&J.rotation===void 0&&J.scale===void 0)return $;if($=$.clone(),J.texCoord!==void 0)$.channel=J.texCoord;if(J.offset!==void 0)$.offset.fromArray(J.offset);if(J.rotation!==void 0)$.rotation=J.rotation;if(J.scale!==void 0)$.repeat.fromArray(J.scale);if(J.rotation!==void 0){let Q=Math.cos($.rotation),W=Math.sin($.rotation);$.matrix.set($.repeat.x*Q,$.repeat.y*W,$.offset.x,-$.repeat.x*W,$.repeat.y*Q,$.offset.y,0,0,1),$.matrixAutoUpdate=!1}return $.needsUpdate=!0,$}}class TK{constructor(){this.name=n.KHR_MESH_QUANTIZATION}}class hQ extends h${constructor($,J,Q,W){super($,J,Q,W)}copySampleValue_($){let J=this.resultBuffer,Q=this.sampleValues,W=this.valueSize,Z=$*W*3+W;for(let K=0;K!==W;K++)J[K]=Q[Z+K];return J}interpolate_($,J,Q,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=H*2,X=H*3,U=W-J,E=(Q-J)/U,G=E*E,q=G*E,F=$*X,R=F-X,O=-2*q+3*G,M=q-G,V=1-O,D=M-G+E;for(let k=0;k!==H;k++){let B=K[R+k+H],C=K[R+k+Y]*U,z=K[F+k+H],_=K[F+k]*U;Z[k]=V*B+D*C+O*z+M*_}return Z}}var FU=new r0;class AK extends hQ{interpolate_($,J,Q,W){let Z=super.interpolate_($,J,Q,W);return FU.fromArray(Z).normalize().toArray(Z),Z}}var Y$={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},J6={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},KK={9728:t9,9729:g6,9984:nJ,9985:iJ,9986:sJ,9987:e9},HK={33071:mJ,33648:cJ,10497:x6},PQ={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},SQ={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Z8={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},RU={CUBICSPLINE:void 0,LINEAR:$7,STEP:oJ},IQ={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function OU($){if($.DefaultMaterial===void 0)$.DefaultMaterial=new v({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:fJ});return $.DefaultMaterial}function k8($,J,Q){for(let W in Q.extensions)if($[W]===void 0)J.userData.gltfExtensions=J.userData.gltfExtensions||{},J.userData.gltfExtensions[W]=Q.extensions[W]}function V$($,J){if(J.extras!==void 0)if(typeof J.extras==="object")Object.assign($.userData,J.extras);else console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+J.extras)}function LU($,J,Q){let W=!1,Z=!1,K=!1;for(let U=0,E=J.length;U<E;U++){let G=J[U];if(G.POSITION!==void 0)W=!0;if(G.NORMAL!==void 0)Z=!0;if(G.COLOR_0!==void 0)K=!0;if(W&&Z&&K)break}if(!W&&!Z&&!K)return Promise.resolve($);let H=[],Y=[],X=[];for(let U=0,E=J.length;U<E;U++){let G=J[U];if(W){let q=G.POSITION!==void 0?Q.getDependency("accessor",G.POSITION):$.attributes.position;H.push(q)}if(Z){let q=G.NORMAL!==void 0?Q.getDependency("accessor",G.NORMAL):$.attributes.normal;Y.push(q)}if(K){let q=G.COLOR_0!==void 0?Q.getDependency("accessor",G.COLOR_0):$.attributes.color;X.push(q)}}return Promise.all([Promise.all(H),Promise.all(Y),Promise.all(X)]).then(function(U){let E=U[0],G=U[1],q=U[2];if(W)$.morphAttributes.position=E;if(Z)$.morphAttributes.normal=G;if(K)$.morphAttributes.color=q;return $.morphTargetsRelative=!0,$})}function MU($,J){if($.updateMorphTargets(),J.weights!==void 0)for(let Q=0,W=J.weights.length;Q<W;Q++)$.morphTargetInfluences[Q]=J.weights[Q];if(J.extras&&Array.isArray(J.extras.targetNames)){let Q=J.extras.targetNames;if($.morphTargetInfluences.length===Q.length){$.morphTargetDictionary={};for(let W=0,Z=Q.length;W<Z;W++)$.morphTargetDictionary[Q[W]]=W}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function wU($){let J,Q=$.extensions&&$.extensions[n.KHR_DRACO_MESH_COMPRESSION];if(Q)J="draco:"+Q.bufferView+":"+Q.indices+":"+TQ(Q.attributes);else J=$.indices+":"+TQ($.attributes)+":"+$.mode;if($.targets!==void 0)for(let W=0,Z=$.targets.length;W<Z;W++)J+=":"+TQ($.targets[W]);return J}function TQ($){let J="",Q=Object.keys($).sort();for(let W=0,Z=Q.length;W<Z;W++)J+=Q[W]+":"+$[Q[W]]+";";return J}function jQ($){switch($){case Int8Array:return 0.007874015748031496;case Uint8Array:return 0.00392156862745098;case Int16Array:return 0.00003051850947599719;case Uint16Array:return 0.000015259021896696422;default:throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function VU($){if($.search(/\.jpe?g($|\?)/i)>0||$.search(/^data\:image\/jpeg/)===0)return"image/jpeg";if($.search(/\.webp($|\?)/i)>0||$.search(/^data\:image\/webp/)===0)return"image/webp";if($.search(/\.ktx2($|\?)/i)>0||$.search(/^data\:image\/ktx2/)===0)return"image/ktx2";return"image/png"}var kU=new u;class SK{constructor($={},J={}){this.json=$,this.extensions={},this.plugins={},this.options=J,this.cache=new qU,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let Q=!1,W=-1,Z=!1,K=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let H=navigator.userAgent;Q=/^((?!chrome|android).)*safari/i.test(H)===!0;let Y=H.match(/Version\/(\d+)/);W=Q&&Y?parseInt(Y[1],10):-1,Z=H.indexOf("Firefox")>-1,K=Z?H.match(/Firefox\/([0-9]+)\./)[1]:-1}if(typeof createImageBitmap>"u"||Q&&W<17||Z&&K<98)this.textureLoader=new q7(this.options.manager);else this.textureLoader=new M7(this.options.manager);if(this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Q8(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials")this.fileLoader.setWithCredentials(!0)}setExtensions($){this.extensions=$}setPlugins($){this.plugins=$}parse($,J){let Q=this,W=this.json,Z=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(K){return K._markDefs&&K._markDefs()}),Promise.all(this._invokeAll(function(K){return K.beforeRoot&&K.beforeRoot()})).then(function(){return Promise.all([Q.getDependencies("scene"),Q.getDependencies("animation"),Q.getDependencies("camera")])}).then(function(K){let H={scene:K[0][W.scene||0],scenes:K[0],animations:K[1],cameras:K[2],asset:W.asset,parser:Q,userData:{}};return k8(Z,H,W),V$(H,W),Promise.all(Q._invokeAll(function(Y){return Y.afterRoot&&Y.afterRoot(H)})).then(function(){for(let Y of H.scenes)Y.updateMatrixWorld();$(H)})}).catch(J)}_markDefs(){let $=this.json.nodes||[],J=this.json.skins||[],Q=this.json.meshes||[];for(let W=0,Z=J.length;W<Z;W++){let K=J[W].joints;for(let H=0,Y=K.length;H<Y;H++)$[K[H]].isBone=!0}for(let W=0,Z=$.length;W<Z;W++){let K=$[W];if(K.mesh!==void 0){if(this._addNodeRef(this.meshCache,K.mesh),K.skin!==void 0)Q[K.mesh].isSkinnedMesh=!0}if(K.camera!==void 0)this._addNodeRef(this.cameraCache,K.camera)}}_addNodeRef($,J){if(J===void 0)return;if($.refs[J]===void 0)$.refs[J]=$.uses[J]=0;$.refs[J]++}_getNodeRef($,J,Q){if($.refs[J]<=1)return Q;let W=Q.clone(),Z=(K,H)=>{let Y=this.associations.get(K);if(Y!=null)this.associations.set(H,Y);for(let[X,U]of K.children.entries())Z(U,H.children[X])};return Z(Q,W),W.name+="_instance_"+$.uses[J]++,W}_invokeOne($){let J=Object.values(this.plugins);J.push(this);for(let Q=0;Q<J.length;Q++){let W=$(J[Q]);if(W)return W}return null}_invokeAll($){let J=Object.values(this.plugins);J.unshift(this);let Q=[];for(let W=0;W<J.length;W++){let Z=$(J[W]);if(Z)Q.push(Z)}return Q}getDependency($,J){let Q=$+":"+J,W=this.cache.get(Q);if(!W){switch($){case"scene":W=this.loadScene(J);break;case"node":W=this._invokeOne(function(Z){return Z.loadNode&&Z.loadNode(J)});break;case"mesh":W=this._invokeOne(function(Z){return Z.loadMesh&&Z.loadMesh(J)});break;case"accessor":W=this.loadAccessor(J);break;case"bufferView":W=this._invokeOne(function(Z){return Z.loadBufferView&&Z.loadBufferView(J)});break;case"buffer":W=this.loadBuffer(J);break;case"material":W=this._invokeOne(function(Z){return Z.loadMaterial&&Z.loadMaterial(J)});break;case"texture":W=this._invokeOne(function(Z){return Z.loadTexture&&Z.loadTexture(J)});break;case"skin":W=this.loadSkin(J);break;case"animation":W=this._invokeOne(function(Z){return Z.loadAnimation&&Z.loadAnimation(J)});break;case"camera":W=this.loadCamera(J);break;default:if(W=this._invokeOne(function(Z){return Z!=this&&Z.getDependency&&Z.getDependency($,J)}),!W)throw Error("Unknown type: "+$);break}this.cache.add(Q,W)}return W}getDependencies($){let J=this.cache.get($);if(!J){let Q=this,W=this.json[$+($==="mesh"?"es":"s")]||[];J=Promise.all(W.map(function(Z,K){return Q.getDependency($,K)})),this.cache.add($,J)}return J}loadBuffer($){let J=this.json.buffers[$],Q=this.fileLoader;if(J.type&&J.type!=="arraybuffer")throw Error("THREE.GLTFLoader: "+J.type+" buffer type is not supported.");if(J.uri===void 0&&$===0)return Promise.resolve(this.extensions[n.KHR_BINARY_GLTF].body);let W=this.options;return new Promise(function(Z,K){Q.load(H$.resolveURL(J.uri,W.path),Z,void 0,function(){K(Error('THREE.GLTFLoader: Failed to load buffer "'+J.uri+'".'))})})}loadBufferView($){let J=this.json.bufferViews[$];return this.getDependency("buffer",J.buffer).then(function(Q){let W=J.byteLength||0,Z=J.byteOffset||0;return Q.slice(Z,Z+W)})}loadAccessor($){let J=this,Q=this.json,W=this.json.accessors[$];if(W.bufferView===void 0&&W.sparse===void 0){let K=PQ[W.type],H=J6[W.componentType],Y=W.normalized===!0,X=new H(W.count*K);return Promise.resolve(new M0(X,K,Y))}let Z=[];if(W.bufferView!==void 0)Z.push(this.getDependency("bufferView",W.bufferView));else Z.push(null);if(W.sparse!==void 0)Z.push(this.getDependency("bufferView",W.sparse.indices.bufferView)),Z.push(this.getDependency("bufferView",W.sparse.values.bufferView));return Promise.all(Z).then(function(K){let H=K[0],Y=PQ[W.type],X=J6[W.componentType],U=X.BYTES_PER_ELEMENT,E=U*Y,G=W.byteOffset||0,q=W.bufferView!==void 0?Q.bufferViews[W.bufferView].byteStride:void 0,F=W.normalized===!0,R,O;if(q&&q!==E){let M=Math.floor(G/q),V="InterleavedBuffer:"+W.bufferView+":"+W.componentType+":"+M+":"+W.count,D=J.cache.get(V);if(!D)R=new X(H,M*q,W.count*q/U),D=new n$(R,q/U),J.cache.add(V,D);O=new M$(D,Y,G%q/U,F)}else{if(H===null)R=new X(W.count*Y);else R=new X(H,G,W.count*Y);O=new M0(R,Y,F)}if(W.sparse!==void 0){let M=PQ.SCALAR,V=J6[W.sparse.indices.componentType],D=W.sparse.indices.byteOffset||0,k=W.sparse.values.byteOffset||0,B=new V(K[1],D,W.sparse.count*M),C=new X(K[2],k,W.sparse.count*Y);if(H!==null)O=new M0(O.array.slice(),O.itemSize,O.normalized);O.normalized=!1;for(let z=0,_=B.length;z<_;z++){let P=B[z];if(O.setX(P,C[z*Y]),Y>=2)O.setY(P,C[z*Y+1]);if(Y>=3)O.setZ(P,C[z*Y+2]);if(Y>=4)O.setW(P,C[z*Y+3]);if(Y>=5)throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}O.normalized=F}return O})}loadTexture($){let J=this.json,Q=this.options,Z=J.textures[$].source,K=J.images[Z],H=this.textureLoader;if(K.uri){let Y=Q.manager.getHandler(K.uri);if(Y!==null)H=Y}return this.loadTextureImage($,Z,H)}loadTextureImage($,J,Q){let W=this,Z=this.json,K=Z.textures[$],H=Z.images[J],Y=(H.uri||H.bufferView)+":"+K.sampler;if(this.textureCache[Y])return this.textureCache[Y];let X=this.loadImageSource(J,Q).then(function(U){if(U.flipY=!1,U.name=K.name||H.name||"",U.name===""&&typeof H.uri==="string"&&H.uri.startsWith("data:image/")===!1)U.name=H.uri;let G=(Z.samplers||{})[K.sampler]||{};return U.magFilter=KK[G.magFilter]||g6,U.minFilter=KK[G.minFilter]||e9,U.wrapS=HK[G.wrapS]||x6,U.wrapT=HK[G.wrapT]||x6,U.generateMipmaps=!U.isCompressedTexture&&U.minFilter!==t9&&U.minFilter!==g6,W.associations.set(U,{textures:$}),U}).catch(function(){return null});return this.textureCache[Y]=X,X}loadImageSource($,J){let Q=this,W=this.json,Z=this.options;if(this.sourceCache[$]!==void 0)return this.sourceCache[$].then((E)=>E.clone());let K=W.images[$],H=self.URL||self.webkitURL,Y=K.uri||"",X=!1;if(K.bufferView!==void 0)Y=Q.getDependency("bufferView",K.bufferView).then(function(E){X=!0;let G=new Blob([E],{type:K.mimeType});return Y=H.createObjectURL(G),Y});else if(K.uri===void 0)throw Error("THREE.GLTFLoader: Image "+$+" is missing URI and bufferView");let U=Promise.resolve(Y).then(function(E){return new Promise(function(G,q){let F=G;if(J.isImageBitmapLoader===!0)F=function(R){let O=new u0(R);O.needsUpdate=!0,G(O)};J.load(H$.resolveURL(E,Z.path),F,void 0,q)})}).then(function(E){if(X===!0)H.revokeObjectURL(Y);return V$(E,K),E.userData.mimeType=K.mimeType||VU(K.uri),E}).catch(function(E){throw console.error("THREE.GLTFLoader: Couldn't load texture",Y),E});return this.sourceCache[$]=U,U}assignTexture($,J,Q,W){let Z=this;return this.getDependency("texture",Q.index).then(function(K){if(!K)return null;if(Q.texCoord!==void 0&&Q.texCoord>0)K=K.clone(),K.channel=Q.texCoord;if(Z.extensions[n.KHR_TEXTURE_TRANSFORM]){let H=Q.extensions!==void 0?Q.extensions[n.KHR_TEXTURE_TRANSFORM]:void 0;if(H){let Y=Z.associations.get(K);K=Z.extensions[n.KHR_TEXTURE_TRANSFORM].extendTexture(K,H),Z.associations.set(K,Y)}}if(W!==void 0)K.colorSpace=W;return $[J]=K,K})}assignFinalMaterial($){let{geometry:J,material:Q}=$,W=J.attributes.tangent===void 0,Z=J.attributes.color!==void 0,K=J.attributes.normal===void 0;if($.isPoints){let H="PointsMaterial:"+Q.uuid,Y=this.cache.get(H);if(!Y)Y=new w$,Z$.prototype.copy.call(Y,Q),Y.color.copy(Q.color),Y.map=Q.map,Y.sizeAttenuation=!1,this.cache.add(H,Y);Q=Y}else if($.isLine){let H="LineBasicMaterial:"+Q.uuid,Y=this.cache.get(H);if(!Y)Y=new w8,Z$.prototype.copy.call(Y,Q),Y.color.copy(Q.color),Y.map=Q.map,this.cache.add(H,Y);Q=Y}if(W||Z||K){let H="ClonedMaterial:"+Q.uuid+":";if(W)H+="derivative-tangents:";if(Z)H+="vertex-colors:";if(K)H+="flat-shading:";let Y=this.cache.get(H);if(!Y){if(Y=Q.clone(),Z)Y.vertexColors=!0;if(K)Y.flatShading=!0;if(W){if(Y.normalScale)Y.normalScale.y*=-1;if(Y.clearcoatNormalScale)Y.clearcoatNormalScale.y*=-1}this.cache.add(H,Y),this.associations.set(Y,this.associations.get(Q))}Q=Y}$.material=Q}getMaterialType(){return v}loadMaterial($){let J=this,Q=this.json,W=this.extensions,Z=Q.materials[$],K,H={},Y=Z.extensions||{},X=[];if(Y[n.KHR_MATERIALS_UNLIT]){let E=W[n.KHR_MATERIALS_UNLIT];K=E.getMaterialType(),X.push(E.extendParams(H,Z,J))}else{let E=Z.pbrMetallicRoughness||{};if(H.color=new h(1,1,1),H.opacity=1,Array.isArray(E.baseColorFactor)){let G=E.baseColorFactor;H.color.setRGB(G[0],G[1],G[2],a0),H.opacity=G[3]}if(E.baseColorTexture!==void 0)X.push(J.assignTexture(H,"map",E.baseColorTexture,d0));if(H.metalness=E.metallicFactor!==void 0?E.metallicFactor:1,H.roughness=E.roughnessFactor!==void 0?E.roughnessFactor:1,E.metallicRoughnessTexture!==void 0)X.push(J.assignTexture(H,"metalnessMap",E.metallicRoughnessTexture)),X.push(J.assignTexture(H,"roughnessMap",E.metallicRoughnessTexture));K=this._invokeOne(function(G){return G.getMaterialType&&G.getMaterialType($)}),X.push(Promise.all(this._invokeAll(function(G){return G.extendMaterialParams&&G.extendMaterialParams($,H)})))}if(Z.doubleSided===!0)H.side=R8;let U=Z.alphaMode||IQ.OPAQUE;if(U===IQ.BLEND)H.transparent=!0,H.depthWrite=!1;else if(H.transparent=!1,U===IQ.MASK)H.alphaTest=Z.alphaCutoff!==void 0?Z.alphaCutoff:0.5;if(Z.normalTexture!==void 0&&K!==I0){if(X.push(J.assignTexture(H,"normalMap",Z.normalTexture)),H.normalScale=new S(1,1),Z.normalTexture.scale!==void 0){let E=Z.normalTexture.scale;H.normalScale.set(E,E)}}if(Z.occlusionTexture!==void 0&&K!==I0){if(X.push(J.assignTexture(H,"aoMap",Z.occlusionTexture)),Z.occlusionTexture.strength!==void 0)H.aoMapIntensity=Z.occlusionTexture.strength}if(Z.emissiveFactor!==void 0&&K!==I0){let E=Z.emissiveFactor;H.emissive=new h().setRGB(E[0],E[1],E[2],a0)}if(Z.emissiveTexture!==void 0&&K!==I0)X.push(J.assignTexture(H,"emissiveMap",Z.emissiveTexture,d0));return Promise.all(X).then(function(){let E=new K(H);if(Z.name)E.name=Z.name;if(V$(E,Z),J.associations.set(E,{materials:$}),Z.extensions)k8(W,E,Z);return E})}createUniqueName($){let J=t.sanitizeNodeName($||"");if(J in this.nodeNamesUsed)return J+"_"+ ++this.nodeNamesUsed[J];else return this.nodeNamesUsed[J]=0,J}loadGeometries($){let J=this,Q=this.extensions,W=this.primitiveCache;function Z(H){return Q[n.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(H,J).then(function(Y){return YK(Y,H,J)})}let K=[];for(let H=0,Y=$.length;H<Y;H++){let X=$[H],U=wU(X),E=W[U];if(E)K.push(E.promise);else{let G;if(X.extensions&&X.extensions[n.KHR_DRACO_MESH_COMPRESSION])G=Z(X);else G=YK(new Z0,X,J);if(X.mode===Y$.TRIANGLE_STRIP)G=G.then((q)=>_Q(q,p6));else if(X.mode===Y$.TRIANGLE_FAN)G=G.then((q)=>_Q(q,t8));W[U]={primitive:X,promise:G},K.push(G)}}return Promise.all(K)}loadMesh($){let J=this,Q=this.json,W=this.extensions,Z=Q.meshes[$],K=Z.primitives,H=[];for(let Y=0,X=K.length;Y<X;Y++){let U=K[Y].material===void 0?OU(this.cache):this.getDependency("material",K[Y].material);H.push(U)}return H.push(J.loadGeometries(K)),Promise.all(H).then(async function(Y){let X=Y.slice(0,Y.length-1),U=Y[Y.length-1],E=[];for(let q=0,F=U.length;q<F;q++){let R=U[q],O=K[q],M,V=X[q];if(O.mode===Y$.TRIANGLES||O.mode===Y$.TRIANGLE_STRIP||O.mode===Y$.TRIANGLE_FAN||O.mode===void 0){let D=Z.isSkinnedMesh===!0,k=R.hasAttribute("skinIndex")&&R.hasAttribute("skinWeight");if(D&&k===!1)console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled.");if(M=D&&k?new W7(R,V):new y(R,V),M.isSkinnedMesh===!0)M.normalizeSkinWeights()}else if(O.mode===Y$.LINES)M=new K7(R,V);else if(O.mode===Y$.LINE_STRIP)M=new i$(R,V);else if(O.mode===Y$.LINE_LOOP)M=new H7(R,V);else if(O.mode===Y$.POINTS)M=new f$(R,V);else throw Error("THREE.GLTFLoader: Primitive mode unsupported: "+O.mode);if(Object.keys(M.geometry.morphAttributes).length>0)MU(M,Z);if(M.name=J.createUniqueName(Z.name||"mesh_"+$),V$(M,Z),O.extensions)k8(W,M,O);J.assignFinalMaterial(M),E.push(M)}for(let q=0,F=E.length;q<F;q++)J.associations.set(E[q],{meshes:$,primitives:q});if(E.length===1){if(Z.extensions)k8(W,E[0],Z);return E[0]}let G=new c;if(Z.extensions)k8(W,G,Z);J.associations.set(G,{meshes:$});for(let q=0,F=E.length;q<F;q++)G.add(E[q]);return G})}loadCamera($){let J,Q=this.json.cameras[$],W=Q[Q.type];if(!W){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}if(Q.type==="perspective")J=new e8(q$.radToDeg(W.yfov),W.aspectRatio||1,W.znear||1,W.zfar||2000000);else if(Q.type==="orthographic")J=new $9(-W.xmag,W.xmag,W.ymag,-W.ymag,W.znear,W.zfar);if(Q.name)J.name=this.createUniqueName(Q.name);return V$(J,Q),Promise.resolve(J)}loadSkin($){let J=this.json.skins[$],Q=[];for(let W=0,Z=J.joints.length;W<Z;W++)Q.push(this._loadNodeShallow(J.joints[W]));if(J.inverseBindMatrices!==void 0)Q.push(this.getDependency("accessor",J.inverseBindMatrices));else Q.push(null);return Promise.all(Q).then(function(W){let Z=W.pop(),K=W,H=[],Y=[];for(let X=0,U=K.length;X<U;X++){let E=K[X];if(E){H.push(E);let G=new u;if(Z!==null)G.fromArray(Z.array,X*16);Y.push(G)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',J.joints[X])}return new d6(H,Y)})}loadAnimation($){let J=this.json,Q=this,W=J.animations[$],Z=W.name?W.name:"animation_"+$,K=[],H=[],Y=[],X=[],U=[];for(let E=0,G=W.channels.length;E<G;E++){let q=W.channels[E],F=W.samplers[q.sampler],R=q.target,O=R.node,M=W.parameters!==void 0?W.parameters[F.input]:F.input,V=W.parameters!==void 0?W.parameters[F.output]:F.output;if(R.node===void 0)continue;K.push(this.getDependency("node",O)),H.push(this.getDependency("accessor",M)),Y.push(this.getDependency("accessor",V)),X.push(F),U.push(R)}return Promise.all([Promise.all(K),Promise.all(H),Promise.all(Y),Promise.all(X),Promise.all(U)]).then(function(E){let G=E[0],q=E[1],F=E[2],R=E[3],O=E[4],M=[];for(let D=0,k=G.length;D<k;D++){let B=G[D],C=q[D],z=F[D],_=R[D],P=O[D];if(B===void 0)continue;if(B.updateMatrix)B.updateMatrix();let T=Q._createAnimationTracks(B,C,z,_,P);if(T)for(let f=0;f<T.length;f++)M.push(T[f])}let V=new r6(Z,void 0,M);return V$(V,W),V})}createNodeMesh($){let J=this.json,Q=this,W=J.nodes[$];if(W.mesh===void 0)return null;return Q.getDependency("mesh",W.mesh).then(function(Z){let K=Q._getNodeRef(Q.meshCache,W.mesh,Z);if(W.weights!==void 0)K.traverse(function(H){if(!H.isMesh)return;for(let Y=0,X=W.weights.length;Y<X;Y++)H.morphTargetInfluences[Y]=W.weights[Y]});return K})}loadNode($){let J=this.json,Q=this,W=J.nodes[$],Z=Q._loadNodeShallow($),K=[],H=W.children||[];for(let X=0,U=H.length;X<U;X++)K.push(Q.getDependency("node",H[X]));let Y=W.skin===void 0?Promise.resolve(null):Q.getDependency("skin",W.skin);return Promise.all([Z,Promise.all(K),Y]).then(function(X){let U=X[0],E=X[1],G=X[2];if(G!==null)U.traverse(function(q){if(!q.isSkinnedMesh)return;q.bind(G,kU)});for(let q=0,F=E.length;q<F;q++)U.add(E[q]);if(U.userData.pivot!==void 0&&E.length>0){let q=U.userData.pivot,F=E[0];U.pivot=new w().fromArray(q),U.position.x-=q[0],U.position.y-=q[1],U.position.z-=q[2],F.position.set(0,0,0),delete U.userData.pivot}return U})}_loadNodeShallow($){let J=this.json,Q=this.extensions,W=this;if(this.nodeCache[$]!==void 0)return this.nodeCache[$];let Z=J.nodes[$],K=Z.name?W.createUniqueName(Z.name):"",H=[],Y=W._invokeOne(function(X){return X.createNodeMesh&&X.createNodeMesh($)});if(Y)H.push(Y);if(Z.camera!==void 0)H.push(W.getDependency("camera",Z.camera).then(function(X){return W._getNodeRef(W.cameraCache,Z.camera,X)}));return W._invokeAll(function(X){return X.createNodeAttachment&&X.createNodeAttachment($)}).forEach(function(X){H.push(X)}),this.nodeCache[$]=Promise.all(H).then(function(X){let U;if(Z.isBone===!0)U=new u6;else if(X.length>1)U=new c;else if(X.length===1)U=X[0];else U=new X0;if(U!==X[0])for(let E=0,G=X.length;E<G;E++)U.add(X[E]);if(Z.name)U.userData.name=Z.name,U.name=K;if(V$(U,Z),Z.extensions)k8(Q,U,Z);if(Z.matrix!==void 0){let E=new u;E.fromArray(Z.matrix),U.applyMatrix4(E)}else{if(Z.translation!==void 0)U.position.fromArray(Z.translation);if(Z.rotation!==void 0)U.quaternion.fromArray(Z.rotation);if(Z.scale!==void 0)U.scale.fromArray(Z.scale)}if(!W.associations.has(U))W.associations.set(U,{});else if(Z.mesh!==void 0&&W.meshCache.refs[Z.mesh]>1){let E=W.associations.get(U);W.associations.set(U,{...E})}return W.associations.get(U).nodes=$,U}),this.nodeCache[$]}loadScene($){let J=this.extensions,Q=this.json.scenes[$],W=this,Z=new c;if(Q.name)Z.name=W.createUniqueName(Q.name);if(V$(Z,Q),Q.extensions)k8(J,Z,Q);let K=Q.nodes||[],H=[];for(let Y=0,X=K.length;Y<X;Y++)H.push(W.getDependency("node",K[Y]));return Promise.all(H).then(function(Y){for(let U=0,E=Y.length;U<E;U++){let G=Y[U];if(G.parent!==null)Z.add(QK(G));else Z.add(G)}let X=(U)=>{let E=new Map;for(let[G,q]of W.associations)if(G instanceof Z$||G instanceof u0)E.set(G,q);return U.traverse((G)=>{let q=W.associations.get(G);if(q!=null)E.set(G,q)}),E};return W.associations=X(Z),Z})}_createAnimationTracks($,J,Q,W,Z){let K=[],H=$.name?$.name:$.uuid,Y=[];function X(q){if(q.morphTargetInfluences)Y.push(q.name?q.name:q.uuid)}if(Z8[Z.path]===Z8.weights){if(X($),$.isGroup)$.children.forEach(X)}else Y.push(H);let U;switch(Z8[Z.path]){case Z8.weights:U=e$;break;case Z8.rotation:U=v$;break;case Z8.translation:case Z8.scale:U=J8;break;default:switch(Q.itemSize){case 1:U=e$;break;case 2:case 3:default:U=J8;break}break}let E=W.interpolation!==void 0?RU[W.interpolation]:$7,G=this._getArrayFromAccessor(Q);for(let q=0,F=Y.length;q<F;q++){let R=new U(Y[q]+"."+Z8[Z.path],J.array,G,E);if(W.interpolation==="CUBICSPLINE")this._createCubicSplineTrackInterpolant(R);K.push(R)}return K}_getArrayFromAccessor($){let J=$.array;if($.normalized){let Q=jQ(J.constructor),W=new Float32Array(J.length);for(let Z=0,K=J.length;Z<K;Z++)W[Z]=J[Z]*Q;J=W}return J}_createCubicSplineTrackInterpolant($){$.createInterpolant=function(Q){return new(this instanceof v$?AK:hQ)(this.times,this.values,this.getValueSize()/3,Q)},$.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function DU($,J,Q){let W=J.attributes,Z=new h0;if(W.POSITION!==void 0){let Y=Q.json.accessors[W.POSITION],X=Y.min,U=Y.max;if(X!==void 0&&U!==void 0){if(Z.set(new w(X[0],X[1],X[2]),new w(U[0],U[1],U[2])),Y.normalized){let E=jQ(J6[Y.componentType]);Z.min.multiplyScalar(E),Z.max.multiplyScalar(E)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let K=J.targets;if(K!==void 0){let Y=new w,X=new w;for(let U=0,E=K.length;U<E;U++){let G=K[U];if(G.POSITION!==void 0){let q=Q.json.accessors[G.POSITION],F=q.min,R=q.max;if(F!==void 0&&R!==void 0){if(X.setX(Math.max(Math.abs(F[0]),Math.abs(R[0]))),X.setY(Math.max(Math.abs(F[1]),Math.abs(R[1]))),X.setZ(Math.max(Math.abs(F[2]),Math.abs(R[2]))),q.normalized){let O=jQ(J6[q.componentType]);X.multiplyScalar(O)}Y.max(X)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}Z.expandByVector(Y)}$.boundingBox=Z;let H=new e0;Z.getCenter(H.center),H.radius=Z.min.distanceTo(Z.max)/2,$.boundingSphere=H}function YK($,J,Q){let W=J.attributes,Z=[];function K(H,Y){return Q.getDependency("accessor",H).then(function(X){$.setAttribute(Y,X)})}for(let H in W){let Y=SQ[H]||H.toLowerCase();if(Y in $.attributes)continue;Z.push(K(W[H],Y))}if(J.indices!==void 0&&!$.index){let H=Q.getDependency("accessor",J.indices).then(function(Y){$.setIndex(Y)});Z.push(H)}if(A0.workingColorSpace!==a0&&"COLOR_0"in W)console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${A0.workingColorSpace}" not supported.`);return V$($,J),DU($,J,Q),Promise.all(Z).then(function(){return J.targets!==void 0?LU($,J.targets,Q):$})}var hK={hairstyles:"hairstyles",headAccessories:"head-accessories",outfits:"outfits",handAccessories:"hand-accessories",shoes:"shoes",faceWear:"face-wear",facialHair:"facial-hair",heldItems:"held-items",backItems:"back-items",neckwear:"neckwear"},vK={buildings:"buildings",trees:"trees",props:"props"},BU={hairstyles:{id:"",name:"None",path:"",fitPending:!1},headAccessories:{id:"",name:"None",path:"",fitPending:!1},outfits:{id:"",name:"Built-in",path:"",fitPending:!1},handAccessories:{id:"",name:"None",path:"",fitPending:!1},shoes:{id:"",name:"Built-in",path:"",fitPending:!1},faceWear:{id:"",name:"None",path:"",fitPending:!1},facialHair:{id:"",name:"None",path:"",fitPending:!1},heldItems:{id:"",name:"Empty hand",path:"",fitPending:!1},backItems:{id:"",name:"None",path:"",fitPending:!1},neckwear:{id:"",name:"None",path:"",fitPending:!1}};function CU($){return $.replace(/\.glb$/i,"").replace(/[_-]+/g," ").replace(/\s+/g," ").trim().replace(/\b\p{L}/gu,(J)=>J.toLocaleUpperCase())}function vQ($={}){return{approved:$.approved===!0,scale:Number.isFinite(Number($.scale))?Number($.scale):1,x:Number.isFinite(Number($.x))?Number($.x):0,y:Number.isFinite(Number($.y))?Number($.y):0,z:Number.isFinite(Number($.z))?Number($.z):0,rx:Number.isFinite(Number($.rx))?Number($.rx):0,ry:Number.isFinite(Number($.ry))?Number($.ry):0,rz:Number.isFinite(Number($.rz))?Number($.rz):0}}function yK($,J,Q="cosmetics",W={}){let Z=String($?.path||$?.name||"").split("/").pop();if(!Z||!/\.glb$/i.test(Z))return null;let K=Z.replace(/\.glb$/i,""),H=$.path||`assets/${Q}/${J}/${Z}`,Y=vQ(W[H]||$.fitReview||{});return{id:K,name:CU(Z),path:H,fitReview:Y,fitPending:Q==="cosmetics"&&!Y.approved}}function zU($={},J={}){return Object.fromEntries(Object.entries(hK).map(([Q,W])=>{let Z=new Set,K=(Array.isArray($[Q])?$[Q]:[]).map((H)=>yK(H,W,"cosmetics",J)).filter((H)=>H&&!Z.has(H.id)&&Z.add(H.id)).sort((H,Y)=>H.name.localeCompare(Y.name));return[Q,[BU[Q],...K]]}))}async function yQ($,J={}){try{let Q=await fetch($,{cache:"no-store"});if(!Q.ok)throw Error(`${$} ${Q.status}`);return await Q.json()}catch{return J}}async function _U(){let $=await yQ("assets/cosmetics/manifest.json",{fitReviews:{}}),J=$?.fitReviews&&!Array.isArray($.fitReviews)&&typeof $.fitReviews==="object"?$.fitReviews:{};return zU($,J)}function PU($={}){return Object.fromEntries(Object.entries(vK).map(([J,Q])=>{let W=new Set,Z=(Array.isArray($[J])?$[J]:[]).map((K)=>yK(K,Q,"environment-props")).filter((K)=>K&&!W.has(K.id)&&W.add(K.id)).map((K)=>({...K,category:J})).sort((K,H)=>K.name.localeCompare(H.name));return[J,Z]}))}async function IU(){return PU(await yQ("assets/environment-props/manifest.json"))}async function TU(){let $=await yQ("assets/minigames/manifest.json",{games:{}}),J=$?.games&&typeof $.games==="object"?$.games:{};return Object.fromEntries(Object.entries(J).map(([Q,W])=>[Q,{id:Q,name:String(W?.name||Q),props:(Array.isArray(W?.props)?W.props:[]).filter((Z)=>typeof Z?.path==="string"&&/\.glb$/i.test(Z.path))}]))}var bK={hairstyles:new w(0.92,0.55,0.34),headAccessories:new w(1,0.7,0.46),outfits:new w(0.78,1.1,0.54),handAccessories:new w(0.26,0.08,0.26),shoes:new w(0.28,0.16,0.42),faceWear:new w(0.82,0.42,0.28),facialHair:new w(0.62,0.42,0.12),heldItems:new w(0.72,0.92,0.32),backItems:new w(0.9,1.15,0.4),neckwear:new w(0.82,0.36,0.42)};function AU($=""){let J=String($).replace(/\\/g,"/").toLowerCase(),Q=Object.entries(hK).find(([,Z])=>J.includes(`/cosmetics/${Z}/`));if(Q)return{kind:"cosmetic",category:Q[0]};let W=Object.entries(vK).find(([,Z])=>J.includes(`/environment-props/${Z}/`));return W?{kind:"environment",category:W[0]}:null}function jK($,J){let Q=Math.cbrt($.x*$.y*$.z),W=Math.cbrt(J.x*J.y*J.z);if(!Number.isFinite(Q)||Q<=0.000001)return Number.POSITIVE_INFINITY;return["x","y","z"].reduce((Z,K)=>{let H=$[K]/Q,Y=J[K]/W;return Z+Math.abs(Math.log(Math.max(H,0.000001)/Y))},0)}function SU($,J){if(J?.kind==="cosmetic"){let Q=bK[J.category];if(!Q)return!1;let W=jK($,Q);return jK(new w($.x,$.z,$.y),Q)+0.22<W}if(J?.kind==="environment")return $.z>$.y*1.22;return!1}function fK($,J){let Q=AU(J);if(!$||!Q)return!1;$.updateMatrixWorld(!0);let W=new h0().setFromObject($).getSize(new w);if(SU(W,Q))return $.rotation.x-=Math.PI/2,$.userData.snugOrientationCorrection="z-up-to-y-up",$.updateMatrixWorld(!0),!0;return $.userData.snugOrientationCorrection="none",!1}var D7;function xK(){if(D7)return D7;return D7=(async()=>{let[$,J,Q]=await Promise.all([_U(),IU(),TU()]),W=Object.entries($).flatMap(([E,G])=>G.filter((q)=>q.id&&q.fitPending).map((q)=>({...q,category:E}))),Z=new zQ;Z.setDecoderPath("assets/vendor/draco/");let K=new fQ;K.setDRACOLoader(Z);let H=new Map;return{catalog:$,environment:J,minigames:Q,loadMinigameProps:async(E)=>{let G=Q[E]?.props||[];if(!H.has(E))H.set(E,Promise.all(G.map(async(F)=>{try{let R=await K.loadAsync(F.path);return{...F,scene:R.scene}}catch{return null}})).then((F)=>F.filter(Boolean)));return(await H.get(E)).map((F)=>({...F,scene:F.scene.clone(!0)}))},pendingReviews:W,approveReview:(E,G,q)=>{let F=$[E]?.find((O)=>O.id===G);if(!F)return null;F.fitReview={...vQ(q),approved:!0},F.fitPending=!1;let R=W.find((O)=>O.category===E&&O.id===G);if(R)R.fitReview=F.fitReview,R.fitPending=!1;return F},mergeReviews:(E={})=>{if(!E||Array.isArray(E)||typeof E!=="object")return{};let G={};return Object.values($).flat().forEach((q)=>{let F=q.path&&E[q.path];if(!F?.approved)return;let R={...vQ(F),approved:!0};q.fitReview=R,q.fitPending=!1,G[q.path]=R;let O=W.find((M)=>M.path===q.path);if(O)O.fitReview=R,O.fitPending=!1}),G},templateBounds:bK,draco:Z,orientAsset:fK,orientCosmetic:fK}})(),D7}var gQ=Object.freeze({lifecycle:["lobby","countdown","play","results","payout"],roster:{minimum:2,maximum:4,botFill:!0,disconnects:"keep-score"},input:{movement:"tap-to-move",action:"one context action"},state:{scope:"room",schema:["phase","players","scores","timer"]},solo:{required:!0,receipt:["before","payout","after"]},bots:["racer","chaser","guesser","collector"],achievements:["participate","win","personal-best"]}),r={coin:{name:"Coin Scramble",duration:30000,note:"Move through the plaza and scoop up the coins.",wave:0,solo:!0,bot:"collector",input:"move",payouts:[24,16,10,6],propFolder:"coin-scramble"},tag:{name:"Plaza Tag",duration:35000,note:"Stay nimble. If you’re it, catch someone.",wave:0,solo:!0,bot:"chaser",input:"move",payouts:[26,17,11,6],propFolder:"plaza-tag"},quiz:{name:"Room Quiz",duration:36000,note:"Answer in room chat. Fastest correct answer scores two.",wave:0,solo:!0,bot:"guesser",input:"action",payouts:[26,17,11,6],propFolder:"room-quiz"},balloon:{name:"Balloon Pop",duration:180000,note:"Tap floating balloons before they drift away.",wave:1,solo:!0,bot:"collector",input:"action",payouts:[28,18,12,7],propFolder:"balloon-pop"},sprint:{name:"Plaza Sprint",duration:240000,note:"Race through every glowing gate in order.",wave:1,solo:!0,bot:"racer",input:"move",payouts:[30,20,13,7],propFolder:"plaza-sprint"},fishing:{name:"Pond Fishing",duration:240000,note:"Cast when the pond ripple reaches the golden ring.",wave:1,solo:!0,bot:"collector",input:"action",payouts:[30,20,13,7],propFolder:"pond-fishing"},floor:{name:"Tumble Tiles",duration:45000,note:"Blinking tiles are about to drop. Stay on the floor until the end.",wave:2,solo:!1,bot:"racer",input:"move",payouts:[28,18,12,7],propFolder:"tumble-tiles"},connect4:{name:"Four in a Row",duration:90000,note:"Tap a column on the 3D board. First to connect four wins.",wave:3,solo:!1,bot:"guesser",input:"action",payouts:[34,22,14,8],propFolder:"four-in-a-row"},tictactoe:{name:"Noughts & Crosses",duration:60000,note:"Tap a square on the 3D board and make a line of three.",wave:3,solo:!1,bot:"guesser",input:"action",payouts:[30,20,13,7],propFolder:"noughts-and-crosses"},scavenger:{name:"Village Scavenger Hunt",duration:45000,note:"Search the whole village for eight glowing keepsakes.",wave:5,solo:!1,bot:"collector",input:"move",payouts:[28,18,12,7],propFolder:"village-scavenger"},relay:{name:"Obstacle Relay",duration:45000,note:"Run the six checkpoints in order before time runs out.",wave:4,solo:!1,bot:"racer",input:"move",payouts:[28,18,12,7],propFolder:"obstacle-relay"},potato:{name:"Hot Potato",duration:300000,note:"Pass the sizzling spud before the timer catches you.",wave:2,solo:!0,bot:"chaser",input:"action",payouts:[34,22,14,8],propFolder:"hot-potato"},simon:{name:"Mayor Says",duration:45000,note:"Match the mayor’s emote pattern in the right order.",wave:3,solo:!1,bot:"guesser",input:"action",payouts:[28,18,12,7],propFolder:"mayor-says"},hide:{name:"Hide & Seek",duration:360000,note:"Pick clever hiding spots, then spot every neighbor.",wave:2,solo:!0,bot:"chaser",input:"action",payouts:[36,24,15,8],propFolder:"hide-and-seek"},statues:{name:"Musical Statues",duration:240000,note:"Dance with the music and freeze when it stops.",wave:2,solo:!0,bot:"racer",input:"action",payouts:[30,20,13,7],propFolder:"musical-statues"},memory:{name:"Memory Match",duration:300000,note:"Turn over tiles and remember where every pair is hiding.",wave:3,solo:!0,bot:"guesser",input:"action",payouts:[34,22,14,8],propFolder:"memory-match"},pattern:{name:"Pattern Parade",duration:240000,note:"Watch the glowing-pad sequence, then repeat it.",wave:3,solo:!0,bot:"guesser",input:"action",payouts:[30,20,13,7],propFolder:"pattern-parade"},draw:{name:"Draw & Guess",duration:360000,note:"Read the sketch and make the fastest correct guess.",wave:3,solo:!0,bot:"guesser",input:"action",payouts:[36,24,15,8],propFolder:"draw-and-guess"},cats:{name:"Cat Herding",duration:300000,note:"Guide every wandering cat safely into the pen.",wave:4,solo:!0,bot:"collector",input:"action",payouts:[34,22,14,8],propFolder:"cat-herding"},bridge:{name:"Bridge Builders",duration:360000,note:"Gather planks and pegs for the Moonlight Footbridge.",wave:4,solo:!0,bot:"collector",input:"action",payouts:[36,24,15,8],propFolder:"bridge-builders"},curling:{name:"Coin Curling",duration:300000,note:"Choose your slide power and stop closest to the center.",wave:4,solo:!0,bot:"racer",input:"action",payouts:[34,22,14,8],propFolder:"coin-curling"},charades:{name:"Emote Charades",duration:300000,note:"Read the emote performance and guess the secret word.",wave:5,solo:!0,bot:"guesser",input:"action",payouts:[34,22,14,8],propFolder:"emote-charades"},sneaky:{name:"Sneaky Snug",duration:420000,note:"Watch the table, catch the bluff, and vote for the sneak.",wave:5,solo:!0,bot:"guesser",input:"action",payouts:[38,25,16,9],propFolder:"sneaky-snug"},snap:{name:"Scavenger Snap",duration:360000,note:"Frame each town sight as it appears on the photo list.",wave:5,solo:!0,bot:"collector",input:"action",payouts:[36,24,15,8],propFolder:"scavenger-snap"},puffs:{name:"Dodge Puffs",duration:240000,note:"Switch lanes and stay clear of every rolling puff.",wave:6,solo:!0,bot:"racer",input:"action",payouts:[30,20,13,7],propFolder:"dodge-puffs"},freeze:{name:"Freeze Tag",duration:300000,note:"Unfreeze teammates while keeping away from the tagger.",wave:6,solo:!0,bot:"chaser",input:"action",payouts:[34,22,14,8],propFolder:"freeze-tag"},treasure:{name:"Treasure Dig",duration:300000,note:"Dig the brightest spots and uncover the most treasure.",wave:6,solo:!0,bot:"collector",input:"action",payouts:[34,22,14,8],propFolder:"treasure-dig"},snowball:{name:"Snowball Toss",duration:240000,note:"Line up a snowball and hit the carnival targets.",wave:7,solo:!0,bot:"racer",input:"action",payouts:[30,20,13,7],propFolder:"snowball-toss"},lantern:{name:"Lantern Hunt",duration:300000,note:"Find the lanterns glowing in the festival-night shadows.",wave:7,solo:!0,bot:"collector",input:"action",payouts:[34,22,14,8],propFolder:"lantern-hunt"},petal:{name:"Petal Catch",duration:240000,note:"Catch golden petals and leave the grey ones drifting.",wave:7,solo:!0,bot:"collector",input:"action",payouts:[30,20,13,7],propFolder:"petal-catch"}};function jU($){let J=Math.max(0.5,Number($||30000)/60000),Q=Math.max(12,Math.round(8*(J+1)));return[Q,Math.max(8,Math.round(Q*0.68)),Math.max(6,Math.round(Q*0.48)),Math.max(4,Math.round(Q*0.32))]}Object.values(r).forEach(($)=>{$.payouts=jU($.duration)});var nQ=Object.keys(r),nK=nQ.filter(($)=>r[$].solo),sQ=Object.freeze([{uid:"bot-marigold",name:"Marigold",archetype:"racer"},{uid:"bot-basil",name:"Basil",archetype:"collector"},{uid:"bot-pip",name:"Pip",archetype:"guesser"}]);window.CylindricMinigames=Object.freeze({contract:gQ,get:($)=>r[$]?{id:$,...r[$]}:null,list:()=>nQ.map(($)=>({id:$,...r[$]})),snapshot:()=>({phase:n0(),players:[...N.currentGame?.players||[]],scores:{...h7()},timer:W6()})});var gK=[{q:"Which planet is known as the Red Planet?",a:"mars",choices:["Mars","Venus","Jupiter","Mercury"]},{q:"How many sides does a hexagon have?",a:"six",also:["6"],choices:["Six","Five","Seven","Eight"]},{q:"What is the largest ocean on Earth?",a:"pacific",also:["pacific ocean"],choices:["Pacific","Atlantic","Indian","Arctic"]},{q:"What do bees collect from flowers?",a:"nectar",choices:["Nectar","Dew","Seeds","Leaves"]},{q:"Which animal is famous for changing color?",a:"chameleon",choices:["Chameleon","Otter","Puffin","Badger"]},{q:"What is frozen water called?",a:"ice",choices:["Ice","Steam","Mist","Dew"]},{q:"How many days are in a leap year?",a:"366",also:["three hundred sixty six","three hundred and sixty six"],choices:["366","365","364","360"]},{q:"What is the opposite of north?",a:"south",choices:["South","East","West","Up"]},{q:"Which instrument has black and white keys?",a:"piano",choices:["Piano","Flute","Drum","Violin"]}],N={session:null,roomId:"plaza",roomName:"Village Plaza",isPrivate:!1,players:[],messages:[],minigameEvents:[],currentGame:null,position:{x:0,z:1.5,rotation:0},panel:null,polling:null,heartbeat:null,gameClock:null,busy:!1,rolling:!1,error:"",coinGroup:null,coinPositions:[],coinRoundId:"",claiming:new Set,actionBusy:!1,tagCooldownUntil:0,quizTimers:[],soloRoundId:"",soloBalanceBefore:null,soloResult:null,soloTagGroup:null,soloTagTarget:null,soloTagHits:0,voiceEnabled:!1,voiceBusy:!1,voiceError:"",voiceTuned:!1,microphoneStream:null,voiceTuneGraph:null,voiceUsers:[],localStream:null,audioContext:null,voicePeers:new Map,voiceMonitors:new Map,speaking:new Set,seenSignals:new Set,signalPolling:null,voiceHeartbeat:null,voicePollBusy:!1,voiceMeterRaf:0,partyArena:null,arenaRoundId:"",arenaRaycaster:new $6,arenaPointer:new S,floorEliminated:!1,pendingInvite:null,inviteArrival:!1,shopWorld:null,shopGroup:null,shops:[],nearbyShop:null,environmentWorld:null,environment:null,lastSafePosition:{x:0,y:0,z:0},audioUnlocked:!1,boardEvents:[],boardGame:null,boardOverlay:null,boardPolling:null,boardClock:null,boardBusy:!1,boardUseBoost:!1,boardLobby:null,boardJoinPending:!1,boardBotTimer:null,boardBotKey:"",wave1Overlay:null,wave1RoundId:"",wave1Busy:!1,challengeOverlay:null,challengeRoundId:"",challengeBusy:!1,challengeOpenTiles:[],challengeMatched:new Set,challengeSequenceProgress:0,challengeMemoryLocked:!1,minigameAssetGroup:null,minigameAssetRoundId:"",personalBests:{},roundBalanceBefore:{}},W0=($,J=document)=>J.querySelector($),fU=($)=>String($).split("/").map(encodeURIComponent).join("/"),p0=()=>W0(".profile-chip b")?.textContent?.trim()||"Player",K9=()=>W0(".avatar-dot")?.style?.background||"#ed765e";function hU(){let $=N.session?.app?.options||{};return String($.databaseURL||`https://${$.projectId||N.session?.projectId}-default-rtdb.firebaseio.com`).replace(/\/$/,"")}async function D0($,J={}){if(!N.session?.user)throw Error("Waiting for Firebase sign-in");let Q=await N.session.user.getIdToken(),[W,Z=""]=String($).split("?"),K=await fetch(`${hU()}/${fU(W)}.json${Z?`?${Z}`:""}`,{...J,headers:{"Content-Type":"application/json",Authorization:`Bearer ${Q}`,...J.headers||{}}});if(!K.ok){let Y=(await K.json().catch(()=>({})))?.error||`Realtime Database returned ${K.status}`;throw Error(Y)}return K.json().catch(()=>null)}function vU(){let J=crypto.getRandomValues(new Uint8Array(10));return Array.from(J,(Q)=>"abcdefghjkmnpqrstuvwxyz23456789"[Q%31]).join("")}function iQ($){let J=String($||"").trim();if(!J)return"";try{let Q=new URL(J);J=Q.searchParams.get("room")||Q.searchParams.get("join")||J}catch{}return J=decodeURIComponent(J).toLowerCase().replace(/^room-/,"").replace(/[^a-z2-9]/g,""),/^[a-z2-9]{10}$/.test(J)?`room-${J}`:""}function z7($=N.roomId){let J=String($||"").replace(/^room-/,"").toUpperCase();return J.length===10?`${J.slice(0,5)} ${J.slice(5)}`:J}function yU(){try{return iQ(new URLSearchParams(window.location.search).get("room")||new URLSearchParams(window.location.search).get("join")||"")}catch{return""}}N.pendingInvite=yU();async function sK($){await D0(`rooms/${$}/members/${N.session.uid}`,{method:"PUT",body:JSON.stringify(!0)})}async function bU(){if(N.busy)return;N.busy=!0,N.error="",N0();try{let $=`room-${vU()}`;await D0(`rooms/${$}`,{method:"PUT",body:JSON.stringify({name:`${p0()}’s family room`,private:!0,ownerId:N.session.uid,createdAt:Date.now(),members:{[N.session.uid]:!0}})}),await oQ($,`${p0()}’s family room`,!0)}catch($){N.error=O0($)}finally{N.busy=!1,N0()}}async function C7($,J={}){let Q=iQ($);if(!Q){N.error="That family code doesn’t look right.",N0();return}if(N.busy)return;N.busy=!0,N.error="",N0();try{if(await sK(Q),await oQ(Q,"Family room",!0),N.pendingInvite=null,J.arrival)N.inviteArrival=!0,Q6("rooms"),g("You’re in the family room")}catch(W){if(N.error=O0(W),J.arrival)Q6("rooms")}finally{N.busy=!1,N0()}}async function oQ($,J,Q){let W=N.roomId;if(N.session&&W!==$){if(D0(`presence/${W}/${N.session.uid}`,{method:"DELETE"}).catch(()=>{}),N.voiceEnabled)D0(`voicePresence/${W}/${N.session.uid}`,{method:"DELETE"}).catch(()=>{})}if(QW(),N.seenSignals.clear(),CH(),W9(),Z9(),N.soloRoundId="",N.soloResult=null,document.querySelector(".solo-result-backdrop")?.remove(),N.roomId=$,N.roomName=J,N.isPrivate=Q,!Q)N.inviteArrival=!1;if(N.players=[],N.messages=[],N.minigameEvents=[],N.voiceUsers=[],N.currentGame=null,N.error="",Q)await sK($);if(await pQ(),N.voiceEnabled)await lQ();await Q9(),R$(),B8(),N0()}async function pQ(){if(!N.session)return;await D0(`presence/${N.roomId}/${N.session.uid}`,{method:"PUT",body:JSON.stringify({uid:N.session.uid,name:p0().slice(0,18),outfit:K9(),x:Number(N.position.x.toFixed(3)),z:Number(N.position.z.toFixed(3)),rotation:Number(N.position.rotation.toFixed(3)),updatedAt:Date.now()})})}async function Q9(){if(!N.session)return;try{let[$,J,Q,W]=await Promise.all([D0(`presence/${N.roomId}`),D0(`messages/${N.roomId}?orderBy=%22createdAt%22&limitToLast=50`),D0(`minigames/${N.roomId}/events?orderBy=%22createdAt%22&limitToLast=50`),D0(`voicePresence/${N.roomId}`).catch(()=>null)]),Z=Date.now()-20000;if(N.players=Object.values($||{}).filter((K)=>K?.uid&&K.uid!==N.session.uid&&Number(K.updatedAt)>Z),N.voiceUsers=Object.values(W||{}).filter((K)=>K?.uid&&Number(K.updatedAt)>Z),N.messages=Object.entries(J||{}).map(([K,H])=>({id:K,...H})).filter((K)=>K?.text&&!String(K.text).startsWith("§TL§")).sort(pK).slice(-50),N.minigameEvents=Object.entries(Q||{}).map(([K,H])=>({id:K,...H})).filter((K)=>K?.type).sort(pK).slice(-50),XW(),N.voiceEnabled)eK();N.error="",window.dispatchEvent(new CustomEvent("snug-remote-players",{detail:{players:N.players}})),R$(),B8(),N0()}catch($){N.error=O0($),R$(),B8(),N0()}}function pK($,J){return Number($.createdAt||0)-Number(J.createdAt||0)||String($.id).localeCompare(String(J.id))}async function aQ($,J=p0()){let Q=String($||"").trim().replace(/\s+/g," ").slice(0,240);if(!Q||!N.session)return;return D0(`messages/${N.roomId}`,{method:"POST",body:JSON.stringify({uid:N.session.uid,name:String(J).slice(0,18),text:Q,createdAt:Date.now()})})}async function xU($){let J=String($||"").trim().replace(/\s+/g," ").slice(0,240);if(!J||!N.session)return;try{await ON(J),await aQ(J),await Q9()}catch(Q){N.error=O0(Q),N0()}}function O0($){let J=String($?.message||$||"");if(/permission|denied|unauthorized/i.test(J))return"Realtime Database rules need the included multiplayer rules before rooms and games can connect.";if(/failed to fetch|network/i.test(J))return"Rooms are offline right now. Your solo game still works.";return J||"Rooms couldn’t connect."}function iK($,J){if(navigator.clipboard?.writeText)navigator.clipboard.writeText($).then(()=>g(J)).catch(()=>lK($,J));else lK($,J)}function gU(){iK(z7().replace(" ",""),"Family code copied")}function pU(){let $=z7();iK(`Come join my family room in Selfie Social Society. Open the game, tap Family, and paste this code: ${$}`,"Family invite copied")}function lK($,J="Copied"){let Q=document.createElement("textarea");Q.value=$,Q.style.position="fixed",Q.style.opacity="0",document.body.appendChild(Q),Q.select(),document.execCommand("copy"),Q.remove(),g(J)}function g($){let J=W0(".multiplayer-toast");if(!J)J=document.createElement("div"),J.className="multiplayer-toast",document.body.appendChild(J);J.textContent=$,J.classList.add("show"),clearTimeout(g.timer),g.timer=setTimeout(()=>J.classList.remove("show"),1900)}function oK(){return Boolean(navigator.mediaDevices?.getUserMedia&&window.RTCPeerConnection)}function lU($){let J=window.AudioContext||window.webkitAudioContext;if(!J||!$)return{stream:$,cleanup:()=>{}};N.audioContext||=new J;let Q=N.audioContext,W=Q.createMediaStreamSource($),Z=Q.createGain(),K=Q.createGain(),H=Q.createDelay(0.04),Y=Q.createOscillator(),X=Q.createGain(),U=Q.createDynamicsCompressor(),E=Q.createMediaStreamDestination();return Z.gain.value=0.78,K.gain.value=0.22,H.delayTime.value=0.012,Y.frequency.value=5.2,X.gain.value=0.0015,U.threshold.value=-20,U.knee.value=16,U.ratio.value=2.2,U.attack.value=0.008,U.release.value=0.16,W.connect(Z).connect(U),W.connect(H).connect(K).connect(U),Y.connect(X).connect(H.delayTime),U.connect(E),Y.start(),{stream:E.stream,cleanup:()=>{try{Y.stop()}catch{}[W,Z,K,H,X,U].forEach((G)=>{try{G.disconnect()}catch{}}),E.stream.getTracks().forEach((G)=>G.stop())}}}function aK(){if(!N.microphoneStream)return;let $=N.localStream;if(N.voiceTuneGraph?.cleanup?.(),N.voiceTuneGraph=null,N.voiceTuned)N.voiceTuneGraph=lU(N.microphoneStream),N.localStream=N.voiceTuneGraph.stream;else N.localStream=N.microphoneStream;let J=N.localStream.getAudioTracks()[0];if(N.voicePeers.forEach((Q)=>{let W=Q.pc.getSenders().find((Z)=>Z.track?.kind==="audio");if(W&&J)W.replaceTrack(J).catch(()=>{})}),JW(N.session?.uid),$W(N.session?.uid,N.localStream),$&&$!==N.microphoneStream&&$!==N.localStream)$.getTracks().forEach((Q)=>Q.stop())}function rQ($){if(N.voiceTuned=Boolean($),N.voiceEnabled)aK();g(N.voiceTuned?"Light voice tune is on":"Voice tune is off"),window.dispatchEvent(new CustomEvent("snug-voice-tune-state",{detail:{enabled:N.voiceTuned}})),N0()}window.__snugVoiceTune={get enabled(){return N.voiceTuned},set:rQ};window.addEventListener("snug-voice-tune-request",($)=>rQ($.detail?.enabled));function rK($){return N.voiceUsers.some((J)=>J.uid===$)}async function lQ(){if(!N.voiceEnabled||!N.session)return;await D0(`voicePresence/${N.roomId}/${N.session.uid}`,{method:"PUT",body:JSON.stringify({uid:N.session.uid,name:p0().slice(0,18),updatedAt:Date.now()})})}async function tQ($,J){if(!N.session||!$)return;await D0(`voiceSignals/${N.roomId}/${$}`,{method:"POST",body:JSON.stringify({from:N.session.uid,to:$,type:J.type,sdp:J.sdp||"",candidate:J.candidate||"",createdAt:Date.now()})})}function eQ(){document.querySelectorAll("[data-voice-uid]").forEach((J)=>{let Q=N.speaking.has(J.dataset.voiceUid);J.classList.toggle("speaking",Q),J.classList.toggle("live",!Q&&rK(J.dataset.voiceUid))}),W0(".voice-toggle-dock")?.classList.toggle("speaking",N.speaking.has(N.session?.uid))}function $W($,J){if(!J||N.voiceMonitors.has($))return;try{let Q=window.AudioContext||window.webkitAudioContext;if(!Q)return;N.audioContext||=new Q;let W=N.audioContext.createMediaStreamSource(J),Z=N.audioContext.createAnalyser();if(Z.fftSize=256,Z.smoothingTimeConstant=0.72,W.connect(Z),N.voiceMonitors.set($,{source:W,analyser:Z,data:new Uint8Array(Z.frequencyBinCount)}),!N.voiceMeterRaf)tK()}catch{}}function tK(){N.voiceMeterRaf=requestAnimationFrame(tK);let $=new Set;N.voiceMonitors.forEach((Q,W)=>{Q.analyser.getByteTimeDomainData(Q.data);let Z=0;for(let K of Q.data){let H=(K-128)/128;Z+=H*H}if(Math.sqrt(Z/Q.data.length)>0.035)$.add(W)});let J=$.size!==N.speaking.size||[...$].some((Q)=>!N.speaking.has(Q));if(N.speaking=$,J)eQ(),window.dispatchEvent(new CustomEvent("snug-speaking-players",{detail:{uids:[...$]}}))}function JW($){let J=N.voiceMonitors.get($);try{J?.source?.disconnect()}catch{}if(N.voiceMonitors.delete($),N.speaking.delete($),!N.voiceMonitors.size&&N.voiceMeterRaf)cancelAnimationFrame(N.voiceMeterRaf),N.voiceMeterRaf=0;eQ(),window.dispatchEvent(new CustomEvent("snug-speaking-players",{detail:{uids:[...N.speaking]}}))}function _7($){let J=N.voicePeers.get($);if(!J)return;try{J.audio?.remove()}catch{}try{J.pc?.close()}catch{}N.voicePeers.delete($),JW($)}function QW(){[...N.voicePeers.keys()].forEach(_7)}function WW($){if(!N.voiceEnabled||!N.localStream||!$||$===N.session?.uid)return null;if(N.voicePeers.has($))return N.voicePeers.get($);let J=new RTCPeerConnection({iceServers:[]}),Q={pc:J,pendingCandidates:[],offered:!1,audio:null};return N.voicePeers.set($,Q),N.localStream.getTracks().forEach((W)=>J.addTrack(W,N.localStream)),J.onicecandidate=(W)=>{if(W.candidate)tQ($,{type:"candidate",candidate:JSON.stringify(W.candidate.toJSON())}).catch(()=>{})},J.ontrack=(W)=>{let Z=W.streams[0];if(!Z)return;let K=Q.audio;if(!K)K=document.createElement("audio"),K.className="voice-audio",K.autoplay=!0,K.playsInline=!0,document.body.appendChild(K),Q.audio=K;K.srcObject=Z,K.play().catch(()=>g("Tap the mic once to hear room voice")),$W($,Z)},J.onconnectionstatechange=()=>{if(["failed","closed"].includes(J.connectionState))_7($);if(R$(),N.panel)N0()},Q}async function uU($){let J=WW($);if(!J||J.offered||J.pc.signalingState!=="stable")return;J.offered=!0;let Q=await J.pc.createOffer();await J.pc.setLocalDescription(Q),await tQ($,{type:"offer",sdp:Q.sdp})}async function dU($,J){if(!J?.from||J.to!==N.session?.uid||J.from===N.session.uid)return;let Q=WW(J.from);if(!Q)return;if(J.type==="offer"){await Q.pc.setRemoteDescription({type:"offer",sdp:J.sdp});let W=await Q.pc.createAnswer();await Q.pc.setLocalDescription(W),await tQ(J.from,{type:"answer",sdp:W.sdp});for(let Z of Q.pendingCandidates.splice(0))await Q.pc.addIceCandidate(Z).catch(()=>{})}else if(J.type==="answer"&&Q.pc.signalingState==="have-local-offer"){await Q.pc.setRemoteDescription({type:"answer",sdp:J.sdp});for(let W of Q.pendingCandidates.splice(0))await Q.pc.addIceCandidate(W).catch(()=>{})}else if(J.type==="candidate"&&J.candidate){let W=new RTCIceCandidate(JSON.parse(J.candidate));if(Q.pc.remoteDescription)await Q.pc.addIceCandidate(W).catch(()=>{});else Q.pendingCandidates.push(W)}N.seenSignals.add($),D0(`voiceSignals/${N.roomId}/${N.session.uid}/${$}`,{method:"DELETE"}).catch(()=>{})}async function uK(){if(!N.voiceEnabled||!N.session||N.voicePollBusy)return;N.voicePollBusy=!0;try{let $=await D0(`voiceSignals/${N.roomId}/${N.session.uid}?orderBy=%22createdAt%22&limitToLast=80`);for(let[J,Q]of Object.entries($||{}).sort((W,Z)=>Number(W[1]?.createdAt||0)-Number(Z[1]?.createdAt||0))){if(N.seenSignals.has(J))continue;await dU(J,Q)}}catch($){N.voiceError=O0($)}finally{N.voicePollBusy=!1}}function eK(){if(!N.voiceEnabled||!N.session)return;let $=new Set(N.voiceUsers.map((J)=>J.uid).filter((J)=>J!==N.session.uid));[...N.voicePeers.keys()].forEach((J)=>{if(!$.has(J))_7(J)}),$.forEach((J)=>{if(WW(J),String(N.session.uid).localeCompare(String(J))<0)uU(J).catch(()=>_7(J))})}async function mU(){if(N.voiceBusy||N.voiceEnabled)return;if(!oK()){N.voiceError="Voice chat isn’t available in this browser.",g(N.voiceError),R$(),N0();return}N.voiceBusy=!0,N.voiceError="",R$(),N0();try{let $=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},video:!1});if(N.microphoneStream=$,N.localStream=$,N.voiceTuned)aK();N.voiceEnabled=!0,N.inviteArrival=!1,$W(N.session.uid,$),await N.audioContext?.resume?.(),await lQ(),clearInterval(N.signalPolling),clearInterval(N.voiceHeartbeat),N.signalPolling=setInterval(uK,700),N.voiceHeartbeat=setInterval(()=>lQ().catch(()=>{}),5000),await Q9(),await uK(),eK(),g("Room voice is on")}catch($){N.voiceError=/permission|denied|notallowed/i.test(String($?.name||$))?"Microphone permission was not granted.":O0($),g(N.voiceError),$H(!1)}finally{N.voiceBusy=!1,R$(),N0()}}function $H($=!0){if(N.session&&N.voiceEnabled)D0(`voicePresence/${N.roomId}/${N.session.uid}`,{method:"DELETE"}).catch(()=>{});if(N.voiceEnabled=!1,N.voiceUsers=N.voiceUsers.filter((J)=>J.uid!==N.session?.uid),N.voiceTuneGraph?.cleanup?.(),N.voiceTuneGraph=null,N.microphoneStream?.getTracks().forEach((J)=>J.stop()),N.localStream&&N.localStream!==N.microphoneStream)N.localStream.getTracks().forEach((J)=>J.stop());if(N.microphoneStream=null,N.localStream=null,QW(),JW(N.session?.uid),clearInterval(N.signalPolling),clearInterval(N.voiceHeartbeat),N.signalPolling=null,N.voiceHeartbeat=null,$)g("Room voice is off");R$(),N0()}function uQ(){if(N.voiceEnabled)$H();else mU()}function dK(){let $=[...N.voicePeers.values()].filter((Q)=>Q.pc.connectionState==="connected").length,J=!oK()?"Unavailable in this browser":N.voiceEnabled?`${$} connected · microphone live`:N.isPrivate?"Talk together when family arrives":"Off until you choose to join";return`<div class="voice-row"><span><b>${N.isPrivate?"Family voice chat":"Room voice chat"}</b><small>${p(J)}</small></span><button type="button" class="${N.voiceEnabled?"leave":""}" data-action="voice" ${N.voiceBusy||!N.session?"disabled":""}>${N.voiceBusy?"Starting…":N.voiceEnabled?"Leave":"Join voice"}</button></div><div class="voice-row voice-tune-row"><span><b>Light voice tune</b><small>Optional musical polish for your microphone. ${N.voiceTuned?"Your outgoing voice is tuned.":"Your natural voice is unchanged."}</small></span><button type="button" role="switch" aria-checked="${N.voiceTuned}" class="${N.voiceTuned?"":"leave"}" data-action="voice-tune">${N.voiceTuned?"Tune on":"Off"}</button></div>${N.voiceError?`<div class="voice-error" role="status">${p(N.voiceError)}</div>`:""}`}function mK($,J){let Q=rK($),W=N.speaking.has($);return`<small><i class="voice-indicator ${W?"speaking":Q?"live":""}" data-voice-uid="${p($)}"></i><span>${W?"Speaking":Q?"In voice":J}</span></small>`}function cU(){return'<span class="mini-die" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>'}var D8=["start","coin","event","coin","shop","minigame","coin","star","event","coin","shop","minigame","coin","event","star","coin","shop","minigame","event","coin","star","shop","minigame","coin"],nU={start:"Town Gate",coin:"+3 coins",event:"Town event",minigame:"Game space",shop:"Board shop",star:"Star stop"},P7=["Lantern Timing","Parcel Pop","Garden Dash","Tea Tray Tangle"],H8={boost:{name:"Dice boost",cost:5},trap:{name:"Puddle trap",cost:6},steal:{name:"Pocket swap",cost:8}},JH=[{uid:"bot-1",name:"Moss",color:"#5c8d65"},{uid:"bot-2",name:"Pip",color:"#d07862"},{uid:"bot-3",name:"Juniper",color:"#668fc2"}];function S0(){return N.session?.uid||"local-player"}function sU(){let $=[{uid:S0(),name:p0(),color:K9()},...N.players.map((J)=>({uid:J.uid,name:J.name||"Player",color:X$(J.outfit)}))];return[...new Map($.filter((J)=>J.uid).map((J)=>[J.uid,J])).values()]}function QH(){let $=N.boardEvents.filter((Y)=>Y.type==="board-lobby").at(-1),J=N.boardEvents.filter((Y)=>Y.type==="board-start").at(-1);if(!$||J&&Number(J.createdAt)>Number($.createdAt))return null;let Q=new Map(sU().map((Y)=>[Y.uid,Y])),W=new Map;W.set($.uid,{uid:$.uid,name:$.name,color:X$($.color),joinedAt:Number($.createdAt)});let Z=new Map,K=Math.max(2,Math.min(4,Number($.totalPlayers||4)));for(let Y of N.boardEvents){if(Y.lobbyId!==$.id||Number(Y.createdAt)<Number($.createdAt))continue;if(Y.type==="board-join")W.set(Y.uid,{uid:Y.uid,name:Y.name,color:X$(Y.color),joinedAt:Number(Y.createdAt)});if(Y.type==="board-leave")W.delete(Y.uid),Z.delete(Y.uid);if(Y.type==="board-ready")Z.set(Y.uid,Y.ready===!0);if(Y.type==="board-settings"&&Y.uid===$.uid)K=Math.max(2,Math.min(4,Number(Y.totalPlayers||4)))}let H=[...W.values()].filter((Y)=>Q.has(Y.uid)).map((Y)=>({...Y,...Q.get(Y.uid)||{},ready:Z.get(Y.uid)===!0})).sort((Y,X)=>Y.joinedAt-X.joinedAt).slice(0,4);if(!H.some((Y)=>Y.uid===$.uid))return null;if(H.length>K)K=H.length;return{id:$.id,hostUid:$.uid,totalPlayers:K,joined:H}}function iU(){if(!N.boardOverlay)return;if(N.boardGame=ZW(),N.boardLobby=QH(),m0(),!N.boardGame&&!N.boardLobby)setTimeout(ZH,80)}function oU($){return N.boardEvents.filter((J)=>Number(J.createdAt)>=Number($.createdAt)&&J.id!==$.id)}function ZW(){let $=N.boardEvents.filter((U)=>U.type==="board-start").at(-1),J=N.boardEvents.filter((U)=>U.type==="board-lobby"&&Number(U.createdAt)>Number($?.createdAt||0)).at(-1);if(!$||J)return null;let Q=Object.entries($.players||{}).map(([U,E])=>({uid:U,...E||{},bot:E?.bot===!0})).sort((U,E)=>Number(U.order||0)-Number(E.order||0));if(!Q.length)return null;let W={id:$.id,hostUid:$.uid,seed:Number($.seed||1),rounds:5,round:1,phase:"movement",turnIndex:0,players:Q.map((U)=>({...U,pos:0,coins:10,stars:0,minigameWins:0,items:{boost:0,trap:0,steal:0}})),traps:[],scores:{},minigameStartedAt:0,shopUid:"",shopSpace:-1,log:[Q.some((U)=>U.bot)?"The empty seats were filled by friendly town players.":"Everyone starts at the Town Gate with 10 coins."]},Z=(U)=>W.players.find((E)=>E.uid===U),K=()=>W.players[W.turnIndex]?.uid||"",H=()=>{let U=W.players.map((E)=>({entry:E,score:Number(W.scores[E.uid]??0)})).sort((E,G)=>G.score-E.score||E.entry.name.localeCompare(G.entry.name));if(U.forEach(({entry:E},G)=>{E.coins+=G===0?10:G===1?6:3}),U[0])U[0].entry.minigameWins+=1;if(W.log.push(`${U[0]?.entry.name||"The room"} won ${P7[(W.seed+W.round)%P7.length]}.`),W.round>=W.rounds)W.phase="ended";else W.round+=1,W.phase="movement",W.turnIndex=0;W.scores={},W.minigameStartedAt=0,W.shopUid=""};for(let U of oU($)){if(U.boardId!==W.id||W.phase==="ended")continue;if(W.phase==="minigame"&&W.minigameStartedAt&&Number(U.createdAt)>=W.minigameStartedAt+12000)H();let E=U.actorUid||U.uid;if(W.phase==="movement"&&U.type==="board-item"&&Number(U.round)===W.round&&E===K()){let G=Z(E);if(!G||!H8[U.item]||G.items[U.item]<1)continue;if(U.item==="trap")G.items.trap-=1,W.traps.push({owner:G.uid,space:(G.pos+4)%D8.length,active:!0}),W.log.push(`${G.name} set a trap four spaces ahead.`);else if(U.item==="steal"){let q=Z(U.targetUid);if(!q||q.uid===G.uid)continue;G.items.steal-=1;let F=Math.min(5,q.coins);q.coins-=F,G.coins+=F,W.log.push(`${G.name} pocket-swapped ${F} coins from ${q.name}.`)}continue}if(W.phase==="movement"&&U.type==="board-roll"&&Number(U.round)===W.round&&E===K()){let G=Z(E);if(!G)continue;if(W.shopUid="",U.usedBoost&&G.items.boost>0)G.items.boost-=1;let q=Math.max(1,Math.min(9,Number(U.roll||1)));G.pos=(G.pos+q)%D8.length;let F=W.traps.find((O)=>O.active&&O.owner!==G.uid&&O.space===G.pos);if(F)F.active=!1,G.coins=Math.max(0,G.coins-5),W.log.push(`${G.name} splashed into a trap and lost 5 coins.`);let R=D8[G.pos];if(R==="coin")G.coins+=3,W.log.push(`${G.name} rolled ${q} and found 3 coins.`);else if(R==="event"){let O=(W.seed+W.round*11+G.pos*7+G.uid.length)%2===0,M=O?4:Math.min(3,G.coins);G.coins+=O?M:-M,W.log.push(`${G.name} met a town surprise and ${O?"gained":"lost"} ${M} coins.`)}else if(R==="minigame")G.coins+=2,W.log.push(`${G.name} warmed up on a game space for 2 coins.`);else if(R==="star"&&G.coins>=10)G.coins-=10,G.stars+=1,W.log.push(`${G.name} traded 10 coins for a star.`);else if(R==="shop")W.shopUid=G.uid,W.shopSpace=G.pos,W.log.push(`${G.name} reached the Board Shop.`);else W.log.push(`${G.name} rolled ${q}.`);if(W.turnIndex+=1,W.turnIndex>=W.players.length)W.phase="minigame",W.turnIndex=0,W.minigameStartedAt=Number(U.createdAt),W.shopUid="";continue}if(W.phase==="movement"&&U.type==="board-shop"&&Number(U.round)===W.round&&E===W.shopUid){let G=Z(E);if(!G)continue;if(U.item==="pass"){W.shopUid="",W.log.push(`${G.name} saved their coins.`);continue}let q=H8[U.item];if(!q||G.coins<q.cost)continue;G.coins-=q.cost,G.items[U.item]+=1,W.shopUid="",W.log.push(`${G.name} bought ${q.name}.`);continue}if(W.phase==="minigame"&&U.type==="board-score"&&Number(U.round)===W.round&&Z(E)&&W.scores[E]==null){if(W.scores[E]=Math.max(0,Math.min(100,Number(U.score||0))),Object.keys(W.scores).length>=W.players.length)H()}}if(W.phase==="minigame"&&W.minigameStartedAt&&Date.now()>=W.minigameStartedAt+12000)H();let Y=Math.max(...W.players.map((U)=>U.coins)),X=Math.max(...W.players.map((U)=>U.minigameWins));return W.coinBonus=W.phase==="ended"?W.players.filter((U)=>U.coins===Y).map((U)=>U.uid):[],W.gameBonus=W.phase==="ended"?W.players.filter((U)=>U.minigameWins===X).map((U)=>U.uid):[],W.final=W.players.map((U)=>({...U,finalStars:U.stars+Number(W.coinBonus.includes(U.uid))+Number(W.gameBonus.includes(U.uid))})).sort((U,E)=>E.finalStars-U.finalStars||E.coins-U.coins||U.name.localeCompare(E.name)),W}function KW($){let J=`local-${$.createdAt}-${Math.random().toString(36).slice(2,7)}`;N.boardEvents.push({id:J,...$}),N.boardGame=ZW(),N.boardLobby=QH(),m0()}function H9($,J={}){if(!S0())return;KW({type:$,game:"snug-board",uid:S0(),name:p0().slice(0,18),createdAt:Date.now(),...J})}function WH($=4){if(N.boardBusy)return;N.boardBusy=!0,m0();try{H9("board-lobby",{color:X$(K9()),totalPlayers:Math.max(2,Math.min(4,Number($||4))),seed:crypto.getRandomValues(new Uint32Array(1))[0]})}finally{N.boardBusy=!1,m0()}}function ZH(){if(N.boardGame||N.boardJoinPending)return;N.boardJoinPending=!0;try{if(!N.boardLobby)WH(4);let $=N.boardLobby;if($&&!$.joined.some((J)=>J.uid===S0())&&$.joined.length<$.totalPlayers)H9("board-join",{lobbyId:$.id,color:X$(K9())})}finally{N.boardJoinPending=!1,m0()}}function aU(){let $=N.boardLobby;if(!$)return;let J=$.joined.find((Q)=>Q.uid===S0());if(!J)return;H9("board-ready",{lobbyId:$.id,ready:!J.ready}),window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"ready"}}))}function rU($){let J=N.boardLobby;if(!J||J.hostUid!==S0()||$<J.joined.length)return;H9("board-settings",{lobbyId:J.id,totalPlayers:$})}function K8($,J={}){if(!N.boardGame)return;KW({type:$,game:"snug-board",uid:S0(),name:p0().slice(0,18),boardId:N.boardGame.id,createdAt:Date.now(),...J})}function tU(){let $=N.boardLobby;if(N.boardBusy||!$||$.hostUid!==S0())return;if(!$.joined.length||$.joined.some((J)=>!J.ready))return g("Everyone in the lobby needs to ready up");N.boardBusy=!0,m0();try{let J=$.joined.slice(0,$.totalPlayers),Q=Math.max(0,$.totalPlayers-J.length),W=[...J.map((K)=>({uid:K.uid,name:K.name,color:K.color,bot:!1})),...JH.slice(0,Q).map((K)=>({...K,bot:!0}))],Z=Object.fromEntries(W.map((K,H)=>[K.uid,{name:String(K.name).slice(0,18),color:X$(K.color),order:H,bot:K.bot===!0}]));KW({type:"board-start",game:"snug-board",uid:S0(),name:p0().slice(0,18),createdAt:Date.now(),seed:crypto.getRandomValues(new Uint32Array(1))[0],rounds:5,lobbyId:$.id,players:Z}),N.boardLobby=null,window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"game-start"}}))}finally{N.boardBusy=!1,m0()}}function eU(){let $=N.boardLobby;if($?.joined.some((J)=>J.uid===S0())&&!N.boardGame)H9("board-leave",{lobbyId:$.id});N.boardOverlay?.remove(),N.boardOverlay=null,clearInterval(N.boardPolling),clearInterval(N.boardClock),clearTimeout(N.boardBotTimer),N.boardPolling=null,N.boardClock=null,N.boardBotTimer=null,N.boardBotKey="",N.boardUseBoost=!1}function $N(){if(Y8(),N.boardOverlay)return;let $=document.createElement("div");$.className="snug-board-backdrop",$.innerHTML='<section class="snug-board-shell" role="dialog" aria-modal="true" aria-labelledby="snug-board-title"></section>',document.body.appendChild($),N.boardOverlay=$,N.boardEvents=[],N.boardGame=null,N.boardLobby=null,N.error="",m0(),iU(),ZH(),N.boardClock=setInterval(XN,500)}function JN($,J,Q){let Z=Q.players.filter((H)=>H.pos===J).map((H)=>`<i class="snug-board-token ${H.bot?"bot":""}" style="background:${X$(H.color)}" title="${p(H.name)}">${p(String(H.name||"P").slice(0,1).toUpperCase())}</i>`).join(""),K=Q.traps.some((H)=>H.active&&H.space===J);return`<div class="snug-board-space ${$} ${K?"snug-board-trap":""}"><span class="snug-board-number">${J}</span><b>${nU[$]}</b><div class="snug-board-tokens">${Z}</div><small>${$==="star"?"10 coins":$==="shop"?"Items":$==="start"?"Start":""}</small></div>`}function QN($,J){return`<div class="snug-board-player ${J.phase==="movement"&&J.players[J.turnIndex]?.uid===$.uid?"current":""}"><i style="background:${X$($.color)}">${p(String($.name||"P").slice(0,1).toUpperCase())}</i><span><b>${p($.name)}${$.bot?' <em class="bot-chip">BOT</em>':""}</b><small>${$.minigameWins} minigame win${$.minigameWins===1?"":"s"}</small></span><strong>${$.stars}★ · ${$.coins} coins</strong></div>`}function WN($,J){let Q=$.uid===J.hostUid;return`<div class="snug-board-player lobby-person ${$.ready?"is-ready":""}"><i style="background:${X$($.color)}">${p(String($.name||"P").slice(0,1).toUpperCase())}</i><span><b>${p($.name)}</b><small>${Q?"Host":"Player"}</small></span><strong>${$.ready?"Ready":"Not ready"}</strong></div>`}function ZN($){let J=$.players.find((K)=>K.uid===S0());if($.phase==="ended"){let K=$.final[0],H=$.players.filter((X)=>$.coinBonus.includes(X.uid)).map((X)=>p(X.name)).join(", "),Y=$.players.filter((X)=>$.gameBonus.includes(X.uid)).map((X)=>p(X.name)).join(", ");return`<div class="snug-board-card"><h3>${K?.uid===S0()?"You win the board!":`${p(K?.name||"A neighbor")} wins!`}</h3><p>Final stars include two last-minute awards, so the lead can change right at the end.</p><div class="snug-board-bonuses"><div class="snug-board-bonus"><b>Banker Star</b><small>Most coins banked · ${H}</small></div><div class="snug-board-bonus"><b>Minigame Star</b><small>Most wins · ${Y}</small></div></div><div class="snug-board-stats">${$.final.map((X)=>`<div class="snug-board-player"><i style="background:${X$(X.color)}">${p(X.name.slice(0,1).toUpperCase())}</i><span><b>${p(X.name)}${X.bot?' <em class="bot-chip">BOT</em>':""}</b><small>${X.coins} coins</small></span><strong>${X.finalStars}★</strong></div>`).join("")}</div>${$.hostUid===S0()?'<button type="button" class="snug-board-primary" data-board-new-lobby>Return to lobby</button>':""}</div>`}if(!J)return'<div class="snug-board-card"><h3>Spectating</h3><p>This board started before you arrived. You’ll join the next one.</p></div>';if($.phase==="minigame"){let K=P7[($.seed+$.round)%P7.length],H=$.scores[J.uid]!=null,Y=Math.max(0,Math.ceil(($.minigameStartedAt+12000-Date.now())/1000)),X=$.players.map((U)=>`<span>${p(U.name)}${U.bot?" · bot":""} · ${$.scores[U.uid]==null?"playing":$.scores[U.uid]}</span>`).join("");return`<div class="snug-board-card"><h3>${p(K)}</h3><p>Everyone plays. Stop the marker close to the green center; ranked players earn 10, 6, and 3 coins.</p><div class="snug-board-meter" aria-hidden="true"><i></i></div><div class="snug-board-scores">${X}</div><p class="snug-board-status"><span class="board-seconds">${Y}</span>s left</p><button type="button" class="snug-board-primary" data-board-score ${H?"disabled":""}>${H?"Score locked":"Lock my score"}</button></div>`}let Q=$.players[$.turnIndex],W=$.players.filter((K)=>K.uid!==J.uid).sort((K,H)=>H.coins-K.coins)[0],Z=$.players.find((K)=>K.uid===$.shopUid);if($.shopUid===J.uid)return`<div class="snug-board-card"><h3>Board Shop</h3><p>Spend board coins on one item before the next roll.</p><div class="snug-board-shop">${Object.entries(H8).map(([K,H])=>`<button type="button" data-board-buy="${K}" ${J.coins<H.cost?"disabled":""}><b>${H.name}</b><br>${H.cost} coins</button>`).join("")}<button type="button" data-board-buy="pass"><b>Keep coins</b><br>Leave shop</button></div></div>`;if(Z?.bot)return`<div class="snug-board-card"><h3>${p(Z.name)} is shopping</h3><p>The town player is weighing up a useful item.</p></div>`;if(Q?.bot)return`<div class="snug-board-card"><h3>${p(Q.name)} is rolling</h3><p>The town player is choosing an item and planning a move.</p></div>`;if(Q?.uid!==J.uid)return`<div class="snug-board-card"><h3>${p(Q?.name||"Another player")} is up</h3><p>After everyone moves, the whole room faces off in a coin-paying minigame.</p></div>`;return`<div class="snug-board-card"><h3>Your turn</h3><p>Roll 1–6 spaces. Stars cost 10 coins when you land on them.</p><div class="snug-board-items"><button type="button" data-board-boost class="${N.boardUseBoost?"active":""}" ${J.items.boost<1?"disabled":""}>Boost ×${J.items.boost}<br>+3 roll</button><button type="button" data-board-item="trap" ${J.items.trap<1?"disabled":""}>Trap ×${J.items.trap}<br>Lay ahead</button><button type="button" data-board-item="steal" ${J.items.steal<1||!W?"disabled":""}>Swap ×${J.items.steal}<br>Steal 5</button></div><button type="button" class="snug-board-primary" data-board-roll ${N.boardBusy?"disabled":""}>${N.boardUseBoost?"Roll with +3":"Roll the dice"}</button></div>`}function KN($){if(!$)return'<div class="snug-board-lobby"><div class="snug-board-card board-lobby-loading"><h3>Setting the table…</h3><p>Opening a fresh lobby for this room.</p></div></div>';let J=$.joined.find((Y)=>Y.uid===S0()),Q=$.hostUid===S0(),W=$.joined.length>0&&$.joined.every((Y)=>Y.ready),Z=Math.max(0,$.totalPlayers-$.joined.length),K=[...$.joined.map((Y)=>WN(Y,$)),...JH.slice(0,Z).map((Y)=>`<div class="snug-board-player lobby-person bot-seat"><i style="background:${Y.color}">${Y.name[0]}</i><span><b>${Y.name} <em class="bot-chip">BOT</em></b><small>Fills an open seat</small></span><strong>Ready</strong></div>`)].join(""),H=!J&&$.joined.length>=$.totalPlayers;return`<div class="snug-board-lobby"><div class="board-lobby-copy"><small>Waiting room</small><h3>${Q?"You’re hosting the board":"The host is gathering players"}</h3><p>Choose the party size, ready up, then the host starts. Any open seats become capable town players.</p></div><div class="board-count-row"><span><b>Total players</b><small>Humans first, bots fill the rest</small></span><div class="board-count-picker" role="group" aria-label="Total players">${[2,3,4].map((Y)=>`<button type="button" data-board-count="${Y}" class="${$.totalPlayers===Y?"active":""}" ${!Q||Y<$.joined.length?"disabled":""}>${Y}</button>`).join("")}</div></div><div class="snug-board-stats board-lobby-people">${K}</div>${H?'<p class="snug-board-status">This lobby is full. You can watch, or return when a seat opens.</p>':J?`<button type="button" class="snug-board-ready ${J.ready?"is-ready":""}" data-board-ready>${J.ready?"Ready ✓":"Ready up"}</button>`:'<p class="snug-board-status">Joining the waiting room…</p>'}${Q?`<button type="button" class="snug-board-primary" data-board-start ${!W||N.boardBusy?"disabled":""}>${N.boardBusy?"Starting…":W?`Start with ${$.joined.length} player${$.joined.length===1?"":"s"} + ${Z} bot${Z===1?"":"s"}`:"Waiting for everyone to ready up"}</button>`:`<p class="snug-board-status">${W?"Everyone’s ready. Waiting for the host to start.":"Ready when you are — the host starts the game."}</p>`}</div>`}function m0(){let $=N.boardOverlay?.querySelector(".snug-board-shell");if(!$)return;let J='<button type="button" class="snug-board-close" aria-label="Close board mode">×</button>',Q=N.error?`<div class="snug-board-error" role="status">${p(N.error)}</div>`:"",W=N.boardGame;if(!W)$.innerHTML=`<div class="snug-board-head"><div><small>Five-round party</small><h2 id="snug-board-title">Snug Board</h2></div>${J}</div>${Q}${KN(N.boardLobby)}`;else $.innerHTML=`<div class="snug-board-head"><div><small>Round ${W.round} of ${W.rounds} · ${N.isPrivate?"Family room":"Village plaza"}</small><h2 id="snug-board-title">Snug Board</h2></div>${J}</div>${Q}<div class="snug-board-layout"><div><div class="snug-board-map">${D8.map((Z,K)=>JN(Z,K,W)).join("")}</div><div class="snug-board-legend"><span>Gold: coins</span><span>Blue: events</span><span>Coral: minigames</span><span>Green: shops</span><span>Dark: stars</span></div></div><aside class="snug-board-side"><div class="snug-board-card"><div class="snug-board-stats">${W.players.map((Z)=>QN(Z,W)).join("")}</div></div>${ZN(W)}<div class="snug-board-card"><h3>Town chatter</h3><ul class="snug-board-log">${W.log.slice(-5).reverse().map((Z)=>`<li>${p(Z)}</li>`).join("")}</ul></div></aside></div>`;$.querySelector(".snug-board-close")?.addEventListener("click",eU),$.querySelector("[data-board-ready]")?.addEventListener("click",()=>aU()),$.querySelectorAll("[data-board-count]").forEach((Z)=>Z.addEventListener("click",()=>rU(Number(Z.dataset.boardCount)))),$.querySelector("[data-board-start]")?.addEventListener("click",tU),$.querySelector("[data-board-new-lobby]")?.addEventListener("click",()=>WH(4)),$.querySelector("[data-board-boost]")?.addEventListener("click",()=>{N.boardUseBoost=!N.boardUseBoost,m0()}),$.querySelector("[data-board-roll]")?.addEventListener("click",async()=>{if(N.boardBusy||!N.boardGame)return;N.boardBusy=!0,m0();let Z=HW(6)+1;window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"dice-roll"}})),K8("board-roll",{round:N.boardGame.round,roll:Z+(N.boardUseBoost?3:0),usedBoost:N.boardUseBoost}),N.boardUseBoost=!1,N.boardBusy=!1,m0()}),$.querySelectorAll("[data-board-buy]").forEach((Z)=>Z.addEventListener("click",()=>{let K=Z.dataset.boardBuy,H=K==="pass"?0:H8[K].cost;window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"shop-buy"}})),K8("board-shop",{round:N.boardGame.round,item:K,cost:H})})),$.querySelectorAll("[data-board-item]").forEach((Z)=>Z.addEventListener("click",()=>{let K=Z.dataset.boardItem,H=N.boardGame.players.find((X)=>X.uid===S0()),Y=N.boardGame.players.filter((X)=>X.uid!==H?.uid).sort((X,U)=>U.coins-X.coins)[0];K8("board-item",{round:N.boardGame.round,item:K,targetUid:Y?.uid||"none"})})),$.querySelector("[data-board-score]")?.addEventListener("click",()=>{let K=Math.max(0,Date.now()-Number(N.boardGame.minigameStartedAt))%3300/3300,H=K<=0.5?K*2:(1-K)*2,Y=Math.max(0,Math.round(100-Math.abs(H-0.5)*200));K8("board-score",{round:N.boardGame.round,score:Y})}),KH()}function HN($,J){return 60+($.seed+$.round*37+J.uid.charCodeAt(J.uid.length-1)*19)%34}function cK($,J){return N.boardEvents.some((Q)=>Q.boardId===$.id&&Number(Q.round)===$.round&&Q.type==="board-item"&&(Q.actorUid||Q.uid)===J.uid)}function YN($,J){let Q=$.players.filter((W)=>W.uid!==J.uid).sort((W,Z)=>Z.coins-W.coins)[0];if(J.coins>=H8.steal.cost&&Q?.coins>=8&&J.items.steal<1)return"steal";if(J.coins>=H8.boost.cost&&J.items.boost<2)return"boost";if(J.coins>=H8.trap.cost)return"trap";return"pass"}function KH(){let $=N.boardGame;if(!N.boardOverlay||!$||$.phase==="ended"||$.hostUid!==S0()||N.boardBusy){clearTimeout(N.boardBotTimer),N.boardBotTimer=null;return}let J="",Q=null;if($.phase==="movement"){let W=$.players.find((K)=>K.uid===$.shopUid),Z=$.players[$.turnIndex];if(W?.bot){let K=YN($,W);J=`${$.id}-${$.round}-shop-${W.uid}-${K}`,Q=()=>K8("board-shop",{round:$.round,actorUid:W.uid,item:K,cost:K==="pass"?0:H8[K].cost})}else if(Z?.bot){let K=$.players.filter((X)=>X.uid!==Z.uid).sort((X,U)=>U.coins-X.coins)[0],H=Z.items.steal>0&&K?.coins>=8,Y=!H&&Z.items.trap>0&&!cK($,Z)&&($.seed+$.round+$.turnIndex)%2===0;if(!cK($,Z)&&(H||Y)){let X=H?"steal":"trap";J=`${$.id}-${$.round}-item-${Z.uid}-${X}`,Q=()=>K8("board-item",{round:$.round,actorUid:Z.uid,item:X,targetUid:K?.uid||"none"})}else{let X=D8.map((G,q)=>({space:G,distance:(q-Z.pos+D8.length)%D8.length})).filter((G)=>G.space==="star"&&G.distance>0).sort((G,q)=>G.distance-q.distance)[0]?.distance||99,U=Z.items.boost>0&&Z.coins>=10&&X>6&&X<=9,E=HW(6)+1+(U?3:0);J=`${$.id}-${$.round}-roll-${Z.uid}-${$.turnIndex}`,Q=()=>K8("board-roll",{round:$.round,actorUid:Z.uid,roll:E,usedBoost:U})}}}else if($.phase==="minigame"){let W=$.players.find((Z)=>Z.bot&&$.scores[Z.uid]==null);if(W)J=`${$.id}-${$.round}-score-${W.uid}`,Q=()=>K8("board-score",{round:$.round,actorUid:W.uid,score:HN($,W)})}if(!Q){clearTimeout(N.boardBotTimer),N.boardBotTimer=null,N.boardBotKey="";return}if(N.boardBotKey===J&&N.boardBotTimer)return;clearTimeout(N.boardBotTimer),N.boardBotKey=J,N.boardBotTimer=setTimeout(async()=>{N.boardBotTimer=null,N.boardBusy=!0,m0(),window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:J.includes("roll")?"dice-roll":"bot-turn"}})),Q(),N.boardBusy=!1,N.boardBotKey="",m0()},720)}function XN(){if(!N.boardOverlay||!N.boardGame)return;let $=`${N.boardGame.round}-${N.boardGame.phase}-${N.boardGame.turnIndex}-${N.boardGame.shopUid}-${Object.keys(N.boardGame.scores).length}`;N.boardGame=ZW();let J=`${N.boardGame.round}-${N.boardGame.phase}-${N.boardGame.turnIndex}-${N.boardGame.shopUid}-${Object.keys(N.boardGame.scores).length}`;if($!==J)m0();else{let Q=N.boardOverlay.querySelector(".board-seconds");if(Q)Q.textContent=String(Math.max(0,Math.ceil((N.boardGame.minigameStartedAt+12000-Date.now())/1000)));KH()}}function R$(){let $=W0(".room-dock");if(!$)$=document.createElement("button"),$.type="button",$.className="room-dock",$.addEventListener("click",()=>Q6("rooms")),document.body.appendChild($);let J=N.players.length+1;$.innerHTML=`<span class="room-live"></span><span>${N.isPrivate?"Family":"Plaza"}</span><b>${J}</b>`,$.setAttribute("aria-label",`${N.roomName}, ${J} online. Open rooms`),$.classList.toggle("offline",!N.session||Boolean(N.error));let Q=W0(".voice-toggle-dock");if(!Q)Q=document.createElement("button"),Q.type="button",Q.className="voice-toggle-dock off",Q.innerHTML='<span aria-hidden="true"></span>',Q.addEventListener("click",uQ),document.body.appendChild(Q);Q.disabled=N.voiceBusy||!N.session,Q.classList.toggle("off",!N.voiceEnabled),Q.classList.toggle("busy",N.voiceBusy),Q.setAttribute("aria-pressed",String(N.voiceEnabled)),Q.setAttribute("aria-label",N.voiceEnabled?"Leave room voice chat":"Join room voice chat"),Q.title=N.voiceEnabled?"Room voice on":"Join room voice",eQ()}function Q6($="rooms"){Y8(),document.querySelector(".sheet-backdrop .icon-btn")?.click(),document.body.classList.add("snug-room-modal-open");let J=document.createElement("div");J.className="multiplayer-backdrop",J.addEventListener("pointerdown",(W)=>{if(W.target===J)Y8()});let Q=document.createElement("section");Q.className="multiplayer-sheet",Q.setAttribute("role","dialog"),Q.setAttribute("aria-modal","true"),Q.dataset.view=$,J.appendChild(Q),document.body.appendChild(J),N.panel=J,N0()}function Y8(){N.panel?.remove(),N.panel=null,document.body.classList.remove("snug-room-modal-open")}function bQ($){return`<div class="multi-switch"><button type="button" class="${$==="rooms"?"active":""}" data-view="rooms">Room</button><button type="button" class="${$==="chat"?"active":""}" data-view="chat">Chat</button><button type="button" class="${$==="practice"?"active":""}" data-view="practice">Practice</button></div>`}function N0(){let $=N.panel?.querySelector(".multiplayer-sheet");if(!$)return;let J=$.dataset.view||"rooms",Q=N.players.length+1,W=`<div class="multi-grabber"></div><div class="multi-head"><div><small>${J==="practice"?"Solo Practice":N.isPrivate?"Family room":"Shared room"}</small><h2>${J==="practice"?"Pick a game":p(N.roomName)}</h2></div><button type="button" class="multi-close" aria-label="Close rooms">×</button></div>`,Z=N.error?`<div class="multi-error" role="status">${p(N.error)}</div>`:"";if(J==="chat"){let Y=N.messages.length?N.messages.map((X)=>`<div class="multi-message ${X.uid===N.session?.uid?"mine":""}"><b>${p(X.name||"Player")}</b><p>${p(X.text)}</p></div>`).join(""):'<div class="multi-empty">No messages yet. You’re first in the room.</div>';$.innerHTML=`${W}${bQ(J)}${Z}${dK()}${GN()}<div class="multi-messages">${Y}</div><form class="multi-compose"><input maxlength="240" aria-label="Room message" placeholder="${N.currentGame?.game==="quiz"&&!K0()?"Type your answer…":"Say something kind…"}" autocomplete="off"><button type="submit" aria-label="Send message">Send</button></form>`}else if(J==="practice")$.innerHTML=`${W}${bQ(J)}${Z}${EN()}`;else{let Y=N.players.length?N.players.map((G)=>`<li><span style="background:${X$(G.outfit)}">${p(String(G.name||"P").slice(0,1).toUpperCase())}</span><b>${p(G.name||"Player")}</b>${mK(G.uid,"Here now")}</li>`).join(""):'<li class="multi-empty-row"><span>•</span><b>The room is quiet</b><small>Invite family in</small></li>',X=N.inviteArrival&&N.isPrivate&&!N.voiceEnabled?'<div class="family-arrival"><span><b>You’re in with the family</b><small>Turn on your microphone when you’re ready.</small></span><button type="button" data-action="arrival-voice">Join voice</button></div>':"",U=N.isPrivate?`<div class="family-invite"><div class="family-invite-head"><span><b>Bring family in</b><small>Copy this ready-to-send invitation. They can paste the code and go straight into this room.</small></span></div><button type="button" class="family-code" data-action="copy" aria-label="Copy family code ${z7()}"><span><small>Family code</small><strong>${z7()}</strong></span><em>Tap to copy</em></button><button type="button" class="family-invite-copy" data-action="copy-invite">Copy family invitation</button></div>`:"",E=N.isPrivate?'<div class="room-actions"><button type="button" class="multi-primary" data-action="plaza">Return to plaza</button></div>':`<div class="room-actions"><button type="button" class="multi-primary" data-action="create">${N.busy?"Connecting…":"Start a family room"}</button><div class="join-row family-join"><input aria-label="Family room code" placeholder="Paste family code" inputmode="text" autocomplete="off" autocapitalize="characters"><button type="button" data-action="join">Join</button></div><p class="join-helper">Paste a family code and you’ll go straight in.</p></div>`;$.innerHTML=`${W}${bQ(J)}${Z}${X}${dK()}${NN()}<div class="room-summary"><span><b>${Q}</b> online</span><span>${N.isPrivate?"Only family with this code can join":"Open to everyone"}</span></div><ul class="multi-people"><li><span style="background:${X$(K9())}">${p(p0().slice(0,1).toUpperCase())}</span><b>${p(p0())}</b>${mK(N.session?.uid||"","You")}</li>${Y}</ul>${U}${E}`}W0(".multi-close",$)?.addEventListener("click",Y8),$.querySelectorAll("[data-view]").forEach((Y)=>Y.addEventListener("click",()=>{$.dataset.view=Y.dataset.view,N0()})),W0("[data-action='play']",$)?.addEventListener("click",RN),W0("[data-action='board']",$)?.addEventListener("click",$N),$.querySelectorAll("[data-solo-game]").forEach((Y)=>Y.addEventListener("click",()=>qN(Y.dataset.soloGame))),$.querySelectorAll("[data-quiz-answer]").forEach((Y)=>Y.addEventListener("click",()=>FN(Y.dataset.quizAnswer))),W0("[data-action='close-practice']",$)?.addEventListener("click",Y8),W0("[data-action='voice']",$)?.addEventListener("click",uQ),W0("[data-action='voice-tune']",$)?.addEventListener("click",()=>rQ(!N.voiceTuned)),W0("[data-action='arrival-voice']",$)?.addEventListener("click",uQ),W0("[data-action='open-chat']",$)?.addEventListener("click",()=>{$.dataset.view="chat",N0()}),W0("[data-action='copy']",$)?.addEventListener("click",gU),W0("[data-action='copy-invite']",$)?.addEventListener("click",pU),W0("[data-action='create']",$)?.addEventListener("click",bU),W0("[data-action='plaza']",$)?.addEventListener("click",()=>oQ("plaza","Village Plaza",!1));let K=W0(".family-join input",$);W0("[data-action='join']",$)?.addEventListener("click",()=>C7(K?.value,{arrival:!0})),K?.addEventListener("input",()=>{if(iQ(K.value))C7(K.value,{arrival:!0})}),K?.addEventListener("keydown",(Y)=>{if(Y.key==="Enter")Y.preventDefault(),C7(K.value,{arrival:!0})}),W0(".multi-compose",$)?.addEventListener("submit",async(Y)=>{Y.preventDefault();let X=W0("input",Y.currentTarget),U=X.value;X.value="",await xU(U)});let H=W0(".multi-messages",$);if(H)H.scrollTop=H.scrollHeight}function HH({solo:$=!1}={}){let J=[N.session?.uid,...N.players.map((Z)=>Z.uid)].filter(Boolean),Q=[...new Set(J)].slice(0,gQ.roster.maximum);if($)return Q.slice(0,1);let W=gQ.roster.maximum;while(Q.length<W)Q.push(sQ[Q.length-1]?.uid||`bot-neighbor-${Q.length}`);return Q}function n0($=N.currentGame){if(!$)return"lobby";let J=Date.now()-Number($.createdAt||0);if(J<3000)return"countdown";if(J<Number($.duration||r[$.game]?.duration||30000))return"play";return e("claim").length?"payout":"results"}function UN($){if($===N.session?.uid)return p0();return N.players.find((J)=>J.uid===$)?.name||sQ.find((J)=>J.uid===$)?.name||"Neighbor"}function NN(){let $=N.currentGame;if($&&!K0()){let J=c0(N.session?.uid);return`<div class="play-entry active"><span><small>Round in play</small><b>${r[$.game].name}</b><em>${J} point${J===1?"":"s"}</em></span>${$.game==="quiz"?'<button type="button" data-action="open-chat">Chat</button>':`<strong>${W6()}s</strong>`}</div>`}return`<div class="board-entry-wrap"><button type="button" class="play-entry" data-action="play" ${N.rolling||!N.session?"disabled":""}>${cU()}<span><small>${N.rolling?"Rolling the room dice…":"Quick round"}</small><b>${N.rolling?"Choosing a game":"Play a minigame"}</b></span><strong>${N.rolling?"":"Roll"}</strong></button><button type="button" class="play-entry board-party-entry" data-action="board"><i class="board-party-mark" aria-hidden="true">★</i><span><small>Five rounds · everyone plays</small><b>Snug Board</b></span><strong>Open</strong></button></div>`}function EN(){let $=N.currentGame;if($?.practice&&!K0()){let Q=c0(N.session?.uid);if($.game==="quiz"){let Z=Z6(),K=C8($,Z),H=e("quiz-answer").some((X)=>X.uid===N.session?.uid&&Number(X.question)===Z),Y=K.choices.map((X)=>`<button type="button" data-quiz-answer="${p(X)}" ${H?"disabled":""}>${p(X)}</button>`).join("");return`<div class="practice-live"><span class="practice-status"><small>Live solo round · ${W6()}s</small><b>Question ${Z+1} of 3</b></span><p>${p(K.q)}</p><div class="practice-answers">${Y}</div><strong>${H?"Answer locked in":`${Q} point${Q===1?"":"s"}`}</strong></div>`}let W={coin:"Move through the plaza and collect as many coins as you can.",tag:"Chase the glowing practice pal. Each tag sends it to a new spot.",balloon:"Tap balloons as they drift over Cyclical City.",sprint:"Tap through every glowing gate in order.",fishing:"Watch the ripple and cast inside the golden timing window.",potato:"Pass the sizzling potato before the beat runs out.",hide:"Search the hiding places and catch every peek.",statues:"Freeze the instant the music stops.",memory:"Turn two tiles at a time and clear every pair.",pattern:"Repeat the glowing color sequence in order.",draw:"Study each sketch and pick the matching word.",cats:"Tap wandering cats to guide them into the pen.",bridge:"Gather the requested planks and pegs for the bridge.",curling:"Release each coin with just the right amount of power.",charades:"Match the emote performance to its secret word.",sneaky:"Watch the suspects and vote for the neighbor who pocketed the shells.",snap:"Frame the requested Cyclical City sight.",puffs:"Choose the open lane before the puffs roll through.",freeze:"Tap frozen teammates to bring them back into play.",treasure:"Dig the brightest patch until the treasure pops out.",snowball:"Tap the carnival target to land each snowball.",lantern:"Find the lanterns hiding in the night scene.",petal:"Catch gold petals and let grey petals fall."};return`<div class="practice-live"><span class="practice-status"><small>${n0($)==="countdown"?"Get ready":`Live solo round · ${W6()}s`}</small><b>${r[$.game].name}</b></span><p>${W[$.game]||r[$.game].note}</p><strong>${Q} point${Q===1?"":"s"}</strong><button type="button" class="multi-primary" data-action="close-practice">Back to the plaza</button></div>`}return`<p class="practice-intro">Pick from the complete seven-wave slate. Every game runs a full solo round and ends with a before + payout = after receipt.</p><div class="practice-grid">${nK.map((Q)=>{let W=r[Q],Z={coin:"coin-mark",tag:"tag-mark",quiz:"quiz-mark",balloon:"balloon-mark",sprint:"sprint-mark",fishing:"fishing-mark"},K={quiz:"?",balloon:"○",sprint:"›",fishing:"⌁",potato:"●",hide:"◉",statues:"Ⅱ",memory:"◇",pattern:"···",draw:"⌁",cats:"△",bridge:"▰",curling:"◎",charades:"!",sneaky:"?",snap:"□",puffs:"○",freeze:"✣",treasure:"×",snowball:"●",lantern:"◌",petal:"✦"},H={coin:"Collect plaza coins",tag:"Chase a lively practice pal",quiz:"Three questions, four choices",balloon:"Pop drifting targets",sprint:"Race eight plaza gates",fishing:"Time six pond casts",potato:"Pass before the beat",hide:"Find the hidden neighbor",statues:"Freeze on the silence",memory:"Clear matching pairs",pattern:"Repeat the color sequence",draw:"Guess the sketch",cats:"Guide cats to the pen",bridge:"Gather planks and pegs",curling:"Land near the center",charades:"Guess the emote",sneaky:"Catch the bluff",snap:"Frame the town sight",puffs:"Choose the open lane",freeze:"Free frozen teammates",treasure:"Dig glowing spots",snowball:"Hit festival targets",lantern:"Find night lanterns",petal:"Catch only gold"};return`<button type="button" data-solo-game="${Q}"><span class="practice-mark ${Z[Q]||""}" aria-hidden="true">${K[Q]||""}</span><span><b>${p(W.name)}</b><small>${H[Q]}</small></span><strong>${W.duration>=60000?`${Math.round(W.duration/60000)} min`:`${Math.round(W.duration/1000)}s`}</strong></button>`}).join("")}</div><p class="practice-foot">All 24 blueprint games are ready for Solo Practice. The room dice and Snug Board can call the same shared minigame framework.</p>`}function GN(){if(N.currentGame?.game!=="quiz"||K0())return"";let $=Z6(),J=C8(N.currentGame,$);return`<div class="quiz-chat-prompt"><small>Question ${$+1} of 3 · ${W6()}s left</small><b>${p(J.q)}</b></div>`}function X$($){return/^#[0-9a-f]{6}$/i.test(String($||""))?$:"#5c8fd8"}function p($){let J=document.createElement("span");return J.textContent=String($??""),J.innerHTML}function HW($){return crypto.getRandomValues(new Uint8Array(1))[0]%$}function YW(){let $=document.querySelector(".coin-chip b")?.textContent||"",J=Number(String($).replace(/[^0-9.-]/g,""));return Number.isFinite(J)?J:0}async function qN($){if(!nK.includes($)||N.rolling||N.busy||!N.session)return;if(N.currentGame&&!K0()){g("Finish the current round first");return}if(window.__snugWorld?.mode&&window.__snugWorld.mode!=="village"){g("Head to the village plaza to practice");return}N.rolling=!0,N.soloResult=null,N.soloBalanceBefore=YW(),N0();try{let J=crypto.getRandomValues(new Uint32Array(1))[0],Q={type:"start",game:$,uid:N.session.uid,name:p0().slice(0,18),createdAt:Date.now(),duration:r[$].duration,seed:J,itUid:N.session.uid,players:HH({solo:!0})},Z=(await D0(`minigames/${N.roomId}/events`,{method:"POST",body:JSON.stringify(Q)}))?.name||`local-${Q.createdAt}`;if(N.soloRoundId=Z,N.minigameEvents.push({id:Z,...Q}),XW(),window.dispatchEvent(new CustomEvent("snug-minigame-achievement",{detail:{game:$,phase:"participate",solo:!0}})),$==="quiz"){if(N.panel)N.panel.querySelector(".multiplayer-sheet").dataset.view="practice"}else Y8();N0(),B8(),g(`${r[$].name} practice begins`)}catch(J){N.error=O0(J),g(N.error)}finally{N.rolling=!1,N0()}}async function FN($){if(!N.currentGame?.practice||N.currentGame.game!=="quiz"||K0()||n0()!=="play")return;let J=Z6();if(e("quiz-answer").some((Z)=>Z.uid===N.session.uid&&Number(Z.question)===J))return;let Q=C8(N.currentGame,J);if(![Q.a,...Q.also||[]].map(I7).includes(I7($))){g("Not quite — try another answer");return}try{await l0("quiz-answer",{question:J}),g("Correct answer"),N0(),B8()}catch(Z){N.error=O0(Z),N0()}}async function RN(){if(N.rolling||N.busy||!N.session)return;if(N.currentGame&&!K0()){g("This round is still going");return}if(window.__snugWorld?.mode&&window.__snugWorld.mode!=="village"){g("Head to the village plaza to play");return}N.rolling=!0,N0(),await new Promise(($)=>setTimeout($,650));try{let $=nQ,J=$[HW($.length)],Q=HH(),W=Q.filter((U)=>!U.startsWith("bot-")),Z=crypto.getRandomValues(new Uint32Array(1))[0],K=W[Z%Math.max(1,W.length)]||N.session.uid,H={type:"start",game:J,uid:N.session.uid,name:p0().slice(0,18),createdAt:Date.now(),duration:r[J].duration,seed:Z,itUid:K,players:Q},Y=await D0(`minigames/${N.roomId}/events`,{method:"POST",body:JSON.stringify(H)});N.minigameEvents.push({id:Y?.name||`local-${H.createdAt}`,...H}),XW(),window.dispatchEvent(new CustomEvent("snug-minigame-achievement",{detail:{game:J,phase:"participate",solo:!1}}));let X=J==="quiz"?`The dice picked Room Quiz. Question 1: ${C8(N.currentGame,0).q}`:`The dice picked ${r[J].name}. ${r[J].note}`;if(await aQ(X,"Game Host"),J==="quiz"){if(EE(N.currentGame),N.panel)N.panel.querySelector(".multiplayer-sheet").dataset.view="chat"}else Y8();N0(),B8(),g(`${r[J].name} begins`)}catch($){N.error=O0($),g(N.error)}finally{N.rolling=!1,N0()}}function XW(){let J=N.minigameEvents.filter((W)=>W.type==="start"&&r[W.game]).at(-1)||null;if(!J){N.currentGame=null,W9(),Z9(),f7(),A7(),T7(),OH(),document.querySelector(".simon-controls")?.remove(),S7();return}let Q=N.currentGame?.id!==J.id;if(N.currentGame={...J,practice:J.id===N.soloRoundId},Q){if(N.tagCooldownUntil=0,N.roundBalanceBefore[J.id]==null)N.roundBalanceBefore[J.id]=YW();if(J.game==="coin")EW(N.currentGame);else W9();if(N.currentGame.practice&&J.game==="tag")UH(N.currentGame);else Z9();BH(N.currentGame),LH(N.currentGame),RH(N.currentGame),AN(N.currentGame),S7()}else if(J.game==="coin")GW();else if(N.currentGame.practice&&J.game==="tag")EH();else if(["balloon","fishing"].includes(J.game))Y6();else if(H6.has(J.game))v7();else K6()}function e($){let J=N.currentGame?.id;if(!J)return[];return N.minigameEvents.filter((Q)=>Q.roundId===J&&(!$||Q.type===$))}function K0(){if(!N.currentGame)return!0;return Date.now()>=Number(N.currentGame.createdAt)+Number(N.currentGame.duration||r[N.currentGame.game]?.duration||30000)}function W6(){if(!N.currentGame)return 0;return Math.max(0,Math.ceil((Number(N.currentGame.createdAt)+Number(N.currentGame.duration||30000)-Date.now())/1000))}function h7(){if(!N.currentGame)return{};let $={};if(N.currentGame.game==="coin"){let Z=new Set;e("coin").forEach((K)=>{let H=Number(K.item);if(Z.has(H))return;Z.add(H),$[K.uid]=($[K.uid]||0)+1})}else if(N.currentGame.game==="tag")e("tag").forEach((Z)=>{$[Z.uid]=($[Z.uid]||0)+1});else if(N.currentGame.game==="quiz"){let Z=new Set;e("quiz-answer").forEach((K)=>{let H=Number(K.question),Y=Z.has(H)?1:2;Z.add(H),$[K.uid]=($[K.uid]||0)+Y})}else if(N.currentGame.game==="floor"){let Z=new Set(e("floor-out").map((K)=>K.uid));(N.currentGame.players||[]).forEach((K)=>{$[K]=Z.has(K)?0:1})}else if(["connect4","tictactoe"].includes(N.currentGame.game)){let Z=y7().winner;(N.currentGame.players||[]).forEach((K)=>{$[K]=K===Z?1:0})}else if(N.currentGame.game==="scavenger"){let Z=new Set;e("scavenge").forEach((K)=>{let H=Number(K.item);if(Z.has(H))return;Z.add(H),$[K.uid]=($[K.uid]||0)+1})}else if(N.currentGame.game==="relay")e("relay-checkpoint").forEach((Z)=>{$[Z.uid]=Math.max($[Z.uid]||0,Number(Z.item)+1)});else if(N.currentGame.game==="potato"&&!N.currentGame.practice){let Z=UW();(N.currentGame.players||[]).forEach((K)=>{$[K]=K===Z?0:1})}else if(N.currentGame.game==="simon"){let Z=NW(N.currentGame);(N.currentGame.players||[]).forEach((K)=>{let H=e("simon-step").filter((X)=>X.uid===K),Y=0;for(let X of H){if(Number(X.item)!==Y||String(X.emote)!==Z[Y])break;Y+=1}$[K]=Y})}else if(N.currentGame.game==="balloon"){let Z=new Set;e("balloon-pop").forEach((K)=>{let H=Number(K.item);if(Z.has(H))return;Z.add(H),$[K.uid]=($[K.uid]||0)+1})}else if(N.currentGame.game==="sprint")e("sprint-checkpoint").forEach((Z)=>{$[Z.uid]=Math.max($[Z.uid]||0,Number(Z.item)+1)});else if(N.currentGame.game==="fishing"){let Z=new Set;e("fishing-catch").forEach((K)=>{let H=`${K.uid}:${Number(K.item)}`;if(Z.has(H))return;Z.add(H),$[K.uid]=($[K.uid]||0)+1})}else if(H6.has(N.currentGame.game)){let Z=new Set;e("challenge-point").forEach((K)=>{let H=`${K.uid}:${Number(K.item)}`;if(Z.has(H))return;Z.add(H),$[K.uid]=($[K.uid]||0)+1})}let J=Math.max(0,(Date.now()-Number(N.currentGame.createdAt||0))/1000),Q=new Set(["floor","connect4","tictactoe","potato"]),W={coin:12,tag:9,quiz:6,balloon:18,sprint:8,fishing:6,scavenger:8,relay:6,simon:12,hide:8,statues:10,memory:6,pattern:8,draw:6,cats:12,bridge:12,curling:7,charades:6,sneaky:6,snap:8,puffs:10,freeze:10,treasure:12,snowball:10,lantern:10,petal:12};return(N.currentGame.players||[]).filter((Z)=>String(Z).startsWith("bot-")).forEach((Z,K)=>{if(Q.has(N.currentGame.game))return;let H=W[N.currentGame.game]||6,Y=Math.max(20,Number(N.currentGame.duration||r[N.currentGame.game]?.duration||30000)/1000),U=sQ.find((q)=>q.uid===Z)?.archetype===r[N.currentGame.game]?.bot,E=Math.max(2.4,(Y-8)/H*(U?0.86:1.04+K*0.04)),G=(Number(N.currentGame.seed||1)+K*7)%5;$[Z]=Math.min(H,Math.max($[Z]||0,Math.floor(Math.max(0,J-G)/E)))}),$}function c0($){return h7()[$]||0}function YH(){let $=Object.entries(h7());if(!$.length)return"";return $.sort((J,Q)=>Q[1]-J[1]||J[0].localeCompare(Q[0]))[0][0]}function XH(){let $=N.currentGame?.itUid||"";return e("tag").forEach((J)=>{$=J.targetUid||$}),$}function UW(){let $=N.currentGame?.itUid||"";return e("potato-pass").forEach((J)=>{$=J.targetUid||$}),$}var dQ=["wave","clap","spin","cheer"];function NW($){return DH(12,Number($?.seed||1)).map((Q)=>dQ[Q%dQ.length])}function Z6(){if(!N.currentGame)return 0;let $=Math.max(0,Date.now()-Number(N.currentGame.createdAt));return Math.min(2,Math.floor($/12000))}function C8($,J){let Q=Number($?.seed||0);return gK[(Q+J*4)%gK.length]}function I7($){return String($||"").toLowerCase().replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim()}async function ON($){if(N.currentGame?.game!=="quiz"||K0()||n0()!=="play")return;let J=Z6();if(e("quiz-answer").some((K)=>K.uid===N.session.uid&&Number(K.question)===J))return;let Q=C8(N.currentGame,J),W=I7($);if(![Q.a,...Q.also||[]].map(I7).includes(W))return;await l0("quiz-answer",{question:J}),g("Correct answer")}async function l0($,J={}){if(!N.session||!N.currentGame)return null;let Q={type:$,game:N.currentGame.game,uid:N.session.uid,name:p0().slice(0,18),roundId:N.currentGame.id,createdAt:Date.now(),...J},W=await D0(`minigames/${N.roomId}/events`,{method:"POST",body:JSON.stringify(Q)});return N.minigameEvents.push({id:W?.name||`local-${Q.createdAt}`,...Q}),Q}function R0($){let J=Math.sin(Number($)*999.91)*43758.5453;return J-Math.floor(J)}function LN($){let J=(Number($)||1)>>>0,Q=()=>{J+=1831565813;let W=J;return W=Math.imul(W^W>>>15,W|1),W^=W+Math.imul(W^W>>>7,W|61),((W^W>>>14)>>>0)/4294967296};return Array.from({length:16},()=>({x:-13.5+Q()*27,z:-12+Q()*24}))}function EW($){let J=window.__snugWorld;if(!J?.scene||J.mode!=="village")return;if(N.coinRoundId===$.id&&N.coinGroup)return;W9(),N.coinRoundId=$.id,N.coinPositions=LN($.seed);let Q=new c;Q.name="snug-coin-scramble";let W=new T0(0.18,0.18,0.055,24),Z=new v({color:15973701,roughness:0.42,metalness:0.3,emissive:4925952,emissiveIntensity:0.08});N.coinPositions.forEach((K,H)=>{let Y=new y(W,Z);Y.rotation.x=Math.PI/2,Y.position.set(K.x,0.36,K.z),Y.userData.item=H,Q.add(Y)}),J.scene.add(Q),N.coinGroup=Q,GW()}function W9(){if(!N.coinGroup)return;N.coinGroup.parent?.remove(N.coinGroup),N.coinGroup.traverse(($)=>{if($.isMesh)$.geometry?.dispose?.(),$.material?.dispose?.()}),N.coinGroup=null,N.coinRoundId="",N.coinPositions=[]}function GW(){if(!N.coinGroup)return;let $=new Set(e("coin").map((J)=>Number(J.item)));N.coinGroup.children.forEach((J)=>{J.visible=!$.has(Number(J.userData.item))})}var mQ=[[-7.5,-2.4],[7.4,1.1],[-4.2,8.2],[5.8,-8.1],[0.6,6.4],[-6.8,-6.5],[9.2,6.1],[1.4,-4.7],[-12.2,3.6],[12.6,-2.8],[-3.5,12.4],[4.8,-12.2]];function UH($){let J=window.__snugWorld;if(!J?.scene||J.mode!=="village")return;if(N.soloTagGroup&&N.soloTagGroup.userData.roundId===$.id)return;Z9();let Q=new c;Q.name="SoloPracticeTagPal",Q.userData.roundId=$.id;let W=new v({color:15165524,roughness:0.58,emissive:7282456,emissiveIntensity:0.15}),Z=new v({color:16774620,roughness:0.82}),K=new y(new o$(0.28,0.48,5,10),W);K.position.y=0.58;let H=new y(new q0(0.25,14,10),Z);H.position.y=1.18;let Y=new y(new r$(0.42,0.055,10,28),new v({color:15842632,roughness:0.38,metalness:0.16,emissive:6964480,emissiveIntensity:0.2}));Y.rotation.x=Math.PI/2,Y.position.y=0.12,Q.add(K,H,Y),J.scene.add(Q),N.soloTagGroup=Q,N.soloTagTarget=Q,N.soloTagHits=e("tag").filter((X)=>X.uid===N.session?.uid).length,NH()}function NH(){if(!N.soloTagTarget||!N.currentGame)return;let $=(Number(N.currentGame.seed||0)+N.soloTagHits*3)%mQ.length,[J,Q]=mQ[$];N.soloTagTarget.position.set(J,0,Q)}function EH(){if(!N.soloTagGroup||N.soloTagGroup.userData.roundId!==N.currentGame?.id)return;let $=performance.now()*0.003;N.soloTagGroup.position.y=0.08+Math.sin($*1.7)*0.08,N.soloTagGroup.rotation.y=Math.sin($*0.55)*0.35}function Z9(){if(!N.soloTagGroup)return;N.soloTagGroup.parent?.remove(N.soloTagGroup),Y9(N.soloTagGroup),N.soloTagGroup=null,N.soloTagTarget=null,N.soloTagHits=0}function GH($=N.currentGame){return Math.max(0,Date.now()-Number($?.createdAt||0)-3000)}function MN($,J=18){let Q=(Number($)||1)>>>0,W=()=>{return Q=Math.imul(Q^Q>>>15,2246822519)>>>0,Q/4294967296};return Array.from({length:J},(Z,K)=>({item:K,x:8+W()*84,y:10+W()*72,hue:Math.floor(W()*5)}))}async function wN($){if(N.wave1Busy||N.currentGame?.game!=="balloon"||n0()!=="play")return;if(new Set(e("balloon-pop").map((Q)=>Number(Q.item))).has(Number($)))return;N.wave1Busy=!0;try{await l0("balloon-pop",{item:Number($)}),window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"coin-pickup"}})),Y6()}catch(Q){g(O0(Q))}finally{N.wave1Busy=!1}}async function VN(){if(N.wave1Busy||N.currentGame?.game!=="fishing"||n0()!=="play")return;let $=GH(),J=Math.floor($/38000),Q=$%38000/38000;if(J>5)return g("The pond is resting until results");if(Q<0.42)return g("Too early — wait for the golden ring");if(Q>0.68)return g("Too late — the fish slipped away");if(e("fishing-catch").some((W)=>W.uid===N.session?.uid&&Number(W.item)===J))return g("That ripple is quiet now");N.wave1Busy=!0;try{await l0("fishing-catch",{item:J}),window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"coin-pickup"}})),g("Fish landed"),Y6()}catch(W){g(O0(W))}finally{N.wave1Busy=!1}}var H6=new Set(["potato","hide","statues","memory","pattern","draw","cats","bridge","curling","charades","sneaky","snap","puffs","freeze","treasure","snowball","lantern","petal"]),kN={draw:[{clue:"house",options:["House","Cat","Tree","Fish"]},{clue:"fish",options:["Balloon","Fish","Hat","Bridge"]},{clue:"tree",options:["Lantern","Tree","Coin","Pond"]},{clue:"cat",options:["Gate","Cat","Flower","Cloud"]}],charades:[{clue:"wave · point · wave",answer:"Hello",options:["Hello","Sleep","Fishing","Cold"]},{clue:"shiver · hug arms",answer:"Cold",options:["Dance","Cold","Dig","Laugh"]},{clue:"cast · reel · cheer",answer:"Fishing",options:["Running","Fishing","Hiding","Building"]},{clue:"tiptoe · peek · hush",answer:"Sneaking",options:["Sneaking","Singing","Freezing","Waving"]}],sneaky:[{clue:"Marigold looked away. Basil jingled. Pip guarded the empty cup.",answer:"Basil",options:["Marigold","Basil","Pip"]},{clue:"Pip changed seats. Marigold counted the pot. Basil never moved.",answer:"Pip",options:["Marigold","Basil","Pip"]},{clue:"Basil sneezed. Pip watched the door. Marigold hid both hands.",answer:"Marigold",options:["Marigold","Basil","Pip"]}],snap:[{clue:"Pond ripples",answer:"Pond",options:["Pond","Gate","Market","Garden"]},{clue:"Moonlight Footbridge",answer:"Bridge",options:["Town hall","Bridge","Cottage","Pavilion"]},{clue:"Open town gate",answer:"Gate",options:["Garden","Pond","Gate","Market"]},{clue:"Community garden",answer:"Garden",options:["Garden","Bridge","Cottage","Town hall"]}]},DN={potato:["Marigold","Basil","Pip"],hide:["Barrel","Hedge","Bench","Gate","Tree","Stall"],statues:["DANCE","FREEZE"],cats:["CAT","CAT","CAT","CAT","CAT","CAT"],bridge:["PLANK","PEG","PLANK","PEG","PLANK","PEG"],puffs:["LEFT","MIDDLE","RIGHT"],freeze:["TEAMMATE","TEAMMATE","TAGGER","TEAMMATE","TAGGER","TEAMMATE"],treasure:["DIG","DIG","DIG","DIG","DIG","DIG"],snowball:["10","25","50","25","10","50"],lantern:["LANTERN","SHADOW","LANTERN","SHADOW","LANTERN","SHADOW"],petal:["GOLD","GREY","GOLD","GREY","GOLD","GREY"]};function qH($=0){return Number(N.currentGame?.seed||1)+c0(N.session?.uid)*17+$*31>>>0}function qW($,J=0){return qH(J)%Math.max(1,$)}function FH($){let J=c0(N.session?.uid);return{potato:"Pass the glowing potato",hide:"A neighbor is peeking",statues:J%2?"The music stopped":"The band is playing",cats:"Guide the wandering cat",bridge:J%2?"The bridge needs a peg":"The bridge needs a plank",puffs:"Move into the open lane",freeze:"Free a frozen teammate",treasure:"The brightest patch is ready",snowball:"Hit the highest-value target",lantern:"Find a real lantern",petal:"Catch a golden petal"}[$]||r[$]?.note||"Make your move"}function BN($){let J=kN[$]||[],Q=J[qW(J.length)]||J[0];if(!Q)return"";return`${$==="draw"?`<canvas class="challenge-sketch" width="260" height="112" data-sketch="${Q.clue}" aria-label="A neighbor's sketch"></canvas>`:`<div class="challenge-clue">${p(Q.clue)}</div>`}<div class="challenge-choices">${Q.options.map((Z)=>`<button type="button" data-challenge-target data-correct="${String(Z===(Q.answer||Q.clue))}">${p(Z)}</button>`).join("")}</div>`}function CN($){if(!$)return;let J=$.getContext("2d"),Q=$.dataset.sketch;if(J.clearRect(0,0,$.width,$.height),J.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--text")||"#26383b",J.lineWidth=6,J.lineCap="round",J.lineJoin="round",J.beginPath(),Q==="house")J.moveTo(65,58),J.lineTo(130,14),J.lineTo(195,58),J.lineTo(184,58),J.lineTo(184,102),J.lineTo(76,102),J.lineTo(76,58),J.closePath(),J.moveTo(116,102),J.lineTo(116,69),J.lineTo(144,69),J.lineTo(144,102);if(Q==="fish")J.ellipse(125,56,62,34,0,0,Math.PI*2),J.moveTo(63,56),J.lineTo(28,26),J.lineTo(28,86),J.closePath(),J.moveTo(161,46),J.arc(162,46,2,0,Math.PI*2);if(Q==="tree")J.moveTo(130,102),J.lineTo(130,58),J.moveTo(103,102),J.lineTo(157,102),J.moveTo(130,64),J.arc(130,43,34,0.3,Math.PI*2+0.3);if(Q==="cat")J.arc(130,59,38,0,Math.PI*2),J.moveTo(101,35),J.lineTo(99,10),J.lineTo(119,26),J.moveTo(141,26),J.lineTo(161,10),J.lineTo(159,35),J.moveTo(116,60),J.arc(116,60,2,0,Math.PI*2),J.moveTo(144,60),J.arc(144,60,2,0,Math.PI*2),J.moveTo(123,76),J.quadraticCurveTo(130,82,137,76);J.stroke()}function zN(){let $=["SUN","CAT","COIN","HAT","FISH","GATE"],J=[...$,...$],Q=qH(41)||1;for(let W=J.length-1;W>0;W-=1){Q=Q*1664525+1013904223>>>0;let Z=Q%(W+1);[J[W],J[Z]]=[J[Z],J[W]]}return`<div class="challenge-memory">${J.map((W,Z)=>`<button type="button" data-memory-tile="${Z}" data-pair="${W}" aria-label="Hidden tile ${Z+1}"><span>${W}</span></button>`).join("")}</div>`}function _N(){let $=["CORAL","GOLD","TEAL","BLUE"],J=3+Math.min(3,c0(N.session?.uid)%4),Q=Array.from({length:J},(W,Z)=>$[qW($.length,Z)]);return`<div class="challenge-sequence" data-sequence="${Q.join(",")}"><div class="challenge-sequence-cue">${Q.map((W)=>`<i data-color="${W.toLowerCase()}">${W.slice(0,1)}</i>`).join("")}</div><div class="challenge-pads">${$.map((W)=>`<button type="button" data-sequence-pad="${W}" data-color="${W.toLowerCase()}" aria-label="${W} pad"></button>`).join("")}</div></div>`}function PN($){let J=DN[$]||["ONE","TWO","THREE","FOUR","FIVE","SIX"],Q=qW(J.length),W=$==="bridge"?c0(N.session?.uid)%2?"PEG":"PLANK":"",Z=$==="bridge"?J.findIndex((K,H)=>K===W&&H>=Q%2):$==="statues"?c0(N.session?.uid)%2?1:0:$==="puffs"?Q%3:$==="freeze"?J.findIndex((K,H)=>K==="TEAMMATE"&&H>=Q%2):$==="snowball"?J.findIndex((K)=>K==="50"):$==="lantern"?J.findIndex((K,H)=>K==="LANTERN"&&H>=Q%2):$==="petal"?J.findIndex((K,H)=>K==="GOLD"&&H>=Q%2):Q;return`<div class="challenge-targets ${$}">${J.map((K,H)=>`<button type="button" data-challenge-target data-correct="${String(H===Z)}" aria-label="${p(K.toLowerCase())}"><span>${p(K)}</span></button>`).join("")}</div>`}function IN($){if($==="memory")return zN();if($==="pattern")return _N();if(["draw","charades","sneaky","snap"].includes($))return BN($);if($==="curling")return'<div class="challenge-curling"><div class="curling-rings"><i></i></div><label><span>Slide power</span><input type="range" min="0" max="100" value="32" aria-label="Coin slide power"></label><button type="button" data-curl-release>Release coin</button><small>Land between 45 and 65</small></div>';return PN($)}function RH($){if(!H6.has($?.game)||$.game==="potato"&&!$.practice){T7();return}if(N.challengeRoundId===$.id&&N.challengeOverlay)return;T7(),N.challengeRoundId=$.id,N.challengeOpenTiles=[],N.challengeMatched=new Set,N.challengeSequenceProgress=0,N.challengeMemoryLocked=!1;let J=document.createElement("section");J.className=`challenge-overlay ${$.game}`,J.dataset.game=$.game,J.setAttribute("aria-label",`${r[$.game].name} play area`),J.innerHTML=`<div class="challenge-countdown" aria-live="polite"></div><div class="challenge-card"><header><span>Wave ${Math.min(7,r[$.game].wave)}</span><b>${p(r[$.game].name)}</b><strong>0 pt</strong></header><p>${p(FH($.game))}</p><div class="challenge-stage"></div><div class="challenge-status" aria-live="polite">Ready</div></div>`,J.addEventListener("click",TN),document.body.appendChild(J),N.challengeOverlay=J,v7()}function T7(){N.challengeOverlay?.remove(),N.challengeOverlay=null,N.challengeRoundId="",N.challengeBusy=!1,N.challengeOpenTiles=[],N.challengeMatched=new Set,N.challengeSequenceProgress=0,N.challengeMemoryLocked=!1}function v7(){let{challengeOverlay:$,currentGame:J}=N;if(!$||!J||$.dataset.game!==J.game)return;let Q=n0(J),W=$.querySelector(".challenge-countdown"),Z=Math.max(0,Math.ceil((3000-(Date.now()-Number(J.createdAt)))/1000));if(W)W.textContent=Q==="countdown"?String(Math.max(1,Z)):"",W.hidden=Q!=="countdown";$.classList.toggle("is-playing",Q==="play");let K=c0(N.session?.uid),H=$.querySelector("header strong");if(H)H.textContent=`${K} pt`;let Y=$.querySelector(".challenge-card>p");if(Y)Y.textContent=FH(J.game);let X=$.querySelector(".challenge-stage");if(X&&X.dataset.step!==String(K))X.dataset.step=String(K),X.innerHTML=IN(J.game),CN(X.querySelector(".challenge-sketch"))}async function B7(){if(N.challengeBusy||n0()!=="play"||K0())return;N.challengeBusy=!0;let $=N.challengeOverlay?.querySelector(".challenge-status");try{let J=Math.min(99,c0(N.session?.uid));if(await l0("challenge-point",{item:J}),$)$.textContent="Point scored";window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"coin-pickup"}})),v7()}catch(J){if($)$.textContent=O0(J)}finally{N.challengeBusy=!1}}function TN($){if(n0()!=="play")return;let J=N.currentGame?.game,Q=N.challengeOverlay?.querySelector(".challenge-status"),W=$.target.closest("[data-memory-tile]");if(W&&J==="memory"){if(N.challengeMemoryLocked)return;let Y=Number(W.dataset.memoryTile);if(N.challengeMatched.has(Y)||N.challengeOpenTiles.includes(Y))return;if(W.classList.add("is-open"),N.challengeOpenTiles.push(Y),N.challengeOpenTiles.length===2){N.challengeMemoryLocked=!0;let[X,U]=N.challengeOpenTiles.map((E)=>N.challengeOverlay.querySelector(`[data-memory-tile='${E}']`));if(X?.dataset.pair===U?.dataset.pair)N.challengeOpenTiles.forEach((E)=>N.challengeMatched.add(E)),N.challengeOpenTiles=[],X.classList.add("is-matched"),U.classList.add("is-matched"),B7().finally(()=>{N.challengeMemoryLocked=!1});else{if(Q)Q.textContent="Try another pair";setTimeout(()=>{X?.classList.remove("is-open"),U?.classList.remove("is-open"),N.challengeOpenTiles=[],N.challengeMemoryLocked=!1},520)}}return}let Z=$.target.closest("[data-sequence-pad]");if(Z&&J==="pattern"){let Y=N.challengeOverlay.querySelector(".challenge-sequence")?.dataset.sequence?.split(",")||[],X=Y[N.challengeSequenceProgress];if(Z.dataset.sequencePad===X){if(N.challengeSequenceProgress+=1,N.challengeSequenceProgress>=Y.length)N.challengeSequenceProgress=0,B7();else if(Q)Q.textContent=`${N.challengeSequenceProgress}/${Y.length}`}else if(N.challengeSequenceProgress=0,Q)Q.textContent="Sequence reset";return}if($.target.closest("[data-curl-release]")&&J==="curling"){let Y=Number(N.challengeOverlay.querySelector(".challenge-curling input")?.value||0);if(Y>=45&&Y<=65)B7();else if(Q)Q.textContent=Y<45?"A little more power":"Ease off the slide";return}let H=$.target.closest("[data-challenge-target]");if(!H)return;if(H.dataset.correct==="true")B7();else if(Q)Q.textContent=J==="petal"?"Grey petal — let it drift":"Try another"}function OH(){if(N.minigameAssetGroup)N.minigameAssetGroup.parent?.remove(N.minigameAssetGroup),Y9(N.minigameAssetGroup);N.minigameAssetGroup=null,N.minigameAssetRoundId=""}async function AN($){OH();let J=window.__snugWorld,Q=r[$?.game]?.propFolder;if(!J?.scene||J.mode!=="village"||!Q)return;let W=$.id;try{let K=await(await xK()).loadMinigameProps(Q);if(!K.length||N.currentGame?.id!==W||window.__snugWorld!==J)return;let H=new c;H.name=`snug-${$.game}-custom-props`;let Y=$.game==="sprint"?N.partyArena?.points||[]:$.game==="fishing"?[[4.2,-3.8],[5.3,-2.9],[3.2,-2.7]]:[[-5,-1],[0,-4],[5,1],[0,5]],X=$.game==="sprint"?Y.length:K.length;for(let U=0;U<X;U+=1){let E=K[U%K.length].scene.clone(!0),G=new h0().setFromObject(E),q=G.getSize(new w),F=Math.max(q.x,q.y,q.z,0.001),R=($.game==="sprint"?1.4:1.1)/F;E.scale.multiplyScalar(R);let O=G.getCenter(new w);E.position.set(-O.x*R,-G.min.y*R,-O.z*R);let M=new c,[V,D]=Y[U%Math.max(1,Y.length)]||[0,0];M.position.set(V,0,D),M.add(E),H.add(M)}J.scene.add(H),N.minigameAssetGroup=H,N.minigameAssetRoundId=W}catch{}}function LH($){if(!["balloon","fishing","sprint"].includes($?.game)){A7();return}if(N.wave1RoundId===$.id&&N.wave1Overlay)return;A7();let J=document.createElement("section");if(J.className=`wave1-overlay ${$.game}`,J.dataset.game=$.game,J.setAttribute("aria-label",`${r[$.game].name} play area`),$.game==="balloon"){let Q=["coral","gold","teal","blue","rose"];J.innerHTML=`<div class="wave1-countdown" aria-live="polite"></div><div class="balloon-field">${MN($.seed).map((W)=>`<button type="button" class="mini-balloon ${Q[W.hue]}" data-balloon="${W.item}" style="--balloon-x:${W.x}%;--balloon-y:${W.y}%;--balloon-delay:${W.item%6*-0.31}s" aria-label="Pop balloon ${W.item+1}"><i></i></button>`).join("")}</div>`,J.addEventListener("click",(W)=>{let Z=W.target.closest("[data-balloon]");if(Z)wN(Z.dataset.balloon)})}else if($.game==="fishing")J.innerHTML='<div class="wave1-countdown" aria-live="polite"></div><div class="fishing-action"><span class="pond-ripple" aria-hidden="true"><i></i></span><span><small>Watch the ripple</small><b>Cast in the golden ring</b></span><button type="button" data-fishing-cast>Cast</button></div>',J.querySelector("[data-fishing-cast]")?.addEventListener("click",VN);else J.innerHTML='<div class="wave1-countdown" aria-live="polite"></div><div class="sprint-action"><span><small>Next gate</small><b>Gate 1 of 8</b></span><strong>Tap the ground to run</strong></div>';document.body.appendChild(J),N.wave1Overlay=J,N.wave1RoundId=$.id,Y6()}function Y6(){let{wave1Overlay:$,currentGame:J}=N;if(!$||!J||$.dataset.game!==J.game)return;let Q=n0(J),W=$.querySelector(".wave1-countdown");if(W){let Z=Math.max(0,Math.ceil((3000-(Date.now()-Number(J.createdAt)))/1000));W.textContent=Q==="countdown"?Z?String(Z):"GO":"",W.hidden=Q!=="countdown"}if($.classList.toggle("is-counting",Q==="countdown"),J.game==="balloon"){let Z=new Set(e("balloon-pop").map((H)=>Number(H.item))),K=[...$.querySelectorAll("[data-balloon]")].filter((H)=>!Z.has(Number(H.dataset.balloon))).slice(0,7);$.querySelectorAll("[data-balloon]").forEach((H)=>{H.hidden=!K.includes(H)||Q!=="play"})}else if(J.game==="fishing"){let Z=GH(J),K=Math.floor(Z/38000),H=Z%38000/38000,Y=Q==="play"&&K<=5&&H>=0.42&&H<=0.68;$.classList.toggle("is-ready",Y);let X=$.querySelector("[data-fishing-cast]");if(X)X.disabled=Q!=="play"||K>5,X.textContent=K>5?"Done":Y?"CAST!":"Cast"}else if(J.game==="sprint"){let Z=c0(N.session?.uid),K=$.querySelector(".sprint-action b");if(K)K.textContent=Z>=8?"Course complete":`Gate ${Z+1} of 8`}}function A7(){N.wave1Overlay?.remove(),N.wave1Overlay=null,N.wave1RoundId="",N.wave1Busy=!1}function SN($,J){let Q=document.createElement("canvas");Q.width=512,Q.height=160;let W=Q.getContext("2d");W.fillStyle=J,W.fillRect(0,0,Q.width,Q.height),W.strokeStyle="#fffdf8",W.lineWidth=10,W.strokeRect(8,8,Q.width-16,Q.height-16),W.fillStyle="#fffdf8",W.font="900 48px Arial, sans-serif",W.textAlign="center",W.textBaseline="middle",W.fillText($,Q.width/2,Q.height/2);let Z=new m6(Q);return Z.colorSpace=d0,Z}function jN($){let J=new c;J.name=`Storefront_${$.id}`,J.position.set($.x,0,$.z),J.rotation.y=$.rotation||0;let Q=new v({color:$.wall,roughness:0.9}),W=new v({color:$.trim,roughness:0.8}),Z=new v({color:3361100,roughness:0.78}),K=new y(new i(2.5,2.35,1.55),Q);K.position.y=1.18,K.castShadow=!0,J.add(K);let H=new y(new x0(1.85,0.8,4),W);H.position.y=2.72,H.rotation.y=Math.PI/4,H.scale.z=0.72,J.add(H);let Y=new y(new i(0.72,1.45,0.08),Z);Y.position.set(0,0.74,0.82),J.add(Y),[-0.78,0.78].forEach((q)=>{let F=new y(new i(0.55,0.7,0.07),new v({color:10342873,roughness:0.3,metalness:0.05}));F.position.set(q,1.35,0.82),J.add(F)});let X=new y(new i(2.25,0.12,0.62),W);X.position.set(0,1.92,1.05),X.rotation.x=-0.18,J.add(X);let U=new y(new o6(1.95,0.61),new I0({map:SN($.sign,$.signColor),transparent:!1}));U.position.set(0,2.38,0.81),J.add(U);let E=new y(new i(1.2,0.12,0.55),new v({color:13351315,roughness:1}));E.position.set(0,0.06,1.03),J.add(E);let G=new w(0,0,1.35).applyAxisAngle(new w(0,1,0),J.rotation.y).add(J.position);return J.userData.definition=$,J.userData.entrance=G,J}function MH(){let $=window.__snugWorld;if(!$?.scene||$.mode!=="village"||N.shopWorld===$)return;if(N.shopGroup)N.shopGroup.parent?.remove(N.shopGroup),Y9(N.shopGroup);let J=[{id:"salon",name:"Curl & Comb",sign:"SALON",note:"Hairstyles and headwear",x:-17.5,z:-7.5,rotation:Math.PI/2,wall:15845839,trim:12083056,signColor:"#a94f63"},{id:"mall",name:"Pocket Mall",sign:"MALL",note:"Accessories and outfits",x:17.5,z:-7.5,rotation:-Math.PI/2,wall:13098986,trim:5144980,signColor:"#42788b"},{id:"furniture",name:"Hearth & Home",sign:"HOME",note:"Furniture, rugs, and wallpaper",x:-17.5,z:8.2,rotation:Math.PI/2,wall:15192741,trim:10121290,signColor:"#845d3d"},{id:"garden",name:"Green Nook",sign:"GARDEN",note:"Plants and outdoor decorations",x:17.5,z:8.2,rotation:-Math.PI/2,wall:13230005,trim:6260053,signColor:"#527747"}],Q=new c;Q.name="SnugVillageShops";let W=J.map((Z)=>{let K=jN(Z);return Q.add(K),{...Z,entrance:K.userData.entrance}});$.scene.add(Q),N.shopWorld=$,N.shopGroup=Q,N.shops=W}function fN($){if(!$)return;if(W0(".multiplayer-backdrop"))Y8();[...document.querySelectorAll(".tabbar button")].find((W)=>W.textContent.trim()==="Style")?.click(),setTimeout(()=>{W0(".shop-link")?.click(),setTimeout(()=>{let Z=[...document.querySelectorAll(".sheet")].find((Y)=>Y.querySelector(".sheet-head h2")?.textContent.trim()==="Meadow Market");if(!Z)return;let K=$.id==="salon"?new Set(["Hairstyle","Hat"]):$.id==="furniture"?new Set(["Furniture","Wallpaper","Carpet"]):$.id==="garden"?new Set(["Furniture"]):new Set(["Hat","Head accessory","Outfit","Hand accessory","Shoes"]);Z.querySelectorAll(".shop-item").forEach((Y)=>{Y.hidden=!K.has(Y.querySelector("small")?.textContent.trim())});let H=Z.querySelector(".sheet-head h2");if(H)H.textContent=$.name},0)},0)}function S7(){let $=W0(".shop-entrance");if(!$)$=document.createElement("div"),$.className="shop-entrance",$.hidden=!0,$.innerHTML='<span><small></small><b></b></span><button type="button">Walk in</button>',$.querySelector("button").addEventListener("click",()=>fN(N.nearbyShop)),document.body.appendChild($);if($.hidden=!N.nearbyShop||Boolean(N.currentGame&&!K0()),N.nearbyShop)$.querySelector("small").textContent=N.nearbyShop.note,$.querySelector("b").textContent=N.nearbyShop.name,$.querySelector("button").setAttribute("aria-label",`Enter ${N.nearbyShop.name}`)}function wH(){if(MH(),!N.shops.length||window.__snugWorld?.mode!=="village"){N.nearbyShop=null,S7();return}let $=N.shops.map((Q)=>({shop:Q,distance:Math.hypot(Q.entrance.x-N.position.x,Q.entrance.z-N.position.z)})).sort((Q,W)=>Q.distance-W.distance)[0],J=$?.distance<1.35?$.shop:null;if(J?.id!==N.nearbyShop?.id)N.nearbyShop=J,S7()}function hN(){let $=new c,J=[],Q=(K,H,Y)=>{let X=new c,U=new v({color:K,roughness:0.9}),E=new y(new q0(0.12,8,6),U);E.scale.set(1.25,0.85,0.9);let G=new y(new q0(0.085,8,6),U);G.position.set(0,0.08,0.11);let q=new y(new x0(0.035,0.1,5),new v({color:15312972}));q.rotation.x=Math.PI/2,q.position.set(0,0.07,0.21),X.add(E,G,q),X.userData={kind:"bird",radius:H,phase:Y,speed:0.00022+Y*0.00001,collisionRadius:0.23},$.add(X),J.push(X)},W=(K,H,Y)=>{let X=new c;X.name=`VillageCat_${K.name}`;let U=new v({color:K.base,roughness:K.fluffy?1:0.92}),E=new y(new q0(K.fluffy?0.24:0.2,K.fluffy?14:10,K.fluffy?10:7),U);E.scale.set(K.fluffy?0.95:0.8,K.fluffy?1:0.8,K.fluffy?1.45:1.35),E.position.y=K.fluffy?0.25:0.21;let G=new y(new q0(K.fluffy?0.19:0.16,K.fluffy?14:10,K.fluffy?10:7),U);G.position.set(0,K.fluffy?0.46:0.39,0.2),[-0.08,0.08].forEach((F)=>{let R=new y(new x0(K.fluffy?0.075:0.065,K.fluffy?0.18:0.16,4),U);R.position.set(F,K.fluffy?0.65:0.55,0.2),R.rotation.y=Math.PI/4,X.add(R)});let q=new y(new T0(K.fluffy?0.06:0.035,K.fluffy?0.075:0.045,K.fluffy?0.55:0.48,K.fluffy?8:6),U);if(q.position.set(0.18,K.fluffy?0.42:0.34,-0.2),q.rotation.z=-0.7,X.add(E,G,q),(K.patches||[]).forEach((F,R)=>{let O=new y(new q0(0.075+R*0.012,8,6),new v({color:F,roughness:1}));O.scale.set(1.35,0.65,0.35),O.position.set(R%2?-0.105:0.105,R===0?0.27:0.42,R===0?0.235:0.34),X.add(O)}),K.whiteChest){let F=new y(new q0(0.105,9,6),new v({color:16118505,roughness:1}));F.scale.set(0.75,1.05,0.35),F.position.set(0,0.28,0.31),X.add(F)}if(K.stripes)for(let F=0;F<3;F+=1){let R=new y(new i(0.28,0.025,0.045),new v({color:K.stripes,roughness:1}));R.position.set(0,0.32-F*0.055,-0.02-F*0.07),X.add(R)}X.userData={kind:"cat",coat:K.name,radius:H,phase:Y,speed:0.00007+Y%3*0.000009,collisionRadius:K.fluffy?0.4:0.34},$.add(X),J.push(X)},Z=(K,H,Y)=>{let X=new c,U=new v({color:K,roughness:1}),E=new y(new q0(0.17,9,7),U);E.position.y=0.17;let G=new y(new q0(0.13,9,7),U);G.position.set(0,0.36,0.13),[-0.055,0.055].forEach((q)=>{let F=new y(new o$(0.035,0.16,3,6),U);F.position.set(q,0.57,0.12),X.add(F)}),X.add(E,G),X.userData={kind:"bunny",radius:H,phase:Y,speed:0.00011+Y*0.000005,collisionRadius:0.3},$.add(X),J.push(X)};return Q(14056533,9.2,0.4),Q(6260903,15.1,1.8),W({name:"OrangeTabby",base:14255931,stripes:10178339},8.8,2.9),W({name:"Grey",base:7830400},13.6,4.1),W({name:"BlackAndWhite",base:2697513,whiteChest:!0,patches:[16052456]},6.7,0.9),W({name:"Tortoiseshell",base:4008743,patches:[13596729,14265698,1512725]},17.25,5.5),W({name:"WhiteLonghair",base:16052971,fluffy:!0},11.35,3.8),W({name:"BlackLonghair",base:2106153,fluffy:!0,whiteChest:!0},19.05,1.4),W({name:"Calico",base:16051937,patches:[14121528,3156777,14121528]},7.95,4.65),W({name:"BrownTabby",base:9072986,stripes:5061425,whiteChest:!0},15.9,6),Z(14209478,12.45,5.25),{group:$,creatures:J}}function cQ($){return Math.max(0,Math.min(1,$))}function j7($){let J=cQ($);return J*J*(3-2*J)}function vN(){let $=new E7({side:hJ,depthWrite:!1,depthTest:!1,fog:!1,uniforms:{topColor:{value:new h(7912920)},horizonColor:{value:new h(14216688)},lowerColor:{value:new h(10933983)}},vertexShader:`
      varying float vSkyHeight;
      void main() {
        vSkyHeight = normalize(position).y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 topColor;
      uniform vec3 horizonColor;
      uniform vec3 lowerColor;
      varying float vSkyHeight;
      void main() {
        float upper = smoothstep(0.0, 0.78, max(vSkyHeight, 0.0));
        float lower = smoothstep(0.0, 0.7, max(-vSkyHeight, 0.0));
        vec3 color = mix(horizonColor, topColor, upper);
        color = mix(color, lowerColor, lower);
        gl_FragColor = vec4(color, 1.0);
      }
    `}),J=new y(new q0(150,40,24),$);return J.name="SnugGradientSky",J.frustumCulled=!1,J.renderOrder=-1000,J}function yN(){let $=new c;return $.name="SnugAfterRainRainbow",[16018274,16164427,16111197,7454584,6597084,8942795,12087218].forEach((Q,W)=>{let Z=21.5-W*0.72,K=new y(new r$(Z,0.34,14,128,Math.PI),new I0({color:Q,transparent:!0,opacity:0,depthWrite:!1,side:R8,toneMapped:!1}));K.renderOrder=-20+W,$.add(K)}),$.visible=!1,$}function bN(){let $=document.createElement("canvas");$.width=512,$.height=64;let J=$.getContext("2d"),Q=J.createLinearGradient(0,0,$.width,0);Q.addColorStop(0,"rgba(255,255,255,0)"),Q.addColorStop(0.72,"rgba(225,240,255,.34)"),Q.addColorStop(0.94,"rgba(255,252,222,.92)"),Q.addColorStop(1,"rgba(255,255,255,1)"),J.fillStyle=Q,J.fillRect(0,22,$.width,20);let W=J.createRadialGradient(492,32,0,492,32,20);W.addColorStop(0,"rgba(255,255,255,1)"),W.addColorStop(0.35,"rgba(255,246,203,.95)"),W.addColorStop(1,"rgba(255,255,255,0)"),J.fillStyle=W,J.fillRect(470,10,42,44);let Z=new m6($);return Z.colorSpace=d0,Z}function xN(){let $=bN();return Array.from({length:3},(J,Q)=>{let W=new l6({map:$,transparent:!0,opacity:0,depthWrite:!1,blending:vJ,toneMapped:!1,rotation:-0.18-Q*0.05}),Z=new Q7(W);return Z.name=`SnugShootingStar_${Q+1}`,Z.scale.set(6.2,0.62,1),Z.visible=!1,Z.userData.active=!1,Z.raycast=()=>{},Z})}function gN(){let $=document.getElementById("snug-lens-flare");if($)return $;if(!document.getElementById("snug-lens-flare-style")){let J=document.createElement("style");J.id="snug-lens-flare-style",J.textContent=`
      #snug-lens-flare{position:absolute;z-index:3;inset:0;overflow:hidden;pointer-events:none;opacity:0;mix-blend-mode:screen;transition:opacity .18s linear}
      #snug-lens-flare span{position:absolute;display:block;border-radius:50%;transform:translate(-50%,-50%);will-change:left,top,opacity}
      #snug-lens-flare .flare-core{width:clamp(64px,12vw,132px);aspect-ratio:1;background:radial-gradient(circle,rgba(255,255,238,.98) 0 4%,rgba(255,224,130,.52) 22%,rgba(255,190,92,.16) 48%,transparent 72%);filter:blur(.5px)}
      #snug-lens-flare .flare-ghost{width:var(--flare-size);aspect-ratio:1;border:1px solid rgba(255,245,196,.17);background:radial-gradient(circle,rgba(255,244,198,.2),rgba(244,130,93,.09) 42%,transparent 70%)}
      #snug-lens-flare .flare-streak{width:clamp(90px,18vw,220px);height:2px;background:linear-gradient(90deg,transparent,rgba(255,241,191,.42),transparent);transform:translate(-50%,-50%) rotate(-16deg)}
      @media(prefers-reduced-motion:reduce){#snug-lens-flare{transition:none}#snug-lens-flare .flare-ghost,#snug-lens-flare .flare-streak{display:none}}
    `,document.head.appendChild(J)}return $=document.createElement("div"),$.id="snug-lens-flare",$.setAttribute("aria-hidden","true"),$.innerHTML='<span class="flare-core"></span><span class="flare-ghost" data-factor="0.62" style="--flare-size:52px"></span><span class="flare-ghost" data-factor="0.18" style="--flare-size:24px"></span><span class="flare-ghost" data-factor="-0.34" style="--flare-size:78px"></span><span class="flare-streak"></span>',(document.querySelector(".app-shell")||document.body).appendChild($),$}function pN($,J,Q,W){if(!$.skyDome||!window.__snugWorld?.camera)return;$.skyDome.position.copy(window.__snugWorld.camera.position);let Z=Math.sin((J.dayFraction-0.25)*Math.PI*2),K=j7(1-Math.abs(Z)/0.44)*(1-Q*0.82),H=j7(J.daylight),Y=$.colors.skyTopTarget.copy($.colors.nightSkyTop).lerp($.colors.daySkyTop,H).lerp($.colors.twilightTop,K),X=$.colors.skyHorizonTarget.copy($.colors.nightHorizon).lerp($.colors.dayHorizon,H).lerp($.colors.twilightHorizon,K),U=$.colors.skyLowerTarget.copy($.colors.nightSky).lerp($.colors.daySky,H).lerp($.colors.twilightLower,K*0.86);Y.lerp($.colors.stormSky,Q),X.lerp($.colors.stormHorizon,Q),U.lerp($.colors.stormSky,Q);let E=1-Math.exp(-W/14);$.skyDome.material.uniforms.topColor.value.lerp(Y,E),$.skyDome.material.uniforms.horizonColor.value.lerp(X,E),$.skyDome.material.uniforms.lowerColor.value.lerp(U,E)}function lN($,J,Q,W){if(!$.rainbow)return;if($.lastWeather==="Rain"&&J.weather==="Clear"&&!J.isNight)$.rainbowUntil=Q+18000;$.lastWeather=J.weather;let K=J.weather==="Clear"&&!J.isNight&&J.daylight>0.18;if(!K)$.rainbowUntil=0;let H=K&&Q<$.rainbowUntil?1:0;if($.rainbowOpacity+=(H-$.rainbowOpacity)*(1-Math.exp(-W/(H?3.5:4.8))),$.rainbow.visible=$.rainbowOpacity>0.008,$.rainbow.children.forEach((X,U)=>{X.material.opacity=$.rainbowOpacity*(0.58-U*0.025)}),!$.rainbow.visible)return;let Y=$.effectScratch.rainbowTarget.set($.sun.position.x,0,$.sun.position.z);if(Y.lengthSq()<0.001)Y.set(0,0,-1);Y.normalize().multiplyScalar(-72),Y.y=15,$.rainbow.position.copy(Y),$.rainbow.rotation.y=Math.atan2(-Y.x,-Y.z)}function uN($,J){let Q=$.shootingStars.find((U)=>!U.userData.active),W=window.__snugWorld?.camera;if(!Q||!W)return;let Z=$.effectScratch.forward,K=$.effectScratch.right,H=$.effectScratch.up;W.getWorldDirection(Z).normalize(),K.crossVectors(Z,W.up).normalize(),H.crossVectors(K,Z).normalize();let Y=Q.userData.start||=new w,X=Q.userData.velocity||=new w;Y.copy(W.position).addScaledVector(Z,54).addScaledVector(K,(Math.random()-0.5)*28).addScaledVector(H,7+Math.random()*13),X.copy(K).multiplyScalar(8+Math.random()*5).addScaledVector(H,-2.1-Math.random()*2.2),Q.position.copy(Y),Q.userData.active=!0,Q.userData.startedAt=J,Q.userData.duration=900+Math.random()*650,Q.visible=!0}function dN($,J){if(!$.latestPhase||window.matchMedia?.("(prefers-reduced-motion: reduce)").matches){$.shootingStars?.forEach((Q)=>{Q.visible=!1,Q.userData.active=!1});return}if(!$.latestPhase.isNight){$.shootingStars.forEach((Q)=>{Q.visible=!1,Q.userData.active=!1}),$.nextShootingStarAt=Math.max($.nextShootingStarAt||0,J+5500);return}if(J>=$.nextShootingStarAt)uN($,J),$.nextShootingStarAt=J+11000+Math.random()*17000;$.shootingStars.forEach((Q)=>{if(!Q.userData.active)return;let W=(J-Q.userData.startedAt)/Q.userData.duration;if(W>=1){Q.userData.active=!1,Q.visible=!1;return}Q.position.copy(Q.userData.start).addScaledVector(Q.userData.velocity,W),Q.material.opacity=Math.sin(W*Math.PI)*Math.min(1,(1-$.latestPhase.daylight)*1.8)})}function mN($){let J=window.__snugWorld,Q=$.lensFlare;if(!Q||!J?.camera||!J?.renderer||!$.latestPhase)return;let W=J.camera,Z=$.effectScratch.sunWorld,K=$.effectScratch.projected,H=$.effectScratch.cameraDirection,Y=$.effectScratch.toSun;$.sun.getWorldPosition(Z),W.getWorldDirection(H),Y.copy(Z).sub(W.position);let X=H.dot(Y.normalize());K.copy(Z).project(W);let U=X>0&&K.z>-1&&K.z<1&&Math.abs(K.x)<1.15&&Math.abs(K.y)<1.15,E=cQ(1-Math.max(Math.abs(K.x),Math.abs(K.y))/1.15),G=j7(($.sun.position.y+2)/12),q=1-($.latestStormMix||0)*0.9,F=U&&$.sun.visible?E*G*q*0.92:0;if(Q.style.opacity=String(F),F<=0.004)return;let R=J.renderer.domElement.getBoundingClientRect(),O=Q.getBoundingClientRect(),M=R.left-O.left+(K.x*0.5+0.5)*R.width,V=R.top-O.top+(-K.y*0.5+0.5)*R.height,D=R.left-O.left+R.width*0.5,k=R.top-O.top+R.height*0.5,B=Q.querySelector(".flare-core"),C=Q.querySelector(".flare-streak");[B,C].forEach((z)=>{z.style.left=`${M}px`,z.style.top=`${V}px`}),Q.querySelectorAll(".flare-ghost").forEach((z)=>{let _=Number(z.dataset.factor||0);z.style.left=`${D+(M-D)*_}px`,z.style.top=`${k+(V-k)*_}px`,z.style.opacity=String(cQ(F*(0.65+Math.abs(_)*0.25)))})}function cN($){let J=N.environment;if(!J||window.__snugWorld?.mode!=="village"){if(J?.lensFlare)J.lensFlare.style.opacity="0";return}dN(J,$),mN(J)}function VH(){let $=window.__snugWorld;if(!$?.scene||$.mode!=="village"||N.environmentWorld===$)return;if(N.environment?.group)N.environment.group.parent?.remove(N.environment.group),Y9(N.environment.group);let J=new c;J.name="SnugLivingWorld";let Q=new y(new q0(0.78,48,32),new I0({color:16766575,toneMapped:!1}));Q.name="SnugRoundSun";let W=new y(new q0(0.55,24,18),new I0({color:14280191,toneMapped:!1})),Z=vN(),K=yN(),H=xN();J.add(Z,Q,W,K,...H);let Y=53,X=52,U=Math.sqrt(Y*Y-X*X),E=Math.acos(U/Y),G=new y(new q0(Y,64,40,0,Math.PI*2,E,Math.PI-E),new v({color:5214082,roughness:0.98,metalness:0}));G.name="SnugPlanetGlobe",G.position.y=-0.47-U,G.receiveShadow=!0,J.add(G);let q=new Z0,F=[];for(let A=0;A<180;A+=1){let s=R0(A*31.7+4.2)*Math.PI*2,L0=28+R0(A*17.9)*34;F.push(Math.cos(s)*L0,14+R0(A*8.4)*18,Math.sin(s)*L0)}q.setAttribute("position",new a(F,3));let R=new f$(q,new w$({color:16184272,size:0.09,transparent:!0,opacity:0}));J.add(R);let O=[],M=new q0(1,10,7);for(let A=0;A<24;A+=1){let s=new c,L0=new v({color:16777215,roughness:1,transparent:!0,opacity:0.82}),_0=3+Math.floor(R0(A*7.31+2.4)*4),Y0=0.66+R0(A*4.17+8.2)*0.64;for(let V0=0;V0<_0;V0+=1){let B$=(_0-1)/2,x$=(0.36+R0(A*17.3+V0*3.7)*0.34)*Y0,C$=new y(M,L0);C$.position.set((V0-B$)*Y0*(0.34+R0(V0*5.9+A)*0.18),(R0(A*13.2+V0)-0.35)*Y0*0.34,(R0(A*3.4+V0*9.1)-0.5)*Y0*0.42),C$.scale.set(x$*(1.05+R0(A+V0*2.1)*0.35),x$*(0.68+R0(A*2.2+V0)*0.26),x$*(0.72+R0(A*6.8+V0)*0.3)),s.add(C$)}let E0=A/24*Math.PI*2+(R0(A*9.7)-0.5)*0.42,C0=22+R0(A*11.2+1)*31;s.position.set(Math.cos(E0)*C0,10.5+R0(A*5.3+4)*8.5,Math.sin(E0)*C0),s.rotation.y=-E0+(R0(A*3.9)-0.5)*0.6,s.userData={angle:E0,radius:C0,baseY:s.position.y,speed:0.006+R0(A*7.6+3)*0.007,bob:R0(A*6.1+9)*Math.PI*2},J.add(s),O.push(s)}let V=720,D=new Z0,k=new Float32Array(V*3),B={baseX:new Float32Array(V),baseZ:new Float32Array(V),speed:new Float32Array(V),phase:new Float32Array(V)};for(let A=0;A<V;A+=1){let s=(R0(A*4.73)-0.5)*92,L0=(R0(A*2.41+2)-0.5)*88;k[A*3]=B.baseX[A]=s,k[A*3+1]=-1.4+R0(A*8.17)*11,k[A*3+2]=B.baseZ[A]=L0,B.speed[A]=0.76+R0(A*12.43+7)*0.42,B.phase[A]=R0(A*6.77+5)*Math.PI*2}D.setAttribute("position",new M0(k,3));let C=new f$(D,new w$({color:11457769,size:0.045,transparent:!0,opacity:0,depthWrite:!1,sizeAttenuation:!0}));C.name="SnugWeatherParticles",J.add(C);let z=new y(new V8(52,96),new v({color:16054519,roughness:1,transparent:!0,opacity:0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}));z.name="SnugSnowCover",z.rotation.x=-Math.PI/2,z.position.y=0.036,z.renderOrder=1,J.add(z);let _=hN();J.add(_.group),$.scene.add(J);let P=[],T=null;$.scene.traverse((A)=>{if(A.isAmbientLight||A.isHemisphereLight||A.isDirectionalLight)P.push({node:A,base:A.intensity});let s=A.geometry?.parameters;if(!T&&A.isMesh&&s?.radiusTop>=8&&s?.height<=1)T=A});let f=T?.material?.color?.clone?.()||null,b=G.material.color.clone(),x=kH();N.environment={group:J,skyDome:Z,sun:Q,moon:W,stars:R,shootingStars:H,rainbow:K,clouds:O,weather:C,weatherData:B,snowCover:z,terrain:T,terrainBaseColor:f,globe:G,globeBaseColor:b,wildlife:_.creatures,lights:P,lastLightning:0,lightningUntil:0,displayWeather:x.weather==="Clear"?"Rain":x.weather,weatherIntensity:0,snowAccumulation:0,lastTickTime:performance.now(),lastWeather:x.weather,rainbowUntil:0,rainbowOpacity:0,nextShootingStarAt:performance.now()+7000+Math.random()*9000,lensFlare:gN(),latestPhase:x,latestStormMix:0,effectScratch:{forward:new w,right:new w,up:new w,rainbowTarget:new w,sunWorld:new w,projected:new w,cameraDirection:new w,toSun:new w},colors:{daySky:new h(10474463),nightSky:new h(1517375),stormSky:new h(6649212),stormHorizon:new h(9016730),daySkyTop:new h(7650776),dayHorizon:new h(14348525),nightSkyTop:new h(1055286),nightHorizon:new h(3031133),twilightTop:new h(13072288),twilightHorizon:new h(16751458),twilightLower:new h(15770231),clearCloud:new h(16777215),stormCloud:new h(7964554),snowGround:new h(16054519),snow:new h(16777215),rain:new h(8895445),skyTarget:new h,cloudTarget:new h,skyTopTarget:new h,skyHorizonTarget:new h,skyLowerTarget:new h}},N.environmentWorld=$;let d=$.player?.position;if(d)N.lastSafePosition={x:d.x,y:d.y,z:d.z}}function kH($=Date.now()){let J=$%7200000/7200000,Q=Math.floor(J*24),W=Math.floor((J*24-Q)*60),Z=["Spring","Summer","Autumn","Winter"],K=Math.floor($/90000)%4,H=Math.floor($/28000)%4,Y=H===1?K===3?"Snow":"Rain":H===3?"Thunderstorm":"Clear",X=Math.sin((J-0.25)*Math.PI*2);return{dayFraction:J,hour:Q,minute:W,seasonIndex:K,season:Z[K],weather:Y,daylight:Math.max(0,Math.min(1,X*0.7+0.45)),isNight:X<-0.08}}function nN($){let J=W0(".world-weather");if(!J)J=document.createElement("div"),J.className="world-weather",document.body.appendChild(J);J.hidden=window.__snugWorld?.mode!=="village";let Q=$.hour%12||12;J.className=`world-weather ${$.isNight?"night":"day"} ${$.weather==="Thunderstorm"?"storm":""}`,J.innerHTML=`<i></i><span>${$.season} · ${$.weather} · ${Q}:${String($.minute).padStart(2,"0")} ${$.hour>=12?"PM":"AM"}</span>`}function sN(){if(!N.audioUnlocked)return;try{let $=window.AudioContext||window.webkitAudioContext;if(!$)return;N.thunderContext||=new $;let J=N.thunderContext;if(J.state==="suspended")J.resume();let Q=1.1,W=J.createBuffer(1,J.sampleRate*Q,J.sampleRate),Z=W.getChannelData(0);for(let X=0;X<Z.length;X+=1)Z[X]=(Math.random()*2-1)*Math.pow(1-X/Z.length,2.2);let K=J.createBufferSource(),H=J.createBiquadFilter(),Y=J.createGain();H.type="lowpass",H.frequency.value=260,Y.gain.setValueAtTime(0.16,J.currentTime),Y.gain.exponentialRampToValueAtTime(0.001,J.currentTime+Q),K.buffer=W,K.connect(H).connect(Y).connect(J.destination),K.start()}catch{}}function iN($=performance.now()){VH();let J=N.environment;if(!J||window.__snugWorld?.mode!=="village"){let C=W0(".world-weather");if(C)C.hidden=!0;return}if(document.documentElement.classList.contains("snug-photo-mode"))return;let Q=Date.now(),W=kH(Q);J.latestPhase=W;let Z=Math.max(0,Math.min(0.1,($-J.lastTickTime)/1000));J.lastTickTime=$;let K=W.weather==="Clear"?0:1,H=K>J.weatherIntensity?10:8;if(J.weatherIntensity+=(K-J.weatherIntensity)*(1-Math.exp(-Z/H)),K===0&&J.weatherIntensity<0.025)J.weatherIntensity=0;if(W.weather!=="Clear"&&J.targetWeather!==W.weather)J.displayWeather=W.weather;if(W.weather==="Clear"&&J.weatherIntensity===0)J.displayWeather="Clear";J.targetWeather=W.weather;let Y=W.weather==="Snow"?1:0,X=Y>J.snowAccumulation?Z/18:Z/22;J.snowAccumulation=q$.clamp(J.snowAccumulation+Math.sign(Y-J.snowAccumulation)*Math.min(Math.abs(Y-J.snowAccumulation),X),0,1);let U=W.dayFraction*Math.PI*2-Math.PI;J.sun.position.set(Math.cos(U)*38,Math.sin(U)*24+17,-28),J.moon.position.set(-J.sun.position.x,34-J.sun.position.y,28),J.sun.visible=!W.isNight,J.moon.visible=W.isNight,J.stars.material.opacity=W.isNight?Math.min(0.9,(1-W.daylight)*1.3):0,J.lights.forEach(({node:C,base:z})=>{C.intensity=z*(0.28+W.daylight*0.72)});let E=W.weather==="Thunderstorm"?J.weatherIntensity:0;J.latestStormMix=E;let G=Math.sin((W.dayFraction-0.25)*Math.PI*2),q=j7(1-Math.abs(G)/0.44)*(1-E*0.82),F=J.colors.skyTarget.copy(W.isNight?J.colors.nightSky:J.colors.daySky).lerp(J.colors.twilightLower,q*0.52).lerp(J.colors.stormSky,E),R=1-Math.exp(-Z/10);if(window.__snugWorld.scene.background?.lerp?.(F,R),window.__snugWorld.scene.fog?.color)window.__snugWorld.scene.fog.color.lerp(F,R);pN(J,W,E,Z),lN(J,W,Q,Z);let O=J.colors.cloudTarget.copy(J.colors.clearCloud).lerp(J.colors.stormCloud,E),M=0.72+J.weatherIntensity*0.23,V=1-Math.exp(-Z/9);if(J.clouds.forEach((C,z)=>{C.userData.angle=(C.userData.angle+C.userData.speed*Z)%(Math.PI*2),C.position.x=Math.cos(C.userData.angle)*C.userData.radius,C.position.z=Math.sin(C.userData.angle)*C.userData.radius,C.position.y=C.userData.baseY+Math.sin($*0.00018+C.userData.bob)*0.18,C.children[0].material.color.lerp(O,V),C.children[0].material.opacity+=(M-C.children[0].material.opacity)*V,C.rotation.y=-C.userData.angle+Math.sin($*0.00009+z)*0.12}),J.terrainBaseColor&&J.terrain?.material?.color)J.terrain.material.color.copy(J.terrainBaseColor).lerp(J.colors.snowGround,J.snowAccumulation*0.86);if(J.globeBaseColor&&J.globe?.material?.color)J.globe.material.color.copy(J.globeBaseColor).lerp(J.colors.snowGround,J.snowAccumulation*0.48);J.snowCover.material.opacity=Math.max(0,J.snowAccumulation-0.18)/0.82*0.52,J.snowCover.visible=J.snowAccumulation>0.002;let D=J.weather.geometry.attributes.position,k=J.weatherIntensity>0.006,B=W.weather!=="Clear"?W.weather:J.displayWeather;if(J.weather.visible=k,J.weather.material.opacity=J.weatherIntensity*0.78,J.weather.material.color.lerp(B==="Snow"?J.colors.snow:J.colors.rain,1-Math.exp(-Z/4)),J.weather.material.size+=((B==="Snow"?0.095:0.042)-J.weather.material.size)*(1-Math.exp(-Z/4)),k){let C=B==="Snow",z=-1.4,_=11;for(let P=0;P<D.count;P+=1){let T=D.getY(P)-J.weatherData.speed[P]*(C?0.92:4.15)*Z;while(T<-1.4)T+=11;let f=$*(C?0.00055:0.00018)+J.weatherData.phase[P];D.setY(P,T),D.setX(P,J.weatherData.baseX[P]+Math.sin(f)*(C?0.42:0.1)),D.setZ(P,J.weatherData.baseZ[P]+Math.cos(f*0.73)*(C?0.28:0.06))}D.needsUpdate=!0}if(J.wildlife.forEach((C,z)=>{let _=Q*C.userData.speed+C.userData.phase;if(C.position.set(Math.cos(_)*C.userData.radius,C.userData.kind==="bird"?0.55+Math.sin(_*4)*0.08:0,Math.sin(_*0.88)*C.userData.radius),C.rotation.y=Math.atan2(-Math.sin(_),Math.cos(_*0.88)),C.userData.kind==="bunny")C.position.y=Math.max(0,Math.sin(_*5)*0.08)}),W.weather==="Thunderstorm"&&J.weatherIntensity>0.68&&Q-J.lastLightning>6200)J.lastLightning=Q,J.lightningUntil=Q+140,sN();if(Q<J.lightningUntil)window.__snugWorld.scene.background?.set?.(14477288),J.lights.forEach(({node:C,base:z})=>{C.intensity=Math.max(C.intensity,z*1.7)});if(!N.lastWeatherRender||Q-N.lastWeatherRender>1000)N.lastWeatherRender=Q,nN(W)}function xQ($){if(!$||window.__snugWorld?.mode!=="village")return!1;if(Math.abs($.x)>36.25||Math.abs($.z)>34.25)return!0;for(let Q of N.shops){let W=$.x-Q.x,Z=$.z-Q.z,K=Math.cos(-Q.rotation),H=Math.sin(-Q.rotation),Y=W*K-Z*H,X=W*H+Z*K;if(Math.abs(Y)<1.08&&Math.abs(X)<0.66)return!0}if([[-8.35,7.65,0.34],[9.15,8,0.38],[3.4,-3.35,0.16],[-3.7,-4.45,0.22],[8.45,2.8,0.28],[-10.55,-5.8,0.36],[10.65,-4.9,0.34],[-10.1,4.75,0.38],[10.45,5.85,0.36],[-3.75,10.15,0.32],[5.45,-10.15,0.36]].some(([Q,W,Z])=>Math.hypot($.x-Q,$.z-W)<Z))return!0;if(N.players.some((Q)=>Math.hypot(Number(Q.x)-$.x,Number(Q.z)-$.z)<0.38))return!0;return!1}function oN($){let J=window.__snugWorld;if(!J?.player||!$)return $;if(xQ($)){let Q=N.lastSafePosition,W={...$,z:Q.z},Z={...$,x:Q.x},K=!xQ(W)?W:!xQ(Z)?Z:Q;return J.player.position.set(K.x,K.y??J.player.position.y,K.z),N.lastSafePosition={x:Number(K.x)||0,y:Number(K.y)||0,z:Number(K.z)||0},{...K}}return N.lastSafePosition={x:Number($.x)||0,y:Number($.y)||0,z:Number($.z)||0},$}function Y9($){$?.traverse?.((J)=>{if(!J.isMesh)return;if(J.geometry?.dispose?.(),Array.isArray(J.material))J.material.forEach((Q)=>Q.dispose?.());else J.material?.dispose?.()})}function f7(){if(!N.partyArena)return;N.partyArena.group?.parent?.remove(N.partyArena.group),Y9(N.partyArena.group),N.partyArena=null,N.arenaRoundId="",N.floorEliminated=!1}function DH($,J){let Q=Array.from({length:$},(Z,K)=>K),W=(Number(J)||1)>>>0;for(let Z=Q.length-1;Z>0;Z-=1){W=Math.imul(W^W>>>15,2246822519)>>>0;let K=W%(Z+1);[Q[Z],Q[K]]=[Q[K],Q[Z]]}return Q}function aN($,J){let Q=[],W=DH(49,$.seed),Z=new Map(W.map((H,Y)=>[H,Y])),K=[7321261,14988877,15235171,7838152];for(let H=0;H<7;H+=1)for(let Y=0;Y<7;Y+=1){let X=H*7+Y,U=new y(new i(1.08,0.18,1.08),new v({color:K[(H+Y)%K.length],roughness:0.72,emissive:0}));U.position.set((Y-3)*1.12,0.08,(H-3)*1.12),U.userData={index:X,row:H,column:Y,dropAt:6000+Z.get(X)*760},U.castShadow=!0,U.receiveShadow=!0,J.add(U),Q.push(U)}return{tiles:Q,clickTargets:[]}}function rN($){let J=new v({color:4091796,roughness:0.7}),Q=new v({color:2177864,roughness:0.86}),W=new y(new i(5.4,4.3,0.28),J);W.position.set(0,2.35,-0.7),$.add(W);let Z=[];for(let H=0;H<7;H+=1){let Y=new y(new i(0.7,4.1,0.35),new I0({transparent:!0,opacity:0}));Y.position.set((H-3)*0.72,2.35,-0.48),Y.userData.cell=H,$.add(Y),Z.push(Y);for(let X=0;X<6;X+=1){let U=new y(new V8(0.25,24),Q);U.position.set((H-3)*0.72,0.68+X*0.67,-0.52),$.add(U)}}let K=new y(new i(6.1,0.18,1.4),J);return K.position.set(0,0.14,-0.7),$.add(K),{clickTargets:Z,pieces:new Map}}function tN($){let J=[],Q=new v({color:15259309,roughness:0.82}),W=new v({color:4021859,roughness:0.75}),Z=new y(new i(4.5,4.5,0.24),Q);Z.position.set(0,2.45,-0.7),$.add(Z),[-0.75,0.75].forEach((K)=>{let H=new y(new i(0.09,4.25,0.12),W);H.position.set(K,2.45,-0.5),$.add(H);let Y=new y(new i(4.25,0.09,0.12),W);Y.position.set(0,2.45+K,-0.5),$.add(Y)});for(let K=0;K<9;K+=1){let H=K%3,Y=Math.floor(K/3),X=new y(new i(1.38,1.38,0.3),new I0({transparent:!0,opacity:0}));X.position.set((H-1)*1.5,3.95-Y*1.5,-0.44),X.userData.cell=K,$.add(X),J.push(X)}return{clickTargets:J,pieces:new Map}}function eN($,J){let Q=[[-25,-18],[24,-20],[-31,8],[30,15],[-12,27],[10,-29],[0,19],[18,2]],W=[[0,5],[8,9],[15,2],[10,-8],[-2,-13],[-12,-4]],Z=[[0,6],[9,8],[16,1],[12,-9],[2,-14],[-10,-10],[-16,0],[-8,8]],K=$.game==="scavenger"?Q:$.game==="sprint"?Z:W;return{markers:K.map(([Y,X],U)=>{let E=$.game==="scavenger",G=new v({color:E?15910990:$.game==="sprint"?15235171:6599076,roughness:0.58,emissive:E?4992000:$.game==="sprint"?5904144:1195063,emissiveIntensity:0.2}),q=E?new y(new i6(0.32,0),G):new y(new r$($.game==="sprint"?0.7:0.55,0.09,10,24),G);return q.position.set(Y,E?0.62:0.7,X),q.rotation.x=!E?Math.PI/2:0,q.userData.item=U,J.add(q),q}),points:K,clickTargets:[]}}function BH($){if(!["floor","connect4","tictactoe","scavenger","relay","sprint"].includes($?.game)){f7();return}let J=window.__snugWorld;if(!J?.scene||J.mode!=="village")return;if(N.arenaRoundId===$.id&&N.partyArena)return;f7();let Q=new c;Q.name=`snug-${$.game}-arena`;let W=$.game==="floor"?aN($,Q):$.game==="connect4"?rN(Q):$.game==="tictactoe"?tN(Q):eN($,Q);if(J.scene.add(Q),N.partyArena={group:Q,type:$.game,...W},N.arenaRoundId=$.id,N.floorEliminated=e("floor-out").some((Z)=>Z.uid===N.session?.uid),["connect4","tictactoe"].includes($.game))J.player?.position?.set?.(0,0,3.6),N.position={x:0,z:6.2,rotation:0};K6()}function y7(){let $=N.currentGame;if(!$||!["connect4","tictactoe"].includes($.game))return{cells:[],moves:[],winner:""};let J=Array.isArray($.players)?$.players.slice(0,2):[],Q=$.game==="connect4"?42:9,W=Array(Q).fill(""),Z=[],K="",H=(Y)=>{if($.game==="tictactoe")return[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some((X)=>X.every((U)=>W[U]===Y));for(let X=0;X<6;X+=1)for(let U=0;U<7;U+=1){let E=[[[1,0],[2,0],[3,0]],[[0,1],[0,2],[0,3]],[[1,1],[2,2],[3,3]],[[-1,1],[-2,2],[-3,3]]];if(W[X*7+U]===Y&&E.some((G)=>G.every(([q,F])=>{let R=U+q,O=X+F;return R>=0&&R<7&&O>=0&&O<6&&W[O*7+R]===Y})))return!0}return!1};for(let Y of e("board-move")){if(K||J.length<2||Y.uid!==J[Z.length%2])continue;let X=Number(Y.cell);if($.game==="connect4"){if(X<0||X>6)continue;let U=0;while(U<6&&W[U*7+X])U+=1;if(U>=6)continue;X=U*7+X}else if(X<0||X>8||W[X])continue;if(W[X]=Y.uid,Z.push({...Y,resolvedCell:X}),H(Y.uid))K=Y.uid}return{cells:W,moves:Z,winner:K,players:J}}function $E($,J){let Q=J.uid===$.players?.[0];if($.game==="connect4"){let X=J.resolvedCell%7,U=Math.floor(J.resolvedCell/7),E=new y(new V8(0.245,24),new v({color:Q?15777093:15228750,roughness:0.55,emissive:Q?2955776:2754564,emissiveIntensity:0.08}));return E.position.set((X-3)*0.72,0.68+U*0.67,-0.44),E}let W=J.resolvedCell,Z=W%3,K=Math.floor(W/3),H=new v({color:Q?15165524:4160903,roughness:0.6}),Y=Q?new y(new r$(0.38,0.09,12,28),H):new c;if(!Q)[-1,1].forEach((X)=>{let U=new y(new i(0.12,0.92,0.12),H);U.rotation.z=X*Math.PI/4,Y.add(U)});return Y.position.set((Z-1)*1.5,3.95-K*1.5,-0.36),Y}function K6(){let{partyArena:$,currentGame:J}=N;if(!$||!J||$.type!==J.game)return;let Q=Date.now()-Number(J.createdAt);if(J.game==="floor")$.tiles.forEach((W)=>{let Z=W.userData.dropAt-Q;if(Z<=0)W.position.y+=(-1.8-W.position.y)*0.12,W.rotation.x+=0.035,W.material.emissive.setHex(0);else if(Z<1700)W.material.emissive.setHex(Math.floor(Z/180)%2?9055264:0)});else if(J.game==="scavenger"){let W=new Set(e("scavenge").map((Z)=>Number(Z.item)));$.markers.forEach((Z)=>{Z.visible=!W.has(Z.userData.item),Z.rotation.y+=0.025})}else if(["relay","sprint"].includes(J.game)){let W=J.game==="sprint"?"sprint-checkpoint":"relay-checkpoint",K=e(W).filter((H)=>H.uid===N.session?.uid).length;if($.markers.forEach((H)=>{H.visible=H.userData.item===K,H.rotation.z+=0.02}),J.game==="sprint")Y6()}else y7().moves.forEach((Z)=>{if($.pieces.has(Z.id))return;let K=$E(J,Z);$.group.add(K),$.pieces.set(Z.id,K)})}async function JE(){let{currentGame:$,partyArena:J}=N;if(N.actionBusy||!J||K0()||n0($)!=="play"||!["scavenger","relay","sprint"].includes($?.game))return;if($.game==="scavenger"){let Q=new Set(e("scavenge").map((Z)=>Number(Z.item))),W=J.markers.find((Z)=>Z.visible&&!Q.has(Z.userData.item)&&Math.hypot(Z.position.x-N.position.x,Z.position.z-N.position.z)<0.8);if(!W)return;N.actionBusy=!0;try{await l0("scavenge",{item:W.userData.item}),g(`Keepsake found · ${Q.size+1}/8`),K6()}catch(Z){N.error=O0(Z)}finally{N.actionBusy=!1}}else{let Q=$.game==="sprint",W=Q?"sprint-checkpoint":"relay-checkpoint",Z=Q?8:6,H=e(W).filter((X)=>X.uid===N.session?.uid).length,Y=J.markers[H];if(!Y||Math.hypot(Y.position.x-N.position.x,Y.position.z-N.position.z)>=0.95)return;N.actionBusy=!0;try{await l0(W,{item:H}),g(H===Z-1?`${Q?"Sprint":"Relay"} finished`:`Gate ${H+1}/${Z}`),K6()}catch(X){N.error=O0(X)}finally{N.actionBusy=!1}}}async function QE(){if(N.actionBusy||K0()||N.currentGame?.game!=="potato"||UW()!==N.session?.uid||Date.now()<N.tagCooldownUntil)return;let $=N.players.find((J)=>Math.hypot(Number(J.x)-N.position.x,Number(J.z)-N.position.z)<0.85);if(!$)return;N.actionBusy=!0,N.tagCooldownUntil=Date.now()+1200;try{await l0("potato-pass",{targetUid:$.uid,targetName:String($.name||"Player").slice(0,18)}),g(`Potato passed to ${$.name||"Player"}`)}catch(J){N.error=O0(J)}finally{N.actionBusy=!1}}async function WE($){if(N.actionBusy||K0()||N.currentGame?.game!=="simon")return;let Q=e("simon-step").filter((Z)=>Z.uid===N.session?.uid).length,W=NW(N.currentGame)[Q];if($!==W)return g("Not that one — watch the pattern");N.actionBusy=!0;try{await l0("simon-step",{item:Q,emote:$}),g(Q===11?"Mayor Says complete":`${Q+1}/12`)}catch(Z){N.error=O0(Z)}finally{N.actionBusy=!1}}function ZE(){let $=document.querySelector(".simon-controls"),J=N.currentGame;if(!J||J.game!=="simon"||K0()){$?.remove();return}if(!$)$=document.createElement("div"),$.className="simon-controls",$.addEventListener("click",(Z)=>{let K=Z.target.closest("[data-emote]");if(K)WE(K.dataset.emote)}),document.body.appendChild($);let Q=c0(N.session?.uid),W=NW(J)[Q]||"cheer";$.innerHTML=`<small>Mayor says ${p(W)}</small><div>${dQ.map((Z)=>`<button type="button" data-emote="${Z}">${Z}</button>`).join("")}</div>`}async function KE(){if(N.actionBusy||N.floorEliminated||K0()||N.currentGame?.game!=="floor"||!N.partyArena)return;let $=Date.now()-Number(N.currentGame.createdAt),J=N.partyArena.tiles.find((Q)=>Math.abs(Q.position.x-N.position.x)<0.54&&Math.abs(Q.position.z-N.position.z)<0.54);if(!J||$<J.userData.dropAt)return;N.actionBusy=!0,N.floorEliminated=!0;try{await l0("floor-out",{cell:J.userData.index}),g("That tile dropped — you’re out")}catch(Q){N.voiceError=O0(Q)}finally{N.actionBusy=!1}}async function HE($){let J=N.currentGame;if(!J||K0()||!["connect4","tictactoe"].includes(J.game))return;let Q=y7();if(Q.winner)return g("That board is already won");if(Q.players.length<2)return g("Waiting for one more player");if(Q.players[Q.moves.length%2]!==N.session?.uid)return g("It’s the other player’s turn");if(J.game==="connect4"){if(Q.cells.filter((W,Z)=>Z%7===Number($)).every(Boolean))return g("That column is full")}else if(Q.cells[Number($)])return g("That square is taken");try{await l0("board-move",{cell:Number($)}),K6()}catch(W){g(O0(W))}}function YE($){let J=N.partyArena,Q=window.__snugWorld;if(!J?.clickTargets?.length||!Q?.camera||!Q?.renderer||$.target!==Q.renderer.domElement)return;let W=Q.renderer.domElement.getBoundingClientRect();N.arenaPointer.set(($.clientX-W.left)/W.width*2-1,-(($.clientY-W.top)/W.height)*2+1),N.arenaRaycaster.setFromCamera(N.arenaPointer,Q.camera);let Z=N.arenaRaycaster.intersectObjects(J.clickTargets,!1)[0];if(!Z)return;$.preventDefault(),$.stopImmediatePropagation(),HE(Z.object.userData.cell)}window.addEventListener("pointerup",YE,!0);async function XE(){if(N.actionBusy||K0()||n0()!=="play"||N.currentGame?.game!=="coin")return;let $=new Set(e("coin").map((Q)=>Number(Q.item))),J=N.coinPositions.findIndex((Q,W)=>!$.has(W)&&Math.hypot(Q.x-N.position.x,Q.z-N.position.z)<0.58);if(J<0)return;N.actionBusy=!0;try{await l0("coin",{item:J}),GW(),window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"coin-pickup"}})),g("Coin collected")}catch(Q){N.error=O0(Q)}finally{N.actionBusy=!1}}async function UE(){if(N.actionBusy||!N.soloTagTarget||K0()||Date.now()<N.tagCooldownUntil)return;if(Math.hypot(N.soloTagTarget.position.x-N.position.x,N.soloTagTarget.position.z-N.position.z)>=0.78)return;N.actionBusy=!0,N.tagCooldownUntil=Date.now()+700;try{let $=`practice-pal-${N.soloTagHits%mQ.length}`;await l0("tag",{targetUid:$,targetName:"Practice Pal"}),N.soloTagHits+=1,NH(),g(`Tag ${N.soloTagHits}`)}catch($){N.error=O0($)}finally{N.actionBusy=!1}}async function NE(){if(N.actionBusy||K0()||n0()!=="play"||N.currentGame?.game!=="tag"||Date.now()<N.tagCooldownUntil)return;if(N.currentGame.practice)return UE();if(XH()!==N.session?.uid)return;let $=N.players.find((J)=>Math.hypot(Number(J.x)-N.position.x,Number(J.z)-N.position.z)<0.72);if(!$)return;N.actionBusy=!0,N.tagCooldownUntil=Date.now()+1500;try{await l0("tag",{targetUid:$.uid,targetName:String($.name||"Player").slice(0,18)}),g(`${$.name||"Player"} is it`)}catch(J){N.error=O0(J)}finally{N.actionBusy=!1}}function CH(){N.quizTimers.forEach(clearTimeout),N.quizTimers=[]}function EE($){CH(),[1,2].forEach((J)=>{N.quizTimers.push(setTimeout(()=>{if(N.currentGame?.id!==$.id)return;aQ(`Question ${J+1}: ${C8($,J).q}`,"Room Quiz").catch(()=>{})},J*12000))})}function GE($,J,Q){N.soloResult={game:$.game,amount:J,before:Q,after:Q+J},document.querySelector(".solo-result-backdrop")?.remove();let W=document.createElement("div");W.className="solo-result-backdrop";let Z=$.practice===!0,K=J>0?"Your payout is now in your shell balance.":"Finish one objective next round to unlock the participation payout.";W.innerHTML=`<section class="solo-result" role="dialog" aria-modal="true" aria-labelledby="solo-result-title"><small>${Z?"Solo practice complete":"Round payout"}</small><h2 id="solo-result-title">${p(r[$.game].name)}</h2><div class="solo-balance"><span><small>Before</small><b>${Q}</b></span><i aria-hidden="true">+</i><span class="solo-payout"><small>Payout</small><b>${J}</b></span><i aria-hidden="true">=</i><span><small>After</small><b>${Q+J}</b></span></div><p>${K}</p><div class="solo-result-actions"><button type="button" data-action="solo-done">Back to plaza</button><button type="button" class="multi-primary" data-action="solo-again">${Z?"Practice another":"View games"}</button></div></section>`,W.addEventListener("pointerdown",(H)=>{if(H.target===W)W.remove()}),W.querySelector("[data-action='solo-done']")?.addEventListener("click",()=>W.remove()),W.querySelector("[data-action='solo-again']")?.addEventListener("click",()=>{W.remove(),Q6("practice")}),document.body.appendChild(W)}function qE(){let $=N.currentGame,J=r[$?.game]?.payouts||[24,16,10,6],Q=h7(),W=($?.players||[]).map((Y)=>({uid:Y,score:Number(Q[Y]||0)})).sort((Y,X)=>X.score-Y.score||String(Y.uid).localeCompare(String(X.uid))),Z=Math.max(0,W.findIndex((Y)=>Y.uid===N.session?.uid)),K=c0(N.session?.uid),H=Math.max(4,Math.min(8,Math.round(($?.duration||30000)/30000)));return K>0?Number(J[Math.min(Z,J.length-1)]||H):0}async function FE(){let $=N.currentGame;if(!$||!K0()||!N.session)return;if(!(Array.isArray($.players)&&$.players.includes(N.session.uid)))return;if(e("claim").some((W)=>W.uid===N.session.uid)||N.claiming.has($.id))return;N.claiming.add($.id);try{let W=qE(),Z=Number(N.roundBalanceBefore[$.id]??N.soloBalanceBefore??YW());await l0("claim",{amount:W}),window.dispatchEvent(new CustomEvent("snug-award-coins",{detail:{amount:W,message:`Round complete · +${W} shells`}}));let K=c0(N.session.uid),H=Number(N.personalBests[$.game]||0);if(N.personalBests[$.game]=Math.max(H,K),window.dispatchEvent(new CustomEvent("snug-minigame-achievement",{detail:{game:$.game,score:K,won:YH()===N.session.uid&&K>0,personalBest:K>H,payout:W}})),$.practice)Z9();setTimeout(()=>GE($,W,Z),180),g(`Round complete · +${W} shells`)}catch(W){N.error=O0(W)}}function B8(){let $=W0(".room-game-hud"),J=N.currentGame;if(!J||K0()&&Date.now()>Number(J.createdAt)+Number(J.duration)+8000){$?.remove();return}if(!$)$=document.createElement("button"),$.type="button",$.className="room-game-hud",$.addEventListener("click",()=>Q6(N.currentGame?.practice?"practice":N.currentGame?.game==="quiz"?"chat":"rooms")),document.body.appendChild($);let Q=c0(N.session?.uid);if(K0()){let H=YH();$.innerHTML=`<span><small>${J.practice?"Solo practice complete":"Round complete"}</small><b>${J.practice?r[J.game].name:H===N.session?.uid&&Q?"You won":H?`${p(UN(H))} won`:r[J.game].name}</b></span><strong>${Q} pt</strong>`;return}let W=`${Q} pt`,Z=r[J.game].note;if(J.game==="tag")W=J.practice?`${Q} tag${Q===1?"":"s"}`:XH()===N.session?.uid?"YOU’RE IT":`${Q} tag${Q===1?"":"s"}`;if(J.game==="quiz")W=`Q${Z6()+1} · ${Q} pt`;if(J.game==="floor")W=N.floorEliminated?"OUT":"STILL UP";if(J.game==="scavenger")W=`${Q}/8 found`;if(J.game==="relay")W=`${Q}/6 gates`;if(J.game==="balloon")W=`${Q} popped`;if(J.game==="sprint")W=`${Q}/8 gates`;if(J.game==="fishing")W=`${Q} caught`;if(J.game==="potato")W=J.practice?`${Q} passes`:UW()===N.session?.uid?"PASS IT!":"KEEP AWAY";if(H6.has(J.game)&&J.game!=="potato")W=`${Q} pt`;if(J.game==="simon")W=`${Q}/12 moves`;if(["connect4","tictactoe"].includes(J.game)){let H=y7();if(H.winner)W=H.winner===N.session?.uid?"YOU WON":"ROUND WON";else if(H.players.length<2)W="WAITING";else W=H.players[H.moves.length%2]===N.session?.uid?"YOUR TURN":"THEIR TURN";Z=H.winner?"The board has a winner.":r[J.game].note}let K=n0(J);$.innerHTML=`<span><small>${J.practice?"Solo · ":""}${r[J.game].name}</small><b>${K==="countdown"?"Get ready…":J.game==="quiz"?p(C8(J,Z6()).q):p(Z)}</b></span><strong>${K==="countdown"?Math.max(1,Math.ceil((3000-(Date.now()-Number(J.createdAt)))/1000)):`${W6()}s · ${W}`}</strong>`}function RE(){let $=N.currentGame;if(!$)return;if($.game==="coin"){if(!N.coinGroup)EW($);if(XE(),N.coinGroup){let J=performance.now()*0.003;N.coinGroup.children.forEach((Q,W)=>{Q.rotation.z=J+W*0.4,Q.position.y=0.36+Math.sin(J*1.4+W)*0.07})}}if($.game==="tag"){if(NE(),$.practice)EH()}if($.game==="floor")KE();if(["scavenger","relay","sprint"].includes($.game))JE();if($.game==="potato"&&!$.practice)QE();if(["floor","connect4","tictactoe","scavenger","relay","sprint"].includes($.game))K6();if(["balloon","fishing","sprint"].includes($.game))Y6();if(H6.has($.game))v7();if(ZE(),K0()){if(W9(),FE(),Date.now()>Number($.createdAt)+Number($.duration)+8000)f7(),A7(),T7()}B8()}function zH($){if(!$?.uid||N.session?.uid===$.uid)return;if(N.session=$,pQ().catch((J)=>{N.error=O0(J),R$()}),clearInterval(N.polling),clearInterval(N.heartbeat),clearInterval(N.gameClock),N.polling=setInterval(Q9,2000),N.heartbeat=setInterval(()=>pQ().catch(()=>{}),5000),N.gameClock=setInterval(RE,250),Q9(),R$(),N.pendingInvite){let J=N.pendingInvite;N.pendingInvite=null,setTimeout(()=>C7(J,{arrival:!0}),0)}}window.addEventListener("snug-session",($)=>zH($.detail));window.addEventListener("snug-player-move",($)=>{N.position=oN($.detail||N.position),wH()});window.addEventListener("snug-world-ready",()=>{if(MH(),VH(),wH(),N.currentGame?.game==="coin"&&!K0())EW(N.currentGame);if(N.currentGame?.practice&&N.currentGame?.game==="tag"&&!K0())UH(N.currentGame);if(["floor","connect4","tictactoe","scavenger","relay","sprint"].includes(N.currentGame?.game)&&!K0())BH(N.currentGame);if(["balloon","fishing","sprint"].includes(N.currentGame?.game)&&!K0())LH(N.currentGame);if(H6.has(N.currentGame?.game)&&!K0())RH(N.currentGame)});window.addEventListener("pointerdown",($)=>{if(N.audioUnlocked=!0,!$.target.closest?.("button[aria-label='Open local chat'], .nearby-card button"))return;$.preventDefault(),$.stopPropagation(),Q6("chat")},!0);window.addEventListener("pagehide",()=>{if(N.session){if(D0(`presence/${N.roomId}/${N.session.uid}`,{method:"DELETE",keepalive:!0}).catch(()=>{}),N.voiceEnabled)D0(`voicePresence/${N.roomId}/${N.session.uid}`,{method:"DELETE",keepalive:!0}).catch(()=>{})}N.localStream?.getTracks().forEach(($)=>$.stop()),QW()});function _H($){if(!N.lastEnvironmentFrame||$-N.lastEnvironmentFrame>=100)N.lastEnvironmentFrame=$,iN($);cN($),requestAnimationFrame(_H)}requestAnimationFrame(_H);R$();if(window.__snugSession)zH(window.__snugSession);var OW="§TL§",g7={id:"moonlight-footbridge",name:"Moonlight Footbridge",goal:240},X9={OrangeTabby:{name:"Orange tabby",color:"#d9873b"},Grey:{name:"Silver gray",color:"#777b80"},BlackAndWhite:{name:"Black & white",color:"#292929",accent:"#f4f0e8"},Tortoiseshell:{name:"Tortoiseshell",color:"#3d2b27",accent:"#cf7839"},WhiteLonghair:{name:"White longhair",color:"#f4f2eb"},Calico:{name:"Calico",color:"#f4eee1",accent:"#d77a38"}},z8={fireworks:{name:"Fireworks Night",note:"Color blooms over the square after dark."},meteors:{name:"Meteor Shower",note:"Watch bright trails skim the little planet."},parade:{name:"Costume Parade",note:"Neighbors loop the plaza in handmade hats."}},I8={moonflower:{name:"Moonflower",kind:"Flower",color:15194367,leaf:6263652,stages:[["Seed",0],["Sprout",120000],["Bud",600000],["Bloom",1500000]]},fern:{name:"Button fern",kind:"Plant",color:7448932,leaf:5213528,stages:[["Seed",0],["Shoot",180000],["Young fern",900000],["Full fern",2700000]]},oak:{name:"Cozy oak",kind:"Tree",color:7248729,leaf:5934160,stages:[["Acorn",0],["Sapling",600000],["Young tree",3600000],["Mature tree",14400000]]}},_8=[[4.1,6.7],[6.55,6.7],[9,6.7],[4.1,9.5],[6.55,9.5],[9,9.5]],OE=300000,L={session:null,world:null,open:!1,view:"projects",projectTotal:0,projectContributors:[],cat:null,catFollower:null,catHearts:null,catReactUntil:0,catFeedBusy:!1,festival:null,festivalGroup:null,festivalKind:"",festivalStartedAt:0,garden:[],gardenGroup:null,gardenSignature:"",gardenBusySlot:-1,gardenLastTick:0,backend:"direct",loading:!1,busy:!1,error:"",photoMode:!1,photoFrozenAt:0,photoFrozenPosition:null,photoCamera:null,photoAzimuth:30,photoDistance:6.8,photoHeight:2.7,photoPose:"calm",photoPreviewUrl:"",cameraControls:null,occlusionWorld:null,occlusionLastCheck:0,occlusionFaded:new Map},D$=($,J=document)=>J.querySelector($),P8=($)=>{let J=document.createElement("span");return J.textContent=String($??""),J.innerHTML},TH=($)=>String($||"").trim().replace(/\s+/g," ").replace(/[<>]/g,"").slice(0,18),AH=()=>D$(".profile-chip b")?.textContent?.trim()||"Player",SH=()=>{let $=Number(String(D$(".coin-chip b")?.textContent||"0").replace(/[^0-9.-]/g,""));return Number.isFinite($)?$:0};function LE(){let $=L.session?.app?.options||{};return String($.databaseURL||`https://${$.projectId||L.session?.projectId}-default-rtdb.firebaseio.com`).replace(/\/$/,"")}async function k$($,J={}){if(!L.session?.user)throw Error("Waiting for Firebase sign-in");let Q=await L.session.user.getIdToken(),[W,Z=""]=String($).split("?"),K=W.split("/").map(encodeURIComponent).join("/"),H=await fetch(`${LE()}/${K}.json${Z?`?${Z}`:""}`,{...J,headers:{"Content-Type":"application/json",Authorization:`Bearer ${Q}`,...J.headers||{}}});if(!H.ok)throw Error(`Town Life data returned ${H.status}`);return H.json().catch(()=>null)}async function l7($){let J=`${OW}${JSON.stringify($)}`.slice(0,240);return k$("messages/plaza",{method:"POST",body:JSON.stringify({uid:L.session.uid,name:"Town Life",text:J,createdAt:Date.now()})})}async function ME(){let $=await k$("messages/plaza?orderBy=%22createdAt%22&limitToLast=200"),J=Object.entries($||{}).map(([H,Y])=>({id:H,...Y})).filter((H)=>String(H.text||"").startsWith(OW)).sort((H,Y)=>Number(H.createdAt||0)-Number(Y.createdAt||0)),Q=[],W=null,Z=null,K=[];J.forEach((H)=>{try{let Y=JSON.parse(H.text.slice(OW.length));if(Y.t==="project"&&[5,10,25].includes(Number(Y.a)))Q.push({uid:H.uid,name:Y.n||H.name,amount:Number(Y.a),createdAt:H.createdAt});if(Y.t==="cat"&&H.uid===L.session.uid&&X9[Y.coat])W={coat:Y.coat,name:TH(Y.name)||"Marmalade",affection:Math.max(0,Math.min(100,Number(Y.affection)||0)),feeds:Math.max(0,Number(Y.feeds)||0),updatedAt:H.createdAt};if(Y.t==="festival"&&z8[Y.id])Z={id:Y.id,startedAt:Number(Y.startedAt)||Number(H.createdAt),startedBy:Y.startedBy||H.name};if(Y.t==="garden"&&H.uid===L.session.uid&&Number.isInteger(Y.slot)&&Y.slot>=0&&Y.slot<_8.length)K[Y.slot]=Y.clear?null:jH(Y)}catch{}}),fH(Q,W,Z,K)}function jH($){if(!$||!I8[$.kind])return null;return{kind:$.kind,plantedAt:Math.max(0,Number($.plantedAt)||Date.now()),waterings:Math.max(0,Math.min(20,Number($.waterings)||0)),wateredStage:Math.max(-1,Math.min(3,Number($.wateredStage??-1))),updatedAt:Math.max(0,Number($.updatedAt)||Date.now())}}function wE($){let J=[];return Object.entries($||{}).forEach(([Q,W])=>{let Z=Number(Q);if(Number.isInteger(Z)&&Z>=0&&Z<_8.length)J[Z]=jH(W)}),J}function fH($,J,Q,W=[]){L.projectTotal=$.reduce((K,H)=>K+Number(H.amount||0),0);let Z=new Map;$.forEach((K)=>Z.set(K.uid||K.name,{name:K.name||"Neighbor",amount:(Z.get(K.uid||K.name)?.amount||0)+Number(K.amount||0)})),L.projectContributors=[...Z.values()].sort((K,H)=>H.amount-K.amount).slice(0,4),L.cat=J,L.festival=Q&&Date.now()-Number(Q.startedAt)<600000?Q:null,L.garden=wE(W),u7(),G9(),X6(!0),B0()}async function LW(){if(!L.session||L.loading)return;L.loading=!0,L.error="";try{let[$,J,Q,W]=await Promise.all([k$(`townLife/projects/${g7.id}/contributions?orderBy=%22createdAt%22&limitToLast=300`),k$(`townLife/profiles/${L.session.uid}/cat`),k$("townLife/festival/current"),k$(`townLife/profiles/${L.session.uid}/garden`)]);L.backend="direct";let Z=Object.values($||{});fH(Z,J,Q,W)}catch{L.backend="journal";try{await ME()}catch{L.error="Town Life could not reach the village network."}}finally{L.loading=!1,B0()}}async function VE($){let J=Number($);if(![5,10,25].includes(J)||L.busy)return;if(SH()<J)return v0(`You need ${J} shells to help`);L.busy=!0,L.error="",B0();let Q={uid:L.session.uid,name:AH().slice(0,18),amount:J,createdAt:Date.now()};try{if(L.backend==="direct")await k$(`townLife/projects/${g7.id}/contributions`,{method:"POST",body:JSON.stringify(Q)});else await l7({t:"project",a:J,n:Q.name});window.dispatchEvent(new CustomEvent("snug-award-coins",{detail:{amount:-J,message:`${J} shells given to the bridge`}})),L.projectTotal+=J;let W=L.projectContributors.find((Z)=>Z.name===Q.name);if(W)W.amount+=J;else L.projectContributors.push({name:Q.name,amount:J});L.projectContributors.sort((Z,K)=>K.amount-Z.amount),v0(`You added ${J} shells`),window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"coin-pickup"}}))}catch{L.error="That contribution did not go through. Your shells were not spent."}finally{L.busy=!1,B0()}}async function hH($){if(L.backend==="direct")await k$(`townLife/profiles/${L.session.uid}/cat`,{method:"PUT",body:JSON.stringify($)});else await l7({t:"cat",coat:$.coat,name:$.name,affection:$.affection,feeds:$.feeds})}async function kE(){if(L.busy||!L.session)return;let $=D$(".town-life-sheet"),J=$?.querySelector("[name='cat-coat']:checked")?.value||"OrangeTabby",Q=TH($?.querySelector("[name='cat-name']")?.value)||"Marmalade",W={coat:J,name:Q,affection:L.cat?.affection||15,feeds:L.cat?.feeds||0,updatedAt:Date.now()};L.busy=!0,B0();try{await hH(W),L.cat=W,u7(!0),F9(),v0(`${Q} is coming home with you`)}catch{L.error="The adoption could not be saved yet."}finally{L.busy=!1,B0()}}async function DE(){if(!L.cat||L.catFeedBusy)return;let $=3;if(SH()<$)return v0("You need 3 shells for a snack");L.catFeedBusy=!0,B0();let J={...L.cat,affection:Math.min(100,Number(L.cat.affection||0)+12),feeds:Number(L.cat.feeds||0)+1,updatedAt:Date.now()};try{await hH(J),L.cat=J,window.dispatchEvent(new CustomEvent("snug-award-coins",{detail:{amount:-$,message:`${L.cat.name} enjoyed a snack · −3 shells`}})),F9(),v0(`${L.cat.name} is purring`)}catch{L.error="The snack was not saved. Your shells were not spent."}finally{L.catFeedBusy=!1,B0()}}async function BE($){if(!z8[$]||L.busy||!L.session)return;let J={id:$,startedAt:Date.now(),startedBy:AH().slice(0,18)};L.busy=!0,B0();try{if(L.backend==="direct")await k$("townLife/festival/current",{method:"PUT",body:JSON.stringify(J)});else await l7({t:"festival",...J});L.festival=J,G9(),v0(`${z8[$].name} has begun`)}catch{L.error="The festival could not start on the village network."}finally{L.busy=!1,B0()}}function CE(){return Object.keys(z8)[Math.floor(Date.now()/3600000)%3]}function E9($,J=Date.now()){let Q=I8[$?.kind];if(!Q)return{index:0,name:"Empty",progress:0,nextMs:0};let W=Math.max(0,J-Number($.plantedAt||J))+Math.max(0,Number($.waterings||0))*OE,Z=0;Q.stages.forEach((X,U)=>{if(W>=X[1])Z=U});let K=Q.stages[Z+1],H=Q.stages[Z][1],Y=K?Math.max(0,Math.min(1,(W-H)/(K[1]-H))):1;return{index:Z,name:Q.stages[Z][0],progress:Y,nextMs:K?Math.max(0,K[1]-W):0}}function zE($){if($<=0)return"Ready";let J=Math.max(1,Math.ceil($/60000));if(J<60)return`${J} min`;let Q=Math.floor(J/60),W=J%60;return W?`${Q} hr ${W} min`:`${Q} hr`}async function MW($,J){if(L.backend==="direct")await k$(`townLife/profiles/${L.session.uid}/garden/${$}`,{method:J?"PUT":"DELETE",body:J?JSON.stringify(J):void 0});else await l7(J?{t:"garden",slot:$,...J}:{t:"garden",slot:$,clear:!0})}async function _E($,J){let Q=Number($);if(!L.session||L.gardenBusySlot>=0||!Number.isInteger(Q)||Q<0||Q>=_8.length||L.garden[Q]||!I8[J])return;let W={kind:J,plantedAt:Date.now(),waterings:0,wateredStage:-1,updatedAt:Date.now()};L.gardenBusySlot=Q,B0();try{await MW(Q,W),L.garden[Q]=W,X6(!0),v0(`${I8[J].name} planted in plot ${Q+1}`),window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"select"}}))}catch{L.error="That seed could not be planted yet."}finally{L.gardenBusySlot=-1,B0()}}async function PE($){let J=Number($),Q=L.garden[J];if(!Q||L.gardenBusySlot>=0)return;let W=E9(Q);if(Q.wateredStage===W.index)return v0("This plot is already watered for this stage");let Z={...Q,waterings:Number(Q.waterings||0)+1,wateredStage:W.index,updatedAt:Date.now()};L.gardenBusySlot=J,B0();try{await MW(J,Z),L.garden[J]=Z,X6(!0),v0(`Plot ${J+1} watered · growth moved ahead 5 minutes`),window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"select"}}))}catch{L.error="The watering did not save yet."}finally{L.gardenBusySlot=-1,B0()}}async function IE($){let J=Number($);if(!L.garden[J]||L.gardenBusySlot>=0)return;L.gardenBusySlot=J,B0();try{await MW(J,null),L.garden[J]=null,X6(!0),v0(`Plot ${J+1} is ready for a new seed`)}catch{L.error="That plot could not be cleared yet."}finally{L.gardenBusySlot=-1,B0()}}function q9(){let $=D$(".town-life-dock");if(!$)$=document.createElement("button"),$.type="button",$.className="town-life-dock",$.innerHTML='<i aria-hidden="true"><span></span></i><b>Town Life</b>',$.addEventListener("click",()=>fE()),document.body.appendChild($);let J=L.world?.mode==="village";$.hidden=!J||L.photoMode,AE()}function TE(){return window.__snugCameraSettings||(window.__snugCameraSettings={azimuth:Math.atan2(7,9.2),distance:14,height:8.2})}function AE(){let $=L.cameraControls||D$(".snug-camera-controls");if(!$)$=document.createElement("div"),$.className="snug-camera-controls",$.setAttribute("role","group"),$.setAttribute("aria-label","Camera controls"),$.innerHTML='<button type="button" data-camera-control="left" aria-label="Rotate camera left" title="Rotate camera left">↶</button><button type="button" data-camera-control="out" aria-label="Zoom camera out" title="Zoom camera out">−</button><button type="button" data-camera-control="in" aria-label="Zoom camera in" title="Zoom camera in">+</button><button type="button" data-camera-control="right" aria-label="Rotate camera right" title="Rotate camera right">↷</button>',$.addEventListener("click",(J)=>{let Q=J.target.closest("[data-camera-control]");if(!Q)return;let W=TE();if(Q.dataset.cameraControl==="left")W.azimuth-=q$.degToRad(18);if(Q.dataset.cameraControl==="right")W.azimuth+=q$.degToRad(18);if(Q.dataset.cameraControl==="out")W.distance=q$.clamp(W.distance+1.15,7.5,18);if(Q.dataset.cameraControl==="in")W.distance=q$.clamp(W.distance-1.15,7.5,18);window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"select"}}))}),document.body.appendChild($),L.cameraControls=$;$.hidden=L.world?.mode!=="village"||L.photoMode||document.documentElement.classList.contains("snug-start-open")}function PH($,J){for(let Q=$;Q;Q=Q.parent)if(Q===J)return!0;return!1}function vH($){let J=L.occlusionFaded.get($);if(!J)return;(Array.isArray($.material)?$.material:[$.material]).forEach((W)=>W?.dispose?.()),$.material=J.original,L.occlusionFaded.delete($)}function IH(){[...L.occlusionFaded.keys()].forEach(vH)}function SE($){if(L.occlusionFaded.has($)||!$.material)return;let J=$.material,Q=(Array.isArray(J)?J:[J]).map((W)=>{let Z=W.clone();return Z.transparent=!0,Z.opacity=Math.min(Number.isFinite(W.opacity)?W.opacity:1,0.22),Z.depthWrite=!1,Z.needsUpdate=!0,Z});L.occlusionFaded.set($,{original:J,materials:Q}),$.material=Array.isArray(J)?Q:Q[0]}var b7=new $6,FW=new w,RW=new w,x7=new w;function jE($){let J=L.world;if(L.occlusionWorld!==J)IH(),L.occlusionWorld=J;if(!J?.scene||!J?.camera||!J?.player||J.mode!=="village"||L.photoMode||document.documentElement.classList.contains("snug-start-open")){IH();return}if($-L.occlusionLastCheck<90)return;L.occlusionLastCheck=$,J.camera.getWorldPosition(FW);let Q=J.remotes instanceof Map?[...J.remotes.values()]:[],W=new Set;[0.7,1.25].forEach((Z)=>{J.player.getWorldPosition(RW),RW.y+=Z,x7.copy(RW).sub(FW);let K=x7.length();if(K<0.5)return;x7.normalize(),b7.set(FW,x7),b7.near=0.2,b7.far=Math.max(0.2,K-0.35),b7.intersectObjects(J.scene.children,!0).forEach(({object:H,distance:Y})=>{if(!H?.isMesh||Y>=K-0.35||PH(H,J.player)||Q.some((E)=>PH(H,E)))return;let X="";for(let E=H;E;E=E.parent)X+=` ${E.name||""}`;if(/SnugWeather|SnugSnowCover|SnugPlanetGlobe|TapMarker|CatReactionHearts|TownFestival|Star|Sun|Moon/i.test(X))return;if(!(Array.isArray(H.material)?H.material:[H.material]).some((E)=>E&&(E.opacity??1)>=0.58))return;W.add(H)})}),[...L.occlusionFaded.keys()].forEach((Z)=>{if(!W.has(Z))vH(Z)}),W.forEach(SE)}function p7(){D$(".town-life-backdrop")?.remove(),L.open=!1,document.body.classList.remove("town-life-open")}function fE($=L.view){if(!L.world||L.world.mode!=="village")return v0("Town Life is waiting in the village plaza");p7(),document.querySelector(".sheet-backdrop .icon-btn")?.click(),document.querySelector(".multiplayer-backdrop .multi-close")?.click(),L.view=$,L.open=!0,document.body.classList.add("town-life-open");let J=document.createElement("div");J.className="town-life-backdrop",J.addEventListener("pointerdown",(W)=>{if(W.target===J)p7()});let Q=document.createElement("section");if(Q.className="town-life-sheet",Q.setAttribute("role","dialog"),Q.setAttribute("aria-modal","true"),J.appendChild(Q),document.body.appendChild(J),B0(),!L.loading)LW()}function hE(){let $=g7.goal,J=Math.min($,L.projectTotal),Q=Math.min(100,Math.round(J/$*100)),W=L.projectContributors.length?`<ul class="town-contributors">${L.projectContributors.map((Z)=>`<li><span>${P8(Z.name)}</span><b>${Z.amount} shells</b></li>`).join("")}</ul>`:'<p class="town-muted">No one has added a shell yet. The first lantern is waiting.</p>';return`<div class="project-visual" aria-hidden="true"><div class="project-moon"></div><div class="project-bridge"><i></i><i></i><i></i><i></i><i></i></div></div><div class="town-section-head"><div><small>Shared town project</small><h3>${g7.name}</h3></div><strong>${Q}%</strong></div><p class="town-copy">Build a lantern-lit shortcut across the creek. Every neighbor’s contribution moves the same project forward.</p><div class="town-progress" role="progressbar" aria-label="Bridge progress" aria-valuemin="0" aria-valuemax="${$}" aria-valuenow="${J}"><span style="width:${Q}%"></span></div><div class="town-progress-label"><span>${J} shells raised</span><b>${Math.max(0,$-J)} to go</b></div><div class="contribute-row">${[5,10,25].map((Z)=>`<button type="button" data-contribute="${Z}" ${L.busy||J>=$?"disabled":""}><small>Give</small><b>${Z}</b></button>`).join("")}</div><div class="town-subhead"><b>Top helpers</b><span>Shared by the whole plaza</span></div>${W}`}function vE(){let $=L.cat,J=$?.coat||"OrangeTabby",Q=$?.name||"",W=Object.entries(X9).map(([K,H])=>`<label class="cat-coat" style="--coat:${H.color};--patch:${H.accent||H.color}"><input type="radio" name="cat-coat" value="${K}" ${J===K?"checked":""}><span aria-hidden="true"><i></i></span><b>${H.name}</b></label>`).join("");if(!$)return`<div class="cat-intro"><div class="cat-silhouette" aria-hidden="true"><i></i></div><div><small>Stray at the garden gate</small><h3>Choose a companion</h3><p>A village cat has decided you look interesting.</p></div></div><div class="cat-coats">${W}</div><label class="town-field"><span>What will you call them?</span><input name="cat-name" maxlength="18" placeholder="Marmalade" autocomplete="off"></label><button type="button" class="town-primary" data-action="adopt" ${L.busy?"disabled":""}>Adopt this cat</button>`;let Z=Math.max(0,Math.min(100,Number($.affection||0)));return`<div class="cat-family"><div class="cat-portrait" style="--coat:${X9[$.coat].color};--patch:${X9[$.coat].accent||X9[$.coat].color}" aria-hidden="true"><i></i><span></span></div><div><small>Your companion</small><h3>${P8($.name)}</h3><p>${Z>=80?"Completely devoted":Z>=45?"Trusting and playful":"Still getting to know you"}</p></div></div><div class="affection-row"><span><b>Bond</b><small>${Z}/100</small></span><div class="affection-meter"><i style="width:${Z}%"></i></div></div><div class="cat-actions"><button type="button" data-action="feed" ${L.catFeedBusy?"disabled":""}><span aria-hidden="true" class="bowl-mark"></span><span><b>${L.catFeedBusy?"Saving…":"Give a snack"}</b><small>3 shells · +12 bond</small></span></button><button type="button" data-action="cat-wave"><span aria-hidden="true" class="paw-mark"></span><span><b>Wave hello</b><small>${P8($.name)} reacts</small></span></button></div><details class="cat-rename"><summary>Change name or coat</summary><div class="cat-coats">${W}</div><label class="town-field"><span>Name</span><input name="cat-name" maxlength="18" value="${P8(Q)}" autocomplete="off"></label><button type="button" class="town-secondary" data-action="adopt" ${L.busy?"disabled":""}>Save changes</button></details>`}function yE(){let $=L.festival?.id||"",J=CE();return`<div class="festival-banner"><span class="festival-sparks" aria-hidden="true"><i></i><i></i><i></i></span><div><small>Rotating town events</small><h3>${$?z8[$].name:"Pick tonight’s celebration"}</h3><p>${$?`Started by ${P8(L.festival.startedBy||"a neighbor")}. It runs for ten minutes.`:`${z8[J].name} is next in the town rotation.`}</p></div></div><div class="festival-list">${Object.entries(z8).map(([Q,W])=>`<button type="button" data-festival="${Q}" class="${$===Q?"active":""}" ${L.busy?"disabled":""}><span class="festival-mark ${Q}" aria-hidden="true"><i></i></span><span><b>${W.name}</b><small>${W.note}</small></span><strong>${$===Q?"Live":J===Q?"Next":"Start"}</strong></button>`).join("")}</div>`}function bE(){let $=Object.entries(I8).map(([Q,W])=>`<option value="${Q}">${W.name} · ${W.kind}</option>`).join(""),J=_8.map((Q,W)=>{let Z=L.garden[W];if(!Z)return`<article class="garden-plot empty"><span class="garden-stage-mark seed" aria-hidden="true"><i></i></span><div><small>Plot ${W+1}</small><b>Fresh soil</b><span>Choose a seed and start something new.</span></div><button type="button" data-plant-slot="${W}" ${L.gardenBusySlot>=0?"disabled":""}>Plant</button></article>`;let K=I8[Z.kind],H=E9(Z),Y=Z.wateredStage===H.index;return`<article class="garden-plot"><span class="garden-stage-mark ${Z.kind} stage-${H.index}" aria-hidden="true"><i></i></span><div><small>Plot ${W+1} · ${K.kind}</small><b>${K.name}</b><span>${H.name}${H.nextMs?` · next phase in ${zE(H.nextMs)}`:" · fully grown"}</span><div class="garden-progress" role="progressbar" aria-label="${P8(K.name)} growth" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(H.progress*100)}"><i style="width:${Math.round(H.progress*100)}%"></i></div></div><div class="garden-actions"><button type="button" data-water-slot="${W}" ${Y||L.gardenBusySlot>=0?"disabled":""}>${Y?"Watered":"Water"}</button><button type="button" data-clear-slot="${W}" ${L.gardenBusySlot>=0?"disabled":""}>Clear</button></div></article>`}).join("");return`<div class="garden-intro"><span class="garden-intro-mark" aria-hidden="true"><i></i></span><div><small>Community garden</small><h3>Plant, water, and watch it grow</h3><p>Flowers, leafy plants, and trees develop through visible phases over real time. Water once per phase to move growth ahead by five minutes.</p></div></div><label class="garden-seed-picker"><span>Seed for the next empty plot</span><select name="garden-seed">${$}</select></label><div class="garden-plots">${J}</div>`}function xE(){return'<div class="photo-intro"><div class="photo-frame-mark" aria-hidden="true"><i></i></div><div><small>Photo mode</small><h3>Hold the whole world still</h3><p>Pose your avatar, circle the camera, then keep a clean picture of the plaza.</p></div></div><ul class="photo-notes"><li><i aria-hidden="true"></i><span><b>Freeze the moment</b><small>Walking, wildlife, and festival motion pause while you frame the shot.</small></span></li><li><i aria-hidden="true"></i><span><b>Direct the pose</b><small>Choose a calm stance, a wave, a cheer, or a laugh.</small></span></li><li><i aria-hidden="true"></i><span><b>Save or share</b><small>Your picture stays on this device unless you choose Share.</small></span></li></ul><button type="button" class="town-primary" data-action="photo-start">Open photo mode</button>'}function B0(){let $=D$(".town-life-sheet");if(!$)return;let J=[["projects","Projects"],["garden","Garden"],["cat","My Cat"],["festivals","Festivals"],["photo","Photos"]],Q=L.view==="projects"?hE():L.view==="garden"?bE():L.view==="cat"?vE():L.view==="festivals"?yE():xE();$.innerHTML=`<div class="town-grabber"></div><header class="town-head"><div><small>Cyclical City activities</small><h2>Town Life</h2></div><button type="button" class="town-close" aria-label="Close Town Life">×</button></header><nav class="town-tabs" aria-label="Town Life sections">${J.map(([W,Z])=>`<button type="button" data-town-view="${W}" class="${L.view===W?"active":""}">${Z}</button>`).join("")}</nav>${L.error?`<div class="town-error" role="status">${P8(L.error)}</div>`:""}<div class="town-content">${L.loading?'<div class="town-loading">Checking the notice board…</div>':Q}</div>`,$.querySelector(".town-close")?.addEventListener("click",p7),$.querySelectorAll("[data-town-view]").forEach((W)=>W.addEventListener("click",()=>{L.view=W.dataset.townView,B0()})),$.querySelectorAll("[data-contribute]").forEach((W)=>W.addEventListener("click",()=>VE(W.dataset.contribute))),$.querySelectorAll("[data-action='adopt']").forEach((W)=>W.addEventListener("click",kE)),$.querySelector("[data-action='feed']")?.addEventListener("click",DE),$.querySelector("[data-action='cat-wave']")?.addEventListener("click",()=>{F9(),v0(`${L.cat?.name||"Your cat"} hops in reply`)}),$.querySelectorAll("[data-festival]").forEach((W)=>W.addEventListener("click",()=>BE(W.dataset.festival))),$.querySelectorAll("[data-plant-slot]").forEach((W)=>W.addEventListener("click",()=>_E(W.dataset.plantSlot,$.querySelector("[name='garden-seed']")?.value||"moonflower"))),$.querySelectorAll("[data-water-slot]").forEach((W)=>W.addEventListener("click",()=>PE(W.dataset.waterSlot))),$.querySelectorAll("[data-clear-slot]").forEach((W)=>W.addEventListener("click",()=>IE(W.dataset.clearSlot))),$.querySelector("[data-action='photo-start']")?.addEventListener("click",iE)}function v0($){let J=D$(".town-toast");if(!J)J=document.createElement("div"),J.className="town-toast",J.setAttribute("role","status"),document.body.appendChild(J);J.textContent=$,J.classList.add("show"),clearTimeout(v0.timer),v0.timer=setTimeout(()=>J.classList.remove("show"),2200)}function gE($){$?.traverse?.((J)=>{if(!J.isMesh)return;J.geometry?.dispose?.(),(Array.isArray(J.material)?J.material:[J.material]).forEach((W)=>W?.dispose?.())})}function X8($,J,Q,W,Z){let K=new y($,new v({color:J,roughness:0.9}));return K.position.set(Q,W,Z),K.castShadow=!0,K}function pE($,J){let Q=I8[$.kind],W=new c;W.userData.stage=J;let Z=7031092;if(J===0)return W.add(X8(new q0(0.09,8,6),Z,0,0.07,0)),W;if($.kind==="oak"){let H=[0,0.42,0.95,1.75][J],Y=X8(new T0(0.06+J*0.035,0.09+J*0.04,H,7),7754043,0,H/2,0);W.add(Y);let X=J===1?1:J===2?3:5;for(let U=0;U<X;U+=1){let E=U/X*Math.PI*2,G=J===1?0:0.2+J*0.055,q=X8(new a$(0.18+J*0.14,1),Q.leaf,Math.cos(E)*G,H+U%2*0.12,Math.sin(E)*G);W.add(q)}return W}if($.kind==="fern"){let H=2+J*2;for(let Y=0;Y<H;Y+=1){let X=Y/H*Math.PI*2,U=0.18+J*0.16,E=X8(new q0(0.12,8,5),Q.leaf,Math.cos(X)*U*0.55,0.12+U*0.45,Math.sin(X)*U*0.55);E.scale.set(0.52,1.65+J*0.16,0.38),E.rotation.set(Math.cos(X)*0.42,-X,Math.sin(X)*0.42),W.add(E)}return W}let K=0.18+J*0.21;if(W.add(X8(new T0(0.025,0.035,K,7),Q.leaf,0,K/2,0)),J>=1)[-1,1].forEach((H)=>{let Y=X8(new q0(0.095,8,5),Q.leaf,H*0.1,K*0.52,0);Y.scale.set(1.4,0.5,0.65),Y.rotation.z=H*0.45,W.add(Y)});if(J>=2)W.add(X8(new q0(J===2?0.12:0.09,10,7),J===2?9401006:15975774,0,K+0.08,0));if(J>=3)for(let H=0;H<7;H+=1){let Y=H/7*Math.PI*2,X=X8(new q0(0.1,9,6),Q.color,Math.cos(Y)*0.16,K+0.08,Math.sin(Y)*0.16);X.scale.set(1.25,0.48,0.72),X.rotation.y=-Y,W.add(X)}return W}function X6($=!1){let J=L.world;if(!J?.scene||J.mode!=="village")return;let Q=L.garden.map((Z)=>Z?`${Z.kind}:${E9(Z).index}`:"-").join("|");if(!$&&Q===L.gardenSignature&&L.gardenGroup?.parent)return;if(L.gardenGroup)L.gardenGroup.parent?.remove(L.gardenGroup),gE(L.gardenGroup);let W=new c;W.name="PlayerGardenGrowth",L.garden.forEach((Z,K)=>{if(!Z||!_8[K])return;let H=E9(Z),Y=pE(Z,H.index);Y.name=`Growing_${Z.kind}_${K+1}`,Y.position.set(_8[K][0],0.22,_8[K][1]),Y.userData.plot=K,Y.userData.baseScale=0.86+H.progress*0.14,Y.scale.setScalar(Y.userData.baseScale),W.add(Y)}),J.scene.add(W),L.gardenGroup=W,L.gardenSignature=Q}function lE($){if($-L.gardenLastTick<1000)return;L.gardenLastTick=$;let J=L.gardenSignature;if(X6(),L.gardenSignature!==J&&L.open&&L.view==="garden")B0();L.gardenGroup?.children.forEach((Q)=>{let W=L.garden[Q.userData.plot];if(!W)return;let K=0.86+E9(W).progress*0.14;Q.userData.baseScale=K,Q.scale.set(K*(1+Math.sin($*0.0014+Q.userData.plot)*0.012),K,K)})}function uE(){let $=new s6;return $.moveTo(0,-0.12),$.bezierCurveTo(-0.32,-0.34,-0.48,0.08,-0.22,0.2),$.bezierCurveTo(-0.08,0.28,0,0.15,0,0.08),$.bezierCurveTo(0,0.15,0.08,0.28,0.22,0.2),$.bezierCurveTo(0.48,0.08,0.32,-0.34,0,-0.12),new a6($,8)}function u7($=!1){let J=L.world;if(!J?.scene||J.mode!=="village")return;if(L.catFollower&&(!L.cat||$||L.catFollower.userData.coat!==L.cat.coat))L.catFollower.parent?.remove(L.catFollower),L.catFollower=null,L.catHearts=null;if(!L.cat||L.catFollower)return;let Q=J.scene.getObjectByName(`VillageCat_${L.cat.coat}`)||J.scene.getObjectByName("VillageCat_OrangeTabby");if(!Q)return;let W=Q.clone(!0);W.name="AdoptedCatFollower",W.userData={...Q.userData,coat:L.cat.coat,adopted:!0},W.scale.multiplyScalar(1.12);let Z=new c;Z.name="CatReactionHearts";let K=uE();[0,1,2].forEach((H)=>{let Y=new y(K,new I0({color:H===1?15967912:15165554,side:R8,transparent:!0,opacity:0}));Y.scale.setScalar(0.34-H*0.04),Y.position.set((H-1)*0.24,0.8+H*0.13,0),Z.add(Y)}),W.add(Z),J.scene.add(W),L.catFollower=W,L.catHearts=Z}function F9(){L.catReactUntil=performance.now()+2400}function dE(){let $=new c;$.name="TownFestivalFireworks";for(let J=0;J<5;J+=1){let W=new Float32Array(144),Z=[];for(let Y=0;Y<48;Y+=1){let X=Math.acos(1-2*((Y+0.5)/48)),U=Y*2.399963;Z.push(new w(Math.sin(X)*Math.cos(U),Math.cos(X),Math.sin(X)*Math.sin(U)))}let K=[16041550,15562334,7913676,16033464,10408321],H=new f$(new Z0,new w$({color:K[J],size:0.11,transparent:!0,opacity:0,depthWrite:!1}));H.geometry.setAttribute("position",new M0(W,3)),H.position.set(-4+J*2,5.2+J%2*1.2,-3.5-J%3),H.userData={directions:Z,delay:J*720,duration:1900},$.add(H)}return $}function mE(){let $=new c;$.name="TownFestivalMeteors";let J=new w8({color:14284031,transparent:!0,opacity:0.9});for(let Q=0;Q<16;Q+=1){let W=new Z0().setFromPoints([new w(0,0,0),new w(-1.4,0.55,0)]),Z=new i$(W,J.clone());Z.userData={start:Q/16*1.8,speed:0.55+Q%4*0.08,lane:Q},$.add(Z)}return $}function cE(){let $=new c;$.name="TownFestivalParade";let J=[15165524,6065509,5668774,14723648,12086668];for(let Q=0;Q<5;Q+=1){let W=new c,Z=new y(new o$(0.24,0.45,4,8),new v({color:J[Q],roughness:0.75}));Z.position.y=0.58;let K=new y(new T0(0.31,0.31,0.13,24),new v({color:15053706,roughness:0.8}));K.rotation.x=Math.PI/2,K.position.y=1.18;let H=new y(new x0(0.3,0.58,8),new v({color:J[(Q+2)%J.length],roughness:0.7}));H.position.y=1.58,W.add(Z,K,H),W.userData.phase=Q/5*Math.PI*2,$.add(W)}return $}function G9(){let $=L.world;if(!$?.scene||$.mode!=="village")return;let J=L.festival&&Date.now()-Number(L.festival.startedAt)<600000?L.festival.id:"";if(L.festivalGroup&&L.festivalKind!==J)L.festivalGroup.parent?.remove(L.festivalGroup),L.festivalGroup.traverse((Q)=>{if(Q.isMesh||Q.isPoints||Q.isLine)Q.geometry?.dispose?.(),Q.material?.dispose?.()}),L.festivalGroup=null;if(L.festivalKind=J,L.festivalStartedAt=L.festival?.startedAt||Date.now(),!J||L.festivalGroup)return;L.festivalGroup=J==="fireworks"?dE():J==="meteors"?mE():cE(),$.scene.add(L.festivalGroup)}function nE($){let J=L.festivalGroup;if(!J||L.photoMode)return;let Q=(Date.now()-L.festivalStartedAt)/1000;if(L.festivalKind==="fireworks")J.children.forEach((W)=>{let Z=(($-W.userData.delay)%3100+3100)%3100,K=Math.min(1,Z/W.userData.duration),H=W.geometry.attributes.position;W.userData.directions.forEach((Y,X)=>{let U=K*2.15;H.setXYZ(X,Y.x*U,Y.y*U-K*K*0.9,Y.z*U)}),H.needsUpdate=!0,W.material.opacity=Z<W.userData.duration?Math.sin(K*Math.PI)*0.95:0});else if(L.festivalKind==="meteors")J.children.forEach((W)=>{let Z=(Q*W.userData.speed+W.userData.start)%2;W.position.set(8-Z*15,8+W.userData.lane%5*0.65-Z*2.7,-7+W.userData.lane%8*1.7),W.material.opacity=Z>1.78?(2-Z)/0.22:0.88});else if(L.festivalKind==="parade")J.children.forEach((W,Z)=>{let K=Q*0.42+W.userData.phase;W.position.set(Math.cos(K)*2.8,Math.abs(Math.sin(Q*7+Z))*0.055,Math.sin(K)*2.15),W.rotation.y=-K})}function sE($){let J=L.catFollower,Q=L.world?.player;if(!J||!Q||L.photoMode)return;let W=new w(-0.75,0,-0.95).applyAxisAngle(new w(0,1,0),Q.rotation.y).add(Q.position),Z=J.position.distanceTo(W);J.position.lerp(W,Z>3?0.2:0.055),J.rotation.y+=(Math.atan2(Q.position.x-J.position.x,Q.position.z-J.position.z)-J.rotation.y)*0.12,J.position.y=Math.max(0,Math.sin($*0.009)*(Z>0.25?0.045:0.012));let K=$<L.catReactUntil;if(K)J.position.y+=Math.abs(Math.sin($*0.014))*0.22,J.rotation.y+=0.05;L.catHearts?.children.forEach((H,Y)=>{H.material.opacity=K?Math.max(0,Math.sin((L.catReactUntil-$)/2400*Math.PI+Y*0.35)):0,H.position.y=0.75+Y*0.16+(K?($/500+Y*0.2)%0.5:0),H.lookAt(L.world.camera.position)})}function iE(){if(!L.world?.camera||!L.world?.renderer)return;p7(),L.photoMode=!0,L.photoFrozenAt=Date.now(),L.photoFrozenPosition=L.world.player.position.clone(),L.photoCamera={position:L.world.camera.position.clone(),quaternion:L.world.camera.quaternion.clone()},document.documentElement.classList.add("snug-photo-mode"),q9();let $=document.createElement("div");$.className="photo-mode-ui",$.innerHTML=`<div class="photo-top"><button type="button" data-photo="close" aria-label="Exit photo mode">×</button><span><small>Photo mode</small><b>World paused</b></span></div><div class="photo-controls"><div class="pose-row"><button type="button" data-pose="calm" class="active">Calm</button><button type="button" data-pose="wave">Wave</button><button type="button" data-pose="cheer">Cheer</button><button type="button" data-pose="laugh">Laugh</button></div><div class="camera-row"><button type="button" data-camera="left" aria-label="Rotate camera left">↶</button><label><span>Zoom</span><input type="range" min="3.8" max="9.5" step="0.1" value="${L.photoDistance}"></label><button type="button" data-camera="right" aria-label="Rotate camera right">↷</button><button type="button" class="photo-shutter" data-photo="capture"><i aria-hidden="true"></i><b>Take photo</b></button></div></div>`,document.body.appendChild($),$.querySelector("[data-photo='close']")?.addEventListener("click",yH),$.querySelector("[data-photo='capture']")?.addEventListener("click",aE),$.querySelectorAll("[data-pose]").forEach((J)=>J.addEventListener("click",()=>{L.photoPose=J.dataset.pose,$.querySelectorAll("[data-pose]").forEach((Q)=>Q.classList.toggle("active",Q===J)),F9()})),$.querySelector("[data-camera='left']")?.addEventListener("click",()=>{L.photoAzimuth-=15,U9()}),$.querySelector("[data-camera='right']")?.addEventListener("click",()=>{L.photoAzimuth+=15,U9()}),$.querySelector("input[type='range']")?.addEventListener("input",(J)=>{L.photoDistance=Number(J.target.value),U9()}),U9()}function U9(){if(!L.photoMode||!L.world?.camera)return;let $=L.world.player,J=q$.degToRad(L.photoAzimuth);L.world.camera.position.set($.position.x+Math.sin(J)*L.photoDistance,L.photoHeight,$.position.z+Math.cos(J)*L.photoDistance),L.world.camera.lookAt($.position.x,0.95,$.position.z)}function oE($){if(!L.photoMode||!L.world?.player)return;let J=L.world.player;J.position.copy(L.photoFrozenPosition);let Q=J.userData||{},W=Math.sin($*0.004);if(Q.coinHead)Q.coinHead.rotation.z=L.photoPose==="laugh"?W*0.08:0;Q.hands?.forEach((Z,K)=>{let H=Q.handBases?.[K];if(!H)return;if(Z.position.set(H.x,H.y,H.z),Z.rotation.z=0,L.photoPose==="wave"&&K===1)Z.position.y=H.y+0.58,Z.position.x=H.x+0.12,Z.rotation.z=W*0.45;else if(L.photoPose==="cheer")Z.position.y=H.y+0.62,Z.position.x=H.x+(K?0.18:-0.18),Z.rotation.z=K?-0.4:0.4;else if(L.photoPose==="laugh")Z.position.y=H.y+0.28,Z.position.x=H.x+(K?-0.1:0.1)}),U9()}function yH(){if(!L.photoMode)return;if(L.photoMode=!1,L.photoCamera&&L.world?.camera)L.world.camera.position.copy(L.photoCamera.position),L.world.camera.quaternion.copy(L.photoCamera.quaternion);if(D$(".photo-mode-ui")?.remove(),D$(".photo-preview-backdrop")?.remove(),L.photoPreviewUrl)URL.revokeObjectURL(L.photoPreviewUrl);L.photoPreviewUrl="",document.documentElement.classList.remove("snug-photo-mode"),q9()}function aE(){let{renderer:$,scene:J,camera:Q}=L.world||{};if(!$?.domElement)return;try{$.render(J,Q)}catch{}$.domElement.toBlob((W)=>{if(!W)return v0("The camera missed that frame. Try once more.");if(L.photoPreviewUrl)URL.revokeObjectURL(L.photoPreviewUrl);L.photoPreviewUrl=URL.createObjectURL(W);let Z=document.createElement("div");Z.className="photo-preview-backdrop",Z.innerHTML=`<section class="photo-preview" role="dialog" aria-modal="true" aria-labelledby="photo-preview-title"><div class="photo-preview-head"><div><small>Photo ready</small><h2 id="photo-preview-title">A moment in the plaza</h2></div><button type="button" data-preview="close" aria-label="Close photo preview">×</button></div><img src="${L.photoPreviewUrl}" alt="Captured Cyclical City plaza scene"><div class="photo-preview-actions"><a download="cylindric-social-photo.png" href="${L.photoPreviewUrl}">Download</a>${navigator.share&&typeof File<"u"?'<button type="button" data-preview="share">Share</button>':""}</div></section>`,Z.addEventListener("pointerdown",(K)=>{if(K.target===Z)Z.remove()}),Z.querySelector("[data-preview='close']")?.addEventListener("click",()=>Z.remove()),Z.querySelector("[data-preview='share']")?.addEventListener("click",async()=>{try{let K=new File([W],"snug-society-photo.png",{type:"image/png"});if(navigator.canShare&&!navigator.canShare({files:[K]}))throw Error("unsupported");await navigator.share({files:[K],title:"Cyclical City photo"})}catch(K){if(K?.name!=="AbortError")v0("Sharing is not available here. You can download instead.")}}),document.body.appendChild(Z),window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"camera"}}))},"image/png")}function bH($){if(!L.photoMode)return;if($.target.closest?.(".photo-mode-ui,.photo-preview-backdrop"))return;$.preventDefault(),$.stopImmediatePropagation()}window.addEventListener("pointerdown",bH,!0);window.addEventListener("pointerup",bH,!0);window.addEventListener("keydown",($)=>{if(!L.photoMode)return;if($.key==="Escape")yH();else if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d"].includes($.key))$.preventDefault(),$.stopImmediatePropagation()},!0);window.addEventListener("pointerdown",($)=>{if(!L.cat||L.photoMode)return;let Q=$.target.closest?.("button")?.textContent?.trim()||"";if(/^(Happy|Calm|Cheeky|Angry|Sad|Laughter|Laugh|Yawn|Side-eye|Wave)$/i.test(Q))F9()},!0);function N9($){if(L.world=window.__snugWorld||L.world,L.world?.mode==="village"){if(u7(),G9(),sE($),nE($),lE($),L.festivalKind==="fireworks"&&L.world.scene?.background){if(L.world.scene.background.set(1319738),L.world.scene.fog?.color)L.world.scene.fog.color.set(1319738)}oE($)}if(jE($),!N9.lastDock||$-N9.lastDock>1000){if(N9.lastDock=$,q9(),L.festival&&Date.now()-Number(L.festival.startedAt)>=600000)L.festival=null,G9(),B0()}requestAnimationFrame(N9)}window.addEventListener("snug-session",($)=>{L.session=$.detail,LW()});window.addEventListener("snug-world-ready",($)=>{L.world=$.detail||window.__snugWorld,u7(!0),G9(),X6(!0),q9()});window.addEventListener("pagehide",()=>{if(L.photoPreviewUrl)URL.revokeObjectURL(L.photoPreviewUrl)});if(window.__snugSession)L.session=window.__snugSession,LW();L.world=window.__snugWorld||null;q9();requestAnimationFrame(N9);var I={session:null,profile:{inventory:[],coinBalance:0,equippedAppearance:{},gameplay:{}},gameplay:{},presence:[],socialEvents:[],mail:[],panel:null,view:"today",lastPosition:null,saveTimer:0,polling:0,busy:!1,seen:new Set},z0=($,J=document)=>J.querySelector($),H0=($)=>{let J=document.createElement("span");return J.textContent=String($??""),J.innerHTML},n7=()=>z0(".profile-chip b")?.textContent?.trim()||I.session?.playerName||"Player",R9=()=>{let $=new Date;return`${$.getFullYear()}-${String($.getMonth()+1).padStart(2,"0")}-${String($.getDate()).padStart(2,"0")}`},d7=($=R9())=>Math.floor(new Date(`${$}T12:00:00`).getTime()/86400000),y$=()=>Array.isArray(I.profile.inventory)?I.profile.inventory:[],y0=($)=>{let J=z0(".society-toast");if(!J)J=document.createElement("div"),J.className="society-toast",J.setAttribute("role","status"),document.body.appendChild(J);J.textContent=$,J.classList.add("show"),clearTimeout(y0.timer),y0.timer=setTimeout(()=>J.classList.remove("show"),2300)};function m7($){if($===null||$===void 0)return{nullValue:null};if(typeof $==="boolean")return{booleanValue:$};if(typeof $==="number")return Number.isInteger($)?{integerValue:String($)}:{doubleValue:$};if(typeof $==="string")return{stringValue:$};if(Array.isArray($))return{arrayValue:{values:$.map(m7)}};return{mapValue:{fields:Object.fromEntries(Object.entries($).map(([J,Q])=>[J,m7(Q)]))}}}function VW($={}){if("stringValue"in $)return $.stringValue;if("integerValue"in $)return Number($.integerValue);if("doubleValue"in $)return Number($.doubleValue);if("booleanValue"in $)return $.booleanValue;if("nullValue"in $)return null;if($.arrayValue)return($.arrayValue.values||[]).map(VW);if($.mapValue)return Object.fromEntries(Object.entries($.mapValue.fields||{}).map(([J,Q])=>[J,VW(Q)]));if($.timestampValue)return $.timestampValue;return null}function gH($={}){return Object.fromEntries(Object.entries($).map(([J,Q])=>[J,VW(Q)]))}async function N6(){if(!I.session?.user)throw Error("Waiting for Firebase sign-in");return{"Content-Type":"application/json",Authorization:`Bearer ${await I.session.user.getIdToken()}`}}function BW($=I.session?.uid){let J=I.session?.projectId||I.session?.app?.options?.projectId;return`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(J)}/databases/(default)/documents/players/${encodeURIComponent($)}`}function CW($,J="mail"){return`${BW($)}/${encodeURIComponent(J)}`}async function rE(){let $=await fetch(`${CW(I.session.uid)}?pageSize=30&orderBy=createdAt%20desc`,{headers:await N6()});if(!$.ok)throw Error(`Mailbox returned ${$.status}`);return((await $.json()).documents||[]).map((Q)=>({id:Q.name.split("/").pop(),...gH(Q.fields||{})}))}async function zW($,J){let Q=await fetch(CW($),{method:"POST",headers:await N6(),body:JSON.stringify({fields:Object.fromEntries(Object.entries(J).map(([W,Z])=>[W,m7(Z)]))})});if(!Q.ok)throw Error(`Mailbox write returned ${Q.status}`);return Q.json()}async function _W($){let J=await fetch(`${CW(I.session.uid)}/${encodeURIComponent($)}`,{method:"DELETE",headers:await N6()});if(!J.ok)throw Error(`Mailbox delete returned ${J.status}`)}async function tE(){let $=await fetch(BW(),{headers:await N6()});if(!$.ok)throw Error(`Player data returned ${$.status}`);I.profile={...I.profile,...gH((await $.json()).fields||{})},I.gameplay=I.profile.gameplay&&typeof I.profile.gameplay==="object"?I.profile.gameplay:{},i7()}async function eE(){clearTimeout(I.saveTimer),I.profile.gameplay=I.gameplay;let $=`${BW()}?updateMask.fieldPaths=gameplay`,J=await fetch($,{method:"PATCH",headers:await N6(),body:JSON.stringify({fields:{gameplay:m7(I.gameplay)}})});if(!J.ok)throw Error(`Progress save returned ${J.status}`)}function U8(){clearTimeout(I.saveTimer),I.saveTimer=setTimeout(()=>eE().catch(()=>y0("Progress will retry when Firebase reconnects")),500)}function E6($){let J=typeof $==="function"?$(I.profile):{...I.profile,...$};I.profile=J,window.dispatchEvent(new CustomEvent("snug-player-patch",{detail:(Q)=>({...Q,...J,owned:J.inventory||Q.owned||[]})}))}function s7($,J){I.profile.coinBalance=Math.max(0,Number(I.profile.coinBalance||0)+$),window.dispatchEvent(new CustomEvent("snug-award-coins",{detail:{amount:$,message:J}}))}var c7=[{id:"coin-collector",label:"Gather 8 coins in Coin Scramble",game:"coin",goal:8,reward:18},{id:"tag-two",label:"Make 2 tags in Plaza Tag",game:"tag",goal:2,reward:20},{id:"quiz-four",label:"Score 4 points in Room Quiz",game:"quiz",goal:4,reward:20},{id:"balloon-eight",label:"Pop 8 balloons",game:"balloon",goal:8,reward:24},{id:"race-winner",label:"Win a race",games:["sprint","relay"],goal:1,reward:30,requireWin:!0},{id:"fish-three",label:"Catch 3 fish",game:"fishing",goal:3,reward:24},{id:"tiles-winner",label:"Win a Tumble Tiles round",game:"floor",goal:1,reward:22,requireWin:!0},{id:"four-row-winner",label:"Win at Four in a Row",game:"connect4",goal:1,reward:28,requireWin:!0},{id:"noughts-winner",label:"Win at Noughts & Crosses",game:"tictactoe",goal:1,reward:24,requireWin:!0},{id:"keepsake-five",label:"Find 5 village keepsakes",game:"scavenger",goal:5,reward:22},{id:"relay-six",label:"Clear 6 relay gates",game:"relay",goal:6,reward:22},{id:"potato-three",label:"Make 3 hot-potato passes",game:"potato",goal:3,reward:26},{id:"mayor-eight",label:"Match 8 Mayor Says moves",game:"simon",goal:8,reward:22},{id:"hide-four",label:"Score 4 points in Hide & Seek",game:"hide",goal:4,reward:28},{id:"statues-three",label:"Hold 3 musical-statue freezes",game:"statues",goal:3,reward:24},{id:"memory-three",label:"Match 3 memory pairs",game:"memory",goal:3,reward:26},{id:"pattern-six",label:"Repeat 6 parade steps",game:"pattern",goal:6,reward:24},{id:"draw-two",label:"Make 2 sketch guesses",game:"draw",goal:2,reward:28},{id:"cats-three",label:"Herd 3 cats",game:"cats",goal:3,reward:26},{id:"bridge-five",label:"Gather 5 bridge supplies",game:"bridge",goal:5,reward:28},{id:"curling-one",label:"Land a scoring curl",game:"curling",goal:1,reward:24},{id:"charades-two",label:"Guess 2 emote charades",game:"charades",goal:2,reward:26},{id:"sneaky-one",label:"Catch 1 sneaky bluff",game:"sneaky",goal:1,reward:28},{id:"snap-three",label:"Frame 3 scavenger sights",game:"snap",goal:3,reward:26},{id:"puffs-three",label:"Dodge 3 puffs",game:"puffs",goal:3,reward:24},{id:"freeze-two",label:"Make 2 Freeze Tag saves",game:"freeze",goal:2,reward:26},{id:"treasure-three",label:"Dig up 3 treasures",game:"treasure",goal:3,reward:26},{id:"snowball-four",label:"Hit 4 snowball targets",game:"snowball",goal:4,reward:24},{id:"lantern-five",label:"Find 5 lanterns",game:"lantern",goal:5,reward:26},{id:"petal-five",label:"Catch 5 golden petals",game:"petal",goal:5,reward:24}],pH=[{id:"first-round",name:"Game Night",note:"Finish a minigame",reward:20,test:($)=>($.totals?.rounds||0)>=1},{id:"trail-shoes",name:"Trail Shoes",note:"Walk 1,000 steps",reward:35,test:($)=>($.totals?.steps||0)>=1000},{id:"good-neighbor",name:"Good Neighbor",note:"Send 10 friendly reactions",reward:30,test:($)=>($.totals?.social||0)>=10},{id:"collector",name:"Curio Cabinet",note:"Own five unlocks",reward:40,test:()=>y$().length>=5},{id:"festival-friend",name:"Festival Friend",note:"Claim a festival keepsake",reward:30,test:($)=>Object.keys($.festivalRewards||{}).length>=1}],lH={Fireworks:{id:"festival-sparkler-pin",name:"Sparkler Pin"},Meteors:{id:"festival-stargazer-scarf",name:"Stargazer Scarf"},Parade:{id:"festival-parade-rosette",name:"Parade Rosette"}};function i7(){let $=R9(),J=I.gameplay.daily||{},Q=d7($)-1,W=Number(J.streak||0);if(J.date!==$)W=d7(J.date)===Q?Math.min(7,W+1):1;let Z=Array.from({length:3},(Y,X)=>c7[(d7($)*3+X*2)%c7.length]),K=J.date===$?J.progress||{}:{},H=J.date===$?J.claimed||{}:{};I.gameplay.daily={date:$,streak:W,loginClaimed:J.date===$&&J.loginClaimed===!0,progress:K,claimed:H,questIds:Z.map((Y)=>Y.id)},I.gameplay.totals||={steps:0,rounds:0,emotes:0,social:0},I.gameplay.achievements||={},I.gameplay.festivalRewards||={},I.gameplay.shopPurchases||={},U8()}function PW(){return(I.gameplay.daily?.questIds||[]).map(($)=>c7.find((J)=>J.id===$)).filter(Boolean)}function G6($,J=1){if(!I.session)return;i7(),I.gameplay.totals[$]=Number(I.gameplay.totals[$]||0)+J,U8(),b$()}function $G($={}){if(!I.session||!$.game)return;i7();let J=Math.max(0,Number($.score||0)),Q=I.gameplay.daily;PW().forEach((W)=>{if(!(W.games||[W.game]).includes($.game)||W.requireWin&&!$.won)return;let K=W.requireWin?1:J;if(K>0)Q.progress[W.id]=Math.min(W.goal,Number(Q.progress[W.id]||0)+K)}),U8(),b$()}function JG(){let $=I.gameplay.daily;if($.loginClaimed)return;let J=5+Math.min(6,$.streak-1)*3;$.loginClaimed=!0,U8(),s7(J,`${$.streak}-day welcome · +${J} shells`),b$()}function QG($,J,Q){document.querySelector(".solo-result-backdrop")?.remove();let W=document.createElement("div");W.className="solo-result-backdrop society-reward-backdrop",W.innerHTML=`<section class="solo-result" role="dialog" aria-modal="true" aria-labelledby="quest-result-title"><small>Daily quest complete</small><h2 id="quest-result-title">${H0($.label)}</h2><div class="solo-balance"><span><small>Before</small><b>${Q}</b></span><i aria-hidden="true">+</i><span class="solo-payout"><small>Bonus</small><b>${J}</b></span><i aria-hidden="true">=</i><span><small>After</small><b>${Q+J}</b></span></div><p>Dottie’s bonus is now in your shell balance.</p><div class="solo-result-actions"><button type="button" data-quest-done>Done</button><button type="button" class="multi-primary" data-quest-today>Today’s quests</button></div></section>`;let Z=()=>W.remove();W.addEventListener("pointerdown",(K)=>{if(K.target===W)Z()}),z0("[data-quest-done]",W)?.addEventListener("click",Z),z0("[data-quest-today]",W)?.addEventListener("click",()=>{Z(),o7("today")}),document.body.appendChild(W)}function WG($){let J=c7.find((Z)=>Z.id===$),Q=I.gameplay.daily;if(!J||Q.claimed[$]||Number(Q.progress[$]||0)<J.goal)return;let W=Number(I.profile.coinBalance||0);Q.claimed[$]=!0,U8(),s7(J.reward,`${J.label} · +${J.reward} shells`),b$(),QG(J,J.reward,W)}function ZG($){let J=pH.find((Q)=>Q.id===$);if(!J||I.gameplay.achievements[$]||!J.test(I.gameplay))return;I.gameplay.achievements[$]=Date.now(),U8(),s7(J.reward,`${J.name} · +${J.reward} shells`),window.dispatchEvent(new CustomEvent("snug-achievement-unlocked",{detail:{id:$.id}})),b$()}function uH(){let $=window.__snugWorld?.scene;if(!$)return null;return Object.entries(lH).find(([J])=>$.getObjectByName(`TownFestival${J}`))?.[1]||null}function KG(){let $=uH();if(!$||I.gameplay.festivalRewards[$.id])return;I.gameplay.festivalRewards[$.id]=Date.now(),E6((J)=>({...J,inventory:[...new Set([...J.inventory||[],$.id])]})),U8(),y0(`${$.name} added to your collection`),b$()}function HG(){let $=I.session?.app?.options||{};return String($.databaseURL||`https://${$.projectId||I.session?.projectId}-default-rtdb.firebaseio.com`).replace(/\/$/,"")}async function kW($,J={}){let[Q,W=""]=String($).split("?"),Z=Q.split("/").map(encodeURIComponent).join("/"),K=await fetch(`${HG()}/${Z}.json${W?`?${W}`:""}`,{...J,headers:{...await N6(),...J.headers||{}}});if(!K.ok)throw Error(`Village network returned ${K.status}`);return K.json().catch(()=>null)}async function U6(){if(!I.session)return;try{let[$,J,Q]=await Promise.all([kW("presence/plaza?orderBy=%22updatedAt%22&limitToLast=30"),kW("social/plaza/events?orderBy=%22createdAt%22&limitToLast=50"),rE()]);I.presence=Object.values($||{}).filter((W)=>W.uid&&W.uid!==I.session.uid&&Date.now()-Number(W.updatedAt||0)<20000),I.socialEvents=Object.entries(J||{}).map(([W,Z])=>({id:W,...Z})).filter((W)=>W.to===I.session.uid||W.from===I.session.uid).sort((W,Z)=>W.createdAt-Z.createdAt),I.mail=Array.isArray(Q)?Q.sort((W,Z)=>Number(Z.createdAt)-Number(W.createdAt)):[];for(let W of[...I.socialEvents.slice(-8),...I.mail.slice(0,5)]){if(I.seen.has(W.id))continue;if(I.seen.add(W.id),W.to===I.session.uid&&W.from!==I.session.uid)y0(W.type==="knock"?`${W.fromName} knocked on your door`:W.type==="reaction"?`${W.fromName} sent a ${W.reaction}`:W.type==="trade"?`${W.fromName} offered a trade`:W.type==="gift"?`${W.fromName} sent a gift`:"A neighbor reached out");if(W.type==="trade-accepted"&&W.to===I.session.uid&&W.item)E6((Z)=>({...Z,inventory:[...new Set((Z.inventory||[]).filter((K)=>K!==W.item).concat(W.want||[]))]})),_W(W.id).catch(()=>{})}b$()}catch{}}async function wW($,J,Q={}){if(!J||I.busy)return;I.busy=!0;try{if(await kW("social/plaza/events",{method:"POST",body:JSON.stringify({type:$,from:I.session.uid,fromName:n7().slice(0,18),to:J,createdAt:Date.now(),...Q})}),["reaction","knock"].includes($))G6("social",1);y0($==="knock"?"Knock sent":$==="trade"?"Trade offered":"Reaction sent")}catch{y0("That did not reach the village network")}finally{I.busy=!1,U6()}}async function YG($,J){if(!$||!J||!y$().includes(J)||I.busy)return;I.busy=!0;try{await zW($,{type:"gift",from:I.session.uid,fromName:n7().slice(0,18),to:$,item:J,createdAt:Date.now()}),E6((Q)=>({...Q,inventory:(Q.inventory||[]).filter((W)=>W!==J)})),G6("social",1),y0("Gift placed in their mailbox")}catch{y0("The gift was not sent; your item is still yours")}finally{I.busy=!1,b$()}}async function XG($){if(!$?.item)return;E6((J)=>({...J,inventory:[...new Set([...J.inventory||[],$.item])]})),await _W($.id).catch(()=>{}),y0(`${T8($.item)} added to your collection`),U6()}async function UG($){if(!$?.item||!y$().includes($.want))return y0(`You need ${T8($.want)} to accept`);E6((J)=>({...J,inventory:[...new Set((J.inventory||[]).filter((Q)=>Q!==$.want).concat($.item))]})),await zW($.from,{type:"trade-accepted",from:I.session.uid,fromName:n7().slice(0,18),to:$.from,item:$.item,want:$.want,createdAt:Date.now()}),await _W($.id).catch(()=>{}),y0("Trade complete"),U6()}var T8=($)=>String($||"item").replace(/[-_]+/g," ").replace(/\b\w/g,(J)=>J.toUpperCase());function dH(){let $=(window.__snugShopCosmetics||[]).filter((Q)=>!Q.fitPending);if(!$.length)return[];let J=d7();return Array.from({length:Math.min(3,$.length)},(Q,W)=>$[(J*7+W*3)%$.length])}function NG($){let J=I.gameplay.shopPurchases[R9()]||[];if(!$||J.includes($.id)||y$().includes($.id))return;let Q=Math.max(10,Number($.cost||40)-10);if(Number(I.profile.coinBalance||0)<Q)return y0("Play a round to earn more shells");I.gameplay.shopPurchases[R9()]=[...J,$.id],U8(),E6((W)=>({...W,inventory:[...new Set([...W.inventory||[],$.id])]})),s7(-Q,`${$.name} · −${Q} shells`),b$()}function EG(){let $=I.gameplay.daily||{},J=5+Math.min(6,Number($.streak||1)-1)*3,Q=PW().map((Z)=>{let K=Number($.progress?.[Z.id]||0),H=K>=Z.goal,Y=$.claimed?.[Z.id];return`<article class="society-task"><div><b>${H0(Z.label)}</b><small>${Math.floor(K)} / ${Z.goal}</small><i><span style="width:${Math.min(100,K/Z.goal*100)}%"></span></i></div><button data-claim-quest="${Z.id}" ${!H||Y?"disabled":""}>${Y?"Claimed":`+${Z.reward}`}</button></article>`}).join(""),W=dH().map((Z)=>{let K=(I.gameplay.shopPurchases?.[R9()]||[]).includes(Z.id)||y$().includes(Z.id),H=Math.max(10,Number(Z.cost||40)-10);return`<article class="daily-item"><span style="--item-color:${Z.color||"#7ca083"}"></span><div><small>${H0(Z.category)}</small><b>${H0(Z.name)}</b></div><button data-daily-buy="${H0(Z.id)}" ${K?"disabled":""}>${K?"Owned":`${H} shells`}</button></article>`}).join("")||'<p class="society-empty">Approved daily stock will appear after cosmetic files are added.</p>';return`<section class="streak-card"><div><small>Login streak</small><b>${$.streak||1} day${$.streak===1?"":"s"}</b><p>Tomorrow’s welcome grows a little more.</p></div><button data-login ${$.loginClaimed?"disabled":""}>${$.loginClaimed?"Collected":`Collect ${J}`}</button></section><div class="society-section"><h3>Today’s quests</h3>${Q}</div><div class="society-section"><h3>Daily market shelf</h3><div class="daily-shop">${W}</div></div>`}function xH(){return I.presence.map(($)=>`<option value="${H0($.uid)}">${H0($.name||"Neighbor")}</option>`).join("")}function GG(){let $=I.presence.length,J=y$().map((Z)=>`<option value="${H0(Z)}">${H0(T8(Z))}</option>`).join(""),Q=I.socialEvents.slice(-8).reverse().map((Z)=>`<li><b>${H0(Z.from===I.session.uid?`To ${Z.targetName||"neighbor"}`:Z.fromName)}</b><span>${H0(Z.type==="reaction"?Z.reaction:Z.type.replace(/-/g," "))}</span>${Z.type==="reaction"&&Z.to===I.session.uid?`<button data-return-reaction="${H0(Z.from)}" data-reaction-kind="${H0(Z.reaction||"wave")}">Return</button>`:Z.type==="trade"&&Z.to===I.session.uid?`<button data-accept-trade="${H0(Z.id)}">Accept</button>`:""}</li>`).join("")||'<li class="society-empty">Wave, knock, or offer a trade when a neighbor arrives.</li>',W=I.mail.filter((Z)=>Z.type!=="trade-accepted").map((Z)=>Z.type==="trade"?`<li><div><b>${H0(Z.fromName)} offers ${H0(T8(Z.item))}</b><small>For your ${H0(T8(Z.want))}</small></div><button data-accept-trade="${H0(Z.id)}">Accept trade</button></li>`:`<li><div><b>${H0(Z.fromName)} sent ${H0(T8(Z.item))}</b><small>Waiting in your mailbox</small></div><button data-accept-gift="${H0(Z.id)}">Open gift</button></li>`).join("")||'<li class="society-empty">Your mailbox is empty.</li>';return`<div class="social-status"><b>${$} neighbor${$===1?"":"s"} nearby</b><small>Live in the village plaza</small></div><div class="society-section"><h3>Quick reaction</h3><div class="social-compose"><select data-person><option value="">Choose a neighbor</option>${xH()}</select><button data-reaction="wave">Wave</button><button data-reaction="high-five">High-five</button><button data-knock>Knock</button></div></div><div class="society-section"><h3>Trade or gift</h3><div class="trade-grid"><select data-trade-person><option value="">Neighbor</option>${xH()}</select><select data-offer><option value="">Your item</option>${J}</select><select data-want><option value="">Ask for…</option>${J}</select><button data-trade>Offer trade</button><button data-gift>Mailbox gift</button></div></div><div class="society-section"><h3>Mailbox</h3><ul class="mail-list">${W}</ul></div><div class="society-section"><h3>Recent exchanges</h3><ul class="activity-list">${Q}</ul></div>`}function qG(){let $=Object.entries(window.__snugCosmetics||{}).map(([Q,W])=>{let Z=W.filter((K)=>K.id&&!K.fitPending);if(!Z.length)return"";return`<section class="collection-group"><h3>${H0(T8(Q))}<small>${Z.filter((K)=>y$().includes(K.id)).length}/${Z.length}</small></h3><div>${Z.map((K)=>`<span class="${y$().includes(K.id)?"owned":"missing"}"><i></i>${H0(K.name)}</span>`).join("")}</div></section>`}).join(""),J=Object.values(lH).map((Q)=>`<span class="${y$().includes(Q.id)?"owned":"missing"}"><i></i>${H0(Q.name)}</span>`).join("");return`${$||'<p class="society-empty">Approved customization pieces will fill this catalog.</p>'}<section class="collection-group"><h3>Festival keepsakes<small>${Object.keys(I.gameplay.festivalRewards||{}).length}/3</small></h3><div>${J}</div></section>`}function FG(){let $=pH.map((Q)=>{let W=Q.test(I.gameplay),Z=Boolean(I.gameplay.achievements?.[Q.id]);return`<article class="achievement ${W?"ready":""}"><span aria-hidden="true"></span><div><b>${H0(Q.name)}</b><small>${H0(Q.note)}</small></div><button data-achievement="${Q.id}" ${!W||Z?"disabled":""}>${Z?"Earned":W?`Claim ${Q.reward}`:"Locked"}</button></article>`}).join(""),J=uH();return`<div class="society-section"><h3>Achievements</h3>${$}</div><section class="festival-reward"><div><small>Festival exclusive</small><b>${J?H0(J.name):"Visit during a festival"}</b><p>${J?"A limited keepsake is ready while the celebration is live.":"Fireworks Night, Meteor Shower, and the Costume Parade each carry one keepsake."}</p></div><button data-festival-reward ${!J||I.gameplay.festivalRewards?.[J.id]?"disabled":""}>${J&&I.gameplay.festivalRewards?.[J.id]?"Collected":"Claim"}</button></section>`}function DW(){I.panel?.remove(),I.panel=null,document.body.classList.remove("society-open")}function o7($=I.view){I.view=$,DW();let J=document.createElement("div");J.className="society-backdrop",J.innerHTML=`<section class="society-sheet" role="dialog" aria-modal="true" aria-label="Society journal"><div class="society-grabber"></div><header><div><small>Neighbor journal</small><h2>Life around town</h2></div><button data-close aria-label="Close journal">×</button></header><nav>${[["today","Today"],["social","Social"],["collection","Collection"],["awards","Awards"]].map(([Q,W])=>`<button data-view="${Q}" class="${$===Q?"active":""}">${W}</button>`).join("")}</nav><main>${$==="today"?EG():$==="social"?GG():$==="collection"?qG():FG()}</main></section>`,J.addEventListener("pointerdown",(Q)=>{if(Q.target===J)DW()}),document.body.appendChild(J),I.panel=J,document.body.classList.add("society-open"),RG()}function b$(){if(I.panel)o7(I.view);a7()}function RG(){let $=I.panel;z0("[data-close]",$)?.addEventListener("click",DW),$.querySelectorAll("[data-view]").forEach((J)=>J.addEventListener("click",()=>o7(J.dataset.view))),z0("[data-login]",$)?.addEventListener("click",JG),$.querySelectorAll("[data-claim-quest]").forEach((J)=>J.addEventListener("click",()=>WG(J.dataset.claimQuest))),$.querySelectorAll("[data-daily-buy]").forEach((J)=>J.addEventListener("click",()=>NG(dH().find((Q)=>Q.id===J.dataset.dailyBuy)))),$.querySelectorAll("[data-achievement]").forEach((J)=>J.addEventListener("click",()=>ZG(J.dataset.achievement))),z0("[data-festival-reward]",$)?.addEventListener("click",KG),$.querySelectorAll("[data-reaction]").forEach((J)=>J.addEventListener("click",()=>wW("reaction",z0("[data-person]",$)?.value,{reaction:J.dataset.reaction}))),z0("[data-knock]",$)?.addEventListener("click",()=>wW("knock",z0("[data-person]",$)?.value)),z0("[data-trade]",$)?.addEventListener("click",async()=>{let J=z0("[data-trade-person]",$)?.value,Q=z0("[data-offer]",$)?.value,W=z0("[data-want]",$)?.value;if(!J||!Q||!W||Q===W)return y0("Choose two different items for the trade");try{await zW(J,{type:"trade",from:I.session.uid,fromName:n7().slice(0,18),to:J,item:Q,want:W,createdAt:Date.now()}),G6("social",1),y0("Trade offer sent"),U6()}catch{y0("The trade offer was not sent")}}),z0("[data-gift]",$)?.addEventListener("click",()=>YG(z0("[data-trade-person]",$)?.value,z0("[data-offer]",$)?.value)),$.querySelectorAll("[data-return-reaction]").forEach((J)=>J.addEventListener("click",()=>wW("reaction",J.dataset.returnReaction,{reaction:J.dataset.reactionKind||"wave"}))),$.querySelectorAll("[data-accept-gift]").forEach((J)=>J.addEventListener("click",()=>XG(I.mail.find((Q)=>Q.id===J.dataset.acceptGift)))),$.querySelectorAll("[data-accept-trade]").forEach((J)=>J.addEventListener("click",()=>UG(I.mail.find((Q)=>Q.id===J.dataset.acceptTrade))))}function a7(){let $=z0(".society-dock");if(!$)$=document.createElement("button"),$.type="button",$.className="society-dock",$.innerHTML='<i aria-hidden="true"></i><b>Journal</b><span></span>',$.addEventListener("click",()=>o7()),document.body.appendChild($);$.hidden=window.__snugWorld?.mode!=="village"||document.documentElement.classList.contains("snug-start-open");let J=PW().filter((W)=>Number(I.gameplay.daily?.progress?.[W.id]||0)>=W.goal&&!I.gameplay.daily?.claimed?.[W.id]).length+(I.gameplay.daily&&!I.gameplay.daily.loginClaimed?1:0),Q=z0("span",$);Q.textContent=J?String(J):"",Q.hidden=!J}window.addEventListener("snug-session",async($)=>{I.session=$.detail;try{await tE()}catch{i7()}clearInterval(I.polling),I.polling=setInterval(U6,3000),U6(),a7()});window.addEventListener("snug-world-ready",a7);window.addEventListener("snug-player-move",($)=>{let J=$.detail;if(!J)return;if(I.lastPosition){let Q=Math.hypot(Number(J.x)-I.lastPosition.x,Number(J.z)-I.lastPosition.z);if(Q>0.03&&Q<2)G6("steps",Q*2.2)}I.lastPosition={x:Number(J.x)||0,z:Number(J.z)||0}});window.addEventListener("snug-award-coins",($)=>{if(/Round complete/i.test($.detail?.message||""))G6("rounds",1)});window.addEventListener("snug-minigame-achievement",($)=>$G($.detail));window.addEventListener("pointerdown",($)=>{if(/^(Happy|Calm|Cheeky|Angry|Sad|Laughter|Laugh|Yawn|Side-eye|Wave)$/i.test($.target.closest?.("button")?.textContent?.trim()||""))G6("emotes",1)},!0);if(window.__snugSession)window.dispatchEvent(new CustomEvent("snug-session",{detail:window.__snugSession}));a7();})();
