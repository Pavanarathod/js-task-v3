"use strict";
console.log("script is loaded...");
const slider = document.getElementById("userSlider");
const output = document.getElementById("userValue");

slider.oninput = function () {
  output.innerHTML = this.value;
};
