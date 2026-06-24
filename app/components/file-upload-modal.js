import Component from '@glimmer/component';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import { trackedArray } from '@ember/reactive/collections';
import { FILE_UPLOAD_ENDPOINT } from '../config/config';

export default class FileUploadModalComponent extends Component {
  endpoint = FILE_UPLOAD_ENDPOINT;

  @service store;

  files = trackedArray([]);

  addFile = async (fileId) => {
    const file = await this.store.findRecord('file', fileId);
    this.files.push(file);

    if (!this.args.multiple) {
      await this.saveUpload.perform();
    }
  }

  saveUpload = task(async () => {
    await this.args.onSave(this.files);
    this.files.splice(0);
  });

  deleteFile = async (file) => {
    await file.destroyRecord();
    const i = this.files.indexOf(file);
    if (i != -1) {
      this.files.splice(i, 1);
    }
  }

  cancelUpload = async () => {
    await Promise.allSettled(this.files.map(this.deleteFile));
    this.files.splice(0);
    this.args.onCancel();
  }
}
