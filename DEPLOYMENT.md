# HanGuk Bites - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account with this repository pushed
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas database (already configured)
- Backend deployed separately (see Backend Deployment below)

---

## 📦 Frontend Deployment (Vercel)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import Repository**
   - Select your GitHub account
   - Find `korean-restaurant-web` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   VITE_API_URL=https://your-backend-url.com
   VITE_API_BASE_PATH=/api
   VITE_ENABLE_DEBUG=false
   ```
   
   ⚠️ **Important**: Leave `VITE_API_URL` as placeholder for now. Update after backend deployment.

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your frontend will be live at `https://your-project.vercel.app`

---

## 🖥️ Backend Deployment (Render.com - Recommended)

### Step 1: Create Account
- Go to https://render.com
- Sign up with GitHub

### Step 2: Create New Web Service
- Click "New" → "Web Service"
- Connect your GitHub repository
- Select `korean-restaurant-web`

### Step 3: Configure Service
```
Name: hanguk-bites-api
Region: Choose closest to your users
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
```

### Step 4: Add Environment Variables
```
NODE_ENV=production
PORT=5001
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key_min_32_chars
CORS_ORIGINS=https://your-project.vercel.app
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 5: Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes first time)
- Copy your backend URL: `https://hanguk-bites-api.onrender.com`

---

## 🔧 Post-Deployment Configuration

### Step 1: Update Frontend with Backend URL

1. Go to **Vercel Dashboard** → Your Project → Settings → Environment Variables
2. Update `VITE_API_URL` to your backend URL:
   ```
   VITE_API_URL=https://hanguk-bites-api.onrender.com
   ```
3. Go to **Deployments** tab → Click "..." → "Redeploy"

### Step 2: Update Backend CORS

1. Go to **Render Dashboard** → Your Service → Environment
2. Update `CORS_ORIGINS` to your Vercel URL:
   ```
   CORS_ORIGINS=https://your-project.vercel.app,https://www.your-domain.com
   ```
3. Save and wait for automatic redeploy

### Step 3: Configure MongoDB Atlas Network Access

1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   *(Recommended for cloud deployments like Render/Railway)*

---

## ✅ Verify Deployment

### Test Frontend
1. Open `https://your-project.vercel.app`
2. Navigate to "Reservations"
3. Create a test booking
4. Verify success message appears

### Test Admin Panel
1. Go to `https://your-project.vercel.app/admin/login`
2. Login with:
   - **Username**: `admin`
   - **Password**: `HanGuk@2024!`
3. Verify bookings appear in dashboard
4. Test status updates and filtering

### Check API Health
Visit: `https://your-backend-url.com/api/health`

Should return:
```json
{
  "status": "OK",
  "database": "connected",
  "timestamp": "2025-11-11T13:00:00.000Z"
}
```

---

## 🔒 Security Checklist

Before going live:

- ✅ JWT_SECRET is unique and 32+ characters
- ✅ MongoDB Atlas has proper network access rules
- ✅ CORS is configured with your frontend domain only
- ✅ Rate limiting is enabled (100 req/15min)
- ✅ Helmet security headers enabled
- ✅ VITE_ENABLE_DEBUG=false in production
- ✅ HTTPS enforced (automatic on Vercel/Render)
- ✅ Admin password changed from default
- ✅ No sensitive data in git repository

---

## 🐛 Common Issues & Solutions

### "Failed to load resource: net::ERR_CONNECTION_REFUSED"
**Problem**: Frontend can't reach backend

**Solutions**:
1. Check backend is deployed and running on Render
2. Verify `VITE_API_URL` in Vercel matches backend URL exactly
3. Redeploy frontend after updating environment variable

### "CORS Policy Error"
**Problem**: Backend blocking frontend requests

**Solutions**:
1. Add your Vercel URL to `CORS_ORIGINS` in backend environment
2. Format: `https://your-project.vercel.app` (no trailing slash)
3. Redeploy backend after updating CORS

### "MongoDB connection error"
**Problem**: Backend can't connect to database

