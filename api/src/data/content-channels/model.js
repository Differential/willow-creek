export default class ContentChannel {
  constructor(context) {
    this.context = context;
  }

  all = () => this.context.connectors.Rock.get('ContentChannels');

  getFromId = (id) => this.context.connectors.Rock.get(`ContentChannels/${id}`);
}
