import jour_ordre from "./utilitaire/gestionTemps.js";

const api_key = "da34bb25fe951855bdb489054b51387b";
let result_api;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const  heure = document.querySelectorAll('.heure_nom_prevision');
const tempPourHeure = document.querySelectorAll('.heure_prevision_valeur');
const jourDiv = document.querySelectorAll(".jour_prevision_nom");
const temps_jour = document.querySelectorAll(".jour_prevision_temps");
const image_icone = document.querySelector(".logo_meteo");
const chargement = document.querySelector('.icone_chargement');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);

        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        AppelAPI(longitude, latitude);

    }, () =>
        alert("L'application ne peut fonctionner car vous n'avez pas permi la localisation de votre appareil. ")
    )
}

function AppelAPI(longitude, latitude) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&lang=fr&units=metric&appid=${api_key}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);
        result_api = data;

        temps.innerText = result_api.current.weather[0].description;
        temperature.innerText = `${Math.trunc(result_api.current.temp)}°`
        localisation.innerText = result_api.timezone;

        // recuperation, affichage et incrementation de 3 de l'heure

        let heureActuelle = new Date().getHours();

        for(let i=0; i < heure.length; i++) {
            let heureIncr = heureActuelle + i * 3;

            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            }
            else if(heureIncr === 24) {
                heure[i].innerText = `00 h`
            }
            else {
                heure[i].innerText =`${heureIncr} h`;
            }
        }

        //division du tempsvpar 3h

        for(let j=0; j<tempPourHeure.length;j++) {
            tempPourHeure[j].innerText = `${Math.trunc(result_api.hourly[j * 3].temp)}°`;
        }

        //affiche des jours 

        for(let j=0; j<jour_ordre.length; j++) {
            jourDiv[j].innerText = jour_ordre[j].slice(0,3);
        }

        //temperature par jours

        for(let i=0; i<7;i++) {
            temps_jour[i].innerText = `${Math.trunc(result_api.daily[i + 1].temp.day)}°`
        }

        //icone dynamique

        if(heureActuelle>=6 && heureActuelle<20) {
            image_icone.src = `ressources/jour/${result_api.current.weather[0].icon}.svg`;
        }
        else {
            image_icone.src = `ressources/nuit/${result_api.current.weather[0].icon}.svg`;
        }

        chargement.classList.add('disparition');
    })
}