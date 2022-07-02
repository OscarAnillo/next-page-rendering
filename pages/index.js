import path from "path";
import { promises } from "fs";

import Link from "next/link";

export default function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  //console.log("(Re-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await promises.readFile(filePath);
  const data = JSON.parse(jsonData);

  // When there's no data we show the 404 page
  if (data.products.length === 0) {
    return { notFound: true };
  }

  // When there's no data we redirect to /error-ocurred path
  // if (!data) {
  //   return {
  //     redirect: {
  //       destination: "/error-ocurred",
  //     },
  //   };
  // }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
