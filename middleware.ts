import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define protected routes
const protectedRoutes = createRouteMatcher([
  "/",
  "/upcoming",
  "/previous",
  "/recordings",
  "/personal-room",
  "/meeting(.*)",// Use wildcard instead of capturing group
])

// Middleware configuration
export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) await auth.protect()
})

// Middleware matcher configuration
export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
    // Always run for API routes
    '/(api|trpc)(.*)',
    
    // Explicitly include routes to be checked
    '/(upcoming|previous|recordings|personal-room|meeting*)',
  ],
}