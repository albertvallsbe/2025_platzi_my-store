# Manual d’ús de Docker amb Postgres i pgAdmin a Windows (WSL + Bash)

Aquest manual descriu les instruccions essencials per crear, executar i administrar contenidors de **Postgres** i **pgAdmin** fent servir **Docker Compose** des de la terminal de **WSL/Bash** en una màquina Windows.

---

## 1. Crear el fitxer `docker-compose.yml`

En un directori buit del teu projecte, crea el fitxer `docker-compose.yml` amb el contingut següent:

```yaml
services:
  postgres:
    image: postgres:17
    environment:
      POSTGRES_DB: my_store
      POSTGRES_USER: albert
      POSTGRES_PASSWORD: 0110
    ports:
      - "5433:5432"               # Port extern 5433 a Windows → port intern 5432 al contenidor
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U albert -d my_store"]
      interval: 10s
      timeout: 5s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: avalls89@gmail.com
      PGADMIN_DEFAULT_PASSWORD: 0110
    ports:
      - "5050:80"
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

volumes:
  pgdata:

``` 

## 2. Crear, arrencar i eliminar els contenidors

Per arrencar **Postgres** i **pgAdmin** en segon pla:

```bash
docker compose up -d

Comprovar l’estat dels contenidors:
