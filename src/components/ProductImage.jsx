import { useState } from "react";

export default function ProductImage({ product }) {
  const [imageFailed, setImageFailed] = useState(false);
  const fallback = "/images/fallback.svg";
  const image = imageFailed ? fallback : product.image || fallback;

  return (
    <img
      src={image}
      alt={product.imageAlt || product.name}
      onError={() => setImageFailed(true)}
    />
  );
}
