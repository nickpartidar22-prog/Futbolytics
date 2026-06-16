[build]
  publish = "."

[functions]
  directory = "netlify/functions"

[[redirects]]
  from   = "/api/odds"
  to     = "/.netlify/functions/odds"
  status = 200

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=300"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=300"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "no-cache, no-store"

[[headers]]
  for = "/manifest.json"
  [headers.values]
    Cache-Control = "public, max-age=86400"
