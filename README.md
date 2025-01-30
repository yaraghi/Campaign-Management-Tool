# 🚀 Campaign-Management-Tool

A web application for **managing advertising campaigns**, allowing advertisers to **create, manage, and search** their campaigns efficiently.

## 📝 Features
- ✅ **User Registration & Authentication** (via `Laravel Sanctum`)
- ✅ **Create & Manage Campaigns**
- ✅ **Activate/Deactivate Campaigns**
- ✅ **List and Search Campaigns**
- ✅ **Manage Payouts by Country**
- ✅ **MySQL Database Integration**
- ✅ **Fully Tested API (`PHPUnit 12`)**

---

## ⚡ 1. Installation & Setup for backend

### 📌 1.1 Clone the Repository
```sh
git clone git@github.com:yaraghi/Campaign-Management-Tool.git
cd Campaign-Management-Tool/backend
```

### 📌 1.2 Install Dependencies
```sh
composer install
```

### 📌 1.3 Configure `.env` File
```sh
cp .env.example .env
```
Make sure to set up your **database credentials** in the `.env` file.

---

## 🗄 2. Database Setup

### 📌 2.1 Run Migrations and Seeders
```sh
php artisan migrate:fresh --seed
```
This command **resets the database**, runs migrations, and seeds initial data.

---

## 🚀 3. Run the Application
```sh
php artisan serve
```
The app will be available at **`http://127.0.0.1:8000`**.

---

## 🔑 4. Authentication (User Registration & Login)

### 📌 4.1 Register (`POST /api/register`)
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password",
    "password_confirmation": "password"
}
```
📌 **Response:**
```json
{
    "message": "User registered successfully",
    "user": { ... },
    "token": "YOUR_ACCESS_TOKEN"
}
```

### 📌 4.2 Login (`POST /api/login`)
```json
{
    "email": "john@example.com",
    "password": "password"
}
```
📌 **Response:**
```json
{
    "message": "Login successful",
    "user": { ... },
    "token": "YOUR_ACCESS_TOKEN"
}
```

### 📌 4.3 Logout (`POST /api/logout`)
📌 Requires `Authorization` header:
```sh
Authorization: Bearer YOUR_ACCESS_TOKEN
```
📌 **Response:**
```json
{
    "message": "Logged out"
}
```

---

## 📢 5. Campaign Management

### 📌 5.1 Get List of Campaigns (`GET /api/campaigns`)
📌 **Request Example:**
```sh
Authorization: Bearer YOUR_ACCESS_TOKEN
GET /api/campaigns?title=example&status=active
```
📌 **Response:**
```json
[
    {
        "id": 1,
        "title": "Campaign 1",
        "landing_page_url": "https://example.com",
        "activity_status": "active",
        "payouts": [
            {
                "country": { "name": "Estonia", "code": "EE" },
                "amount": 3.00
            }
        ]
    }
]
```

### 📌 5.2 Create a Campaign (`POST /api/campaigns`)
📌 **Request Example:**
```json
{
    "title": "New Campaign",
    "landing_page_url": "https://example.com",
    "activity_status": "active",
    "payouts": [
        { "country_id": 1, "amount": 2.5 },
        { "country_id": 2, "amount": 3.0 }
    ]
}
```
📌 **Response:**
```json
{
    "message": "Campaign created successfully.",
    "campaign": { ... }
}
```

### 📌 5.3 Get Campaign Details (`GET /api/campaigns/{id}`)
```sh
GET /api/campaigns/1
Authorization: Bearer YOUR_ACCESS_TOKEN
```
📌 **Response:**
```json
{
    "id": 1,
    "title": "Campaign 1",
    "landing_page_url": "https://example.com",
    "activity_status": "active",
    "payouts": [
        { "country_id": 1, "amount": 2.5 }
    ]
}
```

### 📌 5.4 Update Campaign Status (`PATCH /api/campaigns/{id}/status`)
```json
{
    "activity_status": "paused"
}
```
📌 **Response:**
```json
{
    "message": "Campaign status updated successfully.",
    "campaign": { ... }
}
```

---

## 🌍 6. Get List of Countries (`GET /api/countries`)
```sh
GET /api/countries
Authorization: Bearer YOUR_ACCESS_TOKEN
```
📌 **Response:**
```json
[
    { "id": 1, "name": "Estonia", "code": "EE" },
    { "id": 2, "name": "Spain", "code": "ES" },
    { "id": 3, "name": "Bulgaria", "code": "BG" }
]
```

---

## 🛠 7. Running Tests
📌 **Run all tests:**
```sh
php artisan test
```
✅ All tests should pass! 🚀

---

## 📌 8. API Routes
| Method  | Endpoint | Description |
|---------|---------|-------------|
| `POST`  | `/api/register` | User registration |
| `POST`  | `/api/login` | User login |
| `POST`  | `/api/logout` | User logout (requires token) |
| `GET`   | `/api/campaigns` | Fetch all campaigns |
| `POST`  | `/api/campaigns` | Create a new campaign |
| `GET`   | `/api/campaigns/{id}` | Get campaign details |
| `PATCH` | `/api/campaigns/{id}/status` | Update campaign status |
| `GET`   | `/api/countries` | Fetch available countries |

---

## 👨‍💻 Technologies Used
- **Backend:** Laravel 10
- **Authentication:** Laravel Sanctum
- **Database:** MySQL
- **Testing:** PHPUnit 12
- **API Handling:** Laravel API Resource


# ⚡ Campaign Management Tool - Frontend

## 📌 1. Installation & Setup

### 1.1 Clone the Repository
```sh
git clone git@github.com:yaraghi/Campaign-Management-Tool.git
cd Campaign-Management-Tool/frontend
```

### 1.2 Install Dependencies
```sh
npm install
```

### 1.3 Environment Configuration
Create a `.env` file in the `frontend` directory and configure the API URL:
```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### 1.4 Run the Application
```sh
npm run dev
```
This will start the frontend on `http://localhost:3000/`.


## 💡 Final Notes
✅ **All features are implemented as requested.**  
✅ **The API is secure, tested, and ready for production.**  
✅ **Authentication is handled via `Laravel Sanctum`.**  
🚀 **This project is ready for deployment! 🔥**

