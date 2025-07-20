# Kanggo Backend Service

## Features

### Authentication
- Customer registration (public endpoint)
- Login with JWT token (supports email/cellphone)
- Role-based access control (customer & admin)

### Worker Management
- List available handymen (public endpoint)
- Admin CRUD operations for handymen (protected)
- Price calculation per day

### Order Management
- Create new orders with multiple handymen
- Automatic price calculation based on duration
- Schedule conflict detection
- Order status management (paid, active, completed, cancel)
- Customer-specific order listing

### Cron Jobs (On going)
- Daily status updates:
  - 7:00 WIB: Update eligible orders to "active"
  - 17:00 WIB: Update eligible orders to "completed"

## API Documentation

### Authentication
| Endpoint       | Method | Description                  | Auth Required |
|----------------|--------|------------------------------|---------------|
| `/api/v1/register` | POST   | Register new customer        | No            |
| `/api/v1/login`    | POST   | Login (JWT token generation) | No            |

### Worker
| Endpoint                 | Method | Description                          | Auth Required |
|--------------------------|--------|--------------------------------------|---------------|
| `/api/v1/workers`        | GET    | List all available handymen         | No            |
| `/api/v1/admin/workers`  | POST   | Create new handyman (Admin only)     | Yes (Admin)   |
| `/api/v1/admin/workers/:id` | PUT    | Update handyman (Admin only)        | Yes (Admin)   |
| `/api/v1/admin/workers/:id` | DELETE | Delete handyman (Admin only)        | Yes (Admin)   |

### Orders
| Endpoint                 | Method | Description                          | Auth Required |
|--------------------------|--------|--------------------------------------|---------------|
| `/api/v1/orders`         | POST   | Create new order                    | Yes (Customer)|
| `/api/v1/orders`         | GET    | List user's orders                  | Yes (Customer)|
| `/api/v1/cancel_order/:order_id` | PUT | Cancel order              | Yes (Customer)|

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (with Knex.js)
- **Authentication**: JWT
- **Testing**: Jest (unit tests)
- **Containerization**: Docker
- **API Documentation**: OpenAPI/Swagger (optional)

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Yarn or npm
- TypeScript (v4 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/libranhadi/kanggo-be-test.git
   cd kanggo-be-test
   ```
2. Install dependencies
   ```bash
        npm install
    ```

3. Set up environment variables:
Create a .env file in the root directory with the following variables:
 ```bash
    DB_NAME=sample
    DB_USER=sample
    DB_PASSWORD=sample
    DB_HOST=sample
    JWT_SECRET=sample
    PORT=3000
 ```

4. Database setup:
    ```bash
    npm run migrate
    npm run seed
    ```

5. Start The server:
```bash
   npm run dev
```