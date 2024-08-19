export { default } from "next-auth/middleware"

export const config = {
    matcher: [ "/companies/:path*", "/customers/:path*", "/tasks/:path*", "/faqs", "/analytics", "/api/:path*"]
}