import EditMeetingController from '../meeting/edit';
import { action } from "@ember/object";

export default class NewMeetingsController extends EditMeetingController {
  @action
  async didSave() {
    this.transitionToRoute('meeting.index', this.model.id);
  }
}
