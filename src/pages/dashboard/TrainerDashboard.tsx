import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dumbbell, User, LogOut, Calendar, DollarSign, BookOpen, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import TrainerProfile from "@/components/dashboard/trainer/TrainerProfile";
import TrainerSchedule from "@/components/dashboard/trainer/TrainerSchedule";
import TrainerPricing from "@/components/dashboard/trainer/TrainerPricing";
import TrainerClasses from "@/components/dashboard/trainer/TrainerClasses";
import TrainerEarnings from "@/components/dashboard/trainer/TrainerEarnings";

const TrainerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("classes");

  if (!user || user.userType !== "trainer") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-soft group-hover:shadow-medium transition-smooth">
                <Dumbbell className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                FitConnect
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-foreground/80 hover:text-foreground transition-smooth">
                Início
              </Link>
              <Link to="/trainers" className="text-foreground/80 hover:text-foreground transition-smooth">
                Encontrar Personal
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profile.profileImageUrl} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {user.profile.fullName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user.profile.fullName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-3 border-b">
                    <p className="font-semibold">{user.profile.fullName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("schedule")}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Agenda
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("pricing")}>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Preços
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("classes")}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Aulas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("earnings")}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Faturamento
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Painel do Professor</h1>
          <p className="text-muted-foreground">Bem-vindo, {user.profile.fullName}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid mb-8">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Agenda</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Preços</span>
            </TabsTrigger>
            <TabsTrigger value="classes" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Aulas</span>
            </TabsTrigger>
            <TabsTrigger value="earnings" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Faturamento</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <TrainerProfile />
          </TabsContent>

          <TabsContent value="schedule">
            <TrainerSchedule />
          </TabsContent>

          <TabsContent value="pricing">
            <TrainerPricing />
          </TabsContent>

          <TabsContent value="classes">
            <TrainerClasses />
          </TabsContent>

          <TabsContent value="earnings">
            <TrainerEarnings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TrainerDashboard;
