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

    // Animate the car along the "Como funciona" road as the user scrolls.
    const stepsSection = document.getElementById("como-funciona");
    const carH = document.getElementById("stepsCar");
    const carV = document.getElementById("stepsCarV");
    const stepNums = () =>
      Array.from(document.querySelectorAll(".step-num")).slice(0, 3);

    const moveCar = () => {
      if (!stepsSection || (!carH && !carV)) return;
      const nums = stepNums();
      if (nums.length < 3) return;

      const rect = stepsSection.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Progress: 0 when section top hits viewport bottom, 1 when section bottom leaves viewport top
      const start = rect.top - viewportH;
      const end = rect.bottom;
      let progress = start >= 0 ? 0 : end <= 0 ? 1 : -start / (end - start);
      progress = Math.max(0, Math.min(1, progress));

      // Map progress to positions between step 1 and step 3 centers.
      const getCenter = (el: Element, horizontal: boolean) => {
        const r = el.getBoundingClientRect();
        const parent = stepsSection.getBoundingClientRect();
        return horizontal
          ? r.left - parent.left + r.width / 2
          : r.top - parent.top + r.height / 2;
      };

      if (carH && window.getComputedStyle(carH).display !== "none") {
        const p1 = getCenter(nums[0], true);
        const p3 = getCenter(nums[2], true);
        const pos = p1 + (p3 - p1) * progress;
        // Center the 46px car on the point.
        carH.style.transform = `translateX(${pos - 23}px)`;
      }

      if (carV && window.getComputedStyle(carV).display !== "none") {
        const p1 = getCenter(nums[0], false);
        const p3 = getCenter(nums[2], false);
        const pos = p1 + (p3 - p1) * progress;
        carV.style.transform = `translateY(${pos - 23}px) rotate(90deg)`;
      }
    };

    window.addEventListener("scroll", moveCar, { passive: true });
    window.addEventListener("resize", moveCar, { passive: true });
    // Wait for layout to settle before first measurement.
    requestAnimationFrame(moveCar);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", moveCar);
      window.removeEventListener("resize", moveCar);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: lpBody }} />;
}

