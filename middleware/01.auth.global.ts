export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useStrapiUser()
    const isLogin = to.path.includes('login')
    if (!user.value && !isLogin) {
        useCookie('redirect', { path: '/' }).value = to.fullPath

        return navigateTo('/login')
    } else if (user.value && isLogin) {
        return navigateTo('/')
    }
})