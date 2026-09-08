import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { lpBody } from "../lp-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tahiti Corretora | Seguro Auto sem burocracia" },
      {
        name: "description",
        content:
          "Seguro Auto com assistência 24 horas, coberturas sob medida e atendimento próximo da Tahiti Corretora de Seguros.",
      },
      { property: "og:title", content: "Tahiti Corretora | Seguro Auto" },
      {
        property: "og:description",
        content:
          "Proteja seu veículo com assistência 24 horas e atendimento próximo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const header = document.getElementById("siteHeader");
    const floatWa = document.getElementById("floatWa");
    const stickyCta = document.querySelector(".sticky-cta");
    const handleScroll = () => {
      header?.classList.toggle("scrolled", window.scrollY > 40);
      floatWa?.classList.toggle("visible", window.scrollY > 500);
      stickyCta?.classList.toggle("visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: lpBody }} />;
}
