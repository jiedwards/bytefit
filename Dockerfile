FROM openjdk:11
ADD target/bytefit-mysql.jar bytefit-mysql.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "bytefit-mysql.jar"]