import { mkdir, writeFile } from "node:fs/promises";
import { products } from "../src/data/products.js";
await mkdir("public/images", { recursive: true });
const colors = [
  "#edb3b6",
  "#f4d9ba",
  "#805344",
  "#b2bb97",
  "#e9c35c",
  "#be8d59",
  "#b76c74",
  "#674338",
  "#eeb19c",
  "#b7947b",
  "#7e7caa",
  "#c89b69",
];
for (const [i, product] of products.entries()) {
  const color = colors[i];
  let dessert = "";
  if (product.category === "Cakes") {
    dessert =
      '<ellipse cx="300" cy="319" rx="156" ry="35" fill="#e0cbb9"/><path d="M165 207 Q300 161 435 207 V294 Q300 356 165 294Z" fill="' +
      color +
      '"/><path d="M165 252 Q300 298 435 252" fill="none" stroke="#fff1df" stroke-width="12"/><ellipse cx="300" cy="205" rx="135" ry="43" fill="#fff0df"/><path d="M169 209 Q180 257 193 224 T223 224 T253 224 T283 224 T313 224 T343 224 T373 224 T403 224 T433 209" fill="#fff0df"/>';
    for (let n = 0; n < 7; n++) {
      const a = (n * Math.PI * 2) / 7;
      dessert +=
        '<circle cx="' +
        (300 + 100 * Math.cos(a)) +
        '" cy="' +
        (202 + 26 * Math.sin(a)) +
        '" r="12" fill="' +
        color +
        '"/>';
    }
    dessert +=
      '<path d="M288 184 Q300 153 314 184 L302 198Z" fill="#b44d5c"/><path d="M300 177 l-4 -13 l12 8" fill="none" stroke="#667956" stroke-width="4"/>';
  } else if (product.category === "Cupcakes") {
    for (const [x, y] of [
      [212, 260],
      [382, 260],
      [298, 189],
    ])
      dessert +=
        '<path d="M' +
        (x - 44) +
        " " +
        y +
        ' l14 70 h60 l14 -70Z" fill="' +
        color +
        '"/><path d="M' +
        (x - 40) +
        " " +
        (y + 5) +
        " Q" +
        (x - 67) +
        " " +
        (y - 18) +
        " " +
        (x - 28) +
        " " +
        (y - 34) +
        " Q" +
        (x - 35) +
        " " +
        (y - 67) +
        " " +
        x +
        " " +
        (y - 62) +
        " Q" +
        (x + 24) +
        " " +
        (y - 83) +
        " " +
        (x + 30) +
        " " +
        (y - 34) +
        " Q" +
        (x + 67) +
        " " +
        (y - 12) +
        " " +
        (x + 40) +
        " " +
        (y + 5) +
        'Z" fill="#fff2df" stroke="#dbb9a1" stroke-width="2"/><path d="M' +
        (x - 20) +
        " " +
        (y + 14) +
        ' l8 44 m32 -44 l-8 44" stroke="#fff3e8" stroke-width="3"/><circle cx="' +
        x +
        '" cy="' +
        (y - 57) +
        '" r="7" fill="#ba6b75"/>';
  } else if (product.category === "Dessert cups") {
    for (const x of [225, 375])
      dessert +=
        '<path d="M' +
        (x - 60) +
        ' 195 l14 132 q46 18 92 0 l14 -132Z" fill="#f4e2ca" stroke="#b69b84" stroke-width="3"/><path d="M' +
        (x - 51) +
        ' 255 q51 18 102 0 m-98 45 q45 15 90 0" stroke="' +
        color +
        '" stroke-width="17"/><ellipse cx="' +
        x +
        '" cy="195" rx="60" ry="18" fill="' +
        color +
        '"/><ellipse cx="' +
        x +
        '" cy="190" rx="47" ry="13" fill="#fff4e1"/><circle cx="' +
        (x - 5) +
        '" cy="185" r="8" fill="' +
        color +
        '"/><circle cx="' +
        (x + 12) +
        '" cy="188" r="7" fill="' +
        color +
        '"/>';
  } else if (product.id === "caramel-cookies") {
    for (const [x, y] of [
      [230, 230],
      [338, 218],
      [280, 298],
      [397, 293],
    ])
      dessert +=
        '<ellipse cx="' +
        x +
        '" cy="' +
        y +
        '" rx="62" ry="46" fill="' +
        color +
        '" stroke="#a97542" stroke-width="3"/><path d="M' +
        (x - 25) +
        " " +
        (y - 15) +
        ' l10 6 m25 13 l12 -7 m-34 27 l8 -9" stroke="#654334" stroke-width="9" stroke-linecap="round"/>';
  } else if (product.id === "lemon-loaf") {
    dessert =
      '<path d="M173 222 l175 -60 l88 65 v75 l-170 62 l-93 -67Z" fill="#c69b5e"/><path d="M173 222 l175 -60 l88 65 l-170 62Z" fill="#f3dfa4"/><path d="M192 219 l158 -45 l62 48 l-144 50Z" fill="#fff4de"/><path d="M264 291 v58 m32 -70 v58 m34 -70 v58" stroke="#dcb778" stroke-width="4"/><path d="M300 224 a30 30 0 1 1 42 -38Z" fill="#f4cd55" stroke="#fff4ce" stroke-width="5"/>';
  } else {
    for (const [x, y] of [
      [189, 215],
      [287, 199],
      [237, 280],
      [337, 266],
    ])
      dessert +=
        '<path d="M' +
        x +
        " " +
        y +
        ' l75 -17 l25 31 v47 l-76 20 l-24 -28Z" fill="' +
        color +
        '"/><path d="M' +
        x +
        " " +
        y +
        ' l75 -17 l25 31 l-76 20Z" fill="' +
        (product.id === "brownie-box" ? "#5a362f" : "#e1b57e") +
        '"/><path d="M' +
        (x + 20) +
        " " +
        (y + 2) +
        ' l15 10 m24 -15 l14 9" stroke="#fff0ce" stroke-width="4"/>';
  }
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440"><rect width="600" height="440" fill="' +
    (i % 2 ? "#f0e7d7" : "#f3e3dc") +
    '"/><path d="M0 350 Q170 309 600 350 V440 H0Z" fill="#e9d7c5"/><ellipse cx="300" cy="330" rx="214" ry="57" fill="#fffaed"/><ellipse cx="300" cy="330" rx="199" ry="47" fill="none" stroke="#d8c9b3" stroke-width="2"/>' +
    dessert +
    '<g fill="none" stroke="#a78b76" stroke-width="2"><path d="M65 74 h34 m-17 -17 v34 M510 342 h25 m-13 -12 v25"/></g><text x="32" y="411" font-family="Georgia,serif" font-size="13" letter-spacing="3" fill="#72584a">PEACH &amp; PARCEL · STUDIO SKETCH ' +
    String(i + 1).padStart(2, "0") +
    "</text></svg>";
  await writeFile("public/images/" + product.id + ".svg", svg);
}
await writeFile(
  "public/images/fallback.svg",
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440"><rect width="600" height="440" fill="#efe2d6"/><text x="300" y="205" text-anchor="middle" font-family="Georgia" font-size="32" fill="#573944">Peach &amp; Parcel</text><text x="300" y="247" text-anchor="middle" font-size="18" fill="#573944">Dessert illustration unavailable</text></svg>',
);
