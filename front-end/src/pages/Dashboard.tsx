import { Card } from "../components/card/card-simple"
import { Header } from "../components/header/Header"

export default function DashboardAdmin() {
  // dados mockados (depois você pluga no backend)
  const totalCampaigns = 12
  const smsCampaigns = 7
  const emailCampaigns = 5

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        companyName="My Company"
        userName="Admin"
        onLogout={() => {}}
      />

      <section className="max-w-6xl mx-auto px-6 py-8">
        {/* Cabeçalho da página */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard de Campanhas
          </h1>

          <button
            className="
              bg-blue-600 hover:bg-blue-700
              text-white font-semibold
              px-5 py-2 rounded
              transition-colors
            "
          >
            Iniciar campanha
          </button>
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
      </section>
    </main>
  )
}
