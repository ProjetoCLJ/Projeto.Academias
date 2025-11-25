import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const TrainerSchedule = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: 1, startTime: "08:00", endTime: "09:00", isBooked: false },
    { id: 2, startTime: "09:00", endTime: "10:00", isBooked: false },
    { id: 3, startTime: "14:00", endTime: "15:00", isBooked: true },
    { id: 4, startTime: "15:00", endTime: "16:00", isBooked: false },
  ]);
  const [newSlotStart, setNewSlotStart] = useState("");
  const [newSlotEnd, setNewSlotEnd] = useState("");

  const addTimeSlot = () => {
    if (!newSlotStart || !newSlotEnd) {
      toast({
        title: "Erro",
        description: "Preencha os horários de início e fim",
        variant: "destructive"
      });
      return;
    }

    const newSlot: TimeSlot = {
      id: Math.max(...timeSlots.map(s => s.id)) + 1,
      startTime: newSlotStart,
      endTime: newSlotEnd,
      isBooked: false
    };

    setTimeSlots([...timeSlots, newSlot]);
    setNewSlotStart("");
    setNewSlotEnd("");

    toast({
      title: "Horário adicionado!",
      description: "Novo horário disponível na sua agenda.",
    });
  };

  const removeTimeSlot = (id: number) => {
    const slot = timeSlots.find(s => s.id === id);
    if (slot?.isBooked) {
      toast({
        title: "Erro",
        description: "Não é possível remover um horário com agendamento",
        variant: "destructive"
      });
      return;
    }

    setTimeSlots(timeSlots.filter(s => s.id !== id));
    toast({
      title: "Horário removido",
      description: "Horário removido da sua agenda.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Agenda atualizada!",
      description: "Suas alterações foram salvas com sucesso.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <Card className="lg:col-span-5 p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-primary" />
          Selecione a Data
        </h2>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={ptBR}
          className="rounded-md border"
        />
      </Card>

      <div className="lg:col-span-7 space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            Horários de {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR }) : "hoje"}
          </h2>

          <div className="space-y-4 mb-6">
            {timeSlots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-soft transition-smooth"
              >
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">
                    {slot.startTime} - {slot.endTime}
                  </span>
                  {slot.isBooked && (
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Agendado
                    </Badge>
                  )}
                </div>
                {!slot.isBooked && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTimeSlot(slot.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Adicionar Novo Horário</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Início</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={newSlotStart}
                  onChange={(e) => setNewSlotStart(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">Fim</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={newSlotEnd}
                  onChange={(e) => setNewSlotEnd(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={addTimeSlot} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Horário
            </Button>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} variant="hero" size="lg">
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainerSchedule;
