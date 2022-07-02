import path from "path";
import { promises } from "fs";

export default function ProductDetailPage({ productFound }) {
  console.log(productFound);
  return (
    <div>
      <h1>{productFound.title}</h1>
      <p>{productFound.description}</p>
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await promises.readFile(filePath);
  const data = JSON.parse(jsonData);

  const productFound = data.products.find(
    (product) => product.id === productId
  );

  return {
    props: {
      productFound,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: `p1` } }],
    fallback: true,
  };
}
