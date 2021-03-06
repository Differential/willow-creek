import { createGlobalId } from '@apollosproject/server-core';
import { Feature as baseFeature } from '@apollosproject/data-connector-rock';
import { get } from 'lodash';

function getSupportedTypes(info) {
  const inlineFragmentTypes = info.operation.selectionSet.selections[0].selectionSet.selections.map(
    (s) => get(s, 'typeCondition.name.value')
  );

  const possibleFragments = info.operation.selectionSet.selections[0].selectionSet.selections
    .map((s) => get(s, 'name.value'))
    .filter((f) => f !== '__typename');

  const fragmentFields = info.fragments;

  const fragmentTypes = possibleFragments.map((f) => {
    const fragment = fragmentFields[f];

    if (fragment) {
      return fragment.typeCondition.name.value;
    }
  });

  const fragmentFragmentTypes = Object.values(info.fragments).flatMap((f) =>
    f.selectionSet.selections.map((s) => get(s, 'typeCondition.name.value'))
  );

  return [...inlineFragmentTypes, ...fragmentTypes, ...fragmentFragmentTypes]
    .filter((n) => !!n)
    .map((n) => n.replace('Feature', ''));
}

const resolver = {
  ...baseFeature.resolver,
  Query: {
    // deprecated
    userFeedFeatures: async (root, args, context, info) => {
      const { Feature, Person } = context.dataSources;
      const { campusId } = await Person.getCurrentUserCampusId();
      return Feature.getHomeFeedFeatures({
        supportedTypes: getSupportedTypes(info),
        campusId: createGlobalId(campusId, 'Campus'), // matches arg from getHomeFeed query
      });
    },
  },
  CardListItem: {
    ...baseFeature.resolver.CardListItem,
    hasAction: (...args) => {
      try {
        return baseFeature.resolver.CardListItem.hasAction(...args);
      } catch {
        return false;
      }
    },
  },
};

export default resolver;
