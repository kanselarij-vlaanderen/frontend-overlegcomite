import Model, { attr } from '@warp-drive/legacy/model';

export default class FileModel extends Model {
  @attr('string') filename;

  get filenameWithoutExtension () {
    const ext = this.extension;
    const regex = new RegExp('\\.' + ext + '$');
    return this.filename.replace(regex, '');
  }
  set filenameWithoutExtension (value) {
    const filename = `${value}.${this.extension}`;
    this.set('filename', filename);
    return value;
  }

  @attr('string') format;
  @attr('number') size;
  @attr('string') extension;
  @attr('datetime') created;
}
