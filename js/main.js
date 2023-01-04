////////////////////////////////////////////////////////////////////////////////
// This is where I get to work!

const alpha = "abcdefghijklmnopqrstuvwxyz";
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbr = "0123456789";
const punct = "!#$%&'*+,-./:;=?@^_`|~";

function gen_charset(extra_chars) {
  // build the charset
  let charset = "";

  charset += extra_chars;

  if (document.getElementById("low_alpha").checked) {
    charset += alpha;
  }
  if (document.getElementById("up_alpha").checked) {
    charset += ALPHA;
  }
  if (document.getElementById("numbr").checked) {
    charset += numbr;
  }
  if (document.getElementById("punct").checked) {
    charset += punct;
  }

  charset = charset.split('');
  charset = [...new Set(charset)];
  charset.sort();
  charset = charset.join('');
  return charset;
}

function doit() {
  let val = document.getElementById("basephrase").value;

  // set up the generator
  let seeds = cyrb_dual32(val);
  let rng = xoroshiro64ss(seeds[0], seeds[1]);

  let charset = gen_charset("");

  if (charset.length == 0) {
    alert("You need to select at least *one* item for the set of characters to be used!");
    return;
  }

  document.getElementById("char_set").innerHTML = charset;

  let min_chars = Math.round(document.getElementById("min_chars").value);
  let max_chars = Math.round(document.getElementById("max_chars").value);
  console.log(min_chars);
  console.log(max_chars);


  // Probably the only error thingy in the whole thing...
  if (min_chars > max_chars) {
    alert("Minimum number of characters is greater than the maximum number of characters!");
    return;
  }

  // generate passwords!
  let pass = "";

  for (let n = 0; n < 10; n++) {
    let n_chars = rand_in_range(rng(), min_chars, max_chars);

    pass += "<div class=\"grid-item\">"
    for (let i = 0; i < n_chars; i++) {
      const r = rng();
      pass += charset[reduce(r, charset.length)];
    }
    pass += "</div>"
  }

  // pass += "</ol>";


  document.getElementById("output").innerHTML = pass;
}

