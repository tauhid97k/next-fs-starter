import { client } from "@/rpc/users";
import { UsersTable } from "./table";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string }>;
}) => {
  const { page, limit } = await searchParams;

  const response = await client.index.$get({
    query: {
      page,
      limit,
    },
  });
  const users = await response.json();

  return <UsersTable data={users} />;
};

export default UsersPage;
