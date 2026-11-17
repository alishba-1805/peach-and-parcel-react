export const products = [
  {
    id: "strawberry-bento",
    name: "Strawberry Sunday Bento",
    category: "Cakes",
    price: 1800,
    stock: 4,
    servings: "2–3 people",
    eggFree: false,
    description:
      "Vanilla sponge, strawberry compote and a soft blush buttercream finish. A small cake for a lovely little occasion.",
  },
  {
    id: "vanilla-cupcakes",
    name: "Vanilla Cloud Cupcakes",
    category: "Cupcakes",
    price: 1200,
    stock: 8,
    servings: "Box of 4",
    eggFree: true,
    description:
      "Four vanilla cupcakes with cloud-like swirls and a scatter of sugar pearls.",
  },
  {
    id: "brownie-box",
    name: "Midnight Brownie Box",
    category: "Cookies & bars",
    price: 950,
    stock: 6,
    servings: "6 squares",
    eggFree: false,
    description:
      "Deep cocoa brownies with a thin crackly top and dark chocolate chunks.",
  },
  {
    id: "rose-pistachio",
    name: "Rose & Pistachio Cake",
    category: "Cakes",
    price: 3200,
    stock: 3,
    servings: "6–8 people",
    eggFree: true,
    description:
      "Pistachio sponge layered with rose cream and finished with chopped nuts.",
  },
  {
    id: "lemon-loaf",
    name: "Little Lemon Loaf",
    category: "Cookies & bars",
    price: 600,
    stock: 10,
    servings: "2 slices",
    eggFree: true,
    description:
      "A bright lemon mini loaf with a crisp citrus glaze. Just right alongside afternoon tea.",
  },
  {
    id: "caramel-cookies",
    name: "Salted Caramel Cookies",
    category: "Cookies & bars",
    price: 850,
    stock: 5,
    servings: "Box of 6",
    eggFree: false,
    description:
      "Golden cookies with chewy caramel centres and a pinch of sea salt.",
  },
  {
    id: "red-velvet",
    name: "Red Velvet Ribbon Bento",
    category: "Cakes",
    price: 1900,
    stock: 0,
    servings: "2–3 people",
    eggFree: false,
    description:
      "Cocoa-red sponge, cream cheese frosting and a hand-piped ribbon border.",
  },
  {
    id: "ganache-cake",
    name: "Chocolate After Hours",
    category: "Cakes",
    price: 2800,
    stock: 2,
    servings: "6 people",
    eggFree: false,
    description:
      "Chocolate sponge with a glossy ganache drape and a generous cocoa finish.",
  },
  {
    id: "birthday-cupcakes",
    name: "Make-a-Wish Cupcakes",
    category: "Cupcakes",
    price: 1600,
    stock: 7,
    servings: "Box of 6",
    eggFree: false,
    description:
      "Confetti vanilla cupcakes with peach frosting, colourful sprinkles and one tiny candle.",
  },
  {
    id: "tiramisu-cups",
    name: "Coffee Break Tiramisu",
    category: "Dessert cups",
    price: 1100,
    stock: 4,
    servings: "2 cups",
    eggFree: true,
    description:
      "Coffee-soaked biscuit layers, mascarpone-style cream and cocoa. Alcohol-free recipe.",
  },
  {
    id: "blueberry-cups",
    name: "Blueberry Cheesecake Cups",
    category: "Dessert cups",
    price: 1300,
    stock: 6,
    servings: "2 cups",
    eggFree: true,
    description:
      "No-bake vanilla cheesecake over biscuit crumbs, topped with blueberry compote.",
  },
  {
    id: "cinnamon-blondies",
    name: "Cinnamon & Brown Butter Blondies",
    category: "Cookies & bars",
    price: 900,
    stock: 5,
    servings: "6 squares",
    eggFree: false,
    description:
      "Buttery blondies with a cinnamon ripple and toasted sugar edges.",
  },
].map((product) => ({
  ...product,
  image: "/images/" + product.id + ".svg",
  imageAlt: "Original dessert illustration: " + product.name,
}));
