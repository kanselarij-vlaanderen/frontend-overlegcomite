import { ACCESS_LEVEL_STYLE_BY_ID } from "frontend-overlegcomite/config/config";

export default function getAccessLevelStyle(
  accessLevel
) {
  return accessLevel ? ACCESS_LEVEL_STYLE_BY_ID[accessLevel.id] : null;
}
