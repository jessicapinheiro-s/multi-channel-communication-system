import { useMemo, useState } from "react"
import { Header } from "../components/header/Header"
import { Card } from "../components/card/Card-simple"
import LoadingModal from "../components/modals/LoandingModal"
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
import { formatName, formatPhoneNumber } from "../lib/utils"


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
  "all",
  "created",
  "sent"
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
  const [status, setFilterStatus] = useState<string>('all');
  const [ordenacao, setOrdenacao] = useState<string>('descending');

  const {
    data: data_campaigns,
  } = useQuery({
    queryKey: ['data', 'campanhas'],
    queryFn: async () => {
      const data = await fetchCampaigns();
      return data.data;
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

      const data = await fetchReceptors();
      return data.data;
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
      const data = await fetchMessages();
      return data.data;
    },
    retry: 2,
    enabled: selectedMenu === 'mensagens',
    placeholderData: keepPreviousData,
  })

  const {
    data: totalCampaigns
  } = useQuery({
    queryKey: ['data', 'total_warnings'],
    queryFn: async () => {
      return await getTotalWarnings();
    }
  });

  const {
    data: smsCampaigns
  } = useQuery({
    queryKey: ['data', 'total_warnings_meessages'],
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
    if (!item_info.from_email || !item_info.from_name || !item_info.message || !item_info.recipient_id || !item_info.subject || !item_info.to_email || !item_info.to_name || !item_info.warning_id) {
      console.error('Há alguma informação faltando', item_info);
      return;
    }

    try {
      const response = await fetch(`${ambiente}/emails/create`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item_info)
      });

      return response;
    } catch (error) {
      console.error('Erro ao tentar enviar o email', error);
      throw error;
    }
  }

  const sendSMS = async (numbers: string[], message: string) => {
    if (numbers.length === 0 || !message) {
      return false;
    }

    const body_content = {
      destination_number: numbers,
      message: message
    }


    try {
      const response = await fetch(`${ambiente}/sms/create`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body_content)
      });

      return response;
    } catch (error) {
      console.error('Erro ao tentar enviar o sms', error);
      throw error;
    }
  }

  const update_campaign_status = async (obj_item_info: { id: number; itemInfo: { status?: string;[key: string]: any } }): Promise<Response> => {
    if (!obj_item_info?.id || !obj_item_info?.itemInfo) {
      throw new Error('Invalid payload for update_campaign_status');
    }

    try {
      const response = await fetch(`${ambiente}/warnings/update`, {
        method: 'PATCH',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj_item_info)
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('update_campaign_status failed:', text);
        throw new Error(text || 'Update request failed');
      }

      return response;
    } catch (error) {
      console.error('Erro ao tentar atualizar a campanha', error);
      throw error;
    }
  }

  const createWarningLog = async (recipient: any, campaign_id: number, channel: string, status: string) => {
    try {
      const payload = {
        user_id: recipient.id ?? recipient.user_id ?? null,
        warningId: campaign_id,
        channel,
        status: status,
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

  const update_warning_log = async (log_id: number, log_info: any) => {
    try {
      const response = await fetch(`${ambiente}/warnings_logs/update`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: log_id,
          item_info: log_info
        })
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('update_warning_log failed:', text);
        throw new Error(text || 'Fail to update warning log');
      }

      return response;

    } catch (error) {
      throw new Error('Fail to update warning log')
    }
  }

  const handleSendMessages = async (campaign_id: number, channel: string, message: string) => {
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

      const filtered: Receptor[] | [] = recipients.filter((r: Receptor) => r.preferences === channel);

      let hasError: boolean = false;
      if (filtered.length > 0) {
        if (channel === 'email') {
          for (const recipient of filtered) {
            try {
              const response_warning_log = await createWarningLog(recipient, campaign_id, channel, "created");

              // createWarningLog returns parsed JSON (or null) — it does not have a `.ok` property.
              if (!response_warning_log || !response_warning_log.id) {
                throw new Error(`Fail to create warning log`)
              }

              const response = await sendEmail({
                to_email: recipient.email,
                to_name: recipient.name,
                from_email: "jessicasilva.js1314@gmail.com",
                message: message,
                from_name: "Sitema de Envio de Avisos",
                recipient_id: recipient.id,
                subject: "Administrador",
                warning_id: campaign_id
              });


              await update_warning_log(response_warning_log.id, { status: response && !response.ok ? 'failed to send' : "sent" })

            } catch (error) {
              hasError = true;
            }
          }
        } else {
          const response = await sendSMS(filtered.map(receptor => receptor.phone), message);
          console.log("Chamada SMS", response);
          //esperar resposta com 
        }


        await update_campaign_status({
          id: campaign_id,
          itemInfo: {
            status: hasError ? "sent with failures" : "sent sucessfully"
          }
        })

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
    let data = Array.isArray(data_campaigns) ? [...data_campaigns] : [];

    // filtro por status
    if (status === 'created') {
      data = data.filter(item => item.status === 'created');
    } else if (status === 'sent') {
      data = data.filter(item => item.status === 'enviado');
    }

    // ordenação por data
    if (ordenacao === 'ascending') {
      data = data.sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      );
    } else if (ordenacao === 'descending') {
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
    if (ordenacao === 'ascending') {
      data = data.sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      );
    } else if (ordenacao === 'descending') {
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
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 border-r border-white/10 bg-white/[0.03] backdrop-blur-xl px-6 py-8 flex-col justify-between">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              NINE
            </h1>

            <p className="text-sm text-slate-400 mt-2">
              Campaign Management Platform
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {menus_selecao.map((menu) => {
              const active = selectedMenu === menu;

              return (
                <button
                  key={menu}
                  onClick={() => setSelectedMenu(menu)}
                  className={`
                  w-full flex items-center gap-3
                  px-4 py-3 rounded-2xl
                  transition-all duration-300
                  ${active
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                      : "hover:bg-white/5 text-slate-400"
                    }
                `}
                >
                  <div className="w-2 h-2 rounded-full bg-current" />
                  {dictionaty[menu]}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="
          w-full py-3 rounded-2xl
          border border-red-500/20
          bg-red-500/10
          text-red-400
          hover:bg-red-500/20
          transition-all
        "
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <section className="flex-1 px-6 md:px-10 py-8 overflow-auto">
        {/* Header */}
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-5xl font-black tracking-tight">
              Campaign Dashboard
            </h1>

            <p className="text-slate-400 mt-3 max-w-2xl">
              Manage multichannel campaigns, recipients and communication logs in
              real time.
            </p>
          </div>

          <button
            onClick={() => setIsMessageModalOpen(true)}
            className="
            px-7 py-4 rounded-2xl
            bg-gradient-to-r from-cyan-500 to-blue-500
            hover:scale-[1.02]
            transition-all duration-300
            font-semibold
            shadow-lg shadow-cyan-500/20
          "
          >
            Create Campaign
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: "Total Campaigns",
              value: totalCampaigns || 0,
              growth: "+12%",
            },
            {
              title: "SMS Campaigns",
              value: smsCampaigns || 0,
              growth: "+8%",
            },
            {
              title: "Email Campaigns",
              value: emailCampaigns || 0,
              growth: "+23%",
            },
            {
              title: "Recipients",
              value: totalReceptors || 0,
              growth: "+31%",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="
              relative overflow-hidden
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-6
              shadow-2xl
            "
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 blur-3xl rounded-full" />

              <div className="relative z-10">
                <span className="text-sm text-slate-400">
                  {card.title}
                </span>

                <div className="flex items-end justify-between mt-4">
                  <h2 className="text-5xl font-black tracking-tight">
                    {card.value}
                  </h2>

                  <span className="text-emerald-400 text-sm font-semibold">
                    {card.growth}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        {selectedMenu !== "receptores" && (
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3 overflow-auto">
              {menus_selecao.map((menu) => {
                const active = selectedMenu === menu;

                return (
                  <button
                    key={menu}
                    onClick={() => setSelectedMenu(menu)}
                    className={`
                    px-5 py-3 rounded-2xl
                    whitespace-nowrap
                    transition-all
                    ${active
                        ? "bg-cyan-500 text-white"
                        : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10"
                      }
                  `}
                  >
                    {dictionaty[menu]}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
              <select
                value={status}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="
                bg-white/5
                border border-white/10
                rounded-2xl
                px-4 py-3
                text-sm text-slate-300
                outline-none
              "
              >
                {status_campaigns.map((campaign) => (
                  <option
                    key={campaign}
                    value={campaign}
                    className="bg-slate-900"
                  >
                    {campaign}
                  </option>
                ))}
              </select>

              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="
                bg-white/5
                border border-white/10
                rounded-2xl
                px-4 py-3
                text-sm text-slate-300
                outline-none
              "
              >
                {["descending", "ascending"].map((ord) => (
                  <option
                    key={ord}
                    value={ord}
                    className="bg-slate-900"
                  >
                    {ord}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-6">
          {selectedMenu === "campanhas" ? (
            campaigns.length > 0 ? (
              campaigns.map((campaigns: Warning) => (
                <div
                  key={campaigns.id}
                  className="
                  group relative overflow-hidden
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  p-7
                  hover:bg-white/[0.05]
                  transition-all duration-300
                  hover:scale-[1.01]
                "
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />

                  <div className="relative z-10 flex items-start justify-between gap-6">
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`
                            px-3 py-1 rounded-full text-xs font-semibold border
                            ${campaigns.status === "ativo"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                              }
                          `}
                          >
                            {campaigns.status}
                          </span>

                          <span className="text-xs text-slate-500 uppercase tracking-wider">
                            {campaigns.channel}
                          </span>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight">
                          {campaigns.name}
                        </h2>
                      </div>

                      <p className="text-slate-400 max-w-2xl leading-relaxed">
                        {campaigns.message.length > 160
                          ? `${campaigns.message.slice(0, 160)}...`
                          : campaigns.message}
                      </p>

                      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                        <span>
                          Created at{" "}
                          {campaigns.created_at
                            ? new Date(
                              campaigns.created_at
                            ).toLocaleDateString("pt-BR")
                            : "-"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleSendMessages(
                          campaigns.id,
                          campaigns.channel,
                          campaigns.message
                        )
                      }
                      className="
                      opacity-0
                      group-hover:opacity-100
                      translate-y-2
                      group-hover:translate-y-0
                      transition-all duration-300

                      min-w-14 h-14
                      rounded-2xl
                      bg-gradient-to-r from-cyan-500 to-blue-500
                      shadow-lg shadow-cyan-500/30
                      flex items-center justify-center
                    "
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="
                rounded-3xl
                border border-dashed border-white/10
                bg-white/[0.02]
                py-24
                flex flex-col items-center justify-center text-center
              "
              >
                <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                  <Megaphone className="w-10 h-10 text-cyan-400" />
                </div>

                <h2 className="text-3xl font-bold">
                  No campaigns created
                </h2>

                <p className="text-slate-400 mt-3 max-w-md">
                  Create your first multichannel campaign to start engaging your audience.
                </p>
              </div>
            )
          ) : null}
        </div>

        <LoadingModal
          open={isLoanding}
          message="Creating campaign..."
        />

        <MessageFormModal
          open={isMessageModalOpen}
          initialValue={campaign_info}
          title="Create a new Campaign"
          submitLabel="Create"
          onClose={() => setIsMessageModalOpen(false)}
          onSubmit={(value) => {
            setCampaignInfo(value);
            setIsMessageModalOpen(false);

            handleIniciarCampanha({
              message: value.message,
              channel: value.channel,
              name: value.name,
            });
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
      </section>
    </main>
  )

}


