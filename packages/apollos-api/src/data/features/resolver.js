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
    userFeedFeatures: async (root, args, { dataSources: { Feature } }, info) =>
      Feature.getHomeFeedFeatures({ supportedTypes: getSupportedTypes(info) }),
  },
};

export default resolver;
