import { GetSearchParams } from "../helpers";
import Home from "./page";

export default function Default({ searchParams }: { searchParams: GetSearchParams }) {
  return <Home searchParams={searchParams} />;
}
