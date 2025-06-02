import { useEffect, useState } from "react"
import { getAllIssues } from "../../shared/api"
import { DataProjectIssue } from "../../types/types"
import IssuesList from "./IssuesList"
import { useDispatch } from "react-redux";
import { setIssuesData } from "../../slices/slice";

const Main = () =>{
    const [data, setData] = useState<DataProjectIssue[]>();
    const dispatch = useDispatch()

    useEffect(() => {
      getAllIssues()
        .then((res) => {
            setData(res.data)
            if (res) dispatch(setIssuesData(res.data))}
        )
        .catch((err) => {
          console.error("Ошибка", err);
        });
    }, []);
  
    return <IssuesList data={data} />;
  };
export default Main