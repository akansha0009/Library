import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Library from './components/Library';


const client = new ApolloClient({
  uri: "https://75183.sse.codesandbox.io/"
});

function App() {
  return (
    <ApolloProvider client={client}>
        <div className="App">
          <h1>Library Management System</h1>
          <Library />
        </div>
    </ApolloProvider>
  );
}

export default App;
