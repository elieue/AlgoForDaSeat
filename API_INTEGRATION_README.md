# API Integration README

## 🚨 **Why This Happens**

- Your frontend (Vite) and backend (Express) are running on different ports.
- When you request `/api/applications/pending`, the frontend dev server doesn't know to forward it to the backend, so it serves `index.html` instead.
- Or, your backend is not running, or the route is not mounted before the frontend catch-all.

## 🛠️ **How to Fix**

### **1. Set Up a Proxy in Vite**

Edit your `frontend/vite.config.js` to include:

```js
export default {
  // ...other config
  server: {
    proxy: {
      '/api': 'http://localhost:5173'
    }
  }
}
```
- This tells Vite to forward all `/api` requests to your backend.

**After editing, restart your frontend dev server!**

### **2. Check Your Backend Route Order**

In your `backend/server.js`, make sure this order is correct:

```js
// API routes FIRST
app.use("/api/applications", applicantRoutes);

// Frontend catch-all LAST
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
```
- The API route must come **before** the catch-all route.

### **3. Make Sure Both Servers Are Running**

- Backend: `cd backend && npm start`
- Frontend: `cd frontend && npm run dev`

### **4. Test the API Directly**

Open your browser and go to:
```
http://localhost:5173/api/applications/pending
```
- You should see **JSON** (an array of applications), not HTML.

## ✅ **After Fixing**

- Reload your frontend page.
- Check the Network tab again for `/pending`—the response should now be JSON.

## 📝 **Summary Checklist**

- [ ] Vite proxy is set up and frontend restarted
- [ ] Backend API routes are mounted before the frontend catch-all
- [ ] Both servers are running
- [ ] Direct API call returns JSON

**If you need help editing your `vite.config.js` or want to confirm your server.js order, paste those files here!**  
Once you see JSON in the response, your frontend will show real data instead of `N/A`.