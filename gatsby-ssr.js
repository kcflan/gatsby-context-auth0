// gatsby-ssr.js

import React from "react"
import { navigate } from "gatsby"

import { AuthProvider } from "react-use-auth"
const domain = process.env.AUTH0_DOMAIN
const clientID = process.env.AUTH0_CLIENTID

export const wrapRootElement = ({ element }) => (
  <AuthProvider
    navigate={navigate}
    auth0_domain={domain}
    auth0_client_id={clientID}
  >
    {element}
  </AuthProvider>
)
