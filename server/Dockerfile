# Etapa 1: Construcción del JAR
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Construir la aplicación
RUN mvn clean package -DskipTests

# Etapa 2: Imagen ligera para ejecución
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copiar el .jar generado en la etapa anterior
COPY --from=build /app/target/medium-weekly-0.0.1.jar app.jar

# Exponer el puerto de la aplicación
EXPOSE 8080

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
