import { React } from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div>
            <h1>Page Not Found :/</h1>
            <h3>Try reaching the Home Page:</h3>
            <Link to="/">Home</Link>
        </div>
    );
}

export default PageNotFound;
