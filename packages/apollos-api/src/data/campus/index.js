import { schemaMerge } from '@apollosproject/server-core';
import {
  Campus,
} from '@apollosproject/data-connector-rock';

const { dataSource, schema } = Campus;

const newResolver = {
  Campus: {
    image: () => ({ uri: 'https://www.willowcreek.org/-/media/willow-creek/resources/global/hzbni5wg-400x400.jpg' }),
  }
}

const resolver = schemaMerge(newResolver, Campus)


export { dataSource, schema, resolver };

