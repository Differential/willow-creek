import { Campus } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';
import { parseGlobalId } from '@apollosproject/server-core';
import { get } from 'lodash';

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

  updateCurrentUserCampus = async ({ campusId }) => {
    const { Auth } = this.context.dataSources;

    const currentUser = await Auth.getCurrentPerson();
    const { id: rockCampusId } = parseGlobalId(campusId);

    const campus = await this.request()
      .filter(`Id eq ${rockCampusId}`)
      .first();

    if (!campus) return null;

    await this.post(
      `/People/AttributeValue/${currentUser.id}?attributeKey=AppCampus&attributeValue=${campus.guid}`
    );

    currentUser.attributeValues.appCampus.value = campus.guid;
    return currentUser;
  };

  getForPerson = async ({ attributeValues }) => {
    const campusGuid = get(attributeValues, 'appCampus.value', '');

    if (campusGuid === '') {
      return null;
    }

    // And that user has a campus
    return this.request()
      .filter(`Guid eq guid'${campusGuid}'`)
      .expand('Location')
      .expand('Location/Image')
      .first();
  };
}

const resolver = {
  ...originalResolver,
  Person: {
    campus: ({ attributeValues }, args, { dataSources }) =>
      dataSources.Campus.getForPerson({ attributeValues }),
  },
  Campus: {
    ...originalResolver.Campus,
    resources: (root, args, { dataSources }) =>
      dataSources.Campus.webResourcesForCampus(root),
  },
  CampusResource: {
    style: ({ style }) => style || 'LIST_ITEM',
  },
};

const schema = gql`
  ${originalSchema}

  enum CAMPUS_RESOURCE_STYLE {
    LIST_ITEM
    BAR_ITEM
    EXTERNAL_BAR_ITEM
  }

  type CampusResource {
    url: String
    title: String
    icon: String
    style: CAMPUS_RESOURCE_STYLE
  }

  extend type Campus {
    resources: [CampusResource]
  }
`;

export { dataSource, schema, resolver };
