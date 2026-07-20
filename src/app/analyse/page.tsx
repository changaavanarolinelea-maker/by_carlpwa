import { ArrowUp, Sparkles, Lightbulb } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import {
  profitMensuel,
  profitVariationPourcent,
  depensesSemaine,
  conseilsAnalyse,
} from "@/data/mock";
import { formatFCFA } from "@/lib/format";


const conseilStyle = {
  positif: { border: "border-sage", iconBg: "bg-sage/10", iconColor: "text-sage", icon: Sparkles },
  attention: {
    border: "border-terracotta",
    iconBg: "bg-terracotta/10",
    iconColor: "text-terracotta",
    icon: Lightbulb,
  },
};

export default function AnalysePage() {
  const depenseMax = Math.max(...depensesSemaine.map((d) => d.pourcentage));

  return (
    <div>
      <Header title="Analyse de Carl" />

      <div className="px-5 space-y-6">
        {/* Bénéfice mensuel */}
        <Card className="text-center relative overflow-hidden">
          <p className="font-sans text-label-md text-cocoa uppercase mb-2">Bénéfice mensuel</p>
          <h2 className="font-sans text-number-xl text-espresso">{formatFCFA(profitMensuel)}</h2>
          <div className="inline-flex items-center gap-1 mt-3 text-sage bg-sage/10 px-3 py-1 rounded-full font-sans text-label-md">
            <ArrowUp size={14} strokeWidth={2} />
            <span>+{profitVariationPourcent}% vs mois dernier</span>
          </div>
        </Card>

        {/* Conseils */}
        <div className="space-y-3">
          {conseilsAnalyse.map((conseil, index) => {
            const style = conseilStyle[conseil.type];
            const Icon = style.icon;
            return (
              <div
                key={index}
                className={`bg-ivory border-l-4 ${style.border} rounded-control p-4 flex items-start gap-4`}
              >
                <div className={`${style.iconBg} p-2 rounded-control shrink-0`}>
                  <Icon size={18} className={style.iconColor} strokeWidth={1.5} />
                </div>
                <p className="font-sans text-body-sm text-cocoa">{conseil.message}</p>
              </div>
            );
          })}
        </div>

        {/* Dépenses de la semaine */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-headline-sm text-espresso">Dépenses</h3>
          </div>
          <div className="flex items-end justify-between h-32 gap-2 px-2">
            {depensesSemaine.map((depense) => (
              <div
                key={depense.jour}
                className={`w-full rounded-t-control transition-all duration-700 ${
                  depense.pourcentage === depenseMax ? "bg-terracotta" : "bg-sand"
                }`}
                style={{ height: `${depense.pourcentage}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 font-sans text-label-md text-cocoa">
            {depensesSemaine.map((depense) => (
              <span key={depense.jour}>{depense.jour}</span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
