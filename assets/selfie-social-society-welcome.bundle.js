(()=>{var zZ="186";var AZ=0,NQ=1,_Z=2;var N7=1,W6=2,m8=3,l8=0,pJ=1,Y9=2,V9=0,E7=1,EQ=2,qQ=3,FQ=4,CZ=5;var d8=100,PZ=101,wZ=102,TZ=103,SZ=104,jZ=200,yZ=201,fZ=202,vZ=203,bZ=204,hZ=205,xZ=206,gZ=207,pZ=208,mZ=209,lZ=210,dZ=211,uZ=212,cZ=213,nZ=214,sZ=0,iZ=1,oZ=2,DQ=3,aZ=4,rZ=5,tZ=6,eZ=7,JK=0,QK=1,$K=2,F9=0,OQ=1,RQ=2,MQ=3,LQ=4,VQ=5,kQ=6,BQ=7;var u8=301,Z8=302,H6=303,Y6=304,q7=306,ZK=1000,X6=1001,KK=1002,s9=1003,WK=1004;var F7=1005;var iJ=1006,U6=1007;var K8=1008;var D9=1009,HK=1010,YK=1011,D7=1012,IQ=1013,i9=1014,v9=1015,k9=1016,zQ=1017,AQ=1018,c8=1020,XK=35902,UK=35899,GK=1021,NK=1022,B9=1023,W8=1026,H8=1027,EK=1028,_Q=1029,Y8=1030,CQ=1031;var PQ=1033,G6=33776,N6=33777,E6=33778,q6=33779,wQ=35840,TQ=35841,SQ=35842,jQ=35843,yQ=36196,fQ=37492,vQ=37496,bQ=37488,hQ=37489,F6=37490,xQ=37491,gQ=37808,pQ=37809,mQ=37810,lQ=37811,dQ=37812,uQ=37813,cQ=37814,nQ=37815,sQ=37816,iQ=37817,oQ=37818,aQ=37819,rQ=37820,tQ=37821,eQ=36492,J$=36494,Q$=36495,$$=36283,Z$=36284,D6=36285,K$=36286;var W$=0,qK=1,X8="",o9="srgb",H$="srgb-linear",Y$="linear",LJ="srgb";var FK=512,DK=513,OK=514,O6=515,RK=516,MK=517,R6=518,LK=519;var X$="300 es",U$=2000;function EW(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function qW(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function X7(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function VK(){let J=X7("canvas");return J.style.display="block",J}var a$={},g8=null;function U7(...J){let Q="THREE."+J.shift();if(g8)g8("log",Q,...J);else console.log(Q,...J)}function kK(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function d0(...J){J=kK(J);let Q="THREE."+J.shift();if(g8)g8("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function s0(...J){J=kK(J);let Q="THREE."+J.shift();if(g8)g8("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function $8(...J){let Q=J.join(" ");if(Q in a$)return;a$[Q]=!0,d0(...J)}function BK(J,Q,$){return new Promise(function(Z,K){function W(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:K();break;case J.TIMEOUT_EXPIRED:setTimeout(W,$);break;default:Z()}}setTimeout(W,$)})}var IK={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class b9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let K=Z.indexOf(Q);if(K!==-1)Z.splice(K,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let K=0,W=Z.length;K<W;K++)Z[K].call(this,J);J.target=null}}}var xJ=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],r$=1234567,h8=Math.PI/180,p8=180/Math.PI;function j9(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(xJ[J&255]+xJ[J>>8&255]+xJ[J>>16&255]+xJ[J>>24&255]+"-"+xJ[Q&255]+xJ[Q>>8&255]+"-"+xJ[Q>>16&15|64]+xJ[Q>>24&255]+"-"+xJ[$&63|128]+xJ[$>>8&255]+"-"+xJ[$>>16&255]+xJ[$>>24&255]+xJ[Z&255]+xJ[Z>>8&255]+xJ[Z>>16&255]+xJ[Z>>24&255]).toLowerCase()}function YJ(J,Q,$){return Math.max(Q,Math.min($,J))}function G$(J,Q){return(J%Q+Q)%Q}function FW(J,Q,$,Z,K){return Z+(J-Q)*(K-Z)/($-Q)}function DW(J,Q,$){if(J!==Q)return($-J)/(Q-J);else return 0}function Y7(J,Q,$){return(1-$)*J+$*Q}function OW(J,Q,$,Z){return Y7(J,Q,1-Math.exp(-$*Z))}function RW(J,Q=1){return Q-Math.abs(G$(J,Q*2)-Q)}function MW(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*(3-2*J)}function LW(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*J*(J*(J*6-15)+10)}function VW(J,Q){return J+Math.floor(Math.random()*(Q-J+1))}function kW(J,Q){return J+Math.random()*(Q-J)}function BW(J){return J*(0.5-Math.random())}function IW(J){if(J!==void 0)r$=J;let Q=r$+=1831565813;return Q=Math.imul(Q^Q>>>15,Q|1),Q^=Q+Math.imul(Q^Q>>>7,Q|61),((Q^Q>>>14)>>>0)/4294967296}function zW(J){return J*h8}function AW(J){return J*p8}function _W(J){return J>0&&Number.isInteger(J)&&2**Math.round(Math.log2(J))===J}function CW(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function PW(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function wW(J,Q,$,Z,K){let{cos:W,sin:H}=Math,Y=W($/2),X=H($/2),U=W((Q+Z)/2),N=H((Q+Z)/2),q=W((Q-Z)/2),G=H((Q-Z)/2),D=W((Z-Q)/2),V=H((Z-Q)/2);switch(K){case"XYX":J.set(Y*N,X*q,X*G,Y*U);break;case"YZY":J.set(X*G,Y*N,X*q,Y*U);break;case"ZXZ":J.set(X*q,X*G,Y*N,Y*U);break;case"XZX":J.set(Y*N,X*V,X*D,Y*U);break;case"YXY":J.set(X*D,Y*N,X*V,Y*U);break;case"ZYZ":J.set(X*V,X*D,Y*N,Y*U);break;default:d0("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+K)}}function q9(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:case Uint8ClampedArray:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function qJ(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}var eJ={DEG2RAD:h8,RAD2DEG:p8,generateUUID:j9,clamp:YJ,euclideanModulo:G$,mapLinear:FW,inverseLerp:DW,lerp:Y7,damp:OW,pingpong:RW,smoothstep:MW,smootherstep:LW,randInt:VW,randFloat:kW,randFloatSpread:BW,seededRandom:IW,degToRad:zW,radToDeg:AW,isPowerOfTwo:_W,ceilPowerOfTwo:CW,floorPowerOfTwo:PW,setQuaternionFromProperEuler:wW,normalize:qJ,denormalize:q9};class t0{static{t0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=YJ(this.x,J.x,Q.x),this.y=YJ(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=YJ(this.x,J,Q),this.y=YJ(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(YJ($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(YJ($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),K=this.x-J.x,W=this.y-J.y;return this.x=K*$-W*Z+J.x,this.y=K*Z+W*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class h9{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,K,W,H){let Y=$[Z+0],X=$[Z+1],U=$[Z+2],N=$[Z+3],q=K[W+0],G=K[W+1],D=K[W+2],V=K[W+3];if(N!==V||Y!==q||X!==G||U!==D){let z=Y*q+X*G+U*D+N*V;if(z<0)q=-q,G=-G,D=-D,V=-V,z=-z;let F=1-H;if(z<0.9995){let E=Math.acos(z),C=Math.sin(E);F=Math.sin(F*E)/C,H=Math.sin(H*E)/C,Y=Y*F+q*H,X=X*F+G*H,U=U*F+D*H,N=N*F+V*H}else{Y=Y*F+q*H,X=X*F+G*H,U=U*F+D*H,N=N*F+V*H;let E=1/Math.sqrt(Y*Y+X*X+U*U+N*N);Y*=E,X*=E,U*=E,N*=E}}J[Q]=Y,J[Q+1]=X,J[Q+2]=U,J[Q+3]=N}static multiplyQuaternionsFlat(J,Q,$,Z,K,W){let H=$[Z],Y=$[Z+1],X=$[Z+2],U=$[Z+3],N=K[W],q=K[W+1],G=K[W+2],D=K[W+3];return J[Q]=H*D+U*N+Y*G-X*q,J[Q+1]=Y*D+U*q+X*N-H*G,J[Q+2]=X*D+U*G+H*q-Y*N,J[Q+3]=U*D-H*N-Y*q-X*G,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:K,_order:W}=J,H=Math.cos,Y=Math.sin,X=H($/2),U=H(Z/2),N=H(K/2),q=Y($/2),G=Y(Z/2),D=Y(K/2);switch(W){case"XYZ":this._x=q*U*N+X*G*D,this._y=X*G*N-q*U*D,this._z=X*U*D+q*G*N,this._w=X*U*N-q*G*D;break;case"YXZ":this._x=q*U*N+X*G*D,this._y=X*G*N-q*U*D,this._z=X*U*D-q*G*N,this._w=X*U*N+q*G*D;break;case"ZXY":this._x=q*U*N-X*G*D,this._y=X*G*N+q*U*D,this._z=X*U*D+q*G*N,this._w=X*U*N-q*G*D;break;case"ZYX":this._x=q*U*N-X*G*D,this._y=X*G*N+q*U*D,this._z=X*U*D-q*G*N,this._w=X*U*N+q*G*D;break;case"YZX":this._x=q*U*N+X*G*D,this._y=X*G*N+q*U*D,this._z=X*U*D-q*G*N,this._w=X*U*N-q*G*D;break;case"XZY":this._x=q*U*N-X*G*D,this._y=X*G*N-q*U*D,this._z=X*U*D+q*G*N,this._w=X*U*N+q*G*D;break;default:d0("Quaternion: .setFromEuler() encountered an unknown order: "+W)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],K=Q[8],W=Q[1],H=Q[5],Y=Q[9],X=Q[2],U=Q[6],N=Q[10],q=$+H+N;if(q>0){let G=0.5/Math.sqrt(q+1);this._w=0.25/G,this._x=(U-Y)*G,this._y=(K-X)*G,this._z=(W-Z)*G}else if($>H&&$>N){let G=2*Math.sqrt(1+$-H-N);this._w=(U-Y)/G,this._x=0.25*G,this._y=(Z+W)/G,this._z=(K+X)/G}else if(H>N){let G=2*Math.sqrt(1+H-$-N);this._w=(K-X)/G,this._x=(Z+W)/G,this._y=0.25*G,this._z=(Y+U)/G}else{let G=2*Math.sqrt(1+N-$-H);this._w=(W-Z)/G,this._x=(K+X)/G,this._y=(Y+U)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(YJ(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:K,_w:W}=J,H=Q._x,Y=Q._y,X=Q._z,U=Q._w;return this._x=$*U+W*H+Z*X-K*Y,this._y=Z*U+W*Y+K*H-$*X,this._z=K*U+W*X+$*Y-Z*H,this._w=W*U-$*H-Z*Y-K*X,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:K,_w:W}=J,H=this.dot(J);if(H<0)$=-$,Z=-Z,K=-K,W=-W,H=-H;let Y=1-Q;if(H<0.9995){let X=Math.acos(H),U=Math.sin(X);Y=Math.sin(Y*X)/U,Q=Math.sin(Q*X)/U,this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+K*Q,this._w=this._w*Y+W*Q,this._onChangeCallback()}else this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+K*Q,this._w=this._w*Y+W*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),K=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),K*Math.sin(Q),K*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class x{static{x.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(t$.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(t$.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements;return this.x=K[0]*Q+K[3]*$+K[6]*Z,this.y=K[1]*Q+K[4]*$+K[7]*Z,this.z=K[2]*Q+K[5]*$+K[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements,W=1/(K[3]*Q+K[7]*$+K[11]*Z+K[15]);return this.x=(K[0]*Q+K[4]*$+K[8]*Z+K[12])*W,this.y=(K[1]*Q+K[5]*$+K[9]*Z+K[13])*W,this.z=(K[2]*Q+K[6]*$+K[10]*Z+K[14])*W,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,K=J.x,W=J.y,H=J.z,Y=J.w,X=2*(W*Z-H*$),U=2*(H*Q-K*Z),N=2*(K*$-W*Q);return this.x=Q+Y*X+W*N-H*U,this.y=$+Y*U+H*X-K*N,this.z=Z+Y*N+K*U-W*X,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*Z,this.y=K[1]*Q+K[5]*$+K[9]*Z,this.z=K[2]*Q+K[6]*$+K[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=YJ(this.x,J.x,Q.x),this.y=YJ(this.y,J.y,Q.y),this.z=YJ(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=YJ(this.x,J,Q),this.y=YJ(this.y,J,Q),this.z=YJ(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(YJ($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:K}=J,W=Q.x,H=Q.y,Y=Q.z;return this.x=Z*Y-K*H,this.y=K*W-$*Y,this.z=$*H-Z*W,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return m6.copy(this).projectOnVector(J),this.sub(m6)}reflect(J){return this.sub(m6.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(YJ($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var m6=new x,t$=new h9;class r0{static{r0.prototype.isMatrix3=!0}constructor(J,Q,$,Z,K,W,H,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,K,W,H,Y,X)}set(J,Q,$,Z,K,W,H,Y,X){let U=this.elements;return U[0]=J,U[1]=Z,U[2]=H,U[3]=Q,U[4]=K,U[5]=Y,U[6]=$,U[7]=W,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,K=this.elements,W=$[0],H=$[3],Y=$[6],X=$[1],U=$[4],N=$[7],q=$[2],G=$[5],D=$[8],V=Z[0],z=Z[3],F=Z[6],E=Z[1],C=Z[4],j=Z[7],k=Z[2],I=Z[5],_=Z[8];return K[0]=W*V+H*E+Y*k,K[3]=W*z+H*C+Y*I,K[6]=W*F+H*j+Y*_,K[1]=X*V+U*E+N*k,K[4]=X*z+U*C+N*I,K[7]=X*F+U*j+N*_,K[2]=q*V+G*E+D*k,K[5]=q*z+G*C+D*I,K[8]=q*F+G*j+D*_,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],W=J[4],H=J[5],Y=J[6],X=J[7],U=J[8];return Q*W*U-Q*H*X-$*K*U+$*H*Y+Z*K*X-Z*W*Y}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],W=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],N=U*W-H*X,q=H*Y-U*K,G=X*K-W*Y,D=Q*N+$*q+Z*G;if(D===0)return this.set(0,0,0,0,0,0,0,0,0);let V=1/D;return J[0]=N*V,J[1]=(Z*X-U*$)*V,J[2]=(H*$-Z*W)*V,J[3]=q*V,J[4]=(U*Q-Z*Y)*V,J[5]=(Z*K-H*Q)*V,J[6]=G*V,J[7]=($*Y-X*Q)*V,J[8]=(W*Q-$*K)*V,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,K,W,H){let Y=Math.cos(K),X=Math.sin(K);return this.set($*Y,$*X,-$*(Y*W+X*H)+W+J,-Z*X,Z*Y,-Z*(-X*W+Y*H)+H+Q,0,0,1),this}scale(J,Q){return $8("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(l6.makeScale(J,Q)),this}rotate(J){return $8("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(l6.makeRotation(-J)),this}translate(J,Q){return $8("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(l6.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var l6=new r0,e$=new r0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),JZ=new r0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function TW(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(K,W,H){if(this.enabled===!1||W===H||!W||!H)return K;if(this.spaces[W].transfer==="srgb")K.r=y9(K.r),K.g=y9(K.g),K.b=y9(K.b);if(this.spaces[W].primaries!==this.spaces[H].primaries)K.applyMatrix3(this.spaces[W].toXYZ),K.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")K.r=x8(K.r),K.g=x8(K.g),K.b=x8(K.b);return K},workingToColorSpace:function(K,W){return this.convert(K,this.workingColorSpace,W)},colorSpaceToWorking:function(K,W){return this.convert(K,W,this.workingColorSpace)},getPrimaries:function(K){return this.spaces[K].primaries},getTransfer:function(K){if(K==="")return"linear";return this.spaces[K].transfer},getToneMappingMode:function(K){return this.spaces[K].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(K,W=this.workingColorSpace){return K.fromArray(this.spaces[W].luminanceCoefficients)},define:function(K){Object.assign(this.spaces,K)},_getMatrix:function(K,W,H){return K.copy(this.spaces[W].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(K){return this.spaces[K].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(K=this.workingColorSpace){return this.spaces[K].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(K,W){return $8("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(K,W)},toWorkingColorSpace:function(K,W){return $8("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(K,W)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:e$,fromXYZ:JZ,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:e$,fromXYZ:JZ,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var HJ=TW();function y9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function x8(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var V8;class N${static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(V8===void 0)V8=X7("canvas");V8.width=J.width,V8.height=J.height;let Z=V8.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=V8}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=X7("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),K=Z.data;for(let W=0;W<K.length;W++)K[W]=y9(K[W]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(y9(Q[$]/255)*255);else Q[$]=y9(Q[$]);return{data:Q,width:J.width,height:J.height}}else return d0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var SW=0;class O7{constructor(J=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:SW++}),this.uuid=j9(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let K;if(Array.isArray(Z)){K=[];for(let W=0,H=Z.length;W<H;W++)if(Z[W].isDataTexture)K.push(d6(Z[W].image));else K.push(d6(Z[W]))}else K=d6(Z);$.url=K}if(!Q)J.images[this.uuid]=$;return $}}function d6(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return N$.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return d0("Texture: Unable to serialize Texture."),{}}var jW=0,u6=new x;class hJ extends b9{constructor(J=hJ.DEFAULT_IMAGE,Q=hJ.DEFAULT_MAPPING,$=1001,Z=1001,K=1006,W=1008,H=1023,Y=1009,X=hJ.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:jW++}),this.uuid=j9(),this.name="",this.source=new O7(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=K,this.minFilter=W,this.anisotropy=X,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new t0(0,0),this.repeat=new t0(1,1),this.center=new t0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new r0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(u6).x}get height(){return this.source.getSize(u6).y}get depth(){return this.source.getSize(u6).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){d0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){d0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}hJ.DEFAULT_IMAGE=null;hJ.DEFAULT_MAPPING=300;hJ.DEFAULT_ANISOTROPY=1;class IJ{static{IJ.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,K=this.w,W=J.elements;return this.x=W[0]*Q+W[4]*$+W[8]*Z+W[12]*K,this.y=W[1]*Q+W[5]*$+W[9]*Z+W[13]*K,this.z=W[2]*Q+W[6]*$+W[10]*Z+W[14]*K,this.w=W[3]*Q+W[7]*$+W[11]*Z+W[15]*K,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,K,W=0.01,H=0.1,Y=J.elements,X=Y[0],U=Y[4],N=Y[8],q=Y[1],G=Y[5],D=Y[9],V=Y[2],z=Y[6],F=Y[10];if(Math.abs(U-q)<0.01&&Math.abs(N-V)<0.01&&Math.abs(D-z)<0.01){if(Math.abs(U+q)<0.1&&Math.abs(N+V)<0.1&&Math.abs(D+z)<0.1&&Math.abs(X+G+F-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let C=(X+1)/2,j=(G+1)/2,k=(F+1)/2,I=(U+q)/4,_=(N+V)/4,P=(D+z)/4;if(C>j&&C>k)if(C<0.01)$=0,Z=0.707106781,K=0.707106781;else $=Math.sqrt(C),Z=I/$,K=_/$;else if(j>k)if(j<0.01)$=0.707106781,Z=0,K=0.707106781;else Z=Math.sqrt(j),$=I/Z,K=P/Z;else if(k<0.01)$=0.707106781,Z=0.707106781,K=0;else K=Math.sqrt(k),$=_/K,Z=P/K;return this.set($,Z,K,Q),this}let E=Math.sqrt((z-D)*(z-D)+(N-V)*(N-V)+(q-U)*(q-U));if(Math.abs(E)<0.001)E=1;return this.x=(z-D)/E,this.y=(N-V)/E,this.z=(q-U)/E,this.w=Math.acos((X+G+F-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=YJ(this.x,J.x,Q.x),this.y=YJ(this.y,J.y,Q.y),this.z=YJ(this.z,J.z,Q.z),this.w=YJ(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=YJ(this.x,J,Q),this.y=YJ(this.y,J,Q),this.z=YJ(this.z,J,Q),this.w=YJ(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(YJ($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class E$ extends b9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new IJ(0,0,J,Q),this.scissorTest=!1,this.viewport=new IJ(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},K=new hJ(Z),W=$.count;for(let H=0;H<W;H++)this.textures[H]=K.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveColorBuffer=$.resolveColorBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this.storeMultisampledColorBuffer=$.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=$.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=$.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null&&this._depthTexture.renderTarget===this)this._depthTexture.renderTarget=null;if(J!==null&&J.renderTarget===null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,K=this.textures.length;Z<K;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new O7(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveColorBuffer=J.resolveColorBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,this.storeMultisampledColorBuffer=J.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=J.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=J.storeMultisampledStencilBuffer,J.depthTexture!==null)if(J.depthTexture.renderTarget===J){let Q=J.depthTexture.clone();Q.renderTarget=null,this.depthTexture=Q}else this.depthTexture=J.depthTexture;return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class J9 extends E${constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class M6 extends hJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class q$ extends hJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}}class BJ{static{BJ.prototype.isMatrix4=!0}constructor(J,Q,$,Z,K,W,H,Y,X,U,N,q,G,D,V,z){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,K,W,H,Y,X,U,N,q,G,D,V,z)}set(J,Q,$,Z,K,W,H,Y,X,U,N,q,G,D,V,z){let F=this.elements;return F[0]=J,F[4]=Q,F[8]=$,F[12]=Z,F[1]=K,F[5]=W,F[9]=H,F[13]=Y,F[2]=X,F[6]=U,F[10]=N,F[14]=q,F[3]=G,F[7]=D,F[11]=V,F[15]=z,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new BJ().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/k8.setFromMatrixColumn(J,0).length(),K=1/k8.setFromMatrixColumn(J,1).length(),W=1/k8.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*K,Q[5]=$[5]*K,Q[6]=$[6]*K,Q[7]=0,Q[8]=$[8]*W,Q[9]=$[9]*W,Q[10]=$[10]*W,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,K=J.z,W=Math.cos($),H=Math.sin($),Y=Math.cos(Z),X=Math.sin(Z),U=Math.cos(K),N=Math.sin(K);if(J.order==="XYZ"){let q=W*U,G=W*N,D=H*U,V=H*N;Q[0]=Y*U,Q[4]=-Y*N,Q[8]=X,Q[1]=G+D*X,Q[5]=q-V*X,Q[9]=-H*Y,Q[2]=V-q*X,Q[6]=D+G*X,Q[10]=W*Y}else if(J.order==="YXZ"){let q=Y*U,G=Y*N,D=X*U,V=X*N;Q[0]=q+V*H,Q[4]=D*H-G,Q[8]=W*X,Q[1]=W*N,Q[5]=W*U,Q[9]=-H,Q[2]=G*H-D,Q[6]=V+q*H,Q[10]=W*Y}else if(J.order==="ZXY"){let q=Y*U,G=Y*N,D=X*U,V=X*N;Q[0]=q-V*H,Q[4]=-W*N,Q[8]=D+G*H,Q[1]=G+D*H,Q[5]=W*U,Q[9]=V-q*H,Q[2]=-W*X,Q[6]=H,Q[10]=W*Y}else if(J.order==="ZYX"){let q=W*U,G=W*N,D=H*U,V=H*N;Q[0]=Y*U,Q[4]=D*X-G,Q[8]=q*X+V,Q[1]=Y*N,Q[5]=V*X+q,Q[9]=G*X-D,Q[2]=-X,Q[6]=H*Y,Q[10]=W*Y}else if(J.order==="YZX"){let q=W*Y,G=W*X,D=H*Y,V=H*X;Q[0]=Y*U,Q[4]=V-q*N,Q[8]=D*N+G,Q[1]=N,Q[5]=W*U,Q[9]=-H*U,Q[2]=-X*U,Q[6]=G*N+D,Q[10]=q-V*N}else if(J.order==="XZY"){let q=W*Y,G=W*X,D=H*Y,V=H*X;Q[0]=Y*U,Q[4]=-N,Q[8]=X*U,Q[1]=q*N+V,Q[5]=W*U,Q[9]=G*N-D,Q[2]=D*N-G,Q[6]=H*U,Q[10]=V*N+q}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(yW,J,fW)}lookAt(J,Q,$){let Z=this.elements;if(rJ.subVectors(J,Q),rJ.lengthSq()===0)rJ.z=1;if(rJ.normalize(),l9.crossVectors($,rJ),l9.lengthSq()===0){if(Math.abs($.z)===1)rJ.x+=0.0001;else rJ.z+=0.0001;rJ.normalize(),l9.crossVectors($,rJ)}return l9.normalize(),T7.crossVectors(rJ,l9),Z[0]=l9.x,Z[4]=T7.x,Z[8]=rJ.x,Z[1]=l9.y,Z[5]=T7.y,Z[9]=rJ.y,Z[2]=l9.z,Z[6]=T7.z,Z[10]=rJ.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,K=this.elements,W=$[0],H=$[4],Y=$[8],X=$[12],U=$[1],N=$[5],q=$[9],G=$[13],D=$[2],V=$[6],z=$[10],F=$[14],E=$[3],C=$[7],j=$[11],k=$[15],I=Z[0],_=Z[4],P=Z[8],M=Z[12],B=Z[1],c=Z[5],v=Z[9],b=Z[13],t=Z[2],y=Z[6],s=Z[10],J0=Z[14],u=Z[3],G0=Z[7],a=Z[11],Q0=Z[15];return K[0]=W*I+H*B+Y*t+X*u,K[4]=W*_+H*c+Y*y+X*G0,K[8]=W*P+H*v+Y*s+X*a,K[12]=W*M+H*b+Y*J0+X*Q0,K[1]=U*I+N*B+q*t+G*u,K[5]=U*_+N*c+q*y+G*G0,K[9]=U*P+N*v+q*s+G*a,K[13]=U*M+N*b+q*J0+G*Q0,K[2]=D*I+V*B+z*t+F*u,K[6]=D*_+V*c+z*y+F*G0,K[10]=D*P+V*v+z*s+F*a,K[14]=D*M+V*b+z*J0+F*Q0,K[3]=E*I+C*B+j*t+k*u,K[7]=E*_+C*c+j*y+k*G0,K[11]=E*P+C*v+j*s+k*a,K[15]=E*M+C*b+j*J0+k*Q0,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],K=J[12],W=J[1],H=J[5],Y=J[9],X=J[13],U=J[2],N=J[6],q=J[10],G=J[14],D=J[3],V=J[7],z=J[11],F=J[15],E=Y*G-X*q,C=H*G-X*N,j=H*q-Y*N,k=W*G-X*U,I=W*q-Y*U,_=W*N-H*U;return Q*(V*E-z*C+F*j)-$*(D*E-z*k+F*I)+Z*(D*C-V*k+F*_)-K*(D*j-V*I+z*_)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],K=J[1],W=J[5],H=J[9],Y=J[2],X=J[6],U=J[10];return Q*(W*U-H*X)-$*(K*U-H*Y)+Z*(K*X-W*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],W=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],N=J[9],q=J[10],G=J[11],D=J[12],V=J[13],z=J[14],F=J[15],E=Q*H-$*W,C=Q*Y-Z*W,j=Q*X-K*W,k=$*Y-Z*H,I=$*X-K*H,_=Z*X-K*Y,P=U*V-N*D,M=U*z-q*D,B=U*F-G*D,c=N*z-q*V,v=N*F-G*V,b=q*F-G*z,t=E*b-C*v+j*c+k*B-I*M+_*P;if(t===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let y=1/t;return J[0]=(H*b-Y*v+X*c)*y,J[1]=(Z*v-$*b-K*c)*y,J[2]=(V*_-z*I+F*k)*y,J[3]=(q*I-N*_-G*k)*y,J[4]=(Y*B-W*b-X*M)*y,J[5]=(Q*b-Z*B+K*M)*y,J[6]=(z*j-D*_-F*C)*y,J[7]=(U*_-q*j+G*C)*y,J[8]=(W*v-H*B+X*P)*y,J[9]=($*B-Q*v-K*P)*y,J[10]=(D*I-V*j+F*E)*y,J[11]=(N*j-U*I-G*E)*y,J[12]=(H*M-W*c-Y*P)*y,J[13]=(Q*c-$*M+Z*P)*y,J[14]=(V*C-D*k-z*E)*y,J[15]=(U*k-N*C+q*E)*y,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,K=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=K,Q[1]*=$,Q[5]*=Z,Q[9]*=K,Q[2]*=$,Q[6]*=Z,Q[10]*=K,Q[3]*=$,Q[7]*=Z,Q[11]*=K,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),K=1-$,W=J.x,H=J.y,Y=J.z,X=K*W,U=K*H;return this.set(X*W+$,X*H-Z*Y,X*Y+Z*H,0,X*H+Z*Y,U*H+$,U*Y-Z*W,0,X*Y-Z*H,U*Y+Z*W,K*Y*Y+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,K,W){return this.set(1,$,K,0,J,1,W,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,K=Q._x,W=Q._y,H=Q._z,Y=Q._w,X=K+K,U=W+W,N=H+H,q=K*X,G=K*U,D=K*N,V=W*U,z=W*N,F=H*N,E=Y*X,C=Y*U,j=Y*N,k=$.x,I=$.y,_=$.z;return Z[0]=(1-(V+F))*k,Z[1]=(G+j)*k,Z[2]=(D-C)*k,Z[3]=0,Z[4]=(G-j)*I,Z[5]=(1-(q+F))*I,Z[6]=(z+E)*I,Z[7]=0,Z[8]=(D+C)*_,Z[9]=(z-E)*_,Z[10]=(1-(q+V))*_,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let K=this.determinantAffine();if(K===0)return $.set(1,1,1),Q.identity(),this;let W=k8.set(Z[0],Z[1],Z[2]).length(),H=k8.set(Z[4],Z[5],Z[6]).length(),Y=k8.set(Z[8],Z[9],Z[10]).length();if(K<0)W=-W;G9.copy(this);let X=1/W,U=1/H,N=1/Y;return G9.elements[0]*=X,G9.elements[1]*=X,G9.elements[2]*=X,G9.elements[4]*=U,G9.elements[5]*=U,G9.elements[6]*=U,G9.elements[8]*=N,G9.elements[9]*=N,G9.elements[10]*=N,Q.setFromRotationMatrix(G9),$.x=W,$.y=H,$.z=Y,this}makePerspective(J,Q,$,Z,K,W,H=2000,Y=!1){let X=this.elements,U=2*K/(Q-J),N=2*K/($-Z),q=(Q+J)/(Q-J),G=($+Z)/($-Z),D,V;if(Y)D=K/(W-K),V=W*K/(W-K);else if(H===2000)D=-(W+K)/(W-K),V=-2*W*K/(W-K);else if(H===2001)D=-W/(W-K),V=-W*K/(W-K);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=q,X[12]=0,X[1]=0,X[5]=N,X[9]=G,X[13]=0,X[2]=0,X[6]=0,X[10]=D,X[14]=V,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,Q,$,Z,K,W,H=2000,Y=!1){let X=this.elements,U=2/(Q-J),N=2/($-Z),q=-(Q+J)/(Q-J),G=-($+Z)/($-Z),D,V;if(Y)D=1/(W-K),V=W/(W-K);else if(H===2000)D=-2/(W-K),V=-(W+K)/(W-K);else if(H===2001)D=-1/(W-K),V=-K/(W-K);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=0,X[12]=q,X[1]=0,X[5]=N,X[9]=0,X[13]=G,X[2]=0,X[6]=0,X[10]=D,X[14]=V,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var k8=new x,G9=new BJ,yW=new x(0,0,0),fW=new x(1,1,1),l9=new x,T7=new x,rJ=new x,QZ=new BJ,$Z=new h9;class f9{constructor(J=0,Q=0,$=0,Z=f9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,K=Z[0],W=Z[4],H=Z[8],Y=Z[1],X=Z[5],U=Z[9],N=Z[2],q=Z[6],G=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(YJ(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-U,G),this._z=Math.atan2(-W,K);else this._x=Math.atan2(q,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-YJ(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(H,G),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-N,K),this._z=0;break;case"ZXY":if(this._x=Math.asin(YJ(q,-1,1)),Math.abs(q)<0.9999999)this._y=Math.atan2(-N,G),this._z=Math.atan2(-W,X);else this._y=0,this._z=Math.atan2(Y,K);break;case"ZYX":if(this._y=Math.asin(-YJ(N,-1,1)),Math.abs(N)<0.9999999)this._x=Math.atan2(q,G),this._z=Math.atan2(Y,K);else this._x=0,this._z=Math.atan2(-W,X);break;case"YZX":if(this._z=Math.asin(YJ(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-N,K);else this._x=0,this._y=Math.atan2(H,G);break;case"XZY":if(this._z=Math.asin(-YJ(W,-1,1)),Math.abs(W)<0.9999999)this._x=Math.atan2(q,X),this._y=Math.atan2(H,K);else this._x=Math.atan2(-U,G),this._y=0;break;default:d0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return QZ.makeRotationFromQuaternion(J),this.setFromRotationMatrix(QZ,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return $Z.setFromEuler(this),this.setFromQuaternion($Z,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}f9.DEFAULT_ORDER="XYZ";class L6{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var vW=0,ZZ=new x,B8=new h9,C9=new BJ,S7=new x,e8=new x,bW=new x,hW=new h9,KZ=new x(1,0,0),WZ=new x(0,1,0),HZ=new x(0,0,1),YZ={type:"added"},xW={type:"removed"},I8={type:"childadded",child:null},c6={type:"childremoved",child:null};class wJ extends b9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:vW++}),this.uuid=j9(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wJ.DEFAULT_UP.clone();let J=new x,Q=new f9,$=new h9,Z=new x(1,1,1);function K(){$.setFromEuler(Q,!1)}function W(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(K),$._onChange(W),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new BJ},normalMatrix:{value:new r0}}),this.matrix=new BJ,this.matrixWorld=new BJ,this.matrixAutoUpdate=wJ.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new L6,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return B8.setFromAxisAngle(J,Q),this.quaternion.multiply(B8),this}rotateOnWorldAxis(J,Q){return B8.setFromAxisAngle(J,Q),this.quaternion.premultiply(B8),this}rotateX(J){return this.rotateOnAxis(KZ,J)}rotateY(J){return this.rotateOnAxis(WZ,J)}rotateZ(J){return this.rotateOnAxis(HZ,J)}translateOnAxis(J,Q){return ZZ.copy(J).applyQuaternion(this.quaternion),this.position.add(ZZ.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(KZ,J)}translateY(J){return this.translateOnAxis(WZ,J)}translateZ(J){return this.translateOnAxis(HZ,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(C9.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)S7.copy(J);else S7.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),e8.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)C9.lookAt(e8,S7,this.up);else C9.lookAt(S7,e8,this.up);if(this.quaternion.setFromRotationMatrix(C9),Z)C9.extractRotation(Z.matrixWorld),B8.setFromRotationMatrix(C9),this.quaternion.premultiply(B8.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return s0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(YZ),I8.child=J,this.dispatchEvent(I8),I8.child=null;else s0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(xW),c6.child=J,this.dispatchEvent(c6),c6.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),C9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),C9.multiply(J.parent.matrixWorld);return J.applyMatrix4(C9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(YZ),I8.child=J,this.dispatchEvent(I8),I8.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let W=this.children[$].getObjectByProperty(J,Q);if(W!==void 0)return W}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let K=0,W=Z.length;K<W;K++)Z[K].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(e8,J,bW),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(e8,hW,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,K=this.matrix.elements;K[12]+=Q-K[0]*Q-K[4]*$-K[8]*Z,K[13]+=$-K[1]*Q-K[5]*$-K[9]*Z,K[14]+=Z-K[2]*Q-K[6]*$-K[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let K=this.children;for(let W=0,H=K.length;W<H;W++)K[W].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,Z.name=this.name,Z.castShadow=this.castShadow,Z.receiveShadow=this.receiveShadow,Z.visible=this.visible,Z.frustumCulled=this.frustumCulled,Z.renderOrder=this.renderOrder,Z.static=this.static,Z.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((H)=>({...H})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function K(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=K(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let N=Y[X];K(J.shapes,N)}else K(J.shapes,Y)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)K(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,X=this.material.length;Y<X;Y++)H.push(K(J.materials,this.material[Y]));Z.material=H}else Z.material=K(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let H=0;H<this.children.length;H++)Z.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];Z.animations.push(K(J.animations,Y))}}if(Q){let H=W(J.geometries),Y=W(J.materials),X=W(J.textures),U=W(J.images),N=W(J.shapes),q=W(J.skeletons),G=W(J.animations),D=W(J.nodes);if(H.length>0)$.geometries=H;if(Y.length>0)$.materials=Y;if(X.length>0)$.textures=X;if(U.length>0)$.images=U;if(N.length>0)$.shapes=N;if(q.length>0)$.skeletons=q;if(G.length>0)$.animations=G;if(D.length>0)$.nodes=D}return $.object=Z,$;function W(H){let Y=[];for(let X in H){let U=H[X];delete U.metadata,Y.push(U)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}wJ.DEFAULT_UP=new x(0,1,0);wJ.DEFAULT_MATRIX_AUTO_UPDATE=!0;wJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class jJ extends wJ{constructor(){super();this.isGroup=!0,this.type="Group"}}var gW={type:"move"};class R7{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new jJ,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new jJ,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new x,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new x;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new jJ,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new x,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new x,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,K=null,W=null,H=this._targetRay,Y=this._grip,X=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(X&&J.hand){W=!0;for(let V of J.hand.values()){let z=Q.getJointPose(V,$),F=this._getHandJoint(X,V);if(z!==null)F.matrix.fromArray(z.transform.matrix),F.matrix.decompose(F.position,F.rotation,F.scale),F.matrixWorldNeedsUpdate=!0,F.jointRadius=z.radius;F.visible=z!==null}let U=X.joints["index-finger-tip"],N=X.joints["thumb-tip"],q=U.position.distanceTo(N.position),G=0.02,D=0.005;if(X.inputState.pinching&&q>G+D)X.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!X.inputState.pinching&&q<=G-D)X.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(K=Q.getPose(J.gripSpace,$),K!==null){if(Y.matrix.fromArray(K.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,K.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(K.linearVelocity);else Y.hasLinearVelocity=!1;if(K.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(K.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&K!==null)Z=K;if(Z!==null){if(H.matrix.fromArray(Z.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,Z.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(Z.linearVelocity);else H.hasLinearVelocity=!1;if(Z.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(Z.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(gW)}}}if(H!==null)H.visible=Z!==null;if(Y!==null)Y.visible=K!==null;if(X!==null)X.visible=W!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new jJ;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var zK={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},d9={h:0,s:0,l:0},j7={h:0,s:0,l:0};function n6(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class e0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,HJ.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=HJ.workingColorSpace){return this.r=J,this.g=Q,this.b=$,HJ.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=HJ.workingColorSpace){if(J=G$(J,1),Q=YJ(Q,0,1),$=YJ($,0,1),Q===0)this.r=this.g=this.b=$;else{let K=$<=0.5?$*(1+Q):$+Q-$*Q,W=2*$-K;this.r=n6(W,K,J+0.3333333333333333),this.g=n6(W,K,J),this.b=n6(W,K,J-0.3333333333333333)}return HJ.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(K){if(K===void 0)return;if(parseFloat(K)<1)d0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let K,W=Z[1],H=Z[2];switch(W){case"rgb":case"rgba":if(K=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(K[4]),this.setRGB(Math.min(255,parseInt(K[1],10))/255,Math.min(255,parseInt(K[2],10))/255,Math.min(255,parseInt(K[3],10))/255,Q);if(K=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(K[4]),this.setRGB(Math.min(100,parseInt(K[1],10))/100,Math.min(100,parseInt(K[2],10))/100,Math.min(100,parseInt(K[3],10))/100,Q);break;case"hsl":case"hsla":if(K=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(K[4]),this.setHSL(parseFloat(K[1])/360,parseFloat(K[2])/100,parseFloat(K[3])/100,Q);break;default:d0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let K=Z[1],W=K.length;if(W===3)return this.setRGB(parseInt(K.charAt(0),16)/15,parseInt(K.charAt(1),16)/15,parseInt(K.charAt(2),16)/15,Q);else if(W===6)return this.setHex(parseInt(K,16),Q);else d0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=zK[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else d0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=y9(J.r),this.g=y9(J.g),this.b=y9(J.b),this}copyLinearToSRGB(J){return this.r=x8(J.r),this.g=x8(J.g),this.b=x8(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return HJ.workingToColorSpace(gJ.copy(this),J),Math.round(YJ(gJ.r*255,0,255))*65536+Math.round(YJ(gJ.g*255,0,255))*256+Math.round(YJ(gJ.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=HJ.workingColorSpace){HJ.workingToColorSpace(gJ.copy(this),Q);let{r:$,g:Z,b:K}=gJ,W=Math.max($,Z,K),H=Math.min($,Z,K),Y,X,U=(H+W)/2;if(H===W)Y=0,X=0;else{let N=W-H;switch(X=U<=0.5?N/(W+H):N/(2-W-H),W){case $:Y=(Z-K)/N+(Z<K?6:0);break;case Z:Y=(K-$)/N+2;break;case K:Y=($-Z)/N+4;break}Y/=6}return J.h=Y,J.s=X,J.l=U,J}getRGB(J,Q=HJ.workingColorSpace){return HJ.workingToColorSpace(gJ.copy(this),Q),J.r=gJ.r,J.g=gJ.g,J.b=gJ.b,J}getStyle(J="srgb"){HJ.workingToColorSpace(gJ.copy(this),J);let{r:Q,g:$,b:Z}=gJ;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(d9),this.setHSL(d9.h+J,d9.s+Q,d9.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(d9),J.getHSL(j7);let $=Y7(d9.h,j7.h,Q),Z=Y7(d9.s,j7.s,Q),K=Y7(d9.l,j7.l,Q);return this.setHSL($,Z,K),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,K=J.elements;return this.r=K[0]*Q+K[3]*$+K[6]*Z,this.g=K[1]*Q+K[4]*$+K[7]*Z,this.b=K[2]*Q+K[5]*$+K[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var gJ=new e0;e0.NAMES=zK;class M7{constructor(J,Q=1,$=1000){this.isFog=!0,this.name="",this.color=new e0(J),this.near=Q,this.far=$}clone(){return new M7(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class V6 extends wJ{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new f9,this.environmentIntensity=1,this.environmentRotation=new f9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();return Q.object.backgroundBlurriness=this.backgroundBlurriness,Q.object.backgroundIntensity=this.backgroundIntensity,Q.object.backgroundRotation=this.backgroundRotation.toArray(),Q.object.environmentIntensity=this.environmentIntensity,Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var N9=new x,P9=new x,s6=new x,w9=new x,z8=new x,A8=new x,XZ=new x,i6=new x,o6=new x,a6=new x,r6=new IJ,t6=new IJ,e6=new IJ;class sJ{constructor(J=new x,Q=new x,$=new x){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),N9.subVectors(J,Q),Z.cross(N9);let K=Z.lengthSq();if(K>0)return Z.multiplyScalar(1/Math.sqrt(K));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,K){N9.subVectors(Z,Q),P9.subVectors($,Q),s6.subVectors(J,Q);let W=N9.dot(N9),H=N9.dot(P9),Y=N9.dot(s6),X=P9.dot(P9),U=P9.dot(s6),N=W*X-H*H;if(N===0)return K.set(0,0,0),null;let q=1/N,G=(X*Y-H*U)*q,D=(W*U-H*Y)*q;return K.set(1-G-D,D,G)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,w9)===null)return!1;return w9.x>=0&&w9.y>=0&&w9.x+w9.y<=1}static getInterpolation(J,Q,$,Z,K,W,H,Y){if(this.getBarycoord(J,Q,$,Z,w9)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(K,w9.x),Y.addScaledVector(W,w9.y),Y.addScaledVector(H,w9.z),Y}static getInterpolatedAttribute(J,Q,$,Z,K,W){return r6.setScalar(0),t6.setScalar(0),e6.setScalar(0),r6.fromBufferAttribute(J,Q),t6.fromBufferAttribute(J,$),e6.fromBufferAttribute(J,Z),W.setScalar(0),W.addScaledVector(r6,K.x),W.addScaledVector(t6,K.y),W.addScaledVector(e6,K.z),W}static isFrontFacing(J,Q,$,Z){return N9.subVectors($,Q),P9.subVectors(J,Q),N9.cross(P9).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return N9.subVectors(this.c,this.b),P9.subVectors(this.a,this.b),N9.cross(P9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return sJ.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return sJ.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,K){return sJ.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,K)}containsPoint(J){return sJ.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return sJ.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,K=this.c,W,H;z8.subVectors(Z,$),A8.subVectors(K,$),i6.subVectors(J,$);let Y=z8.dot(i6),X=A8.dot(i6);if(Y<=0&&X<=0)return Q.copy($);o6.subVectors(J,Z);let U=z8.dot(o6),N=A8.dot(o6);if(U>=0&&N<=U)return Q.copy(Z);let q=Y*N-U*X;if(q<=0&&Y>=0&&U<=0)return W=Y/(Y-U),Q.copy($).addScaledVector(z8,W);a6.subVectors(J,K);let G=z8.dot(a6),D=A8.dot(a6);if(D>=0&&G<=D)return Q.copy(K);let V=G*X-Y*D;if(V<=0&&X>=0&&D<=0)return H=X/(X-D),Q.copy($).addScaledVector(A8,H);let z=U*D-G*N;if(z<=0&&N-U>=0&&G-D>=0)return XZ.subVectors(K,Z),H=(N-U)/(N-U+(G-D)),Q.copy(Z).addScaledVector(XZ,H);let F=1/(z+V+q);return W=V*F,H=q*F,Q.copy($).addScaledVector(z8,W).addScaledVector(A8,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class U8{constructor(J=new x(1/0,1/0,1/0),Q=new x(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(E9.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(E9.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=E9.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let K=$.getAttribute("position");if(Q===!0&&K!==void 0&&J.isInstancedMesh!==!0)for(let W=0,H=K.count;W<H;W++){if(J.isMesh===!0)J.getVertexPosition(W,E9);else E9.fromBufferAttribute(K,W);E9.applyMatrix4(J.matrixWorld),this.expandByPoint(E9)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();y7.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();y7.copy($.boundingBox)}y7.applyMatrix4(J.matrixWorld),this.union(y7)}}let Z=J.children;for(let K=0,W=Z.length;K<W;K++)this.expandByObject(Z[K],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,E9),E9.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(J7),f7.subVectors(this.max,J7),_8.subVectors(J.a,J7),C8.subVectors(J.b,J7),P8.subVectors(J.c,J7),u9.subVectors(C8,_8),c9.subVectors(P8,C8),t9.subVectors(_8,P8);let Q=[0,-u9.z,u9.y,0,-c9.z,c9.y,0,-t9.z,t9.y,u9.z,0,-u9.x,c9.z,0,-c9.x,t9.z,0,-t9.x,-u9.y,u9.x,0,-c9.y,c9.x,0,-t9.y,t9.x,0];if(!JQ(Q,_8,C8,P8,f7))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!JQ(Q,_8,C8,P8,f7))return!1;return v7.crossVectors(u9,c9),Q=[v7.x,v7.y,v7.z],JQ(Q,_8,C8,P8,f7)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,E9).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(E9).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return T9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),T9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),T9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),T9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),T9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),T9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),T9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),T9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(T9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var T9=[new x,new x,new x,new x,new x,new x,new x,new x],E9=new x,y7=new U8,_8=new x,C8=new x,P8=new x,u9=new x,c9=new x,t9=new x,J7=new x,f7=new x,v7=new x,e9=new x;function JQ(J,Q,$,Z,K){for(let W=0,H=J.length-3;W<=H;W+=3){e9.fromArray(J,W);let Y=K.x*Math.abs(e9.x)+K.y*Math.abs(e9.y)+K.z*Math.abs(e9.z),X=Q.dot(e9),U=$.dot(e9),N=Z.dot(e9);if(Math.max(-Math.max(X,U,N),Math.min(X,U,N))>Y)return!1}return!0}var PJ=new x,b7=new t0,pW=0;class H9 extends b9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:pW++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,K=this.itemSize;Z<K;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)b7.fromBufferAttribute(this,Q),b7.applyMatrix3(J),this.setXY(Q,b7.x,b7.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)PJ.fromBufferAttribute(this,Q),PJ.applyMatrix3(J),this.setXYZ(Q,PJ.x,PJ.y,PJ.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)PJ.fromBufferAttribute(this,Q),PJ.applyMatrix4(J),this.setXYZ(Q,PJ.x,PJ.y,PJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)PJ.fromBufferAttribute(this,Q),PJ.applyNormalMatrix(J),this.setXYZ(Q,PJ.x,PJ.y,PJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)PJ.fromBufferAttribute(this,Q),PJ.transformDirection(J),this.setXYZ(Q,PJ.x,PJ.y,PJ.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=q9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=qJ($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=q9(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=qJ(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=q9(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=qJ(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=q9(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=qJ(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=q9(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=qJ(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=qJ(Q,this.array),$=qJ($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=qJ(Q,this.array),$=qJ($,this.array),Z=qJ(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,K){if(J*=this.itemSize,this.normalized)Q=qJ(Q,this.array),$=qJ($,this.array),Z=qJ(Z,this.array),K=qJ(K,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=K,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return J.name=this.name,J.usage=this.usage,J.gpuType=this.gpuType,J}dispose(){this.dispatchEvent({type:"dispose"})}}class k6 extends H9{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class B6 extends H9{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class zJ extends H9{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var mW=new U8,Q7=new x,QQ=new x;class n8{constructor(J=new x,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else mW.setFromPoints(J).getCenter($);let Z=0;for(let K=0,W=J.length;K<W;K++)Z=Math.max(Z,$.distanceToSquared(J[K]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;Q7.subVectors(J,this.center);let Q=Q7.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(Q7,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else QQ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(Q7.copy(J.center).add(QQ)),this.expandByPoint(Q7.copy(J.center).sub(QQ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var lW=0,W9=new BJ,$Q=new wJ,w8=new x,tJ=new U8,$7=new U8,vJ=new x;class mJ extends b9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lW++}),this.uuid=j9(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((EW(J))?B6:k6)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let K=new r0().getNormalMatrix(J);$.applyNormalMatrix(K),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return W9.makeRotationFromQuaternion(J),this.applyMatrix4(W9),this}rotateX(J){return W9.makeRotationX(J),this.applyMatrix4(W9),this}rotateY(J){return W9.makeRotationY(J),this.applyMatrix4(W9),this}rotateZ(J){return W9.makeRotationZ(J),this.applyMatrix4(W9),this}translate(J,Q,$){return W9.makeTranslation(J,Q,$),this.applyMatrix4(W9),this}scale(J,Q,$){return W9.makeScale(J,Q,$),this.applyMatrix4(W9),this}lookAt(J){return $Q.lookAt(J),$Q.updateMatrix(),this.applyMatrix4($Q.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(w8).negate(),this.translate(w8.x,w8.y,w8.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,K=J.length;Z<K;Z++){let W=J[Z];$.push(W.x,W.y,W.z||0)}this.setAttribute("position",new zJ($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let K=J[Z];Q.setXYZ(Z,K.x,K.y,K.z||0)}if(J.length>Q.count)d0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new U8;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){s0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new x(-1/0,-1/0,-1/0),new x(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let K=Q[$];if(tJ.setFromBufferAttribute(K),this.morphTargetsRelative)vJ.addVectors(this.boundingBox.min,tJ.min),this.boundingBox.expandByPoint(vJ),vJ.addVectors(this.boundingBox.max,tJ.max),this.boundingBox.expandByPoint(vJ);else this.boundingBox.expandByPoint(tJ.min),this.boundingBox.expandByPoint(tJ.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))s0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new n8;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){s0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new x,1/0);return}if(J){let $=this.boundingSphere.center;if(tJ.setFromBufferAttribute(J),Q)for(let K=0,W=Q.length;K<W;K++){let H=Q[K];if($7.setFromBufferAttribute(H),this.morphTargetsRelative)vJ.addVectors(tJ.min,$7.min),tJ.expandByPoint(vJ),vJ.addVectors(tJ.max,$7.max),tJ.expandByPoint(vJ);else tJ.expandByPoint($7.min),tJ.expandByPoint($7.max)}tJ.getCenter($);let Z=0;for(let K=0,W=J.count;K<W;K++)vJ.fromBufferAttribute(J,K),Z=Math.max(Z,$.distanceToSquared(vJ));if(Q)for(let K=0,W=Q.length;K<W;K++){let H=Q[K],Y=this.morphTargetsRelative;for(let X=0,U=H.count;X<U;X++){if(vJ.fromBufferAttribute(H,X),Y)w8.fromBufferAttribute(J,X),vJ.add(w8);Z=Math.max(Z,$.distanceToSquared(vJ))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))s0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){s0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:K}=Q,W=this.getAttribute("tangent");if(W===void 0||W.count!==$.count)W=new H9(new Float32Array(4*$.count),4),this.setAttribute("tangent",W);let H=[],Y=[];for(let P=0;P<$.count;P++)H[P]=new x,Y[P]=new x;let X=new x,U=new x,N=new x,q=new t0,G=new t0,D=new t0,V=new x,z=new x;function F(P,M,B){X.fromBufferAttribute($,P),U.fromBufferAttribute($,M),N.fromBufferAttribute($,B),q.fromBufferAttribute(K,P),G.fromBufferAttribute(K,M),D.fromBufferAttribute(K,B),U.sub(X),N.sub(X),G.sub(q),D.sub(q);let c=1/(G.x*D.y-D.x*G.y);if(!isFinite(c))return;V.copy(U).multiplyScalar(D.y).addScaledVector(N,-G.y).multiplyScalar(c),z.copy(N).multiplyScalar(G.x).addScaledVector(U,-D.x).multiplyScalar(c),H[P].add(V),H[M].add(V),H[B].add(V),Y[P].add(z),Y[M].add(z),Y[B].add(z)}let E=this.groups;if(E.length===0)E=[{start:0,count:J.count}];for(let P=0,M=E.length;P<M;++P){let B=E[P],c=B.start,v=B.count;for(let b=c,t=c+v;b<t;b+=3)F(J.getX(b+0),J.getX(b+1),J.getX(b+2))}let C=new x,j=new x,k=new x,I=new x;function _(P){k.fromBufferAttribute(Z,P),I.copy(k);let M=H[P];C.copy(M),C.sub(k.multiplyScalar(k.dot(M))).normalize(),j.crossVectors(I,M);let c=j.dot(Y[P])<0?-1:1;W.setXYZW(P,C.x,C.y,C.z,c)}for(let P=0,M=E.length;P<M;++P){let B=E[P],c=B.start,v=B.count;for(let b=c,t=c+v;b<t;b+=3)_(J.getX(b+0)),_(J.getX(b+1)),_(J.getX(b+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new H9(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let q=0,G=$.count;q<G;q++)$.setXYZ(q,0,0,0);let Z=new x,K=new x,W=new x,H=new x,Y=new x,X=new x,U=new x,N=new x;if(J)for(let q=0,G=J.count;q<G;q+=3){let D=J.getX(q+0),V=J.getX(q+1),z=J.getX(q+2);Z.fromBufferAttribute(Q,D),K.fromBufferAttribute(Q,V),W.fromBufferAttribute(Q,z),U.subVectors(W,K),N.subVectors(Z,K),U.cross(N),H.fromBufferAttribute($,D),Y.fromBufferAttribute($,V),X.fromBufferAttribute($,z),H.add(U),Y.add(U),X.add(U),$.setXYZ(D,H.x,H.y,H.z),$.setXYZ(V,Y.x,Y.y,Y.z),$.setXYZ(z,X.x,X.y,X.z)}else for(let q=0,G=Q.count;q<G;q+=3)Z.fromBufferAttribute(Q,q+0),K.fromBufferAttribute(Q,q+1),W.fromBufferAttribute(Q,q+2),U.subVectors(W,K),N.subVectors(Z,K),U.cross(N),$.setXYZ(q+0,U.x,U.y,U.z),$.setXYZ(q+1,U.x,U.y,U.z),$.setXYZ(q+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)vJ.fromBufferAttribute(J,Q),vJ.normalize(),J.setXYZ(Q,vJ.x,vJ.y,vJ.z)}toNonIndexed(){function J(H,Y){let{array:X,itemSize:U,normalized:N}=H,q=new X.constructor(Y.length*U),G=0,D=0;for(let V=0,z=Y.length;V<z;V++){if(H.isInterleavedBufferAttribute)G=Y[V]*H.data.stride+H.offset;else G=Y[V]*U;for(let F=0;F<U;F++)q[D++]=X[G++]}return new H9(q,U,N)}if(this.index===null)return d0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new mJ,$=this.index.array,Z=this.attributes;for(let H in Z){let Y=Z[H],X=J(Y,$);Q.setAttribute(H,X)}let K=this.morphAttributes;for(let H in K){let Y=[],X=K[H];for(let U=0,N=X.length;U<N;U++){let q=X[U],G=J(q,$);Y.push(G)}Q.morphAttributes[H]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let W=this.groups;for(let H=0,Y=W.length;H<Y;H++){let X=W[H];Q.addGroup(X.start,X.count,X.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,J.name=this.name,Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)J[X]=Y[X];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let Y in $){let X=$[Y];J.data.attributes[Y]=X.toJSON(J.data)}let Z={},K=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let N=0,q=X.length;N<q;N++){let G=X[N];U.push(G.toJSON(J.data))}if(U.length>0)Z[Y]=U,K=!0}if(K)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let W=this.groups;if(W.length>0)J.data.groups=JSON.parse(JSON.stringify(W));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let X in Z){let U=Z[X];this.setAttribute(X,U.clone(Q))}let K=J.morphAttributes;for(let X in K){let U=[],N=K[X];for(let q=0,G=N.length;q<G;q++)U.push(N[q].clone(Q));this.morphAttributes[X]=U}this.morphTargetsRelative=J.morphTargetsRelative;let W=J.groups;for(let X=0,U=W.length;X<U;X++){let N=W[X];this.addGroup(N.start,N.count,N.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class F${constructor(J,Q){this.isInterleavedBuffer=!0,this.array=J,this.stride=Q,this.count=J!==void 0?J.length/Q:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=j9()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,Q,$){J*=this.stride,$*=Q.stride;for(let Z=0,K=this.stride;Z<K;Z++)this.array[J+Z]=Q.array[$+Z];return this}set(J,Q=0){return this.array.set(J,Q),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=j9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let Q=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),$=new this.constructor(Q,this.stride);return $.setUsage(this.usage),$}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=j9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));let Q={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return Q.usage=this.usage,Q}}var cJ=new x;class G7{constructor(J,Q,$,Z=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=Q,this.offset=$,this.normalized=Z}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let Q=0,$=this.data.count;Q<$;Q++)cJ.fromBufferAttribute(this,Q),cJ.applyMatrix4(J),this.setXYZ(Q,cJ.x,cJ.y,cJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)cJ.fromBufferAttribute(this,Q),cJ.applyNormalMatrix(J),this.setXYZ(Q,cJ.x,cJ.y,cJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)cJ.fromBufferAttribute(this,Q),cJ.transformDirection(J),this.setXYZ(Q,cJ.x,cJ.y,cJ.z);return this}getComponent(J,Q){let $=this.array[J*this.data.stride+this.offset+Q];if(this.normalized)$=q9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=qJ($,this.array);return this.data.array[J*this.data.stride+this.offset+Q]=$,this}setX(J,Q){if(this.normalized)Q=qJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset]=Q,this}setY(J,Q){if(this.normalized)Q=qJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+1]=Q,this}setZ(J,Q){if(this.normalized)Q=qJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+2]=Q,this}setW(J,Q){if(this.normalized)Q=qJ(Q,this.array);return this.data.array[J*this.data.stride+this.offset+3]=Q,this}getX(J){let Q=this.data.array[J*this.data.stride+this.offset];if(this.normalized)Q=q9(Q,this.array);return Q}getY(J){let Q=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)Q=q9(Q,this.array);return Q}getZ(J){let Q=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)Q=q9(Q,this.array);return Q}getW(J){let Q=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)Q=q9(Q,this.array);return Q}setXY(J,Q,$){if(J=J*this.data.stride+this.offset,this.normalized)Q=qJ(Q,this.array),$=qJ($,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J=J*this.data.stride+this.offset,this.normalized)Q=qJ(Q,this.array),$=qJ($,this.array),Z=qJ(Z,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this}setXYZW(J,Q,$,Z,K){if(J=J*this.data.stride+this.offset,this.normalized)Q=qJ(Q,this.array),$=qJ($,this.array),Z=qJ(Z,this.array),K=qJ(K,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this.data.array[J+3]=K,this}clone(J){if(J===void 0){U7("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)Q.push(this.data.array[Z+K])}return new H9(new this.array.constructor(Q),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new G7(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){U7("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)Q.push(this.data.array[Z+K])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:Q,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var ZQ=new x,dW=new x,uW=new r0;class L9{constructor(J=new x(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=ZQ.subVectors($,Q).cross(dW.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta(ZQ),K=this.normal.dot(Z);if(K===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let W=-(J.start.dot(this.normal)+this.constant)/K;if($===!0&&(W<0||W>1))return null;return Q.copy(J.start).addScaledVector(Z,W)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||uW.getNormalMatrix(J),Z=this.coplanarPoint(ZQ).applyMatrix4(J),K=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(K),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(J){return this.normal.fromArray(J.normal),this.constant=J.constant,this}}var cW=0;class x9 extends b9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:cW++}),this.uuid=j9(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new e0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){d0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){d0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector2&&($&&$.isVector2)||Z&&Z.isEuler&&($&&$.isEuler)||Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,$.blending=this.blending,$.side=this.side,$.shadowSide=this.shadowSide,$.vertexColors=this.vertexColors,$.opacity=this.opacity,$.transparent=this.transparent,$.blendSrc=this.blendSrc,$.blendDst=this.blendDst,$.blendEquation=this.blendEquation,$.blendSrcAlpha=this.blendSrcAlpha,$.blendDstAlpha=this.blendDstAlpha,$.blendEquationAlpha=this.blendEquationAlpha,$.blendColor=this.blendColor.getHex(),$.blendAlpha=this.blendAlpha,$.depthFunc=this.depthFunc,$.depthTest=this.depthTest,$.depthWrite=this.depthWrite,$.colorWrite=this.colorWrite,$.clipIntersection=this.clipIntersection,$.clipShadows=this.clipShadows,$.stencilWriteMask=this.stencilWriteMask,$.stencilFunc=this.stencilFunc,$.stencilRef=this.stencilRef,$.stencilFuncMask=this.stencilFuncMask,$.stencilFail=this.stencilFail,$.stencilZFail=this.stencilZFail,$.stencilZPass=this.stencilZPass,$.stencilWrite=this.stencilWrite,$.polygonOffset=this.polygonOffset,$.polygonOffsetFactor=this.polygonOffsetFactor,$.polygonOffsetUnits=this.polygonOffsetUnits,$.dithering=this.dithering,$.alphaTest=this.alphaTest,$.alphaHash=this.alphaHash,$.alphaToCoverage=this.alphaToCoverage,$.premultipliedAlpha=this.premultipliedAlpha,$.forceSinglePass=this.forceSinglePass,$.allowOverride=this.allowOverride,$.visible=this.visible,$.toneMapped=this.toneMapped,$.name=this.name,this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)$.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)$.clippingPlanes=this.clippingPlanes.map((K)=>K.toJSON());if(this.rotation!==void 0)$.rotation=this.rotation;if(this.depthPacking!==void 0)$.depthPacking=this.depthPacking;if(this.linewidth!==void 0)$.linewidth=this.linewidth;if(this.linecap!==void 0)$.linecap=this.linecap;if(this.linejoin!==void 0)$.linejoin=this.linejoin;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.wireframe!==void 0)$.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)$.flatShading=this.flatShading;if(this.fog!==void 0)$.fog=this.fog;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(K){let W=[];for(let H in K){let Y=K[H];delete Y.metadata,W.push(Y)}return W}if(Q){let K=Z(J.textures),W=Z(J.images);if(K.length>0)$.textures=K;if(W.length>0)$.images=W}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new e0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.retroreflectivity!==void 0)this.retroreflectivity=J.retroreflectivity;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.clippingPlanes!==void 0)this.clippingPlanes=J.clippingPlanes.map(($)=>new L9().fromJSON($));if(J.clipIntersection!==void 0)this.clipIntersection=J.clipIntersection;if(J.clipShadows!==void 0)this.clipShadows=J.clipShadows;if(J.depthPacking!==void 0)this.depthPacking=J.depthPacking;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.linecap!==void 0)this.linecap=J.linecap;if(J.linejoin!==void 0)this.linejoin=J.linejoin;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new t0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new t0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let K=0;K!==Z;++K)$[K]=Q[K].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class L7 extends x9{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new e0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var T8,Z7=new x,S8=new x,j8=new x,y8=new t0,K7=new t0,AK=new BJ,h7=new x,W7=new x,x7=new x,UZ=new t0,KQ=new t0,GZ=new t0;class I6 extends wJ{constructor(J=new L7){super();if(this.isSprite=!0,this.type="Sprite",T8===void 0){T8=new mJ;let Q=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),$=new F$(Q,5);T8.setIndex([0,1,2,0,2,3]),T8.setAttribute("position",new G7($,3,0,!1)),T8.setAttribute("uv",new G7($,2,3,!1))}this.geometry=T8,this.material=J,this.center=new t0(0.5,0.5),this.count=1}intersectsFrustum(J){return J.intersectsSprite(this)}raycast(J,Q){if(J.camera===null)s0('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(S8.setFromMatrixScale(this.matrixWorld),AK.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),j8.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)S8.multiplyScalar(-j8.z);let $=this.material.rotation,Z,K;if($!==0)K=Math.cos($),Z=Math.sin($);let W=this.center;g7(h7.set(-0.5,-0.5,0),j8,W,S8,Z,K),g7(W7.set(0.5,-0.5,0),j8,W,S8,Z,K),g7(x7.set(0.5,0.5,0),j8,W,S8,Z,K),UZ.set(0,0),KQ.set(1,0),GZ.set(1,1);let H=J.ray.intersectTriangle(h7,W7,x7,!1,Z7);if(H===null){if(g7(W7.set(-0.5,0.5,0),j8,W,S8,Z,K),KQ.set(0,1),H=J.ray.intersectTriangle(h7,x7,W7,!1,Z7),H===null)return}let Y=J.ray.origin.distanceTo(Z7);if(Y<J.near||Y>J.far)return;Q.push({distance:Y,point:Z7.clone(),uv:sJ.getInterpolation(Z7,h7,W7,x7,UZ,KQ,GZ,new t0),face:null,object:this})}copy(J,Q){if(super.copy(J,Q),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function g7(J,Q,$,Z,K,W){if(y8.subVectors(J,$).addScalar(0.5).multiply(Z),K!==void 0)K7.x=W*y8.x-K*y8.y,K7.y=K*y8.x+W*y8.y;else K7.copy(y8);J.copy(Q),J.x+=K7.x,J.y+=K7.y,J.applyMatrix4(AK)}var S9=new x,WQ=new x,p7=new x,m7=new x;class z6{constructor(J=new x,Q=new x(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,S9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=S9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return S9.copy(this.origin).addScaledVector(this.direction,Q),S9.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){WQ.copy(J).add(Q).multiplyScalar(0.5),p7.copy(Q).sub(J).normalize(),m7.copy(this.origin).sub(WQ);let K=J.distanceTo(Q)*0.5,W=-this.direction.dot(p7),H=m7.dot(this.direction),Y=-m7.dot(p7),X=m7.lengthSq(),U=Math.abs(1-W*W),N,q,G,D;if(U>0)if(N=W*Y-H,q=W*H-Y,D=K*U,N>=0)if(q>=-D)if(q<=D){let V=1/U;N*=V,q*=V,G=N*(N+W*q+2*H)+q*(W*N+q+2*Y)+X}else q=K,N=Math.max(0,-(W*q+H)),G=-N*N+q*(q+2*Y)+X;else q=-K,N=Math.max(0,-(W*q+H)),G=-N*N+q*(q+2*Y)+X;else if(q<=-D)N=Math.max(0,-(-W*K+H)),q=N>0?-K:Math.min(Math.max(-K,-Y),K),G=-N*N+q*(q+2*Y)+X;else if(q<=D)N=0,q=Math.min(Math.max(-K,-Y),K),G=q*(q+2*Y)+X;else N=Math.max(0,-(W*K+H)),q=N>0?K:Math.min(Math.max(-K,-Y),K),G=-N*N+q*(q+2*Y)+X;else q=W>0?-K:K,N=Math.max(0,-(W*q+H)),G=-N*N+q*(q+2*Y)+X;if($)$.copy(this.origin).addScaledVector(this.direction,N);if(Z)Z.copy(WQ).addScaledVector(p7,q);return G}intersectSphere(J,Q){if(J.radius<0)return null;S9.subVectors(J.center,this.origin);let $=S9.dot(this.direction),Z=S9.dot(S9)-$*$,K=J.radius*J.radius;if(Z>K)return null;let W=Math.sqrt(K-Z),H=$-W,Y=$+W;if(Y<0)return null;if(H<0)return this.at(Y,Q);return this.at(H,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,K,W,H,Y,X=1/this.direction.x,U=1/this.direction.y,N=1/this.direction.z,q=this.origin;if(X>=0)$=(J.min.x-q.x)*X,Z=(J.max.x-q.x)*X;else $=(J.max.x-q.x)*X,Z=(J.min.x-q.x)*X;if(U>=0)K=(J.min.y-q.y)*U,W=(J.max.y-q.y)*U;else K=(J.max.y-q.y)*U,W=(J.min.y-q.y)*U;if($>W||K>Z)return null;if(K>$||isNaN($))$=K;if(W<Z||isNaN(Z))Z=W;if(N>=0)H=(J.min.z-q.z)*N,Y=(J.max.z-q.z)*N;else H=(J.max.z-q.z)*N,Y=(J.min.z-q.z)*N;if($>Y||H>Z)return null;if(H>$||$!==$)$=H;if(Y<Z||Z!==Z)Z=Y;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,S9)!==null}intersectTriangle(J,Q,$,Z,K){let W=this.origin,H=this.direction,Y=H.x,X=H.y,U=H.z,N=J.x-W.x,q=J.y-W.y,G=J.z-W.z,D=Q.x-W.x,V=Q.y-W.y,z=Q.z-W.z,F=$.x-W.x,E=$.y-W.y,C=$.z-W.z,j=Math.abs(Y),k=Math.abs(X),I=Math.abs(U),_,P,M,B,c,v,b,t,y,s,J0,u;if(j>=k&&j>=I)if(M=Y,v=N,y=D,u=F,Y>=0)_=X,P=U,B=q,c=G,b=V,t=z,s=E,J0=C;else _=U,P=X,B=G,c=q,b=z,t=V,s=C,J0=E;else if(k>=I)if(M=X,v=q,y=V,u=E,X>=0)_=U,P=Y,B=G,c=N,b=z,t=D,s=C,J0=F;else _=Y,P=U,B=N,c=G,b=D,t=z,s=F,J0=C;else if(M=U,v=G,y=z,u=C,U>=0)_=Y,P=X,B=N,c=q,b=D,t=V,s=F,J0=E;else _=X,P=Y,B=q,c=N,b=V,t=D,s=E,J0=F;if(M===0)return null;let G0=_/M,a=P/M,Q0=1/M,W0=B-G0*v,u0=c-a*v,l0=b-G0*y,EJ=t-a*y,$J=s-G0*u,A=J0-a*u,h=$J*EJ-A*l0,p=W0*A-u0*$J,n=l0*u0-EJ*W0;if(Z){if(h<0||p<0||n<0)return null}else if((h<0||p<0||n<0)&&(h>0||p>0||n>0))return null;let $0=h+p+n;if($0===0)return null;let K0=Q0*(h*v+p*y+n*u);if($0>0?K0<0:K0>0)return null;return this.at(K0/$0,K)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class a9 extends x9{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new e0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new f9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var NZ=new BJ,J8=new z6,l7=new n8,EZ=new x,d7=new x,u7=new x,c7=new x,HQ=new x,n7=new x,qZ=new x,s7=new x;class x0 extends wJ{constructor(J=new mJ,Q=new a9){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Z.length;K<W;K++){let H=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,K=$.morphAttributes.position,W=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let H=this.morphTargetInfluences;if(K&&H){n7.set(0,0,0);for(let Y=0,X=K.length;Y<X;Y++){let U=H[Y],N=K[Y];if(U===0)continue;if(HQ.fromBufferAttribute(N,J),W)n7.addScaledVector(HQ,U);else n7.addScaledVector(HQ.sub(Q),U)}Q.add(n7)}return Q}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,Z=this.material,K=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(l7.copy($.boundingSphere),l7.applyMatrix4(K),J8.copy(J.ray).recast(J.near),l7.containsPoint(J8.origin)===!1){if(J8.intersectSphere(l7,EZ)===null)return;if(J8.origin.distanceToSquared(EZ)>(J.far-J.near)**2)return}if(NZ.copy(K).invert(),J8.copy(J.ray).applyMatrix4(NZ),$.boundingBox!==null){if(J8.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,J8)}_computeIntersections(J,Q,$){let Z,K=this.geometry,W=this.material,H=K.index,Y=K.attributes.position,X=K.attributes.uv,U=K.attributes.uv1,N=K.attributes.normal,q=K.groups,G=K.drawRange;if(H!==null)if(Array.isArray(W))for(let D=0,V=q.length;D<V;D++){let z=q[D],F=W[z.materialIndex],E=Math.max(z.start,G.start),C=Math.min(H.count,Math.min(z.start+z.count,G.start+G.count));for(let j=E,k=C;j<k;j+=3){let I=H.getX(j),_=H.getX(j+1),P=H.getX(j+2);if(Z=i7(this,F,J,$,X,U,N,I,_,P),Z)Z.faceIndex=Math.floor(j/3),Z.face.materialIndex=z.materialIndex,Q.push(Z)}}else{let D=Math.max(0,G.start),V=Math.min(H.count,G.start+G.count);for(let z=D,F=V;z<F;z+=3){let E=H.getX(z),C=H.getX(z+1),j=H.getX(z+2);if(Z=i7(this,W,J,$,X,U,N,E,C,j),Z)Z.faceIndex=Math.floor(z/3),Q.push(Z)}}else if(Y!==void 0)if(Array.isArray(W))for(let D=0,V=q.length;D<V;D++){let z=q[D],F=W[z.materialIndex],E=Math.max(z.start,G.start),C=Math.min(Y.count,Math.min(z.start+z.count,G.start+G.count));for(let j=E,k=C;j<k;j+=3){let I=j,_=j+1,P=j+2;if(Z=i7(this,F,J,$,X,U,N,I,_,P),Z)Z.faceIndex=Math.floor(j/3),Z.face.materialIndex=z.materialIndex,Q.push(Z)}}else{let D=Math.max(0,G.start),V=Math.min(Y.count,G.start+G.count);for(let z=D,F=V;z<F;z+=3){let E=z,C=z+1,j=z+2;if(Z=i7(this,W,J,$,X,U,N,E,C,j),Z)Z.faceIndex=Math.floor(z/3),Q.push(Z)}}}}function nW(J,Q,$,Z,K,W,H,Y){let X;if(Q.side===1)X=Z.intersectTriangle(H,W,K,!0,Y);else X=Z.intersectTriangle(K,W,H,Q.side===0,Y);if(X===null)return null;s7.copy(Y),s7.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(s7);if(U<$.near||U>$.far)return null;return{distance:U,point:s7.clone(),object:J}}function i7(J,Q,$,Z,K,W,H,Y,X,U){J.getVertexPosition(Y,d7),J.getVertexPosition(X,u7),J.getVertexPosition(U,c7);let N=nW(J,Q,$,Z,d7,u7,c7,qZ);if(N){let q=new x;if(sJ.getBarycoord(qZ,d7,u7,c7,q),K)N.uv=sJ.getInterpolatedAttribute(K,Y,X,U,q,new t0);if(W)N.uv1=sJ.getInterpolatedAttribute(W,Y,X,U,q,new t0);if(H){if(N.normal=sJ.getInterpolatedAttribute(H,Y,X,U,q,new x),N.normal.dot(Z.direction)>0)N.normal.multiplyScalar(-1)}let G={a:Y,b:X,c:U,normal:new x,materialIndex:0};sJ.getNormal(d7,u7,c7,G.normal),N.face=G,N.barycoord=q}return N}class D$ extends hJ{constructor(J=null,Q=1,$=1,Z,K,W,H,Y,X=1003,U=1003,N,q){super(null,W,H,Y,X,U,Z,K,N,q);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var Q8=new n8,sW=new t0(0.5,0.5),o7=new x;class V7{constructor(J=new L9,Q=new L9,$=new L9,Z=new L9,K=new L9,W=new L9){this.planes=[J,Q,$,Z,K,W]}set(J,Q,$,Z,K,W){let H=this.planes;return H[0].copy(J),H[1].copy(Q),H[2].copy($),H[3].copy(Z),H[4].copy(K),H[5].copy(W),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,K=J.elements,W=K[0],H=K[1],Y=K[2],X=K[3],U=K[4],N=K[5],q=K[6],G=K[7],D=K[8],V=K[9],z=K[10],F=K[11],E=K[12],C=K[13],j=K[14],k=K[15];if(Z[0].setComponents(X-W,G-U,F-D,k-E).normalize(),Z[1].setComponents(X+W,G+U,F+D,k+E).normalize(),Z[2].setComponents(X+H,G+N,F+V,k+C).normalize(),Z[3].setComponents(X-H,G-N,F-V,k-C).normalize(),$)Z[4].setComponents(Y,q,z,j).normalize(),Z[5].setComponents(X-Y,G-q,F-z,k-j).normalize();else if(Z[4].setComponents(X-Y,G-q,F-z,k-j).normalize(),Q===2000)Z[5].setComponents(X+Y,G+q,F+z,k+j).normalize();else if(Q===2001)Z[5].setComponents(Y,q,z,j).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();Q8.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();Q8.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(Q8)}intersectsSprite(J){Q8.center.set(0,0,0);let Q=sW.distanceTo(J.center);return Q8.radius=0.7071067811865476+Q,Q8.applyMatrix4(J.matrixWorld),this.intersectsSphere(Q8)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let K=0;K<6;K++)if(Q[K].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(o7.x=Z.normal.x>0?J.max.x:J.min.x,o7.y=Z.normal.y>0?J.max.y:J.min.y,o7.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(o7)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class k7 extends x9{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new e0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var Z6=new x,K6=new x,FZ=new BJ,H7=new z6,a7=new n8,YQ=new x,DZ=new x;class O$ extends wJ{constructor(J=new mJ,Q=new k7){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let Z=1,K=Q.count;Z<K;Z++)Z6.fromBufferAttribute(Q,Z-1),K6.fromBufferAttribute(Q,Z),$[Z]=$[Z-1],$[Z]+=Z6.distanceTo(K6);J.setAttribute("lineDistance",new zJ($,1))}else d0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,K=J.params.Line.threshold,W=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(a7.copy($.boundingSphere),a7.applyMatrix4(Z),a7.radius+=K,J.ray.intersectsSphere(a7)===!1)return;FZ.copy(Z).invert(),H7.copy(J.ray).applyMatrix4(FZ);let H=K/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=this.isLineSegments?2:1,U=$.index,q=$.attributes.position;if(U!==null){let G=Math.max(0,W.start),D=Math.min(U.count,W.start+W.count);for(let V=G,z=D-1;V<z;V+=X){let F=U.getX(V),E=U.getX(V+1),C=r7(this,J,H7,Y,F,E,V);if(C)Q.push(C)}if(this.isLineLoop){let V=U.getX(D-1),z=U.getX(G),F=r7(this,J,H7,Y,V,z,D-1);if(F)Q.push(F)}}else{let G=Math.max(0,W.start),D=Math.min(q.count,W.start+W.count);for(let V=G,z=D-1;V<z;V+=X){let F=r7(this,J,H7,Y,V,V+1,V);if(F)Q.push(F)}if(this.isLineLoop){let V=r7(this,J,H7,Y,D-1,G,D-1);if(V)Q.push(V)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,W=Z.length;K<W;K++){let H=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}}function r7(J,Q,$,Z,K,W,H){let Y=J.geometry.attributes.position;if(Z6.fromBufferAttribute(Y,K),K6.fromBufferAttribute(Y,W),$.distanceSqToSegment(Z6,K6,YQ,DZ)>Z)return;YQ.applyMatrix4(J.matrixWorld);let U=Q.ray.origin.distanceTo(YQ);if(U<Q.near||U>Q.far)return;return{distance:U,point:DZ.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var OZ=new x,RZ=new x;class A6 extends O${constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let Z=0,K=Q.count;Z<K;Z+=2)OZ.fromBufferAttribute(Q,Z),RZ.fromBufferAttribute(Q,Z+1),$[Z]=Z===0?0:$[Z-1],$[Z+1]=$[Z]+OZ.distanceTo(RZ);J.setAttribute("lineDistance",new zJ($,1))}else d0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _6 extends hJ{constructor(J=[],Q=301,$,Z,K,W,H,Y,X,U){super(J,Q,$,Z,K,W,H,Y,X,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class G8 extends hJ{constructor(J,Q,$,Z,K,W,H,Y,X){super(J,Q,$,Z,K,W,H,Y,X);this.isCanvasTexture=!0,this.needsUpdate=!0}}class N8 extends hJ{constructor(J,Q,$=1014,Z,K,W,H=1003,Y=1003,X,U=1026,N=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let q={width:J,height:Q,depth:N};super(q,Z,K,W,H,Y,U,$,X);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new O7(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);return Q.compareFunction=this.compareFunction,Q}}class R$ extends N8{constructor(J,Q=1014,$=301,Z,K,W=1003,H=1003,Y,X=1026){let U={width:J,height:J,depth:1},N=[U,U,U,U,U,U];super(J,J,Q,$,Z,K,W,H,Y,X);this.image=N,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class C6 extends hJ{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class AJ extends mJ{constructor(J=1,Q=1,$=1,Z=1,K=1,W=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:K,depthSegments:W};let H=this;Z=Math.floor(Z),K=Math.floor(K),W=Math.floor(W);let Y=[],X=[],U=[],N=[],q=0,G=0;D("z","y","x",-1,-1,$,Q,J,W,K,0),D("z","y","x",1,-1,$,Q,-J,W,K,1),D("x","z","y",1,1,J,$,Q,Z,W,2),D("x","z","y",1,-1,J,$,-Q,Z,W,3),D("x","y","z",1,-1,J,Q,$,Z,K,4),D("x","y","z",-1,-1,J,Q,-$,Z,K,5),this.setIndex(Y),this.setAttribute("position",new zJ(X,3)),this.setAttribute("normal",new zJ(U,3)),this.setAttribute("uv",new zJ(N,2));function D(V,z,F,E,C,j,k,I,_,P,M){let B=j/_,c=k/P,v=j/2,b=k/2,t=I/2,y=_+1,s=P+1,J0=0,u=0,G0=new x;for(let a=0;a<s;a++){let Q0=a*c-b;for(let W0=0;W0<y;W0++){let u0=W0*B-v;G0[V]=u0*E,G0[z]=Q0*C,G0[F]=t,X.push(G0.x,G0.y,G0.z),G0[V]=0,G0[z]=0,G0[F]=I>0?1:-1,U.push(G0.x,G0.y,G0.z),N.push(W0/_),N.push(1-a/P),J0+=1}}for(let a=0;a<P;a++)for(let Q0=0;Q0<_;Q0++){let W0=q+Q0+y*a,u0=q+Q0+y*(a+1),l0=q+(Q0+1)+y*(a+1),EJ=q+(Q0+1)+y*a;Y.push(W0,u0,EJ),Y.push(u0,l0,EJ),u+=6}H.addGroup(G,u,M),G+=u,q+=J0}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new AJ(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class B7 extends mJ{constructor(J=1,Q=32,$=0,Z=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:J,segments:Q,thetaStart:$,thetaLength:Z},Q=Math.max(3,Q);let K=[],W=[],H=[],Y=[],X=new x,U=new t0;W.push(0,0,0),H.push(0,0,1),Y.push(0.5,0.5);for(let N=0,q=3;N<=Q;N++,q+=3){let G=$+N/Q*Z;X.x=J*Math.cos(G),X.y=J*Math.sin(G),W.push(X.x,X.y,X.z),H.push(0,0,1),U.x=(W[q]/J+1)/2,U.y=(W[q+1]/J+1)/2,Y.push(U.x,U.y)}for(let N=1;N<=Q;N++)K.push(N,N+1,0);this.setIndex(K),this.setAttribute("position",new zJ(W,3)),this.setAttribute("normal",new zJ(H,3)),this.setAttribute("uv",new zJ(Y,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new B7(J.radius,J.segments,J.thetaStart,J.thetaLength)}}class TJ extends mJ{constructor(J=1,Q=1,$=1,Z=32,K=1,W=!1,H=0,Y=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:$,radialSegments:Z,heightSegments:K,openEnded:W,thetaStart:H,thetaLength:Y};let X=this;Z=Math.floor(Z),K=Math.floor(K);let U=[],N=[],q=[],G=[],D=0,V=[],z=$/2,F=0;if(E(),W===!1){if(J>0)C(!0);if(Q>0)C(!1)}this.setIndex(U),this.setAttribute("position",new zJ(N,3)),this.setAttribute("normal",new zJ(q,3)),this.setAttribute("uv",new zJ(G,2));function E(){let j=new x,k=new x,I=0,_=(Q-J)/$;for(let P=0;P<=K;P++){let M=[],B=P/K,c=B*(Q-J)+J;for(let v=0;v<=Z;v++){let b=v/Z,t=b*Y+H,y=Math.sin(t),s=Math.cos(t);k.x=c*y,k.y=-B*$+z,k.z=c*s,N.push(k.x,k.y,k.z),j.set(y,_,s).normalize(),q.push(j.x,j.y,j.z),G.push(b,1-B),M.push(D++)}V.push(M)}for(let P=0;P<Z;P++)for(let M=0;M<K;M++){let B=V[M][P],c=V[M+1][P],v=V[M+1][P+1],b=V[M][P+1];if(J>0||M!==0)U.push(B,c,b),I+=3;if(Q>0||M!==K-1)U.push(c,v,b),I+=3}X.addGroup(F,I,0),F+=I}function C(j){let k=D,I=new t0,_=new x,P=0,M=j===!0?J:Q,B=j===!0?1:-1;for(let v=1;v<=Z;v++)N.push(0,z*B,0),q.push(0,B,0),G.push(0.5,0.5),D++;let c=D;for(let v=0;v<=Z;v++){let t=v/Z*Y+H,y=Math.cos(t),s=Math.sin(t);_.x=M*s,_.y=z*B,_.z=M*y,N.push(_.x,_.y,_.z),q.push(0,B,0),I.x=y*0.5+0.5,I.y=s*0.5*B+0.5,G.push(I.x,I.y),D++}for(let v=0;v<Z;v++){let b=k+v,t=c+v;if(j===!0)U.push(t,t+1,b);else U.push(t+1,t,b);P+=3}X.addGroup(F,P,j===!0?1:2),F+=P}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new TJ(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class s8 extends TJ{constructor(J=1,Q=1,$=32,Z=1,K=!1,W=0,H=Math.PI*2){super(0,J,Q,$,Z,K,W,H);this.type="ConeGeometry",this.parameters={radius:J,height:Q,radialSegments:$,heightSegments:Z,openEnded:K,thetaStart:W,thetaLength:H}}static fromJSON(J){return new s8(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}var t7=new x,e7=new x,XQ=new x,J6=new sJ;class P6 extends mJ{constructor(J=null,Q=1){super();if(this.type="EdgesGeometry",this.parameters={geometry:J,thresholdAngle:Q},J!==null){let Z=Math.pow(10,4),K=Math.cos(h8*Q),W=J.getIndex(),H=J.getAttribute("position"),Y=W?W.count:H.count,X=[0,0,0],U=["a","b","c"],N=[,,,],q={},G=[];for(let D=0;D<Y;D+=3){if(W)X[0]=W.getX(D),X[1]=W.getX(D+1),X[2]=W.getX(D+2);else X[0]=D,X[1]=D+1,X[2]=D+2;let{a:V,b:z,c:F}=J6;if(V.fromBufferAttribute(H,X[0]),z.fromBufferAttribute(H,X[1]),F.fromBufferAttribute(H,X[2]),J6.getNormal(XQ),N[0]=`${Math.round(V.x*Z)},${Math.round(V.y*Z)},${Math.round(V.z*Z)}`,N[1]=`${Math.round(z.x*Z)},${Math.round(z.y*Z)},${Math.round(z.z*Z)}`,N[2]=`${Math.round(F.x*Z)},${Math.round(F.y*Z)},${Math.round(F.z*Z)}`,N[0]===N[1]||N[1]===N[2]||N[2]===N[0])continue;for(let E=0;E<3;E++){let C=(E+1)%3,j=N[E],k=N[C],I=J6[U[E]],_=J6[U[C]],P=`${j}_${k}`,M=`${k}_${j}`;if(M in q&&q[M]){if(XQ.dot(q[M].normal)<=K)G.push(I.x,I.y,I.z),G.push(_.x,_.y,_.z);q[M]=null}else if(!(P in q))q[P]={index0:X[E],index1:X[C],normal:XQ.clone()}}}for(let D in q)if(q[D]){let{index0:V,index1:z}=q[D];t7.fromBufferAttribute(H,V),e7.fromBufferAttribute(H,z),G.push(t7.x,t7.y,t7.z),G.push(e7.x,e7.y,e7.z)}this.setAttribute("position",new zJ(G,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}class I9 extends mJ{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let K=J/2,W=Q/2,H=Math.floor($),Y=Math.floor(Z),X=H+1,U=Y+1,N=J/H,q=Q/Y,G=[],D=[],V=[],z=[];for(let F=0;F<U;F++){let E=F*q-W;for(let C=0;C<X;C++){let j=C*N-K;D.push(j,-E,0),V.push(0,0,1),z.push(C/H),z.push(1-F/Y)}}for(let F=0;F<Y;F++)for(let E=0;E<H;E++){let C=E+X*F,j=E+X*(F+1),k=E+1+X*(F+1),I=E+1+X*F;G.push(C,j,I),G.push(j,k,I)}this.setIndex(G),this.setAttribute("position",new zJ(D,3)),this.setAttribute("normal",new zJ(V,3)),this.setAttribute("uv",new zJ(z,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new I9(J.width,J.height,J.widthSegments,J.heightSegments)}}class Q9 extends mJ{constructor(J=1,Q=32,$=16,Z=0,K=Math.PI*2,W=0,H=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:Q,heightSegments:$,phiStart:Z,phiLength:K,thetaStart:W,thetaLength:H},Q=Math.max(3,Math.floor(Q)),$=Math.max(2,Math.floor($));let Y=Math.min(W+H,Math.PI),X=0,U=[],N=new x,q=new x,G=[],D=[],V=[],z=[];for(let F=0;F<=$;F++){let E=[],C=F/$,j=W+C*H,k=J*Math.cos(j),I=Math.sqrt(J*J-k*k),_=0;if(F===0&&W===0)_=0.5/Q;else if(F===$&&Y===Math.PI)_=-0.5/Q;for(let P=0;P<=Q;P++){let M=P/Q,B=Z+M*K;N.x=-I*Math.cos(B),N.y=k,N.z=I*Math.sin(B),D.push(N.x,N.y,N.z),q.copy(N).normalize(),V.push(q.x,q.y,q.z),z.push(M+_,1-C),E.push(X++)}U.push(E)}for(let F=0;F<$;F++)for(let E=0;E<Q;E++){let C=U[F][E+1],j=U[F][E],k=U[F+1][E],I=U[F+1][E+1];if(F!==0||W>0)G.push(C,j,I);if(F!==$-1||Y<Math.PI)G.push(j,k,I)}this.setIndex(G),this.setAttribute("position",new zJ(D,3)),this.setAttribute("normal",new zJ(V,3)),this.setAttribute("uv",new zJ(z,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new Q9(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}function E8(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let K=J[$][Z];if(MZ(K))if(K.isRenderTargetTexture)d0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=K.clone();else if(Array.isArray(K))if(MZ(K[0])){let W=[];for(let H=0,Y=K.length;H<Y;H++)W[H]=K[H].clone();Q[$][Z]=W}else Q[$][Z]=K.slice();else Q[$][Z]=K}}return Q}function lJ(J){let Q={};for(let $=0;$<J.length;$++){let Z=E8(J[$]);for(let K in Z)Q[K]=Z[K]}return Q}function MZ(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function iW(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function M$(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return HJ.workingColorSpace}var _K={clone:E8,merge:lJ},oW=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,aW=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class X9 extends x9{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=oW,this.fragmentShader=aW,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=E8(J.uniforms),this.uniformsGroups=iW(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let W=this.uniforms[Z].value;if(W&&W.isTexture)Q.uniforms[Z]={type:"t",value:W.toJSON(J).uuid};else if(W&&W.isColor)Q.uniforms[Z]={type:"c",value:W.getHex()};else if(W&&W.isVector2)Q.uniforms[Z]={type:"v2",value:W.toArray()};else if(W&&W.isVector3)Q.uniforms[Z]={type:"v3",value:W.toArray()};else if(W&&W.isVector4)Q.uniforms[Z]={type:"v4",value:W.toArray()};else if(W&&W.isMatrix3)Q.uniforms[Z]={type:"m3",value:W.toArray()};else if(W&&W.isMatrix4)Q.uniforms[Z]={type:"m4",value:W.toArray()};else Q.uniforms[Z]={value:W}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let Z=J.uniforms[$];switch(this.uniforms[$]={},Z.type){case"t":this.uniforms[$].value=Q[Z.value]||null;break;case"c":this.uniforms[$].value=new e0().setHex(Z.value);break;case"v2":this.uniforms[$].value=new t0().fromArray(Z.value);break;case"v3":this.uniforms[$].value=new x().fromArray(Z.value);break;case"v4":this.uniforms[$].value=new IJ().fromArray(Z.value);break;case"m3":this.uniforms[$].value=new r0().fromArray(Z.value);break;case"m4":this.uniforms[$].value=new BJ().fromArray(Z.value);break;default:this.uniforms[$].value=Z.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class L$ extends X9{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class SJ extends x9{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new e0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new e0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new t0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new f9,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class V$ extends x9{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class k$ extends x9{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function f8(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}function UQ(J){return J!==void 0&&J.inTangents!==void 0&&J.outTangents!==void 0}class q8{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],K=Q[$-1];$:{J:{let W;Q:{Z:if(!(J<Z)){for(let H=$+2;;){if(Z===void 0){if(J<K)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===H)break;if(K=Z,Z=Q[++$],J<Z)break J}W=Q.length;break Q}if(!(J>=K)){let H=Q[1];if(J<H)$=2,K=H;for(let Y=$-2;;){if(K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===Y)break;if(Z=K,K=Q[--$-1],J>=K)break J}W=$,$=0;break Q}break $}while($<W){let H=$+W>>>1;if(J<Q[H])W=H;else $=H+1}if(Z=Q[$],K=Q[$-1],K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,K,Z)}return this.interpolate_($,K,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,K=J*Z;for(let W=0;W!==Z;++W)Q[W]=$[K+W];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class B$ extends q8{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,K=J-2,W=J+1,H=Z[K],Y=Z[W];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:K=J,H=2*Q-$;break;case 2402:K=Z.length-2,H=Q+Z[K]-Z[K+1];break;default:K=J,H=$}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:W=J,Y=2*$-Q;break;case 2402:W=1,Y=$+Z[1]-Z[0];break;default:W=J-1,Y=Q}let X=($-Q)*0.5,U=this.valueSize;this._weightPrev=X/(Q-H),this._weightNext=X/(Y-$),this._offsetPrev=K*U,this._offsetNext=W*U}interpolate_(J,Q,$,Z){let K=this.resultBuffer,W=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this._offsetPrev,N=this._offsetNext,q=this._weightPrev,G=this._weightNext,D=($-Q)/(Z-Q),V=D*D,z=V*D,F=-q*z+2*q*V-q*D,E=(1+q)*z+(-1.5-2*q)*V+(-0.5+q)*D+1,C=(-1-G)*z+(1.5+G)*V+0.5*D,j=G*z-G*V;for(let k=0;k!==H;++k)K[k]=F*W[U+k]+E*W[X+k]+C*W[Y+k]+j*W[N+k];return K}}class I$ extends q8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let K=this.resultBuffer,W=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=($-Q)/(Z-Q),N=1-U;for(let q=0;q!==H;++q)K[q]=W[X+q]*N+W[Y+q]*U;return K}}class z$ extends q8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class A$ extends q8{interpolate_(J,Q,$,Z){let K=this.resultBuffer,W=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this.inTangents,N=this.outTangents;if(!U||!N){let D=($-Q)/(Z-Q),V=1-D;for(let z=0;z!==H;++z)K[z]=W[X+z]*V+W[Y+z]*D;return K}let q=H*2,G=J-1;for(let D=0;D!==H;++D){let V=W[X+D],z=W[Y+D],F=G*q+D*2,E=N[F],C=N[F+1],j=J*q+D*2,k=U[j],I=U[j+1],_=tW($,Q,E,k,Z);K[D]=CK(_,V,C,I,z)}return K}}function CK(J,Q,$,Z,K){let W=1-J;return W*W*W*Q+3*W*W*J*$+3*W*J*J*Z+J*J*J*K}function rW(J,Q,$,Z,K){let W=1-J;return 3*W*W*($-Q)+6*W*J*(Z-$)+3*J*J*(K-Z)}function tW(J,Q,$,Z,K){let W=(J-Q)/(K-Q);for(let H=0;H<8;H++){let Y=CK(W,Q,$,Z,K)-J;if(Math.abs(Y)<0.0000000001)break;let X=rW(W,Q,$,Z,K);if(Math.abs(X)<0.0000000001)break;W=Math.max(0,Math.min(1,W-Y/X))}return W}class U9{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=f8(Q,this.TimeBufferType),this.values=f8($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:f8(J.times,Array),values:f8(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z;if(UQ(J.settings))$.settings={inTangents:f8(J.settings.inTangents,Array),outTangents:f8(J.settings.outTangents,Array)}}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new z$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new I$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new B$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new A$(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return d0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J;if(UQ(this.settings))LZ(this.settings.inTangents,J),LZ(this.settings.outTangents,J)}return this}trim(J,Q){let $=this.times,Z=$.length,K=0,W=Z-1;while(K!==Z&&$[K]<J)++K;while(W!==-1&&$[W]>Q)--W;if(++W,K!==0||W!==Z){if(K>=W)W=Math.max(W,1),K=W-1;let H=this.getValueSize();this.times=$.slice(K,W),this.values=this.values.slice(K*H,W*H)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)s0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,K=$.length;if(K===0)s0("KeyframeTrack: Track is empty.",this),J=!1;let W=null;for(let H=0;H!==K;H++){let Y=$[H];if(typeof Y==="number"&&isNaN(Y)){s0("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(W!==null&&W>Y){s0("KeyframeTrack: Out of order keys.",this,H,Y,W),J=!1;break}W=Y}if(Z!==void 0){if(qW(Z))for(let H=0,Y=Z.length;H!==Y;++H){let X=Z[H];if(isNaN(X)){s0("KeyframeTrack: Value is not a valid number.",this,H,X),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,K=J.length-1,W=1;for(let H=1;H<K;++H){let Y=!1,X=J[H],U=J[H+1];if(X!==U&&(H!==1||X!==J[0]))if(!Z){let N=H*$,q=N-$,G=N+$;for(let D=0;D!==$;++D){let V=Q[N+D];if(V!==Q[q+D]||V!==Q[G+D]){Y=!0;break}}}else Y=!0;if(Y){if(H!==W){J[W]=J[H];let N=H*$,q=W*$;for(let G=0;G!==$;++G)Q[q+G]=Q[N+G]}++W}}if(K>0){J[W]=J[K];for(let H=K*$,Y=W*$,X=0;X!==$;++X)Q[Y+X]=Q[H+X];++W}if(W!==J.length)this.times=J.slice(0,W),this.values=Q.slice(0,W*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);if(Z.createInterpolant=this.createInterpolant,UQ(this.settings))Z.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return Z}}function LZ(J,Q){for(let $=0,Z=J.length;$!==Z;$+=2)J[$]*=Q}U9.prototype.ValueTypeName="";U9.prototype.TimeBufferType=Float32Array;U9.prototype.ValueBufferType=Float32Array;U9.prototype.DefaultInterpolation=2301;class F8 extends U9{constructor(J,Q,$){super(J,Q,$)}}F8.prototype.ValueTypeName="bool";F8.prototype.ValueBufferType=Array;F8.prototype.DefaultInterpolation=2300;F8.prototype.InterpolantFactoryMethodLinear=void 0;F8.prototype.InterpolantFactoryMethodSmooth=void 0;class _$ extends U9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}_$.prototype.ValueTypeName="color";class C$ extends U9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}C$.prototype.ValueTypeName="number";class P$ extends q8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let K=this.resultBuffer,W=this.sampleValues,H=this.valueSize,Y=($-Q)/(Z-Q),X=J*H;for(let U=X+H;X!==U;X+=4)h9.slerpFlat(K,0,W,X-H,W,X,Y);return K}}class w6 extends U9{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new P$(this.times,this.values,this.getValueSize(),J)}}w6.prototype.ValueTypeName="quaternion";w6.prototype.InterpolantFactoryMethodSmooth=void 0;class D8 extends U9{constructor(J,Q,$){super(J,Q,$)}}D8.prototype.ValueTypeName="string";D8.prototype.ValueBufferType=Array;D8.prototype.DefaultInterpolation=2300;D8.prototype.InterpolantFactoryMethodLinear=void 0;D8.prototype.InterpolantFactoryMethodSmooth=void 0;class w$ extends U9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}w$.prototype.ValueTypeName="vector";class T${constructor(J,Q,$){let Z=this,K=!1,W=0,H=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(H++,K===!1){if(Z.onStart!==void 0)Z.onStart(U,W,H)}K=!0},this.itemEnd=function(U){if(W++,Z.onProgress!==void 0)Z.onProgress(U,W,H);if(W===H){if(K=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(U){if(Z.onError!==void 0)Z.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,N){return X.push(U,N),this},this.removeHandler=function(U){let N=X.indexOf(U);if(N!==-1)X.splice(N,2);return this},this.getHandler=function(U){for(let N=0,q=X.length;N<q;N+=2){let G=X[N],D=X[N+1];if(G.global)G.lastIndex=0;if(G.test(U))return D}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var PK=new T$;class S${constructor(J){if(this.manager=J!==void 0?J:PK,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,K){$.load(J,Z,Q,K)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}S$.DEFAULT_MATERIAL_NAME="__DEFAULT";class T6 extends wJ{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new e0(J),this.intensity=Q}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}}class S6 extends T6{constructor(J,Q,$){super(J,$);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wJ.DEFAULT_UP),this.updateMatrix(),this.groundColor=new e0(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}toJSON(J){let Q=super.toJSON(J);return Q.object.groundColor=this.groundColor.getHex(),Q}}var GQ=new BJ,VZ=new x,kZ=new x;class j${constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new t0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new BJ,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new V7,this._frameExtents=new t0(1,1),this._viewportCount=1,this._viewports=[new IJ(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera;VZ.setFromMatrixPosition(J.matrixWorld),Q.position.copy(VZ),kZ.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(kZ),Q.updateMatrixWorld(),this._updateMatrix(Q,this.matrix,this._frustum)}_updateMatrix(J,Q,$,Z){GQ.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),$.setFromProjectionMatrix(GQ,J.coordinateSystem,J.reversedDepth);let K=this._frameExtents,W=Z?Z.z/K.x:1,H=Z?Z.w/K.y:1,Y=Z?Z.x/K.x:0,X=Z?Z.y/K.y:0;if(J.coordinateSystem===2001||J.reversedDepth)Q.set(0.5*W,0,0,0.5*W+Y,0,0.5*H,0,0.5*H+X,0,0,1,0,0,0,0,1);else Q.set(0.5*W,0,0,0.5*W+Y,0,0.5*H,0,0.5*H+X,0,0,0.5,0.5,0,0,0,1);Q.multiply(GQ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};return J.intensity=this.intensity,J.bias=this.bias,J.normalBias=this.normalBias,J.radius=this.radius,J.blurSamples=this.blurSamples,J.mapSize=this.mapSize.toArray(),J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var Q6=new x,$6=new h9,M9=new x;class j6 extends wJ{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new BJ,this.projectionMatrix=new BJ,this.projectionMatrixInverse=new BJ,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(Q6,$6,M9),M9.x===1&&M9.y===1&&M9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(Q6,$6,M9.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(Q6,$6,M9),M9.x===1&&M9.y===1&&M9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(Q6,$6,M9.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var n9=new x,BZ=new t0,IZ=new t0;class nJ extends j6{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=p8*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(h8*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return p8*2*Math.atan(Math.tan(h8*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){n9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(n9.x,n9.y).multiplyScalar(-J/n9.z),n9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(n9.x,n9.y).multiplyScalar(-J/n9.z)}getViewSize(J,Q){return this.getViewBounds(J,BZ,IZ),Q.subVectors(IZ,BZ)}setViewOffset(J,Q,$,Z,K,W){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=K,this.view.height=W,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(h8*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,K=-0.5*Z,W=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=W;K+=W.offsetX*Z/Y,Q-=W.offsetY*$/X,Z*=W.width/Y,$*=W.height/X}let H=this.filmOffset;if(H!==0)K+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(K,K+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class I7 extends j6{constructor(J=-1,Q=1,$=1,Z=-1,K=0.1,W=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=K,this.far=W,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,K,W){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=K,this.view.height=W,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,K=$-J,W=$+J,H=Z+Q,Y=Z-Q;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;K+=X*this.view.offsetX,W=K+X*this.view.width,H-=U*this.view.offsetY,Y=H-U*this.view.height}this.projectionMatrix.makeOrthographic(K,W,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class wK extends j${constructor(){super(new I7(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class y6 extends T6{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wJ.DEFAULT_UP),this.updateMatrix(),this.target=new wJ,this.shadow=new wK}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}}var v8=-90,b8=1;class y$ extends wJ{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new nJ(v8,b8,J,Q);Z.layers=this.layers,this.add(Z);let K=new nJ(v8,b8,J,Q);K.layers=this.layers,this.add(K);let W=new nJ(v8,b8,J,Q);W.layers=this.layers,this.add(W);let H=new nJ(v8,b8,J,Q);H.layers=this.layers,this.add(H);let Y=new nJ(v8,b8,J,Q);Y.layers=this.layers,this.add(Y);let X=new nJ(v8,b8,J,Q);X.layers=this.layers,this.add(X)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,K,W,H,Y]=Q;for(let X of Q)this.remove(X);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),K.up.set(0,0,-1),K.lookAt(0,1,0),W.up.set(0,0,1),W.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),K.up.set(0,0,1),K.lookAt(0,1,0),W.up.set(0,0,-1),W.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let X of Q)this.add(X),X.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[K,W,H,Y,X,U]=this.children,N=J.getRenderTarget(),q=J.getActiveCubeFace(),G=J.getActiveMipmapLevel(),D=J.xr.enabled;J.xr.enabled=!1;let V=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let z=!1;if(J.isWebGLRenderer===!0)z=J.state.buffers.depth.getReversed();else z=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,1,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,2,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,3,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,4,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),$.texture.generateMipmaps=V,J.setRenderTarget($,5,Z),z&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(N,q,G),J.xr.enabled=D,$.texture.needsPMREMUpdate=!0}}class f$ extends nJ{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var v$="\\[\\]\\.:\\/",eW=new RegExp("["+v$+"]","g"),b$="[^"+v$+"]",JH="[^"+v$.replace("\\.","")+"]",QH=/((?:WC+[\/:])*)/.source.replace("WC",b$),$H=/(WCOD+)?/.source.replace("WCOD",JH),ZH=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",b$),KH=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",b$),WH=new RegExp("^"+QH+$H+ZH+KH+"$"),HH=["material","materials","bones","map"];class TK{constructor(J,Q,$){let Z=$||FJ.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,K=$.length;Z!==K;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class FJ{constructor(J,Q,$){this.path=Q,this.parsedPath=$||FJ.parseTrackName(Q),this.node=FJ.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new FJ(J,Q,$);else return new FJ.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(eW,"")}static parseTrackName(J){let Q=WH.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let K=$.nodeName.substring(Z+1);if(HH.indexOf(K)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=K}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(K){for(let W=0;W<K.length;W++){let H=K[W];if(H.name===Q||H.uuid===Q)return H;let Y=$(H.children);if(Y)return Y}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,K=Q.propertyIndex;if(!J)J=FJ.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){d0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let X=Q.objectIndex;switch($){case"materials":if(!J.material){s0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){s0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){s0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===X){X=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){s0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){s0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){s0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(X!==void 0){if(J[X]===void 0){s0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[X]}}let W=J[Z];if(W===void 0){let X=Q.nodeName;s0("PropertyBinding: Trying to update property for track: "+X+"."+Z+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(K!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){s0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){s0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[K]!==void 0)K=J.morphTargetDictionary[K]}Y=this.BindingType.ArrayElement,this.resolvedProperty=W,this.propertyIndex=K}else if(W.fromArray!==void 0&&W.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=W;else if(Array.isArray(W))Y=this.BindingType.EntireArray,this.resolvedProperty=W;else this.propertyName=Z;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}FJ.Composite=TK;FJ.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};FJ.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};FJ.prototype.GetterByBindingType=[FJ.prototype._getValue_direct,FJ.prototype._getValue_array,FJ.prototype._getValue_arrayElement,FJ.prototype._getValue_toArray];FJ.prototype.SetterByBindingTypeAndVersioning=[[FJ.prototype._setValue_direct,FJ.prototype._setValue_direct_setNeedsUpdate,FJ.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[FJ.prototype._setValue_array,FJ.prototype._setValue_array_setNeedsUpdate,FJ.prototype._setValue_array_setMatrixWorldNeedsUpdate],[FJ.prototype._setValue_arrayElement,FJ.prototype._setValue_arrayElement_setNeedsUpdate,FJ.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[FJ.prototype._setValue_fromArray,FJ.prototype._setValue_fromArray_setNeedsUpdate,FJ.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var tG=new Float32Array(1);class f6{constructor(J=!0){this.autoStart=J,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,d0("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let J=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let Q=performance.now();J=(Q-this.oldTime)/1000,this.oldTime=Q,this.elapsedTime+=J}return J}}class h${static{h$.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let K=this.elements;return K[0]=J,K[2]=Q,K[1]=$,K[3]=Z,this}}function x$(J,Q,$,Z){let K=YH(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/K.components*K.byteLength;case 1029:return J*Q/K.components*K.byteLength;case 1030:return J*Q*2/K.components*K.byteLength;case 1031:return J*Q*2/K.components*K.byteLength;case 1022:return J*Q*3/K.components*K.byteLength;case 1023:return J*Q*4/K.components*K.byteLength;case 1033:return J*Q*4/K.components*K.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function YH(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)d0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";function tK(){let J=null,Q=!1,$=null,Z=null;function K(W,H){Z=J.requestAnimationFrame(K),$(W,H)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(K),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(W){$=W},setContext:function(W){J=W}}}function XH(J){let Q=new WeakMap;function $(Y,X){let{array:U,usage:N}=Y,q=U.byteLength,G=J.createBuffer();J.bindBuffer(X,G),J.bufferData(X,U,N),Y.onUploadCallback();let D;if(U instanceof Float32Array)D=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)D=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(Y.isFloat16BufferAttribute)D=J.HALF_FLOAT;else D=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)D=J.SHORT;else if(U instanceof Uint32Array)D=J.UNSIGNED_INT;else if(U instanceof Int32Array)D=J.INT;else if(U instanceof Int8Array)D=J.BYTE;else if(U instanceof Uint8Array)D=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)D=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:G,type:D,bytesPerElement:U.BYTES_PER_ELEMENT,version:Y.version,size:q}}function Z(Y,X,U){let{array:N,updateRanges:q}=X;if(J.bindBuffer(U,Y),q.length===0)J.bufferSubData(U,0,N);else{q.sort((D,V)=>D.start-V.start);let G=0;for(let D=1;D<q.length;D++){let V=q[G],z=q[D];if(z.start<=V.start+V.count+1)V.count=Math.max(V.count,z.start+z.count-V.start);else++G,q[G]=z}q.length=G+1;for(let D=0,V=q.length;D<V;D++){let z=q[D];J.bufferSubData(U,z.start*N.BYTES_PER_ELEMENT,N,z.start,z.count)}X.clearUpdateRanges()}X.onUploadCallback()}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function W(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let X=Q.get(Y);if(X)J.deleteBuffer(X.buffer),Q.delete(Y)}function H(Y,X){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let N=Q.get(Y);if(!N||N.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let U=Q.get(Y);if(U===void 0)Q.set(Y,$(Y,X));else if(U.version<Y.version){if(U.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(U.buffer,Y,X),U.version=Y.version}}return{get:K,remove:W,update:H}}var UH=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,GH=`#ifdef USE_ALPHAHASH
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
#endif`,NH=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,EH=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qH=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,FH=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,DH=`#ifdef USE_AOMAP
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
#endif`,OH=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,RH=`#ifdef USE_BATCHING
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
#endif`,MH=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,LH=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,VH=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kH=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,BH=`#ifdef USE_IRIDESCENCE
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
#endif`,IH=`#ifdef USE_BUMPMAP
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
#endif`,zH=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,AH=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_H=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,CH=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,PH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,wH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,TH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,SH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,jH=`#define PI 3.141592653589793
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
} // validated`,yH=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,fH=`vec3 transformedNormal = objectNormal;
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
#endif`,vH=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bH=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hH=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xH=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gH="gl_FragColor = linearToOutputTexel( gl_FragColor );",pH=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mH=`#ifdef USE_ENVMAP
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
#endif`,lH=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,dH=`#ifdef USE_ENVMAP
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
#endif`,uH=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cH=`#ifdef USE_ENVMAP
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
#endif`,nH=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sH=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,iH=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,oH=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,aH=`#ifdef USE_GRADIENTMAP
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
}`,rH=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tH=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,eH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,JY=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,QY=`#ifdef USE_ENVMAP
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
#endif`,$Y=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ZY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,KY=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,WY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,HY=`PhysicalMaterial material;
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
#endif`,YY=`uniform sampler2D dfgLUT;
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
}`,XY=`
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
#endif`,UY=`#if defined( RE_IndirectDiffuse )
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
#endif`,GY=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,NY=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,EY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,FY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,DY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,OY=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,RY=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,MY=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,LY=`#if defined( USE_POINTS_UV )
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
#endif`,VY=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kY=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,BY=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,IY=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zY=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,AY=`#ifdef USE_MORPHTARGETS
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
#endif`,_Y=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,CY=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,PY=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,wY=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,TY=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SY=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,jY=`#ifdef USE_NORMALMAP
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
#endif`,yY=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fY=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vY=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bY=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hY=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xY=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gY=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pY=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mY=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lY=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dY=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uY=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cY=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nY=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sY=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,iY=`float getShadowMask() {
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
}`,oY=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,aY=`#ifdef USE_SKINNING
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
#endif`,rY=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tY=`#ifdef USE_SKINNING
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
#endif`,eY=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,JX=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,QX=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$X=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ZX=`#ifdef USE_TRANSMISSION
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
#endif`,KX=`#ifdef USE_TRANSMISSION
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
#endif`,WX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,HX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,YX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,XX=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,UX=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,GX=`uniform sampler2D t2D;
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
}`,NX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,EX=`#ifdef ENVMAP_TYPE_CUBE
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
}`,qX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,FX=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DX=`#include <common>
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
}`,OX=`#if DEPTH_PACKING == 3200
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
}`,RX=`#define DISTANCE
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
}`,MX=`#define DISTANCE
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
}`,LX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,VX=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kX=`uniform float scale;
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
}`,BX=`uniform vec3 diffuse;
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
}`,IX=`#include <common>
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
}`,zX=`uniform vec3 diffuse;
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
}`,AX=`#define LAMBERT
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
}`,_X=`#define LAMBERT
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
}`,CX=`#define MATCAP
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
}`,PX=`#define MATCAP
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
}`,wX=`#define NORMAL
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
}`,TX=`#define NORMAL
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
}`,SX=`#define PHONG
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
}`,jX=`#define PHONG
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
}`,yX=`#define STANDARD
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
}`,fX=`#define STANDARD
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
}`,vX=`#define TOON
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
}`,bX=`#define TOON
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
}`,hX=`uniform float size;
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
}`,xX=`uniform vec3 diffuse;
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
}`,gX=`#include <common>
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
}`,pX=`uniform vec3 color;
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
}`,mX=`uniform float rotation;
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
}`,lX=`uniform vec3 diffuse;
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
}`,QJ={alphahash_fragment:UH,alphahash_pars_fragment:GH,alphamap_fragment:NH,alphamap_pars_fragment:EH,alphatest_fragment:qH,alphatest_pars_fragment:FH,aomap_fragment:DH,aomap_pars_fragment:OH,batching_pars_vertex:RH,batching_vertex:MH,begin_vertex:LH,beginnormal_vertex:VH,bsdfs:kH,iridescence_fragment:BH,bumpmap_pars_fragment:IH,clipping_planes_fragment:zH,clipping_planes_pars_fragment:AH,clipping_planes_pars_vertex:_H,clipping_planes_vertex:CH,color_fragment:PH,color_pars_fragment:wH,color_pars_vertex:TH,color_vertex:SH,common:jH,cube_uv_reflection_fragment:yH,defaultnormal_vertex:fH,displacementmap_pars_vertex:vH,displacementmap_vertex:bH,emissivemap_fragment:hH,emissivemap_pars_fragment:xH,colorspace_fragment:gH,colorspace_pars_fragment:pH,envmap_fragment:mH,envmap_common_pars_fragment:lH,envmap_pars_fragment:dH,envmap_pars_vertex:uH,envmap_physical_pars_fragment:QY,envmap_vertex:cH,fog_vertex:nH,fog_pars_vertex:sH,fog_fragment:iH,fog_pars_fragment:oH,gradientmap_pars_fragment:aH,lightmap_pars_fragment:rH,lights_lambert_fragment:tH,lights_lambert_pars_fragment:eH,lights_pars_begin:JY,lights_toon_fragment:$Y,lights_toon_pars_fragment:ZY,lights_phong_fragment:KY,lights_phong_pars_fragment:WY,lights_physical_fragment:HY,lights_physical_pars_fragment:YY,lights_fragment_begin:XY,lights_fragment_maps:UY,lights_fragment_end:GY,lightprobes_pars_fragment:NY,logdepthbuf_fragment:EY,logdepthbuf_pars_fragment:qY,logdepthbuf_pars_vertex:FY,logdepthbuf_vertex:DY,map_fragment:OY,map_pars_fragment:RY,map_particle_fragment:MY,map_particle_pars_fragment:LY,metalnessmap_fragment:VY,metalnessmap_pars_fragment:kY,morphinstance_vertex:BY,morphcolor_vertex:IY,morphnormal_vertex:zY,morphtarget_pars_vertex:AY,morphtarget_vertex:_Y,normal_fragment_begin:CY,normal_fragment_maps:PY,normal_pars_fragment:wY,normal_pars_vertex:TY,normal_vertex:SY,normalmap_pars_fragment:jY,clearcoat_normal_fragment_begin:yY,clearcoat_normal_fragment_maps:fY,clearcoat_pars_fragment:vY,iridescence_pars_fragment:bY,opaque_fragment:hY,packing:xY,premultiplied_alpha_fragment:gY,project_vertex:pY,dithering_fragment:mY,dithering_pars_fragment:lY,roughnessmap_fragment:dY,roughnessmap_pars_fragment:uY,shadowmap_pars_fragment:cY,shadowmap_pars_vertex:nY,shadowmap_vertex:sY,shadowmask_pars_fragment:iY,skinbase_vertex:oY,skinning_pars_vertex:aY,skinning_vertex:rY,skinnormal_vertex:tY,specularmap_fragment:eY,specularmap_pars_fragment:JX,tonemapping_fragment:QX,tonemapping_pars_fragment:$X,transmission_fragment:ZX,transmission_pars_fragment:KX,uv_pars_fragment:WX,uv_pars_vertex:HX,uv_vertex:YX,worldpos_vertex:XX,background_vert:UX,background_frag:GX,backgroundCube_vert:NX,backgroundCube_frag:EX,cube_vert:qX,cube_frag:FX,depth_vert:DX,depth_frag:OX,distance_vert:RX,distance_frag:MX,equirect_vert:LX,equirect_frag:VX,linedashed_vert:kX,linedashed_frag:BX,meshbasic_vert:IX,meshbasic_frag:zX,meshlambert_vert:AX,meshlambert_frag:_X,meshmatcap_vert:CX,meshmatcap_frag:PX,meshnormal_vert:wX,meshnormal_frag:TX,meshphong_vert:SX,meshphong_frag:jX,meshphysical_vert:yX,meshphysical_frag:fX,meshtoon_vert:vX,meshtoon_frag:bX,points_vert:hX,points_frag:xX,shadow_vert:gX,shadow_frag:pX,sprite_vert:mX,sprite_frag:lX},_0={common:{diffuse:{value:new e0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new r0},alphaMap:{value:null},alphaMapTransform:{value:new r0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new r0}},envmap:{envMap:{value:null},envMapRotation:{value:new r0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new r0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new r0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new r0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new r0},normalScale:{value:new t0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new r0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new r0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new r0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new r0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new e0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new x},probesMax:{value:new x},probesResolution:{value:new x}},points:{diffuse:{value:new e0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new r0},alphaTest:{value:0},uvTransform:{value:new r0}},sprite:{diffuse:{value:new e0(16777215)},opacity:{value:1},center:{value:new t0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new r0},alphaMap:{value:null},alphaMapTransform:{value:new r0},alphaTest:{value:0}}},A9={basic:{uniforms:lJ([_0.common,_0.specularmap,_0.envmap,_0.aomap,_0.lightmap,_0.fog]),vertexShader:QJ.meshbasic_vert,fragmentShader:QJ.meshbasic_frag},lambert:{uniforms:lJ([_0.common,_0.specularmap,_0.envmap,_0.aomap,_0.lightmap,_0.emissivemap,_0.bumpmap,_0.normalmap,_0.displacementmap,_0.fog,_0.lights,{emissive:{value:new e0(0)},envMapIntensity:{value:1}}]),vertexShader:QJ.meshlambert_vert,fragmentShader:QJ.meshlambert_frag},phong:{uniforms:lJ([_0.common,_0.specularmap,_0.envmap,_0.aomap,_0.lightmap,_0.emissivemap,_0.bumpmap,_0.normalmap,_0.displacementmap,_0.fog,_0.lights,{emissive:{value:new e0(0)},specular:{value:new e0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:QJ.meshphong_vert,fragmentShader:QJ.meshphong_frag},standard:{uniforms:lJ([_0.common,_0.envmap,_0.aomap,_0.lightmap,_0.emissivemap,_0.bumpmap,_0.normalmap,_0.displacementmap,_0.roughnessmap,_0.metalnessmap,_0.fog,_0.lights,{emissive:{value:new e0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:QJ.meshphysical_vert,fragmentShader:QJ.meshphysical_frag},toon:{uniforms:lJ([_0.common,_0.aomap,_0.lightmap,_0.emissivemap,_0.bumpmap,_0.normalmap,_0.displacementmap,_0.gradientmap,_0.fog,_0.lights,{emissive:{value:new e0(0)}}]),vertexShader:QJ.meshtoon_vert,fragmentShader:QJ.meshtoon_frag},matcap:{uniforms:lJ([_0.common,_0.bumpmap,_0.normalmap,_0.displacementmap,_0.fog,{matcap:{value:null}}]),vertexShader:QJ.meshmatcap_vert,fragmentShader:QJ.meshmatcap_frag},points:{uniforms:lJ([_0.points,_0.fog]),vertexShader:QJ.points_vert,fragmentShader:QJ.points_frag},dashed:{uniforms:lJ([_0.common,_0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:QJ.linedashed_vert,fragmentShader:QJ.linedashed_frag},depth:{uniforms:lJ([_0.common,_0.displacementmap]),vertexShader:QJ.depth_vert,fragmentShader:QJ.depth_frag},normal:{uniforms:lJ([_0.common,_0.bumpmap,_0.normalmap,_0.displacementmap,{opacity:{value:1}}]),vertexShader:QJ.meshnormal_vert,fragmentShader:QJ.meshnormal_frag},sprite:{uniforms:lJ([_0.sprite,_0.fog]),vertexShader:QJ.sprite_vert,fragmentShader:QJ.sprite_frag},background:{uniforms:{uvTransform:{value:new r0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:QJ.background_vert,fragmentShader:QJ.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new r0}},vertexShader:QJ.backgroundCube_vert,fragmentShader:QJ.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:QJ.cube_vert,fragmentShader:QJ.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:QJ.equirect_vert,fragmentShader:QJ.equirect_frag},distance:{uniforms:lJ([_0.common,_0.displacementmap,{referencePosition:{value:new x},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:QJ.distance_vert,fragmentShader:QJ.distance_frag},shadow:{uniforms:lJ([_0.lights,_0.fog,{color:{value:new e0(0)},opacity:{value:1}}]),vertexShader:QJ.shadow_vert,fragmentShader:QJ.shadow_frag}};A9.physical={uniforms:lJ([A9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new r0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new r0},clearcoatNormalScale:{value:new t0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new r0},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new r0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new r0},sheen:{value:0},sheenColor:{value:new e0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new r0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new r0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new r0},transmissionSamplerSize:{value:new t0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new r0},attenuationDistance:{value:0},attenuationColor:{value:new e0(0)},specularColor:{value:new e0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new r0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new r0},anisotropyVector:{value:new t0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new r0}}]),vertexShader:QJ.meshphysical_vert,fragmentShader:QJ.meshphysical_frag};var v6={r:0,b:0,g:0},dX=new BJ,eK=new r0;eK.set(-1,0,0,0,1,0,0,0,1);function uX(J,Q,$,Z,K,W){let H=new e0(0),Y=K===!0?0:1,X,U,N=null,q=0,G=null;function D(C){let j=C.isScene===!0?C.background:null;if(j&&j.isTexture){let k=C.backgroundBlurriness>0;j=Q.get(j,k)}return j}function V(C){let j=!1,k=D(C);if(k===null)F(H,Y);else if(k&&k.isColor)F(k,1),j=!0;let I=J.xr.getEnvironmentBlendMode();if(I==="additive")$.buffers.color.setClear(0,0,0,1,W);else if(I==="alpha-blend")$.buffers.color.setClear(0,0,0,0,W);if(J.autoClear||j)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function z(C,j){let k=D(j);if(k&&(k.isCubeTexture||k.mapping===q7)){if(U===void 0)U=new x0(new AJ(1,1,1),new X9({name:"BackgroundCubeMaterial",uniforms:E8(A9.backgroundCube.uniforms),vertexShader:A9.backgroundCube.vertexShader,fragmentShader:A9.backgroundCube.fragmentShader,side:pJ,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(I,_,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(U);if(U.material.uniforms.envMap.value=k,U.material.uniforms.backgroundBlurriness.value=j.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=j.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(dX.makeRotationFromEuler(j.backgroundRotation)).transpose(),k.isCubeTexture&&k.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(eK);if(U.material.toneMapped=HJ.getTransfer(k.colorSpace)!==LJ,N!==k||q!==k.version||G!==J.toneMapping)U.material.needsUpdate=!0,N=k,q=k.version,G=J.toneMapping;U.layers.enableAll(),C.unshift(U,U.geometry,U.material,0,0,null)}else if(k&&k.isTexture){if(X===void 0)X=new x0(new I9(2,2),new X9({name:"BackgroundMaterial",uniforms:E8(A9.background.uniforms),vertexShader:A9.background.vertexShader,fragmentShader:A9.background.fragmentShader,side:l8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),Object.defineProperty(X.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(X);if(X.material.uniforms.t2D.value=k,X.material.uniforms.backgroundIntensity.value=j.backgroundIntensity,X.material.toneMapped=HJ.getTransfer(k.colorSpace)!==LJ,k.matrixAutoUpdate===!0)k.updateMatrix();if(X.material.uniforms.uvTransform.value.copy(k.matrix),N!==k||q!==k.version||G!==J.toneMapping)X.material.needsUpdate=!0,N=k,q=k.version,G=J.toneMapping;X.layers.enableAll(),C.unshift(X,X.geometry,X.material,0,0,null)}}function F(C,j){C.getRGB(v6,M$(J)),$.buffers.color.setClear(v6.r,v6.g,v6.b,j,W)}function E(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0}return{getClearColor:function(){return H},setClearColor:function(C,j=1){H.set(C),Y=j,F(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(C){Y=C,F(H,Y)},render:V,addToRenderList:z,dispose:E}}function cX(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},K=G(null),W=K,H=!1;function Y(v,b,t,y,s){let J0=!1,u=q(v,y,t,b);if(W!==u)W=u,U(W.object);if(J0=D(v,y,t,s),J0)V(v,y,t,s);if(s!==null)Q.update(s,J.ELEMENT_ARRAY_BUFFER);if(J0||H){if(H=!1,k(v,b,t,y),s!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(s).buffer)}}function X(){return J.createVertexArray()}function U(v){return J.bindVertexArray(v)}function N(v){return J.deleteVertexArray(v)}function q(v,b,t,y){let s=y.wireframe===!0,J0=Z[b.id];if(J0===void 0)J0={},Z[b.id]=J0;let u=v.isInstancedMesh===!0?v.id:0,G0=J0[u];if(G0===void 0)G0={},J0[u]=G0;let a=G0[t.id];if(a===void 0)a={},G0[t.id]=a;let Q0=a[s];if(Q0===void 0)Q0=G(X()),a[s]=Q0;return Q0}function G(v){let b=[],t=[],y=[];for(let s=0;s<$;s++)b[s]=0,t[s]=0,y[s]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:t,attributeDivisors:y,object:v,attributes:{},index:null}}function D(v,b,t,y){let s=W.attributes,J0=b.attributes,u=0,G0=t.getAttributes();for(let a in G0)if(G0[a].location>=0){let W0=s[a],u0=J0[a];if(u0===void 0){if(a==="instanceMatrix"&&v.instanceMatrix)u0=v.instanceMatrix;if(a==="instanceColor"&&v.instanceColor)u0=v.instanceColor}if(W0===void 0)return!0;if(W0.attribute!==u0)return!0;if(u0&&W0.data!==u0.data)return!0;u++}if(W.attributesNum!==u)return!0;if(W.index!==y)return!0;return!1}function V(v,b,t,y){let s={},J0=b.attributes,u=0,G0=t.getAttributes();for(let a in G0)if(G0[a].location>=0){let W0=J0[a];if(W0===void 0){if(a==="instanceMatrix"&&v.instanceMatrix)W0=v.instanceMatrix;if(a==="instanceColor"&&v.instanceColor)W0=v.instanceColor}let u0={};if(u0.attribute=W0,W0&&W0.data)u0.data=W0.data;s[a]=u0,u++}W.attributes=s,W.attributesNum=u,W.index=y}function z(){let v=W.newAttributes;for(let b=0,t=v.length;b<t;b++)v[b]=0}function F(v){E(v,0)}function E(v,b){let{newAttributes:t,enabledAttributes:y,attributeDivisors:s}=W;if(t[v]=1,y[v]===0)J.enableVertexAttribArray(v),y[v]=1;if(s[v]!==b)J.vertexAttribDivisor(v,b),s[v]=b}function C(){let{newAttributes:v,enabledAttributes:b}=W;for(let t=0,y=b.length;t<y;t++)if(b[t]!==v[t])J.disableVertexAttribArray(t),b[t]=0}function j(v,b,t,y,s,J0,u){if(u===!0)J.vertexAttribIPointer(v,b,t,s,J0);else J.vertexAttribPointer(v,b,t,y,s,J0)}function k(v,b,t,y){z();let s=y.attributes,J0=t.getAttributes(),u=b.defaultAttributeValues;for(let G0 in J0){let a=J0[G0];if(a.location>=0){let Q0=s[G0];if(Q0===void 0){if(G0==="instanceMatrix"&&v.instanceMatrix)Q0=v.instanceMatrix;if(G0==="instanceColor"&&v.instanceColor)Q0=v.instanceColor}if(Q0!==void 0){let{normalized:W0,itemSize:u0}=Q0,l0=Q.get(Q0);if(l0===void 0)continue;let{buffer:EJ,type:$J,bytesPerElement:A}=l0,h=$J===J.INT||$J===J.UNSIGNED_INT||Q0.gpuType===IQ;if(Q0.isInterleavedBufferAttribute){let p=Q0.data,n=p.stride,$0=Q0.offset;if(p.isInstancedInterleavedBuffer){for(let K0=0;K0<a.locationSize;K0++)E(a.location+K0,p.meshPerAttribute);if(v.isInstancedMesh!==!0&&y._maxInstanceCount===void 0)y._maxInstanceCount=p.meshPerAttribute*p.count}else for(let K0=0;K0<a.locationSize;K0++)F(a.location+K0);J.bindBuffer(J.ARRAY_BUFFER,EJ);for(let K0=0;K0<a.locationSize;K0++)j(a.location+K0,u0/a.locationSize,$J,W0,n*A,($0+u0/a.locationSize*K0)*A,h)}else{if(Q0.isInstancedBufferAttribute){for(let p=0;p<a.locationSize;p++)E(a.location+p,Q0.meshPerAttribute);if(v.isInstancedMesh!==!0&&y._maxInstanceCount===void 0)y._maxInstanceCount=Q0.meshPerAttribute*Q0.count}else for(let p=0;p<a.locationSize;p++)F(a.location+p);J.bindBuffer(J.ARRAY_BUFFER,EJ);for(let p=0;p<a.locationSize;p++)j(a.location+p,u0/a.locationSize,$J,W0,u0*A,u0/a.locationSize*p*A,h)}}else if(u!==void 0){let W0=u[G0];if(W0!==void 0)switch(W0.length){case 2:J.vertexAttrib2fv(a.location,W0);break;case 3:J.vertexAttrib3fv(a.location,W0);break;case 4:J.vertexAttrib4fv(a.location,W0);break;default:J.vertexAttrib1fv(a.location,W0)}}}}C()}function I(){B();for(let v in Z){let b=Z[v];for(let t in b){let y=b[t];for(let s in y){let J0=y[s];for(let u in J0)N(J0[u].object),delete J0[u];delete y[s]}}delete Z[v]}}function _(v){if(Z[v.id]===void 0)return;let b=Z[v.id];for(let t in b){let y=b[t];for(let s in y){let J0=y[s];for(let u in J0)N(J0[u].object),delete J0[u];delete y[s]}}delete Z[v.id]}function P(v){for(let b in Z){let t=Z[b];for(let y in t){let s=t[y];if(s[v.id]===void 0)continue;let J0=s[v.id];for(let u in J0)N(J0[u].object),delete J0[u];delete s[v.id]}}}function M(v){for(let b in Z){let t=Z[b],y=v.isInstancedMesh===!0?v.id:0,s=t[y];if(s===void 0)continue;for(let J0 in s){let u=s[J0];for(let G0 in u)N(u[G0].object),delete u[G0];delete s[J0]}if(delete t[y],Object.keys(t).length===0)delete Z[b]}}function B(){if(c(),H=!0,W===K)return;W=K,U(W.object)}function c(){K.geometry=null,K.program=null,K.wireframe=!1}return{setup:Y,reset:B,resetDefaultState:c,dispose:I,releaseStatesOfGeometry:_,releaseStatesOfObject:M,releaseStatesOfProgram:P,initAttributes:z,enableAttribute:F,disableUnusedAttributes:C}}function nX(J,Q,$){let Z;function K(X){Z=X}function W(X,U){J.drawArrays(Z,X,U),$.update(U,Z,1)}function H(X,U,N){if(N===0)return;J.drawArraysInstanced(Z,X,U,N),$.update(U,Z,N)}function Y(X,U,N){if(N===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,X,0,U,0,N);let G=0;for(let D=0;D<N;D++)G+=U[D];$.update(G,Z,1)}this.setMode=K,this.render=W,this.renderInstances=H,this.renderMultiDraw=Y}function sX(J,Q,$,Z){let K;function W(){if(K!==void 0)return K;if(Q.has("EXT_texture_filter_anisotropic")===!0){let P=Q.get("EXT_texture_filter_anisotropic");K=J.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else K=0;return K}function H(P){if(P!==B9&&Z.convert(P)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(P){let M=P===k9&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(P!==D9&&P!==v9&&!M&&Z.convert(P)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE))return!1;return!0}function X(P){if(P==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";P="mediump"}if(P==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",N=X(U);if(N!==U)d0("WebGLRenderer:",U,"not supported, using",N,"instead."),U=N;let q=$.logarithmicDepthBuffer===!0,G=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&G===!1)d0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let D=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),V=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),z=J.getParameter(J.MAX_TEXTURE_SIZE),F=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),E=J.getParameter(J.MAX_VERTEX_ATTRIBS),C=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),j=J.getParameter(J.MAX_VARYING_VECTORS),k=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),I=J.getParameter(J.MAX_SAMPLES),_=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:W,getMaxPrecision:X,textureFormatReadable:H,textureTypeReadable:Y,precision:U,logarithmicDepthBuffer:q,reversedDepthBuffer:G,maxTextures:D,maxVertexTextures:V,maxTextureSize:z,maxCubemapSize:F,maxAttributes:E,maxVertexUniforms:C,maxVaryings:j,maxFragmentUniforms:k,maxSamples:I,samples:_}}function iX(J){let Q=this,$=null,Z=0,K=!1,W=!1,H=new L9,Y=new r0,X={value:null,needsUpdate:!1};this.uniform=X,this.numPlanes=0,this.numIntersection=0,this.init=function(q,G){let D=q.length!==0||G||Z!==0||K;return K=G,Z=q.length,D},this.beginShadows=function(){W=!0,N(null)},this.endShadows=function(){W=!1},this.setGlobalState=function(q,G){$=N(q,G,0)},this.setState=function(q,G,D){let{clippingPlanes:V,clipIntersection:z,clipShadows:F}=q,E=J.get(q);if(!K||V===null||V.length===0||W&&!F)if(W)N(null);else U();else{let C=W?0:Z,j=C*4,k=E.clippingState||null;X.value=k,k=N(V,G,j,D);for(let I=0;I!==j;++I)k[I]=$[I];E.clippingState=k,this.numIntersection=z?this.numPlanes:0,this.numPlanes+=C}};function U(){if(X.value!==$)X.value=$,X.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function N(q,G,D,V){let z=q!==null?q.length:0,F=null;if(z!==0){if(F=X.value,V!==!0||F===null){let E=D+z*4,C=G.matrixWorldInverse;if(Y.getNormalMatrix(C),F===null||F.length<E)F=new Float32Array(E);for(let j=0,k=D;j!==z;++j,k+=4)H.copy(q[j]).applyMatrix4(C,Y),H.normal.toArray(F,k),F[k+3]=H.constant}X.value=F,X.needsUpdate=!0}return Q.numPlanes=z,Q.numIntersection=0,F}}var o8=4,oX=6,aX=20,rX=256,z7=new I7,SK=new e0,g$=null,p$=0,m$=0,l$=!1,tX=new x,O8=new x;class c${constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,K={}){let{size:W=256,position:H=tX}=K;g$=this._renderer.getRenderTarget(),p$=this._renderer.getActiveCubeFace(),m$=this._renderer.getActiveMipmapLevel(),l$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(W);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,Y,H),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=fK(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=yK(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(g$,p$,m$),this._renderer.xr.enabled=l$,J.scissorTest=!1,i8(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===u8||J.mapping===Z8)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);g$=this._renderer.getRenderTarget(),p$=this._renderer.getActiveCubeFace(),m$=this._renderer.getActiveMipmapLevel(),l$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:iJ,minFilter:iJ,generateMipmaps:!1,type:k9,format:B9,colorSpace:H$,depthBuffer:!1},Z=jK(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=jK(J,Q,$);let{_lodMax:K}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=eX(K)),this._blurMaterial=QU(K,J,Q),this._ggxMaterial=JU(K,J,Q)}return Z}_compileMaterial(J){let Q=new x0(new mJ,J);this._renderer.compile(Q,z7)}_sceneToCubeUV(J,Q,$,Z,K){let Y=new nJ(90,1,Q,$),X=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],N=this._renderer,q=N.autoClear,G=N.toneMapping;if(N.getClearColor(SK),N.toneMapping=F9,N.autoClear=!1,N.state.buffers.depth.getReversed())N.setRenderTarget(Z),N.clearDepth(),N.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new x0(new AJ,new a9({name:"PMREM.Background",side:pJ,depthWrite:!1,depthTest:!1}));let V=this._backgroundBox,z=V.material,F=!1,E=J.background;if(E){if(E.isColor)z.color.copy(E),J.background=null,F=!0}else z.color.copy(SK),F=!0;for(let C=0;C<6;C++){let j=C%3;if(j===0)Y.up.set(0,X[C],0),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x+U[C],K.y,K.z);else if(j===1)Y.up.set(0,0,X[C]),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x,K.y+U[C],K.z);else Y.up.set(0,X[C],0),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x,K.y,K.z+U[C]);let k=this._cubeSize;if(i8(Z,j*k,C>2?k:0,k,k),N.setRenderTarget(Z),F)N.render(V,Y);N.render(J,Y)}N.toneMapping=G,N.autoClear=q,J.background=E}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===u8||J.mapping===Z8;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=fK();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=yK();let K=Z?this._cubemapMaterial:this._equirectMaterial,W=this._lodMeshes[0];W.material=K;let H=K.uniforms;H.envMap.value=J;let Y=this._cubeSize;i8(Q,0,0,3*Y,2*Y),$.setRenderTarget(Q),$.render(W,z7)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let K=1;K<Z;K++)this._applyGGXFilter(J,K-1,K);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,K=this._pingPongRenderTarget,W=this._ggxMaterial,H=this._lodMeshes[$];H.material=W;let Y=W.uniforms,X=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),N=Math.sqrt(X*X-U*U),q=X*1.25,G=N*q,{_lodMax:D}=this,V=this._sizeLods[$],z=3*V*($>D-o8?$-D+o8:0),F=4*(this._cubeSize-V);Y.envMap.value=J.texture,Y.roughness.value=G,Y.mipInt.value=D-Q,i8(K,z,F,3*V,2*V),Z.setRenderTarget(K),Z.render(H,z7),Y.envMap.value=K.texture,Y.roughness.value=0,Y.mipInt.value=D-$,i8(J,z,F,3*V,2*V),Z.setRenderTarget(J),Z.render(H,z7)}_blur(J,Q,$,Z){let K=this._pingPongRenderTarget,W=Math.min(Z,Math.PI)/Math.SQRT2;this._blurPass(J,K,Q,$,W),this._blurPass(K,J,$,$,W)}_blurPass(J,Q,$,Z,K){let W=this._renderer,H=this._blurMaterial,Y=this._lodMeshes[Z];Y.material=H;let X=H.uniforms;X.envMap.value=J.texture,X.sigma.value=K,X.mipInt.value=this._lodMax-$;let U=this._sizeLods[Z],N=3*U*(Z>this._lodMax-o8?Z-this._lodMax+o8:0),q=4*(this._cubeSize-U);i8(Q,N,q,3*U,2*U),W.setRenderTarget(Q),W.render(Y,z7)}}function eX(J){let Q=[],$=[],Z=J,K=J-o8+1+oX;for(let W=0;W<K;W++){let H=Math.pow(2,Z);Q.push(H);let Y=1/(H-2),X=-Y,U=1+Y,N=[X,X,U,X,U,U,X,X,U,U,X,U],q=6,G=6,D=3,V=new Float32Array(D*G*q),z=new Float32Array(D*G*q);for(let E=0;E<q;E++){let C=E%3*2/3-1,j=E>2?0:-1,k=[C,j,0,C+0.6666666666666666,j,0,C+0.6666666666666666,j+1,0,C,j,0,C+0.6666666666666666,j+1,0,C,j+1,0];V.set(k,D*G*E);for(let I=0;I<G;I++){let _=N[I*2]*2-1,P=N[I*2+1]*2-1;if(E===0)O8.set(1,P,_);else if(E===1)O8.set(-_,1,-P);else if(E===2)O8.set(-_,P,1);else if(E===3)O8.set(-1,P,-_);else if(E===4)O8.set(-_,-1,P);else O8.set(_,P,-1);O8.toArray(z,(E*G+I)*D)}}let F=new mJ;if(F.setAttribute("position",new H9(V,D)),F.setAttribute("outputDirection",new H9(z,D)),$.push(new x0(F,null)),Z>o8)Z--}return{lodMeshes:$,sizeLods:Q}}function jK(J,Q,$){let Z=new J9(J,Q,$);return Z.texture.mapping=q7,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function i8(J,Q,$,Z,K){J.viewport.set(Q,$,Z,K),J.scissor.set(Q,$,Z,K)}function JU(J,Q,$){return new X9({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:rX,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:h6(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:V9,depthTest:!1,depthWrite:!1})}function QU(J,Q,$){return new X9({name:"SphericalGaussianBlur",defines:{SAMPLES:aX,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:h6(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:V9,depthTest:!1,depthWrite:!1})}function yK(){return new X9({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:h6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:V9,depthTest:!1,depthWrite:!1})}function fK(){return new X9({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:h6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:V9,depthTest:!1,depthWrite:!1})}function h6(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class i$ extends J9{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new _6(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},Z=new AJ(5,5,5),K=new X9({name:"CubemapFromEquirect",uniforms:E8($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:pJ,blending:V9});K.uniforms.tEquirect.value=Q;let W=new x0(Z,K),H=Q.minFilter;if(Q.minFilter===K8)Q.minFilter=iJ;return new y$(1,10,this).update(J,W),Q.minFilter=H,W.geometry.dispose(),W.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let K=J.getRenderTarget();for(let W=0;W<6;W++)J.setRenderTarget(this,W),J.clear(Q,$,Z);J.setRenderTarget(K)}}function $U(J){let Q=new WeakMap,$=new WeakMap,Z=null;function K(G,D=!1){if(G===null||G===void 0)return null;if(D)return H(G);return W(G)}function W(G){if(G&&G.isTexture){let D=G.mapping;if(D===H6||D===Y6)if(Q.has(G)){let V=Q.get(G).texture;return Y(V,G.mapping)}else{let V=G.image;if(V&&V.height>0){let z=new i$(V.height);return z.fromEquirectangularTexture(J,G),Q.set(G,z),G.addEventListener("dispose",U),Y(z.texture,G.mapping)}else return null}}return G}function H(G){if(G&&G.isTexture){let D=G.mapping,V=D===H6||D===Y6,z=D===u8||D===Z8;if(V||z){let F=$.get(G),E=F!==void 0?F.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==E){if(Z===null)Z=new c$(J);return F=V?Z.fromEquirectangular(G,F):Z.fromCubemap(G,F),F.texture.pmremVersion=G.pmremVersion,$.set(G,F),F.texture}else if(F!==void 0)return F.texture;else{let C=G.image;if(V&&C&&C.height>0||z&&C&&X(C)){if(Z===null)Z=new c$(J);return F=V?Z.fromEquirectangular(G):Z.fromCubemap(G),F.texture.pmremVersion=G.pmremVersion,$.set(G,F),G.addEventListener("dispose",N),F.texture}else return null}}}return G}function Y(G,D){if(D===H6)G.mapping=u8;else if(D===Y6)G.mapping=Z8;return G}function X(G){let D=0,V=6;for(let z=0;z<V;z++)if(G[z]!==void 0)D++;return D===V}function U(G){let D=G.target;D.removeEventListener("dispose",U);let V=Q.get(D);if(V!==void 0)Q.delete(D),V.dispose()}function N(G){let D=G.target;D.removeEventListener("dispose",N);let V=$.get(D);if(V!==void 0)$.delete(D),V.dispose()}function q(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:K,dispose:q}}function ZU(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let K=J.getExtension(Z);return Q[Z]=K,K}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let K=$(Z);if(K===null)$8("WebGLRenderer: "+Z+" extension not supported.");return K}}}function KU(J,Q,$,Z){let K={},W=new WeakMap;function H(q){let G=q.target;if(G.index!==null)Q.remove(G.index);for(let V in G.attributes)Q.remove(G.attributes[V]);G.removeEventListener("dispose",H),delete K[G.id];let D=W.get(G);if(D)Q.remove(D),W.delete(G);if(Z.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;$.memory.geometries--}function Y(q,G){if(K[G.id]===!0)return G;return G.addEventListener("dispose",H),K[G.id]=!0,$.memory.geometries++,G}function X(q){let G=q.attributes;for(let D in G)Q.update(G[D],J.ARRAY_BUFFER)}function U(q){let G=[],D=q.index,V=q.attributes.position,z=0;if(V===void 0)return;if(D!==null){let C=D.array;z=D.version;for(let j=0,k=C.length;j<k;j+=3){let I=C[j+0],_=C[j+1],P=C[j+2];G.push(I,_,_,P,P,I)}}else{let C=V.array;z=V.version;for(let j=0,k=C.length/3-1;j<k;j+=3){let I=j+0,_=j+1,P=j+2;G.push(I,_,_,P,P,I)}}let F=new(V.count>=65535?B6:k6)(G,1);F.version=z;let E=W.get(q);if(E)Q.remove(E);W.set(q,F)}function N(q){let G=W.get(q);if(G){let D=q.index;if(D!==null){if(G.version<D.version)U(q)}}else U(q);return W.get(q)}return{get:Y,update:X,getWireframeAttribute:N}}function WU(J,Q,$){let Z;function K(q){Z=q}let W,H;function Y(q){W=q.type,H=q.bytesPerElement}function X(q,G){J.drawElements(Z,G,W,q*H),$.update(G,Z,1)}function U(q,G,D){if(D===0)return;J.drawElementsInstanced(Z,G,W,q*H,D),$.update(G,Z,D)}function N(q,G,D){if(D===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,G,0,W,q,0,D);let z=0;for(let F=0;F<D;F++)z+=G[F];$.update(z,Z,1)}this.setMode=K,this.setIndex=Y,this.render=X,this.renderInstances=U,this.renderMultiDraw=N}function HU(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(W,H,Y){switch($.calls++,H){case J.TRIANGLES:$.triangles+=Y*(W/3);break;case J.LINES:$.lines+=Y*(W/2);break;case J.LINE_STRIP:$.lines+=Y*(W-1);break;case J.LINE_LOOP:$.lines+=Y*W;break;case J.POINTS:$.points+=Y*W;break;default:s0("WebGLInfo: Unknown draw mode:",H);break}}function K(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:K,update:Z}}function YU(J,Q,$){let Z=new WeakMap,K=new IJ;function W(H,Y,X){let U=H.morphTargetInfluences,N=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,q=N!==void 0?N.length:0,G=Z.get(Y);if(G===void 0||G.count!==q){let B=function(){P.dispose(),Z.delete(Y),Y.removeEventListener("dispose",B)};if(G!==void 0)G.texture.dispose();let D=Y.morphAttributes.position!==void 0,V=Y.morphAttributes.normal!==void 0,z=Y.morphAttributes.color!==void 0,F=Y.morphAttributes.position||[],E=Y.morphAttributes.normal||[],C=Y.morphAttributes.color||[],j=0;if(D===!0)j=1;if(V===!0)j=2;if(z===!0)j=3;let k=Y.attributes.position.count*j,I=1;if(k>Q.maxTextureSize)I=Math.ceil(k/Q.maxTextureSize),k=Q.maxTextureSize;let _=new Float32Array(k*I*4*q),P=new M6(_,k,I,q);P.type=v9,P.needsUpdate=!0;let M=j*4;for(let c=0;c<q;c++){let v=F[c],b=E[c],t=C[c],y=k*I*4*c;for(let s=0;s<v.count;s++){let J0=s*M;if(D===!0)K.fromBufferAttribute(v,s),_[y+J0+0]=K.x,_[y+J0+1]=K.y,_[y+J0+2]=K.z,_[y+J0+3]=0;if(V===!0)K.fromBufferAttribute(b,s),_[y+J0+4]=K.x,_[y+J0+5]=K.y,_[y+J0+6]=K.z,_[y+J0+7]=0;if(z===!0)K.fromBufferAttribute(t,s),_[y+J0+8]=K.x,_[y+J0+9]=K.y,_[y+J0+10]=K.z,_[y+J0+11]=t.itemSize===4?K.w:1}}G={count:q,texture:P,size:new t0(k,I)},Z.set(Y,G),Y.addEventListener("dispose",B)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)X.getUniforms().setValue(J,"morphTexture",H.morphTexture,$);else{let D=0;for(let z=0;z<U.length;z++)D+=U[z];let V=Y.morphTargetsRelative?1:1-D;X.getUniforms().setValue(J,"morphTargetBaseInfluence",V),X.getUniforms().setValue(J,"morphTargetInfluences",U)}X.getUniforms().setValue(J,"morphTargetsTexture",G.texture,$),X.getUniforms().setValue(J,"morphTargetsTextureSize",G.size)}return{update:W}}function XU(J,Q,$,Z,K){let W=new WeakMap;function H(U){let N=K.render.frame,q=U.geometry,G=Q.get(U,q);if(W.get(G)!==N)Q.update(G),W.set(G,N);if(U.isInstancedMesh){if(U.hasEventListener("dispose",X)===!1)U.addEventListener("dispose",X);if(W.get(U)!==N){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);W.set(U,N)}}if(U.isSkinnedMesh){let D=U.skeleton;if(W.get(D)!==N)D.update(),W.set(D,N)}return G}function Y(){W=new WeakMap}function X(U){let N=U.target;if(N.removeEventListener("dispose",X),Z.releaseStatesOfObject(N),$.remove(N.instanceMatrix),N.instanceColor!==null)$.remove(N.instanceColor)}return{update:H,dispose:Y}}var UU={[OQ]:"LINEAR_TONE_MAPPING",[RQ]:"REINHARD_TONE_MAPPING",[MQ]:"CINEON_TONE_MAPPING",[LQ]:"ACES_FILMIC_TONE_MAPPING",[kQ]:"AGX_TONE_MAPPING",[BQ]:"NEUTRAL_TONE_MAPPING",[VQ]:"CUSTOM_TONE_MAPPING"};function GU(J,Q,$,Z,K,W){let H=new J9(Q,$,{type:J,depthBuffer:K,stencilBuffer:W,samples:Z?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),Y=null,X=null,U=new mJ;U.setAttribute("position",new zJ([-1,3,0,-1,-1,0,3,-1,0],3)),U.setAttribute("uv",new zJ([0,2,0,0,2,0],2));let N=new L$({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),q=new x0(U,N),G=new I7(-1,1,1,-1,0,1),D=null,V=null,z=!1,F,E=null,C=[],j=!1;this.setSize=function(k,I){if(H.setSize(k,I),Y!==null)Y.setSize(k,I);if(X!==null)X.setSize(k,I);for(let _=0;_<C.length;_++){let P=C[_];if(P.setSize)P.setSize(k,I)}},this.setEffects=function(k){C=k,j=C.length>0&&C[0].isRenderPass===!0;let{width:I,height:_}=H;if(C.length>0&&Y===null)Y=new J9(I,_,{type:k9,depthBuffer:!1,stencilBuffer:!1}),X=new J9(I,_,{type:k9,depthBuffer:!1,stencilBuffer:!1});for(let P=0;P<C.length;P++){let M=C[P];if(M.setSize)M.setSize(I,_)}},this.begin=function(k,I){if(z)return!1;if(k.toneMapping===F9&&C.length===0)return!1;if(E=I,I!==null){let{width:_,height:P}=I;if(H.width!==_||H.height!==P)this.setSize(_,P)}if(j===!1)k.setRenderTarget(H);return F=k.toneMapping,k.toneMapping=F9,!0},this.hasRenderPass=function(){return j},this.end=function(k,I){k.toneMapping=F,z=!0;let _=H,P=Y;for(let M=0;M<C.length;M++){let B=C[M];if(B.enabled===!1)continue;if(B.render(k,P,_,I),B.needsSwap!==!1)_=P,P=P===Y?X:Y}if(D!==k.outputColorSpace||V!==k.toneMapping){if(D=k.outputColorSpace,V=k.toneMapping,N.defines={},HJ.getTransfer(D)===LJ)N.defines.SRGB_TRANSFER="";let M=UU[V];if(M)N.defines[M]="";N.needsUpdate=!0}N.uniforms.tDiffuse.value=_.texture,k.setRenderTarget(E),k.render(q,G),E=null,z=!1},this.isCompositing=function(){return z},this.dispose=function(){if(H.dispose(),Y!==null)Y.dispose();if(X!==null)X.dispose();U.dispose(),N.dispose()}}var JW=new hJ,n$=new N8(1,1),QW=new M6,$W=new q$,ZW=new _6,vK=[],bK=[],hK=new Float32Array(16),xK=new Float32Array(9),gK=new Float32Array(4);function a8(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let K=Q*$,W=vK[K];if(W===void 0)W=new Float32Array(K),vK[K]=W;if(Q!==0){Z.toArray(W,0);for(let H=1,Y=0;H!==Q;++H)Y+=$,J[H].toArray(W,Y)}return W}function yJ(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function fJ(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function x6(J,Q){let $=bK[Q];if($===void 0)$=new Int32Array(Q),bK[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function NU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function EU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(yJ($,Q))return;J.uniform2fv(this.addr,Q),fJ($,Q)}}function qU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(yJ($,Q))return;J.uniform3fv(this.addr,Q),fJ($,Q)}}function FU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(yJ($,Q))return;J.uniform4fv(this.addr,Q),fJ($,Q)}}function DU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(yJ($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),fJ($,Q)}else{if(yJ($,Z))return;gK.set(Z),J.uniformMatrix2fv(this.addr,!1,gK),fJ($,Z)}}function OU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(yJ($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),fJ($,Q)}else{if(yJ($,Z))return;xK.set(Z),J.uniformMatrix3fv(this.addr,!1,xK),fJ($,Z)}}function RU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(yJ($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),fJ($,Q)}else{if(yJ($,Z))return;hK.set(Z),J.uniformMatrix4fv(this.addr,!1,hK),fJ($,Z)}}function MU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function LU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(yJ($,Q))return;J.uniform2iv(this.addr,Q),fJ($,Q)}}function VU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(yJ($,Q))return;J.uniform3iv(this.addr,Q),fJ($,Q)}}function kU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(yJ($,Q))return;J.uniform4iv(this.addr,Q),fJ($,Q)}}function BU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function IU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(yJ($,Q))return;J.uniform2uiv(this.addr,Q),fJ($,Q)}}function zU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(yJ($,Q))return;J.uniform3uiv(this.addr,Q),fJ($,Q)}}function AU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(yJ($,Q))return;J.uniform4uiv(this.addr,Q),fJ($,Q)}}function _U(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;let W;if(this.type===J.SAMPLER_2D_SHADOW)n$.compareFunction=$.isReversedDepthBuffer()?R6:O6,W=n$;else W=JW;$.setTexture2D(Q||W,K)}function CU(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTexture3D(Q||$W,K)}function PU(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTextureCube(Q||ZW,K)}function wU(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTexture2DArray(Q||QW,K)}function TU(J){switch(J){case 5126:return NU;case 35664:return EU;case 35665:return qU;case 35666:return FU;case 35674:return DU;case 35675:return OU;case 35676:return RU;case 5124:case 35670:return MU;case 35667:case 35671:return LU;case 35668:case 35672:return VU;case 35669:case 35673:return kU;case 5125:return BU;case 36294:return IU;case 36295:return zU;case 36296:return AU;case 35678:case 36198:case 36298:case 36306:case 35682:return _U;case 35679:case 36299:case 36307:return CU;case 35680:case 36300:case 36308:case 36293:return PU;case 36289:case 36303:case 36311:case 36292:return wU}}function SU(J,Q){J.uniform1fv(this.addr,Q)}function jU(J,Q){let $=a8(Q,this.size,2);J.uniform2fv(this.addr,$)}function yU(J,Q){let $=a8(Q,this.size,3);J.uniform3fv(this.addr,$)}function fU(J,Q){let $=a8(Q,this.size,4);J.uniform4fv(this.addr,$)}function vU(J,Q){let $=a8(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function bU(J,Q){let $=a8(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function hU(J,Q){let $=a8(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function xU(J,Q){J.uniform1iv(this.addr,Q)}function gU(J,Q){J.uniform2iv(this.addr,Q)}function pU(J,Q){J.uniform3iv(this.addr,Q)}function mU(J,Q){J.uniform4iv(this.addr,Q)}function lU(J,Q){J.uniform1uiv(this.addr,Q)}function dU(J,Q){J.uniform2uiv(this.addr,Q)}function uU(J,Q){J.uniform3uiv(this.addr,Q)}function cU(J,Q){J.uniform4uiv(this.addr,Q)}function nU(J,Q,$){let Z=this.cache,K=Q.length,W=x6($,K);if(!yJ(Z,W))J.uniform1iv(this.addr,W),fJ(Z,W);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=n$;else H=JW;for(let Y=0;Y!==K;++Y)$.setTexture2D(Q[Y]||H,W[Y])}function sU(J,Q,$){let Z=this.cache,K=Q.length,W=x6($,K);if(!yJ(Z,W))J.uniform1iv(this.addr,W),fJ(Z,W);for(let H=0;H!==K;++H)$.setTexture3D(Q[H]||$W,W[H])}function iU(J,Q,$){let Z=this.cache,K=Q.length,W=x6($,K);if(!yJ(Z,W))J.uniform1iv(this.addr,W),fJ(Z,W);for(let H=0;H!==K;++H)$.setTextureCube(Q[H]||ZW,W[H])}function oU(J,Q,$){let Z=this.cache,K=Q.length,W=x6($,K);if(!yJ(Z,W))J.uniform1iv(this.addr,W),fJ(Z,W);for(let H=0;H!==K;++H)$.setTexture2DArray(Q[H]||QW,W[H])}function aU(J){switch(J){case 5126:return SU;case 35664:return jU;case 35665:return yU;case 35666:return fU;case 35674:return vU;case 35675:return bU;case 35676:return hU;case 5124:case 35670:return xU;case 35667:case 35671:return gU;case 35668:case 35672:return pU;case 35669:case 35673:return mU;case 5125:return lU;case 36294:return dU;case 36295:return uU;case 36296:return cU;case 35678:case 36198:case 36298:case 36306:case 35682:return nU;case 35679:case 36299:case 36307:return sU;case 35680:case 36300:case 36308:case 36293:return iU;case 36289:case 36303:case 36311:case 36292:return oU}}class KW{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=TU(Q.type)}}class WW{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=aU(Q.type)}}class HW{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let K=0,W=Z.length;K!==W;++K){let H=Z[K];H.setValue(J,Q[H.id],$)}}}var d$=/(\w+)(\])?(\[|\.)?/g;function pK(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function rU(J,Q,$){let Z=J.name,K=Z.length;d$.lastIndex=0;while(!0){let W=d$.exec(Z),H=d$.lastIndex,Y=W[1],X=W[2]==="]",U=W[3];if(X)Y=Y|0;if(U===void 0||U==="["&&H+2===K){pK($,U===void 0?new KW(Y,J,Q):new WW(Y,J,Q));break}else{let q=$.map[Y];if(q===void 0)q=new HW(Y),pK($,q);$=q}}}class C7{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let W=0;W<$;++W){let H=J.getActiveUniform(Q,W),Y=J.getUniformLocation(Q,H.name);rU(H,Y,this)}let Z=[],K=[];for(let W of this.seq)if(W.type===J.SAMPLER_2D_SHADOW||W.type===J.SAMPLER_CUBE_SHADOW||W.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(W);else K.push(W);if(Z.length>0)this.seq=Z.concat(K)}setValue(J,Q,$,Z){let K=this.map[Q];if(K!==void 0)K.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let K=0,W=Q.length;K!==W;++K){let H=Q[K],Y=$[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,K=J.length;Z!==K;++Z){let W=J[Z];if(W.id in Q)$.push(W)}return $}}function mK(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}var tU=37297,eU=0;function JG(J,Q){let $=J.split(`
`),Z=[],K=Math.max(Q-6,0),W=Math.min(Q+6,$.length);for(let H=K;H<W;H++){let Y=H+1;Z.push(`${Y===Q?">":" "} ${Y}: ${$[H]}`)}return Z.join(`
`)}var lK=new r0;function QG(J){HJ._getMatrix(lK,HJ.workingColorSpace,J);let Q=`mat3( ${lK.elements.map(($)=>$.toFixed(4))} )`;switch(HJ.getTransfer(J)){case Y$:return[Q,"LinearTransferOETF"];case LJ:return[Q,"sRGBTransferOETF"];default:return d0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function dK(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),W=(J.getShaderInfoLog(Q)||"").trim();if(Z&&W==="")return"";let H=/ERROR: 0:(\d+)/.exec(W);if(H){let Y=parseInt(H[1]);return $.toUpperCase()+`

`+W+`

`+JG(J.getShaderSource(Q),Y)}else return W}function $G(J,Q){let $=QG(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var ZG={[OQ]:"Linear",[RQ]:"Reinhard",[MQ]:"Cineon",[LQ]:"ACESFilmic",[kQ]:"AgX",[BQ]:"Neutral",[VQ]:"Custom"};function KG(J,Q){let $=ZG[Q];if($===void 0)return d0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var b6=new x;function WG(){HJ.getLuminanceCoefficients(b6);let J=b6.x.toFixed(4),Q=b6.y.toFixed(4),$=b6.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function HG(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_7).join(`
`)}function YG(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function XG(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let K=0;K<Z;K++){let W=J.getActiveAttrib(Q,K),H=W.name,Y=1;if(W.type===J.FLOAT_MAT2)Y=2;if(W.type===J.FLOAT_MAT3)Y=3;if(W.type===J.FLOAT_MAT4)Y=4;$[H]={type:W.type,location:J.getAttribLocation(Q,H),locationSize:Y}}return $}function _7(J){return J!==""}function uK(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_SUN_LIGHTS/g,Q.numSunLights).replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,Q.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function cK(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var UG=/^[ \t]*#include +<([\w\d./]+)>/gm;function s$(J){return J.replace(UG,NG)}var GG=new Map;function NG(J,Q){let $=QJ[Q];if($===void 0){let Z=GG.get(Q);if(Z!==void 0)$=QJ[Z],d0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return s$($)}var EG=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nK(J){return J.replace(EG,qG)}function qG(J,Q,$,Z){let K="";for(let W=parseInt(Q);W<parseInt($);W++)K+=Z.replace(/\[\s*i\s*\]/g,"[ "+W+" ]").replace(/UNROLLED_LOOP_INDEX/g,W);return K}function sK(J){let Q=`precision ${J.precision} float;
	precision ${J.precision} int;
	precision ${J.precision} sampler2D;
	precision ${J.precision} samplerCube;
	precision ${J.precision} sampler3D;
	precision ${J.precision} sampler2DArray;
	precision ${J.precision} sampler2DShadow;
	precision ${J.precision} samplerCubeShadow;
	precision ${J.precision} sampler2DArrayShadow;
	precision ${J.precision} isampler2D;
	precision ${J.precision} isampler3D;
	precision ${J.precision} isamplerCube;
	precision ${J.precision} isampler2DArray;
	precision ${J.precision} usampler2D;
	precision ${J.precision} usampler3D;
	precision ${J.precision} usamplerCube;
	precision ${J.precision} usampler2DArray;
	`;if(J.precision==="highp")Q+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")Q+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")Q+=`
#define LOW_PRECISION`;return Q}var FG={[N7]:"SHADOWMAP_TYPE_PCF",[m8]:"SHADOWMAP_TYPE_VSM"};function DG(J){return FG[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var OG={[u8]:"ENVMAP_TYPE_CUBE",[Z8]:"ENVMAP_TYPE_CUBE",[q7]:"ENVMAP_TYPE_CUBE_UV"};function RG(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return OG[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var MG={[Z8]:"ENVMAP_MODE_REFRACTION"};function LG(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return MG[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var VG={[JK]:"ENVMAP_BLENDING_MULTIPLY",[QK]:"ENVMAP_BLENDING_MIX",[$K]:"ENVMAP_BLENDING_ADD"};function kG(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return VG[J.combine]||"ENVMAP_BLENDING_NONE"}function BG(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function IG(J,Q,$,Z){let K=J.getContext(),W=$.defines,H=$.vertexShader,Y=$.fragmentShader,X=DG($),U=RG($),N=LG($),q=kG($),G=BG($),D=HG($),V=YG(W),z=K.createProgram(),F,E,C=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(F=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,V].filter(_7).join(`
`),F.length>0)F+=`
`;if(E=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,V].filter(_7).join(`
`),E.length>0)E+=`
`}else F=[sK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,V,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+N:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(_7).join(`
`),E=[sK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,V,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+N:"",$.envMap?"#define "+q:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.retroreflection?"#define USE_RETROREFLECTION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==F9?"#define TONE_MAPPING":"",$.toneMapping!==F9?QJ.tonemapping_pars_fragment:"",$.toneMapping!==F9?KG("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",QJ.colorspace_pars_fragment,$G("linearToOutputTexel",$.outputColorSpace),WG(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(_7).join(`
`);if(H=s$(H),H=uK(H,$),H=cK(H,$),Y=s$(Y),Y=uK(Y,$),Y=cK(Y,$),H=nK(H),Y=nK(Y),$.isRawShaderMaterial!==!0)C=`#version 300 es
`,F=[D,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+F,E=["#define varying in",$.glslVersion===X$?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===X$?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E;let j=C+F+H,k=C+E+Y,I=mK(K,K.VERTEX_SHADER,j),_=mK(K,K.FRAGMENT_SHADER,k);if(K.attachShader(z,I),K.attachShader(z,_),$.index0AttributeName!==void 0)K.bindAttribLocation(z,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)K.bindAttribLocation(z,0,"position");K.linkProgram(z);function P(v){if(J.debug.checkShaderErrors){let b=K.getProgramInfoLog(z)||"",t=K.getShaderInfoLog(I)||"",y=K.getShaderInfoLog(_)||"",s=b.trim(),J0=t.trim(),u=y.trim(),G0=!0,a=!0;if(K.getProgramParameter(z,K.LINK_STATUS)===!1)if(G0=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(K,z,I,_);else{let Q0=dK(K,I,"vertex"),W0=dK(K,_,"fragment");s0("WebGLProgram: Shader Error "+K.getError()+" - VALIDATE_STATUS "+K.getProgramParameter(z,K.VALIDATE_STATUS)+`

Material Name: `+v.name+`
Material Type: `+v.type+`

Program Info Log: `+s+`
`+Q0+`
`+W0)}else if(s!=="")d0("WebGLProgram: Program Info Log:",s);else if(J0===""||u==="")a=!1;if(a)v.diagnostics={runnable:G0,programLog:s,vertexShader:{log:J0,prefix:F},fragmentShader:{log:u,prefix:E}}}K.deleteShader(I),K.deleteShader(_),M=new C7(K,z),B=XG(K,z)}let M;this.getUniforms=function(){if(M===void 0)P(this);return M};let B;this.getAttributes=function(){if(B===void 0)P(this);return B};let c=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(c===!1)c=K.getProgramParameter(z,tU);return c},this.destroy=function(){Z.releaseStatesOfProgram(this),K.deleteProgram(z),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=eU++,this.cacheKey=Q,this.usedTimes=1,this.program=z,this.vertexShader=I,this.fragmentShader=_,this}var zG=0;class YW{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let Z=this._getShaderCacheForMaterial(J);if(Z.has(Q)===!1)Z.add(Q),Q.usedTimes++;if(Z.has($)===!1)Z.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new XW(J),Q.set(J,$);return $}}class XW{constructor(J){this.id=zG++,this.code=J,this.usedTimes=0}}function AG(J){return J===Y8||J===F6||J===D6}function _G(J,Q,$,Z,K,W){let H=new L6,Y=new YW,X=new Set,U=[],N=new Map,q=Z.logarithmicDepthBuffer,G=Z.precision,D={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function V(M){if(X.add(M),M===0)return"uv";return`uv${M}`}function z(M,B,c,v,b,t){let y=v.fog,s=b.geometry,J0=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?v.environment:null,u=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,G0=Q.get(M.envMap||J0,u),a=!!G0&&G0.mapping===q7?G0.image.height:null,Q0=D[M.type];if(M.precision!==null){if(G=Z.getMaxPrecision(M.precision),G!==M.precision)d0("WebGLProgram.getParameters:",M.precision,"not supported, using",G,"instead.")}let W0=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,u0=W0!==void 0?W0.length:0,l0=0;if(s.morphAttributes.position!==void 0)l0=1;if(s.morphAttributes.normal!==void 0)l0=2;if(s.morphAttributes.color!==void 0)l0=3;let EJ,$J,A,h;if(Q0){let NJ=A9[Q0];EJ=NJ.vertexShader,$J=NJ.fragmentShader}else{EJ=M.vertexShader,$J=M.fragmentShader;let NJ=Y.getVertexShaderStage(M),UJ=Y.getFragmentShaderStage(M);Y.update(M,NJ,UJ),A=NJ.id,h=UJ.id}let p=J.getRenderTarget(),n=J.state.buffers.depth.getReversed(),$0=b.isInstancedMesh===!0,K0=b.isBatchedMesh===!0,X0=!!M.map,N0=!!M.matcap,k0=!!G0,c0=!!M.aoMap,j0=!!M.lightMap,JJ=!!M.bumpMap&&M.wireframe===!1,ZJ=!!M.normalMap,v0=!!M.displacementMap,n0=!!M.emissiveMap,i0=!!M.metalnessMap,w=!!M.roughnessMap,KJ=M.anisotropy>0,f0=M.clearcoat>0,C0=M.dispersion>0,L=M.retroreflectivity>0,O=M.iridescence>0,T=M.sheen>0,l=M.transmission>0,e=KJ&&!!M.anisotropyMap,H0=f0&&!!M.clearcoatMap,q0=f0&&!!M.clearcoatNormalMap,i=f0&&!!M.clearcoatRoughnessMap,r=O&&!!M.iridescenceMap,D0=O&&!!M.iridescenceThicknessMap,T0=T&&!!M.sheenColorMap,O0=T&&!!M.sheenRoughnessMap,Y0=!!M.specularMap,R0=!!M.specularColorMap,M0=!!M.specularIntensityMap,b0=l&&!!M.transmissionMap,S=l&&!!M.thicknessMap,E0=!!M.gradientMap,o=!!M.alphaMap,B0=M.alphaTest>0,S0=!!M.alphaHash,Z0=!!M.extensions,V0=F9;if(M.toneMapped){if(p===null||p.isXRRenderTarget===!0)V0=J.toneMapping}let o0={shaderID:Q0,shaderType:M.type,shaderName:M.name,vertexShader:EJ,fragmentShader:$J,defines:M.defines,customVertexShaderID:A,customFragmentShaderID:h,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:G,batching:K0,batchingColor:K0&&b._colorsTexture!==null,instancing:$0,instancingColor:$0&&b.instanceColor!==null,instancingMorph:$0&&b.morphTexture!==null,outputColorSpace:p===null?J.outputColorSpace:p.isXRRenderTarget===!0?p.texture.colorSpace:HJ.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:X0,matcap:N0,envMap:k0,envMapMode:k0&&G0.mapping,envMapCubeUVHeight:a,aoMap:c0,lightMap:j0,bumpMap:JJ,normalMap:ZJ,displacementMap:v0,emissiveMap:n0,normalMapObjectSpace:ZJ&&M.normalMapType===qK,normalMapTangentSpace:ZJ&&M.normalMapType===W$,packedNormalMap:ZJ&&M.normalMapType===W$&&AG(M.normalMap.format),metalnessMap:i0,roughnessMap:w,anisotropy:KJ,anisotropyMap:e,clearcoat:f0,clearcoatMap:H0,clearcoatNormalMap:q0,clearcoatRoughnessMap:i,dispersion:C0,retroreflection:L,iridescence:O,iridescenceMap:r,iridescenceThicknessMap:D0,sheen:T,sheenColorMap:T0,sheenRoughnessMap:O0,specularMap:Y0,specularColorMap:R0,specularIntensityMap:M0,transmission:l,transmissionMap:b0,thicknessMap:S,gradientMap:E0,opaque:M.transparent===!1&&M.blending===E7&&M.alphaToCoverage===!1,alphaMap:o,alphaTest:B0,alphaHash:S0,combine:M.combine,mapUv:X0&&V(M.map.channel),aoMapUv:c0&&V(M.aoMap.channel),lightMapUv:j0&&V(M.lightMap.channel),bumpMapUv:JJ&&V(M.bumpMap.channel),normalMapUv:ZJ&&V(M.normalMap.channel),displacementMapUv:v0&&V(M.displacementMap.channel),emissiveMapUv:n0&&V(M.emissiveMap.channel),metalnessMapUv:i0&&V(M.metalnessMap.channel),roughnessMapUv:w&&V(M.roughnessMap.channel),anisotropyMapUv:e&&V(M.anisotropyMap.channel),clearcoatMapUv:H0&&V(M.clearcoatMap.channel),clearcoatNormalMapUv:q0&&V(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:i&&V(M.clearcoatRoughnessMap.channel),iridescenceMapUv:r&&V(M.iridescenceMap.channel),iridescenceThicknessMapUv:D0&&V(M.iridescenceThicknessMap.channel),sheenColorMapUv:T0&&V(M.sheenColorMap.channel),sheenRoughnessMapUv:O0&&V(M.sheenRoughnessMap.channel),specularMapUv:Y0&&V(M.specularMap.channel),specularColorMapUv:R0&&V(M.specularColorMap.channel),specularIntensityMapUv:M0&&V(M.specularIntensityMap.channel),transmissionMapUv:b0&&V(M.transmissionMap.channel),thicknessMapUv:S&&V(M.thicknessMap.channel),alphaMapUv:o&&V(M.alphaMap.channel),vertexTangents:!!s.attributes.tangent&&(ZJ||KJ),vertexNormals:!!s.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!s.attributes.color&&s.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!s.attributes.uv&&(X0||o),fog:!!y,useFog:M.fog===!0,fogExp2:!!y&&y.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||s.attributes.normal===void 0&&ZJ===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:q,reversedDepthBuffer:n,skinning:b.isSkinnedMesh===!0,hasPositionAttribute:s.attributes.position!==void 0,morphTargets:s.morphAttributes.position!==void 0,morphNormals:s.morphAttributes.normal!==void 0,morphColors:s.morphAttributes.color!==void 0,morphTargetsCount:u0,morphTextureStride:l0,numSunLights:B.sun.length,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numSunLightShadows:B.sunShadowMap.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:t.length,numClippingPlanes:W.numPlanes,numClipIntersection:W.numIntersection,dithering:M.dithering,shadowMapEnabled:J.shadowMap.enabled&&c.length>0,shadowMapType:J.shadowMap.type,toneMapping:V0,decodeVideoTexture:X0&&M.map.isVideoTexture===!0&&HJ.getTransfer(M.map.colorSpace)===LJ,decodeVideoTextureEmissive:n0&&M.emissiveMap.isVideoTexture===!0&&HJ.getTransfer(M.emissiveMap.colorSpace)===LJ,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Y9,flipSided:M.side===pJ,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Z0&&M.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Z0&&M.extensions.multiDraw===!0||K0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return o0.vertexUv1s=X.has(1),o0.vertexUv2s=X.has(2),o0.vertexUv3s=X.has(3),X.clear(),o0}function F(M){let B=[];if(M.shaderID)B.push(M.shaderID);else B.push(M.customVertexShaderID),B.push(M.customFragmentShaderID);if(M.defines!==void 0)for(let c in M.defines)B.push(c),B.push(M.defines[c]);if(M.isRawShaderMaterial===!1)E(B,M),C(B,M),B.push(J.outputColorSpace);return B.push(M.customProgramCacheKey),B.join()}function E(M,B){M.push(B.precision),M.push(B.outputColorSpace),M.push(B.envMapMode),M.push(B.envMapCubeUVHeight),M.push(B.mapUv),M.push(B.alphaMapUv),M.push(B.lightMapUv),M.push(B.aoMapUv),M.push(B.bumpMapUv),M.push(B.normalMapUv),M.push(B.displacementMapUv),M.push(B.emissiveMapUv),M.push(B.metalnessMapUv),M.push(B.roughnessMapUv),M.push(B.anisotropyMapUv),M.push(B.clearcoatMapUv),M.push(B.clearcoatNormalMapUv),M.push(B.clearcoatRoughnessMapUv),M.push(B.iridescenceMapUv),M.push(B.iridescenceThicknessMapUv),M.push(B.sheenColorMapUv),M.push(B.sheenRoughnessMapUv),M.push(B.specularMapUv),M.push(B.specularColorMapUv),M.push(B.specularIntensityMapUv),M.push(B.transmissionMapUv),M.push(B.thicknessMapUv),M.push(B.combine),M.push(B.fogExp2),M.push(B.sizeAttenuation),M.push(B.morphTargetsCount),M.push(B.morphAttributeCount),M.push(B.numSunLights),M.push(B.numDirLights),M.push(B.numPointLights),M.push(B.numSpotLights),M.push(B.numSpotLightMaps),M.push(B.numHemiLights),M.push(B.numRectAreaLights),M.push(B.numSunLightShadows),M.push(B.numDirLightShadows),M.push(B.numPointLightShadows),M.push(B.numSpotLightShadows),M.push(B.numSpotLightShadowsWithMaps),M.push(B.numLightProbes),M.push(B.shadowMapType),M.push(B.toneMapping),M.push(B.numClippingPlanes),M.push(B.numClipIntersection),M.push(B.depthPacking)}function C(M,B){if(H.disableAll(),B.instancing)H.enable(0);if(B.instancingColor)H.enable(1);if(B.instancingMorph)H.enable(2);if(B.matcap)H.enable(3);if(B.envMap)H.enable(4);if(B.normalMapObjectSpace)H.enable(5);if(B.normalMapTangentSpace)H.enable(6);if(B.clearcoat)H.enable(7);if(B.iridescence)H.enable(8);if(B.alphaTest)H.enable(9);if(B.vertexColors)H.enable(10);if(B.vertexAlphas)H.enable(11);if(B.vertexUv1s)H.enable(12);if(B.vertexUv2s)H.enable(13);if(B.vertexUv3s)H.enable(14);if(B.vertexTangents)H.enable(15);if(B.anisotropy)H.enable(16);if(B.alphaHash)H.enable(17);if(B.batching)H.enable(18);if(B.dispersion)H.enable(19);if(B.retroreflection)H.enable(24);if(B.batchingColor)H.enable(20);if(B.gradientMap)H.enable(21);if(B.packedNormalMap)H.enable(22);if(B.vertexNormals)H.enable(23);if(M.push(H.mask),H.disableAll(),B.fog)H.enable(0);if(B.useFog)H.enable(1);if(B.flatShading)H.enable(2);if(B.logarithmicDepthBuffer)H.enable(3);if(B.reversedDepthBuffer)H.enable(4);if(B.skinning)H.enable(5);if(B.morphTargets)H.enable(6);if(B.morphNormals)H.enable(7);if(B.morphColors)H.enable(8);if(B.premultipliedAlpha)H.enable(9);if(B.shadowMapEnabled)H.enable(10);if(B.doubleSided)H.enable(11);if(B.flipSided)H.enable(12);if(B.useDepthPacking)H.enable(13);if(B.dithering)H.enable(14);if(B.transmission)H.enable(15);if(B.sheen)H.enable(16);if(B.opaque)H.enable(17);if(B.pointsUvs)H.enable(18);if(B.decodeVideoTexture)H.enable(19);if(B.decodeVideoTextureEmissive)H.enable(20);if(B.alphaToCoverage)H.enable(21);if(B.numLightProbeGrids>0)H.enable(22);if(B.hasPositionAttribute)H.enable(23);M.push(H.mask)}function j(M){let B=D[M.type],c;if(B){let v=A9[B];c=_K.clone(v.uniforms)}else c=M.uniforms;return c}function k(M,B){let c=N.get(B);if(c!==void 0)++c.usedTimes;else c=new IG(J,B,M,K),U.push(c),N.set(B,c);return c}function I(M){if(--M.usedTimes===0){let B=U.indexOf(M);U[B]=U[U.length-1],U.pop(),N.delete(M.cacheKey),M.destroy()}}function _(M){Y.remove(M)}function P(){Y.dispose()}return{getParameters:z,getProgramCacheKey:F,getUniforms:j,acquireProgram:k,releaseProgram:I,releaseShaderCache:_,programs:U,dispose:P}}function CG(){let J=new WeakMap;function Q(H){return J.has(H)}function $(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function Z(H){J.delete(H)}function K(H,Y,X){J.get(H)[Y]=X}function W(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:K,dispose:W}}function PG(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function iK(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function oK(){let J=[],Q=0,$=[],Z=[],K=[];function W(){Q=0,$.length=0,Z.length=0,K.length=0}function H(G){let D=0;if(G.isInstancedMesh)D+=2;if(G.isSkinnedMesh)D+=1;return D}function Y(G,D,V,z,F,E){let C=J[Q];if(C===void 0)C={id:G.id,object:G,geometry:D,material:V,materialVariant:H(G),groupOrder:z,renderOrder:G.renderOrder,z:F,group:E},J[Q]=C;else C.id=G.id,C.object=G,C.geometry=D,C.material=V,C.materialVariant=H(G),C.groupOrder=z,C.renderOrder=G.renderOrder,C.z=F,C.group=E;return Q++,C}function X(G,D,V,z,F,E,C){if(C.reversedDepth===!0)F=-F;let j=Y(G,D,V,z,F,E);if(V.transmission>0)Z.push(j);else if(V.transparent===!0)K.push(j);else $.push(j)}function U(G,D,V,z,F,E){let C=Y(G,D,V,z,F,E);if(V.transmission>0)Z.unshift(C);else if(V.transparent===!0)K.unshift(C);else $.unshift(C)}function N(G,D){if($.length>1)$.sort(G||PG);if(Z.length>1)Z.sort(D||iK);if(K.length>1)K.sort(D||iK)}function q(){for(let G=Q,D=J.length;G<D;G++){let V=J[G];if(V.id===null)break;V.id=null,V.object=null,V.geometry=null,V.material=null,V.group=null}}return{opaque:$,transmissive:Z,transparent:K,init:W,push:X,unshift:U,finish:q,sort:N}}function wG(){let J=new WeakMap;function Q(Z,K){let W=J.get(Z),H;if(W===void 0)H=new oK,J.set(Z,[H]);else if(K>=W.length)H=new oK,W.push(H);else H=W[K];return H}function $(){J=new WeakMap}return{get:Q,dispose:$}}function TG(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={direction:new x,color:new e0};break;case"SpotLight":$={position:new x,direction:new x,color:new e0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new x,color:new e0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new x,skyColor:new e0,groundColor:new e0};break;case"RectAreaLight":$={color:new e0,position:new x,halfWidth:new x,halfHeight:new x};break}return J[Q.id]=$,$}}}function SG(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new t0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new t0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new t0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var jG=0;function yG(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function fG(J){let Q=new TG,$=SG(),Z={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)Z.probe.push(new x);let K=new x,W=new BJ,H=new BJ;function Y(U){let N=0,q=0,G=0;for(let b=0;b<9;b++)Z.probe[b].set(0,0,0);let D=0,V=0,z=0,F=0,E=0,C=0,j=0,k=0,I=0,_=0,P=0,M=0,B=0,c=0;U.sort(yG);for(let b=0,t=U.length;b<t;b++){let y=U[b],s=y.color,J0=y.intensity,u=y.distance,G0=null;if(y.shadow&&y.shadow.map)if(y.shadow.map.texture.format===Y8)G0=y.shadow.map.texture;else G0=y.shadow.map.depthTexture||y.shadow.map.texture;if(y.isAmbientLight)N+=s.r*J0,q+=s.g*J0,G+=s.b*J0;else if(y.isLightProbe){for(let a=0;a<9;a++)Z.probe[a].addScaledVector(y.sh.coefficients[a],J0);c++}else if(y.isSunLight){let a=Q.get(y);if(a.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let Q0=y.shadow,W0=$.get(y);W0.shadowIntensity=Q0.intensity,W0.shadowBias=Q0.bias,W0.shadowNormalBias=Q0.normalBias,W0.shadowRadius=Q0.radius,W0.shadowMapSize.copy(Q0.mapSize).multiply(Q0.getFrameExtents()),Z.sunShadow[V]=W0,Z.sunShadowMap[V]=G0;let u0=Q0.getViewportCount();for(let l0=0;l0<u0;l0++)Z.sunShadowMatrix[z+l0]=Q0.getMatrix(l0),Z.sunShadowCascade[z+l0]=Q0._cascadeData[l0];z+=u0,V++}Z.sun[D]=a,D++}else if(y.isDirectionalLight){let a=Q.get(y);if(a.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let Q0=y.shadow,W0=$.get(y);W0.shadowIntensity=Q0.intensity,W0.shadowBias=Q0.bias,W0.shadowNormalBias=Q0.normalBias,W0.shadowRadius=Q0.radius,W0.shadowMapSize=Q0.mapSize,Z.directionalShadow[F]=W0,Z.directionalShadowMap[F]=G0,Z.directionalShadowMatrix[F]=y.shadow.matrix,I++}Z.directional[F]=a,F++}else if(y.isSpotLight){let a=Q.get(y);a.position.setFromMatrixPosition(y.matrixWorld),a.color.copy(s).multiplyScalar(J0),a.distance=u,a.coneCos=Math.cos(y.angle),a.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),a.decay=y.decay,Z.spot[C]=a;let Q0=y.shadow;if(y.map){if(Z.spotLightMap[M]=y.map,M++,Q0.updateMatrices(y),y.castShadow)B++}if(Z.spotLightMatrix[C]=Q0.matrix,y.castShadow){let W0=$.get(y);W0.shadowIntensity=Q0.intensity,W0.shadowBias=Q0.bias,W0.shadowNormalBias=Q0.normalBias,W0.shadowRadius=Q0.radius,W0.shadowMapSize=Q0.mapSize,Z.spotShadow[C]=W0,Z.spotShadowMap[C]=G0,P++}C++}else if(y.isRectAreaLight){let a=Q.get(y);a.color.copy(s).multiplyScalar(J0),a.halfWidth.set(y.width*0.5,0,0),a.halfHeight.set(0,y.height*0.5,0),Z.rectArea[j]=a,j++}else if(y.isPointLight){let a=Q.get(y);if(a.color.copy(y.color).multiplyScalar(y.intensity),a.distance=y.distance,a.decay=y.decay,y.castShadow){let Q0=y.shadow,W0=$.get(y);W0.shadowIntensity=Q0.intensity,W0.shadowBias=Q0.bias,W0.shadowNormalBias=Q0.normalBias,W0.shadowRadius=Q0.radius,W0.shadowMapSize=Q0.mapSize,W0.shadowCameraNear=Q0.camera.near,W0.shadowCameraFar=Q0.camera.far,Z.pointShadow[E]=W0,Z.pointShadowMap[E]=G0,Z.pointShadowMatrix[E]=y.shadow.matrix,_++}Z.point[E]=a,E++}else if(y.isHemisphereLight){let a=Q.get(y);a.skyColor.copy(y.color).multiplyScalar(J0),a.groundColor.copy(y.groundColor).multiplyScalar(J0),Z.hemi[k]=a,k++}}if(j>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=_0.LTC_FLOAT_1,Z.rectAreaLTC2=_0.LTC_FLOAT_2;else Z.rectAreaLTC1=_0.LTC_HALF_1,Z.rectAreaLTC2=_0.LTC_HALF_2;Z.ambient[0]=N,Z.ambient[1]=q,Z.ambient[2]=G;let v=Z.hash;if(v.sunLength!==D||v.directionalLength!==F||v.pointLength!==E||v.spotLength!==C||v.rectAreaLength!==j||v.hemiLength!==k||v.numSunShadows!==V||v.numDirectionalShadows!==I||v.numPointShadows!==_||v.numSpotShadows!==P||v.numSpotMaps!==M||v.numLightProbes!==c)Z.sun.length=D,Z.directional.length=F,Z.spot.length=C,Z.rectArea.length=j,Z.point.length=E,Z.hemi.length=k,Z.sunShadow.length=V,Z.sunShadowMap.length=V,Z.sunShadowMatrix.length=z,Z.sunShadowCascade.length=z,Z.directionalShadow.length=I,Z.directionalShadowMap.length=I,Z.directionalShadowMatrix.length=I,Z.pointShadow.length=_,Z.pointShadowMap.length=_,Z.pointShadowMatrix.length=_,Z.spotShadow.length=P,Z.spotShadowMap.length=P,Z.spotLightMatrix.length=P+M-B,Z.spotLightMap.length=M,Z.numSpotLightShadowsWithMaps=B,Z.numLightProbes=c,v.sunLength=D,v.directionalLength=F,v.pointLength=E,v.spotLength=C,v.rectAreaLength=j,v.hemiLength=k,v.numSunShadows=V,v.numDirectionalShadows=I,v.numPointShadows=_,v.numSpotShadows=P,v.numSpotMaps=M,v.numLightProbes=c,Z.version=jG++}function X(U,N){let q=0,G=0,D=0,V=0,z=0,F=0,E=N.matrixWorldInverse;for(let C=0,j=U.length;C<j;C++){let k=U[C];if(k.isSunLight){let I=Z.sun[q];I.direction.setFromMatrixPosition(k.matrixWorld),I.direction.transformDirection(E),q++}else if(k.isDirectionalLight){let I=Z.directional[G];I.direction.setFromMatrixPosition(k.matrixWorld),K.setFromMatrixPosition(k.target.matrixWorld),I.direction.sub(K),I.direction.transformDirection(E),G++}else if(k.isSpotLight){let I=Z.spot[V];I.position.setFromMatrixPosition(k.matrixWorld),I.position.applyMatrix4(E),I.direction.setFromMatrixPosition(k.matrixWorld),K.setFromMatrixPosition(k.target.matrixWorld),I.direction.sub(K),I.direction.transformDirection(E),V++}else if(k.isRectAreaLight){let I=Z.rectArea[z];I.position.setFromMatrixPosition(k.matrixWorld),I.position.applyMatrix4(E),H.identity(),W.copy(k.matrixWorld),W.premultiply(E),H.extractRotation(W),I.halfWidth.set(k.width*0.5,0,0),I.halfHeight.set(0,k.height*0.5,0),I.halfWidth.applyMatrix4(H),I.halfHeight.applyMatrix4(H),z++}else if(k.isPointLight){let I=Z.point[D];I.position.setFromMatrixPosition(k.matrixWorld),I.position.applyMatrix4(E),D++}else if(k.isHemisphereLight){let I=Z.hemi[F];I.direction.setFromMatrixPosition(k.matrixWorld),I.direction.transformDirection(E),F++}}}return{setup:Y,setupView:X,state:Z}}function aK(J){let Q=new fG(J),$=[],Z=[],K=[];function W(G){q.camera=G,$.length=0,Z.length=0,K.length=0}function H(G){$.push(G)}function Y(G){Z.push(G)}function X(G){K.push(G)}function U(){Q.setup($)}function N(G){Q.setupView($,G)}let q={lightsArray:$,shadowsArray:Z,lightProbeGridArray:K,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:W,state:q,setupLights:U,setupLightsView:N,pushLight:H,pushShadow:Y,pushLightProbeGrid:X}}function vG(J){let Q=new WeakMap;function $(K,W=0){let H=Q.get(K),Y;if(H===void 0)Y=new aK(J),Q.set(K,[Y]);else if(W>=H.length)Y=new aK(J),H.push(Y);else Y=H[W];return Y}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}var bG=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hG=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,xG=[new x(1,0,0),new x(-1,0,0),new x(0,1,0),new x(0,-1,0),new x(0,0,1),new x(0,0,-1)],gG=[new x(0,-1,0),new x(0,-1,0),new x(0,0,1),new x(0,0,-1),new x(0,-1,0),new x(0,-1,0)],rK=new BJ,A7=new x,u$=new x;function pG(J,Q,$){let Z=new V7,K=new t0,W=new t0,H=new IJ,Y=new V$,X=new k$,U={},N=$.maxTextureSize,q={[l8]:pJ,[pJ]:l8,[Y9]:Y9},G=new X9({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new t0},radius:{value:4}},vertexShader:bG,fragmentShader:hG}),D=G.clone();D.defines.HORIZONTAL_PASS=1;let V=new mJ;V.setAttribute("position",new H9(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let z=new x0(V,G),F=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=N7;let E=this.type;this.render=function(_,P,M){if(F.enabled===!1)return;if(F.autoUpdate===!1&&F.needsUpdate===!1)return;if(_.length===0)return;if(this.type===W6)d0("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=N7;let B=J.getRenderTarget(),c=J.getActiveCubeFace(),v=J.getActiveMipmapLevel(),b=J.state;if(b.setBlending(V9),b.buffers.depth.getReversed()===!0)b.buffers.color.setClear(0,0,0,0);else b.buffers.color.setClear(1,1,1,1);b.buffers.depth.setTest(!0),b.setScissorTest(!1);let t=E!==this.type;if(t)P.traverse(function(y){if(y.material)if(Array.isArray(y.material))y.material.forEach((s)=>s.needsUpdate=!0);else y.material.needsUpdate=!0});for(let y=0,s=_.length;y<s;y++){let J0=_[y],u=J0.shadow;if(u===void 0){d0("WebGLShadowMap:",J0,"has no shadow.");continue}if(u.autoUpdate===!1&&u.needsUpdate===!1)continue;K.copy(u.mapSize);let G0=u.getFrameExtents();if(K.multiply(G0),W.copy(u.mapSize),K.x>N||K.y>N){if(K.x>N)W.x=Math.floor(N/G0.x),K.x=W.x*G0.x,u.mapSize.x=W.x;if(K.y>N)W.y=Math.floor(N/G0.y),K.y=W.y*G0.y,u.mapSize.y=W.y}let a=J.state.buffers.depth.getReversed();if(u.camera._reversedDepth=a,u.map===null||t===!0){if(u.map!==null){if(u.map.depthTexture!==null)u.map.depthTexture.dispose(),u.map.depthTexture=null;u.map.dispose()}if(this.type===m8){if(J0.isPointLight){d0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}u.map=new J9(K.x,K.y,{format:Y8,type:k9,minFilter:iJ,magFilter:iJ,generateMipmaps:!1}),u.map.texture.name=J0.name+".shadowMap",u.map.depthTexture=new N8(K.x,K.y,v9),u.map.depthTexture.name=J0.name+".shadowMapDepth",u.map.depthTexture.format=W8,u.map.depthTexture.compareFunction=null,u.map.depthTexture.minFilter=s9,u.map.depthTexture.magFilter=s9}else{if(J0.isPointLight)u.map=new i$(K.x),u.map.depthTexture=new R$(K.x,i9);else u.map=new J9(K.x,K.y),u.map.depthTexture=new N8(K.x,K.y,i9);if(u.map.depthTexture.name=J0.name+".shadowMap",u.map.depthTexture.format=W8,this.type===N7)u.map.depthTexture.compareFunction=a?R6:O6,u.map.depthTexture.minFilter=iJ,u.map.depthTexture.magFilter=iJ;else u.map.depthTexture.compareFunction=null,u.map.depthTexture.minFilter=s9,u.map.depthTexture.magFilter=s9}u.camera.updateProjectionMatrix()}if(u.map.isWebGLCubeRenderTarget!==!0&&(u.map.width!==K.x||u.map.height!==K.y))u.map.setSize(K.x,K.y);let Q0=u.map.isWebGLCubeRenderTarget?6:u.getViewportCount();if(J0.isPointLight!==!0)u.updateMatrices(J0,M);for(let W0=0;W0<Q0;W0++){let u0=u.getCamera(W0);if(J0.isPointLight){let{camera:l0,matrix:EJ}=u,$J=J0.distance||l0.far;if($J!==l0.far)l0.far=$J,l0.updateProjectionMatrix();A7.setFromMatrixPosition(J0.matrixWorld),l0.position.copy(A7),u$.copy(l0.position),u$.add(xG[W0]),l0.up.copy(gG[W0]),l0.lookAt(u$),l0.updateMatrixWorld(),EJ.makeTranslation(-A7.x,-A7.y,-A7.z),rK.multiplyMatrices(l0.projectionMatrix,l0.matrixWorldInverse),u._frustum.setFromProjectionMatrix(rK,l0.coordinateSystem,l0.reversedDepth)}if(u.map.isWebGLCubeRenderTarget)J.setRenderTarget(u.map,W0),J.clear();else{if(W0===0)J.setRenderTarget(u.map),J.clear();let l0=u.getViewport(W0);H.set(W.x*l0.x,W.y*l0.y,W.x*l0.z,W.y*l0.w),b.viewport(H)}Z=u.getFrustum(W0),k(P,M,u0,J0,this.type)}if(u.isPointLightShadow!==!0&&this.type===m8)C(u,M);u.needsUpdate=!1}E=this.type,F.needsUpdate=!1,J.setRenderTarget(B,c,v)};function C(_,P){let M=Q.update(z);if(G.defines.VSM_SAMPLES!==_.blurSamples)G.defines.VSM_SAMPLES=_.blurSamples,D.defines.VSM_SAMPLES=_.blurSamples,G.needsUpdate=!0,D.needsUpdate=!0;if(_.mapPass===null)_.mapPass=new J9(K.x,K.y,{format:Y8,type:k9});else if(_.mapPass.width!==_.map.width||_.mapPass.height!==_.map.height)_.mapPass.setSize(_.map.width,_.map.height);G.uniforms.shadow_pass.value=_.map.depthTexture,G.uniforms.resolution.value.set(_.map.width,_.map.height),G.uniforms.radius.value=_.radius,J.setRenderTarget(_.mapPass),J.clear(),J.renderBufferDirect(P,null,M,G,z,null),D.uniforms.shadow_pass.value=_.mapPass.texture,D.uniforms.resolution.value.set(_.map.width,_.map.height),D.uniforms.radius.value=_.radius,J.setRenderTarget(_.map),J.clear(),J.renderBufferDirect(P,null,M,D,z,null)}function j(_,P,M,B){let c=null,v=M.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(v!==void 0)c=v;else if(c=M.isPointLight===!0?X:Y,J.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let b=c.uuid,t=P.uuid,y=U[b];if(y===void 0)y={},U[b]=y;let s=y[t];if(s===void 0)s=c.clone(),y[t]=s,P.addEventListener("dispose",I);c=s}if(c.visible=P.visible,c.wireframe=P.wireframe,B===m8)c.side=P.shadowSide!==null?P.shadowSide:P.side;else c.side=P.shadowSide!==null?P.shadowSide:q[P.side];if(c.alphaMap=P.alphaMap,c.alphaTest=P.alphaToCoverage===!0?0.5:P.alphaTest,c.map=P.map,c.clipShadows=P.clipShadows,c.clippingPlanes=P.clippingPlanes,c.clipIntersection=P.clipIntersection,c.displacementMap=P.displacementMap,c.displacementScale=P.displacementScale,c.displacementBias=P.displacementBias,c.wireframeLinewidth=P.wireframeLinewidth,c.linewidth=P.linewidth,M.isPointLight===!0&&c.isMeshDistanceMaterial===!0){let b=J.properties.get(c);b.light=M}return c}function k(_,P,M,B,c){if(_.visible===!1)return;if(_.layers.test(P.layers)&&(_.isMesh||_.isLine||_.isPoints)){if((_.castShadow||_.receiveShadow&&c===m8)&&(!_.frustumCulled||_.intersectsFrustum(Z))){_.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,_.matrixWorld);let t=Q.update(_),y=_.material;if(Array.isArray(y)){let s=t.groups;for(let J0=0,u=s.length;J0<u;J0++){let G0=s[J0],a=y[G0.materialIndex];if(a&&a.visible){let Q0=j(_,a,B,c);_.onBeforeShadow(J,_,P,M,t,Q0,G0),J.renderBufferDirect(M,null,t,Q0,_,G0),_.onAfterShadow(J,_,P,M,t,Q0,G0)}}}else if(y.visible){let s=j(_,y,B,c);_.onBeforeShadow(J,_,P,M,t,s,null),J.renderBufferDirect(M,null,t,s,_,null),_.onAfterShadow(J,_,P,M,t,s,null)}}}let b=_.children;for(let t=0,y=b.length;t<y;t++)k(b[t],P,M,B,c)}function I(_){_.target.removeEventListener("dispose",I);for(let M in U){let B=U[M],c=_.target.uuid;if(c in B)B[c].dispose(),delete B[c]}}}function mG(J,Q){function $(){let S=!1,E0=new IJ,o=null,B0=new IJ(0,0,0,0);return{setMask:function(S0){if(o!==S0&&!S)J.colorMask(S0,S0,S0,S0),o=S0},setLocked:function(S0){S=S0},setClear:function(S0,Z0,V0,o0,NJ){if(NJ===!0)S0*=o0,Z0*=o0,V0*=o0;if(E0.set(S0,Z0,V0,o0),B0.equals(E0)===!1)J.clearColor(S0,Z0,V0,o0),B0.copy(E0)},reset:function(){S=!1,o=null,B0.set(-1,0,0,0)}}}function Z(){let S=!1,E0=!1,o=null,B0=null,S0=null;return{setReversed:function(Z0){if(E0!==Z0){let V0=Q.get("EXT_clip_control");if(Z0)V0.clipControlEXT(V0.LOWER_LEFT_EXT,V0.ZERO_TO_ONE_EXT);else V0.clipControlEXT(V0.LOWER_LEFT_EXT,V0.NEGATIVE_ONE_TO_ONE_EXT);E0=Z0;let o0=S0;S0=null,this.setClear(o0)}},getReversed:function(){return E0},setTest:function(Z0){if(Z0)p(J.DEPTH_TEST);else n(J.DEPTH_TEST)},setMask:function(Z0){if(o!==Z0&&!S)J.depthMask(Z0),o=Z0},setFunc:function(Z0){if(E0)Z0=IK[Z0];if(B0!==Z0){switch(Z0){case sZ:J.depthFunc(J.NEVER);break;case iZ:J.depthFunc(J.ALWAYS);break;case oZ:J.depthFunc(J.LESS);break;case DQ:J.depthFunc(J.LEQUAL);break;case aZ:J.depthFunc(J.EQUAL);break;case rZ:J.depthFunc(J.GEQUAL);break;case tZ:J.depthFunc(J.GREATER);break;case eZ:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}B0=Z0}},setLocked:function(Z0){S=Z0},setClear:function(Z0){if(S0!==Z0){if(S0=Z0,E0)Z0=1-Z0;J.clearDepth(Z0)}},reset:function(){S=!1,o=null,B0=null,S0=null,E0=!1}}}function K(){let S=!1,E0=null,o=null,B0=null,S0=null,Z0=null,V0=null,o0=null,NJ=null;return{setTest:function(UJ){if(!S)if(UJ)p(J.STENCIL_TEST);else n(J.STENCIL_TEST)},setMask:function(UJ){if(E0!==UJ&&!S)J.stencilMask(UJ),E0=UJ},setFunc:function(UJ,oJ,$9){if(o!==UJ||B0!==oJ||S0!==$9)J.stencilFunc(UJ,oJ,$9),o=UJ,B0=oJ,S0=$9},setOp:function(UJ,oJ,$9){if(Z0!==UJ||V0!==oJ||o0!==$9)J.stencilOp(UJ,oJ,$9),Z0=UJ,V0=oJ,o0=$9},setLocked:function(UJ){S=UJ},setClear:function(UJ){if(NJ!==UJ)J.clearStencil(UJ),NJ=UJ},reset:function(){S=!1,E0=null,o=null,B0=null,S0=null,Z0=null,V0=null,o0=null,NJ=null}}}let W=new $,H=new Z,Y=new K,X=new WeakMap,U=new WeakMap,N={},q={},G={},D=new WeakMap,V=[],z=null,F=!1,E=null,C=null,j=null,k=null,I=null,_=null,P=null,M=new e0(0,0,0),B=0,c=!1,v=null,b=null,t=null,y=null,s=null,J0=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),u=!1,G0=0,a=J.getParameter(J.VERSION);if(a.indexOf("WebGL")!==-1)G0=parseFloat(/^WebGL (\d)/.exec(a)[1]),u=G0>=1;else if(a.indexOf("OpenGL ES")!==-1)G0=parseFloat(/^OpenGL ES (\d)/.exec(a)[1]),u=G0>=2;let Q0=null,W0={},u0=J.getParameter(J.SCISSOR_BOX),l0=J.getParameter(J.VIEWPORT),EJ=new IJ().fromArray(u0),$J=new IJ().fromArray(l0);function A(S,E0,o,B0){let S0=new Uint8Array(4),Z0=J.createTexture();J.bindTexture(S,Z0),J.texParameteri(S,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(S,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let V0=0;V0<o;V0++)if(S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texImage3D(E0,0,J.RGBA,1,1,B0,0,J.RGBA,J.UNSIGNED_BYTE,S0);else J.texImage2D(E0+V0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,S0);return Z0}let h={};h[J.TEXTURE_2D]=A(J.TEXTURE_2D,J.TEXTURE_2D,1),h[J.TEXTURE_CUBE_MAP]=A(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),h[J.TEXTURE_2D_ARRAY]=A(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),h[J.TEXTURE_3D]=A(J.TEXTURE_3D,J.TEXTURE_3D,1,1),W.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),p(J.DEPTH_TEST),H.setFunc(DQ),JJ(!1),ZJ(NQ),p(J.CULL_FACE),c0(V9);function p(S){if(N[S]!==!0)J.enable(S),N[S]=!0}function n(S){if(N[S]!==!1)J.disable(S),N[S]=!1}function $0(S,E0){if(G[S]!==E0){if(J.bindFramebuffer(S,E0),G[S]=E0,S===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=E0;if(S===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=E0;return!0}return!1}function K0(S,E0){let o=V,B0=!1;if(S){if(o=D.get(E0),o===void 0)o=[],D.set(E0,o);let S0=S.textures;if(o.length!==S0.length||o[0]!==J.COLOR_ATTACHMENT0){for(let Z0=0,V0=S0.length;Z0<V0;Z0++)o[Z0]=J.COLOR_ATTACHMENT0+Z0;o.length=S0.length,B0=!0}}else if(o[0]!==J.BACK)o[0]=J.BACK,B0=!0;if(B0)J.drawBuffers(o)}function X0(S){if(z!==S)return J.useProgram(S),z=S,!0;return!1}let N0={[d8]:J.FUNC_ADD,[PZ]:J.FUNC_SUBTRACT,[wZ]:J.FUNC_REVERSE_SUBTRACT};N0[TZ]=J.MIN,N0[SZ]=J.MAX;let k0={[jZ]:J.ZERO,[yZ]:J.ONE,[fZ]:J.SRC_COLOR,[bZ]:J.SRC_ALPHA,[lZ]:J.SRC_ALPHA_SATURATE,[pZ]:J.DST_COLOR,[xZ]:J.DST_ALPHA,[vZ]:J.ONE_MINUS_SRC_COLOR,[hZ]:J.ONE_MINUS_SRC_ALPHA,[mZ]:J.ONE_MINUS_DST_COLOR,[gZ]:J.ONE_MINUS_DST_ALPHA,[dZ]:J.CONSTANT_COLOR,[uZ]:J.ONE_MINUS_CONSTANT_COLOR,[cZ]:J.CONSTANT_ALPHA,[nZ]:J.ONE_MINUS_CONSTANT_ALPHA};function c0(S,E0,o,B0,S0,Z0,V0,o0,NJ,UJ){if(S===V9){if(F===!0)n(J.BLEND),F=!1;return}if(F===!1)p(J.BLEND),F=!0;if(S!==CZ){if(S!==E||UJ!==c){if(C!==d8||I!==d8)J.blendEquation(J.FUNC_ADD),C=d8,I=d8;if(UJ)switch(S){case E7:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case EQ:J.blendFunc(J.ONE,J.ONE);break;case qQ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case FQ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:s0("WebGLState: Invalid blending: ",S);break}else switch(S){case E7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case EQ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case qQ:s0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case FQ:s0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:s0("WebGLState: Invalid blending: ",S);break}j=null,k=null,_=null,P=null,M.set(0,0,0),B=0,E=S,c=UJ}return}if(S0=S0||E0,Z0=Z0||o,V0=V0||B0,E0!==C||S0!==I)J.blendEquationSeparate(N0[E0],N0[S0]),C=E0,I=S0;if(o!==j||B0!==k||Z0!==_||V0!==P)J.blendFuncSeparate(k0[o],k0[B0],k0[Z0],k0[V0]),j=o,k=B0,_=Z0,P=V0;if(o0.equals(M)===!1||NJ!==B)J.blendColor(o0.r,o0.g,o0.b,NJ),M.copy(o0),B=NJ;E=S,c=!1}function j0(S,E0){S.side===Y9?n(J.CULL_FACE):p(J.CULL_FACE);let o=S.side===pJ;if(E0)o=!o;JJ(o),S.blending===E7&&S.transparent===!1?c0(V9):c0(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),H.setFunc(S.depthFunc),H.setTest(S.depthTest),H.setMask(S.depthWrite),W.setMask(S.colorWrite);let B0=S.stencilWrite;if(Y.setTest(B0),B0)Y.setMask(S.stencilWriteMask),Y.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),Y.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass);n0(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?p(J.SAMPLE_ALPHA_TO_COVERAGE):n(J.SAMPLE_ALPHA_TO_COVERAGE)}function JJ(S){if(v!==S){if(S)J.frontFace(J.CW);else J.frontFace(J.CCW);v=S}}function ZJ(S){if(S!==AZ){if(p(J.CULL_FACE),S!==b)if(S===NQ)J.cullFace(J.BACK);else if(S===_Z)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else n(J.CULL_FACE);b=S}function v0(S){if(S!==t){if(u)J.lineWidth(S);t=S}}function n0(S,E0,o){if(S){if(p(J.POLYGON_OFFSET_FILL),y!==E0||s!==o){if(y=E0,s=o,H.getReversed())E0=-E0;J.polygonOffset(E0,o)}}else n(J.POLYGON_OFFSET_FILL)}function i0(S){if(S)p(J.SCISSOR_TEST);else n(J.SCISSOR_TEST)}function w(S){if(S===void 0)S=J.TEXTURE0+J0-1;if(Q0!==S)J.activeTexture(S),Q0=S}function KJ(S,E0,o){if(o===void 0)if(Q0===null)o=J.TEXTURE0+J0-1;else o=Q0;let B0=W0[o];if(B0===void 0)B0={type:void 0,texture:void 0},W0[o]=B0;if(B0.type!==S||B0.texture!==E0){if(Q0!==o)J.activeTexture(o),Q0=o;J.bindTexture(S,E0||h[S]),B0.type=S,B0.texture=E0}}function f0(){let S=W0[Q0];if(S!==void 0&&S.type!==void 0)J.bindTexture(S.type,null),S.type=void 0,S.texture=void 0}function C0(){try{J.compressedTexImage2D(...arguments)}catch(S){s0("WebGLState:",S)}}function L(){try{J.compressedTexImage3D(...arguments)}catch(S){s0("WebGLState:",S)}}function O(){try{J.texSubImage2D(...arguments)}catch(S){s0("WebGLState:",S)}}function T(){try{J.texSubImage3D(...arguments)}catch(S){s0("WebGLState:",S)}}function l(){try{J.compressedTexSubImage2D(...arguments)}catch(S){s0("WebGLState:",S)}}function e(){try{J.compressedTexSubImage3D(...arguments)}catch(S){s0("WebGLState:",S)}}function H0(){try{J.texStorage2D(...arguments)}catch(S){s0("WebGLState:",S)}}function q0(){try{J.texStorage3D(...arguments)}catch(S){s0("WebGLState:",S)}}function i(){try{J.texImage2D(...arguments)}catch(S){s0("WebGLState:",S)}}function r(){try{J.texImage3D(...arguments)}catch(S){s0("WebGLState:",S)}}function D0(S){if(q[S]!==void 0)return q[S];else return J.getParameter(S)}function T0(S,E0){if(q[S]!==E0)J.pixelStorei(S,E0),q[S]=E0}function O0(S){if(EJ.equals(S)===!1)J.scissor(S.x,S.y,S.z,S.w),EJ.copy(S)}function Y0(S){if($J.equals(S)===!1)J.viewport(S.x,S.y,S.z,S.w),$J.copy(S)}function R0(S,E0){let o=U.get(E0);if(o===void 0)o=new WeakMap,U.set(E0,o);let B0=o.get(S);if(B0===void 0)B0=J.getUniformBlockIndex(E0,S.name),o.set(S,B0)}function M0(S,E0){let B0=U.get(E0).get(S);if(X.get(E0)!==B0)J.uniformBlockBinding(E0,B0,S.__bindingPointIndex),X.set(E0,B0)}function b0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),N={},q={},Q0=null,W0={},G={},D=new WeakMap,V=[],z=null,F=!1,E=null,C=null,j=null,k=null,I=null,_=null,P=null,M=new e0(0,0,0),B=0,c=!1,v=null,b=null,t=null,y=null,s=null,EJ.set(0,0,J.canvas.width,J.canvas.height),$J.set(0,0,J.canvas.width,J.canvas.height),W.reset(),H.reset(),Y.reset()}return{buffers:{color:W,depth:H,stencil:Y},enable:p,disable:n,bindFramebuffer:$0,drawBuffers:K0,useProgram:X0,setBlending:c0,setMaterial:j0,setFlipSided:JJ,setCullFace:ZJ,setLineWidth:v0,setPolygonOffset:n0,setScissorTest:i0,activeTexture:w,bindTexture:KJ,unbindTexture:f0,compressedTexImage2D:C0,compressedTexImage3D:L,texImage2D:i,texImage3D:r,pixelStorei:T0,getParameter:D0,updateUBOMapping:R0,uniformBlockBinding:M0,texStorage2D:H0,texStorage3D:q0,texSubImage2D:O,texSubImage3D:T,compressedTexSubImage2D:l,compressedTexSubImage3D:e,scissor:O0,viewport:Y0,reset:b0}}function lG(J,Q,$,Z,K,W,H){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,X=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new t0,N=new WeakMap,q=new Set,G,D=new WeakMap,V=!1;try{V=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(L){}function z(L,O){return V?new OffscreenCanvas(L,O):X7("canvas")}function F(L,O,T){let l=1,e=C0(L);if(e.width>T||e.height>T)l=T/Math.max(e.width,e.height);if(l<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let H0=Math.floor(l*e.width),q0=Math.floor(l*e.height);if(G===void 0)G=z(H0,q0);let i=O?z(H0,q0):G;return i.width=H0,i.height=q0,i.getContext("2d").drawImage(L,0,0,H0,q0),d0("WebGLRenderer: Texture has been resized from ("+e.width+"x"+e.height+") to ("+H0+"x"+q0+")."),i}else{if("data"in L)d0("WebGLRenderer: Image in DataTexture is too big ("+e.width+"x"+e.height+").");return L}return L}function E(L){return L.generateMipmaps}function C(L){J.generateMipmap(L)}function j(L){if(L.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(L.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function k(L,O,T,l,e,H0=!1){if(L!==null){if(J[L]!==void 0)return J[L];d0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let q0;if(l){if(q0=Q.get("EXT_texture_norm16"),!q0)d0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let i=O;if(O===J.RED){if(T===J.FLOAT)i=J.R32F;if(T===J.HALF_FLOAT)i=J.R16F;if(T===J.UNSIGNED_BYTE)i=J.R8;if(T===J.UNSIGNED_SHORT&&q0)i=q0.R16_EXT;if(T===J.SHORT&&q0)i=q0.R16_SNORM_EXT}if(O===J.RED_INTEGER){if(T===J.UNSIGNED_BYTE)i=J.R8UI;if(T===J.UNSIGNED_SHORT)i=J.R16UI;if(T===J.UNSIGNED_INT)i=J.R32UI;if(T===J.BYTE)i=J.R8I;if(T===J.SHORT)i=J.R16I;if(T===J.INT)i=J.R32I}if(O===J.RG){if(T===J.FLOAT)i=J.RG32F;if(T===J.HALF_FLOAT)i=J.RG16F;if(T===J.UNSIGNED_BYTE)i=J.RG8;if(T===J.UNSIGNED_SHORT&&q0)i=q0.RG16_EXT;if(T===J.SHORT&&q0)i=q0.RG16_SNORM_EXT}if(O===J.RG_INTEGER){if(T===J.UNSIGNED_BYTE)i=J.RG8UI;if(T===J.UNSIGNED_SHORT)i=J.RG16UI;if(T===J.UNSIGNED_INT)i=J.RG32UI;if(T===J.BYTE)i=J.RG8I;if(T===J.SHORT)i=J.RG16I;if(T===J.INT)i=J.RG32I}if(O===J.RGB_INTEGER){if(T===J.UNSIGNED_BYTE)i=J.RGB8UI;if(T===J.UNSIGNED_SHORT)i=J.RGB16UI;if(T===J.UNSIGNED_INT)i=J.RGB32UI;if(T===J.BYTE)i=J.RGB8I;if(T===J.SHORT)i=J.RGB16I;if(T===J.INT)i=J.RGB32I}if(O===J.RGBA_INTEGER){if(T===J.UNSIGNED_BYTE)i=J.RGBA8UI;if(T===J.UNSIGNED_SHORT)i=J.RGBA16UI;if(T===J.UNSIGNED_INT)i=J.RGBA32UI;if(T===J.BYTE)i=J.RGBA8I;if(T===J.SHORT)i=J.RGBA16I;if(T===J.INT)i=J.RGBA32I}if(O===J.RGB){if(T===J.UNSIGNED_SHORT&&q0)i=q0.RGB16_EXT;if(T===J.SHORT&&q0)i=q0.RGB16_SNORM_EXT;if(T===J.UNSIGNED_INT_5_9_9_9_REV)i=J.RGB9_E5;if(T===J.UNSIGNED_INT_10F_11F_11F_REV)i=J.R11F_G11F_B10F}if(O===J.RGBA){let r=H0?Y$:HJ.getTransfer(e);if(T===J.FLOAT)i=J.RGBA32F;if(T===J.HALF_FLOAT)i=J.RGBA16F;if(T===J.UNSIGNED_BYTE)i=r===LJ?J.SRGB8_ALPHA8:J.RGBA8;if(T===J.UNSIGNED_SHORT&&q0)i=q0.RGBA16_EXT;if(T===J.SHORT&&q0)i=q0.RGBA16_SNORM_EXT;if(T===J.UNSIGNED_SHORT_4_4_4_4)i=J.RGBA4;if(T===J.UNSIGNED_SHORT_5_5_5_1)i=J.RGB5_A1}if(i===J.R16F||i===J.R32F||i===J.RG16F||i===J.RG32F||i===J.RGBA16F||i===J.RGBA32F)Q.get("EXT_color_buffer_float");return i}function I(L,O){let T;if(L){if(O===null||O===i9||O===c8)T=J.DEPTH24_STENCIL8;else if(O===v9)T=J.DEPTH32F_STENCIL8;else if(O===D7)T=J.DEPTH24_STENCIL8,d0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(O===null||O===i9||O===c8)T=J.DEPTH_COMPONENT24;else if(O===v9)T=J.DEPTH_COMPONENT32F;else if(O===D7)T=J.DEPTH_COMPONENT16;return T}function _(L,O){if(E(L)===!0||L.isFramebufferTexture&&L.minFilter!==s9&&L.minFilter!==iJ)return Math.log2(Math.max(O.width,O.height))+1;else if(L.mipmaps!==void 0&&L.mipmaps.length>0)return L.mipmaps.length;else if(L.isCompressedTexture&&Array.isArray(L.image))return O.mipmaps.length;else return 1}function P(L){let O=L.target;if(O.removeEventListener("dispose",P),B(O),O.isVideoTexture)N.delete(O);if(O.isHTMLTexture)q.delete(O)}function M(L){let O=L.target;O.removeEventListener("dispose",M),v(O)}function B(L){let O=Z.get(L);if(O.__webglInit===void 0)return;let T=L.source,l=D.get(T);if(l){let e=l[O.__cacheKey];if(e.usedTimes--,e.usedTimes===0)c(L);if(Object.keys(l).length===0)D.delete(T)}Z.remove(L)}function c(L){let O=Z.get(L);J.deleteTexture(O.__webglTexture);let T=L.source,l=D.get(T);delete l[O.__cacheKey],H.memory.textures--}function v(L){let O=Z.get(L);if(L.depthTexture)L.depthTexture.dispose(),Z.remove(L.depthTexture);if(L.isWebGLCubeRenderTarget)for(let l=0;l<6;l++){if(Array.isArray(O.__webglFramebuffer[l]))for(let e=0;e<O.__webglFramebuffer[l].length;e++)J.deleteFramebuffer(O.__webglFramebuffer[l][e]);else J.deleteFramebuffer(O.__webglFramebuffer[l]);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer[l])}else{if(Array.isArray(O.__webglFramebuffer))for(let l=0;l<O.__webglFramebuffer.length;l++)J.deleteFramebuffer(O.__webglFramebuffer[l]);else J.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer);if(O.__webglMultisampledFramebuffer)J.deleteFramebuffer(O.__webglMultisampledFramebuffer);if(O.__webglColorRenderbuffer){for(let l=0;l<O.__webglColorRenderbuffer.length;l++)if(O.__webglColorRenderbuffer[l])J.deleteRenderbuffer(O.__webglColorRenderbuffer[l])}if(O.__webglDepthRenderbuffer)J.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let T=L.textures;for(let l=0,e=T.length;l<e;l++){let H0=Z.get(T[l]);if(H0.__webglTexture)J.deleteTexture(H0.__webglTexture),H.memory.textures--;Z.remove(T[l])}Z.remove(L)}let b=0;function t(){b=0}function y(){return b}function s(L){b=L}function J0(){let L=b;if(L>=K.maxTextures)d0("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+K.maxTextures);return b+=1,L}function u(L){let O=[];return O.push(L.wrapS),O.push(L.wrapT),O.push(L.wrapR||0),O.push(L.magFilter),O.push(L.minFilter),O.push(L.anisotropy),O.push(L.internalFormat),O.push(L.format),O.push(L.type),O.push(L.generateMipmaps),O.push(L.premultiplyAlpha),O.push(L.flipY),O.push(L.unpackAlignment),O.push(L.colorSpace),O.join()}function G0(L,O){let T=Z.get(L);if(L.isVideoTexture)KJ(L);if(L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&T.__version!==L.version){let l=L.image;if(l===null)d0("WebGLRenderer: Texture marked for update but no image data found.");else if(l.complete===!1)d0("WebGLRenderer: Texture marked for update but image is incomplete");else{n(T,L,O);return}}else if(L.isExternalTexture)T.__webglTexture=L.sourceTexture?L.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,T.__webglTexture,J.TEXTURE0+O)}function a(L,O){let T=Z.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&T.__version!==L.version){n(T,L,O);return}else if(L.isExternalTexture)T.__webglTexture=L.sourceTexture?L.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,T.__webglTexture,J.TEXTURE0+O)}function Q0(L,O){let T=Z.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&T.__version!==L.version){n(T,L,O);return}$.bindTexture(J.TEXTURE_3D,T.__webglTexture,J.TEXTURE0+O)}function W0(L,O){let T=Z.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&T.__version!==L.version){$0(T,L,O);return}$.bindTexture(J.TEXTURE_CUBE_MAP,T.__webglTexture,J.TEXTURE0+O)}let u0={[ZK]:J.REPEAT,[X6]:J.CLAMP_TO_EDGE,[KK]:J.MIRRORED_REPEAT},l0={[s9]:J.NEAREST,[WK]:J.NEAREST_MIPMAP_NEAREST,[F7]:J.NEAREST_MIPMAP_LINEAR,[iJ]:J.LINEAR,[U6]:J.LINEAR_MIPMAP_NEAREST,[K8]:J.LINEAR_MIPMAP_LINEAR},EJ={[FK]:J.NEVER,[LK]:J.ALWAYS,[DK]:J.LESS,[O6]:J.LEQUAL,[OK]:J.EQUAL,[R6]:J.GEQUAL,[RK]:J.GREATER,[MK]:J.NOTEQUAL};function $J(L,O){if(O.type===v9&&Q.has("OES_texture_float_linear")===!1&&(O.magFilter===iJ||O.magFilter===U6||O.magFilter===F7||O.magFilter===K8||O.minFilter===iJ||O.minFilter===U6||O.minFilter===F7||O.minFilter===K8))d0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(L,J.TEXTURE_WRAP_S,u0[O.wrapS]),J.texParameteri(L,J.TEXTURE_WRAP_T,u0[O.wrapT]),L===J.TEXTURE_3D||L===J.TEXTURE_2D_ARRAY)J.texParameteri(L,J.TEXTURE_WRAP_R,u0[O.wrapR]);if(J.texParameteri(L,J.TEXTURE_MAG_FILTER,l0[O.magFilter]),J.texParameteri(L,J.TEXTURE_MIN_FILTER,l0[O.minFilter]),O.compareFunction)J.texParameteri(L,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(L,J.TEXTURE_COMPARE_FUNC,EJ[O.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(O.magFilter===s9)return;if(O.minFilter!==F7&&O.minFilter!==K8)return;if(O.type===v9&&Q.has("OES_texture_float_linear")===!1)return;if(O.anisotropy>1||Z.get(O).__currentAnisotropy){let T=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(L,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(O.anisotropy,K.getMaxAnisotropy())),Z.get(O).__currentAnisotropy=O.anisotropy}}}function A(L,O){let T=!1;if(L.__webglInit===void 0)L.__webglInit=!0,O.addEventListener("dispose",P);let l=O.source,e=D.get(l);if(e===void 0)e={},D.set(l,e);let H0=u(O);if(H0!==L.__cacheKey){if(e[H0]===void 0)e[H0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,T=!0;e[H0].usedTimes++;let q0=e[L.__cacheKey];if(q0!==void 0){if(e[L.__cacheKey].usedTimes--,q0.usedTimes===0)c(O)}L.__cacheKey=H0,L.__webglTexture=e[H0].texture}return T}function h(L,O,T){return Math.floor(Math.floor(L/T)/O)}function p(L,O,T,l){let H0=L.updateRanges;if(H0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,O.width,O.height,T,l,O.data);else{H0.sort((T0,O0)=>T0.start-O0.start);let q0=0;for(let T0=1;T0<H0.length;T0++){let O0=H0[q0],Y0=H0[T0],R0=O0.start+O0.count,M0=h(Y0.start,O.width,4),b0=h(O0.start,O.width,4);if(Y0.start<=R0+1&&M0===b0&&h(Y0.start+Y0.count-1,O.width,4)===M0)O0.count=Math.max(O0.count,Y0.start+Y0.count-O0.start);else++q0,H0[q0]=Y0}H0.length=q0+1;let i=$.getParameter(J.UNPACK_ROW_LENGTH),r=$.getParameter(J.UNPACK_SKIP_PIXELS),D0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,O.width);for(let T0=0,O0=H0.length;T0<O0;T0++){let Y0=H0[T0],R0=Math.floor(Y0.start/4),M0=Math.ceil(Y0.count/4),b0=R0%O.width,S=Math.floor(R0/O.width),E0=M0,o=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,b0),$.pixelStorei(J.UNPACK_SKIP_ROWS,S),$.texSubImage2D(J.TEXTURE_2D,0,b0,S,E0,1,T,l,O.data)}L.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,i),$.pixelStorei(J.UNPACK_SKIP_PIXELS,r),$.pixelStorei(J.UNPACK_SKIP_ROWS,D0)}}function n(L,O,T){let l=J.TEXTURE_2D;if(O.isDataArrayTexture||O.isCompressedArrayTexture)l=J.TEXTURE_2D_ARRAY;if(O.isData3DTexture)l=J.TEXTURE_3D;let e=A(L,O),H0=O.source;$.bindTexture(l,L.__webglTexture,J.TEXTURE0+T);let q0=Z.get(H0);if(H0.version!==q0.__version||e===!0){if($.activeTexture(J.TEXTURE0+T),(typeof ImageBitmap<"u"&&O.image instanceof ImageBitmap)===!1){let o=HJ.getPrimaries(HJ.workingColorSpace),B0=O.colorSpace===X8?null:HJ.getPrimaries(O.colorSpace),S0=O.colorSpace===X8||o===B0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,S0)}$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment);let r=F(O.image,!1,K.maxTextureSize);r=f0(O,r);let D0=W.convert(O.format,O.colorSpace),T0=W.convert(O.type),O0=k(O.internalFormat,D0,T0,O.normalized,O.colorSpace,O.isVideoTexture);$J(l,O);let Y0,R0=O.mipmaps,M0=O.isVideoTexture!==!0,b0=q0.__version===void 0||e===!0,S=H0.dataReady,E0=_(O,r);if(O.isDepthTexture){if(O0=I(O.format===H8,O.type),b0)if(M0)$.texStorage2D(J.TEXTURE_2D,1,O0,r.width,r.height);else $.texImage2D(J.TEXTURE_2D,0,O0,r.width,r.height,0,D0,T0,null)}else if(O.isDataTexture)if(R0.length>0){if(M0&&b0)$.texStorage2D(J.TEXTURE_2D,E0,O0,R0[0].width,R0[0].height);for(let o=0,B0=R0.length;o<B0;o++)if(Y0=R0[o],M0){if(S)$.texSubImage2D(J.TEXTURE_2D,o,0,0,Y0.width,Y0.height,D0,T0,Y0.data)}else $.texImage2D(J.TEXTURE_2D,o,O0,Y0.width,Y0.height,0,D0,T0,Y0.data);O.generateMipmaps=!1}else if(M0){if(b0)$.texStorage2D(J.TEXTURE_2D,E0,O0,r.width,r.height);if(S)p(O,r,D0,T0)}else $.texImage2D(J.TEXTURE_2D,0,O0,r.width,r.height,0,D0,T0,r.data);else if(O.isCompressedTexture)if(O.isCompressedArrayTexture){if(M0&&b0)$.texStorage3D(J.TEXTURE_2D_ARRAY,E0,O0,R0[0].width,R0[0].height,r.depth);for(let o=0,B0=R0.length;o<B0;o++)if(Y0=R0[o],O.format!==B9)if(D0!==null)if(M0){if(S)if(O.layerUpdates.size>0){let S0=x$(Y0.width,Y0.height,O.format,O.type);for(let Z0 of O.layerUpdates){let V0=Y0.data.subarray(Z0*S0/Y0.data.BYTES_PER_ELEMENT,(Z0+1)*S0/Y0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,o,0,0,Z0,Y0.width,Y0.height,1,D0,V0)}}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,o,0,0,0,Y0.width,Y0.height,r.depth,D0,Y0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,o,O0,Y0.width,Y0.height,r.depth,0,Y0.data,0,0);else d0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(M0){if(S)$.texSubImage3D(J.TEXTURE_2D_ARRAY,o,0,0,0,Y0.width,Y0.height,r.depth,D0,T0,Y0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,o,O0,Y0.width,Y0.height,r.depth,0,D0,T0,Y0.data);if(O.layerUpdates.size>0)O.clearLayerUpdates()}else{if(M0&&b0)$.texStorage2D(J.TEXTURE_2D,E0,O0,R0[0].width,R0[0].height);for(let o=0,B0=R0.length;o<B0;o++)if(Y0=R0[o],O.format!==B9)if(D0!==null)if(M0){if(S)$.compressedTexSubImage2D(J.TEXTURE_2D,o,0,0,Y0.width,Y0.height,D0,Y0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,o,O0,Y0.width,Y0.height,0,Y0.data);else d0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(M0){if(S)$.texSubImage2D(J.TEXTURE_2D,o,0,0,Y0.width,Y0.height,D0,T0,Y0.data)}else $.texImage2D(J.TEXTURE_2D,o,O0,Y0.width,Y0.height,0,D0,T0,Y0.data)}else if(O.isDataArrayTexture)if(M0){if(b0)$.texStorage3D(J.TEXTURE_2D_ARRAY,E0,O0,r.width,r.height,r.depth);if(S)if(O.layerUpdates.size>0){let o=x$(r.width,r.height,O.format,O.type);for(let B0 of O.layerUpdates){let S0=r.data.subarray(B0*o/r.data.BYTES_PER_ELEMENT,(B0+1)*o/r.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,B0,r.width,r.height,1,D0,T0,S0)}O.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,r.width,r.height,r.depth,D0,T0,r.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,O0,r.width,r.height,r.depth,0,D0,T0,r.data);else if(O.isData3DTexture)if(M0){if(b0)$.texStorage3D(J.TEXTURE_3D,E0,O0,r.width,r.height,r.depth);if(S)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,r.width,r.height,r.depth,D0,T0,r.data)}else $.texImage3D(J.TEXTURE_3D,0,O0,r.width,r.height,r.depth,0,D0,T0,r.data);else if(O.isFramebufferTexture){if(b0)if(M0)$.texStorage2D(J.TEXTURE_2D,E0,O0,r.width,r.height);else{let{width:o,height:B0}=r;for(let S0=0;S0<E0;S0++)$.texImage2D(J.TEXTURE_2D,S0,O0,o,B0,0,D0,T0,null),o>>=1,B0>>=1}}else if(O.isHTMLTexture){if("texElementImage2D"in J){let o=J.canvas;if(!o.hasAttribute("layoutsubtree"))o.setAttribute("layoutsubtree","true");if(r.parentNode!==o){o.appendChild(r),q.add(O),o.onpaint=(B0)=>{let S0=B0.changedElements;for(let Z0 of q)if(S0.includes(Z0.image))Z0.needsUpdate=!0},o.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,r);else{let{RGBA:S0,RGBA:Z0,UNSIGNED_BYTE:V0}=J;J.texElementImage2D(J.TEXTURE_2D,0,S0,Z0,V0,r)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(R0.length>0){if(M0&&b0){let o=C0(R0[0]);$.texStorage2D(J.TEXTURE_2D,E0,O0,o.width,o.height)}for(let o=0,B0=R0.length;o<B0;o++)if(Y0=R0[o],M0){if(S)$.texSubImage2D(J.TEXTURE_2D,o,0,0,D0,T0,Y0)}else $.texImage2D(J.TEXTURE_2D,o,O0,D0,T0,Y0);O.generateMipmaps=!1}else if(M0){if(b0){let o=C0(r);$.texStorage2D(J.TEXTURE_2D,E0,O0,o.width,o.height)}if(S)$.texSubImage2D(J.TEXTURE_2D,0,0,0,D0,T0,r)}else $.texImage2D(J.TEXTURE_2D,0,O0,D0,T0,r);if(E(O))C(l);if(q0.__version=H0.version,O.onUpdate)O.onUpdate(O)}L.__version=O.version}function $0(L,O,T){if(O.image.length!==6)return;let l=A(L,O),e=O.source;$.bindTexture(J.TEXTURE_CUBE_MAP,L.__webglTexture,J.TEXTURE0+T);let H0=Z.get(e);if(e.version!==H0.__version||l===!0){$.activeTexture(J.TEXTURE0+T);let q0=HJ.getPrimaries(HJ.workingColorSpace),i=O.colorSpace===X8?null:HJ.getPrimaries(O.colorSpace),r=O.colorSpace===X8||q0===i?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,r);let D0=O.isCompressedTexture||O.image[0].isCompressedTexture,T0=O.image[0]&&O.image[0].isDataTexture,O0=[];for(let Z0=0;Z0<6;Z0++){if(!D0&&!T0)O0[Z0]=F(O.image[Z0],!0,K.maxCubemapSize);else O0[Z0]=T0?O.image[Z0].image:O.image[Z0];O0[Z0]=f0(O,O0[Z0])}let Y0=O0[0],R0=W.convert(O.format,O.colorSpace),M0=W.convert(O.type),b0=k(O.internalFormat,R0,M0,O.normalized,O.colorSpace),S=O.isVideoTexture!==!0,E0=H0.__version===void 0||l===!0,o=e.dataReady,B0=_(O,Y0);$J(J.TEXTURE_CUBE_MAP,O);let S0;if(D0){if(S&&E0)$.texStorage2D(J.TEXTURE_CUBE_MAP,B0,b0,Y0.width,Y0.height);for(let Z0=0;Z0<6;Z0++){S0=O0[Z0].mipmaps;for(let V0=0;V0<S0.length;V0++){let o0=S0[V0];if(O.format!==B9)if(R0!==null)if(S){if(o)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,V0,0,0,o0.width,o0.height,R0,o0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,V0,b0,o0.width,o0.height,0,o0.data);else d0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(S){if(o)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,V0,0,0,o0.width,o0.height,R0,M0,o0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,V0,b0,o0.width,o0.height,0,R0,M0,o0.data)}}}else{if(S0=O.mipmaps,S&&E0){if(S0.length>0)B0++;let Z0=C0(O0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,B0,b0,Z0.width,Z0.height)}for(let Z0=0;Z0<6;Z0++)if(T0){if(S){if(o)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,0,0,0,O0[Z0].width,O0[Z0].height,R0,M0,O0[Z0].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,0,b0,O0[Z0].width,O0[Z0].height,0,R0,M0,O0[Z0].data);for(let V0=0;V0<S0.length;V0++){let NJ=S0[V0].image[Z0].image;if(S){if(o)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,V0+1,0,0,NJ.width,NJ.height,R0,M0,NJ.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,V0+1,b0,NJ.width,NJ.height,0,R0,M0,NJ.data)}}else{if(S){if(o)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,0,0,0,R0,M0,O0[Z0])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,0,b0,R0,M0,O0[Z0]);for(let V0=0;V0<S0.length;V0++){let o0=S0[V0];if(S){if(o)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,V0+1,0,0,R0,M0,o0.image[Z0])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Z0,V0+1,b0,R0,M0,o0.image[Z0])}}}if(E(O))C(J.TEXTURE_CUBE_MAP);if(H0.__version=e.version,O.onUpdate)O.onUpdate(O)}L.__version=O.version}function K0(L,O,T,l,e,H0){let q0=W.convert(T.format,T.colorSpace),i=W.convert(T.type),r=k(T.internalFormat,q0,i,T.normalized,T.colorSpace),D0=Z.get(O),T0=Z.get(T);if(T0.__renderTarget=O,!D0.__hasExternalTextures){let O0=Math.max(1,O.width>>H0),Y0=Math.max(1,O.height>>H0);if(e===J.TEXTURE_3D||e===J.TEXTURE_2D_ARRAY)$.texImage3D(e,H0,r,O0,Y0,O.depth,0,q0,i,null);else $.texImage2D(e,H0,r,O0,Y0,0,q0,i,null)}if($.bindFramebuffer(J.FRAMEBUFFER,L),w(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,l,e,T0.__webglTexture,0,i0(O));else if(e===J.TEXTURE_2D||e>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&e<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,l,e,T0.__webglTexture,H0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function X0(L,O,T){if(J.bindRenderbuffer(J.RENDERBUFFER,L),O.depthBuffer){let l=O.depthTexture,e=l&&l.isDepthTexture?l.type:null,H0=I(O.stencilBuffer,e),q0=O.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(w(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,i0(O),H0,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,i0(O),H0,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,H0,O.width,O.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,q0,J.RENDERBUFFER,L)}else{let l=O.textures;for(let e=0;e<l.length;e++){let H0=l[e],q0=W.convert(H0.format,H0.colorSpace),i=W.convert(H0.type),r=k(H0.internalFormat,q0,i,H0.normalized,H0.colorSpace);if(w(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,i0(O),r,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,i0(O),r,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,r,O.width,O.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function N0(L,O,T){let l=O.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,L),!(O.depthTexture&&O.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let e=Z.get(O.depthTexture);if(e.__renderTarget=O,!e.__webglTexture||O.depthTexture.image.width!==O.width||O.depthTexture.image.height!==O.height)O.depthTexture.image.width=O.width,O.depthTexture.image.height=O.height,O.depthTexture.needsUpdate=!0;if(l){if(e.__webglInit===void 0)e.__webglInit=!0,O.depthTexture.addEventListener("dispose",P);if(e.__webglTexture===void 0){e.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,e.__webglTexture),$J(J.TEXTURE_CUBE_MAP,O.depthTexture);let D0=W.convert(O.depthTexture.format),T0=W.convert(O.depthTexture.type),O0;if(O.depthTexture.format===W8)O0=J.DEPTH_COMPONENT24;else if(O.depthTexture.format===H8)O0=J.DEPTH24_STENCIL8;for(let Y0=0;Y0<6;Y0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Y0,0,O0,O.width,O.height,0,D0,T0,null)}}else G0(O.depthTexture,0);let H0=e.__webglTexture,q0=i0(O),i=l?J.TEXTURE_CUBE_MAP_POSITIVE_X+T:J.TEXTURE_2D,r=O.depthTexture.format===H8?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(O.depthTexture.format===W8)if(w(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,r,i,H0,0,q0);else J.framebufferTexture2D(J.FRAMEBUFFER,r,i,H0,0);else if(O.depthTexture.format===H8)if(w(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,r,i,H0,0,q0);else J.framebufferTexture2D(J.FRAMEBUFFER,r,i,H0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function k0(L){let O=Z.get(L),T=L.isWebGLCubeRenderTarget===!0;if(O.__boundDepthTexture!==L.depthTexture){let l=L.depthTexture;if(O.__depthDisposeCallback)O.__depthDisposeCallback();if(l){let e=()=>{delete O.__boundDepthTexture,delete O.__depthDisposeCallback,l.removeEventListener("dispose",e)};l.addEventListener("dispose",e),O.__depthDisposeCallback=e}O.__boundDepthTexture=l}if(L.depthTexture&&!O.__autoAllocateDepthBuffer)if(T)for(let l=0;l<6;l++)N0(O.__webglFramebuffer[l],L,l);else{let l=L.texture.mipmaps;if(l&&l.length>0)N0(O.__webglFramebuffer[0],L,0);else N0(O.__webglFramebuffer,L,0)}else if(T){O.__webglDepthbuffer=[];for(let l=0;l<6;l++)if($.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[l]),O.__webglDepthbuffer[l]===void 0)O.__webglDepthbuffer[l]=J.createRenderbuffer(),X0(O.__webglDepthbuffer[l],L,!1);else{let e=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,H0=O.__webglDepthbuffer[l];J.bindRenderbuffer(J.RENDERBUFFER,H0),J.framebufferRenderbuffer(J.FRAMEBUFFER,e,J.RENDERBUFFER,H0)}}else{let l=L.texture.mipmaps;if(l&&l.length>0)$.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer);if(O.__webglDepthbuffer===void 0)O.__webglDepthbuffer=J.createRenderbuffer(),X0(O.__webglDepthbuffer,L,!1);else{let e=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,H0=O.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,H0),J.framebufferRenderbuffer(J.FRAMEBUFFER,e,J.RENDERBUFFER,H0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function c0(L,O,T){let l=Z.get(L);if(O!==void 0)K0(l.__webglFramebuffer,L,L.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(T!==void 0)k0(L)}function j0(L){let O=L.texture,T=Z.get(L),l=Z.get(O);L.addEventListener("dispose",M);let e=L.textures,H0=L.isWebGLCubeRenderTarget===!0,q0=e.length>1;if(!q0){if(l.__webglTexture===void 0)l.__webglTexture=J.createTexture();l.__version=O.version,H.memory.textures++}if(H0){T.__webglFramebuffer=[];for(let i=0;i<6;i++)if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer[i]=[];for(let r=0;r<O.mipmaps.length;r++)T.__webglFramebuffer[i][r]=J.createFramebuffer()}else T.__webglFramebuffer[i]=J.createFramebuffer()}else{if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer=[];for(let i=0;i<O.mipmaps.length;i++)T.__webglFramebuffer[i]=J.createFramebuffer()}else T.__webglFramebuffer=J.createFramebuffer();if(q0)for(let i=0,r=e.length;i<r;i++){let D0=Z.get(e[i]);if(D0.__webglTexture===void 0)D0.__webglTexture=J.createTexture(),H.memory.textures++}if(L.samples>0&&w(L)===!1){T.__webglMultisampledFramebuffer=J.createFramebuffer(),T.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let i=0;i<e.length;i++){let r=e[i];T.__webglColorRenderbuffer[i]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,T.__webglColorRenderbuffer[i]);let D0=W.convert(r.format,r.colorSpace),T0=W.convert(r.type),O0=k(r.internalFormat,D0,T0,r.normalized,r.colorSpace,L.isXRRenderTarget===!0),Y0=i0(L);J.renderbufferStorageMultisample(J.RENDERBUFFER,Y0,O0,L.width,L.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+i,J.RENDERBUFFER,T.__webglColorRenderbuffer[i])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),L.depthBuffer)T.__webglDepthRenderbuffer=J.createRenderbuffer(),X0(T.__webglDepthRenderbuffer,L,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(H0){$.bindTexture(J.TEXTURE_CUBE_MAP,l.__webglTexture),$J(J.TEXTURE_CUBE_MAP,O);for(let i=0;i<6;i++)if(O.mipmaps&&O.mipmaps.length>0)for(let r=0;r<O.mipmaps.length;r++)K0(T.__webglFramebuffer[i][r],L,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+i,r);else K0(T.__webglFramebuffer[i],L,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);if(E(O))C(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(q0){for(let i=0,r=e.length;i<r;i++){let D0=e[i],T0=Z.get(D0),O0=J.TEXTURE_2D;if(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)O0=L.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(O0,T0.__webglTexture),$J(O0,D0),K0(T.__webglFramebuffer,L,D0,J.COLOR_ATTACHMENT0+i,O0,0),E(D0))C(O0)}$.unbindTexture()}else{let i=J.TEXTURE_2D;if(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)i=L.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(i,l.__webglTexture),$J(i,O),O.mipmaps&&O.mipmaps.length>0)for(let r=0;r<O.mipmaps.length;r++)K0(T.__webglFramebuffer[r],L,O,J.COLOR_ATTACHMENT0,i,r);else K0(T.__webglFramebuffer,L,O,J.COLOR_ATTACHMENT0,i,0);if(E(O))C(i);$.unbindTexture()}if(L.depthBuffer)k0(L)}function JJ(L){let O=L.textures;for(let T=0,l=O.length;T<l;T++){let e=O[T];if(E(e)){let H0=j(L),q0=Z.get(e).__webglTexture;$.bindTexture(H0,q0),C(H0),$.unbindTexture()}}}let ZJ=[],v0=[];function n0(L){if(L.samples>0){if(w(L)===!1){let{textures:O,width:T,height:l}=L,e=J.COLOR_BUFFER_BIT,H0=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,q0=Z.get(L),i=O.length>1;if(i)for(let D0=0;D0<O.length;D0++)$.bindFramebuffer(J.FRAMEBUFFER,q0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+D0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,q0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+D0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,q0.__webglMultisampledFramebuffer);let r=L.texture.mipmaps;if(r&&r.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,q0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,q0.__webglFramebuffer);for(let D0=0;D0<O.length;D0++){if(L.resolveDepthBuffer){if(L.depthBuffer)e|=J.DEPTH_BUFFER_BIT;if(L.stencilBuffer&&L.resolveStencilBuffer)e|=J.STENCIL_BUFFER_BIT}if(i){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,q0.__webglColorRenderbuffer[D0]);let T0=Z.get(O[D0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,T0,0)}if(J.blitFramebuffer(0,0,T,l,0,0,T,l,e,J.NEAREST),X===!0){if(ZJ.length=0,v0.length=0,ZJ.push(J.COLOR_ATTACHMENT0+D0),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1)ZJ.push(H0),v0.push(H0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,v0);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,ZJ)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),i)for(let D0=0;D0<O.length;D0++){$.bindFramebuffer(J.FRAMEBUFFER,q0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+D0,J.RENDERBUFFER,q0.__webglColorRenderbuffer[D0]);let T0=Z.get(O[D0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,q0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+D0,J.TEXTURE_2D,T0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,q0.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&X){let O=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[O])}}}function i0(L){return Math.min(K.maxSamples,L.samples)}function w(L){let O=Z.get(L);return L.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&O.__useRenderToTexture!==!1}function KJ(L){let O=H.render.frame;if(N.get(L)!==O)N.set(L,O),L.update()}function f0(L,O){let{colorSpace:T,format:l,type:e}=L;if(L.isCompressedTexture===!0||L.isVideoTexture===!0)return O;if(T!==H$&&T!==X8)if(HJ.getTransfer(T)===LJ){if(l!==B9||e!==D9)d0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else s0("WebGLTextures: Unsupported texture color space:",T);return O}function C0(L){if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement)U.width=L.naturalWidth||L.width,U.height=L.naturalHeight||L.height;else if(typeof VideoFrame<"u"&&L instanceof VideoFrame)U.width=L.displayWidth,U.height=L.displayHeight;else U.width=L.width,U.height=L.height;return U}this.allocateTextureUnit=J0,this.resetTextureUnits=t,this.getTextureUnits=y,this.setTextureUnits=s,this.setTexture2D=G0,this.setTexture2DArray=a,this.setTexture3D=Q0,this.setTextureCube=W0,this.rebindTextures=c0,this.setupRenderTarget=j0,this.updateRenderTargetMipmap=JJ,this.updateMultisampleRenderTarget=n0,this.setupDepthRenderbuffer=k0,this.setupFrameBufferTexture=K0,this.useMultisampledRTT=w,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function dG(J,Q){function $(Z,K=X8){let W,H=HJ.getTransfer(K);if(Z===D9)return J.UNSIGNED_BYTE;if(Z===zQ)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===AQ)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===XK)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===UK)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===HK)return J.BYTE;if(Z===YK)return J.SHORT;if(Z===D7)return J.UNSIGNED_SHORT;if(Z===IQ)return J.INT;if(Z===i9)return J.UNSIGNED_INT;if(Z===v9)return J.FLOAT;if(Z===k9)return J.HALF_FLOAT;if(Z===GK)return J.ALPHA;if(Z===NK)return J.RGB;if(Z===B9)return J.RGBA;if(Z===W8)return J.DEPTH_COMPONENT;if(Z===H8)return J.DEPTH_STENCIL;if(Z===EK)return J.RED;if(Z===_Q)return J.RED_INTEGER;if(Z===Y8)return J.RG;if(Z===CQ)return J.RG_INTEGER;if(Z===PQ)return J.RGBA_INTEGER;if(Z===G6||Z===N6||Z===E6||Z===q6)if(H===LJ)if(W=Q.get("WEBGL_compressed_texture_s3tc_srgb"),W!==null){if(Z===G6)return W.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===N6)return W.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===E6)return W.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===q6)return W.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(W=Q.get("WEBGL_compressed_texture_s3tc"),W!==null){if(Z===G6)return W.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===N6)return W.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===E6)return W.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===q6)return W.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===wQ||Z===TQ||Z===SQ||Z===jQ)if(W=Q.get("WEBGL_compressed_texture_pvrtc"),W!==null){if(Z===wQ)return W.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===TQ)return W.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===SQ)return W.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===jQ)return W.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===yQ||Z===fQ||Z===vQ||Z===bQ||Z===hQ||Z===F6||Z===xQ)if(W=Q.get("WEBGL_compressed_texture_etc"),W!==null){if(Z===yQ||Z===fQ)return H===LJ?W.COMPRESSED_SRGB8_ETC2:W.COMPRESSED_RGB8_ETC2;if(Z===vQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:W.COMPRESSED_RGBA8_ETC2_EAC;if(Z===bQ)return W.COMPRESSED_R11_EAC;if(Z===hQ)return W.COMPRESSED_SIGNED_R11_EAC;if(Z===F6)return W.COMPRESSED_RG11_EAC;if(Z===xQ)return W.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===gQ||Z===pQ||Z===mQ||Z===lQ||Z===dQ||Z===uQ||Z===cQ||Z===nQ||Z===sQ||Z===iQ||Z===oQ||Z===aQ||Z===rQ||Z===tQ)if(W=Q.get("WEBGL_compressed_texture_astc"),W!==null){if(Z===gQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:W.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===pQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:W.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===mQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:W.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===lQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:W.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===dQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:W.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===uQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:W.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===cQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:W.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===nQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:W.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===sQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:W.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===iQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:W.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===oQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:W.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===aQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:W.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===rQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:W.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===tQ)return H===LJ?W.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:W.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===eQ||Z===J$||Z===Q$)if(W=Q.get("EXT_texture_compression_bptc"),W!==null){if(Z===eQ)return H===LJ?W.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:W.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===J$)return W.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===Q$)return W.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===$$||Z===Z$||Z===D6||Z===K$)if(W=Q.get("EXT_texture_compression_rgtc"),W!==null){if(Z===$$)return W.COMPRESSED_RED_RGTC1_EXT;if(Z===Z$)return W.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===D6)return W.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===K$)return W.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===c8)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}var uG=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cG=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class UW{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new C6(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new X9({vertexShader:uG,fragmentShader:cG,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new x0(new I9(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class GW extends b9{constructor(J,Q){super();let $=this,Z=null,K=1,W=null,H="local-floor",Y=1,X=null,U=null,N=null,q=null,G=null,D=null,V=typeof XRWebGLBinding<"u",z=new UW,F={},E=Q.getContextAttributes(),C=null,j=null,k=[],I=[],_=new t0,P=null,M=null,B=new nJ;B.viewport=new IJ;let c=new nJ;c.viewport=new IJ;let v=[B,c],b=new f$,t=null,y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(A){let h=k[A];if(h===void 0)h=new R7,k[A]=h;return h.getTargetRaySpace()},this.getControllerGrip=function(A){let h=k[A];if(h===void 0)h=new R7,k[A]=h;return h.getGripSpace()},this.getHand=function(A){let h=k[A];if(h===void 0)h=new R7,k[A]=h;return h.getHandSpace()};function s(A){let h=I.indexOf(A.inputSource);if(h===-1)return;let p=k[h];if(p!==void 0)p.update(A.inputSource,A.frame,X||W),p.dispatchEvent({type:A.type,data:A.inputSource})}function J0(){Z.removeEventListener("select",s),Z.removeEventListener("selectstart",s),Z.removeEventListener("selectend",s),Z.removeEventListener("squeeze",s),Z.removeEventListener("squeezestart",s),Z.removeEventListener("squeezeend",s),Z.removeEventListener("end",J0),Z.removeEventListener("inputsourceschange",u);for(let A=0;A<k.length;A++){let h=I[A];if(h===null)continue;I[A]=null,k[A].disconnect(h)}t=null,y=null,z.reset();for(let A in F)delete F[A];if(J.setRenderTarget(C),G=null,q=null,N=null,Z=null,j=null,$J.stop(),$.isPresenting=!1,J.setPixelRatio(P),J.setSize(_.width,_.height,!1),M!==null){let A=M.camera;A.fov=M.fov,A.zoom=M.zoom,A.updateProjectionMatrix(),M=null}$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(A){if(K=A,$.isPresenting===!0)d0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(A){if(H=A,$.isPresenting===!0)d0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return X||W},this.setReferenceSpace=function(A){X=A},this.getBaseLayer=function(){return q!==null?q:G},this.getBinding=function(){if(N===null&&V)N=new XRWebGLBinding(Z,Q);return N},this.getFrame=function(){return D},this.getSession=function(){return Z},this.setSession=async function(A){if(Z=A,Z!==null){if(C=J.getRenderTarget(),Z.addEventListener("select",s),Z.addEventListener("selectstart",s),Z.addEventListener("selectend",s),Z.addEventListener("squeeze",s),Z.addEventListener("squeezestart",s),Z.addEventListener("squeezeend",s),Z.addEventListener("end",J0),Z.addEventListener("inputsourceschange",u),E.xrCompatible!==!0)await Q.makeXRCompatible();if(P=J.getPixelRatio(),J.getSize(_),!(V&&("createProjectionLayer"in XRWebGLBinding.prototype))){let p={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:K};G=new XRWebGLLayer(Z,Q,p),Z.updateRenderState({baseLayer:G}),J.setPixelRatio(1),J.setSize(G.framebufferWidth,G.framebufferHeight,!1),j=new J9(G.framebufferWidth,G.framebufferHeight,{format:B9,type:D9,colorSpace:J.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1,storeMultisampledDepthBuffer:G.ignoreDepthValues===!1,storeMultisampledStencilBuffer:G.ignoreDepthValues===!1})}else{let p=null,n=null,$0=null;if(E.depth)$0=E.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,p=E.stencil?H8:W8,n=E.stencil?c8:i9;let K0={colorFormat:Q.RGBA8,depthFormat:$0,scaleFactor:K};N=this.getBinding(),q=N.createProjectionLayer(K0),Z.updateRenderState({layers:[q]}),J.setPixelRatio(1),J.setSize(q.textureWidth,q.textureHeight,!1),j=new J9(q.textureWidth,q.textureHeight,{format:B9,type:D9,depthTexture:new N8(q.textureWidth,q.textureHeight,n,void 0,void 0,void 0,void 0,void 0,void 0,p),stencilBuffer:E.stencil,colorSpace:J.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:q.ignoreDepthValues===!1,resolveStencilBuffer:q.ignoreDepthValues===!1,storeMultisampledDepthBuffer:q.ignoreDepthValues===!1,storeMultisampledStencilBuffer:q.ignoreDepthValues===!1})}j.isXRRenderTarget=!0,this.setFoveation(Y),X=null,W=await Z.requestReferenceSpace(H),$J.setContext(Z),$J.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return z.getDepthTexture()};function u(A){for(let h=0;h<A.removed.length;h++){let p=A.removed[h],n=I.indexOf(p);if(n>=0)I[n]=null,k[n].disconnect(p)}for(let h=0;h<A.added.length;h++){let p=A.added[h],n=I.indexOf(p);if(n===-1){for(let K0=0;K0<k.length;K0++)if(K0>=I.length){I.push(p),n=K0;break}else if(I[K0]===null){I[K0]=p,n=K0;break}if(n===-1)break}let $0=k[n];if($0)$0.connect(p)}}let G0=new x,a=new x;function Q0(A,h,p){G0.setFromMatrixPosition(h.matrixWorld),a.setFromMatrixPosition(p.matrixWorld);let n=G0.distanceTo(a),$0=h.projectionMatrix.elements,K0=p.projectionMatrix.elements,X0=$0[14]/($0[10]-1),N0=$0[14]/($0[10]+1),k0=($0[9]+1)/$0[5],c0=($0[9]-1)/$0[5],j0=($0[8]-1)/$0[0],JJ=(K0[8]+1)/K0[0],ZJ=X0*j0,v0=X0*JJ,n0=n/(-j0+JJ),i0=n0*-j0;if(h.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(i0),A.translateZ(n0),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),$0[10]===-1)A.projectionMatrix.copy(h.projectionMatrix),A.projectionMatrixInverse.copy(h.projectionMatrixInverse);else{let w=X0+n0,KJ=N0+n0,f0=ZJ-i0,C0=v0+(n-i0),L=k0*N0/KJ*w,O=c0*N0/KJ*w;A.projectionMatrix.makePerspective(f0,C0,L,O,w,KJ),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}}function W0(A,h){if(h===null)A.matrixWorld.copy(A.matrix);else A.matrixWorld.multiplyMatrices(h.matrixWorld,A.matrix);A.matrixWorldInverse.copy(A.matrixWorld).invert()}this.updateCamera=function(A){if(Z===null)return;let{near:h,far:p}=A;if(z.texture!==null){if(z.depthNear>0)h=z.depthNear;if(z.depthFar>0)p=z.depthFar}if(b.near=c.near=B.near=h,b.far=c.far=B.far=p,t!==b.near||y!==b.far)Z.updateRenderState({depthNear:b.near,depthFar:b.far}),t=b.near,y=b.far;b.layers.mask=A.layers.mask|6,B.layers.mask=b.layers.mask&-5,c.layers.mask=b.layers.mask&-3;let n=A.parent,$0=b.cameras;W0(b,n);for(let K0=0;K0<$0.length;K0++)W0($0[K0],n);if($0.length===2)Q0(b,B,c);else b.projectionMatrix.copy(B.projectionMatrix);if(M===null&&A.isPerspectiveCamera)M={camera:A,fov:A.fov,zoom:A.zoom};u0(A,b,n)};function u0(A,h,p){if(p===null)A.matrix.copy(h.matrixWorld);else A.matrix.copy(p.matrixWorld),A.matrix.invert(),A.matrix.multiply(h.matrixWorld);if(A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(h.projectionMatrix),A.projectionMatrixInverse.copy(h.projectionMatrixInverse),A.isPerspectiveCamera)A.fov=p8*2*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1}this.getCamera=function(){return b},this.getFoveation=function(){if(q===null&&G===null)return;return Y},this.setFoveation=function(A){if(Y=A,q!==null)q.fixedFoveation=A;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=A},this.hasDepthSensing=function(){return z.texture!==null},this.getDepthSensingMesh=function(){return z.getMesh(b)},this.getCameraTexture=function(A){return F[A]};let l0=null;function EJ(A,h){if(U=h.getViewerPose(X||W),D=h,U!==null){let p=U.views;if(G!==null)J.setRenderTargetFramebuffer(j,G.framebuffer),J.setRenderTarget(j);let n=!1;if(p.length!==b.cameras.length)b.cameras.length=0,n=!0;for(let N0=0;N0<p.length;N0++){let k0=p[N0],c0=null;if(G!==null)c0=G.getViewport(k0);else{let JJ=N.getViewSubImage(q,k0);if(c0=JJ.viewport,N0===0)J.setRenderTargetTextures(j,JJ.colorTexture,JJ.depthStencilTexture),J.setRenderTarget(j)}let j0=v[N0];if(j0===void 0)j0=new nJ,j0.layers.enable(N0),j0.viewport=new IJ,v[N0]=j0;if(j0.matrix.fromArray(k0.transform.matrix),j0.matrix.decompose(j0.position,j0.quaternion,j0.scale),j0.projectionMatrix.fromArray(k0.projectionMatrix),j0.projectionMatrixInverse.copy(j0.projectionMatrix).invert(),j0.viewport.set(c0.x,c0.y,c0.width,c0.height),N0===0)b.matrix.copy(j0.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale);if(n===!0)b.cameras.push(j0)}let $0=Z.enabledFeatures;if($0&&$0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&V){N=$.getBinding();let N0=N.getDepthInformation(p[0]);if(N0&&N0.isValid&&N0.texture)z.init(N0,Z.renderState)}if($0&&$0.includes("camera-access")&&V){J.state.unbindTexture(),N=$.getBinding();for(let N0=0;N0<p.length;N0++){let k0=p[N0].camera;if(k0){let c0=F[k0];if(!c0)c0=new C6,F[k0]=c0;let j0=N.getCameraImage(k0);c0.sourceTexture=j0}}}}for(let p=0;p<k.length;p++){let n=I[p],$0=k[p];if(n!==null&&$0!==void 0)$0.update(n,h,X||W)}if(l0)l0(A,h);if(h.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:h});D=null}let $J=new tK;$J.setAnimationLoop(EJ),this.setAnimationLoop=function(A){l0=A},this.dispose=function(){}}}var nG=new BJ,NW=new r0;NW.set(-1,0,0,0,1,0,0,0,1);function sG(J,Q){function $(F,E){if(F.matrixAutoUpdate===!0)F.updateMatrix();E.value.copy(F.matrix)}function Z(F,E){if(E.color.getRGB(F.fogColor.value,M$(J)),E.isFog)F.fogNear.value=E.near,F.fogFar.value=E.far;else if(E.isFogExp2)F.fogDensity.value=E.density}function K(F,E,C,j,k){if(E.isNodeMaterial)E.uniformsNeedUpdate=!1;else if(E.isMeshBasicMaterial)W(F,E);else if(E.isMeshLambertMaterial){if(W(F,E),E.envMap)F.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshToonMaterial)W(F,E),q(F,E);else if(E.isMeshPhongMaterial){if(W(F,E),N(F,E),E.envMap)F.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshStandardMaterial){if(W(F,E),G(F,E),E.isMeshPhysicalMaterial)D(F,E,k)}else if(E.isMeshMatcapMaterial)W(F,E),V(F,E);else if(E.isMeshDepthMaterial)W(F,E);else if(E.isMeshDistanceMaterial)W(F,E),z(F,E);else if(E.isMeshNormalMaterial)W(F,E);else if(E.isLineBasicMaterial){if(H(F,E),E.isLineDashedMaterial)Y(F,E)}else if(E.isPointsMaterial)X(F,E,C,j);else if(E.isSpriteMaterial)U(F,E);else if(E.isShadowMaterial)F.color.value.copy(E.color),F.opacity.value=E.opacity;else if(E.isShaderMaterial)E.uniformsNeedUpdate=!1}function W(F,E){if(F.opacity.value=E.opacity,E.color)F.diffuse.value.copy(E.color);if(E.emissive)F.emissive.value.copy(E.emissive).multiplyScalar(E.emissiveIntensity);if(E.map)F.map.value=E.map,$(E.map,F.mapTransform);if(E.alphaMap)F.alphaMap.value=E.alphaMap,$(E.alphaMap,F.alphaMapTransform);if(E.bumpMap){if(F.bumpMap.value=E.bumpMap,$(E.bumpMap,F.bumpMapTransform),F.bumpScale.value=E.bumpScale,E.side===pJ)F.bumpScale.value*=-1}if(E.normalMap){if(F.normalMap.value=E.normalMap,$(E.normalMap,F.normalMapTransform),F.normalScale.value.copy(E.normalScale),E.side===pJ)F.normalScale.value.negate()}if(E.displacementMap)F.displacementMap.value=E.displacementMap,$(E.displacementMap,F.displacementMapTransform),F.displacementScale.value=E.displacementScale,F.displacementBias.value=E.displacementBias;if(E.emissiveMap)F.emissiveMap.value=E.emissiveMap,$(E.emissiveMap,F.emissiveMapTransform);if(E.specularMap)F.specularMap.value=E.specularMap,$(E.specularMap,F.specularMapTransform);if(E.alphaTest>0)F.alphaTest.value=E.alphaTest;let C=Q.get(E),j=C.envMap,k=C.envMapRotation;if(j){if(F.envMap.value=j,F.envMapRotation.value.setFromMatrix4(nG.makeRotationFromEuler(k)).transpose(),j.isCubeTexture&&j.isRenderTargetTexture===!1)F.envMapRotation.value.premultiply(NW);F.reflectivity.value=E.reflectivity,F.ior.value=E.ior,F.refractionRatio.value=E.refractionRatio}if(E.lightMap)F.lightMap.value=E.lightMap,F.lightMapIntensity.value=E.lightMapIntensity,$(E.lightMap,F.lightMapTransform);if(E.aoMap)F.aoMap.value=E.aoMap,F.aoMapIntensity.value=E.aoMapIntensity,$(E.aoMap,F.aoMapTransform)}function H(F,E){if(F.diffuse.value.copy(E.color),F.opacity.value=E.opacity,E.map)F.map.value=E.map,$(E.map,F.mapTransform)}function Y(F,E){F.dashSize.value=E.dashSize,F.totalSize.value=E.dashSize+E.gapSize,F.scale.value=E.scale}function X(F,E,C,j){if(F.diffuse.value.copy(E.color),F.opacity.value=E.opacity,F.size.value=E.size*C,F.scale.value=j*0.5,E.map)F.map.value=E.map,$(E.map,F.uvTransform);if(E.alphaMap)F.alphaMap.value=E.alphaMap,$(E.alphaMap,F.alphaMapTransform);if(E.alphaTest>0)F.alphaTest.value=E.alphaTest}function U(F,E){if(F.diffuse.value.copy(E.color),F.opacity.value=E.opacity,F.rotation.value=E.rotation,E.map)F.map.value=E.map,$(E.map,F.mapTransform);if(E.alphaMap)F.alphaMap.value=E.alphaMap,$(E.alphaMap,F.alphaMapTransform);if(E.alphaTest>0)F.alphaTest.value=E.alphaTest}function N(F,E){F.specular.value.copy(E.specular),F.shininess.value=Math.max(E.shininess,0.0001)}function q(F,E){if(E.gradientMap)F.gradientMap.value=E.gradientMap}function G(F,E){if(F.metalness.value=E.metalness,E.metalnessMap)F.metalnessMap.value=E.metalnessMap,$(E.metalnessMap,F.metalnessMapTransform);if(F.roughness.value=E.roughness,E.roughnessMap)F.roughnessMap.value=E.roughnessMap,$(E.roughnessMap,F.roughnessMapTransform);if(E.envMap)F.envMapIntensity.value=E.envMapIntensity}function D(F,E,C){if(F.ior.value=E.ior,E.sheen>0){if(F.sheenColor.value.copy(E.sheenColor).multiplyScalar(E.sheen),F.sheenRoughness.value=E.sheenRoughness,E.sheenColorMap)F.sheenColorMap.value=E.sheenColorMap,$(E.sheenColorMap,F.sheenColorMapTransform);if(E.sheenRoughnessMap)F.sheenRoughnessMap.value=E.sheenRoughnessMap,$(E.sheenRoughnessMap,F.sheenRoughnessMapTransform)}if(E.clearcoat>0){if(F.clearcoat.value=E.clearcoat,F.clearcoatRoughness.value=E.clearcoatRoughness,E.clearcoatMap)F.clearcoatMap.value=E.clearcoatMap,$(E.clearcoatMap,F.clearcoatMapTransform);if(E.clearcoatRoughnessMap)F.clearcoatRoughnessMap.value=E.clearcoatRoughnessMap,$(E.clearcoatRoughnessMap,F.clearcoatRoughnessMapTransform);if(E.clearcoatNormalMap){if(F.clearcoatNormalMap.value=E.clearcoatNormalMap,$(E.clearcoatNormalMap,F.clearcoatNormalMapTransform),F.clearcoatNormalScale.value.copy(E.clearcoatNormalScale),E.side===pJ)F.clearcoatNormalScale.value.negate()}}if(E.dispersion>0)F.dispersion.value=E.dispersion;if(E.retroreflectivity>0)F.retroreflectivity.value=E.retroreflectivity;if(E.iridescence>0){if(F.iridescence.value=E.iridescence,F.iridescenceIOR.value=E.iridescenceIOR,F.iridescenceThicknessMinimum.value=E.iridescenceThicknessRange[0],F.iridescenceThicknessMaximum.value=E.iridescenceThicknessRange[1],E.iridescenceMap)F.iridescenceMap.value=E.iridescenceMap,$(E.iridescenceMap,F.iridescenceMapTransform);if(E.iridescenceThicknessMap)F.iridescenceThicknessMap.value=E.iridescenceThicknessMap,$(E.iridescenceThicknessMap,F.iridescenceThicknessMapTransform)}if(E.transmission>0){if(F.transmission.value=E.transmission,F.transmissionSamplerMap.value=C.texture,F.transmissionSamplerSize.value.set(C.width,C.height),E.transmissionMap)F.transmissionMap.value=E.transmissionMap,$(E.transmissionMap,F.transmissionMapTransform);if(F.thickness.value=E.thickness,E.thicknessMap)F.thicknessMap.value=E.thicknessMap,$(E.thicknessMap,F.thicknessMapTransform);F.attenuationDistance.value=E.attenuationDistance,F.attenuationColor.value.copy(E.attenuationColor)}if(E.anisotropy>0){if(F.anisotropyVector.value.set(E.anisotropy*Math.cos(E.anisotropyRotation),E.anisotropy*Math.sin(E.anisotropyRotation)),E.anisotropyMap)F.anisotropyMap.value=E.anisotropyMap,$(E.anisotropyMap,F.anisotropyMapTransform)}if(F.specularIntensity.value=E.specularIntensity,F.specularColor.value.copy(E.specularColor),E.specularColorMap)F.specularColorMap.value=E.specularColorMap,$(E.specularColorMap,F.specularColorMapTransform);if(E.specularIntensityMap)F.specularIntensityMap.value=E.specularIntensityMap,$(E.specularIntensityMap,F.specularIntensityMapTransform)}function V(F,E){if(E.matcap)F.matcap.value=E.matcap}function z(F,E){let C=Q.get(E).light;F.referencePosition.value.setFromMatrixPosition(C.matrixWorld),F.nearDistance.value=C.shadow.camera.near,F.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:K}}function iG(J,Q,$,Z){let K={},W={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function X(k,I){let _=I.program;Z.uniformBlockBinding(k,_)}function U(k,I){let _=K[k.id];if(_===void 0)F(k),_=N(k),K[k.id]=_,k.addEventListener("dispose",C);let P=I.program;Z.updateUBOMapping(k,P);let M=Q.render.frame;if(W[k.id]!==M)G(k),W[k.id]=M}function N(k){let I=q();k.__bindingPointIndex=I;let _=J.createBuffer(),P=k.__size,M=k.usage;return J.bindBuffer(J.UNIFORM_BUFFER,_),J.bufferData(J.UNIFORM_BUFFER,P,M),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,I,_),_}function q(){for(let k=0;k<Y;k++)if(H.indexOf(k)===-1)return H.push(k),k;return s0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(k){let I=K[k.id],_=k.uniforms,P=k.__cache;J.bindBuffer(J.UNIFORM_BUFFER,I);for(let M=0,B=_.length;M<B;M++){let c=_[M];if(Array.isArray(c))for(let v=0,b=c.length;v<b;v++)D(c[v],M,v,P);else D(c,M,0,P)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function D(k,I,_,P){if(z(k,I,_,P)===!0){let{__offset:M,value:B}=k;if(Array.isArray(B)){let c=0;for(let v=0;v<B.length;v++){let b=B[v],t=E(b);if(V(b,k.__data,c),typeof b!=="number"&&typeof b!=="boolean"&&!b.isMatrix3&&!ArrayBuffer.isView(b))c+=t.storage/Float32Array.BYTES_PER_ELEMENT}}else V(B,k.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,M,k.__data)}}function V(k,I,_){if(typeof k==="number"||typeof k==="boolean")I[0]=k;else if(k.isMatrix3)I[0]=k.elements[0],I[1]=k.elements[1],I[2]=k.elements[2],I[3]=0,I[4]=k.elements[3],I[5]=k.elements[4],I[6]=k.elements[5],I[7]=0,I[8]=k.elements[6],I[9]=k.elements[7],I[10]=k.elements[8],I[11]=0;else if(ArrayBuffer.isView(k))I.set(new k.constructor(k.buffer,k.byteOffset,I.length));else k.toArray(I,_)}function z(k,I,_,P){let M=k.value,B=I+"_"+_;if(P[B]===void 0){if(typeof M==="number"||typeof M==="boolean")P[B]=M;else if(ArrayBuffer.isView(M))P[B]=M.slice();else P[B]=M.clone();return!0}else{let c=P[B];if(typeof M==="number"||typeof M==="boolean"){if(c!==M)return P[B]=M,!0}else if(ArrayBuffer.isView(M))return!0;else if(c.equals(M)===!1)return c.copy(M),!0}return!1}function F(k){let I=k.uniforms,_=0,P=16;for(let B=0,c=I.length;B<c;B++){let v=Array.isArray(I[B])?I[B]:[I[B]];for(let b=0,t=v.length;b<t;b++){let y=v[b],s=Array.isArray(y.value)?y.value:[y.value];for(let J0=0,u=s.length;J0<u;J0++){let G0=s[J0],a=E(G0),Q0=_%P,W0=Q0%a.boundary,u0=Q0+W0;if(_+=W0,u0!==0&&P-u0<a.storage)_+=P-u0;y.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),y.__offset=_,_+=a.storage}}}let M=_%P;if(M>0)_+=P-M;return k.__size=_,k.__cache={},this}function E(k){let I={boundary:0,storage:0};if(typeof k==="number"||typeof k==="boolean")I.boundary=4,I.storage=4;else if(k.isVector2)I.boundary=8,I.storage=8;else if(k.isVector3||k.isColor)I.boundary=16,I.storage=12;else if(k.isVector4)I.boundary=16,I.storage=16;else if(k.isMatrix3)I.boundary=48,I.storage=48;else if(k.isMatrix4)I.boundary=64,I.storage=64;else if(k.isTexture)d0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(k))I.boundary=16,I.storage=k.byteLength;else d0("WebGLRenderer: Unsupported uniform value type.",k);return I}function C(k){let I=k.target;I.removeEventListener("dispose",C);let _=H.indexOf(I.__bindingPointIndex);H.splice(_,1),J.deleteBuffer(K[I.id]),delete K[I.id],delete W[I.id]}function j(){for(let k in K)J.deleteBuffer(K[k]);H=[],K={},W={}}return{bind:X,update:U,dispose:j}}var oG=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),z9=null;function aG(){if(z9===null)z9=new D$(oG,16,16,Y8,k9),z9.name="DFG_LUT",z9.minFilter=iJ,z9.magFilter=iJ,z9.wrapS=X6,z9.wrapT=X6,z9.generateMipmaps=!1,z9.needsUpdate=!0;return z9}class g6{constructor(J={}){let{canvas:Q=VK(),context:$=null,depth:Z=!0,stencil:K=!1,alpha:W=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:X=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:N=!1,reversedDepthBuffer:q=!1,outputBufferType:G=D9}=J;this.isWebGLRenderer=!0;let D;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");D=$.getContextAttributes().alpha}else D=W;let V=G,z=new Set([PQ,CQ,_Q]),F=new Set([D9,i9,D7,c8,zQ,AQ]),E=new Uint32Array(4),C=new Int32Array(4),j=new x,k=null,I=null,_=[],P=[],M=null;this.domElement=Q,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=F9,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let B=this,c=!1,v=null,b=null,t=null,y=null;this._outputColorSpace=o9;let s=0,J0=0,u=null,G0=-1,a=null,Q0=new IJ,W0=new IJ,u0=null,l0=new e0(0),EJ=0,$J=Q.width,A=Q.height,h=1,p=null,n=null,$0=new IJ(0,0,$J,A),K0=new IJ(0,0,$J,A),X0=!1,N0=new V7,k0=!1,c0=!1,j0=new BJ,JJ=new x,ZJ=new IJ,v0={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},n0=!1;function i0(){return u===null?h:1}let w=$;function KJ(R,f){return Q.getContext(R,f)}let f0,C0,L,O,T,l,e,H0,q0,i,r,D0,T0,O0,Y0,R0,M0,b0,S,E0,o,B0,S0;try{let R={alpha:!0,depth:Z,stencil:K,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:X,powerPreference:U,failIfMajorPerformanceCaveat:N};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${zZ}`);if(Q.addEventListener("webglcontextlost",o0,!1),Q.addEventListener("webglcontextrestored",NJ,!1),Q.addEventListener("webglcontextcreationerror",UJ,!1),w===null){if(w=KJ("webgl2",R),w===null)if(KJ("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}Z0()}catch(R){throw Q.removeEventListener("webglcontextlost",o0,!1),Q.removeEventListener("webglcontextrestored",NJ,!1),Q.removeEventListener("webglcontextcreationerror",UJ,!1),s0("WebGLRenderer: "+R.message),R}function Z0(){if(f0=new ZU(w),f0.init(),o=new dG(w,f0),C0=new sX(w,f0,J,o),L=new mG(w,f0),C0.reversedDepthBuffer&&q)L.buffers.depth.setReversed(!0);b=w.createFramebuffer(),t=w.createFramebuffer(),y=w.createFramebuffer(),O=new HU(w),T=new CG,l=new lG(w,f0,L,T,C0,o,O),e=new $U(B),H0=new XH(w),B0=new cX(w,H0),q0=new KU(w,H0,O,B0),i=new XU(w,q0,H0,B0,O),b0=new YU(w,C0,l),Y0=new iX(T),r=new _G(B,e,f0,C0,B0,Y0),D0=new sG(B,T),T0=new wG,O0=new vG(f0),M0=new uX(B,e,L,i,D,Y),R0=new pG(B,i,C0),S0=new iG(w,O,C0,L),S=new nX(w,f0,O),E0=new WU(w,f0,O),O.programs=r.programs,B.capabilities=C0,B.extensions=f0,B.properties=T,B.renderLists=T0,B.shadowMap=R0,B.state=L,B.info=O}if(V!==D9)M=new GU(V,Q.width,Q.height,H,Z,K);let V0=new GW(B,w);this.xr=V0,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){let R=f0.get("WEBGL_lose_context");if(R)R.loseContext()},this.forceContextRestore=function(){let R=f0.get("WEBGL_lose_context");if(R)R.restoreContext()},this.getPixelRatio=function(){return h},this.setPixelRatio=function(R){if(R===void 0)return;h=R,this.setSize($J,A,!1)},this.getSize=function(R){return R.set($J,A)},this.setSize=function(R,f,d=!0){if(V0.isPresenting){d0("WebGLRenderer: Can't change size while VR device is presenting.");return}if($J=R,A=f,Q.width=Math.floor(R*h),Q.height=Math.floor(f*h),d===!0)Q.style.width=R+"px",Q.style.height=f+"px";if(M!==null)M.setSize(Q.width,Q.height);this.setViewport(0,0,R,f)},this.getDrawingBufferSize=function(R){return R.set($J*h,A*h).floor()},this.setDrawingBufferSize=function(R,f,d){$J=R,A=f,h=d,Q.width=Math.floor(R*d),Q.height=Math.floor(f*d),this.setViewport(0,0,R,f)},this.setEffects=function(R){if(V===D9){s0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let f=0;f<R.length;f++)if(R[f].isOutputPass===!0){d0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(Q0)},this.getViewport=function(R){return R.copy($0)},this.setViewport=function(R,f,d,g){if(R.isVector4)$0.set(R.x,R.y,R.z,R.w);else $0.set(R,f,d,g);L.viewport(Q0.copy($0).multiplyScalar(h).round())},this.getScissor=function(R){return R.copy(K0)},this.setScissor=function(R,f,d,g){if(R.isVector4)K0.set(R.x,R.y,R.z,R.w);else K0.set(R,f,d,g);L.scissor(W0.copy(K0).multiplyScalar(h).round())},this.getScissorTest=function(){return X0},this.setScissorTest=function(R){L.setScissorTest(X0=R)},this.setOpaqueSort=function(R){p=R},this.setTransparentSort=function(R){n=R},this.getClearColor=function(R){return R.copy(M0.getClearColor())},this.setClearColor=function(){M0.setClearColor(...arguments)},this.getClearAlpha=function(){return M0.getClearAlpha()},this.setClearAlpha=function(){M0.setClearAlpha(...arguments)},this.clear=function(R=!0,f=!0,d=!0){let g=0;if(R){let m=!1;if(u!==null){let z0=u.texture.format;m=z.has(z0)}if(m){let z0=u.texture.type,y0=F.has(z0),I0=M0.getClearColor(),U0=M0.getClearAlpha(),L0=I0.r,p0=I0.g,h0=I0.b;if(y0)E[0]=L0,E[1]=p0,E[2]=h0,E[3]=U0,w.clearBufferuiv(w.COLOR,0,E);else C[0]=L0,C[1]=p0,C[2]=h0,C[3]=U0,w.clearBufferiv(w.COLOR,0,C)}else g|=w.COLOR_BUFFER_BIT}if(f)g|=w.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(d)g|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(g!==0)w.clear(g)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),v=R},this.dispose=function(){Q.removeEventListener("webglcontextlost",o0,!1),Q.removeEventListener("webglcontextrestored",NJ,!1),Q.removeEventListener("webglcontextcreationerror",UJ,!1),M0.dispose(),T0.dispose(),O0.dispose(),T.dispose(),e.dispose(),i.dispose(),B0.dispose(),S0.dispose(),r.dispose(),V0.dispose(),V0.removeEventListener("sessionstart",P0),V0.removeEventListener("sessionend",a0),m0.stop()};function o0(R){R.preventDefault(),U7("WebGLRenderer: Context Lost."),c=!0}function NJ(){U7("WebGLRenderer: Context Restored."),c=!1;let R=O.autoReset,f=R0.enabled,d=R0.autoUpdate,g=R0.needsUpdate,m=R0.type;Z0(),O.autoReset=R,R0.enabled=f,R0.autoUpdate=d,R0.needsUpdate=g,R0.type=m}function UJ(R){s0("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function oJ(R){let f=R.target;f.removeEventListener("dispose",oJ),$9(f)}function $9(R){bJ(R),T.remove(R)}function bJ(R){let f=T.get(R).programs;if(f!==void 0){if(f.forEach(function(d){r.releaseProgram(d)}),R.isShaderMaterial)r.releaseShaderCache(R)}}this.renderBufferDirect=function(R,f,d,g,m,z0){if(f===null)f=v0;let y0=m.isMesh&&m.matrixWorld.determinantAffine()<0,I0=w7(R,f,d,g,m);L.setMaterial(g,y0);let U0=d.index,L0=1;if(g.wireframe===!0){if(U0=q0.getWireframeAttribute(d),U0===void 0)return;L0=2}let p0=d.drawRange,h0=d.attributes.position,A0=p0.start*L0,WJ=(p0.start+p0.count)*L0;if(z0!==null)A0=Math.max(A0,z0.start*L0),WJ=Math.min(WJ,(z0.start+z0.count)*L0);if(U0!==null)A0=Math.max(A0,0),WJ=Math.min(WJ,U0.count);else if(h0!==void 0&&h0!==null)A0=Math.max(A0,0),WJ=Math.min(WJ,h0.count);let MJ=WJ-A0;if(MJ<0||MJ===1/0)return;B0.setup(m,g,I0,d,U0);let OJ,XJ=S;if(U0!==null)OJ=H0.get(U0),XJ=E0,XJ.setIndex(OJ);if(m.isMesh)if(g.wireframe===!0)L.setLineWidth(g.wireframeLinewidth*i0()),XJ.setMode(w.LINES);else XJ.setMode(w.TRIANGLES);else if(m.isLine){let _J=g.linewidth;if(_J===void 0)_J=1;if(L.setLineWidth(_J*i0()),m.isLineSegments)XJ.setMode(w.LINES);else if(m.isLineLoop)XJ.setMode(w.LINE_LOOP);else XJ.setMode(w.LINE_STRIP)}else if(m.isPoints)XJ.setMode(w.POINTS);else if(m.isSprite)XJ.setMode(w.TRIANGLES);if(m.isBatchedMesh)if(!f0.get("WEBGL_multi_draw")){let{_multiDrawStarts:_J,_multiDrawCounts:w0,_multiDrawCount:uJ}=m,GJ=U0?H0.get(U0).bytesPerElement:1,K9=T.get(g).currentProgram.getUniforms();for(let R9=0;R9<uJ;R9++)K9.setValue(w,"_gl_DrawID",R9),XJ.render(_J[R9]/GJ,w0[R9])}else XJ.renderMultiDraw(m._multiDrawStarts,m._multiDrawCounts,m._multiDrawCount);else if(m.isInstancedMesh)XJ.renderInstances(A0,MJ,m.count);else if(d.isInstancedBufferGeometry){let _J=d._maxInstanceCount!==void 0?d._maxInstanceCount:1/0,w0=Math.min(d.instanceCount,_J);XJ.renderInstances(A0,MJ,w0)}else XJ.render(A0,MJ)};function r8(R,f,d,g){if(v!==null&&R.isNodeMaterial)v.setObject(g,R);if(k0===!0)Y0.setState(R,d,!1);if(R.transparent===!0&&R.side===Y9&&R.forceSinglePass===!1)R.side=pJ,R.needsUpdate=!0,Z9(R,f,g),R.side=l8,R.needsUpdate=!0,Z9(R,f,g),R.side=Y9;else Z9(R,f,g)}this.compile=function(R,f,d=null){if(d===null)d=R;if(v!==null)v.renderStart(R,f,d);if(I=O0.get(d),I.init(f),P.push(I),d.traverseVisible(function(m){if(m.isLight&&m.layers.test(f.layers)){if(I.pushLight(m),m.castShadow)I.pushShadow(m)}}),R!==d)R.traverseVisible(function(m){if(m.isLight&&m.layers.test(f.layers)){if(I.pushLight(m),m.castShadow)I.pushShadow(m)}});if(I.setupLights(),v!==null)v.updateLights(I.state.lightsArray);if(c0=this.localClippingEnabled,k0=Y0.init(this.clippingPlanes,c0),k0===!0)Y0.setGlobalState(this.clippingPlanes,f);if(v!==null)R0.render(I.state.shadowsArray,d,f);let g=new Set;if(R.traverse(function(m){if(!(m.isMesh||m.isPoints||m.isLine||m.isSprite))return;let z0=m.material;if(z0)if(Array.isArray(z0))for(let y0=0;y0<z0.length;y0++){let I0=z0[y0];r8(I0,d,f,m),g.add(I0)}else r8(z0,d,f,m),g.add(z0)}),I=P.pop(),v!==null)v.renderEnd();return g},this.compileAsync=function(R,f,d=null){let g=this.compile(R,f,d);return new Promise((m)=>{function z0(){if(g.forEach(function(y0){let U0=T.get(y0).currentProgram;if(U0===void 0||U0.isReady())g.delete(y0)}),g.size===0){m(R);return}setTimeout(z0,10)}if(f0.get("KHR_parallel_shader_compile")!==null)z0();else setTimeout(z0,10)})};let R8=null;function P7(R){if(R8)R8(R)}function P0(){m0.stop()}function a0(){m0.start()}let m0=new tK;if(m0.setAnimationLoop(P7),typeof self<"u")m0.setContext(self);this.setAnimationLoop=function(R){R8=R,V0.setAnimationLoop(R),R===null?m0.stop():m0.start()},V0.addEventListener("sessionstart",P0),V0.addEventListener("sessionend",a0),this.render=function(R,f){if(f!==void 0&&f.isCamera!==!0){s0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(c===!0)return;if(v!==null)v.renderStart(R,f);let d=V0.enabled===!0&&V0.isPresenting===!0,g=M!==null&&(u===null||d)&&M.begin(B,u);if(R.matrixWorldAutoUpdate===!0)R.updateMatrixWorld();if(f.parent===null&&f.matrixWorldAutoUpdate===!0)f.updateMatrixWorld();if(V0.enabled===!0&&V0.isPresenting===!0&&(M===null||M.isCompositing()===!1)){if(V0.cameraAutoUpdate===!0)V0.updateCamera(f);f=V0.getCamera()}if(R.isScene===!0)R.onBeforeRender(B,R,f,u);if(I=O0.get(R,P.length),I.init(f),I.state.textureUnits=l.getTextureUnits(),P.push(I),j0.multiplyMatrices(f.projectionMatrix,f.matrixWorldInverse),N0.setFromProjectionMatrix(j0,U$,f.reversedDepth),c0=this.localClippingEnabled,k0=Y0.init(this.clippingPlanes,c0),k=T0.get(R,_.length),k.init(),_.push(k),V0.enabled===!0&&V0.isPresenting===!0){let y0=B.xr.getDepthSensingMesh();if(y0!==null)F0(y0,f,-1/0,B.sortObjects)}if(F0(R,f,0,B.sortObjects),k.finish(),v!==null)v.updateLights(I.state.lightsArray);if(B.sortObjects===!0)k.sort(p,n);if(n0=V0.enabled===!1||V0.isPresenting===!1||V0.hasDepthSensing()===!1,n0)M0.addToRenderList(k,R);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(k0===!0)Y0.beginShadows();let m=I.state.shadowsArray;if(R0.render(m,R,f),k0===!0)Y0.endShadows();if((g&&M.hasRenderPass())===!1){let{opaque:y0,transmissive:I0}=k;if(I.setupLights(),f.isArrayCamera){let U0=f.cameras;if(I0.length>0)for(let L0=0,p0=U0.length;L0<p0;L0++){let h0=U0[L0];VJ(y0,I0,R,h0)}if(n0)M0.render(R);for(let L0=0,p0=U0.length;L0<p0;L0++){let h0=U0[L0];DJ(k,R,h0,h0.viewport)}}else{if(I0.length>0)VJ(y0,I0,R,f);if(n0)M0.render(R);DJ(k,R,f)}}if(u!==null&&J0===0)l.updateMultisampleRenderTarget(u),l.updateRenderTargetMipmap(u);if(g)M.end(B);if(R.isScene===!0)R.onAfterRender(B,R,f);if(B0.resetDefaultState(),G0=-1,a=null,P.pop(),P.length>0){if(I=P[P.length-1],l.setTextureUnits(I.state.textureUnits),k0===!0)Y0.setGlobalState(B.clippingPlanes,I.state.camera)}else I=null;if(_.pop(),_.length>0)k=_[_.length-1];else k=null;if(v!==null)v.renderEnd()};function F0(R,f,d,g){if(R.visible===!1)return;if(R.layers.test(f.layers)){if(R.isGroup)d=R.renderOrder;else if(R.isLOD){if(R.autoUpdate===!0)R.update(f)}else if(R.isLightProbeGrid)I.pushLightProbeGrid(R);else if(R.isLight){if(I.pushLight(R),R.castShadow)I.pushShadow(R)}else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(N0)){if(g)ZJ.setFromMatrixPosition(R.matrixWorld).applyMatrix4(j0);let y0=i.update(R),I0=R.material;if(I0.visible)k.push(R,y0,I0,d,ZJ.z,null,f)}}else if(R.isMesh||R.isLine||R.isPoints){if(!R.frustumCulled||R.intersectsFrustum(N0)){let y0=i.update(R),I0=R.material;if(g){if(R.boundingSphere!==void 0){if(R.boundingSphere===null)R.computeBoundingSphere();ZJ.copy(R.boundingSphere.center)}else{if(y0.boundingSphere===null)y0.computeBoundingSphere();ZJ.copy(y0.boundingSphere.center)}ZJ.applyMatrix4(R.matrixWorld).applyMatrix4(j0)}if(Array.isArray(I0)){let U0=y0.groups;for(let L0=0,p0=U0.length;L0<p0;L0++){let h0=U0[L0],A0=I0[h0.materialIndex];if(A0&&A0.visible)k.push(R,y0,A0,d,ZJ.z,h0,f)}}else if(I0.visible)k.push(R,y0,I0,d,ZJ.z,null,f)}}}let z0=R.children;for(let y0=0,I0=z0.length;y0<I0;y0++)F0(z0[y0],f,d,g)}function DJ(R,f,d,g){let{opaque:m,transmissive:z0,transparent:y0}=R;if(I.setupLightsView(d),k0===!0)Y0.setGlobalState(B.clippingPlanes,d);if(g)L.viewport(Q0.copy(g));if(m.length>0)aJ(m,f,d);if(z0.length>0)aJ(z0,f,d);if(y0.length>0)aJ(y0,f,d);L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function VJ(R,f,d,g){if((d.isScene===!0?d.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[g.id]===void 0){let A0=f0.has("EXT_color_buffer_half_float")||f0.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[g.id]=new J9(1,1,{generateMipmaps:!0,type:A0?k9:D9,minFilter:K8,samples:Math.max(4,C0.samples),stencilBuffer:K,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:HJ.workingColorSpace})}let z0=I.state.transmissionRenderTarget[g.id],y0=g.viewport||Q0;z0.setSize(y0.z*B.transmissionResolutionScale,y0.w*B.transmissionResolutionScale);let I0=B.getRenderTarget(),U0=B.getActiveCubeFace(),L0=B.getActiveMipmapLevel();if(B.setRenderTarget(z0),B.getClearColor(l0),EJ=B.getClearAlpha(),EJ<1)B.setClearColor(16777215,0.5);if(B.clear(),n0)M0.render(d);let p0=B.toneMapping;B.toneMapping=F9;let h0=g.viewport;if(g.viewport!==void 0)g.viewport=void 0;if(I.setupLightsView(g),k0===!0)Y0.setGlobalState(B.clippingPlanes,g);if(aJ(R,d,g),l.updateMultisampleRenderTarget(z0),l.updateRenderTargetMipmap(z0),f0.has("WEBGL_multisampled_render_to_texture")===!1){let A0=!1;for(let WJ=0,MJ=f.length;WJ<MJ;WJ++){let OJ=f[WJ],{object:XJ,geometry:_J,material:w0,group:uJ}=OJ;if(w0.side===Y9&&XJ.layers.test(g.layers)){let GJ=w0.side;w0.side=pJ,w0.needsUpdate=!0,O9(XJ,d,g,_J,w0,uJ),w0.side=GJ,w0.needsUpdate=!0,A0=!0}}if(A0===!0)l.updateMultisampleRenderTarget(z0),l.updateRenderTargetMipmap(z0)}if(B.setRenderTarget(I0,U0,L0),B.setClearColor(l0,EJ),h0!==void 0)g.viewport=h0;B.toneMapping=p0}function aJ(R,f,d){let g=f.isScene===!0?f.overrideMaterial:null;for(let m=0,z0=R.length;m<z0;m++){let y0=R[m],{object:I0,geometry:U0,group:L0}=y0,p0=y0.material;if(p0.allowOverride===!0&&g!==null)p0=g;if(I0.layers.test(d.layers))O9(I0,f,d,U0,p0,L0)}}function O9(R,f,d,g,m,z0){if(v!==null&&m.isNodeMaterial)v.setObject(R,m);if(R.onBeforeRender(B,f,d,g,m,z0),R.modelViewMatrix.multiplyMatrices(d.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),m.onBeforeRender(B,f,d,g,R,z0),m.transparent===!0&&m.side===Y9&&m.forceSinglePass===!1)m.side=pJ,m.needsUpdate=!0,B.renderBufferDirect(d,f,g,m,R,z0),m.side=l8,m.needsUpdate=!0,B.renderBufferDirect(d,f,g,m,R,z0),m.side=Y9;else B.renderBufferDirect(d,f,g,m,R,z0);R.onAfterRender(B,f,d,g,m,z0)}function Z9(R,f,d){if(f.isScene!==!0)f=v0;let g=T.get(R),m=I.state.lights,z0=I.state.shadowsArray,y0=m.state.version,I0=r.getParameters(R,m.state,z0,f,d,I.state.lightProbeGridArray),U0=r.getProgramCacheKey(I0),L0=g.programs;g.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?f.environment:null,g.fog=f.fog;let p0=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;if(g.envMap=e.get(R.envMap||g.environment,p0),g.envMapRotation=g.environment!==null&&R.envMap===null?f.environmentRotation:R.envMapRotation,L0===void 0)R.addEventListener("dispose",oJ),L0=new Map,g.programs=L0;let h0=L0.get(U0);if(h0!==void 0){if(g.currentProgram===h0&&g.lightsStateVersion===y0)return _9(R,I0),h0}else{if(I0.uniforms=r.getUniforms(R),v!==null&&R.isNodeMaterial)v.build(R,d,I0);R.onBeforeCompile(I0,B),h0=r.acquireProgram(I0,U0),L0.set(U0,h0),g.uniforms=I0.uniforms}let A0=g.uniforms;if(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)A0.clippingPlanes=Y0.uniform;if(_9(R,I0),g.needsLights=dJ(R),g.lightsStateVersion=y0,g.needsLights)A0.ambientLightColor.value=m.state.ambient,A0.lightProbe.value=m.state.probe,A0.sunLights.value=m.state.sun,A0.sunLightShadows.value=m.state.sunShadow,A0.directionalLights.value=m.state.directional,A0.directionalLightShadows.value=m.state.directionalShadow,A0.spotLights.value=m.state.spot,A0.spotLightShadows.value=m.state.spotShadow,A0.rectAreaLights.value=m.state.rectArea,A0.ltc_1.value=m.state.rectAreaLTC1,A0.ltc_2.value=m.state.rectAreaLTC2,A0.pointLights.value=m.state.point,A0.pointLightShadows.value=m.state.pointShadow,A0.hemisphereLights.value=m.state.hemi,A0.sunShadowMatrix.value=m.state.sunShadowMatrix,A0.sunShadowCascade.value=m.state.sunShadowCascade,A0.directionalShadowMatrix.value=m.state.directionalShadowMatrix,A0.spotLightMatrix.value=m.state.spotLightMatrix,A0.spotLightMap.value=m.state.spotLightMap,A0.pointShadowMatrix.value=m.state.pointShadowMatrix;return g.lightProbeGrid=I.state.lightProbeGridArray.length>0,g.currentProgram=h0,g.uniformsList=null,h0}function t8(R){if(R.uniformsList===null){let f=R.currentProgram.getUniforms();R.uniformsList=C7.seqWithValue(f.seq,R.uniforms)}return R.uniformsList}function _9(R,f){let d=T.get(R);d.outputColorSpace=f.outputColorSpace,d.batching=f.batching,d.batchingColor=f.batchingColor,d.instancing=f.instancing,d.instancingColor=f.instancingColor,d.instancingMorph=f.instancingMorph,d.skinning=f.skinning,d.morphTargets=f.morphTargets,d.morphNormals=f.morphNormals,d.morphColors=f.morphColors,d.morphTargetsCount=f.morphTargetsCount,d.numClippingPlanes=f.numClippingPlanes,d.numIntersection=f.numClipIntersection,d.vertexAlphas=f.vertexAlphas,d.vertexTangents=f.vertexTangents,d.toneMapping=f.toneMapping}function r9(R,f){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;j.setFromMatrixPosition(f.matrixWorld);for(let d=0,g=R.length;d<g;d++){let m=R[d];if(m.texture!==null&&m.boundingBox.containsPoint(j))return m}return null}function w7(R,f,d,g,m){if(f.isScene!==!0)f=v0;l.resetTextureUnits();let z0=f.fog,y0=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?f.environment:null,I0=u===null?B.outputColorSpace:u.isXRRenderTarget===!0?u.texture.colorSpace:HJ.workingColorSpace,U0=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,L0=e.get(g.envMap||y0,U0),p0=g.vertexColors===!0&&!!d.attributes.color&&d.attributes.color.itemSize===4,h0=!!d.attributes.tangent&&(!!g.normalMap||g.anisotropy>0),A0=!!d.morphAttributes.position,WJ=!!d.morphAttributes.normal,MJ=!!d.morphAttributes.color,OJ=F9;if(g.toneMapped){if(u===null||u.isXRRenderTarget===!0)OJ=B.toneMapping}let XJ=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_J=XJ!==void 0?XJ.length:0,w0=T.get(g),uJ=I.state.lights;if(k0===!0){if(c0===!0||R!==a){let kJ=R===a&&g.id===G0;Y0.setState(g,R,kJ)}}let GJ=!1;if(g.version===w0.__version){if(w0.needsLights&&w0.lightsStateVersion!==uJ.state.version)GJ=!0;else if(w0.outputColorSpace!==I0)GJ=!0;else if(m.isBatchedMesh&&w0.batching===!1)GJ=!0;else if(!m.isBatchedMesh&&w0.batching===!0)GJ=!0;else if(m.isBatchedMesh&&w0.batchingColor===!0&&m._colorsTexture===null)GJ=!0;else if(m.isBatchedMesh&&w0.batchingColor===!1&&m._colorsTexture!==null)GJ=!0;else if(m.isInstancedMesh&&w0.instancing===!1)GJ=!0;else if(!m.isInstancedMesh&&w0.instancing===!0)GJ=!0;else if(m.isSkinnedMesh&&w0.skinning===!1)GJ=!0;else if(!m.isSkinnedMesh&&w0.skinning===!0)GJ=!0;else if(m.isInstancedMesh&&w0.instancingColor===!0&&m.instanceColor===null)GJ=!0;else if(m.isInstancedMesh&&w0.instancingColor===!1&&m.instanceColor!==null)GJ=!0;else if(m.isInstancedMesh&&w0.instancingMorph===!0&&m.morphTexture===null)GJ=!0;else if(m.isInstancedMesh&&w0.instancingMorph===!1&&m.morphTexture!==null)GJ=!0;else if(w0.envMap!==L0)GJ=!0;else if(g.fog===!0&&w0.fog!==z0)GJ=!0;else if(w0.numClippingPlanes!==void 0&&(w0.numClippingPlanes!==Y0.numPlanes||w0.numIntersection!==Y0.numIntersection))GJ=!0;else if(w0.vertexAlphas!==p0)GJ=!0;else if(w0.vertexTangents!==h0)GJ=!0;else if(w0.morphTargets!==A0)GJ=!0;else if(w0.morphNormals!==WJ)GJ=!0;else if(w0.morphColors!==MJ)GJ=!0;else if(w0.toneMapping!==OJ)GJ=!0;else if(w0.morphTargetsCount!==_J)GJ=!0;else if(!!w0.lightProbeGrid!==I.state.lightProbeGridArray.length>0)GJ=!0}else GJ=!0,w0.__version=g.version;let K9=w0.currentProgram;if(GJ===!0){if(K9=Z9(g,f,m),v&&g.isNodeMaterial)v.onUpdateProgram(g,K9,w0)}let R9=!1,g9=!1,M8=!1,RJ=K9.getUniforms(),CJ=w0.uniforms;if(L.useProgram(K9.program))R9=!0,g9=!0,M8=!0;if(g.id!==G0)G0=g.id,g9=!0;if(w0.needsLights){let kJ=r9(I.state.lightProbeGridArray,m);if(w0.lightProbeGrid!==kJ)w0.lightProbeGrid=kJ,g9=!0}if(R9||a!==R){if(L.buffers.depth.getReversed()&&R.reversedDepth!==!0)R._reversedDepth=!0,R.updateProjectionMatrix();RJ.setValue(w,"projectionMatrix",R.projectionMatrix),RJ.setValue(w,"viewMatrix",R.matrixWorldInverse);let m9=RJ.map.cameraPosition;if(m9!==void 0)m9.setValue(w,JJ.setFromMatrixPosition(R.matrixWorld));if(C0.logarithmicDepthBuffer)RJ.setValue(w,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2));if(g.isMeshPhongMaterial||g.isMeshToonMaterial||g.isMeshLambertMaterial||g.isMeshBasicMaterial||g.isMeshStandardMaterial||g.isShaderMaterial)RJ.setValue(w,"isOrthographic",R.isOrthographicCamera===!0);if(a!==R)a=R,g9=!0,M8=!0}if(w0.needsLights){if(uJ.state.sunShadowMap.length>0)RJ.setValue(w,"sunShadowMap",uJ.state.sunShadowMap,l);if(uJ.state.directionalShadowMap.length>0)RJ.setValue(w,"directionalShadowMap",uJ.state.directionalShadowMap,l);if(uJ.state.spotShadowMap.length>0)RJ.setValue(w,"spotShadowMap",uJ.state.spotShadowMap,l);if(uJ.state.pointShadowMap.length>0)RJ.setValue(w,"pointShadowMap",uJ.state.pointShadowMap,l)}if(m.isSkinnedMesh){RJ.setOptional(w,m,"bindMatrix"),RJ.setOptional(w,m,"bindMatrixInverse");let kJ=m.skeleton;if(kJ){if(kJ.boneTexture===null)kJ.computeBoneTexture();RJ.setValue(w,"boneTexture",kJ.boneTexture,l)}}if(m.isBatchedMesh){if(RJ.setOptional(w,m,"batchingTexture"),RJ.setValue(w,"batchingTexture",m._matricesTexture,l),RJ.setOptional(w,m,"batchingIdTexture"),RJ.setValue(w,"batchingIdTexture",m._indirectTexture,l),RJ.setOptional(w,m,"batchingColorTexture"),m._colorsTexture!==null)RJ.setValue(w,"batchingColorTexture",m._colorsTexture,l)}let p9=d.morphAttributes;if(p9.position!==void 0||p9.normal!==void 0||p9.color!==void 0)b0.update(m,d,K9);if(g9||w0.receiveShadow!==m.receiveShadow)w0.receiveShadow=m.receiveShadow,RJ.setValue(w,"receiveShadow",m.receiveShadow);if((g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial)&&g.envMap===null&&f.environment!==null)CJ.envMapIntensity.value=f.environmentIntensity;if(CJ.dfgLUT!==void 0)CJ.dfgLUT.value=aG();if(g9){if(RJ.setValue(w,"toneMappingExposure",B.toneMappingExposure),w0.needsLights)p6(CJ,M8);if(z0&&g.fog===!0)D0.refreshFogUniforms(CJ,z0);if(D0.refreshMaterialUniforms(CJ,g,h,A,I.state.transmissionRenderTarget[R.id]),w0.needsLights&&w0.lightProbeGrid){let kJ=w0.lightProbeGrid;CJ.probesSH.value=kJ.texture,CJ.probesMin.value.copy(kJ.boundingBox.min),CJ.probesMax.value.copy(kJ.boundingBox.max),CJ.probesResolution.value.copy(kJ.resolution)}C7.upload(w,t8(w0),CJ,l)}if(g.isShaderMaterial&&g.uniformsNeedUpdate===!0)C7.upload(w,t8(w0),CJ,l),g.uniformsNeedUpdate=!1;if(g.isSpriteMaterial)RJ.setValue(w,"center",m.center);if(RJ.setValue(w,"modelViewMatrix",m.modelViewMatrix),RJ.setValue(w,"normalMatrix",m.normalMatrix),RJ.setValue(w,"modelMatrix",m.matrixWorld),g.uniformsGroups!==void 0){let kJ=g.uniformsGroups;for(let m9=0,L8=kJ.length;m9<L8;m9++){let o$=kJ[m9];S0.update(o$,K9),S0.bind(o$,K9)}}return K9}function p6(R,f){R.ambientLightColor.needsUpdate=f,R.lightProbe.needsUpdate=f,R.sunLights.needsUpdate=f,R.sunLightShadows.needsUpdate=f,R.directionalLights.needsUpdate=f,R.directionalLightShadows.needsUpdate=f,R.pointLights.needsUpdate=f,R.pointLightShadows.needsUpdate=f,R.spotLights.needsUpdate=f,R.spotLightShadows.needsUpdate=f,R.rectAreaLights.needsUpdate=f,R.hemisphereLights.needsUpdate=f}function dJ(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return s},this.getActiveMipmapLevel=function(){return J0},this.getRenderTarget=function(){return u},this.setRenderTargetTextures=function(R,f,d){let g=T.get(R);if(g.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,g.__autoAllocateDepthBuffer===!1)g.__useRenderToTexture=!1;T.get(R.texture).__webglTexture=f,T.get(R.depthTexture).__webglTexture=g.__autoAllocateDepthBuffer?void 0:d,g.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,f){let d=T.get(R);d.__webglFramebuffer=f,d.__useDefaultFramebuffer=f===void 0},this.setRenderTarget=function(R,f=0,d=0){u=R,s=f,J0=d;let g=null,m=!1,z0=!1;if(R){let I0=T.get(R);if(I0.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(w.FRAMEBUFFER,I0.__webglFramebuffer),Q0.copy(R.viewport),W0.copy(R.scissor),u0=R.scissorTest,L.viewport(Q0),L.scissor(W0),L.setScissorTest(u0),G0=-1;return}else if(I0.__webglFramebuffer===void 0)l.setupRenderTarget(R);else if(I0.__hasExternalTextures)l.rebindTextures(R,T.get(R.texture).__webglTexture,T.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let p0=R.depthTexture;if(I0.__boundDepthTexture!==p0){if(p0!==null&&T.has(p0)&&(R.width!==p0.image.width||R.height!==p0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");l.setupDepthRenderbuffer(R)}}let U0=R.texture;if(U0.isData3DTexture||U0.isDataArrayTexture||U0.isCompressedArrayTexture)z0=!0;let L0=T.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget){if(Array.isArray(L0[f]))g=L0[f][d];else g=L0[f];m=!0}else if(R.samples>0&&l.useMultisampledRTT(R)===!1)g=T.get(R).__webglMultisampledFramebuffer;else if(Array.isArray(L0))g=L0[d];else g=L0;Q0.copy(R.viewport),W0.copy(R.scissor),u0=R.scissorTest}else Q0.copy($0).multiplyScalar(h).floor(),W0.copy(K0).multiplyScalar(h).floor(),u0=X0;if(d!==0)g=b;if(L.bindFramebuffer(w.FRAMEBUFFER,g))L.drawBuffers(R,g);if(L.viewport(Q0),L.scissor(W0),L.setScissorTest(u0),m){let I0=T.get(R.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+f,I0.__webglTexture,d)}else if(z0){let I0=f;for(let U0=0;U0<R.textures.length;U0++){let L0=T.get(R.textures[U0]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+U0,L0.__webglTexture,d,I0)}}else if(R!==null&&d!==0){let I0=T.get(R.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,I0.__webglTexture,d)}G0=-1};function g0(R){let f=T.get(R);if(f.__readFormat!==R.format||f.__readType!==R.type)f.__readFormat=R.format,f.__readType=R.type,f.__formatReadable=C0.textureFormatReadable(R.format),f.__typeReadable=C0.textureTypeReadable(R.type);return f}if(this.readRenderTargetPixels=function(R,f,d,g,m,z0,y0,I0=0){if(!(R&&R.isWebGLRenderTarget)){s0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let U0=T.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&y0!==void 0)U0=U0[y0];if(U0){L.bindFramebuffer(w.FRAMEBUFFER,U0);try{let L0=R.textures[I0],p0=L0.format,h0=L0.type;if(R.textures.length>1)w.readBuffer(w.COLOR_ATTACHMENT0+I0);let A0=g0(L0);if(A0.__formatReadable===!1){s0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(A0.__typeReadable===!1){s0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(f>=0&&f<=R.width-g&&(d>=0&&d<=R.height-m))w.readPixels(f,d,g,m,o.convert(p0),o.convert(h0),z0)}finally{let L0=u!==null?T.get(u).__webglFramebuffer:null;L.bindFramebuffer(w.FRAMEBUFFER,L0)}}},this.readRenderTargetPixelsAsync=async function(R,f,d,g,m,z0,y0,I0=0){if(!(R&&R.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let U0=T.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&y0!==void 0)U0=U0[y0];if(U0)if(f>=0&&f<=R.width-g&&(d>=0&&d<=R.height-m)){L.bindFramebuffer(w.FRAMEBUFFER,U0);let L0=R.textures[I0],p0=L0.format,h0=L0.type;if(R.textures.length>1)w.readBuffer(w.COLOR_ATTACHMENT0+I0);let A0=g0(L0);if(A0.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(A0.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let WJ=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,WJ),w.bufferData(w.PIXEL_PACK_BUFFER,z0.byteLength,w.STREAM_READ),w.readPixels(f,d,g,m,o.convert(p0),o.convert(h0),0),w.bindBuffer(w.PIXEL_PACK_BUFFER,null);let MJ=u!==null?T.get(u).__webglFramebuffer:null;L.bindFramebuffer(w.FRAMEBUFFER,MJ);let OJ=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await BK(w,OJ,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,WJ),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,z0),w.bindBuffer(w.PIXEL_PACK_BUFFER,null),w.deleteBuffer(WJ),w.deleteSync(OJ),z0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,f=null,d=0){let g=Math.pow(2,-d),m=Math.floor(R.image.width*g),z0=Math.floor(R.image.height*g),y0=f!==null?f.x:0,I0=f!==null?f.y:0;l.setTexture2D(R,0),w.copyTexSubImage2D(w.TEXTURE_2D,d,0,0,y0,I0,m,z0),L.unbindTexture()},this.copyTextureToTexture=function(R,f,d=null,g=null,m=0,z0=0){let y0,I0,U0,L0,p0,h0,A0,WJ,MJ,OJ=R.isCompressedTexture?R.mipmaps[z0]:R.image;if(d!==null)y0=d.max.x-d.min.x,I0=d.max.y-d.min.y,U0=d.isBox3?d.max.z-d.min.z:1,L0=d.min.x,p0=d.min.y,h0=d.isBox3?d.min.z:0;else{let CJ=Math.pow(2,-m);if(y0=Math.floor(OJ.width*CJ),I0=Math.floor(OJ.height*CJ),R.isDataArrayTexture)U0=OJ.depth;else if(R.isData3DTexture)U0=Math.floor(OJ.depth*CJ);else U0=1;L0=0,p0=0,h0=0}if(g!==null)A0=g.x,WJ=g.y,MJ=g.z;else A0=0,WJ=0,MJ=0;let XJ=o.convert(f.format),_J=o.convert(f.type),w0;if(f.isData3DTexture)l.setTexture3D(f,0),w0=w.TEXTURE_3D;else if(f.isDataArrayTexture||f.isCompressedArrayTexture)l.setTexture2DArray(f,0),w0=w.TEXTURE_2D_ARRAY;else l.setTexture2D(f,0),w0=w.TEXTURE_2D;L.activeTexture(w.TEXTURE0),L.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,f.flipY),L.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,f.premultiplyAlpha),L.pixelStorei(w.UNPACK_ALIGNMENT,f.unpackAlignment);let uJ=L.getParameter(w.UNPACK_ROW_LENGTH),GJ=L.getParameter(w.UNPACK_IMAGE_HEIGHT),K9=L.getParameter(w.UNPACK_SKIP_PIXELS),R9=L.getParameter(w.UNPACK_SKIP_ROWS),g9=L.getParameter(w.UNPACK_SKIP_IMAGES);L.pixelStorei(w.UNPACK_ROW_LENGTH,OJ.width),L.pixelStorei(w.UNPACK_IMAGE_HEIGHT,OJ.height),L.pixelStorei(w.UNPACK_SKIP_PIXELS,L0),L.pixelStorei(w.UNPACK_SKIP_ROWS,p0),L.pixelStorei(w.UNPACK_SKIP_IMAGES,h0);let M8=R.isDataArrayTexture||R.isData3DTexture,RJ=f.isDataArrayTexture||f.isData3DTexture;if(R.isDepthTexture){let CJ=T.get(R),p9=T.get(f),kJ=T.get(CJ.__renderTarget),m9=T.get(p9.__renderTarget);L.bindFramebuffer(w.READ_FRAMEBUFFER,kJ.__webglFramebuffer),L.bindFramebuffer(w.DRAW_FRAMEBUFFER,m9.__webglFramebuffer);for(let L8=0;L8<U0;L8++){if(M8)w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,T.get(R).__webglTexture,m,h0+L8),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,T.get(f).__webglTexture,z0,MJ+L8);w.blitFramebuffer(L0,p0,y0,I0,A0,WJ,y0,I0,w.DEPTH_BUFFER_BIT,w.NEAREST)}L.bindFramebuffer(w.READ_FRAMEBUFFER,null),L.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(m!==0||R.isRenderTargetTexture||T.has(R)){let CJ=T.get(R),p9=T.get(f);L.bindFramebuffer(w.READ_FRAMEBUFFER,t),L.bindFramebuffer(w.DRAW_FRAMEBUFFER,y);for(let kJ=0;kJ<U0;kJ++){if(M8)w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,CJ.__webglTexture,m,h0+kJ);else w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,CJ.__webglTexture,m);if(RJ)w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,p9.__webglTexture,z0,MJ+kJ);else w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,p9.__webglTexture,z0);if(m!==0)w.blitFramebuffer(L0,p0,y0,I0,A0,WJ,y0,I0,w.COLOR_BUFFER_BIT,w.NEAREST);else if(RJ)w.copyTexSubImage3D(w0,z0,A0,WJ,MJ+kJ,L0,p0,y0,I0);else w.copyTexSubImage2D(w0,z0,A0,WJ,L0,p0,y0,I0)}L.bindFramebuffer(w.READ_FRAMEBUFFER,null),L.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(RJ)if(R.isDataTexture||R.isData3DTexture)w.texSubImage3D(w0,z0,A0,WJ,MJ,y0,I0,U0,XJ,_J,OJ.data);else if(f.isCompressedArrayTexture)w.compressedTexSubImage3D(w0,z0,A0,WJ,MJ,y0,I0,U0,XJ,OJ.data);else w.texSubImage3D(w0,z0,A0,WJ,MJ,y0,I0,U0,XJ,_J,OJ);else if(R.isDataTexture)w.texSubImage2D(w.TEXTURE_2D,z0,A0,WJ,y0,I0,XJ,_J,OJ.data);else if(R.isCompressedTexture)w.compressedTexSubImage2D(w.TEXTURE_2D,z0,A0,WJ,OJ.width,OJ.height,XJ,OJ.data);else w.texSubImage2D(w.TEXTURE_2D,z0,A0,WJ,y0,I0,XJ,_J,OJ);if(L.pixelStorei(w.UNPACK_ROW_LENGTH,uJ),L.pixelStorei(w.UNPACK_IMAGE_HEIGHT,GJ),L.pixelStorei(w.UNPACK_SKIP_PIXELS,K9),L.pixelStorei(w.UNPACK_SKIP_ROWS,R9),L.pixelStorei(w.UNPACK_SKIP_IMAGES,g9),z0===0&&f.generateMipmaps)w.generateMipmap(w0);L.unbindTexture()},this.initRenderTarget=function(R){if(T.get(R).__webglFramebuffer===void 0)l.setupRenderTarget(R)},this.initTexture=function(R){if(R.isCubeTexture)l.setTextureCube(R,0);else if(R.isData3DTexture)l.setTexture3D(R,0);else if(R.isDataArrayTexture||R.isCompressedArrayTexture)l.setTexture2DArray(R,0);else l.setTexture2D(R,0);L.unbindTexture()},this.resetState=function(){s=0,J0=0,u=null,L.reset(),B0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return U$}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=HJ._getDrawingBufferColorSpace(J),Q.unpackColorSpace=HJ._getUnpackColorSpace()}}(()=>{let J=Object.fromEntries([["calm / idle","Whenever you’re ready, neighbor, look toward the camera and settle into your calm, everyday face. No need to smile for the state ID—we simply want you as you are at rest."],["blinking","For this one, gently close your eyes. Take your time. When you’re comfortable, open them again and I’ll catch the blink between."],["yawning","Let your shoulders relax. If it helps, imagine the Town Clerk reading all 804 pages of the citizenship code. Allow the yawn to arrive naturally—there’s no rush."],["angry","When you’re ready, try your fiercest glare. You might picture somebody stamping another cease-and-desist letter. Whatever feels convincing to you will work."],["laughter","Now let that glare go. Gideon just requested a landslide recount. If that brings out a laugh, follow it—we’ll wait for the real one."],["sad","Let’s bring it quiet now. The welcome pie was left out in the rain. Soften your eyes and lower your shoulders if that feels natural; we can take a moment."],["side-eye / eyeroll","Gideon says he has one more fascinating fact. Keep your head comfortable and let your eyes drift to the side whenever you’re ready."],["cheeky","Imagine you’ve been handed the ceremonial scissors and nobody checked your qualifications. Give me whatever mischievous look comes naturally."],["happy","Last frame, and no pressure—look toward the lens and give us the smile that feels like you. If you feel like saying CHEESE, Lyla is ready."]].map(([A,h])=>[A,["Lyla Lens · Cyclical City Gazette",h]])),Q={"calm / idle":"That’s it—steady and unmistakably you. State ID frame secured.",blinking:"Caught it! A blink right between closed and open. Newspaper timing, neighbor.",yawning:"Wonderful. Even the camera looks sleepy after that one.",angry:"Strong! Remind me never to misprint your name.",laughter:"That’s the laugh—bright enough for tomorrow’s front page.",sad:"Beautifully honest. And don’t worry, we found another pie.","side-eye / eyeroll":"Oh, perfect. Gideon felt that from across the square.",cheeky:"There it is—the face of someone absolutely trusted with ceremonial scissors.",happy:"CHEESE! Magnificent. That’s our front-page portrait!"},$=[{speaker:"Mayor Mayor",kind:"mayor",gesture:"arrival",speechDelay:2200,line:"Hi, I'm the mayor of this great town. But you can call me Mayor Mayor."},{speaker:"Mayor Mayor",kind:"mayor",gesture:"welcome",line:"Welcome to Cyclical City, neighbor! The committee has been waiting since breakfast, though Gideon has been waiting since Tuesday. Before we begin the very official festivities, he insists on sharing one tiny fact."},{speaker:"Gideon · Tour guide · Mayor's father",kind:"gideon",gesture:"story",line:"Did you know that before Mr. Mayor became our mayor, he was a solo touring act, who could have gone on to play guitar and sing for millions of screaming fans all over the world… If only it wasn't for that cease and desist letter from the lawyers of some other performing artist with a similar name who claims to already be an established musician somewhere, but here we are now, and I still haven't heard of him!"},{speaker:"Gideon",kind:"gideon",gesture:"confide",line:"Anyways, maybe I'm a bit biased, being his father and all, but it's obvious to me this copycat had a bone to pick with my poor Johnny… he really hasn't been the same ever since!"},{speaker:"Gideon",kind:"gideon",gesture:"triumph",line:"Well, that is until my boy found his place in the world when he finally ran for office and shocked everybody with a total landslide victory! Oh, and my dear, was it just awful, the sight of his only opposition, being tragically buried underneath all that rubble!"},{speaker:"Gideon",kind:"gideon",gesture:"shrug",line:"But that's not Jonathan's fault, who could've predicted a landslide would come crashing down on election day here in Cyclical City? Either way, look at it, he was once just plain old John Mayor, but look how much time can change a person! He's Mr. Mayor Mayor now!"},{speaker:"Mayor Mayor",kind:"mayor",gesture:"interrupt",line:"Dad, would you give our guest some space, please? Now, there will be plenty of time for chitchat and chances for carrying on and cutting up in the very near future, but first we have to take care of some business…"}],Z=[{speaker:"Lyla Lens · Cyclical City Gazette",kind:"press",gesture:"camera",line:"Hold the front page—the magnificent occasion is nearly complete. We have one last photograph for tomorrow's paper. Take your time, and when you’re comfortable, give us the smile that feels like you. CHEESE is welcome, but never required."}],K=!1,W=!1,H=null,Y=!1,X=0,U="speechSynthesis"in window?window.speechSynthesis:null,N=Boolean(U),q=0,G=null,D={mayor:{rate:0.95,pitch:0.78,voiceIndex:0,voiceNames:["Daniel","Arthur","Alex","David"]},gideon:{rate:0.92,pitch:0.68,voiceIndex:1,voiceNames:["Arthur","Daniel","Fred","Ralph","Alex","David"]},press:{rate:0.98,pitch:1.04,voiceIndex:1,voiceNames:["Samantha","Ava","Serena","Karen","Moira","Tessa"]},clerk:{rate:0.98,pitch:0.96,voiceIndex:3},committee:{rate:1.04,pitch:1.18,voiceIndex:1}};let speechPrimed=!1,speechPriming=!1;function primeSpeechFromGesture(){if(!N||!U||speechPrimed||speechPriming||typeof SpeechSynthesisUtterance==="undefined")return;speechPriming=!0;try{U.resume();let A=new SpeechSynthesisUtterance(" "),h=()=>{speechPrimed=!0,speechPriming=!1,document.removeEventListener("pointerdown",primeSpeechFromGesture,!0),document.removeEventListener("keydown",primeSpeechFromGesture,!0)};A.volume=0,A.rate=10,A.onstart=h,A.onend=h,A.onerror=()=>{speechPriming=!1},U.speak(A),setTimeout(()=>{speechPriming=!1},700)}catch{speechPriming=!1}}document.addEventListener("pointerdown",primeSpeechFromGesture,!0),document.addEventListener("keydown",primeSpeechFromGesture,!0);function V(A,h="mayor"){let p=String(A||"").toLowerCase();if(p.includes("gideon"))return"gideon";if(p.includes("penny")||p.includes("gazette"))return"press";if(p.includes("clerk"))return"clerk";if(p.includes("committee"))return"committee";return h}function z(A){if(!U)return null;let h=U.getVoices().filter((X0)=>/^en(?:-|_)/i.test(X0.lang));if(!h.length)return U.getVoices()[0]||null;let p=h.filter((X0)=>X0.localService),n=p.length?p:h,$0=D[A]||{};return($0.voiceNames||[]).map((X0)=>n.find((N0)=>N0.name.toLowerCase().includes(X0.toLowerCase()))).find(Boolean)||n[($0.voiceIndex||0)%n.length]||n[0]}function F(){if(q+=1,G=null,U)U.cancel()}function E(A){let p=2**(Math.round(12*Math.log2(Math.max(0.5,A)))/12);return eJ.lerp(A,p,0.45)}function C(A){return/[♪♫]|\b(?:tra-la|la-la|sung)\b/i.test(String(A||""))}function j(A,h,p,n=!1,$0=0,e0){if(!N||!U||!A)return;let K0=D[p]||D[V(h)],X0=A.slice($0).match(/^\s*/)?.[0].length||0,N0=Math.min(A.length,$0+X0),k0=A.slice(N0);if(!k0)return e0?.();let c0=++q;U.cancel();let j0=new SpeechSynthesisUtterance(k0);j0.lang="en-US",j0.rate=Math.min(2,K0.rate*(n?1.75:1)),j0.pitch=C(k0)?E(K0.pitch):K0.pitch;let JJ=z(p);if(JJ)j0.voice=JJ;G={text:A,speaker:h,kind:p,fast:n,charIndex:N0,startIndex:N0,startedAt:performance.now(),rate:j0.rate,utterance:j0},j0.onboundary=(ZJ)=>{if(c0===q&&G)G.charIndex=Math.min(A.length,N0+ZJ.charIndex)},j0.onend=()=>{if(c0===q)G=null,e0?.()},j0.onerror=(ZJ)=>{if(c0===q&&ZJ.error!=="canceled"&&ZJ.error!=="interrupted")G=null,e0?.()},U.speak(j0)}function k(A,h,p,n){if(!N||!U)return;let $0=G&&G.text===h,K0=$0?G.startIndex+Math.floor((performance.now()-G.startedAt)/1000*13*G.rate):0,X0=$0?Math.min(h.length,Math.max(G.charIndex,K0)):0;j(h,p,n,A,X0)}function I(){document.querySelectorAll(".snug-help-voice-toggle").forEach((A)=>{A.disabled=!U,A.setAttribute("aria-pressed",String(N)),A.textContent=U?`Voices ${N?"on":"off"}`:"Voice unavailable"})}function _(){if(N=U?!N:!1,!N)F();I()}function P(A={}){F();let h=document.createElement("div");h.className="snug-help-backdrop",h.setAttribute("role","dialog"),h.setAttribute("aria-modal","true"),h.setAttribute("aria-label","Pause and help"),h.innerHTML=`<section class="snug-help-card"><div class="snug-help-head"><h2>Pause & help</h2><button class="snug-help-close" type="button" aria-label="Return to the game">×</button></div><ul class="snug-help-list"><li><b>Movement</b><br>Tap a spot in the world and your character will walk there.</li><li><b>Room voice</b><br>Tap the microphone beside the room indicator to join or leave family voice chat.</li></ul><div class="snug-help-voice-row"><span><b>Character voices</b><small>Uses voices built into this device.</small></span><button class="snug-help-voice-toggle" type="button"></button></div><div class="snug-help-voice-row"><span><b>Light voice tune</b><small>Opt-in musical polish for your own room microphone.</small></span><button class="snug-help-voice-tune-toggle" type="button" role="switch" aria-checked="false">Tune off</button></div><div class="snug-help-voice-row"><span><b>Background music</b><small>Changes with each environment.</small></span><button class="snug-help-music-toggle" type="button">Music on</button></div><div class="snug-help-voice-row"><span><b>Sound effects</b><small>Actions, footsteps, and selections.</small></span><button class="snug-help-sfx-toggle" type="button">Sounds on</button></div>${A.onSkip?'<button class="snug-help-skip" type="button">Skip welcoming ceremony</button>':""}</section>`,document.body.appendChild(h);let p=()=>h.remove();h.querySelector(".snug-help-close").addEventListener("click",p),h.addEventListener("click",(X0)=>{if(X0.target===h)p()}),h.querySelector(".snug-help-voice-toggle").addEventListener("click",_);let $0=h.querySelector(".snug-help-voice-tune-toggle"),K0=()=>{let X0=Boolean(window.__snugVoiceTune?.enabled);$0.setAttribute("aria-checked",String(X0)),$0.setAttribute("aria-pressed",String(X0)),$0.textContent=X0?"Tune on":"Tune off"};$0.addEventListener("click",()=>{let X0=!Boolean(window.__snugVoiceTune?.enabled);if(window.__snugVoiceTune?.set)window.__snugVoiceTune.set(X0);else window.dispatchEvent(new CustomEvent("snug-voice-tune-request",{detail:{enabled:X0}}));K0()}),window.addEventListener("snug-voice-tune-state",K0,{once:!0}),K0(),h.querySelector(".snug-help-skip")?.addEventListener("click",()=>{p(),A.onSkip()}),I(),window.__snugAudio?.updateToggles(),requestAnimationFrame(()=>h.querySelector(".snug-help-close").focus())}function M(){let A=()=>{let p=document.querySelector(".hud-actions");if(!p||p.querySelector(".snug-pause-button"))return!1;let n=document.createElement("button");return n.type="button",n.className="round-btn snug-pause-button",n.setAttribute("aria-label","Pause and help"),n.title="Pause and help",n.addEventListener("click",P),p.appendChild(n),!0};if(A())return;let h=new MutationObserver(()=>{if(A())h.disconnect()});h.observe(document.documentElement,{subtree:!0,childList:!0})}function B(A,h){if(!A||A.dataset.holdSpeechBound)return;A.dataset.holdSpeechBound="true";let p=!1,n=0,$0=(X0)=>{if(X0.pointerType==="mouse"&&X0.button!==0)return;X0.preventDefault(),X0.stopPropagation();if(p)return;p=!0,clearTimeout(n),A.dataset.suppressAdvance="true",A.classList.add("fast-forwarding");let N0=h();if(N0)k(!0,N0.text,N0.speaker,N0.kind);try{A.setPointerCapture(X0.pointerId)}catch{}},K0=(X0)=>{if(X0)X0.preventDefault(),X0.stopPropagation();if(!p)return;p=!1,A.classList.remove("fast-forwarding");if(G?.fast){let N0=h();if(N0)k(!1,N0.text,N0.speaker,N0.kind)}clearTimeout(n),n=setTimeout(()=>delete A.dataset.suppressAdvance,350)};A.addEventListener("pointerdown",$0),A.addEventListener("pointerup",K0),A.addEventListener("pointercancel",K0),A.addEventListener("lostpointercapture",K0),A.addEventListener("click",(X0)=>{X0.preventDefault(),X0.stopPropagation()}),A.addEventListener("keydown",(X0)=>{if((X0.key===" "||X0.key==="Enter")&&!p)X0.preventDefault(),X0.stopPropagation(),$0(X0)}),A.addEventListener("keyup",(X0)=>{if(X0.key===" "||X0.key==="Enter")X0.preventDefault(),X0.stopPropagation(),K0(X0)}),A.addEventListener("blur",K0),A.addEventListener("contextmenu",(X0)=>X0.preventDefault())}if(U)U.getVoices();M();let c=(()=>{let A=document.createElement("canvas");A.width=A.height=64;let h=A.getContext("2d"),p=h.createImageData(64,64),n=9137;for(let K0=0;K0<p.data.length;K0+=4)n=n*16807%2147483647,p.data[K0]=p.data[K0+1]=p.data[K0+2]=238+n%18,p.data[K0+3]=255;h.putImageData(p,0,0),h.globalAlpha=0.15,h.lineWidth=0.55;for(let K0=0;K0<220;K0++){n=n*16807%2147483647;let X0=n%64;n=n*16807%2147483647;let N0=n%64;n=n*16807%2147483647;let k0=(n%9-4)*0.28;h.strokeStyle=n%3?"#ffffff":"#c8c2ba",h.beginPath(),h.moveTo(X0,N0),h.lineTo(X0+k0,N0+1.8),h.stroke()}let $0=new G8(A);return $0.colorSpace=o9,$0.needsUpdate=!0,$0})(),v=(()=>{let A=document.createElement("canvas");A.width=A.height=64;let h=A.getContext("2d"),p=h.createRadialGradient(32,32,5,32,32,31);p.addColorStop(0,"rgba(255,255,255,.72)"),p.addColorStop(0.52,"rgba(255,255,255,.32)"),p.addColorStop(1,"rgba(255,255,255,0)"),h.fillStyle=p,h.fillRect(0,0,64,64);let n=new G8(A);return n.colorSpace=o9,n.needsUpdate=!0,n})(),b=(A,h=0.006)=>new SJ({color:A,roughness:0.98,metalness:0,map:c,bumpMap:c,bumpScale:h});function t(A,h){let p=new jJ,n=A==="mayor"?"MayorMayor":A==="gideon"?"Gideon":"LylaLens";p.name=`WelcomeCharacter_${n}`,p.position.x=h;let $0=A==="gideon"?14065775:A==="press"?12088144:12089429,K0=A==="mayor"?3235432:A==="gideon"?8215875:5533275,X0=b($0,0.004),N0=X0.clone();N0.color.offsetHSL(0,0.018,-0.16),N0.roughness=0.99;let k0=b(K0,0.006),c0=k0.clone();c0.color.offsetHSL(0,0.025,-0.12),c0.roughness=0.99;let j0=b(2438715,0.004),JJ=new SJ({color:3221282,roughness:1,metalness:0}),ZJ=new SJ({color:13934914,roughness:0.72,metalness:0.08}),v0=new jJ;v0.name=`HeadRig_${n}`,v0.position.y=2.25;let n0=new x0(new TJ(0.492,0.492,0.2,40),new SJ({color:4798252,roughness:0.86})),i0=new x0(new TJ(0.505,0.505,0.22,40),N0),w=new x0(new TJ(0.48,0.48,0.24,40),X0);n0.rotation.x=i0.rotation.x=w.rotation.x=Math.PI/2,n0.position.z=-0.11,w.name=`HeadPrimitive_${n}`,n0.castShadow=i0.castShadow=w.castShadow=!0,v0.add(n0,i0,w);for(let R0=0;R0<24;R0++){let M0=R0/24*Math.PI*2,b0=new x0(new TJ(0.01,0.01,0.058,6),JJ);b0.name=`HeadStitch_${n}`,b0.userData.snugToonOutline=!0,b0.position.set(Math.cos(M0)*0.497,Math.sin(M0)*0.497,0.133),b0.rotation.z=M0,b0.castShadow=!0,v0.add(b0)}p.add(v0);let KJ=document.createElement("canvas");KJ.width=KJ.height=256;let f0=KJ.getContext("2d");if(f0.clearRect(0,0,256,256),f0.strokeStyle="#2c3437",f0.fillStyle="#2c3437",f0.lineCap="round",f0.lineWidth=15,f0.beginPath(),f0.arc(82,102,10,0,Math.PI*2),f0.fill(),f0.beginPath(),f0.arc(174,102,10,0,Math.PI*2),f0.fill(),f0.beginPath(),A==="gideon")f0.arc(128,145,54,0.18*Math.PI,0.82*Math.PI);else if(A==="press")f0.arc(128,146,48,0.12*Math.PI,0.88*Math.PI);else f0.arc(128,150,45,0.2*Math.PI,0.8*Math.PI);f0.stroke();let C0=new G8(KJ);C0.colorSpace=o9;let L=new jJ;L.name=`FaceSlot_${n}`;let O=new x0(new I9(0.98,0.98),new SJ({map:C0,transparent:!0,color:16777215,roughness:0.68,depthWrite:!1,alphaTest:0.02}));O.name=`PrimitiveFace_${n}`,O.position.z=0.126,O.castShadow=!0,L.add(O),v0.add(L);let mJ=window.CylindricSpeakingMouth?.attach?.(v0,{Mesh:x0,PlaneGeometry:I9,Material:SJ,Texture:G8,y:-.105,z:.142,size:.235});if(mJ)p.userData.speakingMouth=mJ;let T=new jJ;T.name=`OutfitSlot_${n}`;let l=new x0(new TJ(0.35,0.39,0.9,24),k0);l.position.y=1.2;let e=new x0(new TJ(0.355,0.365,0.07,24),c0);e.position.y=1.62;let H0=new x0(new TJ(0.395,0.405,0.075,24),c0);H0.position.y=0.76,T.add(l,e,H0),[[1.64,0.352],[0.75,0.392]].forEach(([R0,M0])=>{for(let b0=0;b0<14;b0++){let S=b0/14*Math.PI*2,E0=new x0(new TJ(0.009,0.009,0.045,6),JJ);E0.name=`BodyStitch_${n}`,E0.userData.snugToonOutline=!0,E0.position.set(Math.cos(S)*M0,R0,Math.sin(S)*M0),E0.castShadow=!0,T.add(E0)}});let q0=new x0(new Q9(0.35,20,12,0,Math.PI*2,0,Math.PI/2),k0);q0.scale.y=0.7,q0.position.y=1.65,T.add(q0),p.add(T);let i=[];[-1,1].forEach((R0)=>{let M0=new jJ,b0=R0>0?"Left":"Right";M0.name=`HandSlot_${n}_${b0}`,M0.position.set(R0*0.58,1.34,0);let S=new x0(new Q9(0.15,18,12),X0);S.name=`PrimitiveHand_${n}_${b0}`;let E0=new x0(new Q9(0.065,12,8),X0);E0.name=`PrimitiveThumb_${n}_${b0}`,E0.position.set(-R0*0.12,-0.07,0.07);let o=new x0(new TJ(0.105,0.105,0.075,18),c0);o.rotation.z=Math.PI/2,o.position.x=-R0*0.15,M0.add(o,S,E0),p.add(M0),i.push(M0)});let r=[];[-1,1].forEach((R0)=>{let M0=new jJ;M0.name=`ShoeSlot_${n}_${R0>0?"Left":"Right"}`,M0.position.set(R0*0.23,0.18,0.08),M0.rotation.z=R0*0.08;let b0=new x0(new TJ(0.105,0.235,0.37,3),N0),S=new x0(new TJ(0.09,0.22,0.33,3),j0);b0.rotation.x=S.rotation.x=Math.PI/2,S.position.z=0.012,b0.castShadow=S.castShadow=!0,M0.add(b0,S),p.add(M0),r.push(M0)});let D0=new jJ;D0.name=`HeadAccessorySlot_${n}`,v0.add(D0);let T0=new jJ;if(T0.name=`HeldItemSlot_${n}`,p.add(T0),A==="mayor"){let R0=new x0(new TJ(0.43,0.43,0.08,24),j0),M0=new x0(new TJ(0.29,0.32,0.36,24),j0);R0.position.y=0.43,M0.position.y=0.61,D0.add(R0,M0);let b0=new x0(new TJ(0.325,0.325,0.08,24),b(13194563,0.004));b0.position.y=0.48,D0.add(b0)}else if(A==="gideon"){let R0=new x0(new Q9(0.49,22,12,0,Math.PI*2,0,Math.PI/2),b(15131094,0.005));R0.scale.y=0.45,R0.position.y=0.28,D0.add(R0);let M0=new x0(new Q9(0.2,14,8),b(15657439,0.005));M0.scale.set(1,0.32,0.28),M0.position.set(0,-0.13,0.47),v0.add(M0)}else{let R0=new jJ,M0=new x0(new AJ(0.42,0.28,0.2),j0),b0=new x0(new TJ(0.11,0.11,0.12,18),new SJ({color:1054488,roughness:0.35,metalness:0.25}));b0.rotation.x=Math.PI/2,b0.position.z=0.15;let S=new x0(new Q9(0.055,12,8),new a9({color:16773821}));S.position.set(0.13,0.16,0.08),R0.add(M0,b0,S),R0.position.set(0,1.52,0.35),T0.add(R0),p.userData.flash=S}let O0=new x0(new B7(0.1,18),ZJ);O0.position.set(0.18,1.42,0.39),T.add(O0),l.name=`PrimitiveOutfit_${n}`,q0.name=`PrimitiveOutfitShoulders_${n}`;let Y0=new x0(new I9(1.16,0.82),new SJ({color:1906452,map:v,transparent:!0,opacity:0.42,roughness:1,depthWrite:!1}));return Y0.name=`ContactShadow_${n}`,Y0.rotation.x=-Math.PI/2,Y0.position.set(h,0.012,0.2),Y0.renderOrder=0,Y0.receiveShadow=!1,p.userData={...p.userData,kind:A,head:v0,body:T,hands:i,feet:r,baseX:h,faceSlot:L,headAccessorySlot:D0,heldItemSlot:T0,contactShadow:Y0,attachmentSlots:{face:L.name,headAccessory:D0.name,outfit:T.name,leftHand:`HandSlot_${n}_Left`,rightHand:`HandSlot_${n}_Right`,leftShoe:`ShoeSlot_${n}_Left`,rightShoe:`ShoeSlot_${n}_Right`,heldItem:T0.name}},p}function y({edgeOpacity:A=0.58,hullOpacity:h=0.92,maxMeshes:p=1/0,maxVertices:n=30000}={}){let $0=new k7({color:1120025,transparent:!0,opacity:A,depthWrite:!1}),K0=new a9({color:790802,side:pJ,transparent:!0,opacity:h,depthWrite:!1}),X0=new Set,N0=new Set,k0=new WeakSet,c0=(v0)=>{(v0||[]).forEach((n0)=>n0?.traverse?.((i0)=>{if(i0?.isMesh)k0.add(i0)}))},j0=(v0)=>{if(!v0?.isMesh||!v0.geometry||v0.userData?.snugToonDecorated||v0.userData?.snugToonOutline)return!1;if(!v0.visible||/face|sprite|particle|shadow|tapmarker|sky|cloud/i.test(v0.name||""))return!1;return!(Array.isArray(v0.material)?v0.material:[v0.material]).some((i0)=>i0?.transparent||Number.isFinite(i0?.opacity)&&i0.opacity<0.92)};return{decorate:(v0,{characters:n0=[]}={})=>{if(!v0?.traverse)return;c0(n0);let i0=[];v0.traverse((w)=>{if(j0(w))i0.push(w)}),i0.sort((w,KJ)=>Number(k0.has(KJ))-Number(k0.has(w))),i0.slice(0,p).forEach((w)=>{let KJ=w.geometry?.attributes?.position?.count||0;if(!KJ||KJ>n)return;w.userData.snugToonDecorated=!0;let f0=new P6(w.geometry,30);if((f0.attributes.position?.count||0)>0){let C0=new A6(f0,$0);C0.name="SnugToonEdges",C0.userData.snugToonOutline=!0,C0.renderOrder=2,C0.scale.setScalar(1.0025),w.add(C0),X0.add(f0),N0.add(C0)}else f0.dispose();if(k0.has(w)){let C0=new x0(w.geometry,K0);C0.name="SnugToonSilhouette",C0.userData.snugToonOutline=!0,C0.renderOrder=1,C0.castShadow=!1,C0.receiveShadow=!1,C0.scale.setScalar(1.032),w.add(C0),N0.add(C0)}})},dispose:()=>{N0.forEach((v0)=>v0.parent?.remove(v0)),X0.forEach((v0)=>v0.dispose()),$0.dispose(),K0.dispose(),N0.clear(),X0.clear()}}}let s=new WeakMap,J0=(A)=>{if(!A?.scene)return;let h=s.get(A.scene);if(!h)h=y({edgeOpacity:0.44,hullOpacity:0.84,maxMeshes:36,maxVertices:2600}),s.set(A.scene,h);let p=[A.player,...Array.from(A.remotes?.values?.()||[])];h.decorate(A.scene,{characters:p})},u=(A)=>{let h=()=>J0(A||window.__snugWorld);if("requestIdleCallback"in window)requestIdleCallback(h,{timeout:1600});else setTimeout(h,900)};window.addEventListener("snug-world-ready",(A)=>u(A.detail)),window.addEventListener("snug-avatar-ready",()=>u(window.__snugWorld)),window.addEventListener("load",()=>u(window.__snugWorld),{once:!0}),setTimeout(()=>u(window.__snugWorld),3200);function G0(A,h){if(!A||!g6)return null;let p;try{p=new g6({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{return null}p.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),p.outputColorSpace=o9,p.shadowMap.enabled=!0,p.shadowMap.type=W6,p.domElement.setAttribute("aria-hidden","true"),A.appendChild(p.domElement),A.parentElement.classList.add("is-three");let n=new V6;n.background=new e0(10210010),n.fog=new M7(10210010,10,23);let $0=new nJ(38,1,0.1,50);$0.position.set(0,3.2,9.4),n.add(new S6(14677503,5665355,2.4));let K0=new y6(16773588,3.1);K0.position.set(-4,8,7),K0.castShadow=!0,K0.shadow.mapSize.set(1024,1024),n.add(K0);let X0=new x0(new I9(30,25),new SJ({color:7904872,roughness:1}));X0.rotation.x=-Math.PI/2,X0.position.y=0,X0.receiveShadow=!0,n.add(X0);let N0=new x0(new I9(4.5,16),new SJ({color:14073226,roughness:1}));N0.rotation.x=-Math.PI/2,N0.position.set(0,0.012,1.8),n.add(N0);let k0=new jJ,c0=new SJ({color:15190157,roughness:0.9}),j0=new SJ({color:12149581,roughness:0.85}),JJ=new x0(new AJ(6.8,3.7,1.6),c0);JJ.position.y=2,JJ.castShadow=!0,JJ.receiveShadow=!0,k0.add(JJ);let ZJ=new x0(new AJ(7,0.26,1.82),j0);ZJ.position.y=0.2,k0.add(ZJ);let v0=new x0(new AJ(7.05,0.2,1.86),j0);v0.position.y=3.86,k0.add(v0),[-3.12,3.12].forEach((P0)=>{let a0=new x0(new AJ(0.28,3.45,0.18),j0);a0.position.set(P0,2,0.9),k0.add(a0)});let n0=new x0(new s8(4.8,1.8,4),j0);n0.rotation.y=Math.PI/4,n0.position.y=4.72,n0.scale.z=0.72,k0.add(n0);let i0=new x0(new AJ(7.35,0.16,1.95),new SJ({color:9389628,roughness:0.78}));i0.position.y=4.02,k0.add(i0);let w=new SJ({color:4811376,roughness:0.72}),KJ=new x0(new AJ(1.28,2.34,0.1),j0);KJ.position.set(0,1.17,0.87),k0.add(KJ);let f0=new x0(new AJ(1.05,2.1,0.12),w);f0.position.set(0,1.05,0.94),k0.add(f0);let C0=new x0(new AJ(0.75,0.68,0.04),w.clone());C0.material.color.offsetHSL(0,0,-0.1),C0.position.set(0,0.86,1.02),k0.add(C0);let L=new x0(new Q9(0.065,12,8),new SJ({color:13934914,metalness:0.28,roughness:0.45}));L.position.set(0.35,1.08,1.04),k0.add(L),[-2.2,2.2].forEach((P0)=>{let a0=new x0(new AJ(1.45,1.35,0.1),j0),m0=new x0(new AJ(1.25,1.15,0.1),new SJ({color:9421264,roughness:0.28,metalness:0.05}));a0.position.set(P0,2.25,0.87),m0.position.set(P0,2.25,0.94),k0.add(a0,m0),[-0.34,0.34].forEach((DJ)=>{let VJ=new x0(new AJ(1.18,0.055,0.04),j0);VJ.position.set(P0,2.25+DJ,0.995),k0.add(VJ)});let F0=new x0(new AJ(0.055,1.08,0.04),j0);F0.position.set(P0,2.25,0.995),k0.add(F0)});let O=new x0(new AJ(2.3,0.22,1.2),new SJ({color:12167819,roughness:1}));O.position.set(0,0.13,1.08);let T=O.clone();T.geometry=new AJ(2.75,0.16,0.62),T.position.set(0,0.08,1.68),k0.add(O,T),k0.position.z=-4.1,n.add(k0);let l=new jJ;for(let P0=-5;P0<=5;P0++){let a0=P0%2?15165524:15914103,m0=new x0(new s8(0.18,0.42,3),new a9({color:a0,side:Y9}));m0.rotation.z=Math.PI,m0.position.set(P0*0.64,-Math.abs(P0)*0.045,0),l.add(m0)}l.position.set(0,4.78,-2.9),n.add(l);let e={gideon:t("gideon",-1.65),mayor:t("mayor",0),press:t("press",1.65)};Object.values(e).forEach((P0)=>{P0.position.z=0.2,P0.userData.talkMotion={wasSpeaking:!1,releaseStartedAt:0},P0.traverse((a0)=>{if(a0.isMesh)a0.castShadow=!0,a0.receiveShadow=!0}),n.add(P0,P0.userData.contactShadow)});let H0=new Map,q0=[],i=window.innerWidth<600?14:22,r=0,D0="",T0=[],O0=0,Y0=()=>{let P0=String(h()?.line||"");if(P0!==D0){D0=P0;let m0=P0.match(/[A-Za-z0-9]+(?:[’'][A-Za-z0-9]+)*/g)||[];T0=[],m0.forEach((F0,DJ)=>{if(T0.push(F0),F0.length>4&&DJ%3===1)T0.push(F0[Math.min(F0.length-1,Math.floor(F0.length/2))])}),O0=0}if(!T0.length)return"…";let a0=T0[O0%T0.length];return O0+=1,a0},R0=(P0)=>{let a0=H0.get(P0);if(a0)return a0.lastUsed=performance.now(),a0;let m0=document.createElement("canvas"),F0=P0.length===1?94:Math.max(48,88-Math.max(0,P0.length-6)*4),DJ=m0.getContext("2d");DJ.font=`900 ${F0}px "Avenir Next", "Segoe UI", sans-serif`;let VJ=Math.ceil(DJ.measureText(P0).width);m0.width=Math.min(512,Math.max(112,VJ+34)),m0.height=128,DJ.font=`900 ${F0}px "Avenir Next", "Segoe UI", sans-serif`,DJ.textAlign="center",DJ.textBaseline="middle",DJ.lineJoin="round",DJ.lineWidth=Math.max(8,Math.round(F0*0.13)),DJ.strokeStyle="#080b0c",DJ.fillStyle="#ffffff",DJ.strokeText(P0,m0.width/2,67),DJ.fillText(P0,m0.width/2,67);let aJ=new G8(m0);if(aJ.colorSpace=o9,a0={texture:aJ,aspect:m0.width/m0.height,lastUsed:performance.now(),refs:0},H0.set(P0,a0),H0.size>48){let O9=[...H0.entries()].filter(([,Z9])=>Z9.refs===0&&Z9!==a0).sort((Z9,t8)=>Z9[1].lastUsed-t8[1].lastUsed)[0];if(O9)O9[1].texture.dispose(),H0.delete(O9[0])}return a0},M0=(P0,a0)=>{if(q0.length>=i)return;let m0=Y0(),F0=R0(m0);F0.refs+=1;let DJ=new L7({map:F0.texture,transparent:!0,opacity:0,depthWrite:!1,color:16777215}),VJ=new I6(DJ),aJ=Math.random()<0.5?-1:1;VJ.position.set(P0.position.x+(Math.random()-0.5)*0.28,P0.position.y+2.05+Math.random()*0.34,P0.position.z+0.08+Math.random()*0.18),VJ.scale.set(0.018*F0.aspect,0.018,1),VJ.renderOrder=8,VJ.userData.motion={textureEntry:F0,aspect:F0.aspect,velocity:new x(aJ*(0.22+Math.random()*0.7),(1.45+Math.random()*1.25)*(1+a0*0.08),0.08+Math.random()*0.42),age:0,bounceCount:0,targetScale:0.26+Math.random()*0.16,fadeStartedAt:1/0,spin:(Math.random()-0.5)*3.1},q0.push(VJ),n.add(VJ)},b0=(P0)=>{let a0=q0[P0];if(n.remove(a0),a0.material.dispose(),a0.userData.motion?.textureEntry)a0.userData.motion.textureEntry.refs=Math.max(0,a0.userData.motion.textureEntry.refs-1);q0.splice(P0,1)},S=(P0)=>{for(let a0=q0.length-1;a0>=0;a0--){let m0=q0[a0],F0=m0.userData.motion;if(F0.age+=P0,F0.velocity.y!==0)F0.velocity.y-=4.6*P0;if(m0.position.addScaledVector(F0.velocity,P0),m0.material.rotation+=F0.spin*P0,m0.position.y<=0.075)if(m0.position.y=0.075,Math.abs(F0.velocity.y)>0.34&&F0.bounceCount<3){if(F0.bounceCount+=1,F0.velocity.y=Math.abs(F0.velocity.y)*(0.38+Math.random()*0.18),F0.velocity.x+=(Math.random()-0.5)*0.5,F0.velocity.z+=(Math.random()-0.5)*0.34,F0.bounceCount===1)F0.fadeStartedAt=F0.age+0.8+Math.random()*0.55}else F0.velocity.y=0,F0.velocity.x*=Math.pow(0.24,P0),F0.velocity.z*=Math.pow(0.24,P0),F0.fadeStartedAt=Math.min(F0.fadeStartedAt,F0.age+0.3);let DJ=eJ.smoothstep(Math.min(F0.age/0.42,1),0,1),VJ=eJ.lerp(0.018,F0.targetScale,DJ);m0.scale.set(VJ*F0.aspect,VJ,1);let aJ=Math.min(1,F0.age/0.2),O9=F0.age>F0.fadeStartedAt?Math.max(0,1-(F0.age-F0.fadeStartedAt)/0.82):1;if(m0.material.opacity=aJ*O9,F0.age>4.6||m0.material.opacity<=0.01&&F0.age>0.7)b0(a0)}},E0=[];[-4.1,-3.4,3.4,4.1].forEach((P0,a0)=>{let m0=new jJ,F0=new SJ({color:a0%2?5536850:6590041,roughness:0.94}),DJ=new x0(new Q9(0.48+a0%2*0.13,18,12),F0);DJ.scale.y=0.75;let VJ=new x0(new Q9(0.3+a0%2*0.05,16,10),F0.clone());VJ.material.color.offsetHSL(0,0.02,0.06),VJ.scale.y=0.8,VJ.position.set(a0%2?0.34:-0.34,0.18,0.02),m0.position.set(P0,0.45,-2.5-a0%2*0.25),m0.add(DJ,VJ),n.add(m0),E0.push(m0)});let o=y({edgeOpacity:0.6,hullOpacity:0.94,maxMeshes:52,maxVertices:2200});o.decorate(n,{characters:Object.values(e)});let B0=new f6,S0=performance.now(),Z0=0,V0=0,o0=new x(0,3.05,8.6),NJ=new x(0,1.55,0.2),UJ=NJ.clone(),oJ=0,$9=!1,bJ=matchMedia("(prefers-reduced-motion: reduce)").matches,r8=()=>{let P0=A.getBoundingClientRect();if(!P0.width||!P0.height)return;if(p.setSize(P0.width,P0.height,!1),$0.aspect=P0.width/P0.height,$0.fov=$0.aspect<0.72?55:38,$0.aspect<0.72)$0.position.z=Math.max($0.position.z,11.6);$0.updateProjectionMatrix()},R8=new ResizeObserver(r8);R8.observe(A),r8();let P7=()=>{if($9)return;oJ=requestAnimationFrame(P7);let P0=performance.now(),a0=Math.min(0.034,Math.max(0.001,(P0-S0)/1000));S0=P0;let m0=B0.getElapsedTime(),F0=h()||{kind:"mayor",gesture:"welcome",line:""};if(Z0!==F0.enteredAt)Z0=F0.enteredAt||P0,V0=(F0.enteredAt||P0)+(F0.speechDelay||0),r=0;let DJ=Boolean(G&&G.text===F0.line&&G.kind===F0.kind),VJ=D[F0.kind]||D.mayor,aJ=Math.max(1900,(F0.line||"").length/(13*VJ.rate)*1000),O9=P0>=V0&&P0-V0<aJ,Z9=DJ||O9,_9=Z9?Math.max(0,(P0-V0)/1000):0,r9=DJ?G.rate||VJ.rate:VJ.rate,w7=F0.kind==="gideon"?-1.05:F0.kind==="press"?1.05:0,p6=$0.aspect<0.72?F0.kind==="press"?11.1:11.6:F0.kind==="press"?7.7:8.25;o0.set(w7*0.38,F0.kind==="press"?2.9:3.08,p6);let dJ=Math.max(0,(P0-(F0.enteredAt||P0))/1000)*(F0.kind==="mayor"?1.5:1);if(NJ.set(w7,1.52,F0.gesture==="arrival"?-0.45:0.1),!bJ)$0.position.lerp(o0,0.025),UJ.lerp(NJ,0.03);else $0.position.copy(o0),UJ.copy(NJ);$0.lookAt(UJ),e.gideon.visible=!0,e.press.visible=!0,Object.values(e).forEach((g0,R)=>{let f=g0.userData.kind===F0.kind,d=m0*1.7+R*1.4;if(g0.position.z=0.2,g0.rotation.y=0,g0.rotation.z=0,g0.scale.set(1,1,1),g0.userData.headAccessorySlot.position.set(0,0,0),g0.userData.headAccessorySlot.rotation.set(0,0,0),F0.gesture==="arrival"&&g0.userData.kind==="mayor"){let U0=bJ?1:eJ.smoothstep(Math.min(dJ/1.8,1),0,1);g0.position.z=eJ.lerp(-3,0.2,U0),g0.rotation.y=Math.sin(Math.min(dJ,1.8)*7)*(1-U0)*0.08}if(g0.position.y=bJ?0:Math.sin(d)*(f?0.055:0.025),g0.rotation.z=bJ?0:Math.sin(d*0.72)*(f?0.018:0.008),g0.userData.head.position.y=2.25+(bJ?0:Math.sin(d*1.1+0.8)*(f?0.045:0.018)),g0.userData.body.position.y=bJ?0:Math.sin(d*0.94)*0.018,g0.userData.hands.forEach((U0,L0)=>{U0.rotation.z=0,U0.position.y=1.34+(bJ?0:Math.sin(d*1.3+L0)*0.045),U0.position.x=(L0?1:-1)*0.58}),g0.userData.feet.forEach((U0,L0)=>{U0.position.x=(L0?1:-1)*0.23,U0.position.y=0.18+(bJ?0:Math.max(0,Math.sin(d*1.5+L0*Math.PI))*0.05),U0.rotation.z=(L0?1:-1)*0.08}),f&&!bJ){let U0=g0.userData.hands[0],L0=g0.userData.hands[1];if(F0.gesture==="arrival"){if(dJ<1.8)U0.position.y=1.34+Math.sin(dJ*8)*0.16,L0.position.y=1.34-Math.sin(dJ*8)*0.16,g0.userData.feet[0].position.y=0.18+Math.max(0,Math.sin(dJ*8))*0.12,g0.userData.feet[1].position.y=0.18+Math.max(0,-Math.sin(dJ*8))*0.12;else if(dJ<3.4){let p0=Math.sin(Math.min(1,(dJ-1.8)/1.6)*Math.PI);g0.userData.headAccessorySlot.position.set(-0.5*p0,-0.72*p0,0.27*p0),g0.userData.headAccessorySlot.rotation.set(0.18*p0,0,-0.42*p0),U0.position.set(-0.55,1.34+0.62*p0,0.18*p0),U0.rotation.z=-0.38*p0,L0.position.set(0.65,1.74+Math.sin(dJ*10)*0.09,0.08),L0.rotation.z=Math.sin(dJ*10)*0.36,g0.position.y=Math.sin(eJ.clamp((dJ-2.1)/0.9,0,1)*Math.PI)*0.12,g0.userData.feet.forEach((h0,A0)=>{h0.position.y=0.18+Math.max(0,Math.sin((dJ-2.05)*9+A0*Math.PI))*0.12})}}if(F0.gesture==="welcome")L0.position.y=1.78+Math.sin(m0*6)*0.12,L0.position.x=0.64+Math.sin(m0*6)*0.08;if(F0.gesture==="story"||F0.gesture==="shrug")U0.position.set(-0.72,1.55+Math.sin(m0*4)*0.12,0),L0.position.set(0.72,1.55+Math.cos(m0*4)*0.12,0);if(F0.gesture==="confide")U0.position.set(-0.26,1.55,0.27),g0.rotation.y=Math.sin(m0*2)*0.08;if(F0.gesture==="triumph")U0.position.set(-0.55,1.95+Math.sin(m0*5)*0.08,0),L0.position.set(0.55,1.95+Math.cos(m0*5)*0.08,0);if(F0.gesture==="interrupt")L0.position.set(0.68,1.82+Math.sin(m0*5)*0.06,0),g0.userData.head.rotation.z=Math.sin(m0*3)*0.035;if(F0.gesture==="camera"){if(U0.position.set(-0.23,1.58,0.26),L0.position.set(0.23,1.58,0.26),g0.userData.flash)g0.userData.flash.material.color.setHex(Math.sin(m0*5)>0.96?16777215:16770472)}}window.CylindricSpeakingMouth?.tick?.(g0.userData.speakingMouth,Boolean(f&&Z9),P0,a0);let g=g0.userData.talkMotion;if(f&&Z9){g.wasSpeaking=!0;let U0=0.68,L0=0.34,p0=1.42;if(!bJ&&_9<U0){let h0=eJ.smoothstep(_9/U0,0,1);g0.position.y=-0.1*h0,g0.scale.set(1+0.12*h0,1-0.38*h0,1+0.12*h0),g0.rotation.y=-Math.PI*2*h0,g0.rotation.z=Math.sin(_9*16)*0.035*h0,g0.userData.hands.forEach((A0,WJ)=>{A0.position.x=(WJ?1:-1)*(0.58-0.11*h0),A0.position.y=1.34-0.16*h0}),g0.userData.feet.forEach((A0,WJ)=>{A0.position.x=(WJ?1:-1)*(0.23-0.04*h0),A0.position.y=0.16})}else if(!bJ&&_9<U0+L0){let h0=eJ.smoothstep((_9-U0)/L0,0,1);g0.position.y=eJ.lerp(-0.1,p0,1-Math.pow(1-h0,3));let A0=Math.sin(h0*Math.PI);g0.scale.set(1+0.08*A0,0.62+0.38*h0+0.14*A0,1+0.08*A0),g0.rotation.y=-Math.PI*2*(1-h0)}else if(!bJ){let h0=Math.max(0,_9-U0-L0),A0=Math.sin(h0*(4.2+r9*1.35)),WJ=Math.sin(h0*(2.2+r9*0.55)),MJ=0.5+0.5*Math.sin(h0*(5.1+r9*2.15)),OJ=1+A0*0.035;g0.position.y=p0+Math.sin(h0*2.15)*0.085,g0.scale.set(OJ,1-A0*0.022,OJ),g0.rotation.y=WJ*0.045,g0.rotation.z=WJ*0.025,g0.userData.head.rotation.z=-WJ*0.045,g0.userData.hands.forEach((XJ,_J)=>{let w0=_J?1:-1;XJ.position.x=w0*(0.62+0.32*MJ),XJ.position.y=1.43+0.42*MJ+Math.sin(h0*6+_J)*0.035,XJ.rotation.z=-w0*(0.24+0.42*MJ)}),g0.userData.feet.forEach((XJ,_J)=>{let w0=_J?1:-1;XJ.position.x=w0*(0.23+0.19*MJ),XJ.position.y=0.23+0.13*MJ,XJ.rotation.z=-w0*(0.08+0.19*MJ)}),r+=a0*(3.5+r9*2.2);while(r>=1)M0(g0,r9),r-=1}}else if(g.wasSpeaking)g.wasSpeaking=!1,g.releaseStartedAt=P0;else if(g.releaseStartedAt&&!bJ){let U0=eJ.clamp((P0-g.releaseStartedAt)/520,0,1);if(U0<1){let L0=eJ.smoothstep(U0,0,1);g0.position.y+=1.42*(1-L0);let p0=Math.sin(U0*Math.PI*3)*(1-U0);g0.scale.set(1+0.04*p0,1-0.06*p0,1+0.04*p0)}else g.releaseStartedAt=0}let z0=g0.userData.contactShadow,y0=Math.max(0,g0.position.y),I0=1+Math.min(0.32,y0*0.14);z0.position.set(g0.position.x,0.014,g0.position.z),z0.scale.set(I0,I0,I0),z0.material.opacity=0.42*Math.max(0.36,1-y0*0.34)}),S(a0),l.rotation.z=bJ?0:Math.sin(m0*0.8)*0.025,E0.forEach((g0,R)=>g0.scale.y=1+(bJ?0:Math.sin(m0*1.1+R)*0.012)),p.render(n,$0)};return P7(),{getMouthPoint(P0){let a0=e[P0]?.userData?.speakingMouth?.mesh;if(!a0)return null;let m0=new a0.position.constructor;a0.getWorldPosition(m0),m0.project($0);let F0=p.domElement.getBoundingClientRect();return{x:F0.left+(m0.x+1)*.5*F0.width,y:F0.top+(-m0.y+1)*.5*F0.height}},dispose(){$9=!0,cancelAnimationFrame(oJ),R8.disconnect(),q0.forEach((P0)=>{n.remove(P0),P0.material.dispose()}),H0.forEach((P0)=>P0.texture.dispose()),o.dispose(),p.dispose(),A.replaceChildren()}}}function a(){return'<div class="welcome-canvas-host"></div><div class="welcome-fallback"><div class="welcome-bunting"></div><div class="welcome-paper">THE CYCLICAL CITY GAZETTE · NEW NEIGHBOR EDITION</div><div class="welcome-figures" aria-hidden="true"><div class="welcome-figure gideon"><i class="figure-head"></i><i class="figure-body"></i><i class="figure-hand left"></i><i class="figure-hand right"></i><i class="figure-foot left"></i><i class="figure-foot right"></i></div><div class="welcome-figure mayor"><i class="figure-head"></i><i class="figure-body"></i><i class="figure-hand left"></i><i class="figure-hand right"></i><i class="figure-foot left"></i><i class="figure-foot right"></i></div><div class="welcome-figure press"><i class="figure-head"></i><i class="figure-body"></i><i class="figure-hand left"></i><i class="figure-hand right"></i><i class="figure-foot left"></i><i class="figure-foot right"></i></div></div></div>'}function Q0(A,h,p){if(document.documentElement.classList.contains("snug-start-open")){window.addEventListener("snug-start-welcome",()=>Q0(A,h,p),{once:!0});return}if(Y)return;primeSpeechFromGesture(),Y=!0;let n=++X,$0=0,K0=0,X0=!1,N0=document.createElement("div");N0.className="welcome-cinematic",N0.setAttribute("role","dialog"),N0.setAttribute("aria-modal","true"),N0.setAttribute("aria-label","The welcoming committee"),N0.innerHTML=`<div class="welcome-scene">${a()}</div><section class="welcome-dialogue"><div class="welcome-speaker-row"><div class="welcome-speaker"></div><button class="welcome-help" type="button" aria-label="Pause and help" title="Pause and help"></button></div><p class="welcome-line dialogue-caption" tabindex="0" aria-live="polite"></p><div class="welcome-actions"><div class="welcome-progress" aria-hidden="true"></div><button class="welcome-next" type="button"></button></div></section>`,document.documentElement.classList.remove("snug-start-open"),document.documentElement.classList.add("snug-welcome-active"),window.__snugWelcomeActive=!0,document.body.appendChild(N0);let k0=()=>{if(X0||!Y||n!==X)return;if(document.documentElement.classList.contains("snug-start-open"))document.documentElement.classList.remove("snug-start-open");if(!document.documentElement.classList.contains("snug-welcome-active"))document.documentElement.classList.add("snug-welcome-active");if(document.querySelectorAll(".snug-start-screen").forEach((C0)=>C0.remove()),!N0.isConnected)document.body.appendChild(N0)},c0=new MutationObserver(()=>queueMicrotask(k0));c0.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),c0.observe(document.body,{childList:!0});let j0=N0.querySelector(".welcome-speaker"),JJ=N0.querySelector(".welcome-line"),ZJ=N0.querySelector(".welcome-progress"),v0=N0.querySelector(".welcome-next"),n0=()=>({text:A[$0].line,speaker:A[$0].speaker,kind:A[$0].kind}),i0=null,autoEpoch=0,userTouched=!1,spoken=!1;try{i0=G0(N0.querySelector(".welcome-canvas-host"),()=>A[$0])}catch(C0){console.warn("The 3D welcoming scene could not start; continuing with the illustrated ceremony.",C0)}let w=()=>{if(X0||n!==X)return;if(X0=!0,c0.disconnect(),clearTimeout(K0),window.__snugWordSpill?.stop?.(JJ),F(),i0)i0.dispose();if(N0.remove(),Y=!1,document.documentElement.classList.remove("snug-welcome-active"),window.__snugWelcomeActive=!1,p)p()},KJ=()=>{if(X0||n!==X)return;clearTimeout(K0),window.__snugWordSpill?.stop?.(JJ),userTouched=!1,spoken=!1;let C0=A[$0],lineEpoch=++autoEpoch;try{C0.enteredAt=performance.now(),N0.className=`welcome-cinematic ${i0?"is-three-dimensional ":""}is-${C0.kind} gesture-${C0.gesture||"talk"}`,j0.textContent=C0.speaker;let L=C0.speechDelay?matchMedia("(prefers-reduced-motion: reduce)").matches?250:C0.speechDelay:0,O=()=>{if(X0||lineEpoch!==autoEpoch)return;v0.disabled=!1,window.__snugWordSpill?.start?.({text:C0.line,target:JJ,source:()=>i0?.getMouthPoint?.(C0.kind),duration:Math.max(1100,C0.line.length/Math.max(.65,(D[C0.kind]||D[V(C0.speaker)]).rate)*54)});let T=()=>{if(X0||lineEpoch!==autoEpoch)return;spoken=!0;if(userTouched)return;clearTimeout(K0),K0=setTimeout(()=>{!X0&&lineEpoch===autoEpoch&&!userTouched&&f0()},600)};N&&U?j(C0.line,C0.speaker,C0.kind,!1,0,T):K0=setTimeout(T,Math.max(900,C0.line.length*48)),window.__snugWelcomeDialogueDebug={speaker:C0.speaker,line:$0+1,total:A.length,autoPending:!0}};if(JJ.textContent=L?"":C0.line,JJ.scrollTop=0,ZJ.innerHTML=A.map((T,e)=>`<i class="${e===$0?"active":""}"></i>`).join(""),v0.textContent=$0===A.length-1?h:"Continue",v0.disabled=Boolean(L),L)K0=setTimeout(O,L);else O()}catch(L){console.warn("The current welcoming scene fell back to its readable dialogue.",L),JJ.textContent=C0?.line||"The welcoming committee is ready.",v0.textContent=$0===A.length-1?h:"Continue",v0.disabled=!1,k0()}},f0=()=>{if(v0.disabled||X0)return;if(clearTimeout(K0),autoEpoch+=1,window.__snugWordSpill?.stop?.(JJ),F(),$0<A.length-1)$0++,KJ();else w()};B(JJ,n0),JJ.addEventListener("pointerdown",()=>{userTouched=!0,spoken&&f0()},{capture:!0}),N0.querySelector(".welcome-help").addEventListener("click",(C0)=>{C0.stopPropagation(),userTouched=!0,autoEpoch+=1,clearTimeout(K0),P({onSkip:w})}),v0.addEventListener("click",(C0)=>{C0.stopPropagation(),userTouched=!0,f0()}),N0.addEventListener("click",(C0)=>{if(C0.target.closest("button")||JJ.dataset.suppressAdvance==="true")return;userTouched=!0,spoken&&f0()}),k0(),KJ()}function W0(A){let h=A.querySelector(".expression-photo-tabs button.active");if(!h)return"calm / idle";let p=h.textContent.toLowerCase().replace(/\s+(ready|preview)$/i,"").replace(/^add\s+/,"").trim();return Object.keys(J).find((n)=>p.includes(n))||"calm / idle"}function u0(A){return[...A.querySelectorAll(".expression-photo-tabs button")].filter((h)=>/ready/i.test(h.textContent)).length}function l0(A){if(!A||A.dataset.welcomeEnhanced)return;if(A.dataset.welcomeEnhanced="true",window.__snugSkipWelcome){K=!0,W=!0,setTimeout(()=>A.querySelector('button[aria-label="Close Town Hall portraits"]')?.click(),0);return}let h=A.querySelector(".expression-photo-tabs");if(!h)return;let p=A.closest(".sheet-backdrop");if(p)p.dataset.portraitStepFlow="true";let n=document.createElement("div");n.className="portrait-route",n.innerHTML='<button type="button" aria-label="Previous portrait scene">Back</button><span><b></b><small></small></span><button type="button" aria-label="Next portrait scene">Next</button>',h.insertAdjacentElement("afterend",n);let $0=n.querySelectorAll("button"),K0=(v0)=>{let n0=[...h.querySelectorAll("button")],i0=Math.max(0,n0.findIndex((KJ)=>KJ.classList.contains("active"))),w=n0[Math.max(0,Math.min(n0.length-1,i0+v0))];if(w)w.click()};$0[0].addEventListener("click",()=>K0(-1)),$0[1].addEventListener("click",()=>K0(1));let X0=document.createElement("div");X0.className="portrait-director",X0.innerHTML='<span class="portrait-director-mark">MM</span><div><b></b><p class="dialogue-caption" tabindex="0"></p></div><button class="portrait-help" type="button" aria-label="Pause and help">?</button>',n.insertAdjacentElement("afterend",X0);let N0=X0.querySelector("p"),k0=new Map,c0=0,j0={text:"",speaker:"",kind:"press"};B(N0,()=>j0),X0.querySelector(".portrait-help").addEventListener("click",P);let JJ=(v0=!1)=>{let n0=W0(A),i0=J[n0]||J["calm / idle"],w=[...h.querySelectorAll("button")],KJ=Math.max(0,w.findIndex((e)=>e.classList.contains("active"))),f0=/ready/i.test(w[KJ]?.textContent||""),C0=k0.get(n0);k0.set(n0,f0);let L=C0===!1&&f0,O=L?Q[n0]:i0[1];j0={text:O,speaker:i0[0],kind:"press"};let T=f0?"refine":"capture";if(A.dataset.portraitPhase=T,n.querySelector("b").textContent=n0.replace(/(^|\s)\S/g,(e)=>e.toUpperCase()),n.querySelector("small").textContent=`Portrait ${KJ+1} of ${w.length} · ${T==="capture"?"Take photo":"Adjust framing"}`,$0[0].disabled=KJ===0,$0[1].disabled=!f0||KJ===w.length-1,$0[1].textContent=KJ===w.length-2?"Final photo":"Next",X0.dataset.pose=n0,X0.querySelector(".portrait-director-mark").textContent="LL",X0.querySelector("b").textContent=i0[0],N0.textContent=O,L)X0.classList.remove("is-reacting"),requestAnimationFrame(()=>X0.classList.add("is-reacting")),clearTimeout(c0),c0=setTimeout(()=>X0.classList.remove("is-reacting"),720);if((v0||L)&&!Y)j(j0.text,j0.speaker,j0.kind);let l=u0(A);if(H===null)H=l;if(K&&!W&&H<9&&l===9)W=!0,setTimeout(()=>Q0(Z,"Take the front-page photo",()=>{let e=[...A.querySelectorAll(".expression-photo-tabs button")].find((H0)=>/happy/i.test(H0.textContent));if(e)e.click()}),350);H=l};if(h.addEventListener("click",()=>setTimeout(()=>JJ(!0),0)),new MutationObserver(()=>JJ(!1)).observe(h,{subtree:!0,childList:!0,characterData:!0,attributes:!0}),JJ(!1),!K)K=!0,setTimeout(()=>Q0($,"Begin the paperwork",()=>{let v0=[...A.querySelectorAll(".expression-photo-tabs button")].find((n0)=>/calm/i.test(n0.textContent));if(v0)v0.click()}),280)}let EJ=!1;new MutationObserver(()=>{let h=[...document.querySelectorAll(".sheet")].find((p)=>p.querySelector(".sheet-head h2")?.textContent.trim()==="Town Hall portraits");if(h)EJ=!0,l0(h);else if(EJ&&!Y)EJ=!1,F()}).observe(document.documentElement,{subtree:!0,childList:!0})})();})();
