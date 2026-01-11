import { useState } from "react"
import { Header } from "../components/header/Header"
import { Card } from "../components/card/Card-simple"
import LoadingModal from "../components/modals/Loanding-modal"
import MessageFormModal from "../components/modals/MessageFormModal"
import { Toast } from "../components"
import { Send } from 'lucide-react'
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getTotalEmails, getTotalMessages, getTotalReceptors, getTotalWarnings } from "../repository"
import { useUserStore } from "../../stores/user"
import { useNavigate } from "react-router"


type ToastType = "success" | "error";

export interface User {
  id: number;
  email: string;
  name?: string | null;
  created_at: string;   // ISO string no front
  updated_at: string;   // ISO string
  phone?: string | null;
  warnings_preferences: string;
  role: 'user' | 'admin' | string;
  warning_logs_sent?: WarningLogSent[];
}

export interface WarningLogSent {
  id: number;
  warningId: number;
  user_id: number;
  sent_at: string;     // ou Date
  channel: string;
  created_at: string; // ou Date
  user?: User;
  warning?: Warning;
}

export interface Warning {
  id: number;
  status: string;
  message: string;
  name: string;
  created_at: string; // ou Date, dependendo do fetch
  warning_logs_sent?: WarningLogSent[];
}

export interface ToastProps {
  type?: ToastType;
  title?: string;
  message?: string;
  duration?: number; // ms
}

export interface SendEmailPros {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
  recipient_id: number;
  from_email: string;
  from_name: string;
  warning_id: number;
}

const menus_selecao = [
  "campanhas",
  "mensagens"
];

