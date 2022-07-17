const week = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let day = new Date();

let options = {weekday: 'long'};
let this_day = day.toLocaleDateString('fr-FR', options);
console.log(this_day, day);

this_day = this_day.charAt(0).toUpperCase() + this_day.slice(1,3);
console.log(this_day);

let jour_ordre = week.slice(week.indexOf(this_day)).concat(week.slice(0, week.indexOf(this_day)));
console.log(jour_ordre);

export default jour_ordre;