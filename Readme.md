# SpeckCheck Deployment Guide

This guide provides instructions for deploying SpeckCheck setup. The setup includes a mail server, a PostgreSQL database, a backend service, and a frontend service, all orchestrated with Docker Compose.

## Requirements

- Docker
- Docker Compose

## Services Overview

1. **Mail Server (`mail`):** Uses `maildev/maildev` for email testing.
2. **Database (`db`):** PostgreSQL database.
3. **Backend Application (`app`):** A Spring Boot-based Feedback Service.
4. **Frontend Application (`frontend`):** A React-based frontend.

## File Structure

- `docker-compose.yml`: Contains the Docker Compose configuration to run all services.
- `FeedbackService`: Directory for the Spring Boot application.
- `client`: Directory for the React frontend application.

## Configuration

- **Version:** Docker Compose file format version '3.8'.

### Services Configuration

#### Mail Server

- **Image:** `maildev/maildev`
- **Ports:**
    - `1080`: Web interface.
    - `1025`: SMTP server.
- **Network:** `app-network`

#### Database

- **Container Name:** `postgres`
- **Image:** `postgres:14.1`
- **Environment Variables:**
    - `POSTGRES_USER`: `postgres`
    - `POSTGRES_PASSWORD`: `postgres`
    - `PGDATA`: `/data/postgres`
- **Volumes:**
    - `db-data:/data/postgres`
- **Ports:**
    - `5332:5432`
- **Network:** `app-network`
- **Restart Policy:** Unless stopped.

#### Backend Application

- **Build Context:** `./FeedbackService`
- **Container Name:** `springboot_app`
- **Dependencies:** `db`, `mail`
- **Ports:**
    - `8090:8090`
- **Environment Variables:**
    - `SPRING_DATASOURCE_URL`: `jdbc:postgresql://db:5432/postgres`
    - `SPRING_DATASOURCE_USERNAME`: `postgres`
    - `SPRING_DATASOURCE_PASSWORD`: `postgres`
    - `SPRING_MAIL_HOST`: `mail`
    - `SPRING_MAIL_PORT`: `1025`
- **Network:** `app-network`
- **Restart Policy:** Unless stopped.

#### Frontend Application

- **Build Context:** `./client`
- **Build Arguments:**
    - `VITE_API_BASE_URL`: `http://localhost:8090`
- **Container Name:** `react_frontend`
- **Ports:**
    - `5173:80`
- **Network:** `app-network`
- **Restart Policy:** Unless stopped.

### Networks

- **app-network:** Uses the bridge driver.

### Volumes

- **db-data:** Persistent volume for the database.

## Deployment Steps

1. **Prepare Environment:** Ensure Docker and Docker Compose are installed on your system.
2. **Clone Repository:** Ensure you have the application code for both the backend and frontend in their respective directories.
3. **Navigate to the Project Directory:** Where your `docker-compose.yml` file is located.
4. **Build and Run Containers:** Execute the command `docker-compose up -d` to build and start all services.
5. **Access Services:**
    - **Mail Server Web Interface:** `http://localhost:1080`
    - **Application Frontend:** `http://localhost:5173`
    - **Backend API:** `http://localhost:8090`

## Troubleshooting

- Ensure all ports specified in the configuration are available.
- Check container logs for errors: `docker-compose logs <service_name>`.
- Ensure the Docker and Docker Compose versions support the file format version '3.8'.