import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Sistemas Operativos</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://github.com/rmadrazo97/productor-consumidor">Github</a>
                    </li>
                </ul>
                <span class="navbar-text">
                    Universidad Francisco Marroquín
    </span>
            </div>
        </nav>
    );
}

export default Navbar;
