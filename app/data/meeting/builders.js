import { createMuRecord } from "../mu";

export function createMeeting(meeting) {
  return createMuRecord(meeting, {
    fields: ["startedAt"]
  })
}

