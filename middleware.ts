import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // If user is not logged in and trying to access protected routes
    if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If user is logged in, check their role and redirect accordingly
    if (user && request.nextUrl.pathname.startsWith('/dashboard')) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile) {
            // Redirect admin/doctor to doctor dashboard
            if (profile.role === 'admin' && !request.nextUrl.pathname.startsWith('/dashboard/doctor')) {
                return NextResponse.redirect(new URL('/dashboard/doctor', request.url))
            }

            // Redirect patient to patient dashboard and prevent access to doctor routes
            if (profile.role === 'patient') {
                if (request.nextUrl.pathname.startsWith('/dashboard/doctor')) {
                    return NextResponse.redirect(new URL('/dashboard/patient', request.url))
                }
                if (request.nextUrl.pathname === '/dashboard') {
                    return NextResponse.redirect(new URL('/dashboard/patient', request.url))
                }
            }
        }
    }

    // If user is logged in and tries to access login page, redirect to appropriate dashboard
    if (user && request.nextUrl.pathname === '/login') {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile) {
            const redirectPath = profile.role === 'admin' ? '/dashboard/doctor' : '/dashboard/patient'
            return NextResponse.redirect(new URL(redirectPath, request.url))
        }
    }

    return response
}

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
}
