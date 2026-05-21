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

function odd_p(num) {
  return 1 == (num % 2);
}

function draw(str, id) {
  const canvas = document.getElementById(id);

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    let len = str.length;
    let arr = str_int_arr(str)
    let max = max_val(arr);
    let min = min_val(arr);
    let hash = cyrb_dual32(str);
    console.log(`${str} min char: ${min} max: ${max}`);

    // Make it white half the time
    ctx.fillStyle = odd_p(min) ? "rgba(255,255,255,1.0)" : "rgba(0,0,0,1.0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // let color = make_rgba();

    let pix_size = 8
    for (var y = 0; y < canvas.height; y += pix_size) {
      for (var x = 0; x < canvas.width; x += pix_size) {
        var i = x+y;
        if (odd_p(arr[i % len])) {
          ctx.fillStyle = make_rgba(arr[i % len], arr[(i+1)%len], arr[(i+2)%len], min, max);
          ctx.fillRect(x, y, pix_size, pix_size);
        } else {
          // do nothing
        }
      }
    }

  } else {
    // canvas-unsupported code here
    alert("Canvas called, but somehow not supported.");
  }
}

