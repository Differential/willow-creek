import { Campus } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

const {
  dataSource: originalDataSource,
  schema: originalSchema,
  resolver: originalResolver,
} = Campus;

class dataSource extends originalDataSource {
  async webResourcesForCampus({ id }) {
    const campusConfig = ApollosConfig.ROCK_MAPPINGS.CAMPUS_DATA_VIEWS.find(
      ({ CampusId }) => CampusId === id
    );
    if (campusConfig) {
      return campusConfig.ProfileLinks;
    }
    return [];
  }
}

const resolver = {
  ...originalResolver,
  Campus: {
    ...originalResolver.Campus,
    resources: (root, args, { dataSources }) =>
      dataSources.Campus.webResourcesForCampus(root),
  },
};

const schema = gql`
  ${originalSchema}

  type CampusResource {
    url: String
    title: String
    icon: String
  }

  extend type Campus {
    resources: [CampusResource]
  }
`;

export { dataSource, schema, resolver };
