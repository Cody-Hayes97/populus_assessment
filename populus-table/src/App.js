import { useEffect, useState } from "react";
import "./styles.css";
import Table from "./components/Table";
import axios from "axios";

let APIUrl = "https://api.populus.ai/v1/mds/policies";
let APIKey = "066eee5632a780a7edb3fd3f5b80b610";

export default function App() {
  const [policies, setPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(APIUrl, {
        headers: {
          "X-API-KEY": APIKey
        }
      })
      .then((res) => {
        setPolicies(res.data.data.policies);
        console.log(res.data.data.policies)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      {isLoading ? " " :  <Table policies={policies} />}
    </div>
  );
}
