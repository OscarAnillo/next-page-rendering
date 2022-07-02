import path from "path";
import { promises } from "fs";

export default function ProductDetailPage({ productFound }) {
  return (
    <div>
      <h1>{productFound.title}</h1>
      <p>{productFound.description}</p>
    </div>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await promises.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

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
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathWithParams,
    fallback: true,
  };
}
