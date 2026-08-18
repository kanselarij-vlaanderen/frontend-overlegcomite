import CONSTANTS from 'frontend-overlegcomite/config/constants';

const {
  ADMIN,
  SECRETARIE,
  MINISTER,
  KABINET_MEDEWERKER,
  ADVIESVERLENER,
  OVERHEIDSORGANISATIE,
  VLAAMS_PARLEMENT,
} = CONSTANTS.USER_ROLES;

// NOTE: When adding a new permission: A good permission name is something that fits in the sentence:
// "Users of the <insert group>-group are allowed to <...>"

/**
Available permissions are
- manage-meetings: Create, edit and remove meetings
- manage-agendaitems: Create, edit and remove agendaitems
- manage-documents: Uploading and editing documents, uploading new versions, ...
- manage-document-access-levels: Modify document access levels
- manage-agenda-publications: publishing agendas and notifications to other Overlegcomite profiles
- manage-settings: Manage application settings
 */
const groups = [
  {
    name: 'ADMIN',
    roles: [ADMIN],
    permissions: [
      'manage-meetings',
      'manage-agendaitems',
      'manage-documents',
      'manage-document-access-levels',
      'manage-agenda-publications',
      'manage-settings'
    ]
  },
  {
    name: 'SECRETARIE',
    roles: [SECRETARIE],
    permissions: [
      'manage-meetings',
      'manage-agendaitems',
      'manage-documents',
      'manage-document-access-levels',
      'manage-agenda-publications'
    ]
  },
  {
    name: 'MINISTER',
    roles: [MINISTER],
    permissions: [

    ]
  },
  {
    name: 'INTERN_REGERING',
    roles: [KABINET_MEDEWERKER, ADVIESVERLENER],
    permissions: [

    ]
  },
  {
    name: 'INTERN_OVERHEID',
    roles: [OVERHEIDSORGANISATIE, VLAAMS_PARLEMENT],
    permissions: [

    ]
  }
]

export default groups;

export function findGroupByRole(role) {
  return groups.find(g => g.roles.includes(role));
}
