import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ViewDetailsPage.css'

const ViewDetailsPage = () => {
    const detailID = useParams().id;
    const [detail, setDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let didCancel = false;
        axios({
            method: `GET`,
            url: `https://jsonplaceholder.typicode.com/posts/${detailID}`
        })
            .then(response => {
                console.log("response ", response.data.id);
                if (!didCancel) {
                    setDetail(response.data);
                    setIsLoading(false);
                }
            })
        return () => {
            didCancel = true;
        }
    }, []);

    if (isLoading) return (
        <div>Loading</div>
    );


    return (
        <div >
            <h3 style={{ margin: '3%', fontWeight: 'bold' }}>Detail</h3>
            <h4 className="view_Detail">ID : {detail.id}</h4>
            <h4 className="view_Detail">Title : {detail.title}</h4>
            <h4 className="view_Detail">Body : {detail.body}</h4>
        </div>
    )
}
export default ViewDetailsPage;