# Swastik Kirana Store

## Current State
A single-page storefront with Navbar, Hero, Categories, Products, About, and Contact sections. The backend has full CRUD for products and categories (addProduct, updateProduct, deleteProduct, getProducts, getCategories, getStoreInfo). No admin panel or authentication exists yet.

## Requested Changes (Diff)

### Add
- Authorization component for admin login
- Admin panel page accessible at /admin route
- Product management UI: list all products, add new product form, edit product inline, delete product
- Category management: add/remove categories
- Admin login/logout button in Navbar

### Modify
- App.tsx: add routing to support /admin route
- Navbar: add admin login link
- ProductsSection: fetch products dynamically from backend

### Remove
- Nothing removed

## Implementation Plan
1. Select authorization component
2. Generate updated backend with authorization guards on write operations
3. Build frontend admin panel with product/category CRUD
4. Add routing (react-router or conditional render) for admin page
5. Wire auth login/logout to Navbar
