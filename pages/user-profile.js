export default function UserProfilePage({ username }) {
  return <h1>{username}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: "Oscar",
    },
  };
}
