/*
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
 */
"use strict";

let globalAmplitude = 1;

let p = {w: 10, a: 4 * globalAmplitude}
let pq = {w: 2, a: 0 * globalAmplitude}
let q = {w: 3, a: 6 * globalAmplitude}
let r = {w: 6, a: 30 * globalAmplitude}
let s = {w: 4, a: 2 * globalAmplitude}
let st = {w: 2, a: 0 * globalAmplitude}
let t = {w: 6, a: 2 * globalAmplitude}
let tp = {w: 7, a: 0 * globalAmplitude}

let array = [];

function ecg(numSample){
  let stop;

  // Generate p wave
  for(let i = 0; i < p.w / 40 * numSample; i++){
    let abs = (i / numSample) ;
    let fAbs = abs * 40 / p.w;
    array[i] = {x: abs, y: p.a * Math.pow(fAbs,3)*(1-fAbs)};
  }
  // Generate pq fill
  stop = array.length + pq.w / 40 * numSample;
  for(let i = array.length; i < stop; i++){
    let abs = (i / numSample) ;
    let fAbs = abs * 40 / pq.w;
    array[i] = {x: abs, y: pq.a};
  }
  // Generate q wave
  stop = array.length + q.w / 40 * numSample;
  let j = 0;
  for(let i = array.length; i < stop; i++){
    let abs = (i / numSample) ;
    array[i] = {x: abs, y: - q.a * 0.02 * j};
    j++;
  }
  // Generate r wave
  stop = array.length + (r.w / 40 * numSample) / 2;
  j = 0;
  origin = array[array.length - 1].y;
  for(let i = array.length; i < stop; i++){
    let abs = (i / numSample) ;
    array[i] = {x: abs, y:   r.a * 0.06 * (j + 1) + origin};
    j++;
  }
  stop = array.length + (r.w / 40 * numSample) / 2;
  j = 0;
  origin = array[array.length - 1].y;
  for(let i = array.length; i < stop; i++){
    let abs = (i / numSample) ;
    array[i] = {x: abs, y:  - r.a * 0.06 * (j + 1) + origin};
    j++;
  }
  // Generate s wave
  stop = array.length + s.w / 40 * numSample;
  j = 0;
  origin = array[array.length - 1].y;
  let indexOrigin = array.length - 1;
  for(let i = array.length; i < stop; i++){
    let abs = (i / numSample) ;
    array[i] = {x: abs, y: - origin * Math.sqrt((j+1)/(stop-indexOrigin)) + origin};
    j++;
  }
  // Generate st fill
  stop = array.length + st.w / 40 * numSample;
  for(let i = array.length; i < stop; i++){
    let abs = (i / numSample) ;
    let fAbs = abs * 40 / st.w;
    array[i] = {x: abs, y: st.a};
  }
  // Generate t wave
  stop = array.length + t.w / 40 * numSample;
  j = 0;
  indexOrigin = array.length - 1;
  for(let i = array.length; i < stop; i++){
    let abs = (i / numSample) ;
    array[i] = {x: abs, y: t.a * Math.pow((j+1) /(stop-indexOrigin) ,3)*(1-(j+1)/(stop-indexOrigin))};
    j++;
  }
  // Generate tp fill
  stop = array.length + tp.w / 40 * numSample;
  for(let i = array.length; i < stop; i++){
    let abs = (i / numSample) ;
    let fAbs = abs * 40 / tp.w;
    array[i] = {x: abs, y: tp.a};
  }
  console.log(array.length);
  console.log(array);
  return array;
}