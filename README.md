<p align="center">
<img src="src/main/resources/static/images/byte.png" alt="projectLogo" width="200"/>
</p>

# Bytefit

This application allows a user to generate and store personalised calorie intake recommendations which are then supplemented by generated meal plans which can be exported to a PDF.

## Demonstration 

The project is also hosted on heroku using a Docker container: [Bytefit](https://bytefit.herokuapp.com/)

![Demonstration of the application](src/main/resources/static/images/bytefit.gif)

## Getting Started

### Prerequisites

* Spoonacular API Key: [Guide](https://spoonacular.com/food-api/docs#Authentication)

### Deployment Options

**Docker Deployment** vs **Java Jar Deployment**

I **recommend** to opt for the Docker deployment as the Java Deployment requires a lot of dependencies and thus has a lengthy setup, nevertheless I've included instructions for both.

#### Docker Deployment

* Ensure Docker is running on your PC: [Docker Setup](https://docs.docker.com/get-docker/)
* Navigate to "meals.js" within the project and populate the "apiKey" variable with your API key from Spoonacular. 

###### Run the following commands

1. To run a local image and container for the MySQL instance:  
    `docker run --name mysql-standalone -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=bytefit -e MYSQL_USER=root -e MYSQL_PASSWORD=password -d mysql:5.6`
2. To build the application into a container:  
    `docker build -t bytefit-mysql .` (You may have to run this multiple times if the dependency download times out.
3. To link the containers and host them on a port.  
    `docker run -d -p 8080:8080 --name bytefit-mysql --link mysql-standalone:mysql bytefit-mysql`

**Navigate to the localhost webpage and the website should be live and running.**

---
###### or 
---
#### Java Deployment 

As a prerequisite for this deployment option you <b>must</b> have the following set up on your PC before you can proceed:

* A Java IDE: [IntelliJ](https://dev.mysql.com/doc/mysql-getting-started/en/) 
* Local MySQL DB instance - [Setup guide](https://dev.mysql.com/doc/mysql-getting-started/en/) 
* Java Development Kit: [JDK11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
* Maven: [Setup guide](https://www.tutorialspoint.com/maven/maven_environment_setup.htm)


Then, in the 'application.properties' file:
 - Replace the `spring.datasource.url` value `mysql-standalone` with `localhost`
 - Populate the variable `spring.datasource.password` with your local MySQL instance password.  
 
In the 'meals.js' file within the project:
 - Populate the `apiKey` variable with your API key from Spoonacular.   

Run `mvn clean install package` using your IDE **or** from the command line at the base level of the project.

Then proceed to run the application by:  
 - Running the MealPlannerApplication class in your IDE  
**or**  
 - Run `java -jar target/bytefit-mysql.jar` from the base level of the project in the command line. 
 
**Navigate to the localhost webpage and the website should be live and running.**


## Running the tests

There are automated unit tests which will be executed upon application startup. 
The tests in place verify that the UserService class which rely upon the repositories are working as expected.
This is vital to ensuring that User accounts can be created and accessed, and thus also providing re-assurance that database is up and running.

## Built With

* [Spoonacular API](https://spoonacular.com/food-api) - Recipe API

## Future Improvements

* Develop a recipe/food database which will remove the dependency on the current API.
* Implement a more modern front-end technology for re-usability and long term application support e.g. React/Angular.

## Acknowledgments

* [Spring Boot + Spring MVC + Spring Security + MySQL guide](https://medium.com/@gustavo.ponce.ch/spring-boot-spring-mvc-spring-security-mysql-a5d8545d837d)
