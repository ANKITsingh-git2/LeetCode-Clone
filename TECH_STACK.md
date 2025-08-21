# Technology Stack Documentation

## Overview
This document provides detailed information about all technologies, services, and features used in the LeetCode Clone project.

## 🎯 Core Technologies

### Frontend Stack

#### **React 19**
- **Purpose**: Main UI framework
- **Features Used**: 
  - Functional components with hooks
  - Context API for theme management
  - Suspense for code splitting
  - Concurrent features for better UX
- **Why Chosen**: Latest React version with improved performance and developer experience

#### **Vite**
- **Purpose**: Build tool and development server
- **Features Used**:
  - Hot Module Replacement (HMR)
  - Fast cold starts
  - Optimized production builds
  - Plugin ecosystem
- **Configuration**: Custom Vite config with React and Tailwind plugins

#### **Redux Toolkit**
- **Purpose**: State management
- **Features Used**:
  - `createSlice` for reducers
  - `createAsyncThunk` for async actions
  - RTK Query for API calls
  - DevTools integration
- **Implementation**: Authentication state, user data, loading states

#### **React Router**
- **Purpose**: Client-side routing
- **Features Used**:
  - Nested routing
  - Protected routes
  - Dynamic route parameters
  - Navigation guards
- **Implementation**: Route protection based on authentication and user roles

#### **Monaco Editor**
- **Purpose**: Code editor component
- **Features Used**:
  - Syntax highlighting for C++, Java, JavaScript
  - IntelliSense and autocomplete
  - Customizable themes
  - Keyboard shortcuts
- **Integration**: Embedded in problem-solving interface with language switching

#### **Tailwind CSS + DaisyUI**
- **Purpose**: Styling and UI components
- **Features Used**:
  - Utility-first CSS approach
  - Pre-built components from DaisyUI
  - Responsive design utilities
  - Dark/light theme support
- **Customization**: Custom color schemes and component variants

### Backend Stack

#### **Node.js + Express.js**
- **Purpose**: Server runtime and web framework
- **Features Used**:
  - RESTful API design
  - Middleware pipeline
  - Error handling
  - CORS configuration
- **Architecture**: MVC pattern with separate controllers, models, and routes

#### **MongoDB + Mongoose**
- **Purpose**: Database and ODM
- **Features Used**:
  - Schema validation
  - Middleware hooks
  - Population for references
  - Indexing for performance
- **Models**: User, Problem, Submission, SolutionVideo schemas

#### **Redis**
- **Purpose**: Caching and session management
- **Features Used**:
  - Token blacklisting for logout
  - Session storage
  - Caching frequently accessed data
  - TTL (Time To Live) for automatic cleanup
- **Implementation**: JWT token invalidation and user session management

## 🔧 External Services Integration

### **Judge0 CE API**
- **Purpose**: Code compilation and execution
- **Features Used**:
  - Multi-language support (C++, Java, JavaScript)
  - Batch submission for multiple test cases
  - Execution time and memory tracking
  - Error handling and stderr capture
- **Implementation**:
  ```javascript
  // Batch submission to Judge0
  const submissions = testCases.map(testcase => ({
    source_code: code,
    language_id: languageId,
    stdin: testcase.input,
    expected_output: testcase.output
  }));
  ```
- **Languages Supported**:
  - C++ (language_id: 54)
  - Java (language_id: 62)
  - JavaScript (language_id: 63)

### **Cloudinary**
- **Purpose**: Media management and CDN
- **Features Used**:
  - Video upload and storage
  - Automatic thumbnail generation
  - Video streaming optimization
  - Secure upload signatures
- **Implementation**:
  - Direct upload from frontend to Cloudinary
  - Signed upload URLs for security
  - Metadata storage in MongoDB
  - Video player integration

### **Google Gemini AI**
- **Purpose**: AI-powered assistance
- **Features Used**:
  - Natural language processing
  - Context-aware responses
  - Code analysis and suggestions
  - Hint generation
- **Implementation**:
  ```javascript
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: messages,
    config: { systemInstruction: customPrompt }
  });
  ```

## 🔐 Security Implementation

### **JWT Authentication**
- **Features**:
  - Stateless authentication
  - Role-based access control
  - Token expiration handling
  - Secure HTTP-only cookies
- **Implementation**:
  ```javascript
  const token = jwt.sign(
    { _id: user._id, emailId: emailId, role: user.role },
    config.JWT_KEY,
    { expiresIn: 60*60 }
  );
  ```

### **Password Security**
- **bcrypt Hashing**:
  - Salt rounds: 10
  - Secure password storage
  - Password comparison for login
