"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const data = await fetch(`${process.env.API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(response => response.json())
    .catch(error => {
      return {
        success: false,
        message: error.message
      }
    })
  
  if (!data?.success) {
    return {
      success: false,
      message: data.message,
    }
  }

  const cookieStore = await cookies()
  
  // Em produção, usar JWT com secret seguro
  const sessionToken = JSON.stringify({ token: data.token })

  cookieStore.set("edoce-session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  })

  redirect("/dashboard")
}