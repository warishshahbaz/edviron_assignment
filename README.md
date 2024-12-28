# School Payments Dashboard and Backend

## How to Run the Project

### Clone the Repository:

```bash
git clone <repository-url>
```

### Navigate to the Project Directory:

```bash
cd school-payments-dashboard
```

### Install Dependencies:

```bash
npm install
```

### Start the Development Server:

```bash
npm run dev # For Vite

# OR

npm start # For Create React App
```

### Open the Application:

Open the application in your browser at `http://localhost:3000`.

---

## API Details

### Endpoints Overview

#### 1. `/transactions` (GET)

- **Purpose**: Fetches all transactions.
- **Parameters**: None.
- **Response**:

```json
[
  {
    "collect_id": "12345",
    "school_id": "001",
    "gateway": "PayPal",
    "order_amount": 500.0,
    "transaction_amount": 500.0,
    "status": "Success",
    "custom_order_id": "ABC123"
  }
]
```

#### 2. `/transactions/school` (POST)

- **Purpose**: Maps `school_id` to `school_name` and retrieves transactions for the given `school_name`.
- **Parameters**:
  - `school_id` (String): The ID of the school.
  - `school_name` (String): The name of the school.
- **Payload Example**:

```json
{
  "school_id": "123",
  "school_name": "ABC School"
}
```

- **Response**:

```json
[
  {
    "collect_id": "12345",
    "school_id": "123",
    "school_name": "ABC School",
    "transaction_amount": 300.0,
    "status": "Pending"
  }
]
```

#### 3. `/check-status` (GET)

- **Purpose**: Fetches the status of a transaction based on `custom_order_id`.
- **Parameters**:
  - `custom_order_id` (String): The unique identifier of the transaction.
- **Query Example**:

```
/check-status?custom_order_id=ABC123
```

- **Response**:

```json
{
  "custom_order_id": "ABC123",
  "status": "Success"
}
```

---

## Technologies Used

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Libraries**:
  - Axios
  - React Router
  - Chart.js (Optional for visualization)
- **Backend**: Node.js (NestJS framework) with MongoDB integration

---

## Future Enhancements

- Add more granular filtering options (e.g., by gateway or order amount).
- Implement role-based authentication and authorization.
- Optimize API calls with caching mechanisms.
- Add export functionality for transaction data (e.g., CSV, Excel).
- Enhance UI with animations and transitions.

---

## Contribution Guidelines

1. Fork the repository and create a new branch for your feature or bug fix.
2. Commit changes with clear messages.
3. Submit a pull request for review.
