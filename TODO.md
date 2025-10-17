# TODO: Fix Cart User Separation

- [x] Modify cart.ts to use user-specific localStorage keys (include user ID in key, use guest key for non-logged users)
- [x] Add mergeCart function in cart.ts to transfer guest cart to user cart on login
- [x] Update auth.ts login function to call mergeCart after successful login
- [x] Testing skipped as per user request
