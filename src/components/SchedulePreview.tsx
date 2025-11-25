import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface SchedulePreviewProps {
  date: string;
  slots: TimeSlot[];
}

export const SchedulePreview = ({ date, slots }: SchedulePreviewProps) => {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Horários disponíveis em {formatDate(date)}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {slots.slice(0, 4).map((slot, index) => (
          <div
            key={index}
            className={`text-xs px-3 py-2 rounded-md text-center ${
              slot.available
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {slot.start} - {slot.end}
          </div>
        ))}
      </div>
      {slots.length > 4 && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          +{slots.length - 4} horários disponíveis
        </p>
      )}
    </div>
  );
};
