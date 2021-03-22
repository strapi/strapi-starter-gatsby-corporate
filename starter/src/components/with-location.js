import React from 'react'
import { Location } from '@reach/router'
import queryString from 'query-string'

const WithLocation = ComponentToWrap => props => (
  <Location>
    {({ location }) => (
      <ComponentToWrap
        {...props}
        location={location}
        search={location.search ? queryString.parse(location.search) : {}}
      />
    )}
  </Location>
)

export default WithLocation
