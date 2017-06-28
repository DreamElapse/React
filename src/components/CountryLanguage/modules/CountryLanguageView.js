import { normalize, schema } from 'normalizr'
import data from '../assets/data'

// 组装新数据
const countryLanuageEntitySchema = new schema.Entity('countryLanguage', {}, {
  idAttribute: data => data.wwwcode
})

const countryLanguageSchema = [ countryLanuageEntitySchema ]

export default normalize(data.data, countryLanguageSchema)

