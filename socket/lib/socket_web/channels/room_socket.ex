defmodule SocketWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:" <> _public_room_token, _params, socket) do
    {:ok, %{status: "connection　[ " <> _public_room_token <> " ] !!"}, socket}
  end

  def hundle_in("download_alert", %{"body" => body}, socket) do
    broadcast!(socket, "download_alert", %{body: body})
    {:noreply, socket}
  end
end
