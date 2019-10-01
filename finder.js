const fs = require('fs');
const axios = require('axios');
const lodash = require('lodash');

async function getDB(args) {
    let arrayOfResults = [];
    let initialResponse = await axios.get('https://rickandmortyapi.com/api/character/\n');
    const numberOfPages = initialResponse.data.info.pages;
    arrayOfResults.push(initialResponse.data.results);
    let responses = await getArrayOfResponses(numberOfPages);
    arrayOfResults = [...arrayOfResults, ...responses];
    arrayOfResults = lodash.flatten(arrayOfResults);
    const filteredResults = arrayOfResults.filter(character => {
        return characterMatchesParams(character, args);
    });
    console.log(filteredResults);
    return fs.writeFileSync('results.json', JSON.stringify(filteredResults, null, '\t'), 'utf8');
};

async function getArrayOfResponses(count) {
    let arrayOfPromises = [];
    for (let i = 2; i <= count; i++) {
        arrayOfPromises.push(axios.get(`https://rickandmortyapi.com/api/character/?page=${i}`));
    }
    let responses = await Promise.all(arrayOfPromises);
    responses.forEach((item, index) => {
        return responses[index] = item.data.results;
    });
   return lodash.flatten(responses);
};

function characterMatchesParams(characterObject, params) {
    let matchesParams = true;
    params.forEach(parameter => {
        if (characterObject[parameter[0]] !== parameter[1]) {
            matchesParams = false;
        }
    });
    return matchesParams;
};

module.exports = {
    getDB
};