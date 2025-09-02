"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { loginUser } from "@/utils/api/user"
import { useMutation } from "@tanstack/react-query";


export default function LoginForm(){
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string 
  } | null>(null)

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (formData: FormData) => {
      setIsLoading(true)
     const loginResponse = await loginUser(formData)
      setResult(loginResponse)
    },
    onSuccess: () => {
      setIsLoading(false)
    }
  });

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <h2 className="text-xl font-semibold text-center text-foreground">Faça seu login</h2>
        <p className="text-sm text-muted-foreground text-center">Entre na sua conta para gerenciar sua loja</p>
      </CardHeader>
      <CardContent>
        <form action={mutation.mutate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Digite seu email"
                className="pl-10 bg-input border-border focus:ring-ring"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="pl-10 pr-10 bg-input border-border focus:ring-ring"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input id="remember" type="checkbox" className="rounded border-border text-primary focus:ring-ring" />
              <Label htmlFor="remember" className="text-sm text-muted-foreground">
                Lembrar de mim
              </Label>
            </div>
            <a href="/forgot-password" className="text-sm text-secondary hover:text-secondary/80 transition-colors">
              Esqueceu a senha?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        {result && (
              <div
                className={`mt-4 p-3 rounded-lg text-sm ${
                  result.success
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                {result.message}
              </div>
            )}
      </CardContent>
    </Card>
  )
}