defmodule SocketWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:" <> _public_room_token, _params, socket) do
    {:ok, %{status: "connection　[ " <> _public_room_token <> " ] !!"}, socket}
  end

  def handle_in("download_alert", %{"publicToken" => body}, socket) do
    broadcast!(socket, "download_alert", %{publicToken: body})
    {:noreply, socket}
  end
end
