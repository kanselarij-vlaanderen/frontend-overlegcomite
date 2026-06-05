import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { trackedArray } from '@ember/reactive/collections';
import { FILE_UPLOAD_ENDPOINT } from '../config/config';

export default class FileUploadModal extends Component {
  endpoint = FILE_UPLOAD_ENDPOINT;

  @service store;

  files = trackedArray([]);

  @action
  async onFinishUpload(fileID) {
    const file = await this.store.findRecord('file', fileID);
    this.files.push(file);

    if (!this.args.multiple) {
      this.saveUpload.perform();
    }
  }

  @action
  async deleteFile(file) {
    await file.destroyRecord();
    const i = this.files.indexOf(file);
    if (i != -1) {
      this.files.splice(i, 1);
    }
  }

  saveUpload = task(async () => {
    await this.args.onSave(this.files);
    this.files.splice(0);
  })

  @action
  async cancelUpload() {
    await Promise.allSettled(this.files.map(this.deleteFile));
    this.files.splice(0);
    this.args.onCancel();
  }
}
