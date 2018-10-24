// TODO - eliminate this file through more robust configuration.

import RockApolloDataSource from 'apollos-rock-apollo-data-source';

const mapApollosNameToRockName = (name) => {
  switch (name) {
    case 'ContentItem':
    case 'UniversalContentItem':
    case 'DevotionalContentItem':
      return 'ContentChannelItem';
    default:
      throw new Error(`${name} has not been mapped into a Rock type!`);
  }
};

export default class RockConstants extends RockApolloDataSource {
  async findOrCreate({ model, objectAttributes }) {
    // Turns {ChannelId: 7, Name: 'Something'} into '(ChannelId eq 7) and (Name eq 'Something')'
    const filter = Object.keys(objectAttributes)
      .map((key) => {
        if (typeof objectAttributes[key] === 'string') {
          return `(${key} eq '${objectAttributes[key]}')`;
        }
        return `(${key} eq ${objectAttributes[key]})`;
      })
      .join(' and ');

    const objects = await this.request(model)
      .filter(filter)
      .cache({ ttl: 86400 })
      .get();
    if (objects.length) {
      return objects[0];
    }
    const objectId = await this.post(`/${model}`, objectAttributes);
    const ret = await this.get(`/${model}/${objectId}`);
    console.log('Created', ret);
    return ret;
  }

  async createOrFindInteractionComponent({ componentName, channelId }) {
    return this.findOrCreate({
      model: 'InteractionComponents',
      objectAttributes: { Name: componentName, ChannelId: channelId },
    });
  }

  async createOrFindInteractionChannel({ channelName }) {
    return this.findOrCreate({
      model: 'InteractionChannels',
      objectAttributes: { Name: channelName, UsesSession: true },
    });
  }

  async interactionChannel() {
    return this.createOrFindInteractionChannel({
      channelName: 'Apollos App',
    });
  }

  async interactionComponent() {
    const channel = await this.interactionChannel();
    return this.createOrFindInteractionComponent({
      componentName: 'Apollos Content Item',
      channelId: channel.id,
    });
  }

  async modelTypeId(nameInput) {
    const name = mapApollosNameToRockName(nameInput);

    const types = await this.request('EntityTypes')
      .filter(`Name eq 'Rock.Model.${name}'`)
      .cache({ ttl: 86400 })
      .get();
    if (types.length) {
      return types[0];
    }

    return null;
  }
}
