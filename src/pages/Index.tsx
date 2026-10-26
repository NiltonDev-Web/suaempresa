import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Menu, X, Scale, Wrench, Package, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageGallery } from "@/components/ImageGallery";
import heroImage from "@/assets/hero-truck-scale.jpg";
import partsImage from "@/assets/padroes.jpg";
import calibrationImage from "@/assets/calibration-service.png";
import scalesImage from "@/assets/diversos-tipos-balanca.jpg";
import galleryMaintenance from "@/assets/diversos.jpg";
import galleryWeights from "@/assets/calibracao-precisa.jpg";
import galleryWarehouse from "@/assets/sistema-pesagem.jpg";
import galleryDisplay from "@/assets/gallery-display.jpg";
import galleryPlatform from "@/assets/gallery-platform.jpg";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string[]>>({});
  const [surveyName, setSurveyName] = useState("");
  const [surveyEmail, setSurveyEmail] = useState("");
  const [surveySubmitting, setSurveySubmitting] = useState(false);
  const { toast } = useToast();

  const surveyQuestions = [
    {
      id: "interesse",
      question: "Qual serviço mais lhe interessa?",
      options: ["Calibração", "Manutenção Preventiva", "Venda de Peças", "Consultoria Técnica"],
    },
    {
      id: "frequencia",
      question: "Com que frequência você calibra seus equipamentos?",
      options: ["Mensal", "Trimestral", "Semestral", "Anual", "Nunca calibrei"],
    },
    {
      id: "equipamento",
      question: "Qual tipo de equipamento você utiliza?",
      options: ["Balança de bancada", "Balança de piso", "Balança rodoviária", "Instrumentos analíticos", "Outros"],
    },
    {
      id: "urgencia",
      question: "Qual sua necessidade atual?",
      options: ["Urgente (preciso agora)", "Em breve (próximos 30 dias)", "Planejando para o futuro", "Apenas pesquisando"],
    },
    {
      id: "avaliacao",
      question: "Como você avalia nossa página?",
      options: ["Excelente", "Boa", "Regular", "Precisa melhorar"],
    },
    {
      id: "sugestao",
      question: "O que mais gostaria de ver em nossos serviços?",
      options: ["Atendimento 24h", "Planos mensais", "Loja online de peças", "App de acompanhamento", "Treinamentos"],
    },
  ];

  const handleSurveyAnswer = (questionId: string, answer: string) => {
    setSurveyAnswers((prev) => {
      const current = prev[questionId] || [];
      if (current.includes(answer)) {
        return { ...prev, [questionId]: current.filter((a) => a !== answer) };
      }
      return { ...prev, [questionId]: [...current, answer] };
    });
  };

  const handleSurveySubmit = async () => {
    if (!surveyName || !surveyEmail) {
      toast({ title: "Preencha seu nome e e-mail antes de enviar.", variant: "destructive" });
      return;
    }
    if (Object.values(surveyAnswers).every((a) => a.length === 0)) {
      toast({ title: "Responda pelo menos uma pergunta.", variant: "destructive" });
      return;
    }

    setSurveySubmitting(true);

    const respostasTexto = surveyQuestions
      .filter((q) => surveyAnswers[q.id]?.length > 0)
      .map((q) => `${q.question} → ${surveyAnswers[q.id].join(", ")}`)
      .join("\n");

    const dataToSubmit = {
      access_key: "1557417f-44fb-4e9b-baa8-32fc0be8c2c8",
      subject: "Nova Enquete Recebida - SUA EMPRESA",
      from_name: surveyName,
      name: surveyName,
      email: surveyEmail,
      message: `RESPOSTAS DA ENQUETE:\n\n${respostasTexto}`,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(dataToSubmit),
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: "Enquete enviada com sucesso! Obrigado pela sua opinião." });
        setSurveyAnswers({});
        setSurveyName("");
        setSurveyEmail("");
      } else {
        toast({ title: "Erro ao enviar. Tente novamente.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro de conexão.", variant: "destructive" });
    } finally {
      setSurveySubmitting(false);
    }
  };

  const galleryImages = [
    { src: heroImage, alt: "Balança rodoviária com caminhão", title: "Balanças Rodoviárias (Em desenvolvimento)" },
    { src: scalesImage, alt: "Variedade de balanças industriais", title: "Diversos Tipos de Balanças" },
    { src: galleryMaintenance, alt: "Manutenção de balança industrial", title: "Calibrações de Instrumentos Analiticos" },
    { src: galleryWeights, alt: "Peso de calibração em balança digital", title: "Calibração de Precisão" },
    { src: galleryWarehouse, alt: "Balanças de piso em galpão industrial", title: "Sistemas de Pesagem Personalizados" },
    { src: partsImage, alt: "Pesos Padrões Certificados para balanças", title: "Pesos Padrões Certificados" },
    { src: galleryDisplay, alt: "Display digital de balança", title: "Displays Digitais" },
    { src: galleryPlatform, alt: "Plataforma de balança com células de carga", title: "Células de Carga" },
    { src: calibrationImage, alt: "Técnico calibrando balança", title: "Calibração Certificada" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Impede a página de recarregar

  // 1. Criamos um objeto com os dados e sua Chave de Acesso
  const dataToSubmit = {
    ...formData,
    access_key: "1557417f-44fb-4e9b-baa8-32fc0be8c2c8" // Pegue uma em web3forms.com
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    });

    const result = await response.json();

    if (result.success) {
      alert("Mensagem enviada com sucesso!");
      setFormData({ name: "", email: "", phone: "", message: "" }); // Limpa o form
    } else {
      alert("Erro ao enviar. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro de conexão.");
  }
};

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="h-15 w-20 text-primary" />
              <span className="text-2xl font-bold text-foreground">SUA EMPRESA DE MANUTENÇÃO E CALIBRAÇÃO</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection("servicos")} className="text-foreground hover:text-primary transition-colors">
                Serviços
              </button>
              <button onClick={() => scrollToSection("produtos")} className="text-foreground hover:text-primary transition-colors">
                Produtos
              </button>
              <button onClick={() => scrollToSection("precos")} className="text-foreground hover:text-primary transition-colors">
                Preços
              </button>
              <button onClick={() => scrollToSection("enquete")} className="text-foreground hover:text-primary transition-colors">
                Enquete
              </button>
              <button onClick={() => scrollToSection("contato")} className="text-foreground hover:text-primary transition-colors">
                Contato
              </button>
              <Button onClick={() => scrollToSection("contato")}>Solicitar Orçamento</Button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <button onClick={() => scrollToSection("servicos")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">
                Serviços
              </button>
              <button onClick={() => scrollToSection("produtos")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">
                Produtos
              </button>
              <button onClick={() => scrollToSection("precos")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">
                Preços
              </button>
              <button onClick={() => scrollToSection("enquete")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">
                Enquete
              </button>
              <button onClick={() => scrollToSection("contato")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">
                Contato
              </button>
              <Button onClick={() => scrollToSection("contato")} className="w-full">Solicitar Orçamento</Button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Caminhão em balança rodoviária" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-background">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Manutenção e Calibração de Balanças e Instrumentos Industriais
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-background/90">
              Serviços especializados para balanças de todos os tamanhos e instrumentos. Precisão e confiabilidade garantidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => scrollToSection("contato")} className="bg-primary hover:bg-primary/90">
                Solicitar Orçamento
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("servicos")} className="bg-background/20 backdrop-blur-sm border-background text-background hover:bg-background/30">
                Nossos Serviços
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Nossos Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Soluções completas e na medida certa, para sua empresa, conserto, manutenção e calibração.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Wrench className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Manutenção Preventiva</CardTitle>
                <CardDescription>
                  Manutenção regular para garantir o funcionamento perfeito de seus instrumentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Inspeção completa dos equipamentos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Limpeza e ajustes técnicos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Relatório detalhado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Controle e Gerenciamento das Manutenção</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Scale className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Calibração Certificada</CardTitle>
                <CardDescription>
                  Calibração com padrões certificados rastreável ao INMETRO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Calibração com padrões certificados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Certificado de calibração</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Laboratorio movel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Atendimento em todo Brasil</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Venda de Peças</CardTitle>
                <CardDescription>
                  Peças originais e compatíveis para todas as marcas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Células de carga e acessórios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Indicadores digitais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Plataformas e acessórios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span> E outros</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Gallery */}
      <section id="produtos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Galeria de Equipamentos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Confira nossos equipamentos, serviços e peças em detalhes. Clique nas imagens para ampliar.
            </p>
          </div>

          <ImageGallery images={galleryImages} />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Preços Competitivos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Valores justos e transparentes para cada tipo de serviço
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Calibração Básica</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-primary">Entre em contato</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Balanças até 500kg</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Certificado de calibração</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Validade de 12 meses</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline" onClick={() => scrollToSection("contato")}>
                  Solicitar Orçamento
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-primary border-2 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Mais Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Manutenção Completa</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-primary">Entre em contato</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Manutenção preventiva</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Calibração certificada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Relatório técnico completo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Garantia de 6 meses</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" onClick={() => scrollToSection("contato")}>
                  Solicitar Orçamento
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Balanças Rodoviárias (Em desenvolvimento)</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-primary">Sob Consulta</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Calibração in loco</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Certificado Rastreado a RBC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Manutenção especializada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Atendimento emergencial</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline" onClick={() => scrollToSection("contato")}>
                  Solicitar Orçamento
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Survey Section */}
      <section id="enquete" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Sua Opinião Importa!</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Responda nossa enquete rápida com apenas um clique por pergunta. Suas respostas nos ajudam a melhorar nossos serviços.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Input
                placeholder="Seu nome"
                value={surveyName}
                onChange={(e) => setSurveyName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Seu e-mail"
                value={surveyEmail}
                onChange={(e) => setSurveyEmail(e.target.value)}
              />
            </div>

            {surveyQuestions.map((q) => (
              <Card key={q.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{q.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((option) => (
                      <Button
                        key={option}
                        variant={surveyAnswers[q.id]?.includes(option) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSurveyAnswer(q.id, option)}
                        className="transition-all"
                      >
                        {surveyAnswers[q.id]?.includes(option) && (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="text-center pt-4">
              <Button
                size="lg"
                onClick={handleSurveySubmit}
                disabled={surveySubmitting}
                className="min-w-[200px]"
              >
                {surveySubmitting ? "Enviando..." : "Enviar Respostas"}
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                {Object.values(surveyAnswers).filter((a) => a.length > 0).length} de {surveyQuestions.length} perguntas respondidas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Entre em Contato</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estamos prontos para atender sua empresa com excelência que você merece.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <img src={calibrationImage} alt="Serviço de calibração" className="rounded-lg shadow-xl mb-8" />
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Telefone</h3>
                    <p className="text-muted-foreground">(00) 00000-0000</p>
                    
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">E-mail</h3>
                    <p className="text-muted-foreground">suaempresa@nstecnologias.com.br</p>
                    
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Endereço</h3>
                    <p className="text-muted-foreground">Campina Grande - PB</p>
                    
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Solicite um Orçamento</CardTitle>
                <CardDescription>Preencha o formulário e entraremos em contato</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Telefone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Descreva sua solicitação..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">SUA EMPRESA</span>
              </div>
              <p className="text-background/80">
                Especialistas em manutenção, calibração e venda de peças para balanças industriais.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Serviços</h3>
              <ul className="space-y-2 text-background/80">
                <li>Manutenção Preventiva</li>
                <li>Calibração Certificada</li>
                <li>Venda de Peças</li>
                <li>Consultoria Técnica</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Produtos</h3>
              <ul className="space-y-2 text-background/80">
                <li>Balanças Industriais</li>
                <li>Balanças Rodoviárias (Em desenvolvimento)</li>
                <li>Células de carga e acessórios</li>
                <li>Indicadores Digitais</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contato</h3>
              <ul className="space-y-2 text-background/80">
                <li>(81) 99165-4555</li>
                <li>contato@nstecnologias.com.br</li>
                <li>Seg - Sexta: 7:30h às 17:30h</li>
                <li>Campina Grande - PB</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2026 SUA EMPRESA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
