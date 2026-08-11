import STATUS_CODES from '../config/http-status-codes';

export default function extractErrors(error) {
  if (!error) return [];

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
      description: `Er heeft zich een fout voorgedaan. Indien deze blijft voorkomen, neem dan contact op met uw ICT-beheerder en vermeld daarbij volgende foutmelding: ${error.message}`,
      details: error.stack
    }]
  }
}
