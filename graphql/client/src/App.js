import { gql, useQuery } from "@apollo/client";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(query);
  console.log(error);
  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <h1>GraphQL</h1>
      <table>
        <tbody>
          {data?.getTodos?.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo?.user?.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
