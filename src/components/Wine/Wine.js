import React, { useEffect } from 'react';
import * as d3 from "d3";
import * as data from './wineData.json';
import { orderCountries, getCountries } from './examples/dataFunctions';
import { bubbleGenerator } from './examples/bubble';
import { forceBubbles } from './examples/forceBubbles';
import { barAnimation } from './examples/barAnimation';
import {scaleTime} from './examples/scaleTime';
import { formatPrefix } from 'd3';

const Wine = () => {

    useEffect(() => {
        let dataset = orderCountries(data.default);
        bubbleGenerator(dataset)
        forceBubbles(dataset);
        barAnimation(dataset)
        scaleTime();        
    })

    return (<div id='wine'></div>)
}

export default Wine;