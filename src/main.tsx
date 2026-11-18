import React from "react";
import { createRoot } from "react-dom/client";
import App, { type SitePage } from "./App";
import { AnaBomsenhor } from "@/components/sections/AnaBomsenhor";
import { anaBomsenhor } from "@/data/ana-bomsenhor";
import { ArtistPage } from "@/components/sections/ArtistPage";
import { artistProfiles } from "@/data/artist-profiles";
import "./styles.css";

const path = location.pathname.replace(/\/$/, "");
const piercing = path === "/piercings";
const profile = piercing ? artistProfiles.moreira : Object.values(artistProfiles).find((artist) => artist.path === path);
const anaService = path === "/micropigmentacao" ? "Micropigmentação"
  : path === "/tatuagem-paramedica" ? "Tatuagem paramédica" : undefined;
const sitePages: SitePage[] = ["tatuagens", "equipe", "estudio", "contato", "remocao-a-laser"];
const sitePage = sitePages.find((route) => path === `/${route}`);
const page = path === anaBomsenhor.path || anaService
  ? <AnaBomsenhor service={anaService} />
  : profile ? <ArtistPage profile={profile} piercing={piercing} /> : <App page={sitePage} />;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {page}
  </React.StrictMode>,
);
