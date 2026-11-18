import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AnaBomsenhor } from "@/components/sections/AnaBomsenhor";
import { anaBomsenhor } from "@/data/ana-bomsenhor";
import { ArtistPage } from "@/components/sections/ArtistPage";
import { artistProfiles } from "@/data/artist-profiles";
import "./styles.css";

const path = location.pathname.replace(/\/$/, "");
const piercing = path === "/piercings";
const profile = piercing ? artistProfiles.moreira : Object.values(artistProfiles).find((artist) => artist.path === path);
const page = path === anaBomsenhor.path
  ? <AnaBomsenhor />
  : profile ? <ArtistPage profile={profile} piercing={piercing} /> : <App />;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {page}
  </React.StrictMode>,
);
