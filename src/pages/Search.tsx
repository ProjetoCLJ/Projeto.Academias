import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LoginDialog } from "@/components/LoginDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Dumbbell, Heart, Zap, Users, Trophy, Target, MapPin, Calendar, Plus, X, Clock } from "lucide-react";

interface DateSlot {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
}

const Search = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get("city") || "";

  const [selectedModality, setSelectedModality] = useState("");
  const [referenceAddress, setReferenceAddress] = useState("");
  const [selectedGyms, setSelectedGyms] = useState<string[]>([]);
  const [dateSlots, setDateSlots] = useState<DateSlot[]>([
    { id: 1, date: "", startTime: "", endTime: "", allDay: false }
  ]);
  const [showMultipleDates, setShowMultipleDates] = useState(false);

  const modalities = [
    { value: "musculacao", label: "Musculação", icon: Dumbbell },
    { value: "yoga", label: "Yoga", icon: Heart },
    { value: "crossfit", label: "CrossFit", icon: Zap },
    { value: "calistenia", label: "Calistenia", icon: Users },
    { value: "artes-marciais", label: "Artes Marciais", icon: Trophy },
    { value: "natacao", label: "Natação", icon: Target }
  ];

  const gyms = [
    { value: "academia-1", label: "Smart Fit - Zona Sul" },
    { value: "academia-2", label: "Bodytech - Paulista" },
    { value: "academia-3", label: "Bio Ritmo - Zona Oeste" },
    { value: "academia-4", label: "Bluefit - Centro" },
    { value: "academia-5", label: "Fórmula Academia - Zona Norte" },
    { value: "nenhuma", label: "Sem preferência" }
  ];

  useEffect(() => {
    if (!city) {
      navigate("/");
    }
  }, [city, navigate]);

  const addDateSlot = () => {
    const newId = Math.max(...dateSlots.map(slot => slot.id)) + 1;
    setDateSlots([...dateSlots, { id: newId, date: "", startTime: "", endTime: "", allDay: false }]);
  };

  const removeDateSlot = (id: number) => {
    if (dateSlots.length > 1) {
      setDateSlots(dateSlots.filter(slot => slot.id !== id));
    }
  };

  const updateDateSlot = (id: number, field: keyof DateSlot, value: string | boolean) => {
    setDateSlots(dateSlots.map(slot =>
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const toggleAllDay = (id: number) => {
    setDateSlots(dateSlots.map(slot =>
      slot.id === id ? { ...slot, allDay: !slot.allDay, startTime: "", endTime: "" } : slot
    ));
  };

  const toggleGymSelection = (gymValue: string) => {
    setSelectedGyms(prev => {
      if (prev.includes(gymValue)) {
        return prev.filter(g => g !== gymValue);
      }
      return [...prev, gymValue];
    });
  };


  const handleSearch = () => {
    if (!selectedModality || !dateSlots[0].date) {
      return;
    }

    const params = new URLSearchParams({
      city,
      modality: selectedModality,
      dates: JSON.stringify(dateSlots)
    });

    if (referenceAddress) {
      params.set('address', referenceAddress);
    }

    if (selectedGyms.length > 0) {
      params.set('gyms', JSON.stringify(selectedGyms));
    }

    navigate(`/trainers?${params.toString()}`);
  };

  const canSearch = selectedModality && dateSlots[0].date;

  return (
    <div className="min-h-screen bg-background">
      <Header onLoginClick={() => setLoginOpen(true)} />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3">
              Encontre seu <span className="bg-gradient-hero bg-clip-text text-transparent">Personal Trainer</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              em <span className="text-primary font-semibold">{city}</span>
            </p>
          </div>

          <Card className="p-8 shadow-medium">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="modality" className="text-base font-semibold flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-primary" />
                  Modalidade *
                </Label>
                <Select value={selectedModality} onValueChange={setSelectedModality}>
                  <SelectTrigger id="modality" className="h-12">
                    <SelectValue placeholder="Selecione a modalidade desejada" />
                  </SelectTrigger>
                  <SelectContent>
                    {modalities.map((modality) => (
                      <SelectItem key={modality.value} value={modality.value}>
                        <div className="flex items-center gap-2">
                          <modality.icon className="h-4 w-4" />
                          {modality.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Data{dateSlots.length > 1 ? 's' : ''} e Horário{dateSlots.length > 1 ? 's' : ''} *
                </Label>

                {dateSlots.map((slot, index) => (
                  <div key={slot.id} className="space-y-3 p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {dateSlots.length > 1 ? `Opção ${index + 1}` : 'Selecione a data'}
                      </span>
                      {dateSlots.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDateSlot(slot.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`date-${slot.id}`} className="text-sm">Data</Label>
                      <Input
                        id={`date-${slot.id}`}
                        type="date"
                        value={slot.date}
                        onChange={(e) => updateDateSlot(slot.id, 'date', e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`allday-${slot.id}`}
                          checked={slot.allDay}
                          onChange={() => toggleAllDay(slot.id)}
                          className="rounded border-input"
                        />
                        <Label htmlFor={`allday-${slot.id}`} className="text-sm font-normal cursor-pointer">
                          Dia inteiro (qualquer horário)
                        </Label>
                      </div>

                      {!slot.allDay && (
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor={`start-${slot.id}`} className="text-sm flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Hora início
                            </Label>
                            <Input
                              id={`start-${slot.id}`}
                              type="time"
                              value={slot.startTime}
                              onChange={(e) => updateDateSlot(slot.id, 'startTime', e.target.value)}
                              className="h-11"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`end-${slot.id}`} className="text-sm flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Hora fim
                            </Label>
                            <Input
                              id={`end-${slot.id}`}
                              type="time"
                              value={slot.endTime}
                              onChange={(e) => updateDateSlot(slot.id, 'endTime', e.target.value)}
                              className="h-11"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {!showMultipleDates && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowMultipleDates(true);
                      addDateSlot();
                    }}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar mais opções de data
                  </Button>
                )}

                {showMultipleDates && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addDateSlot}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar outra data
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-base font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Endereço de Referência
                </Label>
                <Input
                  id="address"
                  placeholder="Ex: Av. Paulista, 1000 - São Paulo"
                  value={referenceAddress}
                  onChange={(e) => setReferenceAddress(e.target.value)}
                  className="h-12"
                />
                <p className="text-sm text-muted-foreground">
                  Buscar professores próximos a este endereço (opcional)
                </p>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Academias Preferenciais
                </Label>
                <div className="space-y-2 p-4 border rounded-lg bg-muted/30 max-h-64 overflow-y-auto">
                  {gyms.map((gym) => (
                    <button
                      key={gym.value}
                      onClick={() => toggleGymSelection(gym.value)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                        selectedGyms.includes(gym.value)
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      {gym.label}
                    </button>
                  ))}
                </div>
                {selectedGyms.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedGyms.map((gymValue) => {
                      const gym = gyms.find(g => g.value === gymValue);
                      return gym ? (
                        <Badge key={gymValue} variant="secondary" className="text-xs">
                          {gym.label}
                          <button
                            onClick={() => toggleGymSelection(gymValue)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  Selecione uma ou mais academias (opcional)
                </p>
              </div>

              <div className="pt-4">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full h-14 text-lg"
                  onClick={handleSearch}
                  disabled={!canSearch}
                >
                  Buscar Professores
                </Button>
              </div>

              {!canSearch && (
                <p className="text-sm text-center text-muted-foreground">
                  Preencha a modalidade e pelo menos uma data para continuar
                </p>
              )}
            </div>
          </Card>

          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <h3 className="font-semibold mb-3">Por que essas informações?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>A modalidade nos ajuda a encontrar professores especializados no seu objetivo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>As datas e horários nos permitem mostrar apenas professores com disponibilidade nos períodos selecionados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>O endereço de referência ajuda a encontrar professores próximos a você</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>As academias preferenciais facilitam encontrar professores que atendem nos locais desejados</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
};

export default Search;
