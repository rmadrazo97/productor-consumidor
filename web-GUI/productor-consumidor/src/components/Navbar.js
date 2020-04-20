import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <div className="App">
            <ul>
                <li><a class="active" id="home" href="#home">Inicio</a></li>
                <li><a href="https://github.com/rmadrazo97/productor-consumidor">GitHub</a></li>
                <li><p>Productor Consumidor - Sistemas Operativos @ UFM 2020</p></li>
            </ul>
        </div>
    );
}

export default Navbar;
