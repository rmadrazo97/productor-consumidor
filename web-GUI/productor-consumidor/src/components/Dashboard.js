import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get(`https://productor.azurewebsites.net/prod/numero`)
            .then(res => {
                const count = res.data;
                console.log(count);
                this.setState({ count });
            })
    });
    return (
        <div className="card m-4">
            <div className="card-header lead">
                Dashboard
            </div>
            <div className="card-body">
                <h4>Numero de Productores <span className="badge badge-secondary">{count}</span></h4>
                <h4>Numero de Sockets <span className="badge badge-secondary">2</span></h4>

            </div>
        </div>
    );

}

export default Dashboard;
