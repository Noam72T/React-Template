import { useState } from 'react'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const features = [
    {
      title: "⚡ Performance",
      description: "Optimisé pour une vitesse maximale avec Vite et React"
    },
    {
      title: "🎨 Design",
      description: "Interface moderne et responsive avec Tailwind CSS"
    },
    {
      title: "🔧 Flexible",
      description: "Architecture modulaire et facilement extensible"
    },
    {
      title: "🚀 Production",
      description: "Prêt pour le déploiement avec les meilleures pratiques"
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">R</span>
            </div>
            <span className="font-bold text-xl">React Template</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {['Accueil', 'Fonctionnalités', 'À propos'].map((item, index) => (
              <button
                key={item}
                onClick={() => setActiveSection(['home', 'features', 'about'][index])}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === ['home', 'features', 'about'][index]
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Bienvenue dans votre
              <span className="text-primary block mt-2">Template React</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Un template moderne et performant avec React, TypeScript, Tailwind CSS et Vite.
              Prêt à construire votre prochaine application web.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Commencer
              </button>
              <button className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fonctionnalités</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour créer des applications web modernes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "99%", label: "Performance Score" },
              { number: "< 1s", label: "Temps de chargement" },
              { number: "100%", label: "Responsive" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Créez votre prochaine application web avec ce template moderne
          </p>
          <button className="px-8 py-3 bg-background text-foreground rounded-lg font-medium hover:bg-background/90 transition-colors">
            Démarrer maintenant
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <span className="font-semibold">React Template</span>
          </div>
          <p className="text-muted-foreground">
            Construit avec ❤️ et les meilleures technologies web
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
