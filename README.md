# LeetCode Clone - Full Stack Coding Platform

A comprehensive coding platform built with modern web technologies, featuring problem solving, code execution, AI assistance, and video tutorials.

## 🚀 Features

### Core Features
- **User Authentication & Authorization** - JWT-based auth with role-based access (User/Admin)
- **Problem Management** - CRUD operations for coding problems with multiple difficulty levels
- **Code Editor** - Monaco Editor with syntax highlighting for C++, Java, and JavaScript
- **Real-time Code Execution** - Run and test code against visible test cases
- **Code Submission & Evaluation** - Submit solutions and get evaluated against hidden test cases
- **Submission History** - Track all submissions with detailed results
- **AI-Powered Doubt Resolution** - Chat with AI for hints and explanations
- **Video Tutorials** - Upload and stream solution videos
- **Admin Panel** - Complete admin interface for content management

### Advanced Features
- **Multi-language Support** - C++, Java, JavaScript
- **Test Case Management** - Visible and hidden test cases
- **Performance Metrics** - Runtime and memory usage tracking
- **Video Streaming** - Cloudinary-powered video hosting
- **Redis Caching** - Token blacklisting and session management
- **Responsive Design** - Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Monaco Editor** - VS Code-like code editor
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS components
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Redis** - In-memory data store for caching
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Cloudinary** - Media management and CDN
- **Judge0 API** - Code execution engine
- **Google Gemini AI** - AI-powered assistance
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing
- **Validator** - Data validation utilities

### External Services
- **Judge0 CE** - Code compilation and execution
- **Cloudinary** - Video/image hosting and processing
- **Google Gemini AI** - Natural language processing
- **Redis Cloud** - Managed Redis hosting
- **MongoDB Atlas** - Cloud MongoDB hosting

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/          # Database and environment configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Authentication and authorization
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── index.js         # Server entry point
│   ├── .env.example         # Environment variables template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store configuration
│   │   ├── utils/           # Utility functions
│   │   ├── authSlice.js     # Authentication state management
│   │   └── main.jsx         # Application entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Redis (local or cloud)
- Judge0 API key
- Cloudinary account
- Google Gemini AI API key

### Environment Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd leetcode-clone
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables in `.env`:**
```env
PORT=3000
DB_CONNECT_STRING=mongodb://localhost:27017/leetcode
# OR for MongoDB Atlas:
# DB_CONNECT_STRING=mongodb+srv://username:password@cluster.mongodb.net/leetcode

JWT_KEY=your-super-secret-jwt-key-change-in-production
REDIS_PASS=your-redis-password
JUDGE0_KEY=your-judge0-rapidapi-key
GEMINI_KEY=your-google-gemini-api-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

5. **Frontend Setup**
```bash
cd ../frontend
npm install
```

### Running the Application

1. **Start the backend server**
```bash
cd backend
npm run dev
# Server will run on http://localhost:3000
```

2. **Start the frontend development server**
```bash
cd frontend
npm run dev
# Frontend will run on http://localhost:5173
```

3. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🔧 API Configuration

### Judge0 Setup
1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to Judge0 CE API
3. Get your API key and add to `.env`

### Cloudinary Setup
1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and secret
3. Add credentials to `.env`

### Google Gemini AI Setup
1. Get API key from [Google AI Studio](https://makersuite.google.com/)
2. Add to `.env` as `GEMINI_KEY`

### Redis Setup
**Option 1: Local Redis**
```bash
# Install Redis locally
brew install redis  # macOS
sudo apt install redis-server  # Ubuntu

# Start Redis
redis-server
```

**Option 2: Redis Cloud**
1. Sign up at [Redis Cloud](https://redis.com/redis-enterprise-cloud/)
2. Create a database
3. Update `src/config/redis.js` with your credentials

## 📊 Database Schema

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  emailId: String (unique),
  age: Number,
  role: ['user', 'admin'],
  problemSolved: [ObjectId],
  password: String (hashed)
}
```

