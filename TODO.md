# Task Completion Plan for OSINT Website with Backend Integration

## Current Work Summary
The project is a React frontend with Vite for an OSINT-themed website (components like Homepage, VirtualTours, Blog, Community, etc.). Backend is Express with MongoDB (Atlas), JWT auth, Cloudinary for images, routes for auth, blogs, community. Issues: Local DB fallback, no frontend auth integration/routing, login/signup not functional, image upload errors due to missing creds. Goal: Fix DB to Atlas, integrate auth flow, protect routes, enable full CRUD for blog/community with images, test all.

## Key Technical Concepts
- Backend: Express, Mongoose (schemas/models for User, Blog, CommunityPost), JWT (jsonwebtoken for auth), bcryptjs (password hashing), multer (multipart for images), Cloudinary (v2 for upload/destroy), CORS, dotenv.
- Frontend: React 18, TypeScript, Axios (API calls), Tailwind CSS, React Router (for auth-protected routing), localStorage (token persistence), Context API (global auth state).
- Database: MongoDB Atlas (remote cluster), collections for users, blogs, community posts.
- Auth Flow: Signup/Login -> JWT token stored in localStorage -> protected routes (Blog/Community) check token -> API calls with Authorization header.
- Image Handling: FormData for upload, buffer to Cloudinary, store URL/publicId in DB, delete on update/delete.

## Relevant Files and Code
- backend/.env: Needs update for Atlas URI (URL-encoded password), JWT_SECRET, Cloudinary creds.
  - Current: Local MongoDB, missing Atlas.
  - Change: MONGO_URI to Atlas string.
- backend/models/User.js: Schema with username, email, password (hashed). Needs comparePassword method if missing.
  - Important Code Snippet: 
    ```
    userSchema.methods.comparePassword = async function(candidatePassword) {
      return bcrypt.compare(candidatePassword, this.password);
    };
    ```
- src/App.tsx: Basic page switching, no routing/auth. Needs React Router, AuthContext, protected routes for /blog, /community, /login, /signup.
  - Important Code Snippet: Add <BrowserRouter>, <AuthProvider>, Routes with PrivateRoute wrapper.
- src/components/Login.tsx & Signup.tsx: Forms with axios POST, but no navigation/token storage. Depend on App.tsx for onLogin callback.
- src/components/Blog.tsx: CRUD with FormData, but no auth check/redirect. Depend on token from context.
- src/components/Community.tsx: Similar to Blog, needs auth/CRUD integration.
- src/components/Header.tsx: Navigation, needs conditional links (login/logout based on auth).
- New file: src/context/AuthContext.tsx - Provides user/token state, login/logout functions.
- backend/server.js: DB connection, routes mounted - no changes, but restart after .env.
- backend/routes/auth.js: Signup/login logic - tested, but ensure bcrypt works.
- backend/routes/blogs.js: CRUD with auth middleware, Cloudinary upload - tested GET, needs POST with image.
- backend/routes/community.js: Assume similar CRUD for posts - verify/align with frontend.

## Problem Solving
- DB Issue: Switch from local to Atlas to persist data; URL-encode special chars in password (@ -> %40).
- Auth Issue: Frontend lacks state management/routing; login/signup forms exist but not connected (no redirect, token not stored/used).
- Image Upload Error: Missing Cloudinary creds in .env caused config failure; now added, test multipart POST.
- Login/Signup Not Working: Likely due to DB connection failure (local not running); Atlas fix + frontend integration will resolve.
- No Protected Routes: Add PrivateRoute component to redirect unauth users.
- Edge Cases: Handle invalid tokens (401 redirect), no image upload, file validation (size/type), duplicate users.

## Pending Tasks and Next Steps
1. [ ] Update backend/.env with Atlas URI and secure JWT_SECRET (create_file to overwrite).
   - "Update .env for remote DB and creds to enable persistence and fix upload errors."
2. [ ] Read/verify backend/models/User.js for comparePassword method; add if missing (edit_file).
   - "Ensure login password verification works."
3. [ ] Create src/context/AuthContext.tsx for global auth state (create_file).
   - "Provide shared user/token across components."
4. [ ] Edit src/App.tsx to add React Router, AuthProvider, routes for login/signup/blog/community, PrivateRoute wrapper (edit_file).
   - "Integrate auth flow and protect pages; quote from conversation: 'login and signup page is not working' - add navigation."
5. [ ] Edit src/components/Login.tsx and Signup.tsx to use AuthContext for onLogin, store token in localStorage, navigate on success (edit_file).
   - "Fix form submission and redirect."
6. [ ] Edit src/components/Header.tsx to use AuthContext for conditional nav (login/logout, protected links) (edit_file).
   - "Update navigation based on auth status."
7. [ ] Edit src/components/Blog.tsx to use AuthContext (token check, redirect if unauth), handle errors (edit_file).
   - "Enable protected CRUD with image upload."
8. [ ] Edit src/components/Community.tsx similar to Blog (auth check, CRUD integration) (edit_file).
   - "Complete community posts functionality."
9. [ ] Restart backend (`cd backend && npm start`) and verify "MongoDB connected" log (execute_command).
   - "Apply .env changes and test DB connection."
10. [ ] Test backend APIs: Signup/login (curl/PowerShell), POST blog with image (multipart), community CRUD, errors (execute_command multiple).
    - "Verify server-side auth and upload no errors."
11. [ ] Launch browser to frontend (browser_action launch http://localhost:5173), test full flow: Navigate to login, signup new user, login, access blog (create with image, verify upload/display), community post, logout, unauth redirect, all pages (home, tours, etc.), edge cases (invalid login, no image) (browser_action sequence: launch, click nav, type forms, submit, scroll, close).
    - "Thorough UI testing as per user request."
12. [ ] Update TODO.md after each major step (edit_file).
    - "Track progress."
13. [ ] If issues (e.g., bcrypt error, routing bugs), debug/fix iteratively (read_file, edit_file, retest).
    - "Address any failures from testing."

After all steps, use attempt_completion with summary and demo command (e.g., open localhost:5173).
