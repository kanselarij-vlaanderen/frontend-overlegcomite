import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

export default class DocumentModel extends Model {
  @attr('string') name;
  @attr('datetime') created;

  @belongsTo('document-type', { inverse: 'documents', async: false }) type;
  @hasMany('document-version', { inverse: 'document', async: false }) documentVersions;

  loadRelations() {
    return this.store.findRecord('document', this.id, {
      include: 'type,document-versions,document-versions.access-level,document-versions.file',
      reload: true
    });
  }
}