**Solutions**:
1. Check `MONGODB_URI` in backend environment variables
2. Verify MongoDB Atlas network access allows 0.0.0.0/0
3. Check MongoDB Atlas user has correct permissions
4. Verify database name in connection string matches

### "Admin login fails with 401"
**Problem**: Wrong credentials or admin not created

**Solutions**:
1. Verify admin user exists in MongoDB
2. Check credentials: `admin` / `HanGuk@2024!`
3. SSH into Render and run: `npm run create-admin`

### Build fails on Vercel
**Problem**: Missing dependencies or configuration issues

**Solutions**:
1. Check build logs in Vercel dashboard
2. Verify `client/package.json` has all dependencies
3. Make sure Root Directory is set to `client`
4. Check that `vercel.json` is in repository root

---

## 📊 Monitoring & Analytics

### Vercel Analytics
- Automatically enabled in dashboard
- View page views, performance metrics
- Track Core Web Vitals

### Backend Logs
- **Render**: Dashboard → Logs tab (real-time)
- Monitor API requests and errors
- Filter by level (info, warn, error)

### MongoDB Atlas
- Dashboard → Metrics → Monitor
- Track database queries, connections
- Set up alerts for high usage

---

## 🔄 Continuous Deployment

Both platforms auto-deploy on git push:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# ✨ Automatic deployment:
# - Vercel rebuilds and deploys frontend
# - Render rebuilds and deploys backend
# - Usually takes 2-5 minutes total
```

---

## 💡 Production Best Practices

1. **Environment Variables**
   - Never commit `.env` files to git
   - Use different secrets for dev/staging/prod
   - Rotate JWT_SECRET every 3-6 months

2. **Database**
   - Enable MongoDB Atlas automated backups
   - Monitor connection limits and usage
   - Create indexes for better query performance

3. **Performance**
   - Enable Vercel Edge Network (automatic)
   - Optimize images before uploading
   - Monitor API response times

4. **Security**
   - Update dependencies regularly
   - Review security advisories
   - Monitor failed login attempts
   - Set up rate limiting alerts

5. **Monitoring**
   - Check logs daily for errors
   - Set up uptime monitoring (UptimeRobot, Pingdom)
   - Monitor API usage and quotas

---

## 🌐 Custom Domain Setup

### On Vercel (Frontend)
1. Go to Project Settings → Domains
2. Add your domain (e.g., `hangukbites.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### Update Backend CORS
Add your custom domain to `CORS_ORIGINS`:
```
CORS_ORIGINS=https://hangukbites.com,https://www.hangukbites.com
```

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Vite Docs**: https://vitejs.dev
- **React Router**: https://reactrouter.com

---

## 🎉 You're Live!

Congratulations! Your Korean restaurant booking system is now live and ready to accept reservations.

**What's Next?**
- [ ] Test all functionality thoroughly
- [ ] Change admin password
- [ ] Add custom domain
- [ ] Set up monitoring alerts
- [ ] Share with customers! 🚀

---

## 📝 Deployment Checklist

Print this and check off each item:

**Pre-Deployment**
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas configured
- [ ] Admin user created
- [ ] Environment variables prepared

**Frontend (Vercel)**
- [ ] Project imported from GitHub
- [ ] Root directory set to `client`
- [ ] Build command: `npm run build`
- [ ] Environment variables added
- [ ] Deployment successful

**Backend (Render)**
- [ ] Web service created
- [ ] Root directory set to `server`
- [ ] Start command: `npm start`
- [ ] Environment variables added
- [ ] Deployment successful

**Configuration**
- [ ] Frontend API URL updated with backend URL
- [ ] Backend CORS includes frontend URL
- [ ] MongoDB network access configured
- [ ] SSL certificates active (automatic)

**Testing**
- [ ] Frontend loads without errors
- [ ] Can create test reservation
- [ ] Admin login works
- [ ] Bookings display in dashboard
- [ ] Status updates work
- [ ] API health check passes

**Security**
- [ ] JWT secret changed from default
- [ ] Admin password changed
- [ ] Debug logs disabled in production
- [ ] CORS restricted to your domains
- [ ] Rate limiting active

**Done!** 🎊
