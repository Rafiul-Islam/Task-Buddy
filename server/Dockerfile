# Use an official maven image to build the spring boot application
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and build the dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the application and build the jar
COPY src ./src
RUN mvn clean package -DskipTests

# Use an official OpenJDK runtime as a parent image
FROM openjdk:26-ea-oraclelinux9

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file into the container
COPY target/taskbuddy.jar /app/taskbuddy.jar

# Expose the port the application runs on
EXPOSE 8081

# Run the application when the container launches
CMD ["java", "-jar", "taskbuddy.jar"]