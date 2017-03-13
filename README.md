# rpi-dashboard

This is a small project that consists on an Express Node.js application that serves a REST API with the system and OS information of a machine. Primarily, this project is targetted to be used on a Raspberry Pi, although, it can be also deployed on a Windows or Mac OSX.

## Install
```
npm install
```

## Run
```
node api.js
```
The application can be consumed on the http://localhost:3000 or http://yourmachineip:3000 .
There's the need to have a MongoDB database locally in order to use the **/api/dashboard** methods.
The database can be configured on the **api.js** file:
```
mongoose.connect('mongodb://localhost/rpi-dashboard');
```

## Dependencies
Node.js

## Usage
Use **/api/(method)** to fetch the data from the API (JSON only support).

### System Methods (GET)
* **/api/system** - retrieves the OS and the hardware information;
* **/api/cpu** - retrieves the CPU information and the current load;
* **/api/ram** - retrieves the RAM information and current usage;
* **/api/drives** - retrieves information about the main hard drive (support for multiple drives can be addressed in the future);
* **/api/service/SERVICE_NAME** - retrieves information about a process/service currently running on the machine;

### Dashboard Methods (wired with a Mongo database)
* GET **/api/dashboard/service** - gets the list of services stored;
* POST **/api/dashboard/service** - stores a new service to monitor;
* PUT **/api/dashboard/service** - updates a service;
* DELETE **/api/dashboard/service** - deletes a service;
