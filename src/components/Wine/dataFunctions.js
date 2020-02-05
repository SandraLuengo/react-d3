import * as _ from 'lodash';
const orderCountries = data => {
    let orderData = _.orderBy(data, ["country", "points"], ['asc', 'desc']);
    let actualCountry = orderData[0].country;
    let countryList = { "children": [] };
    let points = [];
    orderData.map(data => {
        if (data.country === actualCountry) {
            points.push(parseInt(data.points))
        } else {
            points.length > 0 && countryList["children"].push({ "Name": actualCountry, "Count": countryAverage(points) })
            actualCountry = data.country;
            points = [];
        }
    });
    return countryList;
}

const countryAverage = countryPoints => Math.round(countryPoints.reduce((sum, point) => sum + point, 0) / parseInt(countryPoints.length));

const getCountries = dataCountries => {
    let countryNames = [];
    dataCountries.map(country => {
        !countryNames.includes(country.country) && country.country!==null && countryNames.push(country.country)
    })
    return countryNames;
   
}
export { orderCountries, countryAverage, getCountries }