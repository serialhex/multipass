//////////////////////////////////////////////////////////////////////////
// some funky visualizations

function max_val(arr) {
  var val = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (val < arr[i]) {
      val = arr[i];
    }
  }
  return val;
}

function min_val(arr) {
  var val = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (val > arr[i]) {
      val = arr[i];
    }
  }
  return val;
}

function str_int_arr(str) {
  var arr = new Array(str.length);
  for (var i = 0; i < str.length; i++) {
    arr[i] = str[i].charCodeAt(0);
  }
  return arr;
}

function gcd(a, b) {
  while (b != 0) {
    var t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function make_rgba(r, g, b, min, max) {
  function m(v) { return Math.floor(((v - min) / (max - min)) * 255); }
  return "rgba(" + m(r) + ", " + m(g) + ", " + m(b) + ", 1.0)";
}

function draw(str) {
  const canvas = document.getElementById("tutorial");

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    let len = str.length;
    let arr = str_int_arr(str)
    let max = max_val(arr);
    let min = min_val(arr);
    console.log(min);
    console.log(max);

    for (var y = 0; y < canvas.height; y += 2) {
      for (var x = 0; x < canvas.width; x += 2) {
        var i = x+y;
        ctx.fillStyle = make_rgba(arr[i % len], arr[(i+1)%len], arr[(i+2)%len], min, max);
        console.log(arr[i % len]);
        ctx.fillRect(x, y, 2, 2);
      }
    }

  } else {
    // canvas-unsupported code here
  }
}

