# Moody Melody - 24hr Hackathon project #

* 1st place at HackSurrey 2021 -> https://devpost.com/software/moodymelody

* Have you ever wondered what your favourite tracks say about you ? Or, rather, how they make you feel?
* Now you can get a pretty good idea with Moody Melody ! Simply connect your spotify and everything will be automatically analysed and displayed in a colourful menu.

## Project goals ##

Implement and connect 4 different apis to create an in depth music analytics web app.
* Spotify Api -> Users can connect to their spotify account and their favourite 20 songs will be extracted for further analysing.
* Lyrics Api -> Search for song lyrics by song artist and title.
* IBM Watson Natural Language Understanding -> Analyse any text for sentiments like joy, fear, anger, disgust and sadness.
* TasteDive Api -> Recommend other artists to try based on your current favourites. 

### Project achievements ###

* Created a minimalistic website with lots of computing happening on the server side as well as client side behind the scenes.
* Implemented all apis into thier own pages for individual use as well as a combination of all where one feeds the input to the next all the way to recommending a song.

## Runtime Process ##
* Once the spotify account is linked, the favourite 20 songs are passed into the lyrics api
* The lyrics api tries to find each song by title and artist and then passes the lyrics to the Sentiment analyisis api
* The Sentiment analysis api analyses each song and returns a very insightful graph showing a percentage of each analysed sentiment.
* The Taste Dive api takes in your favourite artists and then recommends a long list of artists you might enjoy.

