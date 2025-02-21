export function Users() {
  const users = localStorage.getItem("storage-user");

  const usersParsed = JSON.parse(users);

  return (
    <div>
      {" "}
      <pre>{JSON.stringify(usersParsed, null, 2)}</pre>
    </div>
  );
}
