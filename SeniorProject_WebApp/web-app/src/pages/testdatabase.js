import React, { useEffect, useState } from "react";
import {readStock, readSET} from "../component/database";

const Testdatabase = () => {

    const [PTT, SetPTT] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0
        }
    ]);

    const [SUSCO, SetSUSCO] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0
        }
    ]);

    const [BCP, SetBCP] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0
        }
    ]);

    const [IRPC, SetIRPC] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0
        }
    ]);

    const [TOP, SetTOP] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0
        }
    ]);

    const [SET, SetSET] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0
        }
    ]);

    useEffect(() => {
        function data(){
            readStock('PTT').then((x) => SetPTT(x));
            readStock('SUSCO').then((x) => SetSUSCO(x));
            readStock('IRPC').then((x) => SetIRPC(x));
            readStock('TOP').then((x) => SetTOP(x));
            readStock('BCP').then((x) => SetBCP(x));
            readSET().then((x) => SetSET(x));
        }
        data();
    }, []);
    
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <a>PTT : {PTT[0].open}</a><br></br>
            <a>SUSCO : {SUSCO[0].open}</a><br></br>
            <a>IRPC : {IRPC[0].open}</a><br></br>
            <a>TOP : {TOP[0].open}</a><br></br>
            <a>BCP : {BCP[0].open}</a><br></br>
            <a>SET : {SET[0].open}</a><br></br>
        </div>
    );
}

export default Testdatabase;