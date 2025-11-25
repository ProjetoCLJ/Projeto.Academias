import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"student" | "trainer">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    try {
      await login(email, password, userType);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente",
        variant: "destructive"
      });
    }
  };

  const handleSignupRedirect = () => {
    onOpenChange(false);
    navigate(userType === "trainer" ? "/register/trainer" : "/register/student");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Bem-vindo ao FitConnect
          </DialogTitle>
          <DialogDescription>
            Entre com sua conta ou crie uma nova para começar
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="signup">Cadastrar</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Usuário</Label>
                <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "student" | "trainer")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="cursor-pointer">Aluno</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trainer" id="trainer" />
                    <Label htmlFor="trainer" className="cursor-pointer">Professor</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" variant="hero" size="lg">
                Entrar
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-2">
              <Label>Eu sou...</Label>
              <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "student" | "trainer")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="signup-student" />
                  <Label htmlFor="signup-student" className="cursor-pointer">Aluno - Quero encontrar um personal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="trainer" id="signup-trainer" />
                  <Label htmlFor="signup-trainer" className="cursor-pointer">Professor - Quero oferecer meus serviços</Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={handleSignupRedirect} className="w-full" variant="hero" size="lg">
              Continuar Cadastro
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
