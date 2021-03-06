# Sphere-Engine-App
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/fo-real.svg)](https://forthebadge.com)

***



***


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#dependencies">Dependencies</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#how-to-use">How To Use</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

SphereEngine is a web application built with Sphere Engine Problems API to create programming questions, add test cases and compile and run them to check our solutions. Its a great place to hone programming skills like any CP site and easy to use for problem setters and programmers.

### Built With

* [Node.js](https://nodejs.org/en/)
* [Prism.js](https://prismjs.com/)
* [Express.js](https://expressjs.com)
* [MongoDB](https://www.mongodb.com/cloud)
* [Sphere Engine API](https://sphere-engine.com/)
* [JWT](https://jwt.io/)
* [EJS](https://ejs.co/)

<!-- GETTING STARTED -->
# Getting Started

## Video Demonstration:
[![forthebadge](https://img.shields.io/badge/click-link-lightgrey)](https://forthebadge.com)
  
[[Sphere Engine App Demo]](https://www.youtube.com/watch?v=iSFtgaY4nE4)


***

### Deployment:

[![forthebadge](https://img.shields.io/badge/click-link-lightgrey)](https://forthebadge.com)
  
Deployed using [Heroku](https://sphereengine.herokuapp.com/) 

***

### Dependencies:

* Node-
  Go to [official Node.js website](https://nodejs.org/) and download the installer.
  
* Sphere API key-
  Go to [Sphere Engine Platform](https://sphere-engine.com/) to get your free API key.
  
* MongoDB url-
  Visit [MongoDB](https://www.mongodb.com/) 
  
* Browser Version-Latest  
 
* npm
  ```sh
  npm install npm@latest -g
  ```


### Installation

    $ git clone https://github.com/hotaanubhab/Sphere-Engine-App.git
    $ cd Sphere-Engine-App
    $ npm install
    

<!-- USAGE EXAMPLES -->
## Running

    nodemon
     //or
    node app.js
  
  ***
    After getting the API Keys and endpoints please specify the following in a .env file in the root directory.
    MONGO_URI = "" // Mongo cluster URI
    PROBLEMS_API = "" // Endpoint from Sphere Engine Dashboard
    ACCESS_TOKEN = "" // Acess token from Sphere Engine Dashboard
    SECRET = "" // A string used to sign the JWT for verification , it can be any string but shouldn't be shared outside organization to prevent unauthorized access.
  
## How To Use
  
  The landing page consists of 4 main parts- 'Solve'  , 'Admin' , 'Add' and 'Login':
  On the solve page participants cant select the problem they want to solve.
  
  
  <p align='center'><img src=screenshots\1.PNG>
<p align="center">

  

  On the submit page of every question there is supprt for all the compilers by Sphere Engine API and the participant can submit his solution in prgramming language of choice.
  
  <p align='center'><img src=screenshots\6.PNG>
<p align="center">
  
  Admin login is for protected routes like Add or Admin Panel for editing and deleting problems.This is done using JWT. For testing on Heroku server one can use Username : admin , Password : admin as a credential.
  
  <p align='center'><img src=screenshots\2.PNG>
<p align="center">
  
  Admin Panel
  <p align='center'><img src=screenshots\3.PNG>
<p align="center">
Edit Page of a Problem. After edit press update or use this page to go to add test case of that problem , or delete problem.
  <p align='center'><img src=screenshots\4.PNG>
<p align="center">
Page used to add input output test cases for the problem.
  <p align='center'><img src=screenshots\5.PNG>
<p align="center">
  
  
  ***
  
<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Sphere Engine API](https://sphere-engine.com/)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

