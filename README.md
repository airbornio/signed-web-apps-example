# Signed Web Apps Example App

This is an example app for [Signed Web Apps][SWA].

## Installation

    git clone --recurse-submodules https://github.com/airbornio/signed-web-apps-example.git
    cd signed-web-apps-example
    npm install

## Running locally

    npm run start

## Running on Heroku

    heroku apps:create <app-name>
    heroku labs:enable runtime-dyno-metadata
    git push heroku

[SWA]: https://github.com/airbornio/signed-web-apps