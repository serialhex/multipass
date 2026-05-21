function reduce(x, N) {
  // this:
  // https://lemire.me/blog/2016/06/27/a-fast-alternative-to-the-modulo-reduction/
  // doesn't seem to work in javascript -_-
  // going to use modulo until I find something better...

  return x % N;
}

// https://github.com/bryc/code/blob/master/jshash/PRNGs.md#xoroshiro
function xoroshiro64ss(a, b) {
  return function() {
    var r = Math.imul(a, 0x9E3779BB); r = (r << 5 | r >>> 27) * 5;
    b = b ^ a; a = b ^ (a << 26 | a >>> 6) ^ b << 9;
    b = b << 13 | b >>> 19;
    return (r >>> 0);
  }
}

function rand_in_range(rand, min, max) {
  return reduce(rand, max - min + 1) + min;
}

