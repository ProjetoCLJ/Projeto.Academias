import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: number;
  studentName: string;
  date: string;
  startTime: string;
  endTime: string;
  gym: string;
  status: "confirmed" | "completed" | "cancelled";
  price: number;
}

const TrainerClasses = () => {
  const { toast } = useToast();
  const [bookings] = useState<Booking[]>([
    {
      id: 1,
      studentName: "Maria Fernanda",
      date: "2024-12-02",
      startTime: "08:00",
      endTime: "09:00",
      gym: "Smart Fit - Zona Sul",
      status: "confirmed",
      price: 150
    },
    {
      id: 2,
      studentName: "João Pedro",
      date: "2024-12-02",
      startTime: "14:00",
      endTime: "15:00",
      gym: "Smart Fit - Zona Sul",
      status: "confirmed",
      price: 150
    },
    {
      id: 3,
      studentName: "Beatriz Lima",
      date: "2024-11-28",
      startTime: "15:00",
      endTime: "16:00",
      gym: "Competition - Moema",
      status: "completed",
      price: 150
    },
    {
      id: 4,
      studentName: "Lucas Rodrigues",
      date: "2024-11-20",
      startTime: "09:00",
      endTime: "10:00",
      gym: "Smart Fit - Zona Sul",
      status: "completed",
      price: 150
    }
  ]);

  const confirmedClasses = bookings.filter(b => b.status === "confirmed");
  const completedClasses = bookings.filter(b => b.status === "completed");
  const cancelledClasses = bookings.filter(b => b.status === "cancelled");

  const markAsCompleted = (id: number) => {
    toast({
      title: "Aula confirmada!",
      description: "A aula foi marcada como realizada.",
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-primary/10 text-primary">Confirmada</Badge>;
      case "completed":
        return <Badge className="bg-green-500/10 text-green-600">Realizada</Badge>;
      case "cancelled":
        return <Badge variant="outline">Cancelada</Badge>;
      default:
        return null;
    }
  };

  const renderBookingCard = (booking: Booking, showActions: boolean = false) => (
    <Card key={booking.id} className="p-6 hover:shadow-medium transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{booking.studentName}</h3>
            {getStatusBadge(booking.status)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">R$ {booking.price.toFixed(2)}</div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
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
          <span>{booking.gym}</span>
        </div>
      </div>

      {showActions && booking.status === "confirmed" && (
        <div className="mt-4 pt-4 border-t flex gap-2">
          <Button
            onClick={() => markAsCompleted(booking.id)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar como Realizada
          </Button>
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">{confirmedClasses.length}</div>
            <div className="text-sm text-muted-foreground">Aulas Agendadas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-1">{completedClasses.length}</div>
            <div className="text-sm text-muted-foreground">Aulas Realizadas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-muted-foreground mb-1">{cancelledClasses.length}</div>
            <div className="text-sm text-muted-foreground">Aulas Canceladas</div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="confirmed" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="confirmed">Agendadas ({confirmedClasses.length})</TabsTrigger>
          <TabsTrigger value="completed">Realizadas ({completedClasses.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Canceladas ({cancelledClasses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="confirmed" className="space-y-4 mt-6">
          {confirmedClasses.length > 0 ? (
            confirmedClasses.map(booking => renderBookingCard(booking, true))
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">Nenhuma aula agendada</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedClasses.length > 0 ? (
            completedClasses.map(booking => renderBookingCard(booking))
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">Nenhuma aula realizada</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4 mt-6">
          {cancelledClasses.length > 0 ? (
            cancelledClasses.map(booking => renderBookingCard(booking))
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">Nenhuma aula cancelada</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainerClasses;
