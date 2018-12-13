import Axios from 'axios'
import { sortBy, take } from 'lodash'

export const getRating = () => {
  // fixme: refac to dynamic url
  const url = 'http://ecs.zhehao.top:5002/api/credit/get_by_group/718459861'
  return Axios.get(url).then(res => {
    const data = sortBy(res.data, (o) => {
      return -o.rating
    })
    return take(data, 5)
  })
}
