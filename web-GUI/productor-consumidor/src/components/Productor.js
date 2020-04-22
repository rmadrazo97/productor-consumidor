import React from 'react';

function Productor() {
    return (
        <div className="card m-4">
            <div className="card-header lead">
                Productor # 1
            </div>
            <div className="card-body">
                <h5 className="card-title">Datos del productor</h5>
                <div className="row">
                    <div className="col text-center" style={{ fontSize: "20px" }}>
                        <span class="badge badge-pill badge-success m-1">Activo</span>
                        <span class="badge badge-pill badge-danger m-1">Trabajando</span>
                        <span class="badge badge-pill badge-warning m-1">Pausado</span>

                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col text-center" style={{ fontSize: "15px" }}>
                        <a href="#" className="btn btn-info m-2">Iniciar Productor</a>
                        <a href="#" className="btn btn-danger m-2">Parar Productor</a>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Productor;
