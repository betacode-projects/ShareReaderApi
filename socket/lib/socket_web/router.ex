defmodule SocketWeb.Router do
  use SocketWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SocketWeb do
    pipe_through :api
  end
end
