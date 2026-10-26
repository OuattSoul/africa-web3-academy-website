import type { CampusProgram } from "./types";
import data from "../../content/campus-builder.json";

// Countries and markers of the Campus Builder network (content/campus-builder.json).
// List a campus or institution only once its participation is confirmed.
export const CAMPUS = data as unknown as CampusProgram;

export const CAMPUS_STATUS_LABEL = { participant: "Pays participant", "en-preparation": "Adhésion en préparation" } as const;
