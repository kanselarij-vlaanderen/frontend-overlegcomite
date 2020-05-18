import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'frontend-overlegcomite/mixins/authenticated-route-mixin'; // eslint-disable-line ember/no-mixins

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.query('document-version', {
      filter : {
        'document][id': params.document_id,
        'version-number': params.version_number
      },
      include: 'document,file'
    }).then((documentVersions) => {
      if (documentVersions) {
        return documentVersions.firstObject;
      }
    });
  },

  serialize(model) {
    return {
      document_id: model.document.id,
      version_number: model.versionNumber
    };
  }
});
