import React, { useState} from "react";
import useDataApi from "../services/dataApi";
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';

function ReleasesList(){
    const [query, setQuery] = useState('oasis');
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
        query,
        { releases: [] },
    );
    const handleSubmit = (event) => {
        doFetch(
            query,
        );

        event.preventDefault();

    }
    return (
        <>
            <Form
                onSubmit={handleSubmit}
            >
                <Form.Group as={Row} className='ml-3'>
                    <Col sm={4}>
                        <Form.Label>Search the artist name</Form.Label>
                        <FormControl
                            sm={4}
                            type="text"
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                        />
                        <Button type="submit" className='mt-2'>Search</Button>

                    </Col>

                </Form.Group>

            </Form>

            {isError && <div>Something went wrong ...</div>}

            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <ul>
                    {data?.releases.map(item => (
                        <li key={item.id}>
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}
            </>
    )
}
export default ReleasesList;