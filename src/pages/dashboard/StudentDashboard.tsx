import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dumbbell, User, LogOut, Calendar, History } from "lucide-react";
import { Link } from "react-router-dom";
import StudentProfile from "@/components/dashboard/student/StudentProfile";
import StudentBookings from "@/components/dashboard/student/StudentBookings";
import StudentHistory from "@/components/dashboard/student/StudentHistory";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("bookings");

  if (!user || user.userType !== "student") {
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
                  <DropdownMenuItem onClick={() => setActiveTab("bookings")}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendamentos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("history")}>
                    <History className="h-4 w-4 mr-2" />
                    Histórico
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
          <h1 className="text-3xl font-bold">Painel do Aluno</h1>
          <p className="text-muted-foreground">Bem-vindo, {user.profile.fullName}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid mb-8">
            <TabsTrigger value="bookings" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Agendamentos</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Histórico</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <StudentBookings />
          </TabsContent>

          <TabsContent value="history">
            <StudentHistory />
          </TabsContent>

          <TabsContent value="profile">
            <StudentProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
