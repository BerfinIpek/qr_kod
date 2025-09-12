# Copilot Instructions for QR_STOK_KONTROL_SISTEMI

## Project Overview
- **Monorepo** with two main components:
  - **Backend**: Laravel (PHP) app in `Backend/QRStokKontrolSistemi/`
  - **Frontend**: Vue 3 + Vite app in `Frontend/`
- The system manages QR-based stock control, with the backend providing APIs and the frontend as the user interface.

## Key Architecture & Patterns
- **Backend**
  - Follows standard Laravel structure: `app/Http/Controllers`, `app/Models`, `routes/api.php` for API endpoints.
  - Uses Eloquent ORM for database access (`app/Models`).
  - API routes are defined in `routes/api.php`.
  - Configuration in `config/`, environment via `.env` (not in repo).
  - Tests in `tests/Feature` and `tests/Unit`.
- **Frontend**
  - Vue 3 SFCs (`src/components/`, `src/views/`).
  - Routing via `src/router/index.js`.
  - State management in `src/stores/` (Pinia or Vuex, check `auth.js`).
  - API calls via Axios plugin (`src/plugins/axios.js`).
  - Styles in `src/style.css`, Tailwind config in root.

## Developer Workflows
- **Backend**
  - Install dependencies: `composer install`
  - Run migrations: `php artisan migrate`
  - Run tests: `php artisan test` or `vendor\bin\phpunit`
  - Serve locally: `php artisan serve`
- **Frontend**
  - Install dependencies: `npm install`
  - Start dev server: `npm run dev`
  - Build for production: `npm run build`

## Conventions & Integration
- **API communication**: Frontend talks to backend via REST API endpoints (see `routes/api.php`).
- **Authentication**: Likely JWT or Laravel Sanctum (check `config/jwt.php` or `config/auth.php`).
- **Custom logic**: Place new backend logic in `app/Http/Controllers` and `app/Models`.
- **Frontend**: Use `src/plugins/axios.js` for all HTTP requests; keep UI logic in `views/`, reusable elements in `components/`.
- **Testing**: Place backend tests in `tests/Feature` or `tests/Unit`.

## Examples
- Add a new API: Create a controller in `app/Http/Controllers`, add route in `routes/api.php`.
- Add a new page: Create a Vue file in `src/views/`, add route in `src/router/index.js`.

## References
- Backend: `Backend/QRStokKontrolSistemi/README.md`
- Frontend: `Frontend/README.md`
- Key configs: `config/`, `src/plugins/axios.js`, `src/router/index.js`

---
Update this file if you introduce new workflows, conventions, or major dependencies.
