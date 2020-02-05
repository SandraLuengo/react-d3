import React, { useEffect } from 'react';
import * as d3 from "d3";
import * as data from './wineData.json';
import { orderCountries, getCountries } from './dataFunctions';
import { bubbleGenerator } from './bubble';
import { forceBubbles } from './forceBubbles';
import {barAnimation} from './barAnimation';

const Wine = () => {

    useEffect(() => {

        let dataset = orderCountries(data.default);
        //let dataset = data.default;
        //let countries = getCountries(data.default);
        //bubbleGenerator(dataset)
        //forceBubbles(dataset);
        barAnimation(dataset)
    })

    return (<div id='wine'></div>)
}

export default Wine;