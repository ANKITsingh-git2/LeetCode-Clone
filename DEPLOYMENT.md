# Deployment Guide

This guide covers deploying the LeetCode Clone application to production environments.

## 🚀 Quick Deployment Checklist

- [ ] Set up MongoDB Atlas database
- [ ] Configure Redis Cloud instance
- [ ] Set up Cloudinary account
- [ ] Get Judge0 API key
- [ ] Get Google Gemini AI API key
- [ ] Deploy backend to Railway/Heroku
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Configure environment variables
- [ ] Test all functionality

## 🗄️ Database Setup

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster

2. **Configure Database Access**
   ```bash
   # Create database user
   Username: your-username
   Password: your-secure-password
   
   # Set user privileges
   Role: Atlas Admin (for development)
   Role: Read and write to any database (for production)
   ```

3. **Configure Network Access**
   ```bash
   # For development - allow all IPs
   IP Address: 0.0.0.0/0
   
   # For production - restrict to your server IPs
   IP Address: your-server-ip/32
   ```

4. **Get Connection String**
   ```bash
   mongodb+srv://username:password@cluster.mongodb.net/leetcode?retryWrites=true&w=majority
   ```

### Redis Cloud Setup

1. **Create Redis Cloud Account**
   - Go to [Redis Cloud](https://redis.com/redis-enterprise-cloud/)
   - Sign up for free tier (30MB)

2. **Create Database**
   ```bash
   # Database settings
   Name: leetcode-cache
   Memory: 30MB
   Region: Choose closest to your server
   ```

3. **Get Connection Details**
   ```bash
   Host: redis-xxxxx.c1.region.redns.redis-cloud.com
   Port: xxxxx
   Password: your-redis-password
   ```

## 🔧 External Services Configuration

### Judge0 API Setup

1. **Get RapidAPI Account**
   - Sign up at [RapidAPI](https://rapidapi.com/)
   - Subscribe to [Judge0 CE](https://rapidapi.com/judge0-official/api/judge0-ce/)

2. **Get API Key**
   ```bash
   X-RapidAPI-Key: your-judge0-api-key
   X-RapidAPI-Host: judge0-ce.p.rapidapi.com
   ```

### Cloudinary Setup

1. **Create Cloudinary Account**
   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Get free tier (25GB storage, 25GB bandwidth)

2. **Get API Credentials**
   ```bash
   Cloud Name: your-cloud-name
   API Key: your-api-key
   API Secret: your-api-secret
   ```

### Google Gemini AI Setup

1. **Get API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/)
   - Create new API key
   - Copy the key for environment variables

## 🖥️ Backend Deployment

### Option 1: Railway Deployment

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Initialize Project**
   ```bash
   cd backend
   railway init
   railway link
   ```

3. **Set Environment Variables**
   ```bash
   railway variables set PORT=3000
   railway variables set DB_CONNECT_STRING="mongodb+srv://..."
   railway variables set JWT_KEY="your-super-secret-jwt-key"
   railway variables set REDIS_PASS="your-redis-password"
   railway variables set JUDGE0_KEY="your-judge0-key"
   railway variables set GEMINI_KEY="your-gemini-key"
   railway variables set CLOUDINARY_CLOUD_NAME="your-cloud-name"
   railway variables set CLOUDINARY_API_KEY="your-api-key"
   railway variables set CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Deploy**
   ```bash
   railway up
   ```

### Option 2: Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   # Install Heroku CLI
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set PORT=3000
   heroku config:set DB_CONNECT_STRING="mongodb+srv://..."
   heroku config:set JWT_KEY="your-super-secret-jwt-key"
   heroku config:set REDIS_PASS="your-redis-password"
   heroku config:set JUDGE0_KEY="your-judge0-key"
   heroku config:set GEMINI_KEY="your-gemini-key"
   heroku config:set CLOUDINARY_CLOUD_NAME="your-cloud-name"
   heroku config:set CLOUDINARY_API_KEY="your-api-key"
   heroku config:set CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 3: DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository
   - Select backend folder

2. **Configure Build Settings**
   ```yaml
   # .do/app.yaml
   name: leetcode-backend
   services:
   - name: api
     source_dir: /backend
     github:
       repo: your-username/your-repo
       branch: main
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: PORT
       value: "3000"
     - key: DB_CONNECT_STRING
       value: "your-mongodb-connection-string"
       type: SECRET
     # ... other environment variables
   ```

## 🌐 Frontend Deployment

### Option 1: Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Update API Base URL**
   ```javascript
   // src/utils/axiosClient.js
   const axiosClient = axios.create({
     baseURL: 'https://your-backend-url.railway.app', // Update this
     withCredentials: true,
     headers: {
       'Content-Type': 'application/json'
     }
   });
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

4. **Configure Environment Variables** (if needed)
   ```bash
   vercel env add VITE_API_URL
   # Enter: https://your-backend-url.railway.app
   ```

### Option 2: Netlify Deployment

1. **Build the Project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

3. **Or Deploy via Git**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔒 Production Security Checklist

### Backend Security

- [ ] Use strong JWT secret key (32+ characters)
- [ ] Enable CORS only for your frontend domain
- [ ] Use HTTPS in production
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Use Redis AUTH

### Frontend Security

- [ ] Update API base URL to production backend
- [ ] Remove console.log statements
- [ ] Enable HTTPS
- [ ] Set proper CSP headers
- [ ] Validate user inputs
- [ ] Sanitize displayed data

## 📊 Environment Variables Reference

### Backend Environment Variables

```bash
# Server Configuration
PORT=3000

# Database
DB_CONNECT_STRING=mongodb+srv://username:password@cluster.mongodb.net/leetcode

# Authentication
JWT_KEY=your-super-secret-jwt-key-minimum-32-characters

# Redis
REDIS_PASS=your-redis-password

# External APIs
JUDGE0_KEY=your-judge0-rapidapi-key
GEMINI_KEY=your-google-gemini-api-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### Frontend Environment Variables (Optional)

```bash
# API Configuration
VITE_API_URL=https://your-backend-url.com
```

## 🧪 Post-Deployment Testing

### Backend Testing

1. **Health Check**
   ```bash
   curl https://your-backend-url.com/health
   ```

2. **Authentication Test**
   ```bash
   curl -X POST https://your-backend-url.com/user/register \
     -H "Content-Type: application/json" \
     -d '{"firstName":"Test","emailId":"test@example.com","password":"TestPass123!"}'
   ```

3. **Database Connection**
   - Check MongoDB Atlas metrics
   - Verify Redis connection in logs

### Frontend Testing

1. **Load Test**
   - Open your deployed frontend URL
   - Test user registration/login
   - Try solving a problem
   - Test code execution

2. **Cross-browser Testing**
   - Test on Chrome, Firefox, Safari
   - Test on mobile devices
   - Verify responsive design

## 🔧 Troubleshooting Common Issues

### Backend Issues

**MongoDB Connection Error**
```bash
# Check connection string format
mongodb+srv://username:password@cluster.mongodb.net/database

# Verify network access in MongoDB Atlas
# Check if IP is whitelisted
```

**Redis Connection Error**
```bash
# Verify Redis credentials
# Check if Redis instance is running
# Verify network connectivity
```

**Judge0 API Errors**
```bash
# Check API key validity
# Verify subscription status
# Monitor rate limits
```

### Frontend Issues

**CORS Errors**
```javascript
// Backend: Update CORS configuration
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

**API Connection Issues**
```javascript
// Frontend: Update base URL
const axiosClient = axios.create({
  baseURL: 'https://your-backend-url.com',
  withCredentials: true
});
```

## 📈 Performance Optimization

### Backend Optimization

1. **Database Indexing**
   ```javascript
   // Add indexes for frequently queried fields
   userSchema.index({ emailId: 1 });
   problemSchema.index({ difficulty: 1, tags: 1 });
   submissionSchema.index({ userId: 1, problemId: 1 });
   ```

2. **Caching Strategy**
   ```javascript
   // Cache frequently accessed problems
   const cachedProblem = await redisClient.get(`problem:${id}`);
   if (cachedProblem) {
     return JSON.parse(cachedProblem);
   }
   ```

3. **Connection Pooling**
   ```javascript
   // MongoDB connection options
   mongoose.connect(uri, {
     maxPoolSize: 10,
     serverSelectionTimeoutMS: 5000,
     socketTimeoutMS: 45000,
   });
   ```

### Frontend Optimization

1. **Code Splitting**
   ```javascript
   // Lazy load components
   const AdminPanel = lazy(() => import('./components/AdminPanel'));
   const ProblemPage = lazy(() => import('./pages/ProblemPage'));
   ```

2. **Bundle Analysis**
   ```bash
   # Analyze bundle size
   npm run build
   npx vite-bundle-analyzer dist
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway login --token ${{ secrets.RAILWAY_TOKEN }}
          railway up --service backend

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --token ${{ secrets.VERCEL_TOKEN }} --prod
```

## 📞 Support and Monitoring

### Logging

1. **Backend Logging**
   ```javascript
   // Add structured logging
   const winston = require('winston');
   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' })
     ]
   });
   ```

2. **Error Tracking**
   - Consider integrating Sentry for error tracking
   - Set up alerts for critical errors
   - Monitor API response times

### Health Checks

```javascript
// Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

---

Your LeetCode Clone is now ready for production! 🚀

Remember to monitor your application after deployment and set up proper logging and error tracking for production maintenance.