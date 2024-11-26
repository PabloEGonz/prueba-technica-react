import "./App.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Test />
    </QueryClientProvider>
  );
}

export default App;

const Test = () => {
  const param = "canada";
  const { data } = useQuery({
    queryKey: ["companias"],
    queryFn: () =>
      fetch(
        `https://core-financiero-backend.onrender.com/test/test?country=${encodeURIComponent(
          param
        )}`
      ).then((res) => res.json()),
  });
  console.log(data);
  return <div>testing</div>;
};