- **Validation**:
  - Strong password requirements
  - Email format validation
  - Input sanitization

### **Redis Token Blacklisting**
- **Purpose**: Secure logout implementation
- **Features**:
  - Immediate token invalidation
  - Automatic cleanup with TTL
  - Distributed session management
- **Implementation**:
  ```javascript
  await redisClient.set(`token:${token}`, 'Blocked');
  await redisClient.expireAt(`token:${token}`, payload.exp);
  ```

## 🎨 UI/UX Features

### **Responsive Design**
- **Breakpoints**: Mobile-first approach with Tailwind breakpoints
- **Components**: Adaptive layouts for different screen sizes
- **Navigation**: Mobile-friendly navigation patterns

### **Code Editor Features**
- **Syntax Highlighting**: Language-specific highlighting
- **Auto-completion**: IntelliSense for supported languages
- **Theme Support**: Dark/light themes
- **Keyboard Shortcuts**: VS Code-like shortcuts

### **Real-time Features**
- **Live Code Execution**: Immediate feedback on code runs
- **Progress Indicators**: Loading states for async operations
- **Error Handling**: User-friendly error messages

## 📊 Performance Optimizations

### **Frontend Optimizations**
- **Code Splitting**: Route-based code splitting with React.lazy
- **Memoization**: React.memo for expensive components
- **Bundle Optimization**: Vite's tree shaking and minification
- **Image Optimization**: Lazy loading and responsive images

### **Backend Optimizations**
- **Database Indexing**: Optimized queries with proper indexes
- **Caching**: Redis caching for frequently accessed data
- **Connection Pooling**: MongoDB connection optimization
- **Compression**: Gzip compression for API responses

### **External Service Optimization**
- **Batch Processing**: Judge0 batch submissions for efficiency
- **CDN Usage**: Cloudinary CDN for fast media delivery
- **API Rate Limiting**: Proper handling of external API limits

## 🔄 Data Flow Architecture

### **Authentication Flow**
1. User submits credentials
2. Server validates and generates JWT
3. Token stored in HTTP-only cookie
4. Middleware validates token on protected routes
5. Redis tracks active/blacklisted tokens

### **Code Execution Flow**
1. User writes code in Monaco Editor
2. Frontend sends code to backend API
3. Backend formats request for Judge0
4. Judge0 compiles and executes code
5. Results processed and returned to frontend
6. UI displays execution results and metrics

### **Video Upload Flow**
1. Admin selects video file
2. Backend generates Cloudinary signature
3. Frontend uploads directly to Cloudinary
4. Upload metadata saved to MongoDB
5. Video available for streaming

### **AI Chat Flow**
1. User sends message to AI chat
2. Backend includes problem context
3. Gemini AI processes request with custom prompt
4. AI response formatted and returned
5. Chat history maintained in component state

## 🧪 Testing Strategy

### **Frontend Testing**
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: User flow testing
- **E2E Tests**: Full application testing with Cypress

### **Backend Testing**
- **Unit Tests**: Controller and utility function tests
- **Integration Tests**: API endpoint testing
- **Database Tests**: Model validation and query testing

### **External Service Testing**
- **Mock Services**: Testing without external API calls
- **Integration Tests**: Actual service integration testing
- **Error Handling**: Testing service failure scenarios

## 📈 Monitoring and Analytics

### **Error Tracking**
- **Frontend**: Error boundaries and logging
- **Backend**: Centralized error handling
- **External Services**: API failure monitoring

### **Performance Monitoring**
- **Frontend**: Core Web Vitals tracking
- **Backend**: Response time monitoring
- **Database**: Query performance analysis

## 🚀 Deployment Architecture

### **Frontend Deployment**
- **Build Process**: Vite production build
- **Static Hosting**: Vercel/Netlify deployment
- **Environment Variables**: Build-time configuration

### **Backend Deployment**
- **Container**: Docker containerization
- **Cloud Hosting**: Railway/Heroku deployment
- **Environment**: Production environment variables
- **Database**: MongoDB Atlas cloud database
- **Cache**: Redis Cloud managed service

## 🔮 Future Enhancements

### **Planned Features**
- **WebSocket Integration**: Real-time collaboration
- **Advanced Analytics**: Detailed performance metrics
- **Mobile App**: React Native mobile application
- **Microservices**: Service decomposition for scalability

### **Technology Upgrades**
- **Next.js Migration**: Server-side rendering
- **GraphQL**: More efficient API queries
- **Kubernetes**: Container orchestration
- **Advanced AI**: More sophisticated AI assistance

---

This technology stack provides a robust, scalable, and modern foundation for a competitive programming platform with room for future growth and enhancements.