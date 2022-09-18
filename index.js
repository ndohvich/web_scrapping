//Installation des librairies nécessaires
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

//Fonction qui permet de recupérer toutes les informations du site coinmarketcap.com
async function getPriceFeed(){
    try{
        const siteUrl = 'https://coinmarketcap.com/'

        const { data } = await axios({
            method: "GET",
            url: siteUrl,
        })

        const $ = cheerio.load(data);
        const elemSelector = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr';
          
        const keys = [
            'rank',
            'name',
            'price',
            '24h',
            '7h',
            'marketCap',
            'volume',
            'circulatingSupply'
        ]

        $(elemSelector).each((parentIdx, parentElem) => {
            if(parentIdx <= 9){
                $(parentElem).children().each((childIdx, childElem) => {
                    const tdValue = $(childElem).text();
                    
                    if(tdValue){
                        console.log(keys[childIdx]);
                    }
                })
            }
        });
    } catch(err){
        console.error(err)
    }
}

//Execution de la fonction
getPriceFeed();