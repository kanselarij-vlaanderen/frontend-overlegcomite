import { createMuRecord, updateMuRecord } from "../mu";

export function createMeeting(meeting) {
  return createMuRecord(meeting, {
    fields: ["startedAt"]
  })
}

export function updateMeeting(meeting) {
  return updateMuRecord(meeting, {
    fields: ["startedAt"]
  })
}

