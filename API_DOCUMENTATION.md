# API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Most endpoints require authentication via JWT token stored in HTTP-only cookies.

## Response Format
All API responses follow this structure:
```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message",
  "status": 400
}
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/user/register`

Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john@example.com",
  "password": "SecurePass123!",
  "age": 25
}
```

**Response:**
```json
{
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "emailId": "john@example.com",
    "role": "user"
  },
  "message": "Logged in Successfully"
}
```

### Login User
**POST** `/user/login`

Authenticate user and create session.

**Request Body:**
```json
{
  "emailId": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "emailId": "john@example.com",
    "role": "user"
  },
  "message": "Logged in Successfully"
}
```

### Logout User
**POST** `/user/logout`

Logout user and invalidate session.

**Headers:** `Cookie: token=jwt_token`

**Response:**
```json
{
  "message": "Logged Out Successfully"
}
```

### Check Authentication
**GET** `/user/check`

Validate current authentication status.

**Headers:** `Cookie: token=jwt_token`

**Response:**
```json
{
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "emailId": "john@example.com",
    "role": "user"
  },
  "message": "Valid User"
}
```

### Delete Profile
**DELETE** `/user/deleteProfile`

Delete user account and all associated data.

**Headers:** `Cookie: token=jwt_token`

**Response:**
```json
{
  "message": "Deleted Successfully"
}
```

---

## 📝 Problem Management Endpoints

### Get All Problems
**GET** `/problem/getAllProblem`

Retrieve all problems with basic information.

**Headers:** `Cookie: token=jwt_token`

**Response:**
```json
[
  {
    "_id": "problem_id",
    "title": "Two Sum",
    "difficulty": "easy",
    "tags": "array"
  }
]
```

### Get Problem by ID
**GET** `/problem/problemById/:id`

Get detailed problem information including test cases and starter code.

**Headers:** `Cookie: token=jwt_token`

**Response:**
```json
{
  "_id": "problem_id",
  "title": "Two Sum",
  "description": "Given an array of integers...",
  "difficulty": "easy",
  "tags": "array",
  "visibleTestCases": [
    {
      "input": "[2,7,11,15], 9",
      "output": "[0,1]",
      "explanation": "nums[0] + nums[1] = 2 + 7 = 9"
    }
  ],
  "startCode": [
    {
      "language": "JavaScript",
      "initialCode": "function twoSum(nums, target) {\n    \n}"
    }
  ],
  "secureUrl": "video_url",
  "thumbnailUrl": "thumbnail_url",
  "duration": 300
}
```

### Create Problem (Admin Only)
**POST** `/problem/create`

Create a new coding problem.

**Headers:** `Cookie: token=admin_jwt_token`

**Request Body:**
```json
{
  "title": "Two Sum",
  "description": "Given an array of integers, return indices of two numbers that add up to target.",
  "difficulty": "easy",
  "tags": "array",
  "visibleTestCases": [
    {
      "input": "[2,7,11,15], 9",
      "output": "[0,1]",
      "explanation": "nums[0] + nums[1] = 2 + 7 = 9"
    }
  ],
  "hiddenTestCases": [
    {
      "input": "[3,2,4], 6",
      "output": "[1,2]"
    }
  ],
  "startCode": [
    {
      "language": "C++",
      "initialCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};"
    },
    {
      "language": "Java",
      "initialCode": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}"
    },
    {
      "language": "JavaScript",
      "initialCode": "function twoSum(nums, target) {\n    \n}"
    }
  ],
  "referenceSolution": [
    {
      "language": "C++",
      "completeCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> map;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (map.count(complement)) {\n                return {map[complement], i};\n            }\n            map[nums[i]] = i;\n        }\n        return {};\n    }\n};"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Problem Saved Successfully"
}
```

### Update Problem (Admin Only)
**PUT** `/problem/update/:id`

Update an existing problem.

**Headers:** `Cookie: token=admin_jwt_token`

**Request Body:** Same as create problem

**Response:**
```json
{
  "_id": "problem_id",
  "title": "Updated Title",
  // ... updated problem data
}
```

### Delete Problem (Admin Only)
**DELETE** `/problem/delete/:id`

Delete a problem.

**Headers:** `Cookie: token=admin_jwt_token`

**Response:**
```json
{
  "message": "Successfully Deleted"
}
```

### Get User's Solved Problems
**GET** `/problem/problemSolvedByUser`

Get all problems solved by the current user.

**Headers:** `Cookie: token=jwt_token`

**Response:**
```json
[
  {
    "_id": "problem_id",
    "title": "Two Sum",
    "difficulty": "easy",
    "tags": "array"
  }
]
```

### Get User's Submissions for Problem
**GET** `/problem/submittedProblem/:pid`

Get all submissions by current user for a specific problem.

**Headers:** `Cookie: token=jwt_token`

**Response:**
```json
[
  {
    "_id": "submission_id",
    "code": "function twoSum(nums, target) { ... }",
    "language": "javascript",
    "status": "accepted",
    "runtime": 0.002,
    "memory": 904,
    "testCasesPassed": 5,
    "testCasesTotal": 5,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## 🚀 Code Submission Endpoints

### Run Code
**POST** `/submission/run/:id`

Execute code against visible test cases.

**Headers:** `Cookie: token=jwt_token`

**Request Body:**
```json
{
  "code": "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}",
  "language": "javascript"
}
```

**Response:**
```json
{
  "success": true,
  "testCases": [
    {
      "stdin": "[2,7,11,15], 9",
      "expected_output": "[0,1]",
      "stdout": "[0,1]",
      "status_id": 3,
      "time": "0.002",
      "memory": 904
    }
  ],
  "runtime": 0.002,
  "memory": 904
}
```

### Submit Code
**POST** `/submission/submit/:id`

Submit code for evaluation against hidden test cases.

**Headers:** `Cookie: token=jwt_token`

**Request Body:**
```json
{
  "code": "function twoSum(nums, target) { ... }",
  "language": "javascript"
}
```

**Response:**
```json
{
  "accepted": true,
  "totalTestCases": 10,
  "passedTestCases": 10,
  "runtime": 0.015,
  "memory": 1024
}
```

---

## 🤖 AI Chat Endpoints

### Chat with AI
**POST** `/ai/chat`

Get AI assistance for problem solving.

**Headers:** `Cookie: token=jwt_token`

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "parts": [{"text": "I need help with the two sum problem"}]
    }
  ],
  "title": "Two Sum",
  "description": "Given an array of integers...",
  "testCases": [
    {
      "input": "[2,7,11,15], 9",
      "output": "[0,1]",
      "explanation": "nums[0] + nums[1] = 2 + 7 = 9"
    }
  ],
  "startCode": [
    {
      "language": "JavaScript",
      "initialCode": "function twoSum(nums, target) {\n    \n}"
    }
  ]
}
```

**Response:**
```json
{
  "message": "For the Two Sum problem, you can use a hash map approach. Here's a hint: as you iterate through the array, store each number and its index in a map. For each number, check if its complement (target - current number) exists in the map..."
}
```

---

## 🎥 Video Management Endpoints (Admin Only)

### Generate Upload Signature
**GET** `/video/create/:problemId`

Get Cloudinary upload signature for video upload.

**Headers:** `Cookie: token=admin_jwt_token`

**Response:**
```json
{
  "signature": "cloudinary_signature",
  "timestamp": 1642234567,
  "public_id": "leetcode-solutions/problem_id/user_id_timestamp",
  "api_key": "cloudinary_api_key",
  "cloud_name": "cloudinary_cloud_name",
  "upload_url": "https://api.cloudinary.com/v1_1/cloud_name/video/upload"
}
```

### Save Video Metadata
**POST** `/video/save`

Save video metadata after successful upload.

**Headers:** `Cookie: token=admin_jwt_token`

**Request Body:**
```json
{
  "problemId": "problem_id",
  "cloudinaryPublicId": "leetcode-solutions/problem_id/video_id",
  "secureUrl": "https://res.cloudinary.com/cloud/video/upload/v123/video.mp4",
  "duration": 300
}
```

**Response:**
```json
{
  "message": "Video solution saved successfully",
  "videoSolution": {
    "id": "video_id",
    "thumbnailUrl": "thumbnail_url",
    "duration": 300,
    "uploadedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Delete Video
**DELETE** `/video/delete/:problemId`

Delete video and its metadata.

**Headers:** `Cookie: token=admin_jwt_token`

**Response:**
```json
{
  "message": "Video deleted successfully"
}
```

---

## 📊 Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **409** - Conflict
- **500** - Internal Server Error

## 🔧 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Detailed error message",
  "status": 400
}
```

Common error scenarios:
- Invalid authentication token
- Missing required fields
- Validation errors
- External service failures (Judge0, Cloudinary, etc.)
- Database connection issues

## 🚦 Rate Limiting

- Authentication endpoints: 5 requests per minute
- Code execution endpoints: 10 requests per minute
- General API endpoints: 100 requests per minute

## 📝 Notes

1. All timestamps are in ISO 8601 format
2. File uploads are handled directly to Cloudinary
3. JWT tokens expire after 1 hour
4. Redis is used for token blacklisting on logout
5. All passwords are hashed using bcrypt with 10 salt rounds