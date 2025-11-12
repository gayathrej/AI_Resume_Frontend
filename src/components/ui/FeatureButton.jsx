import React from "react";
import { Sparkles, Brain, BarChart3 } from "lucide-react";

// Single button component
export function FeatureButton({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-center hover:scale-105 transition-transform cursor-pointer min-w-[160px]">
      <div className="mb-2 text-primary">{icon}</div>
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

// Optional: FeatureButtonGroup to render all buttons side by side
export function FeatureButtonGroup() {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Contextual Match",
      description: "AI understands semantic fit beyond keyword overlap.",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Explainable Scoring",
      description: "Get transparent insights into every scoring decision.",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Performance Insights",
      description: "Visual analytics show resume strengths and areas to improve.",
    },
  ];

  return (
    <div className="flex justify-center gap-4 mt-8 flex-wrap">
      {features.map((feature, index) => (
        <FeatureButton
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
