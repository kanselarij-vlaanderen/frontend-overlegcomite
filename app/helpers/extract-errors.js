import STATUS_CODES from '../config/http-status-codes';

export default function extractErrors(error) {
  if (error.errors) {
    return error.errors.map((e) => {
      return {
        title: `Fout ${e.status}: ${STATUS_CODES[e.status] || "Onbekend"}`,
        description: e.title,
        details: e.detail,
      }
    })
  } else {
    return [{
      title: `Fout: ${error.name}`,
      description: `Er is een fout voorgekomen: ${error.message}`,
      details: error.stack
    }]
  }
}
