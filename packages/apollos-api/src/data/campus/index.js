import { schemaMerge } from '@apollosproject/server-core';
import {
  Campus,
} from '@apollosproject/data-connector-rock';

const { dataSource, schema } = Campus;

const newResolver = {
  Campus: {
    image: () => null,
  }
}

const resolver = schemaMerge(newResolver, Campus)


export { dataSource, schema, resolver };

