export default defineNuxtRouteMiddleware((to, from) => {
    // Ensure this code only runs on the client
    if (process.client) {

        const accessToken = localStorage.getItem("accessToken");

        const role = localStorage.getItem("role")?.toLocaleLowerCase();
        const path = to.path?.toLocaleLowerCase();

        if (accessToken) {
            // Protect admin routes
            if (role === "admin") {
                return navigateTo(`/admin`);
            }

            // Protect developer routes
            if (role === "developer") {
                return navigateTo(`/developer`);
            }

            // Protect user dashboard routes
            if (role === "user") {
                return navigateTo(`/dashboard`);
            }
        }

    }
});
