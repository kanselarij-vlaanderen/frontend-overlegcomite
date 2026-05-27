import { createMuRecord, updateMuRecord } from "../mu";

export function createCase(case_) {
  return createMuRecord(case_, {
    fields: ["identifier"],
    relations: ["agendaItems"],
  })
}
