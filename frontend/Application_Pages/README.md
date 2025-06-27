# Frontend Best Practices & Tips

> **Tech Stack:**
> - **Frontend:** Vue.js, Vue Router, Pinia (State Management)
> - **Backend:** Node.js, Express.js
> - **Database:** PostgreSQL
> - **Authentication:** JWT

---

## 🌐 **Project Structure & Architecture**

### New Structure (after cleanup)

```
Application_Pages/
  pages/                # All main page views (Dashboard, Applications, etc.)
  components/           # Shared/reusable components (tables, buttons, badges, etc.)
  layout/               # Layout components (Sidebar, Topbar, AppShell)
  store/                # Pinia stores
  router/               # Vue Router config (router.js)
  styles/               # Global and utility styles (style.css)
  README.md             # This documentation
```

- All obsolete/test files (LocalPreviewApp, LocalTestApp, PreviewRouter, RunApp) have been removed.
- All routing and state management is preserved.
- All imports/exports are updated to match the new structure.

---

## 🧱 **Component Design**

4. **Use Atomic Design Principles**
   - Break UI into **Atoms**, **Molecules**, **Organisms**, **Templates**, and **Pages**.
   - Encourages reusability and consistency.
5. **Keep Components Small and Focused**
   - Follow the **Single Responsibility Principle**.
   - Use multiple smaller components rather than one large monolithic one.
6. **Use `defineProps` and `defineEmits` Wisely**
   - Define clear interfaces for props and events.
   - Use default values and prop validations where appropriate.
7. **Slots for Flexibility**
   - Leverage named and scoped slots for reusable layout components.
8. **Global Component Registration (sparingly)**
   - Register truly reusable components (e.g., buttons, modals) globally via `app.component()` in `main.js`.

---

## ⚛️ **Pinia (State Management)**

9. **Modularize Stores**
   - Use one Pinia store per domain (e.g., `userStore`, `cartStore`).
   - Prevent overloading a single global store.
10. **Avoid Storing Derived State**
    - Compute derived values using `getters` instead of duplicating them in state.
11. **Use `storeToRefs()` in Composition API**
    - This avoids the reactivity loss when destructuring store properties.
12. **Persist State (if needed)**
    - Use plugins like `pinia-plugin-persistedstate` for persistent auth/session data.

---

## 🔀 **Vue Router Best Practices**

13. **Use Named Routes**
    - Avoid hardcoding paths. Use `router.push({ name: 'UserProfile', params: { id: 1 } })`.
14. **Route-Level Code Splitting**
    - Lazy-load routes: `component: () => import('@/views/UserProfile.vue')`.
15. **Use Navigation Guards Thoughtfully**
    - Global guards for auth checks, and `beforeRouteEnter` for per-component logic.
16. **404 and Catch-All Routes**
    - Always include a fallback route: `{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }`.

---

## ⚙️ **Performance Optimization**

17. **Use `v-show` vs `v-if` Appropriately**
    - `v-if` removes from DOM (use for conditional rendering).
    - `v-show` hides via CSS (use for frequent toggling).
18. **Virtual Scrolling for Large Lists**
    - Use libraries like `vue-virtual-scroll-list` for large datasets.
19. **Debounce Expensive Calls**
    - Use `lodash.debounce` or custom debounce for inputs or search.
20. **Minimize Watchers and Reactive Overhead**
    - Avoid deeply nested reactive objects; prefer flat structures.
21. **Use Web Workers for Heavy Computation**
    - Offload large calculations or parsing to background threads.

---

## 🎨 **UI/UX Best Practices**

22. **Consistent Design System**
    - Use a UI framework like Vuetify, Element Plus, or Tailwind CSS for consistency.
23. **Dark Mode & Accessibility**
    - Add support for prefers-color-scheme and use semantic HTML for screen readers.
24. **Skeleton Loaders & Lazy Images**
    - Show skeletons or placeholders while loading data/images.
25. **Form Validation**
    - Use libraries like `vee-validate` + `yup` for robust schema-based validation.

---

## 🧪 **Testing**

26. **Unit Test Components**
    - Use `vitest` or `jest` with `@vue/test-utils`.
27. **E2E Testing**
    - Use Cypress or Playwright for user flow testing.
28. **Mock Store & API in Tests**
    - Isolate unit tests by mocking Pinia and Axios calls.

---

## 📦 **Reusable Utilities & API Layer**

29. **Use Axios with a Centralized API Service**
    - Create `api.js` or `/services/` layer to abstract and manage API calls.
30. **Error Handling Strategy**
    - Create a global error handler for Axios and Vue with user-friendly messages.
31. **Use Composables (`useXYZ.js`)**
    - Extract logic into reusable composables (`useUserAuth`, `useFetch`, etc.).

---

## 🧰 **Developer Experience**

32. **Linting and Formatting**
    - Use ESLint + Prettier with Vue plugin. Set up pre-commit hooks via Husky.
33. **Hot Module Replacement**
    - Use Vite for dev server and instant HMR.
34. **Meaningful Commit Messages**
    - Consider Conventional Commits or Gitmoji for structured history.
35. **Documentation with Storybook**
    - Use Storybook for documenting UI components.

---

## 🚀 **Production Readiness**

36. **Code Splitting & Tree Shaking**
    - Ensure unused code/components are removed in production builds.
37. **Preload Critical Resources**
    - Optimize font and asset loading for faster FCP (first contentful paint).
38. **Monitor and Analyze**
    - Use Lighthouse, Vue Devtools, and performance profiling tools.
39. **Security**
    - Sanitize all dynamic HTML, avoid XSS, CSRF.
    - Store JWT in secure cookies or localStorage (with refresh tokens).
40. **CI/CD Integration**
    - Automate lint/test/build with GitHub Actions, GitLab CI, or similar.

---

## 🧪 Local Preview/Testing (Folder-Only)

To preview all pages in this folder **without editing any files outside Application_Pages**:

1. In your main entry (e.g., main.js), temporarily import and mount `Application_Pages/LocalPreviewApp.vue` instead of the default App.vue:
   ```js
   import App from '../Application_Pages/LocalPreviewApp.vue'
   ```
2. Run your dev server as usual:
   ```sh
   cd frontend
   npm run dev
   ```
3. Visit these URLs to preview each page:
   - http://localhost:5173/test/dashboard
   - http://localhost:5173/test/pending
   - http://localhost:5173/test/waitlisted
   - http://localhost:5173/test/approved
   - http://localhost:5173/test/rejected
   - http://localhost:5173/test/rankings

You can now visually test all Application_Pages views in isolation, with no global code changes required. 