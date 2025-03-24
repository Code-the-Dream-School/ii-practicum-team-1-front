import { useParams } from "react-router-dom";

export default function PostEdit() {
  const { id } = useParams();
  return <h1>Edit Post Page — ID: {id}</h1>;
}
