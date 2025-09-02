import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('edoce-session')
    const isRootPath = request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/forgot-password'
  
    if (!sessionCookie?.value) {
      if (isRootPath) {
        return NextResponse.next()  
      }
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  
    let userInfo
    try {
      userInfo = JSON.parse(sessionCookie.value)
    } catch {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    if (!userInfo.token) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    if (isRootPath) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
}


export const config = {
    matcher: [
        '/dashboard/:path*',
        '/register/:path*',  
        '/',
        '/forgot-password',
    ]
}