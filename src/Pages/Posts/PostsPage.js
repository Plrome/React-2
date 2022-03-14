import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostsPage.css";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useParams,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col, Table, FormControl } from 'react-bootstrap';


const PostsPage = () => {
    const [titles, setTitle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortByTitle, setSortByTitle] = useState('NONE');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        let didCancel = false;
        axios({
            method: `GET`,
            url: `https://jsonplaceholder.typicode.com/posts`
        })
            .then(response => {
                if (!didCancel) {
                    setTitle(response.data);
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
    const titleFiltered = titles.filter(title => title.title.toLowerCase().includes(searchText.toLowerCase()));
    const getTitleSorted = () => {
        if (sortByTitle === 'NONE') return titleFiltered;
        if (sortByTitle === 'ASC') return titleFiltered.sort((title1, title2) => {
            if (title1.title.toLowerCase() < title2.title.toLowerCase()) return -1;
            if (title1.title.toLowerCase() > title2.title.toLowerCase()) return 1;
            return 0;
        });
        if (sortByTitle === 'DES') return titleFiltered.sort((title1, title2) => {
            if (title1.title.toLowerCase() < title2.title.toLowerCase()) return 1;
            if (title1.title.toLowerCase() > title2.title.toLowerCase()) return -1;
            return 0;
        });
    };

    const titleSorted = getTitleSorted();
    const handleChangeSortByTitle = () => {
        if (sortByTitle === 'NONE') {
            setSortByTitle('ASC');
            return;
        }
        if (sortByTitle === 'ASC') {
            setSortByTitle('DES');
            return;
        }
        if (sortByTitle === 'DES') {
            setSortByTitle('NONE');
            return;
        }
    };
    const handleRemove = (id) => {
        setTitle(titles.filter(item => item.id !== id));
    }


    return (
        <div>
            <div>
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        aria-label="Search"
                        className="title_search_input"
                        placeholder="Search for title "
                        value={searchText}
                        onChange={(evt) => setSearchText(evt.target.value)}
                    />
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th onClick={handleChangeSortByTitle}>Title - Sort ({sortByTitle})</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {titleSorted.map(title => (
                            <tr key={title.id}>
                                <td>{title.id}</td>
                                <td>
                                    <a >{title.title}</a>
                                </td>
                                <td>
                                    <Link to={`/posts/${title.id}`} style={{ color: 'black' }}>View Detail</Link>
                                    <Button variant="danger" className="btn_Remove" onClick={() => handleRemove(title.id)}>Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>


            </div>
        </div>
    )
}
export default PostsPage;