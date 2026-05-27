import { createMuRecord, updateMuRecord } from "../mu";

export function createAgendaitem(agendaitem) {
  return createMuRecord(agendaitem, {
    fields: ["subject", "subPriority", "priority"],
    relations: ["meeting", "submitters", "case"],
  })
}

export function updateAgendaitem(agendaitem) {
  return updateMuRecord(agendaitem, {
    fields: ["subject", "subPriority", "priority"],
    relations: ["case"],
  })
}