### Problem Model
```javascript
{
  title: String,
  description: String,
  difficulty: ['easy', 'medium', 'hard'],
  tags: ['array', 'linkedList', 'graph', 'dp'],
  visibleTestCases: [{ input, output, explanation }],
  hiddenTestCases: [{ input, output }],
  startCode: [{ language, initialCode }],
  referenceSolution: [{ language, completeCode }],
  problemCreator: ObjectId
}
```

### Submission Model
```javascript
{
  userId: ObjectId,
  problemId: ObjectId,
  code: String,
  language: String,
  status: ['pending', 'accepted', 'wrong', 'error'],
  runtime: Number,
  memory: Number,
  errorMessage: String,
  testCasesPassed: Number,
  testCasesTotal: Number
}
```

## 🔐 Authentication Flow

1. **Registration/Login** - User creates account or logs in
2. **JWT Token** - Server generates JWT token stored in HTTP-only cookie
3. **Middleware Validation** - Each protected route validates JWT
4. **Redis Blacklist** - Logout adds token to Redis blacklist
5. **Role-based Access** - Admin routes check user role

## 🎯 API Endpoints

### Authentication
- `POST /user/register` - User registration
- `POST /user/login` - User login
- `POST /user/logout` - User logout
- `GET /user/check` - Validate authentication
- `DELETE /user/deleteProfile` - Delete user account

### Problems
- `GET /problem/getAllProblem` - Get all problems
- `GET /problem/problemById/:id` - Get specific problem
- `POST /problem/create` - Create problem (Admin)
- `PUT /problem/update/:id` - Update problem (Admin)
- `DELETE /problem/delete/:id` - Delete problem (Admin)

### Submissions
- `POST /submission/run/:id` - Run code against visible test cases
- `POST /submission/submit/:id` - Submit solution
- `GET /problem/submittedProblem/:pid` - Get submission history

### AI Chat
- `POST /ai/chat` - Chat with AI for problem assistance

### Video Management
- `GET /video/create/:problemId` - Get upload signature (Admin)
- `POST /video/save` - Save video metadata (Admin)
- `DELETE /video/delete/:problemId` - Delete video (Admin)

## 🎨 Frontend Architecture

### State Management
- **Redux Toolkit** for global state
- **React Hook Form** for form state
- **Local State** for component-specific data

### Key Components
- **Monaco Editor** - Code editing interface
- **Problem Display** - Problem description and examples
- **Test Results** - Code execution results
- **Submission History** - Past submissions tracking
- **AI Chat** - Interactive AI assistance
- **Video Player** - Solution video streaming
- **Admin Panel** - Content management interface

## 🔄 Code Execution Flow

1. **User writes code** in Monaco Editor
2. **Run Code** - Sends to Judge0 via backend
3. **Judge0 Processing** - Compiles and executes code
4. **Results** - Returns execution results, runtime, memory
5. **Display** - Shows results in frontend

## 🎥 Video Upload Flow

1. **Admin selects video** file
2. **Backend generates** Cloudinary signature
3. **Direct upload** to Cloudinary
4. **Metadata saved** to MongoDB
5. **Video available** for streaming

## 🤖 AI Integration

The AI chat feature uses Google Gemini AI with a specialized system prompt for:
- **Hint Generation** - Step-by-step guidance
- **Code Review** - Bug identification and fixes
- **Solution Explanation** - Algorithm explanations
- **Approach Suggestions** - Different solving strategies

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas
2. Configure Redis Cloud
3. Set environment variables
4. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Update API base URL in `axiosClient.js`
2. Build the project: `npm run build`
3. Deploy to Vercel, Netlify, or similar platform

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access for Atlas

**Redis Connection Error**
- Verify Redis server is running
- Check Redis credentials
- Ensure network connectivity

**Judge0 API Errors**
- Verify API key is correct
- Check RapidAPI subscription status
- Monitor API usage limits

**Cloudinary Upload Issues**
- Verify API credentials
- Check file size limits
- Ensure proper CORS settings

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review troubleshooting section

---

Built with ❤️ using modern web technologies