import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const TrainerProfile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "Carlos Silva",
    email: "carlos.silva@email.com",
    phone: "(11) 99999-0001",
    cref: "123456-G/SP",
    experienceYears: "8",
    description: "Personal trainer especializado em musculação e hipertrofia.",
    objectives: "Ajudar pessoas a alcançarem seus objetivos de forma saudável.",
    instagram: "@carlossilvafit",
    facebook: "",
    linkedin: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Informações Pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cref">CREF</Label>
            <Input
              id="cref"
              value={formData.cref}
              onChange={(e) => handleChange("cref", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceYears">Anos de Experiência</Label>
            <Input
              id="experienceYears"
              type="number"
              value={formData.experienceYears}
              onChange={(e) => handleChange("experienceYears", e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Informações Profissionais</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição Profissional</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectives">Objetivos</Label>
            <Textarea
              id="objectives"
              value={formData.objectives}
              onChange={(e) => handleChange("objectives", e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Redes Sociais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              placeholder="@seuinstagram"
              value={formData.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              placeholder="facebook.com/seuperfil"
              value={formData.facebook}
              onChange={(e) => handleChange("facebook", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              placeholder="linkedin.com/in/seuperfil"
              value={formData.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} variant="hero" size="lg">
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default TrainerProfile;
