"use client"
import { Candy } from "lucide-react"
import LoginForm from "./login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Candy className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Doce Loja</h1>
            <p className="text-muted-foreground text-balance">Crie sua loja de doces artesanais</p>
          </div>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <a href="/register" className="text-secondary hover:text-secondary/80 font-medium transition-colors">
              Crie uma aqui!
            </a>
          </p>

          <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
