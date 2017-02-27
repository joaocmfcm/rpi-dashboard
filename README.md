# rpi-dashboard

This small project that consists on an Express Node.js application that serves a REST API with the system and OS information of a machine. Primarily, this project is targetted to be used on a Paspberry Pi. Although, it can be also deployed on a Windows or Mac OSx.

## Install
```
npm install
```

## Run
```
node api.js
```
The application can be consumed on the http://localhost:3000 or http://yourmachineip:3000 .

## Dependencies
Node.js

## Usage
Use **/api/(method)** to fetch the data from the API (JSON only support).

### Methods
* **/api/system** - retrieves the OS and the hardware information;
