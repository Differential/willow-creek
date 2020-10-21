import { Campus } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';
import { parseGlobalId } from '@apollosproject/server-core';

const {
  dataSource: originalDataSource,
  schema: originalSchema,
  resolver: originalResolver,
} = Campus;

class dataSource extends originalDataSource {
  webResourcesForCampus = async ({ id }) => {
    const campusConfig = ApollosConfig.ROCK_MAPPINGS.CAMPUS_DATA_VIEWS.find(
      ({ CampusId }) => CampusId === id
    );
    if (campusConfig) {
      return campusConfig.ProfileLinks;
    }
    return [];
  };

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

    return currentUser;
  };

  getForPerson = async ({ personId }) => {
    const APP_CAMPUS_ATTRIBUTE_ID = 132803;
    const appCampusAttribute = await this.request('AttributeValues')
      .filter(
        `(AttributeId eq ${APP_CAMPUS_ATTRIBUTE_ID}) and (EntityId eq ${personId})`
      )
      .first();

    if (
      !appCampusAttribute ||
      !appCampusAttribute.value ||
      appCampusAttribute.value === ''
    ) {
      // Default to the families campus if we don't have an app campus
      // Note: We do not ever want to write the family campus field.
      const family = await this.request(`/Groups/GetFamilies/${personId}`)
        .expand('Campus')
        .expand('Campus/Location')
        .expand('Campus/Location/Image')
        .first();

      if (family && family.campus && family.campus.location) {
        return family.campus;
      }
      return null;
    }

    // And that user has a campus
    return this.request()
      .filter(`Guid eq guid'${appCampusAttribute.value}'`)
      .expand('Location')
      .expand('Location/Image')
      .first();
  };
}

const resolver = {
  ...originalResolver,
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
