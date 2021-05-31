# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :socket,
  ecto_repos: [Socket.Repo]

# Configures the endpoint
config :socket, SocketWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "mrDOQ2ok0kKOnkB8UcCUD4su7r22w8jllR1Sa+IeGDp8inkqo2dqoxxssxf7zIBS",
  render_errors: [view: SocketWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Socket.PubSub,
  live_view: [signing_salt: "kzvstmBY"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
