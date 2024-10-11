import HomeLayout from "./(root)/layout";
import Home from "./(root)/page";
import { GetSearchParams } from "./helpers";

export default function Default({ searchParams }: { searchParams: GetSearchParams }) {
  return (
    <HomeLayout>
      <Home searchParams={searchParams} />
    </HomeLayout>
  );
}
