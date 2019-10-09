import { Person } from '@apollosproject/data-connector-rock';
import dataSource from './data-source';

const { resolver, schema } = Person;

export { resolver, schema, dataSource };
