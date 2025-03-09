export default defineNuxtRouteMiddleware((to, from) => {
  // Ensure this code only runs on the client
  if (process.client) {
    const accessToken = localStorage.getItem("accessToken");

    const role = localStorage.getItem("role")?.toLocaleLowerCase();
    const path = to.path?.toLocaleLowerCase();

    // Redirect to sign-in if no token is found
    if (!accessToken) {

      if (path.startsWith("/admin")) {
        return navigateTo("/admin/signin");
      }
      if (path.startsWith("/developer")) {
        return navigateTo("/admin/signin");
      }
      if (path.startsWith("/dashboard")) {
        return navigateTo("/signin");
      }
    }

    // Protect admin routes
    if (!path.startsWith("/admin") && role === "admin") {
      return navigateTo(`/admin`);
    }

     // Protect developer routes
     if (!path.startsWith("/developer") && role === "developer") {
      return navigateTo(`/developer`);
    }

    // Protect user dashboard routes
    if (!path.startsWith("/dashboard") && role === "user") {
      return navigateTo(`/dashboard`);
    }
  }
});
