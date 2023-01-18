# Food4U - ruuantilauspalvelu
Web-sovellusprojektissa oli tehtävänä tehdä ja suunnitella ruuantilaussovellus. Asiakas luo tilin, jonka kautta hän voi tilata erilaisia herkullisia aterioita paikallisista suosikkiravintoloistaan. Ravintoloitsija voi luoda ravintoloita ja niihin erilaisia ruokalistoja. Ruokatilauksista jää tiedot ravintoloitsijan ja asiakkaan tilaushistoriaan. Sovellus toteutettiin Reactilla ja Node.js:ää käyttäen. Valmis sovellus toimii Heroku-palvelussa. 

## Tekijät
Ryhmä 4 Food4U-sovelluksen tekivät Antti Roos, Sampo Vuorento, Juha-Matti Litendahl ja Janne Ahonen. Kukin ryhmän jäsen toteutti sovelluksen osan fullstack-ohjelmoijina. Kaikki ohjelmoivat sovelluksen osan toimimaan frontend- ja backend-puolella. 

## Projektin kulku
Projektin aloitus oli 14.3.2022 ja päättymispäivämäärä 18.4.2022. Pidimme päivittäin palavereja, joissa kävimme läpi projektin etenemistä ja ryhmäläisten kohtaamia haasteita sekä ongelmia. Palavereissa myös ruodittiin ongelmia ja ongelmien ratkaisuja. Ongelmiin, joita emme itse osanneet ratkaista, pyysimme apua projektia ohjaavalta opettajalta.

## Sovelluksen toiminnankuvaus
•	Sovelluksella voi selata ravintoloita ja ruokalistoja (KUVA 1). Käyttäjä voi luoda asiakastilin tai ravintolan omistajan tilin.
•	Sovellukseen voi kirjautua asiakkaana tai ravintolan omistajana, jolloin sovelluksen tarjoamat toiminteet muuttuvat sen mukaan oletko asiakastilillä vai ravintolan    omistajan tilillä.
•	Ravintolan omistajana voit luoda uuden ravintolan ja ruokalistoja. 
•	Asiakkaana on mahdollista selata ravintoloita, ruokalistoja, muokata ostoskoria, selata tilaushistoriaa ja tilata ruokaa.

![Alotusnäkymä](/Aloitusnäkymä_projekti.jpg)

 KUVA 1. Sovelluksen ravintolanäkymä

## Sovelluksen toteutus 
Web-sovellus toteutettiin Reactia ja Node.js:ää käyttäen. Sovelluksen kehitysvaiheessa käytimme versiohallinnan tukena GitHubia. Valmis sovellus toimi Heroku-palvelussa: https://group-4-food4u.herokuapp.com/ .


## Sovelluksen käyttöönotto
Sovellus vaatii tietokannan taustalle toimiakseen kunnolla. Alla (KUVA 2) kuvassa näkyy käytetyn tietokannan rakenne.
Halutessasi voit kloonata repositorion omalle koneelle Gitillä.  Käyttäen Gitissä käskyä: git clone https://github.com/TVT21KMO-Group-IV/Legendary-IN00CT06-3001.git.

•	Käynnistä yhteys tietokantaan.
•	Avaa Visual Studio Code:lla kansio Legendary-IN00CT06-3001.
•	Avaa Visual Studio Code:ssa kaksi terminaalia. Backendille ja frontendille oma terminaali.
•	Backend täytyy käynnistää ensin.
•	Backendin käynnistys seuraavilla skripteillä: cd backend, cd src, npm install (tarpeellinen vain sovelluksen ensimmäisellä käynnistyskerralla), node routes.js.
  Jos backend käynnistyi oikein Visual Studio Code:n terminaaliin tulee viesti: check http://localhost:5000/register to see the data. 

•	Seuraavaksi käynnistetään frontend.
•	Siirry frontendin terminaaliin a syötä seuraavat skriptit: cd frontend, cd src npm install (tarpeellinen vain sovelluksen ensimmäisellä käynnistyskerralla), npm      start.
•	Jos sovellus käynnistyy oikein terminaaliin tulee teksti: react-scripts start.

 
![kantanäkymä](/Tietokanta.jpg)

 KUVA 2. Sovelluksen taustalla käytettävän tietokannan rakenne

