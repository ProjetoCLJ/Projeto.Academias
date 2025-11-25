import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, User, MessageCircle, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Booking {
  id: number;
  trainerName: string;
  trainerPhoto?: string;
  date: string;
  startTime: string;
  endTime: string;
  gym: string;
  gymAddress: string;
  status: "confirmed" | "pending";
  price: number;
}

const StudentBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      trainerName: "Carlos Silva",
      date: "2024-12-02",
      startTime: "08:00",
      endTime: "09:00",
      gym: "Smart Fit - Zona Sul",
      gymAddress: "Av. Ibirapuera, 1000",
      status: "confirmed",
      price: 150
    },
    {
      id: 2,
      trainerName: "Ana Santos",
      date: "2024-12-05",
      startTime: "17:00",
      endTime: "18:00",
      gym: "Bodytech - Paulista",
      gymAddress: "Av. Paulista, 2000",
      status: "confirmed",
      price: 180
    },
    {
      id: 3,
      trainerName: "Roberto Costa",
      date: "2024-12-08",
      startTime: "18:00",
      endTime: "19:00",
      gym: "Bluefit - Centro",
      gymAddress: "R. Augusta, 800",
      status: "pending",
      price: 140
    }
  ]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(date);
    bookingDate.setHours(0, 0, 0, 0);

    if (bookingDate.getTime() === today.getTime()) {
      return "Hoje";
    }

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (bookingDate.getTime() === tomorrow.getTime()) {
      return "Amanhã";
    }

    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  };

  const isToday = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const cancelBooking = (id: number) => {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
      setBookings(bookings.filter(b => b.id !== id));
      toast({
        title: "Aula cancelada",
        description: "Sua aula foi cancelada com sucesso. O professor foi notificado.",
      });
    }
  };

  const sendMessage = (trainerName: string) => {
    toast({
      title: "Mensagem enviada",
      description: `Mensagem enviada para ${trainerName}.`,
    });
  };

  const todayClasses = bookings.filter(b => isToday(b.date));
  const upcomingClasses = bookings.filter(b => !isToday(b.date));

  return (
    <div className="space-y-6">
      {todayClasses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Aulas de Hoje</h2>
          <div className="space-y-4">
            {todayClasses.map((booking) => (
              <Card key={booking.id} className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarImage src={booking.trainerPhoto} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                        {booking.trainerName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-xl">{booking.trainerName}</h3>
                      <Badge className="mt-1 bg-primary/10 text-primary">Aula de Hoje</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">R$ {booking.price.toFixed(2)}</div>
                  </div>
                </div>

                <Alert className="mb-4 border-primary/20 bg-primary/5">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-primary">
                    Lembre-se: Sua aula começa às {booking.startTime}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{booking.startTime} - {booking.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{booking.gym}</div>
                        <div className="text-muted-foreground">{booking.gymAddress}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => sendMessage(booking.trainerName)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-4">Próximas Aulas</h2>
        <div className="space-y-4">
          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((booking) => (
              <Card key={booking.id} className="p-6 hover:shadow-medium transition-smooth">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                      <AvatarImage src={booking.trainerPhoto} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {booking.trainerName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{booking.trainerName}</h3>
                      <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>
                        {booking.status === "confirmed" ? "Confirmada" : "Pendente"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">R$ {booking.price.toFixed(2)}</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(booking.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{booking.startTime} - {booking.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <div>
                      <div className="font-medium text-foreground">{booking.gym}</div>
                      <div>{booking.gymAddress}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => sendMessage(booking.trainerName)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Mensagem
                  </Button>
                  <Button
                    onClick={() => cancelBooking(booking.id)}
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">Você não tem aulas agendadas</p>
              <Button variant="hero">Buscar Professores</Button>
            </Card>
          )}
        </div>
      </div>

      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold mb-3">Política de Cancelamento</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Cancelamentos com mais de 24h de antecedência: reembolso total</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Cancelamentos com menos de 24h: sem reembolso</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Em caso de emergência, entre em contato com o professor</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default StudentBookings;
