import { useState } from "react"
import { Header } from "../components/header/Header"
import { Card } from "../components/card/Card-simple"
import LoadingModal from "../components/modals/Loanding-modal"
import MessageFormModal from "../components/modals/MessageFormModal"
import { Toast } from "../components"
import { useQuery, keepPreviousData } from '@tanstack/react-query';


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
  created_at: string; // ou Date, dependendo do fetch
  warning_logs_sent?: WarningLogSent[];
}


export interface ToastProps {
  type?: ToastType;
  title?: string;
  message?: string;
  duration?: number; // ms
}

const menus_selecao = [
  "campanhas",
  "mensagens"
]
export default function DashboardAdmin() {
  // dados mockados (depois você pluga no backend)
  const totalCampaigns = 12
  const smsCampaigns = 7
  const emailCampaigns = 5

  const ambiente = import.meta.env.VITE_AMBIENTE_API;
  const [isLoanding, setIsLoading] = useState(false);
  const [campaign_info, setCampaignInfo] = useState({
    message: "",
    channel: "sms"
  });
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(menus_selecao[0]);

  const [toastInfo, setToastInfo] = useState<ToastProps>({
    duration: 3000,
    message: "",
    title: "",
    type: 'success'
  });

  const fetchCampaigns = async (pageParam: number): Promise<Warning[]>  => {
    const response = await fetch(`${ambiente}/warnings_logs/get-all`);
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


  const handleIniciarCampanha = async (campaign?: { message: string; channel: string }) => {
    const campaignToSend = campaign ?? campaign_info;
    const objt_warning_to_create = {
      status: "created",
      message: campaignToSend.message,
      channel: campaignToSend.channel,
    }
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

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        companyName="My Company"
        userName="Admin"
        onLogout={() => { }}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Total de campanhas">
            <p className="text-4xl font-bold text-gray-900">
              {totalCampaigns}
            </p>
          </Card>

          <Card title="Campanhas por SMS">
            <p className="text-4xl font-bold text-green-600">
              {smsCampaigns}
            </p>
          </Card>

          <Card title="Campanhas por Email">
            <p className="text-4xl font-bold text-indigo-600">
              {emailCampaigns}
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
        <div className="w-full">
          {
            selectedMenu === 'campanhas' ? (
              <div>
                {
                  data_campaigns?.map((campaigns: any) => (
                    <Card key={campaigns.id} title={campaigns.title}>
                      <p className="text-gray-600">{campaigns.content}</p>
                    </Card>
                  ))
                }
              </div>
            ) : (
              <div>
                {
                  data_messages?.map((message: any) => (
                    <Card key={message.id} title={message.title}>
                      <p className="text-gray-600">{message.content}</p>
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
          handleIniciarCampanha({ message: value.message, channel: value.channel });
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