export default function DashboardAdmin() {
  const [isLoanding, setIsLoading] = useState(false);
  const { user } = useUserStore();
  const [campaign_info, setCampaignInfo] = useState({
    message: "",
    channel: "sms",
    name: ""
  });
  const navigate = useNavigate();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(menus_selecao[0]);

  const {
    data: totalCampaigns
  } = useQuery({
    queryKey: ['total_warnings'],
    queryFn: async () => {
      return await getTotalWarnings();
    }
  });

  const {
    data: smsCampaigns
  } = useQuery({
    queryKey: ['total_warnings_meessages'],
    queryFn: async () => {
      return await getTotalMessages();
    }
  });

  const {
    data: emailCampaigns
  } = useQuery({
    queryKey: ['total_warnings_email'],
    queryFn: async () => {
      return await getTotalEmails()
    }
  });

  const {
    data: totalReceptors
  } = useQuery({
    queryKey: ["receptors_registered"],
    queryFn: async () => {
      return await getTotalReceptors();
    },
  })

  const ambiente = import.meta.env.VITE_AMBIENTE_API;

  const [toastInfo, setToastInfo] = useState<ToastProps>({
    duration: 3000,
    message: "",
    title: "",
    type: 'success'
  });

  const fetchCampaigns = async (pageParam: number): Promise<Warning[]> => {
    const response = await fetch(`${ambiente}/warnings/get-all`);
    return response.json();
  }
  const fetchMessages = async (pageParam: number): Promise<WarningLogSent[]> => {
    const response = await fetch(`${ambiente}/warnings_logs/get-all`);
    return response.json();
  }
  const {
    data: data_campaigns,
  } = useQuery({
    queryKey: ['data', 'campanhas'],
    queryFn: async () => {
      return await fetchCampaigns(3)
    },
    retry: 2,
    enabled: selectedMenu === 'campanhas',
    placeholderData: keepPreviousData,
  })


  const {
    data: data_messages,
  } = useQuery({
    queryKey: ['data', 'mensagens'],
    queryFn: async () => {
      return await fetchMessages(3)
    },
    retry: 2,
    enabled: selectedMenu === 'mensagens',
    placeholderData: keepPreviousData,
  })


  const handleIniciarCampanha = async (campaign?: { message: string; channel: string; name?: string; title?: string }) => {
    const campaignToSend = campaign ?? campaign_info;
    const objt_warning_to_create = {
      status: "created",
      message: campaignToSend.message,
      channel: campaignToSend.channel,
      // backend expects `title` to populate Warnings.name; prefer explicit title, then name, then a short message fallback
      title: (campaignToSend as any).title ?? campaignToSend.name ?? (campaignToSend.message || '').slice(0, 30),
    };
    setIsLoading(true);
    try {
      const response = await fetch(`${ambiente}/warnings/create`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objt_warning_to_create)
      })

      if (!response.ok) {
        setToastInfo({
          duration: 5000,
          message: "Erro ao iniciar campanha. Tente novamente mais tarde.",
          title: "Erro",
          type: "error"
        });
        setToastOpen(true);
        return;
      } else {
        setToastInfo({
          duration: 5000,
          message: "Sucesso ao iniciar campanha",
          title: "Sucesso",
          type: "success"
        });
        setToastOpen(true);
        return;
      }

      //toast de sucesso
    } catch (error) {
      console.error("Erro ao iniciar campanha:", error);
      setToastInfo({
        duration: 5000,
        message: "Erro ao iniciar campanha. Tente novamente mais tarde.",
        title: "Erro",
        type: "error"
      });
      setToastOpen(true);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  const sendEmail = async (item_info: SendEmailPros) => {
    try {
      const response = fetch(`${ambiente}/emails/send/email`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item_info)
      })
    } catch (error) {
      console.error('Erro ao tentar enviar o email');
    }
  }

  const createWarningLog = async (recipient: any, campaign_id: number, channel: string) => {
    try {
      const payload = {
        user_id: recipient.id ?? recipient.user_id ?? null,
        warningId: campaign_id,
        channel,
        sent_at: new Date().toISOString(),
      };

      const response = await fetch(`${ambiente}/warnings_logs/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Failed to create warning log:', text);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('createWarningLog error:', error);
      return null;
    }
  }

  const handleSendMessages = async (campaign_id: number, channel: string) => {
    try {
      setIsLoading(true);
      // backend exposes recipients at /recipients/get-all; filter by preferences on the client
      const response = await fetch(`${ambiente}/recipients/get-all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        <Toast
          open={false}
          duration={3000}
          message=""
          title=""
        />
        return;
      }

      const recipients = await response.json();

      const filtered = (recipients || []).filter((r: any) => {
        const prefs = r.preferences ?? r.warning_preferences ?? '';
        if (!prefs) return false;
        // preferences may be a comma separated string or single value
        if (typeof prefs === 'string') return prefs.split(',').map((s: any) => s.trim()).includes(channel);
        if (Array.isArray(prefs)) return prefs.includes(channel);
        return false;
      });

      if (filtered.length > 0) {
        // send logs sequentially to avoid overwhelming the backend / external providers
        for (const recipient of filtered) {
          await sendEmail({
            to_email: recipient.email,
            to_name: recipient.name,
            from_email: "jessicasilva.js@gmail.com",
            message: "",
            from_name: "Sitema de Envio de Avisos",
            recipient_id: recipient.id,
            subject: "Teste",
            warning_id: campaign_id
          });
        }

        setToastInfo({
          duration: 4000,
          message: `Mensagens enfileiradas para ${filtered.length} receptor(es).`,
          title: 'Envio iniciado',
          type: 'success'
        });
        setToastOpen(true);
      } else {
        setToastInfo({
          duration: 4000,
          message: 'Nenhum receptor com essa preferência encontrado.',
          title: 'Nenhum receptor',
          type: 'error'
        });
        setToastOpen(true);
      }

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogout = async () => {
    try {
      await fetch(`${ambiente}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      navigate('/login');
    }catch(error) {
      console.error('Erro ao logout', error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header
        companyName="NINE"
        userName={(user?.name)?.charAt(0).toLocaleUpperCase().concat((user?.name)?.slice(1)) || 'User'}
        onLogout={handleLogout}
      />

      <section className="w-full flex flex-col gap-6 py-10 px-14">
        {/* Cabeçalho da página */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard de Campanhas
          </h1>

          <>
            <button
              className="
              bg-blue-600 hover:bg-blue-700
              text-white font-semibold
              px-5 py-2 rounded
              transition-colors
            "
              onClick={() => setIsMessageModalOpen(true)}
            >
              Iniciar campanha
            </button>
          </>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card title="Total de campanhas">
            <div className="flex items-center justify-between">
              <p className="text-4xl font-bold text-gray-900">
                {totalCampaigns || 0}
              </p>

            </div>
          </Card>

          <Card title="Campanhas por SMS">
            <p className="text-4xl font-bold text-green-600">
              {smsCampaigns || 0}
            </p>
          </Card>

          <Card title="Campanhas por Email">
            <p className="text-4xl font-bold text-indigo-600">
              {emailCampaigns || 0}
            </p>
          </Card>

          <Card title="Total de Receptores">
            <p className="text-4xl font-bold text-red-600">
              {totalReceptors || 0}
            </p>
          </Card>
        </div>

        {/* Menu de seleção */}
        <div className="w-full">
          <div className="flex  bg-white rounded-md shadow-sm w-full">
            {menus_selecao.map((menu) => {
              const active = selectedMenu === menu;
              return (
                <button
                  key={menu}
                  onClick={() => setSelectedMenu(menu)}
                  type="button"
                  className={`w-full px-4 py-2  text-sm font-medium transition-colors focus:outline-none  ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                // accessibility: visual focus styles are provided; aria-pressed removed to satisfy linter
                >
                  {menu.charAt(0).toLocaleUpperCase().concat(menu.slice(1))}
                </button>
              );
            })}
          </div>
        </div>


        {/**Content */}
        <div className="w-full flex flex-col gap-6">
          {
            selectedMenu === 'campanhas' ? (
              <div className="w-full flex flex-col gap-4">
                {
                  data_campaigns?.map((campaigns: Warning) => (
                    <Card key={campaigns.id} title={""}>
                      <div className="flex flex-row items-center justify-between">
                        <div>
                          <p className="text-gray-600">Nome: {campaigns?.name?.charAt(0).toLocaleUpperCase().concat(campaigns.name.slice(1))}</p>
                          <p>Status: {campaigns.status}</p>
                          <p>Criado em: {campaigns?.created_at ? new Date(campaigns.created_at).toLocaleDateString('pt-br') : ''}</p>
                          <p className="text-gray-600">Mensagem: {(campaigns.message).slice(0, 100)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSendMessages(campaigns.id, (campaigns as any).channel ?? 'sms')}
                          className="ml-4 inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 text-white p-2"
                          aria-label="Iniciar campanha"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </Card>
                  ))
                }
              </div>
            ) : (
              <div>
                {
                  data_messages?.map((message: WarningLogSent) => (
                    <Card key={message.id} title={""}>
                      <div className="flex flex-row items-center justify-between">
                        <div>
                          <p className="text-gray-600">{message.user?.name}</p>
                          <p>{message.created_at}</p>
                          <p>{message.channel}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsMessageModalOpen(true)}
                          className="ml-4 inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 text-white p-2"
                          aria-label="Iniciar campanha"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </Card>
                  ))
                }
              </div>
            )
          }
        </div>
      </section>

      <LoadingModal open={isLoanding} message="Creating campaign..." />

      <MessageFormModal
        open={isMessageModalOpen}
        initialValue={campaign_info}
        title="Nova campanha"
        submitLabel="Iniciar"
        onClose={() => setIsMessageModalOpen(false)}
        onSubmit={(value) => {
          setCampaignInfo(value);
          setIsMessageModalOpen(false);
          // call passing the new campaign data
          handleIniciarCampanha({ message: value.message, channel: value.channel, name: value.name });
        }}
      />

      <Toast
        open={toastOpen}
        duration={toastInfo.duration}
        message={toastInfo.message}
        title={toastInfo.title}
        type={toastInfo.type}
      />
    </main>
  )
}


