import { useMemo, useState } from "react"
import { Header } from "../components/header/Header"
import { Card } from "../components/card/Card-simple"
import LoadingModal from "../components/modals/Loanding-modal"
import MessageFormModal from "../components/modals/MessageFormModal"
import { Toast } from "../components"
import { Mail, Megaphone, Send, Smartphone, User } from 'lucide-react'
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCampaigns, fetchMessages, fetchReceptors, getTotalEmails, getTotalMessages, getTotalReceptors, getTotalWarnings } from "../repository"
import { useNavigate } from "react-router"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import type { Receptor, SendEmailPros, ToastProps, Warning, WarningLogSent } from "../types/global-types"


const menus_selecao = [
  "campanhas",
  "mensagens",
  "receptores"
] as const;
const dictionaty = {
  "campanhas": "Campaigns",
  "mensagens": "Messages",
  "receptores": "Receptors"
};

const status_campaigns = [
  "todos",
  "criado",
  "enviado"
]

export default function DashboardAdmin() {
  const [isLoanding, setIsLoading] = useState(false);
  const [campaign_info, setCampaignInfo] = useState({
    message: "",
    channel: "sms",
    name: ""
  });
  const navigate = useNavigate();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>(menus_selecao[0]);
  const [status, setFilterStatus] = useState<string>('todos');
  const [ordenacao, setOrdenacao] = useState<string>('descendente');

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
    data: data_receptors,
  } = useQuery({
    queryKey: ['data', 'receptores'],
    queryFn: async () => {
      return await fetchReceptors(3)
    },
    retry: 2,
    enabled: selectedMenu === 'receptores',
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
    duration: 1000,
    message: "",
    title: "",
    type: 'success'
  });


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
          duration: 1000,
          message: "Erro ao iniciar campanha. Tente novamente mais tarde.",
          title: "Erro",
          type: "error"
        });
        setToastOpen(true);
        return;
      } else {
        setToastInfo({
          duration: 1000,
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
        duration: 1000,
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
    console.log(item_info)
    if (!item_info.from_email || !item_info.from_name || !item_info.message || !item_info.recipient_id || !item_info.subject || !item_info.to_email || !item_info.to_name || !item_info.warning_id) {
      console.error('Há alguma informação faltando', item_info);
      return;
    }

    try {
      const response = fetch(`${ambiente}/emails/create`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item_info)
      });

      console.log(response)
    } catch (error) {
      console.error('Erro ao tentar enviar o email');
    }
  }

  /*const createWarningLog = async (recipient: any, campaign_id: number, channel: string) => {
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
  }*/

  const handleSendMessages = async (campaign_id: number, channel: string, message: string) => {
    console.log('handleSendMessages', campaign_id, channel, message)
    try {
      setIsLoading(true);
      const response = await fetch(`${ambiente}/recipients/get-all`, {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        <Toast
          open={false}
          duration={1000}
          message=""
          title=""
        />
        return;
      }

      const recipients = await response.json();

      const filtered = recipients.filter((r: Receptor) => r.preferences === channel);


      if (filtered.length > 0) {
        // send logs sequentially to avoid overwhelming the backend / external providers
        for (const recipient of filtered) {
          await sendEmail({
            to_email: recipient.email,
            to_name: recipient.name,
            from_email: "jessicasilva.js1314@gmail.com",
            message: message,
            from_name: "Sitema de Envio de Avisos",
            recipient_id: recipient.id,
            subject: "Teste",
            warning_id: campaign_id
          });
        }

        setToastInfo({
          duration: 1000,
          message: `Mensagens enfileiradas para ${filtered.length} receptor(es).`,
          title: 'Envio iniciado',
          type: 'success'
        });
        setToastOpen(true);
      } else {
        setToastInfo({
          duration: 1000,
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
    } catch (error) {
      console.error('Erro ao logout', error)
    }
  }

  const campaigns = useMemo(() => {
    let data = data_campaigns ? [...data_campaigns] : [];

    // filtro por status
    if (status === 'criado') {
      data = data.filter(item => item.status === 'created');
    } else if (status === 'enviado') {
      data = data.filter(item => item.status === 'enviado');
    }

    // ordenação por data
    if (ordenacao === 'ascendente') {
      data = data.sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      );
    } else if (ordenacao === 'descendente') {
      data = data.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );
    }
    return data;
  }, [data_campaigns, status, ordenacao]);


  const messages = useMemo(() => {
    let data = data_messages ? [...data_messages] : [];

    // ordenação por data
    if (ordenacao === 'ascendente') {
      data = data.sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      );
    } else if (ordenacao === 'descendente') {
      data = data.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );
    }
    return data;
  }, [data_messages, ordenacao]);

  const receptors = useMemo(() => {
    return data_receptors;
  }, [data_receptors]);
  return (
    <main className="flex flex-row min-h-screen bg-gray-50">
      <Header
        companyName="NINE"
        onLogout={handleLogout}
      />

      <section className="w-full flex flex-col gap-6 py-10 px-10">
        {/* Cabeçalho da página */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Campaigns Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Overview and management of your campaigns
            </p>
          </div>

          <>
            <button
              className="
              bg-[#4FD1C5] hover:bg-[#4fd1c4c2]
              text-white font-semibold
              px-5 py-2 rounded-lg
              transition-colors
            "
              onClick={() => setIsMessageModalOpen(true)}
            >
              Create a Campaign
            </button>
          </>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card title="Total Campaigns" iconHeader={Megaphone} iconColor="bg-gray-100 text-gray-900">
            <div className="flex items-center justify-between">
              <p className="text-4xl font-bold text-gray-900">
                {totalCampaigns || 0}
              </p>

            </div>
          </Card>

          <Card title="SMS Campaigns" iconHeader={Smartphone} iconColor="bg-green-100 text-green-600">
            <p className="text-4xl font-bold text-green-600">
              {smsCampaigns || 0}
            </p>
          </Card>

          <Card title="Email Campaigns" iconHeader={Mail} iconColor="bg-indigo-100 text-indigo-600">
            <p className="text-4xl font-bold text-indigo-600">
              {emailCampaigns || 0}
            </p>
          </Card>

          <Card title="Total Receptors" iconHeader={User} iconColor="bg-red-100 text-red-600">
            <p className="text-4xl font-bold text-red-600">
              {totalReceptors || 0}
            </p>
          </Card>
        </div>

        {/* Menu de seleção */}
        <div className="w-full">
          <div className="flex flex-row bg-white rounded-lg shadow-sm w-full">
            {menus_selecao.map((menu) => {
              const active = selectedMenu === menu;
              return (
                <button
                  key={menu}
                  onClick={() => setSelectedMenu(menu)}
                  type="button"
                  className={`
  w-full px-5 py-2 rounded-lg text-sm font-semibold
  transition-all
  ${active
                      ? 'bg-teal-400 text-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-100'}
`}
                // accessibility: visual focus styles are provided; aria-pressed removed to satisfy linter
                >
                  {dictionaty[menu]}
                </button>
              );
            })}
          </div>
        </div>

        {/*Filter*/}
        {
          selectedMenu !== "receptores" && (
            <div className="w-full  flex justify-end">

              <div className="w-full md:w-6/12 flex items-end justify-end gap-6">
                {/* Status */}
                <div className="w-full flex flex-col gap-1 md:min-w-[180px]">
                  <label
                    htmlFor="status"
                    className="text-xs font-medium text-gray-500"
                  >
                    Campaign Status
                  </label>

                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="
                      w-full
                      rounded-lg
                      border border-gray-300
                      bg-white
                      px-4 py-2
                      text-sm text-gray-700
                      shadow-sm
                      focus:outline-none
                      focus:ring-2 focus:ring-teal-400
                      focus:border-teal-400
                      transition
                    "
                  >
                    {status_campaigns?.map((campaign) => (
                      <option key={campaign} value={campaign}>
                        {campaign.charAt(0).toUpperCase() + campaign.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ordenação */}
                <div className="w-full flex flex-col gap-1 min-w-[180px]">
                  <label
                    htmlFor="ordenacao"
                    className="text-xs font-medium text-gray-500"
                  >
                    Order By
                  </label>

                  <select
                    id="ordenacao"
                    name="ordenacao"
                    value={ordenacao}
                    onChange={(e) => setOrdenacao(e.target.value)}
                    className="
          w-full
          rounded-lg
          border border-gray-300
          bg-white
          px-4 py-2
          text-sm text-gray-700
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-teal-400
          focus:border-teal-400
          transition
        "
                  >
                    {["Descendente", "Ascendente"].map((ord) => (
                      <option key={ord} value={ord}>
                        {ord}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

          )
        }

        {/**Content */}
        <div className="w-full flex flex-col gap-6">
          {
            selectedMenu === 'campanhas' ? (
              <div className="w-full flex flex-col gap-4">
                {
                  campaigns.length > 0 ? (
                    (campaigns)?.map((campaigns: Warning) => (
                      <Card key={campaigns.id} title="">
                        <div className="flex items-start justify-between gap-4">
                          {/* Conteúdo */}
                          <div className="space-y-3">
                            {/* Nome */}
                            <h3 className="text-lg font-semibold text-gray-800">
                              {campaigns.name.charAt(0).toUpperCase() + campaigns.name.slice(1)}
                            </h3>

                            {/* Metadados */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <span>
                                <strong>Status:</strong>{" "}
                                <span
                                  className={`
              inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
              ${campaigns.status === "ativo"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-gray-200 text-gray-600"
                                    }
            `}
                                >
                                  {campaigns.status.charAt(0).toUpperCase() + campaigns.status.slice(1)}
                                </span>
                              </span>

                              <span>
                                <strong>Created At:</strong>{" "}
                                {campaigns.created_at
                                  ? new Date(campaigns.created_at).toLocaleDateString("pt-BR")
                                  : "-"}
                              </span>

                              <span>
                                <strong>Channel:</strong> {campaigns.channel}
                              </span>
                            </div>

                            {/* Mensagem */}
                            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                              {campaigns.message.length > 100
                                ? `${campaigns.message.slice(0, 100)}...`
                                : campaigns.message}
                            </p>
                          </div>

                          {/* Ação */}
                          <button
                            type="button"
                            onClick={() =>
                              handleSendMessages(
                                campaigns.id,
                                campaigns.channel,
                                campaigns.message
                              )
                            }
                            className="
                              flex items-center justify-center
                              w-10 h-10
                              rounded-full
                              bg-teal-400
                              text-white
                              hover:bg-teal-500
                              transition-all
                              shadow-sm
                            "
                            aria-label="Iniciar campanha"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      </Card>

                    ))
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <Megaphone size={32} />
                      <p className="font-semibold">No campaigns yet</p>
                      <p className="text-sm">Create your first campaign to get started</p>
                    </div>
                  )
                }
              </div>
            ) : selectedMenu === "mensagens" ? (
              <div>
                {
                  messages.length > 0 ? (
                    <div className="w-full flex flex-col gap-4">
                      {
                        messages?.map((message: WarningLogSent) => (
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
                                className="ml-4 inline-flex items-center justify-center rounded-lg  bg-[#4FD1C5] hover:bg-[#4fd1c4c2] text-white p-2"
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
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <Smartphone size={32} />
                      <p className="font-semibold">There is no messages sent</p>
                      <p className="text-sm">Create a campaign first to send messages</p>
                    </div>
                  )
                }
              </div>
            ) : (
              <div>

                {
                  (receptors || [])?.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone Number</TableHead>
                          <TableHead>Notification Preference</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {
                          receptors?.map((message: Receptor) => (
                            <TableRow key={message.id}>
                              <TableCell>{message.name}</TableCell>
                              <TableCell>{message.email}</TableCell>
                              <TableCell>{message.phone}</TableCell>
                              <TableCell>{message.preferences}</TableCell>
                            </TableRow>
                            
                          ))
                        }
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <User size={32} />
                      <p className="font-semibold">There is no receptors registered</p>
                      <p className="text-sm">Receptors need to be registered to receive the notifications</p>
                    </div>
                  )
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
        onClose={() => setToastOpen(false)}
      />
    </main>
  )
}


