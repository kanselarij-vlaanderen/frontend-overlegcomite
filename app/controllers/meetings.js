import Controller from '@ember/controller';
import { query} from '@warp-drive/utilities/json-api'

export default class MeetingsController extends Controller {

  get meetingsQuery() {
    return query('meeting')
  }
}
