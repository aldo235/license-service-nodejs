
# Node.js License Service (DDD & CQRS Architecture)

The License Service provides an interface for managing licenses in an application. It generates and verifies license keys associated with devices based on a master key and additional metadata, using HMAC-based encryption for security.

## Features

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js
- **ESLint**: Linting JavaScript code for consistency and avoiding errors
- **Prettier**: Code formatter for maintaining code style
- **dotenv**: Loads environment variables from a `.env` file
- **Morgan**: HTTP request logger middleware for Node.js
- **Helmet**: Helps secure Express apps by setting various HTTP headers
- **CORS**: Cross-Origin Resource Sharing middleware
- **JWT**: Authentication Method with Json Web Token
- **MongoDB**: Database MongoDB for storing data
- **Docker**: Docker for containerized

- **Master Key Generation**: Generates a master key with a specified lifetime and associated metadata.
- **License Key Generation**: Generates device-specific license keys tied to a master key with expiration dates and device quotas.
- **License Verification**: Verifies the validity of a license key based on provided inputs.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone git@github.com:aldo235/license-service-nodejs.git
   cd license-service-nodejs
   ```
2. **Install dependencies:**
    ```bash
    npm install
        # or
    yarn install
    ```
3. **Set up environment variables:**
    - Create a .env file in the root of the project.
    - Add the following variables:
    ```bash
    PORT=
    BASIC_AUTH_USERNAME=
    BASIC_AUTH_PASSWORD=
    JWT_SECRET=
    JWT_ISSUER=
    MONGODB_URL=
    LICENSE_SECRET=
    ```
4. **Run the application:**
    ```bash
    # DEV
    npm run start dev
    yarn start dev

    #PROD
    npm run start
    yarn start
    ```

## Docker
1. **Build Docker:**
    ```bash
    docker build -t licenseservice:latest . 
    ```
2. **Set up environment variables:**
    - Create a .env file in the root of the project.
    - Add the following variables:
    ```bash
    PORT=
    BASIC_AUTH_USERNAME=
    BASIC_AUTH_PASSWORD=
    JWT_SECRET=
    JWT_ISSUER=
    LICENSE_SECRET=
    ```
3. **Run Docker:**
    ```bash
    docker run --env-file __LOCATION_ENV__ --name licenseservice -d --publish 8080:8080 licenseservice:latest
    ``